import type { AbilityInfo } from "./types";
import quickReleaseIcon from "@/assets/x-factor-logos/Quick-Release-AllStars.png";
import warriorIcon from "@/assets/x-factor-logos/Warrior-AllStars.png";
import truculenceIcon from "@/assets/x-factor-logos/Truculence-AllStar.png";
import oneTIcon from "@/assets/x-factor-logos/One-T-AllStars.png";
import wheelsIcon from "@/assets/x-factor-logos/Wheels-AllStars.png";
import dialedInIcon from "@/assets/x-factor-logos/Dialed-In-AllStars.png";
import spongeIcon from "@/assets/x-factor-logos/Sponge-AllStars.png";

// Maps a Star ability name to its icon + description. Star is a tier below
// X-Factor (typically ~88-93 OVR). Drop the image in
// src/assets/x-factor-logos/ (shared with X-Factor icons), import it
// below, and add an entry — then set `star: "<name>"` on a player in
// players.ts to use it. Clicking the badge on a player's page shows the
// description.
export const starAbilities: Record<string, AbilityInfo> = {
  "Quick Release": { icon: quickReleaseIcon, description: "" },
  Warrior: { icon: warriorIcon, description: "" },
  Truculence: { icon: truculenceIcon, description: "" },
  "One-T": { icon: oneTIcon, description: "" },
  Wheels: { icon: wheelsIcon, description: "" },
  "Dialed In": { icon: dialedInIcon, description: "" },
  Sponge: { icon: spongeIcon, description: "" },
};
