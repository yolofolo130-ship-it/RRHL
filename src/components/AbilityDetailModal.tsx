import { useEffect } from "react";

interface AbilityDetailModalProps {
  name: string;
  icon: string;
  description: string;
  tierLabel: string;
  onClose: () => void;
}

// Shown when an X-Factor/Star ability badge is clicked on a player's page.
export default function AbilityDetailModal({
  name,
  icon,
  description,
  tierLabel,
  onClose,
}: AbilityDetailModalProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

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
        aria-label={name}
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
          <img src={icon} alt={name} className="h-16 w-16 object-contain" />
          <p className="text-[10px] font-semibold tracking-[0.25em] text-ink-3">{tierLabel}</p>
          <p className="font-display text-2xl font-bold uppercase tracking-wide text-ink-0">
            {name}
          </p>
          <p className="text-sm leading-relaxed text-ink-2">
            {description || "No description yet."}
          </p>
        </div>
      </div>
    </div>
  );
}
