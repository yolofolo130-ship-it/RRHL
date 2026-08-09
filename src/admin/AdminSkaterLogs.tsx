import { useEffect, useMemo, useState } from "react";
import { getFile, commitFile } from "@/admin/github";
import {
  findArrayRange,
  isEntryLine,
  parseLineKV,
  stringifySkaterStatLine,
  upsertLine,
  type SkaterStatFields,
} from "@/admin/lines";
import { teams, getTeamById } from "@/data/teams";
import { skaters } from "@/data/players";
import { lastGamesFor } from "@/data/gameLogs";

const PATH = "src/data/gameLogs.ts";
const OPEN_MARKER = "export const skaterGameStatLines";
const FIELDS: (keyof Omit<SkaterStatFields, "playerName" | "gameId">)[] = [
  "goals",
  "assists",
  "points",
  "pim",
  "ppg",
  "shg",
  "shots",
  "shifts",
];

interface Row extends SkaterStatFields {
  date: string;
  opponentTeamId: string;
  home: boolean;
  lineIndex: number; // -1 if the line doesn't exist yet
}

export default function AdminSkaterLogs() {
  const [teamId, setTeamId] = useState(teams[0]?.id ?? "");
  const [playerName, setPlayerName] = useState("");
  const [sha, setSha] = useState<string | null>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [rows, setRows] = useState<Row[]>([]);

  const teamSkaters = useMemo(() => skaters.filter((s) => s.teamId === teamId), [teamId]);

  useEffect(() => {
    if (teamSkaters.length > 0) setPlayerName(teamSkaters[0].name);
  }, [teamId]); // eslint-disable-line react-hooks/exhaustive-deps

  const load = () => {
    setLoading(true);
    setError(null);
    getFile(PATH)
      .then(({ content, sha }) => {
        setLines(content.split("\n"));
        setSha(sha);
      })
      .catch((e) => setError(String(e.message ?? e)))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  useEffect(() => {
    if (!lines || !playerName) {
      setRows([]);
      return;
    }
    const { start, end } = findArrayRange(lines, OPEN_MARKER);
    const skeleton = lastGamesFor(playerName, teamId);
    const built: Row[] = skeleton.map((g) => {
      let lineIndex = -1;
      let existing: Partial<SkaterStatFields> = {};
      for (let i = start + 1; i < end; i++) {
        if (!isEntryLine(lines[i])) continue;
        const kv = parseLineKV(lines[i]);
        if (kv.playerName === playerName && kv.gameId === g.gameId) {
          lineIndex = i;
          existing = kv as unknown as SkaterStatFields;
          break;
        }
      }
      return {
        playerName,
        gameId: g.gameId,
        date: g.date,
        opponentTeamId: g.opponentTeamId,
        home: g.home,
        lineIndex,
        goals: (existing.goals as number) ?? 0,
        assists: (existing.assists as number) ?? 0,
        points: (existing.points as number) ?? 0,
        pim: (existing.pim as number) ?? 0,
        ppg: (existing.ppg as number) ?? 0,
        shg: (existing.shg as number) ?? 0,
        shots: (existing.shots as number) ?? 0,
        shifts: (existing.shifts as number) ?? 0,
      };
    });
    setRows(built);
  }, [lines, playerName, teamId]);

  const updateRow = (gameId: string, patch: Partial<Row>) => {
    setRows((rs) => rs.map((r) => (r.gameId === gameId ? { ...r, ...patch } : r)));
  };

  const save = async (row: Row) => {
    if (!lines || !sha) return;
    const key = `${row.playerName}-${row.gameId}`;
    setSavingKey(key);
    setError(null);
    try {
      const { end } = findArrayRange(lines, OPEN_MARKER);
      const newLine = stringifySkaterStatLine(row);
      const nextLines = upsertLine(
        lines,
        row.lineIndex,
        newLine,
        (kv) => kv.playerName === row.playerName,
        end,
      );
      const newSha = await commitFile(
        PATH,
        nextLines.join("\n"),
        sha,
        `Update ${row.playerName}'s ${row.gameId} stat line`,
      );
      setLines(nextLines);
      setSha(newSha);
      setSavedKey(key);
      setTimeout(() => setSavedKey((k) => (k === key ? null : k)), 2000);
    } catch (e: any) {
      setError(String(e.message ?? e));
    } finally {
      setSavingKey(null);
    }
  };

  if (loading) return <p className="text-sm text-ink-2">Loading skater game logs…</p>;
  if (error) return <p className="text-sm text-red-400">{error}</p>;

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        <select
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          className="border border-line bg-bg-1 px-3 py-2 text-sm text-ink-0 outline-none focus:border-line-strong"
        >
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <select
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="border border-line bg-bg-1 px-3 py-2 text-sm text-ink-0 outline-none focus:border-line-strong"
        >
          {teamSkaters.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {rows.length === 0 ? (
        <p className="mt-6 text-sm text-ink-2">
          No final games yet for this team, so there's nothing to log.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto border border-line bg-bg-2">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-xs tracking-[0.15em] text-ink-3">
                <th className="px-4 py-3 text-left font-semibold">DATE</th>
                <th className="px-3 py-3 text-left font-semibold">OPP</th>
                {FIELDS.map((f) => (
                  <th key={f} className="px-2 py-3 text-center font-semibold">
                    {f.toUpperCase()}
                  </th>
                ))}
                <th className="px-4 py-3 text-center font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const opp = getTeamById(row.opponentTeamId);
                const key = `${row.playerName}-${row.gameId}`;
                return (
                  <tr key={row.gameId} className="border-b border-line/60 last:border-b-0">
                    <td className="px-4 py-3 text-ink-2">{row.date}</td>
                    <td className="px-3 py-3 text-ink-1">
                      {row.home ? "vs" : "@"} {opp?.abbr ?? row.opponentTeamId}
                    </td>
                    {FIELDS.map((f) => (
                      <td key={f} className="px-2 py-3 text-center">
                        <input
                          type="number"
                          value={row[f]}
                          onChange={(e) => updateRow(row.gameId, { [f]: Number(e.target.value) } as Partial<Row>)}
                          className="w-14 border border-line bg-bg-1 px-1.5 py-1 text-center text-ink-0 outline-none focus:border-line-strong"
                        />
                      </td>
                    ))}
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => save(row)}
                        disabled={savingKey === key}
                        className="border border-line-strong bg-white px-3 py-1.5 text-xs font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
                      >
                        {savingKey === key ? "…" : savedKey === key ? "SAVED" : "SAVE"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
