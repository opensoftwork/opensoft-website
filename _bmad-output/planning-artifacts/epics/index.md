---
stepsCompleted:
  - step-01-validate-prerequisites
inputDocuments:
  - prd.md
  - architecture/ (8 files)
  - ux-design-specification/ (13 files)
---

# opensoft-website — Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for opensoft-website, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

- FR1: Admin CRUD for Company entries (name, role, location, period, summary, logoUrl, order, visibility)
- FR2: Admin CRUD for Project entries (title, slug, description, challenge, solution, outcome, imageUrl, tags, order, featured, visibility)
- FR3: Admin CRUD for Technology entries (name, category, iconUrl, proficiency, dailyDriver, order, visibility)
- FR4: Admin CRUD for Journal Entry records (title, rich text content, date, tags, published status)
- FR5: Admin update for Site Settings singleton (hero headline/subtitle, meta, social links, footer)
- FR6: Link a Project to exactly one Company
- FR7: Link a Project to multiple Technologies (many-to-many)
- FR8: Link a Journal Entry to a Company, a Project, or both
- FR9: Prevent deletion of Company with linked Projects
- FR10: Compose/edit rich text via Novel block editor (headings, bold, italic, code, lists, links, images)
- FR11: Slash commands in editor to insert block types
- FR12: Store rich text as Tiptap JSON in Convex
- FR13: Public site renders Tiptap JSON as formatted HTML
- FR14: Register with email and password
- FR15: Sign in and sign out
- FR16: First registered user gets admin role
- FR17: Only admin role can access CMS routes
- FR18: Unauthenticated users redirected to sign-in
- FR19: All mutations validate admin role server-side
- FR20: Landing page with hero, featured projects, tech highlights from Convex
- FR21: Company detail page (role, period, summary, journal timeline)
- FR22: Project detail page (challenge, solution, outcome, tech tags, journals)
- FR23: Technology grid organized by category with proficiency
- FR24: Navigation between landing, companies, projects, tech grid
- FR25: Dynamic meta title/description from Convex data
- FR26: Unique human-readable URL per journal entry (slug)
- FR27: Semantic HTML with proper heading hierarchy
- FR28: Update hero copy without code deployment
- FR29: Update social media links from CMS
- FR30: Control visibility via isVisible toggle

### Non-Functional Requirements

- NFR1: Lighthouse performance ≥ 90 on public pages
- NFR2: Admin dashboard loads within 2s on broadband
- NFR3: Convex real-time sync within 500ms
- NFR4: Novel editor interactive within 1.5s
- NFR5: Auth tokens as HTTP-only cookies
- NFR6: Server-side admin role validation on all mutations
- NFR7: bcrypt with min 10 salt rounds
- NFR8: Session expires after 7 days inactivity
- NFR9: WCAG 2.1 AA for contrast, keyboard nav, screen readers
- NFR10: Visible focus indicators on all interactive elements
- NFR11: All images include descriptive alt text
- NFR12: Public site functional during Convex downtime
- NFR13: Form feedback within 2 seconds
- NFR14: Recovery via Convex dashboard

### Additional Requirements

- AR1: Initialize Convex project (npx convex dev) and deploy schema
- AR2: Install and configure Better Auth with Convex adapter (@convex-dev/better-auth)
- AR3: Create auth proxy route handler (app/api/auth/[...all]/route.ts)
- AR4: Set up ConvexBetterAuthProvider in root layout
- AR5: Implement layout-level auth guards in (admin)/layout.tsx
- AR6: Configure Next.js remotePatterns for external image URLs
- AR7: Set up environment variables (CONVEX_DEPLOYMENT, BETTER_AUTH_SECRET, etc.)
- AR8: Upgrade Next.js from 16.0.7 to 16.2.6 (security patch)

### UX Design Requirements

- UX-DR1: Implement dark theme design tokens in globals.css (color palette, spacing scale, typography tokens)
- UX-DR2: Install and configure Shadcn sidebar component for admin navigation shell
- UX-DR3: Build admin list view component (table with sort, action dropdown per row, "New" button)
- UX-DR4: Build entity form component (RHF + Zod + Shadcn Form, 2-column grid, Novel editor area, toggle row)
- UX-DR5: Create Novel editor wrapper component (dynamic import, ssr: false, editable + read-only modes)
- UX-DR6: Build project card component (bento-style, hover glow, tech badges, featured indicator)
- UX-DR7: Build journal timeline component (vertical timeline, date markers, entry excerpts)
- UX-DR8: Implement toast feedback pattern (Sonner, success/error/info with consistent messaging)
- UX-DR9: Implement skeleton loading states for Convex subscription hydration
- UX-DR10: Build public navigation bar (glassmorphism, floating, hide on scroll-down, hamburger mobile)
- UX-DR11: Implement keyboard shortcuts for admin (Cmd+S save, Cmd+N new, Escape close)
- UX-DR12: Implement prefers-reduced-motion respect for all GSAP animations
- UX-DR13: Implement responsive admin sidebar (collapse to icons on tablet)
