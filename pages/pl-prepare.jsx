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
  { code: "4010", name: "Online & direct sales" },
  { code: "4100", name: "Other income" },
  { code: "4200", name: "Rental income" },
  { code: "5000", name: "Purchases – raw materials" },
  { code: "5001", name: "Purchases – packaging" },
  { code: "5010", name: "Direct labour" },
  { code: "5020", name: "Freight & carriage" },
  { code: "5030", name: "Stock adjustments" },
  { code: "5040", name: "Production overheads" },
  { code: "6000", name: "Rent" },
  { code: "6010", name: "Rates" },
  { code: "6020", name: "Light, heat & power" },
  { code: "6030", name: "Insurance" },
  { code: "6040", name: "Repairs & maintenance" },
  { code: "6110", name: "Advertising & marketing" },
  { code: "6200", name: "Professional fees" },
  { code: "6210", name: "Bank charges" },
  { code: "6220", name: "Subscriptions" },
  { code: "6230", name: "Telephone & internet" },
  { code: "6250", name: "Travel & subsistence" },
  { code: "6310", name: "Motor expenses" },
  { code: "6420", name: "General expenses" },
  { code: "7000", name: "Wages & salaries" },
  { code: "7002", name: "Employer NI" },
  { code: "7003", name: "Pension costs" },
  { code: "7010", name: "Directors' remuneration" },
  { code: "8000", name: "Depreciation" },
  { code: "8010", name: "Amortisation" },
  { code: "8100", name: "Bad debts" },
];

// ── Helper: build a standard config from account data ──────────────────────
function _plMakeConfig(code, name, section, actual, ref, variance, pct, txCount, summaryText, suggestions) {
  return {
    title: code + " – " + name,
    section: section,
    actual: actual, ref: ref, variance: variance, pct: pct,
    steps: [
      { label: "Loading transactions for April 2026", duration: 800, subtext: txCount + " transactions found" },
      { label: "Comparing against March actuals", duration: 600, subtext: pct + " variance identified" },
      { label: "Cross-referencing prior year pattern", duration: 700, subtext: "Pattern analysis complete" },
      { label: "Checking for unposted items", duration: 500, subtext: suggestions.length > 0 ? suggestions.length + " item" + (suggestions.length !== 1 ? "s" : "") + " flagged" : "None found" },
      { label: "Generating summary", duration: 400 },
    ],
    introSegments: [
      { text: "I'll review ", bold: false },
      { text: code + " – " + name, bold: true },
      { text: " for ", bold: false },
      { text: "April 2026", bold: true },
      { text: ". I'll compare against the prior month, check for unposted items, and flag anything that needs your attention.", bold: false },
    ],
    summarySegments: [
      { text: name + " of ", bold: false },
      { text: actual, bold: true },
      { text: " is ", bold: false },
      { text: pct + " vs March", bold: true },
      { text: ". " + summaryText, bold: false },
    ],
  };
}

// ── Suggestion cards per account ───────────────────────────────────────────
var PL_ACCOUNT_CARDS = {
  "4000": [
    { idx: 0, key: "4000-variance", title: "Investigate Sainsbury's volume uplift", description: "Sainsbury's wholesale orders increased by 18.2% compared to March, contributing £8,400.00 of additional revenue. This exceeds the seasonal pattern observed in prior years (typical April uplift is 8–12%). Confirm whether this reflects a new contract or promotional agreement.", tableRow: { account: "4000 – Sales", amount: "£8,400.00", period: "Apr 2026", reasoning: "Variance exceeds seasonal norm by 6–10 pp" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
    { idx: 1, key: "4000-credit", title: "Post outstanding credit note CN-4821", description: "Credit note CN-4821 for £1,250.00 was issued on 28 April to Waitrose for damaged goods but has not been posted to the ledger. Leaving the credit note unposted overstates April revenue by £1,250.00.", tableRow: { account: "4000 – Sales", amount: "–£1,250.00", period: "Apr 2026", reasoning: "Credit note issued but not posted" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
  ],
  "4010": [],
  "4100": [
    { idx: 0, key: "4100-pallet", title: "Verify pallet return credit classification", description: "£1,150.00 of pallet return credits have been posted to Other income. In prior periods these were netted against Cost of sales. Confirm whether the reclassification is intentional or a posting error.", tableRow: { account: "4100 – Other income", amount: "£1,150.00", period: "Apr 2026", reasoning: "Inconsistent classification vs prior periods" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
  ],
  "4200": [],
  "5000": [
    { idx: 0, key: "5000-cutoff", title: "Check purchase cut-off for late April deliveries", description: "Two supplier invoices totalling £2,840.00 from Meadow Fresh Dairy are dated 29–30 April but were received on 2 May. Confirm whether goods were received in April and the accrual is required.", tableRow: { account: "5000 – Raw materials", amount: "£2,840.00", period: "Apr 2026", reasoning: "Late invoices near period boundary" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
  ],
  "5001": [],
  "5010": [
    { idx: 0, key: "5010-overtime", title: "Investigate overtime variance", description: "Direct labour is 5.2% above March (£1,200.00 increase). Overtime hours logged in the final week of April were 40% higher than the monthly average. Confirm whether this relates to the Sainsbury's order uplift or a one-off production run.", tableRow: { account: "5010 – Direct labour", amount: "£1,200.00", period: "Apr 2026", reasoning: "Overtime significantly above average" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
  ],
  "5020": [
    { idx: 0, key: "5020-surcharge", title: "Review fuel surcharge increase from DHL", description: "Freight costs increased 16.2% (£1,650.00) driven by a fuel surcharge adjustment from DHL effective 1 April. Confirm whether the surcharge is a permanent rate change or a one-off catch-up billing.", tableRow: { account: "5020 – Freight", amount: "£1,650.00", period: "Apr 2026", reasoning: "Exceeds normal monthly variance range" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
  ],
  "5030": [
    { idx: 0, key: "5030-writeoff", title: "Verify stock write-off reversal", description: "Stock adjustments are £260.00 below March. A write-off of £680.00 posted in March for expired product was partially reversed in April (£260.00). Confirm the reversal is supported by a recount or quality inspection.", tableRow: { account: "5030 – Stock adj.", amount: "–£260.00", period: "Apr 2026", reasoning: "Reversal of prior month write-off" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
  ],
  "5040": [],
  "6000": [
    { idx: 0, key: "6000-regus", title: "Post missed April release for Regus hot desk", description: "The Regus hot desk prepayment has been releasing £195.00 per month since March 2026. However, the April release has not been posted. The schedule shows the entry as scheduled but it was not included in the April close.", tableRow: { account: "6000 – Rent", amount: "£195.00", period: "Apr 2026", reasoning: "Release pattern break — missed during period close" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
    { idx: 1, key: "6000-wework", title: "Accrue April rent for WeWork", description: "WeWork invoices are received in arrears and typically posted in the first week of the following month. The April invoice for £3,200.00 has not yet been received or posted. A matching accrual was raised in each of the prior 11 months. Without an accrual, April rent expense will be understated.", tableRow: { account: "6000 – Rent", amount: "£3,200.00", period: "Apr 2026", reasoning: "Consistent trend of accruals from the past" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
  ],
  "6010": [],
  "6020": [
    { idx: 0, key: "6020-duplicate", title: "Reverse duplicate electricity accrual", description: "Two accrual entries exist for British Gas electricity in April 2026: one for £1,450.00 posted on 1 April and another for £1,450.00 posted on 3 April. Both reference the same estimated usage period. This doubles the electricity accrual for the month.", tableRow: { account: "6020 – Light, heat & power", amount: "–£1,450.00", period: "Apr 2026", reasoning: "Duplicate accrual entries for same period" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
  ],
  "6030": [
    { idx: 0, key: "6030-aviva", title: "Spread Aviva PI renewal over policy period", description: "A £14,400.00 professional indemnity premium from Aviva was posted in full to Insurance in November 2025. No prepayment schedule has been set up for the current policy year. The full amount is sitting in the expense account rather than being spread at £1,200.00/month over 12 months.", tableRow: { account: "6030 – Insurance", amount: "£12,000.00", period: "12 months from Nov 25", reasoning: "Full annual premium in single month expense" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
  ],
  "6040": [
    { idx: 0, key: "6040-conveyor", title: "Check capitalisation of conveyor belt service", description: "A £1,320.00 charge for conveyor belt servicing was posted to Repairs & maintenance. The invoice description references 'belt replacement and motor upgrade'. If the work extends the asset's useful life, part or all should be capitalised to fixed assets.", tableRow: { account: "6040 – Repairs", amount: "£1,320.00", period: "Apr 2026", reasoning: "May meet capitalisation threshold" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
    { idx: 1, key: "6040-iss", title: "Write off £145.20 stale balance for ISS Facility Services", description: "The prepayment for ISS Facility Services (cleaning) expired in March 2026 but has a remaining balance of £145.20 on the schedule. The final release was posted in March and no further releases are expected. The residual balance should be written off.", tableRow: { account: "6040 – Repairs & maintenance", amount: "£145.20", period: "Apr 2026", reasoning: "Expired prepayment with residual balance" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
  ],
  "6110": [],
  "6200": [
    { idx: 0, key: "6200-grant", title: "Accrue Q1 audit fee from Grant Thornton", description: "The annual audit fee of £18,000.00 is invoiced on completion but relates to the full financial year. No accrual has been posted for the three months to April 2026, leaving £4,500.00 of audit cost unrecognised. Prior-year records show the fee was accrued monthly at £1,500.00.", tableRow: { account: "6200 – Professional fees", amount: "£4,500.00", period: "Feb – Apr 2026", reasoning: "Unrecognised audit cost for 3 months" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
    { idx: 1, key: "6200-legal", title: "Classify legal advisory fee", description: "An invoice for £200.00 from Walker & Co Solicitors was posted to Professional fees. The description references 'property lease review'. Confirm whether this relates to the warehouse sublease and should be reallocated to Rent or Property costs.", tableRow: { account: "6200 – Professional fees", amount: "£200.00", period: "Apr 2026", reasoning: "Possible misclassification" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
  ],
  "6210": [],
  "6220": [
    { idx: 0, key: "6220-hubspot", title: "Prepay HubSpot annual licence over 12 months", description: "Invoice #HS-28401 for £7,200.00 dated 15 March 2026 covers a 12-month CRM licence from April 2026 to March 2027. The invoice has been posted in full to Subscriptions. This should be prepaid and released at £600.00 per month.", tableRow: { account: "6220 – Subscriptions", amount: "£7,200.00", period: "12 months from Apr 26", reasoning: "Annual licence posted in full to single month" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
    { idx: 1, key: "6220-ms365", title: "Reverse duplicate Microsoft 365 prepayment", description: "Two prepayment schedules exist for Microsoft 365 Business Premium: one created in December 2025 and another in January 2026, both for £4,800.00 referencing the same subscription. Both are actively releasing £400.00/month, which doubles the monthly expense.", tableRow: { account: "6220 – Subscriptions", amount: "–£4,800.00", period: "Apr 2026", reasoning: "Duplicate schedules doubling monthly expense" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
  ],
  "6230": [
    { idx: 0, key: "6230-vodafone", title: "Reverse stale accrual for Vodafone", description: "An accrual of £780.00 for Vodafone mobile charges was raised in January 2026 but was never reversed. The actual invoice for £764.50 was posted in February directly to Telephone & internet. The original accrual is still sitting on the balance sheet and should be reversed.", tableRow: { account: "6230 – Telephone & internet", amount: "£780.00", period: "Apr 2026", reasoning: "Stale accrual — actual invoice already posted" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
  ],
  "6250": [
    { idx: 0, key: "6250-tradeshow", title: "Confirm trade show travel allocation", description: "£330.00 of additional travel costs relate to the FoodTech Expo (Birmingham, 22–24 April). Two team members attended. Verify that hotel and mileage claims have been properly supported with receipts.", tableRow: { account: "6250 – Travel", amount: "£330.00", period: "Apr 2026", reasoning: "Event-related spend needs receipt verification" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
  ],
  "6310": [],
  "6420": [
    { idx: 0, key: "6420-miscodings", title: "Investigate potential Barclays card miscodings", description: "General expenses increased 92.5% (£1,850.00). Multiple transactions from the Barclays corporate card were auto-coded to General expenses. Review the individual postings to confirm correct account allocation — some may belong to Travel, Subscriptions, or Entertainment.", tableRow: { account: "6420 – General expenses", amount: "£1,850.00", period: "Apr 2026", reasoning: "Auto-coded card transactions likely miscoded" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
    { idx: 1, key: "6420-amazon", title: "Reclassify Amazon Business purchases", description: "Three Amazon Business purchases totalling £420.00 were coded to General expenses. Based on item descriptions (printer cartridges, packing tape, labels), these should be allocated to Stationery or Packaging.", tableRow: { account: "6420 – General expenses", amount: "£420.00", period: "Apr 2026", reasoning: "Identifiable purchases in wrong nominal" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
    { idx: 2, key: "6420-desk", title: "Reclassify standing desk from expenses to fixed assets", description: "A standing desk purchase for £750.00 (invoice OE-2026-047, 12 Feb 2026) was posted to General expenses rather than Office equipment. The item meets the £500 capitalisation threshold and should be reclassified as a fixed asset.", tableRow: { account: "6420 – General expenses", amount: "£750.00", period: "Feb 2026", reasoning: "Capex posted to revenue — meets threshold" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
  ],
  "7000": [
    { idx: 0, key: "7000-payreview", title: "Confirm April pay review uplift", description: "Wages & salaries increased 6.2% (£1,900.00) following the annual pay review effective 1 April. Cross-reference the payroll summary to confirm all uplifts match approved rates and that no retrospective adjustments are needed.", tableRow: { account: "7000 – Wages & salaries", amount: "£1,900.00", period: "Apr 2026", reasoning: "First month of new pay rates" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
  ],
  "7002": [],
  "7003": [],
  "7010": [],
  "8000": [
    { idx: 0, key: "8000-plant", title: "Post missing depreciation for plant and machinery", description: "The fixed asset register shows accumulated depreciation of £14,520.00 for forklift FA-031 but Xero shows £12,340.00, a variance of £2,180.00. The April depreciation charge has not been posted. Straight-line over 5 years, monthly charge of £2,180.00.", tableRow: { account: "8000 – Depreciation", amount: "£2,180.00", period: "Apr 2026", reasoning: "FA register vs Xero variance" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
    { idx: 1, key: "8000-computer", title: "Post missing depreciation for computer equipment", description: "The March depreciation charge of £1,740.00 for computer equipment was not posted in Xero. The register shows monthly depreciation across 38 items totalling £1,740.00 based on a 3-year straight-line policy.", tableRow: { account: "8000 – Depreciation", amount: "£1,740.00", period: "Mar 2026", reasoning: "Charge missing from prior month" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
    { idx: 2, key: "8000-motor", title: "Review motor vehicle depreciation variance", description: "The Xero balance for motor vehicles is £118,030.00 vs the fixed asset register total of £112,830.00, a variance of £5,200.00. This appears to relate to two months of unposted depreciation at approximately £2,500.00/month (25% reducing balance).", tableRow: { account: "8000 – Depreciation", amount: "£5,200.00", period: "Mar–Apr 2026", reasoning: "Two months of unposted charges" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
  ],
  "8010": [
    { idx: 0, key: "8010-leasehold", title: "Post missing leasehold amortisation charge", description: "The March amortisation charge for the office fit-out (LH-003, original cost £76,800.00) has not been posted. The monthly charge of £3,200.00 is based on a 24-month lease term. The register shows accumulated amortisation of £51,200.00 while Xero shows £48,000.00.", tableRow: { account: "8010 – Amortisation", amount: "£3,200.00", period: "Mar 2026", reasoning: "Register vs Xero variance of £3,200" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
  ],
  "8100": [
    { idx: 0, key: "8100-provision", title: "Review bad debt provision increase", description: "Bad debts of £1,240.00 were posted in April against a nil balance in March. This relates to a specific provision for invoice INV-3844 (Waitrose, 90+ days overdue). Confirm the provision methodology is consistent and that no credit insurance recovery is expected.", tableRow: { account: "8100 – Bad debts", amount: "£1,240.00", period: "Apr 2026", reasoning: "New provision — no prior month balance" }, primaryLabel: "Review suggestion", secondaryLabel: "I have solved this issue" },
  ],
};

// ── Per-account flow configuration ─────────────────────────────────────────
var PL_PREPARE_CONFIG = {};
(function() {
  var accts = [
    ["4000","Sales","Revenue","£312,450.00","£301,800.00","£10,650.00","+3.5%",48,"Driven by increased wholesale orders from Tesco and Sainsbury's ahead of the summer season. Seasonal uplift is consistent with prior years."],
    ["4010","Online & direct sales","Revenue","£28,920.00","£28,100.00","£820.00","+2.9%",22,"Consistent with recent trend. No issues identified."],
    ["4100","Other income","Revenue","£5,400.00","£4,250.00","£1,150.00","+27.1%",8,"Increase driven by pallet return credits. Classification should be verified against prior period treatment."],
    ["4200","Rental income","Revenue","£1,950.00","£1,950.00","£0.00","0.0%",2,"Sublease income for warehouse unit B. No change from prior month."],
    ["5000","Purchases – raw materials","Cost of sales","£142,380.00","£138,900.00","£3,480.00","+2.5%",34,"Stable following supplier contract renewal. Cut-off on late April deliveries should be checked."],
    ["5001","Purchases – packaging","Cost of sales","£18,460.00","£17,800.00","£660.00","+3.7%",12,"No significant variances or suggestions identified."],
    ["5010","Direct labour","Cost of sales","£24,300.00","£23,100.00","£1,200.00","+5.2%",6,"Overtime hours slightly above budget in the final week of April. May relate to Sainsbury's order uplift."],
    ["5020","Freight & carriage","Cost of sales","£11,850.00","£10,200.00","£1,650.00","+16.2%",18,"Fuel surcharge increase from DHL effective 1 April. Warrants review."],
    ["5030","Stock adjustments","Cost of sales","£3,420.00","£3,680.00","–£260.00","–7.1%",4,"Partial reversal of a March write-off. Confirm supported by recount."],
    ["5040","Production overheads","Cost of sales","£3,230.00","£3,150.00","£80.00","+2.5%",8,"No significant variances or suggestions identified."],
    ["6000","Rent","Overheads","£8,500.00","£8,500.00","£0.00","0.0%",1,"Quarterly charge, consistent with prior periods. No issues."],
    ["6010","Rates","Overheads","£2,100.00","£2,100.00","£0.00","0.0%",1,"No variances or suggestions identified."],
    ["6020","Light, heat & power","Overheads","£3,640.00","£4,280.00","–£640.00","–15.0%",6,"Seasonal decrease expected as heating usage declines. No issues."],
    ["6030","Insurance","Overheads","£2,450.00","£2,450.00","£0.00","0.0%",1,"Annual premium spread monthly. No change."],
    ["6040","Repairs & maintenance","Overheads","£4,120.00","£2,800.00","£1,320.00","+47.1%",5,"Includes conveyor belt service — potential capitalisation required."],
    ["6110","Advertising & marketing","Overheads","£3,200.00","£2,600.00","£600.00","+23.1%",7,"Summer campaign spend starting. May require prepayment treatment."],
    ["6200","Professional fees","Overheads","£6,800.00","£2,400.00","£4,400.00","+183.3%",4,"Year-end audit accrual posted. Verify amount and check for misclassified legal fees."],
    ["6210","Bank charges","Overheads","£480.00","£460.00","£20.00","+4.3%",14,"Consistent with account activity. No issues."],
    ["6220","Subscriptions","Overheads","£890.00","£870.00","£20.00","+2.3%",3,"No significant variances or suggestions identified."],
    ["6230","Telephone & internet","Overheads","£720.00","£710.00","£10.00","+1.4%",2,"No significant variances or suggestions identified."],
    ["6250","Travel & subsistence","Overheads","£1,680.00","£1,350.00","£330.00","+24.4%",9,"Trade show travel included. Receipts should be verified."],
    ["6310","Motor expenses","Overheads","£2,340.00","£2,280.00","£60.00","+2.6%",4,"No significant variances or suggestions identified."],
    ["6420","General expenses","Overheads","£3,850.00","£2,000.00","£1,850.00","+92.5%",16,"Significant increase driven by auto-coded Barclays card transactions. Likely miscodings to investigate."],
    ["7000","Wages & salaries","Staff costs","£32,400.00","£30,500.00","£1,900.00","+6.2%",3,"Annual pay review effective 1 April. Cross-reference payroll summary."],
    ["7002","Employer NI","Staff costs","£3,890.00","£3,640.00","£250.00","+6.9%",1,"Increase consistent with pay review uplift. No issues."],
    ["7003","Pension costs","Staff costs","£2,160.00","£2,020.00","£140.00","+6.9%",1,"Increase consistent with pay review uplift. No issues."],
    ["7010","Directors' remuneration","Staff costs","£8,333.00","£8,333.00","£0.00","0.0%",1,"No change from prior month. No issues."],
    ["8000","Depreciation","Other","£6,012.00","£6,012.00","£0.00","0.0%",1,"Fixed monthly charge per FA register. No issues."],
    ["8010","Amortisation","Other","£2,000.00","£2,000.00","£0.00","0.0%",1,"No issues identified."],
    ["8100","Bad debts","Other","£1,240.00","£0.00","£1,240.00","new",3,"New provision for overdue Waitrose invoice. Confirm methodology and check for credit insurance recovery."],
  ];
  accts.forEach(function(a) {
    var cards = PL_ACCOUNT_CARDS[a[0]] || [];
    PL_PREPARE_CONFIG[a[0]] = _plMakeConfig(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], cards);
  });
})();


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


// ── Persistent state cache (survives close/reopen within session) ──────────
var _plFlowCache = {};
function _plGetCache(code) {
  if (!_plFlowCache[code]) {
    _plFlowCache[code] = { resolvedCards: new Set(), ignoredCards: new Set(), cardActions: {}, flowComplete: false, markedCompleted: false };
  }
  return _plFlowCache[code];
}

// ── PlPrepareFlow component ────────────────────────────────────────────────
function PlPrepareFlow(_ref) {
  var accountCode = _ref.accountCode;
  var selectedPeriod = _ref.selectedPeriod || "April 2026";
  var onClose = _ref.onClose;
  var onNavigate = _ref.onNavigate;
  var plState = _ref.plState || "disabled";

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

  // ── Per-account cards ──
  var _plCards = PL_ACCOUNT_CARDS[accountCode] || [];
  var _isReviewState = plState === "reviewing" || plState === "reviewed";

  // ── Reviewing/reviewed but flow never ran — show info message ──
  var _preCache = _plGetCache(accountCode);
  if (_isReviewState && !_preCache.flowComplete) {
    return React.createElement("div", {
      style: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 320, display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif", background: T.colorSurfaceContrast },
    },
      React.createElement("div", {
        style: { height: 96, background: T.colorSurfacePrimary, borderBottom: "1px solid " + T.colorButtonSecondary, display: "flex", alignItems: "center", padding: "0 24px", flexShrink: 0, gap: 16, zIndex: 10, position: "relative" },
      },
        React.createElement("span", { style: { fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, letterSpacing: "-1px", flexShrink: 0 } }, "Prepare Profit and Loss"),
        React.createElement(Dropdown, {
          value: accountCode,
          onChange: function(code) { if (onNavigate && code !== accountCode) onNavigate(code); },
          options: PL_ACCOUNT_LIST.map(function(a) { return { value: a.code, label: a.code + " – " + a.name }; }),
          searchable: true, searchPlaceholder: "Search accounts…", width: "auto", size: "lg",
        }),
        React.createElement("div", { style: { flex: 1 } }),
        React.createElement("button", { onClick: onClose, style: { border: "none", background: "none", cursor: "pointer", padding: 0 } },
          React.createElement("svg", { width: 30, height: 30, viewBox: "0 0 30 30", fill: "none" },
            React.createElement("rect", { width: 30, height: 30, rx: 15, fill: "#F5F5F5" }),
            React.createElement("path", { d: "M20 10L10 20M10 10L20 20", stroke: "#2A2A2A", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
          )
        )
      ),
      React.createElement("div", {
        style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 48px" },
      },
        React.createElement("div", { style: { maxWidth: 480, textAlign: "center" } },
          React.createElement("p", { style: { fontSize: 15, lineHeight: "24px", color: T.colorTextSecondary, margin: 0 } },
            "This account wasn't prepared during the preparing stage. You can review the figures as they are or send the P&L back to the preparer to run preparation."
          )
        )
      )
    );
  }

  // ── Persistent state (survives close/reopen) ──
  var cache = _plGetCache(accountCode);
  var _s = useState(cache.flowComplete); var stepsPopulated = _s[0], setStepsPopulated = _s[1];
  _s = useState(cache.flowComplete ? config.steps.map(function() { return "done"; }) : []); var stepStatuses = _s[0], setStepStatuses = _s[1];
  _s = useState(cache.flowComplete ? config.steps.map(function() { return true; }) : []); var stepSubtexts = _s[0], setStepSubtexts = _s[1];
  _s = useState(cache.flowComplete ? config.steps.length : 0); var visibleSteps = _s[0], setVisibleSteps = _s[1];
  _s = useState(cache.flowComplete); var summaryVisible = _s[0], setSummaryVisible = _s[1];
  _s = useState(400); var chatWidth = _s[0], setChatWidth = _s[1];
  _s = useState(false); var isDragging = _s[0], setIsDragging = _s[1];
  _s = useState(true); var isAtBottom = _s[0], setIsAtBottom = _s[1];
  // acctDropOpen removed — DS Dropdown handles its own state
  _s = useState(""); var inputValue = _s[0], setInputValue = _s[1];
  _s = useState(function() { return new Set(cache.resolvedCards); }); var resolvedCards = _s[0], setResolvedCards = _s[1];
  _s = useState(function() { return new Set(cache.ignoredCards); }); var ignoredCards = _s[0], setIgnoredCards = _s[1];
  _s = useState(function() { return Object.assign({}, cache.cardActions); }); var cardActions = _s[0], setCardActions = _s[1];
  _s = useState(cache.markedCompleted); var markedCompleted = _s[0], setMarkedCompleted = _s[1];
  _s = useState(false); var highlightsOpen = _s[0], setHighlightsOpen = _s[1];
  _s = useState(false); var analysisOpen = _s[0], setAnalysisOpen = _s[1];

  // ── Sync state back to cache on every change ──
  useEffect(function() {
    cache.resolvedCards = new Set(resolvedCards);
    cache.ignoredCards = new Set(ignoredCards);
    cache.cardActions = Object.assign({}, cardActions);
  }, [resolvedCards, ignoredCards, cardActions]);
  useEffect(function() {
    if (summaryVisible) cache.flowComplete = true;
  }, [summaryVisible]);
  useEffect(function() {
    cache.markedCompleted = markedCompleted;
  }, [markedCompleted]);

  var chatScrollRef = useRef(null);
  var chatEndRef = useRef(null);
  // Dropdown ref removed — DS Dropdown handles its own open/close

  // ── Typewriter for intro message ──
  var isResume = cache.flowComplete;
  var introFull = config.introSegments.map(function(s) { return s.text; }).join("");
  var tw = PlUseTypewriter(introFull, 18, isResume);
  var introDone = tw.done;

  // ── Step reveal after intro typed ──
  useEffect(function() {
    if (!introDone || isResume) return;
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
    if (!stepsPopulated || isResume) return;
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
  var summaryTw = PlUseTypewriter(summaryVisible ? summaryFull : "", 18, isResume);

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
      // Account selector (DS Dropdown)
      React.createElement(Dropdown, {
        value: accountCode,
        onChange: function(code) { if (onNavigate && code !== accountCode) onNavigate(code); },
        options: PL_ACCOUNT_LIST.map(function(a) { return { value: a.code, label: a.code + " – " + a.name }; }),
        searchable: true,
        searchPlaceholder: "Search accounts…",
        width: "auto",
        size: "lg",
      }),
      // Spacer
      React.createElement("div", { style: { flex: 1 } }),
      // Left to review counter (when results are in)
      summaryVisible && (function() {
        var total = _plCards.length;
        var handled = 0;
        _plCards.forEach(function(c) { if (resolvedCards.has(c.idx) || ignoredCards.has(c.idx)) handled++; });
        var remaining = Math.max(0, total - handled);
        var allHandled = remaining <= 0;
        return React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
          !markedCompleted && total > 0 && React.createElement("span", { style: { fontSize: 14, color: T.colorTextThird, whiteSpace: "nowrap" } },
            "Left to review: ",
            React.createElement("strong", { style: { color: T.colorTextPrimary } }, remaining + " suggestion" + (remaining !== 1 ? "s" : ""))
          ),
          markedCompleted
            ? React.createElement(StatusBadge, { variant: "info" }, "Completed")
            : React.createElement("button", {
                onClick: function() { setMarkedCompleted(true); },
                style: { height: 36, padding: "0 16px", borderRadius: 8, border: "none", background: T.colorBrandPrimary, color: T.colorTextLight, fontSize: 14, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" },
                onMouseEnter: function(e) { e.currentTarget.style.background = T.colorBrandPrimaryHover; },
                onMouseLeave: function(e) { e.currentTarget.style.background = T.colorBrandPrimary; },
              }, "Mark as completed")
        );
      })(),
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

        // ── Chat input or closed message ──
        summaryVisible && (_isReviewState
          ? React.createElement("div", {
              style: { padding: "24px 12px 16px", flexShrink: 0, background: T.colorSurfaceContrast },
            },
              React.createElement("div", { style: { maxWidth: 680, margin: "0 auto" } },
                React.createElement("div", {
                  style: { borderRadius: 8, padding: "24px 20px", background: T.colorSurfaceSecondary, textAlign: "center" },
                },
                  React.createElement("p", { style: { fontSize: 14, lineHeight: "22px", color: T.colorTextSecondary, margin: 0 } },
                    "Chat is closed now that the P&L is prepared. You can still comment on the results or send the P&L back to the preparer."
                  )
                )
              )
            )
          : React.createElement("div", {
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
                    React.createElement("button", {
                      style: { width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: T.colorTextSecondary, padding: 0 },
                      onMouseEnter: function(e) { e.currentTarget.style.background = T.colorBorderLight; },
                      onMouseLeave: function(e) { e.currentTarget.style.background = "none"; },
                    },
                      React.createElement("svg", { width: 18, height: 18, viewBox: "0 0 18 18", fill: "none" },
                        React.createElement("path", { d: "M15.5 8.5L8.5 15.5C7.12 16.88 4.88 16.88 3.5 15.5C2.12 14.12 2.12 11.88 3.5 10.5L10.5 3.5C11.33 2.67 12.67 2.67 13.5 3.5C14.33 4.33 14.33 5.67 13.5 6.5L6.5 13.5C6.08 13.92 5.42 13.92 5 13.5C4.58 13.08 4.58 12.42 5 12L11.5 5.5", stroke: "currentColor", strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round" })
                      )
                    ),
                    React.createElement("div", { style: { flex: 1 } }),
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
            React.createElement("div", { style: { marginBottom: 20 } },
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
                  { account: config.title, actual: config.actual, ref: config.ref, variance: React.createElement("div", null, React.createElement("span", null, config.variance), React.createElement("span", { style: { display: "block", fontSize: 12, fontWeight: 500, color: T.colorTextSecondary, background: T.colorBorderLight, borderRadius: 4, padding: "0 6px", marginTop: 4, width: "fit-content" } }, config.pct)) },
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
                  React.createElement("p", { style: { margin: "0 0 10px" } }, config.title + " at " + config.actual + " is " + config.pct + " vs March (" + config.ref + ")."),
                  _plCards.length > 0
                    ? React.createElement("p", { style: { margin: 0 } }, _plCards.length + " item" + (_plCards.length !== 1 ? "s" : "") + " flagged for review.")
                    : React.createElement("p", { style: { margin: 0 } }, "No issues identified.")
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
                  React.createElement("p", { style: { margin: "0 0 10px" } }, "The review for " + config.title + " (April 2026) compared current month against March actuals, prior year patterns, and outstanding items."),
                  config.summarySegments && React.createElement("p", { style: { margin: _plCards.length > 0 ? "0 0 10px" : 0 } }, config.summarySegments.map(function(s) { return s.text; }).join("")),
                  _plCards.length > 0 && React.createElement("p", { style: { margin: 0 } }, _plCards.map(function(c) { return c.title; }).join(". ") + ".")
                )
              )
            ),

            // ── Divider + Suggestions ──
            React.createElement("hr", { style: { border: "none", borderTop: "1px solid " + T.colorBorderDark, margin: "32px 0 40px" } }),

            React.createElement("h3", { style: { fontSize: 20, fontWeight: 500, color: T.colorTextPrimary, margin: "0 0 16px" } }, "Suggestions"),

            // ── No-suggestions empty state ──
            _plCards.length === 0 && React.createElement("div", {
              style: { background: T.colorSurfacePrimary, border: "1px solid " + T.colorBorderDark, borderRadius: 12, padding: "60px 40px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
            },
              React.createElement("svg", { width: 56, height: 56, viewBox: "0 0 56 56", fill: "none", style: { marginBottom: 20 } },
                React.createElement("path", { d: "M16 28L24 36L40 20", stroke: T.colorBrandPrimary, strokeWidth: 5, strokeLinecap: "round", strokeLinejoin: "round", opacity: 0.7 }),
                React.createElement("path", { d: "M16 28L24 36L40 20", stroke: T.colorBrandPrimary, strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" })
              ),
              React.createElement("h4", { style: { fontSize: 18, fontWeight: 600, color: T.colorTextPrimary, margin: "0 0 8px" } }, "No suggestions for this account"),
              React.createElement("p", { style: { fontSize: 14, color: T.colorTextSecondary, margin: 0, maxWidth: 420, lineHeight: "22px" } }, "After analysing transactions, trends, balances and other activity, nothing unusual or missing was found.")
            ),

            // ── Suggestion cards ──
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20 } },
              (function() {
                return _plCards.map(function(card) {
                    var isResolved = resolvedCards.has(card.idx);
                    var isIgnored = ignoredCards.has(card.idx);
                    var actionLabel = cardActions[card.idx];
                    var statusLabel = isResolved ? (actionLabel || "Resolved") : isIgnored ? (actionLabel || "Ignored") : "Unresolved";
                    var statusStyle = isResolved ? { background: T.colorBrandLighter, border: "none", color: T.colorBrandPrimary } : isIgnored ? { background: T.colorButtonDisabled, border: "none", color: T.colorTextSecondary } : { background: T.colorWarningBg, border: "none", color: T.colorWarning };
                    return React.createElement("div", { key: card.key, style: { scrollMarginTop: 64 } },
                      React.createElement(RecommendationCard, {
                        title: card.title,
                        description: card.description,
                        statusLabel: statusLabel,
                        statusStyle: statusStyle,
                        collapsed: markedCompleted || isResolved || isIgnored,
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
                        primaryLabel: markedCompleted ? null : card.primaryLabel,
                        secondaryLabel: markedCompleted ? null : card.secondaryLabel,
                        onPrimaryAction: markedCompleted ? undefined : function() {},
                        onSecondaryAction: markedCompleted ? undefined : function() {
                          var idx = card.idx;
                          setResolvedCards(function(prev) { var n = new Set(prev); n.add(idx); return n; });
                          setCardActions(function(prev) { var o = Object.assign({}, prev); o[idx] = "Resolved"; return o; });
                        },
                        onIgnore: markedCompleted ? undefined : function() {
                          var idx = card.idx;
                          setIgnoredCards(function(prev) { var n = new Set(prev); n.add(idx); return n; });
                        },
                      })
                    );
                });
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

// Simulate completing a flow from outside (used by "Prepare all accounts")
window.PlCompleteFlow = function(code) {
  var cache = _plGetCache(code);
  if (cache.flowComplete) return; // already done
  cache.flowComplete = true;
  // Leave resolvedCards/ignoredCards/cardActions empty — user hasn't acted on suggestions yet
};

// Expose flow status for the P&L table WorkflowCard
// Returns { complete, totalSuggestions, unresolvedCount, updatedDate } or null
window.PlGetFlowStatus = function(code) {
  var cache = _plFlowCache[code];
  if (!cache || !cache.flowComplete) return null;
  var cards = PL_ACCOUNT_CARDS[code] || [];
  var total = cards.length;
  var handled = 0;
  cards.forEach(function(card) {
    if (cache.resolvedCards.has(card.idx) || cache.ignoredCards.has(card.idx)) handled++;
  });
  return { complete: true, markedCompleted: !!cache.markedCompleted, totalSuggestions: total, unresolvedCount: total - handled, hasSuggestions: total > 0, updatedDate: "5 May" };
};

})();
