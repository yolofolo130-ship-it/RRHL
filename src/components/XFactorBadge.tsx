import { useState } from "react";
import { xFactorAbilities } from "@/data/xfactors";
import AbilityDetailModal from "@/components/AbilityDetailModal";

interface XFactorBadgeProps {
  name: string;
  size?: "sm" | "lg";
}

// Renders nothing if the ability has no icon registered yet in
// data/xfactors.ts, so setting `xFactor` on a player is safe before the
// image has been added. Click the icon to see the ability's description.
export default function XFactorBadge({ name, size = "sm" }: XFactorBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ability = xFactorAbilities[name];
  if (!ability) return null;

  const dims = size === "lg" ? "h-16 w-16" : "h-9 w-9";

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        title={`Player Ability: ${name}`}
        className={`${dims} shrink-0 cursor-pointer`}
      >
        <img src={ability.icon} alt={name} className="h-full w-full object-contain" />
      </button>
      {isOpen && (
        <AbilityDetailModal
          name={name}
          icon={ability.icon}
          description={ability.description}
          tierLabel="X-FACTOR ABILITY"
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
