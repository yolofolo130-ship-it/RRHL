// Fixed starting position/size/timing/color per leaf — spread across the
// viewport width with staggered durations/delays so they fall independently
// instead of in lockstep. Same technique as FloatingLogo: fixed position,
// transform+opacity only CSS animation (compositor-only, no layout/paint
// cost per frame), so this doesn't add any real render overhead.
const LEAVES = [
  { left: "4vw", size: 16, color: "#d97706", duration: 11, delay: 0, sway: 22, opacity: 0.5 },
  { left: "14vw", size: 12, color: "#b91c1c", duration: 14, delay: -4, sway: 18, opacity: 0.4 },
  { left: "24vw", size: 20, color: "#c2410c", duration: 10, delay: -8, sway: 28, opacity: 0.55 },
  { left: "36vw", size: 14, color: "#a16207", duration: 13, delay: -2, sway: 20, opacity: 0.45 },
  { left: "48vw", size: 18, color: "#92400e", duration: 12, delay: -9, sway: 26, opacity: 0.5 },
  { left: "58vw", size: 13, color: "#d97706", duration: 15, delay: -5, sway: 16, opacity: 0.4 },
  { left: "68vw", size: 22, color: "#b91c1c", duration: 11, delay: -11, sway: 30, opacity: 0.5 },
  { left: "78vw", size: 15, color: "#c2410c", duration: 13, delay: -1, sway: 20, opacity: 0.45 },
  { left: "88vw", size: 17, color: "#a16207", duration: 10, delay: -7, sway: 24, opacity: 0.5 },
  { left: "94vw", size: 12, color: "#92400e", duration: 14, delay: -12, sway: 18, opacity: 0.4 },
];

// A gentle drift of autumn leaves falling down the viewport, fixed in place
// so they stay put while the page scrolls — a seasonal companion to the
// FloatingLogo watermark. Low opacity + pointer-events-none so they never
// compete with or block real content.
export default function FallingLeaves() {
  return (
    <>
      {LEAVES.map((leaf, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill={leaf.color}
          aria-hidden
          className="animate-leaf-fall pointer-events-none fixed top-0 z-0"
          style={{
            left: leaf.left,
            width: leaf.size,
            height: leaf.size,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
            ["--sway" as string]: `${leaf.sway}px`,
            ["--leaf-opacity" as string]: leaf.opacity,
          }}
        >
          <path d="M12 2C7 6 4 11 4 15a8 8 0 0 0 16 0c0-4-3-9-8-13z" />
          <path d="M12 4v18" stroke="rgba(0,0,0,0.25)" strokeWidth="1" fill="none" />
        </svg>
      ))}
    </>
  );
}
