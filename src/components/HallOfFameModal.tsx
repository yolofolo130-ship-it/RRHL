import { useEffect } from "react";
import type { HallOfFameEntry } from "@/data/hallOfFame";
import { getTeamById } from "@/data/teams";

interface HallOfFameModalProps {
  entry: HallOfFameEntry;
  onClose: () => void;
}

// Fixed positions/timing for the falling-crest tribute — deterministic so
// it looks the same every time, no jitter between renders.
const FALL_SLOTS = [
  { left: 6, size: 26, duration: 6.5, delay: 0, rot: 18 },
  { left: 20, size: 18, duration: 8.5, delay: 1.6, rot: -22 },
  { left: 36, size: 32, duration: 7.2, delay: 3, rot: 24 },
  { left: 52, size: 20, duration: 9, delay: 0.8, rot: -16 },
  { left: 68, size: 28, duration: 6, delay: 2.4, rot: 20 },
  { left: 84, size: 17, duration: 7.8, delay: 4.2, rot: -20 },
];

export default function HallOfFameModal({ entry, onClose }: HallOfFameModalProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const accolades = (entry.accolades ?? "")
    .split(";")
    .map((a) => a.trim())
    .filter(Boolean);

  const team = entry.teamId ? getTeamById(entry.teamId) : undefined;
  const accent = team?.color ?? "#fbbf24";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden border border-line-strong bg-bg-2 p-7"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={entry.playerName}
        style={{ ["--accent" as string]: accent }}
      >
        <div
          className="pointer-events-none absolute -inset-10 animate-glow-pulse rounded-full bg-[var(--accent)]/25 blur-3xl"
          aria-hidden
        />
        {team?.logo && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            {FALL_SLOTS.map((slot, i) => (
              <img
                key={i}
                src={team.logo}
                alt=""
                className="animate-logo-fall absolute -top-1/4"
                style={
                  {
                    left: `${slot.left}%`,
                    width: `${slot.size}px`,
                    height: `${slot.size}px`,
                    animationDuration: `${slot.duration}s`,
                    animationDelay: `${slot.delay}s`,
                    ["--fall-rot" as string]: `${slot.rot}deg`,
                    ["--fall-opacity" as string]: "0.22",
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 text-ink-3 transition-colors hover:text-ink-0"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
        <div className="relative flex flex-col items-center gap-3 text-center">
          {entry.headshot ? (
            <img
              src={entry.headshot}
              alt={entry.playerName}
              className="h-32 w-32 rounded-2xl border border-[var(--accent)]/50 object-cover shadow-[0_0_24px_-6px_var(--accent)]"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center border border-[var(--accent)]/50 bg-bg-3 font-display text-4xl font-semibold text-ink-1">
              {entry.playerName.charAt(0).toUpperCase()}
            </div>
          )}
          <p className="text-[10px] font-semibold tracking-[0.25em] text-[var(--accent)]">
            HALL OF FAME
          </p>
          <p className="font-display text-3xl font-bold uppercase tracking-wide text-ink-0">
            {entry.playerName}
          </p>
          {team && (
            <div className="flex items-center gap-2 border border-[var(--accent)]/30 bg-[var(--accent)]/[0.08] px-3 py-1.5">
              {team.logo && <img src={team.logo} alt="" className="h-4 w-4 object-contain" />}
              <span className="text-[10px] font-semibold tracking-[0.15em] text-[var(--accent)]">
                RETIRED — {team.name.toUpperCase()}
              </span>
            </div>
          )}
          {entry.note && <p className="text-sm leading-relaxed text-ink-2">{entry.note}</p>}
          {accolades.length > 0 && (
            <ul className="mt-1 flex w-full flex-col gap-2 border-t border-line pt-4 text-left">
              {accolades.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm text-ink-1">
                  <span
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                    aria-hidden
                  />
                  {a}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
