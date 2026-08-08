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
    id: "s2-csc-chi",
    season: "Season 2",
    teamId: "ft-chicago-blackhawks",
    honor: "Clarence S. Campbell Trophy",
  },
  {
    id: "s3-scc-edm",
    season: "Season 3",
    teamId: "ft-edmonton-oilers",
    honor: "Stanley Cup Champion",
    opponentTeamId: "ft-anaheim-ducks",
    seriesScore: "3-0",
  },
  {
    id: "s3-pt-edm",
    season: "Season 3",
    teamId: "ft-edmonton-oilers",
    honor: "President's Trophy",
  },
  {
    id: "s3-pow-pit",
    season: "Season 3",
    teamId: "pittsburgh-penguins",
    honor: "Prince Of Wales Trophy",
  },
  {
    id: "s3-csc-edm",
    season: "Season 3",
    teamId: "ft-edmonton-oilers",
    honor: "Clarence S. Campbell Trophy",
  },
  {
    id: "s4-scc-edm",
    season: "Season 4",
    teamId: "ft-edmonton-oilers",
    honor: "Stanley Cup Champion",
    opponentTeamId: "carolina-hurricanes",
    seriesScore: "3-1",
  },
  {
    id: "s4-pt-edm",
    season: "Season 4",
    teamId: "ft-edmonton-oilers",
    honor: "President's Trophy",
  },
  {
    id: "s4-pow-car",
    season: "Season 4",
    teamId: "carolina-hurricanes",
    honor: "Prince Of Wales Trophy",
  },
  {
    id: "s4-csc-edm",
    season: "Season 4",
    teamId: "ft-edmonton-oilers",
    honor: "Clarence S. Campbell Trophy",
  },
  {
    id: "s5-scc-pit",
    season: "Season 5",
    teamId: "pittsburgh-penguins",
    honor: "Stanley Cup Champion",
    opponentTeamId: "ft-edmonton-oilers",
    seriesScore: "3-2",
  },
  {
    id: "s5-pt-edm",
    season: "Season 5",
    teamId: "ft-edmonton-oilers",
    honor: "President's Trophy",
  },
  {
    id: "s5-csc-edm",
    season: "Season 5",
    teamId: "ft-edmonton-oilers",
    honor: "Clarence S. Campbell Trophy",
  },
  {
    id: "s5-pow-pit",
    season: "Season 5",
    teamId: "pittsburgh-penguins",
    honor: "Prince Of Wales Trophy",
  },
  {
    id: "s6-scc-pit",
    season: "Season 6",
    teamId: "pittsburgh-penguins",
    honor: "Stanley Cup Champion",
    opponentTeamId: "st-louis-blues",
    seriesScore: "3-0",
  },
  {
    id: "s6-pt-stl",
    season: "Season 6",
    teamId: "st-louis-blues",
    honor: "President's Trophy",
  },
  {
    id: "s6-csc-stl",
    season: "Season 6",
    teamId: "st-louis-blues",
    honor: "Clarence S. Campbell Trophy",
  },
  {
    id: "s6-pow-col",
    season: "Season 6",
    teamId: "ft-colorado-avalanche",
    honor: "Prince Of Wales Trophy",
  },
  {
    id: "s7-scc-pit",
    season: "Season 7",
    teamId: "pittsburgh-penguins",
    honor: "Stanley Cup Champion",
    opponentTeamId: "ft-nashville-predators",
    seriesScore: "3-1",
  },
  {
    id: "s7-pt-pit",
    season: "Season 7",
    teamId: "pittsburgh-penguins",
    honor: "President's Trophy",
  },
  {
    id: "s7-csc-nsh",
    season: "Season 7",
    teamId: "ft-nashville-predators",
    honor: "Clarence S. Campbell Trophy",
  },
  {
    id: "s7-pow-pit",
    season: "Season 7",
    teamId: "pittsburgh-penguins",
    honor: "Prince Of Wales Trophy",
  },
  {
    id: "s8-scc-nsh",
    season: "Season 8",
    teamId: "ft-nashville-predators",
    honor: "Stanley Cup Champion",
    opponentTeamId: "ft-minnesota-wild",
    seriesScore: "3-0",
  },
  {
    id: "s8-pt-nsh",
    season: "Season 8",
    teamId: "ft-nashville-predators",
    honor: "President's Trophy",
  },
  {
    id: "s8-csc-nsh",
    season: "Season 8",
    teamId: "ft-nashville-predators",
    honor: "Clarence S. Campbell Trophy",
  },
  {
    id: "s8-pow-min",
    season: "Season 8",
    teamId: "ft-minnesota-wild",
    honor: "Prince Of Wales Trophy",
  },
  {
    id: "s9-scc-pit",
    season: "Season 9",
    teamId: "pittsburgh-penguins",
    honor: "Stanley Cup Champion",
    opponentTeamId: "ft-edmonton-oilers",
    seriesScore: "3-0",
  },
  {
    id: "s9-pt-pit",
    season: "Season 9",
    teamId: "pittsburgh-penguins",
    honor: "President's Trophy",
  },
  {
    id: "s9-csc-edm",
    season: "Season 9",
    teamId: "ft-edmonton-oilers",
    honor: "Clarence S. Campbell Trophy",
  },
  {
    id: "s9-pow-pit",
    season: "Season 9",
    teamId: "pittsburgh-penguins",
    honor: "Prince Of Wales Trophy",
  },
  {
    id: "s10-scc-stl",
    season: "Season 10",
    teamId: "st-louis-blues",
    honor: "Stanley Cup Champion",
    opponentTeamId: "ft-vancouver-canucks",
    seriesScore: "3-0",
  },
  {
    id: "s10-pt-stl",
    season: "Season 10",
    teamId: "st-louis-blues",
    honor: "President's Trophy",
  },
  {
    id: "s10-csc-stl",
    season: "Season 10",
    teamId: "st-louis-blues",
    honor: "Clarence S. Campbell Trophy",
  },
  {
    id: "s10-pow-pit",
    season: "Season 10",
    teamId: "pittsburgh-penguins",
    honor: "Prince Of Wales Trophy",
  },
  {
    id: "s11-scc-pit",
    season: "Season 11",
    teamId: "pittsburgh-penguins",
    honor: "Stanley Cup Champion",
    opponentTeamId: "ft-seattle-kraken",
    seriesScore: "3-0",
  },
  {
    id: "s11-pt-pit",
    season: "Season 11",
    teamId: "pittsburgh-penguins",
    honor: "President's Trophy",
  },
  {
    id: "s11-csc-sea",
    season: "Season 11",
    teamId: "ft-seattle-kraken",
    honor: "Clarence S. Campbell Trophy",
  },
  {
    id: "s11-pow-pit",
    season: "Season 11",
    teamId: "pittsburgh-penguins",
    honor: "Prince Of Wales Trophy",
  },
  {
    id: "s12-scc-vgk",
    season: "Season 12",
    teamId: "vegas-golden-knights",
    honor: "Stanley Cup Champion",
    opponentTeamId: "ft-florida-panthers",
    seriesScore: "3-0",
  },
  {
    id: "s12-pt-fla",
    season: "Season 12",
    teamId: "ft-florida-panthers",
    honor: "President's Trophy",
  },
  {
    id: "s12-csc-vgk",
    season: "Season 12",
    teamId: "vegas-golden-knights",
    honor: "Clarence S. Campbell Trophy",
  },
  {
    id: "s12-pow-fla",
    season: "Season 12",
    teamId: "ft-florida-panthers",
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
