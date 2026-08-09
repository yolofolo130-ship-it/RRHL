import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import rrhlLogo from "@/assets/logos/rrhl-logo.png";

const DISCORD_URL = "https://discord.gg/XDnHEQQSFS";

function DiscordIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6605a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "HOME", to: "/" },
  { label: "STANDINGS", to: "/standings" },
  { label: "SCHEDULE", to: "/schedule" },
  { label: "TEAMS", to: "/teams" },
  { label: "STATS", to: "/stats" },
  { label: "PLAYERS", to: "/players" },
  { label: "STAFF", to: "/staff" },
  { label: "ACCOLADES", to: "/accolades" },
  { label: "HISTORY", to: "/history" },
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
      <div className="mx-auto flex h-20 items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={rrhlLogo} alt="RRHL logo" className="h-10 w-10 object-contain" />
          <span className="font-display text-lg font-semibold uppercase tracking-wide text-ink-0">
            <span className="sm:hidden">RRHL</span>
            <span className="hidden sm:inline">
              <span className="text-ink-2">Rec Room</span> Hockey League
            </span>
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
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Join today and start your legacy!"
            className="group relative hidden shrink-0 items-center gap-2 overflow-hidden bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-black transition-transform duration-300 hover:scale-105 lg:inline-flex"
          >
            <span
              className="pointer-events-none absolute -inset-2 animate-glow-pulse rounded-full bg-white/70 blur-lg"
              aria-hidden
            />
            <DiscordIcon className="relative h-4 w-4" />
            <span className="relative">Join Discord</span>
          </a>
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
          mobileOpen ? "max-h-[36rem]" : "max-h-0 border-b-0"
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
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-fit items-center gap-2 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-black"
          >
            <DiscordIcon />
            Join Discord
          </a>
          <span className="mt-2 inline-block w-fit border border-line px-4 py-2 text-xs font-semibold tracking-[0.2em] text-ink-1">
            S23
          </span>
        </nav>
      </div>
    </header>
  );
}
