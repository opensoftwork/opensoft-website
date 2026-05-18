# Executive Summary & Project Understanding

## Project Vision

OpenSoft Website v2 transforms a static single-page landing site into a **multi-page, CMS-powered portfolio platform** for Divyasimha HR Jois. The platform serves two distinct user groups with fundamentally different interaction models:

- **Admin (Divyasimha):** A content creation and management experience — low-friction CMS with Notion-like editing for documenting real engineering work across companies, projects, technologies, and journal entries.
- **Visitors (recruiters, clients, collaborators):** A consumption and evaluation experience — a polished, animated portfolio that communicates technical depth through narrative project documentation.

The product replaces hardcoded fictional content with dynamic, Convex-powered real data managed through an authenticated admin dashboard.

## Target Users

### Primary: Divyasimha (Admin / Content Creator)
- **Profile:** Solo full-stack engineer, 5+ years production experience
- **Tech savviness:** Expert — comfortable with code but wants a no-code content workflow
- **Device:** Desktop primary (laptop), occasional tablet
- **Context:** Creates content during or immediately after engineering work, while context is fresh
- **Core need:** Document real work without touching code or triggering deployments
- **Frustration with current state:** All content is hardcoded, fictional, and requires code changes to update

### Secondary: Visitors (Evaluators)
- **Profile:** Technical recruiters, hiring managers, potential clients, collaborators
- **Tech savviness:** Moderate to high
- **Device:** Mixed — mobile during commute, desktop during evaluation
- **Context:** Evaluating Divyasimha's capabilities, usually with limited time (2-5 min initial scan)
- **Core need:** Quickly assess technical depth and real-world problem-solving ability
- **Frustration with typical portfolios:** Generic bullet-point lists, template designs, no engineering narrative

## Key Design Challenges

1. **Dual-experience architecture** — Admin CMS and public portfolio are fundamentally different interfaces that must coexist seamlessly within the same Next.js app via route groups
2. **Content density vs. scannability** — Journal entries need depth for credibility but visitors scan quickly; the design must support both deep reading and rapid evaluation
3. **Solo maintenance burden** — Every UX decision must minimize ongoing friction; admin UI should be "good enough" not pixel-perfect, since only Divyasimha uses it
4. **Mobile-first public / desktop-first admin** — Public pages must shine on phone screens; admin dashboard optimized for keyboard-heavy desktop workflows

## Design Opportunities

1. **Journal timeline as differentiator** — Most portfolios are static lists. A chronological journal timeline per project tells the engineering story and creates unique SEO-indexable content
2. **Novel editor integration** — Notion-like editing experience (slash commands, block types) creates a premium CMS feel without custom editor development
3. **Real-time content preview** — Convex subscriptions enable instant content reflection on public pages, giving the admin a sense of "publishing power"
4. **GSAP animation as brand signal** — Scroll-triggered animations on public pages communicate technical sophistication without words
