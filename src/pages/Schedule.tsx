import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import Tabs from "@/components/Tabs";
import GameCard from "@/components/GameCard";
import { teams, getTeamById } from "@/data/teams";
import { games } from "@/data/schedule";
import { formatLongDate } from "@/utils/format";

const CONFERENCE_OPTIONS = [
  { value: "all", label: "ALL" },
  { value: "east", label: "EAST" },
  { value: "west", label: "WEST" },
];

const weeks = Array.from(new Set(games.map((g) => g.week))).sort((a, b) => a - b);

export default function Schedule() {
  const [conference, setConference] = useState("all");
  const [teamId, setTeamId] = useState("all");
  const [week, setWeek] = useState("all");

  const filteredGames = useMemo(() => {
    return games
      .filter((game) => {
        const home = getTeamById(game.homeTeamId);
        const away = getTeamById(game.awayTeamId);
        if (!home || !away) return false;

        if (
          conference !== "all" &&
          home.conference !== conference &&
          away.conference !== conference
        ) {
          return false;
        }
        if (teamId !== "all" && game.homeTeamId !== teamId && game.awayTeamId !== teamId) {
          return false;
        }
        if (week !== "all" && game.week !== Number(week)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  }, [conference, teamId, week]);

  const gamesByDate = useMemo(() => {
    const map = new Map<string, typeof filteredGames>();
    for (const game of filteredGames) {
      const list = map.get(game.date) ?? [];
      list.push(game);
      map.set(game.date, list);
    }
    return Array.from(map.entries());
  }, [filteredGames]);

  return (
    <>
      <PageHeader eyebrow="EVERY FACEOFF" title="S23 Schedule" />

      <section className="mx-auto px-6 py-14 lg:px-10">
        <div className="flex flex-wrap items-center gap-4">
          <Tabs options={CONFERENCE_OPTIONS} value={conference} onChange={setConference} />

          <select
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            className="border border-line bg-bg-2 px-4 py-2.5 text-xs font-semibold tracking-[0.15em] text-ink-1 outline-none transition-colors focus:border-line-strong"
          >
            <option value="all">ALL TEAMS</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name.toUpperCase()}
              </option>
            ))}
          </select>

          <select
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            className="border border-line bg-bg-2 px-4 py-2.5 text-xs font-semibold tracking-[0.15em] text-ink-1 outline-none transition-colors focus:border-line-strong"
          >
            <option value="all">ALL WEEKS</option>
            {weeks.map((w) => (
              <option key={w} value={w}>
                WEEK {w}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-10 flex flex-col gap-10">
          {gamesByDate.length === 0 && (
            <p className="border border-line bg-bg-2 px-6 py-10 text-center text-sm text-ink-2">
              No games match these filters.
            </p>
          )}
          {gamesByDate.map(([date, dateGames]) => (
            <div key={date}>
              <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-ink-3">
                {formatLongDate(date).toUpperCase()}
              </p>
              <div className="flex flex-col gap-4">
                {dateGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
