import { Link } from "react-router-dom";
import TeamLogo from "./TeamLogo";
import type { Team } from "@/data/types";

// Fixed left%/color/delay per piece — deterministic so the burst looks the
// same (and doesn't jitter) on every render.
const CONFETTI = [
  { left: 6, color: "#fbbf24", delay: 0 },
  { left: 16, color: "#f9fafb", delay: 0.15 },
  { left: 26, color: "#fbbf24", delay: 0.05 },
  { left: 36, color: "#f59e0b", delay: 0.3 },
  { left: 46, color: "#f9fafb", delay: 0.2 },
  { left: 56, color: "#fbbf24", delay: 0.35 },
  { left: 66, color: "#f59e0b", delay: 0.1 },
  { left: 76, color: "#f9fafb", delay: 0.25 },
  { left: 86, color: "#fbbf24", delay: 0.4 },
  { left: 94, color: "#f59e0b", delay: 0.18 },
  { left: 22, color: "#f9fafb", delay: 0.45 },
  { left: 62, color: "#fbbf24", delay: 0.5 },
];

interface ChampionCardProps {
  honor: string;
  season: string;
  champion: { team?: Team; name: string };
  opponent: { team?: Team; name: string };
  seriesScore: string;
}

export default function ChampionCard({
  honor,
  season,
  champion,
  opponent,
  seriesScore,
}: ChampionCardProps) {
  const className =
    "group relative block overflow-hidden border border-amber-400/30 bg-gradient-to-br from-amber-500/[0.1] via-bg-2 to-bg-2 p-5 shadow-[0_0_20px_-8px_rgba(251,191,36,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/50 hover:shadow-[0_0_30px_-6px_rgba(251,191,36,0.45)]";

  const content = (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {CONFETTI.map((c, i) => (
          <span
            key={i}
            className="absolute top-0 h-2 w-1 animate-confetti-fall rounded-[1px]"
            style={{ left: `${c.left}%`, backgroundColor: c.color, animationDelay: `${c.delay}s` }}
          />
        ))}
      </div>
      <div
        className="pointer-events-none absolute -inset-10 animate-glow-pulse rounded-full bg-amber-400/25 blur-3xl"
        aria-hidden
      />

      <div className="relative">
        <p className="font-display text-lg font-semibold uppercase tracking-wide text-amber-200">
          {honor}
        </p>
        <p className="mt-1 text-xs font-semibold tracking-[0.15em] text-amber-200/60">{season}</p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2.5">
            {champion.team ? (
              <TeamLogo team={champion.team} className="h-10 w-10 shrink-0" />
            ) : (
              <div className="h-10 w-10 shrink-0 border border-amber-400/40 bg-bg-3" />
            )}
            <span className="truncate font-display text-base font-semibold uppercase leading-tight text-ink-0">
              {champion.name}
            </span>
          </div>

          <p className="shrink-0 font-display text-2xl font-bold text-amber-200">{seriesScore}</p>

          <div className="flex min-w-0 flex-row-reverse items-center gap-2.5 text-right">
            {opponent.team ? (
              <TeamLogo team={opponent.team} className="h-8 w-8 shrink-0 opacity-70" />
            ) : (
              <div className="h-8 w-8 shrink-0 border border-line bg-bg-3" />
            )}
            <span className="truncate text-xs text-ink-2">{opponent.name}</span>
          </div>
        </div>
      </div>
    </>
  );

  if (champion.team) {
    return (
      <Link to={`/teams/${champion.team.id}`} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
