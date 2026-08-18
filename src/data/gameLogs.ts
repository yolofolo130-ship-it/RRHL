import type { SkaterGameStatLine, GoalieGameStatLine, InNetAppearance } from "./types";
import { games } from "./schedule";

// Real per-game stat lines a skater has logged. Sparse by design: a
// player's row for a given game still shows up in "Last 5 Games" even
// with no entry here — see `lastGamesFor` below, which pulls the last 5
// FINAL games straight from schedule.ts for the player's team. That
// means the moment a game's status flips to "final", every player on
// both teams gets a new row automatically, no edits needed here. This
// file only needs a NEW entry when you have a real stat line to add for
// a player in a specific game (or to update one already at 0).
//
// `playerName` must exactly match the player's name in players.ts.
// `gameId` must match a game id in schedule.ts.
// Grouped by team below purely for readability when editing on GitHub.
export const skaterGameStatLines: SkaterGameStatLine[] = [
  // ---------- CAROLINA HURRICANES ----------
  { playerName: "BNA", gameId: "g04", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "BNA", gameId: "g08", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "BNA", gameId: "g12", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "DoughnutZ", gameId: "g04", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "DoughnutZ", gameId: "g08", goals: 4, assists: 0, points: 4, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "DoughnutZ", gameId: "g12", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Full", gameId: "g04", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Full", gameId: "g08", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Full", gameId: "g12", goals: 1, assists: 0, points: 1, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Fishbowl", gameId: "g04", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Fishbowl", gameId: "g08", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Fishbowl", gameId: "g12", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "AJ", gameId: "g04", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "AJ", gameId: "g08", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "AJ", gameId: "g12", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Nickel", gameId: "g04", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Nickel", gameId: "g08", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Nickel", gameId: "g12", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Peach", gameId: "g04", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Peach", gameId: "g08", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Peach", gameId: "g12", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Badmilk", gameId: "g04", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Badmilk", gameId: "g08", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Badmilk", gameId: "g12", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  // ---------- PITTSBURGH PENGUINS ----------
  { playerName: "Chrisx", gameId: "g02", goals: 4, assists: 1, points: 5, pim: 0, ppg: 0, shg: 0, shots: 6, shifts: 0 },
  { playerName: "Chrisx", gameId: "g07", goals: 3, assists: 3, points: 6, pim: 0, ppg: 0, shg: 0, shots: 5, shifts: 0 },
  { playerName: "Chrisx", gameId: "g12", goals: 1, assists: 0, points: 1, pim: 0, ppg: 0, shg: 0, shots: 2, shifts: 0 },
  { playerName: "Chrisx", gameId: "g17", goals: 2, assists: 3, points: 5, pim: 0, ppg: 0, shg: 0, shots: 2, shifts: 0 },
  { playerName: "Chrisx", gameId: "g24", goals: 2, assists: 0, points: 2, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "RestartedRyan", gameId: "g02", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "RestartedRyan", gameId: "g07", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "RestartedRyan", gameId: "g12", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "RestartedRyan", gameId: "g17", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Mason", gameId: "g02", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Mason", gameId: "g07", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Mason", gameId: "g12", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Mason", gameId: "g17", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Sid", gameId: "g02", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Sid", gameId: "g07", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Sid", gameId: "g12", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Sid", gameId: "g17", goals: 2, assists: 0, points: 2, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "chicharito9260", gameId: "g02", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "chicharito9260", gameId: "g07", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "chicharito9260", gameId: "g12", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "chicharito9260", gameId: "g17", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "44worthy", gameId: "g02", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "44worthy", gameId: "g07", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "44worthy", gameId: "g12", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "44worthy", gameId: "g17", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "LBeard0320", gameId: "g02", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "LBeard0320", gameId: "g07", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "LBeard0320", gameId: "g12", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "LBeard0320", gameId: "g17", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Isagi", gameId: "g02", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Isagi", gameId: "g07", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Isagi", gameId: "g12", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Isagi", gameId: "g17", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Arri", gameId: "g02", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Arri", gameId: "g07", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Arri", gameId: "g12", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Arri", gameId: "g17", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Carterthegawd", gameId: "g02", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Carterthegawd", gameId: "g07", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Carterthegawd", gameId: "g12", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Carterthegawd", gameId: "g17", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  // ---------- TAMPA BAY LIGHTNING ----------
  { playerName: "Swordtsu", gameId: "g01", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Swordtsu", gameId: "g06", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Swordtsu", gameId: "g15", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Swordtsu", gameId: "g17", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Cron", gameId: "g01", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Cron", gameId: "g06", goals: 6, assists: 0, points: 6, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Cron", gameId: "g15", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Cron", gameId: "g17", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Snickers", gameId: "g01", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Snickers", gameId: "g06", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Snickers", gameId: "g15", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Snickers", gameId: "g17", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "KindSnack000", gameId: "g01", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "KindSnack000", gameId: "g06", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "KindSnack000", gameId: "g15", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "KindSnack000", gameId: "g17", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "LillianTheGreat", gameId: "g01", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "LillianTheGreat", gameId: "g06", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "LillianTheGreat", gameId: "g15", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "LillianTheGreat", gameId: "g17", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "UncNotFrog", gameId: "g01", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "UncNotFrog", gameId: "g06", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "UncNotFrog", gameId: "g15", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "UncNotFrog", gameId: "g17", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Ehhabhd", gameId: "g01", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Ehhabhd", gameId: "g06", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Ehhabhd", gameId: "g15", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Ehhabhd", gameId: "g17", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "GeorgePigs", gameId: "g01", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "GeorgePigs", gameId: "g06", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "GeorgePigs", gameId: "g15", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "GeorgePigs", gameId: "g17", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Boa", gameId: "g01", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Boa", gameId: "g06", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Boa", gameId: "g15", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Boa", gameId: "g17", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  // ---------- BOSTON BRUINS ----------
  { playerName: "Kdog2020", gameId: "g05", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Kdog2020", gameId: "g07", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Kdog2020", gameId: "g13", goals: 6, assists: 0, points: 6, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Kdog2020", gameId: "g19", goals: 3, assists: 0, points: 3, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Boolit", gameId: "g05", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Boolit", gameId: "g07", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Boolit", gameId: "g13", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Bounty", gameId: "g05", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Bounty", gameId: "g07", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Bounty", gameId: "g13", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "KingPenguin", gameId: "g05", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "KingPenguin", gameId: "g07", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "KingPenguin", gameId: "g13", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Huddawg", gameId: "g05", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Huddawg", gameId: "g07", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Huddawg", gameId: "g13", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Jace", gameId: "g05", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Jace", gameId: "g07", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Jace", gameId: "g13", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Funko", gameId: "g05", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Funko", gameId: "g07", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Funko", gameId: "g13", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Idk67", gameId: "g05", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Idk67", gameId: "g07", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Idk67", gameId: "g13", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  // ---------- NEW YORK RANGERS ----------
  { playerName: "Jrok", gameId: "g02", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Jrok", gameId: "g10", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Jrok", gameId: "g15", goals: 3, assists: 0, points: 3, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Jrok", gameId: "g18", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Bungee", gameId: "g02", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Bungee", gameId: "g10", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Bungee", gameId: "g15", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Bungee", gameId: "g18", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Eli", gameId: "g02", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Eli", gameId: "g10", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Eli", gameId: "g15", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Eli", gameId: "g18", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Sfgoofy", gameId: "g02", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Sfgoofy", gameId: "g10", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Sfgoofy", gameId: "g15", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Sfgoofy", gameId: "g18", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Carsonreeves", gameId: "g02", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Carsonreeves", gameId: "g10", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Carsonreeves", gameId: "g15", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Carsonreeves", gameId: "g18", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Cakelocks", gameId: "g02", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Cakelocks", gameId: "g10", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Cakelocks", gameId: "g15", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Cakelocks", gameId: "g18", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "DieLit", gameId: "g02", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "DieLit", gameId: "g10", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "DieLit", gameId: "g15", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "DieLit", gameId: "g18", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  // ---------- UTAH MAMMOTHS ----------
  { playerName: "MJ", gameId: "g05", goals: 1, assists: 0, points: 1, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MJ", gameId: "g09", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MJ", gameId: "g11", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Renuu", gameId: "g05", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Renuu", gameId: "g09", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Renuu", gameId: "g11", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "lilballerjimmy", gameId: "g05", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "lilballerjimmy", gameId: "g09", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "lilballerjimmy", gameId: "g11", goals: 3, assists: 0, points: 3, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Reject", gameId: "g05", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Reject", gameId: "g09", goals: 2, assists: 1, points: 3, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Reject", gameId: "g11", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Jazzmir", gameId: "g05", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Jazzmir", gameId: "g09", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Jazzmir", gameId: "g11", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "5starmax", gameId: "g05", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "5starmax", gameId: "g09", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "5starmax", gameId: "g11", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Randomcrazynoob", gameId: "g05", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Randomcrazynoob", gameId: "g09", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Randomcrazynoob", gameId: "g11", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Twin", gameId: "g05", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Twin", gameId: "g09", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Twin", gameId: "g11", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Zac", gameId: "g05", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Zac", gameId: "g09", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Zac", gameId: "g11", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Baseball3122", gameId: "g05", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Baseball3122", gameId: "g09", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Baseball3122", gameId: "g11", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Mood", gameId: "g05", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Mood", gameId: "g09", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Mood", gameId: "g11", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  // ---------- VEGAS GOLDEN KNIGHTS ----------
  { playerName: "Sinny", gameId: "g01", goals: 2, assists: 0, points: 2, pim: 0, ppg: 0, shg: 0, shots: 3, shifts: 2 },
  { playerName: "Sinny", gameId: "g10", goals: 0, assists: 1, points: 1, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Sinny", gameId: "g14", goals: 3, assists: 0, points: 3, pim: 0, ppg: 0, shg: 0, shots: 6, shifts: 2 },
  { playerName: "Sinny", gameId: "g20", goals: 2, assists: 0, points: 2, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Butter", gameId: "g01", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Butter", gameId: "g10", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Butter", gameId: "g14", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Butter", gameId: "g27", goals: 4, assists: 0, points: 4, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Siah", gameId: "g01", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Siah", gameId: "g10", goals: 1, assists: 0, points: 1, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Siah", gameId: "g14", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Siah", gameId: "g22", goals: 2, assists: 0, points: 2, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Mesh", gameId: "g01", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Mesh", gameId: "g10", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Mesh", gameId: "g14", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Caleb", gameId: "g01", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Caleb", gameId: "g10", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Caleb", gameId: "g14", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Sidedeer", gameId: "g01", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Sidedeer", gameId: "g10", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Sidedeer", gameId: "g14", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Drago", gameId: "g01", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Drago", gameId: "g10", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Drago", gameId: "g14", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "MadMax", gameId: "g01", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MadMax", gameId: "g10", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MadMax", gameId: "g14", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Darkness", gameId: "g01", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Darkness", gameId: "g10", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Darkness", gameId: "g14", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  // ---------- ST. LOUIS BLUES ----------
  { playerName: "Vengeance", gameId: "g04", goals: 2, assists: 0, points: 2, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Vengeance", gameId: "g06", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Vengeance", gameId: "g13", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Vengeance", gameId: "g16", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Augy", gameId: "g04", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Augy", gameId: "g06", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Augy", gameId: "g13", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Augy", gameId: "g16", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "EvanTheGuy", gameId: "g04", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "EvanTheGuy", gameId: "g06", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "EvanTheGuy", gameId: "g13", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "EvanTheGuy", gameId: "g16", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Fire", gameId: "g04", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Fire", gameId: "g06", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Fire", gameId: "g13", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Fire", gameId: "g16", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Tidy", gameId: "g04", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Tidy", gameId: "g06", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Tidy", gameId: "g13", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Tidy", gameId: "g16", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "TDLMarcus", gameId: "g04", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "TDLMarcus", gameId: "g06", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "TDLMarcus", gameId: "g13", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "TDLMarcus", gameId: "g16", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Hogeye", gameId: "g04", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Hogeye", gameId: "g06", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Hogeye", gameId: "g13", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Hogeye", gameId: "g16", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Hogeye", gameId: "g21", goals: 4, assists: 0, points: 4, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "AlexKiller", gameId: "g04", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "AlexKiller", gameId: "g06", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "AlexKiller", gameId: "g13", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "AlexKiller", gameId: "g16", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  // ---------- LOS ANGELES KINGS ----------
  { playerName: "MVP", gameId: "g03", goals: 9, assists: 0, points: 9, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MVP", gameId: "g08", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MVP", gameId: "g11", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MVP", gameId: "g16", goals: 4, assists: 0, points: 4, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Gabriel", gameId: "g03", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Gabriel", gameId: "g08", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Gabriel", gameId: "g11", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Gabriel", gameId: "g16", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Adam Cole", gameId: "g03", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Adam Cole", gameId: "g08", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Adam Cole", gameId: "g11", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Adam Cole", gameId: "g16", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "2Tone", gameId: "g03", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "2Tone", gameId: "g08", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "2Tone", gameId: "g11", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "2Tone", gameId: "g16", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Duck", gameId: "g03", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Duck", gameId: "g08", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Duck", gameId: "g11", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Duck", gameId: "g16", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "JosuxRR", gameId: "g03", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "JosuxRR", gameId: "g08", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "JosuxRR", gameId: "g11", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "JosuxRR", gameId: "g16", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Kranky", gameId: "g03", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Kranky", gameId: "g08", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Kranky", gameId: "g11", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Kranky", gameId: "g16", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "StefonB", gameId: "g03", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "StefonB", gameId: "g08", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "StefonB", gameId: "g11", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "StefonB", gameId: "g16", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Evv-76", gameId: "g03", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Evv-76", gameId: "g08", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Evv-76", gameId: "g11", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Evv-76", gameId: "g16", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  // ---------- DALLAS STARS ----------
  { playerName: "Santi", gameId: "g03", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Santi", gameId: "g09", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Santi", gameId: "g14", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Santi", gameId: "g18", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Uzi", gameId: "g03", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Uzi", gameId: "g09", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Uzi", gameId: "g14", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Uzi", gameId: "g18", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "TickleTimmy", gameId: "g03", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "TickleTimmy", gameId: "g09", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "TickleTimmy", gameId: "g14", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "TickleTimmy", gameId: "g18", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Alex", gameId: "g03", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Alex", gameId: "g09", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Alex", gameId: "g14", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Alex", gameId: "g18", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Courtney", gameId: "g03", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Courtney", gameId: "g09", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Courtney", gameId: "g14", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Courtney", gameId: "g18", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Zyler", gameId: "g03", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Zyler", gameId: "g09", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Zyler", gameId: "g14", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Zyler", gameId: "g18", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "MrSmallEyes", gameId: "g03", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MrSmallEyes", gameId: "g09", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MrSmallEyes", gameId: "g14", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MrSmallEyes", gameId: "g18", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Salva", gameId: "g03", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Salva", gameId: "g09", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Salva", gameId: "g14", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Salva", gameId: "g18", goals: 3, assists: 0, points: 3, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "PKPlis", gameId: "g03", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "PKPlis", gameId: "g09", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "PKPlis", gameId: "g14", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "PKPlis", gameId: "g18", goals: 0, assists: 0, points: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
];

// One row of a skater's "Last 5 Games" table: the game's real
// date/opponent/home-away (always current, straight from schedule.ts)
// merged with their logged stat line, if one exists yet.
export interface SkaterGameRow {
  gameId: string;
  date: string;
  opponentTeamId: string;
  home: boolean; // true -> "vs OPP", false -> "@ OPP"
  goals: number;
  assists: number;
  points: number;
  pim: number;
  ppg: number;
  shg: number;
  shots: number;
  shifts: number;
}

export function lastGamesFor(playerName: string, teamId: string, count = 5): SkaterGameRow[] {
  return games
    .filter((g) => g.status === "final" && (g.homeTeamId === teamId || g.awayTeamId === teamId))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count)
    .map((game) => {
      const home = game.homeTeamId === teamId;
      const stat = skaterGameStatLines.find((s) => s.playerName === playerName && s.gameId === game.id);
      return {
        gameId: game.id,
        date: game.date,
        opponentTeamId: home ? game.awayTeamId : game.homeTeamId,
        home,
        goals: stat?.goals ?? 0,
        assists: stat?.assists ?? 0,
        points: stat?.points ?? 0,
        pim: stat?.pim ?? 0,
        ppg: stat?.ppg ?? 0,
        shg: stat?.shg ?? 0,
        shots: stat?.shots ?? 0,
        shifts: stat?.shifts ?? 0,
      };
    });
}

// Real per-game stat lines a goalie has logged. Same sparse pattern as
// skaterGameStatLines above — a goalie's row for a game still shows up
// via `lastGoalieGamesFor` even with no entry here, pulled live from the
// last 5 FINAL games in schedule.ts for their team.
//
// `playerName` must exactly match the goalie's name in players.ts.
// `gameId` must match a game id in schedule.ts.
export const goalieGameStatLines: GoalieGameStatLine[] = [
  // ---------- CAROLINA HURRICANES ----------
  { playerName: "Wapw", gameId: "g04", gs: 1, dec: "OTL", shotsAgainst: 13, goalsAgainst: 2, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Wapw", gameId: "g08", gs: 1, dec: "W", shotsAgainst: 12, goalsAgainst: 1, shutout: 0, goals: 1, assists: 1, points: 2, pim: 0 },
  { playerName: "Wapw", gameId: "g12", gs: 1, dec: "W", shotsAgainst: 39, goalsAgainst: 1, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Wapw", gameId: "g19", gs: 1, dec: "L", shotsAgainst: 13, goalsAgainst: 2, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },

  // ---------- PITTSBURGH PENGUINS ----------
  { playerName: "Fellow", gameId: "g02", gs: 1, dec: "W", shotsAgainst: 13, goalsAgainst: 1, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Fellow", gameId: "g07", gs: 1, dec: "W", shotsAgainst: 7, goalsAgainst: 0, shutout: 1, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Fellow", gameId: "g12", gs: 1, dec: "OTL", shotsAgainst: 9, goalsAgainst: 3, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Fellow", gameId: "g17", gs: 1, dec: "W", shotsAgainst: 16, goalsAgainst: 2, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },

  { playerName: "ElMosquito", gameId: "g02", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },
  { playerName: "ElMosquito", gameId: "g07", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },
  { playerName: "ElMosquito", gameId: "g12", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },
  { playerName: "ElMosquito", gameId: "g17", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },

  // ---------- TAMPA BAY LIGHTNING ----------
  { playerName: "SnugThePug", gameId: "g01", gs: 0, dec: "L", shotsAgainst: 0, goalsAgainst: 0, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "SnugThePug", gameId: "g06", gs: 1, dec: "W", shotsAgainst: 1, goalsAgainst: 1, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "SnugThePug", gameId: "g15", gs: 0, dec: "OTL", shotsAgainst: 0, goalsAgainst: 0, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "SnugThePug", gameId: "g17", gs: 0, dec: "L", shotsAgainst: 0, goalsAgainst: 0, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },

  { playerName: "Pechs", gameId: "g01", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },
  { playerName: "Pechs", gameId: "g06", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },
  { playerName: "Pechs", gameId: "g15", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },
  { playerName: "Pechs", gameId: "g17", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },

  // ---------- BOSTON BRUINS ----------
  { playerName: "Apx11o", gameId: "g05", gs: 0, dec: "OTL", shotsAgainst: 2, goalsAgainst: 2, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Apx11o", gameId: "g07", gs: 1, dec: "L", shotsAgainst: 5, goalsAgainst: 5, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Apx11o", gameId: "g13", gs: 0, dec: "W", shotsAgainst: 0, goalsAgainst: 0, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },

  { playerName: "Sparkles", gameId: "g05", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },
  { playerName: "Sparkles", gameId: "g07", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },
  { playerName: "Sparkles", gameId: "g13", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },
  { playerName: "Sparkles", gameId: "g26", gs: 1, shotsAgainst: 0, goalsAgainst: 0, shutout: 0, goals: 2, assists: 0, points: 2, pim: 0 },

  // ---------- NEW YORK RANGERS ----------
  { playerName: "DDino", gameId: "g02", gs: 0, dec: "L", shotsAgainst: 0, goalsAgainst: 0, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "DDino", gameId: "g10", gs: 1, dec: "OTL", shotsAgainst: 41, goalsAgainst: 2, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "DDino", gameId: "g15", gs: 0, dec: "W", shotsAgainst: 0, goalsAgainst: 0, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "DDino", gameId: "g18", gs: 0, dec: "W", shotsAgainst: 21, goalsAgainst: 3, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },

  // ---------- UTAH MAMMOTHS ----------
  { playerName: "Sleepy", gameId: "g05", gs: 1, dec: "W", shotsAgainst: 1, goalsAgainst: 1, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Sleepy", gameId: "g09", gs: 1, dec: "W", shotsAgainst: 2, goalsAgainst: 2, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Sleepy", gameId: "g11", gs: 0, dec: "W", shotsAgainst: 0, goalsAgainst: 0, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Sleepy", gameId: "g20", gs: 1, dec: "L", shotsAgainst: 2, goalsAgainst: 2, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },

  // ---------- VEGAS GOLDEN KNIGHTS ----------
  { playerName: "TGOD", gameId: "g01", gs: 1, dec: "W", shotsAgainst: 11, goalsAgainst: 0, shutout: 1, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "TGOD", gameId: "g10", gs: 1, dec: "W", shotsAgainst: 30, goalsAgainst: 1, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "TGOD", gameId: "g14", gs: 1, dec: "W", shotsAgainst: 0, goalsAgainst: 0, shutout: 1, goals: 0, assists: 0, points: 0, pim: 0 },

  { playerName: "King", gameId: "g01", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },
  { playerName: "King", gameId: "g10", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },
  { playerName: "King", gameId: "g14", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },

  // ---------- ST. LOUIS BLUES ----------
  { playerName: "Nova", gameId: "g04", gs: 0, dec: "W", shotsAgainst: 1, goalsAgainst: 1, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Nova", gameId: "g06", gs: 0, dec: "L", shotsAgainst: 7, goalsAgainst: 7, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Nova", gameId: "g13", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },
  { playerName: "Nova", gameId: "g16", gs: 0, dec: "L", shotsAgainst: 5, goalsAgainst: 5, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },

  // ---------- LOS ANGELES KINGS ----------
  { playerName: "Riptide", gameId: "g03", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },
  { playerName: "Riptide", gameId: "g08", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },
  { playerName: "Riptide", gameId: "g11", gs: 0, dec: "L", shotsAgainst: 5, goalsAgainst: 5, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Riptide", gameId: "g16", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },

  { playerName: "TheHolyHippo", gameId: "g03", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },
  { playerName: "TheHolyHippo", gameId: "g08", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },
  { playerName: "TheHolyHippo", gameId: "g11", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },
  { playerName: "TheHolyHippo", gameId: "g16", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },

  // ---------- DALLAS STARS ----------
  { playerName: "Jollyllama", gameId: "g03", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },
  { playerName: "Jollyllama", gameId: "g09", gs: 0, dec: "L", shotsAgainst: 4, goalsAgainst: 4, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Jollyllama", gameId: "g14", gs: 0, shotsAgainst: 0, goalsAgainst: 0, pim: 0 },
  { playerName: "Jollyllama", gameId: "g18", gs: 0, dec: "OTL", shotsAgainst: 4, goalsAgainst: 4, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },

];

// One row of a goalie's "Last 5 Games" table.
export interface GoalieGameRow {
  gameId: string;
  date: string;
  opponentTeamId: string;
  home: boolean;
  gs: number;
  dec?: "W" | "L" | "OTL";
  shotsAgainst: number;
  goalsAgainst: number;
  shutout: number;
  goals: number;
  assists: number;
  points: number;
  pim: number;
}

export function lastGoalieGamesFor(playerName: string, teamId: string, count = 5): GoalieGameRow[] {
  return games
    .filter((g) => g.status === "final" && (g.homeTeamId === teamId || g.awayTeamId === teamId))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count)
    .map((game) => {
      const home = game.homeTeamId === teamId;
      const stat = goalieGameStatLines.find((s) => s.playerName === playerName && s.gameId === game.id);
      return {
        gameId: game.id,
        date: game.date,
        opponentTeamId: home ? game.awayTeamId : game.homeTeamId,
        home,
        gs: stat?.gs ?? 0,
        dec: stat?.dec,
        shotsAgainst: stat?.shotsAgainst ?? 0,
        goalsAgainst: stat?.goalsAgainst ?? 0,
        shutout: stat?.shutout ?? 0,
        goals: stat?.goals ?? 0,
        assists: stat?.assists ?? 0,
        points: stat?.points ?? 0,
        pim: stat?.pim ?? 0,
      };
    });
}

// Games where a skater filled in as emergency goalie instead of their
// usual position — rare by design, so unlike goalieGameStatLines this is
// NOT padded to a team's last N games; it only ever has real appearances.
//
// `playerName` must exactly match the skater's name in players.ts.
// `gameId` must match a game id in schedule.ts.
export const inNetAppearances: InNetAppearance[] = [
  { playerName: "Mesh", gameId: "g01", gs: 0, shotsAgainst: 0, goalsAgainst: 0, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Mesh", gameId: "g10", gs: 0, shotsAgainst: 0, goalsAgainst: 0, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Mesh", gameId: "g14", gs: 0, shotsAgainst: 0, goalsAgainst: 0, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Mesh", gameId: "g20", gs: 1, dec: "W", shotsAgainst: 15, goalsAgainst: 0, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Gabriel", gameId: "g03", gs: 1, dec: "W", shotsAgainst: 0, goalsAgainst: 0, shutout: 1, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Uzi", gameId: "g03", gs: 1, dec: "L", shotsAgainst: 10, goalsAgainst: 10, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Baseball3122", gameId: "g11", gs: 1, dec: "W", shotsAgainst: 0, goalsAgainst: 0, shutout: 1, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Cron", gameId: "g15", gs: 1, dec: "OTL", shotsAgainst: 5, goalsAgainst: 5, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Ehhabhd", gameId: "g17", gs: 1, dec: "L", shotsAgainst: 5, goalsAgainst: 5, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Idk67", gameId: "g19", gs: 1, dec: "W", shotsAgainst: 3, goalsAgainst: 3, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
  { playerName: "Bungee", gameId: "g02", gs: 1, dec: "L", shotsAgainst: 5, goalsAgainst: 5, shutout: 0, goals: 0, assists: 0, points: 0, pim: 0 },
];

// Admin-panel skeleton only — same "last N team games" shape as
// lastGoalieGamesFor, used to give the admin editable rows for a team's
// recent games when logging a new in-net appearance. Not used for the
// public player-profile display; see inNetGamesFor for that.
export function lastInNetGamesFor(playerName: string, teamId: string, count = 5): GoalieGameRow[] {
  return games
    .filter((g) => g.status === "final" && (g.homeTeamId === teamId || g.awayTeamId === teamId))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count)
    .map((game) => {
      const home = game.homeTeamId === teamId;
      const stat = inNetAppearances.find((s) => s.playerName === playerName && s.gameId === game.id);
      return {
        gameId: game.id,
        date: game.date,
        opponentTeamId: home ? game.awayTeamId : game.homeTeamId,
        home,
        gs: stat?.gs ?? 0,
        dec: stat?.dec,
        shotsAgainst: stat?.shotsAgainst ?? 0,
        goalsAgainst: stat?.goalsAgainst ?? 0,
        shutout: stat?.shutout ?? 0,
        goals: stat?.goals ?? 0,
        assists: stat?.assists ?? 0,
        points: stat?.points ?? 0,
        pim: stat?.pim ?? 0,
      };
    });
}

// Public player-profile display — only the skater's actual in-net
// appearances (no padding to recent team games, since filling in for a
// goalie is an occasional event, not a recurring role), newest first.
// `teamId` is the skater's own team (same as their roster entry), used
// only to work out which side of each game — home or away net — they
// were in.
export function inNetGamesFor(playerName: string, teamId: string): GoalieGameRow[] {
  const rows: GoalieGameRow[] = [];
  for (const stat of inNetAppearances) {
    if (stat.playerName !== playerName) continue;
    const game = games.find((g) => g.id === stat.gameId);
    if (!game) continue;
    const home = game.homeTeamId === teamId;
    rows.push({
      gameId: game.id,
      date: game.date,
      opponentTeamId: home ? game.awayTeamId : game.homeTeamId,
      home,
      gs: stat.gs,
      dec: stat.dec,
      shotsAgainst: stat.shotsAgainst,
      goalsAgainst: stat.goalsAgainst,
      shutout: stat.shutout ?? 0,
      goals: stat.goals ?? 0,
      assists: stat.assists ?? 0,
      points: stat.points ?? 0,
      pim: stat.pim,
    });
  }
  return rows.sort((a, b) => b.date.localeCompare(a.date));
}

// Short "3G", "SO" style summary for a game's WG/LG/POTG line on the
// public Schedule page — checks skater stats first, then goalie, then
// in-net (a name only ever has a real line in one of the three).
// Undefined if nothing's been logged yet or everything's still at 0.
// Deliberately no save count for goalies — just the shutout badge and
// any goals they scored, since saves aren't tracked as a headline stat.
export function gameStatSummary(playerName: string, gameId: string): string | undefined {
  const skaterStat = skaterGameStatLines.find((s) => s.playerName === playerName && s.gameId === gameId);
  if (skaterStat) {
    const parts: string[] = [];
    if (skaterStat.goals) parts.push(`${skaterStat.goals}G`);
    if (skaterStat.assists) parts.push(`${skaterStat.assists}A`);
    return parts.length > 0 ? parts.join(" ") : undefined;
  }

  const goalieStat =
    goalieGameStatLines.find((s) => s.playerName === playerName && s.gameId === gameId) ??
    inNetAppearances.find((s) => s.playerName === playerName && s.gameId === gameId);
  if (goalieStat) {
    const parts: string[] = [];
    if (goalieStat.shutout) parts.push("SO");
    if (goalieStat.goals) parts.push(`${goalieStat.goals}G`);
    return parts.length > 0 ? parts.join(", ") : undefined;
  }

  return undefined;
}
