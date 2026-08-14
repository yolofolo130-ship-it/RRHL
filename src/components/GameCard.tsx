import { Link } from "react-router-dom";
import type { Game } from "@/data/types";
import { getTeamById } from "@/data/teams";
import { getHeadshotByName, getPlayerSlugByName } from "@/data/players";
import { gameStatSummary } from "@/data/gameLogs";
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
  const hasHonors = isFinal && (game.wg || game.lg || game.potg);

  return (
    <div className="border border-line bg-bg-2 px-3 py-4 transition-colors duration-300 hover:border-line-strong sm:px-6 sm:py-5">
      <div className="group flex flex-row items-center gap-3 sm:gap-6">
        <div className="flex w-14 shrink-0 flex-col items-start gap-0.5 sm:w-24 sm:gap-1">
          <span className="text-[11px] font-semibold tracking-wider text-ink-1 sm:text-xs">
            {formatShortDate(game.date)}
          </span>
          <span className="text-[10px] text-ink-3 sm:text-xs">{game.time}</span>
        </div>

        <div className="flex flex-1 items-center justify-center gap-2 sm:gap-8">
          <TeamSide team={away} score={game.awayScore} showScore={isFinal || isLive} won={awayWon} />
          <span className="shrink-0 text-[10px] font-semibold tracking-widest text-ink-3 sm:text-xs">
            {isFinal || isLive ? "" : "VS"}
          </span>
          <TeamSide team={home} score={game.homeScore} showScore={isFinal || isLive} won={homeWon} reverse />
        </div>

        <div className="flex w-16 shrink-0 flex-col items-end gap-1 sm:w-28 sm:gap-2">
          {isLive ? (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.15em] text-red-500 sm:gap-2 sm:text-xs sm:tracking-[0.2em]">
              <span className="h-1.5 w-1.5 animate-live-pulse rounded-full bg-red-500" />
              LIVE
            </span>
          ) : (
            <span
              className={`text-[10px] font-semibold tracking-[0.15em] sm:text-xs sm:tracking-[0.2em] ${
                isPostponed ? "text-ink-3" : "text-ink-2"
              }`}
            >
              {STATUS_LABEL[game.status]}
            </span>
          )}
          <Link
            to={`/teams/${home.id}`}
            className="text-[10px] font-semibold tracking-[0.1em] text-ink-3 underline-offset-4 transition-colors duration-300 hover:text-ink-0 hover:underline sm:text-xs sm:tracking-[0.15em]"
          >
            MATCHUP
          </Link>
        </div>
      </div>

      {hasHonors && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-line/60 pt-3">
          {game.wg && (
            <GameHonor label="WG" name={game.wg} gameId={game.id} showSummary={game.wg !== game.potg} />
          )}
          {game.lg && <GameHonor label="LG" name={game.lg} gameId={game.id} />}
          {game.potg && <GameHonor label="POTG" name={game.potg} gameId={game.id} />}
        </div>
      )}
    </div>
  );
}

function GameHonor({
  label,
  name,
  gameId,
  showSummary = true,
}: {
  label: string;
  name: string;
  gameId: string;
  showSummary?: boolean;
}) {
  const headshot = getHeadshotByName(name);
  const slug = getPlayerSlugByName(name);
  const summary = showSummary ? gameStatSummary(name, gameId) : undefined;
  const content = (
    <>
      <span className="text-[10px] font-semibold tracking-[0.1em] text-ink-3 sm:text-xs">{label}:</span>
      {headshot && (
        <img
          key={headshot}
          src={headshot}
          alt=""
          className="h-5 w-5 shrink-0 animate-fade-in rounded-full border border-line object-cover sm:h-6 sm:w-6"
        />
      )}
      <span className="text-xs font-semibold text-ink-1 sm:text-sm">{name}</span>
      {summary && <span className="text-[10px] text-ink-3 sm:text-xs">{summary}</span>}
    </>
  );

  if (!slug) {
    return <span className="inline-flex items-center gap-1.5">{content}</span>;
  }

  return (
    <Link
      to={`/players/${slug}`}
      className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-white"
    >
      {content}
    </Link>
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
