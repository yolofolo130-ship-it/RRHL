import type { Game } from "./types";

// Centralized schedule. Standings and team records are calculated FROM this
// list (see src/utils/standings.ts) rather than duplicated as static numbers.
export const games: Game[] = [
  // ---------- Week 1 ----------
  { id: "g01", week: 1, date: "2026-07-01", time: "8:00 PM", homeTeamId: "carolina-hurricanes", awayTeamId: "pittsburgh-penguins", homeScore: 4, awayScore: 2, status: "final" },
  { id: "g02", week: 1, date: "2026-07-01", time: "9:00 PM", homeTeamId: "tampa-bay-lightning", awayTeamId: "carolina-hurricanes", homeScore: 5, awayScore: 3, status: "final" },
  { id: "g03", week: 1, date: "2026-07-02", time: "8:00 PM", homeTeamId: "utah-mammoths", awayTeamId: "vegas-golden-knights", homeScore: 3, awayScore: 5, status: "final" },
  { id: "g04", week: 1, date: "2026-07-03", time: "7:30 PM", homeTeamId: "st-louis-blues", awayTeamId: "utah-mammoths", homeScore: 2, awayScore: 4, status: "final" },
  { id: "g05", week: 1, date: "2026-07-05", time: "8:00 PM", homeTeamId: "carolina-hurricanes", awayTeamId: "vegas-golden-knights", homeScore: 2, awayScore: 5, status: "final" },

  // ---------- Week 2 ----------
  { id: "g06", week: 2, date: "2026-07-08", time: "7:00 PM", homeTeamId: "boston-bruins", awayTeamId: "carolina-hurricanes", homeScore: 4, awayScore: 1, status: "final" },
  { id: "g07", week: 2, date: "2026-07-08", time: "9:00 PM", homeTeamId: "carolina-hurricanes", awayTeamId: "new-york-rangers", homeScore: 3, awayScore: 2, overtime: true, status: "final" },
  { id: "g08", week: 2, date: "2026-07-09", time: "8:00 PM", homeTeamId: "utah-mammoths", awayTeamId: "los-angeles-kings", homeScore: 5, awayScore: 2, status: "final" },
  { id: "g09", week: 2, date: "2026-07-10", time: "7:30 PM", homeTeamId: "dallas-stars", awayTeamId: "utah-mammoths", homeScore: 3, awayScore: 2, overtime: true, status: "final" },
  { id: "g10", week: 2, date: "2026-07-12", time: "8:00 PM", homeTeamId: "pittsburgh-penguins", awayTeamId: "dallas-stars", homeScore: 4, awayScore: 3, overtime: true, status: "final" },

  // ---------- Week 3 ----------
  { id: "g11", week: 3, date: "2026-07-15", time: "7:00 PM", homeTeamId: "pittsburgh-penguins", awayTeamId: "tampa-bay-lightning", homeScore: 3, awayScore: 2, status: "final" },
  { id: "g12", week: 3, date: "2026-07-15", time: "9:00 PM", homeTeamId: "boston-bruins", awayTeamId: "pittsburgh-penguins", homeScore: 5, awayScore: 2, status: "final" },
  { id: "g13", week: 3, date: "2026-07-16", time: "8:00 PM", homeTeamId: "vegas-golden-knights", awayTeamId: "st-louis-blues", homeScore: 4, awayScore: 1, status: "final" },
  { id: "g14", week: 3, date: "2026-07-17", time: "7:30 PM", homeTeamId: "vegas-golden-knights", awayTeamId: "los-angeles-kings", homeScore: 6, awayScore: 3, status: "final" },
  { id: "g15", week: 3, date: "2026-07-19", time: "8:00 PM", homeTeamId: "tampa-bay-lightning", awayTeamId: "utah-mammoths", homeScore: 3, awayScore: 2, status: "final" },

  // ---------- Week 4 ----------
  { id: "g16", week: 4, date: "2026-07-22", time: "7:00 PM", homeTeamId: "new-york-rangers", awayTeamId: "pittsburgh-penguins", homeScore: 2, awayScore: 4, status: "final" },
  { id: "g17", week: 4, date: "2026-07-22", time: "9:00 PM", homeTeamId: "tampa-bay-lightning", awayTeamId: "boston-bruins", homeScore: 4, awayScore: 3, overtime: true, status: "final" },
  { id: "g18", week: 4, date: "2026-07-23", time: "8:00 PM", homeTeamId: "dallas-stars", awayTeamId: "vegas-golden-knights", homeScore: 2, awayScore: 3, overtime: true, status: "final" },
  { id: "g19", week: 4, date: "2026-07-24", time: "7:30 PM", homeTeamId: "st-louis-blues", awayTeamId: "los-angeles-kings", homeScore: 3, awayScore: 5, status: "final" },
  { id: "g20", week: 4, date: "2026-07-26", time: "8:00 PM", homeTeamId: "boston-bruins", awayTeamId: "los-angeles-kings", homeScore: 4, awayScore: 1, status: "final" },

  // ---------- Week 5 ----------
  { id: "g21", week: 5, date: "2026-07-29", time: "7:00 PM", homeTeamId: "tampa-bay-lightning", awayTeamId: "new-york-rangers", homeScore: 6, awayScore: 2, status: "final" },
  { id: "g22", week: 5, date: "2026-07-29", time: "9:00 PM", homeTeamId: "boston-bruins", awayTeamId: "new-york-rangers", homeScore: 3, awayScore: 1, status: "final" },
  { id: "g23", week: 5, date: "2026-07-30", time: "8:00 PM", homeTeamId: "st-louis-blues", awayTeamId: "dallas-stars", homeScore: 4, awayScore: 2, status: "final" },
  { id: "g24", week: 5, date: "2026-07-31", time: "7:30 PM", homeTeamId: "los-angeles-kings", awayTeamId: "dallas-stars", homeScore: 1, awayScore: 4, status: "final" },
  { id: "g25", week: 5, date: "2026-08-02", time: "8:00 PM", homeTeamId: "new-york-rangers", awayTeamId: "st-louis-blues", homeScore: 3, awayScore: 4, overtime: true, status: "final" },

  // ---------- Week 6 (current) ----------
  { id: "g26", week: 6, date: "2026-08-06", time: "7:00 PM", homeTeamId: "st-louis-blues", awayTeamId: "new-york-rangers", status: "postponed" },
  { id: "g27", week: 6, date: "2026-08-06", time: "8:00 PM", homeTeamId: "utah-mammoths", awayTeamId: "tampa-bay-lightning", homeScore: 2, awayScore: 2, status: "live" },
  { id: "g28", week: 6, date: "2026-08-08", time: "7:30 PM", homeTeamId: "dallas-stars", awayTeamId: "pittsburgh-penguins", status: "upcoming" },
  { id: "g29", week: 6, date: "2026-08-08", time: "8:00 PM", homeTeamId: "vegas-golden-knights", awayTeamId: "carolina-hurricanes", status: "upcoming" },

  // ---------- Week 7 ----------
  { id: "g30", week: 7, date: "2026-08-13", time: "7:00 PM", homeTeamId: "pittsburgh-penguins", awayTeamId: "carolina-hurricanes", status: "upcoming" },
  { id: "g31", week: 7, date: "2026-08-13", time: "8:00 PM", homeTeamId: "los-angeles-kings", awayTeamId: "boston-bruins", status: "upcoming" },
  { id: "g32", week: 7, date: "2026-08-15", time: "7:30 PM", homeTeamId: "new-york-rangers", awayTeamId: "tampa-bay-lightning", status: "upcoming" },

  // ---------- Week 8 ----------
  { id: "g33", week: 8, date: "2026-08-20", time: "8:00 PM", homeTeamId: "los-angeles-kings", awayTeamId: "utah-mammoths", status: "upcoming" },
  { id: "g34", week: 8, date: "2026-08-20", time: "9:00 PM", homeTeamId: "dallas-stars", awayTeamId: "vegas-golden-knights", status: "upcoming" },
  { id: "g35", week: 8, date: "2026-08-22", time: "8:00 PM", homeTeamId: "boston-bruins", awayTeamId: "tampa-bay-lightning", status: "upcoming" },
];

// Featured matchup shown prominently on the homepage.
export const featuredGameId = "g35";
