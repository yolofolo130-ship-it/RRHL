import type { FormerTeam } from "./types";

import buffaloSabresLogo from "@/assets/logos/buffalo-sabres.png";
import detroitRedWingsLogo from "@/assets/logos/detroit-red-wings.png";
import floridaPanthersLogo from "@/assets/logos/florida-panthers.png";
import montrealCanadiensLogo from "@/assets/logos/montreal-canadiens.png";
import ottawaSenatorsLogo from "@/assets/logos/ottawa-senators.png";
import torontoMapleLeafsLogo from "@/assets/logos/toronto-maple-leafs.png";
import columbusBlueJacketsLogo from "@/assets/logos/columbus-blue-jackets.png";
import newJerseyDevilsLogo from "@/assets/logos/new-jersey-devils.png";
import newYorkIslandersLogo from "@/assets/logos/new-york-islanders.png";
import philadelphiaFlyersLogo from "@/assets/logos/philadelphia-flyers.png";
import washingtonCapitalsLogo from "@/assets/logos/washington-capitals.png";
import chicagoBlackhawksLogo from "@/assets/logos/chicago-blackhawks.png";
import coloradoAvalancheLogo from "@/assets/logos/colorado-avalanche.png";
import minnesotaWildLogo from "@/assets/logos/minnesota-wild.png";
import nashvillePredatorsLogo from "@/assets/logos/nashville-predators.png";
import winnipegJetsLogo from "@/assets/logos/winnipeg-jets.png";
import anaheimDucksLogo from "@/assets/logos/anaheim-ducks.png";
import calgaryFlamesLogo from "@/assets/logos/calgary-flames.png";
import edmontonOilersLogo from "@/assets/logos/edmonton-oilers.png";
import sanJoseSharksLogo from "@/assets/logos/san-jose-sharks.png";
import seattleKrakenLogo from "@/assets/logos/seattle-kraken.png";
import vancouverCanucksLogo from "@/assets/logos/vancouver-canucks.png";
import arizonaCoyotesLogo from "@/assets/logos/arizona-coyotes.png";

// Franchises that no longer exist (folded, not any of the current 10 teams).
// Add an entry here before pointing a TeamSeasonHonor's teamId at it.
// logo/color are optional — without them a plain placeholder box is shown
// instead of a crest.
export const formerTeams: FormerTeam[] = [
  { id: "ft-buffalo-sabres", name: "Buffalo Sabres", logo: buffaloSabresLogo, color: "#003087" },
  {
    id: "ft-detroit-red-wings",
    name: "Detroit Red Wings",
    logo: detroitRedWingsLogo,
    color: "#C8102E",
  },
  {
    id: "ft-florida-panthers",
    name: "Florida Panthers",
    logo: floridaPanthersLogo,
    color: "#C8102E",
  },
  {
    id: "ft-montreal-canadiens",
    name: "Montreal Canadiens",
    logo: montrealCanadiensLogo,
    color: "#AF1E2D",
  },
  {
    id: "ft-ottawa-senators",
    name: "Ottawa Senators",
    logo: ottawaSenatorsLogo,
    color: "#C8102E",
  },
  {
    id: "ft-toronto-maple-leafs",
    name: "Toronto Maple Leafs",
    logo: torontoMapleLeafsLogo,
    color: "#00205B",
  },
  {
    id: "ft-columbus-blue-jackets",
    name: "Columbus Blue Jackets",
    logo: columbusBlueJacketsLogo,
    color: "#041E42",
  },
  {
    id: "ft-new-jersey-devils",
    name: "New Jersey Devils",
    logo: newJerseyDevilsLogo,
    color: "#C8102E",
  },
  {
    id: "ft-new-york-islanders",
    name: "New York Islanders",
    logo: newYorkIslandersLogo,
    color: "#00539B",
  },
  {
    id: "ft-philadelphia-flyers",
    name: "Philadelphia Flyers",
    logo: philadelphiaFlyersLogo,
    color: "#F74902",
  },
  {
    id: "ft-washington-capitals",
    name: "Washington Capitals",
    logo: washingtonCapitalsLogo,
    color: "#C8102E",
  },
  {
    id: "ft-chicago-blackhawks",
    name: "Chicago Blackhawks",
    logo: chicagoBlackhawksLogo,
    color: "#C8102E",
  },
  {
    id: "ft-colorado-avalanche",
    name: "Colorado Avalanche",
    logo: coloradoAvalancheLogo,
    color: "#6F263D",
  },
  { id: "ft-minnesota-wild", name: "Minnesota Wild", logo: minnesotaWildLogo, color: "#154734" },
  {
    id: "ft-nashville-predators",
    name: "Nashville Predators",
    logo: nashvillePredatorsLogo,
    color: "#FFB81C",
  },
  { id: "ft-winnipeg-jets", name: "Winnipeg Jets", logo: winnipegJetsLogo, color: "#041E42" },
  { id: "ft-anaheim-ducks", name: "Anaheim Ducks", logo: anaheimDucksLogo, color: "#CF4520" },
  { id: "ft-calgary-flames", name: "Calgary Flames", logo: calgaryFlamesLogo, color: "#C8102E" },
  {
    id: "ft-edmonton-oilers",
    name: "Edmonton Oilers",
    logo: edmontonOilersLogo,
    color: "#FF4C00",
  },
  { id: "ft-san-jose-sharks", name: "San Jose Sharks", logo: sanJoseSharksLogo, color: "#006D75" },
  { id: "ft-seattle-kraken", name: "Seattle Kraken", logo: seattleKrakenLogo, color: "#57dedc" },
  {
    id: "ft-vancouver-canucks",
    name: "Vancouver Canucks",
    logo: vancouverCanucksLogo,
    color: "#00205B",
  },
  {
    id: "ft-arizona-coyotes",
    name: "Arizona Coyotes",
    logo: arizonaCoyotesLogo,
    color: "#E2D6B5",
  },
];

export const getFormerTeamById = (id: string): FormerTeam | undefined =>
  formerTeams.find((t) => t.id === id);
