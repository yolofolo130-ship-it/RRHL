import { useEffect } from "react";
import type { HallOfFameEntry } from "@/data/hallOfFame";

interface HallOfFameModalProps {
  entry: HallOfFameEntry;
  onClose: () => void;
}

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm border border-line-strong bg-bg-2 p-7"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={entry.playerName}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-ink-3 transition-colors hover:text-ink-0"
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
        <div className="flex flex-col items-center gap-3 text-center">
          {entry.headshot ? (
            <img
              src={entry.headshot}
              alt={entry.playerName}
              className="h-28 w-28 rounded-2xl border border-line-strong object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center border border-line-strong bg-bg-3 font-display text-3xl font-semibold text-ink-1">
              {entry.playerName.charAt(0).toUpperCase()}
            </div>
          )}
          <p className="text-[10px] font-semibold tracking-[0.25em] text-amber-400">
            HALL OF FAME
          </p>
          <p className="font-display text-2xl font-bold uppercase tracking-wide text-ink-0">
            {entry.playerName}
          </p>
          {entry.note && <p className="text-sm leading-relaxed text-ink-2">{entry.note}</p>}
          {accolades.length > 0 && (
            <ul className="mt-1 flex w-full flex-col gap-2 border-t border-line pt-4 text-left">
              {accolades.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm text-ink-1">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400" aria-hidden />
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
