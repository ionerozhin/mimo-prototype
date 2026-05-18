# Page Contract — registerPage Specification

Every page file in `pages/` must follow this contract. If it doesn't, the build will work but the page won't appear in the prototype.

## Minimal page

```jsx
registerPage("Page title", {
  icon: "home",                    // Icon name from PATHS (see icons.jsx)
  render: function PageName({ ctx }) {
    const { T } = ctx.ds;
    return (
      <div style={{ padding: T.space7 || 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary }}>
          Page title
        </h1>
      </div>
    );
  }
});
```

That's it. This file can be dropped into `pages/` and it will appear in the nav automatically.

## registerPage(label, config)

| Parameter | Type | Required | Description |
|---|---|---|---|
| `label` | string | yes | Appears in the sidebar nav. Must be unique across all pages. |
| `config.icon` | string | yes | Key from the PATHS object in icons.jsx. Available: `home`, `bookOpen`, `inbox`, `checkVerified`, `switchHorizontal`, `fileQuestion`, `settingsGear`. |
| `config.render` | function | yes | React component. Receives `{ ctx }` as props. |
| `config.keepAlive` | boolean | no | Default true — all pages stay mounted and keep state. Set to false to unmount on nav away. |
| `config.section` | string | no | Nav section grouping. Default "Associate". |

## The render function

The render function IS the page. Everything the page needs — components, helpers, constants, state — goes inside it.

### What goes inside

```jsx
registerPage("Bank reconciliation", {
  icon: "checkVerified",
  render: function BankRecPage({ ctx }) {
    // 1. Destructure what you need from ctx
    const { T, PrimaryButton, SecondaryButton, DataTable, Tooltip, Chevron } = ctx.ds;
    const { reconciledAccounts, bankStatements, selectedPeriod } = ctx.store;

    // 2. Page-local constants
    const BANK_ACCOUNTS = [
      { name: "Lloyds Bank - Operations GBP", feedBalance: "£28,553.40", glBalance: "£28,553.40" },
      // ...
    ];

    // 3. Page-internal components (invisible to other pages)
    function AccountTable({ rows, onRunReconciliation }) {
      // ... full component definition
    }

    function ReconciliationFlow({ accountName, onClose }) {
      // ... this can be hundreds of lines, it's all scoped
    }

    // 4. Page-local UI state
    const [reconciling, setReconciling] = useState(null);
    const [showResults, setShowResults] = useState(false);

    // 5. Cross-page interactions via dispatch
    const handleReconcile = (account) => {
      ctx.dispatch({ type: "MARK_RECONCILED", account, status: "reconciled" });
    };

    // 6. Navigation to other pages
    const goToBalanceSheet = () => ctx.navigate("Balance sheet");

    // 7. Render
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {reconciling ? (
          <ReconciliationFlow accountName={reconciling} onClose={() => setReconciling(null)} />
        ) : (
          <AccountTable rows={BANK_ACCOUNTS} onRunReconciliation={setReconciling} />
        )}
      </div>
    );
  }
});
```

### What NEVER goes outside the render function

```jsx
// ❌ WRONG — this pollutes the global scope
const MY_CONSTANT = "hello";
function MyHelper() { return <div />; }

registerPage("My page", {
  render: function MyPage({ ctx }) {
    // can't see MY_CONSTANT or MyHelper... or worse, CAN see them
    // and collides with another page's identically-named globals
  }
});

// ✅ RIGHT — everything inside
registerPage("My page", {
  render: function MyPage({ ctx }) {
    const MY_CONSTANT = "hello";
    function MyHelper() { return <div />; }
    // scoped, safe, isolated
  }
});
```

## Available icon names

These are the keys in the PATHS object (icons.jsx):

| Icon name | Used for |
|---|---|
| `home` | Home dashboard |
| `fileQuestion` | Collect documents |
| `inbox` | Inbox |
| `checkVerified` | Bank reconciliation |
| `switchHorizontal` | Adjustments |
| `bookOpen` | Review (P&L, Balance sheet) |
| `settingsGear` | Settings |

## Page layout conventions

Every page should follow this structure for visual consistency:

```jsx
render: function MyPage({ ctx }) {
  const { T, TopBar } = ctx.ds;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* TopBar is optional — some pages include it, some don't */}
      <TopBar period={ctx.store.selectedPeriod} />

      {/* Page header */}
      <div style={{
        padding: "32px 48px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
        background: T.colorSurfacePrimary
      }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 500,
          color: T.colorTextPrimary,
          lineHeight: "40px",
          letterSpacing: "-1px"
        }}>
          Page title
        </h1>
        {/* Action buttons go here */}
      </div>

      {/* Scrollable content area */}
      <div style={{ flex: 1, overflow: "auto", padding: "0 48px 48px" }}>
        {/* Page content */}
      </div>
    </div>
  );
}
```

## Interacting with the shared store

### Reading state

```jsx
const { reconciledAccounts, bsReconciledData } = ctx.store;
const isReconciled = reconciledAccounts.has("Lloyds Bank - Operations GBP");
```

### Writing state

Always use `ctx.dispatch`. Never try to mutate `ctx.store` directly.

```jsx
// Mark a bank account as reconciled
ctx.dispatch({
  type: "MARK_RECONCILED",
  account: "Lloyds Bank - Operations GBP",
  status: "reconciled",     // "reconciled" | "suggestions" | "completed"
  count: null,              // suggestion count (null for clean reconcile)
});

// Upload a bank statement
ctx.dispatch({
  type: "UPLOAD_STATEMENT",
  account: "Lloyds Bank - Operations GBP",
  file: { fileName: "lloyds-apr-2026.pdf", date: "6 May", time: "14:30" }
});
```

See `_store-actions.md` for the complete list of actions.

## Handling fullscreen overlays

Some pages open fullscreen flows (e.g. the reconciliation chat flow in bank-rec). These should take over the entire viewport:

```jsx
render: function BankRecPage({ ctx }) {
  const [activeFlow, setActiveFlow] = useState(null);

  if (activeFlow) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 100, background: T.colorSurfaceContrast }}>
        <FullscreenFlow onClose={() => setActiveFlow(null)} />
      </div>
    );
  }

  return (
    // Normal page content
  );
}
```

The fixed positioning takes the flow above the sidebar and topbar. The page manages this state internally — the shell doesn't need to know.

## Checklist for a valid page file

- [ ] Single `registerPage(...)` call
- [ ] Unique label (not used by any other page)
- [ ] Valid icon name from PATHS
- [ ] Render function receives `{ ctx }` and returns JSX
- [ ] All components defined inside the render function
- [ ] All constants defined inside the render function
- [ ] Nothing defined outside the registerPage call
- [ ] Uses `ctx.ds` for DS components (not global `T` or `PrimaryButton`)
- [ ] Uses `ctx.store` + `ctx.dispatch` for cross-page data (not props from app.jsx)
