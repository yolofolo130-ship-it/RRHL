import type { SkaterGameLog } from "./types";

// Per-game skater box scores for the "Last 5 Games" table on a skater's
// player page. Empty until filled in — add one entry per game like:
// { id: "car-1-2026-08-09", playerName: "BNA", date: "2026-08-09", opponentTeamId: "boston-bruins", home: true, goals: 1, assists: 2, points: 3, plusMinus: 1, pim: 0, ppg: 0, shg: 0, shots: 4, shifts: 22 },
//
// `playerName` must exactly match the player's name in players.ts.
// `opponentTeamId` must exactly match a team id in teams.ts.
// `home: true` shows "vs OPP", `home: false` shows "@ OPP".
export const skaterGameLogs: SkaterGameLog[] = [];

export function lastGamesFor(playerName: string, count = 5): SkaterGameLog[] {
  return skaterGameLogs
    .filter((g) => g.playerName === playerName)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count);
}
