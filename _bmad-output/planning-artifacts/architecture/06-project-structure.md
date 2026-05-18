# Project Structure & Boundaries

## Complete Directory Tree

```
opensoft-website/
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── next.config.ts
├── components.json
├── .env.local
├── .env.example
├── .gitignore
│
├── convex/
│   ├── _generated/              # Auto-generated types
│   ├── schema.ts                # All tables + indexes
│   ├── auth.ts                  # Better Auth setup
│   ├── http.ts                  # HTTP endpoint for auth
│   ├── companies.ts
│   ├── projects.ts
│   ├── technologies.ts
│   ├── projectTechnologies.ts
│   ├── journalEntries.ts
│   └── siteSettings.ts
│
├── app/
│   ├── globals.css
│   ├── layout.tsx               # Root: ConvexBetterAuthProvider
│   ├── favicon.ico
│   ├── api/auth/[...all]/route.ts  # Better Auth proxy
│   │
│   ├── (auth)/
│   │   ├── layout.tsx           # Centered card layout
│   │   ├── sign-in/page.tsx
│   │   └── sign-up/page.tsx
│   │
│   ├── (admin)/
│   │   ├── layout.tsx           # Auth guard + sidebar shell
│   │   ├── @sidebar/default.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── companies/           # page.tsx, new/page.tsx, [id]/edit/page.tsx
│   │   ├── projects/            # same pattern
│   │   ├── technologies/        # same pattern
│   │   ├── journal/             # same pattern
│   │   └── settings/page.tsx    # Singleton form
│   │
│   └── (public)/
│       ├── layout.tsx           # Nav + footer
│       ├── page.tsx             # Landing (hero + featured)
│       ├── companies/[slug]/page.tsx
│       ├── projects/[slug]/page.tsx
│       ├── technologies/page.tsx
│       └── journal/[slug]/page.tsx
│
├── components/
│   ├── ui/                      # Shadcn primitives
│   └── novel-editor.tsx         # Novel wrapper
│
├── lib/
│   ├── utils.ts                 # cn() utility
│   ├── auth.ts                  # Server-side auth helpers
│   ├── format-date.ts
│   ├── generate-slug.ts
│   └── convex.ts                # Convex client helpers
│
└── public/
    ├── favicon.ico
    ├── og-image.png
    └── robots.txt
```

## Architectural Boundaries

### Data Flow

```
Admin Creates Project:
  Form → RHF → useMutation(api.projects.create) → Convex (auth + insert)
    → Subscription fires → All useQuery consumers re-render → Public reflects instantly
```

### Boundary Rules

| Boundary | Rule |
|----------|------|
| Browser → Convex | `useQuery()` / `useMutation()` via React client |
| Server → Convex | `fetchQuery()` for SSR |
| Auth flow | `/api/auth/*` proxies to Convex HTTP endpoint |
| Admin mutations | Every mutation starts with auth guard |
| Public queries | Filter `isVisible === true`, `isPublished === true` |
| Admin queries | Return all records (no filter) |

### Component Zones

| Zone | Contains | Cannot Import From |
|------|----------|--------------------|
| `components/ui/` | Shadcn primitives | Nothing restricted |
| `app/(admin)/` pages | Admin forms, tables | `(public)` components |
| `app/(public)/` pages | Portfolio UI, cards | `(admin)` components |
| `components/novel-editor.tsx` | Novel wrapper | Only used by admin |

## FR → Structure Mapping

| FR Category | Location |
|-------------|----------|
| Content CRUD (FR1–5) | `convex/[entity].ts` + `app/(admin)/[entity]/` |
| Relationships (FR6–9) | `convex/schema.ts` + mutation validation |
| Rich Text (FR10–13) | `components/novel-editor.tsx` + Convex |
| Auth (FR14–19) | `convex/auth.ts` + `app/api/auth/` + admin layout |
| Public Pages (FR20–24) | `app/(public)/` all pages |
| SEO (FR25–27) | `generateMetadata()` in each public page |
| Site Config (FR28–30) | `convex/siteSettings.ts` + admin settings |
