import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import GameCard from "@/components/GameCard";
import TeamLogo from "@/components/TeamLogo";
import { teams, getTeamById } from "@/data/teams";
import { games } from "@/data/schedule";
import { skaters, goalies, skaterPoints, playerSlug, getHeadshotByName } from "@/data/players";
import { computeHeadToHead, type HeadToHeadRecord } from "@/utils/headToHead";
import { computeStandings, type TeamStanding } from "@/utils/standings";

type Team = NonNullable<ReturnType<typeof getTeamById>>;

function RecordSide({ team, record, leads }: { team: Team; record: HeadToHeadRecord; leads: boolean }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-3 text-center">
      <TeamLogo team={team} className={`h-16 w-16 sm:h-20 sm:w-20 ${leads ? "" : "opacity-70"}`} />
      <p className="font-display text-lg font-semibold uppercase tracking-wide text-ink-0 sm:text-xl">
        {team.name}
      </p>
      <p className="font-display text-4xl font-bold text-ink-0 sm:text-5xl">
        {record.w}-{record.l}-{record.otl}
      </p>
      <p className="text-[10px] font-semibold tracking-[0.2em] text-ink-3">
        {record.gf} GF &middot; {record.ga} GA
      </p>
    </div>
  );
}

const STAT_ROWS: { label: string; key: keyof TeamStanding }[] = [
  { label: "GP", key: "gp" },
  { label: "W", key: "w" },
  { label: "L", key: "l" },
  { label: "OTL", key: "otl" },
  { label: "GF", key: "gf" },
  { label: "GA", key: "ga" },
  { label: "DIFF", key: "diff" },
  { label: "PTS", key: "pts" },
];

function SeasonStatsTable({
  teamA,
  teamB,
  standingA,
  standingB,
}: {
  teamA: Team;
  teamB: Team;
  standingA: TeamStanding;
  standingB: TeamStanding;
}) {
  return (
    <div className="overflow-x-auto border border-line bg-bg-2">
      <table className="w-full min-w-[420px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-line text-xs tracking-[0.15em] text-ink-3">
            <th className="px-4 py-3 text-left font-semibold"></th>
            <th className="px-3 py-3 text-center font-semibold">
              <span className="inline-flex items-center gap-2">
                <TeamLogo team={teamA} className="h-5 w-5" />
                {teamA.abbr}
              </span>
            </th>
            <th className="px-3 py-3 text-center font-semibold">
              <span className="inline-flex items-center gap-2">
                <TeamLogo team={teamB} className="h-5 w-5" />
                {teamB.abbr}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {STAT_ROWS.map(({ label, key }) => {
            const a = standingA[key] as number;
            const b = standingB[key] as number;
            return (
              <tr key={label} className="border-b border-line/60 last:border-b-0">
                <td className="px-4 py-3 text-xs font-semibold tracking-[0.15em] text-ink-3">{label}</td>
                <td
                  className={`px-3 py-3 text-center font-semibold ${a > b ? "text-white" : "text-ink-2"}`}
                >
                  {label === "DIFF" ? (a > 0 ? `+${a}` : a) : a}
                </td>
                <td
                  className={`px-3 py-3 text-center font-semibold ${b > a ? "text-white" : "text-ink-2"}`}
                >
                  {label === "DIFF" ? (b > 0 ? `+${b}` : b) : b}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function TeamLeadersCard({ team }: { team: Team }) {
  const roster = skaters.filter((s) => s.teamId === team.id);
  const pointsLeader = roster.length > 0 ? [...roster].sort((a, b) => skaterPoints(b) - skaterPoints(a))[0] : undefined;
  const teamGoalies = goalies.filter((g) => g.teamId === team.id);
  const topGoalie = teamGoalies.length > 0 ? [...teamGoalies].sort((a, b) => b.wins - a.wins || b.gp - a.gp)[0] : undefined;

  return (
    <div className="flex-1 border border-line bg-bg-2 p-5">
      <p className="flex items-center gap-2 border-b border-line pb-3 text-xs font-semibold tracking-[0.2em] text-ink-2">
        <TeamLogo team={team} className="h-5 w-5" />
        {team.name.toUpperCase()}
      </p>
      <div className="mt-4 flex flex-col gap-3">
        {pointsLeader && (
          <Link
            to={`/players/${playerSlug(pointsLeader.name)}`}
            className="flex items-center gap-3 transition-colors hover:text-white"
          >
            {getHeadshotByName(pointsLeader.name) ? (
              <img
                src={getHeadshotByName(pointsLeader.name)}
                alt=""
                className="h-10 w-10 shrink-0 rounded-full border border-line object-cover"
              />
            ) : (
              <TeamLogo team={team} className="h-9 w-9 shrink-0 opacity-70" />
            )}
            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-[0.15em] text-ink-3">POINTS LEADER</p>
              <p className="truncate text-sm font-semibold text-ink-0">
                {pointsLeader.name}{" "}
                <span className="font-normal text-ink-2">({skaterPoints(pointsLeader)} PTS)</span>
              </p>
            </div>
          </Link>
        )}
        {topGoalie && (
          <Link
            to={`/players/${playerSlug(topGoalie.name)}`}
            className="flex items-center gap-3 transition-colors hover:text-white"
          >
            {getHeadshotByName(topGoalie.name) ? (
              <img
                src={getHeadshotByName(topGoalie.name)}
                alt=""
                className="h-10 w-10 shrink-0 rounded-full border border-line object-cover"
              />
            ) : (
              <TeamLogo team={team} className="h-9 w-9 shrink-0 opacity-70" />
            )}
            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-[0.15em] text-ink-3">TOP GOALIE</p>
              <p className="truncate text-sm font-semibold text-ink-0">
                {topGoalie.name}{" "}
                <span className="font-normal text-ink-2">
                  ({topGoalie.wins}-{topGoalie.losses}-{topGoalie.otLosses})
                </span>
              </p>
            </div>
          </Link>
        )}
        {!pointsLeader && !topGoalie && <p className="text-sm text-ink-2">No stats logged yet.</p>}
      </div>
    </div>
  );
}

export default function HeadToHead() {
  const [teamAId, setTeamAId] = useState(teams[0]?.id ?? "");
  const [teamBId, setTeamBId] = useState(teams[1]?.id ?? "");

  const teamA = getTeamById(teamAId);
  const teamB = getTeamById(teamBId);
  const sameTeam = teamAId === teamBId;

  const result = useMemo(
    () => (sameTeam ? null : computeHeadToHead(teamAId, teamBId, games)),
    [teamAId, teamBId, sameTeam],
  );

  const standings = useMemo(() => computeStandings(teams, games), []);
  const standingA = standings.find((s) => s.team.id === teamAId);
  const standingB = standings.find((s) => s.team.id === teamBId);

  return (
    <>
      <PageHeader eyebrow="TALE OF THE TAPE" title="Head-to-Head" />

      <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <select
            value={teamAId}
            onChange={(e) => setTeamAId(e.target.value)}
            className="border border-line bg-bg-2 px-4 py-2.5 text-xs font-semibold tracking-[0.15em] text-ink-1 outline-none transition-colors focus:border-line-strong"
          >
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name.toUpperCase()}
              </option>
            ))}
          </select>

          <span className="text-xs font-semibold tracking-[0.2em] text-ink-3">VS</span>

          <select
            value={teamBId}
            onChange={(e) => setTeamBId(e.target.value)}
            className="border border-line bg-bg-2 px-4 py-2.5 text-xs font-semibold tracking-[0.15em] text-ink-1 outline-none transition-colors focus:border-line-strong"
          >
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {sameTeam || !teamA || !teamB || !standingA || !standingB ? (
          <p className="mt-10 border border-line bg-bg-2 px-6 py-10 text-center text-sm text-ink-2">
            Pick two different teams to compare.
          </p>
        ) : (
          <>
            <div className="mt-10 flex items-center gap-6 border border-line bg-bg-2 p-8 sm:gap-10 sm:p-10">
              <RecordSide team={teamA} record={result!.teamA} leads={result!.teamA.w > result!.teamB.w} />
              <span className="font-display shrink-0 text-2xl font-bold text-ink-3 sm:text-3xl">
                &ndash;
              </span>
              <RecordSide team={teamB} record={result!.teamB} leads={result!.teamB.w > result!.teamA.w} />
            </div>
            <p className="mt-4 text-center text-xs tracking-wide text-ink-3">
              Head-to-head record between these two teams, this season only.
            </p>

            <div className="mt-12">
              <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-ink-2">SEASON STATS</p>
              <SeasonStatsTable teamA={teamA} teamB={teamB} standingA={standingA} standingB={standingB} />
            </div>

            <div className="mt-12">
              <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-ink-2">LEADING PLAYERS</p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <TeamLeadersCard team={teamA} />
                <TeamLeadersCard team={teamB} />
              </div>
            </div>

            <div className="mt-12">
              <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-ink-2">
                MEETINGS THIS SEASON
              </p>
              <div className="flex flex-col gap-4">
                {result!.games.length === 0 ? (
                  <p className="border border-line bg-bg-2 px-6 py-10 text-center text-sm text-ink-2">
                    These teams haven&apos;t played each other yet this season.
                  </p>
                ) : (
                  result!.games.map((game) => <GameCard key={game.id} game={game} />)
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
