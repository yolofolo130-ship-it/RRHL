import { useEffect, useState } from "react";
import { getFile, commitFile } from "@/admin/github";
import {
  findArrayRange,
  isEntryLine,
  normalizeEmptyArray,
  parseLineKV,
  setLineField,
} from "@/admin/lines";
import { teams } from "@/data/teams";
import { formerTeams } from "@/data/formerTeams";
import { slugify } from "@/utils/format";

const CHAMP_ROSTER_PATH = "src/data/championshipRosters.ts";
const CHAMP_ROSTER_MARKER = "export const championshipRosters";
const TEAM_HISTORY_PATH = "src/data/teamHistory.ts";
const TEAM_HISTORY_MARKER = "export const teamSeasonHonors";
const HALL_OF_FAME_PATH = "src/data/hallOfFame.ts";
const HALL_OF_FAME_MARKER = "export const hallOfFame";
const RECORD_BOOK_PATH = "src/data/recordBook.ts";
const RECORD_BOOK_MARKER = "export const recordBook";

const TEAM_OPTIONS = [
  ...teams.map((t) => ({ id: t.id, name: t.name, code: t.abbr.toLowerCase() })),
  ...formerTeams.map((t) => ({
    id: t.id,
    name: `${t.name} (former)`,
    code: t.id.replace(/^ft-/, "").split("-")[0].slice(0, 3),
  })),
];

function teamNameFor(id: string): string {
  return TEAM_OPTIONS.find((t) => t.id === id)?.name ?? id;
}

// ---------- Championship roster (player badges) ----------

function ChampionshipRosterSection() {
  const [sha, setSha] = useState<string | null>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [season, setSeason] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [adding, setAdding] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getFile(CHAMP_ROSTER_PATH)
      .then(({ content, sha }) => {
        setLines(content.split("\n"));
        setSha(sha);
      })
      .catch((e) => setError(String(e.message ?? e)))
      .finally(() => setLoading(false));
  }, []);

  const add = async () => {
    if (!lines || !sha || !season.trim() || !playerName.trim()) return;
    setAdding(true);
    setError(null);
    setOk(false);
    try {
      const seasonNum = season.match(/\d+/)?.[0];
      const idPrefix = seasonNum ? `s${seasonNum}` : slugify(season);
      const id = `${idPrefix}-champ-${slugify(playerName)}`;
      const newLine = `  { id: "${id}", season: "${season.trim()}", playerName: "${playerName.trim()}" },`;
      const { end } = findArrayRange(lines, CHAMP_ROSTER_MARKER);
      const nextLines = [...lines];
      nextLines.splice(end, 0, newLine);
      const newSha = await commitFile(
        CHAMP_ROSTER_PATH,
        nextLines.join("\n"),
        sha,
        `Add ${playerName.trim()} to ${season.trim()} championship roster`,
      );
      setLines(nextLines);
      setSha(newSha);
      setSeason("");
      setPlayerName("");
      setOk(true);
      setTimeout(() => setOk(false), 2500);
    } catch (e: any) {
      setError(String(e.message ?? e));
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p className="text-sm text-ink-2">Loading…</p>;

  return (
    <div className="flex flex-wrap items-end gap-3 border border-line bg-bg-2 p-5">
      <div>
        <label className="mb-1 block text-[10px] font-semibold tracking-[0.15em] text-ink-3">
          SEASON
        </label>
        <input
          type="text"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          placeholder="Season 23"
          className="w-32 border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
        />
      </div>
      <div>
        <label className="mb-1 block text-[10px] font-semibold tracking-[0.15em] text-ink-3">
          PLAYER
        </label>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Chrisx"
          className="w-48 border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
        />
      </div>
      <button
        type="button"
        onClick={add}
        disabled={adding || !season.trim() || !playerName.trim()}
        className="border border-line-strong bg-white px-4 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {adding ? "ADDING…" : ok ? "ADDED" : "ADD TO ROSTER"}
      </button>
      {error && <p className="w-full text-xs text-red-400">{error}</p>}
    </div>
  );
}

// ---------- Stanley Cup champion (team honor) ----------

function StanleyCupSection() {
  const [sha, setSha] = useState<string | null>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [season, setSeason] = useState("");
  const [teamId, setTeamId] = useState(TEAM_OPTIONS[0]?.id ?? "");
  const [opponentTeamId, setOpponentTeamId] = useState(TEAM_OPTIONS[1]?.id ?? "");
  const [seriesScore, setSeriesScore] = useState("");
  const [adding, setAdding] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getFile(TEAM_HISTORY_PATH)
      .then(({ content, sha }) => {
        setLines(content.split("\n"));
        setSha(sha);
      })
      .catch((e) => setError(String(e.message ?? e)))
      .finally(() => setLoading(false));
  }, []);

  const add = async () => {
    if (!lines || !sha || !season.trim() || !seriesScore.trim() || teamId === opponentTeamId) return;
    setAdding(true);
    setError(null);
    setOk(false);
    try {
      const seasonNum = season.match(/\d+/)?.[0];
      const idPrefix = seasonNum ? `s${seasonNum}` : slugify(season);
      const code = TEAM_OPTIONS.find((t) => t.id === teamId)?.code ?? slugify(teamId);
      const id = `${idPrefix}-scc-${code}`;
      const newLine = `  { id: "${id}", season: "${season.trim()}", teamId: "${teamId}", honor: "Stanley Cup Champion", opponentTeamId: "${opponentTeamId}", seriesScore: "${seriesScore.trim()}" },`;
      const { end } = findArrayRange(lines, TEAM_HISTORY_MARKER);
      const nextLines = [...lines];
      nextLines.splice(end, 0, newLine);
      const newSha = await commitFile(
        TEAM_HISTORY_PATH,
        nextLines.join("\n"),
        sha,
        `Add ${season.trim()} Stanley Cup Champion: ${teamNameFor(teamId)}`,
      );
      setLines(nextLines);
      setSha(newSha);
      setSeason("");
      setSeriesScore("");
      setOk(true);
      setTimeout(() => setOk(false), 2500);
    } catch (e: any) {
      setError(String(e.message ?? e));
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p className="text-sm text-ink-2">Loading…</p>;

  return (
    <div className="flex flex-wrap items-end gap-3 border border-line bg-bg-2 p-5">
      <div>
        <label className="mb-1 block text-[10px] font-semibold tracking-[0.15em] text-ink-3">
          SEASON
        </label>
        <input
          type="text"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          placeholder="Season 23"
          className="w-28 border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
        />
      </div>
      <div>
        <label className="mb-1 block text-[10px] font-semibold tracking-[0.15em] text-ink-3">
          CHAMPION
        </label>
        <select
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          className="border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
        >
          {TEAM_OPTIONS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-[10px] font-semibold tracking-[0.15em] text-ink-3">
          RUNNER-UP
        </label>
        <select
          value={opponentTeamId}
          onChange={(e) => setOpponentTeamId(e.target.value)}
          className="border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
        >
          {TEAM_OPTIONS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-[10px] font-semibold tracking-[0.15em] text-ink-3">
          SERIES SCORE
        </label>
        <input
          type="text"
          value={seriesScore}
          onChange={(e) => setSeriesScore(e.target.value)}
          placeholder="4-2"
          className="w-20 border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
        />
      </div>
      <button
        type="button"
        onClick={add}
        disabled={adding || !season.trim() || !seriesScore.trim() || teamId === opponentTeamId}
        className="border border-line-strong bg-white px-4 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {adding ? "ADDING…" : ok ? "ADDED" : "ADD CHAMPION"}
      </button>
      {teamId === opponentTeamId && (
        <p className="w-full text-xs text-red-400">Champion and runner-up can't be the same team.</p>
      )}
      {error && <p className="w-full text-xs text-red-400">{error}</p>}
    </div>
  );
}

// ---------- Hall of Fame ----------

interface HofRow {
  lineIndex: number;
  id: string;
  playerName: string;
  note: string;
  accolades: string;
  teamId: string;
}

function HallOfFameSection() {
  const [sha, setSha] = useState<string | null>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const [rows, setRows] = useState<HofRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [newPlayer, setNewPlayer] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newAccolades, setNewAccolades] = useState("");
  const [newTeamId, setNewTeamId] = useState("");
  const [adding, setAdding] = useState(false);

  const load = () => {
    setLoading(true);
    getFile(HALL_OF_FAME_PATH)
      .then(({ content, sha }) => {
        const normalized = normalizeEmptyArray(content.split("\n"), HALL_OF_FAME_MARKER);
        const { start, end } = findArrayRange(normalized, HALL_OF_FAME_MARKER);
        const parsed: HofRow[] = [];
        for (let i = start + 1; i < end; i++) {
          if (!isEntryLine(normalized[i])) continue;
          const kv = parseLineKV(normalized[i]);
          parsed.push({
            lineIndex: i,
            id: kv.id as string,
            playerName: kv.playerName as string,
            note: (kv.note as string | undefined) ?? "",
            accolades: (kv.accolades as string | undefined) ?? "",
            teamId: (kv.teamId as string | undefined) ?? "",
          });
        }
        setLines(normalized);
        setSha(sha);
        setRows(parsed);
      })
      .catch((e) => setError(String(e.message ?? e)))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const updateRow = (id: string, patch: Partial<HofRow>) => {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const saveRow = async (row: HofRow) => {
    if (!lines || !sha) return;
    setSavingId(row.id);
    setError(null);
    try {
      let newLine = setLineField(lines[row.lineIndex], "note", row.note || undefined);
      newLine = setLineField(newLine, "accolades", row.accolades || undefined);
      newLine = setLineField(newLine, "teamId", row.teamId || undefined);
      const nextLines = [...lines];
      nextLines[row.lineIndex] = newLine;
      const newSha = await commitFile(
        HALL_OF_FAME_PATH,
        nextLines.join("\n"),
        sha,
        `Update ${row.playerName}'s Hall of Fame entry`,
      );
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

  const addInductee = async () => {
    if (!lines || !sha || !newPlayer.trim()) return;
    setAdding(true);
    setError(null);
    try {
      const id = `hof-${slugify(newPlayer)}`;
      const parts = [`id: "${id}"`, `playerName: "${newPlayer.trim()}"`];
      if (newNote.trim()) parts.push(`note: "${newNote.trim()}"`);
      if (newAccolades.trim()) parts.push(`accolades: "${newAccolades.trim()}"`);
      if (newTeamId) parts.push(`teamId: "${newTeamId}"`);
      const newLine = `  { ${parts.join(", ")} },`;
      const { end } = findArrayRange(lines, HALL_OF_FAME_MARKER);
      const nextLines = [...lines];
      nextLines.splice(end, 0, newLine);
      const newSha = await commitFile(
        HALL_OF_FAME_PATH,
        nextLines.join("\n"),
        sha,
        `Induct ${newPlayer.trim()} into the Hall of Fame`,
      );
      setLines(nextLines);
      setSha(newSha);
      setNewPlayer("");
      setNewNote("");
      setNewAccolades("");
      setNewTeamId("");
      load();
    } catch (e: any) {
      setError(String(e.message ?? e));
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p className="text-sm text-ink-2">Loading…</p>;

  return (
    <div>
      {error && <p className="mb-3 text-xs text-red-400">{error}</p>}
      {rows.length > 0 && (
        <div className="mb-4 overflow-x-auto border border-line bg-bg-2">
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-xs tracking-[0.15em] text-ink-3">
                <th className="px-4 py-3 text-left font-semibold">PLAYER</th>
                <th className="px-3 py-3 text-left font-semibold">TEAM</th>
                <th className="px-3 py-3 text-left font-semibold">NOTE</th>
                <th className="px-3 py-3 text-left font-semibold">ACCOLADES (SEMICOLON-SEPARATED)</th>
                <th className="px-4 py-3 text-center font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-line/60 last:border-b-0">
                  <td className="px-4 py-3 text-ink-1">{row.playerName}</td>
                  <td className="px-3 py-3">
                    <select
                      value={row.teamId}
                      onChange={(e) => updateRow(row.id, { teamId: e.target.value })}
                      className="border border-line bg-bg-1 px-2 py-1.5 text-ink-0 outline-none focus:border-line-strong"
                    >
                      <option value="">—</option>
                      {TEAM_OPTIONS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="text"
                      value={row.note}
                      onChange={(e) => updateRow(row.id, { note: e.target.value })}
                      placeholder="Why they were inducted"
                      className="w-full border border-line bg-bg-1 px-2 py-1.5 text-ink-0 outline-none focus:border-line-strong"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="text"
                      value={row.accolades}
                      onChange={(e) => updateRow(row.id, { accolades: e.target.value })}
                      placeholder="Hart Memorial Trophy (S22); Stanley Cup Champion (S22)"
                      className="w-full border border-line bg-bg-1 px-2 py-1.5 text-ink-0 outline-none focus:border-line-strong"
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => saveRow(row)}
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
      <div className="flex flex-wrap items-end gap-3 border border-line bg-bg-2 p-5">
        <div>
          <label className="mb-1 block text-[10px] font-semibold tracking-[0.15em] text-ink-3">
            PLAYER
          </label>
          <input
            type="text"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            placeholder="Chrisx"
            className="w-48 border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
          />
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-semibold tracking-[0.15em] text-ink-3">
            TEAM (OPTIONAL)
          </label>
          <select
            value={newTeamId}
            onChange={(e) => setNewTeamId(e.target.value)}
            className="border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
          >
            <option value="">—</option>
            {TEAM_OPTIONS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-semibold tracking-[0.15em] text-ink-3">
            NOTE (OPTIONAL)
          </label>
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="3x Stanley Cup champion"
            className="w-64 border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
          />
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-semibold tracking-[0.15em] text-ink-3">
            ACCOLADES (SEMICOLON-SEPARATED, OPTIONAL)
          </label>
          <input
            type="text"
            value={newAccolades}
            onChange={(e) => setNewAccolades(e.target.value)}
            placeholder="Hart Memorial Trophy (S22); Stanley Cup Champion (S22)"
            className="w-96 border border-line bg-bg-1 px-2 py-1.5 text-sm text-ink-0 outline-none focus:border-line-strong"
          />
        </div>
        <button
          type="button"
          onClick={addInductee}
          disabled={adding || !newPlayer.trim()}
          className="border border-line-strong bg-white px-4 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {adding ? "ADDING…" : "INDUCT"}
        </button>
      </div>
    </div>
  );
}

// ---------- Record Book ----------

interface RecordRow {
  lineIndex: number;
  category: string;
  label: string;
  holder: string;
  value: string;
}

function RecordBookSection() {
  const [sha, setSha] = useState<string | null>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const [rows, setRows] = useState<RecordRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    getFile(RECORD_BOOK_PATH)
      .then(({ content, sha }) => {
        const ls = content.split("\n");
        const { start, end } = findArrayRange(ls, RECORD_BOOK_MARKER);
        const parsed: RecordRow[] = [];
        let currentCategory = "";
        for (let i = start + 1; i < end; i++) {
          const nameMatch = ls[i].match(/^\s*name:\s*"([^"]+)"/);
          if (nameMatch) currentCategory = nameMatch[1];
          if (!ls[i].trim().startsWith("{ label:")) continue;
          const kv = parseLineKV(ls[i]);
          parsed.push({
            lineIndex: i,
            category: currentCategory,
            label: kv.label as string,
            holder: (kv.holder as string | undefined) ?? "",
            value: (kv.value as string | undefined) ?? "",
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

  const updateRow = (lineIndex: number, patch: Partial<RecordRow>) => {
    setRows((rs) => rs.map((r) => (r.lineIndex === lineIndex ? { ...r, ...patch } : r)));
  };

  const save = async (row: RecordRow) => {
    if (!lines || !sha) return;
    const key = `${row.lineIndex}`;
    setSavingKey(key);
    setError(null);
    try {
      let newLine = lines[row.lineIndex];
      newLine = setLineField(newLine, "holder", row.holder || undefined);
      newLine = setLineField(newLine, "value", row.value || undefined);
      const nextLines = [...lines];
      nextLines[row.lineIndex] = newLine;
      const newSha = await commitFile(
        RECORD_BOOK_PATH,
        nextLines.join("\n"),
        sha,
        `Update ${row.category} ${row.label} record`,
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

  if (loading) return <p className="text-sm text-ink-2">Loading…</p>;
  if (error) return <p className="text-sm text-red-400">{error}</p>;

  const categories = Array.from(new Set(rows.map((r) => r.category)));

  return (
    <div className="flex flex-col gap-6">
      {categories.map((cat) => (
        <div key={cat} className="overflow-x-auto border border-line bg-bg-2">
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-xs tracking-[0.15em] text-ink-3">
                <th className="px-4 py-3 text-left font-semibold">{cat.toUpperCase()}</th>
                <th className="px-3 py-3 text-left font-semibold">HOLDER</th>
                <th className="px-3 py-3 text-left font-semibold">VALUE</th>
                <th className="px-4 py-3 text-center font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {rows
                .filter((r) => r.category === cat)
                .map((row) => (
                  <tr key={row.lineIndex} className="border-b border-line/60 last:border-b-0">
                    <td className="px-4 py-3 text-ink-1">{row.label}</td>
                    <td className="px-3 py-3">
                      <input
                        type="text"
                        value={row.holder}
                        onChange={(e) => updateRow(row.lineIndex, { holder: e.target.value })}
                        placeholder="—"
                        className="w-full border border-line bg-bg-1 px-2 py-1.5 text-ink-0 outline-none focus:border-line-strong"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="text"
                        value={row.value}
                        onChange={(e) => updateRow(row.lineIndex, { value: e.target.value })}
                        placeholder='e.g. "42 goals (Season 21)"'
                        className="w-full border border-line bg-bg-1 px-2 py-1.5 text-ink-0 outline-none focus:border-line-strong"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => save(row)}
                        disabled={savingKey === `${row.lineIndex}`}
                        className="border border-line-strong bg-white px-3 py-1.5 text-xs font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
                      >
                        {savingKey === `${row.lineIndex}`
                          ? "…"
                          : savedKey === `${row.lineIndex}`
                            ? "SAVED"
                            : "SAVE"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

// ---------- shell ----------

export default function AdminHistory() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-ink-2">
          ADD A CHAMPIONSHIP ROSTER ENTRY
        </p>
        <ChampionshipRosterSection />
      </div>
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-ink-2">
          ADD A STANLEY CUP CHAMPION
        </p>
        <StanleyCupSection />
      </div>
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-ink-2">HALL OF FAME</p>
        <HallOfFameSection />
      </div>
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-ink-2">RECORD BOOK</p>
        <RecordBookSection />
      </div>
    </div>
  );
}
