import { useEffect, useMemo, useState } from "react";
import { getFile, commitFile } from "@/admin/github";
import {
  findArrayRange,
  isEntryLine,
  parseLineKV,
  stringifyGoalieStatLine,
  upsertLine,
  type GoalieStatFields,
} from "@/admin/lines";
import { teams, getTeamById } from "@/data/teams";
import { skaters } from "@/data/players";
import { lastInNetGamesFor } from "@/data/gameLogs";

const PATH = "src/data/gameLogs.ts";
const OPEN_MARKER = "export const inNetAppearances";
const DEC_OPTIONS = ["", "W", "L", "OTL"] as const;

interface Row extends GoalieStatFields {
  date: string;
  opponentTeamId: string;
  home: boolean;
  lineIndex: number;
}

// Lets the admin log a skater filling in as emergency goalie for one of
// their team's recent games — same editing pattern as Goalie Logs, just
// sourced from the skater roster and written to a separate array so
// these players don't turn into full goalie roster entries.
export default function AdminInNet() {
  const [teamId, setTeamId] = useState(teams[0]?.id ?? "");
  const [playerName, setPlayerName] = useState("");
  const [sha, setSha] = useState<string | null>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);

  const teamSkaters = useMemo(() => skaters.filter((s) => s.teamId === teamId), [teamId]);

  useEffect(() => {
    if (teamSkaters.length > 0) setPlayerName(teamSkaters[0].name);
  }, [teamId]); // eslint-disable-line react-hooks/exhaustive-deps

  const load = () => {
    setLoading(true);
    setLoadError(null);
    getFile(PATH)
      .then(({ content, sha }) => {
        setLines(content.split("\n"));
        setSha(sha);
      })
      .catch((e) => setLoadError(String(e.message ?? e)))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  useEffect(() => {
    if (!lines || !playerName) {
      setRows([]);
      return;
    }
    const { start, end } = findArrayRange(lines, OPEN_MARKER);
    const skeleton = lastInNetGamesFor(playerName, teamId);
    const built: Row[] = skeleton.map((g) => {
      let lineIndex = -1;
      let existing: Partial<GoalieStatFields> = {};
      for (let i = start + 1; i < end; i++) {
        if (!isEntryLine(lines[i])) continue;
        const kv = parseLineKV(lines[i]);
        if (kv.playerName === playerName && kv.gameId === g.gameId) {
          lineIndex = i;
          existing = kv as unknown as GoalieStatFields;
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
        gs: (existing.gs as number) ?? 0,
        dec: existing.dec as "W" | "L" | "OTL" | undefined,
        shotsAgainst: (existing.shotsAgainst as number) ?? 0,
        goalsAgainst: (existing.goalsAgainst as number) ?? 0,
        shutout: (existing.shutout as number) ?? 0,
        goals: (existing.goals as number) ?? 0,
        assists: (existing.assists as number) ?? 0,
        points: (existing.points as number) ?? 0,
        pim: (existing.pim as number) ?? 0,
      };
    });
    setRows(built);
  }, [lines, playerName, teamId]);

  const updateRow = (gameId: string, patch: Partial<Row>) => {
    setRows((rs) => rs.map((r) => (r.gameId === gameId ? { ...r, ...patch } : r)));
  };

  const saveAll = async () => {
    if (!lines || !sha || rows.length === 0) return;
    setSaving(true);
    setSaveError(null);
    try {
      let nextLines = [...lines];
      // Replace existing lines first — safe in any order, doesn't shift indices.
      for (const row of rows) {
        if (row.lineIndex !== -1) nextLines[row.lineIndex] = stringifyGoalieStatLine(row);
      }
      // Insert brand-new lines one at a time, recomputing the range each time
      // so later insertions account for earlier ones shifting the array.
      for (const row of rows) {
        if (row.lineIndex === -1) {
          const { end } = findArrayRange(nextLines, OPEN_MARKER);
          nextLines = upsertLine(
            nextLines,
            -1,
            stringifyGoalieStatLine(row),
            (kv) => kv.playerName === row.playerName,
            end,
          );
        }
      }
      const newSha = await commitFile(
        PATH,
        nextLines.join("\n"),
        sha,
        `Update ${playerName}'s in-net appearances`,
      );
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

  if (loading) return <p className="text-sm text-ink-2">Loading in-net appearances…</p>;
  if (loadError) return <p className="text-sm text-red-400">{loadError}</p>;

  return (
    <div>
      <p className="mb-4 max-w-2xl text-sm text-ink-2">
        For skaters who filled in as emergency goalie. Pick the team's recent games this player
        actually played goal in and fill in their stats — every other game can stay at 0.
      </p>
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
          <table className="w-full min-w-[980px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-xs tracking-[0.15em] text-ink-3">
                <th className="px-4 py-3 text-left font-semibold">DATE</th>
                <th className="px-3 py-3 text-left font-semibold">OPP</th>
                <th className="px-2 py-3 text-center font-semibold">GS</th>
                <th className="px-2 py-3 text-center font-semibold">DEC</th>
                <th className="px-2 py-3 text-center font-semibold">SA</th>
                <th className="px-2 py-3 text-center font-semibold">GA</th>
                <th className="px-2 py-3 text-center font-semibold">SO</th>
                <th className="px-2 py-3 text-center font-semibold">G</th>
                <th className="px-2 py-3 text-center font-semibold">A</th>
                <th className="px-2 py-3 text-center font-semibold">P</th>
                <th className="px-2 py-3 text-center font-semibold">PIM</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const opp = getTeamById(row.opponentTeamId);
                return (
                  <tr key={row.gameId} className="border-b border-line/60 last:border-b-0">
                    <td className="px-4 py-3 text-ink-2">{row.date}</td>
                    <td className="px-3 py-3 text-ink-1">
                      {row.home ? "vs" : "@"} {opp?.abbr ?? row.opponentTeamId}
                    </td>
                    <td className="px-2 py-3 text-center">
                      <input
                        type="number"
                        value={row.gs}
                        onChange={(e) => updateRow(row.gameId, { gs: Number(e.target.value) })}
                        className="w-12 border border-line bg-bg-1 px-1.5 py-1 text-center text-ink-0 outline-none focus:border-line-strong"
                      />
                    </td>
                    <td className="px-2 py-3 text-center">
                      <select
                        value={row.dec ?? ""}
                        onChange={(e) =>
                          updateRow(row.gameId, {
                            dec: e.target.value === "" ? undefined : (e.target.value as "W" | "L" | "OTL"),
                          })
                        }
                        className="border border-line bg-bg-1 px-1.5 py-1 text-ink-0 outline-none focus:border-line-strong"
                      >
                        {DEC_OPTIONS.map((d) => (
                          <option key={d} value={d}>
                            {d || "—"}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 py-3 text-center">
                      <input
                        type="number"
                        value={row.shotsAgainst}
                        onChange={(e) => updateRow(row.gameId, { shotsAgainst: Number(e.target.value) })}
                        className="w-14 border border-line bg-bg-1 px-1.5 py-1 text-center text-ink-0 outline-none focus:border-line-strong"
                      />
                    </td>
                    <td className="px-2 py-3 text-center">
                      <input
                        type="number"
                        value={row.goalsAgainst}
                        onChange={(e) => updateRow(row.gameId, { goalsAgainst: Number(e.target.value) })}
                        className="w-14 border border-line bg-bg-1 px-1.5 py-1 text-center text-ink-0 outline-none focus:border-line-strong"
                      />
                    </td>
                    <td className="px-2 py-3 text-center">
                      <input
                        type="number"
                        min={0}
                        max={1}
                        value={row.shutout}
                        onChange={(e) => updateRow(row.gameId, { shutout: Number(e.target.value) })}
                        className="w-12 border border-line bg-bg-1 px-1.5 py-1 text-center text-ink-0 outline-none focus:border-line-strong"
                      />
                    </td>
                    <td className="px-2 py-3 text-center">
                      <input
                        type="number"
                        value={row.goals}
                        onChange={(e) => updateRow(row.gameId, { goals: Number(e.target.value) })}
                        className="w-12 border border-line bg-bg-1 px-1.5 py-1 text-center text-ink-0 outline-none focus:border-line-strong"
                      />
                    </td>
                    <td className="px-2 py-3 text-center">
                      <input
                        type="number"
                        value={row.assists}
                        onChange={(e) => updateRow(row.gameId, { assists: Number(e.target.value) })}
                        className="w-12 border border-line bg-bg-1 px-1.5 py-1 text-center text-ink-0 outline-none focus:border-line-strong"
                      />
                    </td>
                    <td className="px-2 py-3 text-center">
                      <input
                        type="number"
                        value={row.points}
                        onChange={(e) => updateRow(row.gameId, { points: Number(e.target.value) })}
                        className="w-12 border border-line bg-bg-1 px-1.5 py-1 text-center text-ink-0 outline-none focus:border-line-strong"
                      />
                    </td>
                    <td className="px-2 py-3 text-center">
                      <input
                        type="number"
                        value={row.pim}
                        onChange={(e) => updateRow(row.gameId, { pim: Number(e.target.value) })}
                        className="w-14 border border-line bg-bg-1 px-1.5 py-1 text-center text-ink-0 outline-none focus:border-line-strong"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {rows.length > 0 && (
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={saveAll}
            disabled={saving}
            className="border border-line-strong bg-white px-5 py-2.5 text-xs font-semibold tracking-[0.15em] text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "SAVING…" : saved ? "SAVED ✓" : "SAVE ALL"}
          </button>
          {saveError && <p className="text-xs text-red-400">{saveError}</p>}
        </div>
      )}
    </div>
  );
}
