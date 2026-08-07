import { Link } from "react-router-dom";
import type { Game } from "@/data/types";
import { getTeamById } from "@/data/teams";
import TeamLogo from "./TeamLogo";
import { formatShortDate } from "@/utils/format";

interface GameCardProps {
  game: Game;
}

const STATUS_LABEL: Record<Game["status"], string> = {
  upcoming: "UPCOMING",
  live: "LIVE",
  final: "FINAL",
  postponed: "POSTPONED",
};

export default function GameCard({ game }: GameCardProps) {
  const home = getTeamById(game.homeTeamId);
  const away = getTeamById(game.awayTeamId);
  if (!home || !away) return null;

  const isFinal = game.status === "final";
  const isLive = game.status === "live";
  const isPostponed = game.status === "postponed";
  const homeWon = isFinal && (game.homeScore ?? 0) > (game.awayScore ?? 0);
  const awayWon = isFinal && (game.awayScore ?? 0) > (game.homeScore ?? 0);

  return (
    <div className="group flex flex-col gap-5 border border-line bg-bg-2 px-5 py-5 transition-colors duration-300 hover:border-line-strong sm:flex-row sm:items-center sm:gap-6 sm:px-6">
      <div className="flex shrink-0 flex-row items-center gap-4 sm:w-24 sm:flex-col sm:items-start sm:gap-1">
        <span className="text-xs font-semibold tracking-wider text-ink-1">
          {formatShortDate(game.date)}
        </span>
        <span className="text-xs text-ink-3">{game.time}</span>
      </div>

      <div className="flex flex-1 items-center justify-center gap-4 sm:gap-8">
        <TeamSide team={away} score={game.awayScore} showScore={isFinal || isLive} won={awayWon} />
        <span className="shrink-0 text-xs font-semibold tracking-widest text-ink-3">
          {isFinal || isLive ? "" : "VS"}
        </span>
        <TeamSide team={home} score={game.homeScore} showScore={isFinal || isLive} won={homeWon} reverse />
      </div>

      <div className="flex shrink-0 items-center justify-between gap-3 sm:w-28 sm:flex-col sm:items-end sm:justify-center sm:gap-2">
        {isLive ? (
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-red-500">
            <span className="h-1.5 w-1.5 animate-live-pulse rounded-full bg-red-500" />
            LIVE
          </span>
        ) : (
          <span
            className={`text-xs font-semibold tracking-[0.2em] ${
              isPostponed ? "text-ink-3" : "text-ink-2"
            }`}
          >
            {STATUS_LABEL[game.status]}
          </span>
        )}
        <Link
          to={`/teams/${home.id}`}
          className="text-xs font-semibold tracking-[0.15em] text-ink-3 underline-offset-4 transition-colors duration-300 hover:text-ink-0 hover:underline"
        >
          MATCHUP
        </Link>
      </div>
    </div>
  );
}

function TeamSide({
  team,
  score,
  showScore,
  won,
  reverse = false,
}: {
  team: NonNullable<ReturnType<typeof getTeamById>>;
  score?: number;
  showScore: boolean;
  won: boolean;
  reverse?: boolean;
}) {
  return (
    <Link
      to={`/teams/${team.id}`}
      className={`flex flex-1 items-center gap-3 sm:flex-none ${
        reverse ? "flex-row-reverse text-right" : "text-left"
      }`}
    >
      <TeamLogo team={team} className="h-9 w-9 shrink-0 sm:h-11 sm:w-11" />
      <span className="flex flex-col">
        <span
          className={`font-display text-base font-semibold uppercase tracking-wide sm:text-lg ${
            won ? "text-ink-0" : "text-ink-1"
          }`}
        >
          {team.abbr}
        </span>
        {showScore && (
          <span className={`text-lg font-bold sm:text-xl ${won ? "text-white" : "text-ink-2"}`}>
            {score}
          </span>
        )}
      </span>
    </Link>
  );
}
