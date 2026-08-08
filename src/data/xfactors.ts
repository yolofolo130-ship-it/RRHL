import postToPostIcon from "@/assets/x-factor-logos/TGOD-X-Factor.png";
import backhandBeautyIcon from "@/assets/x-factor-logos/Backhand-Beauty.png";
import unstoppableIcon from "@/assets/x-factor-logos/Unstoppable.png";
import ankleBreakerIcon from "@/assets/x-factor-logos/Ankle-Breaker.png";

// Maps an X-Factor ability name to its icon image. Drop the image in
// src/assets/x-factor-logos/, import it below, and add an entry — then set
// `xFactor: "<name>"` on a player in players.ts to use it.
export const xFactorIcons: Record<string, string> = {
  "Post to Post": postToPostIcon,
  "Backhand Beauty": backhandBeautyIcon,
  Unstoppable: unstoppableIcon,
  "Ankle Breaker": ankleBreakerIcon,
};
