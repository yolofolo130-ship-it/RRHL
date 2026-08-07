import type { SeasonAccolade, SeasonGoalieStats, SeasonSkaterStats } from "./types";

// Past-season stats, shown on a player's page below their current Season 23
// numbers. Empty until filled in — add entries like:
// { id: "s22-car-1", playerName: "Ethan Cole", season: "Season 22", teamId: "carolina-hurricanes", position: "C", gp: 20, goals: 12, assists: 15, pim: 8 },
export const seasonSkaterStats: SeasonSkaterStats[] = [];

// { id: "s22-car-g1", playerName: "Reid Palmer", season: "Season 22", teamId: "carolina-hurricanes", gp: 20, wins: 11, losses: 7, otLosses: 2, saves: 480, goalsAgainst: 55 },
export const seasonGoalieStats: SeasonGoalieStats[] = [];

// Awards won in past seasons (Season 23's awards live in accolades.ts once
// decided). Empty until filled in — add entries like:
// { id: "s22-hart", season: "Season 22", accoladeName: "Hart Memorial Trophy", playerName: "Chrisx" },
export const seasonAccolades: SeasonAccolade[] = [];

export const skaterHistoryFor = (playerName: string): SeasonSkaterStats[] =>
  seasonSkaterStats
    .filter((s) => s.playerName === playerName)
    .sort((a, b) => b.season.localeCompare(a.season));

export const goalieHistoryFor = (playerName: string): SeasonGoalieStats[] =>
  seasonGoalieStats
    .filter((g) => g.playerName === playerName)
    .sort((a, b) => b.season.localeCompare(a.season));

export const pastAccoladesFor = (playerName: string): SeasonAccolade[] =>
  seasonAccolades
    .filter((a) => a.playerName === playerName)
    .sort((a, b) => b.season.localeCompare(a.season));
