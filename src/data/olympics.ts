import svuLogo from "@/assets/olympic-logos/Team-SVU.webp";
import swedenLogo from "@/assets/olympic-logos/Team-Sweden.webp";
import usaLogo from "@/assets/olympic-logos/Team-USA.webp";
import finlandLogo from "@/assets/olympic-logos/Team-Finland.png";

export interface OlympicTeam {
  id: string;
  name: string;
  logo: string;
  /** Head coach's name — resolved against players.ts for a headshot/link where possible, plain text otherwise (e.g. someone with no existing player page). */
  headCoach: string;
  /** Player names, resolved against players.ts for headshot/position/club team. */
  roster: string[];
}

// Rosters for the one-off Olympics tournament — separate from club rosters
// in players.ts/teams.ts, though every named player/coach here is looked
// up against that data for their headshot, position, and club team.
// Schedule/standings/bracket are hand-managed elsewhere once the format
// is decided; this file is roster data only.
export const olympicTeams: OlympicTeam[] = [
  {
    id: "soviet-union",
    name: "Soviet Union",
    logo: svuLogo,
    headCoach: "DoughnutZ",
    roster: ["Full", "Wapw", "Sinny", "Nickel", "Sid"],
  },
  {
    id: "sweden",
    name: "Sweden",
    logo: swedenLogo,
    headCoach: "MJ",
    roster: ["lilballerjimmy", "DDino", "Fellow", "MVP", "Mason"],
  },
  {
    id: "usa",
    name: "USA",
    logo: usaLogo,
    headCoach: "Chrisx",
    roster: ["TGOD", "Huddawg", "Caleb", "Swordtsu", "Mesh"],
  },
  {
    id: "finland",
    name: "Finland",
    logo: finlandLogo,
    headCoach: "Kdog2020",
    roster: ["Boolit", "Jrok", "Snickers", "Cron", "Bungee"],
  },
];

export const getOlympicTeamById = (id: string): OlympicTeam | undefined =>
  olympicTeams.find((t) => t.id === id);

// Single-elimination bracket: two semifinals feed a straight final (no
// bronze-medal game). A slot is either a fixed team (teamAId/teamBId) or,
// once the format is known but the team isn't yet, filled by the winner of
// an earlier game via advancesFromA/advancesFromB.
export interface OlympicGame {
  id: string;
  round: "semifinal" | "final";
  date: string;
  time: string;
  teamAId?: string;
  teamBId?: string;
  advancesFromA?: string;
  advancesFromB?: string;
  teamAScore?: number;
  teamBScore?: number;
  overtime?: boolean;
  status: "upcoming" | "final";
}

export const olympicBracket: OlympicGame[] = [
  {
    id: "ol-sf1",
    round: "semifinal",
    date: "2026-08-25",
    time: "8:30 PM",
    teamAId: "sweden",
    teamBId: "soviet-union",
    teamAScore: 2,
    teamBScore: 1,
    overtime: true,
    status: "final",
  },
  {
    id: "ol-sf2",
    round: "semifinal",
    date: "2026-08-27",
    time: "8:30 PM",
    teamAId: "finland",
    teamBId: "usa",
    status: "upcoming",
  },
  {
    id: "ol-final",
    round: "final",
    date: "2026-08-28",
    time: "8:30 PM",
    teamAId: "sweden",
    advancesFromB: "ol-sf2",
    status: "upcoming",
  },
];

export const getOlympicGameById = (id: string): OlympicGame | undefined =>
  olympicBracket.find((g) => g.id === id);

export const getOlympicGameWinnerId = (game: OlympicGame): string | undefined => {
  if (game.status !== "final" || game.teamAScore == null || game.teamBScore == null) return undefined;
  return game.teamAScore > game.teamBScore ? game.teamAId : game.teamBId;
};

const resolveSlot = (teamId: string | undefined, advancesFrom: string | undefined): string | undefined => {
  if (teamId) return teamId;
  if (!advancesFrom) return undefined;
  const source = getOlympicGameById(advancesFrom);
  return source ? getOlympicGameWinnerId(source) : undefined;
};

export const getOlympicGameTeamAId = (game: OlympicGame): string | undefined =>
  resolveSlot(game.teamAId, game.advancesFromA);

export const getOlympicGameTeamBId = (game: OlympicGame): string | undefined =>
  resolveSlot(game.teamBId, game.advancesFromB);
