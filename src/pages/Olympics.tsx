import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { olympicTeams } from "@/data/olympics";
import { getPlayerBySlug, playerSlug, getHeadshotByName } from "@/data/players";

function CoachLine({ name }: { name: string }) {
  const slug = playerSlug(name);
  const player = getPlayerBySlug(slug);
  const headshot = getHeadshotByName(name);

  const content = (
    <span className="inline-flex items-center gap-2">
      {headshot ? (
        <img src={headshot} alt="" className="h-6 w-6 shrink-0 rounded-full border border-line object-cover" />
      ) : (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-bg-3 text-[10px] font-semibold text-ink-1">
          {name.charAt(0).toUpperCase()}
        </span>
      )}
      <span className="text-ink-0">{name}</span>
    </span>
  );

  if (!player) return content;
  return (
    <Link to={`/players/${slug}`} className="transition-colors hover:text-white">
      {content}
    </Link>
  );
}

export default function Olympics() {
  return (
    <>
      <PageHeader eyebrow="RRHL PRESENTS" title="Olympics" />

      <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-2">
          Four national teams, drawn from across the league. Schedule and bracket are still being
          finalized — for now, here are the rosters.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {olympicTeams.map((team) => (
            <Link
              key={team.id}
              to={`/olympics/${team.id}`}
              className="group flex items-center gap-5 border border-line bg-bg-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong"
            >
              <img src={team.logo} alt={`${team.name} logo`} className="h-20 w-20 shrink-0 object-contain" />
              <div className="min-w-0">
                <p className="font-display text-2xl font-semibold uppercase tracking-wide text-ink-0">
                  {team.name}
                </p>
                <p className="mt-1 text-xs font-semibold tracking-[0.15em] text-ink-3">
                  {team.roster.length} PLAYERS
                </p>
                <div className="mt-3 text-sm">
                  <span className="text-xs text-ink-3">HEAD COACH </span>
                  <CoachLine name={team.headCoach} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
