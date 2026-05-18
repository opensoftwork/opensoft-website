# Component Strategy

## Design System Components (Shadcn/ui)

### Phase 1 — CMS Foundation

| Component | Shadcn Name | Customization | Usage |
|-----------|-------------|---------------|-------|
| Sidebar | `sidebar` | Fixed width 280px, dark theme | Admin navigation shell |
| Button | `button` | Blue accent for primary, ghost for secondary | All actions |
| Input | `input` | Dark surface background, border on focus | Text fields |
| Textarea | `textarea` | Same as input styling | Multi-line plain text |
| Select | `select` | Dropdown with search for entity linking | Company/tech selectors |
| Label | `label` | Inter 14px/500, muted text color | Form labels |
| Form | `form` | React Hook Form integration | All admin forms |
| Table | `table` | Striped rows optional, hover highlight | Entity list views |
| Badge | `badge` | Blue for tech tags, green for published, gray for draft | Status indicators |
| Toast | `sonner` | Bottom-right position, dark theme | Success/error feedback |
| Card | `card` | Dark surface, 24px radius, border subtle | Entity cards, dashboard widgets |
| Switch | `switch` | Blue accent when toggled on | isVisible, isFeatured, isPublished |
| Dialog | `dialog` | Confirmation dialogs only (delete actions) | Destructive confirmations |
| DropdownMenu | `dropdown-menu` | Row actions (edit, delete, view) | Table row actions |
| Separator | `separator` | Subtle border color | Section dividers |

### Phase 2 — Public Pages

| Component | Shadcn Name | Customization | Usage |
|-----------|-------------|---------------|-------|
| NavigationMenu | `navigation-menu` | Glassmorphism (nav-blur), floating | Public top nav |
| Avatar | `avatar` | For profile photo in hero/about | Divyasimha's photo |

### Phase 3 — Polish

| Component | Shadcn Name | Customization | Usage |
|-----------|-------------|---------------|-------|
| Skeleton | `skeleton` | Dark surface shimmer | Loading states |
| Tooltip | `tooltip` | Dark popover style | Icon-only actions |

## Custom Components

### Novel Editor Wrapper
- **Purpose:** Wraps Novel editor with project-specific configuration
- **Behavior:** Dynamic import with `{ ssr: false }`, `"use client"` directive
- **Props:** `content` (Tiptap JSON), `onChange`, `editable`, `placeholder`
- **Two modes:** Editable (admin CMS) and Read-only (public rendering)

### Project Card (Public)
- **Purpose:** Bento-style card for landing page project grid
- **Behavior:** Extends existing `bento-card` CSS class
- **Content:** Project image, title, company name, technology badges, featured indicator
- **Interaction:** Hover glow effect, click navigates to project detail

### Journal Timeline
- **Purpose:** Chronological list of journal entries for a project/company
- **Behavior:** Vertical timeline with date markers
- **Content:** Entry title, date, excerpt (first 150 chars), tags
- **Interaction:** Click navigates to full journal entry

### Entity Form
- **Purpose:** Reusable form layout for all CRUD operations
- **Behavior:** React Hook Form + Zod validation + Shadcn Form components
- **Layout:** Title at top, metadata fields in 2-column grid, rich text editor below, toggles at bottom, save button fixed bottom-right

### Admin List View
- **Purpose:** Reusable list/table layout for entity management
- **Behavior:** Table with columns for key fields, action dropdown per row
- **Header:** Entity name + "New [Entity]" button
- **Features:** Sort by name/date, no pagination needed (small datasets)

## Component Implementation Strategy

### Priority Order
1. **Sidebar + Layout shell** — Unlocks all admin pages
2. **Entity Form + Table** — Reusable across all 5 entities
3. **Novel Editor Wrapper** — Enables rich text creation
4. **Project Card + Journal Timeline** — Powers public pages
5. **Polish components** — Loading states, tooltips

### Composition Pattern
- All custom components compose Shadcn primitives — never rebuild from scratch
- Use `cn()` utility from Shadcn for conditional class merging
- Server Components by default; `"use client"` only when needed (editor, forms with state)
