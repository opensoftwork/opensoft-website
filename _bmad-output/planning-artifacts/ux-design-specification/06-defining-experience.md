# Defining Experience & Mechanics

## Defining Experience

**Admin:** "Write and publish a project journal entry" — the Notion-like block editor experience.
If we nail the Novel editor integration so writing feels frictionless, the entire CMS succeeds. Everything else (CRUD forms, navigation, settings) is standard patterns.

**Visitor:** "Read a project's engineering story" — the journal-as-differentiation experience.
If a visitor can land on a project page and understand the challenge → solution → outcome through narrative writing, the portfolio succeeds. Everything else (landing page, tech grid) is supporting cast.

## User Mental Model

### Admin Mental Model
- Thinks in **entities**: "I worked at Company X, on Project Y, using Technology Z. Let me write about it."
- Expects **Notion-like editing**: slash commands, drag blocks, inline formatting
- Expects **instant publishing**: save = live. No build steps, no deploy buttons
- Expects **relationship management**: link a project to its company and technologies via simple selectors

### Visitor Mental Model
- Thinks in **evaluation criteria**: "What has this person built? How deep is their technical skill? Can they solve my kind of problem?"
- Expects **portfolio convention**: landing page → project cards → detail pages
- Expects **narrative depth**: not just screenshots but WHY and HOW decisions were made
- Expects **credibility signals**: real company names, technology tags, dated entries, code snippets

## Success Criteria

| Criterion | Measurement |
|-----------|-------------|
| Admin can create + publish a project in < 5 min | Timed task completion |
| Visitor finds a relevant project in < 30 seconds | Click depth from landing page |
| Novel editor feels responsive during typing | No visible lag on keystroke |
| Entity linking requires ≤ 2 interactions | Select company, select technologies — done |
| Journal entry renders beautifully on mobile | Visual audit on 375px viewport |

## Novel vs. Established Patterns

This project uses **100% established patterns** with one key integration:

| Pattern | Type | Source |
|---------|------|--------|
| Sidebar + list admin layout | Established | Linear, Notion, most SaaS admin panels |
| CRUD forms with validation | Established | Standard web forms |
| Block editor with slash commands | Established (via Novel) | Notion, Craft, Google Docs |
| Card grid portfolio | Established | Every developer portfolio |
| Project detail page | Established | Case study format |
| Journal timeline | Adaptation | Blog post list adapted to project context |

**No novel UX patterns needed.** The innovation is in content strategy (journal-as-differentiation), not in interaction design.

## Experience Mechanics

### Admin: Create + Publish Project (Core Flow)

**1. Initiation:**
- Admin clicks "Projects" in sidebar → sees project list → clicks "New Project" button
- New project form loads with empty fields

**2. Interaction:**
- Fills metadata: title, slug (auto-generated from title), company (dropdown), technologies (multi-select)
- Writes description in Novel editor (slash commands for headings, code blocks, images)
- Fills challenge/solution/outcome fields (plain text or Novel for rich text)
- Toggles "Featured" and "Visible" switches

**3. Feedback:**
- Auto-save indicator in editor ("Saved" / "Saving...")
- Form validation on required fields (inline errors)
- Toast notification on successful save: "Project created successfully"

**4. Completion:**
- "View on site" link appears after save → opens public URL in new tab
- Admin sees project live on public site immediately
- Returns to project list, sees new entry in the table

### Visitor: Evaluate Portfolio (Core Flow)

**1. Initiation:**
- Lands on homepage via shared link or search
- Hero section communicates value proposition in < 3 seconds

**2. Interaction:**
- Scrolls to featured projects section
- Clicks a project card → navigates to project detail page
- Reads challenge → solution → outcome narrative
- Scrolls to journal timeline → clicks an entry for deep-dive

**3. Feedback:**
- GSAP animations guide attention through scroll
- Technology tags confirm relevant skill match
- Journal dates and content depth signal genuine expertise

**4. Completion:**
- Visitor has enough information to make a decision (hire/contact/share)
- Social links and contact information accessible from any page
- Copies URL to share with hiring manager
