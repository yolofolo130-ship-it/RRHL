import type { Coach, Goalie, Skater } from "./types";
import { getFormerPlayerById } from "./formerPlayers";

// Placeholder rosters — replace with real players at any time. Points,
// save percentage, and GAA are always calculated, never stored, so editing
// goals/assists/saves here is enough to keep every table in sync.
export const skaters: Skater[] = [
  { id: "car-1", name: "Ethan Cole", teamId: "carolina-hurricanes", position: "C", number: 14, gp: 5, goals: 3, assists: 4, pim: 2 },
  { id: "car-2", name: "Marcus Webb", teamId: "carolina-hurricanes", position: "LW", number: 21, gp: 5, goals: 2, assists: 3, pim: 4 },
  { id: "car-3", name: "Owen Price", teamId: "carolina-hurricanes", position: "D", number: 55, gp: 5, goals: 1, assists: 5, pim: 6 },
  { id: "car-4", name: "Kyle Santos", teamId: "carolina-hurricanes", position: "D", number: 4, gp: 5, goals: 0, assists: 2, pim: 8 },

  { id: "pit-1", name: "Jordan Blake", teamId: "pittsburgh-penguins", position: "C", number: 9, gp: 5, goals: 4, assists: 5, pim: 2 },
  { id: "pit-2", name: "Derek Nash", teamId: "pittsburgh-penguins", position: "RW", number: 17, gp: 5, goals: 3, assists: 4, pim: 10 },
  { id: "pit-3", name: "Trevor Lang", teamId: "pittsburgh-penguins", position: "D", number: 6, gp: 5, goals: 1, assists: 6, pim: 4 },
  { id: "pit-4", name: "Sam Rooney", teamId: "pittsburgh-penguins", position: "D", number: 23, gp: 5, goals: 1, assists: 2, pim: 12 },

  { id: "tbl-1", name: "Swordtsu", teamId: "tampa-bay-lightning", position: "C", number: 11, gp: 2, goals: 4, assists: 5, pim: 0 },
  { id: "tbl-2", name: "Cron", teamId: "tampa-bay-lightning", position: "LW", number: 19, gp: 3, goals: 8, assists: 3, pim: 0 },
  { id: "tbl-3", name: "Snickers", teamId: "tampa-bay-lightning", position: "C", number: 8, gp: 2, goals: 0, assists: 0, pim: 0 },
  { id: "tbl-4", name: "KindSnack000", teamId: "tampa-bay-lightning", position: "D", number: 3, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "tbl-5", name: "LillianTheGreat", teamId: "tampa-bay-lightning", position: "D", number: 6, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "tbl-6", name: "UncNotFrog", teamId: "tampa-bay-lightning", position: "D", number: 4, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "tbl-7", name: "Ehhabhd", teamId: "tampa-bay-lightning", position: "D", number: 75, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "tbl-8", name: "GeorgePigs", teamId: "los-angeles-kings", position: "RW", number: 37, gp: 0, goals: 0, assists: 0, pim: 0 },

  { id: "bos-1", name: "Wesley Hart", teamId: "boston-bruins", position: "C", number: 12, gp: 5, goals: 7, assists: 6, pim: 4 },
  { id: "bos-2", name: "Grant Foley", teamId: "boston-bruins", position: "RW", number: 27, gp: 5, goals: 5, assists: 4, pim: 6 },
  { id: "bos-3", name: "Connor Blake", teamId: "boston-bruins", position: "D", number: 5, gp: 5, goals: 2, assists: 7, pim: 2 },
  { id: "bos-4", name: "Liam Odom", teamId: "boston-bruins", position: "D", number: 44, gp: 5, goals: 1, assists: 4, pim: 10 },

  { id: "nyr-1", name: "Tyler Munro", teamId: "new-york-rangers", position: "C", number: 10, gp: 5, goals: 2, assists: 3, pim: 0 },
  { id: "nyr-2", name: "Dana Ruiz", teamId: "new-york-rangers", position: "LW", number: 22, gp: 5, goals: 2, assists: 2, pim: 0 },
  { id: "nyr-3", name: "Blake Osgood", teamId: "new-york-rangers", position: "D", number: 7, gp: 5, goals: 0, assists: 3, pim: 0 },
  { id: "nyr-4", name: "Corey Vance", teamId: "new-york-rangers", position: "D", number: 24, gp: 5, goals: 1, assists: 1, pim: 0 },

  { id: "uta-1", name: "MJ", teamId: "utah-mammoths", position: "C", number: 16, gp: 3, goals: 4, assists: 0, pim: 0 },
  { id: "uta-2", name: "Rennu", teamId: "utah-mammoths", position: "RW", number: 20, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "uta-3", name: "lilballerjimmy", teamId: "utah-mammoths", position: "C", number: 2, gp: 3, goals: 3, assists: 0, pim: 0 },
  { id: "uta-4", name: "Reject", teamId: "utah-mammoths", position: "LW", number: 25, gp: 2, goals: 2, assists: 1, pim: 0 },
  { id: "uta-5", name: "Jazzmir", teamId: "utah-mammoths", position: "D", number: 31, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "uta-6", name: "5starmax", teamId: "utah-mammoths", position: "D", number: 99, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "uta-7", name: "Randomcrazynoob", teamId: "utah-mammoths", position: "LW", number: 98, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "uta-8", name: "Twin", teamId: "utah-mammoths", position: "C", number: 67, gp: 0, goals: 0, assists: 0, pim: 0 },

  { id: "vgk-1", name: "Sinny", teamId: "vegas-golden-knights", position: "RW", number: 77, gp: 3, goals: 5, assists: 1, pim: 2 },
  { id: "vgk-2", name: "Butter", teamId: "vegas-golden-knights", position: "LW", number: 13, gp: 3, goals: 1, assists: 3, pim: 0 },
  { id: "vgk-3", name: "Twizzy", teamId: "vegas-golden-knights", position: "C", number: 8, gp: 3, goals: 2, assists: 0, pim: 2 },
  { id: "vgk-4", name: "Mesh", teamId: "vegas-golden-knights", position: "C", number: 16, gp: 3, goals: 0, assists: 0, pim: 0 }, 
  { id: "vgk-5", name: "Caleb", teamId: "vegas-golden-knights", position: "D", number: 9, gp: 3, goals: 1, assists: 3, pim: 0 },
  { id: "vgk-6", name: "Sidedeer", teamId: "vegas-golden-knights", position: "LW", number: 38 , gp: 2, goals: 1, assists: 0, pim: 0 }, 
  { id: "vgk-7", name: "Drago", teamId: "vegas-golden-knights", position: "D", number: 99, gp: 0, goals: 0, assists: 0, pim: 0},
  { id: "vgk-8", name: "MadMax", teamId: "vegas-golden-knights", position: "D", number: 56, gp: 0, goals: 0, assists: 0, pim: 0},

  { id: "stl-1", name: "Nolan Ashby", teamId: "st-louis-blues", position: "C", number: 14, gp: 5, goals: 3, assists: 4, pim: 4 },
  { id: "stl-2", name: "Peyton Cruz", teamId: "st-louis-blues", position: "RW", number: 21, gp: 5, goals: 2, assists: 3, pim: 6 },
  { id: "stl-3", name: "Quinn Baxter", teamId: "st-louis-blues", position: "D", number: 4, gp: 5, goals: 1, assists: 4, pim: 8 },
  { id: "stl-4", name: "Reese Hollis", teamId: "st-louis-blues", position: "D", number: 34, gp: 5, goals: 0, assists: 3, pim: 10 },

  { id: "lak-1", name: "MVP", teamId: "los-angeles-kings", position: "C", number: 9, gp: 1, goals: 9, assists: 0, pim: 0 },
  { id: "lak-2", name: "Gabriel", teamId: "los-angeles-kings", position: "LW", number: 17, gp: 1, goals: 1, assists: 0, pim: 0 },
  { id: "lak-3", name: "Adam Cole", teamId: "los-angeles-kings", position: "D", number: 5, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "lak-4", name: "2Tone", teamId: "los-angeles-kings", position: "D", number: 26, gp: 1, goals: 0, assists: 0, pim: 0 },
  { id: "lak-5", name: "Duck", teamId: "los-angeles-kings", position: "D", number: 27, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "lak-6", name: "JosuxRR", teamId: "los-angeles-kings", position: "RW", number: 37, gp: 0, goals: 0, assists: 0, pim: 0 },

  { id: "dal-1", name: "Landon Pierce", teamId: "dallas-stars", position: "C", number: 11, gp: 5, goals: 4, assists: 5, pim: 4 },
  { id: "dal-2", name: "Hudson Vance", teamId: "dallas-stars", position: "RW", number: 19, gp: 5, goals: 3, assists: 3, pim: 6 },
  { id: "dal-3", name: "Carter Doyle", teamId: "dallas-stars", position: "D", number: 8, gp: 5, goals: 1, assists: 5, pim: 4 },
  { id: "dal-4", name: "Griffin Moss", teamId: "dallas-stars", position: "D", number: 3, gp: 5, goals: 1, assists: 3, pim: 8 },
];

export const goalies: Goalie[] = [
  { id: "car-g1", name: "Wapw", teamId: "carolina-hurricanes", number: 30, gp: 3, wins: 2, losses: 0, otLosses: 1, saves: 63, goalsAgainst: 5 },
  { id: "pit-g1", name: "Fellow", teamId: "pittsburgh-penguins", number: 35, gp: 3 , wins: 1, losses: 1, otLosses: 1, saves: 28, goalsAgainst: 3 },
  { id: "tbl-g1", name: "SnugThePug", teamId: "tampa-bay-lightning", number: 31, gp: 1, wins: 1, losses: 1, otLosses: 1, saves: 0, goalsAgainst: 1 },
  { id: "bos-g1", name: "Apx11o", teamId: "boston-bruins", number: 29, gp: 2, wins: 1, losses: 1, otLosses: 1, saves: 4, goalsAgainst: 6 },
  { id: "bos-g2", name: "Sparkles", teamId: "boston-bruins", number: 89, gp: 2, wins: 1, losses: 1, otLosses: 1, saves: 20, goalsAgainst: 3 },
  { id: "nyr-g1", name: "DDino", teamId: "new-york-rangers", number: 1, gp: 3, wins: 1, losses: 1, otLosses: 1, saves: 40, goalsAgainst: 5 },
  { id: "uta-g1", name: "Sleepy", teamId: "utah-mammoths", number: 33, gp: 2, wins: 3, losses: 0, otLosses: 0, saves: 21, goalsAgainst: 3 },
  { id: "uta-g2", name: "Baseball3122", teamId: "utah-mammoths", number: 24, gp: 2, wins: 3, losses: 0, otLosses: 0, saves: 4, goalsAgainst: 0 },
  { id: "vgk-g1", name: "TGOD", teamId: "vegas-golden-knights", number: 10, gp: 3, wins: 3, losses: 0, otLosses: 0, saves: 51, goalsAgainst: 1 },
  { id: "vgk-g2", name: "King", teamId: "vegas-golden-knights", number: 4, gp: 1, wins: 3, losses: 0, otLosses: 0, saves: 0, goalsAgainst: 0 },
  { id: "stl-g1", name: "Nova", teamId: "st-louis-blues", number: 40, gp: 2, wins: 1, losses: 2, otLosses: 0, saves: 6, goalsAgainst: 8 },
  { id: "lak-g1", name: "Riptide", teamId: "los-angeles-kings", number: 32, gp: 1, wins: 1, losses: 2, otLosses: 0, saves: 1, goalsAgainst: 5 },
  { id: "lak-g2", name: "TheHolyHippo", teamId: "los-angeles-kings", number: 22, gp: 0, wins: 0, losses: 0, otLosses: 0, saves: 0, goalsAgainst: 0 },
  { id: "dal-g1", name: "Jollyllama", teamId: "dallas-stars", number: 39, gp: 1, wins: 0, losses: 3, otLosses: 0, saves: 0, goalsAgainst: 2 },
];

export const coaches: Coach[] = [
  { id: "car-hc", name: "BNA", teamId: "carolina-hurricanes", role: "Head Coach" },
  { id: "car-ac", name: "Full", teamId: "carolina-hurricanes", role: "Assistant Coach" },

  { id: "pit-hc", name: "Chrisx", teamId: "pittsburgh-penguins", role: "Head Coach" },
  { id: "pit-ac", name: "Carterthegawd", teamId: "pittsburgh-penguins", role: "Assistant Coach" },

  { id: "tbl-hc", name: "Swordtsu", teamId: "tampa-bay-lightning", role: "Head Coach" },
  { id: "tbl-ac", name: "Cron", teamId: "tampa-bay-lightning", role: "Assistant Coach" },

  { id: "bos-hc", name: "Kdog2020", teamId: "boston-bruins", role: "Head Coach" },
  { id: "bos-ac", name: "Boolit", teamId: "boston-bruins", role: "Assistant Coach" },

  { id: "nyr-hc", name: "Bungee", teamId: "new-york-rangers", role: "Head Coach" },
  { id: "nyr-ac", name: "DDino", teamId: "new-york-rangers", role: "Assistant Coach" },

  { id: "uta-hc", name: "MJ", teamId: "utah-mammoths", role: "Head Coach" },
  { id: "uta-ac", name: "Renuu", teamId: "utah-mammoths", role: "Assistant Coach" },

  { id: "vgk-hc", name: "Siah", teamId: "vegas-golden-knights", role: "Head Coach" },
  { id: "vgk-ac", name: "TGOD", teamId: "vegas-golden-knights", role: "Assistant Coach" },

  { id: "stl-hc", name: "TDLMarcus", teamId: "st-louis-blues", role: "Head Coach" },
  { id: "stl-ac", name: "Hogeye", teamId: "st-louis-blues", role: "Assistant Coach" },

  { id: "lak-hc", name: "Gabriel", teamId: "los-angeles-kings", role: "Head Coach" },
  { id: "lak-ac", name: "Duck", teamId: "los-angeles-kings", role: "Assistant Coach" },

  { id: "dal-hc", name: "Santi", teamId: "dallas-stars", role: "Head Coach" },
  { id: "dal-ac", name: "PKPlis", teamId: "dallas-stars", role: "Assistant Coach" },
];

export const skaterPoints = (skater: Skater): number => skater.goals + skater.assists;

export const goalieShotsAgainst = (goalie: Goalie): number => goalie.saves + goalie.goalsAgainst;

export const goalieSavePct = (goalie: Goalie): number =>
  goalieShotsAgainst(goalie) === 0 ? 0 : goalie.saves / goalieShotsAgainst(goalie);

// Approximate GAA as goals-against per game played (rec-league games, not
// tracked by minutes played).
export const goalieGaa = (goalie: Goalie): number =>
  goalie.gp === 0 ? 0 : goalie.goalsAgainst / goalie.gp;

export const topByGoals = (count: number): Skater[] =>
  [...skaters].sort((a, b) => b.goals - a.goals).slice(0, count);

export const topByAssists = (count: number): Skater[] =>
  [...skaters].sort((a, b) => b.assists - a.assists).slice(0, count);

export const topByPoints = (count: number): Skater[] =>
  [...skaters].sort((a, b) => skaterPoints(b) - skaterPoints(a)).slice(0, count);

export const topBySaves = (count: number): Goalie[] =>
  [...goalies].sort((a, b) => b.saves - a.saves).slice(0, count);

// Skater, goalie, and former-player ids never collide (goalie ids always
// end in "g<n>", former-player ids always start with "fp-"), so a single
// lookup can serve both /players/:id and /players list links.
export type Player =
  | ({ kind: "skater" } & Skater)
  | ({ kind: "goalie" } & Goalie)
  | { kind: "former"; id: string; name: string };

export const getPlayerById = (id: string): Player | undefined => {
  const skater = skaters.find((s) => s.id === id);
  if (skater) return { kind: "skater", ...skater };
  const goalie = goalies.find((g) => g.id === id);
  if (goalie) return { kind: "goalie", ...goalie };
  const former = getFormerPlayerById(id);
  if (former) return { kind: "former", ...former };
  return undefined;
};
