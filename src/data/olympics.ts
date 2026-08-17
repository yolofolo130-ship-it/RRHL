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
    roster: ["TGOD", "Huddawg", "Caleb", "Sword", "Mesh"],
  },
  {
    id: "finland",
    name: "Finland",
    logo: finlandLogo,
    headCoach: "Kdog",
    roster: ["Boolit", "Jrok", "Snickers", "Cron", "Bungee"],
  },
];

export const getOlympicTeamById = (id: string): OlympicTeam | undefined =>
  olympicTeams.find((t) => t.id === id);
