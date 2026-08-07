import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import TeamLogo from "@/components/TeamLogo";
import { teams } from "@/data/teams";
import { skaters, goalies, skaterPoints } from "@/data/players";
import { formerPlayers } from "@/data/formerPlayers";

export default function Players() {
  return (
    <>
      <PageHeader eyebrow="THE ROSTER" title="Players" />

      <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-14">
          {teams.map((team) => {
            const teamSkaters = skaters.filter((s) => s.teamId === team.id);
            const teamGoalies = goalies.filter((g) => g.teamId === team.id);
            if (teamSkaters.length === 0 && teamGoalies.length === 0) return null;

            return (
              <div key={team.id}>
                <div className="flex items-center gap-3 border-b border-line pb-4">
                  <TeamLogo team={team} className="h-6 w-6" />
                  <p className="text-xs font-semibold tracking-[0.28em] text-ink-2">
                    {team.name.toUpperCase()}
                  </p>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {teamSkaters.map((player) => (
                    <Link
                      key={player.id}
                      to={`/players/${player.id}`}
                      className="flex items-center gap-4 border border-line bg-bg-2 p-5 transition-colors duration-300 hover:border-line-strong"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-line bg-bg-3 font-display text-lg font-semibold text-ink-1">
                        {player.number}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-display text-lg font-semibold uppercase tracking-wide text-ink-0">
                          {player.name}
                        </p>
                        <p className="truncate text-xs text-ink-2">
                          {player.position} &middot; {skaterPoints(player)} PTS
                        </p>
                      </div>
                    </Link>
                  ))}
                  {teamGoalies.map((goalie) => (
                    <Link
                      key={goalie.id}
                      to={`/players/${goalie.id}`}
                      className="flex items-center gap-4 border border-line bg-bg-2 p-5 transition-colors duration-300 hover:border-line-strong"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-line bg-bg-3 font-display text-lg font-semibold text-ink-1">
                        {goalie.number}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-display text-lg font-semibold uppercase tracking-wide text-ink-0">
                          {goalie.name}
                        </p>
                        <p className="truncate text-xs text-ink-2">
                          G &middot; {goalie.wins}-{goalie.losses}-{goalie.otLosses}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {formerPlayers.length > 0 && (
            <div>
              <div className="flex items-center gap-3 border-b border-line pb-4">
                <p className="text-xs font-semibold tracking-[0.28em] text-ink-2">
                  FORMER PLAYERS
                </p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {formerPlayers.map((player) => (
                  <Link
                    key={player.id}
                    to={`/players/${player.id}`}
                    className="flex items-center gap-4 border border-line bg-bg-2 p-5 transition-colors duration-300 hover:border-line-strong"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-display text-lg font-semibold uppercase tracking-wide text-ink-0">
                        {player.name}
                      </p>
                      <p className="truncate text-xs text-ink-2">Former player</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
