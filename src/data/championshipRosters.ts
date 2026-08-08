import type { ChampionshipRosterEntry } from "./types";

// Everyone on a Stanley Cup-winning roster that season — drives the
// champion badge next to a player's name. Empty until filled in; add
// entries like:
// { id: "s22-champ-chrisx", season: "Season 22", playerName: "Chrisx" },
export const championshipRosters: ChampionshipRosterEntry[] = [];

export const championshipCount = (playerName: string): number =>
  new Set(
    championshipRosters.filter((c) => c.playerName === playerName).map((c) => c.season),
  ).size;
