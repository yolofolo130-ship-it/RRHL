import { useState } from "react";
import { starAbilities } from "@/data/stars";
import AbilityDetailModal from "@/components/AbilityDetailModal";

interface StarBadgeProps {
  name: string;
  size?: "sm" | "lg";
}

// Renders nothing if the ability has no icon registered yet in
// data/stars.ts, so setting `star` on a player is safe before the image
// has been added. Sized a step below XFactorBadge — Star is the tier
// beneath X-Factor. Click the icon to see the ability's description.
export default function StarBadge({ name, size = "sm" }: StarBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ability = starAbilities[name];
  if (!ability) return null;

  const dims = size === "lg" ? "h-12 w-12" : "h-7 w-7";

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
          tierLabel="STAR ABILITY"
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
