import { Link } from "react-router-dom";
import TeamLogo from "./TeamLogo";

const FALLBACK_ACCENT = "#fbbf24";

interface TrophyCardProps {
  name: string;
  subtitle: string;
  /** For not-yet-decided awards — plain, no gold treatment. */
  muted?: boolean;
  /** If set, the card links there (e.g. the winner's or team's page). */
  to?: string;
  /** If set (and `to` isn't), the card renders as a button instead of a link. */
  onClick?: () => void;
  /** A team crest shown in place of the generic hockey-sticks icon. */
  logo?: string;
  /** Themes the card in this color instead of the default gold. */
  color?: string;
}

export default function TrophyCard({
  name,
  subtitle,
  muted = false,
  to,
  onClick,
  logo,
  color,
}: TrophyCardProps) {
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

  const accent = color ?? FALLBACK_ACCENT;

  const className =
    "group relative block overflow-hidden border border-[var(--accent)]/30 bg-gradient-to-br from-[var(--accent)]/[0.08] via-bg-2 to-bg-2 p-5 shadow-[0_0_20px_-8px_var(--accent)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/50 hover:shadow-[0_0_30px_-6px_var(--accent)]";

  const content = (
    <>
      <div
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        aria-hidden
      />
      <div className="relative flex items-start gap-3">
        {logo ? (
          <TeamLogo team={{ name: subtitle, logo }} className="h-10 w-10 shrink-0" />
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 h-7 w-7 shrink-0 text-[var(--accent)] drop-shadow-[0_0_6px_var(--accent)]"
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
        )}
        <div className="min-w-0">
          <p className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-[var(--accent)]">
            {name}
          </p>
          <p className="mt-1 text-xs font-semibold tracking-[0.15em] text-[var(--accent)]/60">
            {subtitle}
          </p>
        </div>
      </div>
    </>
  );

  const style = { ["--accent" as string]: accent };

  if (to) {
    return (
      <Link to={to} className={className} style={style}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${className} w-full text-left`} style={style}>
        {content}
      </button>
    );
  }

  return (
    <div className={className} style={style}>
      {content}
    </div>
  );
}
