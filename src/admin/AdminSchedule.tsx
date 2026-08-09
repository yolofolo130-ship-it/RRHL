import { useEffect, useState } from "react";
import { getFile, commitFile } from "@/admin/github";
import { findArrayRange, isEntryLine, parseLineKV, stringifyGameLine, type GameFields } from "@/admin/lines";
import { getTeamById } from "@/data/teams";

const PATH = "src/data/schedule.ts";
const STATUS_OPTIONS = ["upcoming", "live", "final", "postponed"];

interface Row extends GameFields {
  lineIndex: number;
}

export default function AdminSchedule() {
  const [sha, setSha] = useState<string | null>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    getFile(PATH)
      .then(({ content, sha }) => {
        const ls = content.split("\n");
        const { start, end } = findArrayRange(ls, "export const games");
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
      })
      .catch((e) => setError(String(e.message ?? e)))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const updateRow = (id: string, patch: Partial<Row>) => {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const save = async (row: Row) => {
    if (!lines || !sha) return;
    setSavingId(row.id);
    setError(null);
    try {
      const newLine = stringifyGameLine(row);
      const nextLines = [...lines];
      nextLines[row.lineIndex] = newLine;
      const newSha = await commitFile(PATH, nextLines.join("\n"), sha, `Update ${row.id} final score`);
      setLines(nextLines);
      setSha(newSha);
      setSavedId(row.id);
      setTimeout(() => setSavedId((id) => (id === row.id ? null : id)), 2000);
    } catch (e: any) {
      setError(String(e.message ?? e));
    } finally {
      setSavingId(null);
    }
  };

  if (loading) return <p className="text-sm text-ink-2">Loading schedule…</p>;
  if (error) return <p className="text-sm text-red-400">{error}</p>;

  return (
    <div className="overflow-x-auto border border-line bg-bg-2">
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-line text-xs tracking-[0.15em] text-ink-3">
            <th className="px-4 py-3 text-left font-semibold">DATE</th>
            <th className="px-3 py-3 text-left font-semibold">MATCHUP</th>
            <th className="px-3 py-3 text-center font-semibold">HOME</th>
            <th className="px-3 py-3 text-center font-semibold">AWAY</th>
            <th className="px-3 py-3 text-center font-semibold">OT</th>
            <th className="px-3 py-3 text-center font-semibold">STATUS</th>
            <th className="px-4 py-3 text-center font-semibold"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const home = getTeamById(row.homeTeamId);
            const away = getTeamById(row.awayTeamId);
            return (
              <tr key={row.id} className="border-b border-line/60 last:border-b-0">
                <td className="px-4 py-3 text-ink-2">{row.date}</td>
                <td className="px-3 py-3 text-ink-1">
                  {away?.abbr ?? row.awayTeamId} @ {home?.abbr ?? row.homeTeamId}
                </td>
                <td className="px-3 py-3 text-center">
                  <input
                    type="number"
                    value={row.homeScore ?? ""}
                    onChange={(e) =>
                      updateRow(row.id, {
                        homeScore: e.target.value === "" ? undefined : Number(e.target.value),
                      })
                    }
                    className="w-16 border border-line bg-bg-1 px-2 py-1 text-center text-ink-0 outline-none focus:border-line-strong"
                  />
                </td>
                <td className="px-3 py-3 text-center">
                  <input
                    type="number"
                    value={row.awayScore ?? ""}
                    onChange={(e) =>
                      updateRow(row.id, {
                        awayScore: e.target.value === "" ? undefined : Number(e.target.value),
                      })
                    }
                    className="w-16 border border-line bg-bg-1 px-2 py-1 text-center text-ink-0 outline-none focus:border-line-strong"
                  />
                </td>
                <td className="px-3 py-3 text-center">
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
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => save(row)}
                    disabled={savingId === row.id}
                    className="border border-line-strong bg-white px-3 py-1.5 text-xs font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {savingId === row.id ? "…" : savedId === row.id ? "SAVED" : "SAVE"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
