# RRHL S23 — Rec Room Hockey League

Official website for the Rec Room Hockey League, Season 23. React + Vite +
TypeScript + Tailwind CSS v4, with every page driven by a centralized data
layer in `src/data/`.

## Stack

- React 19 + React Router 7 (client-side routing, 7 pages)
- Vite 8 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`, no config file needed — theme tokens
  live in `src/index.css`)
- Fonts: Barlow Condensed (headings) + Oswald (body), loaded from Google
  Fonts in `index.html`

## Running locally

```bash
npm install
npm run dev       # http://localhost:5173
```

Other scripts:

```bash
npm run build      # tsc -b && vite build -> dist/
npm run preview    # serve the production build locally
npm run lint        # oxlint
```

## Project structure

```
src/
  assets/logos/     team + league crest PNGs
  components/       Navbar, Footer, Hero, GameCard, StandingsTable,
                     TeamCard, TeamLogoTile, Tabs, SectionHeader,
                     PageHeader, PageTransition, TeamLogo
  data/              teams.ts, schedule.ts, players.ts, staff.ts, types.ts
  pages/             Home, Standings, Schedule, Teams, TeamDetail, Stats,
                     Staff, NotFound
  utils/             standings.ts (points/records calculator), format.ts
```

Routes: `/`, `/standings`, `/schedule`, `/teams`, `/teams/:teamId`,
`/stats`, `/staff`, plus a catch-all 404.

## How data flows (read this before editing anything)

Almost nothing on the site is hand-entered twice. `src/data/schedule.ts` is
the source of truth for game results; everything else — team records,
standings, points, differentials, a team's "recent games" — is **calculated
from it** by `src/utils/standings.ts`. If you edit a score in
`schedule.ts`, standings everywhere (home page preview, `/standings`,
`/teams`, individual team pages, `/stats`) update automatically. You never
edit a win/loss/points total directly.

Scoring: **win = 2 pts, OT/SO loss = 1 pt, loss = 0 pts** (see
`computeStandings` in `src/utils/standings.ts`).

Playoff cutoff (top 4 of 5 per conference) is the constant
`PLAYOFF_SPOTS_PER_CONFERENCE` in `src/utils/standings.ts` — change it there
to change the cutoff everywhere.

### Editing teams

`src/data/teams.ts`. Each team is:

```ts
{
  id: "boston-bruins",       // slug, used in URLs and as a foreign key
  name: "Boston Bruins",
  city: "Boston",
  nickname: "Bruins",
  abbr: "BOS",
  conference: "east" | "west",
  logo: bostonLogo,           // imported from src/assets/logos/
  color: "#ffb81c",           // used sparingly, only on that team's own card/page
}
```

Renaming a team is safe. **Changing a team's `id`** means also updating
every reference to that id in `schedule.ts`, `players.ts`, and any bookmarks
to `/teams/<id>` — the id is used as the join key everywhere, nothing looks
teams up by name.

### Adding / editing games (and scores)

`src/data/schedule.ts`. Each game:

```ts
{
  id: "g36",
  week: 8,
  date: "2026-08-25",        // YYYY-MM-DD
  time: "7:30 PM",           // display string, not used for sorting logic beyond the date
  homeTeamId: "boston-bruins",
  awayTeamId: "dallas-stars",
  homeScore: 4,               // omit until the game is final
  awayScore: 2,
  overtime: true,             // only set this on a FINAL game that ended in OT/SO
  status: "final",            // "upcoming" | "live" | "final" | "postponed"
}
```

- To report a score: set `status: "final"` and fill in `homeScore` /
  `awayScore`. If the game ended in overtime or a shootout, also set
  `overtime: true` so the loser is credited an OT loss (1 pt) instead of a
  regulation loss (0 pts).
- To mark a game live (for the pulsing "LIVE" badge), set
  `status: "live"` — you can optionally fill in a running score.
- To postpone a game, set `status: "postponed"`.
- The homepage's "Featured Matchup" section is controlled by the
  `featuredGameId` export at the bottom of `schedule.ts` — point it at any
  game id.

### Adding / editing players & stats

`src/data/players.ts` has two arrays, `skaters` and `goalies`. Points,
save %, and GAA are **calculated**, not stored — edit `goals` / `assists` /
`saves` / `goalsAgainst` and the derived numbers (via `skaterPoints`,
`goalieSavePct`, `goalieGaa`) update on the team page, `/stats`, and the
homepage league leaders automatically.

GAA here is approximated as goals-against per game played (this is a rec
league without tracked minutes-played, so it's not the full NHL 60-minute
formula — see the comment above `goalieGaa`).

### Editing staff

`src/data/staff.ts`. Each entry has a `category` that must be one of the
five values in `staffCategoryOrder` (also in that file) — that list also
controls the section order on `/staff`.

### Changing logos

Drop a new PNG/SVG into `src/assets/logos/`, then update the corresponding
`logo: ...` import in `src/data/teams.ts` (or `rrhlLogo` imports in
`Navbar.tsx` / `Footer.tsx` for the league mark). Square, transparent-
background logos work best against the dark UI.

## Known placeholders (documented, not silently faked)

- **No arena/rink photo was supplied** in the asset pack, so the homepage
  hero background is built from CSS/SVG (radial glow, a faint center-ice
  circle, vignette) rather than a photo. To use a real photo, add it to
  `src/assets/backgrounds/` and swap the background `<div>` in
  `src/components/Hero.tsx` for an `<img>` / `background-image`.
- **`rrhl-logo.png` is a large source file (~3 MB)**. It renders fine but
  is worth compressing/resizing (e.g. to a 512×512 PNG or SVG) before a
  production deploy, since it's requested on every page load via the
  navbar and footer.
- **All schedule results, player stats, and staff entries are placeholder
  data** meant to be replaced — see the editing sections above.

## Deploying

This is a static SPA (client-side routing via React Router), so the host
needs to fall back to `index.html` for unknown paths, or refreshing a
route like `/teams/boston-bruins` will 404.

- **Netlify**: `public/_redirects` is already included
  (`/*  /index.html  200`). Build command `npm run build`, publish
  directory `dist`.
- **Vercel**: `vercel.json` is already included with a catch-all rewrite.
  Build command `npm run build`, output directory `dist`.
- **GitHub Pages**: GitHub Pages doesn't support SPA rewrites natively —
  either build with a `404.html` that redirects to `index.html`, or use a
  hash router instead of `BrowserRouter` in `src/App.tsx`.
- **Any other static host**: just needs "serve `dist/`, rewrite unmatched
  paths to `index.html`."

## Ready for GitHub

```bash
git init
git add .
git commit -m "Initial commit: RRHL S23 site"
```

`node_modules/` and `dist/` are already covered by the default Vite
`.gitignore` created with this project.
