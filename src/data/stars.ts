import type { AbilityInfo } from "./types";

// Maps a Star ability name to its icon + description. Star is a tier below
// X-Factor (typically ~88-93 OVR). Drop the image in src/assets/star-logos/,
// import it below, and add an entry — then set `star: "<name>"` on a player
// in players.ts to use it. Clicking the badge on a player's page shows the
// description.
export const starAbilities: Record<string, AbilityInfo> = {};
