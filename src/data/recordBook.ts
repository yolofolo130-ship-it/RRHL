export type TrackableStat = "goals" | "assists" | "points" | "saves" | "shutouts";

export interface RecordEntry {
  label: string; // e.g. "Season", "Game", "Playoffs", "SV%"
  /** Record holder's name — shown in gold. Omit while the record is unset. */
  holder?: string;
  /** The stat itself, e.g. "42 goals (Season 21)". Omit while unset. */
  value?: string;
  /**
   * Plain numeric value of `value`, enabling live milestone tracking against
   * this season's current leader. Only set this for records that reduce to
   * one comparable number against a season-cumulative player field (see
   * `trackStat`) — leave both unset for records like a W-L-OTL line or a
   * single-game record that can't be compared against a season total.
   */
  trackValue?: number;
  /** Which current-season stat `trackValue` should be compared against. */
  trackStat?: TrackableStat;
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
    records: [
      { label: "Season", holder: "Ricey", value: "54 goals (Season 9)", trackValue: 54, trackStat: "goals" },
      { label: "Game", holder: "Ricey", value: "34 goals (Season 9)" },
      { label: "Playoffs", holder: "Sinny", value: "13 goals (Season 21)" },
    ],
  },
  {
    id: "assists",
    name: "Assists",
    records: [
      { label: "Season", holder: "Twizzy", value: "29 assists (Season 4)", trackValue: 29, trackStat: "assists" },
      { label: "Game", holder: "Renuu", value: "5 assists (Season 14)" },
      { label: "Playoffs", holder: "Renuu", value: "5 assists (Season 14)" },
    ],
  },
  {
    id: "points",
    name: "Points",
    records: [
      { label: "Season", holder: "Ricey", value: "83 points (Season 9)", trackValue: 83, trackStat: "points" },
      { label: "Game", holder: "Ricey", value: "56 points (Season 9)" },
      { label: "Playoffs", holder: "Snickers", value: "15 points (Season 14)" },
    ],
  },
  {
    id: "goalie",
    name: "Goalie",
    records: [
      { label: "Saves", holder: "TGOD", value: "89 saves (Season 23)", trackValue: 81, trackStat: "saves" },
      { label: "SV%", holder: "TGOD", value: ".992 SV% (Season 14)" },
      { label: "Record", holder: "TGOD", value: "10-0-0 (Season 9)" },
      { label: "Shutouts", holder: "TGOD", value: "7 shutouts (Season 5)", trackValue: 7, trackStat: "shutouts" },
    ],
  },
];
