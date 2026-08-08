interface OverallBadgeProps {
  overall: number;
  size?: "sm" | "lg";
}

// 95+ overalls get a shimmering icy-blue diamond glow behind the number.
export default function OverallBadge({ overall, size = "sm" }: OverallBadgeProps) {
  const isElite = overall >= 95;
  const padding = size === "lg" ? "px-4 py-2" : "px-3 py-1.5";
  const numberSize = size === "lg" ? "text-2xl" : "text-base";
  const labelSize = size === "lg" ? "text-[10px]" : "text-[9px]";

  const borderColor = isElite ? "border-cyan-300/60" : "border-sky-400/40";
  const bgColor = isElite ? "bg-cyan-500/10" : "bg-sky-500/10";
  const numberColor = isElite ? "text-cyan-200" : "text-sky-300";
  const labelColor = isElite ? "text-cyan-300/80" : "text-sky-400/80";

  return (
    <span
      className={`relative inline-flex shrink-0 flex-col items-center overflow-hidden border ${borderColor} ${bgColor} ${padding} leading-none`}
      title={`Overall rating: ${overall}`}
    >
      {isElite && (
        <span
          className="pointer-events-none absolute -inset-2 animate-diamond-shimmer rounded-full bg-gradient-to-t from-blue-500/70 via-cyan-300/60 to-white/50 blur-md"
          aria-hidden
        />
      )}
      <span className={`relative font-display font-bold ${numberColor} ${numberSize}`}>{overall}</span>
      <span className={`relative mt-0.5 font-semibold tracking-[0.2em] ${labelColor} ${labelSize}`}>
        OVR
      </span>
    </span>
  );
}
