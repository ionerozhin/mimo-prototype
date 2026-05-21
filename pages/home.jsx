// ── Home page ─────────────────────────────────────────────────────────────
registerPage("Home", {
  icon: "home",
  render: function HomePage({ ctx }) {
    var T = ctx.ds.T;
    var TopBar = ctx.ds.TopBar;
    var PrimaryButton = ctx.ds.PrimaryButton;
    var SecondaryButton = ctx.ds.SecondaryButton;
    var StatusBadge = ctx.ds.StatusBadge;
    var PlayCircleIcon = ctx.ds.PlayCircleIcon;
    var LinkCard = ctx.ds.LinkCard;

    var reconciledAccounts = ctx.store.reconciledAccounts;
    var reconciledStatuses = ctx.store.reconciledStatuses;
    var reconciledCounts = ctx.store.reconciledCounts;
    var selectedPeriod = ctx.store.selectedPeriod;
    var vatReviewCompleted = ctx.store.vatReviewCompleted;
    var vatResolvedCards = ctx.store.vatResolvedCards;
    var vatIgnoredCards = ctx.store.vatIgnoredCards;
    var bsReconciledData = ctx.store.bsReconciledData;

    var totalAccounts = 6;
    var vatResolvedCount = vatResolvedCards.size + vatIgnoredCards.size;

    var navigate = ctx.navigate;
    var dispatch = ctx.dispatch;

    var [pageW, setPageW] = useState(window.innerWidth);
    var containerRef = useRef(null);
    useEffect(function() {
      function onResize() { setPageW(window.innerWidth); }
      window.addEventListener("resize", onResize);
      return function() { window.removeEventListener("resize", onResize); };
    }, []);
    var isMedium = pageW < 1024;
    var isStacked = pageW < 1200;

    var fullyReconciled = 0;
    reconciledAccounts.forEach(function(name) {
      if (reconciledStatuses[name] === "reconciled") fullyReconciled++;
    });
    var unreconciledCount = totalAccounts - fullyReconciled;

    var bsAllCodes = typeof BS_ALL_ACCOUNTS !== "undefined" ? new Set(BS_ALL_ACCOUNTS.map(function(a) { return a.code; })) : new Set();
    var bsTotalAccounts = typeof BS_ALL_ACCOUNTS !== "undefined" ? BS_ALL_ACCOUNTS.length : 0;
    var bsReconciledCount = 0;
    Object.keys(bsReconciledData).forEach(function(code) {
      if (bsAllCodes.has(code) && bsReconciledData[code].status === "reconciled") bsReconciledCount++;
    });
    var bsRecStatus = bsReconciledCount === 0 ? "Not started" : bsReconciledCount + " of " + bsTotalAccounts + " accounts reconciled";

    var collectTasks = [
      { label: "Collect missing documents from client",   count: 24 },
      { label: "Collect recurring documents from client", count: 7  },
      { label: "Review and publish received documents",   count: 24 },
      { label: "Reconcile bank accounts", count: unreconciledCount > 0 ? unreconciledCount : null, arrow: unreconciledCount > 0, onClick: function() { navigate("Bank reconciliation"); } },
    ];

    var adjustTasks = [
      { label: "Handle prepayment suggestions", count: null },
      { label: "Handle accrual suggestions",    count: null },
      { label: "VAT and miscoding review",      count: null, arrow: true },
      { label: "Review Profit & Loss",          count: null, arrow: true, onClick: function() { navigate("Profit and Loss"); } },
      { label: "Reconcile balance sheet",       count: null, arrow: true, onClick: function() { navigate("Balance sheet"); } },
    ];

    function CheckCircleSVG() {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M18.333 9.233V10a8.333 8.333 0 1 1-4.941-7.617" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.333 3.333 10 11.675l-2.5-2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }

    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
        <TopBar period={selectedPeriod} onPeriodChange={function(p) { dispatch({ type: "SET_PERIOD", period: p }); }} />

        {/* Page header */}
        <div style={{ padding: isMedium ? "24px 24px 24px" : "32px 48px 32px", flexShrink: 0, background: T.colorSurfacePrimary }}>
          <div style={{ maxWidth: 1440, margin: "0 auto" }}>
            <h1 style={{ fontSize: isMedium ? 28 : 36, fontWeight: 500, color: T.colorTextPrimary, lineHeight: "44px", letterSpacing: "-1px", margin: 0 }}>Seabrook Foods Ltd.</h1>
          </div>
        </div>

        {/* Scrollable content */}
        <div ref={containerRef} style={{ flex: 1, overflowY: "auto", overflowX: "auto", paddingTop: 0, paddingRight: isMedium ? 24 : 48, paddingBottom: isMedium ? 24 : 48, paddingLeft: isMedium ? 24 : 48, background: T.colorSurfacePrimary }}>
          <div style={{ maxWidth: 1440, margin: "0 auto" }}>

          {/* Two-column layout */}
          <div style={{ display: "flex", flexDirection: isStacked ? "column" : "row", gap: 24, alignItems: "flex-start" }}>

            {/* LEFT — Month-end close card */}
            <div style={{ flex: isStacked ? "none" : "1 1 460px", width: isStacked ? "100%" : undefined, minWidth: 0, border: "1px solid " + T.colorButtonSecondary, borderRadius: 8, background: T.colorSurfacePrimary, overflow: "hidden" }}>

              {/* Card header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 24px 16px 20px" }}>
                <StatusBadge variant="success">Preparing</StatusBadge>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <SecondaryButton style={{ height: 40, padding: "0 16px", borderRadius: 8 }}>Send back</SecondaryButton>
                  <PrimaryButton onClick={function() {}}>
                    <CheckCircleSVG />
                    Mark as reviewed
                  </PrimaryButton>
                </div>
              </div>

              {/* Title */}
              <div style={{ padding: "0 24px 16px 20px" }}>
                <p style={{ fontSize: 18, fontWeight: 500, color: T.colorTextHeading, margin: 0 }}>Month end-close: {selectedPeriod}</p>
              </div>

              {/* Progress bar */}
              <div style={{ display: "flex", gap: 2, height: 14, margin: "0 20px 20px" }}>
                <div style={{ flex: 1, background: T.colorBrandPrimary, borderRadius: "99px 0 0 99px" }} />
                <div style={{ flex: 1, background: T.colorSuccessBorder, borderRadius: "0 99px 99px 0" }} />
              </div>

              {/* Status row */}
              <div style={{ display: "flex", padding: "0 20px 24px", gap: 0 }}>
                <div style={{ display: "flex", flex: 1, gap: 10, alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0 }}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <circle cx="11" cy="11" r="11" fill="#05A105"/>
                      <path d="M6.5 11l3 3 6-6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: T.colorTextHeading, margin: 0, lineHeight: "22px" }}>Preparing</p>
                    <p style={{ fontSize: 14, color: T.colorTextSecondary, margin: 0, lineHeight: "22px" }}>by Courtney Lemke</p>
                  </div>
                </div>
                <div style={{ display: "flex", flex: 1, gap: 10, alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0 }}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <circle cx="11" cy="11" r="10" stroke="#05A105" strokeWidth="1.5"/>
                      <path d="M6.5 11l3 3 6-6" stroke="#05A105" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: T.colorTextHeading, margin: 0, lineHeight: "22px" }}>Review</p>
                    <p style={{ fontSize: 14, color: T.colorTextSecondary, margin: 0, lineHeight: "22px" }}>In progress</p>
                  </div>
                </div>
              </div>

              {/* Collect & Reconcile section */}
              <div style={{ padding: "0 24px 16px", display: "flex", alignItems: "center" }}>
                <p style={{ fontSize: 18, fontWeight: 500, color: T.colorTextHeading, margin: 0 }}>Collect &amp; Reconcile</p>
              </div>
              {collectTasks.map(function(t) {
                return <LinkCard key={t.label} label={t.label} badge={t.count} checked={!t.count && !t.arrow} onClick={t.onClick} />;
              })}

              {/* Adjustments & review section */}
              <div style={{ padding: "16px 24px 16px", display: "flex", alignItems: "center" }}>
                <p style={{ fontSize: 18, fontWeight: 500, color: T.colorTextHeading, margin: 0 }}>Adjustments &amp; Review</p>
              </div>
              {adjustTasks.map(function(t) {
                return <LinkCard key={t.label} label={t.label} badge={t.count} checked={!t.count && !t.arrow} onClick={t.onClick} />;
              })}
            </div>

            {/* RIGHT column */}
            <div style={{ flex: isStacked ? "none" : "1 1 400px", width: isStacked ? "100%" : undefined, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Workflows card */}
            <div style={{ border: "1px solid " + T.colorButtonSecondary, borderRadius: 8, background: T.colorSurfacePrimary, overflow: "hidden" }}>
              <div style={{ padding: "20px 24px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                <p style={{ fontSize: 18, fontWeight: 500, color: T.colorTextHeading, margin: 0 }}>Workflows</p>
              </div>
              {[
                { label: "Bank reconciliation",          onRun: function() { navigate("Bank reconciliation"); }, status: fullyReconciled + " of " + totalAccounts + " accounts reconciled", btnLabel: "Select account", dataflowIcon: true },
                { label: "VAT and miscoding review",     onRun: function() { navigate("VAT review"); }, status: vatReviewCompleted ? (vatResolvedCount >= 5 ? "Completed" : vatResolvedCount + " of 5 suggestions resolved") : "Not started", btnLabel: vatReviewCompleted ? "Review" : "Run" },
                { label: "Payroll reconciliation",       onRun: null, status: "Not started", btnLabel: "Run" },
                { label: "Director's loan account",      onRun: null, status: "Not started", btnLabel: "Run" },
                { label: "Fixed assets",                 onRun: null, status: "Not started", btnLabel: "Run" },
                { label: "Balance sheet reconciliation", onRun: null, status: bsRecStatus, btnLabel: "Select account", dataflowIcon: true },
                { label: "Accrued adjustment",           onRun: function() { navigate("Accrual"); }, status: "Not started", btnLabel: "Run" },
              ].map(function(item) {
                var resolvedStatusColor = item.status === "Not started" ? T.colorTextSecondary
                  : item.status === "Completed" ? T.colorBrandPrimary
                  : T.colorInfo;
                return (
                <div key={item.label} style={{ borderTop: "1px solid " + T.colorButtonSecondary, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextHeading }}>{item.label}</span>
                    <span style={{ fontSize: 14, color: resolvedStatusColor }}>{item.status}</span>
                  </div>
                  <SecondaryButton onClick={item.onRun || undefined} style={{ height: 36, padding: "0 14px", whiteSpace: "nowrap", flexShrink: 0 }}>
                    {item.btnLabel}
                    {item.dataflowIcon ? (
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" stroke="#080908" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <PlayCircleIcon color={T.colorTextPrimary} size={20} />
                    )}
                  </SecondaryButton>
                </div>
                );
              })}
            </div>

            {/* Client context card */}
            <div style={{ border: "1px solid " + T.colorButtonSecondary, borderRadius: 8, background: T.colorSurfacePrimary, padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: T.colorSuccessBg, borderRadius: 6, padding: "0 10px", height: 32, alignSelf: "flex-start", fontSize: 14, fontWeight: 500, color: T.colorBrandPrimary }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4.5 22V17M4.5 7V2M2 4.5H7M2 19.5H7M13 3L11.2658 7.50886C10.9838 8.24209 10.8428 8.60871 10.6235 8.91709C10.4292 9.1904 10.1904 9.42919 9.91709 9.62353C9.60871 9.84281 9.24209 9.98381 8.50886 10.2658L4 12L8.50886 13.7342C9.24209 14.0162 9.60871 14.1572 9.91709 14.3765C10.1904 14.5708 10.4292 14.8096 10.6235 15.0829C10.8428 15.3913 10.9838 15.7579 11.2658 16.4911L13 21L14.7342 16.4911C15.0162 15.7579 15.1572 15.3913 15.3765 15.0829C15.5708 14.8096 15.8096 14.5708 16.0829 14.3765C16.3913 14.1572 16.7579 14.0162 17.4911 13.7342L22 12L17.4911 10.2658C16.7579 9.98381 16.3913 9.8428 16.0829 9.62353C15.8096 9.42919 15.5708 9.1904 15.3765 8.91709C15.1572 8.60871 15.0162 8.24209 14.7342 7.50886L13 3Z" stroke="#05A105" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Client context
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ fontSize: 18, fontWeight: 500, color: T.colorTextHeading, margin: 0, lineHeight: "26px" }}>Associate adapts to your client</p>
                <p style={{ fontSize: 15, color: T.colorTextSecondary, margin: 0, lineHeight: "24px" }}>The more you share about your client, the more relevant its suggestions and analysis will be.</p>
              </div>
              <SecondaryButton style={{ alignSelf: "flex-start" }}>Manage client context</SecondaryButton>
            </div>

            </div>{/* end right column */}

          </div>
          </div>
        </div>
      </div>
    );
  }
});
