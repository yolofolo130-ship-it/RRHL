import postToPostIcon from "@/assets/x-factor-logos/TGOD-X-Factor.png";

// Maps an X-Factor ability name to its icon image. Drop the image in
// src/assets/x-factor-logos/, import it below, and add an entry — then set
// `xFactor: "<name>"` on a player in players.ts to use it.
export const xFactorIcons: Record<string, string> = {
  "Post to Post": postToPostIcon,
};
