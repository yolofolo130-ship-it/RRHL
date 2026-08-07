import type { Team } from "@/data/types";

interface TeamLogoProps {
  team: Team;
  className?: string;
}

export default function TeamLogo({ team, className = "h-12 w-12" }: TeamLogoProps) {
  return (
    <img
      src={team.logo}
      alt={`${team.name} logo`}
      className={`${className} object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]`}
      loading="lazy"
    />
  );
}
