# Master Prototype Architecture

## Three Layers

The master prototype has three layers with clear ownership boundaries. Understanding these boundaries is essential — violating them is the primary way pages break each other.

### Layer 1: Shared DS (`shared/`)

Read-only contract consumed by all pages. Contains:

- **shared.jsx** — The `T` object (design tokens), `PATHS` (SVG icon paths), `NavIcon`, `Chevron`, `ProgressRing`, `SortIcon`, `PlayCircleIcon`, file type icons, plus DS components: tooltips, badges, cards, sidebars, modals, dropdowns, inputs, toggles, tabs, banners, chat components, loaders.
- **shell.jsx** — `TopBar`, `PrimaryButton`, `SecondaryButton`, `StatsWidget`, `StatsRow`, `DataTable`, `DataTableV2`.
- **MainMenu.jsx** — The left sidebar. Uses PATHS/NavIcon/Chevron from shared.jsx. Never forked.
- **registry.jsx** — `PAGE_REGISTRY` object and `registerPage` function.

**Ownership:** DS team maintains these files. Pages consume them via `ctx.ds`. A page must never modify anything in `shared/`.

### Layer 2: Pages (`pages/`)

Each file is a self-contained plugin. A page:

- Registers itself via `registerPage(label, { icon, render })`
- Defines all its internal components inside the render function
- Manages its own UI state via `useState`/`useRef`/`useEffect`
- Reads cross-page data from `ctx.store`
- Writes cross-page data via `ctx.dispatch`
- Cannot see or affect any other page's internals

**Ownership:** Individual designers own their pages. Merging = dropping a file in this directory.

### Layer 3: App Shell (`app.jsx`)

~50 lines. Reads `PAGE_REGISTRY` to build the nav menu and render the active page. Holds only:

- `activeNav` — which page is showing
- Initialises the shared store via `useReducer`
- Constructs the `ctx` object and passes it to the active page
- Renders MainMenu + TopBar + active page

**Ownership:** Rarely changes. Only needs editing if you're changing the shell layout itself (not pages).

### Store (`store.jsx`)

Sits between the shell and pages. Contains:

- The shared state reducer (all cross-page data transformations)
- Initial state shape
- Action type constants

When a page dispatches an action (e.g. `MARK_RECONCILED`), the reducer handles all cascading updates — including syncing bank rec status into BS data, date stamping, status mapping. Pages never need to know about this cross-page wiring.

## How registerPage Works

The `registerPage` function is defined in `shared/registry.jsx`. It's ~10 lines:

```jsx
const PAGE_REGISTRY = {};

function registerPage(label, config) {
  PAGE_REGISTRY[label] = config;
}
```

When `app.jsx` renders, it:
1. Reads `Object.keys(PAGE_REGISTRY)` to build nav items
2. Uses `PAGE_REGISTRY[activeNav].icon` for the nav icon
3. Calls `PAGE_REGISTRY[activeNav].render({ ctx })` to render the active page

Because each page registers itself, adding a page requires zero changes to `app.jsx` or the build script.

## Build Process

```bash
# build.sh
cat shared/shared.jsx shared/shell.jsx shared/MainMenu.jsx \
    shared/registry.jsx \
    store.jsx \
    pages/*.jsx \
    app.jsx > /tmp/master-input.jsx

./node_modules/.bin/babel /tmp/master-input.jsx -o /tmp/master-compiled.js
npx terser /tmp/master-compiled.js -o /tmp/master-min.js --compress --mangle
python3 build.py
```

Key point: `pages/*.jsx` uses glob order, which is arbitrary — and that's fine because each page is a closure that just calls `registerPage`. No page depends on another page being loaded first.

## The ctx Object

Every page's render function receives a single `ctx` prop:

```jsx
ctx = {
  // Design system components — everything from shared/
  ds: {
    T,                          // Design tokens
    PrimaryButton,              // From components.jsx
    SecondaryButton,
    DestructiveButton,
    DataTable,
    Tooltip,
    StatusBadge,
    TrMatchBadge,
    TrMatchingBadge,
    ReconciledCard,
    ReconciliationCard,
    RecommendationCard,
    StatsWidget,
    StatsRow,
    WorkflowStepsAccordion,
    CommentThread,
    Sidebar,
    Dropdown,
    Input,
    RadioGroup,
    RadioOption,
    Toggle,
    TabsNavigation,
    Modal,
    Banner,
    ChatBox,                    // Includes AiMessage, UserMessage, etc.
    CanvasLoader,
    // Icons
    NavIcon,
    Chevron,
    ProgressRing,
    SortIcon,
    PlayCircleIcon,
    DocIcon,
    InvoiceIcon,
    PdfIcon,
    CsvIcon,
    FileIcon,
    PATHS,                      // Raw SVG path data
  },

  // Cross-page shared state (read-only — use dispatch to write)
  store: {
    selectedPeriod,             // "April 2026"
    reconciledAccounts,         // Set of account names
    reconciledDates,            // { [accountName]: "13 Apr" }
    reconciledStatuses,         // { [accountName]: "reconciled"|"suggestions"|"completed" }
    reconciledCounts,           // { [accountName]: number | null }
    bankStatements,             // { [accountName]: { fileName, date, time } }
    bsReconciledData,           // { [code]: { date, status, suggestionCount, ... } }
    rowComments,                // { [accountCode]: [{ user, timestamp, text }] }
    accountReviewStatuses,      // { [accountCode]: { status, reviewer, date } | null }
    bsReviewState,              // "preparing" | "reviewing" | "reviewed"
    vatReviewCompleted,         // boolean
    vatResolvedCards,           // Set
    vatIgnoredCards,            // Set
  },

  // Write to shared state
  dispatch: function(action) { ... },

  // Navigation
  navigate: function(pageLabel) { ... },

  // Active page info
  activeNav: "Home",
}
```

## State Ownership Rules

**If only one page reads/writes it → page-local useState.**
Examples: which sidebar is open, which row is hovered, animation state, which tab within the page is active, whether a modal is visible.

**If multiple pages read it, or it represents "data the user produced" → shared store.**
Examples: reconciled account statuses (read by Home, BankRec, BalanceSheet), uploaded bank statements, BS reconciliation data, comments.

When in doubt: if navigating away and back should preserve it, it belongs in the store. If it can safely reset, it's page-local.

## Always-Mounted Pages

Some pages need to preserve internal state across navigation (e.g. the Adjustments page preserves its review state). The registry supports this via a `keepAlive: true` flag:

```jsx
registerPage("Adjustments", {
  icon: "switchHorizontal",
  keepAlive: true,   // app.jsx uses display:none instead of unmounting
  render: function AdjustmentsPage({ ctx }) { ... }
});
```

The shell renders keepAlive pages with `display: none` when inactive rather than unmounting them. Use this sparingly — most pages should reset on navigation.
