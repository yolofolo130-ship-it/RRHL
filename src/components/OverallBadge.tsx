interface OverallBadgeProps {
  overall: number;
  size?: "sm" | "lg";
}

export default function OverallBadge({ overall, size = "sm" }: OverallBadgeProps) {
  const padding = size === "lg" ? "px-4 py-2" : "px-3 py-1.5";
  const numberSize = size === "lg" ? "text-2xl" : "text-base";
  const labelSize = size === "lg" ? "text-[10px]" : "text-[9px]";

  return (
    <span
      className={`inline-flex shrink-0 flex-col items-center border border-sky-400/40 bg-sky-500/10 ${padding} leading-none`}
      title={`Overall rating: ${overall}`}
    >
      <span className={`font-display font-bold text-sky-300 ${numberSize}`}>{overall}</span>
      <span className={`mt-0.5 font-semibold tracking-[0.2em] text-sky-400/80 ${labelSize}`}>
        OVR
      </span>
    </span>
  );
}
