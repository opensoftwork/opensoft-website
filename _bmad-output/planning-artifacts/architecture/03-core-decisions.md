# Core Architectural Decisions

## Decision Priority Analysis

### Critical Decisions (Block Implementation)
1. Convex schema design and entity relationships
2. Better Auth integration pattern with Convex
3. Route group structure and layout hierarchy
4. Admin role bootstrap mechanism
5. Rich text storage and rendering strategy

### Important Decisions (Shape Architecture)
6. Novel editor integration approach (dynamic import)
7. Form validation strategy (RHF + Zod)
8. Convex function organization
9. Error handling and feedback patterns
10. SEO metadata generation strategy

### Deferred Decisions (Post-MVP)
- Image upload/storage solution (Convex file storage vs R2)
- Analytics integration
- RSS feed generation
- OAuth providers (GitHub, Google)

---

## Data Architecture

### Database: Convex (v1.39.1)

**Decision:** Use Convex as the sole data store.

**Rationale:**
- Already used in PrimeEditz (proven in production by Divyasimha)
- Real-time subscriptions mean content updates appear instantly
- Serverless functions eliminate API layer boilerplate
- Auto-generated TypeScript types from schema
- Free tier sufficient for portfolio-scale data

**Data Modeling Approach:**
- Document-oriented (Convex documents, not tables)
- Relationships via document IDs (no JOINs — Convex uses indexed queries)
- Junction table for many-to-many (ProjectTechnologies)
- Singleton pattern for Site Settings

**Validation Strategy:**
- Convex schema validators (`v.string()`, `v.id()`, etc.) for database-level enforcement
- Zod schemas on the client for form-level validation
- Dual validation: client validates before mutation, server re-validates in Convex function

**Caching Strategy:**
- Convex handles caching automatically through its reactive query system
- No application-level cache needed
- Next.js SSR pages use `fetchQuery` for server-side data (not cached between requests — fresh on every page load for dynamic content)

**Migration Approach:**
- Convex handles schema migrations automatically for additive changes
- For breaking changes: deploy new schema → backfill data → remove old fields

---

## Authentication & Security

### Auth Library: Better Auth (v1.6.11) via @convex-dev/better-auth

**Decision:** Better Auth with Convex adapter, email/password only.

**Rationale:**
- Handles session management, password hashing (bcrypt 10 rounds), HTTP-only cookies
- Convex component model integrates cleanly with serverless functions
- Validated in PrimeEditz project already
- Simpler than rolling custom auth or using NextAuth with Convex

**Auth Flow Architecture:**

```
Browser → app/api/auth/[...all]/route.ts → Convex HTTP endpoint (.convex.site)
                                           ↓
                                    Better Auth processes
                                           ↓
                                    Returns session cookie
```

**Authorization Pattern:**
- **Layout-level guards** in server components (NOT middleware)
- `(admin)/layout.tsx` checks auth status via `getAuthUser()` server-side
- If unauthenticated → redirect to `/sign-in`
- If authenticated but not admin → redirect to `/` (public)
- All Convex mutations validate admin role server-side:
  ```typescript
  const user = await authComponent.getAuthUser(ctx);
  if (!user || user.role !== "admin") throw new Error("Unauthorized");
  ```

**Admin Bootstrap:**
- First user to register is automatically assigned `admin` role (FR16)
- Subsequent registrations get `visitor` role (no public registration needed — admin registers once)
- Registration endpoint can be disabled after admin setup

**Session Configuration:**
- HTTP-only cookies (NFR5)
- 7-day inactivity timeout (NFR8)
- No localStorage token storage

---

## API & Communication

### API Pattern: Convex Functions (No REST/GraphQL)

**Decision:** Use Convex queries, mutations, and actions directly — no REST API layer.

**Rationale:**
- Convex eliminates the API layer entirely
- Queries = read operations (cached, reactive)
- Mutations = write operations (transactional)
- Actions = side effects (external API calls, if needed)
- Type-safe function calls from client via `useQuery()` and `useMutation()`
- Server-side access via `fetchQuery()` in Next.js server components

**Exception:** The auth route handler `app/api/auth/[...all]/route.ts` is the only Next.js API route — it proxies to the Convex HTTP endpoint for Better Auth.

**Error Handling Standards:**
- Convex functions throw errors which propagate to the client
- Client catches errors in mutation calls and displays via Sonner toast
- No custom error response format — Convex errors are strings
- Error boundaries wrap public pages for graceful degradation

---

## Frontend Architecture

### Rendering Strategy

| Route Group | Rendering | Rationale |
|-------------|-----------|-----------|
| `(public)` | SSR (Server Components) | SEO, fast FCP, dynamic meta tags |
| `(auth)` | CSR (Client Components) | Form interactivity, auth state |
| `(admin)` | CSR (Client Components) | Rich editor, form state, real-time updates |

### State Management: Convex Reactive Queries

**Decision:** No external state management library. Convex `useQuery()` is the state layer.

**Rationale:**
- Convex queries are reactive — components re-render when data changes
- No Redux, Zustand, or React Context needed for data state
- Form state managed by React Hook Form (local to form components)
- Auth state managed by Better Auth provider
- UI state (sidebar open, modals) uses React `useState` locally

### Component Architecture

**Decision:** Feature-based organization within route groups.

- Shared UI primitives in `components/ui/` (Shadcn)
- Admin-specific components in `app/(admin)/_components/`
- Public-specific components in `app/(public)/_components/`
- No cross-group component sharing (admin and public have different design languages)

### Routing Strategy

```
app/
├── layout.tsx                    # Root: ConvexBetterAuthProvider
├── (auth)/
│   ├── layout.tsx               # Centered card layout
│   ├── sign-in/page.tsx
│   └── sign-up/page.tsx
├── (admin)/
│   ├── layout.tsx               # Auth guard + sidebar layout
│   ├── @sidebar/default.tsx     # Parallel route: sidebar nav
│   ├── dashboard/page.tsx
│   ├── companies/
│   │   ├── page.tsx             # List
│   │   ├── new/page.tsx         # Create form
│   │   └── [id]/edit/page.tsx   # Edit form
│   ├── projects/               # Same pattern
│   ├── technologies/           # Same pattern
│   ├── journal/                # Same pattern
│   └── settings/page.tsx       # Singleton form
└── (public)/
    ├── layout.tsx               # Public nav + footer
    ├── page.tsx                 # Landing (hero + featured projects)
    ├── companies/
    │   └── [slug]/page.tsx      # Company detail
    ├── projects/
    │   └── [slug]/page.tsx      # Project detail
    ├── technologies/page.tsx    # Tech grid
    └── journal/
        └── [slug]/page.tsx      # Journal entry
```

### Performance Optimization

- **Dynamic import** for Novel editor: `dynamic(() => import(...), { ssr: false })`
- **GSAP deferred** to Phase 3 — not loaded in Phase 1/2
- **Image optimization:** Next.js `<Image>` for external URLs (remotePatterns config)
- **Bundle splitting:** Route-based code splitting (automatic with App Router)
- **Convex subscriptions:** Only active on mounted components (automatic cleanup)

---

## Infrastructure & Deployment

### Hosting: Self-Hosted via Dokploy + Cloudflare Tunnels

**Decision:** Self-hosted on existing infrastructure, zero SaaS hosting cost.

**Rationale:**
- Divyasimha already operates Dokploy for PrimeEditz
- Cloudflare Tunnels provide zero-ingress cost HTTPS
- No Vercel bills, no vendor lock-in
- Full control over deployment pipeline

**Environment Configuration:**
- `.env.local` for local development
- Dokploy environment variables for production
- Key variables: `CONVEX_DEPLOYMENT`, `NEXT_PUBLIC_CONVEX_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`

**Deployment Process:**
1. Push to main branch
2. Dokploy detects change, builds Next.js production bundle
3. Container starts with `next start`
4. Cloudflare Tunnel routes traffic from `opensoft.work` to container

**Monitoring & Logging:**
- Convex Dashboard for backend function logs and data inspection
- Next.js server logs via Dokploy container logs
- No external monitoring service for MVP (add Plausible/Umami post-MVP)

**Scaling Strategy:**
- Not needed at portfolio scale
- Convex handles backend scaling automatically
- Single Next.js container sufficient for ~100 concurrent visitors
