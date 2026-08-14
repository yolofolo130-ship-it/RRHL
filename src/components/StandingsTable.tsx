import { Link } from "react-router-dom";
import type { TeamStanding } from "@/utils/standings";
import { isPlayoffPosition, PLAYOFF_SPOTS_PER_CONFERENCE } from "@/utils/standings";
import TeamLogo from "./TeamLogo";

interface StandingsTableProps {
  title?: string;
  standings: TeamStanding[];
  variant?: "compact" | "full";
}

export default function StandingsTable({
  title,
  standings,
  variant = "full",
}: StandingsTableProps) {
  return (
    <div className="border border-line bg-bg-2">
      {title && (
        <div className="border-b border-line px-5 py-4">
          <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-ink-0">
            {title}
          </h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-xs tracking-[0.15em] text-ink-3">
              <th className="px-4 py-3 text-left font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">TEAM</th>
              <th className="px-3 py-3 text-center font-semibold">GP</th>
              <th className="px-3 py-3 text-center font-semibold">W</th>
              <th className="px-3 py-3 text-center font-semibold">L</th>
              <th className="px-3 py-3 text-center font-semibold">OTL</th>
              {variant === "full" && (
                <>
                  <th className="px-3 py-3 text-center font-semibold">GF</th>
                  <th className="px-3 py-3 text-center font-semibold">GA</th>
                  <th className="px-3 py-3 text-center font-semibold">DIFF</th>
                </>
              )}
              <th className="px-4 py-3 text-center font-semibold">PTS</th>
              <th className="px-3 py-3 text-center font-semibold">STRK</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row, index) => {
              const rank = index + 1;
              const playoff = isPlayoffPosition(rank);
              return (
                <tr
                  key={row.team.id}
                  className={`border-b border-line/60 last:border-b-0 transition-colors duration-300 hover:bg-white/[0.03] ${
                    playoff ? "bg-white/[0.02]" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex h-5 w-5 items-center justify-center text-xs font-semibold ${
                        playoff ? "text-ink-0" : "text-ink-3"
                      }`}
                    >
                      {rank}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/teams/${row.team.id}`}
                      className="flex items-center gap-3 font-medium text-ink-0 transition-opacity hover:opacity-80"
                    >
                      <TeamLogo team={row.team} className="h-6 w-6 shrink-0" />
                      <span className="whitespace-nowrap">{row.team.name}</span>
                      <span className="text-xs text-ink-3">{row.team.abbr}</span>
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-center text-ink-1">{row.gp}</td>
                  <td className="px-3 py-3 text-center text-ink-1">{row.w}</td>
                  <td className="px-3 py-3 text-center text-ink-1">{row.l}</td>
                  <td className="px-3 py-3 text-center text-ink-1">{row.otl}</td>
                  {variant === "full" && (
                    <>
                      <td className="px-3 py-3 text-center text-ink-1">{row.gf}</td>
                      <td className="px-3 py-3 text-center text-ink-1">{row.ga}</td>
                      <td
                        className={`px-3 py-3 text-center font-semibold ${
                          row.diff > 0 ? "text-emerald-400" : row.diff < 0 ? "text-red-400" : "text-ink-1"
                        }`}
                      >
                        {row.diff > 0 ? `+${row.diff}` : row.diff}
                      </td>
                    </>
                  )}
                  <td className="px-4 py-3 text-center text-base font-bold text-ink-0">
                    {row.pts}
                  </td>
                  <td
                    className={`px-3 py-3 text-center font-semibold ${
                      row.streak?.type === "W" ? "text-emerald-400" : row.streak?.type === "L" ? "text-red-400" : "text-ink-3"
                    }`}
                  >
                    {row.streak ? `${row.streak.type}${row.streak.count}` : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="border-t border-line px-5 py-3 text-[11px] tracking-wide text-ink-3">
        Top {PLAYOFF_SPOTS_PER_CONFERENCE} advance to the playoffs.
      </p>
    </div>
  );
}
