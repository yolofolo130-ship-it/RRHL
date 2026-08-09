import { Link } from "react-router-dom";
import { getTeamById } from "@/data/teams";
import type { SkaterGameRow } from "@/data/gameLogs";
import { formatShortDate } from "@/utils/format";

export default function LastGamesTable({ games }: { games: SkaterGameRow[] }) {
  if (games.length === 0) {
    return (
      <p className="border border-line bg-bg-2 px-6 py-8 text-center text-sm text-ink-2">
        No game log yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border border-line bg-bg-2">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-line text-xs tracking-[0.15em] text-ink-3">
            <th className="px-4 py-3 text-left font-semibold">DATE</th>
            <th className="px-3 py-3 text-left font-semibold">OPP</th>
            <th className="px-3 py-3 text-center font-semibold">G</th>
            <th className="px-3 py-3 text-center font-semibold">A</th>
            <th className="px-3 py-3 text-center font-semibold">P</th>
            <th className="px-3 py-3 text-center font-semibold">PIM</th>
            <th className="px-3 py-3 text-center font-semibold">PPG</th>
            <th className="px-3 py-3 text-center font-semibold">SHG</th>
            <th className="px-3 py-3 text-center font-semibold">S</th>
            <th className="px-4 py-3 text-center font-semibold">SHIFT</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => {
            const opponent = getTeamById(game.opponentTeamId);
            return (
              <tr
                key={game.gameId}
                className="border-b border-line/60 last:border-b-0 hover:bg-white/[0.03]"
              >
                <td className="px-4 py-3 text-ink-1">{formatShortDate(game.date)}</td>
                <td className="px-3 py-3">
                  {opponent && (
                    <Link
                      to={`/teams/${opponent.id}`}
                      className="font-medium text-ink-0 hover:text-white"
                    >
                      {game.home ? "vs" : "@"} {opponent.abbr}
                    </Link>
                  )}
                </td>
                <td className="px-3 py-3 text-center text-ink-1">{game.goals}</td>
                <td className="px-3 py-3 text-center text-ink-1">{game.assists}</td>
                <td className="px-3 py-3 text-center font-semibold text-ink-0">{game.points}</td>
                <td className="px-3 py-3 text-center text-ink-1">{game.pim}</td>
                <td className="px-3 py-3 text-center text-ink-1">{game.ppg}</td>
                <td className="px-3 py-3 text-center text-ink-1">{game.shg}</td>
                <td className="px-3 py-3 text-center text-ink-1">{game.shots}</td>
                <td className="px-4 py-3 text-center text-ink-1">{game.shifts}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
