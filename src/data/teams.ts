import type { Team } from "./types";

import carolinaLogo from "@/assets/logos/carolina-hurricanes.png";
import pittsburghLogo from "@/assets/logos/pittsburgh-penguins.png";
import tampaBayLogo from "@/assets/logos/tampa-bay-lightning.png";
import bostonLogo from "@/assets/logos/boston-bruins.png";
import newYorkLogo from "@/assets/logos/new-york-rangers.png";
import utahLogo from "@/assets/logos/utah-mammoths.png";
import vegasLogo from "@/assets/logos/vegas-golden-knights.png";
import stLouisLogo from "@/assets/logos/st-louis-blues.png";
import losAngelesLogo from "@/assets/logos/los-angeles-kings.png";
import dallasLogo from "@/assets/logos/dallas-stars.png";

// Team colors are used sparingly, only as subtle accents on team-specific
// cards and pages. The primary site identity stays black / white / gray.
export const teams: Team[] = [
  {
    id: "carolina-hurricanes",
    name: "Carolina Hurricanes",
    city: "Carolina",
    nickname: "Hurricanes",
    abbr: "CAR",
    conference: "east",
    logo: carolinaLogo,
    color: "#C8102E",
  },
  {
    id: "pittsburgh-penguins",
    name: "Pittsburgh Penguins",
    city: "Pittsburgh",
    nickname: "Penguins",
    abbr: "PIT",
    conference: "east",
    logo: pittsburghLogo,
    color: "#FCB514",
  },
  {
    id: "tampa-bay-lightning",
    name: "Tampa Bay Lightning",
    city: "Tampa Bay",
    nickname: "Lightning",
    abbr: "TBL",
    conference: "east",
    logo: tampaBayLogo,
    color: "#002868",
  },
  {
    id: "boston-bruins",
    name: "Boston Bruins",
    city: "Boston",
    nickname: "Bruins",
    abbr: "BOS",
    conference: "east",
    logo: bostonLogo,
    color: "#ffb81c",
  },
  {
    id: "new-york-rangers",
    name: "New York Rangers",
    city: "New York",
    nickname: "Rangers",
    abbr: "NYR",
    conference: "east",
    logo: newYorkLogo,
    color: "#0038a8",
  },
  {
    id: "utah-mammoths",
    name: "Utah Mammoths",
    city: "Utah",
    nickname: "Mammoths",
    abbr: "UTA",
    conference: "west",
    logo: utahLogo,
    color: "#71afe5",
  },
  {
    id: "vegas-golden-knights",
    name: "Vegas Golden Knights",
    city: "Vegas",
    nickname: "Golden Knights",
    abbr: "VGK",
    conference: "west",
    logo: vegasLogo,
    color: "#b4975a",
  },
  {
    id: "st-louis-blues",
    name: "St Louis Blues",
    city: "St Louis",
    nickname: "Blues",
    abbr: "STL",
    conference: "west",
    logo: stLouisLogo,
    color: "#002F87",
  },
  {
    id: "los-angeles-kings",
    name: "Los Angeles Kings",
    city: "Los Angeles",
    nickname: "Kings",
    abbr: "LAK",
    conference: "west",
    logo: losAngelesLogo,
    color: "#a2aaad",
  },
  {
    id: "dallas-stars",
    name: "Dallas Stars",
    city: "Dallas",
    nickname: "Stars",
    abbr: "DAL",
    conference: "west",
    logo: dallasLogo,
    color: "#006847",
  },
];

export const getTeamById = (id: string): Team | undefined =>
  teams.find((t) => t.id === id);

export const getTeamsByConference = (conference: "east" | "west"): Team[] =>
  teams.filter((t) => t.conference === conference);
