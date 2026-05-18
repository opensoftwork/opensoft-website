# Core User Experience

## Defining Experience

The platform has **two core experiences**, one per user type:

**Admin core action:** "Write about what I just built, link it to the right project and company, and hit publish."
- This must feel like writing in Notion — familiar, block-based, zero learning curve
- The entire CRUD workflow (create entity → write content → link relationships → publish) should complete in under 5 minutes

**Visitor core action:** "Land on a project, understand the challenge and solution, then dive into the engineering journal."
- This must feel like reading a well-crafted case study — not a bullet list
- The path from landing page → project detail → journal entry should require ≤ 3 clicks

## Platform Strategy

- **Web application** — Next.js 16 App Router with SSR (public) + CSR (admin)
- **Desktop-first for admin** — CMS dashboard designed for keyboard + mouse, functional on tablet
- **Mobile-first for public** — Portfolio pages designed for phone screens, enhanced on desktop
- **No offline requirement** — Content creation and consumption both require internet
- **Browser targets:** Chrome, Firefox, Safari, Edge (latest 2 versions)

## Effortless Interactions

| Interaction | Must Feel Effortless | How |
|-------------|---------------------|-----|
| Content creation | Writing in Novel editor | Slash commands, familiar block types, auto-save |
| Entity linking | Connecting project ↔ company | Dropdown selectors with search, pre-populated |
| Publishing | Making content live | Single toggle/button, instant reflection |
| Navigation (visitor) | Finding relevant projects | Clear visual hierarchy, category tags, featured flags |
| Deep reading (visitor) | Reading a journal entry | Clean typography, proper spacing, no distractions |

## Critical Success Moments

1. **Admin publishes first project** — Sees it live on public site immediately → "This actually works"
2. **Visitor reads a journal entry** — Understands the engineering depth → "This person actually solves real problems"
3. **Admin updates hero text** — Changes Site Settings, sees it reflected without deploy → "I control everything"
4. **Visitor navigates company → projects → journal** — Natural information architecture → "This makes sense"

## Experience Principles

1. **Content-first, chrome-second** — The writing, projects, and journal entries ARE the product. UI should frame content, not compete with it
2. **Instant feedback** — Every admin action (save, publish, delete) provides immediate visual confirmation. Convex real-time subscriptions power this
3. **Progressive disclosure** — Landing page shows the highlight reel; detail pages reveal depth; journal entries provide the full story
4. **Minimal cognitive overhead** — Admin sees only what's needed for the current task. No settings sprawl, no unused features
