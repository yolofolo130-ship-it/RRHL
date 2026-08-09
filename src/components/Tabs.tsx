interface TabOption {
  value: string;
  label: string;
}

interface TabsProps {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  /** Thin vertical divider between each tab, for a more "category" feel. */
  dividers?: boolean;
}

export default function Tabs({ options, value, onChange, className = "", dividers = false }: TabsProps) {
  return (
    <div
      className={`inline-flex flex-wrap items-center gap-1 border border-line bg-bg-2 p-1 ${className}`}
      role="tablist"
    >
      {options.map((option, i) => {
        const active = option.value === value;
        return (
          <div key={option.value} className="flex items-center">
            {dividers && i > 0 && <span className="mx-1 h-4 w-px bg-line-strong" aria-hidden />}
            <button
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(option.value)}
              className={`relative px-4 py-2 text-xs font-semibold tracking-[0.18em] transition-colors duration-300 ${
                active ? "text-black" : "text-ink-2 hover:text-ink-0"
              }`}
            >
              {active && (
                <span className="absolute inset-0 animate-fade-in bg-white" aria-hidden />
              )}
              <span className="relative">{option.label}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
