# Button Rock Labs Website

## Overview
Company website for Button Rock Labs — a B2B SaaS development studio based in Lyons, CO.

## Architecture
- **Frontend-only** React + TypeScript SPA
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Fonts**: Plus Jakarta Sans (display), Inter (body)
- **Animations**: Framer Motion for scroll-driven animations and parallax
- **Build**: Vite

## Structure
```
client/
  index.html            - Entry HTML
  src/
    main.tsx            - React entry point
    App.tsx             - App shell
    index.css           - Tailwind config + design tokens
    pages/
      Home.tsx          - Main landing page
    assets/images/      - Generated hero/project images
```

## Design System
- **Primary**: Deep forest green (hsl 155 40% 25%) — trust, nature, tech
- **Secondary**: Warm sandstone tone
- **Background**: Warm off-white
- **Style**: Clean, professional with Colorado foothills vibe

## Key Sections
1. **Hero** — Parallax background, tagline "Software built from a human approach"
2. **Philosophy** — Company ethos, feature cards
3. **Products** — Sober Motivation (published), Send It (in development)
4. **Contact CTA** — Dark inverted footer with call to action
