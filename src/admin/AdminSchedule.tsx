import { useEffect, useState } from "react";
import { getFile, commitFile } from "@/admin/github";
import AdminSaveError from "@/admin/AdminSaveError";
import {
  findArrayRange,
  isEntryLine,
  parseLineKV,
  stringifyGameLine,
  upsertLine,
  nextIdNumber,
  type GameFields,
} from "@/admin/lines";
import { teams, getTeamById } from "@/data/teams";

const PATH = "src/data/schedule.ts";
const OPEN_MARKER = "export const games";
const FEATURED_MARKER = "export const featuredGameId";
const STATUS_OPTIONS = ["upcoming", "live", "final", "postponed"];

interface Row extends GameFields {
  lineIndex: number;
}

interface NewGameForm {
  week: number;
  date: string;
  time: string;
  awayTeamId: string;
  homeTeamId: string;
  status: string;
}

const EMPTY_NEW_GAME: NewGameForm = {
  week: 1,
  date: "",
  time: "",
  awayTeamId: teams[0]?.id ?? "",
  homeTeamId: teams[1]?.id ?? "",
  status: "upcoming",
};

export default function AdminSchedule() {
  const [sha, setSha] = useState<string | null>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newGame, setNewGame] = useState<NewGameForm>(EMPTY_NEW_GAME);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [featuredGameId, setFeaturedGameId] = useState("");
  const [featuredLineIndex, setFeaturedLineIndex] = useState(-1);
  const [savingFeatured, setSavingFeatured] = useState(false);
  const [savedFeatured, setSavedFeatured] = useState(false);
  const [featuredError, setFeaturedError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setLoadError(null);
    getFile(PATH)
      .then(({ content, sha }) => {
        const ls = content.split("\n");
        const { start, end } = findArrayRange(ls, OPEN_MARKER);
        const parsed: Row[] = [];
        for (let i = start + 1; i < end; i++) {
          if (!isEntryLine(ls[i])) continue;
          const kv = parseLineKV(ls[i]);
          parsed.push({
            lineIndex: i,
            id: kv.id as string,
            week: kv.week as number,
            date: kv.date as string,
            time: kv.time as string,
            homeTeamId: kv.homeTeamId as string,
            awayTeamId: kv.awayTeamId as string,
            homeScore: kv.homeScore as number | undefined,
            awayScore: kv.awayScore as number | undefined,
            overtime: (kv.overtime as boolean | undefined) ?? false,
            status: kv.status as string,
          });
        }
        setLines(ls);
        setSha(sha);
        setRows(parsed);
        const maxWeek = parsed.reduce((max, r) => Math.max(max, r.week), 0);
        setNewGame((f) => ({ ...f, week: maxWeek + 1 }));

        const featuredIdx = ls.findIndex((l) => l.includes(FEATURED_MARKER));
        setFeaturedLineIndex(featuredIdx);
        const featuredMatch = featuredIdx !== -1 ? ls[featuredIdx].match(/"([^"]+)"/) : null;
        setFeaturedGameId(featuredMatch?.[1] ?? "");
      })
      .catch((e) => setLoadError(String(e.message ?? e)))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const updateRow = (id: string, patch: Partial<Row>) => {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const saveAll = async () => {
    if (!lines || !sha || rows.length === 0) return;
    setSaving(true);
    setSaveError(null);
    try {
      const nextLines = [...lines];
      for (const row of rows) {
        nextLines[row.lineIndex] = stringifyGameLine(row);
      }
      const newSha = await commitFile(PATH, nextLines.join("\n"), sha, "Update schedule");
      setLines(nextLines);
      setSha(newSha);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e: any) {
      setSaveError(String(e.message ?? e));
    } finally {
      setSaving(false);
    }
  };

  const addGame = async () => {
    if (!lines || !sha) return;
    if (!newGame.date.trim() || !newGame.time.trim()) {
      setAddError("Date and time are required.");
      return;
    }
    if (newGame.homeTeamId === newGame.awayTeamId) {
      setAddError("Home and away can't be the same team.");
      return;
    }
    setAdding(true);
    setAddError(null);
    try {
      const { start, end } = findArrayRange(lines, OPEN_MARKER);
      const n = nextIdNumber(lines, start, end, /^g(\d+)$/);
      const newLine = stringifyGameLine({
        id: `g${String(n).padStart(2, "0")}`,
        week: newGame.week,
        date: newGame.date,
        time: newGame.time,
        homeTeamId: newGame.homeTeamId,
        awayTeamId: newGame.awayTeamId,
        status: newGame.status,
      });
      const nextLines = upsertLine(lines, -1, newLine, (kv) => kv.week === newGame.week, start, end);
      const newSha = await commitFile(
        PATH,
        nextLines.join("\n"),
        sha,
        `Add Week ${newGame.week} game to schedule`,
      );
      setLines(nextLines);
      setSha(newSha);
      setNewGame((f) => ({ ...f, date: "", time: "" }));
    } catch (e: any) {
      setAddError(String(e.message ?? e));
    } finally {
      setAdding(false);
    }
  };

  const saveFeatured = async () => {
    if (!lines || !sha || featuredLineIndex === -1 || !featuredGameId) return;
    setSavingFeatured(true);
    setFeaturedError(null);
    try {
      const nextLines = [...lines];
      nextLines[featuredLineIndex] = `export const featuredGameId = "${featuredGameId}";`;
      const newSha = await commitFile(
        PATH,
        nextLines.join("\n"),
        sha,
        `Set Main Event to ${featuredGameId}`,
      );
      setLines(nextLines);
      setSha(newSha);
      setSavedFeatured(true);
      setTimeout(() => setSavedFeatured(false), 2000);
    } catch (e: any) {
      setFeaturedError(String(e.message ?? e));
    } finally {
      setSavingFeatured(false);
    }
  };

  if (loading) return <p className="text-sm text-ink-2">Loading schedule…</p>;
  if (loadError) return <p className="text-sm text-red-400">{loadError}</p>;

  return (
    <div>
      <div className="mb-6 border border-dashed border-line bg-bg-1/50 p-4">
        <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-ink-2">MAIN EVENT</p>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={featuredGameId}
            onChange={(e) => setFeaturedGameId(e.target.value)}
            className="min-w-[16rem] flex-1 border border-line bg-bg-1 px-3 py-2 text-sm text-ink-0 outline-none focus:border-line-strong"
          >
            {rows.map((r) => {
              const away = getTeamById(r.awayTeamId);
              const home = getTeamById(r.homeTeamId);
              return (
                <option key={r.id} value={r.id}>
                  Week {r.week} — {away?.abbr ?? r.awayTeamId} @ {home?.abbr ?? r.homeTeamId} ({r.date})
                </option>
              );
            })}
          </select>
          <button
            type="button"
            onClick={saveFeatured}
            disabled={savingFeatured}
            className="border border-line-strong bg-white px-4 py-2 text-xs font-semibold tracking-[0.15em] text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {savingFeatured ? "SAVING…" : savedFeatured ? "SAVED ✓" : "SET MAIN EVENT"}
          </button>
        </div>
        {featuredError && <AdminSaveError error={featuredError} onRetry={load} className="mt-2" />}
      </div>

      <div className="overflow-x-auto border border-line bg-bg-2">
        <table className="w-full min-w-[1100px] border-collapse text-sm font-admin-mono">
          <thead>
            <tr className="border-b border-line text-xs tracking-[0.15em] text-ink-3">
              <th className="px-3 py-3 text-left font-semibold">DATE</th>
              <th className="px-3 py-3 text-left font-semibold">TIME</th>
              <th className="px-3 py-3 text-left font-semibold">AWAY</th>
              <th className="px-3 py-3 text-left font-semibold">HOME</th>
              <th className="px-2 py-3 text-center font-semibold">A SCORE</th>
              <th className="px-2 py-3 text-center font-semibold">H SCORE</th>
              <th className="px-2 py-3 text-center font-semibold">OT</th>
              <th className="px-3 py-3 text-center font-semibold">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const sameTeams = row.homeTeamId === row.awayTeamId;
              return (
                <tr key={row.id} className="border-b border-line/60 last:border-b-0">
                  <td className="px-3 py-3">
                    <input
                      type="date"
                      value={row.date}
                      onChange={(e) => updateRow(row.id, { date: e.target.value })}
                      className="border border-line bg-bg-1 px-2 py-1 text-ink-0 outline-none focus:border-line-strong"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="text"
                      value={row.time}
                      onChange={(e) => updateRow(row.id, { time: e.target.value })}
                      placeholder="8:10 PM"
                      className="w-24 border border-line bg-bg-1 px-2 py-1 text-ink-0 outline-none focus:border-line-strong"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <select
                      value={row.awayTeamId}
                      onChange={(e) => updateRow(row.id, { awayTeamId: e.target.value })}
                      className="border border-line bg-bg-1 px-2 py-1 text-ink-0 outline-none focus:border-line-strong"
                    >
                      {teams.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.abbr}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-3">
                    <select
                      value={row.homeTeamId}
                      onChange={(e) => updateRow(row.id, { homeTeamId: e.target.value })}
                      className="border border-line bg-bg-1 px-2 py-1 text-ink-0 outline-none focus:border-line-strong"
                    >
                      {teams.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.abbr}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-3 text-center">
                    <input
                      type="number"
                      value={row.awayScore ?? ""}
                      onChange={(e) =>
                        updateRow(row.id, {
                          awayScore: e.target.value === "" ? undefined : Number(e.target.value),
                        })
                      }
                      className="w-14 border border-line bg-bg-1 px-2 py-1 text-center text-ink-0 outline-none focus:border-line-strong"
                    />
                  </td>
                  <td className="px-2 py-3 text-center">
                    <input
                      type="number"
                      value={row.homeScore ?? ""}
                      onChange={(e) =>
                        updateRow(row.id, {
                          homeScore: e.target.value === "" ? undefined : Number(e.target.value),
                        })
                      }
                      className="w-14 border border-line bg-bg-1 px-2 py-1 text-center text-ink-0 outline-none focus:border-line-strong"
                    />
                  </td>
                  <td className="px-2 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={row.overtime ?? false}
                      onChange={(e) => updateRow(row.id, { overtime: e.target.checked })}
                    />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <select
                      value={row.status}
                      onChange={(e) => updateRow(row.id, { status: e.target.value })}
                      className="border border-line bg-bg-1 px-2 py-1 text-ink-0 outline-none focus:border-line-strong"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {sameTeams && <p className="mt-1 text-[10px] text-red-400">same team twice</p>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {rows.length > 0 && (
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={saveAll}
            disabled={saving || rows.some((r) => r.homeTeamId === r.awayTeamId)}
            className="border border-line-strong bg-white px-5 py-2.5 text-xs font-semibold tracking-[0.15em] text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "SAVING…" : saved ? "SAVED ✓" : "SAVE ALL"}
          </button>
          {saveError && <AdminSaveError error={saveError} onRetry={load} />}
        </div>
      )}

      <div className="mt-6 border border-dashed border-line bg-bg-1/50 p-4">
        <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-ink-2">ADD NEW GAME</p>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="number"
            min={1}
            value={newGame.week}
            onChange={(e) => setNewGame((f) => ({ ...f, week: Number(e.target.value) }))}
            className="w-20 border border-line bg-bg-1 px-2 py-2 text-sm text-ink-0 outline-none focus:border-line-strong"
            placeholder="Week"
          />
          <input
            type="date"
            value={newGame.date}
            onChange={(e) => setNewGame((f) => ({ ...f, date: e.target.value }))}
            className="border border-line bg-bg-1 px-2 py-2 text-sm text-ink-0 outline-none focus:border-line-strong"
          />
          <input
            type="text"
            value={newGame.time}
            onChange={(e) => setNewGame((f) => ({ ...f, time: e.target.value }))}
            placeholder="8:10 PM"
            className="w-24 border border-line bg-bg-1 px-2 py-2 text-sm text-ink-0 outline-none focus:border-line-strong"
          />
          <select
            value={newGame.awayTeamId}
            onChange={(e) => setNewGame((f) => ({ ...f, awayTeamId: e.target.value }))}
            className="border border-line bg-bg-1 px-2 py-2 text-sm text-ink-0 outline-none focus:border-line-strong"
          >
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.abbr} (away)
              </option>
            ))}
          </select>
          <select
            value={newGame.homeTeamId}
            onChange={(e) => setNewGame((f) => ({ ...f, homeTeamId: e.target.value }))}
            className="border border-line bg-bg-1 px-2 py-2 text-sm text-ink-0 outline-none focus:border-line-strong"
          >
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.abbr} (home)
              </option>
            ))}
          </select>
          <select
            value={newGame.status}
            onChange={(e) => setNewGame((f) => ({ ...f, status: e.target.value }))}
            className="border border-line bg-bg-1 px-2 py-2 text-sm text-ink-0 outline-none focus:border-line-strong"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={addGame}
            disabled={adding}
            className="border border-line-strong bg-white px-4 py-2 text-xs font-semibold tracking-[0.15em] text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {adding ? "ADDING…" : "ADD GAME"}
          </button>
        </div>
        {addError && <AdminSaveError error={addError} onRetry={load} className="mt-2" />}
      </div>
    </div>
  );
}
