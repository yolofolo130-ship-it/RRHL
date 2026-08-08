import type { TeamSeasonHonor } from "./types";
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
  {
    id: "s2-scc-chi",
    season: "Season 2",
    teamId: "ft-chicago-blackhawks",
    honor: "Stanley Cup Champion",
    opponentTeamId: "pittsburgh-penguins",
    seriesScore: "2-0",
  },
  {
    id: "s2-pt-sea",
    season: "Season 2",
    teamId: "ft-seattle-kraken",
    honor: "President's Trophy",
  },
  {
    id: "s2-pow-pit",
    season: "Season 2",
    teamId: "pittsburgh-penguins",
    honor: "Prince Of Wales Trophy",
  },
  {
    id: "s2-pow-chi",
    season: "Season 2",
    teamId: "ft-chicago-blackhawks",
    honor: "Prince Of Wales Trophy",
  },
];

export const honorsForTeam = (teamId: string): TeamSeasonHonor[] =>
  teamSeasonHonors.filter((h) => h.teamId === teamId).sort(byNewestSeason);

// True for a championship-style honor (has a beaten opponent + score),
// which renders as a matchup card instead of a plain trophy card.
export const isChampionshipHonor = (honor: TeamSeasonHonor): boolean =>
  Boolean(honor.opponentTeamId && honor.seriesScore);

export interface TeamRef {
  name: string;
  logo?: string;
  color?: string;
  /** Only set for a current team — defunct teams have no page to link to. */
  href?: string;
}

// Resolves a TeamSeasonHonor's teamId to everything a card needs to show
// it: current teams get their logo/color/link, former (defunct) teams get
// whatever's on file in formerTeams.ts — logo/color optional, no link.
export const resolveTeamRef = (teamId: string): TeamRef => {
  const team = getTeamById(teamId);
  if (team) return { name: team.name, logo: team.logo, color: team.color, href: `/teams/${team.id}` };
  const former = getFormerTeamById(teamId);
  return { name: former?.name ?? "Unknown Team", logo: former?.logo, color: former?.color };
};
