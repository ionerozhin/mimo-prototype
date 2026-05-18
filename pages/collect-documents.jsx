// ── Collect Documents ────────────────────────────────────────────────────────
(function() {

// ── Inline icons (page-specific) ─────────────────────────────────────────────
function SearchIcon() {
  return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>);
}
function FilterIcon() {
  return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="#080908" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>);
}
function PlusIcon() {
  return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4.16797V15.8346M4.16667 10.0013H15.8333" stroke="#FFFFFF" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/></svg>);
}
function ClipboardIcon() {
  return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13.3333 2.5H14.3333C15.7335 2.5 16.4335 2.5 16.9683 2.77248C17.4387 3.01217 17.8212 3.39462 18.0608 3.86502C18.3333 4.3998 18.3333 5.09987 18.3333 6.5V14.3333C18.3333 15.7335 18.3333 16.4335 18.0608 16.9683C17.8212 17.4387 17.4387 17.8212 16.9683 18.0608C16.4335 18.3333 15.7335 18.3333 14.3333 18.3333H5.66667C4.26654 18.3333 3.56647 18.3333 3.03169 18.0608C2.56129 17.8212 2.17883 17.4387 1.93915 16.9683C1.66667 16.4335 1.66667 15.7335 1.66667 14.3333V6.5C1.66667 5.09987 1.66667 4.3998 1.93915 3.86502C2.17883 3.39462 2.56129 3.01217 3.03169 2.77248C3.56647 2.5 4.26654 2.5 5.66667 2.5H6.66667M6.66667 12.5L8.33333 14.1667L13.3333 9.16667M7.33333 5H12.6667C13.0667 5 13.2667 5 13.4233 4.92733C13.5614 4.86353 13.6733 4.75175 13.7373 4.61335C13.81 4.4567 13.81 4.25668 13.81 3.85667V2.31C13.81 1.90998 13.81 1.70997 13.7373 1.55332C13.6733 1.41492 13.5614 1.30314 13.4233 1.23933C13.2667 1.16667 13.0667 1.16667 12.6667 1.16667H7.33333C6.93332 1.16667 6.73331 1.16667 6.57665 1.23933C6.43825 1.30314 6.32647 1.41492 6.26267 1.55332C6.19 1.70997 6.19 1.90998 6.19 2.31V3.85667C6.19 4.25668 6.19 4.4567 6.26267 4.61335C6.32647 4.75175 6.43825 4.86353 6.57665 4.92733C6.73331 5 6.93332 5 7.33333 5Z" stroke="#545453" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>);
}
function MailIcon() {
  return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M1.66667 5.83464L8.47076 10.5969C8.9718 10.9484 9.22232 11.1242 9.49485 11.1921C9.73582 11.2522 9.98686 11.2522 10.2278 11.1921C10.5004 11.1242 10.7509 10.9484 11.2519 10.5969L18.0561 5.83464M5.66667 16.668H14.3333C15.7335 16.668 16.4335 16.668 16.9683 16.3955C17.4387 16.1558 17.8212 15.7734 18.0608 15.303C18.3333 14.7682 18.3333 14.0681 18.3333 12.668V7.33464C18.3333 5.93451 18.3333 5.23444 18.0608 4.69966C17.8212 4.22926 17.4387 3.84681 16.9683 3.60712C16.4335 3.33464 15.7335 3.33464 14.3333 3.33464H5.66667C4.26654 3.33464 3.56647 3.33464 3.03169 3.60712C2.56129 3.84681 2.17883 4.22926 1.93915 4.69966C1.66667 5.23444 1.66667 5.93451 1.66667 7.33464V12.668C1.66667 14.0681 1.66667 14.7682 1.93915 15.303C2.17883 15.7734 2.56129 16.1558 3.03169 16.3955C3.56647 16.668 4.26654 16.668 5.66667 16.668Z" stroke="#545453" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>);
}
function GearSmallIcon() {
  return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.82936 16.1439L8.3164 17.2393C8.46118 17.5653 8.69747 17.8424 8.99659 18.0368C9.29571 18.2312 9.64483 18.3347 10.0016 18.3346C10.3583 18.3347 10.7075 18.2312 11.0066 18.0368C11.3057 17.8424 11.542 17.5653 11.6868 17.2393L12.1738 16.1439C12.3472 15.7552 12.6388 15.4312 13.0071 15.218C13.3778 15.0042 13.8066 14.9131 14.2321 14.9578L15.4238 15.0846C15.7785 15.1222 16.1365 15.056 16.4544 14.8941C16.7722 14.7322 17.0363 14.4816 17.2145 14.1726C17.393 13.8638 17.4781 13.5099 17.4593 13.1537C17.4406 12.7975 17.3189 12.4545 17.109 12.1661L16.4034 11.1967C16.1522 10.8489 16.018 10.4303 16.0201 10.0013C16.02 9.57346 16.1555 9.15659 16.4071 8.81056L17.1127 7.84112C17.3226 7.55276 17.4443 7.20969 17.463 6.85353C17.4818 6.49737 17.3967 6.14342 17.2183 5.83464C17.04 5.52566 16.7759 5.27504 16.4581 5.11316C16.1402 4.95127 15.7822 4.88508 15.4275 4.9226L14.2358 5.04945C13.8103 5.09414 13.3815 5.00307 13.0108 4.78927C12.6418 4.57485 12.3501 4.2491 12.1775 3.85871L11.6868 2.76334C11.542 2.43728 11.3057 2.16023 11.0066 1.9658C10.7075 1.77137 10.3583 1.66791 10.0016 1.66797C9.64483 1.66791 9.29571 1.77137 8.99659 1.9658C8.69747 2.16023 8.46118 2.43728 8.3164 2.76334L7.82936 3.85871C7.6568 4.2491 7.36509 4.57485 6.99603 4.78927C6.62538 5.00307 6.19659 5.09414 5.77103 5.04945L4.57566 4.9226C4.22094 4.88508 3.86294 4.95127 3.54509 5.11316C3.22724 5.27504 2.96317 5.52566 2.78492 5.83464C2.60644 6.14342 2.52141 6.49737 2.54014 6.85353C2.55888 7.20969 2.68058 7.55276 2.89048 7.84112L3.59603 8.81056C3.84765 9.15659 3.98315 9.57346 3.98307 10.0013C3.98315 10.4291 3.84765 10.846 3.59603 11.192L2.89048 12.1615C2.68058 12.4498 2.55888 12.7929 2.54014 13.1491C2.52141 13.5052 2.60644 13.8592 2.78492 14.168C2.96335 14.4768 3.22744 14.7273 3.54525 14.8891C3.86306 15.051 4.22096 15.1173 4.57566 15.08L5.76733 14.9532C6.19289 14.9085 6.62167 14.9995 6.99233 15.2133C7.36277 15.4272 7.65583 15.753 7.82936 16.1439Z" stroke="#545453" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.0001 12.5013C11.3808 12.5013 12.5001 11.382 12.5001 10.0013C12.5001 8.62059 11.3808 7.5013 10.0001 7.5013C8.61939 7.5013 7.5001 8.62059 7.5001 10.0013C7.5001 11.382 8.61939 12.5013 10.0001 12.5013Z" stroke="#545453" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>);
}
function CommentIcon() {
  return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 10H10.0083M6.66667 10H6.675M13.3333 10H13.3417M5.83333 15.8333V17.8133C5.83333 18.1267 5.83333 18.2833 5.89583 18.36C5.95 18.4267 6.03 18.4667 6.11667 18.4683C6.21667 18.47 6.3375 18.3842 6.57917 18.2125L8.57 16.7975C8.86917 16.585 9.01917 16.4783 9.18333 16.4042C9.32917 16.3383 9.48333 16.2917 9.64167 16.265C9.82083 16.235 10.005 16.235 10.3733 16.235H12.3333C14.0335 16.235 14.8835 16.235 15.5353 15.905C16.1089 15.6148 16.5735 15.1502 16.8637 14.5766C17.1937 13.9248 17.1937 13.0748 17.1937 11.3746V7.5C17.1937 5.79987 17.1937 4.9498 16.8637 4.29802C16.5735 3.72441 16.1089 3.25979 15.5353 2.96961C14.8835 2.63965 14.0335 2.63965 12.3333 2.63965H7.66667C5.96654 2.63965 5.11647 2.63965 4.46469 2.96961C3.89108 3.25979 3.42647 3.72441 3.13628 4.29802C2.80632 4.9498 2.80632 5.79987 2.80632 7.5V11.6666C2.80632 12.625 2.80632 13.1042 2.90398 13.5001C3.18538 14.6405 4.08584 15.541 5.22632 15.8224C5.62209 15.92 6.10133 15.92 7.05961 15.92" stroke="#545453" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>);
}
function DotsIcon() {
  return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="4.5" r="1.5" fill="#545453"/><circle cx="10" cy="10" r="1.5" fill="#545453"/><circle cx="10" cy="15.5" r="1.5" fill="#545453"/></svg>);
}

// ── Page-specific components ─────────────────────────────────────────────────
function OpenBadge() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600, lineHeight: "17px", background: T.colorSuccessBg, border: "1px solid " + T.colorSuccessBorder, color: T.colorSuccess, whiteSpace: "nowrap" }}>
      Open
    </span>
  );
}

function IconButton({ children, onClick, size = 40 }) {
  return (
    <button onClick={onClick}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: size, height: size, background: "#FFFFFF", border: "1px solid " + T.colorBorderDark, borderRadius: 6, cursor: "pointer", transition: "all 0.15s ease", padding: 0 }}
      onMouseEnter={function(e) { e.currentTarget.style.borderColor = T.colorBorderHover; e.currentTarget.style.background = T.colorSurfaceSecondary; }}
      onMouseLeave={function(e) { e.currentTarget.style.borderColor = T.colorBorderDark; e.currentTarget.style.background = "#FFFFFF"; }}>
      {children}
    </button>
  );
}

function CDCheckbox({ checked, onChange, indeterminate }) {
  return (
    <div onClick={onChange} style={{ width: 16, height: 16, borderRadius: 4, border: checked || indeterminate ? "none" : "1px solid " + T.colorBorderHover, background: checked || indeterminate ? T.colorBrandPrimary : "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "all 0.15s ease" }}>
      {checked && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )}
      {indeterminate && !checked && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 5H7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
      )}
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
var MISSING_DOCS = [
  { id: 1, reference: "Maple Leaf Services", date: "17 Mar 2026", amount: "-£450.50", emailBatch: "No Batch", requestedFrom: "Not assigned", bankAccount: "Lloyds Bank - Business Account", hasGreenDot: true },
  { id: 2, reference: "Gas Service Ltd.", date: "17 Mar 2026", amount: "-£324.87", emailBatch: "No Batch", requestedFrom: "Not assigned", bankAccount: "HSBC - Transaction Account", hasGreenDot: true },
  { id: 3, reference: "Thames Water Ltd. A918", date: "16 Mar 2026", amount: "-£987.65", emailBatch: "No Batch", requestedFrom: "Not assigned", bankAccount: "Lloyds Bank - Business Account", hasGreenDot: false },
  { id: 4, reference: "British Gas PLC", date: "15 Mar 2026", amount: "-£432.10", emailBatch: "No Batch", requestedFrom: "Not assigned", bankAccount: "Lloyds Bank - Business Account", hasGreenDot: false },
  { id: 5, reference: "Higland Energy 455GBP", date: "15 Mar 2026", amount: "-£765.00", emailBatch: "No Batch", requestedFrom: "Not assigned", bankAccount: "Barclays - Credit Account", hasGreenDot: false },
  { id: 6, reference: "Maple Leaf Services AVT7710p", date: "14 Mar 2026", amount: "-£320.50", emailBatch: "No Batch", requestedFrom: "Not assigned", bankAccount: "Barclays - Business", hasGreenDot: false },
  { id: 7, reference: "Purity Springs Inc", date: "12 Mar 2026", amount: "-£123.45", emailBatch: "No Batch", requestedFrom: "Not assigned", bankAccount: "Lloyds Bank - Business Account", hasGreenDot: false },
  { id: 8, reference: "Thames Water Ltd. YT773", date: "8 Mar 2026", amount: "-£543.21", emailBatch: "No Batch", requestedFrom: "Not assigned", bankAccount: "HSBC - Transaction Account", hasGreenDot: false },
];

// ── Page component ───────────────────────────────────────────────────────────
function CollectDocumentsPage({ ctx }) {
  var [activeTab, setActiveTab] = useState("missing");
  var [searchQuery, setSearchQuery] = useState("");
  var [selectedRows, setSelectedRows] = useState(new Set());
  var filteredDocs = useMemo(function() {
    if (!searchQuery) return MISSING_DOCS;
    var q = searchQuery.toLowerCase();
    return MISSING_DOCS.filter(function(d) { return d.reference.toLowerCase().includes(q) || d.bankAccount.toLowerCase().includes(q); });
  }, [searchQuery]);

  var allSelected = filteredDocs.length > 0 && selectedRows.size === filteredDocs.length;
  var someSelected = selectedRows.size > 0 && !allSelected;

  var toggleAll = function() {
    if (allSelected) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredDocs.map(function(d) { return d.id; })));
    }
  };
  var toggleRow = function(id) {
    setSelectedRows(function(prev) {
      var next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  var tableColumns = [
    { key: "select", label: (<div style={{ width: "100%", display: "flex", justifyContent: "center" }}><CDCheckbox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} /></div>), width: "48px", render: function(val, row) {
      return (<div style={{ width: "100%", display: "flex", justifyContent: "center" }}><CDCheckbox checked={selectedRows.has(row.id)} onChange={function() { toggleRow(row.id); }} /></div>);
    }},
    { key: "status", label: "Status", width: "76px", render: function() { return (<OpenBadge />); }},
    { key: "reference", label: "Reference", width: "260px", sortable: true, render: function(val, row) {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          {row.hasGreenDot && <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.colorBrandPrimary, flexShrink: 0 }} />}
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{val}</span>
        </div>
      );
    }},
    { key: "date", label: "Date", width: "130px", sortable: true },
    { key: "amount", label: "Amount", width: "120px" },
    { key: "emailBatch", label: "Email batch", width: "130px", sortable: true, render: function(val) {
      return (<span style={{ color: T.colorTextSecondary }}>{val}</span>);
    }},
    { key: "requestedFrom", label: "Requested from", width: "160px", render: function(val) {
      return (<span style={{ color: T.colorTextSecondary }}>{val}</span>);
    }},
    { key: "bankAccount", label: "Bank account", width: "240px", render: function(val) {
      return (<span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{val}</span>);
    }},
    { key: "actions", label: "", width: "80px", render: function() {
      return (
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>
          <button style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "transparent", cursor: "pointer", borderRadius: 6, padding: 0 }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "rgba(0,0,0,0.06)"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "transparent"; }}>
            <CommentIcon />
          </button>
          <button style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "transparent", cursor: "pointer", borderRadius: 6, padding: 0 }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "rgba(0,0,0,0.06)"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "transparent"; }}>
            <DotsIcon />
          </button>
        </div>
      );
    }},
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 32px" }}>

        {/* Page header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 48 }}>
          <h1 style={{ fontSize: 32, fontWeight: 500, color: T.colorTextPrimary, margin: 0, lineHeight: 1.2 }}>Collect documents</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <PrimaryButton onClick={function() {}}>
              <PlusIcon /> Create batch
            </PrimaryButton>
            <IconButton><ClipboardIcon /></IconButton>
            <IconButton><MailIcon /></IconButton>
            <IconButton><GearSmallIcon /></IconButton>
          </div>
        </div>

        {/* Tabs — uses shared DS TabsNavigation */}
        <div style={{ marginTop: 32 }}>
          <TabsNavigation
            tabs={[
              { value: "missing", label: "Missing documents", count: 8 },
              { value: "recurring", label: "Recurring requests", count: 5 },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Table area */}
        <div style={{ marginTop: 0 }}>
          {/* Search + actions row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={function(e) { setSearchQuery(e.target.value); }}
                style={{ border: "none", outline: "none", fontSize: 14, color: T.colorTextPrimary, background: "transparent", width: 200, fontFamily: T.fontFamily }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <SecondaryButton style={{ padding: "6px 12px", height: 32 }}>Export CSV</SecondaryButton>
              <IconButton size={32}><DotsIcon /></IconButton>
            </div>
          </div>

          {/* Filter bar */}
          <div style={{ padding: "12px 0 20px" }}>
            <SecondaryButton style={{ padding: "8px 16px" }}>
              <FilterIcon /> Apply filter
            </SecondaryButton>
          </div>

          {/* Data table — DS component */}
          <DataTable
            columns={tableColumns}
            rows={filteredDocs}
            footerLabel={filteredDocs.length + " missing documents"}
            minWidth={1244}
          />
        </div>
      </div>
    </div>
  );
}

registerPage("Collect documents", {
  render: CollectDocumentsPage,
  keepAlive: true,
});

})();
