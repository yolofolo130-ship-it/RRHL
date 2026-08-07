import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TeamLogo from "@/components/TeamLogo";
import Tabs from "@/components/Tabs";
import GameCard from "@/components/GameCard";
import { teams, getTeamById } from "@/data/teams";
import { games } from "@/data/schedule";
import { skaters, goalies, coaches, skaterPoints, goalieSavePct, goalieGaa } from "@/data/players";
import { standingsForConference, isPlayoffPosition } from "@/utils/standings";
import { formatLongDate } from "@/utils/format";

const TAB_OPTIONS = [
  { value: "overview", label: "OVERVIEW" },
  { value: "roster", label: "ROSTER" },
  { value: "schedule", label: "SCHEDULE" },
  { value: "stats", label: "STATS" },
];

export default function TeamDetail() {
  const { teamId } = useParams<{ teamId: string }>();
  const [tab, setTab] = useState("overview");
  const team = teamId ? getTeamById(teamId) : undefined;

  const conferenceStandings = useMemo(
    () => (team ? standingsForConference(team.conference, teams, games) : []),
    [team],
  );

  const teamGames = useMemo(
    () =>
      team
        ? games
            .filter((g) => g.homeTeamId === team.id || g.awayTeamId === team.id)
            .sort((a, b) => a.date.localeCompare(b.date))
        : [],
    [team],
  );

  if (!team) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-32 text-center lg:px-10">
        <p className="font-display text-3xl font-semibold uppercase text-ink-0">
          Team not found
        </p>
        <Link
          to="/teams"
          className="mt-6 inline-block border border-line px-6 py-3 text-xs font-semibold tracking-[0.2em] text-ink-1 transition-colors hover:border-line-strong hover:text-ink-0"
        >
          BACK TO TEAMS
        </Link>
      </div>
    );
  }

  const standing = conferenceStandings.find((s) => s.team.id === team.id);
  const rank = standing ? conferenceStandings.indexOf(standing) + 1 : undefined;
  const recentGames = teamGames.filter((g) => g.status === "final").slice(-3).reverse();
  const nextGame = teamGames.find((g) => g.status === "upcoming" || g.status === "live");
  const roster = skaters.filter((s) => s.teamId === team.id);
  const teamGoalies = goalies.filter((g) => g.teamId === team.id);
  const teamCoaches = coaches.filter((c) => c.teamId === team.id);
  const headCoaches = teamCoaches.filter((c) => c.role === "Head Coach");
  const assistantCoaches = teamCoaches.filter((c) => c.role === "Assistant Coach");

  return (
    <>
      <div
        className="relative overflow-hidden border-b border-line bg-bg-1"
        style={{ ["--team-color" as string]: team.color }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            background: `radial-gradient(circle at 20% 30%, var(--team-color), transparent 55%)`,
          }}
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-6 pb-10 pt-36 text-center lg:flex-row lg:items-end lg:gap-8 lg:px-10 lg:text-left">
          <TeamLogo team={team} className="h-28 w-28 shrink-0 lg:h-36 lg:w-36" />
          <div className="flex flex-1 flex-col items-center gap-2 lg:items-start">
            <p className="text-xs font-semibold tracking-[0.3em] text-ink-2">
              {team.conference === "east" ? "EASTERN CONFERENCE" : "WESTERN CONFERENCE"}
            </p>
            <h1 className="font-display text-5xl font-bold uppercase tracking-wide text-ink-0 sm:text-6xl">
              {team.name}
            </h1>
          </div>
          {standing && (
            <div className="flex shrink-0 items-center gap-8 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
              <div className="text-center">
                <p className="font-display text-3xl font-semibold text-ink-0">
                  {standing.w}-{standing.l}-{standing.otl}
                </p>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-ink-3">RECORD</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl font-semibold text-ink-0">{standing.pts}</p>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-ink-3">POINTS</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        <Tabs options={TAB_OPTIONS} value={tab} onChange={setTab} />

        {tab === "overview" && (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="border border-line bg-bg-2 p-6 lg:col-span-1">
              <p className="text-xs font-semibold tracking-[0.2em] text-ink-2">
                CURRENT STANDING
              </p>
              {standing && rank ? (
                <>
                  <p className="font-display mt-3 text-4xl font-bold text-ink-0">
                    #{rank}
                    <span className="ml-2 text-base font-normal text-ink-3">
                      {team.conference === "east" ? "EAST" : "WEST"}
                    </span>
                  </p>
                  <p className="mt-2 text-xs tracking-wide text-ink-2">
                    {isPlayoffPosition(rank) ? "In playoff position" : "Outside the playoff line"}
                  </p>
                </>
              ) : (
                <p className="mt-3 text-sm text-ink-2">No games played yet.</p>
              )}
            </div>

            <div className="border border-line bg-bg-2 p-6 lg:col-span-2">
              <p className="text-xs font-semibold tracking-[0.2em] text-ink-2">NEXT GAME</p>
              {nextGame ? (
                <div className="mt-4">
                  <GameCard game={nextGame} />
                </div>
              ) : (
                <p className="mt-3 text-sm text-ink-2">No games scheduled.</p>
              )}
            </div>

            <div className="lg:col-span-3">
              <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-ink-2">
                RECENT GAMES
              </p>
              <div className="flex flex-col gap-4">
                {recentGames.length === 0 && (
                  <p className="border border-line bg-bg-2 px-6 py-8 text-center text-sm text-ink-2">
                    No completed games yet.
                  </p>
                )}
                {recentGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "roster" && (
          <div className="mt-8 border border-line bg-bg-2">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line text-xs tracking-[0.15em] text-ink-3">
                    <th className="px-4 py-3 text-left font-semibold">PLAYER</th>
                    <th className="px-3 py-3 text-center font-semibold">POS</th>
                    <th className="px-3 py-3 text-center font-semibold">#</th>
                    <th className="px-3 py-3 text-center font-semibold">G</th>
                    <th className="px-3 py-3 text-center font-semibold">A</th>
                    <th className="px-4 py-3 text-center font-semibold">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {roster.map((player) => (
                    <tr
                      key={player.id}
                      className="border-b border-line/60 last:border-b-0 hover:bg-white/[0.03]"
                    >
                      <td className="px-4 py-3 font-medium text-ink-0">
                        <Link to={`/players/${player.id}`} className="hover:text-white">
                          {player.name}
                        </Link>
                      </td>
                      <td className="px-3 py-3 text-center text-ink-2">{player.position}</td>
                      <td className="px-3 py-3 text-center text-ink-2">{player.number}</td>
                      <td className="px-3 py-3 text-center text-ink-1">{player.goals}</td>
                      <td className="px-3 py-3 text-center text-ink-1">{player.assists}</td>
                      <td className="px-4 py-3 text-center font-semibold text-ink-0">
                        {skaterPoints(player)}
                      </td>
                    </tr>
                  ))}
                  {teamGoalies.map((goalie) => (
                    <tr key={goalie.id} className="hover:bg-white/[0.03]">
                      <td className="px-4 py-3 font-medium text-ink-0">
                        <Link to={`/players/${goalie.id}`} className="hover:text-white">
                          {goalie.name}
                        </Link>
                      </td>
                      <td className="px-3 py-3 text-center text-ink-2">G</td>
                      <td className="px-3 py-3 text-center text-ink-2">{goalie.number}</td>
                      <td className="px-3 py-3 text-center text-ink-2" colSpan={2}>
                        {goalie.wins}-{goalie.losses}-{goalie.otLosses}
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-ink-0">
                        {(goalieSavePct(goalie) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {teamCoaches.length > 0 && (
              <div className="border-t border-line p-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-ink-2">
                  COACHING STAFF
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {[...headCoaches, ...assistantCoaches].map((coach) => (
                    <div key={coach.id}>
                      <p className="font-display text-lg font-semibold uppercase tracking-wide text-ink-0">
                        {coach.name}
                      </p>
                      <p className="text-xs text-ink-2">{coach.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "schedule" && (
          <div className="mt-8 flex flex-col gap-4">
            {teamGames.map((game) => (
              <div key={game.id}>
                <p className="mb-2 text-[11px] font-semibold tracking-[0.2em] text-ink-3">
                  {formatLongDate(game.date).toUpperCase()}
                </p>
                <GameCard game={game} />
              </div>
            ))}
          </div>
        )}

        {tab === "stats" && (
          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {standing &&
              (
                [
                  ["GP", standing.gp],
                  ["W", standing.w],
                  ["L", standing.l],
                  ["OTL", standing.otl],
                  ["GF", standing.gf],
                  ["GA", standing.ga],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="border border-line bg-bg-2 p-5 text-center">
                  <p className="font-display text-3xl font-semibold text-ink-0">{value}</p>
                  <p className="mt-1 text-[10px] font-semibold tracking-[0.2em] text-ink-3">
                    {label}
                  </p>
                </div>
              ))}
            {teamGoalies.map((goalie) => (
              <div key={goalie.id} className="border border-line bg-bg-2 p-5 text-center">
                <p className="font-display text-3xl font-semibold text-ink-0">
                  {goalieGaa(goalie).toFixed(2)}
                </p>
                <p className="mt-1 text-[10px] font-semibold tracking-[0.2em] text-ink-3">
                  {goalie.name.toUpperCase()} GAA
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
