import rrhlLogo from "@/assets/logos/rrhl-logo.png";

// Fixed starting position/size/timing per crest — spread around the
// screen with staggered durations/delays so they drift independently
// instead of moving in lockstep.
const LOGOS = [
  { left: "6vw", top: "20vh", size: "h-16 w-16 sm:h-24 sm:w-24", opacity: 0.06, duration: 50, delay: 0 },
  { left: "78vw", top: "62vh", size: "h-12 w-12 sm:h-16 sm:w-16", opacity: 0.05, duration: 62, delay: -14 },
  { left: "40vw", top: "8vh", size: "h-10 w-10 sm:h-14 sm:w-14", opacity: 0.05, duration: 44, delay: -30 },
  { left: "16vw", top: "76vh", size: "h-14 w-14 sm:h-20 sm:w-20", opacity: 0.045, duration: 70, delay: -50 },
];

// A handful of faint RRHL crests that slowly drift around the viewport,
// fixed in place so they stay put while the page scrolls — a subtle
// ambient watermark, present on every page. Low opacity +
// pointer-events-none so they never compete with or block real content.
export default function FloatingLogo() {
  return (
    <>
      {LOGOS.map((logo, i) => (
        <img
          key={i}
          src={rrhlLogo}
          alt=""
          aria-hidden
          className={`animate-logo-float pointer-events-none fixed z-0 object-contain ${logo.size}`}
          style={{
            left: logo.left,
            top: logo.top,
            opacity: logo.opacity,
            animationDuration: `${logo.duration}s`,
            animationDelay: `${logo.delay}s`,
          }}
        />
      ))}
    </>
  );
}
