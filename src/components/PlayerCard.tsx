import TeamLogo from "@/components/TeamLogo";
import XFactorBadge from "@/components/XFactorBadge";
import { getTeamById } from "@/data/teams";

interface PlayerCardProps {
  name: string;
  number: number;
  position: string;
  teamId: string;
  overall: number;
  xFactor?: string;
}

interface Tier {
  label: string;
  border: string;
  wash: string;
  accent: string;
  glow?: boolean;
}

// Mirrors an NHL-video-game-style rating tier, topping out in the same
// icy-blue diamond shimmer as OverallBadge's 95+.
const tierFor = (overall: number): Tier => {
  if (overall >= 95)
    return {
      label: "DIAMOND",
      border: "border-cyan-300/60",
      wash: "from-cyan-400/15",
      accent: "text-cyan-200",
      glow: true,
    };
  if (overall >= 90)
    return {
      label: "GOLD",
      border: "border-amber-400/50",
      wash: "from-amber-400/12",
      accent: "text-amber-300",
    };
  if (overall >= 85)
    return {
      label: "SILVER",
      border: "border-slate-300/45",
      wash: "from-slate-300/10",
      accent: "text-slate-200",
    };
  return {
    label: "BRONZE",
    border: "border-amber-800/60",
    wash: "from-amber-700/12",
    accent: "text-amber-600",
  };
};

export default function PlayerCard({
  name,
  number,
  position,
  teamId,
  overall,
  xFactor,
}: PlayerCardProps) {
  const team = getTeamById(teamId);
  const tier = tierFor(overall);

  return (
    <div
      className={`relative w-[240px] shrink-0 overflow-hidden border ${tier.border} bg-gradient-to-b ${tier.wash} to-bg-2 bg-bg-2 p-5`}
    >
      {tier.glow && (
        <span
          className="pointer-events-none absolute -inset-6 animate-diamond-shimmer rounded-full bg-gradient-to-t from-blue-500/40 via-cyan-300/35 to-white/30 blur-2xl"
          aria-hidden
        />
      )}
      {team && (
        <TeamLogo
          team={team}
          className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 opacity-[0.08]"
        />
      )}

      <div className="relative flex items-start justify-between">
        <div className="flex flex-col leading-none">
          <span className={`font-display text-5xl font-bold ${tier.accent}`}>{overall}</span>
          <span className="mt-1.5 text-xs font-semibold tracking-[0.2em] text-ink-2">
            {position}
          </span>
        </div>
        {xFactor && <XFactorBadge name={xFactor} />}
      </div>

      <div className="relative mt-10">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-ink-3">#{number}</p>
        <p className="font-display text-2xl font-bold uppercase leading-tight tracking-wide text-ink-0">
          {name}
        </p>
        <p className={`mt-1.5 text-[10px] font-semibold tracking-[0.35em] ${tier.accent}`}>
          {tier.label}
        </p>
      </div>
    </div>
  );
}
