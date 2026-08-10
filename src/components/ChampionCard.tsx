import { Link } from "react-router-dom";
import TeamLogo from "./TeamLogo";
import type { TeamRef } from "@/data/teamHistory";

const FALLBACK_ACCENT = "#fbbf24";

// Fixed left%/delay per piece (alternating accent/white) — deterministic so
// the burst looks the same, no jitter, on every render.
const CONFETTI_LEFT_DELAY = [
  { left: 6, delay: 0 },
  { left: 16, delay: 0.15 },
  { left: 26, delay: 0.05 },
  { left: 36, delay: 0.3 },
  { left: 46, delay: 0.2 },
  { left: 56, delay: 0.35 },
  { left: 66, delay: 0.1 },
  { left: 76, delay: 0.25 },
  { left: 86, delay: 0.4 },
  { left: 94, delay: 0.18 },
  { left: 22, delay: 0.45 },
  { left: 62, delay: 0.5 },
];

interface ChampionCardProps {
  honor: string;
  season: string;
  champion: TeamRef;
  opponent: TeamRef;
  seriesScore: string;
}

export default function ChampionCard({
  honor,
  season,
  champion,
  opponent,
  seriesScore,
}: ChampionCardProps) {
  const accent = champion.color ?? FALLBACK_ACCENT;

  const className =
    "group relative block overflow-hidden border border-[var(--accent)]/30 bg-gradient-to-br from-[var(--accent)]/[0.12] via-bg-2 to-bg-2 p-5 shadow-[0_0_20px_-8px_var(--accent)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/50 hover:shadow-[0_0_30px_-6px_var(--accent)]";

  const content = (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {CONFETTI_LEFT_DELAY.map((c, i) => (
          <span
            key={i}
            className={`absolute top-0 h-2 w-1 animate-confetti-fall rounded-[1px] ${
              i % 2 === 0 ? "bg-[var(--accent)]" : "bg-white"
            }`}
            style={{ left: `${c.left}%`, animationDelay: `${c.delay}s` }}
          />
        ))}
      </div>
      <div className="relative">
        <p className="font-display text-lg font-semibold uppercase tracking-wide text-[var(--accent)]">
          {honor}
        </p>
        <p className="mt-1 text-xs font-semibold tracking-[0.15em] text-[var(--accent)]/60">
          {season}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2.5">
            {champion.logo ? (
              <TeamLogo
                team={{ name: champion.name, logo: champion.logo }}
                className="h-14 w-14 shrink-0"
              />
            ) : (
              <div className="h-14 w-14 shrink-0 border border-[var(--accent)]/40 bg-bg-3" />
            )}
            <span className="truncate font-display text-base font-semibold uppercase leading-tight text-ink-0">
              {champion.name}
            </span>
          </div>

          <p className="shrink-0 font-display text-2xl font-bold text-[var(--accent)]">
            {seriesScore}
          </p>

          <div className="flex min-w-0 flex-row-reverse items-center gap-2.5 text-right">
            {opponent.logo ? (
              <TeamLogo
                team={{ name: opponent.name, logo: opponent.logo }}
                className="h-11 w-11 shrink-0 opacity-70"
              />
            ) : (
              <div className="h-11 w-11 shrink-0 border border-line bg-bg-3" />
            )}
            <span className="truncate text-xs text-ink-2">{opponent.name}</span>
          </div>
        </div>
      </div>
    </>
  );

  const style = { ["--accent" as string]: accent };

  if (champion.href) {
    return (
      <Link to={champion.href} className={className} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <div className={className} style={style}>
      {content}
    </div>
  );
}
