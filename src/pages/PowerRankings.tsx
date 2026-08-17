import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import TeamLogo from "@/components/TeamLogo";
import { teams } from "@/data/teams";
import { games } from "@/data/schedule";
import { skaters, goalies } from "@/data/players";
import { computePowerRankings, type PowerRanking } from "@/utils/powerRankings";

function MovementIndicator({ movement }: { movement: number | null }) {
  if (movement === null) {
    return <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-3">NEW</span>;
  }
  if (movement === 0) {
    return <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-3">&mdash;</span>;
  }
  const up = movement > 0;
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-semibold tracking-[0.1em] ${
        up ? "text-emerald-400" : "text-red-400"
      }`}
    >
      {up ? "▲" : "▼"} {Math.abs(movement)}
    </span>
  );
}

function PowerRankRow({ ranking }: { ranking: PowerRanking }) {
  const { team, standing, rosterOverall, rank, movement } = ranking;
  return (
    <Link
      to={`/teams/${team.id}`}
      className="group flex items-center gap-4 border border-line bg-bg-2 p-4 transition-colors duration-300 hover:border-line-strong sm:gap-6 sm:p-5"
    >
      <div className="flex w-12 shrink-0 flex-col items-center gap-1 sm:w-14">
        <span className="font-display text-3xl font-bold text-ink-0 sm:text-4xl">{rank}</span>
        <MovementIndicator movement={movement} />
      </div>

      <TeamLogo team={team} className="h-11 w-11 shrink-0 sm:h-14 sm:w-14" />

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-base font-semibold uppercase tracking-wide text-ink-0 sm:text-lg">
          {team.name}
        </p>
        <p className="text-xs tracking-wide text-ink-2">
          {standing.w}-{standing.l}-{standing.otl} &middot; {standing.pts} PTS
          {rosterOverall != null && <> &middot; {rosterOverall.toFixed(0)} OVR</>}
        </p>
      </div>

      <span
        className={`shrink-0 text-xs font-semibold tracking-[0.1em] ${
          standing.streak?.type === "W"
            ? "text-emerald-400"
            : standing.streak?.type === "L"
              ? "text-red-400"
              : "text-ink-3"
        }`}
      >
        {standing.streak ? `${standing.streak.type}${standing.streak.count}` : "—"}
      </span>
    </Link>
  );
}

export default function PowerRankings() {
  const rankings = computePowerRankings(teams, games, skaters, goalies);

  return (
    <>
      <PageHeader eyebrow="WHO'S ACTUALLY PLAYING WELL" title="Power Rankings" />

      <section className="mx-auto max-w-[900px] px-6 py-14 lg:px-10">
        <p className="mb-8 text-sm leading-relaxed text-ink-2">
          Computed automatically from standings and player stats &mdash; record and goal
          differential carry the most weight, with current streak and roster talent (average
          rated overall) factored in. This isn&apos;t the standings; it&apos;s a read on which
          teams are actually playing well right now. Movement is versus last week.
        </p>

        <div className="flex flex-col gap-3">
          {rankings.map((ranking) => (
            <PowerRankRow key={ranking.team.id} ranking={ranking} />
          ))}
        </div>
      </section>
    </>
  );
}
