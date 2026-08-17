import type { Game } from "@/data/types";

export interface HeadToHeadRecord {
  teamId: string;
  w: number;
  l: number;
  otl: number;
  gf: number;
  ga: number;
}

export interface HeadToHeadResult {
  teamA: HeadToHeadRecord;
  teamB: HeadToHeadRecord;
  /** Completed meetings between the two teams, newest first. */
  games: Game[];
}

/**
 * All-time-style head-to-head record between two teams, computed straight
 * from the schedule (same source-of-truth approach as standings.ts). Only
 * covers whatever season(s) are present in `games` — currently that's the
 * active season only, since past seasons aren't archived into schedule.ts.
 */
export function computeHeadToHead(
  teamAId: string,
  teamBId: string,
  games: Game[],
): HeadToHeadResult {
  const teamA: HeadToHeadRecord = { teamId: teamAId, w: 0, l: 0, otl: 0, gf: 0, ga: 0 };
  const teamB: HeadToHeadRecord = { teamId: teamBId, w: 0, l: 0, otl: 0, gf: 0, ga: 0 };

  const meetings = games.filter(
    (g) =>
      (g.status === "final" || g.status === "forfeit") &&
      g.homeScore != null &&
      g.awayScore != null &&
      ((g.homeTeamId === teamAId && g.awayTeamId === teamBId) ||
        (g.homeTeamId === teamBId && g.awayTeamId === teamAId)),
  );

  for (const game of meetings) {
    const aIsHome = game.homeTeamId === teamAId;
    const aScore = aIsHome ? game.homeScore! : game.awayScore!;
    const bScore = aIsHome ? game.awayScore! : game.homeScore!;

    teamA.gf += aScore;
    teamA.ga += bScore;
    teamB.gf += bScore;
    teamB.ga += aScore;

    if (aScore > bScore) {
      teamA.w += 1;
      if (game.overtime) teamB.otl += 1;
      else teamB.l += 1;
    } else {
      teamB.w += 1;
      if (game.overtime) teamA.otl += 1;
      else teamA.l += 1;
    }
  }

  const sortedMeetings = [...meetings].sort(
    (a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id),
  );

  return { teamA, teamB, games: sortedMeetings };
}
