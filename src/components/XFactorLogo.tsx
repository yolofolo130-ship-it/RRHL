import xFactorLogo from "@/assets/x-factor-logos/X-Factor-Logo.png";

interface XFactorLogoProps {
  size?: "sm" | "lg";
}

// The generic X-Factor brand mark — shown once per rated player, separate
// from their specific ability icon (see XFactorBadge). Sized to match
// FlagBadge so the two sit evenly next to each other.
export default function XFactorLogo({ size = "sm" }: XFactorLogoProps) {
  const dims = size === "lg" ? "h-8 w-8" : "h-5 w-5";

  return (
    <img
      src={xFactorLogo}
      alt="X-Factor"
      title="X-Factor"
      className={`${dims} shrink-0 object-contain`}
    />
  );
}
