# MGP Website — Claude Code Project

## Always-Active Skills

All 32 installed skills are always in scope for this project. Apply them proactively without waiting to be asked:

### Design Quality (pbakaus/impeccable)
- **adapt** — Responsive design, breakpoints, cross-device layouts
- **animate** — Animations, transitions, micro-interactions, motion
- **audit** — Accessibility, performance, technical quality scoring
- **bolder** — Make designs more visually impactful and distinctive
- **clarify** — Improve UX copy, error messages, labels, microcopy
- **colorize** — Add strategic color, fix monochromatic/dull sections
- **critique** — UX evaluation, visual hierarchy, cognitive load scoring
- **delight** — Joy, personality, memorable micro-interactions
- **distill** — Simplify, declutter, remove noise, focus designs
- **harden** — Production-ready: error states, empty states, edge cases, i18n
- **impeccable** — Full design quality meta-skill (shape → build → polish)
- **layout** — Spacing, visual rhythm, hierarchy, composition fixes
- **optimize** — Performance: loading, rendering, bundle size, animations
- **overdrive** — Technically ambitious UI: shaders, spring physics, 60fps
- **polish** — Final quality pass: alignment, spacing, consistency
- **quieter** — Tone down aggressive/overwhelming design
- **shape** — UX/UI planning and design brief before coding
- **typeset** — Typography: font choices, hierarchy, sizing, readability

### Frontend & React (anthropics + vercel-labs)
- **frontend-design** — Production-grade frontend, distinctive UI, no generic AI aesthetics
- **canvas-design** — Visual art: posters, PDFs, static design assets
- **brand-guidelines** — Apply brand colors, typography, design standards
- **theme-factory** — 10 pre-built themes + custom theme generation
- **webapp-testing** — Playwright browser testing, screenshots, debug UI
- **shadcn** — shadcn/ui component management, styling, composition
- **web-design-guidelines** — UI/UX audit against web best practices
- **vercel-react-best-practices** — Next.js/React performance patterns
- **vercel-composition-patterns** — Component architecture, compound components
- **vercel-react-view-transitions** — Page transitions, route animations, ViewTransition API
- **vercel-react-native-skills** — React Native / Expo mobile patterns

### Deployment & Docs
- **deploy-to-vercel** — Deploy to Vercel, preview deployments
- **vercel-cli-with-tokens** — Vercel CLI with token-based auth
- **pdf** — Read, create, merge, split, OCR, fill PDF forms

## Project Context

**Client:** Manufacturing Green Products (MGP) — pallet supplier, Fontana CA  
**Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS  
**Branch:** `claude/build-pallet-company-site-Jse9q`  
**Remote:** `mgpai-01/MGPwebsite`

### Design Tokens
- Primary Green: `#2a6b40` | Sage: `#6a9e78` | Hero BG: `#1c3325`
- Page BG: `#faf9f6` | Alt BG: `#f0ede6` | Footer BG: `#141f17`
- Fonts: Barlow Condensed (headings) + Barlow (body) via Google Fonts

### Site Sections
`Nav` → `Hero` → `Products` → `Industries` → `About` → `Sustainability` → `QuoteForm` → `Footer`

### Before Launch Checklist
- [ ] Replace `(555) 000-0000` with real phone number
- [ ] Replace `info@mgpallets.com` with real email
- [ ] Add real street address to schema in `app/layout.tsx`
- [ ] Swap photo placeholders with real images in `/public/`
- [ ] Wire quote form to Formspree/HubSpot in `components/QuoteForm.tsx`
- [ ] Replace stat placeholders (20+, 50K+, etc.) with verified numbers

## Workflow Rules
- Always commit and push after every change
- Run `npx next build` to verify before pushing
- Keep all components in `/components/`, app shell in `/app/`
- Use CSS classes in `globals.css` for hover effects (server components can't have JS event handlers)
- `Nav.tsx` and `QuoteForm.tsx` are `'use client'` — everything else is server components
