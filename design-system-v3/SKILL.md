---
name: design-system-v3
description: Work with the Mimo master prototype using the page-isolation architecture. Use this skill whenever the user asks to add a new page, edit an existing page, create a component, fix something, or make any change to the master prototype — whether from a Figma link, verbal description, screenshot, or any other input. Also triggers on "add a page to the master prototype", "edit the bank rec page", "create a new feature page", "drop in a colleague's page", "merge this page", "update the shared DS", or any reference to the master prototype's pages/ directory. Use v3 (not v2) whenever the target is the master prototype with its pages/ folder structure. Use v2 for standalone single-file prototypes that aren't part of the master prototype.
---

# Mimo Design System v3 — Master Prototype (Page-Isolation Architecture)

You work with the Mimo master prototype, which uses a page-isolation architecture. Every page is a self-contained closure that registers itself. Pages can't leak globals or break each other.

## When to use v3 vs v2

- **v3 (this skill):** The target is the master prototype — the project with `pages/`, `shared/`, `store.jsx`, `app.jsx`.
- **v2:** The target is a standalone prototype (single .jsx file or legacy multi-file without the page-isolation structure).

If unsure, check for a `pages/` directory. If it exists → v3. If not → v2.

## HARD RULES

1. **DO NOT delegate to a sub-agent.** Write every file yourself. A sub-agent cannot see the component source it needs.

2. **DO NOT skip reading component files.** Read each DS component file from `shared/` before using or recommending it. The source code is the contract.

3. **DO NOT break existing pages.** Only touch what the user asked you to change. Never rewrite another page's code, reorganise the store, or "clean up" files outside the request scope.

4. **DS wins for shell — always.** MainMenu and TopBar are never forked, never customised. Only change their props. They live in `shared/` and are consumed by `app.jsx`.

5. **Never pollute the global scope.** All page-internal components, helpers, and constants must be defined inside the `registerPage` render function. Nothing a page defines should be visible outside its closure.

6. **Read `_architecture.md` and `_page-contract.md` before starting.** These files are in the same directory as this SKILL.md. Read them once at the start of the session.

## Directory Structure

```
Master prototype/
├── shared/
│   ├── shared.jsx            # T object (design tokens) + PATHS + NavIcon + Chevron + DS components
│   ├── shell.jsx             # TopBar, PrimaryButton, SecondaryButton, StatsWidget, DataTable, DataTableV2
│   ├── MainMenu.jsx          # Left sidebar (never forked)
│   └── registry.jsx          # PAGE_REGISTRY + registerPage function
├── store.jsx                 # Shared state reducer (cross-page data)
├── pages/
│   ├── home.jsx
│   ├── collect-documents.jsx
│   └── ... (drop new pages here)
├── app.jsx                   # Thin shell: nav router + renders active page
├── build.sh                  # Auto-discovers pages/*.jsx
└── build.py                  # Assembles final HTML
```

## Component Files

The DS component source files live in `shared/`. Use this index to find what you need:

| What you see | Read this file |
|---|---|
| Design tokens, colours, spacing | `shared/shared.jsx` → T object |
| SVG icons (PATHS), Chevron, NavIcon | `shared/shared.jsx` → PATHS / NavIcon / Chevron |
| Primary/Secondary buttons | `shared/shell.jsx` → PrimaryButton / SecondaryButton |
| TopBar (period picker + sync) | `shared/shell.jsx` → TopBar |
| Stats cards, progress ring | `shared/shell.jsx` → StatsWidget / StatsRow |
| Data table with headers | `shared/shell.jsx` → DataTable / DataTableV2 |
| Tooltip, StatusBadge, Modal, Sidebar, etc. | `shared/shared.jsx` → relevant section |
| TabsNavigation, Dropdown, Input, Toggle | `shared/shared.jsx` → relevant section |
| Banner, ChatBox, CanvasLoader | `shared/shared.jsx` → relevant section |
| Left nav with logo, company, nav items | `shared/MainMenu.jsx` |

## Core Workflows

### Adding a new page

1. Read `_page-contract.md` for the registerPage spec
2. Create `pages/your-page.jsx` following the contract
3. No other files need changing — the build auto-discovers it, and app.jsx reads PAGE_REGISTRY

### Editing an existing page

1. Read the page file in `pages/`
2. Read any DS component files you'll need from `shared/`
3. Edit within the page's render function — don't add anything outside the registerPage call
4. If the edit involves cross-page data, read `_store-actions.md` for available dispatch actions

### Merging a colleague's page

1. Receive their .jsx file
2. Check it follows the registerPage contract (read `_page-contract.md`)
3. Drop it in `pages/`
4. Run build — done

If their file uses globals or defines functions outside a closure, wrap it in the registerPage pattern before adding.

### Using DS components in a page

Pages access DS components through `ctx.ds`:

```jsx
registerPage("My page", {
  icon: "home",
  render: function MyPage({ ctx }) {
    const { T, PrimaryButton, SecondaryButton, DataTable, Tooltip } = ctx.ds;
    // Use them directly
    return <PrimaryButton onClick={...}>Save</PrimaryButton>;
  }
});
```

### Forking a DS component

When a page needs a customised version of a DS component:

1. Read the canonical source from `shared/`
2. Copy it inside the page's render function with a descriptive name
3. Add a fork comment:

```jsx
registerPage("Bank reconciliation", {
  icon: "checkVerified",
  render: function BankRecPage({ ctx }) {
    const { T, DataTable } = ctx.ds;

    // Forked from DataTable (mimo-design-system v3.0.0)
    // Added: drag-to-reorder rows, inline cell editing
    // Reason: DS DataTable doesn't support row reordering
    // Rebase check: if DataTable adds reorderable prop, switch back
    function DraggableDataTable(props) {
      // ... customised implementation
    }

    return <DraggableDataTable ... />;
  }
});
```

The fork is invisible to all other pages. This is the key advantage over v2's flat structure.

### Working with cross-page state

Pages read shared state from `ctx.store` and write via `ctx.dispatch`:

```jsx
// Reading
const { reconciledAccounts, bsReconciledData, selectedPeriod } = ctx.store;

// Writing
ctx.dispatch({ type: "MARK_RECONCILED", account: "Lloyds Bank", status: "reconciled" });
ctx.dispatch({ type: "UPLOAD_STATEMENT", account: "Lloyds Bank", file: { fileName: "stmt.pdf", date: "6 May" } });
```

See `_store-actions.md` for all available actions and what they do.

Page-local state (UI state like "which sidebar is open", "which row is hovered") uses normal `useState` inside the render function. This state resets when navigating away — that's by design.

## Figma Workflow

When the user shares a Figma link:
1. `get_screenshot` — see the screen
2. `get_design_context` — get component tree
3. Map to Component Index above
4. Read the relevant DS component files from `shared/`
5. Determine which page this belongs to (or if it's a new page)
6. Apply changes within the page's registerPage closure

## DS Swap Check

Same rules as v2 — every time you edit a page, scan the area you're working in for legacy components that could be replaced by DS equivalents:

- **Auto-swap** if the DS component produces identical output with same props, interactions, and data flow
- **Ask first** if there's one uncertainty
- **Keep as-is** if swapping would lose functionality

## Building the Prototype

After editing, build the prototype:

```bash
cd <master-prototype-directory>
./build.sh
```

The build script auto-discovers `shared/*.jsx`, `store.jsx`, `pages/*.jsx`, and `app.jsx`. Page file order doesn't matter — each is a self-contained closure.

If you need to build manually (e.g. in a Cowork session), the concatenation order is:

```
shared/shared.jsx + shared/shell.jsx + shared/MainMenu.jsx + shared/registry.jsx + store.jsx + pages/*.jsx (any order) + app.jsx
```

Then babel → terser → build.py wraps in HTML template.

## Fallback

When a screen includes UI patterns not covered by any DS component, fall back to the `mimo-design-system` spec skill for token values and component specs. Write custom code using design tokens (`T.*`) inside the page closure.
