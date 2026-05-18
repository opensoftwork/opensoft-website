# Implementation Patterns & Consistency Rules

## Naming Patterns

### Database Naming (Convex)

| Element | Convention | Example |
|---------|-----------|---------|
| Table names | camelCase, plural | `companies`, `journalEntries`, `projectTechnologies` |
| Field names | camelCase | `companyId`, `isVisible`, `heroHeadline` |
| ID references | `entityId` (singular entity + "Id") | `companyId`, `projectId`, `technologyId` |
| Index names | `by_field` (snake_case with prefix) | `by_slug`, `by_company`, `by_order` |
| Boolean fields | `is` or `has` prefix | `isVisible`, `isFeatured`, `isPublished`, `isDailyDriver` |

### Convex Function Naming

| Element | Convention | Example |
|---------|-----------|---------|
| File names | camelCase, plural entity | `companies.ts`, `journalEntries.ts`, `siteSettings.ts` |
| Query names | verb + context | `list`, `get`, `getBySlug`, `getByCompany`, `listFeatured`, `listPublished` |
| Mutation names | verb | `create`, `update`, `remove` |
| Internal functions | prefixed with `internal` | `internalMutation`, `internalQuery` |

### Frontend Naming

| Element | Convention | Example |
|---------|-----------|---------|
| Component files | kebab-case | `project-card.tsx`, `entity-form.tsx`, `novel-editor.tsx` |
| Component names | PascalCase | `ProjectCard`, `EntityForm`, `NovelEditor` |
| Route folders | kebab-case | `sign-in/`, `journal/`, `technologies/` |
| Utility files | kebab-case | `format-date.ts`, `generate-slug.ts` |
| Hook files | camelCase with `use` prefix | `useAuth.ts`, `useAdmin.ts` |
| CSS variables | kebab-case with `--` prefix | `--color-accent`, `--font-inter` |
| Zod schemas | PascalCase + `Schema` suffix | `CompanySchema`, `ProjectSchema` |

### Slug Generation

All slugs are auto-generated from the entity title/name:
- Lowercase
- Replace spaces with hyphens
- Remove special characters
- Example: `"Event Session Folders"` → `"event-session-folders"`

## Structure Patterns

### Convex Function File Structure

Every entity file in `convex/` follows this structure:

```typescript
// convex/companies.ts
import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { authComponent } from "./auth"; // shared auth import

// ── Queries ──────────────────────────────────────
export const list = query({
  args: {},
  handler: async (ctx) => { ... },
});

export const get = query({
  args: { id: v.id("companies") },
  handler: async (ctx, args) => { ... },
});

// ── Mutations (all require admin auth) ───────────
export const create = mutation({
  args: { ... },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user || user.role !== "admin") throw new Error("Unauthorized");
    // ... mutation logic
  },
});
```

### Admin Page File Structure

Every admin entity follows the same 3-page pattern:

```
app/(admin)/[entity]/
├── page.tsx           # List view (table + "New" button)
├── new/page.tsx       # Create form
└── [id]/edit/page.tsx # Edit form (pre-populated)
```

### Form Component Pattern

All entity forms follow this structure:

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export function EntityForm({ initialData, mode }: Props) {
  const form = useForm({ resolver: zodResolver(schema), defaultValues });
  const createMutation = useMutation(api.entity.create);
  const updateMutation = useMutation(api.entity.update);

  async function onSubmit(data: FormValues) {
    try {
      if (mode === "create") await createMutation(data);
      else await updateMutation({ id: initialData._id, ...data });
      toast.success(`Entity ${mode === "create" ? "created" : "updated"}`);
      router.push("/admin/entity");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }
  // ... form JSX
}
```

## Format Patterns

### Date Formats

| Context | Format | Implementation |
|---------|--------|---------------|
| Convex storage | Unix timestamp (ms) | `Date.now()` |
| Admin list display | Relative | `"2 days ago"` via date utility |
| Public display | Absolute | `"May 15, 2026"` via Intl.DateTimeFormat |
| Form input | ISO date string | `<input type="date">` |

### Empty Value Display

| Context | Display |
|---------|---------|
| Missing optional text | `—` (em-dash) |
| Empty tags array | _(no badges rendered)_ |
| Missing image URL | Placeholder background gradient |
| Null company/project link | `"Unlinked"` label |

### JSON Field Conventions

- All Convex document fields use **camelCase**
- Tiptap JSON content stored as `v.any()` (opaque to Convex, parsed by Novel)
- Array fields always initialized as empty arrays `[]`, never `null`
- Boolean fields always have explicit values, never `undefined`

## Communication Patterns

### Toast Notification Conventions

| Event | Type | Message Pattern |
|-------|------|-----------------|
| Create success | `toast.success` | `"[Entity] created successfully"` |
| Update success | `toast.success` | `"[Entity] updated"` |
| Delete success | `toast.success` | `"[Entity] deleted"` |
| Save error | `toast.error` | `"Failed to save. Please try again."` |
| Delete blocked | `toast.error` | `"Cannot delete: [Entity] has linked [related]."` |
| Auth redirect | _(no toast)_ | Silent redirect to sign-in |

### Loading State Conventions

| Context | Component | Behavior |
|---------|-----------|----------|
| Page-level data | `<Skeleton>` | 3 skeleton rows for tables, card shape for detail |
| Button action | Spinner inside button | Button disabled, text changes to "Saving..." |
| Novel editor | Centered text | `"Loading editor..."` |
| Image load | CSS shimmer | Gradient animation until `onLoad` fires |

## Process Patterns

### Auth Guard Pattern

```typescript
// app/(admin)/layout.tsx
import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth"; // server-side helper

export default async function AdminLayout({ children }) {
  const user = await getAuthUser();
  if (!user) redirect("/sign-in");
  if (user.role !== "admin") redirect("/");
  return <AdminShell>{children}</AdminShell>;
}
```

### Convex Mutation Auth Pattern

```typescript
// Every mutation starts with this block:
const user = await authComponent.getAuthUser(ctx);
if (!user || user.role !== "admin") {
  throw new Error("Unauthorized");
}
```

### Referential Integrity Pattern

```typescript
// Before deleting a company:
const linkedProjects = await ctx.db
  .query("projects")
  .withIndex("by_company", (q) => q.eq("companyId", args.id))
  .collect();

if (linkedProjects.length > 0) {
  throw new Error(
    `Cannot delete: company has ${linkedProjects.length} linked projects`
  );
}
```

### Slug Auto-Generation Pattern

```typescript
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
```

## Enforcement Guidelines

### All AI Agents MUST:

1. Use `camelCase` for all Convex fields and function names
2. Start every mutation with the auth guard block
3. Use the 3-page admin pattern (list / new / [id]/edit) for every entity
4. Use React Hook Form + Zod for all forms — no uncontrolled forms
5. Use Sonner `toast` for all user feedback — no `alert()` or inline messages
6. Use `"use client"` only on components that need browser APIs or hooks
7. Import Shadcn components from `@/components/ui/` — never build custom equivalents
8. Store all dates as Unix timestamps in Convex, format on display
9. Use pnpm for all package installations — never npm or yarn

### Anti-Patterns to Avoid

- ❌ Using middleware for auth checks (use layout-level guards)
- ❌ Using `localStorage` for auth tokens (use HTTP-only cookies)
- ❌ Creating REST API routes (use Convex functions directly)
- ❌ Using `useEffect` for data fetching (use Convex `useQuery`)
- ❌ Storing derived data in state (compute from Convex query results)
- ❌ Using `any` type except for Tiptap JSON content field
