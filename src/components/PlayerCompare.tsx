import { useState } from "react";
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

export default function PlayerCompare({ current }: PlayerCompareProps) {
  const [slots, setSlots] = useState<(string | null)[]>(Array(MAX_ADDED).fill(null));

  const candidates = (
    current.kind === "skater" ? skaters : goalies
  )
    .filter((p) => p.id !== current.id)
    .map((p) => ({ ...p, kind: current.kind })) as ComparablePlayer[];

  if (candidates.length === 0) return null;

  const selected = slots
    .map((id) => candidates.find((c) => c.id === id))
    .filter((p): p is ComparablePlayer => Boolean(p));

  const columns = [current, ...selected];
  const rowLabels = statsFor(current).map((s) => s.label);

  const updateSlot = (index: number, id: string) => {
    setSlots((s) => s.map((v, i) => (i === index ? (id || null) : v)));
  };

  return (
    <div>
      <p className="mb-4 mt-14 text-xs font-semibold tracking-[0.2em] text-ink-2">COMPARE PLAYERS</p>
      <div className="flex flex-wrap gap-2">
        {slots.map((slotId, i) => {
          const takenElsewhere = new Set(slots.filter((_, j) => j !== i));
          return (
            <select
              key={i}
              value={slotId ?? ""}
              onChange={(e) => updateSlot(i, e.target.value)}
              className="border border-line bg-bg-2 px-3 py-2 text-xs text-ink-1 outline-none focus:border-line-strong"
            >
              <option value="">+ Add player</option>
              {candidates
                .filter((c) => !takenElsewhere.has(c.id))
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
          );
        })}
      </div>

      {columns.length > 1 && (
        <div className="mt-4 overflow-x-auto border border-line bg-bg-2">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="px-4 py-3" />
                {columns.map((p) => {
                  const headshot = getHeadshotByName(p.name);
                  const team = getTeamById(p.teamId);
                  return (
                    <th key={p.id} className="px-3 py-3 text-center">
                      <Link
                        to={`/players/${playerSlug(p.name)}`}
                        className="flex flex-col items-center gap-2 transition-opacity hover:opacity-80"
                      >
                        {headshot ? (
                          <img
                            src={headshot}
                            alt=""
                            className="h-12 w-12 rounded-full border border-line object-cover"
                          />
                        ) : team ? (
                          <TeamLogo team={team} className="h-10 w-10 opacity-70" />
                        ) : null}
                        <span className="text-xs font-semibold normal-case tracking-normal text-ink-0">
                          {p.name}
                        </span>
                      </Link>
                    </th>
                  );
                })}
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
