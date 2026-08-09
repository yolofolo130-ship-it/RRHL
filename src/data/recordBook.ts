export interface RecordEntry {
  label: string; // e.g. "Season", "Game", "Playoffs", "SV%"
  /** Record holder's name — shown in gold. Omit while the record is unset. */
  holder?: string;
  /** The stat itself, e.g. "42 goals (Season 21)". Omit while unset. */
  value?: string;
}

export interface RecordCategory {
  id: string;
  name: string;
  records: RecordEntry[];
}

// Curated league records for the History page's Record Book tab. Fill in
// `holder`/`value` on an entry to publish it — this is a hand-picked list,
// not computed from stats.
export const recordBook: RecordCategory[] = [
  {
    id: "goals",
    name: "Goals",
    records: [{ label: "Season" }, { label: "Game" }, { label: "Playoffs" }],
  },
  {
    id: "assists",
    name: "Assists",
    records: [{ label: "Season" }, { label: "Game" }, { label: "Playoffs" }],
  },
  {
    id: "points",
    name: "Points",
    records: [{ label: "Season" }, { label: "Game" }, { label: "Playoffs" }],
  },
  {
    id: "goalie",
    name: "Goalie",
    records: [{ label: "Saves" }, { label: "SV%" }, { label: "Record" }, { label: "Shutouts" }],
  },
];
