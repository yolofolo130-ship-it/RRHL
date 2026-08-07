interface TabOption {
  value: string;
  label: string;
}

interface TabsProps {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function Tabs({ options, value, onChange, className = "" }: TabsProps) {
  return (
    <div
      className={`inline-flex flex-wrap gap-1 border border-line bg-bg-2 p-1 ${className}`}
      role="tablist"
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
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
        );
      })}
    </div>
  );
}
