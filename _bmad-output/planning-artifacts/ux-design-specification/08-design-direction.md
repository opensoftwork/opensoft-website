# Design Direction Decision

## Design Directions Explored

Three design directions were evaluated against the project's emotional goals and technical constraints:

### Direction A: "Dark Minimal" (Linear-inspired)
- Ultra-clean, almost brutalist dark interface
- Monochrome with single blue accent
- Maximum content density, minimal decoration
- Best for: admin dashboard efficiency

### Direction B: "Editorial Dark" (Stripe/Leerob-inspired)
- Rich dark theme with gradient accents and scroll animations
- Typography-forward with generous whitespace
- Layered depth through subtle shadows and glassmorphism
- Best for: public portfolio storytelling

### Direction C: "Hybrid" (Recommended)
- Combines Direction A for admin and Direction B for public
- Shared design tokens ensure visual coherence across route groups
- Admin = functional efficiency. Public = editorial polish.
- Matches the dual-experience architecture

## Chosen Direction

**Direction C: Hybrid** — Admin pages use clean, functional layouts (Linear-inspired). Public pages use editorial, animated layouts (Stripe-inspired). Both share the same color palette, typography, and component library.

## Design Rationale

1. **Matches user needs:** Admin needs speed; visitors need impression. One design language can't optimize for both.
2. **Route group architecture supports it:** `(admin)` and `(public)` have separate layouts. Different visual treatments are architecturally natural.
3. **Reduces admin development cost:** Admin UI uses vanilla Shadcn components with minimal customization. Development time goes to public page polish.
4. **Shared tokens = visual coherence:** Same colors, fonts, spacing, and border radii across both experiences prevent visual fragmentation.

## Implementation Approach

### Admin Pages (Direction A: Dark Minimal)
- **Layout:** Sidebar + content area. Shadcn Sidebar component.
- **Lists:** Data tables with sort/filter. Shadcn Table component.
- **Forms:** Standard form layouts with Shadcn Form + Input + Select.
- **Editor:** Novel in full-width content area, 700px max-width for readability.
- **Animations:** None. Instant transitions. Fast.

### Public Pages (Direction B: Editorial Dark)
- **Layout:** Full-width sections with centered content (1200px max).
- **Hero:** Large Space Grotesk headline with GSAP fade-in.
- **Cards:** Bento grid with hover glow effects (existing `bento-card` pattern).
- **Detail pages:** Long-form content with journal timeline sidebar.
- **Animations:** GSAP ScrollTrigger for section reveals, parallax images, staggered card entries.
- **Navigation:** Floating glassmorphism nav bar (existing `nav-blur` pattern).
