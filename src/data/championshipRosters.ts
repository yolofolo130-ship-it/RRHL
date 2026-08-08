import type { ChampionshipRosterEntry } from "./types";
import { byOldestSeason } from "@/utils/season";

// Everyone on a Stanley Cup-winning roster that season — drives the
// champion badge next to a player's name. Empty until filled in; add
// entries like:
// { id: "s22-champ-chrisx", season: "Season 22", playerName: "Chrisx" },
export const championshipRosters: ChampionshipRosterEntry[] = [
  // Season 1 — Carolina Hurricanes
  { id: "s1-champ-vengeance", season: "Season 1", playerName: "Vengeance" },
  { id: "s1-champ-uncnotfrog", season: "Season 1", playerName: "UncNotFrog" },
  { id: "s1-champ-hockeyboi", season: "Season 1", playerName: "Hockey Boi" },
  { id: "s1-champ-adamcole", season: "Season 1", playerName: "Adam Cole" },
  { id: "s1-champ-carsonreeves", season: "Season 1", playerName: "Carsonreeves" },
  { id: "s1-champ-minisneaki", season: "Season 1", playerName: "MiniSneaki" },

  // Season 2 — Chicago Blackhawks
  { id: "s2-champ-swordtsu", season: "Season 2", playerName: "Swordtsu" },
  { id: "s2-champ-b3nn3tt1", season: "Season 2", playerName: "B3NN3TT1" },
  { id: "s2-champ-sane", season: "Season 2", playerName: "Sane" },

  // Season 3 — Edmonton Oilers
  { id: "s3-champ-flaganoid", season: "Season 3", playerName: "Flaganoid" },
  { id: "s3-champ-tgod", season: "Season 3", playerName: "TGOD" },
  { id: "s3-champ-krampuz", season: "Season 3", playerName: "Krampuz" },
  { id: "s3-champ-nicklas", season: "Season 3", playerName: "Nicklas" },
  { id: "s3-champ-2tone", season: "Season 3", playerName: "2Tone" },
  { id: "s3-champ-vengeance", season: "Season 3", playerName: "Vengeance" },

  // Season 4 — Edmonton Oilers
  { id: "s4-champ-stefonb", season: "Season 4", playerName: "StefonB" },
  { id: "s4-champ-tgod", season: "Season 4", playerName: "TGOD" },
  { id: "s4-champ-vengeance", season: "Season 4", playerName: "Vengeance" },
  { id: "s4-champ-sinny", season: "Season 4", playerName: "Sinny" },
  { id: "s4-champ-2tone", season: "Season 4", playerName: "2Tone" },
  { id: "s4-champ-flaganoid", season: "Season 4", playerName: "Flaganoid" },

  // Season 5 — Pittsburgh Penguins
  { id: "s5-champ-mvp", season: "Season 5", playerName: "MVP" },
  { id: "s5-champ-chrisx", season: "Season 5", playerName: "Chrisx" },
  { id: "s5-champ-carterthegawd", season: "Season 5", playerName: "Carterthegawd" },
  { id: "s5-champ-tgod", season: "Season 5", playerName: "TGOD" },
  { id: "s5-champ-hockeyboi", season: "Season 5", playerName: "Hockey Boi" },
  { id: "s5-champ-siah", season: "Season 5", playerName: "Siah" },

  // Season 6 — Pittsburgh Penguins
  { id: "s6-champ-chrisx", season: "Season 6", playerName: "Chrisx" },
  { id: "s6-champ-huddawg", season: "Season 6", playerName: "Huddawg" },
  { id: "s6-champ-siah", season: "Season 6", playerName: "Siah" },
  { id: "s6-champ-snickers", season: "Season 6", playerName: "Snickers" },
  { id: "s6-champ-flaganoid", season: "Season 6", playerName: "Flaganoid" },
  { id: "s6-champ-caleb", season: "Season 6", playerName: "Caleb" },
  { id: "s6-champ-tgod", season: "Season 6", playerName: "TGOD" },
  { id: "s6-champ-airdawg", season: "Season 6", playerName: "Airdawg" },
  { id: "s6-champ-mvp", season: "Season 6", playerName: "MVP" },
  { id: "s6-champ-carterthegawd", season: "Season 6", playerName: "Carterthegawd" },

  // Season 7 — Pittsburgh Penguins
  { id: "s7-champ-vengeance", season: "Season 7", playerName: "Vengeance" },
  { id: "s7-champ-chrisx", season: "Season 7", playerName: "Chrisx" },
  { id: "s7-champ-snickers", season: "Season 7", playerName: "Snickers" },
  { id: "s7-champ-badmilk", season: "Season 7", playerName: "Badmilk" },
  { id: "s7-champ-tgod", season: "Season 7", playerName: "TGOD" },
  { id: "s7-champ-carterthegawd", season: "Season 7", playerName: "Carterthegawd" },

  // Season 8 — Nashville Predators
  { id: "s8-champ-ricey", season: "Season 8", playerName: "Ricey" },
  { id: "s8-champ-huddawg", season: "Season 8", playerName: "Huddawg" },
  { id: "s8-champ-pechs", season: "Season 8", playerName: "Pechs" },
  { id: "s8-champ-mvp", season: "Season 8", playerName: "MVP" },
  { id: "s8-champ-b3nn3tt1", season: "Season 8", playerName: "B3NN3TT1" },
  { id: "s8-champ-carber", season: "Season 8", playerName: "Carber" },

  // Season 9 — Pittsburgh Penguins
  { id: "s9-champ-chrisx", season: "Season 9", playerName: "Chrisx" },
  { id: "s9-champ-luhdj", season: "Season 9", playerName: "Luh DJ" },
  { id: "s9-champ-uncnotfrog", season: "Season 9", playerName: "UncNotFrog" },
  { id: "s9-champ-jj", season: "Season 9", playerName: "JJ" },
  { id: "s9-champ-tgod", season: "Season 9", playerName: "TGOD" },
  { id: "s9-champ-carsonreeves", season: "Season 9", playerName: "Carsonreeves" },
  { id: "s9-champ-carterthegawd", season: "Season 9", playerName: "Carterthegawd" },
  { id: "s9-champ-ricey", season: "Season 9", playerName: "Ricey" },
  { id: "s9-champ-carber", season: "Season 9", playerName: "Carber" },

  // Season 10 — St. Louis Blues
  { id: "s10-champ-luhdj", season: "Season 10", playerName: "Luh DJ" },
  { id: "s10-champ-jj", season: "Season 10", playerName: "JJ" },
  { id: "s10-champ-44worthy", season: "Season 10", playerName: "44worthy" },
  { id: "s10-champ-birbman", season: "Season 10", playerName: "Birbman" },
  { id: "s10-champ-swordtsu", season: "Season 10", playerName: "Swordtsu" },
  { id: "s10-champ-rennu", season: "Season 10", playerName: "Rennu" },
  { id: "s10-champ-dxrk", season: "Season 10", playerName: "Dxrk" },
  { id: "s10-champ-ricey", season: "Season 10", playerName: "Ricey" },
  { id: "s10-champ-carber", season: "Season 10", playerName: "Carber" },

  // Season 11 — Pittsburgh Penguins
  { id: "s11-champ-chrisx", season: "Season 11", playerName: "Chrisx" },
  { id: "s11-champ-fire", season: "Season 11", playerName: "Fire" },
  { id: "s11-champ-tgod", season: "Season 11", playerName: "TGOD" },
  { id: "s11-champ-zac", season: "Season 11", playerName: "Zac" },
  { id: "s11-champ-hockeyboi", season: "Season 11", playerName: "Hockey Boi" },
  { id: "s11-champ-adamcole", season: "Season 11", playerName: "Adam Cole" },
  { id: "s11-champ-b3nn3tt1", season: "Season 11", playerName: "B3NN3TT1" },
  { id: "s11-champ-carterthegawd", season: "Season 11", playerName: "Carterthegawd" },

  // Season 12 — Vegas Golden Knights
  { id: "s12-champ-sparkles", season: "Season 12", playerName: "Sparkles" },
  { id: "s12-champ-siah", season: "Season 12", playerName: "Siah" },
  { id: "s12-champ-tgod", season: "Season 12", playerName: "TGOD" },
  { id: "s12-champ-mood", season: "Season 12", playerName: "Mood" },
  { id: "s12-champ-kranky", season: "Season 12", playerName: "Kranky" },
  { id: "s12-champ-cheddar", season: "Season 12", playerName: "Cheddar" },
  { id: "s12-champ-therupist", season: "Season 12", playerName: "therupist" },
  { id: "s12-champ-aj", season: "Season 12", playerName: "AJ" },
  { id: "s12-champ-tidy", season: "Season 12", playerName: "Tidy" },
  { id: "s12-champ-swizzy", season: "Season 12", playerName: "Swizzy" },

  // Season 13 — Colorado Avalanche
  { id: "s13-champ-therupist", season: "Season 13", playerName: "therupist" },
  { id: "s13-champ-snickers", season: "Season 13", playerName: "Snickers" },
  { id: "s13-champ-flaganoid", season: "Season 13", playerName: "Flaganoid" },
  { id: "s13-champ-repent", season: "Season 13", playerName: "Repent" },
  { id: "s13-champ-beasty", season: "Season 13", playerName: "Beasty" },
  { id: "s13-champ-duck", season: "Season 13", playerName: "Duck" },
  { id: "s13-champ-eli", season: "Season 13", playerName: "Eli" },
  { id: "s13-champ-b3nn3tt1", season: "Season 13", playerName: "B3NN3TT1" },

  // Season 14 — St. Louis Blues
  { id: "s14-champ-kranky", season: "Season 14", playerName: "Kranky" },
  { id: "s14-champ-josuxrr", season: "Season 14", playerName: "JosuxRR" },
  { id: "s14-champ-rennu", season: "Season 14", playerName: "Rennu" },
  { id: "s14-champ-sid", season: "Season 14", playerName: "Sid" },
  { id: "s14-champ-claymore", season: "Season 14", playerName: "Claymore" },
  { id: "s14-champ-bryce", season: "Season 14", playerName: "Bryce" },
  { id: "s14-champ-adamcole", season: "Season 14", playerName: "Adam Cole" },
  { id: "s14-champ-nexo", season: "Season 14", playerName: "Nexo" },
  { id: "s14-champ-ehhabhd", season: "Season 14", playerName: "Ehhabhd" },

  // Season 15 — Seattle Kraken
  { id: "s15-champ-sleepy", season: "Season 15", playerName: "Sleepy" },
  { id: "s15-champ-josuxrr", season: "Season 15", playerName: "JosuxRR" },
  { id: "s15-champ-rennu", season: "Season 15", playerName: "Rennu" },
  { id: "s15-champ-boa", season: "Season 15", playerName: "Boa" },
  { id: "s15-champ-alex", season: "Season 15", playerName: "Alex" },
  { id: "s15-champ-jazzmir", season: "Season 15", playerName: "Jazzmir" },
  { id: "s15-champ-claymore", season: "Season 15", playerName: "Claymore" },
  { id: "s15-champ-moon", season: "Season 15", playerName: "Moon" },
  { id: "s15-champ-huddawg", season: "Season 15", playerName: "Huddawg" },
  { id: "s15-champ-vengeance", season: "Season 15", playerName: "Vengeance" },
];

// Every season this player was on a Stanley Cup-winning roster, oldest
// first — drives the champion badge (which shows the season(s) directly
// rather than just a count).
export const championshipSeasonsFor = (playerName: string): string[] =>
  Array.from(
    new Set(
      championshipRosters.filter((c) => c.playerName === playerName).map((c) => c.season),
    ),
  ).sort((a, b) => byOldestSeason({ season: a }, { season: b }));
