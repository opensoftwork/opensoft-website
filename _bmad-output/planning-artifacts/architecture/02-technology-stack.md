# Starter & Technology Stack

## Primary Technology Domain

**Full-stack web application** — Next.js App Router with Convex backend. Brownfield project with existing scaffolding.

## Starter Template Evaluation

### Evaluated Starters

| Starter | Decision | Rationale |
|---------|----------|-----------|
| `create-next-app` | ❌ Skip | Project already initialized with Next.js 16 |
| `npx convex dev` | ✅ Use | Required to initialize Convex project and generate `_generated/` types |
| T3 Stack | ❌ Skip | Includes tRPC + Prisma — conflicts with Convex |
| Shadcn init | ✅ Already done | `components.json` exists, `button.tsx` installed |

### Selected Approach: Incremental Integration

Since this is a brownfield project with an existing Next.js 16 codebase, we don't use a monolithic starter. Instead we incrementally add:

1. **Convex** — `npx convex dev` to initialize the `convex/` folder
2. **Better Auth** — Manual integration following `@convex-dev/better-auth` docs
3. **Novel** — `pnpm add novel` + dynamic import wrapper
4. **Shadcn components** — `npx shadcn@latest add [component]` as needed

**Initialization Command (Convex):**

```bash
npx convex dev
```

This creates the `convex/` directory with `_generated/` types and connects to a Convex Cloud project.

## Verified Technology Stack

| Technology | Version | Verified | Purpose |
|-----------|---------|----------|---------|
| Next.js | 16.2.6 | ✅ 2026-05-17 | Framework, App Router, SSR |
| React | 19.2.0 | ✅ Current | UI library |
| TypeScript | ^5 | ✅ Current | Type safety |
| Convex | 1.39.1 | ✅ 2026-05-17 | Database, serverless functions, real-time |
| Better Auth | 1.6.11 | ✅ 2026-05-17 | Authentication (email/password) |
| @convex-dev/better-auth | latest | ✅ | Convex adapter for Better Auth |
| Novel | 1.0.2 | ✅ 2026-05-17 | Rich text editor (Notion-like) |
| Tailwind CSS | v4 | ✅ Current | Utility-first CSS |
| Shadcn/ui | latest | ✅ Current | Component library (Radix primitives) |
| GSAP | 3.13.0 | ✅ Current | Scroll animations (Phase 3) |
| Zod | latest | ✅ | Schema validation |
| React Hook Form | latest | ✅ | Form state management |
| Sonner | latest | ✅ | Toast notifications |
| Lucide React | 0.555.0 | ✅ Current | Icon library |

## Architectural Decisions Provided by Stack

### Language & Runtime
- TypeScript strict mode throughout
- ES2022+ target
- Node.js runtime for Next.js server components
- Convex JavaScript runtime for serverless functions

### Styling Solution
- Tailwind CSS v4 with `@tailwindcss/postcss` plugin
- CSS custom properties in `globals.css` for design tokens
- `cn()` utility from Shadcn for conditional class merging
- No CSS-in-JS, no CSS modules

### Build Tooling
- Next.js built-in (Turbopack in dev, Webpack for production)
- pnpm as package manager (existing `pnpm-lock.yaml`)
- `next build` for production bundle

### Code Organization
- Next.js App Router file-based routing
- Route groups for concern separation: `(public)`, `(auth)`, `(admin)`
- `convex/` folder for backend schema, functions, and auth config
- `components/` for shared UI components
- `lib/` for utilities and helpers

### Development Experience
- `next dev` with Turbopack for fast HMR
- `npx convex dev` watches and deploys Convex functions in real-time
- TypeScript inference from Convex schema (auto-generated types)
- ESLint with `eslint-config-next`
