import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import rrhlLogo from "@/assets/logos/rrhl-logo.png";

const NAV_LINKS = [
  { label: "HOME", to: "/" },
  { label: "STANDINGS", to: "/standings" },
  { label: "SCHEDULE", to: "/schedule" },
  { label: "TEAMS", to: "/teams" },
  { label: "STATS", to: "/stats" },
  { label: "STAFF", to: "/staff" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-bg-0/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={rrhlLogo} alt="RRHL logo" className="h-10 w-10 object-contain" />
          <span className="font-display text-lg font-semibold uppercase tracking-wide text-ink-0">
            <span className="text-ink-2">Rec Room</span> Hockey League
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={`relative py-2 text-sm font-semibold tracking-[0.18em] transition-colors duration-300 ${
                isActive(link.to) ? "text-white" : "text-ink-2 hover:text-ink-0"
              }`}
            >
              {link.label}
              {isActive(link.to) && (
                <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] animate-fade-in bg-white" />
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden shrink-0 border border-line px-4 py-2 text-xs font-semibold tracking-[0.2em] text-ink-1 lg:inline-block">
            S23
          </span>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] border border-line lg:hidden"
          >
            <span
              className={`h-[1.5px] w-5 bg-white transition-all duration-300 ${
                mobileOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-5 bg-white transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-5 bg-white transition-all duration-300 ${
                mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-b border-line bg-bg-0 transition-[max-height] duration-300 ease-out lg:hidden ${
          mobileOpen ? "max-h-96" : "max-h-0 border-b-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={`py-3 text-sm font-semibold tracking-[0.18em] ${
                isActive(link.to) ? "text-white" : "text-ink-2"
              }`}
            >
              {link.label}
            </NavLink>
          ))}
          <span className="mt-2 inline-block w-fit border border-line px-4 py-2 text-xs font-semibold tracking-[0.2em] text-ink-1">
            S23
          </span>
        </nav>
      </div>
    </header>
  );
}
