import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import SectionHeader from "@/components/SectionHeader";
import TeamCard from "@/components/TeamCard";
import { teams } from "@/data/teams";
import { games } from "@/data/schedule";
import { standingsForConference } from "@/utils/standings";

export default function Teams() {
  const eastStandings = standingsForConference("east", teams, games);
  const westStandings = standingsForConference("west", teams, games);

  return (
    <>
      <PageHeader eyebrow="TEN CLUBS, ONE CUP" title="Teams" />

      <section className="mx-auto px-6 pt-14 lg:px-10">
        <Link
          to="/head-to-head"
          className="group inline-flex items-center gap-2 border border-line px-5 py-2.5 text-xs font-semibold tracking-[0.2em] text-ink-1 transition-all duration-300 hover:border-line-strong hover:bg-white hover:text-black"
        >
          COMPARE TWO TEAMS
          <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </Link>
      </section>

      <section className="mx-auto px-6 py-14 lg:px-10">
        <SectionHeader eyebrow="CONFERENCE" title="Eastern Conference" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {eastStandings.map((standing) => (
            <TeamCard key={standing.team.id} team={standing.team} standing={standing} />
          ))}
        </div>
      </section>

      <section className="mx-auto px-6 pb-20 lg:px-10">
        <SectionHeader eyebrow="CONFERENCE" title="Western Conference" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {westStandings.map((standing) => (
            <TeamCard key={standing.team.id} team={standing.team} standing={standing} />
          ))}
        </div>
      </section>
    </>
  );
}
