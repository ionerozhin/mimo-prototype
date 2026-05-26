// ── Adjustments ─────────────────────────────────────────────────────────────
(function() {

// ═══════════════════════════════════════════════════════════════════════════
// Schedule pages (full-screen overlays)
// ═══════════════════════════════════════════════════════════════════════════

// ── Prepayment Schedule ────────────────────────────────────────────────────
function PrepaymentSchedulePage(_ref) {
  var open = _ref.open, onClose = _ref.onClose;
  if (!open) return null;

  var MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var fmtMonth = function(m, y) { return MONTH_NAMES[m] + " " + String(y).slice(2); };
  var monthKey = function(m, y) { return y * 12 + m; };

  var PUBLISHED_THROUGH = monthKey(2, 2026);
  var SCHEDULED_MONTH   = monthKey(3, 2026);

  var visibleMonths = [];
  for (var y = 2026, m = 0; visibleMonths.length < 12; m++) {
    if (m > 11) { m = 0; y++; }
    visibleMonths.push({ m: m, y: y, key: monthKey(m, y), label: fmtMonth(m, y) });
  }

  var data = [
    {
      id: 1,
      description: "Peel Holdings – warehouse lease",
      period: "Dec 25 - Nov 26",
      status: "Active",
      balanceForward: 8800.00,
      toAllocate: null,
      expenseAccount: "6000 – Rent",
      invoiceDate: "12 Nov 25",
      invoiceAmount: 9600.00,
      entries: (function() {
        var e = {};
        e[monthKey(0, 2026)] = { release: 800.00, status: "published" };
        e[monthKey(1, 2026)] = { release: 800.00, status: "published" };
        e[monthKey(2, 2026)] = { release: 800.00, status: "published" };
        e[monthKey(3, 2026)] = { release: 800.00, status: "scheduled" };
        e[monthKey(4, 2026)] = { release: 800.00, status: "future" };
        e[monthKey(5, 2026)] = { release: 800.00, status: "future" };
        e[monthKey(6, 2026)] = { release: 800.00, status: "future" };
        e[monthKey(7, 2026)] = { release: 800.00, status: "future" };
        e[monthKey(8, 2026)] = { release: 800.00, status: "future" };
        e[monthKey(9, 2026)] = { release: 800.00, status: "future" };
        e[monthKey(10, 2026)] = { release: 800.00, status: "future" };
        return e;
      })(),
    },
    {
      id: 2,
      description: "Hiscox – PI cover FY 25/26",
      period: "Nov 25 - Oct 26",
      status: "Active",
      balanceForward: 3750.00,
      toAllocate: null,
      expenseAccount: "6030 – Insurance",
      invoiceDate: "30 Oct 25",
      invoiceAmount: 4500.00,
      entries: (function() {
        var e = {};
        e[monthKey(0, 2026)] = { release: 375.00, status: "published" };
        e[monthKey(1, 2026)] = { release: 375.00, status: "published" };
        e[monthKey(2, 2026)] = { release: 375.00, status: "published" };
        e[monthKey(3, 2026)] = { release: 375.00, status: "scheduled" };
        e[monthKey(4, 2026)] = { release: 375.00, status: "future" };
        e[monthKey(5, 2026)] = { release: 375.00, status: "future" };
        e[monthKey(6, 2026)] = { release: 375.00, status: "future" };
        e[monthKey(7, 2026)] = { release: 375.00, status: "future" };
        e[monthKey(8, 2026)] = { release: 375.00, status: "future" };
        e[monthKey(9, 2026)] = { release: 375.00, status: "future" };
        return e;
      })(),
    },
    {
      id: 3,
      description: "Microsoft 365 Business",
      period: "Jan 26 - Dec 26",
      status: "Active",
      balanceForward: null,
      toAllocate: null,
      expenseAccount: "6220 – Subscriptions",
      invoiceDate: "15 Dec 25",
      invoiceAmount: 4800.00,
      entries: (function() {
        var e = {};
        e[monthKey(0, 2026)] = { addition: 4800.00, release: 400.00, status: "published" };
        e[monthKey(1, 2026)] = { release: 400.00, status: "published" };
        e[monthKey(2, 2026)] = { release: 400.00, status: "published" };
        e[monthKey(3, 2026)] = { release: 400.00, status: "scheduled" };
        e[monthKey(4, 2026)] = { release: 400.00, status: "future" };
        e[monthKey(5, 2026)] = { release: 400.00, status: "future" };
        e[monthKey(6, 2026)] = { release: 400.00, status: "future" };
        e[monthKey(7, 2026)] = { release: 400.00, status: "future" };
        e[monthKey(8, 2026)] = { release: 400.00, status: "future" };
        e[monthKey(9, 2026)] = { release: 400.00, status: "future" };
        e[monthKey(10, 2026)] = { release: 400.00, status: "future" };
        e[monthKey(11, 2026)] = { release: 400.00, status: "future" };
        return e;
      })(),
    },
    {
      id: 4,
      description: "Zurich – EL policy 26/27",
      period: "Apr 26 - Mar 27",
      status: "Active",
      balanceForward: null,
      toAllocate: null,
      expenseAccount: "6030 – Insurance",
      invoiceDate: "20 Mar 26",
      invoiceAmount: 7200.00,
      entries: (function() {
        var e = {};
        e[monthKey(3, 2026)] = { addition: 7200.00, release: 600.00, status: "scheduled" };
        e[monthKey(4, 2026)] = { release: 600.00, status: "future" };
        e[monthKey(5, 2026)] = { release: 600.00, status: "future" };
        e[monthKey(6, 2026)] = { release: 600.00, status: "future" };
        e[monthKey(7, 2026)] = { release: 600.00, status: "future" };
        e[monthKey(8, 2026)] = { release: 600.00, status: "future" };
        e[monthKey(9, 2026)] = { release: 600.00, status: "future" };
        e[monthKey(10, 2026)] = { release: 600.00, status: "future" };
        e[monthKey(11, 2026)] = { release: 600.00, status: "future" };
        return e;
      })(),
    },
    {
      id: 5,
      description: "Red Havas – marketing retainer",
      period: "Jan 26 - Jun 26",
      status: "Active",
      balanceForward: null,
      toAllocate: null,
      expenseAccount: "6110 – Advertising & marketing",
      invoiceDate: "5 Jan 26",
      invoiceAmount: 6000.00,
      entries: (function() {
        var e = {};
        e[monthKey(0, 2026)] = { addition: 6000.00, release: 1000.00, status: "published" };
        e[monthKey(1, 2026)] = { release: 1000.00, status: "published" };
        e[monthKey(2, 2026)] = { release: 1000.00, status: "published" };
        e[monthKey(3, 2026)] = { release: 1000.00, status: "scheduled" };
        e[monthKey(4, 2026)] = { release: 1000.00, status: "future" };
        e[monthKey(5, 2026)] = { release: 1000.00, status: "future" };
        return e;
      })(),
    },
    {
      id: 6,
      description: "BRC Global Standards certification",
      period: "Jan 26 - Dec 26",
      status: "Active",
      balanceForward: null,
      toAllocate: null,
      expenseAccount: "6220 – Subscriptions",
      invoiceDate: "18 Dec 25",
      invoiceAmount: 1440.00,
      entries: (function() {
        var e = {};
        e[monthKey(0, 2026)] = { addition: 1440.00, release: 120.00, status: "published" };
        e[monthKey(1, 2026)] = { release: 120.00, status: "published" };
        e[monthKey(2, 2026)] = { release: 120.00, status: "published" };
        e[monthKey(3, 2026)] = { release: 120.00, status: "scheduled" };
        e[monthKey(4, 2026)] = { release: 120.00, status: "future" };
        e[monthKey(5, 2026)] = { release: 120.00, status: "future" };
        e[monthKey(6, 2026)] = { release: 120.00, status: "future" };
        e[monthKey(7, 2026)] = { release: 120.00, status: "future" };
        e[monthKey(8, 2026)] = { release: 120.00, status: "future" };
        e[monthKey(9, 2026)] = { release: 120.00, status: "future" };
        e[monthKey(10, 2026)] = { release: 120.00, status: "future" };
        e[monthKey(11, 2026)] = { release: 120.00, status: "future" };
        return e;
      })(),
    },
    {
      id: 7,
      description: "Datto SaaS Protection",
      period: "Apr 26 - Mar 27",
      status: "Active",
      balanceForward: null,
      toAllocate: null,
      expenseAccount: "6220 – Subscriptions",
      invoiceDate: "25 Mar 26",
      invoiceAmount: 960.00,
      entries: (function() {
        var e = {};
        e[monthKey(3, 2026)] = { addition: 960.00, release: 80.00, status: "scheduled" };
        e[monthKey(4, 2026)] = { release: 80.00, status: "future" };
        e[monthKey(5, 2026)] = { release: 80.00, status: "future" };
        e[monthKey(6, 2026)] = { release: 80.00, status: "future" };
        e[monthKey(7, 2026)] = { release: 80.00, status: "future" };
        e[monthKey(8, 2026)] = { release: 80.00, status: "future" };
        e[monthKey(9, 2026)] = { release: 80.00, status: "future" };
        e[monthKey(10, 2026)] = { release: 80.00, status: "future" };
        e[monthKey(11, 2026)] = { release: 80.00, status: "future" };
        return e;
      })(),
    },
    {
      id: 8,
      description: "Regus – hot desk licence",
      period: "Mar 26 - Feb 27",
      status: "Active",
      balanceForward: null,
      toAllocate: null,
      expenseAccount: "6000 – Rent",
      invoiceDate: "22 Feb 26",
      invoiceAmount: 2340.00,
      entries: (function() {
        var e = {};
        e[monthKey(2, 2026)] = { addition: 2340.00, release: 195.00, status: "published" };
        e[monthKey(3, 2026)] = { release: 195.00, status: "scheduled" };
        e[monthKey(4, 2026)] = { release: 195.00, status: "future" };
        e[monthKey(5, 2026)] = { release: 195.00, status: "future" };
        e[monthKey(6, 2026)] = { release: 195.00, status: "future" };
        e[monthKey(7, 2026)] = { release: 195.00, status: "future" };
        e[monthKey(8, 2026)] = { release: 195.00, status: "future" };
        e[monthKey(9, 2026)] = { release: 195.00, status: "future" };
        e[monthKey(10, 2026)] = { release: 195.00, status: "future" };
        e[monthKey(11, 2026)] = { release: 195.00, status: "future" };
        return e;
      })(),
    },
  ];

  var fmtGBP = function(v) {
    if (v == null) return "-";
    var abs = Math.abs(v);
    var str = "£" + abs.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return v < 0 ? "(" + str + ")" : str;
  };
  var fmtRelease = function(v) {
    if (v == null || v === 0) return null;
    var abs = Math.abs(v);
    return "(£" + abs.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ")";
  };
  var fmtAddition = function(v) {
    if (v == null || v === 0) return null;
    return "£" + v.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  var totalReleases = {};
  var totalAdditions = {};
  visibleMonths.forEach(function(vm) {
    var relSum = 0;
    var addSum = 0;
    data.forEach(function(item) {
      var entry = item.entries[vm.key];
      if (entry) {
        if (entry.release) relSum += entry.release;
        if (entry.addition) addSum += entry.addition;
      }
    });
    totalReleases[vm.key] = relSum;
    totalAdditions[vm.key] = addSum;
  });

  var openingBalance = data.reduce(function(sum, item) { return sum + (item.balanceForward || 0); }, 0);
  var closingBalances = {};
  var runningBalance = openingBalance;
  visibleMonths.forEach(function(vm) {
    runningBalance = runningBalance - (totalReleases[vm.key] || 0) + (totalAdditions[vm.key] || 0);
    closingBalances[vm.key] = Math.round(runningBalance * 100) / 100;
  });

  var SortIcon = function() {
    return React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", style: { marginLeft: 4, flexShrink: 0, opacity: 0.45 } },
      React.createElement("path", { d: "M4.5 5.5L7 3L9.5 5.5", stroke: "#757980", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }),
      React.createElement("path", { d: "M4.5 8.5L7 11L9.5 8.5", stroke: "#757980", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" })
    );
  };

  var ClockIcon = function() {
    return React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 13 13", fill: "none", style: { marginLeft: 4, flexShrink: 0 } },
      React.createElement("circle", { cx: "6.5", cy: "6.5", r: "5.5", stroke: "#757980", strokeWidth: "1" }),
      React.createElement("path", { d: "M6.5 3.5V6.5L8.5 8", stroke: "#757980", strokeWidth: "1", strokeLinecap: "round", strokeLinejoin: "round" })
    );
  };

  var PlusIcon = function() {
    return React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 20 20", fill: "none" },
      React.createElement("path", { d: _MM_PATHS.plus, stroke: "currentColor", strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round" })
    );
  };

  var DownloadIcon = function() {
    return React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 20 20", fill: "none" },
      React.createElement("path", { d: _MM_PATHS.download, stroke: "currentColor", strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round" })
    );
  };

  var overlayStyle = {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    background: T.colorSurfacePrimary, zIndex: 310,
    display: "flex", flexDirection: "column", overflow: "hidden",
    fontFamily: T.fontFamily,
  };

  var headerStyle = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "24px 32px 32px 32px", flexShrink: 0,
  };

  var _psBorderClr = "#EFF1F4";

  var toolbarStyle = {
    display: "flex", alignItems: "center", gap: 10,
    padding: "12px 16px", flexShrink: 0, flexWrap: "wrap",
    borderBottom: "1px solid " + _psBorderClr,
  };

  var searchInputStyle = {
    height: 36, padding: "0 12px", border: "1px solid " + T.colorBorderDark,
    borderRadius: 6, fontSize: 14, fontFamily: T.fontFamily,
    outline: "none", width: 220, color: T.colorTextPrimary,
    background: T.colorSurfacePrimary,
  };

  var thStyle = {
    ...T.textSm, fontWeight: 400, color: "#757980",
    padding: "10px 12px", textAlign: "left", whiteSpace: "nowrap",
    borderBottom: "1px solid " + _psBorderClr, borderRight: "1px solid " + _psBorderClr,
    position: "sticky", top: 0,
    background: T.colorSurfacePrimary, zIndex: 2,
  };

  var cellStyle = {
    ...T.textSm, color: T.colorTextPrimary,
    padding: "10px 12px", borderBottom: "1px solid " + _psBorderClr, borderRight: "1px solid " + _psBorderClr,
    whiteSpace: "normal", verticalAlign: "middle",
  };

  var footerCellStyle = {
    ...cellStyle, fontWeight: 600, background: "#FBFBFB", height: 72, verticalAlign: "middle",
  };

  var stickyCol0 = { position: "sticky", left: 0, zIndex: 3, background: T.colorSurfacePrimary, borderRight: "1px solid " + _psBorderClr };
  var stickyCol1Left = 260;
  var stickyCol1 = { position: "sticky", left: stickyCol1Left, zIndex: 3, background: T.colorSurfacePrimary, borderRight: "1px solid " + _psBorderClr, boxShadow: "4px 0 8px -2px rgba(0,0,0,0.1)" };

  var COL_WIDTHS = {
    description: 260, balance: 200, account: 280,
    invoiceDate: 130, invoiceAmount: 160, month: 140,
  };

  var fixedColsWidth = COL_WIDTHS.description + COL_WIDTHS.balance + COL_WIDTHS.account + COL_WIDTHS.invoiceDate + COL_WIDTHS.invoiceAmount;

  var renderMonthCell = function(entry, isFooter) {
    if (!entry) return React.createElement("span", { style: { color: "#B0B3B8" } }, "-");
    var addition = entry.addition, release = entry.release, status = entry.status;
    var isPublished = status === "published";
    var isScheduled = status === "scheduled";
    var bg = isPublished ? T.colorSuccessBg : "transparent";
    var cellContent = [];
    if (addition) {
      cellContent.push(React.createElement("div", { key: "add", style: { ...T.textSm, color: T.colorTextPrimary } }, fmtAddition(addition)));
    }
    if (release) {
      if (isScheduled) {
        cellContent.push(React.createElement(Tooltip, { key: "rel", text: "Scheduled for publishing on 30 April", delay: 800 }, React.createElement("div", { style: { display: "inline-flex", alignItems: "center", background: "#ECECEC", borderRadius: 4, padding: "2px 6px", gap: 2, ...T.textSm, cursor: "default" } }, fmtRelease(release), React.createElement(ClockIcon, null))));
      } else {
        cellContent.push(React.createElement("div", { key: "rel", style: { ...T.textSm, color: T.colorTextPrimary } }, fmtRelease(release)));
      }
    }
    if (cellContent.length === 0) return React.createElement("span", { style: { color: "#B0B3B8" } }, "-");
    return React.createElement("div", { style: { background: bg, borderRadius: bg !== "transparent" ? 4 : 0, padding: bg !== "transparent" ? "2px 6px" : 0, display: "inline-flex", flexDirection: "column", gap: 2 } }, cellContent);
  };

  var ActiveBadge = function() {
    return React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 4, background: T.colorSuccessBg, color: T.colorBrandPrimary, borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 500, lineHeight: "17px" } },
      React.createElement("span", { style: { width: 6, height: 6, borderRadius: 3, background: T.colorBrandPrimary, flexShrink: 0 } }),
      "Active"
    );
  };

  var ToAllocateBadge = function(_ref2) {
    var amount = _ref2.amount;
    return React.createElement("span", { style: { display: "inline-flex", alignItems: "center", width: "fit-content", background: T.colorInfoBg, color: T.colorInfo, borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 500, lineHeight: "17px", whiteSpace: "nowrap" } }, fmtGBP(amount) + " to allocate");
  };

  var _psSearchState = useState("");
  var searchValue = _psSearchState[0], setSearchValue = _psSearchState[1];

  var filteredData = searchValue
    ? data.filter(function(item) { return item.description.toLowerCase().includes(searchValue.toLowerCase()) || item.expenseAccount.toLowerCase().includes(searchValue.toLowerCase()); })
    : data;

  return (
    <div style={overlayStyle}>
      <div style={headerStyle}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 500, color: T.colorTextPrimary, lineHeight: "40px" }}>
          Prepayment schedule
        </h1>
        <SecondaryButton onClick={onClose} style={{ height: 40, padding: "8px 16px", fontSize: 14, gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: 2 }}>
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Close
        </SecondaryButton>
      </div>

      <div style={{ display: "flex", flexDirection: "column", margin: "0 32px 32px 32px", border: "1px solid " + _psBorderClr, borderRadius: 16, overflow: "hidden", flex: "1 1 auto", minHeight: 0 }}>
        <div style={toolbarStyle}>
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={function(e) { setSearchValue(e.target.value); }}
            style={searchInputStyle}
            onFocus={function(e) { e.target.style.borderColor = T.colorBrandPrimary; e.target.style.borderWidth = "2px"; e.target.style.padding = "0 11px"; }}
            onBlur={function(e) { e.target.style.borderColor = T.colorBorderDark; e.target.style.borderWidth = "1px"; e.target.style.padding = "0 12px"; }}
          />
          <div style={{ flex: 1 }} />
          <Dropdown value="jan-dec-2026" options={[{ label: "1 Jan 2026 - 31 Dec 2026", value: "jan-dec-2026" }]} onChange={function(){}} size="sm" width={230} />
          <Dropdown value="all" options={[
            { label: "All expense accounts", value: "all" },
            { label: "6000 – Rent", value: "6000" },
            { label: "6030 – Insurance", value: "6030" },
            { label: "6110 – Advertising & marketing", value: "6110" },
            { label: "6200 – Professional fees", value: "6200" },
            { label: "6220 – Subscriptions", value: "6220" },
          ]} onChange={function(){}} size="sm" width={200} />
          <SecondaryButton style={{ height: 36, padding: "0 12px", fontSize: 14, gap: 6 }}><PlusIcon /> Add prepayment</SecondaryButton>
          <SecondaryButton style={{ height: 36, padding: "0 12px", fontSize: 14, gap: 6 }}><DownloadIcon /> Export</SecondaryButton>
        </div>

        <div style={{ overflowX: "auto", overflowY: "auto", flex: "1 1 auto", minHeight: 0 }}>
        <table style={{ borderCollapse: "separate", borderSpacing: 0, minWidth: fixedColsWidth + visibleMonths.length * COL_WIDTHS.month, width: "100%", tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: COL_WIDTHS.description }} />
            <col style={{ width: COL_WIDTHS.balance }} />
            <col style={{ width: COL_WIDTHS.account }} />
            <col style={{ width: COL_WIDTHS.invoiceDate }} />
            <col style={{ width: COL_WIDTHS.invoiceAmount }} />
            {visibleMonths.map(function(vm) { return <col key={vm.key} style={{ width: COL_WIDTHS.month }} />; })}
          </colgroup>
          <thead>
            <tr>
              <th style={{ ...thStyle, ...stickyCol0, zIndex: 4, width: COL_WIDTHS.description, minWidth: COL_WIDTHS.description }}><div style={{ display: "flex", alignItems: "center" }}>Description <SortIcon /></div></th>
              <th style={{ ...thStyle, ...stickyCol1, zIndex: 4, width: COL_WIDTHS.balance, minWidth: COL_WIDTHS.balance }}><div style={{ display: "flex", alignItems: "center" }}>Balance forward (Dec 25) <SortIcon /></div></th>
              <th style={{ ...thStyle, width: COL_WIDTHS.account, minWidth: COL_WIDTHS.account }}><div style={{ display: "flex", alignItems: "center" }}>Expense account <SortIcon /></div></th>
              <th style={{ ...thStyle, width: COL_WIDTHS.invoiceDate, minWidth: COL_WIDTHS.invoiceDate }}><div style={{ display: "flex", alignItems: "center" }}>Invoice date <SortIcon /></div></th>
              <th style={{ ...thStyle, width: COL_WIDTHS.invoiceAmount, minWidth: COL_WIDTHS.invoiceAmount }}><div style={{ display: "flex", alignItems: "center" }}>Invoice amount <SortIcon /></div></th>
              {visibleMonths.map(function(vm) { return <th key={vm.key} style={{ ...thStyle, width: COL_WIDTHS.month, minWidth: COL_WIDTHS.month, textAlign: "right" }}>{vm.label}</th>; })}
            </tr>
          </thead>
          <tbody>
            {filteredData.map(function(item) {
              return (
                <tr key={item.id} style={{ cursor: "pointer" }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceSecondary; e.currentTarget.querySelectorAll('[data-sticky]').forEach(function(td) { td.style.background = T.colorSurfaceSecondary; }); }}
                  onMouseLeave={function(e) { e.currentTarget.style.background = "transparent"; e.currentTarget.querySelectorAll('[data-sticky]').forEach(function(td) { td.style.background = T.colorSurfacePrimary; }); }}
                >
                  <td data-sticky="1" style={{ ...cellStyle, ...stickyCol0 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <span style={{ fontWeight: 500, color: T.colorTextPrimary }}>{item.description}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ ...T.textXs, color: T.colorTextSecondary }}>{item.period}</span>
                        <ActiveBadge />
                      </div>
                    </div>
                  </td>
                  <td data-sticky="1" style={{ ...cellStyle, ...stickyCol1 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <span>{item.balanceForward != null ? fmtGBP(item.balanceForward) : "-"}</span>
                      {item.toAllocate != null && <ToAllocateBadge amount={item.toAllocate} />}
                    </div>
                  </td>
                  <td style={{ ...cellStyle, color: T.colorTextPrimary }}>{item.expenseAccount}</td>
                  <td style={{ ...cellStyle, color: T.colorTextPrimary }}>{item.invoiceDate}</td>
                  <td style={{ ...cellStyle, color: T.colorTextPrimary, textAlign: "right" }}>{fmtGBP(item.invoiceAmount)}</td>
                  {visibleMonths.map(function(vm) { return <td key={vm.key} style={{ ...cellStyle, textAlign: "right" }}>{renderMonthCell(item.entries[vm.key], false)}</td>; })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td style={{ ...footerCellStyle, ...stickyCol0, background: "#FBFBFB" }} colSpan={1}>Total releases</td>
              <td style={{ ...footerCellStyle, ...stickyCol1, background: "#FBFBFB" }} colSpan={1}></td>
              <td style={{ ...footerCellStyle }} colSpan={3}></td>
              {visibleMonths.map(function(vm) { return <td key={vm.key} style={{ ...footerCellStyle, textAlign: "right" }}>{totalReleases[vm.key] ? fmtRelease(totalReleases[vm.key]) : "-"}</td>; })}
            </tr>
            <tr>
              <td style={{ ...footerCellStyle, ...stickyCol0, background: "#FBFBFB" }} colSpan={1}>Total additions</td>
              <td style={{ ...footerCellStyle, ...stickyCol1, background: "#FBFBFB" }} colSpan={1}></td>
              <td style={{ ...footerCellStyle }} colSpan={3}></td>
              {visibleMonths.map(function(vm) { return <td key={vm.key} style={{ ...footerCellStyle, textAlign: "right" }}>{totalAdditions[vm.key] ? fmtAddition(totalAdditions[vm.key]) : "-"}</td>; })}
            </tr>
            <tr>
              <td style={{ ...footerCellStyle, ...stickyCol0, background: "#FBFBFB" }} colSpan={1}>Closing balance</td>
              <td style={{ ...footerCellStyle, ...stickyCol1, background: "#FBFBFB" }} colSpan={1}></td>
              <td style={{ ...footerCellStyle }} colSpan={3}></td>
              {visibleMonths.map(function(vm) {
                return (
                  <td key={vm.key} style={{ ...footerCellStyle, textAlign: "right" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                      <span>{fmtGBP(closingBalances[vm.key])}</span>
                      {vm.key === monthKey(2, 2026) && (
                        <span style={{ display: "inline-flex", alignItems: "center", width: "fit-content", background: "#ECECEC", borderRadius: 4, padding: "2px 6px", fontSize: 11, fontWeight: 500, color: "#757980", whiteSpace: "nowrap" }}>
                          GL +£125.00
                        </span>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          </tfoot>
        </table>
        </div>
      </div>
    </div>
  );
}


// ── Accrual Schedule ───────────────────────────────────────────────────────
function AccrualSchedulePage({ open, onClose }) {
  if (!open) return null;

  const _asMonthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const _asFmtMonth = (m, y) => _asMonthNames[m] + " " + String(y).slice(2);
  const _asMonthKey = (m, y) => y * 12 + m;

  const _asPublishedThrough = _asMonthKey(2, 2026);
  const _asScheduledMonth   = _asMonthKey(3, 2026);

  const _asVisibleMonths = [];
  for (let y = 2026, m = 0; _asVisibleMonths.length < 12; m++) {
    if (m > 11) { m = 0; y++; }
    _asVisibleMonths.push({ m, y, key: _asMonthKey(m, y), label: _asFmtMonth(m, y) });
  }

  const _asData = [
    { id: 1, description: "Grant Thornton – statutory audit fee", balanceForward: 4500.00, toAllocate: null, expenseAccount: "6200 – Professional fees", invoiceDate: "-", invoiceAmount: null, entries: function() { const e = {}; e[_asMonthKey(0, 2026)] = { reversal: 0, addition: 1500.00, status: "published" }; e[_asMonthKey(1, 2026)] = { reversal: 0, addition: 1500.00, status: "published" }; e[_asMonthKey(2, 2026)] = { reversal: 0, addition: 1500.00, status: "published" }; e[_asMonthKey(3, 2026)] = { reversal: 0, addition: 1500.00, status: "scheduled" }; e[_asMonthKey(4, 2026)] = { reversal: 0, addition: 1500.00, status: "future" }; e[_asMonthKey(5, 2026)] = { reversal: 0, addition: 1500.00, status: "future" }; e[_asMonthKey(6, 2026)] = { reversal: 0, addition: 1500.00, status: "future" }; e[_asMonthKey(7, 2026)] = { reversal: 0, addition: 1500.00, status: "future" }; e[_asMonthKey(8, 2026)] = { reversal: 0, addition: 1500.00, status: "future" }; e[_asMonthKey(9, 2026)] = { reversal: 0, addition: 1500.00, status: "future" }; e[_asMonthKey(10, 2026)] = { reversal: 0, addition: 1500.00, status: "future" }; e[_asMonthKey(11, 2026)] = { reversal: 0, addition: 1500.00, status: "future" }; return e; }(), },
    { id: 2, description: "British Gas – electricity estimate", balanceForward: 2140.00, toAllocate: null, expenseAccount: "6020 – Light, heat & power", invoiceDate: "-", invoiceAmount: null, entries: function() { const e = {}; e[_asMonthKey(0, 2026)] = { reversal: 2140.00, addition: 1400.00, status: "published" }; e[_asMonthKey(1, 2026)] = { reversal: 0, addition: 1400.00, status: "published" }; e[_asMonthKey(2, 2026)] = { reversal: 0, addition: 1400.00, status: "published" }; e[_asMonthKey(3, 2026)] = { reversal: 4200.00, addition: 1450.00, status: "scheduled" }; e[_asMonthKey(4, 2026)] = { reversal: 0, addition: 1450.00, status: "future" }; e[_asMonthKey(5, 2026)] = { reversal: 0, addition: 1450.00, status: "future" }; e[_asMonthKey(6, 2026)] = { reversal: 4350.00, addition: 1500.00, status: "future" }; e[_asMonthKey(7, 2026)] = { reversal: 0, addition: 1500.00, status: "future" }; e[_asMonthKey(8, 2026)] = { reversal: 0, addition: 1500.00, status: "future" }; e[_asMonthKey(9, 2026)] = { reversal: 4500.00, addition: 1550.00, status: "future" }; e[_asMonthKey(10, 2026)] = { reversal: 0, addition: 1550.00, status: "future" }; e[_asMonthKey(11, 2026)] = { reversal: 0, addition: 1550.00, status: "future" }; return e; }(), },
    { id: 3, description: "Thames Water – water rates", balanceForward: 840.00, toAllocate: null, expenseAccount: "6010 – Rates", invoiceDate: "-", invoiceAmount: null, entries: function() { const e = {}; e[_asMonthKey(0, 2026)] = { reversal: 0, addition: 530.00, status: "published" }; e[_asMonthKey(1, 2026)] = { reversal: 0, addition: 530.00, status: "published" }; e[_asMonthKey(2, 2026)] = { reversal: 0, addition: 530.00, status: "published" }; e[_asMonthKey(3, 2026)] = { reversal: 0, addition: 530.00, status: "scheduled" }; e[_asMonthKey(4, 2026)] = { reversal: 0, addition: 530.00, status: "future" }; e[_asMonthKey(5, 2026)] = { reversal: 0, addition: 530.00, status: "future" }; e[_asMonthKey(6, 2026)] = { reversal: 0, addition: 530.00, status: "future" }; e[_asMonthKey(7, 2026)] = { reversal: 0, addition: 530.00, status: "future" }; e[_asMonthKey(8, 2026)] = { reversal: 5080.00, addition: 530.00, status: "future" }; e[_asMonthKey(9, 2026)] = { reversal: 0, addition: 530.00, status: "future" }; e[_asMonthKey(10, 2026)] = { reversal: 0, addition: 530.00, status: "future" }; e[_asMonthKey(11, 2026)] = { reversal: 0, addition: 530.00, status: "future" }; return e; }(), },
    { id: 4, description: "DHL Supply Chain – freight accrual", balanceForward: 0, toAllocate: null, expenseAccount: "5020 – Freight & carriage", invoiceDate: "-", invoiceAmount: null, entries: function() { const e = {}; e[_asMonthKey(0, 2026)] = { reversal: 0, addition: 1550.00, status: "published" }; e[_asMonthKey(1, 2026)] = { reversal: 0, addition: 1550.00, status: "published" }; e[_asMonthKey(2, 2026)] = { reversal: 0, addition: 1550.00, status: "published" }; e[_asMonthKey(3, 2026)] = { reversal: 4650.00, addition: 1550.00, status: "scheduled" }; e[_asMonthKey(4, 2026)] = { reversal: 0, addition: 1550.00, status: "future" }; e[_asMonthKey(5, 2026)] = { reversal: 0, addition: 1550.00, status: "future" }; e[_asMonthKey(6, 2026)] = { reversal: 4650.00, addition: 1550.00, status: "future" }; e[_asMonthKey(7, 2026)] = { reversal: 0, addition: 1550.00, status: "future" }; e[_asMonthKey(8, 2026)] = { reversal: 0, addition: 1550.00, status: "future" }; e[_asMonthKey(9, 2026)] = { reversal: 4650.00, addition: 1550.00, status: "future" }; e[_asMonthKey(10, 2026)] = { reversal: 0, addition: 1550.00, status: "future" }; e[_asMonthKey(11, 2026)] = { reversal: 0, addition: 1550.00, status: "future" }; return e; }(), },
    { id: 5, description: "Vodafone – mobile fleet", balanceForward: 85.00, toAllocate: null, expenseAccount: "6230 – Telephone & internet", invoiceDate: "-", invoiceAmount: null, entries: function() { const e = {}; e[_asMonthKey(0, 2026)] = { reversal: 85.00, addition: 85.00, status: "published" }; e[_asMonthKey(1, 2026)] = { reversal: 85.00, addition: 85.00, status: "published" }; e[_asMonthKey(2, 2026)] = { reversal: 85.00, addition: 85.00, status: "published" }; e[_asMonthKey(3, 2026)] = { reversal: 85.00, addition: 85.00, status: "scheduled" }; e[_asMonthKey(4, 2026)] = { reversal: 85.00, addition: 85.00, status: "future" }; e[_asMonthKey(5, 2026)] = { reversal: 85.00, addition: 85.00, status: "future" }; e[_asMonthKey(6, 2026)] = { reversal: 85.00, addition: 85.00, status: "future" }; e[_asMonthKey(7, 2026)] = { reversal: 85.00, addition: 85.00, status: "future" }; e[_asMonthKey(8, 2026)] = { reversal: 85.00, addition: 85.00, status: "future" }; e[_asMonthKey(9, 2026)] = { reversal: 85.00, addition: 85.00, status: "future" }; e[_asMonthKey(10, 2026)] = { reversal: 85.00, addition: 85.00, status: "future" }; e[_asMonthKey(11, 2026)] = { reversal: 85.00, addition: 85.00, status: "future" }; return e; }(), },
    { id: 6, description: "Aviva – pension contributions", balanceForward: 2160.00, toAllocate: null, expenseAccount: "7003 – Pension costs", invoiceDate: "-", invoiceAmount: null, entries: function() { const e = {}; e[_asMonthKey(0, 2026)] = { reversal: 2160.00, addition: 2160.00, status: "published" }; e[_asMonthKey(1, 2026)] = { reversal: 0, addition: 2160.00, status: "published" }; e[_asMonthKey(2, 2026)] = { reversal: 0, addition: 2160.00, status: "published" }; e[_asMonthKey(3, 2026)] = { reversal: 6480.00, addition: 2160.00, status: "scheduled" }; e[_asMonthKey(4, 2026)] = { reversal: 0, addition: 2160.00, status: "future" }; e[_asMonthKey(5, 2026)] = { reversal: 0, addition: 2160.00, status: "future" }; e[_asMonthKey(6, 2026)] = { reversal: 6480.00, addition: 2160.00, status: "future" }; e[_asMonthKey(7, 2026)] = { reversal: 0, addition: 2160.00, status: "future" }; e[_asMonthKey(8, 2026)] = { reversal: 0, addition: 2160.00, status: "future" }; e[_asMonthKey(9, 2026)] = { reversal: 6480.00, addition: 2160.00, status: "future" }; e[_asMonthKey(10, 2026)] = { reversal: 0, addition: 2160.00, status: "future" }; e[_asMonthKey(11, 2026)] = { reversal: 0, addition: 2160.00, status: "future" }; return e; }(), },
    { id: 7, description: "Clifton & Harrow – legal retainer", balanceForward: 0, toAllocate: null, expenseAccount: "6200 – Professional fees", invoiceDate: "-", invoiceAmount: null, entries: function() { const e = {}; e[_asMonthKey(0, 2026)] = { reversal: 0, addition: 1650.00, status: "published" }; e[_asMonthKey(1, 2026)] = { reversal: 0, addition: 1650.00, status: "published" }; e[_asMonthKey(2, 2026)] = { reversal: 0, addition: 1650.00, status: "published" }; e[_asMonthKey(3, 2026)] = { reversal: 0, addition: 1650.00, status: "scheduled" }; e[_asMonthKey(4, 2026)] = { reversal: 0, addition: 1650.00, status: "future" }; e[_asMonthKey(5, 2026)] = { reversal: 0, addition: 1650.00, status: "future" }; e[_asMonthKey(6, 2026)] = { reversal: 0, addition: 1650.00, status: "future" }; e[_asMonthKey(7, 2026)] = { reversal: 13200.00, addition: 0, status: "future" }; return e; }(), },
    { id: 8, description: "Building maintenance – planned works", balanceForward: 2000.00, toAllocate: null, expenseAccount: "6040 – Repairs & maintenance", invoiceDate: "20 Aug 26", invoiceAmount: 12000.00, entries: function() { const e = {}; e[_asMonthKey(0, 2026)] = { reversal: 0, addition: 800.00, status: "published" }; e[_asMonthKey(1, 2026)] = { reversal: 0, addition: 800.00, status: "published" }; e[_asMonthKey(2, 2026)] = { reversal: 0, addition: 800.00, status: "published" }; e[_asMonthKey(3, 2026)] = { reversal: 0, addition: 800.00, status: "scheduled" }; e[_asMonthKey(4, 2026)] = { reversal: 0, addition: 800.00, status: "future" }; e[_asMonthKey(5, 2026)] = { reversal: 0, addition: 800.00, status: "future" }; e[_asMonthKey(6, 2026)] = { reversal: 6800.00, addition: 800.00, status: "future" }; e[_asMonthKey(7, 2026)] = { reversal: 0, addition: 800.00, status: "future" }; e[_asMonthKey(8, 2026)] = { reversal: 0, addition: 800.00, status: "future" }; e[_asMonthKey(9, 2026)] = { reversal: 0, addition: 800.00, status: "future" }; e[_asMonthKey(10, 2026)] = { reversal: 0, addition: 800.00, status: "future" }; e[_asMonthKey(11, 2026)] = { reversal: 0, addition: 800.00, status: "future" }; return e; }(), },
  ];

  const _asFmtGBP = (v) => { if (v == null) return "-"; const abs = Math.abs(v); const str = "£" + abs.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); return v < 0 ? "(" + str + ")" : str; };
  const _asFmtReversal = (v) => { if (v == null || v === 0) return null; const abs = Math.abs(v); return "(£" + abs.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ")"; };
  const _asFmtAddition = (v) => { if (v == null || v === 0) return null; return "£" + v.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };

  const _asTotalReversals = {}; const _asTotalAdditions = {};
  _asVisibleMonths.forEach(vm => { let revSum = 0; let addSum = 0; _asData.forEach(item => { const entry = item.entries[vm.key]; if (entry) { if (entry.reversal) revSum += entry.reversal; if (entry.addition) addSum += entry.addition; } }); _asTotalReversals[vm.key] = revSum; _asTotalAdditions[vm.key] = addSum; });
  const _asOpeningBalance = _asData.reduce((sum, item) => sum + (item.balanceForward || 0), 0);
  const _asClosingBalances = {}; let _asRunning = _asOpeningBalance;
  _asVisibleMonths.forEach(vm => { _asRunning = _asRunning - (_asTotalReversals[vm.key] || 0) + (_asTotalAdditions[vm.key] || 0); _asClosingBalances[vm.key] = Math.round(_asRunning * 100) / 100; });

  const _asSortIcon = () => (<svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 4, flexShrink: 0, opacity: 0.45 }}><path d="M4.5 5.5L7 3L9.5 5.5" stroke="#757980" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4.5 8.5L7 11L9.5 8.5" stroke="#757980" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
  const _asClockIcon = () => (<svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ marginLeft: 4, flexShrink: 0 }}><circle cx="6.5" cy="6.5" r="5.5" stroke="#757980" strokeWidth="1"/><path d="M6.5 3.5V6.5L8.5 8" stroke="#757980" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>);
  const _asPlusIcon = () => (<svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d={_MM_PATHS.plus} stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>);
  const _asDownloadIcon = () => (<svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d={_MM_PATHS.download} stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>);

  const _asBorderClr = "#EFF1F4";
  const _asThStyle = { ...T.textSm, fontWeight: 400, color: "#757980", padding: "10px 12px", textAlign: "left", whiteSpace: "nowrap", borderBottom: "1px solid " + _asBorderClr, borderRight: "1px solid " + _asBorderClr, position: "sticky", top: 0, background: T.colorSurfacePrimary, zIndex: 2 };
  const _asCellStyle = { ...T.textSm, color: T.colorTextPrimary, padding: "10px 12px", borderBottom: "1px solid " + _asBorderClr, borderRight: "1px solid " + _asBorderClr, whiteSpace: "normal", verticalAlign: "middle" };
  const _asFooterCellStyle = { ..._asCellStyle, fontWeight: 600, background: "#FBFBFB", height: 72, verticalAlign: "middle" };
  const _asStickyCol0 = { position: "sticky", left: 0, zIndex: 3, background: T.colorSurfacePrimary, borderRight: "1px solid " + _asBorderClr };
  const _asStickyCol1Left = 260;
  const _asStickyCol1 = { position: "sticky", left: _asStickyCol1Left, zIndex: 3, background: T.colorSurfacePrimary, borderRight: "1px solid " + _asBorderClr, boxShadow: "4px 0 8px -2px rgba(0,0,0,0.1)" };
  const _asColWidths = { description: 260, balance: 200, account: 280, invoiceDate: 130, invoiceAmount: 160, month: 140 };
  const _asFixedColsWidth = _asColWidths.description + _asColWidths.balance + _asColWidths.account + _asColWidths.invoiceDate + _asColWidths.invoiceAmount;

  const _asRenderMonthCell = (entry, isFooter) => { if (!entry) return <span style={{ color: "#B0B3B8" }}>-</span>; const { addition, reversal, status } = entry; const isPublished = status === "published"; const isScheduled = status === "scheduled"; const bg = isPublished ? T.colorSuccessBg : "transparent"; const cellContent = []; if (reversal) { if (isScheduled) { cellContent.push(<Tooltip key="rev" text="Scheduled for publishing on 30 April" delay={800}><div style={{ display: "inline-flex", alignItems: "center", background: "#ECECEC", borderRadius: 4, padding: "2px 6px", gap: 2, ...T.textSm, cursor: "default" }}>{_asFmtReversal(reversal)}<_asClockIcon /></div></Tooltip>); } else { cellContent.push(<div key="rev" style={{ ...T.textSm, color: T.colorTextPrimary }}>{_asFmtReversal(reversal)}</div>); } } if (addition) { if (isScheduled && !reversal) { cellContent.push(<Tooltip key="add" text="Scheduled for publishing on 30 April" delay={800}><div style={{ display: "inline-flex", alignItems: "center", background: "#ECECEC", borderRadius: 4, padding: "2px 6px", gap: 2, ...T.textSm, cursor: "default" }}>{_asFmtAddition(addition)}<_asClockIcon /></div></Tooltip>); } else { cellContent.push(<div key="add" style={{ ...T.textSm, color: T.colorTextPrimary }}>{_asFmtAddition(addition)}</div>); } } if (cellContent.length === 0) return <span style={{ color: "#B0B3B8" }}>-</span>; return (<div style={{ background: bg, borderRadius: bg !== "transparent" ? 4 : 0, padding: bg !== "transparent" ? "2px 6px" : 0, display: "inline-flex", flexDirection: "column", gap: 2 }}>{cellContent}</div>); };

  const _asActiveBadge = () => (<span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: T.colorSuccessBg, color: T.colorBrandPrimary, borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 500, lineHeight: "17px" }}><span style={{ width: 6, height: 6, borderRadius: 3, background: T.colorBrandPrimary, flexShrink: 0 }} />Active</span>);
  const _asToAllocateBadge = ({ amount }) => (<span style={{ display: "inline-flex", alignItems: "center", width: "fit-content", background: T.colorInfoBg, color: T.colorInfo, borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 500, lineHeight: "17px", whiteSpace: "nowrap" }}>{_asFmtGBP(amount)} to allocate</span>);

  const [_asSearchValue, _asSetSearchValue] = useState("");
  const _asFilteredData = _asSearchValue ? _asData.filter(item => item.description.toLowerCase().includes(_asSearchValue.toLowerCase()) || item.expenseAccount.toLowerCase().includes(_asSearchValue.toLowerCase())) : _asData;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: T.colorSurfacePrimary, zIndex: 310, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: T.fontFamily }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 32px 32px 32px", flexShrink: 0 }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 500, color: T.colorTextPrimary, lineHeight: "40px" }}>Accrual schedule</h1>
        <SecondaryButton onClick={onClose} style={{ height: 40, padding: "8px 16px", fontSize: 14, gap: 8 }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: 2 }}><path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Close</SecondaryButton>
      </div>
      <div style={{ display: "flex", flexDirection: "column", margin: "0 32px 32px 32px", border: "1px solid " + _asBorderClr, borderRadius: 16, overflow: "hidden", flex: "1 1 auto", minHeight: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", flexShrink: 0, flexWrap: "wrap", borderBottom: "1px solid " + _asBorderClr }}>
          <input type="text" placeholder="Search..." value={_asSearchValue} onChange={e => _asSetSearchValue(e.target.value)} style={{ height: 36, padding: "0 12px", border: "1px solid " + T.colorBorderDark, borderRadius: 6, fontSize: 14, fontFamily: T.fontFamily, outline: "none", width: 220, color: T.colorTextPrimary, background: T.colorSurfacePrimary }} onFocus={e => { e.target.style.borderColor = T.colorBrandPrimary; e.target.style.borderWidth = "2px"; e.target.style.padding = "0 11px"; }} onBlur={e => { e.target.style.borderColor = T.colorBorderDark; e.target.style.borderWidth = "1px"; e.target.style.padding = "0 12px"; }} />
          <div style={{ flex: 1 }} />
          <Dropdown value="jan-dec-2026" options={[{ label: "1 Jan 2026 - 31 Dec 2026", value: "jan-dec-2026" }]} onChange={() => {}} size="sm" width={230} />
          <Dropdown value="all" options={[{ label: "All expense accounts", value: "all" },{ label: "6010 – Rates", value: "6010" },{ label: "6020 – Light, heat & power", value: "6020" },{ label: "6040 – Repairs & maintenance", value: "6040" },{ label: "6200 – Professional fees", value: "6200" },{ label: "6210 – Bank charges", value: "6210" },{ label: "6230 – Telephone & internet", value: "6230" },{ label: "7000 – Wages & salaries", value: "7000" },{ label: "7003 – Pension costs", value: "7003" }]} onChange={() => {}} size="sm" width={200} />
          <SecondaryButton style={{ height: 36, padding: "0 12px", fontSize: 14, gap: 6 }}><_asPlusIcon />Add accrual</SecondaryButton>
          <SecondaryButton style={{ height: 36, padding: "0 12px", fontSize: 14, gap: 6 }}><_asDownloadIcon />Export</SecondaryButton>
        </div>
        <div style={{ flex: "1 1 auto", minHeight: 0, overflowX: "auto", overflowY: "auto" }}>
        <table style={{ borderCollapse: "separate", borderSpacing: 0, minWidth: _asFixedColsWidth + _asVisibleMonths.length * _asColWidths.month, width: "100%", tableLayout: "fixed" }}>
          <colgroup><col style={{ width: _asColWidths.description }} /><col style={{ width: _asColWidths.balance }} /><col style={{ width: _asColWidths.account }} /><col style={{ width: _asColWidths.invoiceDate }} /><col style={{ width: _asColWidths.invoiceAmount }} />{_asVisibleMonths.map(vm => (<col key={vm.key} style={{ width: _asColWidths.month }} />))}</colgroup>
          <thead><tr>
            <th style={{ ..._asThStyle, ..._asStickyCol0, zIndex: 4, width: _asColWidths.description, minWidth: _asColWidths.description }}><div style={{ display: "flex", alignItems: "center" }}>Description <_asSortIcon /></div></th>
            <th style={{ ..._asThStyle, ..._asStickyCol1, zIndex: 4, width: _asColWidths.balance, minWidth: _asColWidths.balance }}><div style={{ display: "flex", alignItems: "center" }}>Balance forward (Dec 25) <_asSortIcon /></div></th>
            <th style={{ ..._asThStyle, width: _asColWidths.account, minWidth: _asColWidths.account }}><div style={{ display: "flex", alignItems: "center" }}>Expense account <_asSortIcon /></div></th>
            <th style={{ ..._asThStyle, width: _asColWidths.invoiceDate, minWidth: _asColWidths.invoiceDate }}><div style={{ display: "flex", alignItems: "center" }}>Invoice date <_asSortIcon /></div></th>
            <th style={{ ..._asThStyle, width: _asColWidths.invoiceAmount, minWidth: _asColWidths.invoiceAmount }}><div style={{ display: "flex", alignItems: "center" }}>Invoice amount <_asSortIcon /></div></th>
            {_asVisibleMonths.map(vm => (<th key={vm.key} style={{ ..._asThStyle, width: _asColWidths.month, minWidth: _asColWidths.month, textAlign: "right" }}>{vm.label}</th>))}
          </tr></thead>
          <tbody>{_asFilteredData.map(item => (
            <tr key={item.id} style={{ cursor: "pointer" }} onMouseEnter={e => { e.currentTarget.style.background = T.colorSurfaceSecondary; e.currentTarget.querySelectorAll('[data-sticky]').forEach(td => { td.style.background = T.colorSurfaceSecondary; }); }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.querySelectorAll('[data-sticky]').forEach(td => { td.style.background = T.colorSurfacePrimary; }); }}>
              <td data-sticky="1" style={{ ..._asCellStyle, ..._asStickyCol0 }}><div style={{ display: "flex", flexDirection: "column", gap: 2 }}><span style={{ fontWeight: 500, color: T.colorTextPrimary }}>{item.description}</span><div style={{ display: "flex", alignItems: "center", gap: 6 }}><_asActiveBadge /></div></div></td>
              <td data-sticky="1" style={{ ..._asCellStyle, ..._asStickyCol1 }}><div style={{ display: "flex", flexDirection: "column", gap: 4 }}><span>{item.balanceForward != null ? _asFmtGBP(item.balanceForward) : "-"}</span>{item.toAllocate != null && <_asToAllocateBadge amount={item.toAllocate} />}</div></td>
              <td style={{ ..._asCellStyle, color: T.colorTextPrimary }}>{item.expenseAccount}</td>
              <td style={{ ..._asCellStyle, color: T.colorTextPrimary }}>{item.invoiceDate}</td>
              <td style={{ ..._asCellStyle, color: T.colorTextPrimary, textAlign: "right" }}>{item.invoiceAmount != null ? _asFmtGBP(item.invoiceAmount) : "-"}</td>
              {_asVisibleMonths.map(vm => (<td key={vm.key} style={{ ..._asCellStyle, textAlign: "right" }}>{_asRenderMonthCell(item.entries[vm.key], false)}</td>))}
            </tr>
          ))}</tbody>
          <tfoot>
            <tr><td style={{ ..._asFooterCellStyle, ..._asStickyCol0, background: "#FBFBFB" }} colSpan={1}>Total reversals</td><td style={{ ..._asFooterCellStyle, ..._asStickyCol1, background: "#FBFBFB" }} colSpan={1}></td><td style={{ ..._asFooterCellStyle }} colSpan={3}></td>{_asVisibleMonths.map(vm => (<td key={vm.key} style={{ ..._asFooterCellStyle, textAlign: "right" }}>{_asTotalReversals[vm.key] ? _asFmtReversal(_asTotalReversals[vm.key]) : "-"}</td>))}</tr>
            <tr><td style={{ ..._asFooterCellStyle, ..._asStickyCol0, background: "#FBFBFB" }} colSpan={1}>Total additions</td><td style={{ ..._asFooterCellStyle, ..._asStickyCol1, background: "#FBFBFB" }} colSpan={1}></td><td style={{ ..._asFooterCellStyle }} colSpan={3}></td>{_asVisibleMonths.map(vm => (<td key={vm.key} style={{ ..._asFooterCellStyle, textAlign: "right" }}>{_asTotalAdditions[vm.key] ? _asFmtAddition(_asTotalAdditions[vm.key]) : "-"}</td>))}</tr>
            <tr><td style={{ ..._asFooterCellStyle, ..._asStickyCol0, background: "#FBFBFB" }} colSpan={1}>Closing balance</td><td style={{ ..._asFooterCellStyle, ..._asStickyCol1, background: "#FBFBFB" }} colSpan={1}></td><td style={{ ..._asFooterCellStyle }} colSpan={3}></td>{_asVisibleMonths.map(vm => (<td key={vm.key} style={{ ..._asFooterCellStyle, textAlign: "right" }}><div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}><span>{_asFmtGBP(_asClosingBalances[vm.key])}</span>{vm.key === _asMonthKey(2, 2026) && (<span style={{ display: "inline-flex", alignItems: "center", width: "fit-content", background: "#ECECEC", borderRadius: 4, padding: "2px 6px", fontSize: 11, fontWeight: 500, color: "#757980", whiteSpace: "nowrap" }}>GL +£340.00</span>)}</div></td>))}</tr>
          </tfoot>
        </table>
        </div>
      </div>
    </div>
  );
}


// ── Deferred Revenue Schedule ──────────────────────────────────────────────
function DeferredRevenueSchedulePage({ open, onClose }) {
  if (!open) return null;

  const _drMonthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const _drFmtMonth = (m, y) => _drMonthNames[m] + " " + String(y).slice(2);
  const _drMonthKey = (m, y) => y * 12 + m;
  const _drPublishedThrough = _drMonthKey(2, 2026);
  const _drScheduledMonth   = _drMonthKey(3, 2026);
  const _drVisibleMonths = [];
  for (let y = 2026, m = 0; _drVisibleMonths.length < 12; m++) { if (m > 11) { m = 0; y++; } _drVisibleMonths.push({ m, y, key: _drMonthKey(m, y), label: _drFmtMonth(m, y) }); }

  const _drData = [
    { id: 1, description: "Co-packing contract – Aldi UK", period: "Jul 25 – Jun 26", status: "Active", balanceForward: 18000.00, toAllocate: null, revenueAccount: "4000 – Sales", invoiceDate: "1 Jul 25", invoiceAmount: 36000.00, entries: function() { const e = {}; e[_drMonthKey(0, 2026)] = { recognition: 3000.00, status: "published" }; e[_drMonthKey(1, 2026)] = { recognition: 3000.00, status: "published" }; e[_drMonthKey(2, 2026)] = { recognition: 3000.00, status: "published" }; e[_drMonthKey(3, 2026)] = { recognition: 3000.00, status: "scheduled" }; e[_drMonthKey(4, 2026)] = { recognition: 3000.00, status: "future" }; e[_drMonthKey(5, 2026)] = { recognition: 3000.00, status: "future" }; return e; }(), },
    { id: 2, description: "Seasonal promotional stock – Tesco", period: "Jan 26 – Aug 26", status: "Active", balanceForward: null, toAllocate: null, revenueAccount: "4000 – Sales", invoiceDate: "3 Jan 26", invoiceAmount: 14400.00, entries: function() { const e = {}; e[_drMonthKey(0, 2026)] = { addition: 14400.00, recognition: 1800.00, status: "published" }; e[_drMonthKey(1, 2026)] = { recognition: 1800.00, status: "published" }; e[_drMonthKey(2, 2026)] = { recognition: 1800.00, status: "published" }; e[_drMonthKey(3, 2026)] = { recognition: 1800.00, status: "scheduled" }; e[_drMonthKey(4, 2026)] = { recognition: 1800.00, status: "future" }; e[_drMonthKey(5, 2026)] = { recognition: 1800.00, status: "future" }; e[_drMonthKey(6, 2026)] = { recognition: 1800.00, status: "future" }; e[_drMonthKey(7, 2026)] = { recognition: 1800.00, status: "future" }; return e; }(), },
    { id: 3, description: "Product formulation fee – M&S Food", period: "Feb 26 – Apr 26", status: "Active", balanceForward: null, toAllocate: null, revenueAccount: "4000 – Sales", invoiceDate: "28 Jan 26", invoiceAmount: 3600.00, entries: function() { const e = {}; e[_drMonthKey(1, 2026)] = { addition: 3600.00, recognition: 1200.00, status: "published" }; e[_drMonthKey(2, 2026)] = { recognition: 1200.00, status: "published" }; e[_drMonthKey(3, 2026)] = { recognition: 1200.00, status: "scheduled" }; return e; }(), },
    { id: 4, description: "Warehouse unit B sublease – quarterly advance", period: "Quarterly, ongoing", status: "Active", balanceForward: null, toAllocate: null, revenueAccount: "4200 – Rental income", invoiceDate: "1 Mar 26", invoiceAmount: 3200.00, entries: function() { const e = {}; e[_drMonthKey(2, 2026)] = { addition: 3200.00, recognition: 800.00, status: "published" }; e[_drMonthKey(3, 2026)] = { addition: 3200.00, recognition: 800.00, status: "scheduled" }; e[_drMonthKey(4, 2026)] = { recognition: 800.00, status: "future" }; e[_drMonthKey(5, 2026)] = { addition: 3200.00, recognition: 800.00, status: "future" }; e[_drMonthKey(6, 2026)] = { recognition: 800.00, status: "future" }; e[_drMonthKey(7, 2026)] = { recognition: 800.00, status: "future" }; e[_drMonthKey(8, 2026)] = { addition: 3200.00, recognition: 800.00, status: "future" }; e[_drMonthKey(9, 2026)] = { recognition: 800.00, status: "future" }; e[_drMonthKey(10, 2026)] = { recognition: 800.00, status: "future" }; e[_drMonthKey(11, 2026)] = { addition: 3200.00, recognition: 800.00, status: "future" }; return e; }(), },
  ];

  const _drFmtGBP = (v) => { if (v == null) return "-"; const abs = Math.abs(v); const str = "£" + abs.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); return v < 0 ? "(" + str + ")" : str; };
  const _drFmtRecognition = (v) => { if (v == null || v === 0) return null; const abs = Math.abs(v); return "(£" + abs.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ")"; };
  const _drFmtAddition = (v) => { if (v == null || v === 0) return null; return "£" + v.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };

  const _drTotalRecognitions = {}; const _drTotalAdditions = {};
  _drVisibleMonths.forEach(vm => { let recSum = 0; let addSum = 0; _drData.forEach(item => { const entry = item.entries[vm.key]; if (entry) { if (entry.recognition) recSum += entry.recognition; if (entry.addition) addSum += entry.addition; } }); _drTotalRecognitions[vm.key] = recSum; _drTotalAdditions[vm.key] = addSum; });
  const _drOpeningBalance = _drData.reduce((sum, item) => sum + (item.balanceForward || 0), 0);
  const _drClosingBalances = {}; let _drRunning = _drOpeningBalance;
  _drVisibleMonths.forEach(vm => { _drRunning = _drRunning - (_drTotalRecognitions[vm.key] || 0) + (_drTotalAdditions[vm.key] || 0); _drClosingBalances[vm.key] = Math.round(_drRunning * 100) / 100; });

  const _drSortIcon = () => (<svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 4, flexShrink: 0, opacity: 0.45 }}><path d="M4.5 5.5L7 3L9.5 5.5" stroke="#757980" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4.5 8.5L7 11L9.5 8.5" stroke="#757980" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
  const _drClockIcon = () => (<svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ marginLeft: 4, flexShrink: 0 }}><circle cx="6.5" cy="6.5" r="5.5" stroke="#757980" strokeWidth="1"/><path d="M6.5 3.5V6.5L8.5 8" stroke="#757980" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>);
  const _drPlusIcon = () => (<svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d={_MM_PATHS.plus} stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>);
  const _drDownloadIcon = () => (<svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d={_MM_PATHS.download} stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>);

  const _drBorderClr = "#EFF1F4";
  const _drThStyle = { ...T.textSm, fontWeight: 400, color: "#757980", padding: "10px 12px", textAlign: "left", whiteSpace: "nowrap", borderBottom: "1px solid " + _drBorderClr, borderRight: "1px solid " + _drBorderClr, position: "sticky", top: 0, background: T.colorSurfacePrimary, zIndex: 2 };
  const _drCellStyle = { ...T.textSm, color: T.colorTextPrimary, padding: "10px 12px", borderBottom: "1px solid " + _drBorderClr, borderRight: "1px solid " + _drBorderClr, whiteSpace: "normal", verticalAlign: "middle" };
  const _drFooterCellStyle = { ..._drCellStyle, fontWeight: 600, background: "#FBFBFB", height: 72, verticalAlign: "middle" };
  const _drStickyCol0 = { position: "sticky", left: 0, zIndex: 3, background: T.colorSurfacePrimary, borderRight: "1px solid " + _drBorderClr };
  const _drStickyCol1Left = 260;
  const _drStickyCol1 = { position: "sticky", left: _drStickyCol1Left, zIndex: 3, background: T.colorSurfacePrimary, borderRight: "1px solid " + _drBorderClr, boxShadow: "4px 0 8px -2px rgba(0,0,0,0.1)" };
  const _drColWidths = { description: 260, balance: 200, account: 280, invoiceDate: 130, invoiceAmount: 160, month: 140 };
  const _drFixedColsWidth = _drColWidths.description + _drColWidths.balance + _drColWidths.account + _drColWidths.invoiceDate + _drColWidths.invoiceAmount;

  const _drRenderMonthCell = (entry, isFooter) => { if (!entry) return <span style={{ color: "#B0B3B8" }}>-</span>; const { addition, recognition, status } = entry; const isPublished = status === "published"; const isScheduled = status === "scheduled"; const bg = isPublished ? T.colorSuccessBg : "transparent"; const cellContent = []; if (addition) { cellContent.push(<div key="add" style={{ ...T.textSm, color: T.colorTextPrimary }}>{_drFmtAddition(addition)}</div>); } if (recognition) { if (isScheduled) { cellContent.push(<div key="rec" style={{ display: "inline-flex", alignItems: "center", background: "#ECECEC", borderRadius: 4, padding: "2px 6px", gap: 2, ...T.textSm }}>{_drFmtRecognition(recognition)}<_drClockIcon /></div>); } else { cellContent.push(<div key="rec" style={{ ...T.textSm, color: T.colorTextPrimary }}>{_drFmtRecognition(recognition)}</div>); } } if (cellContent.length === 0) return <span style={{ color: "#B0B3B8" }}>-</span>; return (<div style={{ background: bg, borderRadius: bg !== "transparent" ? 4 : 0, padding: bg !== "transparent" ? "2px 6px" : 0, display: "inline-flex", flexDirection: "column", gap: 2 }}>{cellContent}</div>); };

  const _drActiveBadge = () => (<span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: T.colorSuccessBg, color: T.colorBrandPrimary, borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 500, lineHeight: "17px" }}><span style={{ width: 6, height: 6, borderRadius: 3, background: T.colorBrandPrimary, flexShrink: 0 }} />Active</span>);
  const _drToAllocateBadge = ({ amount }) => (<span style={{ display: "inline-flex", alignItems: "center", width: "fit-content", background: T.colorInfoBg, color: T.colorInfo, borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 500, lineHeight: "17px", whiteSpace: "nowrap" }}>{_drFmtGBP(amount)} to allocate</span>);

  const [_drSearchValue, _drSetSearchValue] = useState("");
  const _drFilteredData = _drSearchValue ? _drData.filter(item => item.description.toLowerCase().includes(_drSearchValue.toLowerCase()) || item.revenueAccount.toLowerCase().includes(_drSearchValue.toLowerCase())) : _drData;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: T.colorSurfacePrimary, zIndex: 310, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: T.fontFamily }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 32px 32px 32px", flexShrink: 0 }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 500, color: T.colorTextPrimary, lineHeight: "40px" }}>Deferred revenue schedule</h1>
        <SecondaryButton onClick={onClose} style={{ height: 40, padding: "8px 16px", fontSize: 14, gap: 8 }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: 2 }}><path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Close</SecondaryButton>
      </div>
      <div style={{ display: "flex", flexDirection: "column", margin: "0 32px 32px 32px", border: "1px solid " + _drBorderClr, borderRadius: 16, overflow: "hidden", flex: "1 1 auto", minHeight: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", flexShrink: 0, flexWrap: "wrap", borderBottom: "1px solid " + _drBorderClr }}>
          <input type="text" placeholder="Search..." value={_drSearchValue} onChange={e => _drSetSearchValue(e.target.value)} style={{ height: 36, padding: "0 12px", border: "1px solid " + T.colorBorderDark, borderRadius: 6, fontSize: 14, fontFamily: T.fontFamily, outline: "none", width: 220, color: T.colorTextPrimary, background: T.colorSurfacePrimary }} onFocus={e => { e.target.style.borderColor = T.colorBrandPrimary; e.target.style.borderWidth = "2px"; e.target.style.padding = "0 11px"; }} onBlur={e => { e.target.style.borderColor = T.colorBorderDark; e.target.style.borderWidth = "1px"; e.target.style.padding = "0 12px"; }} />
          <div style={{ flex: 1 }} />
          <Dropdown value="jan-dec-2026" options={[{ label: "1 Jan 2026 - 31 Dec 2026", value: "jan-dec-2026" }]} onChange={() => {}} size="sm" width={230} />
          <Dropdown value="all" options={[{ label: "All revenue accounts", value: "all" },{ label: "4000 – Sales", value: "4000" },{ label: "4200 – Rental income", value: "4200" }]} onChange={() => {}} size="sm" width={200} />
          <SecondaryButton style={{ height: 36, padding: "0 12px", fontSize: 14, gap: 6 }}><_drPlusIcon />Add deferred revenue</SecondaryButton>
          <SecondaryButton style={{ height: 36, padding: "0 12px", fontSize: 14, gap: 6 }}><_drDownloadIcon />Export</SecondaryButton>
        </div>
        <div style={{ overflowX: "auto", overflowY: "auto", flex: "1 1 auto", minHeight: 0 }}>
        <table style={{ borderCollapse: "separate", borderSpacing: 0, minWidth: _drFixedColsWidth + _drVisibleMonths.length * _drColWidths.month, width: "100%", tableLayout: "fixed" }}>
          <colgroup><col style={{ width: _drColWidths.description }} /><col style={{ width: _drColWidths.balance }} /><col style={{ width: _drColWidths.account }} /><col style={{ width: _drColWidths.invoiceDate }} /><col style={{ width: _drColWidths.invoiceAmount }} />{_drVisibleMonths.map(vm => (<col key={vm.key} style={{ width: _drColWidths.month }} />))}</colgroup>
          <thead><tr>
            <th style={{ ..._drThStyle, ..._drStickyCol0, zIndex: 4, width: _drColWidths.description, minWidth: _drColWidths.description }}><div style={{ display: "flex", alignItems: "center" }}>Description <_drSortIcon /></div></th>
            <th style={{ ..._drThStyle, ..._drStickyCol1, zIndex: 4, width: _drColWidths.balance, minWidth: _drColWidths.balance }}><div style={{ display: "flex", alignItems: "center" }}>Balance forward (Dec 25) <_drSortIcon /></div></th>
            <th style={{ ..._drThStyle, width: _drColWidths.account, minWidth: _drColWidths.account }}><div style={{ display: "flex", alignItems: "center" }}>Revenue account <_drSortIcon /></div></th>
            <th style={{ ..._drThStyle, width: _drColWidths.invoiceDate, minWidth: _drColWidths.invoiceDate }}><div style={{ display: "flex", alignItems: "center" }}>Invoice date <_drSortIcon /></div></th>
            <th style={{ ..._drThStyle, width: _drColWidths.invoiceAmount, minWidth: _drColWidths.invoiceAmount }}><div style={{ display: "flex", alignItems: "center" }}>Invoice amount <_drSortIcon /></div></th>
            {_drVisibleMonths.map(vm => (<th key={vm.key} style={{ ..._drThStyle, width: _drColWidths.month, minWidth: _drColWidths.month, textAlign: "right" }}>{vm.label}</th>))}
          </tr></thead>
          <tbody>{_drFilteredData.map(item => (
            <tr key={item.id} style={{ cursor: "pointer" }} onMouseEnter={e => { e.currentTarget.style.background = T.colorSurfaceSecondary; e.currentTarget.querySelectorAll('[data-sticky]').forEach(td => { td.style.background = T.colorSurfaceSecondary; }); }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.querySelectorAll('[data-sticky]').forEach(td => { td.style.background = T.colorSurfacePrimary; }); }}>
              <td data-sticky="1" style={{ ..._drCellStyle, ..._drStickyCol0 }}><div style={{ display: "flex", flexDirection: "column", gap: 2 }}><span style={{ fontWeight: 500, color: T.colorTextPrimary }}>{item.description}</span><div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ ...T.textXs, color: T.colorTextSecondary }}>{item.period}</span><_drActiveBadge /></div></div></td>
              <td data-sticky="1" style={{ ..._drCellStyle, ..._drStickyCol1 }}><div style={{ display: "flex", flexDirection: "column", gap: 4 }}><span>{item.balanceForward != null ? _drFmtGBP(item.balanceForward) : "-"}</span>{item.toAllocate != null && <_drToAllocateBadge amount={item.toAllocate} />}</div></td>
              <td style={{ ..._drCellStyle, color: T.colorTextPrimary }}>{item.revenueAccount}</td>
              <td style={{ ..._drCellStyle, color: T.colorTextPrimary }}>{item.invoiceDate}</td>
              <td style={{ ..._drCellStyle, color: T.colorTextPrimary, textAlign: "right" }}>{_drFmtGBP(item.invoiceAmount)}</td>
              {_drVisibleMonths.map(vm => (<td key={vm.key} style={{ ..._drCellStyle, textAlign: "right" }}>{_drRenderMonthCell(item.entries[vm.key], false)}</td>))}
            </tr>
          ))}</tbody>
          <tfoot>
            <tr><td style={{ ..._drFooterCellStyle, ..._drStickyCol0, background: "#FBFBFB" }} colSpan={1}>Total recognitions</td><td style={{ ..._drFooterCellStyle, ..._drStickyCol1, background: "#FBFBFB" }} colSpan={1}></td><td style={{ ..._drFooterCellStyle }} colSpan={3}></td>{_drVisibleMonths.map(vm => (<td key={vm.key} style={{ ..._drFooterCellStyle, textAlign: "right" }}>{_drTotalRecognitions[vm.key] ? _drFmtRecognition(_drTotalRecognitions[vm.key]) : "-"}</td>))}</tr>
            <tr><td style={{ ..._drFooterCellStyle, ..._drStickyCol0, background: "#FBFBFB" }} colSpan={1}>Total additions</td><td style={{ ..._drFooterCellStyle, ..._drStickyCol1, background: "#FBFBFB" }} colSpan={1}></td><td style={{ ..._drFooterCellStyle }} colSpan={3}></td>{_drVisibleMonths.map(vm => (<td key={vm.key} style={{ ..._drFooterCellStyle, textAlign: "right" }}>{_drTotalAdditions[vm.key] ? _drFmtAddition(_drTotalAdditions[vm.key]) : "-"}</td>))}</tr>
            <tr><td style={{ ..._drFooterCellStyle, ..._drStickyCol0, background: "#FBFBFB" }} colSpan={1}>Closing balance</td><td style={{ ..._drFooterCellStyle, ..._drStickyCol1, background: "#FBFBFB" }} colSpan={1}></td><td style={{ ..._drFooterCellStyle }} colSpan={3}></td>{_drVisibleMonths.map(vm => (<td key={vm.key} style={{ ..._drFooterCellStyle, textAlign: "right" }}><div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}><span>{_drFmtGBP(_drClosingBalances[vm.key])}</span>{vm.key === _drMonthKey(2, 2026) && (<span style={{ display: "inline-flex", alignItems: "center", width: "fit-content", background: "#ECECEC", borderRadius: 4, padding: "2px 6px", fontSize: 11, fontWeight: 500, color: "#757980", whiteSpace: "nowrap" }}>GL +£340.00</span>)}</div></td>))}</tr>
          </tfoot>
        </table>
        </div>
      </div>
    </div>
  );
}


// ── Accrued Income Schedule ────────────────────────────────────────────────
function AccruedIncomeSchedulePage({ open, onClose }) {
  if (!open) return null;

  const _aiMonthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const _aiFmtMonth = (m, y) => _aiMonthNames[m] + " " + String(y).slice(2);
  const _aiMonthKey = (m, y) => y * 12 + m;
  const _aiPublishedThrough = _aiMonthKey(2, 2026);
  const _aiScheduledMonth   = _aiMonthKey(3, 2026);
  const _aiVisibleMonths = [];
  for (let y = 2026, m = 0; _aiVisibleMonths.length < 12; m++) { if (m > 11) { m = 0; y++; } _aiVisibleMonths.push({ m, y, key: _aiMonthKey(m, y), label: _aiFmtMonth(m, y) }); }

  const _aiData = [
    { id: 1, description: "Unbilled deliveries – Booker Wholesale", period: "Ongoing", status: "Active", balanceForward: 3600.00, toAllocate: null, incomeAccount: "4000 – Sales", invoiceDate: "-", invoiceAmount: null, entries: function() { const e = {}; e[_aiMonthKey(0, 2026)] = { reversal: 3600.00, addition: 1800.00, status: "published" }; e[_aiMonthKey(1, 2026)] = { reversal: 0, addition: 1800.00, status: "published" }; e[_aiMonthKey(2, 2026)] = { reversal: 0, addition: 1800.00, status: "published" }; e[_aiMonthKey(3, 2026)] = { reversal: 0, addition: 1800.00, status: "scheduled" }; e[_aiMonthKey(4, 2026)] = { reversal: 0, addition: 1800.00, status: "future" }; e[_aiMonthKey(5, 2026)] = { reversal: 5400.00, addition: 1800.00, status: "future" }; e[_aiMonthKey(6, 2026)] = { reversal: 0, addition: 1800.00, status: "future" }; e[_aiMonthKey(7, 2026)] = { reversal: 0, addition: 1800.00, status: "future" }; e[_aiMonthKey(8, 2026)] = { reversal: 5400.00, addition: 1800.00, status: "future" }; e[_aiMonthKey(9, 2026)] = { reversal: 0, addition: 1800.00, status: "future" }; e[_aiMonthKey(10, 2026)] = { reversal: 0, addition: 1800.00, status: "future" }; e[_aiMonthKey(11, 2026)] = { reversal: 5400.00, addition: 1800.00, status: "future" }; return e; }(), },
    { id: 2, description: "Sublease rent – Warehouse unit B tenant", period: "Quarterly, ongoing", status: "Active", balanceForward: 1950.00, toAllocate: null, incomeAccount: "4200 – Rental income", invoiceDate: "-", invoiceAmount: null, entries: function() { const e = {}; e[_aiMonthKey(0, 2026)] = { reversal: 1950.00, addition: 650.00, status: "published" }; e[_aiMonthKey(1, 2026)] = { reversal: 0, addition: 650.00, status: "published" }; e[_aiMonthKey(2, 2026)] = { reversal: 0, addition: 650.00, status: "published" }; e[_aiMonthKey(3, 2026)] = { reversal: 1950.00, addition: 650.00, status: "scheduled" }; e[_aiMonthKey(4, 2026)] = { reversal: 0, addition: 650.00, status: "future" }; e[_aiMonthKey(5, 2026)] = { reversal: 0, addition: 650.00, status: "future" }; e[_aiMonthKey(6, 2026)] = { reversal: 1950.00, addition: 650.00, status: "future" }; e[_aiMonthKey(7, 2026)] = { reversal: 0, addition: 650.00, status: "future" }; e[_aiMonthKey(8, 2026)] = { reversal: 0, addition: 650.00, status: "future" }; e[_aiMonthKey(9, 2026)] = { reversal: 1950.00, addition: 650.00, status: "future" }; e[_aiMonthKey(10, 2026)] = { reversal: 0, addition: 650.00, status: "future" }; e[_aiMonthKey(11, 2026)] = { reversal: 0, addition: 650.00, status: "future" }; return e; }(), },
    { id: 3, description: "Interest receivable – HSBC deposit account", period: "Ongoing", status: "Active", balanceForward: 1400.00, toAllocate: null, incomeAccount: "4100 – Other income", invoiceDate: "-", invoiceAmount: null, entries: function() { const e = {}; e[_aiMonthKey(0, 2026)] = { reversal: 0, addition: 420.00, status: "published" }; e[_aiMonthKey(1, 2026)] = { reversal: 0, addition: 420.00, status: "published" }; e[_aiMonthKey(2, 2026)] = { reversal: 0, addition: 420.00, status: "published" }; e[_aiMonthKey(3, 2026)] = { reversal: 0, addition: 420.00, status: "scheduled" }; e[_aiMonthKey(4, 2026)] = { reversal: 0, addition: 420.00, status: "future" }; e[_aiMonthKey(5, 2026)] = { reversal: 0, addition: 420.00, status: "future" }; e[_aiMonthKey(6, 2026)] = { reversal: 0, addition: 420.00, status: "future" }; e[_aiMonthKey(7, 2026)] = { reversal: 0, addition: 420.00, status: "future" }; e[_aiMonthKey(8, 2026)] = { reversal: 0, addition: 420.00, status: "future" }; e[_aiMonthKey(9, 2026)] = { reversal: 0, addition: 420.00, status: "future" }; e[_aiMonthKey(10, 2026)] = { reversal: 0, addition: 420.00, status: "future" }; e[_aiMonthKey(11, 2026)] = { reversal: 0, addition: 420.00, status: "future" }; return e; }(), },
    { id: 4, description: "Innovate UK food innovation grant", period: "Jan 26 – Sep 26", status: "Active", balanceForward: null, toAllocate: null, incomeAccount: "4100 – Other income", invoiceDate: "30 Sep 26", invoiceAmount: 6750.00, entries: function() { const e = {}; e[_aiMonthKey(0, 2026)] = { reversal: 0, addition: 750.00, status: "published" }; e[_aiMonthKey(1, 2026)] = { reversal: 0, addition: 750.00, status: "published" }; e[_aiMonthKey(2, 2026)] = { reversal: 0, addition: 750.00, status: "published" }; e[_aiMonthKey(3, 2026)] = { reversal: 0, addition: 750.00, status: "scheduled" }; e[_aiMonthKey(4, 2026)] = { reversal: 0, addition: 750.00, status: "future" }; e[_aiMonthKey(5, 2026)] = { reversal: 0, addition: 750.00, status: "future" }; e[_aiMonthKey(6, 2026)] = { reversal: 0, addition: 750.00, status: "future" }; e[_aiMonthKey(7, 2026)] = { reversal: 0, addition: 750.00, status: "future" }; e[_aiMonthKey(8, 2026)] = { reversal: 6750.00, addition: 0, status: "future" }; return e; }(), },
  ];

  const _aiFmtGBP = (v) => { if (v == null) return "-"; const abs = Math.abs(v); const str = "£" + abs.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); return v < 0 ? "(" + str + ")" : str; };
  const _aiFmtReversal = (v) => { if (v == null || v === 0) return null; const abs = Math.abs(v); return "(£" + abs.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ")"; };
  const _aiFmtAddition = (v) => { if (v == null || v === 0) return null; return "£" + v.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };

  const _aiTotalReversals = {}; const _aiTotalAdditions = {};
  _aiVisibleMonths.forEach(vm => { let revSum = 0; let addSum = 0; _aiData.forEach(item => { const entry = item.entries[vm.key]; if (entry) { if (entry.reversal) revSum += entry.reversal; if (entry.addition) addSum += entry.addition; } }); _aiTotalReversals[vm.key] = revSum; _aiTotalAdditions[vm.key] = addSum; });
  const _aiOpeningBalance = _aiData.reduce((sum, item) => sum + (item.balanceForward || 0), 0);
  const _aiClosingBalances = {}; let _aiRunning = _aiOpeningBalance;
  _aiVisibleMonths.forEach(vm => { _aiRunning = _aiRunning - (_aiTotalReversals[vm.key] || 0) + (_aiTotalAdditions[vm.key] || 0); _aiClosingBalances[vm.key] = Math.round(_aiRunning * 100) / 100; });

  const _aiSortIcon = () => (<svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 4, flexShrink: 0, opacity: 0.45 }}><path d="M4.5 5.5L7 3L9.5 5.5" stroke="#757980" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4.5 8.5L7 11L9.5 8.5" stroke="#757980" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
  const _aiClockIcon = () => (<svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ marginLeft: 4, flexShrink: 0 }}><circle cx="6.5" cy="6.5" r="5.5" stroke="#757980" strokeWidth="1"/><path d="M6.5 3.5V6.5L8.5 8" stroke="#757980" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>);
  const _aiPlusIcon = () => (<svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d={_MM_PATHS.plus} stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>);
  const _aiDownloadIcon = () => (<svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d={_MM_PATHS.download} stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>);

  const _aiBorderClr = "#EFF1F4";
  const _aiThStyle = { ...T.textSm, fontWeight: 400, color: "#757980", padding: "10px 12px", textAlign: "left", whiteSpace: "nowrap", borderBottom: "1px solid " + _aiBorderClr, borderRight: "1px solid " + _aiBorderClr, position: "sticky", top: 0, background: T.colorSurfacePrimary, zIndex: 2 };
  const _aiCellStyle = { ...T.textSm, color: T.colorTextPrimary, padding: "10px 12px", borderBottom: "1px solid " + _aiBorderClr, borderRight: "1px solid " + _aiBorderClr, whiteSpace: "normal", verticalAlign: "middle" };
  const _aiFooterCellStyle = { ..._aiCellStyle, fontWeight: 600, background: "#FBFBFB", height: 72, verticalAlign: "middle" };
  const _aiStickyCol0 = { position: "sticky", left: 0, zIndex: 3, background: T.colorSurfacePrimary, borderRight: "1px solid " + _aiBorderClr };
  const _aiStickyCol1Left = 260;
  const _aiStickyCol1 = { position: "sticky", left: _aiStickyCol1Left, zIndex: 3, background: T.colorSurfacePrimary, borderRight: "1px solid " + _aiBorderClr, boxShadow: "4px 0 8px -2px rgba(0,0,0,0.1)" };
  const _aiColWidths = { description: 260, balance: 200, account: 280, invoiceDate: 130, invoiceAmount: 160, month: 140 };
  const _aiFixedColsWidth = _aiColWidths.description + _aiColWidths.balance + _aiColWidths.account + _aiColWidths.invoiceDate + _aiColWidths.invoiceAmount;

  const _aiRenderMonthCell = (entry, isFooter) => { if (!entry) return <span style={{ color: "#B0B3B8" }}>-</span>; const { addition, reversal, status } = entry; const isPublished = status === "published"; const isScheduled = status === "scheduled"; const bg = isPublished ? T.colorSuccessBg : "transparent"; const cellContent = []; if (reversal) { if (isScheduled) { cellContent.push(<div key="rev" style={{ display: "inline-flex", alignItems: "center", background: "#ECECEC", borderRadius: 4, padding: "2px 6px", gap: 2, ...T.textSm }}>{_aiFmtReversal(reversal)}<_aiClockIcon /></div>); } else { cellContent.push(<div key="rev" style={{ ...T.textSm, color: T.colorTextPrimary }}>{_aiFmtReversal(reversal)}</div>); } } if (addition) { if (isScheduled && !reversal) { cellContent.push(<div key="add" style={{ display: "inline-flex", alignItems: "center", background: "#ECECEC", borderRadius: 4, padding: "2px 6px", gap: 2, ...T.textSm }}>{_aiFmtAddition(addition)}<_aiClockIcon /></div>); } else { cellContent.push(<div key="add" style={{ ...T.textSm, color: T.colorTextPrimary }}>{_aiFmtAddition(addition)}</div>); } } if (cellContent.length === 0) return <span style={{ color: "#B0B3B8" }}>-</span>; return (<div style={{ background: bg, borderRadius: bg !== "transparent" ? 4 : 0, padding: bg !== "transparent" ? "2px 6px" : 0, display: "inline-flex", flexDirection: "column", gap: 2 }}>{cellContent}</div>); };

  const _aiActiveBadge = () => (<span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: T.colorSuccessBg, color: T.colorBrandPrimary, borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 500, lineHeight: "17px" }}><span style={{ width: 6, height: 6, borderRadius: 3, background: T.colorBrandPrimary, flexShrink: 0 }} />Active</span>);
  const _aiToAllocateBadge = ({ amount }) => (<span style={{ display: "inline-flex", alignItems: "center", width: "fit-content", background: T.colorInfoBg, color: T.colorInfo, borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 500, lineHeight: "17px", whiteSpace: "nowrap" }}>{_aiFmtGBP(amount)} to allocate</span>);

  const [_aiSearchValue, _aiSetSearchValue] = useState("");
  const _aiFilteredData = _aiSearchValue ? _aiData.filter(item => item.description.toLowerCase().includes(_aiSearchValue.toLowerCase()) || item.incomeAccount.toLowerCase().includes(_aiSearchValue.toLowerCase())) : _aiData;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: T.colorSurfacePrimary, zIndex: 310, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: T.fontFamily }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 32px 32px 32px", flexShrink: 0 }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 500, color: T.colorTextPrimary, lineHeight: "40px" }}>Accrued income schedule</h1>
        <SecondaryButton onClick={onClose} style={{ height: 40, padding: "8px 16px", fontSize: 14, gap: 8 }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: 2 }}><path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Close</SecondaryButton>
      </div>
      <div style={{ display: "flex", flexDirection: "column", margin: "0 32px 32px 32px", border: "1px solid " + _aiBorderClr, borderRadius: 16, overflow: "hidden", flex: "1 1 auto", minHeight: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", flexShrink: 0, flexWrap: "wrap", borderBottom: "1px solid " + _aiBorderClr }}>
          <input type="text" placeholder="Search..." value={_aiSearchValue} onChange={e => _aiSetSearchValue(e.target.value)} style={{ height: 36, padding: "0 12px", border: "1px solid " + T.colorBorderDark, borderRadius: 6, fontSize: 14, fontFamily: T.fontFamily, outline: "none", width: 220, color: T.colorTextPrimary, background: T.colorSurfacePrimary }} onFocus={e => { e.target.style.borderColor = T.colorBrandPrimary; e.target.style.borderWidth = "2px"; e.target.style.padding = "0 11px"; }} onBlur={e => { e.target.style.borderColor = T.colorBorderDark; e.target.style.borderWidth = "1px"; e.target.style.padding = "0 12px"; }} />
          <div style={{ flex: 1 }} />
          <Dropdown value="jan-dec-2026" options={[{ label: "1 Jan 2026 - 31 Dec 2026", value: "jan-dec-2026" }]} onChange={() => {}} size="sm" width={230} />
          <Dropdown value="all" options={[{ label: "All income accounts", value: "all" },{ label: "4000 – Sales", value: "4000" },{ label: "4100 – Other income", value: "4100" },{ label: "4200 – Rental income", value: "4200" }]} onChange={() => {}} size="sm" width={220} />
          <SecondaryButton style={{ height: 36, padding: "0 12px", fontSize: 14, gap: 6 }}><_aiPlusIcon />Add accrued income</SecondaryButton>
          <SecondaryButton style={{ height: 36, padding: "0 12px", fontSize: 14, gap: 6 }}><_aiDownloadIcon />Export</SecondaryButton>
        </div>
        <div style={{ overflowX: "auto", overflowY: "auto", flex: "1 1 auto", minHeight: 0 }}>
        <table style={{ borderCollapse: "separate", borderSpacing: 0, minWidth: _aiFixedColsWidth + _aiVisibleMonths.length * _aiColWidths.month, width: "100%", tableLayout: "fixed" }}>
          <colgroup><col style={{ width: _aiColWidths.description }} /><col style={{ width: _aiColWidths.balance }} /><col style={{ width: _aiColWidths.account }} /><col style={{ width: _aiColWidths.invoiceDate }} /><col style={{ width: _aiColWidths.invoiceAmount }} />{_aiVisibleMonths.map(vm => (<col key={vm.key} style={{ width: _aiColWidths.month }} />))}</colgroup>
          <thead><tr>
            <th style={{ ..._aiThStyle, ..._aiStickyCol0, zIndex: 4, width: _aiColWidths.description, minWidth: _aiColWidths.description }}><div style={{ display: "flex", alignItems: "center" }}>Description <_aiSortIcon /></div></th>
            <th style={{ ..._aiThStyle, ..._aiStickyCol1, zIndex: 4, width: _aiColWidths.balance, minWidth: _aiColWidths.balance }}><div style={{ display: "flex", alignItems: "center" }}>Balance forward (Dec 25) <_aiSortIcon /></div></th>
            <th style={{ ..._aiThStyle, width: _aiColWidths.account, minWidth: _aiColWidths.account }}><div style={{ display: "flex", alignItems: "center" }}>Income account <_aiSortIcon /></div></th>
            <th style={{ ..._aiThStyle, width: _aiColWidths.invoiceDate, minWidth: _aiColWidths.invoiceDate }}><div style={{ display: "flex", alignItems: "center" }}>Invoice date <_aiSortIcon /></div></th>
            <th style={{ ..._aiThStyle, width: _aiColWidths.invoiceAmount, minWidth: _aiColWidths.invoiceAmount }}><div style={{ display: "flex", alignItems: "center" }}>Invoice amount <_aiSortIcon /></div></th>
            {_aiVisibleMonths.map(vm => (<th key={vm.key} style={{ ..._aiThStyle, width: _aiColWidths.month, minWidth: _aiColWidths.month, textAlign: "right" }}>{vm.label}</th>))}
          </tr></thead>
          <tbody>{_aiFilteredData.map(item => (
            <tr key={item.id} style={{ cursor: "pointer" }} onMouseEnter={e => { e.currentTarget.style.background = T.colorSurfaceSecondary; e.currentTarget.querySelectorAll('[data-sticky]').forEach(td => { td.style.background = T.colorSurfaceSecondary; }); }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.querySelectorAll('[data-sticky]').forEach(td => { td.style.background = T.colorSurfacePrimary; }); }}>
              <td data-sticky="1" style={{ ..._aiCellStyle, ..._aiStickyCol0 }}><div style={{ display: "flex", flexDirection: "column", gap: 2 }}><span style={{ fontWeight: 500, color: T.colorTextPrimary }}>{item.description}</span><div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ ...T.textXs, color: T.colorTextSecondary }}>{item.period}</span><_aiActiveBadge /></div></div></td>
              <td data-sticky="1" style={{ ..._aiCellStyle, ..._aiStickyCol1 }}><div style={{ display: "flex", flexDirection: "column", gap: 4 }}><span>{item.balanceForward != null ? _aiFmtGBP(item.balanceForward) : "-"}</span>{item.toAllocate != null && <_aiToAllocateBadge amount={item.toAllocate} />}</div></td>
              <td style={{ ..._aiCellStyle, color: T.colorTextPrimary }}>{item.incomeAccount}</td>
              <td style={{ ..._aiCellStyle, color: T.colorTextPrimary }}>{item.invoiceDate}</td>
              <td style={{ ..._aiCellStyle, color: T.colorTextPrimary, textAlign: "right" }}>{item.invoiceAmount != null ? _aiFmtGBP(item.invoiceAmount) : "-"}</td>
              {_aiVisibleMonths.map(vm => (<td key={vm.key} style={{ ..._aiCellStyle, textAlign: "right" }}>{_aiRenderMonthCell(item.entries[vm.key], false)}</td>))}
            </tr>
          ))}</tbody>
          <tfoot>
            <tr><td style={{ ..._aiFooterCellStyle, ..._aiStickyCol0, background: "#FBFBFB" }} colSpan={1}>Total reversals</td><td style={{ ..._aiFooterCellStyle, ..._aiStickyCol1, background: "#FBFBFB" }} colSpan={1}></td><td style={{ ..._aiFooterCellStyle }} colSpan={3}></td>{_aiVisibleMonths.map(vm => (<td key={vm.key} style={{ ..._aiFooterCellStyle, textAlign: "right" }}>{_aiTotalReversals[vm.key] ? _aiFmtReversal(_aiTotalReversals[vm.key]) : "-"}</td>))}</tr>
            <tr><td style={{ ..._aiFooterCellStyle, ..._aiStickyCol0, background: "#FBFBFB" }} colSpan={1}>Total additions</td><td style={{ ..._aiFooterCellStyle, ..._aiStickyCol1, background: "#FBFBFB" }} colSpan={1}></td><td style={{ ..._aiFooterCellStyle }} colSpan={3}></td>{_aiVisibleMonths.map(vm => (<td key={vm.key} style={{ ..._aiFooterCellStyle, textAlign: "right" }}>{_aiTotalAdditions[vm.key] ? _aiFmtAddition(_aiTotalAdditions[vm.key]) : "-"}</td>))}</tr>
            <tr><td style={{ ..._aiFooterCellStyle, ..._aiStickyCol0, background: "#FBFBFB" }} colSpan={1}>Closing balance</td><td style={{ ..._aiFooterCellStyle, ..._aiStickyCol1, background: "#FBFBFB" }} colSpan={1}></td><td style={{ ..._aiFooterCellStyle }} colSpan={3}></td>{_aiVisibleMonths.map(vm => (<td key={vm.key} style={{ ..._aiFooterCellStyle, textAlign: "right" }}><div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}><span>{_aiFmtGBP(_aiClosingBalances[vm.key])}</span>{vm.key === _aiMonthKey(2, 2026) && (<span style={{ display: "inline-flex", alignItems: "center", width: "fit-content", background: "#ECECEC", borderRadius: 4, padding: "2px 6px", fontSize: 11, fontWeight: 500, color: "#757980", whiteSpace: "nowrap" }}>GL +£340.00</span>)}</div></td>))}</tr>
          </tfoot>
        </table>
        </div>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════
// Review flows (full-screen workflow overlays)
// ═══════════════════════════════════════════════════════════════════════════

// ── Prepayment Review Flow ─────────────────────────────────────────────────

var _PR_STEPS = [
  { title: "Reading prepayment schedule",              subtext: null,                                             duration: 900  },
  { title: "Scanning Xero invoices for multi-period costs", subtext: "Reviewed 84 invoices from the last 90 days.", duration: 1300 },
  { title: "Comparing with prior-year prepayments",    subtext: "Matched 9 of 11 prior-year items.",              duration: 1100 },
  { title: "Checking release patterns and balances",   subtext: "Flagged 2 schedules with remaining balances.",   duration: 900  },
  { title: "Generating suggestions",                   subtext: null,                                             duration: 600  },
];

var _PR_CARDS = [
  { idx: 0, key: "insurance", title: "Add Aviva PI renewal to prepayment schedule", contact: "Aviva – professional indemnity insurance", description: "Last year a £14,400.00 professional indemnity premium from Aviva was prepaid over 12 months (£1,200.00/month). The renewal invoice dated 1 November 2025 has been posted to 6030 – Insurance but no prepayment schedule has been set up for the current policy year. The full amount is sitting in the expense account rather than being spread.", tableRow: { account: "1103 – Prepayments", amount: "£12,000.00", period: "12 months from Nov 25", invoice: "INV-AV-2025-1101" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this", drawer: { contact: "Aviva", invoice: "INV-AV-2025-1101.pdf", invoiceDate: "November 2025", aiInsight: "The invoice specifies a service period from 01/11/2025 to 31/10/2026, which extends beyond the invoice date, indicating a prepayment for future services.", adjType: "prepayment_expense", description: "PI renewal – Aviva", amount: "12,000.00", expenseAccount: "6030 – Insurance", invoiceDateField: "01/11/2025" } },
  { idx: 1, key: "saas", title: "Prepay HubSpot annual licence over 12 months", contact: "HubSpot – annual CRM licence", description: "Invoice #HS-28401 for £7,200.00 dated 15 March 2026 covers a 12-month licence from April 2026 to March 2027. The invoice has been posted in full to 6220 – Subscriptions. This should be prepaid and released at £600.00 per month.", tableRow: { account: "1103 – Prepayments", amount: "£7,200.00", period: "12 months from Apr 26", invoice: "HS-28401" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this", drawer: { contact: "HubSpot", invoice: "HS-28401.pdf", invoiceDate: "March 2026", aiInsight: "The invoice covers a 12-month licence from April 2026 to March 2027. The full amount has been posted to subscriptions but should be spread over the licence period.", adjType: "prepayment_expense", description: "Annual CRM licence – HubSpot", amount: "7,200.00", expenseAccount: "6220 – Subscriptions", invoiceDateField: "15/03/2026" } },
  { idx: 2, key: "stale", title: "Write off £0.03 rounding residual for ISS Facility Services", contact: "ISS Facility Services – cleaning contract", description: "The prepayment for ISS Facility Services (cleaning) expired in March 2026 but has a remaining balance of £0.03 on the schedule due to a rounding difference. The final release was posted in March and no further releases are expected. The residual balance should be written off to 6040 – Repairs & maintenance.", tableRow: { account: "6040 – Repairs & maintenance", amount: "£0.03", period: "Apr 2026", invoice: "ISS-2025-0901" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this", drawer: { contact: "ISS Facility Services", invoice: "ISS-2025-0901.pdf", invoiceDate: "September 2025", aiInsight: "The prepayment schedule expired in March 2026 but carries a rounding residual of £0.03. No further releases are expected — this should be written off.", adjType: "prepayment_expense", description: "Cleaning contract – ISS", amount: "0.03", expenseAccount: "6040 – Repairs & maintenance", invoiceDateField: "01/09/2025" } },
  { idx: 3, key: "pattern", title: "Post missed April release for Regus hot desk", contact: "Regus – hot desk licence", description: "The Regus hot desk prepayment has been releasing £195.00 per month since March 2026. However, the April release has not been posted. The schedule shows the entry as scheduled but it was not included in the April close. This may have been missed during the period-end process.", tableRow: { account: "6000 – Rent", amount: "£195.00", period: "Apr 2026", invoice: "REG-HD-2603" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this", drawer: { contact: "Regus", invoice: "REG-HD-2603.pdf", invoiceDate: "March 2026", aiInsight: "The prepayment has been releasing £195.00/month since March 2026, but the April release was not posted during period close.", adjType: "prepayment_expense", description: "Hot desk licence – Regus", amount: "195.00", expenseAccount: "6000 – Rent", invoiceDateField: "01/03/2026" } },
  { idx: 4, key: "duplicate", title: "Reverse duplicate Microsoft 365 prepayment", contact: "Microsoft 365 Business Premium", description: "Two prepayment schedules exist for Microsoft 365 Business Premium: one created in December 2025 (invoice £4,800.00) and another added in January 2026 (invoice £4,800.00) referencing the same subscription. Both are actively releasing £400.00/month to 6220 – Subscriptions, which doubles the monthly expense. A reversing journal should be posted to remove the duplicate schedule and correct the prepayment balance.", tableRow: { account: "6220 – Subscriptions", amount: "–£4,800.00", period: "Apr 2026", invoice: "MS365-2601" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this", drawer: { contact: "Microsoft", invoice: "MS365-2601.pdf", invoiceDate: "January 2026", aiInsight: "Two identical prepayment schedules exist for the same subscription, both actively releasing £400.00/month — this doubles the monthly expense.", adjType: "prepayment_expense", description: "365 Business Premium – Microsoft", amount: "4,800.00", expenseAccount: "6220 – Subscriptions", invoiceDateField: "15/01/2026" } },
];

var _PR_NAV_CATS = [
  { key: "insurance", label: "Missing prepayment",    baseIdx: 0, items: [{ contact: "Aviva PI renewal" }] },
  { key: "saas",      label: "New multi-period invoice", baseIdx: 1, items: [{ contact: "HubSpot annual licence" }] },
  { key: "stale",     label: "Stale balance",          baseIdx: 2, items: [{ contact: "ISS Facility Services" }] },
  { key: "pattern",   label: "Release pattern break",  baseIdx: 3, items: [{ contact: "Regus hot desk" }] },
  { key: "duplicate", label: "Possible duplicate",     baseIdx: 4, items: [{ contact: "Microsoft 365" }] },
];

// ── Prepayment Review Flow ────────────────────────────────────────────────

function PrepaymentReviewFlow(_ref) {
  var onClose = _ref.onClose, selectedPeriod = _ref.selectedPeriod || "April 2026", onStateChange = _ref.onStateChange, savedState = _ref.savedState;
  var _prInitResume = !!(savedState && savedState.hasResults);
  var _prIsResume = useState(_prInitResume), _prSetIsResume = _prIsResume[1]; _prIsResume = _prIsResume[0];
  var _s = useState(_prInitResume ? _PR_STEPS.map(function(){return "done";}) : []); var _prStepStatuses = _s[0], _prSetStepStatuses = _s[1];
  _s = useState(_prInitResume ? _PR_STEPS.map(function(){return true;}) : []); var _prStepSubtexts = _s[0], _prSetStepSubtexts = _s[1];
  _s = useState(_prInitResume ? _PR_STEPS.length : 0); var _prVisibleSteps = _s[0], _prSetVisibleSteps = _s[1];
  _s = useState(_prInitResume); var _prStepsPopulated = _s[0], _prSetStepsPopulated = _s[1];
  _s = useState(_prInitResume); var _prStepsCollapsed = _s[0], _prSetStepsCollapsed = _s[1];
  _s = useState(_prInitResume); var _prResultsVisible = _s[0], _prSetResultsVisible = _s[1];
  _s = useState(_prInitResume); var _prCanvasReady = _s[0], _prSetCanvasReady = _s[1];
  _s = useState(_prInitResume); var _prBoxesOpen = _s[0], _prSetBoxesOpen = _s[1];
  _s = useState(400); var _prChatWidth = _s[0], _prSetChatWidth = _s[1];
  _s = useState(false); var _prIsDragging = _s[0], _prSetIsDragging = _s[1];
  _s = useState(true); var _prIsAtBottom = _s[0], _prSetIsAtBottom = _s[1];
  _s = useState(""); var _prInputValue = _s[0], _prSetInputValue = _s[1];
  _s = useState(_prInitResume ? new Set(savedState.resolvedArray || []) : new Set()); var _prResolvedCards = _s[0], _prSetResolvedCards = _s[1];
  _s = useState(_prInitResume ? new Set(savedState.ignoredArray || []) : new Set()); var _prIgnoredCards = _s[0], _prSetIgnoredCards = _s[1];
  _s = useState(_prInitResume ? (savedState.cardActions || {}) : {}); var _prCardActions = _s[0], _prSetCardActions = _s[1];
  _s = useState(false); var _prAnalysisOpen = _s[0], _prSetAnalysisOpen = _s[1];
  _s = useState(false); var _prPeriodDropOpen = _s[0], _prSetPeriodDropOpen = _s[1];
  _s = useState(selectedPeriod); var _prActivePeriod = _s[0], _prSetActivePeriod = _s[1];
  _s = useState(false); var _prScheduleOpen = _s[0], _prSetScheduleOpen = _s[1];
  _s = useState(0); var _prRestartKey = _s[0], _prSetRestartKey = _s[1];
  _s = useState(null); var _prDrawerCard = _s[0], _prSetDrawerCard = _s[1];
  var _prChatScrollRef  = useRef(null);
  var _prChatEndRef     = useRef(null);
  var _prPeriodDropRef  = useRef(null);

  var _prAllMonths = ["April 2025","May 2025","June 2025","July 2025","August 2025","September 2025","October 2025","November 2025","December 2025","January 2026","February 2026","March 2026","April 2026"];
  var _prCurrentIdx = _prAllMonths.indexOf("April 2026");

  useEffect(function() {
    var handler = function(e) { if (_prPeriodDropRef.current && !_prPeriodDropRef.current.contains(e.target)) _prSetPeriodDropOpen(false); };
    document.addEventListener("mousedown", handler);
    return function() { document.removeEventListener("mousedown", handler); };
  }, []);

  var _prStepsComplete  = _prStepStatuses.length > 0 && _prStepStatuses.every(function(s) { return s === "done"; });
  var _prResolvedCount  = _prResolvedCards.size + _prIgnoredCards.size;
  var _prAllDone        = _prResolvedCount >= _PR_CARDS.length;
  var _prTotalSuggestions = _PR_CARDS.length;

  useEffect(function() {
    if (onStateChange && _prCanvasReady) {
      onStateChange({ resolved: _prResolvedCount, total: _prTotalSuggestions, hasResults: true, resolvedArray: Array.from(_prResolvedCards), ignoredArray: Array.from(_prIgnoredCards), cardActions: _prCardActions });
    }
  }, [_prResolvedCount, _prCanvasReady, _prCardActions]);

  var _prLine1Segments = [
    { text: "I'll review your prepayment schedule for ", bold: false },
    { text: selectedPeriod, bold: true },
    { text: ", cross-reference Xero invoices, and compare against prior-year patterns to surface anything that's missing or needs attention.", bold: false },
  ];
  var _prLine1Full = _prLine1Segments.map(function(s) { return s.text; }).join("");
  var _prTw = useTypewriter(_prLine1Full + (_prRestartKey > 0 ? "​".repeat(_prRestartKey) : ""), 18, _prIsResume);
  var _prLine1Done = _prTw.done;

  useEffect(function() {
    if (!_prLine1Done || _prIsResume) return;
    var REVEAL = 80, timers = [];
    _PR_STEPS.forEach(function(_, i) { timers.push(setTimeout(function() { _prSetVisibleSteps(function(v) { return Math.max(v, i + 1); }); }, i * REVEAL)); });
    timers.push(setTimeout(function() { _prSetStepsPopulated(true); }, (_PR_STEPS.length - 1) * REVEAL + 80));
    return function() { timers.forEach(clearTimeout); };
  }, [_prLine1Done, _prRestartKey]);

  useEffect(function() {
    if (!_prStepsPopulated || _prIsResume) return;
    _prSetStepStatuses(_PR_STEPS.map(function(_, i) { return i === 0 ? "active" : "pending"; }));
    _prSetStepSubtexts(_PR_STEPS.map(function() { return false; }));
    var timers = [], cum = 0;
    _PR_STEPS.forEach(function(step, i) {
      cum += step.duration;
      if (step.subtext) timers.push(setTimeout(function() { _prSetStepSubtexts(function(prev) { var n = prev.slice(); n[i] = true; return n; }); }, cum - 350));
      timers.push(setTimeout(function() { _prSetStepStatuses(function(prev) { var n = prev.slice(); n[i] = "done"; if (i + 1 < _PR_STEPS.length) n[i + 1] = "active"; return n; }); }, cum));
    });
    return function() { timers.forEach(clearTimeout); };
  }, [_prStepsPopulated, _prRestartKey]);

  useEffect(function() {
    if (!_prStepsComplete || _prIsResume) return;
    var t1 = setTimeout(function() { _prSetStepsCollapsed(true); }, 500);
    var t2 = setTimeout(function() { _prSetResultsVisible(true); }, 700);
    return function() { clearTimeout(t1); clearTimeout(t2); };
  }, [_prStepsComplete, _prRestartKey]);

  useEffect(function() {
    if (!_prResultsVisible || _prIsResume) return;
    var t1 = setTimeout(function() { _prSetCanvasReady(true); }, 3200);
    var t2 = setTimeout(function() { _prSetBoxesOpen(true); }, 3800);
    return function() { clearTimeout(t1); clearTimeout(t2); };
  }, [_prResultsVisible, _prRestartKey]);

  useEffect(function() {
    if (_prChatEndRef.current) _prChatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [_prLine1Done, _prStepsComplete, _prCanvasReady]);

  useEffect(function() {
    var el = _prChatScrollRef.current;
    if (!el) return;
    var onScroll = function() { _prSetIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 40); };
    el.addEventListener("scroll", onScroll);
    return function() { el.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(function() {
    var onKey = function(e) { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return function() { window.removeEventListener("keydown", onKey); };
  }, []);

  var _prHandleDragStart = function(e) {
    e.preventDefault(); _prSetIsDragging(true);
    var startX = e.clientX, startW = _prChatWidth;
    var onMove = function(ev) { _prSetChatWidth(Math.max(280, Math.min(700, startW + (ev.clientX - startX)))); };
    var onUp = function() { _prSetIsDragging(false); document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); document.body.style.cursor = ""; document.body.style.userSelect = ""; };
    document.body.style.cursor = "col-resize"; document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove); document.addEventListener("mouseup", onUp);
  };

  var _prHandleRestart = function() {
    _prSetStepStatuses([]); _prSetStepSubtexts([]); _prSetVisibleSteps(0);
    _prSetStepsPopulated(false); _prSetStepsCollapsed(false); _prSetResultsVisible(false);
    _prSetCanvasReady(false); _prSetBoxesOpen(false);
    _prSetResolvedCards(new Set()); _prSetIgnoredCards(new Set()); _prSetCardActions({});
    _prSetAnalysisOpen(false); _prSetIsResume(false);
    _prSetRestartKey(function(k) { return k + 1; });
    if (onStateChange) onStateChange(null);
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 200, display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif", background: T.colorSurfaceContrast }}>
      <style>{`@keyframes _prFadeIn{from{opacity:0}to{opacity:1}} @keyframes _prStepReveal{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} @keyframes _prStepPop{0%{transform:scale(0.8);opacity:0}100%{transform:scale(1);opacity:1}} @keyframes _prTextShimmer{0%{background-position:200% center}100%{background-position:-200% center}}`}</style>

      {/* Top bar */}
      <div style={{ height: 96, background: T.colorSurfacePrimary, borderBottom: `1px solid ${T.colorButtonSecondary}`, display: "flex", alignItems: "center", padding: "0 24px", flexShrink: 0, gap: 16, zIndex: 10, position: "relative" }}>
        <span style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, letterSpacing: "-1px", flexShrink: 0 }}>Prepayments review</span>
        <div ref={_prPeriodDropRef} style={{ position: "relative" }}>
          <button onClick={function() { _prSetPeriodDropOpen(function(o) { return !o; }); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 12px", height: 48, border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" }}>
            <span>{_prActivePeriod}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition: "transform 0.2s ease", transform: _prPeriodDropOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}><path d="M4 6L8 10L12 6" stroke="#080908" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {_prPeriodDropOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 100, minWidth: 260, overflow: "hidden", padding: "6px" }}>
              {_prAllMonths.map(function(p, idx) {
                var isSelected = p === _prActivePeriod;
                var isCompleted = idx < _prCurrentIdx;
                var isInReview = idx === _prCurrentIdx;
                return (
                  <button key={p} onClick={function() { _prSetActivePeriod(p); _prSetPeriodDropOpen(false); }}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, textAlign: "left", padding: "10px 12px", fontSize: 14, color: T.colorTextPrimary, fontWeight: isSelected ? 500 : 400, background: isSelected ? T.colorBorderLight : "transparent", border: "none", cursor: "pointer", borderRadius: 8, boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={function(e) { if (!isSelected) e.currentTarget.style.background = T.colorSurfaceSecondary; }}
                    onMouseLeave={function(e) { if (!isSelected) e.currentTarget.style.background = isSelected ? T.colorBorderLight : "transparent"; }}>
                    <span>{p}</span>
                    {isCompleted && <span style={{ fontSize: 12, fontWeight: 500, color: T.colorBrandPrimary, background: T.colorBrandLighter, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>Completed</span>}
                    {isInReview && <span style={{ fontSize: 12, fontWeight: 500, color: T.colorWarning, background: T.colorWarningBg, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>In review</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div style={{ flex: 1 }} />
        {_prCanvasReady && (
          <button onClick={function() { _prSetBoxesOpen(function(o) { return !o; }); }}
            style={{ display: "flex", alignItems: "center", gap: 0, marginRight: 8, cursor: "pointer", fontFamily: "inherit", border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, background: T.colorSurfacePrimary, height: 48, minWidth: 48, padding: _prBoxesOpen ? 0 : "0 12px 0 0", overflow: "hidden", justifyContent: "center", flexShrink: 0, transition: "padding 0.35s cubic-bezier(0.16,1,0.3,1), background 0.15s" }}
            onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceTertiary; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; }}>
            <div style={{ maxWidth: _prBoxesOpen ? 0 : 200, opacity: _prBoxesOpen ? 0 : 1, overflow: "hidden", transition: "max-width 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s", display: "flex", flexDirection: "column", gap: 4, paddingLeft: _prBoxesOpen ? 0 : 12, paddingRight: _prBoxesOpen ? 0 : 10 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextThird, whiteSpace: "nowrap" }}>Suggestions</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: T.colorTextPrimary, whiteSpace: "nowrap" }}>{_prResolvedCount}/{_prTotalSuggestions}</span>
              </div>
              <div style={{ height: 2, background: T.colorBorderDark, borderRadius: 1, overflow: "hidden" }}>
                <div style={{ height: "100%", width: Math.round((_prResolvedCount / _prTotalSuggestions) * 100) + "%", background: T.colorBrandPrimary, borderRadius: 1, transition: "width 0.4s ease" }} />
              </div>
            </div>
            {_prBoxesOpen
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M21 21V3M3 12H17M17 12L10 5M17 12L10 19" stroke={T.colorTextHeading} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M15 21L15 3M16.2 21H7.8C6.12 21 5.28 21 4.64 20.673C4.07 20.385 3.61 19.927 3.33 19.362C3 18.72 3 17.88 3 16.2V7.8C3 6.12 3 5.28 3.33 4.638C3.61 4.074 4.07 3.615 4.64 3.327C5.28 3 6.12 3 7.8 3H16.2C17.88 3 18.72 3 19.362 3.327C19.927 3.615 20.385 4.074 20.673 4.638C21 5.28 21 6.12 21 7.8V16.2C21 17.88 21 18.72 20.673 19.362C20.385 19.927 19.927 20.385 19.362 20.673C18.72 21 17.88 21 16.2 21Z" stroke={T.colorTextHeading} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            }
          </button>
        )}
        <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none"><rect width="30" height="30" rx="15" fill="#F5F5F5"/><path d="M20 10L10 20M10 10L20 20" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Content */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative", padding: 16 }}>
        {/* Left chat panel */}
        <div style={{ display: "flex", flexDirection: "column", width: _prResultsVisible ? _prChatWidth : "100%", flexShrink: 0, transition: _prIsDragging ? "none" : "width 0.72s cubic-bezier(0.16,1,0.3,1)", overflow: "hidden", willChange: "width", position: "relative", zIndex: 1 }}>
          {_prResultsVisible && (
            <button onClick={function() { _prChatScrollRef.current && _prChatScrollRef.current.scrollTo({ top: _prChatScrollRef.current.scrollHeight, behavior: "smooth" }); }}
              style={{ position: "absolute", bottom: 218, left: "50%", transform: "translateX(-50%)", zIndex: 10, width: 32, height: 32, borderRadius: "50%", background: T.colorSurfacePrimary, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)", opacity: _prIsAtBottom ? 0 : 1, pointerEvents: _prIsAtBottom ? "none" : "auto", transition: "opacity 0.35s ease" }}
              onMouseEnter={function(e) { e.currentTarget.style.background = T.colorBorderLight; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}
          <div style={{ flex: 1, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
            <div ref={_prChatScrollRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", scrollBehavior: "smooth" }}>
              {_prResultsVisible && <div style={{ position: "sticky", top: 0, height: 40, marginBottom: -40, background: "linear-gradient(to bottom, rgba(251,251,251,1) 0%, rgba(251,251,251,0) 100%)", zIndex: 2, pointerEvents: "none", flexShrink: 0 }} />}
              <div style={{ maxWidth: 680, width: "100%", margin: "0 auto", padding: _prResultsVisible ? "24px 24px 100px" : "24px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", width: _prResultsVisible ? "90%" : "70%", marginBottom: 20 }}>
                  <p style={{ margin: 0 }}><StreamingMessage segments={_prLine1Segments} speed={18} instant={_prIsResume} key={_prIsResume ? "resume-intro" : "fresh-intro-" + _prRestartKey} /></p>
                </div>
                {_prStepsPopulated && _prStepStatuses.length > 0 && (
                  <div style={{ animation: "_prFadeIn 0.3s ease both" }}>
                    <button onClick={function() { _prSetStepsCollapsed(function(c) { return !c; }); }}
                      style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: _prStepsCollapsed ? 0 : 20, cursor: "pointer", background: "none", border: "none", padding: 0, width: "100%", textAlign: "left" }}>
                      <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 15, fontWeight: 600, color: T.colorTextPrimary }}>Prepayments review</span>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: "transform 0.2s ease", transform: _prStepsCollapsed ? "rotate(180deg)" : "rotate(0deg)" }}><path d="M3 8.5L7 4.5L11 8.5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <span style={{ fontSize: 13, color: T.colorTextSecondary }}>{_prStepsComplete ? "Completed" : "In progress"}</span>
                      </div>
                    </button>
                    {!_prStepsCollapsed && _PR_STEPS.map(function(step, i) {
                      if (i >= _prVisibleSteps) return null;
                      var status = _prStepStatuses[i] || "pending";
                      var isLast = i === _PR_STEPS.length - 1;
                      return (
                        <div key={i} style={{ display: "flex", gap: 16, animation: "_prStepReveal 0.4s cubic-bezier(0.16,1,0.3,1) both" }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 2, overflow: "visible" }}>
                            <div style={{ width: 20, height: 20, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "visible" }}>
                              {status === "done" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: "_prStepPop 0.35s cubic-bezier(0.34,1.4,0.64,1) both" }}><circle cx="10" cy="10" r="10" fill={T.colorBrandPrimary}/><path d="M5.5 10.5L8.5 13.5L14.5 7" stroke={T.colorSurfacePrimary} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                              {status === "active" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: "spin 0.75s linear infinite" }}><path d="M10 2A8 8 0 1 1 2 10" stroke={T.colorBrandPrimary} strokeWidth="1.5" strokeLinecap="round"/></svg>}
                              {status === "pending" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9.25" stroke={T.colorBorderDark} strokeWidth="1.5"/></svg>}
                            </div>
                            {!isLast && i + 1 < _prVisibleSteps && <div style={{ width: 1, flexGrow: 1, minHeight: 20, background: T.colorBorderDark, margin: "4px 0" }} />}
                          </div>
                          <div style={{ paddingBottom: isLast ? 0 : 20 }}>
                            <div style={{ fontSize: 14, lineHeight: "24px", color: status === "pending" ? T.colorBorderInput : T.colorTextPrimary, transition: "color 0.3s ease" }}>{step.title}</div>
                            {(_prStepSubtexts[i] || status === "done") && step.subtext && <div style={{ fontSize: 13, color: T.colorTextSecondary, marginTop: 2, lineHeight: "18px", animation: "_prFadeIn 0.3s ease" }}>{step.subtext}</div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {_prCanvasReady && (
                  <div style={{ animation: _prIsResume ? "none" : "_prFadeIn 0.4s ease 0.2s both", marginTop: 20, fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                    <p style={{ margin: 0 }}>
                      <StreamingMessage segments={[
                        { text: "I've found ", bold: false },
                        { text: "5 items", bold: true },
                        { text: " that need attention – including a missing prior-year prepayment, a new multi-period invoice, and a schedule with a stale balance. Review each suggestion and take action or skip.", bold: false },
                      ]} speed={18} instant={_prIsResume} key={_prIsResume ? "resume" : "fresh"} />
                    </p>
                  </div>
                )}
                <div ref={_prChatEndRef} />
              </div>
            </div>
          </div>
          {!_prStepsComplete && _prLine1Done && !_prIsResume && (
            <div style={{ padding: "0 24px 20px", flexShrink: 0 }}>
              <div style={{ maxWidth: 680, margin: "0 auto" }}>
                <div style={{ borderRadius: 8, padding: "14px 14px 12px", background: T.colorSurfacePrimary, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px " + T.colorBorderDark }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ fontSize: 14, lineHeight: "22px", flex: 1 }}>
                      <span style={{ background: "linear-gradient(90deg, #9D9D9E 0%, #9D9D9E 30%, #2A2A2A 50%, #9D9D9E 70%, " + T.colorTextDisabled + " 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "_prTextShimmer 2s linear infinite", display: "inline-block" }}>Reviewing prepayments...</span>
                    </div>
                    <button style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 36, padding: "0 10px", border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 13, fontWeight: 500, color: T.colorTextPrimary, flexShrink: 0, boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}
                      onMouseEnter={function(e) { e.currentTarget.style.background = T.colorBorderLight; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" rx="1.5" stroke="#080908" strokeWidth="1.25" /></svg>
                      Stop
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {_prCanvasReady && (
            <div style={{ padding: "60px 12px 16px", flexShrink: 0, background: "linear-gradient(to bottom, rgba(251,251,251,0) 0%, rgba(251,251,251,1) 60px)", marginTop: -60 }}>
              <div style={{ maxWidth: 680, margin: "0 auto" }}>
                <button onClick={_prHandleRestart} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, height: 40, padding: "0 16px", marginBottom: 10, border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceSecondary; e.currentTarget.style.borderColor = T.colorBorderHover; }}
                  onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; e.currentTarget.style.borderColor = T.colorBorderDark; }}>
                  <PlayCircleIcon color={T.colorTextPrimary} size={20} />
                  Restart review
                </button>
                <div style={{ borderRadius: 8, padding: "14px 14px 12px", background: T.colorSurfacePrimary, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px " + T.colorBorderDark }}>
                  <textarea value={_prInputValue} onChange={function(e) { _prSetInputValue(e.target.value); }} placeholder="Ask for changes or information..." rows={3}
                    style={{ width: "100%", border: "none", outline: "none", resize: "none", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", background: "transparent", fontFamily: "'Inter', sans-serif", display: "block" }} />
                  <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                    <button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: T.colorTextSecondary, padding: 0 }}
                      onMouseEnter={function(e) { e.currentTarget.style.background = T.colorBorderLight; }} onMouseLeave={function(e) { e.currentTarget.style.background = "none"; }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15.5 8.5L8.5 15.5C7.12 16.88 4.88 16.88 3.5 15.5C2.12 14.12 2.12 11.88 3.5 10.5L10.5 3.5C11.33 2.67 12.67 2.67 13.5 3.5C14.33 4.33 14.33 5.67 13.5 6.5L6.5 13.5C6.08 13.92 5.42 13.92 5 13.5C4.58 13.08 4.58 12.42 5 12L11.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <div style={{ flex: 1 }} />
                    <button style={{ width: 36, height: 36, marginLeft: 6, border: "1px solid " + T.colorBorderDark, borderRadius: 10, background: _prInputValue.trim() ? T.colorBrandPrimary : T.colorSurfaceSecondary, cursor: _prInputValue.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s", padding: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M9.99984 15.8346V4.16797M9.99984 4.16797L4.1665 10.0013M9.99984 4.16797L15.8332 10.0013" stroke={_prInputValue.trim() ? "#FFFFFF" : "#8C8C8B"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {_prResultsVisible && (
          <div onMouseDown={_prHandleDragStart} style={{ position: "absolute", top: 0, bottom: 0, left: _prChatWidth + 16, width: 16, cursor: "col-resize", zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 4, height: 40, borderRadius: 2, background: _prIsDragging ? T.colorBorderHover : "transparent", transition: "background 0.15s" }} />
          </div>
        )}
        <div style={{ position: "absolute", top: 16, bottom: 16, left: _prChatWidth + 32, right: _prBoxesOpen ? 432 : 16, background: T.colorSurfacePrimary, borderRadius: 8, border: "1px solid " + T.colorButtonSecondary, overflow: "hidden", zIndex: 2, transform: _prResultsVisible ? "none" : "translateX(calc(100% + 32px))", transition: _prIsDragging ? "none" : "transform 0.72s cubic-bezier(0.16,1,0.3,1), right 0.35s cubic-bezier(0.16,1,0.3,1)", willChange: _prResultsVisible ? "auto" : "transform" }}>
          {_prCanvasReady ? (
            <div style={{ animation: "_prFadeIn 0.4s ease 0.1s both", height: "100%", overflowY: "auto" }}>
              <div style={{ padding: "48px 48px 48px", maxWidth: 800, margin: "0 auto" }}>
                <h2 style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, margin: "0 0 20px" }}>Results</h2>
                {(function() {
                  var _prGlImpacts = { 2: 145.20, 3: 195.00, 4: 4800.00 };
                  var _prGlInitial = -5140.20;
                  var _prResImpact = Array.from(_prResolvedCards).reduce(function(s, i) { return s + (_prGlImpacts[i] || 0); }, 0);
                  var _prClosingDiff = _prGlInitial + _prResImpact;
                  var _prOpeningMimo = 22615.00;
                  var _prOpeningXero = 22615.00;
                  var _prOpeningDiff = 0;
                  var _prClosingMimo = 23400.00;
                  var _prClosingXero = _prClosingMimo - _prClosingDiff;
                  var _fmt = function(v) { return (v < 0 ? "–" : "") + "£" + Math.abs(v).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
                  var _diffCell = function(v) {
                    if (Math.abs(v) < 0.01) return _fmt(0);
                    return React.createElement("span", { style: { fontWeight: 600, color: T.colorTextPrimary } }, _fmt(v));
                  };
                  return React.createElement("div", { style: { marginBottom: 12 } },
                    React.createElement(DataTable, {
                      columns: [{ key: "description", label: "Description", width: "1fr" }, { key: "value", label: "Amount", width: "160px", align: "right" }],
                      rows: [
                        { description: "Opening balance per Mimo", value: _fmt(_prOpeningMimo) },
                        { description: "Opening balance per Xero", value: _fmt(_prOpeningXero) },
                        { description: "Opening balance difference", value: _diffCell(_prOpeningDiff) },
                        { description: "Additions", value: "£4,560.00" },
                        { description: "Releases", value: "(£3,775.00)" },
                        { description: "Closing balance per Mimo", value: _fmt(_prClosingMimo) },
                        { description: "Closing balance per Xero", value: _fmt(_prClosingXero) },
                        { description: "Closing balance difference", value: _diffCell(_prClosingDiff) },
                      ]
                    })
                  );
                })()}
                <div style={{ background: T.colorSurfacePrimary, border: "1px solid " + T.colorButtonSecondary, borderRadius: 8, marginBottom: 28, overflow: "hidden" }}>
                  <div onClick={function() { _prSetAnalysisOpen(function(o) { return !o; }); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 67, padding: "0 20px", cursor: "pointer" }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>Analysis & key findings</span>
                    <div style={{ display: "flex", transform: _prAnalysisOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)", flexShrink: 0, marginLeft: 12 }}><ChevronUpIcon /></div>
                  </div>
                  <div style={{ overflow: "hidden", maxHeight: _prAnalysisOpen ? 400 : 0, opacity: _prAnalysisOpen ? 1 : 0, transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease" }}>
                    <div style={{ fontSize: 14, color: T.colorTextBody, lineHeight: "20px", margin: "0 20px 16px", borderTop: "1px solid " + T.colorBorderSubtle, paddingTop: 14 }}>
                      <p style={{ margin: "0 0 10px" }}>The prepayment review for {selectedPeriod} cross-referenced your current schedule against 84 Xero invoices and 11 prior-year prepayment items.</p>
                      <p style={{ margin: "0 0 10px" }}>The most significant finding is a £14,400.00 Aviva professional indemnity renewal that was prepaid last year but has no corresponding schedule this year. The full amount has been expensed in November rather than spread over the policy period.</p>
                      <p style={{ margin: "0 0 10px" }}>A new HubSpot annual licence (£7,200.00) has been posted in full to software subscriptions and should be prepaid. One expired schedule (ISS cleaning) carries a residual £145.20 balance that needs writing off. The Regus hot desk release for April appears to have been missed during period close.</p>
                      <p style={{ margin: 0 }}>A possible duplicate schedule was also detected for Microsoft 365, where two identical £4,800.00 entries are both actively releasing – doubling the monthly software expense.</p>
                    </div>
                  </div>
                </div>
                <hr style={{ border: "none", borderTop: "1px solid " + T.colorBorderDark, margin: "32px 0 40px" }} />
                <h3 style={{ fontSize: 20, fontWeight: 500, color: T.colorTextPrimary, margin: "0 0 16px" }}>Suggestions</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {_PR_CARDS.map(function(card) {
                    var isResolved = _prResolvedCards.has(card.idx);
                    var isIgnored  = _prIgnoredCards.has(card.idx);
                    var actionLabel = _prCardActions[card.idx];
                    var statusLabel = isResolved ? (actionLabel || "Journal posted") : isIgnored ? (actionLabel || "Resolved") : "Unresolved";
                    var statusStyle = isResolved ? { background: T.colorBrandLighter, border: "none", color: T.colorBrandPrimary } : isIgnored ? { background: T.colorButtonDisabled, border: "none", color: T.colorTextSecondary } : { background: T.colorWarningBg, border: "none", color: T.colorWarning };
                    var primaryActionLabels = { "Review suggestion": "Journal posted" };
                    return (
                      <div key={card.idx} id={"result-" + card.key + "-0"} style={{ scrollMarginTop: 64 }}>
                        <RecommendationCard title={card.title} description={card.description} statusLabel={statusLabel} statusStyle={statusStyle}
                          collapsed={isResolved || isIgnored} isIgnored={isIgnored} hideMore={true} tableRow={card.tableRow}
                          tableColumns={[{ key: "account", label: "Account", width: "1.4fr" }, { key: "amount", label: "Amount", width: "0.8fr" }, { key: "period", label: "Period", width: "0.8fr" }, { key: "invoice", label: "Invoice", width: "0.8fr" }]}
                          primaryLabel={card.primaryLabel} secondaryLabel={card.secondaryLabel}
                          onPrimaryAction={function() { _prSetDrawerCard(card); }}
                          onIgnore={function() { _prSetIgnoredCards(function(prev) { return new Set([].concat(Array.from(prev), [card.idx])); }); }}
                          onSecondaryAction={function() { _prSetResolvedCards(function(prev) { return new Set([].concat(Array.from(prev), [card.idx])); }); _prSetCardActions(function(prev) { var o = Object.assign({}, prev); o[card.idx] = "Resolved"; return o; }); }}
                          onMore={function() {}} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : _prResultsVisible ? <CanvasLoader /> : null}
        </div>
        {_prCanvasReady && (
          <div style={{ position: "absolute", top: 16, bottom: 16, right: 16, width: 400, zIndex: 3, transform: _prBoxesOpen ? "translateX(0)" : "translateX(calc(100% + 32px))", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)", pointerEvents: _prBoxesOpen ? "auto" : "none", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: T.colorSurfacePrimary, borderRadius: 8, border: "1px solid " + T.colorButtonSecondary, overflow: "hidden", flexShrink: 0 }}>
              <div style={{ padding: "18px 20px" }}><span style={{ fontSize: 16, fontWeight: 500, color: T.colorTextPrimary }}>Linked sources</span></div>
              <div style={{ borderTop: "1px solid " + T.colorSurfaceActive, padding: "12px 10px 16px" }}>
                <button onClick={function() { _prSetScheduleOpen(true); }}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", border: "none", background: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit", borderRadius: 6 }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceTertiary; }} onMouseLeave={function(e) { e.currentTarget.style.background = "none"; }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}><path d="M17.5 8.33H2.5M13.33 1.67V5M6.67 1.67V5M6.5 18.33H13.5C14.9 18.33 15.6 18.33 16.14 18.06C16.61 17.82 16.99 17.44 17.23 16.97C17.5 16.43 17.5 15.73 17.5 14.33V7.33C17.5 5.93 17.5 5.23 17.23 4.7C16.99 4.23 16.61 3.85 16.14 3.61C15.6 3.33 14.9 3.33 13.5 3.33H6.5C5.1 3.33 4.4 3.33 3.87 3.61C3.39 3.85 3.01 4.23 2.77 4.7C2.5 5.23 2.5 5.93 2.5 7.33V14.33C2.5 15.73 2.5 16.43 2.77 16.97C3.01 17.44 3.39 17.82 3.87 18.06C4.4 18.33 5.1 18.33 6.5 18.33Z" stroke={T.colorTextSecondary} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>Prepayment schedule</span>
                </button>
              </div>
            </div>
            <SuggestionsBox isCleanReconcile={false} allJustResolved={_prAllDone} accountStatus={null} resolvedCount={_prResolvedCount} totalSuggestions={_prTotalSuggestions} matchedTotal={null}
              navCategories={_PR_NAV_CATS.map(function(cat) { return Object.assign({}, cat, { items: cat.items.map(function(item) { return Object.assign({}, item); }) }); })}
              resolvedCards={_prResolvedCards} ignoredCards={_prIgnoredCards}
              completedTitle="Prepayment review complete" completedDescription={"All suggestions have been reviewed. Your prepayment schedule is up to date for " + selectedPeriod + "."} completedColor={T.colorBrandPrimary} />
          </div>
        )}
      </div>
      {_prDrawerCard && (
        <Sidebar open={true} onClose={function() { _prSetDrawerCard(null); }} title={_prDrawerCard.drawer.contact} width={600}
          footer={React.createElement(React.Fragment, null,
            React.createElement(SecondaryButton, { onClick: function() { _prSetDrawerCard(null); }, style: { height: 40, padding: "8px 16px", fontSize: 14 } }, "Cancel"),
            React.createElement(PrimaryButton, { onClick: function() {
              var idx = _prDrawerCard.idx;
              _prSetResolvedCards(function(prev) { return new Set([].concat(Array.from(prev), [idx])); });
              _prSetCardActions(function(prev) { var o = Object.assign({}, prev); o[idx] = "Journal posted"; return o; });
              _prSetDrawerCard(null);
            }, style: { flex: 1, height: 40, padding: "8px 16px", fontSize: 14, justifyContent: "center" } }, "Add to schedule")
          )}>
          <div style={{ padding: "32px 32px 64px", display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Invoice section */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={Object.assign({}, T.textSm, { fontWeight: 500, color: T.colorTextPrimary })}>Invoice</div>
              <div style={{ border: "1px solid " + T.colorBorderDark, borderRadius: 8, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <svg width="28" height="32" viewBox="0 0 28 32" fill="none"><rect width="28" height="32" rx="4" fill="#F4E8E8"/><text x="14" y="22" textAnchor="middle" fontSize="10" fontWeight="600" fill="#D32F2F">PDF</text></svg>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>{_prDrawerCard.drawer.invoice}</span>
                  <span style={{ fontSize: 13, color: T.colorTextSecondary }}>{_prDrawerCard.drawer.invoiceDate}</span>
                </div>
              </div>
              <div style={{ background: "#FEFCE8", border: "1px solid #FDE68A", borderRadius: 8, padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><path d="M10 1L12.39 6.26L18.18 7.27L14.09 11.64L14.76 17.5L10 15.27L5.24 17.5L5.91 11.64L1.82 7.27L7.61 6.26L10 1Z" fill="#EAB308" stroke="#EAB308" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "20px" }}>{_prDrawerCard.drawer.aiInsight}</span>
              </div>
            </div>

            {/* Adjustment type dropdown */}
            <Dropdown label="Adjustment type" value={_prDrawerCard.drawer.adjType} onChange={function(){}} size="lg" options={[
              { value: "prepayment_expense", label: "Prepayment expense" },
              { value: "prepayment_income", label: "Prepayment income" },
            ]} />

            {/* Description */}
            <Input label="Description" value={_prDrawerCard.drawer.description} onChange={function(){}} />

            {/* Amount */}
            <Input label="Amount" value={_prDrawerCard.drawer.amount} onChange={function(){}} leftSlotType="currency" currencySymbol="£" />

            {/* Expense account dropdown */}
            <Dropdown label="Expense account" value={_prDrawerCard.drawer.expenseAccount} onChange={function(){}} size="lg" options={[
              { value: _prDrawerCard.drawer.expenseAccount, label: _prDrawerCard.drawer.expenseAccount },
            ]} />

            {/* Invoice date */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Dropdown label="Invoice date" value={_prDrawerCard.drawer.invoiceDateField} onChange={function(){}} size="lg" icon={function() { return React.createElement("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" }, React.createElement("path", { d: "M17.5 8.33H2.5M13.33 1.67V5M6.67 1.67V5M6.5 18.33H13.5C14.9 18.33 15.6 18.33 16.14 18.06C16.61 17.82 16.99 17.44 17.23 16.97C17.5 16.43 17.5 15.73 17.5 14.33V7.33C17.5 5.93 17.5 5.23 17.23 4.7C16.99 4.23 16.61 3.85 16.14 3.61C15.6 3.33 14.9 3.33 13.5 3.33H6.5C5.1 3.33 4.4 3.33 3.87 3.61C3.39 3.85 3.01 4.23 2.77 4.7C2.5 5.23 2.5 5.93 2.5 7.33V14.33C2.5 15.73 2.5 16.43 2.77 16.97C3.01 17.44 3.39 17.82 3.87 18.06C4.4 18.33 5.1 18.33 6.5 18.33Z", stroke: "currentColor", strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round" })); }} options={[
                { value: _prDrawerCard.drawer.invoiceDateField, label: _prDrawerCard.drawer.invoiceDateField },
              ]} />
              <span style={Object.assign({}, T.textSm, { color: T.colorTextSecondary })}>Will be used for initial recognition for new prepayments</span>
            </div>

            {/* Checkbox */}
            <Checkbox checked={true} onChange={function(){}} label="Create journal entry to recognise prepayment" />
          </div>
        </Sidebar>
      )}
      <PrepaymentSchedulePage open={_prScheduleOpen} onClose={function() { _prSetScheduleOpen(false); }} />
    </div>
  );
}

// ── Accrual Review Flow ───────────────────────────────────────────────────

var _AR_STEPS = [
  { title: "Reading accrual schedule",                    subtext: null,                                              duration: 800  },
  { title: "Scanning Xero bills for recurring costs",     subtext: "Reviewed 62 bills from the last 90 days.",        duration: 1200 },
  { title: "Comparing with prior-year accruals",          subtext: "Matched 7 of 9 prior-year items.",                duration: 1000 },
  { title: "Checking accrual reversal patterns",          subtext: "Flagged 1 accrual with no reversal posted.",      duration: 900  },
  { title: "Generating suggestions",                      subtext: null,                                              duration: 600  },
];

var _AR_CARDS = [
  { idx: 0, key: "rent", title: "Accrue April rent for WeWork", contact: "WeWork – serviced office", description: "WeWork invoices are received in arrears and typically posted in the first week of the following month. The April invoice for £3,200.00 has not yet been received or posted. A matching accrual was raised in each of the prior 11 months. Without an accrual, April rent expense will be understated.", tableRow: { account: "6000 – Rent", amount: "£3,200.00", period: "Apr 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
  { idx: 1, key: "audit", title: "Accrue Q1 audit fee from Grant Thornton", contact: "Grant Thornton – annual audit", description: "The annual audit fee of £18,000.00 is invoiced on completion but relates to the full financial year. No accrual has been posted for the three months to April 2026, leaving £4,500.00 of audit cost unrecognised. Prior-year records show the fee was accrued monthly at £1,500.00.", tableRow: { account: "6200 – Professional fees", amount: "£4,500.00", period: "Feb – Apr 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
  { idx: 2, key: "stale", title: "Reverse stale accrual for Vodafone", contact: "Vodafone – mobile contract", description: "An accrual of £85.00 for Vodafone mobile charges was raised in January 2026 but was never reversed. The actual invoice for £79.50 was posted in February directly to 6230 – Telephone & internet. The original accrual is still sitting on the balance sheet and should be reversed.", tableRow: { account: "2109 – Accruals", amount: "£85.00", period: "Apr 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
  { idx: 3, key: "duplicate", title: "Reverse duplicate electricity accrual", contact: "British Gas – electricity supply", description: "Two accrual entries exist for British Gas electricity in April 2026: one for £1,450.00 posted on 1 April and another for £1,450.00 posted on 3 April. Both reference the same estimated usage period. This doubles the electricity accrual for the month. A reversing journal should be posted to remove the duplicate entry and correct the accruals balance.", tableRow: { account: "6020 – Light, heat & power", amount: "–£1,450.00", period: "Apr 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
];

var _AR_NAV_CATS = [
  { key: "rent",      label: "Missing accrual",       baseIdx: 0, items: [{ contact: "WeWork rent" }] },
  { key: "audit",     label: "Unrecognised cost",     baseIdx: 1, items: [{ contact: "Grant Thornton audit" }] },
  { key: "stale",     label: "Stale accrual",         baseIdx: 2, items: [{ contact: "Vodafone mobile" }] },
  { key: "duplicate", label: "Possible duplicate",    baseIdx: 3, items: [{ contact: "British Gas electricity" }] },
];

function AccrualReviewFlow(_ref) {
  var onClose = _ref.onClose, selectedPeriod = _ref.selectedPeriod || "April 2026", onStateChange = _ref.onStateChange, savedState = _ref.savedState;
  var _arInitResume = !!(savedState && savedState.hasResults);
  var _s = useState(_arInitResume); var _arIsResume = _s[0], _arSetIsResume = _s[1];
  _s = useState(_arInitResume ? _AR_STEPS.map(function(){return "done";}) : []); var _arStepStatuses = _s[0], _arSetStepStatuses = _s[1];
  _s = useState(_arInitResume ? _AR_STEPS.map(function(){return true;}) : []); var _arStepSubtexts = _s[0], _arSetStepSubtexts = _s[1];
  _s = useState(_arInitResume ? _AR_STEPS.length : 0); var _arVisibleSteps = _s[0], _arSetVisibleSteps = _s[1];
  _s = useState(_arInitResume); var _arStepsPopulated = _s[0], _arSetStepsPopulated = _s[1];
  _s = useState(_arInitResume); var _arStepsCollapsed = _s[0], _arSetStepsCollapsed = _s[1];
  _s = useState(_arInitResume); var _arResultsVisible = _s[0], _arSetResultsVisible = _s[1];
  _s = useState(_arInitResume); var _arCanvasReady = _s[0], _arSetCanvasReady = _s[1];
  _s = useState(_arInitResume); var _arBoxesOpen = _s[0], _arSetBoxesOpen = _s[1];
  _s = useState(400); var _arChatWidth = _s[0], _arSetChatWidth = _s[1];
  _s = useState(false); var _arIsDragging = _s[0], _arSetIsDragging = _s[1];
  _s = useState(true); var _arIsAtBottom = _s[0], _arSetIsAtBottom = _s[1];
  _s = useState(""); var _arInputValue = _s[0], _arSetInputValue = _s[1];
  _s = useState(_arInitResume ? new Set(savedState.resolvedArray || []) : new Set()); var _arResolvedCards = _s[0], _arSetResolvedCards = _s[1];
  _s = useState(_arInitResume ? new Set(savedState.ignoredArray || []) : new Set()); var _arIgnoredCards = _s[0], _arSetIgnoredCards = _s[1];
  _s = useState(_arInitResume ? (savedState.cardActions || {}) : {}); var _arCardActions = _s[0], _arSetCardActions = _s[1];
  _s = useState(false); var _arAnalysisOpen = _s[0], _arSetAnalysisOpen = _s[1];
  _s = useState(false); var _arPeriodDropOpen = _s[0], _arSetPeriodDropOpen = _s[1];
  _s = useState(selectedPeriod); var _arActivePeriod = _s[0], _arSetActivePeriod = _s[1];
  _s = useState(false); var _arScheduleOpen = _s[0], _arSetScheduleOpen = _s[1];
  _s = useState(0); var _arRestartKey = _s[0], _arSetRestartKey = _s[1];
  var _arChatScrollRef = useRef(null), _arChatEndRef = useRef(null), _arPeriodDropRef = useRef(null);

  var _arAllMonths = ["April 2025","May 2025","June 2025","July 2025","August 2025","September 2025","October 2025","November 2025","December 2025","January 2026","February 2026","March 2026","April 2026"];
  var _arCurrentIdx = _arAllMonths.indexOf("April 2026");

  useEffect(function() {
    var handler = function(e) { if (_arPeriodDropRef.current && !_arPeriodDropRef.current.contains(e.target)) _arSetPeriodDropOpen(false); };
    document.addEventListener("mousedown", handler);
    return function() { document.removeEventListener("mousedown", handler); };
  }, []);

  var _arStepsComplete = _arStepStatuses.length > 0 && _arStepStatuses.every(function(s) { return s === "done"; });
  var _arResolvedCount = _arResolvedCards.size + _arIgnoredCards.size;
  var _arAllDone = _arResolvedCount >= _AR_CARDS.length;
  var _arTotalSuggestions = _AR_CARDS.length;

  useEffect(function() {
    if (onStateChange && _arCanvasReady) onStateChange({ resolved: _arResolvedCount, total: _arTotalSuggestions, hasResults: true, resolvedArray: Array.from(_arResolvedCards), ignoredArray: Array.from(_arIgnoredCards), cardActions: _arCardActions });
  }, [_arResolvedCount, _arCanvasReady, _arCardActions]);

  var _arLine1Segments = [{ text: "I'll review your accrual schedule for ", bold: false }, { text: selectedPeriod, bold: true }, { text: ", cross-reference Xero bills, and compare against prior-year accruals to surface anything that's missing or needs attention.", bold: false }];
  var _arLine1Full = _arLine1Segments.map(function(s) { return s.text; }).join("");
  var _arTw = useTypewriter(_arLine1Full + (_arRestartKey > 0 ? "​".repeat(_arRestartKey) : ""), 18, _arIsResume);
  var _arLine1Done = _arTw.done;

  useEffect(function() {
    if (!_arLine1Done || _arIsResume) return;
    var REVEAL = 80, timers = [];
    _AR_STEPS.forEach(function(_, i) { timers.push(setTimeout(function() { _arSetVisibleSteps(function(v) { return Math.max(v, i + 1); }); }, i * REVEAL)); });
    timers.push(setTimeout(function() { _arSetStepsPopulated(true); }, (_AR_STEPS.length - 1) * REVEAL + 80));
    return function() { timers.forEach(clearTimeout); };
  }, [_arLine1Done, _arRestartKey]);

  useEffect(function() {
    if (!_arStepsPopulated || _arIsResume) return;
    _arSetStepStatuses(_AR_STEPS.map(function(_, i) { return i === 0 ? "active" : "pending"; }));
    _arSetStepSubtexts(_AR_STEPS.map(function() { return false; }));
    var timers = [], cum = 0;
    _AR_STEPS.forEach(function(step, i) {
      cum += step.duration;
      if (step.subtext) timers.push(setTimeout(function() { _arSetStepSubtexts(function(prev) { var n = prev.slice(); n[i] = true; return n; }); }, cum - 350));
      timers.push(setTimeout(function() { _arSetStepStatuses(function(prev) { var n = prev.slice(); n[i] = "done"; if (i + 1 < _AR_STEPS.length) n[i + 1] = "active"; return n; }); }, cum));
    });
    return function() { timers.forEach(clearTimeout); };
  }, [_arStepsPopulated, _arRestartKey]);

  useEffect(function() { if (!_arStepsComplete || _arIsResume) return; var t1 = setTimeout(function() { _arSetStepsCollapsed(true); }, 500); var t2 = setTimeout(function() { _arSetResultsVisible(true); }, 700); return function() { clearTimeout(t1); clearTimeout(t2); }; }, [_arStepsComplete, _arRestartKey]);
  useEffect(function() { if (!_arResultsVisible || _arIsResume) return; var t1 = setTimeout(function() { _arSetCanvasReady(true); }, 3200); var t2 = setTimeout(function() { _arSetBoxesOpen(true); }, 3800); return function() { clearTimeout(t1); clearTimeout(t2); }; }, [_arResultsVisible, _arRestartKey]);
  useEffect(function() { if (_arChatEndRef.current) _arChatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" }); }, [_arLine1Done, _arStepsComplete, _arCanvasReady]);
  useEffect(function() { var el = _arChatScrollRef.current; if (!el) return; var onScroll = function() { _arSetIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 40); }; el.addEventListener("scroll", onScroll); return function() { el.removeEventListener("scroll", onScroll); }; }, []);
  useEffect(function() { var onKey = function(e) { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", onKey); return function() { window.removeEventListener("keydown", onKey); }; }, []);

  var _arHandleDragStart = function(e) {
    e.preventDefault(); _arSetIsDragging(true);
    var startX = e.clientX, startW = _arChatWidth;
    var onMove = function(ev) { _arSetChatWidth(Math.max(280, Math.min(700, startW + (ev.clientX - startX)))); };
    var onUp = function() { _arSetIsDragging(false); document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); document.body.style.cursor = ""; document.body.style.userSelect = ""; };
    document.body.style.cursor = "col-resize"; document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove); document.addEventListener("mouseup", onUp);
  };

  var _arHandleRestart = function() {
    _arSetStepStatuses([]); _arSetStepSubtexts([]); _arSetVisibleSteps(0);
    _arSetStepsPopulated(false); _arSetStepsCollapsed(false); _arSetResultsVisible(false);
    _arSetCanvasReady(false); _arSetBoxesOpen(false);
    _arSetResolvedCards(new Set()); _arSetIgnoredCards(new Set()); _arSetCardActions({});
    _arSetAnalysisOpen(false); _arSetIsResume(false);
    _arSetRestartKey(function(k) { return k + 1; });
    if (onStateChange) onStateChange(null);
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 200, display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif", background: T.colorSurfaceContrast }}>
      <style>{`@keyframes _arFadeIn{from{opacity:0}to{opacity:1}} @keyframes _arStepReveal{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} @keyframes _arStepPop{0%{transform:scale(0.8);opacity:0}100%{transform:scale(1);opacity:1}} @keyframes _arTextShimmer{0%{background-position:200% center}100%{background-position:-200% center}}`}</style>
      <div style={{ height: 96, background: T.colorSurfacePrimary, borderBottom: "1px solid " + T.colorButtonSecondary, display: "flex", alignItems: "center", padding: "0 24px", flexShrink: 0, gap: 16, zIndex: 10, position: "relative" }}>
        <span style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, letterSpacing: "-1px", flexShrink: 0 }}>Accruals review</span>
        <div ref={_arPeriodDropRef} style={{ position: "relative" }}>
          <button onClick={function() { _arSetPeriodDropOpen(function(o) { return !o; }); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 12px", height: 48, border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" }}>
            <span>{_arActivePeriod}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition: "transform 0.2s ease", transform: _arPeriodDropOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}><path d="M4 6L8 10L12 6" stroke="#080908" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {_arPeriodDropOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: T.colorSurfacePrimary, border: "1px solid " + T.colorBorderDark, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 100, minWidth: 260, overflow: "hidden", padding: "6px" }}>
              {_arAllMonths.map(function(p, idx) {
                var isSelected = p === _arActivePeriod, isCompleted = idx < _arCurrentIdx, isInReview = idx === _arCurrentIdx;
                return (
                  <button key={p} onClick={function() { _arSetActivePeriod(p); _arSetPeriodDropOpen(false); }}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, textAlign: "left", padding: "10px 12px", fontSize: 14, color: T.colorTextPrimary, fontWeight: isSelected ? 500 : 400, background: isSelected ? T.colorBorderLight : "transparent", border: "none", cursor: "pointer", borderRadius: 8, boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={function(e) { if (!isSelected) e.currentTarget.style.background = T.colorSurfaceSecondary; }}
                    onMouseLeave={function(e) { if (!isSelected) e.currentTarget.style.background = isSelected ? T.colorBorderLight : "transparent"; }}>
                    <span>{p}</span>
                    {isCompleted && <span style={{ fontSize: 12, fontWeight: 500, color: T.colorBrandPrimary, background: T.colorBrandLighter, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>Completed</span>}
                    {isInReview && <span style={{ fontSize: 12, fontWeight: 500, color: T.colorWarning, background: T.colorWarningBg, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>In review</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div style={{ flex: 1 }} />
        {_arCanvasReady && (
          <button onClick={function() { _arSetBoxesOpen(function(o) { return !o; }); }}
            style={{ display: "flex", alignItems: "center", gap: 0, marginRight: 8, cursor: "pointer", fontFamily: "inherit", border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, height: 48, minWidth: 48, padding: _arBoxesOpen ? 0 : "0 12px 0 0", overflow: "hidden", justifyContent: "center", flexShrink: 0, transition: "padding 0.35s cubic-bezier(0.16,1,0.3,1), background 0.15s" }}
            onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceTertiary; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; }}>
            <div style={{ maxWidth: _arBoxesOpen ? 0 : 200, opacity: _arBoxesOpen ? 0 : 1, overflow: "hidden", transition: "max-width 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s", display: "flex", flexDirection: "column", gap: 4, paddingLeft: _arBoxesOpen ? 0 : 12, paddingRight: _arBoxesOpen ? 0 : 10 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextThird, whiteSpace: "nowrap" }}>Suggestions</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: T.colorTextPrimary, whiteSpace: "nowrap" }}>{_arResolvedCount}/{_arTotalSuggestions}</span>
              </div>
              <div style={{ height: 2, background: T.colorBorderDark, borderRadius: 1, overflow: "hidden" }}><div style={{ height: "100%", width: Math.round((_arResolvedCount / _arTotalSuggestions) * 100) + "%", background: T.colorBrandPrimary, borderRadius: 1, transition: "width 0.4s ease" }} /></div>
            </div>
            {_arBoxesOpen
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M21 21V3M3 12H17M17 12L10 5M17 12L10 19" stroke={T.colorTextHeading} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M15 21L15 3M16.2 21H7.8C6.12 21 5.28 21 4.64 20.673C4.07 20.385 3.61 19.927 3.33 19.362C3 18.72 3 17.88 3 16.2V7.8C3 6.12 3 5.28 3.33 4.638C3.61 4.074 4.07 3.615 4.64 3.327C5.28 3 6.12 3 7.8 3H16.2C17.88 3 18.72 3 19.362 3.327C19.927 3.615 20.385 4.074 20.673 4.638C21 5.28 21 6.12 21 7.8V16.2C21 17.88 21 18.72 20.673 19.362C20.385 19.927 19.927 20.385 19.362 20.673C18.72 21 17.88 21 16.2 21Z" stroke={T.colorTextHeading} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            }
          </button>
        )}
        <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}><svg width="30" height="30" viewBox="0 0 30 30" fill="none"><rect width="30" height="30" rx="15" fill="#F5F5F5"/><path d="M20 10L10 20M10 10L20 20" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative", padding: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", width: _arResultsVisible ? _arChatWidth : "100%", flexShrink: 0, transition: _arIsDragging ? "none" : "width 0.72s cubic-bezier(0.16,1,0.3,1)", overflow: "hidden", willChange: "width", position: "relative", zIndex: 1 }}>
          {_arResultsVisible && (
            <button onClick={function() { _arChatScrollRef.current && _arChatScrollRef.current.scrollTo({ top: _arChatScrollRef.current.scrollHeight, behavior: "smooth" }); }}
              style={{ position: "absolute", bottom: 218, left: "50%", transform: "translateX(-50%)", zIndex: 10, width: 32, height: 32, borderRadius: "50%", background: T.colorSurfacePrimary, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)", opacity: _arIsAtBottom ? 0 : 1, pointerEvents: _arIsAtBottom ? "none" : "auto", transition: "opacity 0.35s ease" }}
              onMouseEnter={function(e) { e.currentTarget.style.background = T.colorBorderLight; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}
          <div style={{ flex: 1, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
            <div ref={_arChatScrollRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", scrollBehavior: "smooth" }}>
              {_arResultsVisible && <div style={{ position: "sticky", top: 0, height: 40, marginBottom: -40, background: "linear-gradient(to bottom, rgba(251,251,251,1) 0%, rgba(251,251,251,0) 100%)", zIndex: 2, pointerEvents: "none", flexShrink: 0 }} />}
              <div style={{ maxWidth: 680, width: "100%", margin: "0 auto", padding: _arResultsVisible ? "24px 24px 100px" : "24px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", width: _arResultsVisible ? "90%" : "70%", marginBottom: 20 }}>
                  <p style={{ margin: 0 }}><StreamingMessage segments={_arLine1Segments} speed={18} instant={_arIsResume} key={_arIsResume ? "resume-intro" : "fresh-intro-" + _arRestartKey} /></p>
                </div>
                {_arStepsPopulated && _arStepStatuses.length > 0 && (
                  <div style={{ animation: "_arFadeIn 0.3s ease both" }}>
                    <button onClick={function() { _arSetStepsCollapsed(function(c) { return !c; }); }}
                      style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: _arStepsCollapsed ? 0 : 20, cursor: "pointer", background: "none", border: "none", padding: 0, width: "100%", textAlign: "left" }}>
                      <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 15, fontWeight: 600, color: T.colorTextPrimary }}>Accruals review</span>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: "transform 0.2s ease", transform: _arStepsCollapsed ? "rotate(180deg)" : "rotate(0deg)" }}><path d="M3 8.5L7 4.5L11 8.5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <span style={{ fontSize: 13, color: T.colorTextSecondary }}>{_arStepsComplete ? "Completed" : "In progress"}</span>
                      </div>
                    </button>
                    {!_arStepsCollapsed && _AR_STEPS.map(function(step, i) {
                      if (i >= _arVisibleSteps) return null;
                      var status = _arStepStatuses[i] || "pending", isLast = i === _AR_STEPS.length - 1;
                      return (
                        <div key={i} style={{ display: "flex", gap: 16, animation: "_arStepReveal 0.4s cubic-bezier(0.16,1,0.3,1) both" }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 2, overflow: "visible" }}>
                            <div style={{ width: 20, height: 20, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "visible" }}>
                              {status === "done" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: "_arStepPop 0.35s cubic-bezier(0.34,1.4,0.64,1) both" }}><circle cx="10" cy="10" r="10" fill={T.colorBrandPrimary}/><path d="M5.5 10.5L8.5 13.5L14.5 7" stroke={T.colorSurfacePrimary} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                              {status === "active" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: "spin 0.75s linear infinite" }}><path d="M10 2A8 8 0 1 1 2 10" stroke={T.colorBrandPrimary} strokeWidth="1.5" strokeLinecap="round"/></svg>}
                              {status === "pending" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9.25" stroke={T.colorBorderDark} strokeWidth="1.5"/></svg>}
                            </div>
                            {!isLast && i + 1 < _arVisibleSteps && <div style={{ width: 1, flexGrow: 1, minHeight: 20, background: T.colorBorderDark, margin: "4px 0" }} />}
                          </div>
                          <div style={{ paddingBottom: isLast ? 0 : 20 }}>
                            <div style={{ fontSize: 14, lineHeight: "24px", color: status === "pending" ? T.colorBorderInput : T.colorTextPrimary, transition: "color 0.3s ease" }}>{step.title}</div>
                            {(_arStepSubtexts[i] || status === "done") && step.subtext && <div style={{ fontSize: 13, color: T.colorTextSecondary, marginTop: 2, lineHeight: "18px", animation: "_arFadeIn 0.3s ease" }}>{step.subtext}</div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {_arCanvasReady && (
                  <div style={{ animation: _arIsResume ? "none" : "_arFadeIn 0.4s ease 0.2s both", marginTop: 20, fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                    <p style={{ margin: 0 }}><StreamingMessage segments={[{ text: "I've found ", bold: false }, { text: "4 items", bold: true }, { text: " that need attention – including a missing recurring accrual, an unreversed prior-period balance, and a possible duplicate. Review each suggestion and take action or skip.", bold: false }]} speed={18} instant={_arIsResume} key={_arIsResume ? "resume" : "fresh"} /></p>
                  </div>
                )}
                <div ref={_arChatEndRef} />
              </div>
            </div>
          </div>
          {!_arStepsComplete && _arLine1Done && !_arIsResume && (
            <div style={{ padding: "0 24px 20px", flexShrink: 0 }}>
              <div style={{ maxWidth: 680, margin: "0 auto" }}>
                <div style={{ borderRadius: 8, padding: "14px 14px 12px", background: T.colorSurfacePrimary, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px " + T.colorBorderDark }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ fontSize: 14, lineHeight: "22px", flex: 1 }}>
                      <span style={{ background: "linear-gradient(90deg, #9D9D9E 0%, #9D9D9E 30%, #2A2A2A 50%, #9D9D9E 70%, " + T.colorTextDisabled + " 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "_arTextShimmer 2s linear infinite", display: "inline-block" }}>Reviewing accruals...</span>
                    </div>
                    <button style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 36, padding: "0 10px", border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 13, fontWeight: 500, color: T.colorTextPrimary, flexShrink: 0, boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}
                      onMouseEnter={function(e) { e.currentTarget.style.background = T.colorBorderLight; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" rx="1.5" stroke="#080908" strokeWidth="1.25" /></svg>Stop
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {_arCanvasReady && (
            <div style={{ padding: "60px 12px 16px", flexShrink: 0, background: "linear-gradient(to bottom, rgba(251,251,251,0) 0%, rgba(251,251,251,1) 60px)", marginTop: -60 }}>
              <div style={{ maxWidth: 680, margin: "0 auto" }}>
                <button onClick={_arHandleRestart} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, height: 40, padding: "0 16px", marginBottom: 10, border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceSecondary; e.currentTarget.style.borderColor = T.colorBorderHover; }}
                  onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; e.currentTarget.style.borderColor = T.colorBorderDark; }}>
                  <PlayCircleIcon color={T.colorTextPrimary} size={20} />Restart review
                </button>
                <div style={{ borderRadius: 8, padding: "14px 14px 12px", background: T.colorSurfacePrimary, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px " + T.colorBorderDark }}>
                  <textarea value={_arInputValue} onChange={function(e) { _arSetInputValue(e.target.value); }} placeholder="Ask for changes or information..." rows={3} style={{ width: "100%", border: "none", outline: "none", resize: "none", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", background: "transparent", fontFamily: "'Inter', sans-serif", display: "block" }} />
                  <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                    <button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: T.colorTextSecondary, padding: 0 }}
                      onMouseEnter={function(e) { e.currentTarget.style.background = T.colorBorderLight; }} onMouseLeave={function(e) { e.currentTarget.style.background = "none"; }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15.5 8.5L8.5 15.5C7.12 16.88 4.88 16.88 3.5 15.5C2.12 14.12 2.12 11.88 3.5 10.5L10.5 3.5C11.33 2.67 12.67 2.67 13.5 3.5C14.33 4.33 14.33 5.67 13.5 6.5L6.5 13.5C6.08 13.92 5.42 13.92 5 13.5C4.58 13.08 4.58 12.42 5 12L11.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <div style={{ flex: 1 }} />
                    <button style={{ width: 36, height: 36, marginLeft: 6, border: "1px solid " + T.colorBorderDark, borderRadius: 10, background: _arInputValue.trim() ? T.colorBrandPrimary : T.colorSurfaceSecondary, cursor: _arInputValue.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s", padding: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M9.99984 15.8346V4.16797M9.99984 4.16797L4.1665 10.0013M9.99984 4.16797L15.8332 10.0013" stroke={_arInputValue.trim() ? "#FFFFFF" : "#8C8C8B"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {_arResultsVisible && (<div onMouseDown={_arHandleDragStart} style={{ position: "absolute", top: 0, bottom: 0, left: _arChatWidth + 16, width: 16, cursor: "col-resize", zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 4, height: 40, borderRadius: 2, background: _arIsDragging ? T.colorBorderHover : "transparent", transition: "background 0.15s" }} /></div>)}
        <div style={{ position: "absolute", top: 16, bottom: 16, left: _arChatWidth + 32, right: _arBoxesOpen ? 432 : 16, background: T.colorSurfacePrimary, borderRadius: 8, border: "1px solid " + T.colorButtonSecondary, overflow: "hidden", zIndex: 2, transform: _arResultsVisible ? "none" : "translateX(calc(100% + 32px))", transition: _arIsDragging ? "none" : "transform 0.72s cubic-bezier(0.16,1,0.3,1), right 0.35s cubic-bezier(0.16,1,0.3,1)", willChange: _arResultsVisible ? "auto" : "transform" }}>
          {_arCanvasReady ? (
            <div style={{ animation: "_arFadeIn 0.4s ease 0.1s both", height: "100%", overflowY: "auto" }}>
              <div style={{ padding: "48px 48px 48px", maxWidth: 800, margin: "0 auto" }}>
                <h2 style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, margin: "0 0 20px" }}>Results</h2>
                {(function() {
                  var _arGlImpacts = { 0: 3200.00 };
                  var _arGlInitial = -3200.00;
                  var _arResImpact = Array.from(_arResolvedCards).reduce(function(s, i) { return s + (_arGlImpacts[i] || 0); }, 0);
                  var _arClosingDiff = _arGlInitial + _arResImpact;
                  var _arOpeningMimo = 28315.00;
                  var _arOpeningXero = 28315.00;
                  var _arOpeningDiff = 0;
                  var _arClosingMimo = 31200.00;
                  var _arClosingXero = _arClosingMimo - _arClosingDiff;
                  var _fmt = function(v) { return (v < 0 ? "–" : "") + "£" + Math.abs(v).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
                  var _diffCell = function(v) {
                    if (Math.abs(v) < 0.01) return _fmt(0);
                    return React.createElement("span", { style: { fontWeight: 600, color: T.colorTextPrimary } }, _fmt(v));
                  };
                  return React.createElement("div", { style: { marginBottom: 12 } },
                    React.createElement(DataTable, {
                      columns: [{ key: "description", label: "Description", width: "1fr" }, { key: "value", label: "Amount", width: "160px", align: "right" }],
                      rows: [
                        { description: "Opening balance per Mimo", value: _fmt(_arOpeningMimo) },
                        { description: "Opening balance per Xero", value: _fmt(_arOpeningXero) },
                        { description: "Opening balance difference", value: _diffCell(_arOpeningDiff) },
                        { description: "Additions", value: "£8,285.00" },
                        { description: "Releases", value: "(£5,400.00)" },
                        { description: "Closing balance per Mimo", value: _fmt(_arClosingMimo) },
                        { description: "Closing balance per Xero", value: _fmt(_arClosingXero) },
                        { description: "Closing balance difference", value: _diffCell(_arClosingDiff) },
                      ]
                    })
                  );
                })()}
                <div style={{ background: T.colorSurfacePrimary, border: "1px solid " + T.colorButtonSecondary, borderRadius: 8, marginBottom: 28, overflow: "hidden" }}>
                  <div onClick={function() { _arSetAnalysisOpen(function(o) { return !o; }); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 67, padding: "0 20px", cursor: "pointer" }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>Analysis & key findings</span>
                    <div style={{ display: "flex", transform: _arAnalysisOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)", flexShrink: 0, marginLeft: 12 }}><ChevronUpIcon /></div>
                  </div>
                  <div style={{ overflow: "hidden", maxHeight: _arAnalysisOpen ? 400 : 0, opacity: _arAnalysisOpen ? 1 : 0, transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease" }}>
                    <div style={{ fontSize: 14, color: T.colorTextBody, lineHeight: "20px", margin: "0 20px 16px", borderTop: "1px solid " + T.colorBorderSubtle, paddingTop: 14 }}>
                      <p style={{ margin: "0 0 10px" }}>The accrual review for {selectedPeriod} cross-referenced your current schedule against 62 Xero bills and 9 prior-year accrual items.</p>
                      <p style={{ margin: "0 0 10px" }}>The most significant finding is a missing rent accrual for WeWork. The April invoice has not been received but prior months show a consistent £3,200.00 monthly accrual – omitting it would understate rent expense for the period.</p>
                      <p style={{ margin: "0 0 10px" }}>An annual audit fee from Grant Thornton has not been accrued for the last three months, leaving £4,500.00 unrecognised. A Vodafone accrual from January was never reversed despite the actual invoice being posted in February.</p>
                      <p style={{ margin: 0 }}>A duplicate electricity accrual was detected for British Gas, where two identical £1,450.00 entries are both active in April – doubling the utilities charge.</p>
                    </div>
                  </div>
                </div>
                <hr style={{ border: "none", borderTop: "1px solid " + T.colorBorderDark, margin: "32px 0 40px" }} />
                <h3 style={{ fontSize: 20, fontWeight: 500, color: T.colorTextPrimary, margin: "0 0 16px" }}>Suggestions</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {_AR_CARDS.map(function(card) {
                    var isResolved = _arResolvedCards.has(card.idx), isIgnored = _arIgnoredCards.has(card.idx), actionLabel = _arCardActions[card.idx];
                    var statusLabel = isResolved ? (actionLabel || "Journal posted") : isIgnored ? (actionLabel || "Resolved") : "Unresolved";
                    var statusStyle = isResolved ? { background: T.colorBrandLighter, border: "none", color: T.colorBrandPrimary } : isIgnored ? { background: T.colorButtonDisabled, border: "none", color: T.colorTextSecondary } : { background: T.colorWarningBg, border: "none", color: T.colorWarning };
                    var primaryActionLabels = { "Review suggestion": "Journal posted" };
                    return (
                      <div key={card.idx} id={"result-" + card.key + "-0"} style={{ scrollMarginTop: 64 }}>
                        <RecommendationCard title={card.title} description={card.description} statusLabel={statusLabel} statusStyle={statusStyle}
                          collapsed={isResolved || isIgnored} isIgnored={isIgnored} hideMore={true} tableRow={card.tableRow}
                          tableColumns={[{ key: "account", label: "Account", width: "1.4fr" }, { key: "amount", label: "Amount", width: "0.8fr" }, { key: "period", label: "Period", width: "0.8fr" }]}
                          primaryLabel={card.primaryLabel} secondaryLabel={card.secondaryLabel}
                          onPrimaryAction={function() { _arSetResolvedCards(function(prev) { return new Set([].concat(Array.from(prev), [card.idx])); }); _arSetCardActions(function(prev) { var o = Object.assign({}, prev); o[card.idx] = primaryActionLabels[card.primaryLabel] || "Journal posted"; return o; }); }}
                          onIgnore={function() { _arSetIgnoredCards(function(prev) { return new Set([].concat(Array.from(prev), [card.idx])); }); }}
                          onSecondaryAction={function() { _arSetResolvedCards(function(prev) { return new Set([].concat(Array.from(prev), [card.idx])); }); _arSetCardActions(function(prev) { var o = Object.assign({}, prev); o[card.idx] = "Resolved"; return o; }); }}
                          onMore={function() {}} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : _arResultsVisible ? <CanvasLoader /> : null}
        </div>
        {_arCanvasReady && (
          <div style={{ position: "absolute", top: 16, bottom: 16, right: 16, width: 400, zIndex: 3, transform: _arBoxesOpen ? "translateX(0)" : "translateX(calc(100% + 32px))", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)", pointerEvents: _arBoxesOpen ? "auto" : "none", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: T.colorSurfacePrimary, borderRadius: 8, border: "1px solid " + T.colorButtonSecondary, overflow: "hidden", flexShrink: 0 }}>
              <div style={{ padding: "18px 20px" }}><span style={{ fontSize: 16, fontWeight: 500, color: T.colorTextPrimary }}>Linked sources</span></div>
              <div style={{ borderTop: "1px solid " + T.colorSurfaceActive, padding: "12px 10px 16px" }}>
                <button onClick={function() { _arSetScheduleOpen(true); }}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", border: "none", background: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit", borderRadius: 6 }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceTertiary; }} onMouseLeave={function(e) { e.currentTarget.style.background = "none"; }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}><path d="M17.5 8.33H2.5M13.33 1.67V5M6.67 1.67V5M6.5 18.33H13.5C14.9 18.33 15.6 18.33 16.14 18.06C16.61 17.82 16.99 17.44 17.23 16.97C17.5 16.43 17.5 15.73 17.5 14.33V7.33C17.5 5.93 17.5 5.23 17.23 4.7C16.99 4.23 16.61 3.85 16.14 3.61C15.6 3.33 14.9 3.33 13.5 3.33H6.5C5.1 3.33 4.4 3.33 3.87 3.61C3.39 3.85 3.01 4.23 2.77 4.7C2.5 5.23 2.5 5.93 2.5 7.33V14.33C2.5 15.73 2.5 16.43 2.77 16.97C3.01 17.44 3.39 17.82 3.87 18.06C4.4 18.33 5.1 18.33 6.5 18.33Z" stroke={T.colorTextSecondary} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>Accrual schedule</span>
                </button>
              </div>
            </div>
            <SuggestionsBox isCleanReconcile={false} allJustResolved={_arAllDone} accountStatus={null} resolvedCount={_arResolvedCount} totalSuggestions={_arTotalSuggestions} matchedTotal={null}
              navCategories={_AR_NAV_CATS.map(function(cat) { return Object.assign({}, cat, { items: cat.items.map(function(item) { return Object.assign({}, item); }) }); })}
              resolvedCards={_arResolvedCards} ignoredCards={_arIgnoredCards}
              completedTitle="Accrual review complete" completedDescription={"All suggestions have been reviewed. Your accrual schedule is up to date for " + selectedPeriod + "."} completedColor={T.colorBrandPrimary} />
          </div>
        )}
      </div>
      <AccrualSchedulePage open={_arScheduleOpen} onClose={function() { _arSetScheduleOpen(false); }} />
    </div>
  );
}

// ── Deferred Revenue Review Flow ──────────────────────────────────────────

var _DRR_STEPS = [
  { title: "Reading deferred revenue schedule",                subtext: null,                                                duration: 800  },
  { title: "Scanning Xero sales invoices for advance payments", subtext: "Reviewed 48 invoices from the last 90 days.",      duration: 1300 },
  { title: "Comparing with prior-year deferrals",              subtext: "Matched 5 of 6 prior-year items.",                  duration: 1000 },
  { title: "Checking release patterns and balances",           subtext: "Flagged 1 schedule with a remaining balance.",      duration: 900  },
  { title: "Generating suggestions",                           subtext: null,                                                duration: 600  },
];

var _DRR_CARDS = [
  { idx: 0, key: "advance", title: "Defer advance payment from Lidl for Christmas range", contact: "Lidl UK – Christmas promotional range", description: "Lidl paid £18,000.00 on 28 March 2026 for a Christmas snack range to be delivered across August to November 2026. The full amount has been posted to 4000 – Sales in March. No product has been delivered yet, so the entire balance should be deferred and released as deliveries are made.", tableRow: { account: "4000 – Sales", amount: "£18,000.00", period: "Aug – Nov 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
  { idx: 1, key: "partial", title: "Defer balance of Costco co-packing contract", contact: "Costco – co-packing arrangement", description: "A 6-month co-packing contract with Costco for £14,400.00 was invoiced on 1 March 2026. Two months of production have been completed (March and April), with £4,800.00 recognised. The remaining £9,600.00 relates to May to August and should be deferred.", tableRow: { account: "4000 – Sales", amount: "£9,600.00", period: "May – Aug 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
  { idx: 2, key: "stale", title: "Release stale deferred balance for Ocado promotion", contact: "Ocado – online promotion", description: "The deferred income schedule for the Ocado online promotion shows a remaining balance of £280.00. The promotion ran from October to February and all stock was delivered by 15 February 2026. A residual balance remains due to a rounding difference on the final release. This should be released to revenue.", tableRow: { account: "2110 – Deferred income", amount: "£280.00", period: "Apr 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
  { idx: 3, key: "pattern", title: "Post missed April release for Waitrose seasonal line", contact: "Waitrose – seasonal product line", description: "The Waitrose seasonal line deferred income schedule has been releasing £1,600.00 per month since January 2026. The April release has not been posted. The schedule shows the entry as due but it was not included in the April close. This appears to have been missed during the period-end process.", tableRow: { account: "2110 – Deferred income", amount: "£1,600.00", period: "Apr 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
];

var _DRR_NAV_CATS = [
  { key: "advance",  label: "New advance payment",   baseIdx: 0, items: [{ contact: "Lidl Christmas range" }] },
  { key: "partial",  label: "Partially delivered",    baseIdx: 1, items: [{ contact: "Costco co-packing" }] },
  { key: "stale",    label: "Stale balance",          baseIdx: 2, items: [{ contact: "Ocado promotion" }] },
  { key: "pattern",  label: "Release pattern break",  baseIdx: 3, items: [{ contact: "Waitrose seasonal" }] },
];

function DeferredRevenueReviewFlow(_ref) {
  var onClose = _ref.onClose, selectedPeriod = _ref.selectedPeriod || "April 2026", onStateChange = _ref.onStateChange, savedState = _ref.savedState;
  var _drInitResume = !!(savedState && savedState.hasResults);
  var _s = useState(_drInitResume); var _drIsResume = _s[0], _drSetIsResume = _s[1];
  _s = useState(_drInitResume ? _DRR_STEPS.map(function(){return "done";}) : []); var _drStepStatuses = _s[0], _drSetStepStatuses = _s[1];
  _s = useState(_drInitResume ? _DRR_STEPS.map(function(){return true;}) : []); var _drStepSubtexts = _s[0], _drSetStepSubtexts = _s[1];
  _s = useState(_drInitResume ? _DRR_STEPS.length : 0); var _drVisibleSteps = _s[0], _drSetVisibleSteps = _s[1];
  _s = useState(_drInitResume); var _drStepsPopulated = _s[0], _drSetStepsPopulated = _s[1];
  _s = useState(_drInitResume); var _drStepsCollapsed = _s[0], _drSetStepsCollapsed = _s[1];
  _s = useState(_drInitResume); var _drResultsVisible = _s[0], _drSetResultsVisible = _s[1];
  _s = useState(_drInitResume); var _drCanvasReady = _s[0], _drSetCanvasReady = _s[1];
  _s = useState(_drInitResume); var _drBoxesOpen = _s[0], _drSetBoxesOpen = _s[1];
  _s = useState(400); var _drChatWidth = _s[0], _drSetChatWidth = _s[1];
  _s = useState(false); var _drIsDragging = _s[0], _drSetIsDragging = _s[1];
  _s = useState(true); var _drIsAtBottom = _s[0], _drSetIsAtBottom = _s[1];
  _s = useState(""); var _drInputValue = _s[0], _drSetInputValue = _s[1];
  _s = useState(_drInitResume ? new Set(savedState.resolvedArray || []) : new Set()); var _drResolvedCards = _s[0], _drSetResolvedCards = _s[1];
  _s = useState(_drInitResume ? new Set(savedState.ignoredArray || []) : new Set()); var _drIgnoredCards = _s[0], _drSetIgnoredCards = _s[1];
  _s = useState(_drInitResume ? (savedState.cardActions || {}) : {}); var _drCardActions = _s[0], _drSetCardActions = _s[1];
  _s = useState(false); var _drAnalysisOpen = _s[0], _drSetAnalysisOpen = _s[1];
  _s = useState(false); var _drPeriodDropOpen = _s[0], _drSetPeriodDropOpen = _s[1];
  _s = useState(selectedPeriod); var _drActivePeriod = _s[0], _drSetActivePeriod = _s[1];
  _s = useState(false); var _drScheduleOpen = _s[0], _drSetScheduleOpen = _s[1];
  _s = useState(0); var _drRestartKey = _s[0], _drSetRestartKey = _s[1];
  var _drChatScrollRef = useRef(null), _drChatEndRef = useRef(null), _drPeriodDropRef = useRef(null);

  var _drAllMonths = ["April 2025","May 2025","June 2025","July 2025","August 2025","September 2025","October 2025","November 2025","December 2025","January 2026","February 2026","March 2026","April 2026"];
  var _drCurrentIdx = _drAllMonths.indexOf("April 2026");

  useEffect(function() { var handler = function(e) { if (_drPeriodDropRef.current && !_drPeriodDropRef.current.contains(e.target)) _drSetPeriodDropOpen(false); }; document.addEventListener("mousedown", handler); return function() { document.removeEventListener("mousedown", handler); }; }, []);

  var _drStepsComplete = _drStepStatuses.length > 0 && _drStepStatuses.every(function(s) { return s === "done"; });
  var _drResolvedCount = _drResolvedCards.size + _drIgnoredCards.size;
  var _drAllDone = _drResolvedCount >= _DRR_CARDS.length;
  var _drTotalSuggestions = _DRR_CARDS.length;

  useEffect(function() { if (onStateChange && _drCanvasReady) onStateChange({ resolved: _drResolvedCount, total: _drTotalSuggestions, hasResults: true, resolvedArray: Array.from(_drResolvedCards), ignoredArray: Array.from(_drIgnoredCards), cardActions: _drCardActions }); }, [_drResolvedCount, _drCanvasReady, _drCardActions]);

  var _drLine1Segments = [{ text: "I'll review your deferred revenue schedule for ", bold: false }, { text: selectedPeriod, bold: true }, { text: ", cross-reference Xero sales invoices, and compare against prior-year deferrals to surface anything that's missing or needs attention.", bold: false }];
  var _drLine1Full = _drLine1Segments.map(function(s) { return s.text; }).join("");
  var _drTw = useTypewriter(_drLine1Full + (_drRestartKey > 0 ? "​".repeat(_drRestartKey) : ""), 18, _drIsResume);
  var _drLine1Done = _drTw.done;

  useEffect(function() { if (!_drLine1Done || _drIsResume) return; var REVEAL = 80, timers = []; _DRR_STEPS.forEach(function(_, i) { timers.push(setTimeout(function() { _drSetVisibleSteps(function(v) { return Math.max(v, i + 1); }); }, i * REVEAL)); }); timers.push(setTimeout(function() { _drSetStepsPopulated(true); }, (_DRR_STEPS.length - 1) * REVEAL + 80)); return function() { timers.forEach(clearTimeout); }; }, [_drLine1Done, _drRestartKey]);

  useEffect(function() {
    if (!_drStepsPopulated || _drIsResume) return;
    _drSetStepStatuses(_DRR_STEPS.map(function(_, i) { return i === 0 ? "active" : "pending"; }));
    _drSetStepSubtexts(_DRR_STEPS.map(function() { return false; }));
    var timers = [], cum = 0;
    _DRR_STEPS.forEach(function(step, i) {
      cum += step.duration;
      if (step.subtext) timers.push(setTimeout(function() { _drSetStepSubtexts(function(prev) { var n = prev.slice(); n[i] = true; return n; }); }, cum - 350));
      timers.push(setTimeout(function() { _drSetStepStatuses(function(prev) { var n = prev.slice(); n[i] = "done"; if (i + 1 < _DRR_STEPS.length) n[i + 1] = "active"; return n; }); }, cum));
    });
    return function() { timers.forEach(clearTimeout); };
  }, [_drStepsPopulated, _drRestartKey]);

  useEffect(function() { if (!_drStepsComplete || _drIsResume) return; var t1 = setTimeout(function() { _drSetStepsCollapsed(true); }, 500); var t2 = setTimeout(function() { _drSetResultsVisible(true); }, 700); return function() { clearTimeout(t1); clearTimeout(t2); }; }, [_drStepsComplete, _drRestartKey]);
  useEffect(function() { if (!_drResultsVisible || _drIsResume) return; var t1 = setTimeout(function() { _drSetCanvasReady(true); }, 3200); var t2 = setTimeout(function() { _drSetBoxesOpen(true); }, 3800); return function() { clearTimeout(t1); clearTimeout(t2); }; }, [_drResultsVisible, _drRestartKey]);
  useEffect(function() { if (_drChatEndRef.current) _drChatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" }); }, [_drLine1Done, _drStepsComplete, _drCanvasReady]);
  useEffect(function() { var el = _drChatScrollRef.current; if (!el) return; var onScroll = function() { _drSetIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 40); }; el.addEventListener("scroll", onScroll); return function() { el.removeEventListener("scroll", onScroll); }; }, []);
  useEffect(function() { var onKey = function(e) { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", onKey); return function() { window.removeEventListener("keydown", onKey); }; }, []);

  var _drHandleDragStart = function(e) { e.preventDefault(); _drSetIsDragging(true); var startX = e.clientX, startW = _drChatWidth; var onMove = function(ev) { _drSetChatWidth(Math.max(280, Math.min(700, startW + (ev.clientX - startX)))); }; var onUp = function() { _drSetIsDragging(false); document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); document.body.style.cursor = ""; document.body.style.userSelect = ""; }; document.body.style.cursor = "col-resize"; document.body.style.userSelect = "none"; document.addEventListener("mousemove", onMove); document.addEventListener("mouseup", onUp); };

  var _drHandleRestart = function() { _drSetStepStatuses([]); _drSetStepSubtexts([]); _drSetVisibleSteps(0); _drSetStepsPopulated(false); _drSetStepsCollapsed(false); _drSetResultsVisible(false); _drSetCanvasReady(false); _drSetBoxesOpen(false); _drSetResolvedCards(new Set()); _drSetIgnoredCards(new Set()); _drSetCardActions({}); _drSetAnalysisOpen(false); _drSetIsResume(false); _drSetRestartKey(function(k) { return k + 1; }); if (onStateChange) onStateChange(null); };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 200, display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif", background: T.colorSurfaceContrast }}>
      <style>{`@keyframes _drFadeIn{from{opacity:0}to{opacity:1}} @keyframes _drStepReveal{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} @keyframes _drStepPop{0%{transform:scale(0.8);opacity:0}100%{transform:scale(1);opacity:1}} @keyframes _drTextShimmer{0%{background-position:200% center}100%{background-position:-200% center}}`}</style>
      <div style={{ height: 96, background: T.colorSurfacePrimary, borderBottom: "1px solid " + T.colorButtonSecondary, display: "flex", alignItems: "center", padding: "0 24px", flexShrink: 0, gap: 16, zIndex: 10, position: "relative" }}>
        <span style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, letterSpacing: "-1px", flexShrink: 0 }}>Deferred revenue review</span>
        <div ref={_drPeriodDropRef} style={{ position: "relative" }}>
          <button onClick={function() { _drSetPeriodDropOpen(function(o) { return !o; }); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 12px", height: 48, border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" }}>
            <span>{_drActivePeriod}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition: "transform 0.2s ease", transform: _drPeriodDropOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}><path d="M4 6L8 10L12 6" stroke="#080908" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {_drPeriodDropOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: T.colorSurfacePrimary, border: "1px solid " + T.colorBorderDark, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 100, minWidth: 260, overflow: "hidden", padding: "6px" }}>
              {_drAllMonths.map(function(p, idx) {
                var isSelected = p === _drActivePeriod, isCompleted = idx < _drCurrentIdx, isInReview = idx === _drCurrentIdx;
                return (<button key={p} onClick={function() { _drSetActivePeriod(p); _drSetPeriodDropOpen(false); }} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, textAlign: "left", padding: "10px 12px", fontSize: 14, color: T.colorTextPrimary, fontWeight: isSelected ? 500 : 400, background: isSelected ? T.colorBorderLight : "transparent", border: "none", cursor: "pointer", borderRadius: 8, boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }} onMouseEnter={function(e) { if (!isSelected) e.currentTarget.style.background = T.colorSurfaceSecondary; }} onMouseLeave={function(e) { if (!isSelected) e.currentTarget.style.background = isSelected ? T.colorBorderLight : "transparent"; }}><span>{p}</span>{isCompleted && <span style={{ fontSize: 12, fontWeight: 500, color: T.colorBrandPrimary, background: T.colorBrandLighter, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>Completed</span>}{isInReview && <span style={{ fontSize: 12, fontWeight: 500, color: T.colorWarning, background: T.colorWarningBg, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>In review</span>}</button>);
              })}
            </div>
          )}
        </div>
        <div style={{ flex: 1 }} />
        {_drCanvasReady && (<button onClick={function() { _drSetBoxesOpen(function(o) { return !o; }); }} style={{ display: "flex", alignItems: "center", gap: 0, marginRight: 8, cursor: "pointer", fontFamily: "inherit", border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, height: 48, minWidth: 48, padding: _drBoxesOpen ? 0 : "0 12px 0 0", overflow: "hidden", justifyContent: "center", flexShrink: 0, transition: "padding 0.35s cubic-bezier(0.16,1,0.3,1), background 0.15s" }} onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceTertiary; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; }}><div style={{ maxWidth: _drBoxesOpen ? 0 : 200, opacity: _drBoxesOpen ? 0 : 1, overflow: "hidden", transition: "max-width 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s", display: "flex", flexDirection: "column", gap: 4, paddingLeft: _drBoxesOpen ? 0 : 12, paddingRight: _drBoxesOpen ? 0 : 10 }}><div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}><span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextThird, whiteSpace: "nowrap" }}>Suggestions</span><span style={{ fontSize: 14, fontWeight: 600, color: T.colorTextPrimary, whiteSpace: "nowrap" }}>{_drResolvedCount}/{_drTotalSuggestions}</span></div><div style={{ height: 2, background: T.colorBorderDark, borderRadius: 1, overflow: "hidden" }}><div style={{ height: "100%", width: Math.round((_drResolvedCount / _drTotalSuggestions) * 100) + "%", background: T.colorBrandPrimary, borderRadius: 1, transition: "width 0.4s ease" }} /></div></div>{_drBoxesOpen ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M21 21V3M3 12H17M17 12L10 5M17 12L10 19" stroke={T.colorTextHeading} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M15 21L15 3M16.2 21H7.8C6.12 21 5.28 21 4.64 20.673C4.07 20.385 3.61 19.927 3.33 19.362C3 18.72 3 17.88 3 16.2V7.8C3 6.12 3 5.28 3.33 4.638C3.61 4.074 4.07 3.615 4.64 3.327C5.28 3 6.12 3 7.8 3H16.2C17.88 3 18.72 3 19.362 3.327C19.927 3.615 20.385 4.074 20.673 4.638C21 5.28 21 6.12 21 7.8V16.2C21 17.88 21 18.72 20.673 19.362C20.385 19.927 19.927 20.385 19.362 20.673C18.72 21 17.88 21 16.2 21Z" stroke={T.colorTextHeading} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}</button>)}
        <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}><svg width="30" height="30" viewBox="0 0 30 30" fill="none"><rect width="30" height="30" rx="15" fill="#F5F5F5"/><path d="M20 10L10 20M10 10L20 20" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative", padding: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", width: _drResultsVisible ? _drChatWidth : "100%", flexShrink: 0, transition: _drIsDragging ? "none" : "width 0.72s cubic-bezier(0.16,1,0.3,1)", overflow: "hidden", willChange: "width", position: "relative", zIndex: 1 }}>
          {_drResultsVisible && (<button onClick={function() { _drChatScrollRef.current && _drChatScrollRef.current.scrollTo({ top: _drChatScrollRef.current.scrollHeight, behavior: "smooth" }); }} style={{ position: "absolute", bottom: 218, left: "50%", transform: "translateX(-50%)", zIndex: 10, width: 32, height: 32, borderRadius: "50%", background: T.colorSurfacePrimary, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)", opacity: _drIsAtBottom ? 0 : 1, pointerEvents: _drIsAtBottom ? "none" : "auto", transition: "opacity 0.35s ease" }} onMouseEnter={function(e) { e.currentTarget.style.background = T.colorBorderLight; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg></button>)}
          <div style={{ flex: 1, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
            <div ref={_drChatScrollRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", scrollBehavior: "smooth" }}>
              {_drResultsVisible && <div style={{ position: "sticky", top: 0, height: 40, marginBottom: -40, background: "linear-gradient(to bottom, rgba(251,251,251,1) 0%, rgba(251,251,251,0) 100%)", zIndex: 2, pointerEvents: "none", flexShrink: 0 }} />}
              <div style={{ maxWidth: 680, width: "100%", margin: "0 auto", padding: _drResultsVisible ? "24px 24px 100px" : "24px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", width: _drResultsVisible ? "90%" : "70%", marginBottom: 20 }}><p style={{ margin: 0 }}><StreamingMessage segments={_drLine1Segments} speed={18} instant={_drIsResume} key={_drIsResume ? "resume-intro" : "fresh-intro-" + _drRestartKey} /></p></div>
                {_drStepsPopulated && _drStepStatuses.length > 0 && (
                  <div style={{ animation: "_drFadeIn 0.3s ease both" }}>
                    <button onClick={function() { _drSetStepsCollapsed(function(c) { return !c; }); }} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: _drStepsCollapsed ? 0 : 20, cursor: "pointer", background: "none", border: "none", padding: 0, width: "100%", textAlign: "left" }}>
                      <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                      <div style={{ flex: 1 }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 15, fontWeight: 600, color: T.colorTextPrimary }}>Deferred revenue review</span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: "transform 0.2s ease", transform: _drStepsCollapsed ? "rotate(180deg)" : "rotate(0deg)" }}><path d="M3 8.5L7 4.5L11 8.5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg></div><span style={{ fontSize: 13, color: T.colorTextSecondary }}>{_drStepsComplete ? "Completed" : "In progress"}</span></div>
                    </button>
                    {!_drStepsCollapsed && _DRR_STEPS.map(function(step, i) {
                      if (i >= _drVisibleSteps) return null;
                      var status = _drStepStatuses[i] || "pending", isLast = i === _DRR_STEPS.length - 1;
                      return (<div key={i} style={{ display: "flex", gap: 16, animation: "_drStepReveal 0.4s cubic-bezier(0.16,1,0.3,1) both" }}><div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 2, overflow: "visible" }}><div style={{ width: 20, height: 20, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "visible" }}>{status === "done" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: "_drStepPop 0.35s cubic-bezier(0.34,1.4,0.64,1) both" }}><circle cx="10" cy="10" r="10" fill={T.colorBrandPrimary}/><path d="M5.5 10.5L8.5 13.5L14.5 7" stroke={T.colorSurfacePrimary} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>}{status === "active" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: "spin 0.75s linear infinite" }}><path d="M10 2A8 8 0 1 1 2 10" stroke={T.colorBrandPrimary} strokeWidth="1.5" strokeLinecap="round"/></svg>}{status === "pending" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9.25" stroke={T.colorBorderDark} strokeWidth="1.5"/></svg>}</div>{!isLast && i + 1 < _drVisibleSteps && <div style={{ width: 1, flexGrow: 1, minHeight: 20, background: T.colorBorderDark, margin: "4px 0" }} />}</div><div style={{ paddingBottom: isLast ? 0 : 20 }}><div style={{ fontSize: 14, lineHeight: "24px", color: status === "pending" ? T.colorBorderInput : T.colorTextPrimary, transition: "color 0.3s ease" }}>{step.title}</div>{(_drStepSubtexts[i] || status === "done") && step.subtext && <div style={{ fontSize: 13, color: T.colorTextSecondary, marginTop: 2, lineHeight: "18px", animation: "_drFadeIn 0.3s ease" }}>{step.subtext}</div>}</div></div>);
                    })}
                  </div>
                )}
                {_drCanvasReady && (<div style={{ animation: _drIsResume ? "none" : "_drFadeIn 0.4s ease 0.2s both", marginTop: 20, fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}><p style={{ margin: 0 }}><StreamingMessage segments={[{ text: "I've found ", bold: false }, { text: "4 items", bold: true }, { text: " that need attention – including a new advance payment that should be deferred, a stale balance, and a missed release. Review each suggestion and take action or skip.", bold: false }]} speed={18} instant={_drIsResume} key={_drIsResume ? "resume" : "fresh"} /></p></div>)}
                <div ref={_drChatEndRef} />
              </div>
            </div>
          </div>
          {!_drStepsComplete && _drLine1Done && !_drIsResume && (<div style={{ padding: "0 24px 20px", flexShrink: 0 }}><div style={{ maxWidth: 680, margin: "0 auto" }}><div style={{ borderRadius: 8, padding: "14px 14px 12px", background: T.colorSurfacePrimary, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px " + T.colorBorderDark }}><div style={{ display: "flex", alignItems: "center" }}><div style={{ fontSize: 14, lineHeight: "22px", flex: 1 }}><span style={{ background: "linear-gradient(90deg, #9D9D9E 0%, #9D9D9E 30%, #2A2A2A 50%, #9D9D9E 70%, " + T.colorTextDisabled + " 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "_drTextShimmer 2s linear infinite", display: "inline-block" }}>Reviewing deferred revenue...</span></div><button style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 36, padding: "0 10px", border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 13, fontWeight: 500, color: T.colorTextPrimary, flexShrink: 0, boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }} onMouseEnter={function(e) { e.currentTarget.style.background = T.colorBorderLight; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; }}><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" rx="1.5" stroke="#080908" strokeWidth="1.25" /></svg>Stop</button></div></div></div></div>)}
          {_drCanvasReady && (<div style={{ padding: "60px 12px 16px", flexShrink: 0, background: "linear-gradient(to bottom, rgba(251,251,251,0) 0%, rgba(251,251,251,1) 60px)", marginTop: -60 }}><div style={{ maxWidth: 680, margin: "0 auto" }}><button onClick={_drHandleRestart} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, height: 40, padding: "0 16px", marginBottom: 10, border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }} onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceSecondary; e.currentTarget.style.borderColor = T.colorBorderHover; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; e.currentTarget.style.borderColor = T.colorBorderDark; }}><PlayCircleIcon color={T.colorTextPrimary} size={20} />Restart review</button><div style={{ borderRadius: 8, padding: "14px 14px 12px", background: T.colorSurfacePrimary, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px " + T.colorBorderDark }}><textarea value={_drInputValue} onChange={function(e) { _drSetInputValue(e.target.value); }} placeholder="Ask for changes or information..." rows={3} style={{ width: "100%", border: "none", outline: "none", resize: "none", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", background: "transparent", fontFamily: "'Inter', sans-serif", display: "block" }} /><div style={{ display: "flex", alignItems: "center", marginTop: 8 }}><button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: T.colorTextSecondary, padding: 0 }} onMouseEnter={function(e) { e.currentTarget.style.background = T.colorBorderLight; }} onMouseLeave={function(e) { e.currentTarget.style.background = "none"; }}><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15.5 8.5L8.5 15.5C7.12 16.88 4.88 16.88 3.5 15.5C2.12 14.12 2.12 11.88 3.5 10.5L10.5 3.5C11.33 2.67 12.67 2.67 13.5 3.5C14.33 4.33 14.33 5.67 13.5 6.5L6.5 13.5C6.08 13.92 5.42 13.92 5 13.5C4.58 13.08 4.58 12.42 5 12L11.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg></button><div style={{ flex: 1 }} /><button style={{ width: 36, height: 36, marginLeft: 6, border: "1px solid " + T.colorBorderDark, borderRadius: 10, background: _drInputValue.trim() ? T.colorBrandPrimary : T.colorSurfaceSecondary, cursor: _drInputValue.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s", padding: 0 }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M9.99984 15.8346V4.16797M9.99984 4.16797L4.1665 10.0013M9.99984 4.16797L15.8332 10.0013" stroke={_drInputValue.trim() ? "#FFFFFF" : "#8C8C8B"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg></button></div></div></div></div>)}
        </div>
        {_drResultsVisible && (<div onMouseDown={_drHandleDragStart} style={{ position: "absolute", top: 0, bottom: 0, left: _drChatWidth + 16, width: 16, cursor: "col-resize", zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 4, height: 40, borderRadius: 2, background: _drIsDragging ? T.colorBorderHover : "transparent", transition: "background 0.15s" }} /></div>)}
        <div style={{ position: "absolute", top: 16, bottom: 16, left: _drChatWidth + 32, right: _drBoxesOpen ? 432 : 16, background: T.colorSurfacePrimary, borderRadius: 8, border: "1px solid " + T.colorButtonSecondary, overflow: "hidden", zIndex: 2, transform: _drResultsVisible ? "none" : "translateX(calc(100% + 32px))", transition: _drIsDragging ? "none" : "transform 0.72s cubic-bezier(0.16,1,0.3,1), right 0.35s cubic-bezier(0.16,1,0.3,1)", willChange: _drResultsVisible ? "auto" : "transform" }}>
          {_drCanvasReady ? (
            <div style={{ animation: "_drFadeIn 0.4s ease 0.1s both", height: "100%", overflowY: "auto" }}>
              <div style={{ padding: "48px 48px 48px", maxWidth: 800, margin: "0 auto" }}>
                <h2 style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, margin: "0 0 20px" }}>Results</h2>
                {(function() {
                  var _drGlImpacts = { 3: 2800.00 };
                  var _drGlInitial = -2800.00;
                  var _drResImpact = Array.from(_drResolvedCards).reduce(function(s, i) { return s + (_drGlImpacts[i] || 0); }, 0);
                  var _drClosingDiff = _drGlInitial + _drResImpact;
                  var _drOpeningMimo = 21600.00;
                  var _drOpeningXero = 21600.00;
                  var _drOpeningDiff = 0;
                  var _drClosingMimo = 18000.00;
                  var _drClosingXero = _drClosingMimo - _drClosingDiff;
                  var _fmt = function(v) { return (v < 0 ? "–" : "") + "£" + Math.abs(v).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
                  var _diffCell = function(v) {
                    if (Math.abs(v) < 0.01) return _fmt(0);
                    return React.createElement("span", { style: { fontWeight: 600, color: T.colorTextPrimary } }, _fmt(v));
                  };
                  return React.createElement("div", { style: { marginBottom: 12 } },
                    React.createElement(DataTable, {
                      columns: [{ key: "description", label: "Description", width: "1fr" }, { key: "value", label: "Amount", width: "160px", align: "right" }],
                      rows: [
                        { description: "Opening balance per Mimo", value: _fmt(_drOpeningMimo) },
                        { description: "Opening balance per Xero", value: _fmt(_drOpeningXero) },
                        { description: "Opening balance difference", value: _diffCell(_drOpeningDiff) },
                        { description: "Additions", value: "£3,200.00" },
                        { description: "Releases", value: "(£6,800.00)" },
                        { description: "Closing balance per Mimo", value: _fmt(_drClosingMimo) },
                        { description: "Closing balance per Xero", value: _fmt(_drClosingXero) },
                        { description: "Closing balance difference", value: _diffCell(_drClosingDiff) },
                      ]
                    })
                  );
                })()}
                <div style={{ background: T.colorSurfacePrimary, border: "1px solid " + T.colorButtonSecondary, borderRadius: 8, marginBottom: 28, overflow: "hidden" }}>
                  <div onClick={function() { _drSetAnalysisOpen(function(o) { return !o; }); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 67, padding: "0 20px", cursor: "pointer" }}><span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>Analysis & key findings</span><div style={{ display: "flex", transform: _drAnalysisOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)", flexShrink: 0, marginLeft: 12 }}><ChevronUpIcon /></div></div>
                  <div style={{ overflow: "hidden", maxHeight: _drAnalysisOpen ? 400 : 0, opacity: _drAnalysisOpen ? 1 : 0, transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease" }}>
                    <div style={{ fontSize: 14, color: T.colorTextBody, lineHeight: "20px", margin: "0 20px 16px", borderTop: "1px solid " + T.colorBorderSubtle, paddingTop: 14 }}>
                      <p style={{ margin: "0 0 10px" }}>The deferred revenue review for {selectedPeriod} cross-referenced your current schedule against 48 Xero sales invoices and 6 prior-year deferral items.</p>
                      <p style={{ margin: "0 0 10px" }}>The most significant finding is an £18,000.00 advance payment from Lidl for a Christmas snack range that was fully recognised in March. No product has been delivered yet, so the entire balance should be deferred and released across August to November.</p>
                      <p style={{ margin: "0 0 10px" }}>A Costco co-packing contract of £14,400.00 was invoiced in March but covers six months of production. Four months remain undelivered. An Ocado promotion schedule carries a residual £280.00 balance from a completed campaign that should be released.</p>
                      <p style={{ margin: 0 }}>The Waitrose seasonal line schedule has a missing April release of £1,600.00 that appears to have been skipped during the period-end close.</p>
                    </div>
                  </div>
                </div>
                <hr style={{ border: "none", borderTop: "1px solid " + T.colorBorderDark, margin: "32px 0 40px" }} />
                <h3 style={{ fontSize: 20, fontWeight: 500, color: T.colorTextPrimary, margin: "0 0 16px" }}>Suggestions</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {_DRR_CARDS.map(function(card) {
                    var isResolved = _drResolvedCards.has(card.idx), isIgnored = _drIgnoredCards.has(card.idx), actionLabel = _drCardActions[card.idx];
                    var statusLabel = isResolved ? (actionLabel || "Journal posted") : isIgnored ? (actionLabel || "Resolved") : "Unresolved";
                    var statusStyle = isResolved ? { background: T.colorBrandLighter, border: "none", color: T.colorBrandPrimary } : isIgnored ? { background: T.colorButtonDisabled, border: "none", color: T.colorTextSecondary } : { background: T.colorWarningBg, border: "none", color: T.colorWarning };
                    var primaryActionLabels = { "Review suggestion": "Journal posted" };
                    return (<div key={card.idx} id={"result-" + card.key + "-0"} style={{ scrollMarginTop: 64 }}><RecommendationCard title={card.title} description={card.description} statusLabel={statusLabel} statusStyle={statusStyle} collapsed={isResolved || isIgnored} isIgnored={isIgnored} hideMore={true} tableRow={card.tableRow} tableColumns={[{ key: "account", label: "Account", width: "1.4fr" }, { key: "amount", label: "Amount", width: "0.8fr" }, { key: "period", label: "Period", width: "0.8fr" }]} primaryLabel={card.primaryLabel} secondaryLabel={card.secondaryLabel} onPrimaryAction={function() { _drSetResolvedCards(function(prev) { return new Set([].concat(Array.from(prev), [card.idx])); }); _drSetCardActions(function(prev) { var o = Object.assign({}, prev); o[card.idx] = primaryActionLabels[card.primaryLabel] || "Journal posted"; return o; }); }} onIgnore={function() { _drSetIgnoredCards(function(prev) { return new Set([].concat(Array.from(prev), [card.idx])); }); }} onSecondaryAction={function() { _drSetResolvedCards(function(prev) { return new Set([].concat(Array.from(prev), [card.idx])); }); _drSetCardActions(function(prev) { var o = Object.assign({}, prev); o[card.idx] = "Resolved"; return o; }); }} onMore={function() {}} /></div>);
                  })}
                </div>
              </div>
            </div>
          ) : _drResultsVisible ? <CanvasLoader /> : null}
        </div>
        {_drCanvasReady && (
          <div style={{ position: "absolute", top: 16, bottom: 16, right: 16, width: 400, zIndex: 3, transform: _drBoxesOpen ? "translateX(0)" : "translateX(calc(100% + 32px))", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)", pointerEvents: _drBoxesOpen ? "auto" : "none", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: T.colorSurfacePrimary, borderRadius: 8, border: "1px solid " + T.colorButtonSecondary, overflow: "hidden", flexShrink: 0 }}>
              <div style={{ padding: "18px 20px" }}><span style={{ fontSize: 16, fontWeight: 500, color: T.colorTextPrimary }}>Linked sources</span></div>
              <div style={{ borderTop: "1px solid " + T.colorSurfaceActive, padding: "12px 10px 16px" }}>
                <button onClick={function() { _drSetScheduleOpen(true); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", border: "none", background: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit", borderRadius: 6 }} onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceTertiary; }} onMouseLeave={function(e) { e.currentTarget.style.background = "none"; }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}><path d="M17.5 8.33H2.5M13.33 1.67V5M6.67 1.67V5M6.5 18.33H13.5C14.9 18.33 15.6 18.33 16.14 18.06C16.61 17.82 16.99 17.44 17.23 16.97C17.5 16.43 17.5 15.73 17.5 14.33V7.33C17.5 5.93 17.5 5.23 17.23 4.7C16.99 4.23 16.61 3.85 16.14 3.61C15.6 3.33 14.9 3.33 13.5 3.33H6.5C5.1 3.33 4.4 3.33 3.87 3.61C3.39 3.85 3.01 4.23 2.77 4.7C2.5 5.23 2.5 5.93 2.5 7.33V14.33C2.5 15.73 2.5 16.43 2.77 16.97C3.01 17.44 3.39 17.82 3.87 18.06C4.4 18.33 5.1 18.33 6.5 18.33Z" stroke={T.colorTextSecondary} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>Deferred revenue schedule</span>
                </button>
              </div>
            </div>
            <SuggestionsBox isCleanReconcile={false} allJustResolved={_drAllDone} accountStatus={null} resolvedCount={_drResolvedCount} totalSuggestions={_drTotalSuggestions} matchedTotal={null}
              navCategories={_DRR_NAV_CATS.map(function(cat) { return Object.assign({}, cat, { items: cat.items.map(function(item) { return Object.assign({}, item); }) }); })}
              resolvedCards={_drResolvedCards} ignoredCards={_drIgnoredCards}
              completedTitle="Deferred revenue review complete" completedDescription={"All suggestions have been reviewed. Your deferred revenue schedule is up to date for " + selectedPeriod + "."} completedColor={T.colorBrandPrimary} />
          </div>
        )}
      </div>
      <DeferredRevenueSchedulePage open={_drScheduleOpen} onClose={function() { _drSetScheduleOpen(false); }} />
    </div>
  );
}

// ── Accrued Income Review Flow ────────────────────────────────────────────

var _AIR_STEPS = [
  { title: "Reading accrued income schedule",                    subtext: null,                                              duration: 800  },
  { title: "Scanning Xero sales records for unbilled revenue",   subtext: "Reviewed 37 records from the last 90 days.",      duration: 1200 },
  { title: "Comparing with prior-year accrued income",           subtext: "Matched 4 of 5 prior-year items.",                duration: 1000 },
  { title: "Checking recognition patterns",                     subtext: "Flagged 1 item with no invoice raised.",           duration: 900  },
  { title: "Generating suggestions",                            subtext: null,                                               duration: 600  },
];

var _AIR_CARDS = [
  { idx: 0, key: "unbilled", title: "Accrue unbilled April deliveries to Booker", contact: "Booker Wholesale – monthly deliveries", description: "Booker Wholesale received £1,800.00 of product deliveries during April 2026 based on delivery notes and dispatch records. The sales invoice has not yet been raised as the customer is on a monthly billing cycle with invoices issued in the first week of the following month. Prior months show the accrual has been posted consistently at month-end.", tableRow: { account: "1104 – Accrued income", amount: "£1,800.00", period: "Apr 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
  { idx: 1, key: "rent", title: "Accrue April sublease rent from warehouse tenant", contact: "Warehouse unit B tenant – sublease", description: "The warehouse unit B sublease generates £650.00 per month in rental income. The tenant pays quarterly in arrears and the next invoice is due in July 2026 covering April to June. The April rent has been earned but not yet billed. An accrual should be posted to match the income to the period.", tableRow: { account: "1104 – Accrued income", amount: "£650.00", period: "Apr 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
  { idx: 2, key: "stale", title: "Write off £340.00 stale receivable for Morrisons", contact: "Morrisons – disputed delivery", description: "Accrued income of £340.00 was recognised in November 2025 for a partial delivery to Morrisons. The customer subsequently rejected the goods due to a packaging defect and the delivery was not invoiced. The accrual has been sitting on the balance sheet for six months with no movement. It should be written off against sales.", tableRow: { account: "4000 – Sales", amount: "£340.00", period: "Apr 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
  { idx: 3, key: "pattern", title: "Post missed April accrual for Innovate UK grant", contact: "Innovate UK – food innovation grant", description: "The Innovate UK food innovation grant accrues £750.00 of income each month based on the project milestones schedule. The accrual has been posted consistently since January 2026, but the April entry is missing. The schedule shows it as due but it was not included in the April close.", tableRow: { account: "1104 – Accrued income", amount: "£750.00", period: "Apr 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
];

var _AIR_NAV_CATS = [
  { key: "unbilled",  label: "Unbilled revenue",       baseIdx: 0, items: [{ contact: "Booker deliveries" }] },
  { key: "rent",      label: "Earned not billed",      baseIdx: 1, items: [{ contact: "Warehouse sublease" }] },
  { key: "stale",     label: "Stale receivable",       baseIdx: 2, items: [{ contact: "Morrisons disputed" }] },
  { key: "pattern",   label: "Recognition gap",        baseIdx: 3, items: [{ contact: "Innovate UK grant" }] },
];

function AccruedIncomeReviewFlow(_ref) {
  var onClose = _ref.onClose, selectedPeriod = _ref.selectedPeriod || "April 2026", onStateChange = _ref.onStateChange, savedState = _ref.savedState;
  var _aiInitResume = !!(savedState && savedState.hasResults);
  var _s = useState(_aiInitResume); var _aiIsResume = _s[0], _aiSetIsResume = _s[1];
  _s = useState(_aiInitResume ? _AIR_STEPS.map(function(){return "done";}) : []); var _aiStepStatuses = _s[0], _aiSetStepStatuses = _s[1];
  _s = useState(_aiInitResume ? _AIR_STEPS.map(function(){return true;}) : []); var _aiStepSubtexts = _s[0], _aiSetStepSubtexts = _s[1];
  _s = useState(_aiInitResume ? _AIR_STEPS.length : 0); var _aiVisibleSteps = _s[0], _aiSetVisibleSteps = _s[1];
  _s = useState(_aiInitResume); var _aiStepsPopulated = _s[0], _aiSetStepsPopulated = _s[1];
  _s = useState(_aiInitResume); var _aiStepsCollapsed = _s[0], _aiSetStepsCollapsed = _s[1];
  _s = useState(_aiInitResume); var _aiResultsVisible = _s[0], _aiSetResultsVisible = _s[1];
  _s = useState(_aiInitResume); var _aiCanvasReady = _s[0], _aiSetCanvasReady = _s[1];
  _s = useState(_aiInitResume); var _aiBoxesOpen = _s[0], _aiSetBoxesOpen = _s[1];
  _s = useState(400); var _aiChatWidth = _s[0], _aiSetChatWidth = _s[1];
  _s = useState(false); var _aiIsDragging = _s[0], _aiSetIsDragging = _s[1];
  _s = useState(true); var _aiIsAtBottom = _s[0], _aiSetIsAtBottom = _s[1];
  _s = useState(""); var _aiInputValue = _s[0], _aiSetInputValue = _s[1];
  _s = useState(_aiInitResume ? new Set(savedState.resolvedArray || []) : new Set()); var _aiResolvedCards = _s[0], _aiSetResolvedCards = _s[1];
  _s = useState(_aiInitResume ? new Set(savedState.ignoredArray || []) : new Set()); var _aiIgnoredCards = _s[0], _aiSetIgnoredCards = _s[1];
  _s = useState(_aiInitResume ? (savedState.cardActions || {}) : {}); var _aiCardActions = _s[0], _aiSetCardActions = _s[1];
  _s = useState(false); var _aiAnalysisOpen = _s[0], _aiSetAnalysisOpen = _s[1];
  _s = useState(false); var _aiPeriodDropOpen = _s[0], _aiSetPeriodDropOpen = _s[1];
  _s = useState(selectedPeriod); var _aiActivePeriod = _s[0], _aiSetActivePeriod = _s[1];
  _s = useState(false); var _aiScheduleOpen = _s[0], _aiSetScheduleOpen = _s[1];
  _s = useState(0); var _aiRestartKey = _s[0], _aiSetRestartKey = _s[1];
  var _aiChatScrollRef = useRef(null), _aiChatEndRef = useRef(null), _aiPeriodDropRef = useRef(null);

  var _aiAllMonths = ["April 2025","May 2025","June 2025","July 2025","August 2025","September 2025","October 2025","November 2025","December 2025","January 2026","February 2026","March 2026","April 2026"];
  var _aiCurrentIdx = _aiAllMonths.indexOf("April 2026");

  useEffect(function() { var handler = function(e) { if (_aiPeriodDropRef.current && !_aiPeriodDropRef.current.contains(e.target)) _aiSetPeriodDropOpen(false); }; document.addEventListener("mousedown", handler); return function() { document.removeEventListener("mousedown", handler); }; }, []);

  var _aiStepsComplete = _aiStepStatuses.length > 0 && _aiStepStatuses.every(function(s) { return s === "done"; });
  var _aiResolvedCount = _aiResolvedCards.size + _aiIgnoredCards.size;
  var _aiAllDone = _aiResolvedCount >= _AIR_CARDS.length;
  var _aiTotalSuggestions = _AIR_CARDS.length;

  useEffect(function() { if (onStateChange && _aiCanvasReady) onStateChange({ resolved: _aiResolvedCount, total: _aiTotalSuggestions, hasResults: true, resolvedArray: Array.from(_aiResolvedCards), ignoredArray: Array.from(_aiIgnoredCards), cardActions: _aiCardActions }); }, [_aiResolvedCount, _aiCanvasReady, _aiCardActions]);

  var _aiLine1Segments = [{ text: "I'll review your accrued income for ", bold: false }, { text: selectedPeriod, bold: true }, { text: ", cross-reference Xero sales records, and compare against prior-year recognition patterns to surface anything that's missing or needs attention.", bold: false }];
  var _aiLine1Full = _aiLine1Segments.map(function(s) { return s.text; }).join("");
  var _aiTw = useTypewriter(_aiLine1Full + (_aiRestartKey > 0 ? "​".repeat(_aiRestartKey) : ""), 18, _aiIsResume);
  var _aiLine1Done = _aiTw.done;

  useEffect(function() { if (!_aiLine1Done || _aiIsResume) return; var REVEAL = 80, timers = []; _AIR_STEPS.forEach(function(_, i) { timers.push(setTimeout(function() { _aiSetVisibleSteps(function(v) { return Math.max(v, i + 1); }); }, i * REVEAL)); }); timers.push(setTimeout(function() { _aiSetStepsPopulated(true); }, (_AIR_STEPS.length - 1) * REVEAL + 80)); return function() { timers.forEach(clearTimeout); }; }, [_aiLine1Done, _aiRestartKey]);

  useEffect(function() {
    if (!_aiStepsPopulated || _aiIsResume) return;
    _aiSetStepStatuses(_AIR_STEPS.map(function(_, i) { return i === 0 ? "active" : "pending"; }));
    _aiSetStepSubtexts(_AIR_STEPS.map(function() { return false; }));
    var timers = [], cum = 0;
    _AIR_STEPS.forEach(function(step, i) {
      cum += step.duration;
      if (step.subtext) timers.push(setTimeout(function() { _aiSetStepSubtexts(function(prev) { var n = prev.slice(); n[i] = true; return n; }); }, cum - 350));
      timers.push(setTimeout(function() { _aiSetStepStatuses(function(prev) { var n = prev.slice(); n[i] = "done"; if (i + 1 < _AIR_STEPS.length) n[i + 1] = "active"; return n; }); }, cum));
    });
    return function() { timers.forEach(clearTimeout); };
  }, [_aiStepsPopulated, _aiRestartKey]);

  useEffect(function() { if (!_aiStepsComplete || _aiIsResume) return; var t1 = setTimeout(function() { _aiSetStepsCollapsed(true); }, 500); var t2 = setTimeout(function() { _aiSetResultsVisible(true); }, 700); return function() { clearTimeout(t1); clearTimeout(t2); }; }, [_aiStepsComplete, _aiRestartKey]);
  useEffect(function() { if (!_aiResultsVisible || _aiIsResume) return; var t1 = setTimeout(function() { _aiSetCanvasReady(true); }, 3200); var t2 = setTimeout(function() { _aiSetBoxesOpen(true); }, 3800); return function() { clearTimeout(t1); clearTimeout(t2); }; }, [_aiResultsVisible, _aiRestartKey]);
  useEffect(function() { if (_aiChatEndRef.current) _aiChatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" }); }, [_aiLine1Done, _aiStepsComplete, _aiCanvasReady]);
  useEffect(function() { var el = _aiChatScrollRef.current; if (!el) return; var onScroll = function() { _aiSetIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 40); }; el.addEventListener("scroll", onScroll); return function() { el.removeEventListener("scroll", onScroll); }; }, []);
  useEffect(function() { var onKey = function(e) { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", onKey); return function() { window.removeEventListener("keydown", onKey); }; }, []);

  var _aiHandleDragStart = function(e) { e.preventDefault(); _aiSetIsDragging(true); var startX = e.clientX, startW = _aiChatWidth; var onMove = function(ev) { _aiSetChatWidth(Math.max(280, Math.min(700, startW + (ev.clientX - startX)))); }; var onUp = function() { _aiSetIsDragging(false); document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); document.body.style.cursor = ""; document.body.style.userSelect = ""; }; document.body.style.cursor = "col-resize"; document.body.style.userSelect = "none"; document.addEventListener("mousemove", onMove); document.addEventListener("mouseup", onUp); };

  var _aiHandleRestart = function() { _aiSetStepStatuses([]); _aiSetStepSubtexts([]); _aiSetVisibleSteps(0); _aiSetStepsPopulated(false); _aiSetStepsCollapsed(false); _aiSetResultsVisible(false); _aiSetCanvasReady(false); _aiSetBoxesOpen(false); _aiSetResolvedCards(new Set()); _aiSetIgnoredCards(new Set()); _aiSetCardActions({}); _aiSetAnalysisOpen(false); _aiSetIsResume(false); _aiSetRestartKey(function(k) { return k + 1; }); if (onStateChange) onStateChange(null); };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 200, display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif", background: T.colorSurfaceContrast }}>
      <style>{`@keyframes _aiFadeIn{from{opacity:0}to{opacity:1}} @keyframes _aiStepReveal{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} @keyframes _aiStepPop{0%{transform:scale(0.8);opacity:0}100%{transform:scale(1);opacity:1}} @keyframes _aiTextShimmer{0%{background-position:200% center}100%{background-position:-200% center}}`}</style>
      <div style={{ height: 96, background: T.colorSurfacePrimary, borderBottom: "1px solid " + T.colorButtonSecondary, display: "flex", alignItems: "center", padding: "0 24px", flexShrink: 0, gap: 16, zIndex: 10, position: "relative" }}>
        <span style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, letterSpacing: "-1px", flexShrink: 0 }}>Accrued income review</span>
        <div ref={_aiPeriodDropRef} style={{ position: "relative" }}>
          <button onClick={function() { _aiSetPeriodDropOpen(function(o) { return !o; }); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 12px", height: 48, border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" }}>
            <span>{_aiActivePeriod}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition: "transform 0.2s ease", transform: _aiPeriodDropOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}><path d="M4 6L8 10L12 6" stroke="#080908" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {_aiPeriodDropOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: T.colorSurfacePrimary, border: "1px solid " + T.colorBorderDark, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 100, minWidth: 260, overflow: "hidden", padding: "6px" }}>
              {_aiAllMonths.map(function(p, idx) {
                var isSelected = p === _aiActivePeriod, isCompleted = idx < _aiCurrentIdx, isInReview = idx === _aiCurrentIdx;
                return (<button key={p} onClick={function() { _aiSetActivePeriod(p); _aiSetPeriodDropOpen(false); }} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, textAlign: "left", padding: "10px 12px", fontSize: 14, color: T.colorTextPrimary, fontWeight: isSelected ? 500 : 400, background: isSelected ? T.colorBorderLight : "transparent", border: "none", cursor: "pointer", borderRadius: 8, boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }} onMouseEnter={function(e) { if (!isSelected) e.currentTarget.style.background = T.colorSurfaceSecondary; }} onMouseLeave={function(e) { if (!isSelected) e.currentTarget.style.background = isSelected ? T.colorBorderLight : "transparent"; }}><span>{p}</span>{isCompleted && <span style={{ fontSize: 12, fontWeight: 500, color: T.colorBrandPrimary, background: T.colorBrandLighter, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>Completed</span>}{isInReview && <span style={{ fontSize: 12, fontWeight: 500, color: T.colorWarning, background: T.colorWarningBg, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>In review</span>}</button>);
              })}
            </div>
          )}
        </div>
        <div style={{ flex: 1 }} />
        {_aiCanvasReady && (<button onClick={function() { _aiSetBoxesOpen(function(o) { return !o; }); }} style={{ display: "flex", alignItems: "center", gap: 0, marginRight: 8, cursor: "pointer", fontFamily: "inherit", border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, height: 48, minWidth: 48, padding: _aiBoxesOpen ? 0 : "0 12px 0 0", overflow: "hidden", justifyContent: "center", flexShrink: 0, transition: "padding 0.35s cubic-bezier(0.16,1,0.3,1), background 0.15s" }} onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceTertiary; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; }}><div style={{ maxWidth: _aiBoxesOpen ? 0 : 200, opacity: _aiBoxesOpen ? 0 : 1, overflow: "hidden", transition: "max-width 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s", display: "flex", flexDirection: "column", gap: 4, paddingLeft: _aiBoxesOpen ? 0 : 12, paddingRight: _aiBoxesOpen ? 0 : 10 }}><div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}><span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextThird, whiteSpace: "nowrap" }}>Suggestions</span><span style={{ fontSize: 14, fontWeight: 600, color: T.colorTextPrimary, whiteSpace: "nowrap" }}>{_aiResolvedCount}/{_aiTotalSuggestions}</span></div><div style={{ height: 2, background: T.colorBorderDark, borderRadius: 1, overflow: "hidden" }}><div style={{ height: "100%", width: Math.round((_aiResolvedCount / _aiTotalSuggestions) * 100) + "%", background: T.colorBrandPrimary, borderRadius: 1, transition: "width 0.4s ease" }} /></div></div>{_aiBoxesOpen ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M21 21V3M3 12H17M17 12L10 5M17 12L10 19" stroke={T.colorTextHeading} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M15 21L15 3M16.2 21H7.8C6.12 21 5.28 21 4.64 20.673C4.07 20.385 3.61 19.927 3.33 19.362C3 18.72 3 17.88 3 16.2V7.8C3 6.12 3 5.28 3.33 4.638C3.61 4.074 4.07 3.615 4.64 3.327C5.28 3 6.12 3 7.8 3H16.2C17.88 3 18.72 3 19.362 3.327C19.927 3.615 20.385 4.074 20.673 4.638C21 5.28 21 6.12 21 7.8V16.2C21 17.88 21 18.72 20.673 19.362C20.385 19.927 19.927 20.385 19.362 20.673C18.72 21 17.88 21 16.2 21Z" stroke={T.colorTextHeading} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}</button>)}
        <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}><svg width="30" height="30" viewBox="0 0 30 30" fill="none"><rect width="30" height="30" rx="15" fill="#F5F5F5"/><path d="M20 10L10 20M10 10L20 20" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative", padding: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", width: _aiResultsVisible ? _aiChatWidth : "100%", flexShrink: 0, transition: _aiIsDragging ? "none" : "width 0.72s cubic-bezier(0.16,1,0.3,1)", overflow: "hidden", willChange: "width", position: "relative", zIndex: 1 }}>
          {_aiResultsVisible && (<button onClick={function() { _aiChatScrollRef.current && _aiChatScrollRef.current.scrollTo({ top: _aiChatScrollRef.current.scrollHeight, behavior: "smooth" }); }} style={{ position: "absolute", bottom: 218, left: "50%", transform: "translateX(-50%)", zIndex: 10, width: 32, height: 32, borderRadius: "50%", background: T.colorSurfacePrimary, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)", opacity: _aiIsAtBottom ? 0 : 1, pointerEvents: _aiIsAtBottom ? "none" : "auto", transition: "opacity 0.35s ease" }} onMouseEnter={function(e) { e.currentTarget.style.background = T.colorBorderLight; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg></button>)}
          <div style={{ flex: 1, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
            <div ref={_aiChatScrollRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", scrollBehavior: "smooth" }}>
              {_aiResultsVisible && <div style={{ position: "sticky", top: 0, height: 40, marginBottom: -40, background: "linear-gradient(to bottom, rgba(251,251,251,1) 0%, rgba(251,251,251,0) 100%)", zIndex: 2, pointerEvents: "none", flexShrink: 0 }} />}
              <div style={{ maxWidth: 680, width: "100%", margin: "0 auto", padding: _aiResultsVisible ? "24px 24px 100px" : "24px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", width: _aiResultsVisible ? "90%" : "70%", marginBottom: 20 }}><p style={{ margin: 0 }}><StreamingMessage segments={_aiLine1Segments} speed={18} instant={_aiIsResume} key={_aiIsResume ? "resume-intro" : "fresh-intro-" + _aiRestartKey} /></p></div>
                {_aiStepsPopulated && _aiStepStatuses.length > 0 && (
                  <div style={{ animation: "_aiFadeIn 0.3s ease both" }}>
                    <button onClick={function() { _aiSetStepsCollapsed(function(c) { return !c; }); }} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: _aiStepsCollapsed ? 0 : 20, cursor: "pointer", background: "none", border: "none", padding: 0, width: "100%", textAlign: "left" }}>
                      <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                      <div style={{ flex: 1 }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 15, fontWeight: 600, color: T.colorTextPrimary }}>Accrued income review</span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: "transform 0.2s ease", transform: _aiStepsCollapsed ? "rotate(180deg)" : "rotate(0deg)" }}><path d="M3 8.5L7 4.5L11 8.5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg></div><span style={{ fontSize: 13, color: T.colorTextSecondary }}>{_aiStepsComplete ? "Completed" : "In progress"}</span></div>
                    </button>
                    {!_aiStepsCollapsed && _AIR_STEPS.map(function(step, i) {
                      if (i >= _aiVisibleSteps) return null;
                      var status = _aiStepStatuses[i] || "pending", isLast = i === _AIR_STEPS.length - 1;
                      return (<div key={i} style={{ display: "flex", gap: 16, animation: "_aiStepReveal 0.4s cubic-bezier(0.16,1,0.3,1) both" }}><div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 2, overflow: "visible" }}><div style={{ width: 20, height: 20, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "visible" }}>{status === "done" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: "_aiStepPop 0.35s cubic-bezier(0.34,1.4,0.64,1) both" }}><circle cx="10" cy="10" r="10" fill={T.colorBrandPrimary}/><path d="M5.5 10.5L8.5 13.5L14.5 7" stroke={T.colorSurfacePrimary} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>}{status === "active" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: "spin 0.75s linear infinite" }}><path d="M10 2A8 8 0 1 1 2 10" stroke={T.colorBrandPrimary} strokeWidth="1.5" strokeLinecap="round"/></svg>}{status === "pending" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9.25" stroke={T.colorBorderDark} strokeWidth="1.5"/></svg>}</div>{!isLast && i + 1 < _aiVisibleSteps && <div style={{ width: 1, flexGrow: 1, minHeight: 20, background: T.colorBorderDark, margin: "4px 0" }} />}</div><div style={{ paddingBottom: isLast ? 0 : 20 }}><div style={{ fontSize: 14, lineHeight: "24px", color: status === "pending" ? T.colorBorderInput : T.colorTextPrimary, transition: "color 0.3s ease" }}>{step.title}</div>{(_aiStepSubtexts[i] || status === "done") && step.subtext && <div style={{ fontSize: 13, color: T.colorTextSecondary, marginTop: 2, lineHeight: "18px", animation: "_aiFadeIn 0.3s ease" }}>{step.subtext}</div>}</div></div>);
                    })}
                  </div>
                )}
                {_aiCanvasReady && (<div style={{ animation: _aiIsResume ? "none" : "_aiFadeIn 0.4s ease 0.2s both", marginTop: 20, fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}><p style={{ margin: 0 }}><StreamingMessage segments={[{ text: "I've found ", bold: false }, { text: "4 items", bold: true }, { text: " that need attention – including unbilled revenue, a stale receivable, and a missed recognition. Review each suggestion and take action or skip.", bold: false }]} speed={18} instant={_aiIsResume} key={_aiIsResume ? "resume" : "fresh"} /></p></div>)}
                <div ref={_aiChatEndRef} />
              </div>
            </div>
          </div>
          {!_aiStepsComplete && _aiLine1Done && !_aiIsResume && (<div style={{ padding: "0 24px 20px", flexShrink: 0 }}><div style={{ maxWidth: 680, margin: "0 auto" }}><div style={{ borderRadius: 8, padding: "14px 14px 12px", background: T.colorSurfacePrimary, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px " + T.colorBorderDark }}><div style={{ display: "flex", alignItems: "center" }}><div style={{ fontSize: 14, lineHeight: "22px", flex: 1 }}><span style={{ background: "linear-gradient(90deg, #9D9D9E 0%, #9D9D9E 30%, #2A2A2A 50%, #9D9D9E 70%, " + T.colorTextDisabled + " 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "_aiTextShimmer 2s linear infinite", display: "inline-block" }}>Reviewing accrued income...</span></div><button style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 36, padding: "0 10px", border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 13, fontWeight: 500, color: T.colorTextPrimary, flexShrink: 0, boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }} onMouseEnter={function(e) { e.currentTarget.style.background = T.colorBorderLight; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; }}><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" rx="1.5" stroke="#080908" strokeWidth="1.25" /></svg>Stop</button></div></div></div></div>)}
          {_aiCanvasReady && (<div style={{ padding: "60px 12px 16px", flexShrink: 0, background: "linear-gradient(to bottom, rgba(251,251,251,0) 0%, rgba(251,251,251,1) 60px)", marginTop: -60 }}><div style={{ maxWidth: 680, margin: "0 auto" }}><button onClick={_aiHandleRestart} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, height: 40, padding: "0 16px", marginBottom: 10, border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }} onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceSecondary; e.currentTarget.style.borderColor = T.colorBorderHover; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; e.currentTarget.style.borderColor = T.colorBorderDark; }}><PlayCircleIcon color={T.colorTextPrimary} size={20} />Restart review</button><div style={{ borderRadius: 8, padding: "14px 14px 12px", background: T.colorSurfacePrimary, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px " + T.colorBorderDark }}><textarea value={_aiInputValue} onChange={function(e) { _aiSetInputValue(e.target.value); }} placeholder="Ask for changes or information..." rows={3} style={{ width: "100%", border: "none", outline: "none", resize: "none", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", background: "transparent", fontFamily: "'Inter', sans-serif", display: "block" }} /><div style={{ display: "flex", alignItems: "center", marginTop: 8 }}><button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: T.colorTextSecondary, padding: 0 }} onMouseEnter={function(e) { e.currentTarget.style.background = T.colorBorderLight; }} onMouseLeave={function(e) { e.currentTarget.style.background = "none"; }}><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15.5 8.5L8.5 15.5C7.12 16.88 4.88 16.88 3.5 15.5C2.12 14.12 2.12 11.88 3.5 10.5L10.5 3.5C11.33 2.67 12.67 2.67 13.5 3.5C14.33 4.33 14.33 5.67 13.5 6.5L6.5 13.5C6.08 13.92 5.42 13.92 5 13.5C4.58 13.08 4.58 12.42 5 12L11.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg></button><div style={{ flex: 1 }} /><button style={{ width: 36, height: 36, marginLeft: 6, border: "1px solid " + T.colorBorderDark, borderRadius: 10, background: _aiInputValue.trim() ? T.colorBrandPrimary : T.colorSurfaceSecondary, cursor: _aiInputValue.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s", padding: 0 }}><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M9.99984 15.8346V4.16797M9.99984 4.16797L4.1665 10.0013M9.99984 4.16797L15.8332 10.0013" stroke={_aiInputValue.trim() ? "#FFFFFF" : "#8C8C8B"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg></button></div></div></div></div>)}
        </div>
        {_aiResultsVisible && (<div onMouseDown={_aiHandleDragStart} style={{ position: "absolute", top: 0, bottom: 0, left: _aiChatWidth + 16, width: 16, cursor: "col-resize", zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 4, height: 40, borderRadius: 2, background: _aiIsDragging ? T.colorBorderHover : "transparent", transition: "background 0.15s" }} /></div>)}
        <div style={{ position: "absolute", top: 16, bottom: 16, left: _aiChatWidth + 32, right: _aiBoxesOpen ? 432 : 16, background: T.colorSurfacePrimary, borderRadius: 8, border: "1px solid " + T.colorButtonSecondary, overflow: "hidden", zIndex: 2, transform: _aiResultsVisible ? "none" : "translateX(calc(100% + 32px))", transition: _aiIsDragging ? "none" : "transform 0.72s cubic-bezier(0.16,1,0.3,1), right 0.35s cubic-bezier(0.16,1,0.3,1)", willChange: _aiResultsVisible ? "auto" : "transform" }}>
          {_aiCanvasReady ? (
            <div style={{ animation: "_aiFadeIn 0.4s ease 0.1s both", height: "100%", overflowY: "auto" }}>
              <div style={{ padding: "48px 48px 48px", maxWidth: 800, margin: "0 auto" }}>
                <h2 style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, margin: "0 0 20px" }}>Results</h2>
                {(function() {
                  var _aiGlImpacts = { 2: 890.00, 3: 1650.00 };
                  var _aiGlInitial = -2540.00;
                  var _aiResImpact = Array.from(_aiResolvedCards).reduce(function(s, i) { return s + (_aiGlImpacts[i] || 0); }, 0);
                  var _aiClosingDiff = _aiGlInitial + _aiResImpact;
                  var _aiOpeningMimo = 9800.00;
                  var _aiOpeningXero = 9800.00;
                  var _aiOpeningDiff = 0;
                  var _aiClosingMimo = 11250.00;
                  var _aiClosingXero = _aiClosingMimo - _aiClosingDiff;
                  var _fmt = function(v) { return (v < 0 ? "–" : "") + "£" + Math.abs(v).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
                  var _diffCell = function(v) {
                    if (Math.abs(v) < 0.01) return _fmt(0);
                    return React.createElement("span", { style: { fontWeight: 600, color: T.colorTextPrimary } }, _fmt(v));
                  };
                  return React.createElement("div", { style: { marginBottom: 12 } },
                    React.createElement(DataTable, {
                      columns: [{ key: "description", label: "Description", width: "1fr" }, { key: "value", label: "Amount", width: "160px", align: "right" }],
                      rows: [
                        { description: "Opening balance per Mimo", value: _fmt(_aiOpeningMimo) },
                        { description: "Opening balance per Xero", value: _fmt(_aiOpeningXero) },
                        { description: "Opening balance difference", value: _diffCell(_aiOpeningDiff) },
                        { description: "Additions", value: "£5,200.00" },
                        { description: "Releases", value: "(£3,750.00)" },
                        { description: "Closing balance per Mimo", value: _fmt(_aiClosingMimo) },
                        { description: "Closing balance per Xero", value: _fmt(_aiClosingXero) },
                        { description: "Closing balance difference", value: _diffCell(_aiClosingDiff) },
                      ]
                    })
                  );
                })()}
                <div style={{ background: T.colorSurfacePrimary, border: "1px solid " + T.colorButtonSecondary, borderRadius: 8, marginBottom: 28, overflow: "hidden" }}>
                  <div onClick={function() { _aiSetAnalysisOpen(function(o) { return !o; }); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 67, padding: "0 20px", cursor: "pointer" }}><span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>Analysis & key findings</span><div style={{ display: "flex", transform: _aiAnalysisOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)", flexShrink: 0, marginLeft: 12 }}><ChevronUpIcon /></div></div>
                  <div style={{ overflow: "hidden", maxHeight: _aiAnalysisOpen ? 400 : 0, opacity: _aiAnalysisOpen ? 1 : 0, transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease" }}>
                    <div style={{ fontSize: 14, color: T.colorTextBody, lineHeight: "20px", margin: "0 20px 16px", borderTop: "1px solid " + T.colorBorderSubtle, paddingTop: 14 }}>
                      <p style={{ margin: "0 0 10px" }}>The accrued income review for {selectedPeriod} cross-referenced your current schedule against 37 Xero sales records and 5 prior-year accrued income items.</p>
                      <p style={{ margin: "0 0 10px" }}>The most significant finding is unbilled deliveries to Booker Wholesale. April dispatch records show £1,800.00 of product shipped but the invoice has not yet been raised – prior months show a consistent monthly accrual pattern that has not been followed this period.</p>
                      <p style={{ margin: "0 0 10px" }}>The warehouse unit B sublease rent of £650.00 for April has been earned but not yet billed as the tenant pays quarterly in arrears. A Morrisons accrual of £340.00 from November 2025 relates to a disputed delivery that was never invoiced and should be written off.</p>
                      <p style={{ margin: 0 }}>The Innovate UK food innovation grant is missing its April accrual of £750.00, breaking a consistent pattern that has been running since January 2026.</p>
                    </div>
                  </div>
                </div>
                <hr style={{ border: "none", borderTop: "1px solid " + T.colorBorderDark, margin: "32px 0 40px" }} />
                <h3 style={{ fontSize: 20, fontWeight: 500, color: T.colorTextPrimary, margin: "0 0 16px" }}>Suggestions</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {_AIR_CARDS.map(function(card) {
                    var isResolved = _aiResolvedCards.has(card.idx), isIgnored = _aiIgnoredCards.has(card.idx), actionLabel = _aiCardActions[card.idx];
                    var statusLabel = isResolved ? (actionLabel || "Journal posted") : isIgnored ? (actionLabel || "Resolved") : "Unresolved";
                    var statusStyle = isResolved ? { background: T.colorBrandLighter, border: "none", color: T.colorBrandPrimary } : isIgnored ? { background: T.colorButtonDisabled, border: "none", color: T.colorTextSecondary } : { background: T.colorWarningBg, border: "none", color: T.colorWarning };
                    var primaryActionLabels = { "Review suggestion": "Journal posted" };
                    return (<div key={card.idx} id={"result-" + card.key + "-0"} style={{ scrollMarginTop: 64 }}><RecommendationCard title={card.title} description={card.description} statusLabel={statusLabel} statusStyle={statusStyle} collapsed={isResolved || isIgnored} isIgnored={isIgnored} hideMore={true} tableRow={card.tableRow} tableColumns={[{ key: "account", label: "Account", width: "1.4fr" }, { key: "amount", label: "Amount", width: "0.8fr" }, { key: "period", label: "Period", width: "0.8fr" }]} primaryLabel={card.primaryLabel} secondaryLabel={card.secondaryLabel} onPrimaryAction={function() { _aiSetResolvedCards(function(prev) { return new Set([].concat(Array.from(prev), [card.idx])); }); _aiSetCardActions(function(prev) { var o = Object.assign({}, prev); o[card.idx] = primaryActionLabels[card.primaryLabel] || "Journal posted"; return o; }); }} onIgnore={function() { _aiSetIgnoredCards(function(prev) { return new Set([].concat(Array.from(prev), [card.idx])); }); }} onSecondaryAction={function() { _aiSetResolvedCards(function(prev) { return new Set([].concat(Array.from(prev), [card.idx])); }); _aiSetCardActions(function(prev) { var o = Object.assign({}, prev); o[card.idx] = "Resolved"; return o; }); }} onMore={function() {}} /></div>);
                  })}
                </div>
              </div>
            </div>
          ) : _aiResultsVisible ? <CanvasLoader /> : null}
        </div>
        {_aiCanvasReady && (
          <div style={{ position: "absolute", top: 16, bottom: 16, right: 16, width: 400, zIndex: 3, transform: _aiBoxesOpen ? "translateX(0)" : "translateX(calc(100% + 32px))", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)", pointerEvents: _aiBoxesOpen ? "auto" : "none", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: T.colorSurfacePrimary, borderRadius: 8, border: "1px solid " + T.colorButtonSecondary, overflow: "hidden", flexShrink: 0 }}>
              <div style={{ padding: "18px 20px" }}><span style={{ fontSize: 16, fontWeight: 500, color: T.colorTextPrimary }}>Linked sources</span></div>
              <div style={{ borderTop: "1px solid " + T.colorSurfaceActive, padding: "12px 10px 16px" }}>
                <button onClick={function() { _aiSetScheduleOpen(true); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", border: "none", background: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit", borderRadius: 6 }} onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceTertiary; }} onMouseLeave={function(e) { e.currentTarget.style.background = "none"; }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}><path d="M17.5 8.33H2.5M13.33 1.67V5M6.67 1.67V5M6.5 18.33H13.5C14.9 18.33 15.6 18.33 16.14 18.06C16.61 17.82 16.99 17.44 17.23 16.97C17.5 16.43 17.5 15.73 17.5 14.33V7.33C17.5 5.93 17.5 5.23 17.23 4.7C16.99 4.23 16.61 3.85 16.14 3.61C15.6 3.33 14.9 3.33 13.5 3.33H6.5C5.1 3.33 4.4 3.33 3.87 3.61C3.39 3.85 3.01 4.23 2.77 4.7C2.5 5.23 2.5 5.93 2.5 7.33V14.33C2.5 15.73 2.5 16.43 2.77 16.97C3.01 17.44 3.39 17.82 3.87 18.06C4.4 18.33 5.1 18.33 6.5 18.33Z" stroke={T.colorTextSecondary} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>Accrued income schedule</span>
                </button>
              </div>
            </div>
            <SuggestionsBox isCleanReconcile={false} allJustResolved={_aiAllDone} accountStatus={null} resolvedCount={_aiResolvedCount} totalSuggestions={_aiTotalSuggestions} matchedTotal={null}
              navCategories={_AIR_NAV_CATS.map(function(cat) { return Object.assign({}, cat, { items: cat.items.map(function(item) { return Object.assign({}, item); }) }); })}
              resolvedCards={_aiResolvedCards} ignoredCards={_aiIgnoredCards}
              completedTitle="Accrued income review complete" completedDescription={"All suggestions have been reviewed. Your accrued income schedule is up to date for " + selectedPeriod + "."} completedColor={T.colorBrandPrimary} />
          </div>
        )}
      </div>
      <AccruedIncomeSchedulePage open={_aiScheduleOpen} onClose={function() { _aiSetScheduleOpen(false); }} />
    </div>
  );
}


// ── Loan Amortisation Review Flow ─────────────────────────────────────────

var _LA_STEPS = [
  { title: "Reading loan amortisation schedules",           subtext: null,                                                 duration: 800  },
  { title: "Matching repayments to bank transactions",      subtext: "Matched 11 of 12 expected repayments.",              duration: 1200 },
  { title: "Comparing balances to lender statements",       subtext: "Lloyds: £3,000 variance. Asset finance: matched.",   duration: 1100 },
  { title: "Checking interest accruals and current portion", subtext: "Flagged 2 items for review.",                       duration: 900  },
  { title: "Generating suggestions",                        subtext: null,                                                 duration: 600  },
];

var _LA_CARDS = [
  { idx: 0, key: "repayment", title: "Post missing April loan repayment for Lloyds", contact: "Lloyds – 5yr bank loan (2400)", description: "The April loan repayment of £3,000.00 (direct debit 28 April 2026) appears on the Lloyds statement and has been debited from the bank account (1210) but the corresponding credit to account 2400 – Bank loan has not been posted. The loan balance in Xero is £180,000.00 vs the lender statement balance of £177,000.00.", tableRow: { account: "2400 – Bank loan", amount: "£3,000.00", period: "Apr 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
  { idx: 1, key: "interest", title: "Accrue April interest on Lloyds loan", contact: "Lloyds – loan interest accrual", description: "Monthly interest on the Lloyds facility is charged at 5.25% on the outstanding balance. The April interest charge of £787.50 has not been accrued. Prior months show a consistent monthly accrual to 7020 – Loan interest. Without this, interest expense for April will be understated and the accruals balance incomplete.", tableRow: { account: "7020 – Loan interest", amount: "£787.50", period: "Apr 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
  { idx: 2, key: "current", title: "Reclassify £36,000 as current portion of bank loan", contact: "Lloyds – current/non-current split", description: "The loan agreement requires £3,000.00 in monthly repayments. Under FRS 102, the portion repayable within 12 months (£36,000.00) should be reclassified from non-current liabilities (2400) to current liabilities (2100 – Current portion of long-term borrowings). The current reclassification journal is based on the prior-year figure of £36,000.00 and has not been updated since the last annual accounts.", tableRow: { account: "2400 – Bank loan", amount: "£36,000.00", period: "Apr 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
  { idx: 3, key: "lease", title: "Review finance lease obligation balance", contact: "Close Brothers – asset finance (2410)", description: "The finance lease with Close Brothers for warehouse equipment has a Xero balance of £22,400.00. The latest lender statement shows £22,400.00, so the capital balance is matched. However, the implicit interest rate used in the amortisation schedule (6.8%) differs from the rate on the original agreement (7.2%). This may result in a small cumulative misallocation between capital and interest over the remaining 16 months of the lease.", tableRow: { account: "2410 – Finance lease obligations", amount: "£22,400.00", period: "16 months remaining" }, primaryLabel: "Update rate", secondaryLabel: "I have resolved this" },
];

var _LA_NAV_CATS = [
  { key: "repayment", label: "Missing repayment",         baseIdx: 0, items: [{ contact: "Lloyds bank loan" }] },
  { key: "interest",  label: "Interest accrual",          baseIdx: 1, items: [{ contact: "Lloyds interest" }] },
  { key: "current",   label: "Current portion split",     baseIdx: 2, items: [{ contact: "Lloyds reclassification" }] },
  { key: "lease",     label: "Lease rate discrepancy",    baseIdx: 3, items: [{ contact: "Close Brothers lease" }] },
];

function LoanAmortisationReviewFlow(_ref) {
  var onClose = _ref.onClose, selectedPeriod = _ref.selectedPeriod || "April 2026", onStateChange = _ref.onStateChange, savedState = _ref.savedState;
  var _laInitResume = !!(savedState && savedState.hasResults);
  var _s = useState(_laInitResume); var _laIsResume = _s[0], _laSetIsResume = _s[1];
  _s = useState(_laInitResume ? _LA_STEPS.map(function(){return "done";}) : []); var _laStepStatuses = _s[0], _laSetStepStatuses = _s[1];
  _s = useState(_laInitResume ? _LA_STEPS.map(function(){return true;}) : []); var _laStepSubtexts = _s[0], _laSetStepSubtexts = _s[1];
  _s = useState(_laInitResume ? _LA_STEPS.length : 0); var _laVisibleSteps = _s[0], _laSetVisibleSteps = _s[1];
  _s = useState(_laInitResume); var _laStepsPopulated = _s[0], _laSetStepsPopulated = _s[1];
  _s = useState(_laInitResume); var _laStepsCollapsed = _s[0], _laSetStepsCollapsed = _s[1];
  _s = useState(_laInitResume); var _laResultsVisible = _s[0], _laSetResultsVisible = _s[1];
  _s = useState(_laInitResume); var _laCanvasReady = _s[0], _laSetCanvasReady = _s[1];
  _s = useState(_laInitResume); var _laBoxesOpen = _s[0], _laSetBoxesOpen = _s[1];
  _s = useState(400); var _laChatWidth = _s[0], _laSetChatWidth = _s[1];
  _s = useState(false); var _laIsDragging = _s[0], _laSetIsDragging = _s[1];
  _s = useState(true); var _laIsAtBottom = _s[0], _laSetIsAtBottom = _s[1];
  _s = useState(""); var _laInputValue = _s[0], _laSetInputValue = _s[1];
  _s = useState(_laInitResume ? new Set(savedState.resolvedArray || []) : new Set()); var _laResolvedCards = _s[0], _laSetResolvedCards = _s[1];
  _s = useState(_laInitResume ? new Set(savedState.ignoredArray || []) : new Set()); var _laIgnoredCards = _s[0], _laSetIgnoredCards = _s[1];
  _s = useState(_laInitResume ? (savedState.cardActions || {}) : {}); var _laCardActions = _s[0], _laSetCardActions = _s[1];
  _s = useState(false); var _laAnalysisOpen = _s[0], _laSetAnalysisOpen = _s[1];
  _s = useState(false); var _laPeriodDropOpen = _s[0], _laSetPeriodDropOpen = _s[1];
  _s = useState(selectedPeriod); var _laActivePeriod = _s[0], _laSetActivePeriod = _s[1];
  _s = useState(0); var _laRestartKey = _s[0], _laSetRestartKey = _s[1];
  var _laChatScrollRef = useRef(null), _laChatEndRef = useRef(null), _laPeriodDropRef = useRef(null);

  var _laAllMonths = ["April 2025","May 2025","June 2025","July 2025","August 2025","September 2025","October 2025","November 2025","December 2025","January 2026","February 2026","March 2026","April 2026"];
  var _laCurrentIdx = _laAllMonths.indexOf("April 2026");

  useEffect(function() {
    var handler = function(e) { if (_laPeriodDropRef.current && !_laPeriodDropRef.current.contains(e.target)) _laSetPeriodDropOpen(false); };
    document.addEventListener("mousedown", handler);
    return function() { document.removeEventListener("mousedown", handler); };
  }, []);

  var _laStepsComplete = _laStepStatuses.length > 0 && _laStepStatuses.every(function(s) { return s === "done"; });
  var _laResolvedCount = _laResolvedCards.size + _laIgnoredCards.size;
  var _laAllDone = _laResolvedCount >= _LA_CARDS.length;
  var _laTotalSuggestions = _LA_CARDS.length;

  useEffect(function() {
    if (onStateChange && _laCanvasReady) onStateChange({ resolved: _laResolvedCount, total: _laTotalSuggestions, hasResults: true, resolvedArray: Array.from(_laResolvedCards), ignoredArray: Array.from(_laIgnoredCards), cardActions: _laCardActions });
  }, [_laResolvedCount, _laCanvasReady, _laCardActions]);

  var _laLine1Segments = [{ text: "I'll review your loan amortisation schedules for ", bold: false }, { text: selectedPeriod, bold: true }, { text: ", match repayments to bank transactions, compare balances to lender statements, and check interest accruals and current/non-current splits.", bold: false }];
  var _laLine1Full = _laLine1Segments.map(function(s) { return s.text; }).join("");
  var _laTw = useTypewriter(_laLine1Full + (_laRestartKey > 0 ? "​".repeat(_laRestartKey) : ""), 18, _laIsResume);
  var _laLine1Done = _laTw.done;

  useEffect(function() {
    if (!_laLine1Done || _laIsResume) return;
    var REVEAL = 80, timers = [];
    _LA_STEPS.forEach(function(_, i) { timers.push(setTimeout(function() { _laSetVisibleSteps(function(v) { return Math.max(v, i + 1); }); }, i * REVEAL)); });
    timers.push(setTimeout(function() { _laSetStepsPopulated(true); }, (_LA_STEPS.length - 1) * REVEAL + 80));
    return function() { timers.forEach(clearTimeout); };
  }, [_laLine1Done, _laRestartKey]);

  useEffect(function() {
    if (!_laStepsPopulated || _laIsResume) return;
    _laSetStepStatuses(_LA_STEPS.map(function(_, i) { return i === 0 ? "active" : "pending"; }));
    _laSetStepSubtexts(_LA_STEPS.map(function() { return false; }));
    var timers = [], cum = 0;
    _LA_STEPS.forEach(function(step, i) {
      cum += step.duration;
      if (step.subtext) timers.push(setTimeout(function() { _laSetStepSubtexts(function(prev) { var n = prev.slice(); n[i] = true; return n; }); }, cum - 350));
      timers.push(setTimeout(function() { _laSetStepStatuses(function(prev) { var n = prev.slice(); n[i] = "done"; if (i + 1 < _LA_STEPS.length) n[i + 1] = "active"; return n; }); }, cum));
    });
    return function() { timers.forEach(clearTimeout); };
  }, [_laStepsPopulated, _laRestartKey]);

  useEffect(function() { if (!_laStepsComplete || _laIsResume) return; var t1 = setTimeout(function() { _laSetStepsCollapsed(true); }, 500); var t2 = setTimeout(function() { _laSetResultsVisible(true); }, 700); return function() { clearTimeout(t1); clearTimeout(t2); }; }, [_laStepsComplete, _laRestartKey]);
  useEffect(function() { if (!_laResultsVisible || _laIsResume) return; var t1 = setTimeout(function() { _laSetCanvasReady(true); }, 3200); var t2 = setTimeout(function() { _laSetBoxesOpen(true); }, 3800); return function() { clearTimeout(t1); clearTimeout(t2); }; }, [_laResultsVisible, _laRestartKey]);
  useEffect(function() { if (_laChatEndRef.current) _laChatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" }); }, [_laLine1Done, _laStepsComplete, _laCanvasReady]);
  useEffect(function() { var el = _laChatScrollRef.current; if (!el) return; var onScroll = function() { _laSetIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 40); }; el.addEventListener("scroll", onScroll); return function() { el.removeEventListener("scroll", onScroll); }; }, []);
  useEffect(function() { var onKey = function(e) { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", onKey); return function() { window.removeEventListener("keydown", onKey); }; }, []);

  var _laHandleDragStart = function(e) {
    e.preventDefault(); _laSetIsDragging(true);
    var startX = e.clientX, startW = _laChatWidth;
    var onMove = function(ev) { _laSetChatWidth(Math.max(280, Math.min(700, startW + (ev.clientX - startX)))); };
    var onUp = function() { _laSetIsDragging(false); document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); document.body.style.cursor = ""; document.body.style.userSelect = ""; };
    document.body.style.cursor = "col-resize"; document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove); document.addEventListener("mouseup", onUp);
  };

  var _laHandleRestart = function() {
    _laSetStepStatuses([]); _laSetStepSubtexts([]); _laSetVisibleSteps(0);
    _laSetStepsPopulated(false); _laSetStepsCollapsed(false); _laSetResultsVisible(false);
    _laSetCanvasReady(false); _laSetBoxesOpen(false);
    _laSetResolvedCards(new Set()); _laSetIgnoredCards(new Set()); _laSetCardActions({});
    _laSetAnalysisOpen(false); _laSetIsResume(false);
    _laSetRestartKey(function(k) { return k + 1; });
    if (onStateChange) onStateChange(null);
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 200, display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif", background: T.colorSurfaceContrast }}>
      <style>{`@keyframes _laFadeIn{from{opacity:0}to{opacity:1}} @keyframes _laStepReveal{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} @keyframes _laStepPop{0%{transform:scale(0.8);opacity:0}100%{transform:scale(1);opacity:1}} @keyframes _laTextShimmer{0%{background-position:200% center}100%{background-position:-200% center}}`}</style>
      <div style={{ height: 96, background: T.colorSurfacePrimary, borderBottom: "1px solid " + T.colorButtonSecondary, display: "flex", alignItems: "center", padding: "0 24px", flexShrink: 0, gap: 16, zIndex: 10, position: "relative" }}>
        <span style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, letterSpacing: "-1px", flexShrink: 0 }}>Loan amortisation review</span>
        <div ref={_laPeriodDropRef} style={{ position: "relative" }}>
          <button onClick={function() { _laSetPeriodDropOpen(function(o) { return !o; }); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 12px", height: 48, border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" }}>
            <span>{_laActivePeriod}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition: "transform 0.2s ease", transform: _laPeriodDropOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}><path d="M4 6L8 10L12 6" stroke="#080908" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {_laPeriodDropOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: T.colorSurfacePrimary, border: "1px solid " + T.colorBorderDark, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 100, minWidth: 260, overflow: "hidden", padding: "6px" }}>
              {_laAllMonths.map(function(p, idx) {
                var isSelected = p === _laActivePeriod, isCompleted = idx < _laCurrentIdx, isInReview = idx === _laCurrentIdx;
                return (
                  <button key={p} onClick={function() { _laSetActivePeriod(p); _laSetPeriodDropOpen(false); }}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, textAlign: "left", padding: "10px 12px", fontSize: 14, color: T.colorTextPrimary, fontWeight: isSelected ? 500 : 400, background: isSelected ? T.colorBorderLight : "transparent", border: "none", cursor: "pointer", borderRadius: 8, boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={function(e) { if (!isSelected) e.currentTarget.style.background = T.colorSurfaceSecondary; }}
                    onMouseLeave={function(e) { if (!isSelected) e.currentTarget.style.background = isSelected ? T.colorBorderLight : "transparent"; }}>
                    <span>{p}</span>
                    {isCompleted && <span style={{ fontSize: 12, fontWeight: 500, color: T.colorBrandPrimary, background: T.colorBrandLighter, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>Completed</span>}
                    {isInReview && <span style={{ fontSize: 12, fontWeight: 500, color: T.colorWarning, background: T.colorWarningBg, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>In review</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div style={{ flex: 1 }} />
        {_laCanvasReady && (
          <button onClick={function() { _laSetBoxesOpen(function(o) { return !o; }); }}
            style={{ display: "flex", alignItems: "center", gap: 0, marginRight: 8, cursor: "pointer", fontFamily: "inherit", border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, height: 48, minWidth: 48, padding: _laBoxesOpen ? 0 : "0 12px 0 0", overflow: "hidden", justifyContent: "center", flexShrink: 0, transition: "padding 0.35s cubic-bezier(0.16,1,0.3,1), background 0.15s" }}
            onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceTertiary; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; }}>
            <div style={{ maxWidth: _laBoxesOpen ? 0 : 200, opacity: _laBoxesOpen ? 0 : 1, overflow: "hidden", transition: "max-width 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s", display: "flex", flexDirection: "column", gap: 4, paddingLeft: _laBoxesOpen ? 0 : 12, paddingRight: _laBoxesOpen ? 0 : 10 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextThird, whiteSpace: "nowrap" }}>Suggestions</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: T.colorTextPrimary, whiteSpace: "nowrap" }}>{_laResolvedCount}/{_laTotalSuggestions}</span>
              </div>
              <div style={{ height: 2, background: T.colorBorderDark, borderRadius: 1, overflow: "hidden" }}><div style={{ height: "100%", width: Math.round((_laResolvedCount / _laTotalSuggestions) * 100) + "%", background: T.colorBrandPrimary, borderRadius: 1, transition: "width 0.4s ease" }} /></div>
            </div>
            {_laBoxesOpen
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M21 21V3M3 12H17M17 12L10 5M17 12L10 19" stroke={T.colorTextHeading} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M15 21L15 3M16.2 21H7.8C6.12 21 5.28 21 4.64 20.673C4.07 20.385 3.61 19.927 3.33 19.362C3 18.72 3 17.88 3 16.2V7.8C3 6.12 3 5.28 3.33 4.638C3.61 4.074 4.07 3.615 4.64 3.327C5.28 3 6.12 3 7.8 3H16.2C17.88 3 18.72 3 19.362 3.327C19.927 3.615 20.385 4.074 20.673 4.638C21 5.28 21 6.12 21 7.8V16.2C21 17.88 21 18.72 20.673 19.362C20.385 19.927 19.927 20.385 19.362 20.673C18.72 21 17.88 21 16.2 21Z" stroke={T.colorTextHeading} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            }
          </button>
        )}
        <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}><svg width="30" height="30" viewBox="0 0 30 30" fill="none"><rect width="30" height="30" rx="15" fill="#F5F5F5"/><path d="M20 10L10 20M10 10L20 20" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative", padding: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", width: _laResultsVisible ? _laChatWidth : "100%", flexShrink: 0, transition: _laIsDragging ? "none" : "width 0.72s cubic-bezier(0.16,1,0.3,1)", overflow: "hidden", willChange: "width", position: "relative", zIndex: 1 }}>
          {_laResultsVisible && (
            <button onClick={function() { _laChatScrollRef.current && _laChatScrollRef.current.scrollTo({ top: _laChatScrollRef.current.scrollHeight, behavior: "smooth" }); }}
              style={{ position: "absolute", bottom: 218, left: "50%", transform: "translateX(-50%)", zIndex: 10, width: 32, height: 32, borderRadius: "50%", background: T.colorSurfacePrimary, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)", opacity: _laIsAtBottom ? 0 : 1, pointerEvents: _laIsAtBottom ? "none" : "auto", transition: "opacity 0.35s ease" }}
              onMouseEnter={function(e) { e.currentTarget.style.background = T.colorBorderLight; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}
          <div style={{ flex: 1, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
            <div ref={_laChatScrollRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", scrollBehavior: "smooth" }}>
              {_laResultsVisible && <div style={{ position: "sticky", top: 0, height: 40, marginBottom: -40, background: "linear-gradient(to bottom, rgba(251,251,251,1) 0%, rgba(251,251,251,0) 100%)", zIndex: 2, pointerEvents: "none", flexShrink: 0 }} />}
              <div style={{ maxWidth: 680, width: "100%", margin: "0 auto", padding: _laResultsVisible ? "24px 24px 100px" : "24px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", width: _laResultsVisible ? "90%" : "70%", marginBottom: 20 }}>
                  <p style={{ margin: 0 }}><StreamingMessage segments={_laLine1Segments} speed={18} instant={_laIsResume} key={_laIsResume ? "resume-intro" : "fresh-intro-" + _laRestartKey} /></p>
                </div>
                {_laStepsPopulated && _laStepStatuses.length > 0 && (
                  <div style={{ animation: "_laFadeIn 0.3s ease both" }}>
                    <button onClick={function() { _laSetStepsCollapsed(function(c) { return !c; }); }}
                      style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: _laStepsCollapsed ? 0 : 20, cursor: "pointer", background: "none", border: "none", padding: 0, width: "100%", textAlign: "left" }}>
                      <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 15, fontWeight: 600, color: T.colorTextPrimary }}>Loan amortisation review</span>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: "transform 0.2s ease", transform: _laStepsCollapsed ? "rotate(180deg)" : "rotate(0deg)" }}><path d="M3 8.5L7 4.5L11 8.5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <span style={{ fontSize: 13, color: T.colorTextSecondary }}>{_laStepsComplete ? "Completed" : "In progress"}</span>
                      </div>
                    </button>
                    {!_laStepsCollapsed && _LA_STEPS.map(function(step, i) {
                      if (i >= _laVisibleSteps) return null;
                      var status = _laStepStatuses[i] || "pending", isLast = i === _LA_STEPS.length - 1;
                      return (
                        <div key={i} style={{ display: "flex", gap: 16, animation: "_laStepReveal 0.4s cubic-bezier(0.16,1,0.3,1) both" }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 2, overflow: "visible" }}>
                            <div style={{ width: 20, height: 20, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "visible" }}>
                              {status === "done" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: "_laStepPop 0.35s cubic-bezier(0.34,1.4,0.64,1) both" }}><circle cx="10" cy="10" r="10" fill={T.colorBrandPrimary}/><path d="M5.5 10.5L8.5 13.5L14.5 7" stroke={T.colorSurfacePrimary} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                              {status === "active" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: "spin 0.75s linear infinite" }}><path d="M10 2A8 8 0 1 1 2 10" stroke={T.colorBrandPrimary} strokeWidth="1.5" strokeLinecap="round"/></svg>}
                              {status === "pending" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9.25" stroke={T.colorBorderDark} strokeWidth="1.5"/></svg>}
                            </div>
                            {!isLast && i + 1 < _laVisibleSteps && <div style={{ width: 1, flexGrow: 1, minHeight: 20, background: T.colorBorderDark, margin: "4px 0" }} />}
                          </div>
                          <div style={{ paddingBottom: isLast ? 0 : 20 }}>
                            <div style={{ fontSize: 14, lineHeight: "24px", color: status === "pending" ? T.colorBorderInput : T.colorTextPrimary, transition: "color 0.3s ease" }}>{step.title}</div>
                            {(_laStepSubtexts[i] || status === "done") && step.subtext && <div style={{ fontSize: 13, color: T.colorTextSecondary, marginTop: 2, lineHeight: "18px", animation: "_laFadeIn 0.3s ease" }}>{step.subtext}</div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {_laCanvasReady && (
                  <div style={{ animation: _laIsResume ? "none" : "_laFadeIn 0.4s ease 0.2s both", marginTop: 20, fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                    <p style={{ margin: 0 }}><StreamingMessage segments={[{ text: "I've found ", bold: false }, { text: "4 items", bold: true }, { text: " that need attention – including a missing loan repayment, an unposted interest accrual, and a current/non-current reclassification that needs updating. Review each suggestion and take action or skip.", bold: false }]} speed={18} instant={_laIsResume} key={_laIsResume ? "resume" : "fresh"} /></p>
                  </div>
                )}
                <div ref={_laChatEndRef} />
              </div>
            </div>
          </div>
          {!_laStepsComplete && _laLine1Done && !_laIsResume && (
            <div style={{ padding: "0 24px 20px", flexShrink: 0 }}>
              <div style={{ maxWidth: 680, margin: "0 auto" }}>
                <div style={{ borderRadius: 8, padding: "14px 14px 12px", background: T.colorSurfacePrimary, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px " + T.colorBorderDark }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ fontSize: 14, lineHeight: "22px", flex: 1 }}>
                      <span style={{ background: "linear-gradient(90deg, #9D9D9E 0%, #9D9D9E 30%, #2A2A2A 50%, #9D9D9E 70%, " + T.colorTextDisabled + " 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "_laTextShimmer 2s linear infinite", display: "inline-block" }}>Reviewing loan schedules...</span>
                    </div>
                    <button style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 36, padding: "0 10px", border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 13, fontWeight: 500, color: T.colorTextPrimary, flexShrink: 0, boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}
                      onMouseEnter={function(e) { e.currentTarget.style.background = T.colorBorderLight; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" rx="1.5" stroke="#080908" strokeWidth="1.25" /></svg>Stop
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {_laCanvasReady && (
            <div style={{ padding: "60px 12px 16px", flexShrink: 0, background: "linear-gradient(to bottom, rgba(251,251,251,0) 0%, rgba(251,251,251,1) 60px)", marginTop: -60 }}>
              <div style={{ maxWidth: 680, margin: "0 auto" }}>
                <button onClick={_laHandleRestart} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, height: 40, padding: "0 16px", marginBottom: 10, border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceSecondary; e.currentTarget.style.borderColor = T.colorBorderHover; }}
                  onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; e.currentTarget.style.borderColor = T.colorBorderDark; }}>
                  <PlayCircleIcon color={T.colorTextPrimary} size={20} />Restart review
                </button>
                <div style={{ borderRadius: 8, padding: "14px 14px 12px", background: T.colorSurfacePrimary, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px " + T.colorBorderDark }}>
                  <textarea value={_laInputValue} onChange={function(e) { _laSetInputValue(e.target.value); }} placeholder="Ask for changes or information..." rows={3} style={{ width: "100%", border: "none", outline: "none", resize: "none", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", background: "transparent", fontFamily: "'Inter', sans-serif", display: "block" }} />
                  <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                    <button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: T.colorTextSecondary, padding: 0 }}
                      onMouseEnter={function(e) { e.currentTarget.style.background = T.colorBorderLight; }} onMouseLeave={function(e) { e.currentTarget.style.background = "none"; }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15.5 8.5L8.5 15.5C7.12 16.88 4.88 16.88 3.5 15.5C2.12 14.12 2.12 11.88 3.5 10.5L10.5 3.5C11.33 2.67 12.67 2.67 13.5 3.5C14.33 4.33 14.33 5.67 13.5 6.5L6.5 13.5C6.08 13.92 5.42 13.92 5 13.5C4.58 13.08 4.58 12.42 5 12L11.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <div style={{ flex: 1 }} />
                    <button style={{ width: 36, height: 36, marginLeft: 6, border: "1px solid " + T.colorBorderDark, borderRadius: 10, background: _laInputValue.trim() ? T.colorBrandPrimary : T.colorSurfaceSecondary, cursor: _laInputValue.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s", padding: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M9.99984 15.8346V4.16797M9.99984 4.16797L4.1665 10.0013M9.99984 4.16797L15.8332 10.0013" stroke={_laInputValue.trim() ? "#FFFFFF" : "#8C8C8B"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {_laResultsVisible && (<div onMouseDown={_laHandleDragStart} style={{ position: "absolute", top: 0, bottom: 0, left: _laChatWidth + 16, width: 16, cursor: "col-resize", zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 4, height: 40, borderRadius: 2, background: _laIsDragging ? T.colorBorderHover : "transparent", transition: "background 0.15s" }} /></div>)}
        <div style={{ position: "absolute", top: 16, bottom: 16, left: _laChatWidth + 32, right: _laBoxesOpen ? 432 : 16, background: T.colorSurfacePrimary, borderRadius: 8, border: "1px solid " + T.colorButtonSecondary, overflow: "hidden", zIndex: 2, transform: _laResultsVisible ? "none" : "translateX(calc(100% + 32px))", transition: _laIsDragging ? "none" : "transform 0.72s cubic-bezier(0.16,1,0.3,1), right 0.35s cubic-bezier(0.16,1,0.3,1)", willChange: _laResultsVisible ? "auto" : "transform" }}>
          {_laCanvasReady ? (
            <div style={{ animation: "_laFadeIn 0.4s ease 0.1s both", height: "100%", overflowY: "auto" }}>
              <div style={{ padding: "48px 48px 48px", maxWidth: 800, margin: "0 auto" }}>
                <h2 style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, margin: "0 0 20px" }}>Results</h2>
                {(function() {
                  var _laGlImpacts = { 0: 3000.00 };
                  var _laGlInitial = -3000.00;
                  var _laResImpact = Array.from(_laResolvedCards).reduce(function(s, i) { return s + (_laGlImpacts[i] || 0); }, 0);
                  var _laClosingDiff = _laGlInitial + _laResImpact;
                  var _laOpeningMimo = 205800.00;
                  var _laOpeningXero = 205800.00;
                  var _laOpeningDiff = 0;
                  var _laClosingMimo = 202400.00;
                  var _laClosingXero = _laClosingMimo - _laClosingDiff;
                  var _fmt = function(v) { return (v < 0 ? "–" : "") + "£" + Math.abs(v).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
                  var _diffCell = function(v) {
                    if (Math.abs(v) < 0.01) return _fmt(0);
                    return React.createElement("span", { style: { fontWeight: 600, color: T.colorTextPrimary } }, _fmt(v));
                  };
                  return React.createElement("div", { style: { marginBottom: 12 } },
                    React.createElement(DataTable, {
                      columns: [{ key: "description", label: "Description", width: "1fr" }, { key: "value", label: "Amount", width: "160px", align: "right" }],
                      rows: [
                        { description: "Opening balance per Mimo", value: _fmt(_laOpeningMimo) },
                        { description: "Opening balance per Xero", value: _fmt(_laOpeningXero) },
                        { description: "Opening balance difference", value: _diffCell(_laOpeningDiff) },
                        { description: "Additions", value: "£0.00" },
                        { description: "Releases", value: "(£4,400.00)" },
                        { description: "Closing balance per Mimo", value: _fmt(_laClosingMimo) },
                        { description: "Closing balance per Xero", value: _fmt(_laClosingXero) },
                        { description: "Closing balance difference", value: _diffCell(_laClosingDiff) },
                      ]
                    })
                  );
                })()}
                <div style={{ background: T.colorSurfacePrimary, border: "1px solid " + T.colorButtonSecondary, borderRadius: 8, marginBottom: 28, overflow: "hidden" }}>
                  <div onClick={function() { _laSetAnalysisOpen(function(o) { return !o; }); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 67, padding: "0 20px", cursor: "pointer" }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>Analysis & key findings</span>
                    <div style={{ display: "flex", transform: _laAnalysisOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)", flexShrink: 0, marginLeft: 12 }}><ChevronUpIcon /></div>
                  </div>
                  <div style={{ overflow: "hidden", maxHeight: _laAnalysisOpen ? 400 : 0, opacity: _laAnalysisOpen ? 1 : 0, transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease" }}>
                    <div style={{ fontSize: 14, color: T.colorTextBody, lineHeight: "20px", margin: "0 20px 16px", borderTop: "1px solid " + T.colorBorderSubtle, paddingTop: 14 }}>
                      <p style={{ margin: "0 0 10px" }}>The loan amortisation review for {selectedPeriod} compared repayment schedules against bank transactions and lender statements for 2 facilities: the Lloyds 5-year bank loan (2400) and the Close Brothers asset finance lease (2410).</p>
                      <p style={{ margin: "0 0 10px" }}>The most significant finding is a missing loan repayment of £3,000.00 on the Lloyds facility. The April direct debit has cleared the bank account (1210) but the corresponding credit to account 2400 has not been posted, leaving the loan balance overstated by £3,000.00.</p>
                      <p style={{ margin: "0 0 10px" }}>The monthly interest accrual of £787.50 for April has not been posted to 7020 – Loan interest. The current/non-current split for the Lloyds loan is still based on the prior-year figure and should be reviewed.</p>
                      <p style={{ margin: 0 }}>The Close Brothers lease balance is matched but the implicit interest rate in the amortisation schedule differs from the agreement rate, which may cause a cumulative misallocation over the remaining term.</p>
                    </div>
                  </div>
                </div>
                <hr style={{ border: "none", borderTop: "1px solid " + T.colorBorderDark, margin: "32px 0 40px" }} />
                <h3 style={{ fontSize: 20, fontWeight: 500, color: T.colorTextPrimary, margin: "0 0 16px" }}>Suggestions</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {_LA_CARDS.map(function(card) {
                    var isResolved = _laResolvedCards.has(card.idx), isIgnored = _laIgnoredCards.has(card.idx), actionLabel = _laCardActions[card.idx];
                    var statusLabel = isResolved ? (actionLabel || "Journal posted") : isIgnored ? (actionLabel || "Resolved") : "Unresolved";
                    var statusStyle = isResolved ? { background: T.colorBrandLighter, border: "none", color: T.colorBrandPrimary } : isIgnored ? { background: T.colorButtonDisabled, border: "none", color: T.colorTextSecondary } : { background: T.colorWarningBg, border: "none", color: T.colorWarning };
                    var primaryActionLabels = { "Review suggestion": "Journal posted", "Update rate": "Rate updated" };
                    return (
                      <div key={card.idx} id={"result-" + card.key + "-0"} style={{ scrollMarginTop: 64 }}>
                        <RecommendationCard title={card.title} description={card.description} statusLabel={statusLabel} statusStyle={statusStyle}
                          collapsed={isResolved || isIgnored} isIgnored={isIgnored} hideMore={true} tableRow={card.tableRow}
                          tableColumns={[{ key: "account", label: "Account", width: "1.4fr" }, { key: "amount", label: "Amount", width: "0.8fr" }, { key: "period", label: "Period", width: "0.8fr" }]}
                          primaryLabel={card.primaryLabel} secondaryLabel={card.secondaryLabel}
                          onPrimaryAction={function() { _laSetResolvedCards(function(prev) { return new Set([].concat(Array.from(prev), [card.idx])); }); _laSetCardActions(function(prev) { var o = Object.assign({}, prev); o[card.idx] = primaryActionLabels[card.primaryLabel] || "Journal posted"; return o; }); }}
                          onIgnore={function() { _laSetIgnoredCards(function(prev) { return new Set([].concat(Array.from(prev), [card.idx])); }); }}
                          onSecondaryAction={function() { _laSetResolvedCards(function(prev) { return new Set([].concat(Array.from(prev), [card.idx])); }); _laSetCardActions(function(prev) { var o = Object.assign({}, prev); o[card.idx] = "Resolved"; return o; }); }}
                          onMore={function() {}} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : _laResultsVisible ? <CanvasLoader /> : null}
        </div>
        {_laCanvasReady && (
          <div style={{ position: "absolute", top: 16, bottom: 16, right: 16, width: 400, zIndex: 3, transform: _laBoxesOpen ? "translateX(0)" : "translateX(calc(100% + 32px))", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)", pointerEvents: _laBoxesOpen ? "auto" : "none", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: T.colorSurfacePrimary, borderRadius: 8, border: "1px solid " + T.colorButtonSecondary, overflow: "hidden", flexShrink: 0 }}>
              <div style={{ padding: "18px 20px" }}><span style={{ fontSize: 16, fontWeight: 500, color: T.colorTextPrimary }}>Linked sources</span></div>
              <div style={{ borderTop: "1px solid " + T.colorSurfaceActive, padding: "12px 10px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}><path d="M17.5 8.33H2.5M13.33 1.67V5M6.67 1.67V5M6.5 18.33H13.5C14.9 18.33 15.6 18.33 16.14 18.06C16.61 17.82 16.99 17.44 17.23 16.97C17.5 16.43 17.5 15.73 17.5 14.33V7.33C17.5 5.93 17.5 5.23 17.23 4.7C16.99 4.23 16.61 3.85 16.14 3.61C15.6 3.33 14.9 3.33 13.5 3.33H6.5C5.1 3.33 4.4 3.33 3.87 3.61C3.39 3.85 3.01 4.23 2.77 4.7C2.5 5.23 2.5 5.93 2.5 7.33V14.33C2.5 15.73 2.5 16.43 2.77 16.97C3.01 17.44 3.39 17.82 3.87 18.06C4.4 18.33 5.1 18.33 6.5 18.33Z" stroke={T.colorTextSecondary} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>Loan amortisation schedule</span>
                </div>
              </div>
            </div>
            <SuggestionsBox isCleanReconcile={false} allJustResolved={_laAllDone} accountStatus={null} resolvedCount={_laResolvedCount} totalSuggestions={_laTotalSuggestions} matchedTotal={null}
              navCategories={_LA_NAV_CATS.map(function(cat) { return Object.assign({}, cat, { items: cat.items.map(function(item) { return Object.assign({}, item); }) }); })}
              resolvedCards={_laResolvedCards} ignoredCards={_laIgnoredCards}
              completedTitle="Loan amortisation review complete" completedDescription={"All suggestions have been reviewed. Your loan schedules are up to date for " + selectedPeriod + "."} completedColor={T.colorBrandPrimary} />
          </div>
        )}
      </div>
    </div>
  );
}


// ── Depreciation (FAR) Review Flow ───────────────────────────────────────

var _DP_STEPS = [
  { title: "Reading fixed asset register",                  subtext: null,                                                     duration: 800  },
  { title: "Comparing NBV to Xero balances",                subtext: "Checked 6 asset categories across accounts 0010–0040.", duration: 1200 },
  { title: "Verifying monthly depreciation charges",        subtext: "P&L account 8000: £6,012 expected vs £6,012 posted.",        duration: 1000 },
  { title: "Checking for unposted or misallocated charges", subtext: "Flagged 3 accounts with variances.",                     duration: 1000 },
  { title: "Generating suggestions",                        subtext: null,                                                     duration: 600  },
];

var _DP_CARDS = [
  { idx: 0, key: "plant", title: "Post missing depreciation for plant and machinery", contact: "0020 – Plant and machinery", description: "The fixed asset register shows accumulated depreciation of £14,520.00 for forklift FA-031 but Xero account 0020 shows £12,340.00, a variance of £2,180.00. The April depreciation charge for this asset has not been posted. The forklift is depreciated on a straight-line basis over 5 years with a monthly charge of £2,180.00.", tableRow: { account: "8000 – Depreciation", amount: "£2,180.00", period: "Apr 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
  { idx: 1, key: "computer", title: "Post missing depreciation for computer equipment", contact: "0032 – Computer equipment", description: "The March depreciation charge of £1,740.00 for computer equipment was not posted in Xero. The register shows monthly depreciation across 38 items totalling £1,740.00 based on a 3-year straight-line policy. Xero account 0032 balance is £56,200.00 vs the register total of £54,460.00.", tableRow: { account: "8000 – Depreciation", amount: "£1,740.00", period: "Mar 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
  { idx: 2, key: "motor", title: "Review motor vehicle depreciation variance", contact: "0040 – Motor vehicles", description: "The Xero balance for motor vehicles (0040) is £118,030.00 vs the fixed asset register total of £112,830.00, a variance of £5,200.00. This appears to relate to two months of unposted depreciation. Motor vehicles are depreciated on a 25% reducing balance basis. The expected monthly charge is approximately £2,500.00. The March and April charges may both be missing.", tableRow: { account: "8000 – Depreciation", amount: "£5,200.00", period: "Mar–Apr 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
  { idx: 3, key: "leasehold", title: "Post missing leasehold amortisation charge", contact: "0011 – Leasehold improvements", description: "The March amortisation charge for the office fit-out (LH-003, original cost £76,800.00) has not been posted. The monthly charge of £3,200.00 is based on a 24-month lease term. The register shows accumulated amortisation of £51,200.00 while Xero shows £48,000.00. This is also flagged in the balance sheet reconciliation for account 0011.", tableRow: { account: "8010 – Amortisation", amount: "£3,200.00", period: "Mar 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
  { idx: 4, key: "capex", title: "Reclassify standing desk from expenses to fixed assets", contact: "0031 – Office equipment", description: "A standing desk purchase for £750.00 (invoice OE-2026-047, 12 Feb 2026) was posted to account 6420 – General expenses rather than account 0031 – Office equipment. The item meets the £500 capitalisation threshold and should be reclassified as a fixed asset. Once capitalised, depreciation of £12.50/month should begin from March 2026.", tableRow: { account: "0031 – Office equipment", amount: "£750.00", period: "Feb 2026" }, primaryLabel: "Review suggestion", secondaryLabel: "I have resolved this" },
];

var _DP_NAV_CATS = [
  { key: "plant",     label: "Missing depreciation",       baseIdx: 0, items: [{ contact: "Plant & machinery" }] },
  { key: "computer",  label: "Missing depreciation",       baseIdx: 1, items: [{ contact: "Computer equipment" }] },
  { key: "motor",     label: "Depreciation variance",      baseIdx: 2, items: [{ contact: "Motor vehicles" }] },
  { key: "leasehold", label: "Missing amortisation",       baseIdx: 3, items: [{ contact: "Leasehold improvements" }] },
  { key: "capex",     label: "Capex misclassification",    baseIdx: 4, items: [{ contact: "Office equipment" }] },
];

function DepreciationReviewFlow(_ref) {
  var onClose = _ref.onClose, selectedPeriod = _ref.selectedPeriod || "April 2026", onStateChange = _ref.onStateChange, savedState = _ref.savedState;
  var _dpInitResume = !!(savedState && savedState.hasResults);
  var _s = useState(_dpInitResume); var _dpIsResume = _s[0], _dpSetIsResume = _s[1];
  _s = useState(_dpInitResume ? _DP_STEPS.map(function(){return "done";}) : []); var _dpStepStatuses = _s[0], _dpSetStepStatuses = _s[1];
  _s = useState(_dpInitResume ? _DP_STEPS.map(function(){return true;}) : []); var _dpStepSubtexts = _s[0], _dpSetStepSubtexts = _s[1];
  _s = useState(_dpInitResume ? _DP_STEPS.length : 0); var _dpVisibleSteps = _s[0], _dpSetVisibleSteps = _s[1];
  _s = useState(_dpInitResume); var _dpStepsPopulated = _s[0], _dpSetStepsPopulated = _s[1];
  _s = useState(_dpInitResume); var _dpStepsCollapsed = _s[0], _dpSetStepsCollapsed = _s[1];
  _s = useState(_dpInitResume); var _dpResultsVisible = _s[0], _dpSetResultsVisible = _s[1];
  _s = useState(_dpInitResume); var _dpCanvasReady = _s[0], _dpSetCanvasReady = _s[1];
  _s = useState(_dpInitResume); var _dpBoxesOpen = _s[0], _dpSetBoxesOpen = _s[1];
  _s = useState(400); var _dpChatWidth = _s[0], _dpSetChatWidth = _s[1];
  _s = useState(false); var _dpIsDragging = _s[0], _dpSetIsDragging = _s[1];
  _s = useState(true); var _dpIsAtBottom = _s[0], _dpSetIsAtBottom = _s[1];
  _s = useState(""); var _dpInputValue = _s[0], _dpSetInputValue = _s[1];
  _s = useState(_dpInitResume ? new Set(savedState.resolvedArray || []) : new Set()); var _dpResolvedCards = _s[0], _dpSetResolvedCards = _s[1];
  _s = useState(_dpInitResume ? new Set(savedState.ignoredArray || []) : new Set()); var _dpIgnoredCards = _s[0], _dpSetIgnoredCards = _s[1];
  _s = useState(_dpInitResume ? (savedState.cardActions || {}) : {}); var _dpCardActions = _s[0], _dpSetCardActions = _s[1];
  _s = useState(false); var _dpAnalysisOpen = _s[0], _dpSetAnalysisOpen = _s[1];
  _s = useState(false); var _dpPeriodDropOpen = _s[0], _dpSetPeriodDropOpen = _s[1];
  _s = useState(selectedPeriod); var _dpActivePeriod = _s[0], _dpSetActivePeriod = _s[1];
  _s = useState(0); var _dpRestartKey = _s[0], _dpSetRestartKey = _s[1];
  var _dpChatScrollRef = useRef(null), _dpChatEndRef = useRef(null), _dpPeriodDropRef = useRef(null);

  var _dpAllMonths = ["April 2025","May 2025","June 2025","July 2025","August 2025","September 2025","October 2025","November 2025","December 2025","January 2026","February 2026","March 2026","April 2026"];
  var _dpCurrentIdx = _dpAllMonths.indexOf("April 2026");

  useEffect(function() {
    var handler = function(e) { if (_dpPeriodDropRef.current && !_dpPeriodDropRef.current.contains(e.target)) _dpSetPeriodDropOpen(false); };
    document.addEventListener("mousedown", handler);
    return function() { document.removeEventListener("mousedown", handler); };
  }, []);

  var _dpStepsComplete = _dpStepStatuses.length > 0 && _dpStepStatuses.every(function(s) { return s === "done"; });
  var _dpResolvedCount = _dpResolvedCards.size + _dpIgnoredCards.size;
  var _dpAllDone = _dpResolvedCount >= _DP_CARDS.length;
  var _dpTotalSuggestions = _DP_CARDS.length;

  useEffect(function() {
    if (onStateChange && _dpCanvasReady) onStateChange({ resolved: _dpResolvedCount, total: _dpTotalSuggestions, hasResults: true, resolvedArray: Array.from(_dpResolvedCards), ignoredArray: Array.from(_dpIgnoredCards), cardActions: _dpCardActions });
  }, [_dpResolvedCount, _dpCanvasReady, _dpCardActions]);

  var _dpLine1Segments = [{ text: "I'll review your fixed asset register for ", bold: false }, { text: selectedPeriod, bold: true }, { text: ", compare net book values to Xero balances, verify monthly depreciation charges against the P&L, and flag any unposted or misallocated entries.", bold: false }];
  var _dpLine1Full = _dpLine1Segments.map(function(s) { return s.text; }).join("");
  var _dpTw = useTypewriter(_dpLine1Full + (_dpRestartKey > 0 ? "​".repeat(_dpRestartKey) : ""), 18, _dpIsResume);
  var _dpLine1Done = _dpTw.done;

  useEffect(function() {
    if (!_dpLine1Done || _dpIsResume) return;
    var REVEAL = 80, timers = [];
    _DP_STEPS.forEach(function(_, i) { timers.push(setTimeout(function() { _dpSetVisibleSteps(function(v) { return Math.max(v, i + 1); }); }, i * REVEAL)); });
    timers.push(setTimeout(function() { _dpSetStepsPopulated(true); }, (_DP_STEPS.length - 1) * REVEAL + 80));
    return function() { timers.forEach(clearTimeout); };
  }, [_dpLine1Done, _dpRestartKey]);

  useEffect(function() {
    if (!_dpStepsPopulated || _dpIsResume) return;
    _dpSetStepStatuses(_DP_STEPS.map(function(_, i) { return i === 0 ? "active" : "pending"; }));
    _dpSetStepSubtexts(_DP_STEPS.map(function() { return false; }));
    var timers = [], cum = 0;
    _DP_STEPS.forEach(function(step, i) {
      cum += step.duration;
      if (step.subtext) timers.push(setTimeout(function() { _dpSetStepSubtexts(function(prev) { var n = prev.slice(); n[i] = true; return n; }); }, cum - 350));
      timers.push(setTimeout(function() { _dpSetStepStatuses(function(prev) { var n = prev.slice(); n[i] = "done"; if (i + 1 < _DP_STEPS.length) n[i + 1] = "active"; return n; }); }, cum));
    });
    return function() { timers.forEach(clearTimeout); };
  }, [_dpStepsPopulated, _dpRestartKey]);

  useEffect(function() { if (!_dpStepsComplete || _dpIsResume) return; var t1 = setTimeout(function() { _dpSetStepsCollapsed(true); }, 500); var t2 = setTimeout(function() { _dpSetResultsVisible(true); }, 700); return function() { clearTimeout(t1); clearTimeout(t2); }; }, [_dpStepsComplete, _dpRestartKey]);
  useEffect(function() { if (!_dpResultsVisible || _dpIsResume) return; var t1 = setTimeout(function() { _dpSetCanvasReady(true); }, 3200); var t2 = setTimeout(function() { _dpSetBoxesOpen(true); }, 3800); return function() { clearTimeout(t1); clearTimeout(t2); }; }, [_dpResultsVisible, _dpRestartKey]);
  useEffect(function() { if (_dpChatEndRef.current) _dpChatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" }); }, [_dpLine1Done, _dpStepsComplete, _dpCanvasReady]);
  useEffect(function() { var el = _dpChatScrollRef.current; if (!el) return; var onScroll = function() { _dpSetIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 40); }; el.addEventListener("scroll", onScroll); return function() { el.removeEventListener("scroll", onScroll); }; }, []);
  useEffect(function() { var onKey = function(e) { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", onKey); return function() { window.removeEventListener("keydown", onKey); }; }, []);

  var _dpHandleDragStart = function(e) {
    e.preventDefault(); _dpSetIsDragging(true);
    var startX = e.clientX, startW = _dpChatWidth;
    var onMove = function(ev) { _dpSetChatWidth(Math.max(280, Math.min(700, startW + (ev.clientX - startX)))); };
    var onUp = function() { _dpSetIsDragging(false); document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); document.body.style.cursor = ""; document.body.style.userSelect = ""; };
    document.body.style.cursor = "col-resize"; document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove); document.addEventListener("mouseup", onUp);
  };

  var _dpHandleRestart = function() {
    _dpSetStepStatuses([]); _dpSetStepSubtexts([]); _dpSetVisibleSteps(0);
    _dpSetStepsPopulated(false); _dpSetStepsCollapsed(false); _dpSetResultsVisible(false);
    _dpSetCanvasReady(false); _dpSetBoxesOpen(false);
    _dpSetResolvedCards(new Set()); _dpSetIgnoredCards(new Set()); _dpSetCardActions({});
    _dpSetAnalysisOpen(false); _dpSetIsResume(false);
    _dpSetRestartKey(function(k) { return k + 1; });
    if (onStateChange) onStateChange(null);
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 200, display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif", background: T.colorSurfaceContrast }}>
      <style>{`@keyframes _dpFadeIn{from{opacity:0}to{opacity:1}} @keyframes _dpStepReveal{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} @keyframes _dpStepPop{0%{transform:scale(0.8);opacity:0}100%{transform:scale(1);opacity:1}} @keyframes _dpTextShimmer{0%{background-position:200% center}100%{background-position:-200% center}}`}</style>
      <div style={{ height: 96, background: T.colorSurfacePrimary, borderBottom: "1px solid " + T.colorButtonSecondary, display: "flex", alignItems: "center", padding: "0 24px", flexShrink: 0, gap: 16, zIndex: 10, position: "relative" }}>
        <span style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, letterSpacing: "-1px", flexShrink: 0 }}>Depreciation review</span>
        <div ref={_dpPeriodDropRef} style={{ position: "relative" }}>
          <button onClick={function() { _dpSetPeriodDropOpen(function(o) { return !o; }); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 12px", height: 48, border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" }}>
            <span>{_dpActivePeriod}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition: "transform 0.2s ease", transform: _dpPeriodDropOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}><path d="M4 6L8 10L12 6" stroke="#080908" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {_dpPeriodDropOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: T.colorSurfacePrimary, border: "1px solid " + T.colorBorderDark, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 100, minWidth: 260, overflow: "hidden", padding: "6px" }}>
              {_dpAllMonths.map(function(p, idx) {
                var isSelected = p === _dpActivePeriod, isCompleted = idx < _dpCurrentIdx, isInReview = idx === _dpCurrentIdx;
                return (
                  <button key={p} onClick={function() { _dpSetActivePeriod(p); _dpSetPeriodDropOpen(false); }}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, textAlign: "left", padding: "10px 12px", fontSize: 14, color: T.colorTextPrimary, fontWeight: isSelected ? 500 : 400, background: isSelected ? T.colorBorderLight : "transparent", border: "none", cursor: "pointer", borderRadius: 8, boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={function(e) { if (!isSelected) e.currentTarget.style.background = T.colorSurfaceSecondary; }}
                    onMouseLeave={function(e) { if (!isSelected) e.currentTarget.style.background = isSelected ? T.colorBorderLight : "transparent"; }}>
                    <span>{p}</span>
                    {isCompleted && <span style={{ fontSize: 12, fontWeight: 500, color: T.colorBrandPrimary, background: T.colorBrandLighter, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>Completed</span>}
                    {isInReview && <span style={{ fontSize: 12, fontWeight: 500, color: T.colorWarning, background: T.colorWarningBg, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>In review</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div style={{ flex: 1 }} />
        {_dpCanvasReady && (
          <button onClick={function() { _dpSetBoxesOpen(function(o) { return !o; }); }}
            style={{ display: "flex", alignItems: "center", gap: 0, marginRight: 8, cursor: "pointer", fontFamily: "inherit", border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, height: 48, minWidth: 48, padding: _dpBoxesOpen ? 0 : "0 12px 0 0", overflow: "hidden", justifyContent: "center", flexShrink: 0, transition: "padding 0.35s cubic-bezier(0.16,1,0.3,1), background 0.15s" }}
            onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceTertiary; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; }}>
            <div style={{ maxWidth: _dpBoxesOpen ? 0 : 200, opacity: _dpBoxesOpen ? 0 : 1, overflow: "hidden", transition: "max-width 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s", display: "flex", flexDirection: "column", gap: 4, paddingLeft: _dpBoxesOpen ? 0 : 12, paddingRight: _dpBoxesOpen ? 0 : 10 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextThird, whiteSpace: "nowrap" }}>Suggestions</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: T.colorTextPrimary, whiteSpace: "nowrap" }}>{_dpResolvedCount}/{_dpTotalSuggestions}</span>
              </div>
              <div style={{ height: 2, background: T.colorBorderDark, borderRadius: 1, overflow: "hidden" }}><div style={{ height: "100%", width: Math.round((_dpResolvedCount / _dpTotalSuggestions) * 100) + "%", background: T.colorBrandPrimary, borderRadius: 1, transition: "width 0.4s ease" }} /></div>
            </div>
            {_dpBoxesOpen
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M21 21V3M3 12H17M17 12L10 5M17 12L10 19" stroke={T.colorTextHeading} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M15 21L15 3M16.2 21H7.8C6.12 21 5.28 21 4.64 20.673C4.07 20.385 3.61 19.927 3.33 19.362C3 18.72 3 17.88 3 16.2V7.8C3 6.12 3 5.28 3.33 4.638C3.61 4.074 4.07 3.615 4.64 3.327C5.28 3 6.12 3 7.8 3H16.2C17.88 3 18.72 3 19.362 3.327C19.927 3.615 20.385 4.074 20.673 4.638C21 5.28 21 6.12 21 7.8V16.2C21 17.88 21 18.72 20.673 19.362C20.385 19.927 19.927 20.385 19.362 20.673C18.72 21 17.88 21 16.2 21Z" stroke={T.colorTextHeading} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            }
          </button>
        )}
        <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}><svg width="30" height="30" viewBox="0 0 30 30" fill="none"><rect width="30" height="30" rx="15" fill="#F5F5F5"/><path d="M20 10L10 20M10 10L20 20" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative", padding: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", width: _dpResultsVisible ? _dpChatWidth : "100%", flexShrink: 0, transition: _dpIsDragging ? "none" : "width 0.72s cubic-bezier(0.16,1,0.3,1)", overflow: "hidden", willChange: "width", position: "relative", zIndex: 1 }}>
          {_dpResultsVisible && (
            <button onClick={function() { _dpChatScrollRef.current && _dpChatScrollRef.current.scrollTo({ top: _dpChatScrollRef.current.scrollHeight, behavior: "smooth" }); }}
              style={{ position: "absolute", bottom: 218, left: "50%", transform: "translateX(-50%)", zIndex: 10, width: 32, height: 32, borderRadius: "50%", background: T.colorSurfacePrimary, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)", opacity: _dpIsAtBottom ? 0 : 1, pointerEvents: _dpIsAtBottom ? "none" : "auto", transition: "opacity 0.35s ease" }}
              onMouseEnter={function(e) { e.currentTarget.style.background = T.colorBorderLight; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}
          <div style={{ flex: 1, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
            <div ref={_dpChatScrollRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", scrollBehavior: "smooth" }}>
              {_dpResultsVisible && <div style={{ position: "sticky", top: 0, height: 40, marginBottom: -40, background: "linear-gradient(to bottom, rgba(251,251,251,1) 0%, rgba(251,251,251,0) 100%)", zIndex: 2, pointerEvents: "none", flexShrink: 0 }} />}
              <div style={{ maxWidth: 680, width: "100%", margin: "0 auto", padding: _dpResultsVisible ? "24px 24px 100px" : "24px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", width: _dpResultsVisible ? "90%" : "70%", marginBottom: 20 }}>
                  <p style={{ margin: 0 }}><StreamingMessage segments={_dpLine1Segments} speed={18} instant={_dpIsResume} key={_dpIsResume ? "resume-intro" : "fresh-intro-" + _dpRestartKey} /></p>
                </div>
                {_dpStepsPopulated && _dpStepStatuses.length > 0 && (
                  <div style={{ animation: "_dpFadeIn 0.3s ease both" }}>
                    <button onClick={function() { _dpSetStepsCollapsed(function(c) { return !c; }); }}
                      style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: _dpStepsCollapsed ? 0 : 20, cursor: "pointer", background: "none", border: "none", padding: 0, width: "100%", textAlign: "left" }}>
                      <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 15, fontWeight: 600, color: T.colorTextPrimary }}>Depreciation review</span>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: "transform 0.2s ease", transform: _dpStepsCollapsed ? "rotate(180deg)" : "rotate(0deg)" }}><path d="M3 8.5L7 4.5L11 8.5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <span style={{ fontSize: 13, color: T.colorTextSecondary }}>{_dpStepsComplete ? "Completed" : "In progress"}</span>
                      </div>
                    </button>
                    {!_dpStepsCollapsed && _DP_STEPS.map(function(step, i) {
                      if (i >= _dpVisibleSteps) return null;
                      var status = _dpStepStatuses[i] || "pending", isLast = i === _DP_STEPS.length - 1;
                      return (
                        <div key={i} style={{ display: "flex", gap: 16, animation: "_dpStepReveal 0.4s cubic-bezier(0.16,1,0.3,1) both" }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 2, overflow: "visible" }}>
                            <div style={{ width: 20, height: 20, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "visible" }}>
                              {status === "done" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: "_dpStepPop 0.35s cubic-bezier(0.34,1.4,0.64,1) both" }}><circle cx="10" cy="10" r="10" fill={T.colorBrandPrimary}/><path d="M5.5 10.5L8.5 13.5L14.5 7" stroke={T.colorSurfacePrimary} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                              {status === "active" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: "spin 0.75s linear infinite" }}><path d="M10 2A8 8 0 1 1 2 10" stroke={T.colorBrandPrimary} strokeWidth="1.5" strokeLinecap="round"/></svg>}
                              {status === "pending" && <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9.25" stroke={T.colorBorderDark} strokeWidth="1.5"/></svg>}
                            </div>
                            {!isLast && i + 1 < _dpVisibleSteps && <div style={{ width: 1, flexGrow: 1, minHeight: 20, background: T.colorBorderDark, margin: "4px 0" }} />}
                          </div>
                          <div style={{ paddingBottom: isLast ? 0 : 20 }}>
                            <div style={{ fontSize: 14, lineHeight: "24px", color: status === "pending" ? T.colorBorderInput : T.colorTextPrimary, transition: "color 0.3s ease" }}>{step.title}</div>
                            {(_dpStepSubtexts[i] || status === "done") && step.subtext && <div style={{ fontSize: 13, color: T.colorTextSecondary, marginTop: 2, lineHeight: "18px", animation: "_dpFadeIn 0.3s ease" }}>{step.subtext}</div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {_dpCanvasReady && (
                  <div style={{ animation: _dpIsResume ? "none" : "_dpFadeIn 0.4s ease 0.2s both", marginTop: 20, fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                    <p style={{ margin: 0 }}><StreamingMessage segments={[{ text: "I've found ", bold: false }, { text: "5 items", bold: true }, { text: " that need attention – including missing depreciation charges on 3 asset categories, an unposted leasehold amortisation, and a capital expense that was posted to revenue. Review each suggestion and take action or skip.", bold: false }]} speed={18} instant={_dpIsResume} key={_dpIsResume ? "resume" : "fresh"} /></p>
                  </div>
                )}
                <div ref={_dpChatEndRef} />
              </div>
            </div>
          </div>
          {!_dpStepsComplete && _dpLine1Done && !_dpIsResume && (
            <div style={{ padding: "0 24px 20px", flexShrink: 0 }}>
              <div style={{ maxWidth: 680, margin: "0 auto" }}>
                <div style={{ borderRadius: 8, padding: "14px 14px 12px", background: T.colorSurfacePrimary, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px " + T.colorBorderDark }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ fontSize: 14, lineHeight: "22px", flex: 1 }}>
                      <span style={{ background: "linear-gradient(90deg, #9D9D9E 0%, #9D9D9E 30%, #2A2A2A 50%, #9D9D9E 70%, " + T.colorTextDisabled + " 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "_dpTextShimmer 2s linear infinite", display: "inline-block" }}>Reviewing depreciation charges...</span>
                    </div>
                    <button style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 36, padding: "0 10px", border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 13, fontWeight: 500, color: T.colorTextPrimary, flexShrink: 0, boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}
                      onMouseEnter={function(e) { e.currentTarget.style.background = T.colorBorderLight; }} onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" rx="1.5" stroke="#080908" strokeWidth="1.25" /></svg>Stop
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {_dpCanvasReady && (
            <div style={{ padding: "60px 12px 16px", flexShrink: 0, background: "linear-gradient(to bottom, rgba(251,251,251,0) 0%, rgba(251,251,251,1) 60px)", marginTop: -60 }}>
              <div style={{ maxWidth: 680, margin: "0 auto" }}>
                <button onClick={_dpHandleRestart} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, height: 40, padding: "0 16px", marginBottom: 10, border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceSecondary; e.currentTarget.style.borderColor = T.colorBorderHover; }}
                  onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; e.currentTarget.style.borderColor = T.colorBorderDark; }}>
                  <PlayCircleIcon color={T.colorTextPrimary} size={20} />Restart review
                </button>
                <div style={{ borderRadius: 8, padding: "14px 14px 12px", background: T.colorSurfacePrimary, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px " + T.colorBorderDark }}>
                  <textarea value={_dpInputValue} onChange={function(e) { _dpSetInputValue(e.target.value); }} placeholder="Ask for changes or information..." rows={3} style={{ width: "100%", border: "none", outline: "none", resize: "none", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", background: "transparent", fontFamily: "'Inter', sans-serif", display: "block" }} />
                  <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                    <button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: T.colorTextSecondary, padding: 0 }}
                      onMouseEnter={function(e) { e.currentTarget.style.background = T.colorBorderLight; }} onMouseLeave={function(e) { e.currentTarget.style.background = "none"; }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15.5 8.5L8.5 15.5C7.12 16.88 4.88 16.88 3.5 15.5C2.12 14.12 2.12 11.88 3.5 10.5L10.5 3.5C11.33 2.67 12.67 2.67 13.5 3.5C14.33 4.33 14.33 5.67 13.5 6.5L6.5 13.5C6.08 13.92 5.42 13.92 5 13.5C4.58 13.08 4.58 12.42 5 12L11.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <div style={{ flex: 1 }} />
                    <button style={{ width: 36, height: 36, marginLeft: 6, border: "1px solid " + T.colorBorderDark, borderRadius: 10, background: _dpInputValue.trim() ? T.colorBrandPrimary : T.colorSurfaceSecondary, cursor: _dpInputValue.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s", padding: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M9.99984 15.8346V4.16797M9.99984 4.16797L4.1665 10.0013M9.99984 4.16797L15.8332 10.0013" stroke={_dpInputValue.trim() ? "#FFFFFF" : "#8C8C8B"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {_dpResultsVisible && (<div onMouseDown={_dpHandleDragStart} style={{ position: "absolute", top: 0, bottom: 0, left: _dpChatWidth + 16, width: 16, cursor: "col-resize", zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 4, height: 40, borderRadius: 2, background: _dpIsDragging ? T.colorBorderHover : "transparent", transition: "background 0.15s" }} /></div>)}
        <div style={{ position: "absolute", top: 16, bottom: 16, left: _dpChatWidth + 32, right: _dpBoxesOpen ? 432 : 16, background: T.colorSurfacePrimary, borderRadius: 8, border: "1px solid " + T.colorButtonSecondary, overflow: "hidden", zIndex: 2, transform: _dpResultsVisible ? "none" : "translateX(calc(100% + 32px))", transition: _dpIsDragging ? "none" : "transform 0.72s cubic-bezier(0.16,1,0.3,1), right 0.35s cubic-bezier(0.16,1,0.3,1)", willChange: _dpResultsVisible ? "auto" : "transform" }}>
          {_dpCanvasReady ? (
            <div style={{ animation: "_dpFadeIn 0.4s ease 0.1s both", height: "100%", overflowY: "auto" }}>
              <div style={{ padding: "48px 48px 48px", maxWidth: 800, margin: "0 auto" }}>
                <h2 style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, margin: "0 0 20px" }}>Results</h2>
                {(function() {
                  var _dpGlImpacts = { 0: 2180.00, 1: 1740.00, 2: 5200.00, 3: 3200.00, 4: 750.00 };
                  var _dpGlInitial = -13070.00;
                  var _dpResImpact = Array.from(_dpResolvedCards).reduce(function(s, i) { return s + (_dpGlImpacts[i] || 0); }, 0);
                  var _dpClosingDiff = _dpGlInitial + _dpResImpact;
                  var _dpOpeningMimo = 644462.00;
                  var _dpOpeningXero = 644462.00;
                  var _dpOpeningDiff = 0;
                  var _dpClosingMimo = 636450.00;
                  var _dpClosingXero = _dpClosingMimo - _dpClosingDiff;
                  var _fmt = function(v) { return (v < 0 ? "–" : "") + "£" + Math.abs(v).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
                  var _diffCell = function(v) {
                    if (Math.abs(v) < 0.01) return _fmt(0);
                    return React.createElement("span", { style: { fontWeight: 600, color: T.colorTextPrimary } }, _fmt(v));
                  };
                  return React.createElement("div", { style: { marginBottom: 12 } },
                    React.createElement(DataTable, {
                      columns: [{ key: "description", label: "Description", width: "1fr" }, { key: "value", label: "Amount", width: "160px", align: "right" }],
                      rows: [
                        { description: "Opening balance per Mimo", value: _fmt(_dpOpeningMimo) },
                        { description: "Opening balance per Xero", value: _fmt(_dpOpeningXero) },
                        { description: "Opening balance difference", value: _diffCell(_dpOpeningDiff) },
                        { description: "Additions", value: "£8,012.00" },
                        { description: "Releases", value: "£0.00" },
                        { description: "Closing balance per Mimo", value: _fmt(_dpClosingMimo) },
                        { description: "Closing balance per Xero", value: _fmt(_dpClosingXero) },
                        { description: "Closing balance difference", value: _diffCell(_dpClosingDiff) },
                      ]
                    })
                  );
                })()}
                <div style={{ background: T.colorSurfacePrimary, border: "1px solid " + T.colorButtonSecondary, borderRadius: 8, marginBottom: 28, overflow: "hidden" }}>
                  <div onClick={function() { _dpSetAnalysisOpen(function(o) { return !o; }); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 67, padding: "0 20px", cursor: "pointer" }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>Analysis & key findings</span>
                    <div style={{ display: "flex", transform: _dpAnalysisOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)", flexShrink: 0, marginLeft: 12 }}><ChevronUpIcon /></div>
                  </div>
                  <div style={{ overflow: "hidden", maxHeight: _dpAnalysisOpen ? 500 : 0, opacity: _dpAnalysisOpen ? 1 : 0, transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease" }}>
                    <div style={{ fontSize: 14, color: T.colorTextBody, lineHeight: "20px", margin: "0 20px 16px", borderTop: "1px solid " + T.colorBorderSubtle, paddingTop: 14 }}>
                      <p style={{ margin: "0 0 10px" }}>The depreciation review for {selectedPeriod} compared the fixed asset register against Xero balances across 6 asset categories (accounts 0010–0040) covering 135 individual assets.</p>
                      <p style={{ margin: "0 0 10px" }}>Three asset categories have unposted depreciation charges. The most significant is motor vehicles (0040) where two months of depreciation totalling £5,200.00 appear to be missing. Plant & machinery (0020) has a single unposted charge of £2,180.00 for forklift FA-031, and computer equipment (0032) is missing March depreciation of £1,740.00.</p>
                      <p style={{ margin: "0 0 10px" }}>Leasehold improvements (0011) have a £3,200.00 amortisation variance relating to the office fit-out. This is consistent with the finding in the balance sheet reconciliation for account 0011.</p>
                      <p style={{ margin: 0 }}>A standing desk purchase of £750.00 was posted to general expenses rather than capitalised to office equipment. This exceeds the £500 capitalisation threshold and should be reclassified.</p>
                    </div>
                  </div>
                </div>
                <hr style={{ border: "none", borderTop: "1px solid " + T.colorBorderDark, margin: "32px 0 40px" }} />
                <h3 style={{ fontSize: 20, fontWeight: 500, color: T.colorTextPrimary, margin: "0 0 16px" }}>Suggestions</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {_DP_CARDS.map(function(card) {
                    var isResolved = _dpResolvedCards.has(card.idx), isIgnored = _dpIgnoredCards.has(card.idx), actionLabel = _dpCardActions[card.idx];
                    var statusLabel = isResolved ? (actionLabel || "Journal posted") : isIgnored ? (actionLabel || "Resolved") : "Unresolved";
                    var statusStyle = isResolved ? { background: T.colorBrandLighter, border: "none", color: T.colorBrandPrimary } : isIgnored ? { background: T.colorButtonDisabled, border: "none", color: T.colorTextSecondary } : { background: T.colorWarningBg, border: "none", color: T.colorWarning };
                    var primaryActionLabels = { "Review suggestion": "Journal posted" };
                    return (
                      <div key={card.idx} id={"result-" + card.key + "-0"} style={{ scrollMarginTop: 64 }}>
                        <RecommendationCard title={card.title} description={card.description} statusLabel={statusLabel} statusStyle={statusStyle}
                          collapsed={isResolved || isIgnored} isIgnored={isIgnored} hideMore={true} tableRow={card.tableRow}
                          tableColumns={[{ key: "account", label: "Account", width: "1.4fr" }, { key: "amount", label: "Amount", width: "0.8fr" }, { key: "period", label: "Period", width: "0.8fr" }]}
                          primaryLabel={card.primaryLabel} secondaryLabel={card.secondaryLabel}
                          onPrimaryAction={function() { _dpSetResolvedCards(function(prev) { return new Set([].concat(Array.from(prev), [card.idx])); }); _dpSetCardActions(function(prev) { var o = Object.assign({}, prev); o[card.idx] = primaryActionLabels[card.primaryLabel] || "Journal posted"; return o; }); }}
                          onIgnore={function() { _dpSetIgnoredCards(function(prev) { return new Set([].concat(Array.from(prev), [card.idx])); }); }}
                          onSecondaryAction={function() { _dpSetResolvedCards(function(prev) { return new Set([].concat(Array.from(prev), [card.idx])); }); _dpSetCardActions(function(prev) { var o = Object.assign({}, prev); o[card.idx] = "Resolved"; return o; }); }}
                          onMore={function() {}} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : _dpResultsVisible ? <CanvasLoader /> : null}
        </div>
        {_dpCanvasReady && (
          <div style={{ position: "absolute", top: 16, bottom: 16, right: 16, width: 400, zIndex: 3, transform: _dpBoxesOpen ? "translateX(0)" : "translateX(calc(100% + 32px))", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)", pointerEvents: _dpBoxesOpen ? "auto" : "none", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: T.colorSurfacePrimary, borderRadius: 8, border: "1px solid " + T.colorButtonSecondary, overflow: "hidden", flexShrink: 0 }}>
              <div style={{ padding: "18px 20px" }}><span style={{ fontSize: 16, fontWeight: 500, color: T.colorTextPrimary }}>Linked sources</span></div>
              <div style={{ borderTop: "1px solid " + T.colorSurfaceActive, padding: "12px 10px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}><path d="M17.5 8.33H2.5M13.33 1.67V5M6.67 1.67V5M6.5 18.33H13.5C14.9 18.33 15.6 18.33 16.14 18.06C16.61 17.82 16.99 17.44 17.23 16.97C17.5 16.43 17.5 15.73 17.5 14.33V7.33C17.5 5.93 17.5 5.23 17.23 4.7C16.99 4.23 16.61 3.85 16.14 3.61C15.6 3.33 14.9 3.33 13.5 3.33H6.5C5.1 3.33 4.4 3.33 3.87 3.61C3.39 3.85 3.01 4.23 2.77 4.7C2.5 5.23 2.5 5.93 2.5 7.33V14.33C2.5 15.73 2.5 16.43 2.77 16.97C3.01 17.44 3.39 17.82 3.87 18.06C4.4 18.33 5.1 18.33 6.5 18.33Z" stroke={T.colorTextSecondary} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>Fixed asset register</span>
                </div>
              </div>
            </div>
            <SuggestionsBox isCleanReconcile={false} allJustResolved={_dpAllDone} accountStatus={null} resolvedCount={_dpResolvedCount} totalSuggestions={_dpTotalSuggestions} matchedTotal={null}
              navCategories={_DP_NAV_CATS.map(function(cat) { return Object.assign({}, cat, { items: cat.items.map(function(item) { return Object.assign({}, item); }) }); })}
              resolvedCards={_dpResolvedCards} ignoredCards={_dpIgnoredCards}
              completedTitle="Depreciation review complete" completedDescription={"All suggestions have been reviewed. Your depreciation charges are up to date for " + selectedPeriod + "."} completedColor={T.colorBrandPrimary} />
          </div>
        )}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════
// Main Adjustments Page
// ═══════════════════════════════════════════════════════════════════════════

registerPage("Adjustments", {
  render: function AdjustmentsFlowPage(_ref) {
    var ctx = _ref.ctx;

    var _s1 = useState("prepayments"); var activeTab = _s1[0], setActiveTab = _s1[1];
    var _sSubView = useState("suggestions"); var _adjSubView = _sSubView[0], setAdjSubView = _sSubView[1];
    var _sSchSearch = useState(""); var _schSearchValue = _sSchSearch[0], _setSchSearchValue = _sSchSearch[1];
    var _s2 = useState(false); var drawerOpen = _s2[0], setDrawerOpen = _s2[1];
    var _s3 = useState(false); var importDrawerOpen = _s3[0], setImportDrawerOpen = _s3[1];
    var _s4 = useState("jan_2026"); var importStartMonth = _s4[0], setImportStartMonth = _s4[1];
    var _s5 = useState(null); var importFile = _s5[0], setImportFile = _s5[1];
    var _s6 = useState(false); var scheduleOpen = _s6[0], setScheduleOpen = _s6[1];
    var _s7 = useState(false); var accrualScheduleOpen = _s7[0], setAccrualScheduleOpen = _s7[1];
    var _s8 = useState(false); var deferredRevenueScheduleOpen = _s8[0], setDeferredRevenueScheduleOpen = _s8[1];
    var _s9 = useState(false); var accruedIncomeScheduleOpen = _s9[0], setAccruedIncomeScheduleOpen = _s9[1];
    var _s10 = useState(false); var prepaymentReviewOpen = _s10[0], setPrepaymentReviewOpen = _s10[1];
    var _s11 = useState({ resolved: 0, total: 5, hasResults: true, resolvedArray: [], ignoredArray: [], cardActions: {} }); var prepaymentReviewState = _s11[0], setPrepaymentReviewState = _s11[1];
    var _s12 = useState(false); var accrualReviewOpen = _s12[0], setAccrualReviewOpen = _s12[1];
    var _s13 = useState({ resolved: 0, total: 4, hasResults: true, resolvedArray: [], ignoredArray: [], cardActions: {} }); var accrualReviewState = _s13[0], setAccrualReviewState = _s13[1];
    var _s14 = useState(false); var deferredRevenueReviewOpen = _s14[0], setDeferredRevenueReviewOpen = _s14[1];
    var _s15 = useState(null); var deferredRevenueReviewState = _s15[0], setDeferredRevenueReviewState = _s15[1];
    var _s16 = useState(false); var accruedIncomeReviewOpen = _s16[0], setAccruedIncomeReviewOpen = _s16[1];
    var _s17 = useState(null); var accruedIncomeReviewState = _s17[0], setAccruedIncomeReviewState = _s17[1];
    var _s30 = useState(false); var loanReviewOpen = _s30[0], setLoanReviewOpen = _s30[1];
    var _s31 = useState(null); var loanReviewState = _s31[0], setLoanReviewState = _s31[1];
    var _s32 = useState(false); var depreciationReviewOpen = _s32[0], setDepreciationReviewOpen = _s32[1];
    var _s33 = useState(null); var depreciationReviewState = _s33[0], setDepreciationReviewState = _s33[1];

    // GL impact per suggestion card
    var _glConfig = {
      prepayments:      { initial: -0.03, impacts: { 2: 0.03 } },
      accruals:         { initial: -85.00, impacts: { 2: 85.00 } },
      deferredRevenue:  { initial: -2800.00, impacts: { 3: 2800.00 } },
      accruedIncome:    { initial: -2540.00, impacts: { 2: 890.00, 3: 1650.00 } },
      loanAmort:        { initial: -3000.00, impacts: { 0: 3000.00 } },
      depreciation:     { initial: -13070.00, impacts: { 0: 2180.00, 1: 1740.00, 2: 5200.00, 3: 3200.00, 4: 750.00 } },
    };
    var _computeGlBadge = function(config, reviewState) {
      if (!config) return null;
      var resolved = reviewState && reviewState.resolvedArray ? reviewState.resolvedArray : [];
      var resolvedImpact = resolved.reduce(function(sum, idx) { return sum + (config.impacts[idx] || 0); }, 0);
      var remaining = config.initial + resolvedImpact;
      if (Math.abs(remaining) < 0.01) return null;
      var abs = Math.abs(remaining);
      var label = (remaining > 0 ? "GL +£" : "GL –£") + abs.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      return { label: label, color: T.colorError, bg: T.colorErrorBg };
    };

    // New adjustment form state
    var _s18 = useState("prepayment_expense"); var adjType = _s18[0], setAdjType = _s18[1];
    var _s19 = useState("new"); var prepaymentMode = _s19[0], setPrepaymentMode = _s19[1];
    var _s20 = useState(""); var invoiceAmount = _s20[0], setInvoiceAmount = _s20[1];
    var _s21 = useState(""); var invoiceDate = _s21[0], setInvoiceDate = _s21[1];
    var _s22 = useState(true); var createJournal = _s22[0], setCreateJournal = _s22[1];
    var _s23 = useState(""); var expenseAccount = _s23[0], setExpenseAccount = _s23[1];
    var _s24 = useState(""); var description = _s24[0], setDescription = _s24[1];
    var _s25 = useState(""); var trackingCategory = _s25[0], setTrackingCategory = _s25[1];
    var _s26 = useState(""); var monthlyRelease = _s26[0], setMonthlyRelease = _s26[1];
    var _s27 = useState(""); var startingMonth = _s27[0], setStartingMonth = _s27[1];
    var _s28 = useState(""); var endingMonth = _s28[0], setEndingMonth = _s28[1];

    var calendarIcon = (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M17.5 8.33333H2.5M13.3333 1.66667V5M6.66667 1.66667V5M6.5 18.3333H13.5C14.9001 18.3333 15.6002 18.3333 16.135 18.0609C16.6054 17.8212 16.9878 17.4387 17.2275 16.9683C17.5 16.4335 17.5 15.7335 17.5 14.3333V7.33333C17.5 5.9332 17.5 5.23314 17.2275 4.69836C16.9878 4.22795 16.6054 3.8455 16.135 3.60582C15.6002 3.33333 14.9001 3.33333 13.5 3.33333H6.5C5.09987 3.33333 4.3998 3.33333 3.86502 3.60582C3.39462 3.8455 3.01217 4.22795 2.77248 4.69836C2.5 5.23314 2.5 5.9332 2.5 7.33333V14.3333C2.5 15.7335 2.5 16.4335 2.77248 16.9683C3.01217 17.4387 3.39462 17.8212 3.86502 18.0609C4.3998 18.3333 5.09987 18.3333 6.5 18.3333Z"
          stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );

    var monthLabels = {
      jan_2026: "January 2026", feb_2026: "February 2026", mar_2026: "March 2026",
      apr_2026: "April 2026", may_2026: "May 2026", jun_2026: "June 2026",
      jul_2026: "July 2026", aug_2026: "August 2026", sep_2026: "September 2026",
      oct_2026: "October 2026", nov_2026: "November 2026", dec_2026: "December 2026",
    };
    var monthKeys = Object.keys(monthLabels);
    var startIdx = monthKeys.indexOf(startingMonth);
    var endIdx = monthKeys.indexOf(endingMonth);
    var releaseMonths = startIdx >= 0 && endIdx >= startIdx
      ? monthKeys.slice(startIdx, endIdx + 1)
      : [];
    var releaseAmount = releaseMonths.length > 0
      ? (parseFloat(invoiceAmount.replace(/,/g, "")) / releaseMonths.length).toFixed(2)
      : "0.00";

    var startDateLabel = startIdx >= 0 ? "1 " + monthLabels[startingMonth] : "";
    var endDateFull = endIdx >= 0 ? monthLabels[endingMonth] : "";
    var endDay = endingMonth === "jan_2026" ? "31" : endingMonth === "feb_2026" ? "28" : endingMonth === "mar_2026" ? "31" : endingMonth === "apr_2026" ? "30" : endingMonth === "may_2026" ? "31" : endingMonth === "jun_2026" ? "30" : "31";
    var dateRangeText = startDateLabel && endDateFull ? (startDateLabel + " to " + endDay + " " + endDateFull) : "";

    var drawerFooter = (
      <>
        <SecondaryButton onClick={function() { setDrawerOpen(false); }} style={{ height: 40, padding: "8px 16px", fontSize: 14 }}>Cancel</SecondaryButton>
        <PrimaryButton onClick={function() { setDrawerOpen(false); }} style={{ flex: 1, height: 40, padding: "8px 16px", fontSize: 14, justifyContent: "center" }}>Add to schedule</PrimaryButton>
      </>
    );

    var InfoCircle = function() {
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6.5" stroke="#8C8C8B" strokeWidth="1.25"/>
          <path d="M8 10.667V8M8 5.333h.007" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    };

    var calendarBtnIcon = (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
        <path d="M17.5 8.33333H2.5M13.3333 1.66667V5M6.66667 1.66667V5M6.5 18.3333H13.5C14.9001 18.3333 15.6002 18.3333 16.135 18.0609C16.6054 17.8212 16.9878 17.4387 17.2275 16.9683C17.5 16.4335 17.5 15.7335 17.5 14.3333V7.33333C17.5 5.9332 17.5 5.23314 17.2275 4.69836C16.9878 4.22795 16.6054 3.8455 16.135 3.60582C15.6002 3.33333 14.9001 3.33333 13.5 3.33333H6.5C5.09987 3.33333 4.3998 3.33333 3.86502 3.60582C3.39462 3.8455 3.01217 4.22795 2.77248 4.69836C2.5 5.23314 2.5 5.9332 2.5 7.33333V14.3333C2.5 15.7335 2.5 16.4335 2.77248 16.9683C3.01217 17.4387 3.39462 17.8212 3.86502 18.0609C4.3998 18.3333 5.09987 18.3333 6.5 18.3333Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );

    var _ovInfoIcon = (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="8" cy="8" r="7" stroke={T.colorTextSecondary} strokeWidth="1.2" />
        <path d="M8 7v4" stroke={T.colorTextSecondary} strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="8" cy="5" r="0.75" fill={T.colorTextSecondary} />
      </svg>
    );

    var _ovGlBadge = function(gl) {
      if (!gl) return (
        <span style={{ fontSize: 12, fontWeight: 500, color: T.colorBrandPrimary, background: T.colorSuccessBg, borderRadius: 6, padding: "1px 5px", lineHeight: "17px", letterSpacing: "0.15px", whiteSpace: "nowrap" }}>Reconciled</span>
      );
      return (
        <span style={{ fontSize: 12, fontWeight: 500, color: gl.color, background: gl.bg, borderRadius: 6, padding: "1px 5px", lineHeight: "17px", letterSpacing: "0.15px", whiteSpace: "nowrap" }}>{gl.label}</span>
      );
    };

    var OverviewCard = function(_ref2) {
      var title = _ref2.title, workflow = _ref2.workflow, metrics = _ref2.metrics, onViewSchedule = _ref2.onViewSchedule, onRun = _ref2.onRun;

      var wfLabel = "Review";
      var wfColor = undefined;
      var wfSubtitle = undefined;
      if (workflow.status === "suggestions") {
        var remaining = workflow.total - workflow.resolved;
        if (remaining > 0) {
          wfLabel = remaining + " suggestion" + (remaining !== 1 ? "s" : "");
          wfColor = T.colorError;
          wfSubtitle = "28 mar";
        } else {
          wfLabel = "Reconciled";
          wfColor = T.colorBrandPrimary;
          wfSubtitle = "28 mar";
        }
      }

      return (
        <div style={{
          background: T.colorSurfacePrimary, border: "1px solid " + T.colorBorderDark,
          borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 20,
        }}>
          {/* Header: title + AdjWorkflowCard */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <span style={{ fontSize: 20, fontWeight: 500, color: T.colorTextPrimary, lineHeight: "28px", letterSpacing: "0.2px", paddingTop: 8 }}>{title}</span>
            <AdjWorkflowCard
              label={wfLabel}
              color={wfColor}
              subtitle={wfSubtitle}
              onClick={onRun}
            />
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: T.colorBorderLight }} />

          {/* Metrics row */}
          <div style={{ display: "flex", gap: 32 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ ...T.textSm, fontWeight: 400, color: T.colorTextSecondary }}>Opening balance</span>
                {_ovInfoIcon}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 18, fontWeight: 500, color: T.colorTextPrimary, whiteSpace: "nowrap" }}>{metrics.opening}</span>
                {_ovGlBadge(metrics.openingGl)}
              </div>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ ...T.textSm, fontWeight: 400, color: T.colorTextSecondary }}>Additions</span>
              <span style={{ fontSize: 18, fontWeight: 500, color: T.colorTextPrimary, whiteSpace: "nowrap" }}>{metrics.additions}</span>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ ...T.textSm, fontWeight: 400, color: T.colorTextSecondary }}>Releases</span>
              <span style={{ fontSize: 18, fontWeight: 500, color: T.colorTextPrimary, whiteSpace: "nowrap" }}>{metrics.releases}</span>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ ...T.textSm, fontWeight: 400, color: T.colorTextSecondary }}>Closing balance</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 18, fontWeight: 500, color: T.colorTextPrimary, whiteSpace: "nowrap" }}>{metrics.closing}</span>
                {_ovGlBadge(metrics.closingGl)}
              </div>
            </div>
          </div>

          {/* View full schedule button */}
          <SecondaryButton onClick={onViewSchedule} style={{ height: 40, padding: "8px 16px 8px 12px", fontSize: 14, gap: 8, whiteSpace: "nowrap", alignSelf: "flex-start" }}>
            {calendarBtnIcon}
            View full schedule
          </SecondaryButton>
        </div>
      );
    };

    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar />
        <div style={{ flex: 1, overflowY: "auto", scrollbarGutter: "stable", padding: "0 48px 48px", display: "flex", flexDirection: "column", gap: 24, background: T.colorSurfacePrimary }}>
          <div style={{ padding: "32px 0 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1 style={{ fontSize: 32, fontWeight: 500, color: T.colorTextPrimary, lineHeight: "40px", letterSpacing: "-1px" }}>Adjustments</h1>
            <div style={{ display: "flex", gap: 8 }}>
              <SecondaryButton onClick={function() { setImportDrawerOpen(true); }} style={{ height: 44, boxSizing: "border-box", padding: "10px 16px" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginRight: 6, flexShrink: 0 }}>
                  <path d={_MM_PATHS.upload} stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Import schedule
              </SecondaryButton>
              <SecondaryButton onClick={function() { setDrawerOpen(true); }} style={{ height: 44, boxSizing: "border-box", padding: "10px 16px" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginRight: 6, flexShrink: 0 }}>
                  <path d={_MM_PATHS.plus} stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                New adjustment
              </SecondaryButton>
            </div>
          </div>

          {/* ── Adjustment type tabs ── */}
          <TabsNavigation
            tabs={[
              { value: "prepayments", label: "Prepayments", count: prepaymentReviewState && prepaymentReviewState.hasResults ? prepaymentReviewState.total - prepaymentReviewState.resolved : 5 },
              { value: "accruals", label: "Accruals", count: accrualReviewState && accrualReviewState.hasResults ? accrualReviewState.total - accrualReviewState.resolved : 4 },
              { value: "deferred_revenue", label: "Deferred revenue", disabled: true, tooltip: "Coming soon" },
              { value: "accrued_income", label: "Accrued income", disabled: true, tooltip: "Coming soon" },
              { value: "loan_amort", label: "Loan amortisation", disabled: true, tooltip: "Coming soon" },
              { value: "depreciation", label: "Depreciation (FAR)", disabled: true, tooltip: "Coming soon" },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {/* ── Overview card for active tab ── */}
          {(function() {
            var tabConfig = {
              prepayments: {
                metrics: { opening: "£18,850.00", openingGl: null, additions: "£8,160.00", releases: "(£3,570.00)", closing: "£23,440.00", closingGl: _computeGlBadge(_glConfig.prepayments, prepaymentReviewState) },
                onViewSchedule: function() { setScheduleOpen(true); },
                onRun: function() { setPrepaymentReviewOpen(true); },
                reviewState: prepaymentReviewState,
              },
              accruals: {
                metrics: { opening: "£36,195.00", openingGl: null, additions: "£9,725.00", releases: "(£15,415.00)", closing: "£30,505.00", closingGl: _computeGlBadge(_glConfig.accruals, accrualReviewState) },
                onViewSchedule: function() { setAccrualScheduleOpen(true); },
                onRun: function() { setAccrualReviewOpen(true); },
                reviewState: accrualReviewState,
              },
            };
            var cfg = tabConfig[activeTab];
            if (!cfg) return null;
            var m = cfg.metrics;

            return (
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {/* Overview metrics + View full schedule */}
                <div style={{
                  background: T.colorSurfacePrimary, border: "1px solid " + T.colorBorderDark,
                  borderRadius: 16, padding: "24px 24px 20px", display: "flex", alignItems: "center", gap: 32,
                }}>
                  <div style={{ flex: 1, display: "flex", gap: 32 }}>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ ...T.textSm, fontWeight: 400, color: T.colorTextSecondary }}>Opening balance</span>
                        {_ovInfoIcon}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 18, fontWeight: 500, color: T.colorTextPrimary, whiteSpace: "nowrap" }}>{m.opening}</span>
                        {_ovGlBadge(m.openingGl)}
                      </div>
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                      <span style={{ ...T.textSm, fontWeight: 400, color: T.colorTextSecondary }}>Additions</span>
                      <span style={{ fontSize: 18, fontWeight: 500, color: T.colorTextPrimary, whiteSpace: "nowrap" }}>{m.additions}</span>
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                      <span style={{ ...T.textSm, fontWeight: 400, color: T.colorTextSecondary }}>Releases</span>
                      <span style={{ fontSize: 18, fontWeight: 500, color: T.colorTextPrimary, whiteSpace: "nowrap" }}>{m.releases}</span>
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                      <span style={{ ...T.textSm, fontWeight: 400, color: T.colorTextSecondary }}>Closing balance</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 18, fontWeight: 500, color: T.colorTextPrimary, whiteSpace: "nowrap" }}>{m.closing}</span>
                        {_ovGlBadge(m.closingGl)}
                      </div>
                    </div>
                  </div>
                  <SecondaryButton onClick={cfg.onViewSchedule} style={{ height: 40, padding: "8px 16px 8px 12px", fontSize: 14, gap: 8, whiteSpace: "nowrap", flexShrink: 0 }}>
                    {calendarBtnIcon}
                    View full schedule
                  </SecondaryButton>
                </div>

                {/* Suggestions / Scheduled this month switch */}
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  {["suggestions", "scheduled"].map(function(sw) {
                    var isActive = _adjSubView === sw;
                    var label = sw === "suggestions" ? "Suggestions" : "Scheduled this month";
                    return (
                      <button key={sw} onClick={function() { setAdjSubView(sw); }} style={{
                        background: isActive ? "#F0F0F0" : "none", border: "none",
                        padding: "6px 12px", borderRadius: 8, cursor: "pointer",
                        ...T.textSm, fontWeight: isActive ? 500 : 400,
                        color: isActive ? T.colorTextPrimary : T.colorTextSecondary,
                        position: "relative", fontFamily: T.fontFamily,
                      }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          {label}
                          {sw === "suggestions" && <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.colorBrandPrimary, flexShrink: 0 }} />}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Content area */}
                {_adjSubView === "suggestions"
                  ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <RecommendationCard
                        title={activeTab === "prepayments" ? "5 suggested prepayments" : "4 suggested accruals"}
                        subtitle="Review suggestions from Mimo's analysis"
                        actionLabel="Review suggestions"
                        onAction={cfg.onRun}
                      />
                    </div>
                  )
                  : (
                    <div style={{ border: "1px solid " + T.colorBorderDark, borderRadius: 8, overflow: "hidden" }}>
                    {/* Search + filter bar */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: "1px solid " + T.colorBorderDark, flexWrap: "wrap" }}>
                      <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
                          <circle cx="7" cy="7" r="5.5" stroke={T.colorTextSecondary} strokeWidth="1.25" />
                          <path d="M11 11L14 14" stroke={T.colorTextSecondary} strokeWidth="1.25" strokeLinecap="round" />
                        </svg>
                        <input type="text" placeholder="Search..." value={_schSearchValue} onChange={function(e) { _setSchSearchValue(e.target.value); }} style={{ width: "100%", height: 36, paddingLeft: 36, paddingRight: 12, border: "1px solid " + T.colorBorderDark, borderRadius: 8, fontSize: 14, fontFamily: T.fontFamily, color: T.colorTextPrimary, outline: "none", boxSizing: "border-box", background: T.colorSurfacePrimary }} onFocus={function(e) { e.target.style.borderColor = T.colorBrandPrimary; }} onBlur={function(e) { e.target.style.borderColor = T.colorBorderDark; }} />
                      </div>
                      <div style={{ marginLeft: "auto" }}>
                        <Dropdown value="all" options={[{ value: "all", label: "All expense accounts" }]} onChange={function(){}} size="sm" width={200} />
                      </div>
                    </div>
                    <DataTable
                      noBorder
                      columns={[
                        { key: "description", label: "Description", width: "minmax(200px, 1fr)", render: function(v, row) {
                          return (
                            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                              <span style={{ fontWeight: 500 }}>{v}</span>
                              <span style={{ ...T.textSm, color: T.colorTextSecondary }}>{row.period}</span>
                            </div>
                          );
                        }},
                        { key: "expenseAccount", label: "Expense account", width: "200px" },
                        { key: "openingBalance", label: "Opening balance", width: "140px", align: "right" },
                        { key: "movement", label: "Movement", width: "160px", align: "right", render: function(v) {
                          if (!v || v === "-") return <span>-</span>;
                          var lines = Array.isArray(v) ? v : [v];
                          var clockIcon = <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                            <circle cx="6" cy="6" r="5" stroke={T.colorTextSecondary} strokeWidth="1" />
                            <path d="M6 3.5V6L7.5 7.5" stroke={T.colorTextSecondary} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>;
                          return (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                              {lines.map(function(line, i) {
                                return (
                                  <Tooltip key={i} text="Scheduled for publishing on 30 April" delay={800}>
                                    <div style={{ display: "inline-flex", alignItems: "center", background: "#ECECEC", borderRadius: 4, padding: "2px 6px", gap: 2, ...T.textSm, cursor: "default" }}>
                                      {line}
                                      {clockIcon}
                                    </div>
                                  </Tooltip>
                                );
                              })}
                            </div>
                          );
                        }},
                        { key: "closingBalance", label: "Closing balance", width: "140px", align: "right" },
                      ]}
                      rows={(activeTab === "prepayments" ? [
                        { description: "Peel Holdings – warehouse lease", period: "Dec 25 – Nov 26 (12m)", expenseAccount: "6000 – Rent", openingBalance: "£6,400.00", movement: "(£800.00)", closingBalance: "£5,600.00" },
                        { description: "Hiscox – PI cover FY 25/26", period: "Nov 25 – Oct 26 (12m)", expenseAccount: "6030 – Insurance", openingBalance: "£2,625.00", movement: "(£375.00)", closingBalance: "£2,250.00" },
                        { description: "Microsoft 365 Business", period: "Jan 26 – Dec 26 (12m)", expenseAccount: "6220 – Subscriptions", openingBalance: "£3,600.00", movement: "(£400.00)", closingBalance: "£3,200.00" },
                        { description: "Zurich – EL policy 26/27", period: "Apr 26 – Mar 27 (12m)", expenseAccount: "6030 – Insurance", openingBalance: "-", movement: ["£7,200.00", "(£600.00)"], closingBalance: "£6,600.00" },
                        { description: "Red Havas – marketing retainer", period: "Jan 26 – Jun 26 (6m)", expenseAccount: "6110 – Advertising & marketing", openingBalance: "£3,000.00", movement: "(£1,000.00)", closingBalance: "£2,000.00" },
                        { description: "BRC Global Standards certification", period: "Jan 26 – Dec 26 (12m)", expenseAccount: "6220 – Subscriptions", openingBalance: "£1,080.00", movement: "(£120.00)", closingBalance: "£960.00" },
                        { description: "Datto SaaS Protection", period: "Apr 26 – Mar 27 (12m)", expenseAccount: "6220 – Subscriptions", openingBalance: "-", movement: ["£960.00", "(£80.00)"], closingBalance: "£880.00" },
                        { description: "Regus – hot desk licence", period: "Mar 26 – Feb 27 (12m)", expenseAccount: "6000 – Rent", openingBalance: "£2,145.00", movement: "(£195.00)", closingBalance: "£1,950.00" },
                      ] : [
                        { description: "Grant Thornton – statutory audit fee", period: "Recurring (monthly)", expenseAccount: "6200 – Professional fees", openingBalance: "£9,000.00", movement: "£1,500.00", closingBalance: "£10,500.00" },
                        { description: "British Gas – electricity estimate", period: "Recurring (quarterly)", expenseAccount: "6020 – Light, heat & power", openingBalance: "£4,200.00", movement: ["£1,450.00", "(£4,200.00)"], closingBalance: "£1,450.00" },
                        { description: "Thames Water – water rates", period: "Recurring (monthly)", expenseAccount: "6010 – Rates", openingBalance: "£2,430.00", movement: "£530.00", closingBalance: "£2,960.00" },
                        { description: "DHL Supply Chain – freight accrual", period: "Recurring (quarterly)", expenseAccount: "5020 – Freight & carriage", openingBalance: "£4,650.00", movement: ["£1,550.00", "(£4,650.00)"], closingBalance: "£1,550.00" },
                        { description: "Vodafone – mobile fleet", period: "Recurring (monthly)", expenseAccount: "6230 – Telephone & internet", openingBalance: "£85.00", movement: ["£85.00", "(£85.00)"], closingBalance: "£85.00" },
                        { description: "Aviva – pension contributions", period: "Recurring (quarterly)", expenseAccount: "7003 – Pension costs", openingBalance: "£6,480.00", movement: ["£2,160.00", "(£6,480.00)"], closingBalance: "£2,160.00" },
                        { description: "Clifton & Harrow – legal retainer", period: "Recurring (monthly)", expenseAccount: "6200 – Professional fees", openingBalance: "£4,950.00", movement: "£1,650.00", closingBalance: "£6,600.00" },
                        { description: "Building maintenance – planned works", period: "Recurring (monthly)", expenseAccount: "6040 – Repairs & maintenance", openingBalance: "£4,400.00", movement: "£800.00", closingBalance: "£5,200.00" },
                      ]).filter(function(r) { if (!_schSearchValue) return true; var q = _schSearchValue.toLowerCase(); return r.description.toLowerCase().indexOf(q) !== -1 || r.expenseAccount.toLowerCase().indexOf(q) !== -1; })}
                      footerRow={activeTab === "prepayments"
                        ? { description: "Total", expenseAccount: "", openingBalance: "£18,850.00", movement: React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 } }, React.createElement("span", null, "£8,160.00"), React.createElement("span", null, "(£3,570.00)")), closingBalance: (function() {
                            var gl = _computeGlBadge(_glConfig.prepayments, prepaymentReviewState);
                            return React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 } },
                              React.createElement("span", null, "£23,440.00"),
                              gl ? React.createElement("span", { style: { fontSize: 12, fontWeight: 500, color: gl.color, background: gl.bg, borderRadius: 6, padding: "1px 5px", lineHeight: "17px", letterSpacing: "0.15px", whiteSpace: "nowrap" } }, gl.label)
                                : React.createElement("span", { style: { fontSize: 12, fontWeight: 500, color: T.colorBrandPrimary, background: T.colorSuccessBg, borderRadius: 6, padding: "1px 5px", lineHeight: "17px", letterSpacing: "0.15px", whiteSpace: "nowrap" } }, "Reconciled")
                            );
                          })() }
                        : { description: "Total", expenseAccount: "", openingBalance: "£36,195.00", movement: React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 } }, React.createElement("span", null, "£9,725.00"), React.createElement("span", null, "(£15,415.00)")), closingBalance: (function() {
                            var gl = _computeGlBadge(_glConfig.accruals, accrualReviewState);
                            return React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 } },
                              React.createElement("span", null, "£30,505.00"),
                              gl ? React.createElement("span", { style: { fontSize: 12, fontWeight: 500, color: gl.color, background: gl.bg, borderRadius: 6, padding: "1px 5px", lineHeight: "17px", letterSpacing: "0.15px", whiteSpace: "nowrap" } }, gl.label)
                                : React.createElement("span", { style: { fontSize: 12, fontWeight: 500, color: T.colorBrandPrimary, background: T.colorSuccessBg, borderRadius: 6, padding: "1px 5px", lineHeight: "17px", letterSpacing: "0.15px", whiteSpace: "nowrap" } }, "Reconciled")
                            );
                          })() }
                      }
                      minWidth={860}
                    />
                    </div>
                  )
                }
              </div>
            );
          })()}

        </div>

        {/* New Adjustment Drawer */}
        <Sidebar open={drawerOpen} onClose={function() { setDrawerOpen(false); }} title="New adjustment" width={600}
          footer={drawerFooter}>
          <div style={{ padding: "32px 32px 64px", display: "flex", flexDirection: "column", gap: 24 }}>

            <div style={{ fontSize: 20, fontWeight: 500, color: T.colorTextPrimary, lineHeight: "28px", letterSpacing: "0.2px" }}>Adjustment</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <Dropdown label="Adjustment type" value={adjType} onChange={setAdjType} size="lg" options={[
                { value: "prepayment_expense", label: "Prepayment expense" },
                { value: "prepayment_income", label: "Prepayment income" },
                { value: "accrued_expense", label: "Accrued expense" },
                { value: "accrued_income", label: "Accrued income" },
              ]} />

              <RadioGroup label="Prepayment expense" value={prepaymentMode} onChange={setPrepaymentMode} direction="horizontal" options={[
                { value: "new", label: "New" },
                { value: "running", label: "Running" },
              ]} />

              <Input label="Invoice amount" value={invoiceAmount} onChange={setInvoiceAmount} leftSlotType="currency" currencySymbol="£" />

              <Dropdown label="Invoice date" value={invoiceDate} onChange={setInvoiceDate} size="lg" helpText="Will be used for initial recognition for new prepayments" icon={calendarIcon} options={[
                { value: "01/01/2026", label: "01/01/2026" },
                { value: "01/02/2026", label: "01/02/2026" },
                { value: "01/03/2026", label: "01/03/2026" },
              ]} />

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <Checkbox checked={createJournal} onChange={setCreateJournal} label="Create journal entry to recognise prepayment" />
                <div style={{ paddingLeft: 28, ...T.textMd, color: T.colorTextPrimary, opacity: 0.64 }}>
                  Leave unchecked if the initial recognition has been already posted
                </div>
              </div>

              <Dropdown label="Expense account" value={expenseAccount} onChange={setExpenseAccount} size="lg" searchable options={[
                { value: "1401_saas", label: "1401 – SaaS" },
                { value: "1402_hosting", label: "1402 – Hosting" },
                { value: "1403_insurance", label: "1403 – Insurance" },
                { value: "1404_rent", label: "1404 – Rent" },
              ]} />
            </div>

            <div style={{ borderTop: "1px solid " + T.colorBorderDark, margin: "16px 0" }} />

            <div style={{ fontSize: 20, fontWeight: 500, color: T.colorTextPrimary, lineHeight: "28px", letterSpacing: "0.2px" }}>Details</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ ...T.textMd, fontWeight: 500, color: T.colorTextPrimary }}>Description</div>
                <textarea
                  value={description}
                  onChange={function(e) { setDescription(e.target.value); }}
                  rows={3}
                  style={{
                    width: "100%", padding: "12px 16px", border: "1px solid " + T.colorBorderMedium,
                    borderRadius: 8, fontSize: 16, lineHeight: "26px", color: T.colorTextPrimary,
                    fontFamily: T.fontFamily, resize: "vertical", outline: "none", boxSizing: "border-box",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={function(e) { e.target.style.borderColor = T.colorBrandPrimary; }}
                  onBlur={function(e) { e.target.style.borderColor = T.colorBorderMedium; }}
                />
              </div>

              <Dropdown label="Tracking category (optional)" value={trackingCategory} onChange={setTrackingCategory} size="lg" placeholder="Select tracking category" options={[
                { value: "dept_engineering", label: "Engineering" },
                { value: "dept_marketing", label: "Marketing" },
                { value: "dept_sales", label: "Sales" },
                { value: "dept_operations", label: "Operations" },
              ]} />
            </div>

            <div style={{ borderTop: "1px solid " + T.colorBorderDark, margin: "16px 0" }} />

            <div style={{ fontSize: 20, fontWeight: 500, color: T.colorTextPrimary, lineHeight: "28px", letterSpacing: "0.2px" }}>Prepayment releases</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <RadioGroup label="Monthly release" value={monthlyRelease} onChange={setMonthlyRelease} direction="horizontal" options={[
                { value: "even_split", label: "Even split" },
                { value: "custom", label: "Custom allocation" },
              ]} />

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <Dropdown label="Starting month" value={startingMonth} onChange={setStartingMonth} size="lg" options={monthKeys.map(function(k) { return { value: k, label: monthLabels[k] }; })} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Dropdown label="Ending in" value={endingMonth} onChange={setEndingMonth} size="lg" options={monthKeys.map(function(k) { return { value: k, label: monthLabels[k] }; })} />
                  </div>
                </div>
                {dateRangeText && (
                  <div style={{ ...T.textSm, color: T.colorTextSecondary }}>{dateRangeText}</div>
                )}
              </div>

              {releaseMonths.map(function(mk) {
                return <Input key={mk} label={monthLabels[mk]} value={releaseAmount} onChange={function(){}} state="readonly" leftSlotType="currency" currencySymbol="£" />;
              })}
            </div>
          </div>
        </Sidebar>

        {/* Import Schedule Drawer */}
        <Sidebar open={importDrawerOpen} onClose={function() { setImportDrawerOpen(false); }} title="Import schedule" width={600}
          footer={<>
            <SecondaryButton onClick={function() { setImportDrawerOpen(false); }} style={{ height: 40, padding: "8px 16px", fontSize: 14 }}>Cancel</SecondaryButton>
            <PrimaryButton onClick={function() { setImportDrawerOpen(false); }} style={{ flex: 1, height: 40, padding: "8px 16px", fontSize: 14, justifyContent: "center" }}>Import schedule</PrimaryButton>
          </>}>
          <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ ...T.textMd, fontWeight: 500, color: T.colorTextPrimary }}>Import prepayment schedule</span>
                <span style={{ ...T.textMd, fontWeight: 400, color: T.colorTextMuted }}>
                  Upload your Excel file in any layout. Mimo will convert it into a monthly release schedule and check every line adds up. Review expense accounts and tracking categories in the preview before finishing the import.
                </span>
              </div>
              <div>
                <SecondaryButton style={{ height: 40, padding: "8px 12px 8px 12px", fontSize: 14, gap: 8 }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                    <path d={_MM_PATHS.download} stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download templates
                </SecondaryButton>
              </div>
            </div>

            <Dropdown label="Import schedule starting from" value={importStartMonth} onChange={setImportStartMonth} size="lg" helpText="Mimo will import schedules starting from the chosen month" options={monthKeys.map(function(k) { return { value: k, label: monthLabels[k] }; })} />

            <UploadBox file={importFile} onFileChange={setImportFile} />
          </div>
        </Sidebar>

        {/* Schedule full-screen overlays */}
        <PrepaymentSchedulePage open={scheduleOpen} onClose={function() { setScheduleOpen(false); }} />
        <AccrualSchedulePage open={accrualScheduleOpen} onClose={function() { setAccrualScheduleOpen(false); }} />
        <DeferredRevenueSchedulePage open={deferredRevenueScheduleOpen} onClose={function() { setDeferredRevenueScheduleOpen(false); }} />
        <AccruedIncomeSchedulePage open={accruedIncomeScheduleOpen} onClose={function() { setAccruedIncomeScheduleOpen(false); }} />
        {prepaymentReviewOpen && <PrepaymentReviewFlow onClose={function() { setPrepaymentReviewOpen(false); }} selectedPeriod="April 2026" onStateChange={setPrepaymentReviewState} savedState={prepaymentReviewState} />}
        {accrualReviewOpen && <AccrualReviewFlow onClose={function() { setAccrualReviewOpen(false); }} selectedPeriod="April 2026" onStateChange={setAccrualReviewState} savedState={accrualReviewState} />}
        {deferredRevenueReviewOpen && <DeferredRevenueReviewFlow onClose={function() { setDeferredRevenueReviewOpen(false); }} selectedPeriod="April 2026" onStateChange={setDeferredRevenueReviewState} savedState={deferredRevenueReviewState} />}
        {accruedIncomeReviewOpen && <AccruedIncomeReviewFlow onClose={function() { setAccruedIncomeReviewOpen(false); }} selectedPeriod="April 2026" onStateChange={setAccruedIncomeReviewState} savedState={accruedIncomeReviewState} />}
        {loanReviewOpen && <LoanAmortisationReviewFlow onClose={function() { setLoanReviewOpen(false); }} selectedPeriod="April 2026" onStateChange={setLoanReviewState} savedState={loanReviewState} />}
        {depreciationReviewOpen && <DepreciationReviewFlow onClose={function() { setDepreciationReviewOpen(false); }} selectedPeriod="April 2026" onStateChange={setDepreciationReviewState} savedState={depreciationReviewState} />}
      </div>
    );
  },
  keepAlive: true,
});

})();
