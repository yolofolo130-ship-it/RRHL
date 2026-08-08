import type { ChampionshipRosterEntry } from "./types";
import { byOldestSeason } from "@/utils/season";

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

  // Season 2 — Chicago Blackhawks
  { id: "s2-champ-swordtsu", season: "Season 2", playerName: "Swordtsu" },
  { id: "s2-champ-b3nn3tt1", season: "Season 2", playerName: "B3NN3TT1" },
  { id: "s2-champ-sane", season: "Season 2", playerName: "Sane" },
];

// Every season this player was on a Stanley Cup-winning roster, oldest
// first — drives the champion badge (which shows the season(s) directly
// rather than just a count).
export const championshipSeasonsFor = (playerName: string): string[] =>
  Array.from(
    new Set(
      championshipRosters.filter((c) => c.playerName === playerName).map((c) => c.season),
    ),
  ).sort((a, b) => byOldestSeason({ season: a }, { season: b }));
