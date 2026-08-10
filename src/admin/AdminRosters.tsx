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
  const [loadError, setLoadError] = useState<string | null>(null);
  const [skaterSaveError, setSkaterSaveError] = useState<string | null>(null);
  const [goalieSaveError, setGoalieSaveError] = useState<string | null>(null);
  const [savingSkaters, setSavingSkaters] = useState(false);
  const [savedSkaters, setSavedSkaters] = useState(false);
  const [savingGoalies, setSavingGoalies] = useState(false);
  const [savedGoalies, setSavedGoalies] = useState(false);
  const [skaterRows, setSkaterRows] = useState<Row[]>([]);
  const [goalieRows, setGoalieRows] = useState<Row[]>([]);

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

  const saveAll = async (
    rows: Row[],
    editableKeys: readonly string[],
    label: string,
    setSaving: (v: boolean) => void,
    setSaved: (v: boolean) => void,
    setSaveError: (v: string | null) => void,
  ) => {
    if (!lines || !sha || rows.length === 0) return;
    setSaving(true);
    setSaveError(null);
    try {
      const nextLines = [...lines];
      for (const row of rows) {
        let newLine = nextLines[row.lineIndex];
        for (const key of editableKeys) {
          newLine = setLineField(newLine, key, row.values[key] as any);
        }
        nextLines[row.lineIndex] = newLine;
      }
      const newSha = await commitFile(PATH, nextLines.join("\n"), sha, `Update ${label} roster info`);
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

  if (loading) return <p className="text-sm text-ink-2">Loading rosters…</p>;
  if (loadError) return <p className="text-sm text-red-400">{loadError}</p>;

  const skaterEditableKeys = ["number", ...SKATER_NUMBER_FIELDS, "overall", "xFactor", "star", "flag"];
  const goalieEditableKeys = ["number", ...GOALIE_NUMBER_FIELDS, "overall", "xFactor", "star", "flag"];

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
              <th className="px-2 py-3 text-center font-semibold">#</th>
              {SKATER_NUMBER_FIELDS.map((f) => (
                <th key={f} className="px-2 py-3 text-center font-semibold">
                  {f.toUpperCase()}
                </th>
              ))}
              <th className="px-2 py-3 text-center font-semibold">OVR</th>
              <th className="px-2 py-3 text-center font-semibold">X-FACTOR</th>
              <th className="px-2 py-3 text-center font-semibold">STAR</th>
              <th className="px-2 py-3 text-center font-semibold">FLAG</th>
            </tr>
          </thead>
          <tbody>
            {skaterRows.map((row) => (
              <tr key={row.id} className="border-b border-line/60 last:border-b-0">
                <td className="px-4 py-3 font-medium text-ink-0">{row.name}</td>
                <td className="px-2 py-3 text-center">
                  <input
                    type="number"
                    value={(row.values.number as number) ?? 0}
                    onChange={(e) => updateField(setSkaterRows, row.id, "number", Number(e.target.value))}
                    className="w-14 border border-line bg-bg-1 px-1.5 py-1 text-center text-ink-0 outline-none focus:border-line-strong"
                  />
                </td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {skaterRows.length > 0 && (
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              saveAll(
                skaterRows,
                skaterEditableKeys,
                "skater",
                setSavingSkaters,
                setSavedSkaters,
                setSkaterSaveError,
              )
            }
            disabled={savingSkaters}
            className="border border-line-strong bg-white px-5 py-2.5 text-xs font-semibold tracking-[0.15em] text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {savingSkaters ? "SAVING…" : savedSkaters ? "SAVED ✓" : "SAVE ALL SKATERS"}
          </button>
          {skaterSaveError && <p className="text-xs text-red-400">{skaterSaveError}</p>}
        </div>
      )}

      <p className="mb-3 mt-10 text-xs font-semibold tracking-[0.2em] text-ink-2">GOALIES</p>
      <div className="overflow-x-auto border border-line bg-bg-2">
        <table className="w-full min-w-[1100px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-xs tracking-[0.15em] text-ink-3">
              <th className="px-4 py-3 text-left font-semibold">PLAYER</th>
              <th className="px-2 py-3 text-center font-semibold">#</th>
              {GOALIE_NUMBER_FIELDS.map((f) => (
                <th key={f} className="px-2 py-3 text-center font-semibold">
                  {f.toUpperCase()}
                </th>
              ))}
              <th className="px-2 py-3 text-center font-semibold">OVR</th>
              <th className="px-2 py-3 text-center font-semibold">X-FACTOR</th>
              <th className="px-2 py-3 text-center font-semibold">STAR</th>
              <th className="px-2 py-3 text-center font-semibold">FLAG</th>
            </tr>
          </thead>
          <tbody>
            {goalieRows.map((row) => (
              <tr key={row.id} className="border-b border-line/60 last:border-b-0">
                <td className="px-4 py-3 font-medium text-ink-0">{row.name}</td>
                <td className="px-2 py-3 text-center">
                  <input
                    type="number"
                    value={(row.values.number as number) ?? 0}
                    onChange={(e) => updateField(setGoalieRows, row.id, "number", Number(e.target.value))}
                    className="w-14 border border-line bg-bg-1 px-1.5 py-1 text-center text-ink-0 outline-none focus:border-line-strong"
                  />
                </td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {goalieRows.length > 0 && (
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              saveAll(
                goalieRows,
                goalieEditableKeys,
                "goalie",
                setSavingGoalies,
                setSavedGoalies,
                setGoalieSaveError,
              )
            }
            disabled={savingGoalies}
            className="border border-line-strong bg-white px-5 py-2.5 text-xs font-semibold tracking-[0.15em] text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {savingGoalies ? "SAVING…" : savedGoalies ? "SAVED ✓" : "SAVE ALL GOALIES"}
          </button>
          {goalieSaveError && <p className="text-xs text-red-400">{goalieSaveError}</p>}
        </div>
      )}
    </div>
  );
}
