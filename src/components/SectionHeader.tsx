import { Link } from "react-router-dom";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  action?: { label: string; to: string };
  align?: "left" | "center";
}

export default function SectionHeader({
  eyebrow,
  title,
  action,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={`flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5 ${
        align === "center" ? "text-center sm:text-left" : ""
      }`}
    >
      <div>
        <p className="text-xs font-semibold tracking-[0.28em] text-ink-2">
          {eyebrow}
        </p>
        <h2 className="font-display text-4xl font-semibold uppercase tracking-wide text-ink-0 sm:text-5xl">
          {title}
        </h2>
      </div>
      {action && (
        <Link
          to={action.to}
          className="group inline-flex shrink-0 items-center gap-2 border border-line px-5 py-2.5 text-xs font-semibold tracking-[0.2em] text-ink-1 transition-all duration-300 hover:border-line-strong hover:bg-white hover:text-black"
        >
          {action.label}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      )}
    </div>
  );
}
