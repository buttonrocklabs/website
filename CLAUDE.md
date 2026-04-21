# CLAUDE.md — Button Rock Labs Website

## Company Identity

Button Rock Labs (BRL) is a community app development studio based in Lyons, Colorado. Named after the Button Rock Reservoir/Dam trail — a local Lyons landmark. Founded by Greg Falconer, a fintech CEO turned app builder.

**Mission:** We build apps that bring people together.

**What BRL does:** Designs, builds, and ships native mobile platforms that turn shared passions into lasting communities. BRL owns a reusable community app engine — authentication, real-time chat, meetings, challenges, gamification, AI journaling, push notifications, coaching, analytics — that can be deployed across verticals.

**Products:**
- **Sober Motivation** (live, App Store) — Social recovery platform for growth beyond sobriety. React/TypeScript frontend, Node.js/Express backend, PostgreSQL, Capacitor for iOS. 250K+ podcast audience via co-founder Brad. sobermotivation.net
- **Rock climbing community app** (planned) — Greg's son's concept. Second deployment of the BRL platform engine.
- **Future verticals** — Any passion community that needs organized channels, events, progress tracking, and peer connection.

**Positioning:** BRL is not a dev agency. It is a product studio that builds and operates its own community platforms. The website serves two audiences: potential clients/partners who want a community app built, and general credibility (portfolio + about).

## This Project — BRL Marketing Website

**What:** Single-page static marketing website for buttonrocklabs.com
**Stack:** Vite + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion
**Entry:** src/main.tsx → src/App.tsx → src/pages/Home.tsx (single page)
**Styles:** src/index.css (Tailwind v4 imports, CSS custom properties via @theme)
**Fonts:** Google Fonts loaded in index.html (Inter — weights 400, 500, 600)
**Hosting:** Cloudflare Pages, auto-deployed on push to `main` of `github.com/buttonrocklabs/website`
**Build:** `npm run dev` (dev server, port 5000), `npm run build` (static output to /dist)
**Config:** vite.config.ts (React plugin, Tailwind plugin, path aliases)

### File Structure
/workspace
├── index.html           — shell with <div id="root">, Google Fonts link
├── src/
│   ├── main.tsx          — React DOM entry
│   ├── App.tsx            — wraps <Home />
│   ├── pages/Home.tsx     — entire site (NavBar, Hero, sections, footer)
│   ├── index.css          — Tailwind v4 + CSS custom properties
│   └── lib/utils.ts       — if present
├── dist/                  — build output (Cloudflare Pages output dir)
├── public/                 — static assets copied as-is (includes _redirects SPA fallback)
├── vite.config.ts         — do not modify
├── tailwind.config.ts     — if present, do not modify without instruction
├── tsconfig.json
├── package.json
└── CLAUDE.md

## Brand Design System

### Color Palette — Stone / Slate / Copper

Dark mode (default):
- Background: #1A1B1E (deep rock)
- Surface: #2B2D31 (slate)
- Surface raised: #35373C
- Text: #F7F5F0 (warm white)
- Text muted: #8B8680 (stone)
- Border: #4A4D52 (granite)
- Primary/accent: #B87333 (copper)
- Primary hover: #D4956A (sunset clay)
- Accent text: #C9B99A (sandstone)

Light mode:
- Background: #F7F5F0 (warm white)
- Surface: #FFFFFF
- Surface raised: #E8E4DC (fog)
- Text: #2B2D31 (slate)
- Text muted: #6B6862 (weathered)
- Border: #D4CFC6 (river wash)
- Primary/accent: #B87333 (copper)
- Primary hover: #9A5F2A
- Accent text: #4A4D52 (granite)

### Extended Palette
- Deep rock: #1A1B1E
- Weathered: #6B6862
- River wash: #D4CFC6
- Fog: #E8E4DC
- Lichen: #7A8B6F (subtle green, use sparingly)
- Sunset clay: #D4956A

### Typography
- Font: Inter (Google Fonts, weights 400, 500, 600)
- Headings: Inter 600, letter-spacing -0.02em
- Body: Inter 400, line-height 1.6
- No serif fonts, no monospace fonts
- Hero h1: clamp(2rem, 5vw, 3.5rem)

### Theme System
- Dark mode is default
- data-theme attribute on <html> tag ("dark" or "light")
- Toggle persists to localStorage
- All colors via CSS custom properties under [data-theme="dark"] and [data-theme="light"]
- Smooth transition: background-color 0.3s ease, color 0.3s ease

### UI Components
- Primary button: bg copper, text #1A1B1E, padding 10px 24px, border-radius 6px
- Secondary button: border 1px solid --color-border, text --color-accent, transparent bg
- Eyebrow text: --color-primary, uppercase, letter-spacing 0.1em, 13px
- Section alternation: --color-bg and --color-surface backgrounds
- No gradients, no shadows, no glow effects. Flat and clean.

## Page Structure
Header — logo + nav (About, Services, Portfolio, Contact) + theme toggle
Hero — eyebrow "LYONS, COLORADO" + h1 + subtitle + 2 CTAs
About — company story, founder, mission
Services — what we build, how we work
Portfolio — Sober Motivation showcase (primary), future projects
Contact — get in touch
Footer — copyright + location

## Working Methodology

### Prompt Structure
All prompts follow: GOAL → USER STORY → ACCEPTANCE CRITERIA → CONSTRAINTS → OUTPUT FORMAT → STOP RULE

### Rules
- Edit files in place. Do NOT delete and recreate.
- Do NOT modify vite.config.ts under any circumstances.
- Do NOT add npm packages without explicit instruction.
- Do NOT add images or external assets beyond Google Fonts unless instructed.
- Colors must use CSS custom properties consumed through Tailwind's @theme. No hardcoded hex or HSL in components.
- Theme switching uses data-theme attribute on <html>, not .dark class.
- Framer Motion is approved for animations. Keep usage tasteful and performant.
- Tailwind utility classes preferred over inline styles.
- Mobile responsive required. Use clamp() for fluid type.
- `public/_redirects` must contain the SPA fallback line `/* /index.html 200` so React Router client-side routes (`/privacy`, `/terms`) don't 404 on direct load.

### Deploy Process (Cloudflare Pages + GitHub)
- **Repo:** `github.com/buttonrocklabs/website`
- **Hosting:** Cloudflare Pages project connected to the GitHub repo
- **Production branch:** `main` — pushes to `main` auto-build and auto-deploy to the live site
- **Preview branches:** any non-`main` branch gets a Cloudflare Pages preview URL
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** set via Cloudflare Pages env (NODE_VERSION ≥ 20 recommended for Vite 6)

Standard flow:
1. Work on a feature branch (e.g., `claude/<name>`).
2. Commit + push branch. Cloudflare Pages auto-generates a preview URL.
3. Open PR against `main`; review the preview URL.
4. Merge to `main`. Cloudflare Pages rebuilds and deploys to the production domain.

Local verification before pushing: `npm run build` must succeed; the `/dist` output is what Cloudflare serves.

### What NOT to Do
- Do not add a CMS, database, or backend
- Do not add build steps beyond what Vite provides
- Do not add analytics, tracking, or third-party scripts without instruction
- Do not remove Framer Motion or refactor animations without explicit instruction
- Do not replace Tailwind with vanilla CSS
- Do not hardcode color values in JSX — always use CSS variables or Tailwind theme tokens
