import type { FormerTeam } from "./types";

// Franchises that no longer exist (folded, not any of the current 10 teams).
// Add an entry here before pointing a TeamSeasonHonor's teamId at it. Add
// entries like:
// { id: "ft-example", name: "Example Team Name" },
export const formerTeams: FormerTeam[] = [];

export const getFormerTeamById = (id: string): FormerTeam | undefined =>
  formerTeams.find((t) => t.id === id);
