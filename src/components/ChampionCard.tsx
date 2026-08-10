import { useState } from "react";
import { Link } from "react-router-dom";
import TeamLogo from "./TeamLogo";
import type { TeamRef } from "@/data/teamHistory";
import { championshipRosters } from "@/data/championshipRosters";
import { getPlayerSlugByName } from "@/data/players";

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
  photo?: string;
}

export default function ChampionCard({
  honor,
  season,
  champion,
  opponent,
  seriesScore,
  photo,
}: ChampionCardProps) {
  const [photoOpen, setPhotoOpen] = useState(false);
  const accent = champion.color ?? FALLBACK_ACCENT;
  const roster = championshipRosters.filter((c) => c.season === season);

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
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-display text-lg font-semibold uppercase tracking-wide text-[var(--accent)]">
              {honor}
            </p>
            <p className="mt-1 text-xs font-semibold tracking-[0.15em] text-[var(--accent)]/60">
              {season}
            </p>
          </div>
          {photo && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPhotoOpen(true);
              }}
              className="relative z-10 shrink-0 border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.1em] text-[var(--accent)] transition-colors duration-300 hover:bg-[var(--accent)]/20"
            >
              VIEW PHOTO
            </button>
          )}
        </div>

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

  const photoModal = photo && photoOpen && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 py-10"
      onClick={() => setPhotoOpen(false)}
    >
      <div
        className="relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden border border-line-strong bg-bg-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setPhotoOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center bg-black/50 text-white transition-colors hover:bg-black/70"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
        <div className="overflow-y-auto">
          <img
            src={photo}
            alt={`${champion.name} — ${honor}, ${season}`}
            className="w-full object-contain"
          />
          <div className="p-6">
            <p className="font-display text-xl font-bold uppercase tracking-wide text-ink-0">
              {champion.name}
            </p>
            <p className="text-xs font-semibold tracking-[0.15em] text-[var(--accent)]" style={style}>
              {honor} — {season}
            </p>
            {roster.length > 0 && (
              <div className="mt-5 border-t border-line pt-4">
                <p className="mb-3 text-[10px] font-semibold tracking-[0.25em] text-ink-3">
                  WINNING ROSTER
                </p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3">
                  {roster.map((player) => {
                    const slug = getPlayerSlugByName(player.playerName);
                    return (
                      <li key={player.id} className="min-w-0 truncate text-sm">
                        {slug ? (
                          <Link
                            to={`/players/${slug}`}
                            onClick={() => setPhotoOpen(false)}
                            className="text-ink-1 transition-colors hover:text-white hover:underline"
                          >
                            {player.playerName}
                          </Link>
                        ) : (
                          <span className="text-ink-1">{player.playerName}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (champion.href) {
    return (
      <>
        <Link to={champion.href} className={className} style={style}>
          {content}
        </Link>
        {photoModal}
      </>
    );
  }

  return (
    <>
      <div className={className} style={style}>
        {content}
      </div>
      {photoModal}
    </>
  );
}
