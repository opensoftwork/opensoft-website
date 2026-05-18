# UX Consistency Patterns

## Button Hierarchy

| Level | Variant | Usage | Example |
|-------|---------|-------|---------|
| Primary | `default` (blue fill) | Main page action, 1 per view | "Save Project", "Publish" |
| Secondary | `outline` (border only) | Supporting actions | "Cancel", "Back to list" |
| Ghost | `ghost` (no border) | Tertiary actions, inline | "View on site", nav links |
| Destructive | `destructive` (red) | Delete actions only | "Delete Project" |
| Icon | `ghost` + icon only | Compact actions in tables | Edit pencil, trash icon |

### Button Rules
- Max 1 primary button per view
- Destructive actions always require Dialog confirmation
- Button text uses verbs: "Save", "Create", "Delete" — never "Submit" or "OK"
- Loading state: spinner replaces icon, text changes to "Saving..."

## Feedback Patterns

### Toast Notifications (via Sonner)
| Type | Color | Duration | Example |
|------|-------|----------|---------|
| Success | Green accent | 3 seconds | "Project created successfully" |
| Error | Red accent | 5 seconds | "Failed to save. Please try again." |
| Info | Blue accent | 3 seconds | "Changes saved" |

### Inline Validation
- Show errors below the field, not in alerts
- Red border on invalid fields
- Error text: Inter 12px, destructive color
- Validate on blur for individual fields, on submit for the form

### Loading States
- **Page load:** Skeleton placeholders matching content shape
- **Button action:** Spinner inside button, button disabled during request
- **Table data:** Skeleton rows (3 rows) while Convex subscription loads
- **Novel editor:** "Loading editor..." centered placeholder

### Empty States
- **Empty entity list:** Illustration-free. Centered text: "No [entities] yet" + primary "Create [Entity]" button
- **No journal entries for project:** "No journal entries linked to this project" + "Write one" link

## Form Patterns

### Layout
- Labels above inputs (not inline)
- Required fields marked with red asterisk
- 2-column grid for short fields (name + slug, company + period)
- Full-width for long fields (description, editor)
- Toggles grouped at bottom in a horizontal row

### Field Types
| Data | Component | Notes |
|------|-----------|-------|
| Short text | Input | Max 100 chars for titles, 200 for slugs |
| Long text | Textarea | 3-row min height |
| Rich text | Novel editor | Full editor with slash commands |
| Single select | Select | Company dropdown, category dropdown |
| Multi select | Custom multi-select | Technology tags with badge display |
| Boolean | Switch | isVisible, isFeatured, isPublished |
| URL | Input type="url" | logoUrl, imageUrl, social links |
| Date | Input type="date" | Journal entry date |
| Number | Input type="number" | Display order |

### Save Behavior
- Single "Save" button, bottom-right of form, sticky on scroll
- No separate "Save as Draft" — use isPublished toggle
- No auto-save on forms (only in Novel editor for content field)
- Unsaved changes warning on navigation away (browser `beforeunload`)

## Navigation Patterns

### Admin Sidebar
- **Structure:** Logo at top → entity groups → settings at bottom
- **Groups:** Companies, Projects, Technologies, Journal, Settings
- **Active state:** Blue accent background on current section
- **Collapse:** Icon-only mode on small screens, toggle button at top
- **User section:** Email display + sign-out button at bottom

### Public Navigation
- **Structure:** Floating nav bar with page links
- **Links:** Home, Projects, Companies, Technologies
- **Behavior:** Fixed position, glassmorphism background, hidden on scroll-down, shown on scroll-up
- **Mobile:** Hamburger menu → slide-in drawer
- **Active state:** Blue underline on current page

### Breadcrumbs (Public Detail Pages)
- **Format:** Home > Section > Item
- **Example:** Home > Companies > At Par UI
- **Behavior:** Each segment is a clickable link
- **Position:** Below nav, above page title

## Additional Patterns

### Status Indicators
| Status | Badge Variant | Color |
|--------|--------------|-------|
| Published | Default | Green |
| Draft | Outline | Gray |
| Featured | Default | Blue |
| Hidden | Outline | Amber |

### Data Display
- **Dates:** Relative format in lists ("2 days ago"), absolute on detail pages ("May 15, 2026")
- **Empty fields:** Show em-dash (—) not "N/A" or blank
- **Long text truncation:** Ellipsis after 2 lines in card views
- **Technology tags:** Horizontal badge row, wrap to next line, max 6 visible + "+N more"

### Keyboard Shortcuts (Admin)
- `Cmd/Ctrl + S` — Save current form
- `Cmd/Ctrl + N` — New entity (context-aware)
- `Escape` — Close dialog / cancel action
