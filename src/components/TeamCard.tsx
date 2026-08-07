import { Link } from "react-router-dom";
import type { Team } from "@/data/types";
import type { TeamStanding } from "@/utils/standings";
import TeamLogo from "./TeamLogo";

interface TeamCardProps {
  team: Team;
  standing?: TeamStanding;
}

export default function TeamCard({ team, standing }: TeamCardProps) {
  return (
    <Link
      to={`/teams/${team.id}`}
      className="group relative flex flex-col gap-6 overflow-hidden border border-line bg-bg-2 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-line-strong"
      style={{ ["--team-color" as string]: team.color }}
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] scale-x-0 bg-[var(--team-color)] transition-transform duration-300 group-hover:scale-x-100" />

      <div className="flex items-center justify-between">
        <TeamLogo
          team={team}
          className="h-16 w-16 transition-transform duration-300 group-hover:scale-105"
        />
        <span className="text-[10px] font-semibold tracking-[0.2em] text-ink-3">
          {team.conference === "east" ? "EASTERN" : "WESTERN"}
        </span>
      </div>

      <div>
        <p className="font-display text-2xl font-semibold uppercase leading-tight tracking-wide text-ink-0">
          {team.name}
        </p>
        <p className="text-xs font-semibold tracking-[0.2em] text-ink-3">{team.abbr}</p>
      </div>

      {standing && (
        <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
          <span className="text-xs tracking-wide text-ink-2">
            {standing.w}-{standing.l}-{standing.otl}
          </span>
          <span className="font-display text-lg font-semibold text-ink-0">
            {standing.pts} PTS
          </span>
        </div>
      )}
    </Link>
  );
}
