export type Conference = "east" | "west";

export interface Team {
  id: string;
  name: string;
  city: string;
  nickname: string;
  abbr: string;
  conference: Conference;
  logo: string;
  color: string;
}

export type GameStatus = "upcoming" | "live" | "final" | "postponed";

export interface Game {
  id: string;
  week: number;
  date: string; // ISO date, e.g. 2026-08-06
  time: string; // display time, e.g. "7:00 PM"
  homeTeamId: string;
  awayTeamId: string;
  homeScore?: number;
  awayScore?: number;
  overtime?: boolean;
  status: GameStatus;
}

export type Position = "C" | "LW" | "RW" | "D" | "G";

export interface Skater {
  id: string;
  name: string;
  teamId: string;
  position: Exclude<Position, "G">;
  number: number;
  gp: number;
  goals: number;
  assists: number;
  pim: number;
}

export interface Goalie {
  id: string;
  name: string;
  teamId: string;
  number: number;
  gp: number;
  wins: number;
  losses: number;
  otLosses: number;
  saves: number;
  goalsAgainst: number;
}

export type CoachRole = "Head Coach" | "Assistant Coach";

export interface Coach {
  id: string;
  name: string;
  teamId: string;
  role: CoachRole;
}

export type StaffCategory =
  | "Commissioner"
  | "League Management"
  | "Game Operations"
  | "Board of Directors"
  | "Media"
  | "Moderation";

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  category: StaffCategory;
  discord: string;
  avatar?: string;
}

export interface Accolade {
  id: string;
  name: string;
  /** Display name of the winning player, team, or coach. Empty until awarded. */
  winner?: string;
}

// Past-season stats. `playerName` links back to a current roster entry in
// players.ts by name — skater/goalie ids reset every season, names don't.
export interface SeasonSkaterStats {
  id: string;
  playerName: string;
  season: string; // e.g. "Season 22"
  teamId: string;
  position: Exclude<Position, "G">;
  gp: number;
  goals: number;
  assists: number;
  pim: number;
}

export interface SeasonGoalieStats {
  id: string;
  playerName: string;
  season: string;
  teamId: string;
  gp: number;
  wins: number;
  losses: number;
  otLosses: number;
  saves: number;
  goalsAgainst: number;
}

// Awards won in past seasons. Separate from Accolade (which is only ever
// the current season's not-yet-decided awards) — `playerName` links back
// to a roster entry the same way the season stats above do.
export interface SeasonAccolade {
  id: string;
  season: string; // e.g. "Season 22"
  accoladeName: string; // e.g. "Hart Memorial Trophy"
  playerName: string;
}
