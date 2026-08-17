import type { Game } from "./types";

// Centralized schedule. Standings and team records are calculated FROM this
// list (see src/utils/standings.ts) rather than duplicated as static numbers.
export const games: Game[] = [
  // ---------- Week 1 ----------
  { id: "g01", week: 1, date: "2026-07-31", time: "8:00 PM", homeTeamId: "vegas-golden-knights", awayTeamId: "tampa-bay-lightning", homeScore: 3, awayScore: 0, status: "final", wg: "TGOD", lg: "Sparkles", potg: "Sinny" },
  { id: "g02", week: 1, date: "2026-07-31", time: "9:05 PM", homeTeamId: "pittsburgh-penguins", awayTeamId: "new-york-rangers", homeScore: 5, awayScore: 1, status: "final", wg: "Fellow", lg: "Bungee", potg: "Chrisx" },
  { id: "g03", week: 1, date: "2026-08-01", time: "7:35 PM", homeTeamId: "dallas-stars", awayTeamId: "los-angeles-kings", homeScore: 0, awayScore: 10, status: "final", wg: "Gabriel", lg: "Uzi", potg: "MVP" },
  { id: "g04", week: 1, date: "2026-08-01", time: "8:40 PM", homeTeamId: "carolina-hurricanes", awayTeamId: "st-louis-blues", homeScore: 1, awayScore: 2, overtime: true, status: "final", wg: "Nova", lg: "Wapw", potg: "Vengeance" },
  { id: "g05", week: 1, date: "2026-08-02", time: "8:30 PM", homeTeamId: "boston-bruins", awayTeamId: "utah-mammoths", homeScore: 1, awayScore: 2, overtime: true, status: "final", wg: "Sleepy", lg: "Apx11o", potg: "MJ" },

  // ---------- Week 2 ----------
  { id: "g06", week: 2, date: "2026-08-03", time: "7:45 PM", homeTeamId: "tampa-bay-lightning", awayTeamId: "st-louis-blues", homeScore: 7, awayScore: 1, status: "final", wg: "SnugThePug", lg: "Nova", potg: "Cron" },
  { id: "g07", week: 2, date: "2026-08-03", time: "8:40 PM", homeTeamId: "boston-bruins", awayTeamId: "pittsburgh-penguins", homeScore: 0, awayScore: 5, status: "final", wg: "Fellow", lg: "Apx11o", potg: "Chrisx" },
  { id: "g08", week: 2, date: "2026-08-04", time: "7:00 PM", homeTeamId: "carolina-hurricanes", awayTeamId: "los-angeles-kings", homeScore: 8, awayScore: 4, status: "final", wg: "Wapw", potg: "DoughnutZ" },
  { id: "g09", week: 2, date: "2026-08-04", time: "8:15 PM", homeTeamId: "utah-mammoths", awayTeamId: "dallas-stars", homeScore: 4, awayScore: 2, status: "final", wg: "Sleepy", lg: "Jollyllama", potg: "Reject" },
  { id: "g10", week: 2, date: "2026-08-04", time: "9:05 PM", homeTeamId: "new-york-rangers", awayTeamId: "vegas-golden-knights", homeScore: 1, awayScore: 2, overtime: true, status: "final", wg: "TGOD", lg: "DDino", potg: "Siah" },

  // ---------- Week 3 ----------
  { id: "g11", week: 3, date: "2026-08-05", time: "7:30 PM", homeTeamId: "utah-mammoths", awayTeamId: "los-angeles-kings", homeScore: 5, awayScore: 0, status: "final", wg: "Baseball3122", lg: "Riptide", potg: "lilballerjimmy" },
  { id: "g12", week: 3, date: "2026-08-05", time: "8:35 PM", homeTeamId: "pittsburgh-penguins", awayTeamId: "carolina-hurricanes", homeScore: 2, awayScore: 3, overtime: true, status: "final", wg: "Wapw", lg: "Fellow", potg: "Full" },
  { id: "g13", week: 3, date: "2026-08-06", time: "7:05 PM", homeTeamId: "boston-bruins", awayTeamId: "st-louis-blues", homeScore: 11, awayScore: 1, status: "final", potg: "Kdog2020" },
  { id: "g14", week: 3, date: "2026-08-06", time: "8:15 PM", homeTeamId: "vegas-golden-knights", awayTeamId: "dallas-stars", homeScore: 6, awayScore: 0, status: "final", wg: "TGOD", potg: "Sinny" },
  { id: "g15", week: 3, date: "2026-08-06", time: "9:00 PM", homeTeamId: "tampa-bay-lightning", awayTeamId: "new-york-rangers", homeScore: 4, awayScore: 5, overtime: true, status: "final", wg: "DDino", lg: "Cron", potg: "Jrok" },

  // ---------- Week 4 ----------
  { id: "g16", week: 4, date: "2026-08-07", time: "7:35 PM", homeTeamId: "los-angeles-kings", awayTeamId: "st-louis-blues", homeScore: 5, awayScore: 2, status: "final", lg: "Nova", potg: "MVP" },
  { id: "g17", week: 4, date: "2026-08-07", time: "8:50 PM", homeTeamId: "pittsburgh-penguins", awayTeamId: "tampa-bay-lightning", homeScore: 5, awayScore: 2, status: "final", wg: "Fellow", lg: "Ehhabhd", potg: "Sid" },
  { id: "g18", week: 4, date: "2026-08-07", time: "9:30 PM", homeTeamId: "dallas-stars", awayTeamId: "new-york-rangers", homeScore: 3, awayScore: 4, overtime: true, status: "final", wg: "DDino", lg: "Jollyllama", potg: "Salva" },
  { id: "g19", week: 4, date: "2026-08-13", time: "8:10 PM", homeTeamId: "carolina-hurricanes", awayTeamId: "boston-bruins", homeScore: 3, awayScore: 4, status: "final", wg: "Idk67", lg: "Wapw", potg: "Kdog2020" },
  { id: "g20", week: 4, date: "2026-08-13", time: "9:05 PM", homeTeamId: "utah-mammoths", awayTeamId: "vegas-golden-knights", homeScore: 1, awayScore: 2, status: "final", wg: "Mesh", lg: "Sleepy", potg: "Sinny" },
  { id: "g21", week: 5, date: "2026-08-14", time: "7:55PM", homeTeamId: "st-louis-blues", awayTeamId: "dallas-stars", homeScore: 4, awayScore: 3, status: "final", lg: "Zyler", potg: "Hogeye" },
  { id: "g22", week: 5, date: "2026-08-16", time: "7:30PM", homeTeamId: "carolina-hurricanes", awayTeamId: "vegas-golden-knights", homeScore: 1, awayScore: 2, status: "final", wg: "TGOD", lg: "Badmilk", potg: "Siah" },
  { id: "g23", week: 5, date: "2026-08-15", time: "7:00PM", homeTeamId: "tampa-bay-lightning", awayTeamId: "boston-bruins", homeScore: 0, awayScore: 1, status: "forfeit" },
  { id: "g24", week: 5, date: "2026-08-15", time: "8:20PM", homeTeamId: "los-angeles-kings", awayTeamId: "pittsburgh-penguins", homeScore: 1, awayScore: 4, status: "final", wg: "Fellow", potg: "Chrisx" },
  { id: "g25", week: 5, date: "2026-08-15", time: "9:10PM", homeTeamId: "utah-mammoths", awayTeamId: "new-york-rangers", homeScore: 1, awayScore: 0, status: "forfeit" },
  { id: "g26", week: 6, date: "2026-08-17", time: "7:25PM", homeTeamId: "los-angeles-kings", awayTeamId: "boston-bruins", status: "upcoming" },
];

// Featured matchup shown prominently on the homepage.
export const featuredGameId = "g25";
