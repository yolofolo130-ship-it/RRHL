import type { ChampionshipRosterEntry } from "./types";

// Everyone on a Stanley Cup-winning roster that season — drives the
// champion badge next to a player's name. Empty until filled in; add
// entries like:
// { id: "s22-champ-chrisx", season: "Season 22", playerName: "Chrisx" },
export const championshipRosters: ChampionshipRosterEntry[] = [
  // Season 1 — Carolina Hurricanes
  { id: "s1-champ-vengeance", season: "Season 1", playerName: "Vengeance" },
  { id: "s1-champ-uncnotfrog", season: "Season 1", playerName: "UncNotFrog" },
  { id: "s1-champ-hockeyboi", season: "Season 1", playerName: "Hockey Boi" },
  { id: "s1-champ-adamcole", season: "Season 1", playerName: "Adam Cole" },
  { id: "s1-champ-carsonreeves", season: "Season 1", playerName: "Carsonreeves" },
];

export const championshipCount = (playerName: string): number =>
  new Set(
    championshipRosters.filter((c) => c.playerName === playerName).map((c) => c.season),
  ).size;
