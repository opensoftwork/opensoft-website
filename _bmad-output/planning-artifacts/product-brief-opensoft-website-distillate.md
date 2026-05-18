---
title: "Product Brief Distillate: opensoft-website"
type: llm-distillate
source: "product-brief-opensoft-website.md"
created: "2026-05-17"
purpose: "Token-efficient context for downstream PRD creation"
---

# Product Brief Distillate — OpenSoft Website v2

## Technical Decisions (Confirmed)

- **Framework:** Next.js 16 (App Router), React 19 — already in place
- **Database:** Convex (real-time, serverless) — no deployment exists yet, needs `npx convex dev` init
- **Auth:** Better Auth via `@convex-dev/better-auth` component — email/password only, admin role bootstrap to first registered user
- **Auth packages:** `convex@latest`, `@convex-dev/better-auth`, `better-auth@~1.6.9`
- **Rich text editor:** Novel (Notion-like, built on Tiptap, Tailwind-native) — for journal entries and project descriptions
- **Styling:** Tailwind CSS v4 + Shadcn/ui (new-york style) — already configured
- **Animations:** GSAP + ScrollTrigger — already in use, defer new animations to Phase 4
- **Fonts:** Inter (body) + Space Grotesk (display) — already configured
- **Infra:** Self-hosted via Dokploy + Cloudflare Tunnels, zero-ingress cost strategy

## Architecture Decisions (Confirmed)

- **Route groups:** `(public)`, `(auth)`, `(admin)` — different layouts per concern
- **Parallel routes:** `@sidebar` in admin layout for RBAC-aware rendering
- **RBAC approach:** Layout-level auth checks in server components, NOT middleware — per Better Auth best practices
- **Roles:** `admin` (Divyasimha only) and `visitor` (everyone else)
- **Content storage:** All in Convex — dynamic, no code redeployment for content changes
- **Image strategy:** External URLs initially (Cloudflare infra); Convex file storage or R2 in v1.1
- **API route handler:** `app/api/auth/[...all]/route.ts` proxies to Convex `.convex.site`
- **Provider:** `ConvexBetterAuthProvider` replaces `ConvexProvider` in root layout

## Data Model (5 Core Entities)

### Companies
- Fields: name, role, location, period, summary, logoUrl, order, isVisible
- Slug-based routing for public detail pages
- Linked to: Projects (1:many), Journal Entries (1:many)

### Projects
- Fields: companyId, title, slug, description, challenge, solution, outcome, imageUrl, tags[], order, isFeatured, isVisible
- Rich text fields (description, challenge, solution, outcome) stored as Novel/Tiptap JSON
- Linked to: Technologies (many:many via junction), Journal Entries (1:many)

### Technologies
- Fields: name, category, iconUrl, proficiency, isDailyDriver, order, isVisible
- Categories: frontend, backend, database, devops, mobile, tools
- Linked to: Projects (many:many via ProjectTechnologies junction table)

### Journal Entries
- Fields: companyId (optional), projectId (optional), title, content (Novel JSON), date, tags[], isPublished
- Rich text content stored as Tiptap JSON from Novel editor
- Can be linked to a company, a project, or both
- Each entry = unique public URL for SEO indexing

### Site Settings
- Singleton document pattern in Convex
- Fields: heroHeadline, heroSubtext, metaTitle, metaDescription, socialLinks (LinkedIn, GitHub, Twitter URLs), footerText

## Current Codebase State

- **Landing page:** 824-line monolithic `"use client"` component with hardcoded content
- **UI components:** Only `button.tsx` from Shadcn/ui installed
- **Modules:** `landing.tsx` + `terms-conditions/` page
- **Kavya references:** Lines 467-491 in landing.tsx — full bento card with stock photo, "The Builder" title
- **Fictional content:** Lines 640-736 — two fake case studies
- **"We" language:** Line 28 hero copy — needs → "I" for solo narrative
- **Student/academy mode:** Lines 34-41 and lines 739-783 — remove academy section
- **Pricing section:** Lines 553-631 — 3-tier pricing implies agency model, defer to future

## Real Content to Feature (from Notion Profile)

### Companies (chronological)
1. **Charring Cross Nursing Home** — Operations Coordinator (Dec 2019 – Feb 2021) — Python data reconciliation, COVID reporting
2. **Medicity** — Diagnostic Data Specialist (Mar 2021 – Dec 2021) — Python automation (2hr → 10s), LIMS processing
3. **Royal InfoTech** — Technical Instructor (Jan 2022 – Mar 2023) — CMS website (Next.js + Sanity), trained 50+ students
4. **At Par UI** — Software Engineer (Oct 2023 – Sep 2025) — Aurigraph (carbon-credit platform), Expo/EAS, mentored 5-10 engineers
5. **Life Design Group** — Full Stack Engineer & Tech Lead (Apr 2026 – Present) — PrimeEditz (B2B post-production SaaS), self-hosted infra

### Featured Projects (for landing page)
1. **PrimeEditz** — B2B post-production SaaS — Convex, Next.js, React
2. **Aurigraph** — Multi-role carbon-credit platform — React, Expo, EAS

## Solo Execution Plan Constraints

- **Cadence:** Deep work (Mon-Thu), Review/Docs/Deploy/Finances (Fri), Off (Sun)
- **Limits:** Max 1 active product + 1 foundation track at any time
- **Budget:** CTO salary ₹25,000/mo — only line item
- **Hiring:** Paused until revenue stable
- **Rule:** Build only what compounds
- **Burnout prevention:** CMS must be low-friction, no perfectionism on admin UI

## Rejected Ideas / Explicitly Deferred

- **Academy/internship section** — Removed per user request, reduces scope
- **Consulting lead-gen features** — Contact forms, booking, pricing tiers — future scope
- **Blog (separate from journals)** — Journals serve this purpose for now
- **Multi-user admin** — Only Divyasimha, no team accounts needed
- **OAuth providers** — Email/password only to start
- **Testimonials section** — No client testimonials to feature yet
- **Education section** — BCA in progress, SSLC — defer to future
- **Analytics dashboard** — Use external analytics (Plausible/Umami) if needed
- **RSS feed** — Nice v1.1 addition, trivial from journal entries
- **Parallel mobile builds** — Per Solo Execution Plan: no parallel builds
- **Marketplace features** — Per Solo Execution Plan: manual-first ops
- **Separate Divyasimha.dev portfolio** — Decided on Option A: single site, dual personality (OpenSoft brand + Divyasimha founder narrative)

## Implementation Sequencing (from architecture plan)

1. **Phase 1 (Foundation):** Convex init → Better Auth setup → schema → sign-in page
2. **Phase 2 (CMS Shell):** Admin layout → sidebar → Companies CRUD end-to-end first → then remaining entities
3. **Phase 3 (Public Site):** Landing redesign → company detail → project detail → tech grid
4. **Phase 4 (Polish):** GSAP animations → responsive → SEO → image optimization → error/loading states

## Open Questions

- **Professional headshot:** Does Divyasimha have one, or should we generate a placeholder?
- **Project screenshots:** Are there real screenshots of PrimeEditz/Aurigraph, or do we need placeholders?
- **Domain:** Will the site stay on the current domain, or is there a new one planned?
- **Convex project:** Which Convex team/project to use — existing or new?

## Editor Research Summary

| Editor | Decision | Rationale |
|--------|----------|-----------|
| **Novel** | ✅ Selected | Notion-like UX, Tailwind-native, built on Tiptap, minimal setup, designed for Next.js |
| BlockNote | ❌ Passed | Feature-rich but heavier; "abstraction on abstraction" complexity |
| Tiptap raw | ❌ Passed | Would require building all UI from scratch — wrong trade-off for solo CMS |
| Plate | ❌ Passed | Slate.js-based, niche community, less ecosystem support |

## Convex Functions Map (reference for PRD)

- Queries: `companies.list`, `companies.get`, `projects.list`, `projects.getByCompany`, `projects.get`, `technologies.list`, `journal.list`, `journal.getByProject`, `settings.get`, `auth.getCurrentUser`
- Mutations: CRUD operations (`create`, `update`, `remove`) for each entity + `settings.update`
- All mutations require admin auth check via `authComponent.getAuthUser(ctx)`
