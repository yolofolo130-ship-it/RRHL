import type { Team, TeamSeasonHonor } from "./types";
import { getTeamById } from "./teams";
import { getFormerTeamById } from "./formerTeams";
import { byNewestSeason } from "@/utils/season";

// Team-level honors won in past seasons, shown on a team's History tab.
// Add entries like:
// { id: "s22-scc-car", season: "Season 22", teamId: "carolina-hurricanes", honor: "Stanley Cup Champion", opponentTeamId: "boston-bruins", seriesScore: "4-2" },
export const teamSeasonHonors: TeamSeasonHonor[] = [
  {
    id: "s1-scc-car",
    season: "Season 1",
    teamId: "carolina-hurricanes",
    honor: "Stanley Cup Champion",
    opponentTeamId: "boston-bruins",
    seriesScore: "2-0",
  },
  {
    id: "s1-pt-bos",
    season: "Season 1",
    teamId: "boston-bruins",
    honor: "President's Trophy",
  },
  {
    id: "s1-pow-bos",
    season: "Season 1",
    teamId: "boston-bruins",
    honor: "Prince Of Wales Trophy",
  },
  {
    id: "s1-pow-car",
    season: "Season 1",
    teamId: "carolina-hurricanes",
    honor: "Prince Of Wales Trophy",
  },
];

export const honorsForTeam = (teamId: string): TeamSeasonHonor[] =>
  teamSeasonHonors.filter((h) => h.teamId === teamId).sort(byNewestSeason);

// True for a championship-style honor (has a beaten opponent + score),
// which renders as a matchup card instead of a plain trophy card.
export const isChampionshipHonor = (honor: TeamSeasonHonor): boolean =>
  Boolean(honor.opponentTeamId && honor.seriesScore);

// Resolves a TeamSeasonHonor's teamId to a display name and, if it's a
// current team, a route to link to (defunct teams have no page).
export const resolveHonorTeam = (teamId: string): { name: string; href?: string } => {
  const team = getTeamById(teamId);
  if (team) return { name: team.name, href: `/teams/${team.id}` };
  return { name: getFormerTeamById(teamId)?.name ?? "Unknown Team" };
};

// Same as resolveHonorTeam, but also returns the full Team (for its logo/
// color) when it's a current team.
export const resolveTeamRef = (teamId: string): { team?: Team; name: string } => {
  const team = getTeamById(teamId);
  if (team) return { team, name: team.name };
  return { name: getFormerTeamById(teamId)?.name ?? "Unknown Team" };
};
