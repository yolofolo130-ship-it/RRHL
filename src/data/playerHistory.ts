import type { SeasonAccolade, SeasonGoalieStats, SeasonSkaterStats } from "./types";
import { byNewestSeason, byOldestSeason } from "@/utils/season";

export { byNewestSeason, byOldestSeason };

// Past-season stats, shown on a player's page below their current Season 23
// numbers. Empty until filled in — add entries like:
// { id: "s22-car-1", playerName: "Ethan Cole", season: "Season 22", teamId: "carolina-hurricanes", position: "C", gp: 20, goals: 12, assists: 15, pim: 8 },
export const seasonSkaterStats: SeasonSkaterStats[] = [];

// { id: "s22-car-g1", playerName: "Reid Palmer", season: "Season 22", teamId: "carolina-hurricanes", gp: 20, wins: 11, losses: 7, otLosses: 2, saves: 480, goalsAgainst: 55 },
export const seasonGoalieStats: SeasonGoalieStats[] = [];

// Awards won in past seasons (Season 23's awards live in accolades.ts once
// decided). Empty until filled in — add entries like:
// { id: "s22-hart", season: "Season 22", accoladeName: "Hart Memorial Trophy", playerName: "Chrisx" },
export const seasonAccolades: SeasonAccolade[] = [
  {
    id: "s1-stanley-cup-mvp",
    season: "Season 1",
    accoladeName: "Stanley Cup MVP",
    playerName: "Carsonreeves",
  },
  {
    id: "s1-stanley-cup-losing-mvp",
    season: "Season 1",
    accoladeName: "Stanley Cup Losing MVP",
    playerName: "Krampuz",
  },
  {
    id: "s1-conn-smythe-trophy",
    season: "Season 1",
    accoladeName: "Conn Smythe Trophy",
    playerName: "MiniSneaki",
  },
  {
    id: "s1-vezina-trophy",
    season: "Season 1",
    accoladeName: "Vezina Trophy",
    playerName: "Landorito",
  },
  {
    id: "s1-jack-adams-trophy",
    season: "Season 1",
    accoladeName: "Jack Adams Trophy",
    playerName: "BakedLasgna",
  },
  {
    id: "s2-stanley-cup-mvp",
    season: "Season 2",
    accoladeName: "Stanley Cup MVP",
    playerName: "B3NN3TT1",
  },
  {
    id: "s2-stanley-cup-losing-mvp",
    season: "Season 2",
    accoladeName: "Stanley Cup Losing MVP",
    playerName: "Flaganoid",
  },
  {
    id: "s2-conn-smythe-trophy",
    season: "Season 2",
    accoladeName: "Conn Smythe Trophy",
    playerName: "B3NN3TT1",
  },
  {
    id: "s2-vezina-trophy",
    season: "Season 2",
    accoladeName: "Vezina Trophy",
    playerName: "Max00x",
  },
  {
    id: "s2-jack-adams-trophy",
    season: "Season 2",
    accoladeName: "Jack Adams Trophy",
    playerName: "Hogeye",
  },
  {
    id: "s2-hart-memorial-trophy",
    season: "Season 2",
    accoladeName: "Hart Memorial Trophy",
    playerName: "B3NN3TT1",
  },
  {
    id: "s3-stanley-cup-mvp",
    season: "Season 3",
    accoladeName: "Stanley Cup MVP",
    playerName: "2Tone",
  },
  {
    id: "s3-stanley-cup-losing-mvp",
    season: "Season 3",
    accoladeName: "Stanley Cup Losing MVP",
    playerName: "Sinny",
  },
  {
    id: "s3-conn-smythe-trophy",
    season: "Season 3",
    accoladeName: "Conn Smythe Trophy",
    playerName: "ALEXOMEGAVR",
  },
  {
    id: "s3-vezina-trophy",
    season: "Season 3",
    accoladeName: "Vezina Trophy",
    playerName: "TGOD",
  },
  {
    id: "s3-calder-trophy",
    season: "Season 3",
    accoladeName: "Calder Trophy",
    playerName: "StefonB",
  },
  {
    id: "s3-jack-adams-trophy",
    season: "Season 3",
    accoladeName: "Jack Adams Trophy",
    playerName: "Vengeance",
  },
];

export const skaterHistoryFor = (playerName: string): SeasonSkaterStats[] =>
  seasonSkaterStats.filter((s) => s.playerName === playerName).sort(byNewestSeason);

export const goalieHistoryFor = (playerName: string): SeasonGoalieStats[] =>
  seasonGoalieStats.filter((g) => g.playerName === playerName).sort(byNewestSeason);

export const pastAccoladesFor = (playerName: string): SeasonAccolade[] =>
  seasonAccolades.filter((a) => a.playerName === playerName).sort(byNewestSeason);
