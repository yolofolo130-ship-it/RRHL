import type { Game, Goalie, Skater, Team } from "@/data/types";
import { computeStandings, type TeamStanding } from "./standings";

export interface PowerRanking {
  team: Team;
  standing: TeamStanding;
  /** Average `overall` rating across the team's rated players, or null if none are rated yet. */
  rosterOverall: number | null;
  score: number;
  rank: number;
  previousRank: number | null;
  /** Positive = moved up since last week, negative = moved down, null = no prior week to compare. */
  movement: number | null;
}

const ROSTER_BASELINE_OVERALL = 70;

function averageRosterOverall(teamId: string, skaters: Skater[], goalies: Goalie[]): number | null {
  const rated = [
    ...skaters.filter((s) => s.teamId === teamId && s.overall != null),
    ...goalies.filter((g) => g.teamId === teamId && g.overall != null),
  ];
  if (rated.length === 0) return null;
  return rated.reduce((sum, p) => sum + p.overall!, 0) / rated.length;
}

/**
 * Power score blends four signals into one number, higher = stronger:
 *  - winning percentage (the biggest factor, up to 60 pts)
 *  - goal differential per game (~4 pts per goal/game of margin)
 *  - current streak (~1.5 pts per game, hot teams up / cold teams down)
 *  - roster talent: average rated `overall` vs a 70-OVR baseline (~0.5 pt per point of OVR)
 * Unlike standings, this isn't meant to be exact — it's a rough "who's
 * actually playing well right now" read, not a tiebreaker-grade stat.
 */
function computeScore(standing: TeamStanding, rosterOverall: number | null): number {
  const pointsPct = standing.gp > 0 ? standing.pts / (standing.gp * 2) : 0;
  const diffPerGame = standing.gp > 0 ? standing.diff / standing.gp : 0;
  const streakValue = standing.streak
    ? standing.streak.type === "W"
      ? standing.streak.count
      : -standing.streak.count
    : 0;
  const rosterBonus = rosterOverall != null ? (rosterOverall - ROSTER_BASELINE_OVERALL) * 0.5 : 0;

  return pointsPct * 60 + diffPerGame * 4 + streakValue * 1.5 + rosterBonus;
}

function rankByScore(
  teams: Team[],
  games: Game[],
  skaters: Skater[],
  goalies: Goalie[],
): { team: Team; standing: TeamStanding; rosterOverall: number | null; score: number }[] {
  const standings = computeStandings(teams, games);
  return standings
    .map((standing) => {
      const rosterOverall = averageRosterOverall(standing.team.id, skaters, goalies);
      return {
        team: standing.team,
        standing,
        rosterOverall,
        score: computeScore(standing, rosterOverall),
      };
    })
    .sort((a, b) => b.score - a.score);
}

/**
 * Ranks all teams by power score and, when a prior week's worth of games
 * exists, diffs against last week's order for movement arrows — computed
 * from the same schedule (games up through the previous week), not a
 * separately stored snapshot.
 */
export function computePowerRankings(
  teams: Team[],
  games: Game[],
  skaters: Skater[],
  goalies: Goalie[],
): PowerRanking[] {
  const playedWeeks = games
    .filter((g) => g.status === "final" || g.status === "forfeit")
    .map((g) => g.week);
  const currentWeek = playedWeeks.length > 0 ? Math.max(...playedWeeks) : 0;

  const current = rankByScore(teams, games, skaters, goalies);

  const previousGames = games.filter((g) => g.week < currentWeek);
  const hasPreviousWeek = previousGames.some(
    (g) => g.status === "final" || g.status === "forfeit",
  );
  const previousRankById = hasPreviousWeek
    ? new Map(
        rankByScore(teams, previousGames, skaters, goalies).map((r, i) => [r.team.id, i + 1]),
      )
    : null;

  return current.map((entry, index) => {
    const rank = index + 1;
    const previousRank = previousRankById?.get(entry.team.id) ?? null;
    return {
      ...entry,
      rank,
      previousRank,
      movement: previousRank != null ? previousRank - rank : null,
    };
  });
}
