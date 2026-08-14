import type { Game } from "./types";

// Centralized schedule. Standings and team records are calculated FROM this
// list (see src/utils/standings.ts) rather than duplicated as static numbers.
export const games: Game[] = [
  // ---------- Week 1 ----------
  { id: "g01", week: 1, date: "2026-07-31", time: "8:00 PM", homeTeamId: "vegas-golden-knights", awayTeamId: "tampa-bay-lightning", homeScore: 3, awayScore: 0, status: "final" },
  { id: "g02", week: 1, date: "2026-07-31", time: "9:05 PM", homeTeamId: "pittsburgh-penguins", awayTeamId: "new-york-rangers", homeScore: 5, awayScore: 1, status: "final" },
  { id: "g03", week: 1, date: "2026-08-01", time: "7:35 PM", homeTeamId: "dallas-stars", awayTeamId: "los-angeles-kings", homeScore: 0, awayScore: 10, status: "final" },
  { id: "g04", week: 1, date: "2026-08-01", time: "8:40 PM", homeTeamId: "carolina-hurricanes", awayTeamId: "st-louis-blues", homeScore: 1, awayScore: 2, overtime: true, status: "final" },
  { id: "g05", week: 1, date: "2026-08-02", time: "8:30 PM", homeTeamId: "boston-bruins", awayTeamId: "utah-mammoths", homeScore: 1, awayScore: 2, overtime: true, status: "final" },

  // ---------- Week 2 ----------
  { id: "g06", week: 2, date: "2026-08-03", time: "7:45 PM", homeTeamId: "tampa-bay-lightning", awayTeamId: "st-louis-blues", homeScore: 7, awayScore: 1, status: "final" },
  { id: "g07", week: 2, date: "2026-08-03", time: "8:40 PM", homeTeamId: "boston-bruins", awayTeamId: "pittsburgh-penguins", homeScore: 0, awayScore: 5, status: "final" },
  { id: "g08", week: 2, date: "2026-08-04", time: "7:00 PM", homeTeamId: "carolina-hurricanes", awayTeamId: "los-angeles-kings", homeScore: 8, awayScore: 4, status: "final" },
  { id: "g09", week: 2, date: "2026-08-04", time: "8:15 PM", homeTeamId: "utah-mammoths", awayTeamId: "dallas-stars", homeScore: 4, awayScore: 2, status: "final" },
  { id: "g10", week: 2, date: "2026-08-04", time: "9:05 PM", homeTeamId: "new-york-rangers", awayTeamId: "vegas-golden-knights", homeScore: 1, awayScore: 2, overtime: true, status: "final" },

  // ---------- Week 3 ----------
  { id: "g11", week: 3, date: "2026-08-05", time: "7:30 PM", homeTeamId: "utah-mammoths", awayTeamId: "los-angeles-kings", homeScore: 5, awayScore: 0, status: "final" },
  { id: "g12", week: 3, date: "2026-08-05", time: "8:35 PM", homeTeamId: "pittsburgh-penguins", awayTeamId: "carolina-hurricanes", homeScore: 2, awayScore: 3, overtime: true, status: "final" },
  { id: "g13", week: 3, date: "2026-08-06", time: "7:05 PM", homeTeamId: "boston-bruins", awayTeamId: "st-louis-blues", homeScore: 11, awayScore: 1, status: "final" },
  { id: "g14", week: 3, date: "2026-08-06", time: "8:15 PM", homeTeamId: "vegas-golden-knights", awayTeamId: "dallas-stars", homeScore: 6, awayScore: 0, status: "final" },
  { id: "g15", week: 3, date: "2026-08-06", time: "9:00 PM", homeTeamId: "tampa-bay-lightning", awayTeamId: "new-york-rangers", homeScore: 4, awayScore: 5, overtime: true, status: "final" },

  // ---------- Week 4 ----------
  { id: "g16", week: 4, date: "2026-08-07", time: "7:35 PM", homeTeamId: "los-angeles-kings", awayTeamId: "st-louis-blues", homeScore: 5, awayScore: 2, status: "final" },
  { id: "g17", week: 4, date: "2026-08-07", time: "8:50 PM", homeTeamId: "pittsburgh-penguins", awayTeamId: "tampa-bay-lightning", homeScore: 5, awayScore: 2, status: "final" },
  { id: "g18", week: 4, date: "2026-08-07", time: "9:30 PM", homeTeamId: "dallas-stars", awayTeamId: "new-york-rangers", homeScore: 3, awayScore: 4, overtime: true, status: "final" },
  { id: "g19", week: 4, date: "2026-08-13", time: "8:10 PM", homeTeamId: "carolina-hurricanes", awayTeamId: "boston-bruins", homeScore: 3, awayScore: 4, status: "final" },
  { id: "g20", week: 4, date: "2026-08-13", time: "9:05 PM", homeTeamId: "utah-mammoths", awayTeamId: "vegas-golden-knights", homeScore: 1, awayScore: 2, status: "final" },
  { id: "g21", week: 5, date: "2026-08-14", time: "7:55PM", homeTeamId: "st-louis-blues", awayTeamId: "dallas-stars", status: "upcoming" },
  { id: "g22", week: 5, date: "2026-08-14", time: "9:00PM", homeTeamId: "carolina-hurricanes", awayTeamId: "vegas-golden-knights", status: "upcoming" },
  { id: "g23", week: 6, date: "2026-08-15", time: "7:00", homeTeamId: "tampa-bay-lightning", awayTeamId: "boston-bruins", status: "upcoming" },
  { id: "g24", week: 6, date: "2026-08-15", time: "8:20PM", homeTeamId: "los-angeles-kings", awayTeamId: "pittsburgh-penguins", status: "upcoming" },
  { id: "g25", week: 6, date: "2026-08-15", time: "9:10PM", homeTeamId: "utah-mammoths", awayTeamId: "new-york-rangers", status: "upcoming" },
];

// Featured matchup shown prominently on the homepage.
export const featuredGameId = "g20";
