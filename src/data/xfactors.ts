import type { AbilityInfo } from "./types";
import postToPostIcon from "@/assets/x-factor-logos/Post-To-Post.png";
import backhandBeautyIcon from "@/assets/x-factor-logos/Backhand-Beauty.png";
import unstoppableIcon from "@/assets/x-factor-logos/Unstoppable.png";
import ankleBreakerIcon from "@/assets/x-factor-logos/Ankle-Breaker.png";

// Maps an X-Factor ability name to its icon + description. Drop the image
// in src/assets/x-factor-logos/, import it below, and add an entry — then
// set `xFactor: "<name>"` on a player in players.ts to use it. Clicking
// the badge on a player's page shows the description.
export const xFactorAbilities: Record<string, AbilityInfo> = {
  "Post to Post": { icon: postToPostIcon, description: "" },
  "Backhand Beauty": { icon: backhandBeautyIcon, description: "" },
  Unstoppable: { icon: unstoppableIcon, description: "" },
  "Ankle Breaker": { icon: ankleBreakerIcon, description: "" },
};
