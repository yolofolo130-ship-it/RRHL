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
    <div className="group relative overflow-hidden border border-amber-400/30 bg-gradient-to-br from-amber-500/[0.08] via-bg-2 to-bg-2 p-5 transition-transform duration-300 hover:-translate-y-0.5">
      <div
        className="pointer-events-none absolute -inset-10 animate-glow-pulse rounded-full bg-amber-400/25 blur-3xl"
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
          className="mt-0.5 h-6 w-6 shrink-0 text-amber-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.55)]"
          aria-hidden
        >
          <path d="M8 4h8v4a4 4 0 0 1-8 0V4z" />
          <path d="M8 5H5a2 2 0 0 0 2 4" />
          <path d="M16 5h3a2 2 0 0 1-2 4" />
          <path d="M12 12v3" />
          <path d="M10 16h4l1 3H9l1-3z" />
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
