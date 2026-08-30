import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import TeamLogo from "@/components/TeamLogo";
import ChampionBadge from "@/components/ChampionBadge";
import OverallBadge from "@/components/OverallBadge";
import { teams } from "@/data/teams";
import { skaters, goalies, skaterPoints, playerSlug } from "@/data/players";
import { formerPlayers } from "@/data/formerPlayers";
import { championshipSeasonsFor } from "@/data/championshipRosters";

export default function Players() {
  return (
    <>
      <PageHeader eyebrow="THE ROSTER" title="Players" />

      <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-14">
          {teams.map((team) => {
            const teamSkaters = [...skaters.filter((s) => s.teamId === team.id)].sort(
              (a, b) => (b.overall ?? 0) - (a.overall ?? 0),
            );
            const teamGoalies = [...goalies.filter((g) => g.teamId === team.id)].sort(
              (a, b) => (b.overall ?? 0) - (a.overall ?? 0),
            );
            if (teamSkaters.length === 0 && teamGoalies.length === 0) return null;

            // Skaters and goalies are tracked as two separate arrays but
            // shown as one roster grid, highest OVR first regardless of
            // position — so the two sorted lists get merged here rather
            // than rendered as back-to-back sections.
            const rosterByOverall: Array<
              | { kind: "skater"; player: (typeof teamSkaters)[number] }
              | { kind: "goalie"; player: (typeof teamGoalies)[number] }
            > = [
              ...teamSkaters.map((player) => ({ kind: "skater" as const, player })),
              ...teamGoalies.map((player) => ({ kind: "goalie" as const, player })),
            ].sort((a, b) => (b.player.overall ?? 0) - (a.player.overall ?? 0));

            return (
              <div key={team.id}>
                <div className="flex items-center gap-3 border-b border-line pb-4">
                  <TeamLogo team={team} className="h-6 w-6" />
                  <p className="text-xs font-semibold tracking-[0.28em] text-ink-2">
                    {team.name.toUpperCase()}
                  </p>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {rosterByOverall.map(({ kind, player }) => (
                    <Link
                      key={player.id}
                      to={`/players/${playerSlug(player.name)}`}
                      className="flex items-center gap-4 border border-line bg-bg-2 p-5 transition-colors duration-300 hover:border-line-strong"
                    >
                      <span className="flex shrink-0 items-center gap-2">
                        {player.headshot && (
                          <img
                            src={player.headshot}
                            alt=""
                            className="h-10 w-10 rounded-full border border-line object-cover"
                          />
                        )}
                        <OverallBadge overall={player.overall ?? 70} />
                      </span>
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 font-display text-lg font-semibold uppercase tracking-wide text-ink-0">
                          <span className="min-w-0 truncate">{player.name}</span>
                          <ChampionBadge seasons={championshipSeasonsFor(player.name)} />
                        </p>
                        <p className="truncate text-xs text-ink-2">
                          {kind === "skater"
                            ? `${player.position} · ${skaterPoints(player)} PTS`
                            : `G · ${player.wins}-${player.losses}-${player.otLosses}`}
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
                    to={`/players/${playerSlug(player.name)}`}
                    className="flex items-center gap-4 border border-line bg-bg-2 p-5 transition-colors duration-300 hover:border-line-strong"
                  >
                    {player.headshot && (
                      <img
                        src={player.headshot}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded-full border border-line object-cover"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 font-display text-lg font-semibold uppercase tracking-wide text-ink-0">
                        <span className="min-w-0 truncate">{player.name}</span>
                        <ChampionBadge seasons={championshipSeasonsFor(player.name)} />
                      </p>
                      <p className="truncate text-xs text-ink-2">Former player</p>
                    </div>
                    {player.overall !== undefined && (
                      <OverallBadge overall={player.overall} className="ml-auto" />
                    )}
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
