import { starIcons } from "@/data/stars";

interface StarBadgeProps {
  name: string;
  size?: "sm" | "lg";
}

// Renders nothing if the ability has no icon registered yet in
// data/stars.ts, so setting `star` on a player is safe before the image
// has been added. Sized a step below XFactorBadge — Star is the tier
// beneath X-Factor.
export default function StarBadge({ name, size = "sm" }: StarBadgeProps) {
  const icon = starIcons[name];
  if (!icon) return null;

  const dims = size === "lg" ? "h-12 w-12" : "h-7 w-7";

  return (
    <img
      src={icon}
      alt={name}
      title={`Star: ${name}`}
      className={`${dims} shrink-0 object-contain`}
    />
  );
}
