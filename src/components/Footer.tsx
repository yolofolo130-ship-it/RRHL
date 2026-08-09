import { Link } from "react-router-dom";
import rrhlLogo from "@/assets/logos/rrhl-logo.png";

const DISCORD_URL = "https://discord.gg/XDnHEQQSFS";

function DiscordIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6605a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

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
      <div className="relative overflow-hidden border-b border-line">
        <div
          className="pointer-events-none absolute inset-0 animate-glow-pulse opacity-[0.15]"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, #ffffff, transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto flex flex-col items-center gap-5 px-6 py-14 text-center lg:px-10">
          <p className="font-display text-3xl font-bold uppercase tracking-wide text-ink-0 sm:text-4xl">
            Join today and start your legacy.
          </p>
          <p className="max-w-md text-sm text-ink-2">
            Ten teams, one Cup, and a seat waiting for you. Jump in the Discord and
            make your mark on RRHL history.
          </p>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-1 inline-flex shrink-0 items-center gap-2 overflow-hidden bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black transition-transform duration-300 hover:scale-105"
          >
            <span
              className="pointer-events-none absolute -inset-2 animate-glow-pulse rounded-full bg-white/70 blur-lg"
              aria-hidden
            />
            <DiscordIcon className="relative h-4 w-4" />
            <span className="relative">Join Discord</span>
          </a>
        </div>
      </div>
      <div className="mx-auto flex flex-col gap-10 px-6 py-14 lg:flex-row lg:items-start lg:justify-between lg:px-10">
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
