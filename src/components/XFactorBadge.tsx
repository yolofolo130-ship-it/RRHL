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
    <img
      src={icon}
      alt={name}
      title={`X-Factor: ${name}`}
      className={`${dims} shrink-0 object-contain`}
    />
  );
}
