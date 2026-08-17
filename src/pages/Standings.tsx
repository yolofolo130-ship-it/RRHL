import { useState } from "react";
import { Link } from "react-router-dom";
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
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Tabs options={TAB_OPTIONS} value={tab} onChange={setTab} />
          <Link
            to="/power-rankings"
            className="group inline-flex items-center gap-2 border border-line px-5 py-2.5 text-xs font-semibold tracking-[0.2em] text-ink-1 transition-all duration-300 hover:border-line-strong hover:bg-white hover:text-black"
          >
            POWER RANKINGS
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

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
