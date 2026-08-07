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

      <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        <SectionHeader eyebrow="CONFERENCE" title="Eastern Conference" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {eastStandings.map((standing) => (
            <TeamCard key={standing.team.id} team={standing.team} standing={standing} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-20 lg:px-10">
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
