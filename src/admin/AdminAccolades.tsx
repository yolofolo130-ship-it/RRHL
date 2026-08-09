import { useEffect, useState } from "react";
import { getFile, commitFile } from "@/admin/github";
import { findArrayRange, isEntryLine, parseLineKV, setLineField } from "@/admin/lines";
import { slugify } from "@/utils/format";

const ACCOLADES_PATH = "src/data/accolades.ts";
const HISTORY_PATH = "src/data/playerHistory.ts";
const SEASON_MARKER = "export const seasonAccolades";

interface AccoladeRow {
  lineIndex: number;
  id: string;
  name: string;
  winner: string;
}

export default function AdminAccolades() {
  // Season 23 awards
  const [accSha, setAccSha] = useState<string | null>(null);
  const [accLines, setAccLines] = useState<string[] | null>(null);
  const [accRows, setAccRows] = useState<AccoladeRow[]>([]);
  const [accLoading, setAccLoading] = useState(true);
  const [accError, setAccError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  // Past-season awards
  const [histSha, setHistSha] = useState<string | null>(null);
  const [histLines, setHistLines] = useState<string[] | null>(null);
  const [histLoading, setHistLoading] = useState(true);
  const [histError, setHistError] = useState<string | null>(null);
  const [newSeason, setNewSeason] = useState("");
  const [newAward, setNewAward] = useState("");
  const [newPlayer, setNewPlayer] = useState("");
  const [adding, setAdding] = useState(false);
  const [addedOk, setAddedOk] = useState(false);

  const loadAccolades = () => {
    setAccLoading(true);
    setAccError(null);
    getFile(ACCOLADES_PATH)
      .then(({ content, sha }) => {
        const lines = content.split("\n");
        const { start, end } = findArrayRange(lines, "export const accolades");
        const rows: AccoladeRow[] = [];
        for (let i = start + 1; i < end; i++) {
          if (!isEntryLine(lines[i])) continue;
          const kv = parseLineKV(lines[i]);
          rows.push({
            lineIndex: i,
            id: kv.id as string,
            name: kv.name as string,
            winner: (kv.winner as string | undefined) ?? "",
          });
        }
        setAccLines(lines);
        setAccSha(sha);
        setAccRows(rows);
      })
      .catch((e) => setAccError(String(e.message ?? e)))
      .finally(() => setAccLoading(false));
  };

  const loadHistory = () => {
    setHistLoading(true);
    setHistError(null);
    getFile(HISTORY_PATH)
      .then(({ content, sha }) => {
        setHistLines(content.split("\n"));
        setHistSha(sha);
      })
      .catch((e) => setHistError(String(e.message ?? e)))
      .finally(() => setHistLoading(false));
  };

  useEffect(() => {
    loadAccolades();
    loadHistory();
  }, []);

  const updateWinner = (id: string, winner: string) => {
    setAccRows((rs) => rs.map((r) => (r.id === id ? { ...r, winner } : r)));
  };

  const saveWinner = async (row: AccoladeRow) => {
    if (!accLines || !accSha) return;
    setSavingId(row.id);
    setAccError(null);
    try {
      const newLine = setLineField(accLines[row.lineIndex], "winner", row.winner || undefined);
      const nextLines = [...accLines];
      nextLines[row.lineIndex] = newLine;
      const newSha = await commitFile(
        ACCOLADES_PATH,
        nextLines.join("\n"),
        accSha,
        row.winner ? `Assign ${row.name} to ${row.winner}` : `Clear ${row.name} winner`,
      );
      setAccLines(nextLines);
      setAccSha(newSha);
      setSavedId(row.id);
      setTimeout(() => setSavedId((id) => (id === row.id ? null : id)), 2000);
    } catch (e: any) {
      setAccError(String(e.message ?? e));
    } finally {
      setSavingId(null);
    }
  };

  const addPastAward = async () => {
    if (!histLines || !histSha || !newSeason.trim() || !newAward.trim() || !newPlayer.trim()) return;
    setAdding(true);
    setHistError(null);
    setAddedOk(false);
    try {
      const seasonNum = newSeason.match(/\d+/)?.[0];
      const idPrefix = seasonNum ? `s${seasonNum}` : slugify(newSeason);
      const id = `${idPrefix}-${slugify(newAward)}`;
      const newLine = `  { id: "${id}", season: "${newSeason.trim()}", accoladeName: "${newAward.trim()}", playerName: "${newPlayer.trim()}" },`;
      const { end } = findArrayRange(histLines, SEASON_MARKER);
      const nextLines = [...histLines];
      nextLines.splice(end, 0, newLine);
      const newSha = await commitFile(
        HISTORY_PATH,
        nextLines.join("\n"),
        histSha,
        `Add ${newAward.trim()} (${newSeason.trim()}) for ${newPlayer.trim()}`,
      );
      setHistLines(nextLines);
      setHistSha(newSha);
      setNewSeason("");
      setNewAward("");
      setNewPlayer("");
      setAddedOk(true);
      setTimeout(() => setAddedOk(false), 2500);
    } catch (e: any) {
      setHistError(String(e.message ?? e));
    } finally {
      setAdding(false);
    }
  };

  return (
    <div>
      <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-ink-2">SEASON 23 AWARDS</p>
      {accLoading ? (
        <p className="text-sm text-ink-2">Loading…</p>
      ) : accError ? (
        <p className="text-sm text-red-400">{accError}</p>
      ) : (
        <div className="overflow-x-auto border border-line bg-bg-2">
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-xs tracking-[0.15em] text-ink-3">
                <th className="px-4 py-3 text-left font-semibold">AWARD</th>
                <th className="px-3 py-3 text-left font-semibold">WINNER</th>
                <th className="px-4 py-3 text-center font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {accRows.map((row) => (
                <tr key={row.id} className="border-b border-line/60 last:border-b-0">
                  <td className="px-4 py-3 text-ink-1">{row.name}</td>
                  <td className="px-3 py-3">
                    <input
                      type="text"
                      value={row.winner}
                      onChange={(e) => updateWinner(row.id, e.target.value)}
                      placeholder="Not yet decided"
                      className="w-full border border-line bg-bg-1 px-2 py-1.5 text-ink-0 outline-none focus:border-line-strong"
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => saveWinner(row)}
                      disabled={savingId === row.id}
                      className="border border-line-strong bg-white px-3 py-1.5 text-xs font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                      {savingId === row.id ? "…" : savedId === row.id ? "SAVED" : "SAVE"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mb-3 mt-10 text-xs font-semibold tracking-[0.2em] text-ink-2">
        ADD A PAST-SEASON AWARD
      </p>
      {histLoading ? (
        <p className="text-sm text-ink-2">Loading…</p>
      ) : (
        <div className="flex flex-wrap items-end gap-3 border border-line bg-bg-2 p-5">
          <div>
            <label className="mb-1 block text-[10px] font-semibold tracking-[0.15em] text-ink-3">
              SEASON
            </label>
            <input
              type="text"
              value={newSeason}
              onChange={(e) => setNewSeason(e.target.value)}
              placeholder="Season 22"
              className="w-32 border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
            />
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-semibold tracking-[0.15em] text-ink-3">
              AWARD NAME
            </label>
            <input
              type="text"
              value={newAward}
              onChange={(e) => setNewAward(e.target.value)}
              placeholder="Hart Memorial Trophy"
              className="w-56 border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
            />
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-semibold tracking-[0.15em] text-ink-3">
              PLAYER
            </label>
            <input
              type="text"
              value={newPlayer}
              onChange={(e) => setNewPlayer(e.target.value)}
              placeholder="Chrisx"
              className="w-40 border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
            />
          </div>
          <button
            type="button"
            onClick={addPastAward}
            disabled={adding || !newSeason.trim() || !newAward.trim() || !newPlayer.trim()}
            className="border border-line-strong bg-white px-4 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {adding ? "ADDING…" : addedOk ? "ADDED" : "ADD AWARD"}
          </button>
          {histError && <p className="w-full text-xs text-red-400">{histError}</p>}
        </div>
      )}
    </div>
  );
}
