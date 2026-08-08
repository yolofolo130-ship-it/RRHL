import { Link, useParams } from "react-router-dom";
import TeamLogo from "@/components/TeamLogo";
import TrophyCard from "@/components/TrophyCard";
import ChampionBadge from "@/components/ChampionBadge";
import { getTeamById } from "@/data/teams";
import { getPlayerById, skaterPoints, goalieSavePct, goalieGaa } from "@/data/players";
import { skaterHistoryFor, goalieHistoryFor, pastAccoladesFor, byNewestSeason } from "@/data/playerHistory";
import { championshipCount } from "@/data/championshipRosters";
import { accolades } from "@/data/accolades";

export default function PlayerDetail() {
  const { playerId } = useParams<{ playerId: string }>();
  const player = playerId ? getPlayerById(playerId) : undefined;

  if (!player) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-32 text-center lg:px-10">
        <p className="font-display text-3xl font-semibold uppercase text-ink-0">
          Player not found
        </p>
        <Link
          to="/players"
          className="mt-6 inline-block border border-line px-6 py-3 text-xs font-semibold tracking-[0.2em] text-ink-1 transition-colors hover:border-line-strong hover:text-ink-0"
        >
          BACK TO PLAYERS
        </Link>
      </div>
    );
  }

  const team = player.kind !== "former" ? getTeamById(player.teamId) : undefined;
  const skaterHistory = skaterHistoryFor(player.name);
  const goalieHistory = goalieHistoryFor(player.name);

  const currentAccolades = accolades
    .filter((a) => a.winner === player.name)
    .map((a) => ({ id: a.id, name: a.name, season: "Season 23" }));
  const pastAccolades = pastAccoladesFor(player.name).map((a) => ({
    id: a.id,
    name: a.accoladeName,
    season: a.season,
  }));
  const allAccolades = [...currentAccolades, ...pastAccolades].sort(byNewestSeason);
  const champCount = championshipCount(player.name);

  return (
    <>
      <div className="relative overflow-hidden border-b border-line bg-bg-1">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            background: team
              ? `radial-gradient(circle at 20% 30%, ${team.color}, transparent 55%)`
              : undefined,
          }}
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-6 pb-10 pt-36 text-center lg:flex-row lg:items-end lg:gap-8 lg:px-10 lg:text-left">
          {team && <TeamLogo team={team} className="h-28 w-28 shrink-0 lg:h-36 lg:w-36" />}
          <div className="flex flex-1 flex-col items-center gap-2 lg:items-start">
            {team && (
              <Link
                to={`/teams/${team.id}`}
                className="text-xs font-semibold tracking-[0.3em] text-ink-2 hover:text-ink-0"
              >
                {team.name.toUpperCase()}
              </Link>
            )}
            <h1 className="flex flex-wrap items-center justify-center gap-3 font-display text-5xl font-bold uppercase tracking-wide text-ink-0 sm:text-6xl lg:justify-start">
              {player.name}
              <ChampionBadge count={champCount} size="lg" />
            </h1>
            <p className="text-xs font-semibold tracking-[0.2em] text-ink-3">
              {player.kind === "former"
                ? "FORMER PLAYER"
                : `${player.kind === "skater" ? player.position : "GOALIE"} · #${player.number}`}
            </p>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        {player.kind !== "former" && (
          <>
        <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-ink-2">SEASON 23</p>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {player.kind === "skater" ? (
            (
              [
                ["GP", player.gp],
                ["G", player.goals],
                ["A", player.assists],
                ["PTS", skaterPoints(player)],
                ["PIM", player.pim],
              ] as const
            ).map(([label, value]) => (
              <div key={label} className="border border-line bg-bg-2 p-5 text-center">
                <p className="font-display text-3xl font-semibold text-ink-0">{value}</p>
                <p className="mt-1 text-[10px] font-semibold tracking-[0.2em] text-ink-3">
                  {label}
                </p>
              </div>
            ))
          ) : (
            <>
              {(
                [
                  ["GP", player.gp],
                  ["W", player.wins],
                  ["L", player.losses],
                  ["OTL", player.otLosses],
                  ["SAVES", player.saves],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="border border-line bg-bg-2 p-5 text-center">
                  <p className="font-display text-3xl font-semibold text-ink-0">{value}</p>
                  <p className="mt-1 text-[10px] font-semibold tracking-[0.2em] text-ink-3">
                    {label}
                  </p>
                </div>
              ))}
              <div className="border border-line bg-bg-2 p-5 text-center">
                <p className="font-display text-3xl font-semibold text-ink-0">
                  {(goalieSavePct(player) * 100).toFixed(1)}%
                </p>
                <p className="mt-1 text-[10px] font-semibold tracking-[0.2em] text-ink-3">SV%</p>
              </div>
              <div className="border border-line bg-bg-2 p-5 text-center">
                <p className="font-display text-3xl font-semibold text-ink-0">
                  {goalieGaa(player).toFixed(2)}
                </p>
                <p className="mt-1 text-[10px] font-semibold tracking-[0.2em] text-ink-3">GAA</p>
              </div>
            </>
          )}
        </div>
          </>
        )}

        <p className="mb-4 mt-14 text-xs font-semibold tracking-[0.2em] text-ink-2">
          ACCOLADES
        </p>
        {allAccolades.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allAccolades.map((accolade) => (
              <TrophyCard key={accolade.id} name={accolade.name} subtitle={accolade.season} />
            ))}
          </div>
        ) : (
          <p className="border border-line bg-bg-2 px-6 py-8 text-center text-sm text-ink-2">
            No accolades yet.
          </p>
        )}

        <p className="mb-4 mt-14 text-xs font-semibold tracking-[0.2em] text-ink-2">
          SEASON HISTORY
        </p>
        {skaterHistory.length > 0 ? (
          <HistoryTable
            rows={skaterHistory.map((h) => ({
              season: h.season,
              teamId: h.teamId,
              stats: [
                ["GP", h.gp],
                ["G", h.goals],
                ["A", h.assists],
                ["PTS", h.goals + h.assists],
                ["PIM", h.pim],
              ] as const,
            }))}
          />
        ) : goalieHistory.length > 0 ? (
          <HistoryTable
            rows={goalieHistory.map((h) => ({
              season: h.season,
              teamId: h.teamId,
              stats: [
                ["GP", h.gp],
                ["W", h.wins],
                ["L", h.losses],
                ["OTL", h.otLosses],
                ["SV", h.saves],
              ] as const,
            }))}
          />
        ) : (
          <p className="border border-line bg-bg-2 px-6 py-8 text-center text-sm text-ink-2">
            No prior season history yet.
          </p>
        )}
      </section>
    </>
  );
}

function HistoryTable({
  rows,
}: {
  rows: { season: string; teamId: string; stats: readonly (readonly [string, number])[] }[];
}) {
  const columns = rows[0]?.stats.map(([label]) => label) ?? [];

  return (
    <div className="overflow-x-auto border border-line bg-bg-2">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-line text-xs tracking-[0.15em] text-ink-3">
            <th className="px-4 py-3 text-left font-semibold">SEASON</th>
            <th className="px-3 py-3 text-left font-semibold">TEAM</th>
            {columns.map((label) => (
              <th key={label} className="px-3 py-3 text-center font-semibold">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const team = getTeamById(row.teamId);
            return (
              <tr
                key={row.season}
                className="border-b border-line/60 last:border-b-0 hover:bg-white/[0.03]"
              >
                <td className="px-4 py-3 font-medium text-ink-0">{row.season}</td>
                <td className="px-3 py-3">
                  {team && (
                    <span className="inline-flex items-center gap-2 text-ink-2">
                      <TeamLogo team={team} className="h-5 w-5" />
                      {team.abbr}
                    </span>
                  )}
                </td>
                {row.stats.map(([label, value]) => (
                  <td key={label} className="px-3 py-3 text-center text-ink-1">
                    {value}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
