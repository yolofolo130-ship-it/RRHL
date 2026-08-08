import { xFactorIcons } from "@/data/xfactors";

interface XFactorBadgeProps {
  name: string;
  size?: "sm" | "lg";
}

// Renders nothing if the ability has no icon registered yet in
// data/xfactors.ts, so setting `xFactor` on a player is safe before the
// image has been added.
export default function XFactorBadge({ name, size = "sm" }: XFactorBadgeProps) {
  const icon = xFactorIcons[name];
  if (!icon) return null;

  const dims = size === "lg" ? "h-16 w-16" : "h-9 w-9";

  return (
    <span
      className="inline-flex shrink-0 items-center justify-center border border-purple-400/40 bg-purple-500/10 p-1.5"
      title={`X-Factor: ${name}`}
    >
      <img src={icon} alt={name} className={`${dims} object-contain`} />
    </span>
  );
}
