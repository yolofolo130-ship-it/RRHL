import { Link, useParams } from "react-router-dom";
import TeamLogo from "@/components/TeamLogo";
import { getOlympicTeamById } from "@/data/olympics";
import { getPlayerBySlug, playerSlug, getHeadshotByName } from "@/data/players";
import { getTeamById } from "@/data/teams";

function ResolvedPersonRow({ name }: { name: string }) {
  const slug = playerSlug(name);
  const player = getPlayerBySlug(slug);
  const headshot = getHeadshotByName(name);
  const clubTeam =
    player && (player.kind === "skater" || player.kind === "goalie") ? getTeamById(player.teamId) : undefined;
  const position = player?.kind === "skater" ? player.position : player?.kind === "goalie" ? "G" : undefined;

  const row = (
    <div className="flex items-center gap-4 border border-line bg-bg-2 p-4 transition-colors duration-300 hover:border-line-strong">
      {headshot ? (
        <img src={headshot} alt="" className="h-12 w-12 shrink-0 rounded-full border border-line object-cover object-top" />
      ) : (
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-bg-3 font-display text-sm font-semibold text-ink-1">
          {name.charAt(0).toUpperCase()}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-base font-semibold uppercase tracking-wide text-ink-0">
          {name}
        </p>
        {clubTeam && (
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-3">
            <TeamLogo team={clubTeam} className="h-3.5 w-3.5" />
            {clubTeam.abbr}
          </p>
        )}
      </div>
      {position && (
        <span className="shrink-0 text-xs font-semibold tracking-[0.15em] text-ink-2">{position}</span>
      )}
    </div>
  );

  if (!player) return row;
  return (
    <Link to={`/players/${slug}`} className="block">
      {row}
    </Link>
  );
}

export default function OlympicTeamDetail() {
  const { teamId } = useParams<{ teamId: string }>();
  const team = teamId ? getOlympicTeamById(teamId) : undefined;

  if (!team) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-32 text-center lg:px-10">
        <p className="font-display text-3xl font-semibold uppercase text-ink-0">Team not found</p>
        <Link
          to="/olympics"
          className="mt-6 inline-block border border-line px-6 py-3 text-xs font-semibold tracking-[0.2em] text-ink-1 transition-colors hover:border-line-strong hover:text-ink-0"
        >
          BACK TO OLYMPICS
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="border-b border-line bg-bg-1">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-6 pb-10 pt-36 text-center lg:flex-row lg:items-end lg:gap-8 lg:px-10 lg:text-left">
          <img src={team.logo} alt={`${team.name} logo`} className="h-28 w-28 shrink-0 object-contain" />
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-ink-2">RRHL OLYMPICS</p>
            <h1 className="font-display mt-2 text-5xl font-bold uppercase tracking-wide text-ink-0 sm:text-6xl">
              {team.name}
            </h1>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-ink-2">HEAD COACH</p>
        <ResolvedPersonRow name={team.headCoach} />

        <p className="mb-4 mt-10 text-xs font-semibold tracking-[0.2em] text-ink-2">ROSTER</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {team.roster.map((name) => (
            <ResolvedPersonRow key={name} name={name} />
          ))}
        </div>
      </section>
    </>
  );
}
