export interface HallOfFameEntry {
  id: string;
  playerName: string;
  /** Why they were inducted — shown as the card's subtitle. Optional. */
  note?: string;
}

// Curated inductees for the History page's Hall of Fame tab. Add an entry
// here to induct a player — this is a hand-picked list, not computed from
// stats.
export const hallOfFame: HallOfFameEntry[] = [];
