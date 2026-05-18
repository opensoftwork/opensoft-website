# Design System Foundation

## Design System Choice

**Chosen approach:** Themeable System — **Shadcn/ui + Tailwind CSS v4**

This is not a decision to make — it's already in the codebase. Shadcn/ui (new-york style) is installed with Tailwind CSS v4. The design system is component-by-component, copy-paste, fully customizable.

## Rationale for Selection

1. **Already configured** — Tailwind v4 + Shadcn/ui already in `package.json`. Zero setup cost.
2. **Component ownership** — Shadcn components are copied into `components/ui/`, giving full control over styling and behavior.
3. **Tailwind v4 native** — Shadcn/ui components use CSS variables and Tailwind utility classes — no separate theming layer.
4. **Accessibility built-in** — Built on Radix UI primitives with ARIA compliance out of the box.
5. **Dark mode first** — The existing theme uses oklch color space with dark mode as primary, matching the portfolio's design intent.
6. **Solo developer efficiency** — No learning curve for Divyasimha. Install component → customize → ship.

## Implementation Approach

### Component Installation Strategy
Install Shadcn components as-needed per feature, not all at once:

| Phase | Components Needed |
|-------|------------------|
| Phase 1 (CMS) | Button, Input, Textarea, Select, Label, Form, Dialog, DropdownMenu, Sidebar, Table, Badge, Toast, Card, Separator, Switch |
| Phase 2 (Public) | Card (reuse), Badge (reuse), Separator (reuse), NavigationMenu, Avatar |
| Phase 3 (Polish) | Skeleton, Tooltip |

### Installation Command Pattern
```bash
npx shadcn@latest add [component-name]
```

## Customization Strategy

### Theme Tokens (Already Defined)
The existing `globals.css` defines the complete token system:

- **Background:** `#050505` (near-black)
- **Surface:** `#0A0A0A` (elevated surface)
- **Surface Highlight:** `#121212` (hover/active)
- **Border:** `#222222` (subtle dividers)
- **Accent:** `#3B82F6` (blue — primary actions)
- **Text Main:** `#EDEDED` (high-contrast text)
- **Text Muted:** `#888888` (secondary text)

### Shadcn Theme Mapping
Map Shadcn CSS variables to existing design tokens:

| Shadcn Variable | OpenSoft Value | Usage |
|----------------|---------------|-------|
| `--background` | `#050505` | Page backgrounds |
| `--card` | `#0A0A0A` | Card surfaces |
| `--primary` | `#3B82F6` | Primary buttons, links |
| `--muted` | `#121212` | Muted backgrounds |
| `--border` | `#222222` | Borders, dividers |
| `--foreground` | `#EDEDED` | Primary text |
| `--muted-foreground` | `#888888` | Secondary text |

### Font System (Already Configured)
- **Sans (body):** Inter — `--font-inter`
- **Display (headings):** Space Grotesk — `--font-space-grotesk`
- Both loaded via `next/font/google` in root layout
