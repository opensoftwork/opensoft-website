# User Journey Flows

## Journey 1: Admin Creates a New Project

```mermaid
flowchart TD
    A[Admin clicks 'Projects' in sidebar] --> B[Project list page loads]
    B --> C[Admin clicks 'New Project' button]
    C --> D[Empty project form loads]
    D --> E[Fill title - slug auto-generates]
    E --> F[Select Company from dropdown]
    F --> G[Select Technologies via multi-select]
    G --> H[Write description in Novel editor]
    H --> I[Fill challenge/solution/outcome]
    I --> J[Toggle Featured and Visible switches]
    J --> K{All required fields filled?}
    K -- No --> L[Inline validation errors shown]
    L --> D
    K -- Yes --> M[Click 'Save Project']
    M --> N[Toast: 'Project created successfully']
    N --> O['View on site' link appears]
    O --> P[Admin clicks link - public page in new tab]
    P --> Q[Project visible on public site]
```

## Journey 2: Visitor Evaluates Portfolio

```mermaid
flowchart TD
    A[Visitor lands on homepage] --> B[Hero section loads with GSAP animation]
    B --> C[Scrolls to featured projects section]
    C --> D[Sees project cards with tech tags]
    D --> E[Clicks a project card]
    E --> F[Project detail page loads]
    F --> G[Reads Challenge section]
    G --> H[Reads Solution section]
    H --> I[Reads Outcome section]
    I --> J[Scrolls to Journal Timeline]
    J --> K{Interested in deep dive?}
    K -- Yes --> L[Clicks journal entry]
    L --> M[Full journal entry renders]
    M --> N[Reads engineering narrative]
    K -- No --> O[Scrolls to related projects]
    N --> P{Convinced?}
    O --> P
    P -- Yes --> Q[Copies URL / clicks social links]
    P -- More info --> R[Navigates to another project]
    R --> F
```

## Journey 3: Admin Updates Site Settings

```mermaid
flowchart TD
    A[Admin clicks 'Settings' in sidebar] --> B[Site Settings form loads]
    B --> C[Current values pre-populated]
    C --> D[Admin edits hero headline]
    D --> E[Admin updates LinkedIn URL]
    E --> F[Click 'Save Settings']
    F --> G[Toast: 'Settings updated']
    G --> H[Admin opens public site]
    H --> I[Hero reflects new headline instantly]
```

## Journey 4: Admin Writes a Journal Entry

```mermaid
flowchart TD
    A[Admin clicks 'Journal' in sidebar] --> B[Journal entries list loads]
    B --> C[Admin clicks 'New Entry']
    C --> D[Entry form with Novel editor loads]
    D --> E[Type title]
    E --> F[Select linked Company - optional]
    F --> G[Select linked Project - optional]
    G --> H[Write content in Novel editor]
    H --> I[Use slash commands for blocks]
    I --> J[Add code snippets, headings, lists]
    J --> K[Add tags]
    K --> L[Toggle 'Published']
    L --> M[Click 'Save']
    M --> N[Toast: 'Journal entry saved']
    N --> O{Published?}
    O -- Yes --> P[Entry appears on public site]
    O -- No --> Q[Entry saved as draft - admin only]
```

## Journey Patterns

### Common Admin Patterns
- **Entry point:** Always sidebar click → list page → action button
- **Form pattern:** Metadata fields first, rich text content second, toggles last
- **Completion:** Toast notification → "View on site" link → back to list
- **Error handling:** Inline validation, never lose typed content

### Common Visitor Patterns
- **Entry point:** Homepage hero → scroll → card click OR direct URL from shared link
- **Reading pattern:** Skim headline → read challenge → read solution → check technologies
- **Decision pattern:** 2-3 projects scanned before making a judgment
- **Exit pattern:** Copy URL to share, or click social links for direct contact

## Flow Optimization Principles

1. **Zero-step publishing** — Toggle "Published" + Save. No review queue, no approval flow. Solo operator.
2. **Smart defaults** — Slug auto-generates from title. Display order auto-increments. Visibility defaults to true.
3. **Relationship shortcuts** — When creating a journal entry from a project page, auto-populate the project link.
4. **Progressive loading** — Public detail pages load above-fold content first, journal timeline lazy-loads below.
