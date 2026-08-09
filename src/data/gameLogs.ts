import type { SkaterGameStatLine } from "./types";
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
  { playerName: "BNA", gameId: "g04", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "BNA", gameId: "g08", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "BNA", gameId: "g12", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "DoughnutZ", gameId: "g04", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "DoughnutZ", gameId: "g08", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "DoughnutZ", gameId: "g12", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Full", gameId: "g04", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Full", gameId: "g08", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Full", gameId: "g12", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Fishbowl", gameId: "g04", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Fishbowl", gameId: "g08", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Fishbowl", gameId: "g12", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "AJ", gameId: "g04", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "AJ", gameId: "g08", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "AJ", gameId: "g12", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Nickel", gameId: "g04", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Nickel", gameId: "g08", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Nickel", gameId: "g12", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Peach", gameId: "g04", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Peach", gameId: "g08", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Peach", gameId: "g12", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Badmilk", gameId: "g04", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Badmilk", gameId: "g08", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Badmilk", gameId: "g12", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  // ---------- PITTSBURGH PENGUINS ----------
  { playerName: "Chrisx", gameId: "g02", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Chrisx", gameId: "g07", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Chrisx", gameId: "g12", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Chrisx", gameId: "g17", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "RestartedRyan", gameId: "g02", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "RestartedRyan", gameId: "g07", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "RestartedRyan", gameId: "g12", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "RestartedRyan", gameId: "g17", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Mason", gameId: "g02", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Mason", gameId: "g07", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Mason", gameId: "g12", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Mason", gameId: "g17", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Sid", gameId: "g02", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Sid", gameId: "g07", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Sid", gameId: "g12", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Sid", gameId: "g17", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "chicharito9260", gameId: "g02", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "chicharito9260", gameId: "g07", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "chicharito9260", gameId: "g12", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "chicharito9260", gameId: "g17", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "44worthy", gameId: "g02", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "44worthy", gameId: "g07", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "44worthy", gameId: "g12", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "44worthy", gameId: "g17", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "LBeard0320", gameId: "g02", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "LBeard0320", gameId: "g07", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "LBeard0320", gameId: "g12", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "LBeard0320", gameId: "g17", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "cjcrosby898999", gameId: "g02", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "cjcrosby898999", gameId: "g07", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "cjcrosby898999", gameId: "g12", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "cjcrosby898999", gameId: "g17", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Arri", gameId: "g02", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Arri", gameId: "g07", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Arri", gameId: "g12", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Arri", gameId: "g17", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Carterthegawd", gameId: "g02", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Carterthegawd", gameId: "g07", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Carterthegawd", gameId: "g12", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Carterthegawd", gameId: "g17", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  // ---------- TAMPA BAY LIGHTNING ----------
  { playerName: "Swordtsu", gameId: "g01", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Swordtsu", gameId: "g06", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Swordtsu", gameId: "g15", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Swordtsu", gameId: "g17", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Cron", gameId: "g01", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Cron", gameId: "g06", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Cron", gameId: "g15", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Cron", gameId: "g17", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Snickers", gameId: "g01", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Snickers", gameId: "g06", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Snickers", gameId: "g15", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Snickers", gameId: "g17", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "KindSnack000", gameId: "g01", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "KindSnack000", gameId: "g06", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "KindSnack000", gameId: "g15", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "KindSnack000", gameId: "g17", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "LillianTheGreat", gameId: "g01", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "LillianTheGreat", gameId: "g06", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "LillianTheGreat", gameId: "g15", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "LillianTheGreat", gameId: "g17", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "UncNotFrog", gameId: "g01", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "UncNotFrog", gameId: "g06", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "UncNotFrog", gameId: "g15", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "UncNotFrog", gameId: "g17", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Ehhabhd", gameId: "g01", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Ehhabhd", gameId: "g06", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Ehhabhd", gameId: "g15", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Ehhabhd", gameId: "g17", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "GeorgePigs", gameId: "g01", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "GeorgePigs", gameId: "g06", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "GeorgePigs", gameId: "g15", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "GeorgePigs", gameId: "g17", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Boa", gameId: "g01", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Boa", gameId: "g06", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Boa", gameId: "g15", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Boa", gameId: "g17", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  // ---------- BOSTON BRUINS ----------
  { playerName: "Kdog2020", gameId: "g05", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Kdog2020", gameId: "g07", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Kdog2020", gameId: "g13", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Boolit", gameId: "g05", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Boolit", gameId: "g07", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Boolit", gameId: "g13", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Bounty", gameId: "g05", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Bounty", gameId: "g07", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Bounty", gameId: "g13", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "KingPenguin", gameId: "g05", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "KingPenguin", gameId: "g07", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "KingPenguin", gameId: "g13", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Huddawg", gameId: "g05", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Huddawg", gameId: "g07", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Huddawg", gameId: "g13", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Jace", gameId: "g05", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Jace", gameId: "g07", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Jace", gameId: "g13", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Funko", gameId: "g05", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Funko", gameId: "g07", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Funko", gameId: "g13", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Idk67", gameId: "g05", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Idk67", gameId: "g07", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Idk67", gameId: "g13", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  // ---------- NEW YORK RANGERS ----------
  { playerName: "Jrok", gameId: "g02", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Jrok", gameId: "g10", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Jrok", gameId: "g15", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Jrok", gameId: "g18", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Bungee", gameId: "g02", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Bungee", gameId: "g10", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Bungee", gameId: "g15", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Bungee", gameId: "g18", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Eli", gameId: "g02", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Eli", gameId: "g10", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Eli", gameId: "g15", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Eli", gameId: "g18", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Sfgoofy", gameId: "g02", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Sfgoofy", gameId: "g10", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Sfgoofy", gameId: "g15", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Sfgoofy", gameId: "g18", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Carsonreeves", gameId: "g02", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Carsonreeves", gameId: "g10", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Carsonreeves", gameId: "g15", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Carsonreeves", gameId: "g18", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Cakelocks", gameId: "g02", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Cakelocks", gameId: "g10", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Cakelocks", gameId: "g15", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Cakelocks", gameId: "g18", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "DieLit", gameId: "g02", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "DieLit", gameId: "g10", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "DieLit", gameId: "g15", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "DieLit", gameId: "g18", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  // ---------- UTAH MAMMOTHS ----------
  { playerName: "MJ", gameId: "g05", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MJ", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MJ", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Renuu", gameId: "g05", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Renuu", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Renuu", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "lilballerjimmy", gameId: "g05", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "lilballerjimmy", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "lilballerjimmy", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Reject", gameId: "g05", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Reject", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Reject", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Jazzmir", gameId: "g05", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Jazzmir", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Jazzmir", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "5starmax", gameId: "g05", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "5starmax", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "5starmax", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Randomcrazynoob", gameId: "g05", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Randomcrazynoob", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Randomcrazynoob", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Twin", gameId: "g05", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Twin", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Twin", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Zac", gameId: "g05", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Zac", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Zac", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Baseball3122", gameId: "g05", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Baseball3122", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Baseball3122", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Mood", gameId: "g05", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Mood", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Mood", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  // ---------- VEGAS GOLDEN KNIGHTS ----------
  { playerName: "Sinny", gameId: "g01", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Sinny", gameId: "g10", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Sinny", gameId: "g14", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Butter", gameId: "g01", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Butter", gameId: "g10", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Butter", gameId: "g14", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Siah", gameId: "g01", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Siah", gameId: "g10", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Siah", gameId: "g14", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Mesh", gameId: "g01", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Mesh", gameId: "g10", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Mesh", gameId: "g14", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Caleb", gameId: "g01", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Caleb", gameId: "g10", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Caleb", gameId: "g14", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Sidedeer", gameId: "g01", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Sidedeer", gameId: "g10", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Sidedeer", gameId: "g14", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Drago", gameId: "g01", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Drago", gameId: "g10", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Drago", gameId: "g14", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "MadMax", gameId: "g01", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MadMax", gameId: "g10", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MadMax", gameId: "g14", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Darkness", gameId: "g01", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Darkness", gameId: "g10", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Darkness", gameId: "g14", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  // ---------- ST. LOUIS BLUES ----------
  { playerName: "Vengeance", gameId: "g04", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Vengeance", gameId: "g06", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Vengeance", gameId: "g13", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Vengeance", gameId: "g16", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Augy", gameId: "g04", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Augy", gameId: "g06", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Augy", gameId: "g13", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Augy", gameId: "g16", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "EvanTheGuy", gameId: "g04", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "EvanTheGuy", gameId: "g06", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "EvanTheGuy", gameId: "g13", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "EvanTheGuy", gameId: "g16", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Fire", gameId: "g04", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Fire", gameId: "g06", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Fire", gameId: "g13", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Fire", gameId: "g16", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Tidy", gameId: "g04", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Tidy", gameId: "g06", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Tidy", gameId: "g13", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Tidy", gameId: "g16", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "TDLMarcus", gameId: "g04", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "TDLMarcus", gameId: "g06", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "TDLMarcus", gameId: "g13", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "TDLMarcus", gameId: "g16", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Hogeye", gameId: "g04", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Hogeye", gameId: "g06", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Hogeye", gameId: "g13", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Hogeye", gameId: "g16", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "AlexKiller", gameId: "g04", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "AlexKiller", gameId: "g06", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "AlexKiller", gameId: "g13", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "AlexKiller", gameId: "g16", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  // ---------- LOS ANGELES KINGS ----------
  { playerName: "MVP", gameId: "g03", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MVP", gameId: "g08", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MVP", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MVP", gameId: "g16", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Gabriel", gameId: "g03", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Gabriel", gameId: "g08", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Gabriel", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Gabriel", gameId: "g16", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Adam Cole", gameId: "g03", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Adam Cole", gameId: "g08", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Adam Cole", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Adam Cole", gameId: "g16", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "2Tone", gameId: "g03", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "2Tone", gameId: "g08", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "2Tone", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "2Tone", gameId: "g16", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Duck", gameId: "g03", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Duck", gameId: "g08", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Duck", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Duck", gameId: "g16", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "JosuxRR", gameId: "g03", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "JosuxRR", gameId: "g08", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "JosuxRR", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "JosuxRR", gameId: "g16", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Kranky", gameId: "g03", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Kranky", gameId: "g08", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Kranky", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Kranky", gameId: "g16", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "StefonB", gameId: "g03", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "StefonB", gameId: "g08", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "StefonB", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "StefonB", gameId: "g16", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Evv-76", gameId: "g03", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Evv-76", gameId: "g08", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Evv-76", gameId: "g11", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Evv-76", gameId: "g16", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  // ---------- DALLAS STARS ----------
  { playerName: "Santi", gameId: "g03", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Santi", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Santi", gameId: "g14", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Santi", gameId: "g18", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Uzi", gameId: "g03", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Uzi", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Uzi", gameId: "g14", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Uzi", gameId: "g18", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "TickleTimmy", gameId: "g03", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "TickleTimmy", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "TickleTimmy", gameId: "g14", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "TickleTimmy", gameId: "g18", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Alex", gameId: "g03", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Alex", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Alex", gameId: "g14", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Alex", gameId: "g18", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Courtney", gameId: "g03", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Courtney", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Courtney", gameId: "g14", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Courtney", gameId: "g18", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Zyler", gameId: "g03", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Zyler", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Zyler", gameId: "g14", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Zyler", gameId: "g18", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "MrSmallEyes", gameId: "g03", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MrSmallEyes", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MrSmallEyes", gameId: "g14", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "MrSmallEyes", gameId: "g18", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "Salva", gameId: "g03", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Salva", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Salva", gameId: "g14", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "Salva", gameId: "g18", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },

  { playerName: "PKPlis", gameId: "g03", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "PKPlis", gameId: "g09", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "PKPlis", gameId: "g14", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
  { playerName: "PKPlis", gameId: "g18", goals: 0, assists: 0, points: 0, plusMinus: 0, pim: 0, ppg: 0, shg: 0, shots: 0, shifts: 0 },
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
  plusMinus: number;
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
        plusMinus: stat?.plusMinus ?? 0,
        pim: stat?.pim ?? 0,
        ppg: stat?.ppg ?? 0,
        shg: stat?.shg ?? 0,
        shots: stat?.shots ?? 0,
        shifts: stat?.shifts ?? 0,
      };
    });
}
