interface OverallBadgeProps {
  overall: number;
  size?: "sm" | "lg";
  className?: string;
}

interface Tier {
  border: string;
  bg: string;
  number: string;
  label: string;
  glow?: boolean;
}

// Rating tiers, highest first. 95+ gets the shimmering diamond glow; the
// rest are flat gold/silver/bronze coloring with no animation, so diamond
// stays the one that visually stands out.
const tierFor = (overall: number): Tier => {
  if (overall >= 95)
    return {
      border: "border-cyan-300/60",
      bg: "bg-cyan-500/10",
      number: "text-cyan-200",
      label: "text-cyan-300/80",
      glow: true,
    };
  if (overall >= 90)
    return {
      border: "border-amber-400/50",
      bg: "bg-amber-500/10",
      number: "text-amber-300",
      label: "text-amber-400/80",
    };
  if (overall >= 85)
    return {
      border: "border-slate-300/45",
      bg: "bg-slate-300/10",
      number: "text-slate-200",
      label: "text-slate-300/70",
    };
  if (overall >= 80)
    return {
      border: "border-orange-700/50",
      bg: "bg-orange-800/10",
      number: "text-orange-400",
      label: "text-orange-600/70",
    };
  return {
    border: "border-sky-400/40",
    bg: "bg-sky-500/10",
    number: "text-sky-300",
    label: "text-sky-400/80",
  };
};

// 95+ overalls get a shimmering icy-blue diamond glow behind the number.
export default function OverallBadge({ overall, size = "sm", className = "" }: OverallBadgeProps) {
  const tier = tierFor(overall);
  const padding = size === "lg" ? "px-4 py-2" : "px-3 py-1.5";
  const numberSize = size === "lg" ? "text-2xl" : "text-base";
  const labelSize = size === "lg" ? "text-[10px]" : "text-[9px]";

  return (
    <span
      className={`relative inline-flex shrink-0 flex-col items-center overflow-hidden border ${tier.border} ${tier.bg} ${padding} leading-none ${className}`}
      title={`Overall rating: ${overall}`}
    >
      {tier.glow && (
        <span
          className="pointer-events-none absolute -inset-2 animate-diamond-shimmer rounded-full bg-gradient-to-t from-blue-500/70 via-cyan-300/60 to-white/50 blur-md"
          aria-hidden
        />
      )}
      <span className={`relative font-display font-bold ${tier.number} ${numberSize}`}>{overall}</span>
      <span className={`relative mt-0.5 font-semibold tracking-[0.2em] ${tier.label} ${labelSize}`}>
        OVR
      </span>
    </span>
  );
}
