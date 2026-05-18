// ── VAT Review page ──────────────────────────────────────────────────────
registerPage("VAT review", {
  icon: "checkVerified",
  section: "hidden",
  render: function VATReviewPage({ ctx }) {
    var T = ctx.ds.T;
    var navigate = ctx.navigate;
    var dispatch = ctx.dispatch;
    var vatResolvedCards = ctx.store.vatResolvedCards;
    var vatIgnoredCards = ctx.store.vatIgnoredCards;
    var vatReviewCompleted = ctx.store.vatReviewCompleted;
    var selectedPeriod = ctx.store.selectedPeriod;

const VAT_STEPS = [
  { title: "Pulling April 2026 transactions from Xero",   subtext: null,                         duration: 900  },
  { title: "Scanning VAT codes & rates",                  subtext: "Pulled 184 transactions",    duration: 1300 },
  { title: "Cross-referencing receipts & invoices",       subtext: "Checked 184 VAT codes",      duration: 1500 },
  { title: "Running partial-exemption calculation",        subtext: "Matched 178, 6 flagged",     duration: 1000 },
  { title: "Checking for duplicates and anomalies",       subtext: "1 duplicate found",          duration: 800  },
  { title: "Generating suggestions",                      subtext: "5 suggestions ready",        duration: 1000 },
];

const VAT_CARDS = [
  {
    idx: 0, cat: "uncertain", score: null,
    title: "Yorkshire Tea Estates: Uncertain VAT",
    contact: "Yorkshire Tea Estates",
    description: "The VAT treatment on this transaction is uncertain and requires manual review. Please check the invoice to confirm the correct VAT code.",
    tableRow: {
      "Contact": "Yorkshire Tea Estates",
      "Expense account": "620 – General Expenses",
      "Date": "8 Mar 2026",
      "Amount": "£640.00",
      "VAT rate name": { text: "No VAT", strikethrough: true },
      "Suggested": "—",
    },
    primaryLabel: "Review invoice", secondaryLabel: null,
  },
  {
    idx: 1, cat: "wrong-code", score: null,
    title: "Yorkshire Tea Estates: 20% (VAT on Expenses) → No VAT",
    contact: "Yorkshire Tea Estates",
    description: "This transaction has been coded as 20% VAT on Expenses but the supply appears to be outside the scope of VAT. Recommend recoding to No VAT.",
    tableRow: {
      "Contact": "Yorkshire Tea Estates",
      "Expense account": "620 – General Expenses",
      "Date": "15 Mar 2026",
      "Amount": "£380.00",
      "VAT rate name": { text: "20% (VAT on Expenses)", strikethrough: true },
      "Suggested": "No VAT",
    },
    primaryLabel: "Accept", secondaryLabel: "Review",
  },
  {
    idx: 2, cat: "reverse-charge", score: null,
    title: "Brightside Electrical Ltd: Tax on Purchases (20%) → Reverse Charge (20%)",
    contact: "Brightside Electrical Ltd",
    description: "Scanned invoice from Brightside Electrical Ltd shows \"Domestic Reverse Charge applies – do not pay VAT to supplier\" in the payment terms, indicating a CIS subcontractor supply.",
    tableRow: {
      "Contact": "Brightside Electrical Ltd",
      "Expense account": "310 – Subcontractor Costs",
      "Date": "17 Mar 2026",
      "Amount": "£240.00",
      "VAT rate name": { text: "Tax on Purchases (20%)", strikethrough: true },
      "Suggested": "Reverse Charge (20%)",
    },
    primaryLabel: "Accept", secondaryLabel: "Edit",
  },
  {
    idx: 3, cat: "non-reclaimable", score: null,
    title: "The Ivy Private Dining: Tax on Purchases (20%) → Tax Exempt",
    contact: "The Ivy Private Dining",
    description: "Client entertainment is fully blocked for input tax recovery under HMRC Notice 700/65 — no VAT reclaimable on this invoice from The Ivy Private Dining.",
    tableRow: {
      "Contact": "The Ivy Private Dining",
      "Expense account": "420 – Entertainment",
      "Date": "27 Mar 2026",
      "Amount": "£1,150.00",
      "VAT rate name": { text: "Tax on Purchases (20%)", strikethrough: true },
      "Suggested": "Tax Exempt",
    },
    primaryLabel: "Accept", secondaryLabel: "Edit",
  },
  {
    idx: 4, cat: "pva", score: null,
    title: "DHL / HMRC Customs: No VAT → Tax on Purchases (20%) (PVA)",
    contact: "DHL / HMRC Customs",
    description: "Client imports goods from non-UK suppliers regularly — the £3,600 Customs charge from HMRC on this DHL consignment likely relates to postponed VAT accounting and should be reconciled against the monthly PVA statement.",
    tableRow: {
      "Contact": "DHL / HMRC Customs",
      "Expense account": "510 – Import Duties",
      "Date": "3 Mar 2026",
      "Amount": "£3,600.00",
      "VAT rate name": { text: "No VAT", strikethrough: true },
      "Suggested": "Tax on Purchases (20%) (PVA)",
    },
    primaryLabel: "Accept", secondaryLabel: "Edit",
  },
];

const VAT_NAV_CATS = [
  { key: "uncertain",       label: "Uncertain VAT",       baseIdx: 0, items: [{ contact: "Yorkshire Tea Estates" }] },
  { key: "wrong-code",      label: "Wrong VAT code",      baseIdx: 1, items: [{ contact: "Yorkshire Tea Estates" }] },
  { key: "reverse-charge",  label: "Reverse charge",      baseIdx: 2, items: [{ contact: "Brightside Electrical Ltd" }] },
  { key: "non-reclaimable", label: "Non-reclaimable VAT", baseIdx: 3, items: [{ contact: "The Ivy Private Dining" }] },
  { key: "pva",             label: "Postponed VAT (PVA)", baseIdx: 4, items: [{ contact: "DHL / HMRC Customs" }] },
];

const VAT_CAT_LABELS = {
  "uncertain":       "Uncertain VAT",
  "wrong-code":      "Wrong VAT code",
  "reverse-charge":  "Reverse charge",
  "non-reclaimable": "Non-reclaimable VAT",
  "pva":             "Postponed VAT (PVA)",
};

function VATReturnCard({ onReviewReport, showingReport = false, resolvedCards = new Set(), ignoredCards = new Set() }) {
  const VAT_ITEMS = [
    { box: 1, label: "VAT due on sales",            value: "£3,211.44", highlight: false },
    { box: 4, label: "VAT reclaimed on purchases",  value: "£1,097.56", highlight: false },
    { box: 5, label: "Net VAT due to HMRC",         value: "£2,113.88", highlight: true  },
    { box: 6, label: "Total sales (excl. VAT)",     value: "£16,057",   highlight: false },
    { box: 7, label: "Total purchases (excl. VAT)", value: "£5,488",    highlight: false },
  ];
  const [collapsed, setCollapsed] = useState(false);
  const [downloadState, setDownloadState] = useState("idle"); // "idle" | "downloading" | "done"
  const [flashKey, setFlashKey] = useState(0);
  const [flashActive, setFlashActive] = useState(false);
  const prevActionCount = useRef(0);

  const actionCount = resolvedCards.size + ignoredCards.size;
  useEffect(() => {
    if (actionCount <= prevActionCount.current) { prevActionCount.current = actionCount; return; }
    prevActionCount.current = actionCount;
    setFlashKey(k => k + 1);
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 1600);
  }, [actionCount]);

  // Dynamically compute box 4 and 5 based on resolved suggestions
  const CARD_ADJUSTMENTS = { 0: 210.00, 1: 480.00, 2: 90.00, 3: -340.00, 4: 125.00 };
  const box1Base = 3211.44;
  const box4Base = 1097.56;
  let box4Adj = 0;
  resolvedCards.forEach(idx => { box4Adj += CARD_ADJUSTMENTS[idx] || 0; });
  const box4Val = box4Base + box4Adj;
  const box5Val = box1Base - box4Val;
  const fmt = (n) => `£${Math.abs(n).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const handleDownload = () => {
    if (downloadState !== "idle") return;
    setDownloadState("downloading");

    const generatePdf = () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const W = doc.internal.pageSize.getWidth();
      const margin = 40;
      const tableW = W - margin * 2;
      const boxColW = 40;
      const valueColW = 140;
      const labelColW = tableW - boxColW - valueColW;

      const green     = [5, 161, 5];
      const lightGreen= [240, 251, 240];
      const darkGreen = [8, 77, 8];
      const borderC   = [120, 120, 120];
      const grey      = [84, 84, 83];

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("Seabrook Foods Ltd", margin, 48);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.setTextColor(0, 0, 0);
      doc.text("VAT Return", margin, 74);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(...grey);
      doc.text("01 Apr 2026 \u2014 30 Apr 2026", margin, 94);

      const rows = [
        { box: 1, label: "VAT due on sales and other outputs",                                                                                                                        value: "\u00a33,211.44", highlight: false },
        { box: 2, label: "VAT due on intra-community acquisitions of goods made in Northern Ireland from EU Member States",                                                            value: "\u00a30.00",     highlight: false },
        { box: 3, label: "Total VAT due (the sum of boxes 1 and 2)",                                                                                                                  value: "\u00a33,211.44", highlight: false },
        { box: 4, label: "VAT reclaimed on purchases and other inputs (including acquisitions from the EU)",                                                                           value: "\u00a31,097.56", highlight: false },
        { box: 5, label: "Net VAT to be paid to Customs or reclaimed by you (difference between boxes 3 and 4)",                                                                      value: "\u00a32,113.88", highlight: true  },
        { box: 6, label: "Total value of sales and all other outputs excluding any VAT",                                                                                               value: "\u00a316,057",   highlight: false },
        { box: 7, label: "Total value of purchases and all other inputs excluding any VAT",                                                                                            value: "\u00a35,488",    highlight: false },
        { box: 8, label: "Total value of intra-community dispatches of goods and related costs, excluding any VAT, from Northern Ireland to EU Member States",                         value: "\u00a30",        highlight: false },
        { box: 9, label: "Total value of intra-community acquisitions of goods and related costs, excluding any VAT, made in Northern Ireland from EU Member States",                  value: "\u00a30",        highlight: false },
      ];

      let y = 116;
      const padV = 14;
      const fontSize = 11;
      const lineH = 15;

      rows.forEach(({ box, label, value, highlight }, i) => {
        doc.setFontSize(fontSize);
        const lines = doc.splitTextToSize(label, labelColW - 20);
        const rowH = Math.max(44, lines.length * lineH + padV * 2);

        // Row background (highlighted)
        if (highlight) {
          doc.setFillColor(...lightGreen);
          doc.rect(margin, y, tableW, rowH, "F");
        } else {
          doc.setFillColor(255, 255, 255);
          doc.rect(margin, y, tableW, rowH, "F");
        }

        // Label (left column)
        doc.setFont("helvetica", "normal");
        doc.setFontSize(fontSize);
        doc.setTextColor(...(highlight ? darkGreen : grey));
        doc.text(lines, margin + 16, y + padV + lineH - 3);

        // Vertical divider before box col
        doc.setDrawColor(...borderC);
        doc.line(margin + labelColW, y, margin + labelColW, y + rowH);

        // Green box number cell
        doc.setFillColor(...green);
        doc.rect(margin + labelColW, y, boxColW, rowH, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(255, 255, 255);
        doc.text(String(box), margin + labelColW + boxColW / 2, y + rowH / 2 + 4, { align: "center" });

        // Vertical divider after box col
        doc.setDrawColor(...borderC);
        doc.line(margin + labelColW + boxColW, y, margin + labelColW + boxColW, y + rowH);

        // Value (right column)
        doc.setFont("helvetica", "normal");
        doc.setFontSize(fontSize);
        doc.setTextColor(...(highlight ? darkGreen : [8, 8, 8]));
        doc.text(value, margin + tableW - 16, y + rowH / 2 + 4, { align: "right" });

        // Row bottom border
        if (i < rows.length - 1) {
          doc.setDrawColor(...borderC);
          doc.line(margin, y + rowH, margin + tableW, y + rowH);
        }

        y += rowH;
      });

      // Outer table border
      doc.setDrawColor(...borderC);
      doc.rect(margin, 116, tableW, y - 116);

      // Footer
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(180, 180, 180);
      doc.text(`Generated by Mimo  \u2022  ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`, margin, y + 22);

      doc.save("vat-return-april-2026.pdf");
      setDownloadState("done");
      setTimeout(() => setDownloadState("idle"), 4000);
    };

    // Always wait at least 1.2s so the spinner is visible
    const run = () => setTimeout(generatePdf, 1200);

    if (window.jspdf) {
      run();
    } else {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      script.onload = run;
      script.onerror = () => setDownloadState("idle");
      document.head.appendChild(script);
    }
  };

  return (
    <div style={{ background: T.colorSurfacePrimary, border: `1px solid ${T.colorButtonSecondary}`, borderRadius: 8, flexShrink: 0, overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
      {/* Header with chevron */}
      <div onClick={() => setCollapsed(c => !c)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", cursor: "pointer" }}>
        <span style={{ fontSize: 16, fontWeight: 500, color: T.colorTextPrimary }}>VAT Return April 2026</span>
        <div style={{ flexShrink: 0, transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)", transform: collapsed ? "rotate(0deg)" : "rotate(180deg)" }}>
          <_MM_Chevron color={T.colorTextBlack} size={16} />
        </div>
      </div>
      {/* Collapsible content */}
      <div style={{ overflow: "hidden", maxHeight: collapsed ? 0 : 600, opacity: collapsed ? 0 : 1, transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease" }}>
        <div style={{ borderTop: `1px solid ${T.colorSurfaceActive}` }}>
          {/* HMRC deadline card */}
          <div style={{ margin: "14px 20px 0", border: `1px solid ${T.colorButtonSecondary}`, borderRadius: 8, padding: 16, background: T.colorSurfacePrimary }}>
            <p style={{ fontSize: 14, fontWeight: 400, color: T.colorTextMuted, margin: "0 0 2px", lineHeight: "22px" }}>Submit HMRC deadline</p>
            <p style={{ fontSize: 20, fontWeight: 500, color: T.colorTextBody, margin: 0, lineHeight: "28px", letterSpacing: "0.2px" }}>7 June 2026</p>
          </div>
          <div style={{ margin: "14px 20px", border: `1px solid ${T.colorButtonSecondary}`, borderRadius: 6, overflow: "hidden" }}>
            {VAT_ITEMS.map(({ box, label, value, highlight }, i, arr) => {
              const dynamicValue = box === 4 ? fmt(box4Val) : box === 5 ? fmt(box5Val) : value;
              const shouldFlash = flashActive && (box === 4 || box === 5);
              return (
              <div key={`static-${box}`} style={{ position: "relative", display: "flex", alignItems: "center", borderBottom: i < arr.length - 1 ? `1px solid ${T.colorButtonSecondary}` : "none", background: highlight ? T.colorBorderLight : T.colorSurfacePrimary }}>
                {shouldFlash && (
                  <div key={`overlay-${flashKey}-${box}`} style={{ position: "absolute", inset: 0, background: T.colorBrandLighter, animation: "vatOverlayFlash 1.6s ease forwards", pointerEvents: "none", zIndex: 0 }} />
                )}
                <div style={{ position: "relative", zIndex: 1, width: 28, display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "stretch", background: T.colorButtonDisabled, flexShrink: 0, borderRight: `1px solid ${T.colorButtonSecondary}` }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.colorTextSecondary }}>{box}</span>
                </div>
                <span style={{ position: "relative", zIndex: 1, flex: 1, fontSize: 14, color: T.colorTextThird, padding: "9px 10px", lineHeight: "24px" }}>{label}</span>
                <span style={{ position: "relative", zIndex: 1, fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, padding: "9px 10px", whiteSpace: "nowrap" }}>{dynamicValue}</span>
              </div>
              );
            })}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: 8, padding: "0 20px 18px" }}>
          <button
            onClick={() => onReviewReport?.()}
            style={{ flex: 1, height: 40, border: showingReport ? "none" : `1px solid ${T.colorBorderDark}`, borderRadius: 8, background: showingReport ? T.colorButtonSecondaryHover : T.colorSurfacePrimary, cursor: "pointer", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={e => { if (!showingReport) { e.currentTarget.style.background = T.colorBorderLight; e.currentTarget.style.borderColor = T.colorBorderHover; } }}
            onMouseLeave={e => { if (!showingReport) { e.currentTarget.style.background = T.colorSurfacePrimary; e.currentTarget.style.borderColor = T.colorBorderDark; } }}>
            {showingReport ? "Close report" : "View full report"}
          </button>
          <button
            onClick={handleDownload}
            style={{
              flex: 1, height: 40, borderRadius: 8, fontFamily: "'Inter', sans-serif",
              border: downloadState === "idle" ? `1px solid ${T.colorBorderDark}` : "none",
              background: downloadState === "idle" ? T.colorSurfacePrimary : T.colorBorderLight,
              cursor: downloadState !== "idle" ? "default" : "pointer",
              fontSize: 14, fontWeight: 500, color: T.colorTextPrimary,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "background 0.2s, border 0.2s",
            }}
            onMouseEnter={e => { if (downloadState === "idle") { e.currentTarget.style.background = T.colorBorderLight; e.currentTarget.style.borderColor = T.colorBorderHover; } }}
            onMouseLeave={e => { if (downloadState === "idle") { e.currentTarget.style.background = T.colorSurfacePrimary; e.currentTarget.style.borderColor = T.colorBorderDark; } }}>
            {downloadState === "downloading" ? (
              <svg width="22" height="22" viewBox="0 0 36 36" fill="none" style={{ animation: "spin 0.75s linear infinite", flexShrink: 0 }}>
                <path d="M18 3A15 15 0 1 1 3 18" stroke="#05A105" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            ) : downloadState === "done" ? (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M2 8l4 4 8-8" stroke="#05A105" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Downloaded
              </>
            ) : "Download"}
          </button>
        </div>
      </div>
    </div>
  );
}

function VATReviewFlow({ onClose, selectedPeriod = "April 2026", resolvedCards, setResolvedCards, ignoredCards, setIgnoredCards, showResults = false }) {
  const [stepStatuses, setStepStatuses] = useState(showResults ? VAT_STEPS.map(() => "done") : []);
  const [stepSubtexts, setStepSubtexts] = useState(showResults ? VAT_STEPS.map(() => true) : []);
  const [visibleSteps, setVisibleSteps] = useState(showResults ? VAT_STEPS.length : 0);
  const [stepsPopulated, setStepsPopulated] = useState(showResults);
  const [stepsCollapsed, setStepsCollapsed] = useState(showResults);
  const [resultsVisible, setResultsVisible]   = useState(showResults);
  const [canvasReady, setCanvasReady]         = useState(showResults);
  const [boxesOpen, setBoxesOpen]             = useState(false);
  const [showVATReport, setShowVATReport]     = useState(false);
  const [periodDropOpen, setPeriodDropOpen]   = useState(false);
  const [activePeriod, setActivePeriod]       = useState(selectedPeriod);
  const [auditTrailOpen, setAuditTrailOpen]   = useState(false);
  const periodDropRef = useRef(null);
  const ALL_PERIODS = ["January 2026","February 2026","March 2026","April 2026","May 2026","June 2026","July 2026","August 2026","September 2026","October 2026","November 2026","December 2026"];
  const [vatReportLoading, setVatReportLoading] = useState(false);
  const [chatWidth, setChatWidth]             = useState(400);
  const [isDragging, setIsDragging]           = useState(false);
  const [isAtBottom, setIsAtBottom]           = useState(true);
  const [inputValue, setInputValue]           = useState("");
  const chatScrollRef = useRef(null);
  const chatEndRef    = useRef(null);
  const stepRowRefs   = useRef([]);

  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [rerunKey, setRerunKey] = useState(0);
  const stepsComplete = stepStatuses.length > 0 && stepStatuses.every(s => s === "done");
  const totalSuggestions = VAT_CARDS.length;

  // Typewriter messages — defined before effects so introDone is in scope
  const introSegments = rerunKey === 0 ? [
    { text: "Great, let's do a ", bold: false },
    { text: "VAT and miscoding review.", bold: true },
    { text: " Let me run through some things, then we can look at the results together.", bold: false },
  ] : [
    { text: "Sure, let's re-run the ", bold: false },
    { text: "VAT and miscoding review.", bold: true },
    { text: " Let me run through some things, then we can look at the results together.", bold: false },
  ];
  const introFull = introSegments.map(s => s.text).join("");
  const { done: introDone } = useTypewriter(introFull, 18, showResults);

  // Phase 1: reveal steps one by one once intro finishes (or on re-run)
  useEffect(() => {
    if (!introDone || (showResults && rerunKey === 0)) return;
    const REVEAL_INTERVAL = 600;
    const timers = [];
    VAT_STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setVisibleSteps(i + 1);
      }, i * REVEAL_INTERVAL));
    });
    const totalRevealTime = (VAT_STEPS.length - 1) * REVEAL_INTERVAL + 450;
    timers.push(setTimeout(() => setStepsPopulated(true), totalRevealTime));
    return () => timers.forEach(clearTimeout);
  }, [introDone, rerunKey]);

  // Phase 2: run spinner through steps once all are populated
  useEffect(() => {
    if (!stepsPopulated || (showResults && rerunKey === 0)) return;
    setStepStatuses(VAT_STEPS.map((_, i) => i === 0 ? "active" : "pending"));
    setStepSubtexts(VAT_STEPS.map(() => false));
    let cumulative = 0;
    const timers = [];
    VAT_STEPS.forEach((step, i) => {
      cumulative += step.duration;
      if (step.subtext) {
        timers.push(setTimeout(() => {
          setStepSubtexts(prev => { const next = [...prev]; next[i] = true; return next; });
        }, cumulative - 400));
      }
      timers.push(setTimeout(() => {
        setStepStatuses(prev => {
          const next = [...prev];
          next[i] = "done";
          if (i + 1 < VAT_STEPS.length) next[i + 1] = "active";
          return next;
        });
      }, cumulative));
    });
    return () => timers.forEach(clearTimeout);
  }, [stepsPopulated]);

  // Collapse steps when chat slides into sidebar
  useEffect(() => {
    if (!resultsVisible) return;
    const t = setTimeout(() => setStepsCollapsed(true), 360);
    return () => clearTimeout(t);
  }, [resultsVisible]);

  // Show canvas once steps finish
  useEffect(() => {
    if (stepsComplete) setResultsVisible(true);
  }, [stepsComplete]);

  // Canvas content ready after slide-in animation — suggestion box slides in shortly after
  useEffect(() => {
    if (!resultsVisible) return;
    if (showResults && rerunKey === 0) { setCanvasReady(true); setBoxesOpen(true); return; }
    const t1 = setTimeout(() => setCanvasReady(true), 3200);
    const t2 = setTimeout(() => setBoxesOpen(true), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [resultsVisible]);

  // Spin keyframe
  useEffect(() => {
    if (document.getElementById("_spin_kf")) return;
    const s = document.createElement("style");
    s.id = "_spin_kf";
    s.textContent = "@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @keyframes stepPop { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } } @keyframes vatOverlayFlash { 0%{opacity:0} 25%{opacity:1} 75%{opacity:1} 100%{opacity:0} }";
    document.head.appendChild(s);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [stepStatuses, stepsCollapsed, resultsVisible, visibleSteps]);

  // Track whether chat is scrolled to bottom
  useEffect(() => {
    const el = chatScrollRef.current;
    if (!el) return;
    const onScroll = () => setIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 40);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Close period dropdown on outside click
  useEffect(() => {
    if (!periodDropOpen) return;
    const handler = (e) => { if (periodDropRef.current && !periodDropRef.current.contains(e.target)) setPeriodDropOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [periodDropOpen]);

  // Drag handle
  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const startX = e.clientX;
    const startWidth = chatWidth;
    const onMouseMove = (e) => setChatWidth(Math.max(280, Math.min(700, startWidth + (e.clientX - startX))));
    const onMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleRerun = () => {
    setResultsVisible(false);
    setStepStatuses([]);
    setStepSubtexts([]);
    setVisibleSteps(0);
    setStepsPopulated(false);
    setStepsCollapsed(false);
    setInputValue("");
    setBoxesOpen(false);
    setShowVATReport(false);
    setTimeout(() => setCanvasReady(false), 720);
    // Trigger phase 1 to restart after canvas slides out
    setTimeout(() => setRerunKey(k => k + 1), 400);
  };

  // Dynamic VAT values based on resolved suggestions
  const VAT_CARD_ADJ = { 0: 210.00, 1: 480.00, 2: 90.00, 3: -340.00, 4: 125.00 };
  const vatBox1 = 3211.44;
  const vatBox4Base = 1097.56;
  let vatBox4Adj = 0;
  resolvedCards.forEach(idx => { vatBox4Adj += VAT_CARD_ADJ[idx] || 0; });
  const vatBox4 = vatBox4Base + vatBox4Adj;
  const vatBox5 = vatBox1 - vatBox4;
  const vatFmt = (n) => `£${Math.abs(n).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const catOrder = ["uncertain", "wrong-code", "reverse-charge", "non-reclaimable", "pva"];
  const groupedCards = catOrder.reduce((acc, key) => {
    const items = VAT_CARDS.filter(c => c.cat === key);
    if (items.length) acc.push({ key, items });
    return acc;
  }, []);

  const resolvedCount = resolvedCards.size + ignoredCards.size;
  const pct = totalSuggestions > 0 ? Math.min(100, Math.round((resolvedCount / totalSuggestions) * 100)) : 0;
  const allDone = resolvedCount >= totalSuggestions;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'Inter', sans-serif", background: T.colorSurfaceContrast }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        @keyframes resultsFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes textShimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes stepPop { 0%{transform:scale(0.8);opacity:0} 100%{transform:scale(1);opacity:1} }
        @keyframes stepReveal { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* Top bar — matches bank reconciliation style */}
      <div style={{ height: 96, background: T.colorSurfacePrimary, borderBottom: `1px solid ${T.colorButtonSecondary}`, display: "flex", alignItems: "center", padding: "0 24px", flexShrink: 0, gap: 16, zIndex: 10, position: "relative" }}>
        <span style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, flexShrink: 0, letterSpacing: "-1px" }}>VAT and miscoding review</span>

        {/* Period dropdown */}
        <div ref={periodDropRef} style={{ position: "relative" }}>
          <button
            onClick={() => setPeriodDropOpen(o => !o)}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 12px", height: 48, border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" }}
          >
            <span>{activePeriod}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition: "transform 0.2s ease", transform: periodDropOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>
              <path d="M4 6L8 10L12 6" stroke="#080908" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {periodDropOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 100, minWidth: 260, overflow: "hidden", padding: "6px" }}>
              {ALL_PERIODS.map((p, idx) => {
                const isSelected = p === activePeriod;
                const isCompleted = idx < 3;
                const isInReview = p === "April 2026";
                const isNotStarted = idx > 3;
                return (
                  <button key={p} onClick={() => { setActivePeriod(p); setPeriodDropOpen(false); }}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, textAlign: "left", padding: "10px 12px", fontSize: 14, color: T.colorTextPrimary, fontWeight: isSelected ? 500 : 400, background: isSelected ? T.colorBorderLight : "transparent", border: "none", cursor: "pointer", borderRadius: 8, boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = T.colorSurfaceSecondary; }}
                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
                  >
                    <span>{p}</span>
                    {isCompleted && (
                      <span style={{ fontSize: 12, fontWeight: 500, color: T.colorBrandPrimary, background: T.colorBrandLighter, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>
                        Completed
                      </span>
                    )}
                    {isInReview && (
                      <span style={{ fontSize: 12, fontWeight: 500, color: T.colorWarning, background: T.colorWarningBg, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>
                        In review
                      </span>
                    )}
                    {isNotStarted && (
                      <span style={{ fontSize: 12, fontWeight: 500, color: T.colorTextSecondary, background: T.colorButtonDisabled, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>
                        Not started
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Audit trail button */}
        {canvasReady && <button
          onClick={() => setAuditTrailOpen(true)}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 14px", height: 48, border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" }}
          onMouseEnter={e => { e.currentTarget.style.background = T.colorBorderLight; e.currentTarget.style.borderColor = T.colorBorderHover; }}
          onMouseLeave={e => { e.currentTarget.style.background = T.colorSurfacePrimary; e.currentTarget.style.borderColor = T.colorBorderDark; }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 12L9 12M21 6L9 6M21 18L9 18M5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5C4.55228 5 5 5.44772 5 6ZM5 18C5 18.5523 4.55228 19 4 19C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17C4.55228 17 5 17.4477 5 18Z" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Audit trail
        </button>}

        <div style={{ flex: 1 }} />

        {/* Suggestions toggle — same expanding button as bank rec */}
        {resultsVisible && canvasReady && (
          <Tooltip text={boxesOpen ? "Collapse sidebar" : "Expand sidebar"} placement="bottom">
          <button
            onClick={() => setBoxesOpen(o => !o)}
            style={{ display: "flex", alignItems: "center", gap: 0, marginRight: 8, cursor: "pointer", fontFamily: "inherit", border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, background: T.colorSurfacePrimary, height: 48, minWidth: 48, padding: boxesOpen ? 0 : "0 12px 0 0", overflow: "hidden", justifyContent: "center", flexShrink: 0, transition: "padding 0.35s cubic-bezier(0.16,1,0.3,1), background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
            onMouseLeave={e => e.currentTarget.style.background = T.colorSurfacePrimary}
          >
            <div style={{ maxWidth: boxesOpen ? 0 : 260, opacity: boxesOpen ? 0 : 1, overflow: "hidden", transition: "max-width 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s, padding 0.35s cubic-bezier(0.16,1,0.3,1)", display: "flex", flexDirection: "column", gap: 4, paddingLeft: boxesOpen ? 0 : 12, paddingRight: boxesOpen ? 0 : 10 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextThird, whiteSpace: "nowrap" }}>VAT return & suggestions</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: T.colorTextPrimary, whiteSpace: "nowrap" }}>{resolvedCount}/{totalSuggestions}</span>
              </div>
              <div style={{ height: 2, background: T.colorBorderDark, borderRadius: 1, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: T.colorBrandPrimary, borderRadius: 1, transition: "width 0.4s ease" }} />
              </div>
            </div>
            {boxesOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M21 21V3M3 12H17M17 12L10 5M17 12L10 19" stroke="#1F2024" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M15 21L15 3M16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21Z" stroke="#1F2024" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          </Tooltip>
        )}

        {/* Close X button — same circle style as bank rec */}
        <button onClick={onClose}
          style={{ border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: "50%", flexShrink: 0, padding: 0 }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <rect width="30" height="30" rx="15" fill="#F5F5F5"/>
            <path d="M20 10L10 20M10 10L20 20" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Content area — identical structure to ReconciliationFlow */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative", padding: 16 }}>

        {/* Left chat panel — full width until canvas appears, then transitions to sidebar */}
        <div style={{ display: "flex", flexDirection: "column", width: resultsVisible ? chatWidth : "100%", flexShrink: 0, transition: isDragging ? "none" : "width 0.72s cubic-bezier(0.16, 1, 0.3, 1)", overflow: "hidden", willChange: "width", position: "relative", zIndex: 1 }}>

          {/* Scroll-to-bottom button */}
          {resultsVisible && (
            <button
              onClick={() => chatScrollRef.current?.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: "smooth" })}
              style={{ position: "absolute", bottom: 218, left: "50%", transform: "translateX(-50%)", zIndex: 10, width: 32, height: 32, borderRadius: "50%", background: T.colorSurfacePrimary, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)", opacity: isAtBottom ? 0 : 1, pointerEvents: isAtBottom ? "none" : "auto", transition: "opacity 0.35s ease" }}
              onMouseEnter={e => e.currentTarget.style.background = T.colorBorderLight}
              onMouseLeave={e => e.currentTarget.style.background = T.colorSurfacePrimary}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {/* Chat scroll area */}
          <div style={{ flex: 1, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
            <div ref={chatScrollRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", scrollBehavior: "smooth" }}>
              {resultsVisible && <div style={{ position: "sticky", top: 0, height: 40, marginBottom: -40, background: "linear-gradient(to bottom, rgba(251,251,251,1) 0%, rgba(251,251,251,0) 100%)", zIndex: 2, pointerEvents: "none", flexShrink: 0 }} />}
              <div style={{ maxWidth: 680, width: "100%", margin: "0 auto", padding: resultsVisible ? "24px 24px 72px" : "24px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>

                {/* Workflow card */}
                <WorkflowCard label={`VAT and miscoding review for ${selectedPeriod}`} />
                <p style={{ fontSize: 14, color: T.colorTextSecondary, margin: "0 0 8px 0" }}>Running workflow</p>

                {/* Intro AI message */}
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", width: resultsVisible ? "90%" : "70%" }}>
                  <p style={{ margin: 0 }}><StreamingMessage segments={introSegments} speed={18} instant={showResults} /></p>
                </div>

                {/* Steps block */}
                {visibleSteps > 0 && (
                  <div style={{ marginTop: 24 }}>
                    <div onClick={() => setStepsCollapsed(c => !c)} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: stepsCollapsed ? 0 : 20, cursor: "pointer" }}>
                      <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 15, fontWeight: 600, color: T.colorTextPrimary }}>VAT and miscoding review</span>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: "transform 0.2s ease", transform: stepsCollapsed ? "rotate(180deg)" : "rotate(0deg)" }}>
                            <path d="M3 8.5L7 4.5L11 8.5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span style={{ fontSize: 13, color: T.colorTextSecondary }}>{stepsPopulated && stepsComplete ? "Completed" : "In progress"}</span>
                      </div>
                    </div>

                    <div style={{ overflow: "hidden", maxHeight: stepsCollapsed ? 0 : 800, opacity: stepsCollapsed ? 0 : 1, transition: "max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease" }}>
                      {VAT_STEPS.map((step, i) => {
                        if (i >= visibleSteps) return null;
                        const status = stepsPopulated ? (stepStatuses[i] || "pending") : "pending";
                        const isLast = i === VAT_STEPS.length - 1;
                        return (
                          <div key={i} ref={el => stepRowRefs.current[i] = el} style={{ display: "flex", gap: 16, animation: "stepReveal 0.4s cubic-bezier(0.16,1,0.3,1) both" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 2, overflow: "visible" }}>
                              <div style={{ width: 20, height: 20, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "visible" }}>
                                {status === "done" && (
                                  <svg key={`done-${i}`} width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: "stepPop 0.35s cubic-bezier(0.34,1.4,0.64,1) both", overflow: "visible" }}>
                                    <circle cx="10" cy="10" r="10" fill="#05A105"/>
                                    <path d="M5.5 10.5L8.5 13.5L14.5 7" stroke="#FFFFFF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                )}
                                {status === "active" && (
                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: "spin 0.75s linear infinite" }}>
                                    <path d="M10 2A8 8 0 1 1 2 10" stroke="#05A105" strokeWidth="1.5" strokeLinecap="round"/>
                                  </svg>
                                )}
                                {status === "pending" && (
                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <circle cx="10" cy="10" r="9.25" stroke="#E9E9EB" strokeWidth="1.5"/>
                                  </svg>
                                )}
                              </div>
                              {!isLast && i + 1 < visibleSteps && <div style={{ width: 1, flexGrow: 1, minHeight: 20, background: T.colorBorderDark, margin: "4px 0" }} />}
                            </div>
                            <div style={{ paddingBottom: isLast ? 0 : 20 }}>
                              <div style={{ fontSize: 14, lineHeight: "24px", fontWeight: status === "pending" ? 400 : 500, color: status === "pending" ? T.colorTextSecondary : T.colorTextBlack, transition: "color 0.3s ease, font-weight 0.3s ease" }}>{step.title}</div>
                              {(stepSubtexts[i] || status === "done") && step.subtext && (
                                <div style={{ fontSize: 13, color: T.colorTextSecondary, marginTop: 2, lineHeight: "18px", animation: "fadeIn 0.3s ease" }}>{step.subtext}</div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>
            </div>
          </div>

          {/* Typing indicator — shown while intro is typing and while steps are running */}
          {!stepsComplete && (
            <div style={{ padding: "0 24px 20px", flexShrink: 0 }}>
              <div style={{ maxWidth: 680, margin: "0 auto" }}>
                <div style={{ borderRadius: 8, padding: "14px 14px 12px", background: T.colorSurfacePrimary, boxShadow: `0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px ${T.colorBorderDark}` }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ fontSize: 14, lineHeight: "22px", flex: 1 }}>
                      <span style={{ background: `linear-gradient(90deg, #9D9D9E 0%, #9D9D9E 30%, #2A2A2A 50%, #9D9D9E 70%, ${T.colorTextDisabled} 100%)`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "textShimmer 2s linear infinite", display: "inline-block" }}>
                        Analysing transactions...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chat input — shown once results are visible */}
          {resultsVisible && (
            <div style={{ padding: "60px 12px 16px", flexShrink: 0, background: "linear-gradient(to bottom, rgba(251,251,251,0) 0%, rgba(251,251,251,1) 60px)", marginTop: -60 }}>
              <div style={{ maxWidth: 680, margin: "0 auto" }}>
                {/* Re-run button */}
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  <button
                    onClick={handleRerun}
                    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, height: 40, padding: "0 16px", border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}
                    onMouseEnter={e => { e.currentTarget.style.background = T.colorSurfaceSecondary; e.currentTarget.style.borderColor = T.colorBorderHover; }}
                    onMouseLeave={e => { e.currentTarget.style.background = T.colorSurfacePrimary; e.currentTarget.style.borderColor = T.colorBorderDark; }}
                  >
                    <PlayCircleIcon color={T.colorTextPrimary} size={18} />
                    Re-run
                  </button>
                </div>
                <div style={{ borderRadius: 8, padding: "14px 14px 12px", background: T.colorSurfacePrimary, boxShadow: `0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px ${T.colorBorderDark}` }}>
                  <textarea
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Ask for changes or information..."
                    rows={3}
                    style={{ width: "100%", border: "none", outline: "none", resize: "none", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", background: "transparent", fontFamily: "'Inter', sans-serif", display: "block" }}
                  />
                  <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                    <button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: T.colorTextSecondary, padding: 0 }}
                      onMouseEnter={e => e.currentTarget.style.background = T.colorBorderLight}
                      onMouseLeave={e => e.currentTarget.style.background = "none"}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M15.5 8.5L8.5 15.5C7.12 16.88 4.88 16.88 3.5 15.5C2.12 14.12 2.12 11.88 3.5 10.5L10.5 3.5C11.33 2.67 12.67 2.67 13.5 3.5C14.33 4.33 14.33 5.67 13.5 6.5L6.5 13.5C6.08 13.92 5.42 13.92 5 13.5C4.58 13.08 4.58 12.42 5 12L11.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div style={{ flex: 1 }} />
                    <button style={{ width: 36, height: 36, marginLeft: 6, border: `1px solid ${T.colorBorderDark}`, borderRadius: 10, background: inputValue.trim() ? T.colorBrandPrimary : T.colorSurfaceSecondary, cursor: inputValue.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s", padding: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M9.99984 15.8346V4.16797M9.99984 4.16797L4.1665 10.0013M9.99984 4.16797L15.8332 10.0013" stroke={inputValue.trim() ? "#FFFFFF" : "#8C8C8B"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drag handle */}
        {resultsVisible && (
          <div onMouseDown={handleDragStart} style={{ position: "absolute", top: 0, bottom: 0, left: chatWidth + 16, width: 16, cursor: "col-resize", zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 4, height: 40, borderRadius: 2, background: isDragging ? T.colorBorderHover : "transparent", transition: "background 0.15s" }} />
          </div>
        )}

        {/* Canvas — slides in from right, absolutely positioned */}
        <div style={{ position: "absolute", top: 16, bottom: 16, left: chatWidth + 32, right: boxesOpen ? 432 : 16, background: T.colorSurfacePrimary, borderRadius: 8, border: `1px solid ${T.colorButtonSecondary}`, overflow: "hidden", zIndex: 2, transform: resultsVisible ? "none" : "translateX(calc(100% + 32px))", transition: isDragging ? "none" : "transform 0.72s cubic-bezier(0.16, 1, 0.3, 1), right 0.35s cubic-bezier(0.16, 1, 0.3, 1)", willChange: resultsVisible ? "auto" : "transform" }}>
          {canvasReady ? (
            <div style={{ animation: "resultsFadeIn 0.4s ease 0.1s both", height: "100%", overflowY: "auto" }}>
              {showVATReport ? (
                /* ── Full VAT return table ── */
                vatReportLoading ? (
                  <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ animation: "spin 0.75s linear infinite", flexShrink: 0 }}>
                      <path d="M18 3A15 15 0 1 1 3 18" stroke="#05A105" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                    <p style={{ fontSize: 14, color: T.colorTextSecondary, margin: 0 }}>Preparing VAT return report…</p>
                  </div>
                ) : (
                <div style={{ padding: "48px 48px", maxWidth: 860, margin: "0 auto", animation: "resultsFadeIn 0.4s ease both" }}>
                  {/* Back button */}
                  <button onClick={() => setShowVATReport(false)}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 40, padding: "0 14px", border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, fontFamily: "'Inter', sans-serif", marginBottom: 32 }}
                    onMouseEnter={e => { e.currentTarget.style.background = T.colorBorderLight; e.currentTarget.style.borderColor = T.colorBorderHover; }}
                    onMouseLeave={e => { e.currentTarget.style.background = T.colorSurfacePrimary; e.currentTarget.style.borderColor = T.colorBorderDark; }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#1F2024" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Back to results
                  </button>
                  {/* Header */}
                  <div style={{ marginBottom: 32, marginTop: 8 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: T.colorTextBlack, margin: "0 0 6px" }}>Seabrook Foods Ltd</p>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: T.colorTextBlack, margin: "0 0 8px", letterSpacing: "-0.5px" }}>VAT Return</h1>
                    <p style={{ fontSize: 14, color: T.colorTextSecondary, margin: 0 }}>01 Apr 2026 — 30 Apr 2026</p>
                  </div>
                  {/* 9 boxes */}
                  <div style={{ border: `1px solid ${T.colorButtonSecondary}`, borderRadius: 6, overflow: "hidden" }}>
                    {[
                      { box: 1, label: "VAT due on sales and other outputs",                                                                                                                              value: "£3,211.44", highlight: false },
                      { box: 2, label: "VAT due on intra-community acquisitions of goods made in Northern Ireland from EU Member States",                                                                 value: "£0.00",     highlight: false },
                      { box: 3, label: "Total VAT due (the sum of boxes 1 and 2)",                                                                                                                       value: "£3,211.44", highlight: false },
                      { box: 4, label: "VAT reclaimed on purchases and other inputs (including acquisitions from the EU)",                                                                                value: vatFmt(vatBox4), highlight: false },
                      { box: 5, label: "Net VAT to be paid to Customs or reclaimed by you (difference between boxes 3 and 4)",                                                                           value: vatFmt(vatBox5), highlight: true  },
                      { box: 6, label: "Total value of sales and all other outputs excluding any VAT",                                                                                                    value: "£16,057",   highlight: false },
                      { box: 7, label: "Total value of purchases and all other inputs excluding any VAT",                                                                                                 value: "£5,488",    highlight: false },
                      { box: 8, label: "Total value of intra-community dispatches of goods and related costs, excluding any VAT, from Northern Ireland to EU Member States",                              value: "£0",        highlight: false },
                      { box: 9, label: "Total value of intra-community acquisitions of goods and related costs, excluding any VAT, made in Northern Ireland from EU Member States",                       value: "£0",        highlight: false },
                    ].map(({ box, label, value, highlight }, i, arr) => (
                      <div key={box} style={{ display: "flex", alignItems: "stretch", borderBottom: i < arr.length - 1 ? `1px solid ${T.colorButtonSecondary}` : "none", background: highlight ? "#F0FBF0" : T.colorSurfacePrimary }}>
                        <div style={{ flex: 1, padding: "16px 20px", display: "flex", alignItems: "center" }}>
                          <p style={{ fontSize: 14, color: highlight ? "#084D08" : T.colorTextThird, margin: 0, lineHeight: "20px" }}>{label}</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", borderLeft: `1px solid ${T.colorButtonSecondary}`, flexShrink: 0 }}>
                          <div style={{ width: 40, display: "flex", alignItems: "center", justifyContent: "center", background: T.colorBrandPrimary, alignSelf: "stretch" }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: T.colorTextLight }}>{box}</span>
                          </div>
                          <div style={{ width: 140, padding: "16px 20px", textAlign: "right" }}>
                            <span style={{ fontSize: 14, fontWeight: 500, color: highlight ? "#084D08" : T.colorTextPrimary }}>{value}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ) : (
              <div style={{ padding: "48px 48px 48px", maxWidth: 800, margin: "0 auto" }}>

                {/* Results heading */}
                <h2 style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, margin: "0 0 20px" }}>Results</h2>

                {/* Results table */}
                <div style={{ marginBottom: 12 }}>
                  <DataTable
                    columns={[
                      { key: "description", label: "Suggestion description", width: "1fr" },
                      { key: "issues",      label: "Suggestions found",      width: "160px" },
                      { key: "total",       label: "Total",                  width: "140px" },
                    ]}
                    rows={[
                      { description: "Wrong VAT code",      issues: 1, total: "£480.00" },
                      { description: "Missing VAT number",  issues: 1, total: "£210.00" },
                      { description: "Duplicates",          issues: 1, total: "£90.00"  },
                      { description: "Non-reclaimable VAT", issues: 1, total: "£340.00" },
                      { description: "Late VAT claim",      issues: 1, total: "£125.00" },
                    ]}
                    footerRow={{ description: "Total", issues: 5, total: "£1,245.00" }}
                  />
                </div>

                {/* Analysis & key findings accordion */}
                <div style={{ background: T.colorSurfacePrimary, border: `1px solid ${T.colorButtonSecondary}`, borderRadius: 8, padding: "20px", marginBottom: 28 }}>
                  <div onClick={() => setAnalysisOpen(o => !o)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>Analysis & key findings</span>
                    <div style={{ display: "flex", transform: analysisOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)", flexShrink: 0, marginLeft: 12 }}>
                      <ChevronUpIcon />
                    </div>
                  </div>
                  <div style={{ overflow: "hidden", maxHeight: analysisOpen ? 300 : 0, opacity: analysisOpen ? 1 : 0, transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease" }}>
                    <p style={{ fontSize: 14, color: T.colorTextBody, lineHeight: "20px", margin: "16px 0 0" }}>
                      The VAT and miscoding review identified 6 issues across 5 categories from 184 transactions for {selectedPeriod}. The most significant findings are 2 entries with incorrect VAT codes and 1 non-reclaimable VAT charge on client entertainment. Net VAT due to HMRC is £5,200, calculated as Output VAT £23,400 less Input VAT £18,200. A duplicate entry from Premier Office Supplies requires deletion to avoid double-claiming £90 of input VAT. One late claim from March 2021 falls outside HMRC's 4-year statutory limit and cannot be reclaimed.
                    </p>
                  </div>
                </div>

                <hr style={{ border: "none", borderTop: `1px solid ${T.colorBorderDark}`, margin: "32px 0 40px" }} />

                {/* Suggestion cards grouped by category */}
                <h3 style={{ fontSize: 20, fontWeight: 500, color: T.colorTextPrimary, margin: "0 0 16px" }}>Suggestions</h3>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {groupedCards.map((group, gi) => (
                    <div key={group.key}>
                      {gi > 0 && <div style={{ height: 32 }} />}
                      <h3 style={{ fontSize: 15, fontWeight: 500, color: T.colorTextPrimary, margin: "0 0 16px" }}>{VAT_CAT_LABELS[group.key] || group.key}</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        {group.items.map((card, localIdx) => {
                          const isResolved = resolvedCards.has(card.idx);
                          const isIgnored  = ignoredCards.has(card.idx);
                          return (
                            <div key={card.idx} id={`result-${card.cat}-${localIdx}`} style={{ scrollMarginTop: 64 }}>
                              <RecommendationCard
                                title={card.title}
                                score={card.score ?? null}
                                description={card.description}
                                verticalTable={true}
                                hideMore={true}
                                statusLabel={isResolved ? "Resolved" : isIgnored ? "Ignored" : "Unresolved"}
                                statusStyle={isResolved ? { background: T.colorBrandLighter, border: "none", color: T.colorBrandPrimary } : isIgnored ? { background: T.colorButtonDisabled, border: "none", color: T.colorTextSecondary } : { background: T.colorWarningBg, border: "none", color: T.colorWarning }}
                                collapsed={isResolved || isIgnored}
                                isIgnored={isIgnored}
                                tableRow={card.tableRow}
                                primaryLabel={card.primaryLabel}
                                secondaryLabel={card.secondaryLabel}
                                onPrimaryAction={() => { setResolvedCards(prev => new Set([...prev, card.idx])); }}
                                onIgnore={() => { setIgnoredCards(prev => new Set([...prev, card.idx])); }}
                                onSecondaryAction={() => {}}
                                onMore={() => {}}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          ) : resultsVisible ? <CanvasLoader /> : null}
        </div>

        {/* Suggestions sidebar */}
        {canvasReady && (
          <div style={{ position: "absolute", top: 16, bottom: 16, right: 16, width: 400, zIndex: 3, display: "flex", flexDirection: "column", gap: 12, fontFamily: "'Inter', sans-serif", transform: boxesOpen ? "translateX(0)" : "translateX(calc(100% + 32px))", transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)", pointerEvents: boxesOpen ? "auto" : "none" }}>

            {/* VAT return report card */}
            <VATReturnCard
              showingReport={showVATReport}
              resolvedCards={resolvedCards}
              ignoredCards={ignoredCards}
              onReviewReport={() => {
                if (showVATReport) { setShowVATReport(false); }
                else { setShowVATReport(true); setVatReportLoading(true); setTimeout(() => setVatReportLoading(false), 1800); }
              }}
            />

            <SuggestionsBox
              isCleanReconcile={false}
              allJustResolved={allDone}
              accountStatus={null}
              resolvedCount={resolvedCount}
              totalSuggestions={totalSuggestions}
              matchedTotal={null}
              navCategories={VAT_NAV_CATS}
              resolvedCards={resolvedCards}
              ignoredCards={ignoredCards}
              completedTitle="VAT and miscoding review complete"
              completedDescription="All suggestions have been addressed. Your VAT return is ready to submit."
              completedColor={T.colorBrandPrimary}
            />
          </div>
        )}
      </div>

      {/* Audit trail sidebar */}
      {auditTrailOpen && <AuditTrailSidebar onClose={() => setAuditTrailOpen(false)} />}
    </div>
  );
}

    return <VATReviewFlow
      selectedPeriod={selectedPeriod}
      onClose={function() { dispatch({ type: "SET_VAT_REVIEW_COMPLETED", value: true }); navigate("Home"); }}
      resolvedCards={vatResolvedCards}
      setResolvedCards={function(updater) {
        if (typeof updater === "function") {
          var next = updater(vatResolvedCards);
          next.forEach(function(id) { dispatch({ type: "ADD_VAT_RESOLVED", cardId: id }); });
        }
      }}
      ignoredCards={vatIgnoredCards}
      setIgnoredCards={function(updater) {
        if (typeof updater === "function") {
          var next = updater(vatIgnoredCards);
          next.forEach(function(id) { dispatch({ type: "ADD_VAT_IGNORED", cardId: id }); });
        }
      }}
      showResults={vatReviewCompleted}
    />;
  }
});
