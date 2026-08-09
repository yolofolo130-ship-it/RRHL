export interface RecordBookEntry {
  id: string;
  record: string; // e.g. "Most Goals in a Season"
  holder: string; // e.g. "Chrisx — 10 goals (Season 23)"
}

// Curated league records for the History page's Record Book tab. Add an
// entry here to log a record — this is a hand-picked list, not computed
// from stats.
export const recordBook: RecordBookEntry[] = [];
