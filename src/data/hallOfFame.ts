import carberHof from "@/assets/hall-of-fame/Carber-HOF.webp";
import miniSneakiHof from "@/assets/hall-of-fame/MiniSneaki.webp";

export interface HallOfFameEntry {
  id: string;
  playerName: string;
  /** Why they were inducted — shown as the card's subtitle. Optional. */
  note?: string;
  /** Semicolon-separated accolades, e.g. "Hart Memorial Trophy (S22); Stanley Cup Champion (S22)". */
  accolades?: string;
  /** Induction photo, imported directly from src/assets/hall-of-fame/. */
  headshot?: string;
  /** Team they retired from/are most associated with — id from teams.ts. */
  teamId?: string;
}

// Curated inductees for the History page's Hall of Fame tab. Click a card
// to see their photo and full accolades list. Add an entry here to induct
// a player — this is a hand-picked list, not computed from stats.
export const hallOfFame: HallOfFameEntry[] = [
  {
    id: "hof-carber",
    playerName: "Carber",
    note: "Retired as a St. Louis Blue in Season 17.",
    accolades: "S6 Jack Adams Trophy Winner 🎧; S6 Vezina Trophy Winner 🥅; S8 Vezina Trophy Winner 🥅; S8 Stanley Cup Champion 🏆; S9 Vezina Trophy Winner 🥅; S9 Stanley Cup Champion 🏆; S10 Jack Adams Trophy Winner 🎧; S10 Stanley Cup Champion 🏆",
    teamId: "st-louis-blues",
    headshot: carberHof,
  },
  {
    id: "hof-minisneaki",
    playerName: "MiniSneaki",
    note: "Retired as a Carolina Hurricane in Season 6.",
    accolades: "S1 Stanley Cup Champion 🏆; S1 Conn Smythe Trophy Winner 🏆",
    teamId: "carolina-hurricanes",
    headshot: miniSneakiHof,
  },
];
