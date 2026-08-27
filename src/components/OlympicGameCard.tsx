import { Link } from "react-router-dom";
import type { OlympicGame } from "@/data/olympics";
import { getOlympicTeamById, getOlympicGameTeamAId, getOlympicGameTeamBId } from "@/data/olympics";
import TeamLogo from "./TeamLogo";
import { formatShortDate } from "@/utils/format";

interface OlympicGameCardProps {
  game: OlympicGame;
}

export default function OlympicGameCard({ game }: OlympicGameCardProps) {
  const teamAId = getOlympicGameTeamAId(game);
  const teamBId = getOlympicGameTeamBId(game);
  const teamA = teamAId ? getOlympicTeamById(teamAId) : undefined;
  const teamB = teamBId ? getOlympicTeamById(teamBId) : undefined;

  const isFinal = game.status === "final";
  const aWon = isFinal && (game.teamAScore ?? 0) > (game.teamBScore ?? 0);
  const bWon = isFinal && (game.teamBScore ?? 0) > (game.teamAScore ?? 0);
  const isChampionship = game.round === "final";

  return (
    <div
      className={`border bg-bg-2 px-4 py-5 sm:px-6 ${
        isChampionship ? "border-amber-400/40 shadow-[0_0_24px_-10px_rgba(251,191,36,0.5)]" : "border-line"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-[0.2em] text-ink-3">
          {game.round === "final" ? "GOLD MEDAL GAME" : "SEMIFINAL"}
        </span>
        <span className="text-[10px] text-ink-3">
          {formatShortDate(game.date)} · {game.time}
        </span>
      </div>

      <div className="space-y-3">
        <BracketSide team={teamA} score={game.teamAScore} showScore={isFinal} won={aWon} />
        <BracketSide team={teamB} score={game.teamBScore} showScore={isFinal} won={bWon} />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3">
        {game.overtime && isFinal ? (
          <span className="text-[10px] font-semibold tracking-[0.15em] text-ink-3">OT</span>
        ) : (
          <span />
        )}
        <span className="text-[10px] font-semibold tracking-[0.15em] text-ink-2">
          {isFinal ? "FINAL" : "UPCOMING"}
        </span>
      </div>
    </div>
  );
}

function BracketSide({
  team,
  score,
  showScore,
  won,
}: {
  team: ReturnType<typeof getOlympicTeamById>;
  score?: number;
  showScore: boolean;
  won: boolean;
}) {
  if (!team) {
    return (
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-dashed border-line text-[10px] text-ink-3">
          TBD
        </span>
        <span className="font-display text-sm font-semibold uppercase tracking-wide text-ink-3">TBD</span>
      </div>
    );
  }

  return (
    <Link to={`/olympics/${team.id}`} className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-3">
        <TeamLogo team={team} className="h-9 w-9 shrink-0" />
        <span
          className={`font-display text-sm font-semibold uppercase tracking-wide sm:text-base ${
            won ? "text-ink-0" : "text-ink-1"
          }`}
        >
          {team.name}
        </span>
      </span>
      {showScore && (
        <span className={`text-lg font-bold ${won ? "text-white" : "text-ink-2"}`}>{score}</span>
      )}
    </Link>
  );
}
