export interface HallOfFameEntry {
  id: string;
  playerName: string;
  /** Why they were inducted — shown as the card's subtitle. Optional. */
  note?: string;
  /** Semicolon-separated accolades, e.g. "Hart Memorial Trophy (S22); Stanley Cup Champion (S22)". */
  accolades?: string;
  /** Induction photo, imported directly from src/assets/hall-of-fame/. */
  headshot?: string;
}

// Curated inductees for the History page's Hall of Fame tab. Click a card
// to see their photo and full accolades list. Add an entry here to induct
// a player — this is a hand-picked list, not computed from stats.
export const hallOfFame: HallOfFameEntry[] = [];
