import rrhlLogo from "@/assets/logos/rrhl-logo.png";
import type { RecordCategory } from "@/data/recordBook";

const ACCENT = "#fbbf24";

export default function RecordCategoryCard({ name, records }: RecordCategory) {
  return (
    <div
      className="group relative overflow-hidden border border-[var(--accent)]/30 bg-gradient-to-br from-[var(--accent)]/[0.08] via-bg-2 to-bg-2 p-5 shadow-[0_0_20px_-8px_var(--accent)] transition-all duration-300 hover:border-[var(--accent)]/50 hover:shadow-[0_0_30px_-6px_var(--accent)]"
      style={{ ["--accent" as string]: ACCENT }}
    >
      <div
        className="pointer-events-none absolute -inset-10 animate-glow-pulse rounded-full bg-[var(--accent)]/25 blur-3xl"
        aria-hidden
      />
      <div className="relative flex items-center gap-3 border-b border-[var(--accent)]/20 pb-3">
        <img src={rrhlLogo} alt="" className="h-9 w-9 shrink-0 object-contain" aria-hidden />
        <p className="font-display text-xl font-semibold uppercase tracking-wide text-[var(--accent)]">
          {name}
        </p>
      </div>
      <div className="relative mt-4 flex flex-col gap-3">
        {records.map((record) => (
          <div key={record.label} className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold tracking-[0.2em] text-ink-3">
              {record.label.toUpperCase()}
            </span>
            {record.holder ? (
              <div className="text-right">
                <p className="text-sm font-semibold text-[var(--accent)]">{record.holder}</p>
                {record.value && <p className="text-xs text-ink-2">{record.value}</p>}
              </div>
            ) : (
              <span className="text-xs text-ink-3">TBD</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
