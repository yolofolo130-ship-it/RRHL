import { Link } from "react-router-dom";
import type { Team } from "@/data/types";
import TeamLogo from "./TeamLogo";

interface TeamLogoTileProps {
  team: Team;
}

export default function TeamLogoTile({ team }: TeamLogoTileProps) {
  return (
    <Link
      to={`/teams/${team.id}`}
      className="group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden border border-line bg-bg-2 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-line-strong hover:bg-bg-3"
    >
      <TeamLogo
        team={team}
        className="h-16 w-16 opacity-70 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 sm:h-20 sm:w-20"
      />
      <div className="flex flex-col items-center gap-0.5 text-center opacity-0 transition-all duration-300 group-hover:opacity-100">
        <span className="font-display text-sm font-semibold uppercase tracking-wide text-ink-0">
          {team.name}
        </span>
        <span className="text-[10px] font-semibold tracking-[0.2em] text-ink-3">
          {team.conference === "east" ? "EASTERN CONFERENCE" : "WESTERN CONFERENCE"}
        </span>
      </div>
    </Link>
  );
}
