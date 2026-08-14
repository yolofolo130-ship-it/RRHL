import type { Conference, Game, Team } from "@/data/types";

export const PLAYOFF_SPOTS_PER_CONFERENCE = 3;

export interface Streak {
  type: "W" | "L";
  count: number;
}

export interface TeamStanding {
  team: Team;
  gp: number;
  w: number;
  l: number;
  otl: number;
  gf: number;
  ga: number;
  diff: number;
  pts: number;
  streak: Streak | null;
}

// Current win/loss streak, newest final game first. OT losses count as a
// loss for streak purposes (same simple W/L split shown in the table) —
// only the outcome breaks the streak, not how it was lost.
function computeStreak(teamId: string, games: Game[]): Streak | null {
  const results = games
    .filter(
      (g) =>
        g.status === "final" &&
        g.homeScore != null &&
        g.awayScore != null &&
        (g.homeTeamId === teamId || g.awayTeamId === teamId),
    )
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))
    .map((g): "W" | "L" => {
      const isHome = g.homeTeamId === teamId;
      const won = isHome ? g.homeScore! > g.awayScore! : g.awayScore! > g.homeScore!;
      return won ? "W" : "L";
    });

  if (results.length === 0) return null;

  const type = results[0];
  let count = 0;
  for (const result of results) {
    if (result !== type) break;
    count++;
  }
  return { type, count };
}

/**
 * Standings are derived entirely from final games + overtime flags, using
 * standard rec-hockey scoring: win = 2 pts, OT/SO loss = 1 pt, loss = 0 pts.
 * Nothing here is hand-entered — update schedule.ts and this recalculates.
 *
 * `teams` must be the full league roster, not a conference subset — cross-
 * conference games need both sides resolvable or they're silently dropped.
 * Filter by conference on the returned array instead (see
 * `standingsForConference`).
 */
export function computeStandings(teams: Team[], games: Game[]): TeamStanding[] {
  const byId = new Map<string, TeamStanding>(
    teams.map((team) => [
      team.id,
      { team, gp: 0, w: 0, l: 0, otl: 0, gf: 0, ga: 0, diff: 0, pts: 0, streak: null },
    ]),
  );

  for (const game of games) {
    if (game.status !== "final" || game.homeScore == null || game.awayScore == null) {
      continue;
    }
    const home = byId.get(game.homeTeamId);
    const away = byId.get(game.awayTeamId);
    if (!home || !away) continue;

    home.gp += 1;
    away.gp += 1;
    home.gf += game.homeScore;
    home.ga += game.awayScore;
    away.gf += game.awayScore;
    away.ga += game.homeScore;

    if (game.homeScore > game.awayScore) {
      home.w += 1;
      if (game.overtime) away.otl += 1;
      else away.l += 1;
    } else {
      away.w += 1;
      if (game.overtime) home.otl += 1;
      else home.l += 1;
    }
  }

  for (const standing of byId.values()) {
    standing.diff = standing.gf - standing.ga;
    standing.pts = standing.w * 2 + standing.otl;
    standing.streak = computeStreak(standing.team.id, games);
  }

  return teams.map((team) => byId.get(team.id)!);
}

export function sortStandings(standings: TeamStanding[]): TeamStanding[] {
  return [...standings].sort(
    (a, b) => b.pts - a.pts || b.diff - a.diff || b.gf - a.gf,
  );
}

export function isPlayoffPosition(rankWithinConference: number): boolean {
  return rankWithinConference <= PLAYOFF_SPOTS_PER_CONFERENCE;
}

/**
 * Computes standings against the full league (so cross-conference games are
 * credited correctly) and returns just one conference, sorted.
 */
export function standingsForConference(
  conference: Conference,
  allTeams: Team[],
  games: Game[],
): TeamStanding[] {
  const full = computeStandings(allTeams, games);
  return sortStandings(full.filter((s) => s.team.conference === conference));
}
