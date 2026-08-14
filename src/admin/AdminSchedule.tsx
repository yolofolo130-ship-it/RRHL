import { useEffect, useMemo, useState } from "react";
import { getFile, commitFile } from "@/admin/github";
import AdminSaveError from "@/admin/AdminSaveError";
import {
  findArrayRange,
  isEntryLine,
  parseLineKV,
  stringifyGameLine,
  stringifySkaterStatLine,
  stringifyGoalieStatLine,
  upsertLine,
  nextIdNumber,
  type GameFields,
  type SkaterStatFields,
  type GoalieStatFields,
} from "@/admin/lines";
import { teams, getTeamById } from "@/data/teams";
import { skaters, goalies } from "@/data/players";

const PATH = "src/data/schedule.ts";
const OPEN_MARKER = "export const games";
const FEATURED_MARKER = "export const featuredGameId";
const STATUS_OPTIONS = ["upcoming", "live", "final", "postponed"];

const STATS_PATH = "src/data/gameLogs.ts";
const SKATER_MARKER = "export const skaterGameStatLines";
const GOALIE_MARKER = "export const goalieGameStatLines";
const INNET_MARKER = "export const inNetAppearances";

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

function goaliesForGame(homeTeamId: string, awayTeamId: string) {
  return goalies.filter((g) => g.teamId === homeTeamId || g.teamId === awayTeamId);
}

function skatersForGame(homeTeamId: string, awayTeamId: string) {
  return skaters.filter((s) => s.teamId === homeTeamId || s.teamId === awayTeamId);
}

function allPlayersForGame(homeTeamId: string, awayTeamId: string) {
  return [...skaters, ...goalies].filter((p) => p.teamId === homeTeamId || p.teamId === awayTeamId);
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
  const [savingFeatured, setSavingFeatured] = useState(false);
  const [savedFeatured, setSavedFeatured] = useState(false);
  const [featuredError, setFeaturedError] = useState<string | null>(null);
  const [statsLines, setStatsLines] = useState<string[] | null>(null);
  const [statsSha, setStatsSha] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setLoadError(null);
    Promise.all([getFile(PATH), getFile(STATS_PATH)])
      .then(([scheduleFile, statsFile]) => {
        const { content, sha } = scheduleFile;
        setStatsLines(statsFile.content.split("\n"));
        setStatsSha(statsFile.sha);
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
            wg: kv.wg as string | undefined,
            lg: kv.lg as string | undefined,
            potg: kv.potg as string | undefined,
          });
        }
        setLines(ls);
        setSha(sha);
        setRows(parsed);
        const maxWeek = parsed.reduce((max, r) => Math.max(max, r.week), 0);
        setNewGame((f) => ({ ...f, week: maxWeek + 1 }));

        const featuredIdx = ls.findIndex((l) => l.includes(FEATURED_MARKER));
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
    if (!lines || !sha || !featuredGameId) return;
    // Found fresh from the current lines rather than cached from load() —
    // addGame/saveAll can insert or shift lines in between, so a stale
    // index captured once at load time can point at the wrong line by the
    // time this runs (this previously corrupted schedule.ts with a
    // duplicate `featuredGameId` declaration).
    const featuredLineIndex = lines.findIndex((l) => l.includes(FEATURED_MARKER));
    if (featuredLineIndex === -1) return;
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
        <table className="w-full min-w-[1500px] border-collapse text-sm font-admin-mono">
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
              <th className="px-3 py-3 text-left font-semibold">WG</th>
              <th className="px-3 py-3 text-left font-semibold">LG</th>
              <th className="px-3 py-3 text-left font-semibold">POTG</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const sameTeams = row.homeTeamId === row.awayTeamId;
              const rowGoalies = goaliesForGame(row.homeTeamId, row.awayTeamId);
              const rowSkaters = skatersForGame(row.homeTeamId, row.awayTeamId);
              const rowPlayers = allPlayersForGame(row.homeTeamId, row.awayTeamId);
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
                  <td className="px-3 py-3">
                    <select
                      value={row.wg ?? ""}
                      onChange={(e) => updateRow(row.id, { wg: e.target.value || undefined })}
                      className="border border-line bg-bg-1 px-2 py-1 text-ink-0 outline-none focus:border-line-strong"
                    >
                      <option value="">—</option>
                      <optgroup label="Goalies">
                        {rowGoalies.map((g) => (
                          <option key={g.id} value={g.name}>
                            {g.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Skaters (emergency goalie)">
                        {rowSkaters.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </td>
                  <td className="px-3 py-3">
                    <select
                      value={row.lg ?? ""}
                      onChange={(e) => updateRow(row.id, { lg: e.target.value || undefined })}
                      className="border border-line bg-bg-1 px-2 py-1 text-ink-0 outline-none focus:border-line-strong"
                    >
                      <option value="">—</option>
                      <optgroup label="Goalies">
                        {rowGoalies.map((g) => (
                          <option key={g.id} value={g.name}>
                            {g.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Skaters (emergency goalie)">
                        {rowSkaters.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </td>
                  <td className="px-3 py-3">
                    <select
                      value={row.potg ?? ""}
                      onChange={(e) => updateRow(row.id, { potg: e.target.value || undefined })}
                      className="border border-line bg-bg-1 px-2 py-1 text-ink-0 outline-none focus:border-line-strong"
                    >
                      <option value="">—</option>
                      {rowPlayers.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>
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
        <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-ink-2">GAME STATS</p>
        <AllGameStatsSection
          rows={rows}
          statsLines={statsLines}
          statsSha={statsSha}
          onSaved={(nextLines, newSha) => {
            setStatsLines(nextLines);
            setStatsSha(newSha);
          }}
        />
      </div>

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

// ---------- inline per-game stats (WG / POTG) ----------
//
// Lets the admin log a stat line for a game's WG/POTG right where they
// set those roles, instead of hopping over to the Skater/Goalie/In Net
// Logs tabs and re-finding the same player + game. Writes straight to
// gameLogs.ts, reusing the same stringify/upsert helpers those tabs use.
//
// LG deliberately does NOT drive a stat entry here — it only sets the
// label shown on the public Schedule page. Auto-generating a stat card
// for the LG the moment they're picked meant their "Last 5 Games" table
// changed on its own, which was confusing to reconcile; logging an LG's
// real stats is a manual trip to Goalie/In Net Logs like before.
//
// WG can be either a natural goalie OR a skater who filled in as
// emergency goalie for that game — the two are told apart by whether
// the name matches the goalie roster: a natural goalie's line goes in
// goalieGameStatLines, an emergency one goes in inNetAppearances
// (same GoalieStatFields shape, just a separate array so the skater
// doesn't turn into a full goalie roster entry). POTG-only skaters
// (holding no WG role) get a normal skater-shaped line instead.
//
// Only a couple of numbers actually get typed in here — saves (+ an
// optional goal) for a goalie, goals + assists for a skater. Everything
// else derivable from the game itself (goals against = the opponent's
// final score, shutout = whether that's zero, points = goals + assists)
// is computed instead of asked for, and anything NOT derivable that this
// panel doesn't show (assists/pim/gs for a goalie) is just carried over
// from whatever's already on file rather than reset.

type StatKind = "goalie" | "in-net" | "skater";

type StatEntry =
  | { kind: "goalie" | "in-net"; lineIndex: number; fields: GoalieStatFields }
  | { kind: "skater"; lineIndex: number; fields: SkaterStatFields };

function markerForKind(kind: StatKind): string {
  if (kind === "goalie") return GOALIE_MARKER;
  if (kind === "in-net") return INNET_MARKER;
  return SKATER_MARKER;
}

function rolesForGame(game: Row): Map<string, string[]> {
  const roles = new Map<string, string[]>();
  const add = (name: string | undefined, role: string) => {
    if (!name) return;
    roles.set(name, [...(roles.get(name) ?? []), role]);
  };
  add(game.wg, "WG");
  // LG intentionally omitted — see the comment above this section.
  add(game.potg, "POTG");
  return roles;
}

// Goals let in by whichever team `teamId` belongs to in this game — i.e.
// the OTHER team's final score.
function goalsAgainstFor(game: Row, teamId: string): number {
  const isHome = teamId === game.homeTeamId;
  return (isHome ? game.awayScore : game.homeScore) ?? 0;
}

type FlatStatEntry = StatEntry & { gameId: string; gameLabel: string; roles: string[] };

function gameLabelFor(game: Row): string {
  const away = getTeamById(game.awayTeamId);
  const home = getTeamById(game.homeTeamId);
  return `Week ${game.week} — ${away?.abbr ?? game.awayTeamId} @ ${home?.abbr ?? game.homeTeamId} (${game.date})`;
}

function buildAllStatEntries(rows: Row[], statsLines: string[]): FlatStatEntry[] {
  const flat: FlatStatEntry[] = [];
  for (const game of rows) {
    if (game.status !== "final") continue;
    const roles = rolesForGame(game);
    if (roles.size === 0) continue;
    const gameLabel = gameLabelFor(game);
    for (const entry of buildStatEntries(game, statsLines, roles)) {
      flat.push({ ...entry, gameId: game.id, gameLabel, roles: roles.get(entry.fields.playerName) ?? [] });
    }
  }
  return flat;
}

function buildStatEntries(game: Row, statsLines: string[], roles: Map<string, string[]>): StatEntry[] {
  const entries: StatEntry[] = [];
  for (const [name, playerRoles] of roles) {
    const goalie = goalies.find((g) => g.name === name);
    const skater = goalie ? undefined : skaters.find((s) => s.name === name);
    const kind: StatKind = goalie ? "goalie" : skater && playerRoles.includes("WG") ? "in-net" : "skater";
    const marker = markerForKind(kind);
    const { start, end } = findArrayRange(statsLines, marker);
    let lineIndex = -1;
    let existing: Record<string, unknown> = {};
    for (let i = start + 1; i < end; i++) {
      if (!isEntryLine(statsLines[i])) continue;
      const kv = parseLineKV(statsLines[i]);
      if (kv.playerName === name && kv.gameId === game.id) {
        lineIndex = i;
        existing = kv;
        break;
      }
    }
    if (kind === "goalie" || kind === "in-net") {
      const isWinner = playerRoles.includes("WG");
      const teamId = (goalie ?? skater)?.teamId ?? game.homeTeamId;
      const goalsAgainst = goalsAgainstFor(game, teamId);
      const existingSA = existing.shotsAgainst as number | undefined;
      const existingGA = existing.goalsAgainst as number | undefined;
      // Preserve a previously-entered save count even though goalsAgainst
      // just got recomputed fresh from the game score (which may differ
      // from whatever it was set to before, e.g. if the score was fixed).
      const saves = existingSA !== undefined ? Math.max(0, existingSA - (existingGA ?? 0)) : 0;
      entries.push({
        kind,
        lineIndex,
        fields: {
          playerName: name,
          gameId: game.id,
          gs: (existing.gs as number) ?? 1,
          dec: (existing.dec as "W" | "L" | "OTL" | undefined) ?? (isWinner ? "W" : undefined),
          shotsAgainst: saves + goalsAgainst,
          goalsAgainst,
          shutout: goalsAgainst === 0 ? 1 : 0,
          goals: (existing.goals as number) ?? 0,
          assists: (existing.assists as number) ?? 0,
          points: (existing.points as number) ?? 0,
          pim: (existing.pim as number) ?? 0,
        },
      });
    } else {
      const goals = (existing.goals as number) ?? 0;
      const assists = (existing.assists as number) ?? 0;
      entries.push({
        kind: "skater",
        lineIndex,
        fields: {
          playerName: name,
          gameId: game.id,
          goals,
          assists,
          points: goals + assists,
          pim: (existing.pim as number) ?? 0,
          ppg: (existing.ppg as number) ?? 0,
          shg: (existing.shg as number) ?? 0,
          shots: (existing.shots as number) ?? 0,
          shifts: (existing.shifts as number) ?? 0,
        },
      });
    }
  }
  return entries;
}

interface AllGameStatsSectionProps {
  rows: Row[];
  statsLines: string[] | null;
  statsSha: string | null;
  onSaved: (nextLines: string[], newSha: string) => void;
}

function AllGameStatsSection({ rows, statsLines, statsSha, onSaved }: AllGameStatsSectionProps) {
  const [entries, setEntries] = useState<FlatStatEntry[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Only the fields that actually change what's shown here — keying off
  // `rows` directly would rebuild (and silently discard any in-progress
  // edits in) every game's stats whenever ANY row changes, even something
  // unrelated like a date typo two games away.
  const honorsSignature = rows
    .filter((r) => r.status === "final" && (r.wg || r.lg || r.potg))
    .map((r) => `${r.id}:${r.wg ?? ""}:${r.lg ?? ""}:${r.potg ?? ""}:${r.overtime ? 1 : 0}:${r.homeScore ?? ""}:${r.awayScore ?? ""}`)
    .join("|");

  useEffect(() => {
    if (!statsLines) return;
    setEntries(buildAllStatEntries(rows, statsLines));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statsLines, honorsSignature]);

  const updateEntry = (gameId: string, name: string, patch: Partial<SkaterStatFields & GoalieStatFields>) => {
    setEntries((es) =>
      es.map((e) => {
        if (e.gameId !== gameId || e.fields.playerName !== name) return e;
        const fields = { ...e.fields, ...patch } as SkaterStatFields & GoalieStatFields;
        // Points isn't shown as its own field here — keep it in sync
        // with goals + assists so gameLogs.ts still stores a real number.
        if (e.kind === "skater") fields.points = fields.goals + fields.assists;
        return { ...e, fields } as FlatStatEntry;
      }),
    );
  };

  const save = async () => {
    if (!statsLines || !statsSha || entries.length === 0) return;
    setSaving(true);
    setError(null);
    try {
      let nextLines = [...statsLines];
      // Replace existing lines first — safe in any order, doesn't shift indices.
      for (const entry of entries) {
        if (entry.lineIndex === -1) continue;
        nextLines[entry.lineIndex] =
          entry.kind === "skater" ? stringifySkaterStatLine(entry.fields) : stringifyGoalieStatLine(entry.fields);
      }
      // Insert brand-new lines one at a time, recomputing each array's range
      // right before inserting — an insert into one array can shift the
      // others further down the file, so a stale range would land the next
      // insert in the wrong spot.
      for (const entry of entries) {
        if (entry.lineIndex !== -1) continue;
        const { start, end } = findArrayRange(nextLines, markerForKind(entry.kind));
        const newLine =
          entry.kind === "skater" ? stringifySkaterStatLine(entry.fields) : stringifyGoalieStatLine(entry.fields);
        // Grouped near this player's OTHER entries in that array (matching
        // playerName only, not gameId — there's by definition no existing
        // line for this exact player+game yet, or lineIndex wouldn't be -1).
        nextLines = upsertLine(nextLines, -1, newLine, (kv) => kv.playerName === entry.fields.playerName, start, end);
      }
      const newSha = await commitFile(STATS_PATH, nextLines.join("\n"), statsSha, "Log game stats");
      onSaved(nextLines, newSha);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e: any) {
      setError(String(e.message ?? e));
    } finally {
      setSaving(false);
    }
  };

  const grouped = useMemo(() => {
    const map = new Map<string, { gameLabel: string; items: FlatStatEntry[] }>();
    for (const entry of entries) {
      const group = map.get(entry.gameId) ?? { gameLabel: entry.gameLabel, items: [] };
      group.items.push(entry);
      map.set(entry.gameId, group);
    }
    return Array.from(map.values());
  }, [entries]);

  if (!statsLines) return <p className="text-xs text-ink-2">Loading stats…</p>;

  if (grouped.length === 0) {
    return <p className="text-sm text-ink-2">No final games have a WG/LG/POTG set yet.</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      {grouped.map(({ gameLabel, items }) => (
        <div key={items[0].gameId}>
          <p className="mb-2 text-[11px] font-semibold tracking-[0.1em] text-ink-2">{gameLabel}</p>
          <div className="flex flex-wrap gap-3">
            {items.map((entry) => (
              <div key={`${entry.gameId}-${entry.fields.playerName}`} className="border border-line bg-bg-2 p-3">
                <p className="mb-2 text-xs font-semibold tracking-[0.1em] text-ink-1">
                  {entry.fields.playerName} <span className="text-ink-3">({entry.roles.join(" • ")})</span>
                  {entry.kind === "in-net" && (
                    <span className="ml-1.5 text-[10px] font-semibold tracking-[0.1em] text-amber-400">
                      EMERGENCY GOALIE
                    </span>
                  )}
                </p>
                {entry.kind !== "skater" ? (
                  <div className="flex flex-wrap gap-2">
                    <StatInput
                      label="SAVES"
                      value={entry.fields.shotsAgainst - entry.fields.goalsAgainst}
                      onChange={(v) =>
                        updateEntry(entry.gameId, entry.fields.playerName, { shotsAgainst: v + entry.fields.goalsAgainst })
                      }
                    />
                    <StatInput
                      label="GOALS"
                      value={entry.fields.goals}
                      onChange={(v) => updateEntry(entry.gameId, entry.fields.playerName, { goals: v })}
                    />
                    {entry.fields.shutout === 1 && (
                      <span className="flex flex-col items-center gap-1 text-[10px] font-semibold tracking-[0.1em] text-ink-3">
                        SO
                        <span className="flex h-[30px] w-14 items-center justify-center border border-line bg-bg-1 text-sm text-ink-0">✓</span>
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    <StatInput
                      label="GOALS"
                      value={entry.fields.goals}
                      onChange={(v) => updateEntry(entry.gameId, entry.fields.playerName, { goals: v })}
                    />
                    <StatInput
                      label="ASSISTS"
                      value={entry.fields.assists}
                      onChange={(v) => updateEntry(entry.gameId, entry.fields.playerName, { assists: v })}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="border border-line-strong bg-white px-5 py-2.5 text-xs font-semibold tracking-[0.15em] text-black transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "SAVING…" : saved ? "SAVED ✓" : "SAVE ALL STATS"}
        </button>
        {error && <AdminSaveError error={error} onRetry={() => setError(null)} />}
      </div>
    </div>
  );
}

function StatInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col items-center gap-1 text-[10px] font-semibold tracking-[0.1em] text-ink-3">
      {label}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-14 border border-line bg-bg-1 px-1.5 py-1 text-center text-sm text-ink-0 outline-none focus:border-line-strong"
      />
    </label>
  );
}
