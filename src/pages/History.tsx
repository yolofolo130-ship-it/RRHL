import PageHeader from "@/components/PageHeader";
import TrophyCard from "@/components/TrophyCard";
import ChampionCard from "@/components/ChampionCard";
import { accolades } from "@/data/accolades";
import { seasonAccolades, byOldestSeason } from "@/data/playerHistory";
import { teamSeasonHonors, resolveTeamRef, isChampionshipHonor } from "@/data/teamHistory";
import { getPlayerSlugByName } from "@/data/players";

interface DisplayHonor {
  id: string;
  name: string;
  subtitle: string;
  to?: string;
  logo?: string;
  color?: string;
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
    const slug = getPlayerSlugByName(winner);
    return { id, name, subtitle: winner, to: slug ? `/players/${slug}` : undefined };
  });
}

function teamHonorsForSeason(season: string): DisplayHonor[] {
  return teamSeasonHonors
    .filter((h) => h.season === season && !isChampionshipHonor(h))
    .map((h) => {
      const { name, href, logo, color } = resolveTeamRef(h.teamId);
      return { id: h.id, name: h.honor, subtitle: name, to: href, logo, color };
    });
}

function championHonorsForSeason(season: string) {
  return teamSeasonHonors.filter((h) => h.season === season && isChampionshipHonor(h));
}

export default function History() {
  const seasons = Array.from(
    new Set([
      ...seasonAccolades.map((a) => a.season),
      ...teamSeasonHonors.map((h) => h.season),
      ...(accolades.some((a) => a.winner) ? ["Season 23"] : []),
    ]),
  ).sort((a, b) => byOldestSeason({ season: a }, { season: b }));

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
              const champions = championHonorsForSeason(season);
              const honors = [...playerHonorsForSeason(season), ...teamHonorsForSeason(season)];
              if (champions.length === 0 && honors.length === 0) return null;

              return (
                <div key={season}>
                  <p className="border-b border-line pb-4 text-xs font-semibold tracking-[0.28em] text-ink-2">
                    {season.toUpperCase()}
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {champions.map((honor) => (
                      <ChampionCard
                        key={honor.id}
                        honor={honor.honor}
                        season={honor.season}
                        champion={resolveTeamRef(honor.teamId)}
                        opponent={resolveTeamRef(honor.opponentTeamId as string)}
                        seriesScore={honor.seriesScore as string}
                      />
                    ))}
                    {honors.map((honor) => (
                      <TrophyCard
                        key={honor.id}
                        name={honor.name}
                        subtitle={honor.subtitle}
                        to={honor.to}
                        logo={honor.logo}
                        color={honor.color}
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
