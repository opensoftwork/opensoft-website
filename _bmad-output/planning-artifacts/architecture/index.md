---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - product-brief-opensoft-website.md
  - product-brief-opensoft-website-distillate.md
  - prd.md
  - ux-design-specification/ (12 files)
workflowType: 'architecture'
project_name: 'opensoft-website'
user_name: 'Divyasimha'
date: '2026-05-17'
lastStep: 8
status: 'complete'
completedAt: '2026-05-17'
---

# Architecture Decision Document — OpenSoft Website v2

_Complete architecture specification for a CMS-powered portfolio platform._

## Table of Contents

| # | Section | File | Description |
|---|---------|------|-------------|
| 1 | [Project Context Analysis](./01-project-context.md) | `01-project-context.md` | Requirements overview, scale assessment, constraints |
| 2 | [Starter & Technology Stack](./02-technology-stack.md) | `02-technology-stack.md` | Verified versions, starter evaluation, stack decisions |
| 3 | [Core Architectural Decisions](./03-core-decisions.md) | `03-core-decisions.md` | Data, auth, API, frontend, and infrastructure decisions |
| 4 | [Data Model & Schema](./04-data-model.md) | `04-data-model.md` | Convex schema, entity definitions, relationships, indexes |
| 5 | [Implementation Patterns](./05-implementation-patterns.md) | `05-implementation-patterns.md` | Naming, structure, format, and process consistency rules |
| 6 | [Project Structure](./06-project-structure.md) | `06-project-structure.md` | Complete directory tree, boundaries, FR mapping |
| 7 | [Validation & Readiness](./07-validation.md) | `07-validation.md` | Coherence check, coverage, checklist, handoff guidance |

## Quick Reference

- **Stack:** Next.js 16.2.6 · Convex 1.39.1 · Better Auth 1.6.11 · Novel 1.0.2 · Tailwind v4 · Shadcn/ui
- **Data:** 5 core entities + 1 junction table in Convex
- **Auth:** Better Auth email/password, admin role bootstrap, layout-level guards
- **Rendering:** SSR public pages (SEO), CSR admin pages (interactivity)
- **Hosting:** Self-hosted via Dokploy + Cloudflare Tunnels
