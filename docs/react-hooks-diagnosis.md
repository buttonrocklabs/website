# React "Invalid hook call" Warning — Diagnosis

Read-only investigation. No source, config, or dependency files were modified.

## Observed Warning

Exact text (captured from the preview server's console while editing `src/pages/Privacy.tsx` and `src/pages/Terms.tsx`):

```
[error] Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.
```

The warning appears repeatedly (observed 12 copies in a single session). **No component stack trace was emitted** — the warning arrived as a bare message with no accompanying React component stack. This is itself notable: genuine Rules-of-Hooks violations from user code in dev mode typically include a component stack. Its absence is consistent with the warning originating from React's internal dispatcher checks during a hot-reload transition, not from a specific call site in our code.

**Dev-only, does not reproduce on fresh page load.** After a plain `location.reload()` in a clean session, re-rendering all three routes (`/`, `/privacy`, `/terms`) produced zero errors at level `error`. The warnings accumulate in the console during rapid Vite HMR cycles (confirmed by the interleaved `[vite] hot updated: /src/pages/Privacy.tsx` debug lines in the same log buffer) and persist until the tab is fully reloaded.

## Environment

| Item | Value |
|---|---|
| Node | v25.6.1 |
| React | 19.2.4 |
| React-DOM | 19.2.4 |
| @types/react | 19.2.14 |
| @types/react-dom | 19.2.3 |
| Vite | 6.3.5 |
| @vitejs/plugin-react | 4.5.2 |
| framer-motion | 12.38.0 |
| react-router-dom | 7.14.2 |
| Package layout | Single package (not a monorepo, no workspaces) |

## Evidence

### `npm ls react react-dom`

```
button-rock-labs@1.0.0
+-- framer-motion@12.38.0
| +-- react-dom@19.2.4 deduped
| `-- react@19.2.4 deduped
+-- react-dom@19.2.4
| `-- react@19.2.4 deduped
+-- react-router-dom@7.14.2
| +-- react-dom@19.2.4 deduped
| +-- react-router@7.14.2
| | +-- react-dom@19.2.4 deduped
| | `-- react@19.2.4 deduped
| `-- react@19.2.4 deduped
`-- react@19.2.4
```

Every `react` and `react-dom` reference is marked `deduped` against the single top-level install. No nested `react` directories in `node_modules`:

```
$ find node_modules -name "react" -type d -maxdepth 4
node_modules/@types/react
node_modules/react
```

Only one runtime `react` package exists. No second copy under `framer-motion/node_modules/react` or elsewhere.

### Version alignment (package.json)

```json
"react": "^19.2.4",
"react-dom": "^19.2.4",
"@types/react": "^19.2.14",
"@types/react-dom": "^19.2.3"
```

Major and minor versions match exactly.

### Vite config inspection (read-only)

`vite.config.ts` defines only the React and Tailwind plugins and a single `@` alias. No `resolve.alias` entries targeting React, no `optimizeDeps.exclude` affecting React, no custom `dedupe` (unnecessary here because there is already only one copy). Nothing in the build config would produce two React bundles.

### Hook-usage audit (grep of `src/**/*.tsx`)

```
src/pages/Terms.tsx:43:    useEffect(() => {
src/pages/Home.tsx:17:    const [scrolled, setScrolled] = useState(false);
src/pages/Home.tsx:18:    const [mobileOpen, setMobileOpen] = useState(false);
src/pages/Home.tsx:20:    useEffect(() => {
src/pages/Home.tsx:120:   const { scrollYProgress } = useScroll({
src/pages/Home.tsx:124:   const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
src/pages/Home.tsx:125:   const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
src/pages/Home.tsx:128:   const [headline] = useState(
```

Every hook call sits at the top level of a named function component (`NavBar`, `Hero`, `Terms`). No hooks inside conditionals, loops, early returns, event handlers, or regular functions. No custom hooks defined outside components.

## Diagnosis

**None of (a), (b), or (c) applies.** The evidence rules each out:

- **(a) mismatched React / React-DOM versions** — both are `19.2.4`, types align. Ruled out.
- **(b) Rules-of-Hooks violation** — every `useState` / `useEffect` / `useScroll` / `useTransform` call is top-level inside a function component. Ruled out.
- **(c) multiple copies of React** — `npm ls react` shows a single deduped copy; no nested `node_modules/react` directories; Vite config adds no aliasing that would split React. Ruled out.

The warning is a **dev-only HMR artifact from Vite's React Fast Refresh**, not a real bug. During rapid edits to a component file, Fast Refresh swaps the module in place while a component is still mid-render from the previous module instance. For a brief window, the dispatcher in the old module's closure sees `useState`/`useEffect` being called against a React instance whose dispatcher has already been reset for the next render. React's `resolveDispatcher` trips its "invalid hook call" check and logs the canonical warning, even though no rule was actually broken. Key signals supporting this read: (1) the warning has no component stack, (2) it only appears during sessions with heavy HMR churn, (3) it does not reproduce after a full page reload, (4) the production bundle built by `vite build` shows no issue and the live DOM renders correctly on every route, and (5) the warning message is the generic "one of three reasons" form rather than React's more specific violation messages (e.g., "called outside a function component" or "conditionally").

## Recommended Fix

**No code change is warranted.** The production build is unaffected, every route renders correctly in the live preview DOM, and the warning disappears after a clean reload. If the noise during development becomes distracting, options in order of preference:

1. **Accept it as HMR noise** and rely on a fresh reload to clear the console when it accumulates — zero risk, zero code change.
2. **Split large files that trigger frequent Fast Refresh churn** (`src/pages/Home.tsx` has five function components in one file). Extracting `NavBar`, `Hero`, `Philosophy`, `Services`, `Products`, `Support`, `ContactCTA` into their own files narrows each Fast Refresh boundary and reduces the chance that an edit re-renders mid-flight. Mechanical, low-risk.
3. **Add an explicit `resolve.dedupe: ["react", "react-dom"]` entry to `vite.config.ts`** — this is a belt-and-suspenders hedge against future accidental double-install (e.g., if a new dependency bundles its own React). Harmless but not currently needed.

Do not try to "fix" a Rules-of-Hooks violation that does not exist.

## Risk Assessment

- **Option 1 (do nothing):** No risk. Warning is cosmetic and dev-only.
- **Option 2 (split `Home.tsx`):** Low risk. Pure refactor. Regression surface is visual/import paths; must verify all routes still render and Framer Motion `viewport` triggers still fire. Requires re-running build and visual check on Home after the split.
- **Option 3 (add `resolve.dedupe`):** Very low risk in a single-package repo; essentially a no-op today since there's already one React. Could become load-bearing if a future dependency nests its own React — but that's a reason to keep it simple rather than preemptively add config.

If a real Rules-of-Hooks violation ever does land, it will manifest as a **component stack trace accompanying the warning** and will reproduce on a fresh reload. Watch for those two signals before treating this warning as a bug.
