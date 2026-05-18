---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
inputDocuments:
  - product-brief-opensoft-website.md
  - product-brief-opensoft-website-distillate.md
documentCounts:
  briefs: 2
  research: 0
  brainstorming: 0
  projectDocs: 0
  projectContext: 0
workflowType: 'prd'
classification:
  projectType: web_app
  domain: portfolio-cms
  complexity: low
  projectContext: brownfield
releaseMode: phased
---

# Product Requirements Document - opensoft-website

**Author:** Divyasimha
**Date:** 2026-05-17

## Executive Summary

OpenSoft Website v2 replaces a static single-page landing site with a **multi-page, CMS-powered portfolio platform** for Divyasimha HR Jois — the solo technical lead behind OpenSoft.

The current site presents a fictional two-person agency with stock photos and invented case studies. None of it reflects reality: a full-stack engineer with 5+ years of production experience across healthcare automation (Charring Cross, Medicity), carbon-credit platforms (Aurigraph/At Par UI), post-production SaaS (PrimeEditz/Life Design Group), and developer education (Royal InfoTech).

The new platform gives Divyasimha a **self-managed content system** to create, edit, and publish content about real work — companies, projects, technologies, and journal entries — through an authenticated admin CMS dashboard with a Notion-like editing experience powered by Novel. Visitors land on a polished, animated portfolio that pulls content dynamically from Convex. Authentication via Better Auth ensures only the admin manages content; the public site remains fast and open.

**Target users:** Divyasimha (admin/content creator) and visitors (potential clients, employers, collaborators evaluating capabilities).

**Tech stack:** Next.js 16 (App Router), Convex, Better Auth, Tailwind CSS v4, Shadcn/ui, Novel editor, GSAP.

### What Makes This Special

- **Journal-as-differentiation** — Most portfolios are bullet-point lists. This one lets visitors read the engineering narrative behind each project: decisions, trade-offs, lessons learned. Each journal entry is a unique, SEO-indexable URL.
- **Real-time Convex backend** — Content updates appear instantly without build steps. The same infrastructure Divyasimha uses daily for production SaaS.
- **Self-hosted, zero-cost infra** — Runs on existing Dokploy + Cloudflare Tunnels setup. No Vercel bills, no managed CMS fees.
- **Solo-optimized architecture** — Designed for a single operator with burnout-prevention constraints: low-friction CMS, minimal cognitive overhead, max 1 active product + 1 foundation track.

## Project Classification

- **Project Type:** Web Application (multi-page, SSR + client-side)
- **Domain:** Portfolio / CMS
- **Complexity:** Low (no regulated data, no multi-tenancy, single admin user)
- **Project Context:** Brownfield — existing Next.js 16 codebase with Tailwind v4, Shadcn/ui, and GSAP already configured. Transforming from static single-page to dynamic multi-page.

## Success Criteria

### User Success

- **Admin (Divyasimha):** Can add a new project to the portfolio in under 5 minutes, including writing a journal entry with rich text formatting, without touching code or triggering a deployment.
- **Visitor:** Can navigate from the landing page to a specific project's journal entry and understand the engineering challenge, solution, and outcome within 2 minutes of landing.

### Business Success

- All 5 real companies documented in CMS within 2 weeks of launch.
- All hardcoded content replaced with Convex-driven dynamic data (100% coverage).
- At least 1 journal entry per featured project at launch.
- Portfolio serves as a credible reference during consulting conversations and job applications.

### Technical Success

- Lighthouse performance score ≥ 90 on public pages.
- All CMS mutations require authenticated admin session — zero public write access.
- Content updates reflected without code redeployment.
- Each journal entry generates a unique, crawlable public URL with proper meta tags.

### Measurable Outcomes

| Metric | Target | Measurement |
|--------|--------|-------------|
| Content update without deployment | Yes | Admin can change hero text and see it live |
| Time to add new project | < 5 minutes | Timed admin workflow |
| Journal entries per project | ≥ 1 | Count at launch |
| Lighthouse score (public) | ≥ 90 | Lighthouse CI |
| Companies documented | 5 of 5 | CMS entity count |
| SEO indexing | Each journal = unique URL | Google Search Console |

## Product Scope

### MVP — Phase 1 (Foundation + CMS)

**Core capabilities for a functional portfolio CMS:**

- Convex project initialization with schema for 5 entities
- Better Auth integration (email/password, admin role)
- Admin dashboard with sidebar navigation
- Full CRUD for Companies, Projects, Technologies, Journal Entries, Site Settings
- Novel rich text editor for journal entries and project descriptions
- Sign-in/sign-out pages
- Admin layout with auth guards

### Phase 2 — Public Site Redesign

**Visitor-facing portfolio powered by CMS data:**

- Redesigned landing page pulling content from Convex (solo narrative, real projects)
- Company detail pages with role, period, and journal timeline
- Project detail pages with challenge → solution → outcome + tagged journals
- Technology showcase grid with categories and proficiency levels
- Dynamic meta tags and SEO optimization per page

### Phase 3 — Polish & Animations

**Production-ready quality:**

- GSAP scroll animations on public pages
- Responsive design audit (mobile-first)
- Image optimization and loading states
- Error boundaries and 404 pages
- Lighthouse performance optimization

### Growth Features (Post-MVP)

- Image upload/management via Convex file storage or Cloudflare R2
- RSS feed from journal entries
- OAuth providers (GitHub, Google)
- External analytics integration (Plausible/Umami)

### Vision (Future)

- Consulting lead-gen features (contact forms, booking, pricing)
- Blog section (separate from project journals)
- Multi-user admin for client sites
- Template packaging as open-source "developer portfolio CMS"

## User Journeys

### Journey 1: Divyasimha Documents a New Project (Admin — Happy Path)

**Divyasimha** just shipped a new feature for PrimeEditz and wants to document it while the context is fresh. He opens the OpenSoft admin dashboard on his browser, signs in with email/password.

The sidebar shows "Projects" — he clicks it, then "New Project." He fills in the title ("Event Session Folders"), selects the company ("Life Design Group"), tags technologies (React, Convex, Shadcn/ui), and writes a brief description. For the detailed journal entry, he clicks into the Novel editor — it feels like Notion. He writes about the challenge (managing nested assets across sessions), his solution (recursive folder component with drag-drop), and the outcome (50% reduction in asset lookup time). He adds code snippets inline using the slash command menu.

He hits "Publish." The project immediately appears on the public site. He checks the public URL — meta tags are set, the journal renders beautifully. Total time: 4 minutes. He closes the laptop and moves on.

**Capabilities revealed:** Authentication, project CRUD, Novel editor, company/technology linking, instant publish, meta tag generation.

### Journey 2: A Technical Recruiter Evaluates Divyasimha (Visitor — Happy Path)

**Priya**, a technical recruiter at a Bangalore startup, receives Divyasimha's resume with a link to opensoft.work. She opens it on her phone during a commute.

The landing page loads fast — a clean hero with "Building Software that Solves Real Problems" and a grid of real project cards with technology tags. She taps "PrimeEditz" and sees a project detail page: the challenge (B2B post-production workflow), the solution (Convex real-time sync, session-based asset management), and the outcome (50+ active editors onboarded).

She scrolls to the journal timeline — three entries showing the technical evolution. She reads the "Event Session Folders" entry and sees actual problem-solving depth. She's convinced this isn't a template portfolio. She copies the URL and sends it to the hiring manager.

**Capabilities revealed:** Mobile responsive public site, project detail pages, journal timeline, SEO meta tags, technology tags, fast load times.

### Journey 3: Divyasimha Updates Site Settings (Admin — Configuration)

**Divyasimha** wants to update his LinkedIn URL and change the hero headline for a consulting pitch.

He signs into the admin dashboard, navigates to "Site Settings" in the sidebar. He sees the current hero headline, subtitle, meta description, and social links. He edits the headline to "Full-Stack Engineer & Technical Consultant" and updates his LinkedIn URL. He saves.

He opens the public site — the hero reflects the new copy immediately. No deployment needed.

**Capabilities revealed:** Site settings CRUD, dynamic hero content, social links management, instant content reflection.

### Journey 4: Divyasimha Handles an Error (Admin — Edge Case)

**Divyasimha** is creating a new company entry and accidentally submits without filling the required "name" field.

The form shows an inline validation error: "Company name is required." He fills it in and submits again. The company is created. He then tries to delete a company that has linked projects — the system warns "This company has 3 linked projects. Remove project links first." He understands the constraint and reassigns the projects before deleting.

**Capabilities revealed:** Form validation, referential integrity enforcement, clear error messages, data relationship awareness.

### Journey Requirements Summary

| Journey | Key Capabilities |
|---------|-----------------|
| Admin — New Project | Auth, CRUD, Novel editor, entity linking, instant publish |
| Visitor — Project Exploration | Public pages, project detail, journal timeline, mobile responsive, SEO |
| Admin — Site Settings | Settings CRUD, dynamic content, social links |
| Admin — Error Handling | Validation, referential integrity, error messaging |

## Web Application Specific Requirements

### Project-Type Overview

Multi-page Next.js web application with server-side rendering for public pages (SEO) and client-side rendering for admin dashboard (interactivity). Route groups separate concerns: `(public)` for visitors, `(auth)` for login/register, `(admin)` for CMS dashboard.

### Technical Architecture Considerations

- **Rendering strategy:** SSR for public pages (SEO + performance), CSR for admin pages (interactivity)
- **Route groups:** `(public)`, `(auth)`, `(admin)` with different layouts per group
- **Parallel routes:** `@sidebar` in admin layout for RBAC-aware navigation rendering
- **Auth flow:** `app/api/auth/[...all]/route.ts` proxies to Convex HTTP endpoint. Layout-level auth guards in server components, not middleware.
- **Provider hierarchy:** `ConvexBetterAuthProvider` wraps entire app in root layout
- **Database:** Convex (real-time, serverless) — all content stored as Convex documents
- **Rich text storage:** Novel/Tiptap JSON stored as Convex document fields
- **Browser support:** Modern evergreen browsers (Chrome, Firefox, Safari, Edge — latest 2 versions)

### SEO Strategy

- Dynamic `<title>` and `<meta description>` per page from Convex data
- Unique, descriptive URLs for every company, project, and journal entry (slug-based routing)
- Proper heading hierarchy (single `<h1>` per page)
- Semantic HTML5 elements throughout
- Structured data (JSON-LD) for professional profile

### Responsive Design

- Mobile-first approach (320px baseline)
- Breakpoints: mobile (< 640px), tablet (640-1024px), desktop (> 1024px)
- Admin dashboard optimized for desktop but functional on tablet
- Public pages fully responsive across all breakpoints

### Performance Targets

- Lighthouse performance ≥ 90 on public pages
- First Contentful Paint < 1.5s on 3G connection
- Cumulative Layout Shift < 0.1
- Time to Interactive < 3s

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Problem-solving MVP — prove that a CMS-powered portfolio with journal entries is more compelling than a static site, and that the admin can maintain it without friction.

**Resource Requirements:** Solo developer (Divyasimha). No additional hires. Estimated 2-3 weeks for Phase 1, 1-2 weeks for Phase 2, 1 week for Phase 3.

### Phase 1: Foundation + CMS (Must-Have)

**Core user journey supported:** Admin creating and managing content.

**Must-have capabilities:**
- Convex schema deployment (Companies, Projects, Technologies, Journal Entries, Site Settings)
- Better Auth setup (email/password, admin role bootstrap)
- Admin dashboard layout with sidebar navigation
- CRUD interfaces for all 5 entities
- Novel editor integration for rich text fields
- Auth guards on admin routes

### Phase 2: Public Site Redesign

**Core user journey supported:** Visitor exploring the portfolio.

**Must-have capabilities:**
- Landing page pulling real data from Convex
- Company and project detail pages
- Journal entry rendering (Novel JSON → HTML)
- Technology grid
- SEO meta tags per page
- Slug-based routing

### Phase 3: Polish

**Core user journey supported:** Production-quality experience for all users.

**Must-have capabilities:**
- GSAP animations on public pages
- Responsive design audit
- Error/loading states
- Image optimization
- Lighthouse score optimization

### Risk Mitigation Strategy

**Technical risks:**
- *Convex + Better Auth integration complexity* — Mitigated by following `@convex-dev/better-auth` docs. Use email/password only (simplest provider). Validated in PrimeEditz already.
- *Novel editor hydration in Next.js* — Mitigated by dynamic import with `{ ssr: false }` and `"use client"` directive.
- *Rich text storage size* — Mitigated by storing journal entries as individual Convex documents (1MB limit per doc — far more than any journal entry).

**Market risks:** Low — this is a credibility tool, not a revenue product. Success is measured by portfolio completeness and content maintenance, not user acquisition.

**Resource risks:** Solo developer burnout — mitigated by phased delivery (ship CMS first, public site second), Solo Execution Plan cadence (deep work Mon-Thu, review Fri, off Sun), and scope discipline (5 entities only, no feature creep).

## Functional Requirements

### Content Management

- FR1: Admin can create, read, update, and delete Company entries with name, role, location, period, summary, logo URL, display order, and visibility toggle
- FR2: Admin can create, read, update, and delete Project entries with title, slug, description, challenge, solution, outcome, image URL, tags, display order, featured flag, and visibility toggle
- FR3: Admin can create, read, update, and delete Technology entries with name, category, icon URL, proficiency level, daily-driver flag, display order, and visibility toggle
- FR4: Admin can create, read, update, and delete Journal Entry records with title, rich text content, date, tags, and published status
- FR5: Admin can update Site Settings (singleton) including hero headline, hero subtitle, meta title, meta description, social links (LinkedIn, GitHub, Twitter URLs), and footer text

### Entity Relationships

- FR6: Admin can link a Project to exactly one Company
- FR7: Admin can link a Project to multiple Technologies (many-to-many)
- FR8: Admin can link a Journal Entry to a Company, a Project, or both
- FR9: System prevents deletion of a Company that has linked Projects without first unlinking them

### Rich Text Editing

- FR10: Admin can compose and edit rich text content using a Notion-like block editor (Novel) with support for headings, paragraphs, bold, italic, code blocks, lists, links, and images
- FR11: Admin can use slash commands in the editor to insert block types
- FR12: System stores rich text content as Tiptap JSON in Convex documents
- FR13: Public site renders stored Tiptap JSON as formatted HTML

### Authentication & Authorization

- FR14: Users can register with email and password
- FR15: Users can sign in and sign out
- FR16: System assigns the admin role to the first registered user
- FR17: Only authenticated users with the admin role can access CMS dashboard routes
- FR18: Unauthenticated users accessing admin routes are redirected to the sign-in page
- FR19: All CMS mutations validate admin role server-side before executing

### Public Portfolio Display

- FR20: Visitors can view a landing page with hero section, featured projects, and technology highlights pulled from Convex
- FR21: Visitors can view a Company detail page showing role, period, summary, and a timeline of linked journal entries
- FR22: Visitors can view a Project detail page showing challenge, solution, outcome, tagged technologies, and linked journal entries
- FR23: Visitors can view a Technology grid organized by category with proficiency indicators
- FR24: Visitors can navigate between landing page, company pages, project pages, and technology grid

### SEO & Discoverability

- FR25: Each public page generates dynamic meta title and description from Convex data
- FR26: Each journal entry has a unique, human-readable URL (slug-based)
- FR27: Public pages use semantic HTML with proper heading hierarchy

### Site Configuration

- FR28: Admin can update the landing page hero copy (headline + subtitle) without code deployment
- FR29: Admin can update social media links (LinkedIn, GitHub, Twitter) from the CMS
- FR30: Admin can control the visibility of individual companies, projects, and technologies via isVisible toggle

## Non-Functional Requirements

### Performance

- NFR1: Public pages achieve Lighthouse performance score ≥ 90 as measured by Lighthouse CI
- NFR2: Admin dashboard pages load initial content within 2 seconds on broadband connection
- NFR3: Convex real-time subscriptions reflect data changes within 500ms of mutation
- NFR4: Novel editor initializes and is interactive within 1.5 seconds of page load

### Security

- NFR5: All authentication tokens are stored as HTTP-only cookies, not in localStorage
- NFR6: All CMS mutation endpoints validate admin role server-side; client-side role checks are supplementary only
- NFR7: Password hashing uses bcrypt with minimum 10 salt rounds (handled by Better Auth)
- NFR8: Admin session expires after 7 days of inactivity

### Accessibility

- NFR9: Public pages conform to WCAG 2.1 Level AA for color contrast, keyboard navigation, and screen reader compatibility
- NFR10: All interactive elements have visible focus indicators
- NFR11: All images include descriptive alt text

### Reliability

- NFR12: The public site remains functional (serving cached/static content) if Convex experiences downtime
- NFR13: Form submissions provide clear success or error feedback within 2 seconds
- NFR14: Admin can recover from accidental deletion via Convex dashboard (no in-app undo required for MVP)
