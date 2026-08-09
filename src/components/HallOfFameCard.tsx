import type { HallOfFameEntry } from "@/data/hallOfFame";

interface HallOfFameCardProps {
  entry: HallOfFameEntry;
  onClick: () => void;
}

export default function HallOfFameCard({ entry, onClick }: HallOfFameCardProps) {
  const accoladeCount = (entry.accolades ?? "")
    .split(";")
    .map((a) => a.trim())
    .filter(Boolean).length;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative block w-full overflow-hidden border border-amber-400/30 bg-bg-2 text-left shadow-[0_0_20px_-8px_#fbbf24] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/50 hover:shadow-[0_0_30px_-6px_#fbbf24]"
    >
      <div
        className="pointer-events-none absolute -inset-10 animate-glow-pulse rounded-full bg-amber-400/25 blur-3xl transition-colors duration-300 group-hover:bg-amber-400/40"
        aria-hidden
      />
      <div className="relative h-44 w-full overflow-hidden bg-bg-3">
        {entry.headshot ? (
          <img
            src={entry.headshot}
            alt={entry.playerName}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-6xl font-bold text-ink-3">
              {entry.playerName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-2 via-bg-2/10 to-transparent" />
      </div>
      <div className="relative p-5">
        <p className="text-[10px] font-semibold tracking-[0.25em] text-amber-400">HALL OF FAME</p>
        <p className="mt-1 font-display text-xl font-bold uppercase leading-tight tracking-wide text-ink-0">
          {entry.playerName}
        </p>
        {entry.note && <p className="mt-1 line-clamp-2 text-xs text-ink-2">{entry.note}</p>}
        <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold tracking-[0.1em] text-amber-400">
          {accoladeCount > 0 ? `${accoladeCount} ACCOLADE${accoladeCount === 1 ? "" : "S"}` : "VIEW CAREER"}
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </p>
      </div>
    </button>
  );
}
