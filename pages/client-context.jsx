// ── Client Context page ───────────────────────────────────────────────────
(function() {

/* ── Settings sidebar nav items ──────────────────────────────────────── */
var SETTINGS_NAV = [
  { label: "Client context" },
  { label: "Document requests" },
  { label: "Members" },
  { label: "Integrations" },
  { label: "Reconciliation" },
  { label: "Bank accounts" },
  { label: "Approval workflows" },
];

/* ── Category badge variant — all blue ────────────────────────────────── */
var CATEGORY_VARIANT = "info";

/* ── Sample context entries ──────────────────────────────────────────── */
var CONTEXT_ENTRIES = [
  {
    id: 1,
    categories: ["Prepayments"],
    date: "11/06/2024",
    text: "Annual insurance premiums (Zurich EL and PL policies) are paid in April and released monthly over 12 months. The warehouse lease deposit with Prologis is not a prepayment – it sits in other debtors until the lease ends.",
  },
  {
    id: 2,
    categories: ["Accruals", "Utilities"],
    date: "11/06/2024",
    text: "Electricity and gas invoices from British Gas typically arrive 6–8 weeks in arrears. Accrue based on the prior month’s actual invoice, adjusted ±5% for seasonality. Water rates (Severn Trent) are billed quarterly in advance – do not accrue, already prepaid.",
  },
  {
    id: 3,
    categories: ["Revenue Recognition"],
    date: "09/04/2024",
    text: "Supermarket contracts (Tesco, Sainsbury’s) include volume rebates settled quarterly. Revenue is recognised net of estimated rebates. Rebate accruals should be reversed when the credit note is received, not when payment is made.",
  },
  {
    id: 4,
    categories: ["Accruals", "Professional Fees"],
    date: "02/03/2024",
    text: "Grant Thornton invoice the annual audit fee in two instalments – interim in November and final in June. Accrue 1/12th of the total agreed fee (£36,000) each month. Legal fees from Eversheds are expensed as incurred, no accrual needed unless a matter is ongoing at month-end.",
  },
  {
    id: 5,
    categories: ["Payroll"],
    date: "02/03/2024",
    text: "Warehouse overtime spikes in October–December due to Christmas production. Monthly payroll accrual should include estimated overtime based on shift rotas, not just contracted hours. Bonus provisions for sales staff are accrued quarterly at 8% of gross salary, paid in arrears.",
  },
];

/* ── Memories entries ─────────────────────────────────────────────────── */
var MEMORY_ENTRIES = [
  {
    id: 101,
    categories: ["Prepayments"],
    date: "26/04/2026",
    text: "Client dismissed the Datto SaaS Protection prepayment suggestion for April, noting the contract was cancelled in March and the final invoice has already been expensed.",
  },
  {
    id: 102,
    categories: ["Accruals"],
    date: "26/04/2026",
    text: "Client added the Grant Thornton audit fee accrual to the April schedule at £3,000, confirming the total agreed fee remains £36,000 for the year.",
  },
  {
    id: 103,
    categories: ["Document Requests"],
    date: "24/04/2026",
    text: "Client uploaded the March payroll summary from Moorepay three days after the initial request. Typical turnaround for payroll documents is 2–4 working days.",
  },
  {
    id: 104,
    categories: ["Prepayments"],
    date: "18/04/2026",
    text: "Client adjusted the Zurich employers’ liability prepayment release from £412 to £389 per month, reflecting the mid-year premium reduction agreed in January.",
  },
  {
    id: 105,
    categories: ["Bank Reconciliation"],
    date: "15/04/2026",
    text: "Client matched 14 of 18 unreconciled items on the Barclays current account in a single session. Remaining 4 items were supplier refunds pending credit notes from DHL and Biffa.",
  },
  {
    id: 106,
    categories: ["Accruals", "Utilities"],
    date: "02/04/2026",
    text: "Client overrode the suggested British Gas accrual of £2,140, reducing it to £1,850 based on a meter reading taken on 28 March. Actual invoice confirmed at £1,867.",
  },
  {
    id: 107,
    categories: ["Document Requests"],
    date: "28/03/2026",
    text: "Client declined to upload the Severn Trent water rates invoice, confirming it is paid by direct debit and already appears on the bank statement. No separate document needed.",
  },
  {
    id: 108,
    categories: ["Revenue Recognition"],
    date: "15/03/2026",
    text: "Client confirmed the Q4 Tesco volume rebate was £18,200, lower than the £21,000 estimate accrued. Variance of £2,800 reversed against revenue in March close.",
  },
];

/* ── SVG icons ───────────────────────────────────────────────────────── */
var ThreeDotsIcon = function() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="3" r="1.2" fill="#545453"/>
      <circle cx="8" cy="8" r="1.2" fill="#545453"/>
      <circle cx="8" cy="13" r="1.2" fill="#545453"/>
    </svg>
  );
};

var SearchIcon = function() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5" stroke="#8C8C8B" strokeWidth="1.5" />
      <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#8C8C8B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

var StarAiIcon = function() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <path d={PATHS.starAi} fill={T.colorBrandPrimary} stroke={T.colorBrandPrimary} strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

var ChevronLeftIcon = function() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M10 12.5L5.5 8L10 3.5" stroke="#545453" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

var PaginationChevronLeft = function(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 12L6 8L10 4" stroke={props.disabled ? T.colorBorderDark : T.colorTextSecondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

var PaginationChevronRight = function(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4L10 8L6 12" stroke={props.disabled ? T.colorBorderDark : T.colorTextSecondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};


/* ── Settings Sidebar ────────────────────────────────────────────────── */
function SettingsSidebar({ activeItem, onItemClick, onBack, userName, userRole }) {
  var _userName = userName || "Laura Bennett";
  var _userRole = userRole || "Clifton & Harrow";

  return (
    <aside style={{
      width: 264, flexShrink: 0, display: "flex", flexDirection: "column",
      background: T.colorSurfacePrimary, borderRight: "1px solid " + T.colorBorderDark,
      height: "100%", fontFamily: T.fontFamily,
    }}>
      {/* Back to workspace */}
      <div style={{ padding: "28px 20px 0", marginBottom: 24, flexShrink: 0 }}>
        <button onClick={onBack} style={{
          display: "flex", alignItems: "center", gap: 4,
          background: "none", border: "none", cursor: "pointer",
          fontSize: 14, fontWeight: 400, color: T.colorTextSecondary,
          padding: 0, fontFamily: T.fontFamily,
        }}>
          <ChevronLeftIcon />
          Back to workspace
        </button>
      </div>

      {/* Settings label */}
      <div style={{ padding: "0 20px 12px", fontSize: 14, fontWeight: 500, color: T.colorTextSecondary }}>
        Settings
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: "0 8px", overflowY: "auto" }}>
        {SETTINGS_NAV.map(function(item) {
          var active = activeItem === item.label;
          return (
            <button
              key={item.label}
              onClick={function() { if (onItemClick) onItemClick(item.label); }}
              style={{
                width: "100%", display: "flex", alignItems: "center",
                height: 36, padding: "0 12px", marginBottom: 1,
                borderRadius: 6, border: "none", cursor: "pointer",
                background: active ? "#F0F0F0" : "transparent",
                textAlign: "left", boxShadow: "none", fontFamily: T.fontFamily,
                fontSize: 14, fontWeight: active ? 600 : 400,
                color: active ? T.colorTextPrimary : "#4F4F4F",
              }}
              onMouseEnter={function(e) { if (!active) e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
              onMouseLeave={function(e) { if (!active) e.currentTarget.style.background = "transparent"; }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div style={{ height: 1, background: T.colorBorderDark, margin: "0 12px", flexShrink: 0 }} />

      {/* User profile */}
      <div
        style={{ padding: 16, display: "flex", alignItems: "center", gap: 10, flexShrink: 0, cursor: "pointer", borderRadius: 8, margin: 8, transition: "background 0.15s" }}
        onMouseEnter={function(e) { e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
        onMouseLeave={function(e) { e.currentTarget.style.background = "transparent"; }}
      >
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#F0F5FC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
          {typeof AVATAR_URL !== "undefined" && AVATAR_URL
            ? <img src={AVATAR_URL} alt={_userName} style={{ width: 36, height: 36, objectFit: "cover" }} />
            : <span style={{ fontSize: 13, fontWeight: 600, color: "#4C71DF" }}>{_userName.charAt(0)}</span>
          }
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: T.colorTextPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{_userName}</div>
          <div style={{ fontSize: 12, color: T.colorTextSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{_userRole}</div>
        </div>
        <button style={{ border: "none", background: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}>
          <ThreeDotsIcon />
        </button>
      </div>
    </aside>
  );
}


/* ── Context Card ────────────────────────────────────────────────────── */
/* type: "context" | "memory" */
function ContextCard({ entry, type, onEdit, onDelete, onViewHistory }) {
  var _hover = useState(false);
  var hovered = _hover[0];
  var setHovered = _hover[1];

  var _menuOpen = useState(false);
  var menuOpen = _menuOpen[0];
  var setMenuOpen = _menuOpen[1];

  var menuRef = useRef(null);

  useEffect(function() {
    if (!menuOpen) return;
    var handler = function(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return function() { document.removeEventListener("mousedown", handler); };
  }, [menuOpen]);

  var menuItems = type === "memory"
    ? [{ label: "Delete", destructive: true }]
    : [{ label: "View history" }, { label: "Edit" }, { label: "Delete", destructive: true }];

  return (
    <div
      style={{
        padding: "16px 20px",
        border: "1px solid " + T.colorBorderDark,
        borderRadius: 12,
        background: T.colorSurfacePrimary,
        transition: "background 0.15s",
      }}
      onMouseEnter={function(e) { setHovered(true); e.currentTarget.style.background = T.colorSurfaceSecondary; }}
      onMouseLeave={function(e) { setHovered(false); if (!menuOpen) e.currentTarget.style.background = T.colorSurfacePrimary; }}
    >
      {/* Top row: categories + date + menu */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        {entry.categories.map(function(cat) {
          return <StatusBadge key={cat} variant={CATEGORY_VARIANT} size="mini">{cat}</StatusBadge>;
        })}
        <span style={{ fontSize: 14, color: T.colorTextSecondary, marginLeft: 4 }}>{entry.date}</span>
        <div style={{ flex: 1 }} />
        <div style={{ position: "relative" }} ref={menuRef}>
          <button
            onClick={function(e) { e.stopPropagation(); setMenuOpen(!menuOpen); }}
            style={{
              border: "none", background: "none", cursor: "pointer", padding: 4,
              display: "flex", alignItems: "center", borderRadius: 4,
              opacity: hovered || menuOpen ? 1 : 0, transition: "opacity 0.15s",
            }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "rgba(0,0,0,0.06)"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "none"; }}
          >
            <ThreeDotsIcon />
          </button>
          {menuOpen && (
            <div style={{
              position: "absolute", top: "100%", right: 0, marginTop: 4,
              background: T.colorSurfacePrimary, border: "1px solid " + T.colorBorderDark,
              borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.10)", zIndex: 10,
              minWidth: 160, padding: "4px 0", fontFamily: T.fontFamily,
            }}>
              {menuItems.map(function(item) {
                return (
                  <button
                    key={item.label}
                    onClick={function() { setMenuOpen(false); if (item.label === "Edit" && onEdit) onEdit(entry); if (item.label === "Delete" && onDelete) onDelete(entry); if (item.label === "View history" && onViewHistory) onViewHistory(entry); }}
                    style={{
                      display: "flex", alignItems: "center", width: "100%",
                      padding: "8px 14px", border: "none", background: "none",
                      cursor: "pointer", fontSize: 14, fontFamily: T.fontFamily,
                      color: item.destructive ? T.colorError : T.colorTextPrimary,
                      textAlign: "left",
                    }}
                    onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceSecondary; }}
                    onMouseLeave={function(e) { e.currentTarget.style.background = "none"; }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {/* Description */}
      <div style={{ fontSize: 14, lineHeight: "22px", color: T.colorTextPrimary }}>
        {entry.text}
      </div>
    </div>
  );
}


/* ── Pagination helper ───────────────────────────────────────────────── */
function Pagination({ total, perPage, setPerPage, currentPage, setCurrentPage }) {
  var totalPages = Math.max(1, Math.ceil(total / perPage));
  var startIdx = (currentPage - 1) * perPage;
  var endIdx = Math.min(startIdx + perPage, total);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0 32px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: T.colorTextSecondary }}>
        <span>{total} records</span>
        <select
          value={perPage}
          onChange={function(e) { setPerPage(parseInt(e.target.value)); setCurrentPage(1); }}
          style={{
            padding: "4px 8px", border: "1px solid " + T.colorBorderDark,
            borderRadius: 6, fontSize: 14, color: T.colorTextPrimary,
            background: T.colorSurfacePrimary, fontFamily: T.fontFamily,
            cursor: "pointer", outline: "none",
          }}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: T.colorTextSecondary }}>
        <span>{(startIdx + 1) + "-" + endIdx + " of " + total}</span>
        <button
          onClick={function() { if (currentPage > 1) setCurrentPage(currentPage - 1); }}
          disabled={currentPage <= 1}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 28, height: 28, border: "1px solid " + T.colorBorderDark,
            borderRadius: 6, background: T.colorSurfacePrimary,
            cursor: currentPage <= 1 ? "default" : "pointer",
            opacity: currentPage <= 1 ? 0.5 : 1,
          }}
        >
          <PaginationChevronLeft disabled={currentPage <= 1} />
        </button>
        <button
          onClick={function() { if (currentPage < totalPages) setCurrentPage(currentPage + 1); }}
          disabled={currentPage >= totalPages}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 28, height: 28, border: "1px solid " + T.colorBorderDark,
            borderRadius: 6, background: T.colorSurfacePrimary,
            cursor: currentPage >= totalPages ? "default" : "pointer",
            opacity: currentPage >= totalPages ? 0.5 : 1,
          }}
        >
          <PaginationChevronRight disabled={currentPage >= totalPages} />
        </button>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════════════ */
/*  Main Page Component                                                  */
/* ══════════════════════════════════════════════════════════════════════ */
function ClientContextPage({ ctx }) {

  /* State */
  var _sSettingsItem = useState("Client context");
  var settingsItem = _sSettingsItem[0];
  var setSettingsItem = _sSettingsItem[1];

  var _sTab = useState("context");
  var activeTab = _sTab[0];
  var setActiveTab = _sTab[1];

  var _sSearch = useState("");
  var searchQuery = _sSearch[0];
  var setSearchQuery = _sSearch[1];

  var _sPerPage = useState(10);
  var perPage = _sPerPage[0];
  var setPerPage = _sPerPage[1];

  var _sPage = useState(1);
  var currentPage = _sPage[0];
  var setCurrentPage = _sPage[1];

  var _sMemSearch = useState("");
  var memSearchQuery = _sMemSearch[0];
  var setMemSearchQuery = _sMemSearch[1];

  var _sMemPerPage = useState(10);
  var memPerPage = _sMemPerPage[0];
  var setMemPerPage = _sMemPerPage[1];

  var _sMemPage = useState(1);
  var memCurrentPage = _sMemPage[0];
  var setMemCurrentPage = _sMemPage[1];

  var _sDrawerOpen = useState(false);
  var drawerOpen = _sDrawerOpen[0];
  var setDrawerOpen = _sDrawerOpen[1];

  var _sDrawerType = useState("type_it");
  var drawerType = _sDrawerType[0];
  var setDrawerType = _sDrawerType[1];

  var _sDrawerText = useState("");
  var drawerText = _sDrawerText[0];
  var setDrawerText = _sDrawerText[1];

  var _sDrawerFile = useState(null);
  var drawerFile = _sDrawerFile[0];
  var setDrawerFile = _sDrawerFile[1];

  var _sEditOpen = useState(false);
  var editOpen = _sEditOpen[0];
  var setEditOpen = _sEditOpen[1];

  var _sEditText = useState("");
  var editText = _sEditText[0];
  var setEditText = _sEditText[1];

  var editCloseRef = useRef(null);

  var _sDeleteModal = useState(false);
  var deleteModalOpen = _sDeleteModal[0];
  var setDeleteModalOpen = _sDeleteModal[1];

  var _sHistoryOpen = useState(false);
  var historyOpen = _sHistoryOpen[0];
  var setHistoryOpen = _sHistoryOpen[1];

  var _sHistoryEntry = useState(null);
  var historyEntry = _sHistoryEntry[0];
  var setHistoryEntry = _sHistoryEntry[1];

  var HISTORY_DATA = {
    1: [
      { date: "11/06/2024", time: "01:24 PM", action: "Context changed", user: "Emilia Larson", document: "–", note: "Annual insurance premiums (Zurich EL and PL policies) are paid in April and released monthly over 12 months. The warehouse lease deposit with Prologis is not a prepayment – it sits in other debtors until the lease ends." },
      { date: "10/06/2024", time: "01:24 PM", action: "Client information provided", user: "John Williams", document: "–", note: "Prefers prepayments to be booked only for invoices above £5,000. Requires prepayments to be approved by the finance manager before posting." },
    ],
    2: [
      { date: "11/06/2024", time: "03:10 PM", action: "Context changed", user: "Emilia Larson", document: "–", note: "Electricity and gas invoices from British Gas typically arrive 6–8 weeks in arrears. Accrue based on the prior month's actual invoice, adjusted ±5% for seasonality. Water rates (Severn Trent) are billed quarterly in advance – do not accrue, already prepaid." },
      { date: "08/06/2024", time: "09:45 AM", action: "Client information provided", user: "Laura Bennett", document: "–", note: "British Gas bills arrive late. Use previous month as baseline for accrual." },
    ],
    3: [
      { date: "09/04/2024", time: "11:30 AM", action: "Context created", user: "Laura Bennett", document: "–", note: "Supermarket contracts (Tesco, Sainsbury's) include volume rebates settled quarterly. Revenue is recognised net of estimated rebates. Rebate accruals should be reversed when the credit note is received, not when payment is made." },
    ],
    4: [
      { date: "02/03/2024", time: "02:15 PM", action: "Context changed", user: "Emilia Larson", document: "–", note: "Grant Thornton invoice the annual audit fee in two instalments – interim in November and final in June. Accrue 1/12th of the total agreed fee (£36,000) each month. Legal fees from Eversheds are expensed as incurred, no accrual needed unless a matter is ongoing at month-end." },
      { date: "15/01/2024", time: "10:00 AM", action: "Client information provided", user: "John Williams", document: "–", note: "Audit fee agreed at £36,000 for the year. Legal fees from Eversheds expensed as incurred." },
    ],
    5: [
      { date: "02/03/2024", time: "04:50 PM", action: "Context created", user: "Laura Bennett", document: "–", note: "Warehouse overtime spikes in October–December due to Christmas production. Monthly payroll accrual should include estimated overtime based on shift rotas, not just contracted hours. Bonus provisions for sales staff are accrued quarterly at 8% of gross salary, paid in arrears." },
    ],
  };

  var handleDelete = function() {
    setDeleteModalOpen(true);
  };

  var handleViewHistory = function(entry) {
    setHistoryEntry(entry);
    setHistoryOpen(true);
  };

  var handleEdit = function(entry) {
    setEditText(entry.text);
    setEditOpen(true);
  };

  var triggerEditClose = function() {
    if (editCloseRef.current) editCloseRef.current();
  };

  /* Filter context entries */
  var filteredEntries = CONTEXT_ENTRIES.filter(function(entry) {
    if (!searchQuery.trim()) return true;
    var q = searchQuery.toLowerCase();
    return entry.text.toLowerCase().indexOf(q) !== -1 ||
      entry.categories.some(function(c) { return c.toLowerCase().indexOf(q) !== -1; });
  });
  var totalRecords = filteredEntries.length;
  var startIdx = (currentPage - 1) * perPage;
  var endIdx = Math.min(startIdx + perPage, totalRecords);
  var visibleEntries = filteredEntries.slice(startIdx, endIdx);

  /* Filter memory entries */
  var memFiltered = MEMORY_ENTRIES.filter(function(entry) {
    if (!memSearchQuery.trim()) return true;
    var q = memSearchQuery.toLowerCase();
    return entry.text.toLowerCase().indexOf(q) !== -1 ||
      entry.categories.some(function(c) { return c.toLowerCase().indexOf(q) !== -1; });
  });
  var memTotal = memFiltered.length;
  var memStart = (memCurrentPage - 1) * memPerPage;
  var memEnd = Math.min(memStart + memPerPage, memTotal);
  var memVisible = memFiltered.slice(memStart, memEnd);

  var ccTabs = [
    { value: "context", label: "Client context" },
    { value: "memories", label: "Memories" },
  ];

  return (
    <div style={{ display: "flex", flex: 1, overflow: "hidden", background: T.colorSurfacePrimary }}>
      {/* Settings Sidebar */}
      <SettingsSidebar
        activeItem={settingsItem}
        onItemClick={setSettingsItem}
        onBack={function() { ctx.navigate("Home"); }}
      />

      {/* Add context drawer */}
      <Sidebar
        open={drawerOpen}
        onClose={function() { setDrawerOpen(false); }}
        title={
          <div>
            <div style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, lineHeight: "32px" }}>Add client context</div>
            <div style={{ fontSize: 14, fontWeight: 400, color: T.colorTextSecondary, lineHeight: "20px", marginTop: 4 }}>To make suggestions and workflow more tailored</div>
          </div>
        }
        width={560}
        footer={
          <PrimaryButton style={{ width: "100%", justifyContent: "center" }} onClick={function() { setDrawerOpen(false); }}>
            Add client context
          </PrimaryButton>
        }
      >
        <div style={{ padding: "24px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, fontFamily: T.fontFamily }}>Client context</label>
            <Dropdown
              value={drawerType}
              onChange={function(v) { setDrawerType(v); }}
              options={[
                { value: "type_it", label: "Type it" },
                { value: "upload", label: "Upload document" },
              ]}
              width="100%"
            />
          </div>
          {drawerType === "type_it" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, fontFamily: T.fontFamily }}>Describe client details or preferences</label>
              <textarea
                value={drawerText}
                onChange={function(e) { setDrawerText(e.target.value); }}
                placeholder="Prepayments and accruals preferences, month-end close process, ways of working..."
                style={{
                  width: "100%", minHeight: 160, padding: "12px 14px",
                  border: "1px solid " + T.colorBorderDark, borderRadius: 8,
                  fontSize: 14, lineHeight: "22px", color: T.colorTextPrimary,
                  fontFamily: T.fontFamily, background: T.colorSurfacePrimary,
                  resize: "vertical", outline: "none", boxSizing: "border-box",
                }}
                onFocus={function(e) { e.currentTarget.style.borderColor = T.colorBrandPrimary; }}
                onBlur={function(e) { e.currentTarget.style.borderColor = T.colorBorderDark; }}
              />
            </div>
          )}
          {drawerType === "upload" && (
            <UploadBox
              file={drawerFile}
              onFileChange={function(f) { setDrawerFile(f); }}
              accept=".pdf,.doc,.docx,.txt,.csv"
              acceptLabel="Supported file types: .pdf, .doc, .docx, .txt, .csv"
            />
          )}
        </div>
      </Sidebar>

      {/* Edit context drawer */}
      <Sidebar
        open={editOpen}
        onClose={function() { setEditOpen(false); }}
        closeRef={editCloseRef}
        title="Edit client context"
        width={560}
        footer={
          <React.Fragment>
            <SecondaryButton onClick={triggerEditClose}>Cancel</SecondaryButton>
            <PrimaryButton style={{ flex: 1, justifyContent: "center" }} onClick={triggerEditClose}>Save</PrimaryButton>
          </React.Fragment>
        }
      >
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, fontFamily: T.fontFamily }}>Client context</label>
            <textarea
              value={editText}
              onChange={function(e) { setEditText(e.target.value); }}
              style={{
                width: "100%", minHeight: 200, padding: "12px 14px",
                border: "1px solid " + T.colorBorderDark, borderRadius: 8,
                fontSize: 14, lineHeight: "22px", color: T.colorTextPrimary,
                fontFamily: T.fontFamily, background: T.colorSurfacePrimary,
                resize: "vertical", outline: "none", boxSizing: "border-box",
              }}
              onFocus={function(e) { e.currentTarget.style.borderColor = T.colorBrandPrimary; }}
              onBlur={function(e) { e.currentTarget.style.borderColor = T.colorBorderDark; }}
            />
          </div>
        </div>
        <div style={{ padding: "0 24px 24px" }}>
          <Banner variant="warning">Changes might affect context category and future suggestions.</Banner>
        </div>
      </Sidebar>

      {/* Context history drawer */}
      <Sidebar
        open={historyOpen}
        onClose={function() { setHistoryOpen(false); }}
        title={
          <div>
            <div style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, lineHeight: "32px" }}>Context history</div>
            <div style={{ fontSize: 14, fontWeight: 400, color: T.colorTextSecondary, lineHeight: "20px", marginTop: 4 }}>See where this context or learning is coming from, as well as all the changes made to it.</div>
          </div>
        }
        width={560}
      >
        {historyEntry && (
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Current version */}
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: T.colorTextPrimary, margin: "0 0 12px", fontFamily: T.fontFamily }}>Current version</p>
              <div style={{ border: "1px solid " + T.colorBorderDark, borderRadius: 12, padding: "16px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  {historyEntry.categories.map(function(cat) {
                    return <StatusBadge key={cat} variant={CATEGORY_VARIANT} size="mini">{cat}</StatusBadge>;
                  })}
                  <span style={{ fontSize: 14, color: T.colorTextSecondary }}>{historyEntry.date}</span>
                </div>
                <div style={{ fontSize: 14, lineHeight: "22px", color: T.colorTextPrimary, fontFamily: T.fontFamily }}>{historyEntry.text}</div>
              </div>
            </div>

            {/* History timeline */}
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: T.colorTextPrimary, margin: "0 0 12px", fontFamily: T.fontFamily }}>History</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {(HISTORY_DATA[historyEntry.id] || []).map(function(h, idx) {
                  return (
                    <React.Fragment key={idx}>
                      {/* Date header */}
                      {(idx === 0 || HISTORY_DATA[historyEntry.id][idx - 1].date !== h.date) && (
                        <div style={{
                          display: "flex", alignItems: "center", gap: 8,
                          padding: "8px 12px", background: T.colorSurfaceSecondary,
                          borderRadius: 8, fontFamily: T.fontFamily,
                        }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="2" y="2.5" width="12" height="11" rx="1.5" stroke={T.colorTextSecondary} strokeWidth="1.2" />
                            <path d="M2 6H14" stroke={T.colorTextSecondary} strokeWidth="1.2" />
                            <path d="M5.5 1V3.5M10.5 1V3.5" stroke={T.colorTextSecondary} strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                          <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>{h.date}</span>
                        </div>
                      )}
                      {/* History entry card */}
                      <div style={{ border: "1px solid " + T.colorBorderDark, borderRadius: 12, padding: "16px 20px", fontFamily: T.fontFamily }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                          <span style={{ fontSize: 14, color: T.colorTextSecondary, flexShrink: 0 }}>{h.time}</span>
                          <div style={{ borderLeft: "2px solid " + (h.action === "Client information provided" ? T.colorInfo : T.colorWarning), paddingLeft: 12 }}>
                            <div style={{ fontSize: 14, color: T.colorTextPrimary }}>{h.action}</div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: T.colorTextPrimary }}>{h.user}</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                          <span style={{ fontSize: 13, color: T.colorTextSecondary, flexShrink: 0 }}>Details</span>
                          <div style={{ flex: 1, height: 1, background: T.colorBorderDark }} />
                        </div>
                        <div>
                          <div style={{ fontSize: 14, lineHeight: "22px", color: T.colorTextPrimary, marginBottom: 4 }}><span style={{ fontWeight: 500 }}>Document:</span> {h.document}</div>
                          <div style={{ fontSize: 14, lineHeight: "22px", color: T.colorTextPrimary }}><span style={{ fontWeight: 500 }}>Note:</span> {h.note}</div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Sidebar>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "scroll", padding: "0 32px" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 48, paddingBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <h1 style={{ fontSize: 32, fontWeight: 500, color: T.colorTextPrimary, margin: 0, fontFamily: T.fontFamily, lineHeight: "40px" }}>
                Seabrook Foods Ltd.
              </h1>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "4px 10px", borderRadius: 6,
                background: T.colorSuccessBg, color: T.colorBrandPrimary,
                fontSize: 13, fontWeight: 500, lineHeight: "20px",
              }}>
                <StarAiIcon />
                Client Context
              </span>
            </div>
            <PrimaryButton onClick={function() { setDrawerOpen(true); setDrawerType("type_it"); setDrawerText(""); setDrawerFile(null); }}>Add context</PrimaryButton>
          </div>

          {/* Tabs */}
          <TabsNavigation
            tabs={ccTabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {/* ── Client context tab ── */}
          {activeTab === "context" && (
            <div>
              <div style={{ marginTop: 20 }}>
                <Banner variant="info">
                  Associate will use this context together with memories to tailor its suggestions, analysis, and variance commentary for this client.
                </Banner>
              </div>

              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 14px", marginTop: 20,
                border: "1px solid " + T.colorBorderDark, borderRadius: 8,
                background: T.colorSurfacePrimary,
              }}>
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={function(e) { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  style={{
                    flex: 1, border: "none", outline: "none", fontSize: 14,
                    color: T.colorTextPrimary, background: "transparent",
                    fontFamily: T.fontFamily,
                  }}
                />
              </div>

              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                {visibleEntries.map(function(entry) {
                  return <ContextCard key={entry.id} entry={entry} type="context" onEdit={handleEdit} onDelete={handleDelete} onViewHistory={handleViewHistory} />;
                })}
              </div>

              <Pagination
                total={totalRecords}
                perPage={perPage}
                setPerPage={setPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}

          {/* ── Memories tab ── */}
          {activeTab === "memories" && (
            <div>
              <div style={{ marginTop: 20 }}>
                <Banner variant="info">
                  Memories are created automatically as Associate learns from your actions and decisions during month-end close.
                </Banner>
              </div>

              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 14px", marginTop: 20,
                border: "1px solid " + T.colorBorderDark, borderRadius: 8,
                background: T.colorSurfacePrimary,
              }}>
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search..."
                  value={memSearchQuery}
                  onChange={function(e) { setMemSearchQuery(e.target.value); setMemCurrentPage(1); }}
                  style={{
                    flex: 1, border: "none", outline: "none", fontSize: 14,
                    color: T.colorTextPrimary, background: "transparent",
                    fontFamily: T.fontFamily,
                  }}
                />
              </div>

              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                {memVisible.map(function(entry) {
                  return <ContextCard key={entry.id} entry={entry} type="memory" onDelete={handleDelete} />;
                })}
              </div>

              <Pagination
                total={memTotal}
                perPage={memPerPage}
                setPerPage={setMemPerPage}
                currentPage={memCurrentPage}
                setCurrentPage={setMemCurrentPage}
              />
            </div>
          )}

        </div>
      </div>

      {/* Delete confirmation modal */}
      <Modal
        open={deleteModalOpen}
        onClose={function() { setDeleteModalOpen(false); }}
        title="Delete context?"
        text="Deleted context won't be used in the future which can affect suggestions accuracy."
        showDivider={false}
        footerAlign="right"
        footer={
          <React.Fragment>
            <SecondaryButton onClick={function() { setDeleteModalOpen(false); }}>No, cancel</SecondaryButton>
            <DestructiveButton onClick={function() { setDeleteModalOpen(false); }}>Yes, delete</DestructiveButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

registerPage("Client context", { render: ClientContextPage, keepAlive: false });

})();
