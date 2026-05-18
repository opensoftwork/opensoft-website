---
title: "Product Brief: OpenSoft Website v2"
status: "complete"
created: "2026-05-17"
updated: "2026-05-17"
inputs:
  - "Notion: Divyasimha HR Jois profile"
  - "Notion: Solo Execution Plan (Divyasimha as Core)"
  - "Codebase: components/modules/landing.tsx"
  - "Architecture plan (conversation artifact)"
---

# Product Brief: OpenSoft Website v2

## Executive Summary

OpenSoft Website v2 transforms a static, single-page landing site into a **dynamic, CMS-powered portfolio platform** for Divyasimha HR Jois — the solo technical lead behind OpenSoft. The current site presents a fictional two-person agency with stock photos and invented case studies. It doesn't reflect reality: a seasoned full-stack engineer with 5+ years of production experience across healthcare automation, carbon-credit platforms, post-production SaaS, and developer education.

The new platform solves this by giving Divyasimha a **self-managed content system** where he can create, edit, and publish content about his real work — companies he's contributed to, projects he's shipped, technologies he commands — all through a premium admin dashboard with a Notion-like editing experience. Visitors land on a polished, GSAP-animated portfolio that pulls content dynamically from Convex, with journal-like deep-dives available on each project. Authentication via Better Auth ensures only the admin can manage content, while the public site remains fast and open.

This is not a SaaS product or a consulting lead-gen tool (yet). It's a **credibility engine** — a living portfolio that compounds in value with every project documented, every journal entry written, and every technology mastered.

## The Problem

Divyasimha's current OpenSoft website is a liability, not an asset:

- **Fictional content** — Two fabricated case studies (fintech dashboard, e-commerce mobile app) with Unsplash stock photos. Anyone investigating finds no real evidence of this work.
- **Ghost team member** — "Kavya" is presented as co-builder, but this person is no longer involved. The site misrepresents the company's actual structure.
- **Hardcoded and static** — Every content change requires a code deployment. There's no way to add a new project or update a technology without editing TSX files.
- **No depth** — Visitors see surface-level bento cards but can't explore what was actually built, what challenges were solved, or what technologies were used.
- **Wasted real experience** — 5 companies, 7+ real projects, infrastructure innovations (zero-ingress self-hosting), and mentorship of 10+ engineers — none of it is visible.

The cost of the status quo: a portfolio that actively undermines professional credibility instead of building it.

## The Solution

A multi-page Next.js application backed by Convex (real-time database) and Better Auth (authentication), with a clean separation between what visitors see and what the admin manages.

**For visitors (public site):**
- A redesigned landing page showcasing the solo-founder narrative with real projects
- Company detail pages showing role, period, and a timeline of journal entries
- Project detail pages with rich content: challenge → solution → outcome, plus tagged journal entries
- A technology grid showing the stack with proficiency levels and categorization

**For the admin (CMS dashboard):**
- Authenticated dashboard with sidebar navigation behind RBAC-gated parallel routes
- Full CRUD for five core entities: Companies, Projects, Technologies, Journal Entries, and Site Settings
- A **Novel-based rich text editor** (Notion-like, Tailwind-native) for journal entries and project descriptions — best-in-class editing experience without the overhead of building custom UI
- Dynamic content management: update hero copy, meta descriptions, and social links from the CMS — no redeployments for content changes

## What Makes This Different

This is not a generic portfolio template or a WordPress site. It's a **developer-built CMS purpose-designed for a developer's portfolio**:

1. **Real-time Convex backend** — Content updates appear instantly, no build step required. The same infrastructure Divyasimha uses daily for production SaaS (PrimeEditz).
2. **Self-hosted, zero-cost infrastructure** — Runs on existing Dokploy + Cloudflare Tunnels setup. No Vercel bills, no managed database costs, no monthly SaaS fees for a CMS.
3. **Solo-optimized architecture** — Max 1 active product + 1 foundation track. The CMS is designed to be maintained by one person with minimal cognitive overhead.
4. **Journal-as-differentiation** — Most portfolios are bullet points. This one lets visitors read the engineering narrative behind each project — the decisions, trade-offs, and lessons learned.

## Who This Serves

**Primary: Divyasimha HR Jois (admin)**
- Needs to manage portfolio content without touching code
- Wants a premium editing experience (Notion-like) for writing project journals
- Operates under solo burnout-prevention constraints: the CMS must be low-friction

**Secondary: Visitors (potential clients, employers, collaborators)**
- Technical decision-makers evaluating Divyasimha's capabilities
- Want to see real projects with depth, not marketing fluff
- May eventually become consulting leads (future scope)

## Success Criteria

| Metric | Target |
|--------|--------|
| All 5 real companies documented in CMS | Within 2 weeks of launch |
| All hardcoded content replaced with Convex-driven data | 100% |
| Journal entries per project | ≥ 1 per featured project |
| Content update without code deployment | Yes — hero copy, projects, technologies all CMS-managed |
| Lighthouse performance score | ≥ 90 |
| Time to add a new project (admin flow) | < 5 minutes |
| Journal entries indexed by search engines | Each entry = unique URL with meta tags |

## Scope

### In — Version 1

> **Implementation sequence:** Foundation (Convex + Auth) → one entity end-to-end (Companies) → remaining entities → public site redesign → polish. Never build all 5 CRUD surfaces in parallel.

- Multi-page Next.js site with route groups: `(public)`, `(auth)`, `(admin)`
- Convex schema: Companies, Projects, Technologies, Journal Entries, Site Settings
- Better Auth + `@convex-dev/better-auth` with email/password, admin role
- Parallel routes for RBAC (`@sidebar` in admin layout)
- Novel rich text editor for journal entries and project descriptions
- Redesigned landing page (solo narrative, real projects, Kavya removed)
- Company and project detail pages with journal timeline
- Technology showcase grid
- GSAP animations on public pages
- Responsive design (mobile-first)

### Out — Version 1

- Consulting lead-gen features (contact forms, booking, pricing tiers)
- Academy/internship section
- Blog (separate from project journals)
- Analytics dashboard
- Multi-user admin (only Divyasimha)
- OAuth providers (email/password only to start)
- Testimonials section
- Education section
- Image upload/management (use external URLs from existing Cloudflare infra initially; Convex file storage or R2 in v1.1)

## Vision

If this works — a portfolio that's genuinely useful, easy to maintain, and compounds in value — it becomes the **template for OpenSoft's consulting practice**. The CMS architecture generalizes: the same Convex + Better Auth + Novel stack can power client portfolio sites, internal tools, and content platforms. The journal system evolves into a technical blog. The admin dashboard expands to manage consulting proposals, client projects, and invoices.

But that's all future scope. Right now, the goal is simple: **replace a fictional portfolio with a real one, and make it effortless to keep current.**
