import starsLogo from "@/assets/x-factor-logos/stars-logo.png";

interface StarLogoProps {
  size?: "sm" | "lg";
}

// The generic Star brand mark — shown once per player with a Star ability,
// separate from their specific ability icon (see StarBadge). Sized to
// match XFactorLogo/FlagBadge so the row lines up evenly.
export default function StarLogo({ size = "sm" }: StarLogoProps) {
  const dims = size === "lg" ? "h-8 w-8" : "h-5 w-5";

  return (
    <img
      src={starsLogo}
      alt="Star"
      title="Star"
      className={`${dims} shrink-0 object-contain`}
    />
  );
}
