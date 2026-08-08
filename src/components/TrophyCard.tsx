interface TrophyCardProps {
  name: string;
  subtitle: string;
  /** For not-yet-decided awards — plain, no gold treatment. */
  muted?: boolean;
}

export default function TrophyCard({ name, subtitle, muted = false }: TrophyCardProps) {
  if (muted) {
    return (
      <div className="border border-line bg-bg-2 p-5">
        <p className="font-display text-lg font-semibold uppercase tracking-wide text-ink-1">
          {name}
        </p>
        <p className="mt-1 text-xs text-ink-3">{subtitle}</p>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden border border-amber-400/30 bg-gradient-to-br from-amber-500/[0.08] via-bg-2 to-bg-2 p-5 shadow-[0_0_20px_-8px_rgba(251,191,36,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/50 hover:shadow-[0_0_30px_-6px_rgba(251,191,36,0.45)]">
      <div
        className="pointer-events-none absolute -inset-10 animate-glow-pulse rounded-full bg-amber-400/25 blur-3xl transition-colors duration-300 group-hover:bg-amber-400/40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        aria-hidden
      />
      <div className="relative flex items-start gap-3">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-0.5 h-7 w-7 shrink-0 text-amber-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.55)]"
          aria-hidden
        >
          {/* crossed hockey sticks */}
          <path d="M5 4 L17 16" />
          <path d="M17 16 L21.5 13.5" />
          <path d="M19 4 L7 16" />
          <path d="M7 16 L2.5 13.5" />
          {/* puck */}
          <ellipse cx="12" cy="19.5" rx="3.5" ry="1.4" fill="currentColor" stroke="none" />
        </svg>
        <div className="min-w-0">
          <p className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-amber-200">
            {name}
          </p>
          <p className="mt-1 text-xs font-semibold tracking-[0.15em] text-amber-200/60">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
