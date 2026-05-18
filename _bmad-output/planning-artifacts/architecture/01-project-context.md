# Project Context Analysis

## Requirements Overview

### Functional Requirements (30 FRs)

| Category | FRs | Architectural Impact |
|----------|-----|---------------------|
| Content Management (FR1–FR5) | 5 entity CRUD operations | Convex mutations, admin forms, Shadcn Table/Form |
| Entity Relationships (FR6–FR9) | Linking, referential integrity | Convex document references, junction table |
| Rich Text Editing (FR10–FR13) | Novel editor, Tiptap JSON storage/render | Client component, dynamic import, JSON field storage |
| Authentication (FR14–FR19) | Registration, login, RBAC | Better Auth, Convex HTTP endpoints, layout guards |
| Public Portfolio (FR20–FR24) | Dynamic pages from Convex data | SSR queries, slug routing, useQuery subscriptions |
| SEO (FR25–FR27) | Dynamic meta, semantic HTML | Next.js generateMetadata, slug-based routes |
| Site Configuration (FR28–FR30) | Admin-editable hero, social links, visibility | Singleton Convex document, toggle mutations |

### Non-Functional Requirements (14 NFRs)

| Category | NFRs | Architectural Implication |
|----------|------|--------------------------|
| Performance (NFR1–4) | Lighthouse ≥ 90, 2s admin load, 500ms Convex sync, 1.5s editor init | SSR for public, dynamic import for Novel, Convex real-time subscriptions |
| Security (NFR5–8) | HTTP-only cookies, server-side role validation, bcrypt, 7-day session | Better Auth config, Convex auth guards on every mutation |
| Accessibility (NFR9–11) | WCAG 2.1 AA, focus indicators, alt text | Shadcn/Radix primitives, semantic HTML, CMS alt text fields |
| Reliability (NFR12–14) | Graceful Convex downtime, 2s form feedback, dashboard recovery | Error boundaries, Sonner toasts, Convex dashboard as backup |

## Scale & Complexity Assessment

- **Primary domain:** Full-stack web application (portfolio/CMS)
- **Complexity level:** Low — single admin user, no multi-tenancy, no regulated data
- **Data volume:** < 100 documents across all entities (5 companies, ~15 projects, ~30 technologies, ~50 journal entries, 1 site settings)
- **Concurrent users:** 1 admin, ~10 simultaneous visitors max
- **Real-time requirements:** Convex subscriptions for instant content reflection (not collaborative editing)
- **Estimated architectural components:** 6 (auth layer, admin shell, 5 entity modules, public page layer, Convex backend, shared lib)

## Technical Constraints & Dependencies

### Existing Codebase (Brownfield)

| Aspect | Current State | Implication |
|--------|--------------|-------------|
| Framework | Next.js 16.0.7 (needs upgrade to 16.2.6) | Security patch required |
| React | 19.2.0 | Compatible, no change |
| Tailwind | v4 + `@tailwindcss/postcss` | Already configured |
| Shadcn/ui | Initialized (only `button.tsx`) | Install remaining components |
| GSAP | 3.13.0 installed | Defer animations to Phase 3 |
| Fonts | Inter + Space Grotesk | Already in `globals.css` |
| Content | 824-line monolithic `landing.tsx` | Must be decomposed |

### New Dependencies Required

| Package | Purpose | Version |
|---------|---------|---------|
| `convex` | Database + backend | ^1.39.1 |
| `@convex-dev/better-auth` | Auth adapter for Convex | latest |
| `better-auth` | Authentication library | ^1.6.11 |
| `novel` | Rich text editor | ^1.0.2 |
| `react-hook-form` | Form state management | latest |
| `@hookform/resolvers` | Zod resolver for RHF | latest |
| `zod` | Schema validation | latest |
| `sonner` | Toast notifications | latest |

### External Dependencies

- **Convex Cloud:** Database and serverless functions (free tier sufficient)
- **Cloudflare Tunnels:** Zero-trust ingress for self-hosted deployment
- **Dokploy:** Container orchestration (self-hosted)

## Cross-Cutting Concerns

1. **Authentication** — Affects admin routes, Convex mutations, layout rendering, navigation
2. **Convex Provider** — Root layout wraps entire app; affects all data access patterns
3. **Error Handling** — Toast notifications for mutations, error boundaries for pages
4. **Loading States** — Skeleton components for Convex subscription hydration
5. **SEO** — generateMetadata in every public page layout, requires Convex data access in server components
6. **Responsive Design** — Affects all components, admin sidebar collapse, public grid layouts
