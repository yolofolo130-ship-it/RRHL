import type { Coach, FormerPlayer, Goalie, Skater } from "./types";
import { getFormerPlayerByName, getFormerPlayerBySlug } from "./formerPlayers";
import { slugify } from "@/utils/format";

import sinnyAvatar from "@/assets/players-avatars/Sinny-Avatar.png";

// Placeholder rosters — replace with real players at any time. Points,
// save percentage, and GAA are always calculated, never stored, so editing
// goals/assists/saves here is enough to keep every table in sync.
export const skaters: Skater[] = [
  { id: "car-1", name: "BNA", teamId: "carolina-hurricanes", position: "C", number: 14, gp: 1, goals: 3, assists: 2, pim: 0, overall: 85, flag: "German" },
  { id: "car-2", name: "DoughnutZ", teamId: "carolina-hurricanes", position: "LW", number: 21, gp: 2, goals: 5, assists: 2, pim: 0, overall: 88, star: "Wheels", flag: "Ireland" },
  { id: "car-3", name: "Full", teamId: "carolina-hurricanes", position: "D", number: 4, gp: 2, goals: 1, assists: 1, pim: 0, overall: 95, xFactor: "Unstoppable", flag: "PR" },
  { id: "car-4", name: "Fishbowl", teamId: "carolina-hurricanes", position: "D", number: 55, gp: 1, goals: 0, assists: 0, pim: 0, overall: 83, flag: "Canada" },
  { id: "car-5", name: "AJ", teamId: "carolina-hurricanes", position: "D", number: 32, gp: 0, goals: 0, assists: 0, pim: 0, overall: 83, flag: "USA" },
  { id: "car-6", name: "Nickel", teamId: "carolina-hurricanes", position: "LW", number: 11, gp: 2, goals: 4, assists: 0, pim: 0, overall: 88, star: "Quick Release", flag: "USA" },
  { id: "car-7", name: "Peach", teamId: "carolina-hurricanes", position: "LW", number: 10, gp: 0, goals: 0, assists: 0, pim: 0, overall: 84, flag: "USA" },
  { id: "car-8", name: "Badmilk", teamId: "carolina-hurricanes", position: "LW", number: 6, gp: 0, goals: 0, assists: 0, pim: 0, overall: 82, flag: "USA" },

  { id: "pit-1", name: "Chrisx", teamId: "pittsburgh-penguins", position: "C", number: 5, gp: 4, goals: 10, assists: 7, pim: 0, overall: 97, xFactor: "Backhand Beauty", flag: "USA" },
  { id: "pit-2", name: "RestartedRyan", teamId: "pittsburgh-penguins", position: "RW", number: 3, gp: 0, goals: 0, assists: 0, pim: 0, overall: 81, flag: "USA" },
  { id: "pit-3", name: "Mason", teamId: "pittsburgh-penguins", position: "RW", number: 32, gp: 0, goals: 0, assists: 0, pim: 0, overall: 83 },
  { id: "pit-4", name: "Sid", teamId: "pittsburgh-penguins", position: "LW", number: 87, gp: 2, goals: 4, assists: 8, pim: 0, overall: 90, star: "Truculence", flag: "USA" },
  { id: "pit-5", name: "chicharito9260", teamId: "pittsburgh-penguins", position: "D", number: 99, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "pit-6", name: "44worthy", teamId: "pittsburgh-penguins", position: "D", number: 69, gp: 0, goals: 0, assists: 0, pim: 0, overall: 84, flag: "USA" },
  { id: "pit-7", name: "LBeard0320", teamId: "pittsburgh-penguins", position: "D", number: 45, gp: 0, goals: 0, assists: 0, pim: 0, overall: 76, flag: "USA" },
  { id: "pit-8", name: "cjcrosby898999", teamId: "pittsburgh-penguins", position: "D", number: 23, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "pit-9", name: "Arri", teamId: "pittsburgh-penguins", position: "RW", number: 24, gp: 0, goals: 0, assists: 0, pim: 0, overall: 73, flag: "USA" },
  { id: "pit-10", name: "Carterthegawd", teamId: "pittsburgh-penguins", position: "D", number: 2, gp: 0, goals: 0, assists: 0, pim: 0, overall: 86, flag: "USA" },

  { id: "tbl-1", name: "Swordtsu", teamId: "tampa-bay-lightning", position: "C", number: 11, gp: 2, goals: 4, assists: 5, pim: 0, overall: 92, star: "Quick Release", flag: "USA" },
  { id: "tbl-2", name: "Cron", teamId: "tampa-bay-lightning", position: "LW", number: 19, gp: 4, goals: 9, assists: 1, pim: 0, overall: 87, flag: "USA" },
  { id: "tbl-3", name: "Snickers", teamId: "tampa-bay-lightning", position: "C", number: 8, gp: 2, goals: 0, assists: 0, pim: 0, overall: 87, flag: "USA" },
  { id: "tbl-4", name: "KindSnack000", teamId: "tampa-bay-lightning", position: "D", number: 3, gp: 0, goals: 0, assists: 0, pim: 0, overall: 83, flag: "USA" },
  { id: "tbl-5", name: "LillianTheGreat", teamId: "tampa-bay-lightning", position: "D", number: 6, gp: 0, goals: 0, assists: 0, pim: 0, overall: 88, star: "Truculence", flag: "USA" },
  { id: "tbl-6", name: "UncNotFrog", teamId: "tampa-bay-lightning", position: "D", number: 4, gp: 0, goals: 0, assists: 0, pim: 0, overall: 84, flag: "USA" },
  { id: "tbl-7", name: "Ehhabhd", teamId: "tampa-bay-lightning", position: "D", number: 75, gp: 0, goals: 0, assists: 0, pim: 0, overall: 79, flag: "USA" },
  { id: "tbl-8", name: "GeorgePigs", teamId: "tampa-bay-lightning", position: "RW", number: 37, gp: 0, goals: 0, assists: 0, pim: 0, overall: 82, flag: "USA" },
  { id: "tbl-9", name: "Boa", teamId: "tampa-bay-lightning", position: "RW", number: 99, gp: 0, goals: 0, assists: 0, pim: 0, overall: 80, flag: "USA" },

  { id: "bos-1", name: "Kdog2020", teamId: "boston-bruins", position: "C", number: 12, gp: 3, goals: 7, assists: 3, pim: 0, overall: 87, flag: "USA" },
  { id: "bos-2", name: "Boolit", teamId: "boston-bruins", position: "RW", number: 27, gp: 0, goals: 0, assists: 0, pim: 0, overall: 89, star: "Truculence", flag: "USA" },
  { id: "bos-3", name: "Bounty", teamId: "boston-bruins", position: "D", number: 5, gp: 0, goals: 0, assists: 0, pim: 0, overall: 86, flag: "USA" },
  { id: "bos-4", name: "KingPenguin", teamId: "boston-bruins", position: "D", number: 44, gp: 0, goals: 0, assists: 0, pim: 0, overall: 91, star: "Quick Release", flag: "USA" },
  { id: "bos-5", name: "Huddawg", teamId: "boston-bruins", position: "C", number: 1, gp: 0, goals: 0, assists: 0, pim: 0, overall: 86, flag: "USA" },
  { id: "bos-6", name: "Jace", teamId: "boston-bruins", position: "RW", number: 7, gp: 0, goals: 0, assists: 0, pim: 0, overall: 81, flag: "USA" },
  { id: "bos-7", name: "Funko", teamId: "boston-bruins", position: "D", number: 99, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "bos-8", name: "Idk67", teamId: "boston-bruins", position: "D", number: 67, gp: 0, goals: 0, assists: 0, pim: 0, overall: 74, flag: "USA" },

  { id: "nyr-1", name: "Jrok", teamId: "new-york-rangers", position: "C", number: 10, gp: 3, goals: 6, assists: 2, pim: 0, overall: 93, star: "One-T", flag: "USA" },
  { id: "nyr-2", name: "Bungee", teamId: "new-york-rangers", position: "D", number: 22, gp: 4, goals: 5, assists: 5, pim: 0, overall: 91, star: "Truculence", flag: "USA" },
  { id: "nyr-3", name: "Eli", teamId: "new-york-rangers", position: "LW", number: 7, gp: 2, goals: 1, assists: 0, pim: 0, overall: 87, flag: "USA" },
  { id: "nyr-4", name: "Sfgoofy", teamId: "new-york-rangers", position: "D", number: 24, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "nyr-5", name: "Carsonreeves", teamId: "new-york-rangers", position: "D", number: 9, gp: 0, goals: 0, assists: 0, pim: 0, overall: 83, flag: "USA" },
  { id: "nyr-6", name: "Cakelocks", teamId: "new-york-rangers", position: "RW", number: 54, gp: 0, goals: 0, assists: 0, pim: 0, overall: 77, flag: "USA" },
  { id: "nyr-7", name: "DieLit", teamId: "new-york-rangers", position: "D", number: 32, gp: 0, goals: 0, assists: 0, pim: 0 },

  { id: "uta-1", name: "MJ", teamId: "utah-mammoths", position: "C", number: 16, gp: 3, goals: 4, assists: 0, pim: 0, overall: 93, star: "Wheels", flag: "USA" },
  { id: "uta-2", name: "Renuu", teamId: "utah-mammoths", position: "RW", number: 20, gp: 0, goals: 0, assists: 0, pim: 0, overall: 91, star: "One-T", flag: "USA" },
  { id: "uta-3", name: "lilballerjimmy", teamId: "utah-mammoths", position: "C", number: 2, gp: 3, goals: 3, assists: 0, pim: 0, overall: 94, xFactor: "Backhand Beauty", flag: "Mexico" },
  { id: "uta-4", name: "Reject", teamId: "utah-mammoths", position: "LW", number: 25, gp: 2, goals: 2, assists: 1, pim: 0, overall: 70, flag: "USA" },
  { id: "uta-5", name: "Jazzmir", teamId: "utah-mammoths", position: "D", number: 31, gp: 0, goals: 0, assists: 0, pim: 0, overall: 89, star: "Quick Release", flag: "USA" },
  { id: "uta-6", name: "5starmax", teamId: "utah-mammoths", position: "D", number: 99, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "uta-7", name: "Randomcrazynoob", teamId: "utah-mammoths", position: "LW", number: 98, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "uta-8", name: "Twin", teamId: "utah-mammoths", position: "C", number: 67, gp: 0, goals: 0, assists: 0, pim: 0, overall: 84, flag: "USA" },
  { id: "uta-9", name: "Zac", teamId: "utah-mammoths", position: "C", number: 27, gp: 0, goals: 0, assists: 0, pim: 0, overall: 81, flag: "USA" },
  { id: "uta-10", name: "Baseball3122", teamId: "utah-mammoths", position: "LW", number: 24, gp: 2, goals: 0, assists: 0, pim: 0 },
  { id: "uta-11", name: "Mood", teamId: "utah-mammoths", position: "RW", number: 13, gp: 0, goals: 0, assists: 0, pim: 0, overall: 81, flag: "USA" },

  { id: "vgk-1", name: "Sinny", teamId: "vegas-golden-knights", position: "RW", number: 77, gp: 3, goals: 5, assists: 1, pim: 2, overall: 94, xFactor: "Ankle Breaker", flag: "DR", headshot: sinnyAvatar },
  { id: "vgk-2", name: "Butter", teamId: "vegas-golden-knights", position: "LW", number: 13, gp: 3, goals: 1, assists: 3, pim: 0, overall: 86, flag: "USA" },
  { id: "vgk-3", name: "Siah", teamId: "vegas-golden-knights", position: "C", number: 8, gp: 3, goals: 2, assists: 0, pim: 2, overall: 94, xFactor: "Backhand Beauty", flag: "Mexico" },
  { id: "vgk-4", name: "Mesh", teamId: "vegas-golden-knights", position: "C", number: 16, gp: 3, goals: 0, assists: 0, pim: 0, overall: 87, flag: "Jamaica" },
  { id: "vgk-5", name: "Caleb", teamId: "vegas-golden-knights", position: "D", number: 9, gp: 3, goals: 1, assists: 3, pim: 0, overall: 88, star: "Truculence", flag: "USA" },
  { id: "vgk-6", name: "Sidedeer", teamId: "vegas-golden-knights", position: "LW", number: 38 , gp: 2, goals: 1, assists: 0, pim: 0, overall: 79, flag: "USA" },
  { id: "vgk-7", name: "Drago", teamId: "vegas-golden-knights", position: "D", number: 99, gp: 0, goals: 0, assists: 0, pim: 0},
  { id: "vgk-8", name: "MadMax", teamId: "vegas-golden-knights", position: "D", number: 56, gp: 0, goals: 0, assists: 0, pim: 0, overall: 77, flag: "USA" },
  { id: "vgk-9", name: "Darkness", teamId: "vegas-golden-knights", position: "D", number: 5, gp: 1, goals: 0, assists: 0, pim: 0, overall: 75, flag: "USA" },

  { id: "stl-1", name: "Vengeance", teamId: "st-louis-blues", position: "C", number: 14, gp: 3, goals: 4, assists: 0, pim: 0, overall: 92, star: "Wheels", flag: "Canada" },
  { id: "stl-2", name: "Augy", teamId: "st-louis-blues", position: "RW", number: 21, gp: 0, goals: 0, assists: 0, pim: 0, overall: 80, flag: "USA" },
  { id: "stl-3", name: "EvanTheGuy", teamId: "st-louis-blues", position: "LW", number: 4, gp: 0, goals: 0, assists: 0, pim: 0, overall: 86, flag: "USA" },
  { id: "stl-4", name: "Fire", teamId: "st-louis-blues", position: "C", number: 7, gp: 0, goals: 0, assists: 0, pim: 0, overall: 93, star: "Quick Release", flag: "USA" },
  { id: "stl-5", name: "Tidy", teamId: "st-louis-blues", position: "LW", number: 2, gp: 0, goals: 0, assists: 0, pim: 0, overall: 82, flag: "USA" },
  { id: "stl-6", name: "TDLMarcus", teamId: "st-louis-blues", position: "D", number: 56, gp: 0, goals: 0, assists: 0, pim: 0, overall: 79, flag: "USA" },
  { id: "stl-7", name: "Hogeye", teamId: "st-louis-blues", position: "C", number: 69, gp: 0, goals: 0, assists: 0, pim: 0, overall: 79, flag: "USA" },
  { id: "stl-8", name: "AlexKiller", teamId: "st-louis-blues", position: "LW", number: 1, gp: 0, goals: 0, assists: 0, pim: 0 },

  { id: "lak-1", name: "MVP", teamId: "los-angeles-kings", position: "C", number: 9, gp: 2, goals: 13, assists: 2, pim: 0, overall: 85, flag: "USA" },
  { id: "lak-2", name: "Gabriel", teamId: "los-angeles-kings", position: "LW", number: 17, gp: 1, goals: 1, assists: 0, pim: 0, overall: 80, flag: "USA" },
  { id: "lak-3", name: "Adam Cole", teamId: "los-angeles-kings", position: "D", number: 5, gp: 0, goals: 0, assists: 0, pim: 0, overall: 82, flag: "USA" },
  { id: "lak-4", name: "2Tone", teamId: "los-angeles-kings", position: "D", number: 26, gp: 1, goals: 0, assists: 0, pim: 0, overall: 85, flag: "USA" },
  { id: "lak-5", name: "Duck", teamId: "los-angeles-kings", position: "D", number: 27, gp: 0, goals: 0, assists: 0, pim: 0, overall: 88, star: "Wheels", flag: "USA" },
  { id: "lak-6", name: "JosuxRR", teamId: "los-angeles-kings", position: "RW", number: 37, gp: 0, goals: 0, assists: 0, pim: 0, overall: 74, flag: "USA" },
  { id: "lak-7", name: "Kranky", teamId: "los-angeles-kings", position: "RW", number: 89, gp: 0, goals: 0, assists: 0, pim: 0, overall: 84, flag: "USA" },
  { id: "lak-8", name: "StefonB", teamId: "los-angeles-kings", position: "RW", number: 2, gp: 0, goals: 0, assists: 0, pim: 0, overall: 81, flag: "USA" },
  { id: "lak-9", name: "Evv-76", teamId: "los-angeles-kings", position: "D", number: 1, gp: 0, goals: 0, assists: 0, pim: 0, overall: 75, flag: "USA" },

  { id: "dal-1", name: "Santi", teamId: "dallas-stars", position: "C", number: 1, gp: 4, goals: 1, assists: 3, pim: 0, overall: 83, flag: "Mexico" },
  { id: "dal-2", name: "Uzi", teamId: "dallas-stars", position: "RW", number: 19, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "dal-3", name: "TickleTimmy", teamId: "dallas-stars", position: "LW", number: 16, gp: 1, goals: 1, assists: 1, pim: 0 },
  { id: "dal-4", name: "Alex", teamId: "dallas-stars", position: "D", number: 3, gp: 0, goals: 0, assists: 0, pim: 0, overall: 78, flag: "USA" },
  { id: "dal-5", name: "Courtney", teamId: "dallas-stars", position: "D", number: 68, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "dal-6", name: "Zyler", teamId: "dallas-stars", position: "RW", number: 62, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "dal-7", name: "MrSmallEyes", teamId: "dallas-stars", position: "D", number: 28, gp: 0, goals: 0, assists: 0, pim: 0 },
  { id: "dal-8", name: "Salva", teamId: "dallas-stars", position: "C", number: 31, gp: 1, goals: 3, assists: 0, pim: 0 },
  { id: "dal-9", name: "PKPlis", teamId: "dallas-stars", position: "D", number: 18, gp: 0, goals: 0, assists: 0, pim: 0, overall: 71, flag: "USA" },
  
];

export const goalies: Goalie[] = [
  { id: "car-g1", name: "Wapw", teamId: "carolina-hurricanes", number: 23, gp: 3, gs: 3, wins: 2, losses: 0, otLosses: 1, saves: 63, goalsAgainst: 5, shutouts: 0, goals: 0, assists: 0, pim: 0, overall: 86, flag: "Ukraine" },
  { id: "pit-g1", name: "Fellow", teamId: "pittsburgh-penguins", number: 35, gp: 4, gs: 4, wins: 2, losses: 1, otLosses: 1, saves: 44, goalsAgainst: 5, shutouts: 0, goals: 0, assists: 0, pim: 0, overall: 87, flag: "Mexico" },
  { id: "pit-g2", name: "ElMosquito", teamId: "pittsburgh-penguins", number: 64, gp: 0, gs: 0, wins: 1, losses: 1, otLosses: 1, saves: 0, goalsAgainst: 0, shutouts: 0, goals: 0, assists: 0, pim: 0, overall: 86, flag: "USA" },
  { id: "tbl-g1", name: "SnugThePug", teamId: "tampa-bay-lightning", number: 33, gp: 1, gs: 1, wins: 1, losses: 1, otLosses: 1, saves: 0, goalsAgainst: 1, shutouts: 0, goals: 0, assists: 0, pim: 0, overall: 85, flag: "USA" },
  { id: "tbl-g2", name: "Pechs", teamId: "tampa-bay-lightning", number: 57, gp: 0, gs: 0, wins: 0, losses: 0, otLosses: 0, saves: 0, goalsAgainst: 0, shutouts: 0, goals: 0, assists: 0, pim: 0, overall: 94, xFactor: "Post to Post", flag: "USA" },
  { id: "bos-g1", name: "Apx11o", teamId: "boston-bruins", number: 29, gp: 2, gs: 2, wins: 1, losses: 1, otLosses: 1, saves: 4, goalsAgainst: 6, shutouts: 0, goals: 0, assists: 0, pim: 0, overall: 80, flag: "USA" },
  { id: "bos-g2", name: "Sparkles", teamId: "boston-bruins", number: 89, gp: 2, gs: 2, wins: 1, losses: 1, otLosses: 1, saves: 20, goalsAgainst: 3, shutouts: 0, goals: 0, assists: 0, pim: 0, overall: 90, star: "Sponge", flag: "USA" },
  { id: "nyr-g1", name: "DDino", teamId: "new-york-rangers", number: 31, gp: 4, gs: 4, wins: 3, losses: 1, otLosses: 1, saves: 61, goalsAgainst: 8, shutouts: 0, goals: 0, assists: 0, pim: 0, overall: 89, star: "Dialed In", flag: "DR" },
  { id: "uta-g1", name: "Sleepy", teamId: "utah-mammoths", number: 33, gp: 2, gs: 2, wins: 3, losses: 0, otLosses: 0, saves: 33, goalsAgainst: 3, shutouts: 0, goals: 0, assists: 0, pim: 0, overall: 83, flag: "USA" },
  { id: "vgk-g1", name: "TGOD", teamId: "vegas-golden-knights", number: 10, gp: 3, gs: 3, wins: 3, losses: 0, otLosses: 0, saves: 51, goalsAgainst: 1, shutouts: 0, goals: 0, assists: 0, pim: 0, overall: 98, xFactor: "Post to Post", flag: "USA" },
  { id: "vgk-g2", name: "King", teamId: "vegas-golden-knights", number: 4, gp: 1, gs: 1, wins: 3, losses: 0, otLosses: 0, saves: 0, goalsAgainst: 0, shutouts: 0, goals: 0, assists: 0, pim: 0, overall: 86, flag: "USA" },
  { id: "stl-g1", name: "Nova", teamId: "st-louis-blues", number: 40, gp: 2, gs: 2, wins: 1, losses: 3, otLosses: 0, saves: 6, goalsAgainst: 13, shutouts: 0, goals: 0, assists: 0, pim: 0 },
  { id: "lak-g1", name: "Riptide", teamId: "los-angeles-kings", number: 32, gp: 1, gs: 1, wins: 1, losses: 2, otLosses: 0, saves: 1, goalsAgainst: 5, shutouts: 0, goals: 0, assists: 0, pim: 0, overall: 84, flag: "USA" },
  { id: "lak-g2", name: "TheHolyHippo", teamId: "los-angeles-kings", number: 22, gp: 0, gs: 0, wins: 0, losses: 0, otLosses: 0, saves: 0, goalsAgainst: 0, shutouts: 0, goals: 0, assists: 0, pim: 0, overall: 90, star: "Warrior", flag: "USA" },
  { id: "dal-g1", name: "Jollyllama", teamId: "dallas-stars", number: 39, gp: 2, gs: 2, wins: 0, losses: 3, otLosses: 1, saves: 0, goalsAgainst: 6, shutouts: 0, goals: 0, assists: 0, pim: 0 },
];

export const coaches: Coach[] = [
  { id: "car-hc", name: "BNA", teamId: "carolina-hurricanes", role: "Head Coach" },
  { id: "car-ac", name: "Nickel", teamId: "carolina-hurricanes", role: "Assistant Coach" },

  { id: "pit-hc", name: "Chrisx", teamId: "pittsburgh-penguins", role: "Head Coach" },
  { id: "pit-ac", name: "Carterthegawd", teamId: "pittsburgh-penguins", role: "Assistant Coach" },

  { id: "tbl-hc", name: "Swordtsu", teamId: "tampa-bay-lightning", role: "Head Coach" },
  { id: "tbl-ac", name: "Pechs", teamId: "tampa-bay-lightning", role: "Assistant Coach" },

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

export const goaliePoints = (goalie: Goalie): number => goalie.goals + goalie.assists;

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

// Goalies who haven't faced a shot yet shouldn't headline a rate-stat
// leaderboard (an untested goalie's 0.00 GAA isn't a "best" GAA).
const hasFacedShots = (goalie: Goalie): boolean => goalieShotsAgainst(goalie) > 0;

// A goalie needs at least half as many GP as the current games-played
// leader to qualify for the SV%/GAA leaderboards — otherwise a one-game
// perfect sheet could sit at #1 all season without ever being challenged
// again. The bar rises automatically as the season goes on.
const qualifyingGoalieGp = (): number =>
  Math.max(1, Math.ceil(Math.max(0, ...goalies.map((g) => g.gp)) / 2));

export const isQualifiedGoalie = (goalie: Goalie): boolean =>
  hasFacedShots(goalie) && goalie.gp >= qualifyingGoalieGp();

export const topBySavePct = (count: number): Goalie[] =>
  [...goalies]
    .filter(isQualifiedGoalie)
    .sort((a, b) => goalieSavePct(b) - goalieSavePct(a))
    .slice(0, count);

export const topByGaa = (count: number): Goalie[] =>
  [...goalies]
    .filter(isQualifiedGoalie)
    .sort((a, b) => goalieGaa(a) - goalieGaa(b))
    .slice(0, count);

// League-wide rank in a stat (1 = leader), or undefined if the player has
// none of that stat yet — drives the "#4th in Assists" banner on a
// player's page. Ties resolve by array order, same as the leaderboards.
const rankIn = <T extends { id: string }>(sorted: T[], id: string): number | undefined => {
  const index = sorted.findIndex((item) => item.id === id);
  return index === -1 ? undefined : index + 1;
};

export const goalsRankFor = (skaterId: string): number | undefined => {
  const skater = skaters.find((s) => s.id === skaterId);
  if (!skater || skater.goals === 0) return undefined;
  return rankIn(
    [...skaters].sort((a, b) => b.goals - a.goals),
    skaterId,
  );
};

export const assistsRankFor = (skaterId: string): number | undefined => {
  const skater = skaters.find((s) => s.id === skaterId);
  if (!skater || skater.assists === 0) return undefined;
  return rankIn(
    [...skaters].sort((a, b) => b.assists - a.assists),
    skaterId,
  );
};

export const pointsRankFor = (skaterId: string): number | undefined => {
  const skater = skaters.find((s) => s.id === skaterId);
  if (!skater || skaterPoints(skater) === 0) return undefined;
  return rankIn(
    [...skaters].sort((a, b) => skaterPoints(b) - skaterPoints(a)),
    skaterId,
  );
};

export const savesRankFor = (goalieId: string): number | undefined => {
  const goalie = goalies.find((g) => g.id === goalieId);
  if (!goalie || goalie.saves === 0) return undefined;
  return rankIn(
    [...goalies].sort((a, b) => b.saves - a.saves),
    goalieId,
  );
};

export const savePctRankFor = (goalieId: string): number | undefined => {
  const goalie = goalies.find((g) => g.id === goalieId);
  if (!goalie || !isQualifiedGoalie(goalie)) return undefined;
  return rankIn(
    [...goalies].filter(isQualifiedGoalie).sort((a, b) => goalieSavePct(b) - goalieSavePct(a)),
    goalieId,
  );
};

export const gaaRankFor = (goalieId: string): number | undefined => {
  const goalie = goalies.find((g) => g.id === goalieId);
  if (!goalie || !isQualifiedGoalie(goalie)) return undefined;
  return rankIn(
    [...goalies].filter(isQualifiedGoalie).sort((a, b) => goalieGaa(a) - goalieGaa(b)),
    goalieId,
  );
};

export type Player =
  | ({ kind: "skater" } & Skater)
  | ({ kind: "goalie" } & Goalie)
  | ({ kind: "former" } & FormerPlayer);

// Name-based URL slug for a player's page (e.g. "Adam Cole" -> "adam-cole")
// instead of an internal id like "lak-3". Player names are kept unique
// (see formerPlayers.ts) so this can't collide.
export const playerSlug = (name: string): string => slugify(name);

export const getPlayerBySlug = (slug: string): Player | undefined => {
  const skater = skaters.find((s) => playerSlug(s.name) === slug);
  if (skater) return { kind: "skater", ...skater };
  const goalie = goalies.find((g) => playerSlug(g.name) === slug);
  if (goalie) return { kind: "goalie", ...goalie };
  const former = getFormerPlayerBySlug(slug);
  if (former) return { kind: "former", ...former };
  return undefined;
};

// Resolves a name (as stored on a SeasonAccolade) to a /players/:slug
// route, checking current rosters first, then the former-player registry.
export const getPlayerSlugByName = (name: string): string | undefined => {
  const skater = skaters.find((s) => s.name === name);
  if (skater) return playerSlug(skater.name);
  const goalie = goalies.find((g) => g.name === name);
  if (goalie) return playerSlug(goalie.name);
  const former = getFormerPlayerByName(name);
  return former ? playerSlug(former.name) : undefined;
};
