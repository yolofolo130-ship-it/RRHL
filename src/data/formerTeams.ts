import type { FormerTeam } from "./types";

// Franchises that no longer exist (folded, not any of the current 10 teams).
// Add an entry here before pointing a TeamSeasonHonor's teamId at it.
// logo/color are optional — without them a plain placeholder box is shown
// instead of a crest. To add a logo: drop the image in src/assets/logos/
// (same folder as the current teams), then:
// import someLogo from "@/assets/logos/some-team.png";
// { id: "ft-example", name: "Example Team Name", logo: someLogo, color: "#a1b2c3" },
export const formerTeams: FormerTeam[] = [];

export const getFormerTeamById = (id: string): FormerTeam | undefined =>
  formerTeams.find((t) => t.id === id);
