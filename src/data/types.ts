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

// A person who appears in league history (season stats and/or accolades)
// but isn't on a current team roster. Gets its own page like a current
// player, minus a current-team header and Season 23 stats.
export interface FormerPlayer {
  id: string;
  name: string;
}

// Team-level honors won in past seasons (Stanley Cup champion, President's
// Trophy, etc.) — separate from SeasonAccolade, which is per-player. More
// than one team can share the same honor/season (e.g. co-champions).
export interface TeamSeasonHonor {
  id: string;
  season: string; // e.g. "Season 1"
  teamId: string;
  honor: string; // e.g. "Stanley Cup Champion", "President's Trophy"
  // Series context for a championship-style honor (shows a matchup card
  // with both teams and the score instead of a plain trophy card). Omit
  // for honors that aren't a head-to-head series (President's Trophy, etc.)
  opponentTeamId?: string;
  seriesScore?: string; // e.g. "2-0"
}

// A franchise that appears in league history but no longer exists (folded,
// not one of the current 10 teams in any form). `teamId` on a
// TeamSeasonHonor can point here instead of teams.ts.
export interface FormerTeam {
  id: string;
  name: string;
}
