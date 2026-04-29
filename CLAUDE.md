# CLAUDE.md — Button Rock Labs Website

> **Read [Operating Protocol](#operating-protocol) before any work.**
> This site auto-deploys to production on every push to `main`. Skipping the
> protocol has caused incidents (stale local main, direct-to-main commits, doc
> drift). The protocol exists because the cost of getting it wrong is users
> seeing wrong.

## Operating Protocol

### Session Start — do this first every session

Local state drifts from origin between sessions. Before any work:

1. **Sync with origin.** `git fetch origin && git status -sb` — see if local `main` is behind.
2. **If behind, pull.** `git checkout main && git pull origin main`. Never start work on a stale local `main`.
3. **Read what's actually live.** The code on `origin/main` is the source of truth — not this doc, not your assumptions. If they disagree, the code wins.
4. **Confirm the routing model.** This site uses **BrowserRouter** (react-router-dom) with clean URLs. NOT hash routing. Anchors like `#about` only work *within* the Home page; route navigation uses `<Link to="/...">`.
5. **Check unmerged branches.** `git branch -a | grep -v main` — there may be open Claude branches with related in-progress work.
6. **Confirm the Cloudflare project name.** It's `website` (domains: buttonrocklabs.com, www.buttonrocklabs.com). Verify with `npx wrangler pages project list` if uncertain.

### Pull Request Workflow — required

**Never push directly to `main`.** Production deploys are triggered by merges into `main`. A local `pre-push` git hook at `.git/hooks/pre-push` enforces this — direct pushes to `main` are rejected with a recovery hint. Override only via `BRL_ALLOW_MAIN_PUSH=1 git push ...` in genuine emergencies.

The team flow:

1. **Feature branch.** `git checkout -b claude/<short-name>` from up-to-date `main`.
2. **Commit on the branch.** Stage files explicitly (`git add <path>`), not `git add -A` (avoids accidental .env / large binaries / IDE state).
3. **Push the branch.** `git push -u origin claude/<short-name>` — Cloudflare Pages auto-creates a preview deploy at `<hash>.website-bd7.pages.dev`.
4. **Open a PR.** `gh pr create --base main --title "..." --body "..."` — include the preview URL in the body so reviewers can click through.
5. **Greg reviews the preview, merges** via GitHub UI or `gh pr merge --squash --delete-branch`. Cloudflare Pages rebuilds from `main` and deploys to buttonrocklabs.com (~1–2 min).
6. **After merge: sync local.** `git checkout main && git pull origin main`. Delete the local feature branch (`git branch -D claude/<short-name>`).

**If you have local commits on main and `pre-push` blocks the push, recover them on a feature branch:**
```bash
git branch save-my-work main           # safety: keep the commits somewhere
git reset --hard origin/main           # match origin's main
git checkout -b claude/<short-name> save-my-work
git branch -D save-my-work             # once your work is safely on the feature branch
```

### Future hardening

The local pre-push hook + this doc + the discipline of the person at the keyboard are what stand between us and a bad direct-to-main push. For server-side enforcement (the bulletproof version), add GitHub branch protection on `main` (require PR + 1 approval, disallow force-push, disallow direct push). That's a Greg-level admin action — the protocol above is what we have until then.

---

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

**What:** Multi-page marketing website for buttonrocklabs.com — single-page hero on `/`, plus standalone routes for blog, privacy, and terms.
**Stack:** Vite + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion + react-router-dom v7
**Routing:** **BrowserRouter** (clean URLs, NOT hash routing). Routes live in `src/App.tsx`:
- `/` → `Home`
- `/privacy` → `Privacy`
- `/terms` → `Terms`
- `/blog` → `BlogIndex`
- `/blog/:slug` → `BlogPost`

SPA fallback is provided by `public/_redirects` (`/* /index.html 200`) so direct loads of `/blog/foo` don't 404 on Cloudflare Pages.

**Entry:** `src/main.tsx` → `src/App.tsx` → routed pages in `src/pages/`
**Styles:** `src/index.css` (Tailwind v4 imports, CSS custom properties via @theme, plus a hand-rolled `.prose-brl` class for blog post body typography)
**Fonts:** Google Fonts loaded in index.html (Inter — weights 400, 500, 600)
**Hosting:** Cloudflare Pages, auto-deployed on push to `main` of `github.com/buttonrocklabs/website`
**Build:** `npm run dev` (dev server, port 5000), `npm run build` (static output to /dist)
**Config:** `vite.config.ts` (React plugin, Tailwind plugin, path alias `@` → `src`)

### File Structure
```
BRL_web/
├── index.html                    — shell, schema.org Organization JSON-LD, favicon link, Google Fonts
├── public/
│   ├── _redirects                — Cloudflare Pages SPA catch-all (/* /index.html 200)
│   ├── favicon.svg               — canonical Button-Rock mark, copper bg
│   ├── brl-logo-final.html       — brand reference (D2 scheme)
│   └── logo-lab.html             — logo lab reference
├── src/
│   ├── main.tsx                  — React DOM entry
│   ├── App.tsx                   — BrowserRouter, route table
│   ├── index.css                 — Tailwind v4 + tokens + .prose-brl
│   ├── assets/
│   │   └── images/               — hero-bg, project-sober (latest mockup)
│   ├── components/
│   │   ├── BrandMark.tsx         — canonical SVG mark (bezel | plain | knockout variants)
│   │   └── LabSection.tsx        — 15-tool grid folded into the "What We Do" section
│   ├── content/
│   │   └── blog/
│   │       └── *.md              — blog posts (frontmatter + markdown body)
│   ├── lib/
│   │   └── posts.ts              — markdown loader (frontmatter parser + marked)
│   └── pages/
│       ├── Home.tsx              — main marketing page (NavBar inline, Hero, Philosophy, Services+Lab, Products, Support, ContactCTA)
│       ├── Privacy.tsx
│       ├── Terms.tsx
│       ├── BlogIndex.tsx         — /blog list + BlogNav + BlogFooter (exported, reused by BlogPost)
│       └── BlogPost.tsx          — /blog/:slug detail
├── dist/                         — build output (Cloudflare Pages output dir)
├── vite.config.ts                — DO NOT modify
├── tsconfig.json
├── package.json
└── CLAUDE.md
```

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

## Page Structure (`/` — Home)

| Section | id | Content |
|---|---|---|
| NavBar | — | Logo (BrandMark in copper chip) + nav (About / What We Do / Portfolio / Support / Blog / Contact). NavBar is **inline** in `Home.tsx`; it isn't extracted to a shared component. Blog page has its own minimal `BlogNav` (logo + ← Home). |
| Hero | — | Random headline from `HERO_HEADLINES`, eyebrow "Colorado Front Range", two CTAs. |
| Philosophy | `#about` | "Built by a founder who ships" + 3 feature cards (One of One / Human First / Built to Last). |
| Services + Lab | `#services` | "What We Do" prose intro + folded-in `<LabSection />` (15-tool grid in process order, sourced from `brl-lab/public/app.js`). |
| Products | `#portfolio` | Sober Motivation card (only product on the public site). |
| Support | `#support` | "Need help with your app or design?" — email button. |
| ContactCTA | `#contact` | "Ready to build something human?" + IP-narrative copy + Get in Touch button + founder block (LinkedIn icon, email, phone, address) + Privacy/Terms links + footer signature with `<BrandMark variant="knockout" />`. |

**Other pages:** `/privacy`, `/terms`, `/blog`, `/blog/:slug` — standalone routes, reuse `BlogNav` / `BlogFooter` from `BlogIndex.tsx`.

## Working Methodology

> See [Operating Protocol](#operating-protocol) at the top of this file for Session Start and Pull Request Workflow — both are required reading.

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
