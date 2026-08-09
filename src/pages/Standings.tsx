import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Tabs from "@/components/Tabs";
import StandingsTable from "@/components/StandingsTable";
import { teams } from "@/data/teams";
import { games } from "@/data/schedule";
import { standingsForConference } from "@/utils/standings";

const TAB_OPTIONS = [
  { value: "league", label: "LEAGUE" },
  { value: "east", label: "EAST" },
  { value: "west", label: "WEST" },
];

const eastStandings = standingsForConference("east", teams, games);
const westStandings = standingsForConference("west", teams, games);

export default function Standings() {
  const [tab, setTab] = useState("league");

  return (
    <>
      <PageHeader eyebrow="REGULAR SEASON" title="S23 Standings" />

      <section className="mx-auto px-6 py-14 lg:px-10">
        <Tabs options={TAB_OPTIONS} value={tab} onChange={setTab} />

        <div className="mt-8">
          {tab === "league" && (
            <div className="grid gap-6 lg:grid-cols-2">
              <StandingsTable title="EASTERN CONFERENCE" standings={eastStandings} />
              <StandingsTable title="WESTERN CONFERENCE" standings={westStandings} />
            </div>
          )}
          {tab === "east" && (
            <StandingsTable title="EASTERN CONFERENCE" standings={eastStandings} />
          )}
          {tab === "west" && (
            <StandingsTable title="WESTERN CONFERENCE" standings={westStandings} />
          )}
        </div>
      </section>
    </>
  );
}
