import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import heroTrailer from "@/assets/backgrounds/rrhl-trailer-fix.mp4";

// Background trailer plays muted/looped behind the gradient + vignette
// below, which keep the title text readable over it. Only lives here, so
// it only ever shows at the top of the homepage.
export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Some browsers block autoplay outright regardless of muted/playsinline
  // (iOS Low Power Mode, a site-level "Never Auto-Play" setting) — no JS
  // workaround forces it, so a tap-to-play fallback appears instead of
  // leaving the video permanently stuck.
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    // Mobile Safari's autoplay gate checks the *actual* muted state at the
    // moment play() is attempted — React's declarative `muted` prop doesn't
    // always land in time for that check, which silently blocks playback
    // on iOS even though it works everywhere else. Setting it imperatively
    // here, right before play(), makes autoplay reliable on mobile too.
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => setNeedsTap(true));
  }, []);

  const tapToPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().then(() => setNeedsTap(false)).catch(() => {});
  };

  // min-h-[92vh] only applies sm: and up — the content here is vertically
  // centered, not stretched, so forcing that height on every mobile screen
  // (which can be quite tall) left a large dead gap of video/vignette below
  // the text before the next section started. On mobile the section now
  // sizes to its own content instead.
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-bg-0 sm:min-h-[92vh]">
      <video
        ref={videoRef}
        src={heroTrailer}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlaying={() => setNeedsTap(false)}
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      {needsTap && (
        <button
          type="button"
          onClick={tapToPlay}
          aria-label="Play trailer"
          className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur-sm transition-transform duration-300 hover:scale-105"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
      {/* Flat scrim over the whole video — the old gradient left the
          middle fully transparent, right where the title sits, so text
          contrast depended on whatever the video happened to show. */}
      <div className="absolute inset-0 bg-black/55" aria-hidden />
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-[-10%] h-[70%] w-[140%] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[10%] h-[50%] w-[50%] rounded-full bg-white/[0.03] blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[10%] h-[50%] w-[50%] rounded-full bg-white/[0.03] blur-[140px]" />

        <svg
          className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="200" cy="200" r="120" stroke="white" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="4" fill="white" />
          <line x1="0" y1="200" x2="400" y2="200" stroke="white" strokeWidth="1" />
        </svg>

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-bg-0" />
        <div className="absolute inset-0 [box-shadow:inset_0_0_220px_120px_rgba(0,0,0,0.85)]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-20 pb-16 text-center sm:pb-0">
        <p
          className="animate-fade-up text-xs font-semibold tracking-[0.35em] text-ink-2"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
        >
          S23 &bull; REGULAR SEASON
        </p>
        <h1
          className="font-display mt-5 text-balance text-[15vw] font-bold uppercase leading-[0.92] tracking-tight text-ink-0 sm:text-7xl lg:text-8xl"
          style={{ textShadow: "0 4px 28px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.9)" }}
        >
          Rec Room Hockey League
        </h1>
        <p
          className="mt-6 max-w-xl text-balance text-sm leading-relaxed text-ink-2 sm:text-base"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
        >
          Ten teams. One winner. Follow every faceoff, track the standings,
          and watch your favorite team chase the Stanley Cup.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/schedule"
            className="border border-white bg-white px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-white"
          >
            VIEW SCHEDULE
          </Link>
          <Link
            to="/standings"
            className="border border-line bg-black/30 px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-white transition-all duration-300 hover:border-line-strong hover:bg-white/10"
          >
            STANDINGS
          </Link>
        </div>
      </div>
    </section>
  );
}
