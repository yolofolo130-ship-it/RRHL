import { flagIcons } from "@/data/flags";

interface FlagBadgeProps {
  name: string;
  size?: "sm" | "lg";
}

// Renders nothing if the flag has no icon registered yet in data/flags.ts,
// so setting `flag` on a player is safe before the image has been added.
// Sized well below XFactorBadge at the same size prop — a flag reads as a
// small nationality marker, not a headline icon.
export default function FlagBadge({ name, size = "sm" }: FlagBadgeProps) {
  const icon = flagIcons[name];
  if (!icon) return null;

  const dims = size === "lg" ? "h-8 w-8" : "h-5 w-5";

  return (
    <img
      src={icon}
      alt={name}
      title={name}
      className={`${dims} shrink-0 object-contain`}
    />
  );
}
