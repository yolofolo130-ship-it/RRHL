import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Skater, Goalie } from "@/data/types";
import {
  skaters,
  goalies,
  playerSlug,
  skaterPoints,
  goalieSavePct,
  goalieGaa,
  goalieShotsAgainst,
  getHeadshotByName,
} from "@/data/players";
import { getTeamById } from "@/data/teams";
import { formatSavePct } from "@/utils/format";
import TeamLogo from "./TeamLogo";

type ComparablePlayer = ({ kind: "skater" } & Skater) | ({ kind: "goalie" } & Goalie);

interface PlayerCompareProps {
  current: ComparablePlayer;
}

const MAX_ADDED = 3;
const SIMILAR_COUNT = 6;

function statsFor(p: ComparablePlayer): { label: string; value: string | number }[] {
  if (p.kind === "skater") {
    return [
      { label: "GP", value: p.gp },
      { label: "G", value: p.goals },
      { label: "A", value: p.assists },
      { label: "PTS", value: skaterPoints(p) },
      { label: "PIM", value: p.pim },
    ];
  }
  return [
    { label: "GP", value: p.gp },
    { label: "W", value: p.wins },
    { label: "L", value: p.losses },
    { label: "OTL", value: p.otLosses },
    { label: "SAVES", value: p.saves },
    { label: "GA", value: p.goalsAgainst },
    { label: "SV%", value: goalieShotsAgainst(p) > 0 ? formatSavePct(goalieSavePct(p)) : "—" },
    { label: "GAA", value: p.gp > 0 ? goalieGaa(p).toFixed(2) : "—" },
  ];
}

// Per-game rate stats so a similarity check isn't just "who has played the
// most games" — goalies compare on rate stats (SV%, GAA) directly since
// those are already rate-based.
function vectorFor(p: ComparablePlayer): number[] {
  if (p.kind === "skater") {
    const gp = Math.max(p.gp, 1);
    return [p.goals / gp, p.assists / gp, p.pim / gp];
  }
  const sa = goalieShotsAgainst(p);
  return [sa > 0 ? goalieSavePct(p) : 0, p.gp > 0 ? goalieGaa(p) : 0];
}

// 0-100 "match" score per candidate: average per-dimension closeness,
// each dimension normalized against the actual spread across the pool
// (a player with a 5-goal edge means a lot in a 0-8 goals/gp league, not
// much in a 0-40 one).
function similarityScores(current: ComparablePlayer, pool: ComparablePlayer[]): Map<string, number> {
  const currentVec = vectorFor(current);
  const poolVecs = pool.map((p) => ({ id: p.id, vec: vectorFor(p) }));
  const ranges = currentVec.map((_, d) => {
    const values = [currentVec[d], ...poolVecs.map((v) => v.vec[d])];
    return Math.max(...values) - Math.min(...values);
  });

  const scores = new Map<string, number>();
  for (const { id, vec } of poolVecs) {
    let total = 0;
    for (let d = 0; d < currentVec.length; d++) {
      const range = ranges[d];
      total += range > 0 ? 1 - Math.min(1, Math.abs(currentVec[d] - vec[d]) / range) : 1;
    }
    scores.set(id, Math.round((total / currentVec.length) * 100));
  }
  return scores;
}

function PlayerAvatar({ player, size = "h-9 w-9" }: { player: ComparablePlayer; size?: string }) {
  const headshot = getHeadshotByName(player.name);
  const team = getTeamById(player.teamId);
  if (headshot) {
    return <img src={headshot} alt="" className={`${size} shrink-0 rounded-full border border-line object-cover`} />;
  }
  if (team) {
    return <TeamLogo team={team} className={`${size} shrink-0 opacity-70`} />;
  }
  return <span className={`${size} shrink-0 rounded-full border border-line bg-bg-1`} />;
}

export default function PlayerCompare({ current }: PlayerCompareProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [showSimilar, setShowSimilar] = useState(false);

  const candidates = (current.kind === "skater" ? skaters : goalies)
    .filter((p) => p.id !== current.id)
    .map((p) => ({ ...p, kind: current.kind })) as ComparablePlayer[];

  const scores = useMemo(() => similarityScores(current, candidates), [current, candidates]);

  if (candidates.length === 0) return null;

  const selected = selectedIds
    .map((id) => candidates.find((c) => c.id === id))
    .filter((p): p is ComparablePlayer => Boolean(p));
  const columns = [current, ...selected];
  const rowLabels = statsFor(current).map((s) => s.label);
  const atLimit = selectedIds.length >= MAX_ADDED;

  const addPlayer = (id: string) => {
    if (atLimit || selectedIds.includes(id)) return;
    setSelectedIds((ids) => [...ids, id]);
    setQuery("");
  };
  const removePlayer = (id: string) => {
    setSelectedIds((ids) => ids.filter((x) => x !== id));
  };

  const searchResults = query.trim()
    ? candidates
        .filter(
          (c) => !selectedIds.includes(c.id) && c.name.toLowerCase().includes(query.trim().toLowerCase()),
        )
        .slice(0, 8)
    : [];

  const similarList = [...candidates]
    .filter((c) => !selectedIds.includes(c.id))
    .sort((a, b) => (scores.get(b.id) ?? 0) - (scores.get(a.id) ?? 0))
    .slice(0, SIMILAR_COUNT);

  return (
    <div>
      <p className="mb-1 mt-14 text-xs font-semibold tracking-[0.2em] text-ink-2">COMPARE PLAYERS</p>
      <p className="mb-4 text-sm text-ink-3">
        Add up to {MAX_ADDED} other {current.kind === "skater" ? "skaters" : "goalies"} to compare against{" "}
        {current.name}.
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 border border-line-strong bg-bg-2 py-1.5 pl-1.5 pr-3 text-xs font-semibold text-ink-0">
          <PlayerAvatar player={current} size="h-6 w-6" />
          {current.name}
        </span>
        {selected.map((p) => (
          <span
            key={p.id}
            className="inline-flex items-center gap-2 border border-line bg-bg-2 py-1.5 pl-1.5 pr-2 text-xs font-semibold text-ink-1"
          >
            <PlayerAvatar player={p} size="h-6 w-6" />
            {p.name}
            <button
              type="button"
              onClick={() => removePlayer(p.id)}
              aria-label={`Remove ${p.name} from comparison`}
              className="ml-1 text-ink-3 transition-colors hover:text-ink-0"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={atLimit ? `Limit of ${MAX_ADDED} reached` : "Search players to add…"}
          disabled={atLimit}
          className="min-w-[220px] flex-1 border border-line bg-bg-2 px-4 py-2.5 text-sm text-ink-0 outline-none placeholder:text-ink-3 focus:border-line-strong disabled:opacity-50"
        />
        <button
          type="button"
          onClick={() => setShowSimilar((v) => !v)}
          className={`border px-4 py-2.5 text-xs font-semibold tracking-[0.1em] transition-colors ${
            showSimilar
              ? "border-line-strong bg-white text-black"
              : "border-line text-ink-1 hover:border-line-strong hover:text-ink-0"
          }`}
        >
          SIMILAR PLAYERS
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="mt-2 border border-line bg-bg-2">
          {searchResults.map((c) => {
            const team = getTeamById(c.teamId);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => addPlayer(c.id)}
                className="flex w-full items-center gap-3 border-b border-line/60 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-white/[0.03]"
              >
                <PlayerAvatar player={c} />
                <span>
                  <span className="block text-sm font-semibold text-ink-0">{c.name}</span>
                  {team && <span className="block text-xs text-ink-3">{team.name}</span>}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {showSimilar && (
        <div className="mt-4 border border-line bg-bg-2">
          <p className="border-b border-line px-4 py-3 text-[11px] font-semibold tracking-[0.15em] text-ink-2">
            PLAYERS WITH SIMILAR STATS TO {current.name.toUpperCase()}
          </p>
          {similarList.map((c) => {
            const team = getTeamById(c.teamId);
            const disabled = atLimit;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => addPlayer(c.id)}
                disabled={disabled}
                className="flex w-full items-center gap-3 border-b border-line/60 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-white/[0.03] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <PlayerAvatar player={c} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-ink-0">{c.name}</span>
                  {team && <span className="block text-xs text-ink-3">{team.name}</span>}
                </span>
                <span className="shrink-0 border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                  {scores.get(c.id) ?? 0}% match
                </span>
              </button>
            );
          })}
        </div>
      )}

      {columns.length > 1 && (
        <div className="mt-6 overflow-x-auto border border-line bg-bg-2">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="px-4 py-3" />
                {columns.map((p) => (
                  <th key={p.id} className="px-3 py-3 text-center">
                    <Link
                      to={`/players/${playerSlug(p.name)}`}
                      className="flex flex-col items-center gap-2 transition-opacity hover:opacity-80"
                    >
                      <PlayerAvatar player={p} size="h-12 w-12" />
                      <span className="text-xs font-semibold normal-case tracking-normal text-ink-0">
                        {p.name}
                      </span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowLabels.map((label) => (
                <tr key={label} className="border-b border-line/60 last:border-b-0">
                  <td className="px-4 py-3 text-xs font-semibold tracking-[0.1em] text-ink-3">{label}</td>
                  {columns.map((p) => {
                    const stat = statsFor(p).find((s) => s.label === label);
                    return (
                      <td key={p.id} className="px-3 py-3 text-center font-semibold text-ink-1">
                        {stat?.value ?? "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
