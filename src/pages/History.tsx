import PageHeader from "@/components/PageHeader";
import TrophyCard from "@/components/TrophyCard";
import { accolades } from "@/data/accolades";
import { seasonAccolades, byNewestSeason } from "@/data/playerHistory";
import { teamSeasonHonors, resolveHonorTeam } from "@/data/teamHistory";
import { getPlayerIdByName } from "@/data/players";

interface DisplayHonor {
  id: string;
  name: string;
  subtitle: string;
  to?: string;
}

function playerHonorsForSeason(season: string): DisplayHonor[] {
  const entries =
    season === "Season 23"
      ? accolades
          .filter((a) => a.winner)
          .map((a) => ({ id: a.id, name: a.name, winner: a.winner as string }))
      : seasonAccolades
          .filter((a) => a.season === season)
          .map((a) => ({ id: a.id, name: a.accoladeName, winner: a.playerName }));

  return entries.map(({ id, name, winner }) => {
    const playerId = getPlayerIdByName(winner);
    return { id, name, subtitle: winner, to: playerId ? `/players/${playerId}` : undefined };
  });
}

function teamHonorsForSeason(season: string): DisplayHonor[] {
  return teamSeasonHonors
    .filter((h) => h.season === season)
    .map((h) => {
      const { name, href } = resolveHonorTeam(h.teamId);
      return { id: h.id, name: h.honor, subtitle: name, to: href };
    });
}

export default function History() {
  const seasons = Array.from(
    new Set([
      ...seasonAccolades.map((a) => a.season),
      ...teamSeasonHonors.map((h) => h.season),
      ...(accolades.some((a) => a.winner) ? ["Season 23"] : []),
    ]),
  ).sort((a, b) => byNewestSeason({ season: a }, { season: b }));

  return (
    <>
      <PageHeader eyebrow="THE RECORD BOOK" title="History" />

      <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        {seasons.length === 0 ? (
          <p className="border border-line bg-bg-2 px-6 py-8 text-center text-sm text-ink-2">
            No award history on record yet.
          </p>
        ) : (
          <div className="flex flex-col gap-14">
            {seasons.map((season) => {
              const honors = [...playerHonorsForSeason(season), ...teamHonorsForSeason(season)];
              if (honors.length === 0) return null;

              return (
                <div key={season}>
                  <p className="border-b border-line pb-4 text-xs font-semibold tracking-[0.28em] text-ink-2">
                    {season.toUpperCase()}
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {honors.map((honor) => (
                      <TrophyCard
                        key={honor.id}
                        name={honor.name}
                        subtitle={honor.subtitle}
                        to={honor.to}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
