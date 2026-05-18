# Visual Design Foundation

## Color System

### Primary Palette (Already Established)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-background` | `#050505` | Page backgrounds, base canvas |
| `--color-surface` | `#0A0A0A` | Card backgrounds, elevated surfaces |
| `--color-surfaceHighlight` | `#121212` | Hover states, active surfaces |
| `--color-border` | `#222222` | Subtle dividers, card borders |
| `--color-accent` | `#3B82F6` | Primary actions, links, focus rings |
| `--color-textMain` | `#EDEDED` | Primary text, headings |
| `--color-textMuted` | `#888888` | Secondary text, labels, placeholders |

### Accent System

| Context | Color | Hex | Usage |
|---------|-------|-----|-------|
| Primary action | Blue | `#3B82F6` | Buttons, links, focus states |
| Success | Green | `#10B981` | Publish confirmations, success toasts |
| Warning | Amber | `#F59E0B` | Validation warnings |
| Destructive | Red | `oklch(0.577 0.245 27.325)` | Delete actions, error states |
| Info | Slate | `#64748B` | Informational badges, metadata |

### Color Usage Rules
- **Public pages:** Dark backgrounds only. Blue accent for interactive elements. No competing colors.
- **Admin pages:** Same dark theme. Use Shadcn's oklch-based CSS variables for component-level theming.
- **Selection highlight:** `rgba(59, 130, 246, 0.3)` with white text (already defined in globals.css).
- **Glow effects:** `rgba(59, 130, 246, 0.1)` for subtle hover glows on cards and buttons.

## Typography System

### Font Stack

| Role | Font | Weight | CSS Variable | Usage |
|------|------|--------|-------------|-------|
| Body | Inter | 300, 400, 500, 600 | `--font-inter` | All body text, form labels, buttons |
| Display | Space Grotesk | 500, 600, 700 | `--font-space-grotesk` | Headings, hero text, section titles |

### Type Scale

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| Hero headline | Space Grotesk | 4rem (64px) | 700 | 1.1 |
| Section heading (h2) | Space Grotesk | 2.25rem (36px) | 600 | 1.2 |
| Subsection heading (h3) | Space Grotesk | 1.5rem (24px) | 500 | 1.3 |
| Body text | Inter | 1rem (16px) | 400 | 1.6 |
| Small text / labels | Inter | 0.875rem (14px) | 500 | 1.4 |
| Caption / metadata | Inter | 0.75rem (12px) | 400 | 1.4 |
| Code blocks | Geist Mono | 0.875rem (14px) | 400 | 1.5 |

## Spacing & Layout Foundation

### Spacing Scale
Use Tailwind's default spacing scale (4px base):
- `4px` (1) — Tight gaps between inline elements
- `8px` (2) — Component internal padding
- `16px` (4) — Standard component gap
- `24px` (6) — Section internal padding
- `32px` (8) — Between related sections
- `64px` (16) — Between major page sections
- `96px` (24) — Major section breaks on public pages

### Layout Grid

**Public pages:**
- Max content width: `1200px` centered
- Side padding: `24px` (mobile), `48px` (tablet), `64px` (desktop)
- Section vertical spacing: `96px`

**Admin pages:**
- Sidebar width: `280px` (collapsible to `64px` icons-only)
- Content area: fluid, fills remaining width
- Content max-width: `900px` for forms, full-width for tables
- Padding: `24px` consistent

### Border & Radius
- Card radius: `24px` (established in `.bento-card`)
- Button radius: `0.625rem` (var `--radius`)
- Input radius: `calc(var(--radius) - 2px)`
- Badge radius: full (`rounded-full`)

## Accessibility Considerations

- All color combinations meet WCAG 2.1 AA contrast ratio (≥ 4.5:1 for text, ≥ 3:1 for large text)
- `#EDEDED` on `#050505` = contrast ratio ~16:1 ✅
- `#888888` on `#050505` = contrast ratio ~5.5:1 ✅
- `#3B82F6` on `#050505` = contrast ratio ~4.6:1 ✅ (large text / interactive)
- Focus rings: `2px solid #3B82F6` with `2px offset`
- No color-only information conveyance — always paired with icons or text labels
