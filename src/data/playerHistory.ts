import type { SeasonGoalieStats, SeasonSkaterStats } from "./types";

// Past-season stats, shown on a player's page below their current Season 23
// numbers. Empty until filled in — add entries like:
// { id: "s22-car-1", playerName: "Ethan Cole", season: "Season 22", teamId: "carolina-hurricanes", position: "C", gp: 20, goals: 12, assists: 15, pim: 8 },
export const seasonSkaterStats: SeasonSkaterStats[] = [];

// { id: "s22-car-g1", playerName: "Reid Palmer", season: "Season 22", teamId: "carolina-hurricanes", gp: 20, wins: 11, losses: 7, otLosses: 2, saves: 480, goalsAgainst: 55 },
export const seasonGoalieStats: SeasonGoalieStats[] = [];

export const skaterHistoryFor = (playerName: string): SeasonSkaterStats[] =>
  seasonSkaterStats
    .filter((s) => s.playerName === playerName)
    .sort((a, b) => b.season.localeCompare(a.season));

export const goalieHistoryFor = (playerName: string): SeasonGoalieStats[] =>
  seasonGoalieStats
    .filter((g) => g.playerName === playerName)
    .sort((a, b) => b.season.localeCompare(a.season));
