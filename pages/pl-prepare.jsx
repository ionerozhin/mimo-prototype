// ── P&L Prepare Flow ────────────────────────────────────────────────────────
// Fullscreen overlay triggered from the "Prepare for review" column in the P&L table.
// One shared flow for all accounts — receives accountCode + row data as props.
// Pattern follows adjustment review flows (fixed overlay, top bar, chat + canvas).
// DS globals available: T, PrimaryButton, SecondaryButton, StatusBadge, AdjWorkflowCard,
//   SuggestionsBox, RecommendationCard, Dropdown, Accordion, PlayCircleIcon
// Local forks: PlStepsAccordion, PlUseTypewriter, PlStreamingMessage

(function() {

// ── PlStepsAccordion (forked from DS PlStepsAccordion) ───────────────
function PlStepsAccordion({ steps, stepStatuses, stepSubtexts, title, icon, onCollapsed, defaultCollapsed }) {
  if (!steps) steps = [];
  if (!stepStatuses) stepStatuses = [];
  if (!stepSubtexts) stepSubtexts = [];
  var _t = title || "Processing";
  var allDone = stepStatuses.length > 0 && stepStatuses.every(function(s) { return s === "done"; });
  var _cs = useState(defaultCollapsed != null ? defaultCollapsed : allDone);
  var collapsed = _cs[0], setCollapsed = _cs[1];
  var wasAlreadyDone = useRef(allDone);

  useEffect(function() {
    if (allDone && !wasAlreadyDone.current) {
      var t = setTimeout(function() {
        setCollapsed(true);
        if (onCollapsed) setTimeout(onCollapsed, 350);
      }, 600);
      return function() { clearTimeout(t); };
    }
  }, [allDone]);

  var DefaultIcon = function() {
    return React.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none" },
      React.createElement("path", {
        d: "M6.50065 6.4987L10.6257 10.6237M6.50065 6.4987H3.75065L2.83398 3.7487L3.75065 2.83203L6.50065 3.7487V6.4987ZM18.6547 3.51129L16.2461 5.91994C15.8831 6.28296 15.7016 6.46446 15.6335 6.67377C15.5737 6.85787 15.5737 7.05619 15.6335 7.2403C15.7016 7.4496 15.8831 7.63111 16.2461 7.99412L16.4636 8.21161C16.8266 8.57462 17.0081 8.75613 17.2174 8.82414C17.4015 8.88396 17.5998 8.88396 17.7839 8.82414C17.9932 8.75613 18.1747 8.57462 18.5377 8.21161L20.7908 5.95852C21.0335 6.54901 21.1673 7.19573 21.1673 7.8737C21.1673 10.6581 18.9101 12.9154 16.1257 12.9154C15.79 12.9154 15.4619 12.8826 15.1446 12.82C14.699 12.7321 14.4761 12.6881 14.3411 12.7016C14.1975 12.7159 14.1267 12.7374 13.9995 12.8055C13.8798 12.8696 13.7597 12.9896 13.5196 13.2298L6.95898 19.7904C6.19959 20.5497 4.96838 20.5497 4.20899 19.7904C3.44959 19.031 3.44959 17.7997 4.20899 17.0403L10.7696 10.4798C11.0097 10.2396 11.1298 10.1196 11.1938 9.99989C11.2619 9.87265 11.2834 9.80188 11.2977 9.65827C11.3112 9.5232 11.2673 9.30038 11.1794 8.85475C11.1168 8.53742 11.084 8.20939 11.084 7.8737C11.084 5.08926 13.3412 2.83203 16.1257 2.83203C17.0474 2.83203 17.9113 3.07937 18.6547 3.51129ZM12.0007 14.7486L17.0423 19.7903C17.8017 20.5497 19.0329 20.5497 19.7923 19.7903C20.5517 19.0309 20.5517 17.7996 19.7923 17.0403L15.6447 12.8927C15.3511 12.8649 15.0648 12.812 14.788 12.736C14.4314 12.6381 14.0402 12.7092 13.7787 12.9707L12.0007 14.7486Z",
        stroke: T.colorTextSecondary, strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round",
      })
    );
  };

  return React.createElement("div", { style: { marginTop: 24 } },
    // Header
    React.createElement("div", {
      onClick: function() { setCollapsed(function(c) { return !c; }); },
      style: { display: "flex", alignItems: "flex-start", gap: 12, marginBottom: collapsed ? 0 : 20, cursor: "pointer" },
    },
      React.createElement("div", { style: { width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } },
        icon || React.createElement(DefaultIcon)
      ),
      React.createElement("div", { style: { flex: 1 } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
          React.createElement("span", { style: { fontSize: 15, fontWeight: 600, color: T.colorTextPrimary } }, _t),
          React.createElement("svg", { width: 14, height: 14, viewBox: "0 0 14 14", fill: "none", style: { transition: "transform 0.2s ease", transform: collapsed ? "rotate(180deg)" : "rotate(0deg)" } },
            React.createElement("path", { d: "M3 8.5L7 4.5L11 8.5", stroke: T.colorTextSecondary, strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round" })
          )
        ),
        React.createElement("span", { style: { fontSize: 13, color: T.colorTextSecondary } },
          allDone ? "Completed" : stepStatuses.filter(function(s) { return s === "done"; }).length + " of " + steps.length
        )
      )
    ),
    // Steps
    !collapsed && steps.map(function(step, i) {
      var status = stepStatuses[i] || "pending";
      var isLast = i === steps.length - 1;
      return React.createElement("div", { key: i, style: { display: "flex", gap: 16 } },
        // Timeline column
        React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 2 } },
          React.createElement("div", {
            style: {
              width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
              border: status === "active" ? "none" : "1.5px solid " + (status === "done" ? T.colorBrandPrimary : T.colorBorderDark),
              background: status === "done" ? T.colorBorderLight : status === "active" ? "transparent" : T.colorSurfacePrimary,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.4s ease",
            },
          },
            status === "done" && React.createElement("svg", { width: 8, height: 8, viewBox: "0 0 13 13", fill: "none" },
              React.createElement("path", { d: "M2 6.5L5 9.5L11 3.5", stroke: T.colorBrandPrimary, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
            ),
            status === "active" && React.createElement("div", {
              style: { width: 16, height: 16, borderRadius: "50%", border: "1.5px solid #ACD394", borderTopColor: T.colorBrandPrimary, animation: "spin 0.7s linear infinite" },
            })
          ),
          !isLast && React.createElement("div", { style: { width: 1, flexGrow: 1, minHeight: 20, background: T.colorBorderDark, margin: "4px 0" } })
        ),
        // Step content
        React.createElement("div", { style: { paddingBottom: isLast ? 0 : 20, paddingTop: 0 } },
          React.createElement("div", {
            style: { fontSize: 14, lineHeight: "24px", fontWeight: status === "done" ? 500 : 400, color: status === "pending" ? "#BCBCBC" : T.colorTextPrimary, transition: "all 0.3s ease" },
          }, step.title || step.label),
          (stepSubtexts[i] || status === "done") && step.subtext && React.createElement("div", {
            style: { fontSize: 13, color: T.colorTextSecondary, marginTop: 2, lineHeight: "18px", animation: "fadeIn 0.3s ease" },
          }, step.subtext)
        )
      );
    })
  );
}


// ── PlUseTypewriter (forked from shared.jsx useTypewriter) ──────────────────
function PlUseTypewriter(text, speed, instant) {
  if (speed === undefined) speed = 80;
  if (instant === undefined) instant = false;
  var words = text ? text.split(" ") : [];
  var _utDisp = useState(instant && text ? words.length : 0);
  var displayed = _utDisp[0]; var setDisplayed = _utDisp[1];
  useEffect(function() {
    if (instant) { setDisplayed(words.length); return; }
    setDisplayed(0);
    if (!words.length) return;
    var i = 0;
    var tick = function() { i++; setDisplayed(i); if (i < words.length) setTimeout(tick, speed + Math.random() * 40); };
    var t = setTimeout(tick, 200);
    return function() { clearTimeout(t); };
  }, [text]);
  var visibleText = words.slice(0, displayed).join(" ");
  return { chars: visibleText, done: !!text && displayed >= words.length };
}

// ── PlStreamingMessage (forked from shared.jsx StreamingMessage) ────────────
// Takes { segments, typedChars } — renders segments up to the typedChars string.
function PlStreamingMessage(_smRef) {
  var segments = _smRef.segments;
  var typedChars = _smRef.typedChars || "";
  if (!segments || !segments.length) return null;
  var remaining = typedChars;
  var rendered = [];
  for (var i = 0; i < segments.length; i++) {
    var seg = segments[i];
    if (!remaining) break;
    var slice = remaining.slice(0, seg.text.length);
    remaining = remaining.slice(seg.text.length);
    if (seg.bold) { rendered.push(React.createElement("strong", { key: i }, slice)); }
    else { rendered.push(React.createElement("span", { key: i }, slice)); }
  }
  return React.createElement("span", null, rendered);
}


// ── Account list for selector dropdown ─────────────────────────────────────
var PL_ACCOUNT_LIST = [
  { code: "4000", name: "Sales" },
  { code: "4100", name: "Other revenue" },
  { code: "5000", name: "Cost of sales" },
  { code: "6000", name: "Rent" },
  { code: "6100", name: "Utilities" },
  { code: "6200", name: "Professional fees" },
  { code: "6400", name: "Travel" },
  { code: "6410", name: "Subscriptions" },
  { code: "7000", name: "Salaries" },
  { code: "7100", name: "Employer NIC" },
  { code: "7200", name: "Pension" },
  { code: "8000", name: "Depreciation" },
  { code: "8100", name: "Interest payable" },
  { code: "9000", name: "Corporation tax" },
];

// ── Per-account flow configuration ─────────────────────────────────────────
// Maps account codes to their prepare-flow content.
// For now only 4000 is populated; others will be added incrementally.
var PL_PREPARE_CONFIG = {
  "4000": {
    title: "4000 – Sales",
    section: "Revenue",
    steps: [
      { label: "Loading transactions for April 2026", duration: 800, subtext: "48 transactions found" },
      { label: "Comparing against March actuals", duration: 600, subtext: "+3.5% variance identified" },
      { label: "Cross-referencing prior year pattern", duration: 700, subtext: "Seasonal uplift consistent" },
      { label: "Checking for unposted invoices", duration: 500, subtext: "None found" },
      { label: "Generating summary", duration: 400 },
    ],
    introSegments: [
      { text: "I'll review ", bold: false },
      { text: "4000 – Sales", bold: true },
      { text: " for ", bold: false },
      { text: "April 2026", bold: true },
      { text: ". I'll compare against the prior month, check for unposted invoices, and flag anything that needs your attention.", bold: false },
    ],
    summarySegments: [
      { text: "Revenue of ", bold: false },
      { text: "£312,450.00", bold: true },
      { text: " is ", bold: false },
      { text: "3.5% above March", bold: true },
      { text: ", driven by increased wholesale orders from Tesco and Sainsbury's ahead of the summer season. This is consistent with the seasonal pattern seen in prior years. ", bold: false },
      { text: "No adjustments are needed.", bold: true },
    ],
  },
};

// ── Suggestion cards for 4000 – Sales ──────────────────────────────────────
var PL_SALES_CARDS = [
  {
    idx: 0,
    key: "missing-accrual",
    category: "Missing accruals",
    title: "Accrue April wholesale commission",
    description: "Wholesale commissions to Tesco are typically posted in the first week of the following month. The April commission of £4,280.00 has not yet been received or posted. A matching accrual was raised in each of the prior 11 months. Without an accrual, April revenue will be overstated.",
    tableRow: { account: "4000 – Sales", amount: "£4,280.00", period: "Apr 2026", reasoning: "Consistent trend of accruals from the past" },
    primaryLabel: "Review suggestion",
    secondaryLabel: "I have solved this issue",
  },
  {
    idx: 1,
    key: "investigate-variance",
    category: "Variance investigation",
    title: "Investigate Sainsbury's volume uplift",
    description: "Sainsbury's wholesale orders increased by 18.2% compared to March, contributing £8,400.00 of additional revenue. This exceeds the seasonal pattern observed in prior years (typical April uplift is 8–12%). Confirm whether this reflects a new contract or promotional agreement, or whether it may reverse in May.",
    tableRow: { account: "4000 – Sales", amount: "£8,400.00", period: "Apr 2026", reasoning: "Variance exceeds seasonal norm by 6–10 pp" },
    primaryLabel: "Review suggestion",
    secondaryLabel: "I have solved this issue",
  },
  {
    idx: 2,
    key: "credit-note",
    category: "Unposted items",
    title: "Post outstanding credit note CN-4821",
    description: "Credit note CN-4821 for £1,250.00 was issued on 28 April to Waitrose for damaged goods but has not been posted to the ledger. The original invoice (INV-4103) was posted in March. Leaving the credit note unposted overstates April revenue by £1,250.00.",
    tableRow: { account: "4000 – Sales", amount: "–£1,250.00", period: "Apr 2026", reasoning: "Credit note issued but not posted" },
    primaryLabel: "Review suggestion",
    secondaryLabel: "I have solved this issue",
  },
];


// ── Close icon ─────────────────────────────────────────────────────────────
var PlCloseIcon = function() {
  return React.createElement("svg", { width: 30, height: 30, viewBox: "0 0 30 30", fill: "none" },
    React.createElement("rect", { width: 30, height: 30, rx: 15, fill: "#F5F5F5" }),
    React.createElement("path", { d: "M20 10L10 20M10 10L20 20", stroke: "#2A2A2A", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
  );
};

// ── Back arrow icon ────────────────────────────────────────────────────────
var PlBackIcon = function() {
  return React.createElement("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" },
    React.createElement("path", { d: "M12.5 15L7.5 10L12.5 5", stroke: T.colorTextPrimary, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" })
  );
};


// ── PlPrepareFlow component ────────────────────────────────────────────────
function PlPrepareFlow(_ref) {
  var accountCode = _ref.accountCode;
  var selectedPeriod = _ref.selectedPeriod || "April 2026";
  var onClose = _ref.onClose;

  var config = PL_PREPARE_CONFIG[accountCode];
  if (!config) {
    // Fallback for accounts not yet configured — just show a placeholder
    return React.createElement("div", {
      style: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 320, display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif", background: T.colorSurfaceContrast },
    },
      // Top bar
      React.createElement("div", {
        style: { height: 96, background: T.colorSurfacePrimary, borderBottom: "1px solid " + T.colorButtonSecondary, display: "flex", alignItems: "center", padding: "0 24px", flexShrink: 0, gap: 16, zIndex: 10 },
      },
        React.createElement("button", {
          onClick: onClose,
          style: { display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", flexShrink: 0 },
        }, React.createElement(PlBackIcon)),
        React.createElement("span", { style: { fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, letterSpacing: "-1px" } }, accountCode + " – Prepare"),
        React.createElement("div", { style: { flex: 1 } }),
        React.createElement("button", { onClick: onClose, style: { border: "none", background: "none", cursor: "pointer", padding: 0 } }, React.createElement(PlCloseIcon))
      ),
      // Placeholder body
      React.createElement("div", {
        style: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center" },
      },
        React.createElement("p", { style: { fontSize: 16, color: T.colorTextSecondary } }, "Prepare flow for " + accountCode + " is not yet configured.")
      )
    );
  }

  // ── State ──
  var _s = useState(false); var stepsPopulated = _s[0], setStepsPopulated = _s[1];
  _s = useState([]); var stepStatuses = _s[0], setStepStatuses = _s[1];
  _s = useState([]); var stepSubtexts = _s[0], setStepSubtexts = _s[1];
  _s = useState(0); var visibleSteps = _s[0], setVisibleSteps = _s[1];
  _s = useState(false); var summaryVisible = _s[0], setSummaryVisible = _s[1];
  _s = useState(400); var chatWidth = _s[0], setChatWidth = _s[1];
  _s = useState(false); var isDragging = _s[0], setIsDragging = _s[1];
  _s = useState(true); var isAtBottom = _s[0], setIsAtBottom = _s[1];
  _s = useState(false); var acctDropOpen = _s[0], setAcctDropOpen = _s[1];
  _s = useState(""); var inputValue = _s[0], setInputValue = _s[1];
  _s = useState(new Set()); var resolvedCards = _s[0], setResolvedCards = _s[1];
  _s = useState(new Set()); var ignoredCards = _s[0], setIgnoredCards = _s[1];
  _s = useState({}); var cardActions = _s[0], setCardActions = _s[1];
  _s = useState(false); var highlightsOpen = _s[0], setHighlightsOpen = _s[1];
  _s = useState(false); var analysisOpen = _s[0], setAnalysisOpen = _s[1];

  var chatScrollRef = useRef(null);
  var chatEndRef = useRef(null);
  var acctDropRef = useRef(null);

  // ── Close dropdown on click outside ──
  useEffect(function() {
    if (!acctDropOpen) return;
    var handler = function(e) {
      if (acctDropRef.current && !acctDropRef.current.contains(e.target)) setAcctDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return function() { document.removeEventListener("mousedown", handler); };
  }, [acctDropOpen]);

  // ── Typewriter for intro message ──
  var introFull = config.introSegments.map(function(s) { return s.text; }).join("");
  var tw = PlUseTypewriter(introFull, 18, false);
  var introDone = tw.done;

  // ── Step reveal after intro typed ──
  useEffect(function() {
    if (!introDone) return;
    var REVEAL = 80, timers = [];
    config.steps.forEach(function(_, i) {
      timers.push(setTimeout(function() {
        setVisibleSteps(function(v) { return Math.max(v, i + 1); });
      }, i * REVEAL));
    });
    timers.push(setTimeout(function() { setStepsPopulated(true); }, (config.steps.length - 1) * REVEAL + 80));
    return function() { timers.forEach(clearTimeout); };
  }, [introDone]);

  // ── Step progression after populated ──
  useEffect(function() {
    if (!stepsPopulated) return;
    setStepStatuses(config.steps.map(function(_, i) { return i === 0 ? "active" : "pending"; }));
    setStepSubtexts(config.steps.map(function() { return false; }));
    var timers = [], cum = 0;
    config.steps.forEach(function(step, i) {
      cum += step.duration;
      if (step.subtext) {
        timers.push(setTimeout(function() {
          setStepSubtexts(function(prev) { var n = prev.slice(); n[i] = true; return n; });
        }, cum - 350));
      }
      timers.push(setTimeout(function() {
        setStepStatuses(function(prev) {
          var n = prev.slice();
          n[i] = "done";
          if (i + 1 < config.steps.length) n[i + 1] = "active";
          return n;
        });
      }, cum));
    });
    return function() { timers.forEach(clearTimeout); };
  }, [stepsPopulated]);

  // ── Detect steps complete ──
  var stepsComplete = stepStatuses.length > 0 && stepStatuses.every(function(s) { return s === "done"; });

  // ── Show summary after steps complete ──
  useEffect(function() {
    if (!stepsComplete) return;
    var t = setTimeout(function() { setSummaryVisible(true); }, 900);
    return function() { clearTimeout(t); };
  }, [stepsComplete]);

  // ── Auto-scroll chat ──
  useEffect(function() {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [introDone, stepsComplete, summaryVisible]);

  // ── Chat scroll tracking ──
  useEffect(function() {
    var el = chatScrollRef.current;
    if (!el) return;
    var handleScroll = function() {
      var atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
      setIsAtBottom(atBottom);
    };
    el.addEventListener("scroll", handleScroll);
    return function() { el.removeEventListener("scroll", handleScroll); };
  }, []);

  // ── Resizable divider drag ──
  var handleDragStart = function(e) {
    e.preventDefault();
    setIsDragging(true);
    var startX = e.clientX, startW = chatWidth;
    var onMove = function(ev) { setChatWidth(Math.max(300, Math.min(700, startW + (ev.clientX - startX)))); };
    var onUp = function() { setIsDragging(false); document.body.style.cursor = ""; document.body.style.userSelect = ""; document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  // ── Build step items for PlStepsAccordion ──
  var visibleStepItems = [];
  var visibleStepStatuses = [];
  var visibleStepSubtexts = [];
  config.steps.forEach(function(step, i) {
    if (i >= visibleSteps) return;
    visibleStepItems.push({ label: step.label, subtext: step.subtext });
    visibleStepStatuses.push(stepStatuses[i] || "pending");
    visibleStepSubtexts.push(!!stepSubtexts[i]);
  });

  // ── Summary typewriter ──
  var summaryFull = config.summarySegments ? config.summarySegments.map(function(s) { return s.text; }).join("") : "";
  var summaryTw = PlUseTypewriter(summaryVisible ? summaryFull : "", 18, false);

  // ── Render ──
  return React.createElement("div", {
    style: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 320, display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif", background: T.colorSurfaceContrast },
  },
    React.createElement("style", null,
      "@keyframes _plpFadeIn{from{opacity:0}to{opacity:1}} " +
      "@keyframes _plpStepReveal{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} " +
      "@keyframes _plpTextShimmer{0%{background-position:200% center}100%{background-position:-200% center}}"
    ),

    // ── Top bar (matches adjustments pattern) ──
    React.createElement("div", {
      style: { height: 96, background: T.colorSurfacePrimary, borderBottom: "1px solid " + T.colorButtonSecondary, display: "flex", alignItems: "center", padding: "0 24px", flexShrink: 0, gap: 16, zIndex: 10, position: "relative" },
    },
      // Title
      React.createElement("span", { style: { fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, letterSpacing: "-1px", flexShrink: 0 } }, "Prepare Profit and Loss"),
      // Account selector dropdown
      React.createElement("div", { ref: acctDropRef, style: { position: "relative" } },
        React.createElement("button", {
          onClick: function() { setAcctDropOpen(function(o) { return !o; }); },
          style: { display: "inline-flex", alignItems: "center", gap: 8, padding: "0 12px", height: 48, border: "1px solid " + T.colorBorderDark, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" },
        },
          React.createElement("span", null, config.title),
          React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", style: { transition: "transform 0.2s ease", transform: acctDropOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 } },
            React.createElement("path", { d: "M4 6L8 10L12 6", stroke: "#080908", strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round" })
          )
        ),
        acctDropOpen && React.createElement("div", {
          style: { position: "absolute", top: "calc(100% + 4px)", left: 0, background: T.colorSurfacePrimary, border: "1px solid " + T.colorBorderDark, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 100, minWidth: 260, overflow: "hidden", padding: "6px" },
        },
          PL_ACCOUNT_LIST.map(function(acct) {
            var isSelected = acct.code === accountCode;
            var isConfigured = !!PL_PREPARE_CONFIG[acct.code];
            return React.createElement("button", {
              key: acct.code,
              onClick: isConfigured ? function() { setAcctDropOpen(false); } : undefined,
              style: { width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, textAlign: "left", padding: "10px 12px", fontSize: 14, color: isConfigured ? T.colorTextPrimary : T.colorTextDisabled, fontWeight: isSelected ? 500 : 400, background: isSelected ? T.colorBorderLight : "transparent", border: "none", cursor: isConfigured ? "pointer" : "default", borderRadius: 8, boxSizing: "border-box", fontFamily: "'Inter', sans-serif" },
              onMouseEnter: function(e) { if (!isSelected && isConfigured) e.currentTarget.style.background = T.colorSurfaceSecondary; },
              onMouseLeave: function(e) { if (!isSelected) e.currentTarget.style.background = "transparent"; },
            },
              React.createElement("span", null, acct.code + " – " + acct.name),
              isSelected && React.createElement("span", { style: { fontSize: 12, fontWeight: 500, color: T.colorWarning, background: T.colorWarningBg, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 } }, "In review")
            );
          })
        )
      ),
      // Spacer
      React.createElement("div", { style: { flex: 1 } }),
      // Close button
      React.createElement("button", { onClick: onClose, style: { border: "none", background: "none", cursor: "pointer", padding: 0 } },
        React.createElement("svg", { width: 30, height: 30, viewBox: "0 0 30 30", fill: "none" },
          React.createElement("rect", { width: 30, height: 30, rx: 15, fill: "#F5F5F5" }),
          React.createElement("path", { d: "M20 10L10 20M10 10L20 20", stroke: "#2A2A2A", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        )
      )
    ),

    // ── Content area (chat + canvas) ──
    React.createElement("div", { style: { display: "flex", flex: 1, overflow: "hidden", position: "relative", padding: 16 } },

      // ── Left: Chat panel ──
      React.createElement("div", {
        style: { display: "flex", flexDirection: "column", width: summaryVisible ? chatWidth : "100%", flexShrink: 0, transition: isDragging ? "none" : "width 0.72s cubic-bezier(0.16,1,0.3,1)", overflow: "hidden", willChange: "width", position: "relative", zIndex: 1 },
      },
        // Scroll-to-bottom button
        summaryVisible && React.createElement("button", {
          onClick: function() { chatScrollRef.current && chatScrollRef.current.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: "smooth" }); },
          style: { position: "absolute", bottom: 218, left: "50%", transform: "translateX(-50%)", zIndex: 10, width: 32, height: 32, borderRadius: "50%", background: T.colorSurfacePrimary, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)", opacity: isAtBottom ? 0 : 1, pointerEvents: isAtBottom ? "none" : "auto", transition: "opacity 0.35s ease" },
          onMouseEnter: function(e) { e.currentTarget.style.background = T.colorBorderLight; },
          onMouseLeave: function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; },
        },
          React.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none" },
            React.createElement("path", { d: "M12 5V19M12 19L19 12M12 19L5 12", stroke: "#1F2024", strokeWidth: 1.25, strokeLinecap: "round", strokeLinejoin: "round" })
          )
        ),

        // Inner scroll wrapper (matches adjustments)
        React.createElement("div", { style: { flex: 1, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" } },
          React.createElement("div", { ref: chatScrollRef, style: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", scrollBehavior: "smooth" } },
            // Top gradient fade
            summaryVisible && React.createElement("div", { style: { position: "sticky", top: 0, height: 40, marginBottom: -40, background: "linear-gradient(to bottom, rgba(251,251,251,1) 0%, rgba(251,251,251,0) 100%)", zIndex: 2, pointerEvents: "none", flexShrink: 0 } }),
            // Centered content container
            React.createElement("div", { style: { maxWidth: 680, width: "100%", margin: "0 auto", padding: summaryVisible ? "24px 24px 100px" : "24px 24px 24px", flex: 1, display: "flex", flexDirection: "column" } },
              // Intro message (streaming)
              React.createElement("div", { style: { fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", width: summaryVisible ? "90%" : "70%", marginBottom: 20 } },
                React.createElement("p", { style: { margin: 0 } },
                  React.createElement(PlStreamingMessage, { segments: config.introSegments, typedChars: tw.chars })
                )
              ),

              // Workflow steps
              introDone && visibleStepItems.length > 0 && React.createElement("div", {
                style: { animation: "_plpFadeIn 0.3s ease both" },
              },
                React.createElement(PlStepsAccordion, { steps: visibleStepItems, stepStatuses: visibleStepStatuses, stepSubtexts: visibleStepSubtexts, title: "Prepare Profit & Loss" })
              ),

              // Summary message (after steps complete)
              summaryVisible && config.summarySegments && React.createElement("div", { style: { fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", width: "90%", marginTop: 20 } },
                React.createElement("p", { style: { margin: 0 } },
                  React.createElement(PlStreamingMessage, { segments: config.summarySegments, typedChars: summaryTw.chars })
                )
              ),

              // Scroll anchor
              React.createElement("div", { ref: chatEndRef })
            )
          )
        ),

        // ── Chat input box (matches adjustments) ──
        summaryVisible && React.createElement("div", {
          style: { padding: "60px 12px 16px", flexShrink: 0, background: "linear-gradient(to bottom, rgba(251,251,251,0) 0%, rgba(251,251,251,1) 60px)", marginTop: -60 },
        },
          React.createElement("div", { style: { maxWidth: 680, margin: "0 auto" } },
            React.createElement("div", {
              style: { borderRadius: 8, padding: "14px 14px 12px", background: T.colorSurfacePrimary, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px " + T.colorBorderDark },
            },
              React.createElement("textarea", {
                value: inputValue,
                onChange: function(e) { setInputValue(e.target.value); },
                placeholder: "Ask for changes or information...",
                rows: 3,
                style: { width: "100%", border: "none", outline: "none", resize: "none", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", background: "transparent", fontFamily: "'Inter', sans-serif", display: "block" },
              }),
              React.createElement("div", { style: { display: "flex", alignItems: "center", marginTop: 8 } },
                // Attachment button
                React.createElement("button", {
                  style: { width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: T.colorTextSecondary, padding: 0 },
                  onMouseEnter: function(e) { e.currentTarget.style.background = T.colorBorderLight; },
                  onMouseLeave: function(e) { e.currentTarget.style.background = "none"; },
                },
                  React.createElement("svg", { width: 18, height: 18, viewBox: "0 0 18 18", fill: "none" },
                    React.createElement("path", { d: "M15.5 8.5L8.5 15.5C7.12 16.88 4.88 16.88 3.5 15.5C2.12 14.12 2.12 11.88 3.5 10.5L10.5 3.5C11.33 2.67 12.67 2.67 13.5 3.5C14.33 4.33 14.33 5.67 13.5 6.5L6.5 13.5C6.08 13.92 5.42 13.92 5 13.5C4.58 13.08 4.58 12.42 5 12L11.5 5.5", stroke: "currentColor", strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round" })
                  )
                ),
                // Spacer
                React.createElement("div", { style: { flex: 1 } }),
                // Send button
                React.createElement("button", {
                  style: { width: 36, height: 36, marginLeft: 6, border: "1px solid " + T.colorBorderDark, borderRadius: 10, background: inputValue.trim() ? T.colorBrandPrimary : T.colorSurfaceSecondary, cursor: inputValue.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s", padding: 0 },
                },
                  React.createElement("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" },
                    React.createElement("path", { d: "M9.99984 15.8346V4.16797M9.99984 4.16797L4.1665 10.0013M9.99984 4.16797L15.8332 10.0013", stroke: inputValue.trim() ? "#FFFFFF" : "#8C8C8B", strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round" })
                  )
                )
              )
            )
          )
        )
      ),

      // ── Resize handle ──
      summaryVisible && React.createElement("div", {
        onMouseDown: handleDragStart,
        style: { width: 8, cursor: "col-resize", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 2 },
      },
        React.createElement("div", { style: { width: 3, height: 40, borderRadius: 2, background: T.colorBorderDark } })
      ),

      // ── Right: Canvas panel ──
      summaryVisible && React.createElement("div", {
        style: { flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", borderRadius: 12, background: T.colorSurfacePrimary, border: "1px solid " + T.colorBorderDark, animation: "_plpFadeIn 0.5s ease" },
      },
        React.createElement("div", { style: { animation: "_plpFadeIn 0.4s ease 0.1s both", height: "100%", overflowY: "auto" } },
          React.createElement("div", { style: { padding: "48px 48px 48px", maxWidth: 800, margin: "0 auto" } },

            // ── Overview section ──
            React.createElement("div", { style: { background: T.colorSurfacePrimary, border: "1px solid " + T.colorBorderDark, borderRadius: 8, padding: "24px 24px 20px", marginBottom: 20 } },
              React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 } },
                React.createElement("h3", { style: { fontSize: 20, fontWeight: 500, color: T.colorTextPrimary, margin: 0 } }, "Overview"),
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
                  React.createElement("span", { style: { fontSize: 13, color: T.colorTextSecondary } }, "Generated 5 May, 12:05"),
                  React.createElement(SecondaryButton, { style: { height: 36, fontSize: 13 } }, "Re-sync")
                )
              ),
              React.createElement(DataTable, {
                columns: [
                  { key: "account", label: "Account", width: "1.2fr" },
                  { key: "actual", label: "Actual (Apr)", width: "1fr", align: "right" },
                  { key: "ref", label: "Ref. (Mar 26)", width: "1fr", align: "right" },
                  { key: "variance", label: "Variance", width: "1fr" },
                ],
                rows: [
                  { account: "4000 – Sales", actual: "£312,450.00", ref: "£301,880.00", variance: React.createElement("div", null, React.createElement("span", null, "+£10,570.00"), React.createElement("span", { style: { display: "block", fontSize: 12, fontWeight: 500, color: T.colorTextSecondary, background: T.colorBorderLight, borderRadius: 4, padding: "0 6px", marginTop: 4, width: "fit-content" } }, "+3.5%")) },
                ],
              })
            ),

            // ── Highlights accordion ──
            React.createElement("div", { style: { background: T.colorSurfacePrimary, border: "1px solid " + T.colorBorderDark, borderRadius: 8, marginBottom: 20, overflow: "hidden" } },
              React.createElement("div", {
                onClick: function() { setHighlightsOpen(function(o) { return !o; }); },
                style: { display: "flex", alignItems: "center", justifyContent: "space-between", height: 67, padding: "0 20px", cursor: "pointer" },
              },
                React.createElement("span", { style: { fontSize: 14, fontWeight: 500, color: T.colorTextPrimary } }, "Highlights"),
                React.createElement("div", { style: { display: "flex", transform: highlightsOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)", flexShrink: 0, marginLeft: 12 } }, React.createElement(ChevronUpIcon))
              ),
              React.createElement("div", { style: { overflow: "hidden", maxHeight: highlightsOpen ? 400 : 0, opacity: highlightsOpen ? 1 : 0, transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease" } },
                React.createElement("div", { style: { fontSize: 14, color: T.colorTextBody, lineHeight: "20px", margin: "0 20px 16px", borderTop: "1px solid " + T.colorBorderSubtle, paddingTop: 14 } },
                  React.createElement("p", { style: { margin: "0 0 10px" } }, "Revenue of £312,450.00 is 3.5% above March, driven by increased wholesale orders from Tesco and Sainsbury's."),
                  React.createElement("p", { style: { margin: "0 0 10px" } }, "The seasonal uplift is consistent with prior-year patterns (April 2025: +3.1%, April 2024: +2.8%)."),
                  React.createElement("p", { style: { margin: 0 } }, "Three items require attention: one unposted credit note, one missing commission accrual, and one volume variance that exceeds seasonal norms.")
                )
              )
            ),

            // ── Analysis & Key findings accordion ──
            React.createElement("div", { style: { background: T.colorSurfacePrimary, border: "1px solid " + T.colorBorderDark, borderRadius: 8, marginBottom: 28, overflow: "hidden" } },
              React.createElement("div", {
                onClick: function() { setAnalysisOpen(function(o) { return !o; }); },
                style: { display: "flex", alignItems: "center", justifyContent: "space-between", height: 67, padding: "0 20px", cursor: "pointer" },
              },
                React.createElement("span", { style: { fontSize: 14, fontWeight: 500, color: T.colorTextPrimary } }, "Analysis & Key findings"),
                React.createElement("div", { style: { display: "flex", transform: analysisOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)", flexShrink: 0, marginLeft: 12 } }, React.createElement(ChevronUpIcon))
              ),
              React.createElement("div", { style: { overflow: "hidden", maxHeight: analysisOpen ? 500 : 0, opacity: analysisOpen ? 1 : 0, transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease" } },
                React.createElement("div", { style: { fontSize: 14, color: T.colorTextBody, lineHeight: "20px", margin: "0 20px 16px", borderTop: "1px solid " + T.colorBorderSubtle, paddingTop: 14 } },
                  React.createElement("p", { style: { margin: "0 0 10px" } }, "The P&L review for April 2026 cross-referenced 48 sales transactions against the prior month, prior year, and outstanding invoices and credit notes."),
                  React.createElement("p", { style: { margin: "0 0 10px" } }, "The most significant finding is an 18.2% volume uplift from Sainsbury's (£8,400.00) that exceeds the typical seasonal range of 8–12%. This could indicate a new contract or promotional agreement, or a one-off order that will reverse in May."),
                  React.createElement("p", { style: { margin: "0 0 10px" } }, "A wholesale commission accrual of £4,280.00 is missing. This recurring accrual has been raised in each of the prior 11 months and appears to have been missed during April period close."),
                  React.createElement("p", { style: { margin: 0 } }, "Credit note CN-4821 (£1,250.00) for damaged goods was issued to Waitrose on 28 April but remains unposted, overstating revenue by that amount.")
                )
              )
            ),

            // ── Divider ──
            React.createElement("hr", { style: { border: "none", borderTop: "1px solid " + T.colorBorderDark, margin: "32px 0 40px" } }),

            // ── Suggestions header ──
            React.createElement("h3", { style: { fontSize: 20, fontWeight: 500, color: T.colorTextPrimary, margin: "0 0 16px" } }, "Suggestions"),

            // ── Suggestion cards ──
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20 } },
              (function() {
                var cardsByCategory = {};
                PL_SALES_CARDS.forEach(function(card) {
                  if (!cardsByCategory[card.category]) cardsByCategory[card.category] = [];
                  cardsByCategory[card.category].push(card);
                });
                var sections = [];
                Object.keys(cardsByCategory).forEach(function(cat) {
                  sections.push(React.createElement("h4", { key: "cat-" + cat, style: { fontSize: 16, fontWeight: 500, color: T.colorTextPrimary, margin: "8px 0 12px" } }, cat));
                  cardsByCategory[cat].forEach(function(card) {
                    var isResolved = resolvedCards.has(card.idx);
                    var isIgnored = ignoredCards.has(card.idx);
                    var actionLabel = cardActions[card.idx];
                    var statusLabel = isResolved ? (actionLabel || "Resolved") : isIgnored ? (actionLabel || "Ignored") : "Unresolved";
                    var statusStyle = isResolved ? { background: T.colorBrandLighter, border: "none", color: T.colorBrandPrimary } : isIgnored ? { background: T.colorButtonDisabled, border: "none", color: T.colorTextSecondary } : { background: T.colorWarningBg, border: "none", color: T.colorWarning };
                    sections.push(React.createElement("div", { key: card.key, style: { scrollMarginTop: 64 } },
                      React.createElement(RecommendationCard, {
                        title: card.title,
                        description: card.description,
                        statusLabel: statusLabel,
                        statusStyle: statusStyle,
                        collapsed: isResolved || isIgnored,
                        isIgnored: isIgnored,
                        hideMore: true,
                        tableRow: card.tableRow,
                        verticalTable: true,
                        tableColumns: [
                          { key: "account", label: "Account", width: "1.4fr" },
                          { key: "amount", label: "Amount", width: "0.8fr" },
                          { key: "period", label: "Period", width: "0.8fr" },
                          { key: "reasoning", label: "Reasoning", width: "1.2fr" },
                        ],
                        primaryLabel: card.primaryLabel,
                        secondaryLabel: card.secondaryLabel,
                        onPrimaryAction: function() {},
                        onSecondaryAction: function() {
                          var idx = card.idx;
                          setResolvedCards(function(prev) { var n = new Set(prev); n.add(idx); return n; });
                          setCardActions(function(prev) { var o = Object.assign({}, prev); o[idx] = "Resolved"; return o; });
                        },
                        onIgnore: function() {
                          var idx = card.idx;
                          setIgnoredCards(function(prev) { var n = new Set(prev); n.add(idx); return n; });
                        },
                      })
                    ));
                  });
                });
                return sections;
              })()
            )
          )
        )
      )
    )
  );
}

// Make PlPrepareFlow globally available (called from profit-and-loss.jsx)
window.PlPrepareFlow = PlPrepareFlow;

})();
