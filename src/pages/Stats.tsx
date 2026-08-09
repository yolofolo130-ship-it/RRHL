import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import Tabs from "@/components/Tabs";
import TeamLogo from "@/components/TeamLogo";
import { teams, getTeamById } from "@/data/teams";
import { games } from "@/data/schedule";
import {
  skaters,
  goalies,
  skaterPoints,
  goaliePoints,
  goalieSavePct,
  goalieGaa,
  goalieShotsAgainst,
  isQualifiedGoalie,
  playerSlug,
} from "@/data/players";
import { computeStandings, sortStandings } from "@/utils/standings";
import { formatSavePct } from "@/utils/format";

const TAB_OPTIONS = [
  { value: "skaters", label: "SKATERS" },
  { value: "goalies", label: "GOALIES" },
  { value: "teams", label: "TEAMS" },
];

const skaterRows = [...skaters].sort((a, b) => skaterPoints(b) - skaterPoints(a));
// Ranked by actual performance (SV%, then GAA, then save volume as
// tiebreakers) rather than wins, so a goalie's record doesn't inflate their
// rank when their underlying numbers don't back it up. Qualified goalies
// (enough GP to matter) sort ahead of everyone else, so a one-game perfect
// sheet can't camp at #1 all season.
const goalieRows = [...goalies].sort(
  (a, b) =>
    Number(isQualifiedGoalie(b)) - Number(isQualifiedGoalie(a)) ||
    goalieSavePct(b) - goalieSavePct(a) ||
    goalieGaa(a) - goalieGaa(b) ||
    b.saves - a.saves,
);
const teamRows = sortStandings(computeStandings(teams, games));

export default function Stats() {
  const [tab, setTab] = useState("skaters");

  return (
    <>
      <PageHeader eyebrow="THE NUMBERS" title="S23 Player Stats" />

      <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        <Tabs options={TAB_OPTIONS} value={tab} onChange={setTab} />

        <div className="mt-8 overflow-x-auto border border-line bg-bg-2">
          {tab === "skaters" && (
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-xs tracking-[0.15em] text-ink-3">
                  <th className="px-4 py-3 text-left font-semibold">#</th>
                  <th className="px-4 py-3 text-left font-semibold">PLAYER</th>
                  <th className="px-3 py-3 text-left font-semibold">TEAM</th>
                  <th className="px-3 py-3 text-center font-semibold">GP</th>
                  <th className="px-3 py-3 text-center font-semibold">G</th>
                  <th className="px-3 py-3 text-center font-semibold">A</th>
                  <th className="px-3 py-3 text-center font-semibold">PTS</th>
                  <th className="px-4 py-3 text-center font-semibold">PIM</th>
                </tr>
              </thead>
              <tbody>
                {skaterRows.map((player, index) => {
                  const team = getTeamById(player.teamId);
                  return (
                    <tr
                      key={player.id}
                      className="border-b border-line/60 last:border-b-0 hover:bg-white/[0.03]"
                    >
                      <td className="px-4 py-3 text-ink-3">{index + 1}</td>
                      <td className="px-4 py-3 font-medium text-ink-0">
                        <Link to={`/players/${playerSlug(player.name)}`} className="hover:text-white">
                          {player.name}
                        </Link>
                      </td>
                      <td className="px-3 py-3">
                        {team && (
                          <span className="inline-flex items-center gap-2 text-ink-2">
                            <TeamLogo team={team} className="h-5 w-5" />
                            {team.abbr}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center text-ink-1">{player.gp}</td>
                      <td className="px-3 py-3 text-center text-ink-1">{player.goals}</td>
                      <td className="px-3 py-3 text-center text-ink-1">{player.assists}</td>
                      <td className="px-3 py-3 text-center font-semibold text-ink-0">
                        {skaterPoints(player)}
                      </td>
                      <td className="px-4 py-3 text-center text-ink-1">{player.pim}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {tab === "goalies" && (
            <table className="w-full min-w-[920px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-xs tracking-[0.15em] text-ink-3">
                  <th className="px-4 py-3 text-left font-semibold">#</th>
                  <th className="px-4 py-3 text-left font-semibold">PLAYER</th>
                  <th className="px-3 py-3 text-left font-semibold">TEAM</th>
                  <th className="px-3 py-3 text-center font-semibold">GP</th>
                  <th className="px-3 py-3 text-center font-semibold">GS</th>
                  <th className="px-3 py-3 text-center font-semibold">W</th>
                  <th className="px-3 py-3 text-center font-semibold">L</th>
                  <th className="px-3 py-3 text-center font-semibold">SA</th>
                  <th className="px-3 py-3 text-center font-semibold">SVS</th>
                  <th className="px-3 py-3 text-center font-semibold">GA</th>
                  <th className="px-3 py-3 text-center font-semibold">SV%</th>
                  <th className="px-3 py-3 text-center font-semibold">GAA</th>
                  <th className="px-3 py-3 text-center font-semibold">SO</th>
                  <th className="px-3 py-3 text-center font-semibold">G</th>
                  <th className="px-3 py-3 text-center font-semibold">A</th>
                  <th className="px-3 py-3 text-center font-semibold">P</th>
                  <th className="px-4 py-3 text-center font-semibold">PIM</th>
                </tr>
              </thead>
              <tbody>
                {goalieRows.map((goalie, index) => {
                  const team = getTeamById(goalie.teamId);
                  return (
                    <tr
                      key={goalie.id}
                      className="border-b border-line/60 last:border-b-0 hover:bg-white/[0.03]"
                    >
                      <td className="px-4 py-3 text-ink-3">{index + 1}</td>
                      <td className="px-4 py-3 font-medium text-ink-0">
                        <Link to={`/players/${playerSlug(goalie.name)}`} className="hover:text-white">
                          {goalie.name}
                        </Link>
                      </td>
                      <td className="px-3 py-3">
                        {team && (
                          <span className="inline-flex items-center gap-2 text-ink-2">
                            <TeamLogo team={team} className="h-5 w-5" />
                            {team.abbr}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center text-ink-1">{goalie.gp}</td>
                      <td className="px-3 py-3 text-center text-ink-1">{goalie.gs}</td>
                      <td className="px-3 py-3 text-center text-ink-1">{goalie.wins}</td>
                      <td className="px-3 py-3 text-center text-ink-1">{goalie.losses}</td>
                      <td className="px-3 py-3 text-center text-ink-1">{goalieShotsAgainst(goalie)}</td>
                      <td className="px-3 py-3 text-center text-ink-1">{goalie.saves}</td>
                      <td className="px-3 py-3 text-center text-ink-1">{goalie.goalsAgainst}</td>
                      <td className="px-3 py-3 text-center font-semibold text-ink-0">
                        {goalieShotsAgainst(goalie) > 0 ? formatSavePct(goalieSavePct(goalie)) : "—"}
                      </td>
                      <td className="px-3 py-3 text-center text-ink-1">
                        {goalie.gp > 0 ? goalieGaa(goalie).toFixed(2) : "—"}
                      </td>
                      <td className="px-3 py-3 text-center text-ink-1">{goalie.shutouts}</td>
                      <td className="px-3 py-3 text-center text-ink-1">{goalie.goals}</td>
                      <td className="px-3 py-3 text-center text-ink-1">{goalie.assists}</td>
                      <td className="px-3 py-3 text-center font-semibold text-ink-0">
                        {goaliePoints(goalie)}
                      </td>
                      <td className="px-4 py-3 text-center text-ink-1">{goalie.pim}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {tab === "teams" && (
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-xs tracking-[0.15em] text-ink-3">
                  <th className="px-4 py-3 text-left font-semibold">TEAM</th>
                  <th className="px-3 py-3 text-center font-semibold">GP</th>
                  <th className="px-3 py-3 text-center font-semibold">W</th>
                  <th className="px-3 py-3 text-center font-semibold">L</th>
                  <th className="px-3 py-3 text-center font-semibold">GF</th>
                  <th className="px-3 py-3 text-center font-semibold">GA</th>
                  <th className="px-3 py-3 text-center font-semibold">DIFF</th>
                  <th className="px-4 py-3 text-center font-semibold">PTS</th>
                </tr>
              </thead>
              <tbody>
                {teamRows.map((row) => (
                  <tr
                    key={row.team.id}
                    className="border-b border-line/60 last:border-b-0 hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2.5 font-medium text-ink-0">
                        <TeamLogo team={row.team} className="h-5 w-5" />
                        {row.team.name}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center text-ink-1">{row.gp}</td>
                    <td className="px-3 py-3 text-center text-ink-1">{row.w}</td>
                    <td className="px-3 py-3 text-center text-ink-1">{row.l}</td>
                    <td className="px-3 py-3 text-center text-ink-1">{row.gf}</td>
                    <td className="px-3 py-3 text-center text-ink-1">{row.ga}</td>
                    <td className="px-3 py-3 text-center text-ink-1">
                      {row.diff > 0 ? `+${row.diff}` : row.diff}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold text-ink-0">{row.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
}
