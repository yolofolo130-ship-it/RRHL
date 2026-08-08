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
  {
    id: "s4-stanley-cup-mvp",
    season: "Season 4",
    accoladeName: "Stanley Cup MVP",
    playerName: "Vengeance",
  },
  {
    id: "s4-conn-smythe-trophy",
    season: "Season 4",
    accoladeName: "Conn Smythe Trophy",
    playerName: "2Tone",
  },
  {
    id: "s4-vezina-trophy",
    season: "Season 4",
    accoladeName: "Vezina Trophy",
    playerName: "TGOD",
  },
  {
    id: "s4-ted-lindsay-trophy",
    season: "Season 4",
    accoladeName: "Ted Lindsay Trophy",
    playerName: "MVP",
  },
  {
    id: "s4-rrhl-foundation-trophy",
    season: "Season 4",
    accoladeName: "RRHL Foundation Trophy",
    playerName: "Siah",
  },
  {
    id: "s4-james-norris-trophy",
    season: "Season 4",
    accoladeName: "James Norris Trophy",
    playerName: "StefonB",
  },
  {
    id: "s4-hart-memorial-trophy",
    season: "Season 4",
    accoladeName: "Hart Memorial Trophy",
    playerName: "2Tone",
  },
  {
    id: "s4-calder-trophy",
    season: "Season 4",
    accoladeName: "Calder Trophy",
    playerName: "Snickers",
  },
  {
    id: "s4-jack-adams-trophy",
    season: "Season 4",
    accoladeName: "Jack Adams Trophy",
    playerName: "Vengeance",
  },
  {
    id: "s5-stanley-cup-mvp",
    season: "Season 5",
    accoladeName: "Stanley Cup MVP",
    playerName: "MVP",
  },
  {
    id: "s5-stanley-cup-losing-mvp",
    season: "Season 5",
    accoladeName: "Stanley Cup Losing MVP",
    playerName: "Vengeance",
  },
  {
    id: "s5-conn-smythe-trophy",
    season: "Season 5",
    accoladeName: "Conn Smythe Trophy",
    playerName: "Sinny",
  },
  {
    id: "s5-vezina-trophy",
    season: "Season 5",
    accoladeName: "Vezina Trophy",
    playerName: "TGOD",
  },
  {
    id: "s5-ted-lindsay-trophy",
    season: "Season 5",
    accoladeName: "Ted Lindsay Trophy",
    playerName: "TGOD",
  },
  {
    id: "s5-rrhl-foundation-trophy",
    season: "Season 5",
    accoladeName: "RRHL Foundation Trophy",
    playerName: "Siah",
  },
  {
    id: "s5-hart-memorial-trophy",
    season: "Season 5",
    accoladeName: "Hart Memorial Trophy",
    playerName: "2Tone",
  },
  {
    id: "s5-calder-trophy",
    season: "Season 5",
    accoladeName: "Calder Trophy",
    playerName: "Twin",
  },
  {
    id: "s5-jack-adams-trophy",
    season: "Season 5",
    accoladeName: "Jack Adams Trophy",
    playerName: "TGOD",
  },
  {
    id: "s6-stanley-cup-mvp",
    season: "Season 6",
    accoladeName: "Stanley Cup MVP",
    playerName: "TGOD",
  },
  {
    id: "s6-stanley-cup-losing-mvp",
    season: "Season 6",
    accoladeName: "Stanley Cup Losing MVP",
    playerName: "2Tone",
  },
  {
    id: "s6-conn-smythe-trophy",
    season: "Season 6",
    accoladeName: "Conn Smythe Trophy",
    playerName: "ALEXOMEGAVR",
  },
  {
    id: "s6-vezina-trophy",
    season: "Season 6",
    accoladeName: "Vezina Trophy",
    playerName: "Carber",
  },
  {
    id: "s6-ted-lindsay-trophy",
    season: "Season 6",
    accoladeName: "Ted Lindsay Trophy",
    playerName: "King",
  },
  {
    id: "s6-rrhl-foundation-trophy",
    season: "Season 6",
    accoladeName: "RRHL Foundation Trophy",
    playerName: "Flaganoid",
  },
  {
    id: "s6-james-norris-trophy",
    season: "Season 6",
    accoladeName: "James Norris Trophy",
    playerName: "Sidedeer",
  },
  {
    id: "s6-hart-memorial-trophy",
    season: "Season 6",
    accoladeName: "Hart Memorial Trophy",
    playerName: "TGOD",
  },
  {
    id: "s6-jack-adams-trophy",
    season: "Season 6",
    accoladeName: "Jack Adams Trophy",
    playerName: "Carber",
  },
  {
    id: "s7-stanley-cup-mvp",
    season: "Season 7",
    accoladeName: "Stanley Cup MVP",
    playerName: "Flaganoid",
  },
  {
    id: "s7-stanley-cup-losing-mvp",
    season: "Season 7",
    accoladeName: "Stanley Cup Losing MVP",
    playerName: "Huddawg",
  },
  {
    id: "s7-conn-smythe-trophy",
    season: "Season 7",
    accoladeName: "Conn Smythe Trophy",
    playerName: "Flaganoid",
  },
  {
    id: "s7-vezina-trophy",
    season: "Season 7",
    accoladeName: "Vezina Trophy",
    playerName: "TGOD",
  },
  {
    id: "s7-ted-lindsay-trophy",
    season: "Season 7",
    accoladeName: "Ted Lindsay Trophy",
    playerName: "B3NN3TT1",
  },
  {
    id: "s7-rrhl-foundation-trophy",
    season: "Season 7",
    accoladeName: "RRHL Foundation Trophy",
    playerName: "Flaganoid",
  },
  {
    id: "s7-james-norris-trophy",
    season: "Season 7",
    accoladeName: "James Norris Trophy",
    playerName: "Kranky",
  },
  {
    id: "s7-hart-memorial-trophy",
    season: "Season 7",
    accoladeName: "Hart Memorial Trophy",
    playerName: "Huddawg",
  },
  {
    id: "s7-calder-trophy",
    season: "Season 7",
    accoladeName: "Calder Trophy",
    playerName: "GeorgePigs",
  },
  {
    id: "s7-jack-adams-trophy",
    season: "Season 7",
    accoladeName: "Jack Adams Trophy",
    playerName: "Kranky",
  },
  {
    id: "s8-stanley-cup-mvp",
    season: "Season 8",
    accoladeName: "Stanley Cup MVP",
    playerName: "Ricey",
  },
  {
    id: "s8-stanley-cup-losing-mvp",
    season: "Season 8",
    accoladeName: "Stanley Cup Losing MVP",
    playerName: "Sleepy",
  },
  {
    id: "s8-conn-smythe-trophy",
    season: "Season 8",
    accoladeName: "Conn Smythe Trophy",
    playerName: "Ricey",
  },
  {
    id: "s8-vezina-trophy",
    season: "Season 8",
    accoladeName: "Vezina Trophy",
    playerName: "Carber",
  },
  {
    id: "s8-ted-lindsay-trophy",
    season: "Season 8",
    accoladeName: "Ted Lindsay Trophy",
    playerName: "TGOD",
  },
  {
    id: "s8-rrhl-foundation-trophy",
    season: "Season 8",
    accoladeName: "RRHL Foundation Trophy",
    playerName: "Carsonreeves",
  },
  {
    id: "s8-james-norris-trophy",
    season: "Season 8",
    accoladeName: "James Norris Trophy",
    playerName: "Huddawg",
  },
  {
    id: "s8-hart-memorial-trophy",
    season: "Season 8",
    accoladeName: "Hart Memorial Trophy",
    playerName: "Ricey",
  },
  {
    id: "s8-calder-trophy",
    season: "Season 8",
    accoladeName: "Calder Trophy",
    playerName: "Ricey",
  },
  {
    id: "s8-jack-adams-trophy",
    season: "Season 8",
    accoladeName: "Jack Adams Trophy",
    playerName: "Carber",
  },
];

export const skaterHistoryFor = (playerName: string): SeasonSkaterStats[] =>
  seasonSkaterStats.filter((s) => s.playerName === playerName).sort(byNewestSeason);

export const goalieHistoryFor = (playerName: string): SeasonGoalieStats[] =>
  seasonGoalieStats.filter((g) => g.playerName === playerName).sort(byNewestSeason);

export const pastAccoladesFor = (playerName: string): SeasonAccolade[] =>
  seasonAccolades.filter((a) => a.playerName === playerName).sort(byNewestSeason);
