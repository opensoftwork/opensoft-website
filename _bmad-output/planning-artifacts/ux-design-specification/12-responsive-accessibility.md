# Responsive Design & Accessibility

## Responsive Strategy

### Approach: Mobile-First for Public, Desktop-First for Admin

**Public pages** are designed mobile-first because visitors often discover the portfolio on phones (recruiter checking a resume link during commute). CSS is written at the smallest viewport and enhanced upward.

**Admin pages** are designed desktop-first because Divyasimha uses a laptop for content management. The admin is functional on tablet but not optimized for phone-sized screens.

## Breakpoint Strategy

| Breakpoint | Size | Tailwind | Public Behavior | Admin Behavior |
|-----------|------|----------|-----------------|----------------|
| Mobile | < 640px | default | Single column, stacked cards | Not supported (show desktop notice) |
| Tablet | 640–1024px | `sm:` / `md:` | 2-column grid, condensed nav | Sidebar collapsed to icons, content full-width |
| Desktop | > 1024px | `lg:` | Full layout, 3-column bento grid | Sidebar expanded + content area |
| Wide | > 1440px | `xl:` | Content centered, max-width enforced | Same as desktop |

### Public Page Responsive Behavior

**Landing Page:**
- **Mobile:** Hero full-width, single-column project cards, stacked vertically
- **Tablet:** 2-column project grid, hero text size reduced
- **Desktop:** Full bento grid (existing 3-column layout), full animations

**Project Detail:**
- **Mobile:** Single column — challenge, solution, outcome stacked. Journal timeline below.
- **Tablet:** Same as mobile but wider content area
- **Desktop:** Main content (left, 65%) + journal timeline sidebar (right, 35%)

**Technology Grid:**
- **Mobile:** 2 columns, category headings full-width
- **Tablet:** 3 columns
- **Desktop:** 4 columns with category group headers

### Admin Page Responsive Behavior

**Dashboard:**
- **Tablet:** Sidebar collapses to icons only (64px). Content fills remaining width.
- **Desktop:** Full sidebar (280px) + content area

**Forms:**
- **Tablet:** All fields single-column
- **Desktop:** 2-column grid for short fields, full-width for editor

**Tables:**
- **Tablet:** Hide non-essential columns (order, visibility). Show name + actions.
- **Desktop:** Full column display

## Accessibility Strategy

### WCAG 2.1 Level AA Compliance

**Color & Contrast:**
- All text meets 4.5:1 contrast ratio against backgrounds
- Interactive elements meet 3:1 contrast ratio
- Focus indicators are visible and consistent (2px blue ring)
- No information conveyed by color alone — always paired with text/icons

**Keyboard Navigation:**
- All interactive elements reachable via Tab key
- Logical tab order follows visual layout (top-to-bottom, left-to-right)
- Focus trap in modals/dialogs (Radix UI handles this automatically)
- Escape key closes overlays
- Enter/Space activates buttons and toggles
- Arrow keys navigate dropdown menus

**Screen Reader Support:**
- Semantic HTML5 elements: `<nav>`, `<main>`, `<article>`, `<aside>`, `<header>`, `<footer>`
- Proper heading hierarchy: single `<h1>` per page, sequential `<h2>`, `<h3>`
- All images have descriptive `alt` text (from CMS data, not empty strings)
- Form inputs associated with labels via `htmlFor` / `id`
- ARIA labels on icon-only buttons: `aria-label="Delete project"`
- Live regions for toast notifications: `role="status"` with `aria-live="polite"`

**Motion & Animation:**
- Respect `prefers-reduced-motion` media query
- GSAP animations disabled when reduced motion is preferred
- No essential information conveyed only through animation
- No auto-playing or looping animations

### Implementation Approach
- **Shadcn/ui + Radix primitives** handle most accessibility automatically (focus management, ARIA attributes, keyboard interactions)
- **Manual checks needed:** Alt text content quality, heading hierarchy, custom component ARIA
- **Testing:** Manual keyboard navigation test per page, axe-core automated scan

## Testing Strategy

### Manual Testing Checklist (Per Page)
- [ ] Keyboard-only navigation completes all tasks
- [ ] Screen reader reads content in logical order
- [ ] Color contrast passes automated check
- [ ] Focus indicators visible on all interactive elements
- [ ] Reduced motion preference disables animations
- [ ] Content readable at 200% zoom

### Responsive Testing Matrix

| Device | Viewport | Priority | Test Focus |
|--------|----------|----------|------------|
| iPhone SE | 375 × 667 | High | Public pages, touch targets |
| iPhone 15 Pro | 393 × 852 | High | Public pages, scroll behavior |
| iPad | 768 × 1024 | Medium | Admin collapse, public grid |
| MacBook | 1440 × 900 | High | Admin full layout, public desktop |
| 4K Display | 2560 × 1440 | Low | Max-width constraints |

### Automated Testing
- **Lighthouse Accessibility audit** — Target score ≥ 90
- **axe-core** — Zero critical/serious violations
- **eslint-plugin-jsx-a11y** — Catch ARIA issues at build time
