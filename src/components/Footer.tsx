import { Link } from "react-router-dom";
import rrhlLogo from "@/assets/logos/rrhl-logo.png";

const FOOTER_LINKS = [
  { label: "Home", to: "/" },
  { label: "Standings", to: "/standings" },
  { label: "Schedule", to: "/schedule" },
  { label: "Teams", to: "/teams" },
  { label: "Stats", to: "/stats" },
  { label: "Staff", to: "/staff" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg-1">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-14 lg:flex-row lg:items-start lg:justify-between lg:px-10">
        <div className="flex items-center gap-3">
          <img src={rrhlLogo} alt="RRHL logo" className="h-12 w-12 object-contain" />
          <div>
            <p className="font-display text-xl font-semibold uppercase tracking-wide text-ink-0">
              Rec Room Hockey League
            </p>
            <p className="text-xs font-semibold tracking-[0.2em] text-ink-2">
              SEASON 23
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-xs font-semibold tracking-[0.18em] text-ink-2 transition-colors duration-300 hover:text-ink-0"
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-line px-6 py-6 lg:px-10">
        <p className="text-xs tracking-wide text-ink-3">
          &copy; RRHL S23 — Rec Room Hockey League
        </p>
      </div>
    </footer>
  );
}
