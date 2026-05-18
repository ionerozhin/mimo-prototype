// ── VAT Return page ──────────────────────────────────────────────────────
registerPage("VAT return", {
  icon: "checkVerified",
  section: "hidden",
  render: function VATReturnPage({ ctx }) {
    var T = ctx.ds.T;
    var navigate = ctx.navigate;
    var selectedPeriod = ctx.store.selectedPeriod;

const VATRETURN_STEPS = [
  { title: "Reading chart of accounts",    subtext: null,                                                   duration: 700  },
  { title: "Fetching transactions",        subtext: "Found 147 transactions (01 Apr \u2013 30 Apr 2026)", duration: 1100 },
  { title: "Calculating output VAT",       subtext: "Box 1: \u00a33,211.44",                               duration: 900  },
  { title: "Calculating input VAT",        subtext: "Box 4: \u00a31,097.56",                               duration: 800  },
  { title: "Compiling VAT return",         subtext: null,                                                   duration: 600  },
];

const VAT_ROWS = [
  { box: 1, label: "VAT due on sales and other outputs",                                                                                                                             value: "\u00a33,211.44", highlight: false },
  { box: 2, label: "VAT due on intra-community acquisitions of goods made in Northern Ireland from EU Member States",                                                                value: "\u00a30.00",     highlight: false },
  { box: 3, label: "Total VAT due (the sum of boxes 1 and 2)",                                                                                                                      value: "\u00a33,211.44", highlight: false },
  { box: 4, label: "VAT reclaimed on purchases and other inputs (including acquisitions from the EU)",                                                                               value: "\u00a31,097.56", highlight: false },
  { box: 5, label: "Net VAT to be paid to Customs or reclaimed by you (difference between boxes 3 and 4)",                                                                          value: "\u00a32,113.88", highlight: true  },
  { box: 6, label: "Total value of sales and all other outputs excluding any VAT",                                                                                                   value: "\u00a316,057",   highlight: false },
  { box: 7, label: "Total value of purchases and all other inputs excluding any VAT",                                                                                                value: "\u00a35,488",    highlight: false },
  { box: 8, label: "Total value of intra-community dispatches of goods and related costs, excluding any VAT, from Northern Ireland to EU Member States",                             value: "\u00a30",        highlight: false },
  { box: 9, label: "Total value of intra-community acquisitions of goods and related costs, excluding any VAT, made in Northern Ireland from EU Member States",                      value: "\u00a30",        highlight: false },
];

function VATReturnFlow({ onClose, selectedPeriod = "April 2026" }) {
  const ALL_PERIODS = ["January 2026","February 2026","March 2026","April 2026","May 2026","June 2026","July 2026","August 2026","September 2026","October 2026","November 2026","December 2026"];
  const [selectedPeriods, setSelectedPeriods] = useState([selectedPeriod]);
  const [periodDropOpen, setPeriodDropOpen]   = useState(false);
  const periodDropRef = useRef(null);

  const [stepStatuses, setStepStatuses]     = useState([]);
  const [stepSubtexts, setStepSubtexts]     = useState([]);
  const [visibleSteps, setVisibleSteps]     = useState(0);
  const [stepsCollapsed, setStepsCollapsed] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [canvasReady, setCanvasReady]       = useState(false);
  const [chatWidth, setChatWidth]           = useState(400);
  const [isDragging, setIsDragging]         = useState(false);
  const [isAtBottom, setIsAtBottom]         = useState(true);
  const [chatInput, setChatInput]           = useState("");
  const chatScrollRef = useRef(null);
  const chatEndRef    = useRef(null);

  const stepsComplete = stepStatuses.length > 0 && stepStatuses.every(s => s === "done");

  // Derive date range label from selected periods
  const sortedPeriods = [...selectedPeriods].sort((a, b) => ALL_PERIODS.indexOf(a) - ALL_PERIODS.indexOf(b));
  const periodLabel = sortedPeriods.length === 0 ? "No period" : sortedPeriods.length === 1 ? sortedPeriods[0] : `${sortedPeriods[0]} – ${sortedPeriods[sortedPeriods.length - 1]}`;

  // Auto-start on mount
  useEffect(() => {
    const REVEAL_INTERVAL = 500;
    VATRETURN_STEPS.forEach((_, i) => {
      setTimeout(() => setVisibleSteps(v => Math.max(v, i + 1)), i * REVEAL_INTERVAL);
    });
    const totalRevealTime = (VATRETURN_STEPS.length - 1) * REVEAL_INTERVAL + 400;
    setTimeout(() => {
      setStepStatuses(VATRETURN_STEPS.map((_, i) => i === 0 ? "active" : "pending"));
      setStepSubtexts(VATRETURN_STEPS.map(() => false));
      let cum = 0;
      VATRETURN_STEPS.forEach((step, i) => {
        cum += step.duration;
        setTimeout(() => {
          setStepStatuses(prev => { const next = [...prev]; next[i] = "done"; if (i + 1 < VATRETURN_STEPS.length) next[i + 1] = "active"; return next; });
          setStepSubtexts(prev => { const next = [...prev]; next[i] = true; return next; });
        }, cum);
      });
    }, totalRevealTime);
  }, []);

  // Auto-collapse steps and show canvas when done
  useEffect(() => {
    if (!stepsComplete) return;
    const t1 = setTimeout(() => setStepsCollapsed(true), 600);
    const t2 = setTimeout(() => setResultsVisible(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [stepsComplete]);

  // Delay canvas content until panel has slid in
  useEffect(() => {
    if (!resultsVisible) return;
    const t = setTimeout(() => setCanvasReady(true), 3200);
    return () => clearTimeout(t);
  }, [resultsVisible]);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [stepsComplete, canvasReady]);

  useEffect(() => {
    const el = chatScrollRef.current;
    if (!el) return;
    const onScroll = () => setIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 40);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { if (periodDropOpen) { setPeriodDropOpen(false); } else { onClose(); } } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [periodDropOpen]);

  // Close period dropdown on outside click
  useEffect(() => {
    if (!periodDropOpen) return;
    const handler = (e) => { if (periodDropRef.current && !periodDropRef.current.contains(e.target)) setPeriodDropOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [periodDropOpen]);

  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const startX = e.clientX;
    const startW = chatWidth;
    const onMove = (ev) => setChatWidth(Math.max(280, Math.min(700, startW + (ev.clientX - startX))));
    const onUp   = () => { setIsDragging(false); document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); document.body.style.cursor = ""; document.body.style.userSelect = ""; };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const togglePeriod = (p) => setSelectedPeriods(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  const handleDownload = () => {
    const csv = `VAT Return\nPeriod: ${periodLabel}\n\nBox,Description,Amount\n${VAT_ROWS.map(r => `${r.box},"${r.label}",${r.value}`).join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "vat-return.csv"; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'Inter', sans-serif", background: T.colorSurfaceContrast }}>
      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        @keyframes resultsFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes stepPop { 0%{transform:scale(0.8);opacity:0} 100%{transform:scale(1);opacity:1} }
        @keyframes stepReveal { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* Top bar */}
      <div style={{ height: 96, background: T.colorSurfacePrimary, borderBottom: `1px solid ${T.colorButtonSecondary}`, display: "flex", alignItems: "center", padding: "0 24px", flexShrink: 0, gap: 16, zIndex: 10, position: "relative" }}>
        <span style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, letterSpacing: "-1px" }}>VAT Return</span>

        {/* Multi-period dropdown */}
        <div ref={periodDropRef} style={{ position: "relative" }}>
          <button
            onClick={() => setPeriodDropOpen(o => !o)}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 12px", height: 48, border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, fontFamily: "'Inter', sans-serif" }}>
            <span style={{ color: selectedPeriods.length === 0 ? T.colorTextDisabled : T.colorTextPrimary }}>{periodLabel}</span>
            {selectedPeriods.length > 1 && (
              <span style={{ fontSize: 11, fontWeight: 600, color: T.colorBrandPrimary, background: "#EBF7EB", borderRadius: 10, padding: "2px 6px" }}>{selectedPeriods.length}</span>
            )}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition: "transform 0.2s ease", transform: periodDropOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>
              <path d="M4 6L8 10L12 6" stroke="#080908" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {periodDropOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 100, minWidth: 220, overflow: "hidden", padding: 6 }}>
              {ALL_PERIODS.map(p => {
                const checked = selectedPeriods.includes(p);
                return (
                  <button key={p} onClick={() => togglePeriod(p)}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, textAlign: "left", padding: "9px 12px", fontSize: 14, color: T.colorTextPrimary, fontWeight: checked ? 500 : 400, background: checked ? T.colorBorderLight : "transparent", border: "none", cursor: "pointer", borderRadius: 8, boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={e => { if (!checked) e.currentTarget.style.background = T.colorSurfaceSecondary; }}
                    onMouseLeave={e => { if (!checked) e.currentTarget.style.background = "transparent"; }}>
                    {/* Checkbox */}
                    <div style={{ width: 16, height: 16, borderRadius: 4, border: checked ? "none" : `1.5px solid ${T.colorBorderHover}`, background: checked ? T.colorBrandPrimary : T.colorSurfacePrimary, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {checked && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    {p}
                  </button>
                );
              })}
              <div style={{ borderTop: `1px solid ${T.colorSurfaceActive}`, margin: "4px 0" }} />
              <button onClick={() => { setSelectedPeriods([]); setPeriodDropOpen(false); }}
                style={{ width: "100%", textAlign: "left", padding: "9px 12px", fontSize: 13, color: T.colorTextSecondary, background: "transparent", border: "none", cursor: "pointer", borderRadius: 8, fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceSecondary} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                Clear selection
              </button>
            </div>
          )}
        </div>

        <div style={{ flex: 1 }} />
        {canvasReady && (
          <button onClick={handleDownload}
            style={{ height: 40, padding: "0 16px", border: "none", borderRadius: 8, background: T.colorBrandPrimary, color: T.colorTextLight, fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, animation: "fadeIn 0.3s ease both", fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={e => e.currentTarget.style.background = "#048A04"} onMouseLeave={e => e.currentTarget.style.background = T.colorBrandPrimary}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Download report
          </button>
        )}
        <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: "50%", padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.background = T.colorBorderLight} onMouseLeave={e => e.currentTarget.style.background = "none"}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none"><rect width="30" height="30" rx="15" fill="#F5F5F5"/><path d="M20 10L10 20M10 10L20 20" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Content area */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative", padding: 16 }}>

        {/* Left chat panel */}
        <div style={{
          display: "flex", flexDirection: "column",
          width: resultsVisible ? chatWidth : "100%",
          flexShrink: 0,
          transition: isDragging ? "none" : "width 0.72s cubic-bezier(0.16,1,0.3,1)",
          overflow: "hidden", willChange: "width", position: "relative", zIndex: 1,
        }}>

          {/* Scroll-to-bottom */}
          {resultsVisible && (
            <button onClick={() => chatScrollRef.current?.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: "smooth" })}
              style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 10, width: 32, height: 32, borderRadius: "50%", background: T.colorSurfacePrimary, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)", opacity: isAtBottom ? 0 : 1, pointerEvents: isAtBottom ? "none" : "auto", transition: "opacity 0.35s ease" }}
              onMouseEnter={e => e.currentTarget.style.background = T.colorBorderLight} onMouseLeave={e => e.currentTarget.style.background = T.colorSurfacePrimary}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}

          <div style={{ flex: 1, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
            <div ref={chatScrollRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", scrollBehavior: "smooth" }}>
              {resultsVisible && <div style={{ position: "sticky", top: 0, height: 40, marginBottom: -40, background: "linear-gradient(to bottom, rgba(251,251,251,1) 0%, rgba(251,251,251,0) 100%)", zIndex: 2, pointerEvents: "none", flexShrink: 0 }} />}
              <div style={{ maxWidth: 680, width: "100%", margin: "0 auto", padding: "24px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>

                <WorkflowCard label={`VAT return \u2014 ${periodLabel}`} />
                <p style={{ fontSize: 14, color: T.colorTextSecondary, margin: "0 0 8px 0" }}>Running workflow</p>
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginBottom: 20, width: "70%" }}>
                  <StreamingMessage segments={[
                    { text: "I\u2019m preparing the VAT return for ", bold: false },
                    { text: periodLabel, bold: true },
                    { text: ". I\u2019ll fetch your transactions, calculate output and input VAT, and compile the figures into a report ready for review.", bold: false },
                  ]} speed={18} instant={false} />
                </div>

                {/* Steps block — shows immediately */}
                {stepStatuses.length > 0 && (
                  <div style={{ animation: "fadeIn 0.3s ease both" }}>
                    <button onClick={() => setStepsCollapsed(c => !c)}
                      style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: stepsCollapsed ? 0 : 20, cursor: "pointer", background: "none", border: "none", padding: 0, width: "100%", textAlign: "left" }}>
                      <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/><polyline points="14 2 14 8 20 8" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 15, fontWeight: 600, color: T.colorTextPrimary }}>VAT calculation</span>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: "transform 0.2s ease", transform: stepsCollapsed ? "rotate(180deg)" : "rotate(0deg)" }}>
                            <path d="M3 8.5L7 4.5L11 8.5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span style={{ fontSize: 13, color: T.colorTextSecondary }}>{stepsComplete ? "Completed" : "In progress"}</span>
                      </div>
                    </button>

                    {!stepsCollapsed && VATRETURN_STEPS.map((step, i) => {
                      if (i >= visibleSteps) return null;
                      const status = stepStatuses[i] || "pending";
                      const isLast = i === VATRETURN_STEPS.length - 1;
                      return (
                        <div key={i} style={{ display: "flex", gap: 16, animation: "stepReveal 0.4s cubic-bezier(0.16,1,0.3,1) both" }}>
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
                          <div style={{ paddingBottom: isLast ? 0 : 20, paddingTop: 0 }}>
                            <div style={{ fontSize: 14, lineHeight: "24px", fontWeight: 400, color: status === "pending" ? T.colorBorderInput : T.colorTextPrimary, transition: "color 0.3s ease" }}>{step.title}</div>
                            {(stepSubtexts[i] || status === "done") && step.subtext && (
                              <div style={{ fontSize: 13, color: T.colorTextSecondary, marginTop: 2, lineHeight: "18px", animation: "fadeIn 0.3s ease" }}>{step.subtext}</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Summary line after canvas ready */}
                {canvasReady && (
                  <div style={{ animation: "fadeIn 0.4s ease 0.2s both", marginTop: 20, fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                    <p style={{ margin: 0 }}>
                      <StreamingMessage segments={[
                        { text: "VAT return generated. Net VAT due to HMRC: ", bold: false },
                        { text: "\u00a32,113.88", bold: true },
                        { text: ". Review the figures in the canvas and download when ready.", bold: false },
                      ]} speed={18} instant={false} />
                    </p>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>
            </div>
          </div>

          {/* Chat textarea — appears once canvas is populated */}
          {canvasReady && (
            <div style={{ padding: "60px 12px 12px", flexShrink: 0, background: "linear-gradient(to bottom, rgba(251,251,251,0) 0%, rgba(251,251,251,1) 60px)", marginTop: -60 }}>
              <div style={{ maxWidth: 680, margin: "0 auto" }}>
                <div style={{ borderRadius: 8, padding: "14px 14px 12px", background: T.colorSurfacePrimary, boxShadow: `0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px ${T.colorBorderDark}` }}>
                  <textarea
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder="Ask for changes or information..."
                    rows={3}
                    style={{ width: "100%", border: "none", outline: "none", resize: "none", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", background: "transparent", fontFamily: "'Inter', sans-serif", display: "block" }}
                  />
                  <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                    <button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: T.colorTextSecondary, padding: 0 }}
                      onMouseEnter={e => e.currentTarget.style.background = T.colorBorderLight} onMouseLeave={e => e.currentTarget.style.background = "none"}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15.5 8.5L8.5 15.5C7.12 16.88 4.88 16.88 3.5 15.5C2.12 14.12 2.12 11.88 3.5 10.5L10.5 3.5C11.33 2.67 12.67 2.67 13.5 3.5C14.33 4.33 14.33 5.67 13.5 6.5L6.5 13.5C6.08 13.92 5.42 13.92 5 13.5C4.58 13.08 4.58 12.42 5 12L11.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <div style={{ flex: 1 }} />
                    <button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: T.colorTextSecondary, padding: 0 }}
                      onMouseEnter={e => e.currentTarget.style.background = T.colorBorderLight} onMouseLeave={e => e.currentTarget.style.background = "none"}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="6" y="1" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1.25"/><path d="M3 9C3 12.31 5.69 15 9 15C12.31 15 15 12.31 15 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/><line x1="9" y1="15" x2="9" y2="17" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg>
                    </button>
                    <button style={{ width: 36, height: 36, marginLeft: 6, border: `1px solid ${T.colorBorderDark}`, borderRadius: 10, background: chatInput.trim() ? T.colorBrandPrimary : T.colorSurfaceSecondary, cursor: chatInput.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s", padding: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M9.99984 15.8346V4.16797M9.99984 4.16797L4.1665 10.0013M9.99984 4.16797L15.8332 10.0013" stroke={chatInput.trim() ? "#FFFFFF" : "#8C8C8B"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Canvas — slides in from right, with 16px margins matching ReconciliationFlow */}
        <div style={{
          position: "absolute",
          top: 16, bottom: 16,
          left: chatWidth + 32,
          right: 16,
          background: T.colorSurfacePrimary,
          borderRadius: 8,
          border: `1px solid ${T.colorButtonSecondary}`,
          overflow: "hidden",
          zIndex: 2,
          transform: resultsVisible ? "none" : "translateX(calc(100% + 32px))",
          transition: isDragging ? "none" : "transform 0.72s cubic-bezier(0.16,1,0.3,1)",
          willChange: resultsVisible ? "auto" : "transform",
        }}>
          {canvasReady ? (
            <div style={{ animation: "resultsFadeIn 0.4s ease 0.1s both", height: "100%", overflowY: "auto" }}>
              <div style={{ padding: "48px 48px", maxWidth: 900, margin: "0 auto" }}>
                {/* HMRC-style header */}
                <div style={{ background: T.colorBrandPrimary, borderRadius: 6, padding: "24px 28px", marginBottom: 28 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.65)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>HM Revenue & Customs</div>
                  <h1 style={{ fontSize: 28, fontWeight: 700, color: T.colorTextLight, margin: "0 0 4px", letterSpacing: "-0.5px" }}>VAT Return</h1>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", margin: 0 }}>{periodLabel}</p>
                </div>
                {/* Boxes */}
                <div style={{ border: `1px solid ${T.colorButtonSecondary}`, borderRadius: 6, overflow: "hidden" }}>
                  {VAT_ROWS.map(({ box, label, value, highlight }, i) => (
                    <div key={box} style={{ display: "flex", alignItems: "stretch", borderBottom: i < VAT_ROWS.length - 1 ? `1px solid ${T.colorButtonSecondary}` : "none", background: highlight ? "#F0FBF0" : T.colorSurfacePrimary }}>
                      <div style={{ flex: 1, padding: "16px 20px", display: "flex", alignItems: "center" }}>
                        <p style={{ fontSize: 13.5, color: highlight ? "#084D08" : T.colorTextThird, margin: 0, lineHeight: "20px" }}>{label}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", borderLeft: `1px solid ${T.colorButtonSecondary}`, flexShrink: 0 }}>
                        <div style={{ width: 38, display: "flex", alignItems: "center", justifyContent: "center", background: T.colorBrandPrimary, alignSelf: "stretch", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: T.colorTextLight }}>{box}</span>
                        </div>
                        <div style={{ width: 140, padding: "16px 20px", textAlign: "right" }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: highlight ? "#084D08" : T.colorTextPrimary }}>{value}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : resultsVisible ? <CanvasLoader /> : null}
        </div>

        {/* Drag handle */}
        {resultsVisible && (
          <div onMouseDown={handleDragStart} style={{ position: "absolute", top: 0, bottom: 0, left: chatWidth + 16, width: 16, cursor: "col-resize", zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 4, height: 40, borderRadius: 2, background: isDragging ? T.colorBorderHover : "transparent", transition: "background 0.15s" }} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Accrual Flow ─────────────────────────────────────────────────────────────

    return <VATReturnFlow selectedPeriod={selectedPeriod} onClose={function() { navigate("Home"); }} />;
  }
});
