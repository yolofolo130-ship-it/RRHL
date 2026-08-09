import { useEffect, useState } from "react";
import { getFile, commitFile } from "@/admin/github";
import { findArrayRange, isEntryLine, parseLineKV, setLineField, type KV } from "@/admin/lines";
import { teams } from "@/data/teams";
import { xFactorAbilities } from "@/data/xfactors";
import { starAbilities } from "@/data/stars";
import { flagIcons } from "@/data/flags";

const PATH = "src/data/players.ts";
const XFACTOR_OPTIONS = Object.keys(xFactorAbilities);
const STAR_OPTIONS = Object.keys(starAbilities);
const FLAG_OPTIONS = Object.keys(flagIcons);

const SKATER_NUMBER_FIELDS = ["gp", "goals", "assists", "pim"] as const;
const GOALIE_NUMBER_FIELDS = [
  "gp",
  "gs",
  "wins",
  "losses",
  "otLosses",
  "saves",
  "goalsAgainst",
  "shutouts",
  "goals",
  "assists",
  "pim",
] as const;

interface Row {
  lineIndex: number;
  id: string;
  name: string;
  values: KV;
}

function AbilityFlagSelects({
  values,
  onChange,
}: {
  values: KV;
  onChange: (key: string, value: string | undefined) => void;
}) {
  return (
    <>
      <td className="px-2 py-3 text-center">
        <select
          value={(values.overall as number | undefined) ?? ""}
          onChange={(e) => onChange("overall", e.target.value === "" ? undefined : e.target.value)}
          className="w-16 border border-line bg-bg-1 px-1 py-1 text-center text-ink-0 outline-none focus:border-line-strong"
        >
          <option value="">—</option>
          {Array.from({ length: 30 }, (_, i) => 70 + i).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </td>
      <td className="px-2 py-3 text-center">
        <select
          value={(values.xFactor as string | undefined) ?? ""}
          onChange={(e) => onChange("xFactor", e.target.value || undefined)}
          className="border border-line bg-bg-1 px-1 py-1 text-ink-0 outline-none focus:border-line-strong"
        >
          <option value="">—</option>
          {XFACTOR_OPTIONS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </td>
      <td className="px-2 py-3 text-center">
        <select
          value={(values.star as string | undefined) ?? ""}
          onChange={(e) => onChange("star", e.target.value || undefined)}
          className="border border-line bg-bg-1 px-1 py-1 text-ink-0 outline-none focus:border-line-strong"
        >
          <option value="">—</option>
          {STAR_OPTIONS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </td>
      <td className="px-2 py-3 text-center">
        <select
          value={(values.flag as string | undefined) ?? ""}
          onChange={(e) => onChange("flag", e.target.value || undefined)}
          className="border border-line bg-bg-1 px-1 py-1 text-ink-0 outline-none focus:border-line-strong"
        >
          <option value="">—</option>
          {FLAG_OPTIONS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </td>
    </>
  );
}

export default function AdminRosters() {
  const [teamId, setTeamId] = useState(teams[0]?.id ?? "");
  const [sha, setSha] = useState<string | null>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [skaterRows, setSkaterRows] = useState<Row[]>([]);
  const [goalieRows, setGoalieRows] = useState<Row[]>([]);

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
    if (!lines) return;
    const buildRows = (openMarker: string): Row[] => {
      const { start, end } = findArrayRange(lines, openMarker);
      const rows: Row[] = [];
      for (let i = start + 1; i < end; i++) {
        if (!isEntryLine(lines[i])) continue;
        const kv = parseLineKV(lines[i]);
        if (kv.teamId !== teamId) continue;
        rows.push({ lineIndex: i, id: kv.id as string, name: kv.name as string, values: kv });
      }
      return rows;
    };
    setSkaterRows(buildRows("export const skaters"));
    setGoalieRows(buildRows("export const goalies"));
  }, [lines, teamId]);

  const updateField = (
    setRows: React.Dispatch<React.SetStateAction<Row[]>>,
    id: string,
    key: string,
    value: string | number | boolean | undefined,
  ) => {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, values: { ...r.values, [key]: value as any } } : r)));
  };

  const save = async (row: Row, editableKeys: readonly string[]) => {
    if (!lines || !sha) return;
    setSavingId(row.id);
    setError(null);
    try {
      let newLine = lines[row.lineIndex];
      for (const key of editableKeys) {
        newLine = setLineField(newLine, key, row.values[key] as any);
      }
      const nextLines = [...lines];
      nextLines[row.lineIndex] = newLine;
      const newSha = await commitFile(PATH, nextLines.join("\n"), sha, `Update ${row.name}'s roster info`);
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

  if (loading) return <p className="text-sm text-ink-2">Loading rosters…</p>;
  if (error) return <p className="text-sm text-red-400">{error}</p>;

  const skaterEditableKeys = [...SKATER_NUMBER_FIELDS, "overall", "xFactor", "star", "flag"];
  const goalieEditableKeys = [...GOALIE_NUMBER_FIELDS, "overall", "xFactor", "star", "flag"];

  return (
    <div>
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

      <p className="mb-3 mt-8 text-xs font-semibold tracking-[0.2em] text-ink-2">SKATERS</p>
      <div className="overflow-x-auto border border-line bg-bg-2">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-xs tracking-[0.15em] text-ink-3">
              <th className="px-4 py-3 text-left font-semibold">PLAYER</th>
              {SKATER_NUMBER_FIELDS.map((f) => (
                <th key={f} className="px-2 py-3 text-center font-semibold">
                  {f.toUpperCase()}
                </th>
              ))}
              <th className="px-2 py-3 text-center font-semibold">OVR</th>
              <th className="px-2 py-3 text-center font-semibold">X-FACTOR</th>
              <th className="px-2 py-3 text-center font-semibold">STAR</th>
              <th className="px-2 py-3 text-center font-semibold">FLAG</th>
              <th className="px-4 py-3 text-center font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {skaterRows.map((row) => (
              <tr key={row.id} className="border-b border-line/60 last:border-b-0">
                <td className="px-4 py-3 font-medium text-ink-0">{row.name}</td>
                {SKATER_NUMBER_FIELDS.map((f) => (
                  <td key={f} className="px-2 py-3 text-center">
                    <input
                      type="number"
                      value={(row.values[f] as number) ?? 0}
                      onChange={(e) => updateField(setSkaterRows, row.id, f, Number(e.target.value))}
                      className="w-14 border border-line bg-bg-1 px-1.5 py-1 text-center text-ink-0 outline-none focus:border-line-strong"
                    />
                  </td>
                ))}
                <AbilityFlagSelects
                  values={row.values}
                  onChange={(key, value) => updateField(setSkaterRows, row.id, key, value)}
                />
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => save(row, skaterEditableKeys)}
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

      <p className="mb-3 mt-10 text-xs font-semibold tracking-[0.2em] text-ink-2">GOALIES</p>
      <div className="overflow-x-auto border border-line bg-bg-2">
        <table className="w-full min-w-[1100px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-xs tracking-[0.15em] text-ink-3">
              <th className="px-4 py-3 text-left font-semibold">PLAYER</th>
              {GOALIE_NUMBER_FIELDS.map((f) => (
                <th key={f} className="px-2 py-3 text-center font-semibold">
                  {f.toUpperCase()}
                </th>
              ))}
              <th className="px-2 py-3 text-center font-semibold">OVR</th>
              <th className="px-2 py-3 text-center font-semibold">X-FACTOR</th>
              <th className="px-2 py-3 text-center font-semibold">STAR</th>
              <th className="px-2 py-3 text-center font-semibold">FLAG</th>
              <th className="px-4 py-3 text-center font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {goalieRows.map((row) => (
              <tr key={row.id} className="border-b border-line/60 last:border-b-0">
                <td className="px-4 py-3 font-medium text-ink-0">{row.name}</td>
                {GOALIE_NUMBER_FIELDS.map((f) => (
                  <td key={f} className="px-2 py-3 text-center">
                    <input
                      type="number"
                      value={(row.values[f] as number) ?? 0}
                      onChange={(e) => updateField(setGoalieRows, row.id, f, Number(e.target.value))}
                      className="w-14 border border-line bg-bg-1 px-1.5 py-1 text-center text-ink-0 outline-none focus:border-line-strong"
                    />
                  </td>
                ))}
                <AbilityFlagSelects
                  values={row.values}
                  onChange={(key, value) => updateField(setGoalieRows, row.id, key, value)}
                />
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => save(row, goalieEditableKeys)}
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
    </div>
  );
}
