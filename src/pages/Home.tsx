import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import GameCard from "@/components/GameCard";
import StandingsTable from "@/components/StandingsTable";
import TeamLogoTile from "@/components/TeamLogoTile";
import TeamLogo from "@/components/TeamLogo";
import { teams, getTeamById } from "@/data/teams";
import { games, featuredGameId } from "@/data/schedule";
import { standingsForConference } from "@/utils/standings";
import {
  skaters,
  goalies,
  skaterPoints,
  topByGoals,
  topByAssists,
  topByPoints,
  topBySaves,
} from "@/data/players";
import { formatLongDate } from "@/utils/format";

const upcomingGames = games
  .filter((g) => g.status === "upcoming" || g.status === "live")
  .sort((a, b) => a.date.localeCompare(b.date))
  .slice(0, 4);

const eastStandings = standingsForConference("east", teams, games);
const westStandings = standingsForConference("west", teams, games);

const featuredGame = games.find((g) => g.id === featuredGameId);

export default function Home() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <SectionHeader
          eyebrow="ON THE SLATE"
          title="Upcoming Games"
          action={{ label: "VIEW FULL SCHEDULE", to: "/schedule" }}
        />
        <div className="mt-8 flex flex-col gap-4">
          {upcomingGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <SectionHeader
          eyebrow="AROUND THE LEAGUE"
          title="Standings"
          action={{ label: "VIEW FULL STANDINGS", to: "/standings" }}
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <StandingsTable
            title="EASTERN CONFERENCE"
            standings={eastStandings}
            variant="compact"
          />
          <StandingsTable
            title="WESTERN CONFERENCE"
            standings={westStandings}
            variant="compact"
          />
        </div>
      </section>

      {featuredGame && (
        <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
          <SectionHeader eyebrow="DON'T MISS IT" title="Main Event" />
          <FeaturedMatchup gameId={featuredGame.id} />
        </section>
      )}

      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <SectionHeader eyebrow="THE FIELD" title="League Teams" />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {teams.map((team) => (
            <TeamLogoTile key={team.id} team={team} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <SectionHeader
          eyebrow="TOP PERFORMERS"
          title="League Leaders"
          action={{ label: "VIEW FULL STATS", to: "/stats" }}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <LeaderCard
            label="GOALS"
            rows={topByGoals(4).map((s) => ({
              id: s.id,
              teamId: s.teamId,
              name: s.name,
              value: s.goals,
            }))}
          />
          <LeaderCard
            label="ASSISTS"
            rows={topByAssists(4).map((s) => ({
              id: s.id,
              teamId: s.teamId,
              name: s.name,
              value: s.assists,
            }))}
          />
          <LeaderCard
            label="POINTS"
            rows={topByPoints(4).map((s) => ({
              id: s.id,
              teamId: s.teamId,
              name: s.name,
              value: skaterPoints(s),
            }))}
          />
          <LeaderCard
            label="SAVES"
            rows={topBySaves(4).map((g) => ({
              id: g.id,
              teamId: g.teamId,
              name: g.name,
              value: g.saves,
            }))}
          />
        </div>
      </section>
    </>
  );
}

function FeaturedMatchup({ gameId }: { gameId: string }) {
  const game = games.find((g) => g.id === gameId);
  if (!game) return null;
  const home = getTeamById(game.homeTeamId);
  const away = getTeamById(game.awayTeamId);
  if (!home || !away) return null;

  return (
    <div className="relative mt-8">
      <div
        className="pointer-events-none absolute -inset-4 animate-glow-spin rounded-[2px] opacity-70 blur-2xl"
        style={{
          background: `conic-gradient(from 0deg, ${away.color}, transparent 30%, transparent 70%, ${home.color}, ${away.color})`,
        }}
        aria-hidden
      />
      <div className="relative overflow-hidden border border-line-strong bg-bg-2 px-6 py-14 sm:px-14">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
          style={{ background: `linear-gradient(90deg, ${away.color}, ${home.color})` }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 animate-glow-pulse"
          style={{
            background: `radial-gradient(circle at 15% 20%, ${away.color}, transparent 45%), radial-gradient(circle at 85% 80%, ${home.color}, transparent 45%)`,
          }}
          aria-hidden
        />
        <div className="relative flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <TeamBlock team={away} />

          <div className="flex flex-col items-center gap-3 shrink-0">
            <span className="font-display text-2xl font-bold uppercase tracking-widest text-ink-3">
              VS
            </span>
            <span className="text-xs font-semibold tracking-[0.2em] text-ink-2">
              {formatLongDate(game.date)}
            </span>
            <span className="text-xs text-ink-3">{game.time}</span>
          </div>

          <TeamBlock team={home} reverse />
        </div>
      </div>
    </div>
  );
}

function TeamBlock({
  team,
  reverse = false,
}: {
  team: NonNullable<ReturnType<typeof getTeamById>>;
  reverse?: boolean;
}) {
  const leadingScorer = skaters
    .filter((s) => s.teamId === team.id)
    .sort((a, b) => skaterPoints(b) - skaterPoints(a))[0];
  const leadingGoalie = goalies
    .filter((g) => g.teamId === team.id)
    .sort((a, b) => b.wins - a.wins || b.gp - a.gp)[0];

  return (
    <Link
      to={`/teams/${team.id}`}
      className={`flex flex-1 flex-col items-center gap-4 text-center transition-opacity hover:opacity-80 sm:flex-row sm:gap-6 ${
        reverse ? "sm:flex-row-reverse sm:text-right" : "sm:text-left"
      }`}
    >
      <TeamLogo team={team} className="h-24 w-24 sm:h-28 sm:w-28" />
      <div>
        <p className="font-display text-3xl font-semibold uppercase leading-tight text-ink-0 sm:text-4xl">
          {team.name}
        </p>
        <p className="text-xs font-semibold tracking-[0.2em] text-ink-3">
          {team.conference === "east" ? "EASTERN CONFERENCE" : "WESTERN CONFERENCE"}
        </p>
        {(leadingScorer || leadingGoalie) && (
          <div className="mt-3 flex flex-col gap-1">
            {leadingScorer && (
              <p className="text-xs text-ink-2">
                <span className="text-ink-3">LEADING SCORER </span>
                {leadingScorer.name} ({skaterPoints(leadingScorer)} PTS)
              </p>
            )}
            {leadingGoalie && (
              <p className="text-xs text-ink-2">
                <span className="text-ink-3">GOALIE </span>
                {leadingGoalie.name}
              </p>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

function LeaderCard({
  label,
  rows,
}: {
  label: string;
  rows: { id: string; teamId: string; name: string; value: number }[];
}) {
  return (
    <div className="border border-line bg-bg-2 p-5">
      <p className="border-b border-line pb-3 text-xs font-semibold tracking-[0.25em] text-ink-2">
        {label}
      </p>
      <ul className="mt-3 flex flex-col gap-3">
        {rows.map((row, index) => {
          const team = getTeamById(row.teamId);
          return (
            <li key={row.id} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-4 shrink-0 text-xs text-ink-3">{index + 1}</span>
                {team && <TeamLogo team={team} className="h-5 w-5 shrink-0" />}
                <span className="truncate text-sm text-ink-1">{row.name}</span>
              </div>
              <span className="shrink-0 font-display text-lg font-semibold text-ink-0">
                {row.value}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
