// ── Profit & Loss page ───────────────────────────────────────────────────────
// Standalone review page for the P&L statement.
// Uses DS globals: T, TopBar, SecondaryButton, PrimaryButton, DataTable, Dropdown, Chevron

(function() {

// ── P&L Summary Text ────────────────────────────────────────────────────────
// Period: April 2026, Company: Seabrook Foods Ltd.
var PL_SUMMARY_TEXT = [
  "Revenue of £348,720.00 was up 3.4% on the prior month, driven by stronger wholesale sales (4000 – Sales at £312,450.00, +3.5%). Gross profit came in at £145,080.00, giving a gross margin of 41.6%. Cost of sales totalled £203,640.00 with most lines close to reference, though freight & carriage (5020) was 16.2% above last month following a carrier fuel surcharge increase effective 1 April.",
  "Operating expenses of £96,805.00 were 5.8% higher than the prior month, leaving EBIT at £48,275.00. The main drivers were a £4,400.00 increase in professional fees (6200) due to a year-end audit accrual, the annual pay review adding £1,900.00 to wages (7000), and a £1,850.00 variance in general expenses (6420) which appears to include miscodings from the Barclays card. A new £1,240.00 bad debt provision (8100) was posted against an overdue invoice from Greenway Catering. Depreciation and amortisation ran at the expected monthly charge with no variance.",
];

// ── Overall Performance Data ────────────────────────────────────────────────
// Revenue 348,720 | COGS 203,640 | Gross Profit 145,080 | OpEx 96,805 | EBIT 48,275
var PERFORMANCE_ROWS = [
  { label: "Revenue",                  actual: "£348,720.00", change: "+3.4%",   positive: true },
  { label: "Gross Profit",             actual: "£145,080.00", change: "+2.1%",   positive: true },
  { label: "Operating Expenses",       actual: "£96,805.00",  change: "+5.8%",   positive: null },
  { label: "Operating Profit (EBIT)",  actual: "£48,275.00",  change: "-1.6%",   positive: false },
];

// ── P&L Sections Data ───────────────────────────────────────────────────────
// Nominal codes follow standard Xero UK chart of accounts (4xxx revenue, 5xxx COGS, 6xxx–8xxx overheads)
// Account names are consistent with BS accounts (e.g. 2210 PAYE/NI ↔ 7002 Employer NI, 2230 Pensions ↔ 7003 Pension costs)
var PL_SECTIONS = [
  {
    heading: "Revenue",
    rows: [
      { code: "4000", account: "4000 – Sales",                       context: "Wholesale volumes up ahead of summer",       actual: "£312,450.00", ref: "£301,800.00", variance: "£10,650.00",  pctDiff: "+3.5%",  pctStatus: null },
      { code: "4010", account: "4010 – Online & direct sales",       context: "Consistent with recent trend",               actual: "£28,920.00",  ref: "£28,100.00",  variance: "£820.00",     pctDiff: "+2.9%",  pctStatus: null },
      { code: "4100", account: "4100 – Other income",                context: "Includes pallet return credits",              actual: "£5,400.00",   ref: "£4,250.00",   variance: "£1,150.00",   pctDiff: "+27.1%", pctStatus: null },
      { code: "4200", account: "4200 – Rental income",               context: "Sublease of warehouse unit B",                actual: "£1,950.00",   ref: "£1,950.00",   variance: "£0.00",       pctDiff: "0.0%",   pctStatus: null },
    ],
    footer: "Total Revenue: £348,720.00",
  },
  {
    heading: "Cost of Sales",
    rows: [
      { code: "5000", account: "5000 – Purchases – raw materials",   context: "Stable following supplier contract renewal",  actual: "£142,380.00", ref: "£138,900.00", variance: "£3,480.00",   pctDiff: "+2.5%",  pctStatus: null },
      { code: "5001", account: "5001 – Purchases – packaging",       context: "No big variances or suggestions",            actual: "£18,460.00",  ref: "£17,800.00",  variance: "£660.00",     pctDiff: "+3.7%",  pctStatus: null },
      { code: "5010", account: "5010 – Direct labour",               context: "Overtime hours slightly above budget",        actual: "£24,300.00",  ref: "£23,100.00",  variance: "£1,200.00",   pctDiff: "+5.2%",  pctStatus: null },
      { code: "5020", account: "5020 – Freight & carriage",          context: "Fuel surcharge increase from carrier",        actual: "£11,850.00",  ref: "£10,200.00",  variance: "£1,650.00",   pctDiff: "+16.2%", pctStatus: "review" },
      { code: "5030", account: "5030 – Stock adjustments",           context: "Ties to BS 1200 – Stock",                    actual: "£3,420.00",   ref: "£3,680.00",   variance: "-£260.00",    pctDiff: "-7.1%",  pctStatus: null },
      { code: "5040", account: "5040 – Production overheads",        context: "No big variances or suggestions",            actual: "£3,230.00",   ref: "£3,150.00",   variance: "£80.00",      pctDiff: "+2.5%",  pctStatus: null },
    ],
    footer: "Total Cost of Sales: £203,640.00  |  Gross Profit: £145,080.00",
  },
  {
    heading: "Operating Expenses",
    rows: [
      { code: "6000", account: "6000 – Rent",                        context: "Quarterly charge, consistent",                actual: "£8,500.00",   ref: "£8,500.00",   variance: "£0.00",       pctDiff: "0.0%",   pctStatus: null },
      { code: "6010", account: "6010 – Rates",                       context: "No big variances or suggestions",            actual: "£2,100.00",   ref: "£2,100.00",   variance: "£0.00",       pctDiff: "0.0%",   pctStatus: null },
      { code: "6020", account: "6020 – Light, heat & power",         context: "Seasonal decrease expected",                 actual: "£3,640.00",   ref: "£4,280.00",   variance: "-£640.00",    pctDiff: "-15.0%", pctStatus: null },
      { code: "6030", account: "6030 – Insurance",                   context: "Annual premium spread monthly",              actual: "£2,450.00",   ref: "£2,450.00",   variance: "£0.00",       pctDiff: "0.0%",   pctStatus: null },
      { code: "6040", account: "6040 – Repairs & maintenance",       context: "Includes planned conveyor belt service",     actual: "£4,120.00",   ref: "£2,800.00",   variance: "£1,320.00",   pctDiff: "+47.1%", pctStatus: null },
      { code: "6110", account: "6110 – Advertising & marketing",     context: "Summer campaign spend starting",             actual: "£3,200.00",   ref: "£2,600.00",   variance: "£600.00",     pctDiff: "+23.1%", pctStatus: null },
      { code: "6200", account: "6200 – Professional fees",           context: "Year-end audit accrual posted",              actual: "£6,800.00",   ref: "£2,400.00",   variance: "£4,400.00",   pctDiff: null,     pctStatus: "review" },
      { code: "6210", account: "6210 – Bank charges",                context: "Consistent with account activity",           actual: "£480.00",     ref: "£460.00",     variance: "£20.00",      pctDiff: "+4.3%",  pctStatus: null },
      { code: "6220", account: "6220 – Subscriptions",               context: "No big variances or suggestions",            actual: "£890.00",     ref: "£870.00",     variance: "£20.00",      pctDiff: "+2.3%",  pctStatus: null },
      { code: "6230", account: "6230 – Telephone & internet",        context: "No big variances or suggestions",            actual: "£720.00",     ref: "£710.00",     variance: "£10.00",      pctDiff: "+1.4%",  pctStatus: null },
      { code: "6250", account: "6250 – Travel & subsistence",        context: "Trade show travel included",                 actual: "£1,680.00",   ref: "£1,350.00",   variance: "£330.00",     pctDiff: "+24.4%", pctStatus: null },
      { code: "6310", account: "6310 – Motor expenses",              context: "Ties to BS 0040 – Motor vehicles",           actual: "£2,340.00",   ref: "£2,280.00",   variance: "£60.00",      pctDiff: "+2.6%",  pctStatus: null },
      { code: "6420", account: "6420 – General expenses",            context: "Includes possible Barclays card miscodings", actual: "£3,850.00",   ref: "£2,000.00",   variance: "£1,850.00",   pctDiff: "+92.5%", pctStatus: "review" },
      { code: "7000", account: "7000 – Wages & salaries",            context: "Annual pay review effective 1 Apr",          actual: "£32,400.00",  ref: "£30,500.00",  variance: "£1,900.00",   pctDiff: "+6.2%",  pctStatus: null },
      { code: "7002", account: "7002 – Employer NI",                 context: "Ties to BS 2210 – PAYE and NI",              actual: "£3,890.00",   ref: "£3,640.00",   variance: "£250.00",     pctDiff: "+6.9%",  pctStatus: null },
      { code: "7003", account: "7003 – Pension costs",               context: "Ties to BS 2230 – Pension contributions",    actual: "£2,160.00",   ref: "£2,020.00",   variance: "£140.00",     pctDiff: "+6.9%",  pctStatus: null },
      { code: "7010", account: "7010 – Directors' remuneration",     context: "No change from prior month",                 actual: "£8,333.00",   ref: "£8,333.00",   variance: "£0.00",       pctDiff: "0.0%",   pctStatus: null },
      { code: "8000", account: "8000 – Depreciation",                context: "Fixed monthly charge per FA register",       actual: "£6,012.00",   ref: "£6,012.00",   variance: "£0.00",       pctDiff: "0.0%",   pctStatus: null },
      { code: "8010", account: "8010 – Amortisation",                context: "Ties to BS 0050 – Goodwill",                 actual: "£2,000.00",   ref: "£2,000.00",   variance: "£0.00",       pctDiff: "0.0%",   pctStatus: null },
      { code: "8100", account: "8100 – Bad debts",                   context: "Provision increase for overdue debtor",      actual: "£1,240.00",   ref: "£0.00",       variance: "£1,240.00",   pctDiff: null,     pctStatus: "review" },
    ],
    footer: "Total Operating Expenses: £96,805.00  |  Operating Profit (EBIT): £48,275.00",
  },
];

// ── Suggested Adjustments Data (RecommendationCard format) ─────────────────
var PL_SUGGESTIONS = [
  { idx: 0, key: "audit_accrual", title: "Spread audit fee accrual across remaining months", contact: "Grant Thornton UK LLP", description: "The £4,800 Grant Thornton audit fee posted to 6200 – Professional fees in April relates to the full-year statutory audit. Only £400 should be recognised this month, with the remaining £4,400 deferred as an accrual on BS 2109 – Accruals. Prior year shows monthly accrual of £400.", tableRow: { "Debit account": "2109 – Accruals", "Credit account": "6200 – Professional fees", "Amount": "£4,400.00", "Period": "Apr 2026", "Reference": "ACR-PL01" }, primaryLabel: "Create accrual", secondaryLabel: "I have resolved this" },
  { idx: 1, key: "insurance_release", title: "Post missed April release for Zurich EL policy", contact: "Zurich Insurance plc", description: "The Zurich employers' liability policy prepayment (BS 1103 – Prepayments, £3,600 total) has been releasing £300/month since April 2026. The April release is scheduled on the prepayment register but has not been posted to 6030 – Insurance. This understates insurance expense for the period.", tableRow: { "Debit account": "6030 – Insurance", "Credit account": "1103 – Prepayments", "Amount": "£300.00", "Period": "Apr 2026", "Reference": "PRE-PL01" }, primaryLabel: "Post release", secondaryLabel: "I have resolved this" },
  { idx: 2, key: "freight_accrual", title: "Accrue DHL freight invoice received after period end", contact: "DHL Supply Chain", description: "A DHL invoice for £1,420.00 dated 28 April was received on 3 May, after the period-end cut-off. The charge relates to April deliveries and should be accrued to ensure 5020 – Freight & carriage reflects the full month. This partly explains the +16.2% variance flagged above.", tableRow: { "Debit account": "5020 – Freight & carriage", "Credit account": "2109 – Accruals", "Amount": "£1,420.00", "Period": "Apr 2026", "Reference": "ACR-PL02" }, primaryLabel: "Create accrual", secondaryLabel: "I have resolved this" },
  { idx: 3, key: "datto_prepayment", title: "Add Datto SaaS Protection to prepayment schedule", contact: "Datto SaaS Protection", description: "Invoice #DAT-8821 for £960.00 dated 25 March 2026 covers a 12-month backup licence from April 2026 to March 2027. The full amount was posted to 6220 – Subscriptions in March. £80 per month should be released, with the remaining £880.00 reclassified as a prepayment on BS 1103.", tableRow: { "Debit account": "1103 – Prepayments", "Credit account": "6220 – Subscriptions", "Amount": "£880.00", "Period": "11 months from May 26", "Reference": "PRE-PL02" }, primaryLabel: "Add to schedule", secondaryLabel: "I have resolved this" },
];

// ── Compare-to options ──────────────────────────────────────────────────────
var COMPARE_OPTIONS = [
  { value: "last_month", label: "Last month" },
  { value: "last_year",  label: "Same month last year" },
  { value: "budget",     label: "Budget" },
  { value: "avg_3m",     label: "3-month average" },
];


// ── Sparkle icon (for suggestions banner) ───────────────────────────────────
var SparkleIcon = function() {
  return React.createElement("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" },
    React.createElement("path", {
      d: "M10 1.5L11.5 7L17 8.5L11.5 10L10 15.5L8.5 10L3 8.5L8.5 7L10 1.5Z",
      fill: T.colorBrandPrimary, stroke: T.colorBrandPrimary, strokeWidth: 1.5,
      strokeLinejoin: "round", paintOrder: "stroke",
    })
  );
};


// ── PercentDiffCell — renders the % diff using DS StatusBadge ────────────────
// Swapped from hand-rolled badge → DS StatusBadge
// Verified: same visual variants (error for Review, neutral for normal %), no data flow changes
var PercentDiffCell = function(pctDiff, pctStatus) {
  if (pctStatus === "review") {
    return React.createElement(StatusBadge, { variant: "error", size: "mini" }, "Review");
  }
  if (!pctDiff) return "–";
  return React.createElement(StatusBadge, { variant: "neutral", size: "mini" }, pctDiff);
};


// ── Accounts with context available (~1/4 of 30 accounts) ─────────────────
var CONTEXT_AVAILABLE = { "4000": true, "5020": true, "5030": true, "6200": true, "6420": true, "7000": true, "8000": true, "8100": true };

// ── P&L Columns ─────────────────────────────────────────────────────────────
var PL_COLUMNS = [
  {
    key: "account",
    label: "Account",
    width: "minmax(320px, 1fr)",
    render: function(v, row) {
      var hasContext = CONTEXT_AVAILABLE[row.code];
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start" } },
        React.createElement("span", null, v),
        hasContext && React.createElement(StatusBadge, { variant: "success", size: "mini" },
          React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 3 } },
            React.createElement("svg", { width: 12, height: 12, viewBox: "0 0 20 20", fill: "none", style: { flexShrink: 0 } },
              React.createElement("path", {
                d: "M10 1.5L11.5 7L17 8.5L11.5 10L10 15.5L8.5 10L3 8.5L8.5 7L10 1.5Z",
                fill: T.colorSuccess, stroke: T.colorSuccess, strokeWidth: 1.5,
                strokeLinejoin: "round", paintOrder: "stroke",
              })
            ),
            "Context available"
          )
        )
      );
    },
  },
  { key: "actual",    label: "Actual (Apr)",    width: "150px", align: "right",
    render: function(v) { return React.createElement("span", { style: { fontWeight: T.fontWeightMedium } }, v); },
  },
  { key: "ref",       label: "Ref. (Mar)",      width: "140px", align: "right" },
  { key: "variance",  label: "Variance",       width: "140px", align: "right",
    render: function(v, row) {
      var displayVal = v;
      if (v && v !== "£0.00" && v.charAt(0) !== "-" && v.charAt(0) !== "+") {
        displayVal = "+" + v;
      }
      var showPct = row.pctDiff && row.pctDiff !== "0.0%";
      var badgeVariant = "neutral";
      if (showPct) {
        var pctNum = parseFloat(row.pctDiff.replace("+", "").replace("%", ""));
        var absPct = Math.abs(pctNum);
        if (absPct >= 15) badgeVariant = "error";
        else if (absPct >= 10) badgeVariant = "warning";
      }
      return React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 } },
        React.createElement("span", null, displayVal),
        showPct && React.createElement(StatusBadge, { variant: badgeVariant, size: "mini" }, row.pctDiff)
      );
    },
  },
];


// ── Transaction data per account ────────────────────────────────────────────
var PL_TRANSACTIONS = {
  // Revenue — food sales are zero-rated in the UK
  "4000": [
    { name: "Tesco Stores Ltd",          date: "02/04/2026", amount: "£84,200",  vat: "0%" },
    { name: "Sainsbury's Supermarkets",   date: "07/04/2026", amount: "£67,350",  vat: "0%" },
    { name: "Booker Wholesale",           date: "11/04/2026", amount: "£52,100",  vat: "0%" },
    { name: "Costco UK",                  date: "18/04/2026", amount: "£41,800",  vat: "0%" },
    { name: "Henderson Foodservice",      date: "22/04/2026", amount: "£38,500",  vat: "0%" },
    { name: "Brakes Group",              date: "28/04/2026", amount: "£28,500",  vat: "0%" },
  ],
  "4010": [
    { name: "Shopify Payments",           date: "05/04/2026", amount: "£12,400",  vat: "0%" },
    { name: "Amazon Marketplace",         date: "14/04/2026", amount: "£9,870",   vat: "0%" },
    { name: "Direct – seabrookfoods.co.uk", date: "21/04/2026", amount: "£6,650", vat: "0%" },
  ],
  "4100": [
    { name: "Chep UK Ltd",               date: "10/04/2026", amount: "£3,200",   vat: "20%" },
    { name: "Waste Management Solutions", date: "17/04/2026", amount: "£1,400",   vat: "20%" },
    { name: "Henderson Group",            date: "25/04/2026", amount: "£800",     vat: "0%" },
  ],
  "4200": [
    { name: "Bellway Properties Ltd",     date: "01/04/2026", amount: "£1,950",   vat: "No VAT" },
  ],
  // Cost of Sales — raw materials (food) zero-rated, packaging/services at 20%
  "5000": [
    { name: "ABP Food Group",            date: "03/04/2026", amount: "£38,200",  vat: "0%" },
    { name: "Moy Park Ltd",              date: "08/04/2026", amount: "£32,600",  vat: "0%" },
    { name: "Kerry Group plc",            date: "15/04/2026", amount: "£28,450",  vat: "0%" },
    { name: "Greencore Group",            date: "22/04/2026", amount: "£24,130",  vat: "0%" },
    { name: "Dawn Meats",                date: "28/04/2026", amount: "£19,000",  vat: "0%" },
  ],
  "5001": [
    { name: "DS Smith Packaging",         date: "06/04/2026", amount: "£9,800",   vat: "20%" },
    { name: "Smurfit Kappa UK",           date: "16/04/2026", amount: "£5,460",   vat: "20%" },
    { name: "Coveris Holdings",           date: "24/04/2026", amount: "£3,200",   vat: "20%" },
  ],
  "5010": [
    { name: "April payroll – production", date: "25/04/2026", amount: "£20,100",  vat: "No VAT" },
    { name: "Overtime – week 2",          date: "12/04/2026", amount: "£2,400",   vat: "No VAT" },
    { name: "Overtime – week 4",          date: "26/04/2026", amount: "£1,800",   vat: "No VAT" },
  ],
  "5020": [
    { name: "DHL Supply Chain",           date: "04/04/2026", amount: "£4,200",   vat: "20%" },
    { name: "XPO Logistics",              date: "14/04/2026", amount: "£3,850",   vat: "20%" },
    { name: "Wincanton plc",              date: "23/04/2026", amount: "£3,800",   vat: "20%" },
  ],
  "5030": [
    { name: "Stock write-off – expired",  date: "15/04/2026", amount: "£2,100",   vat: "No VAT" },
    { name: "Stock count adjustment",     date: "30/04/2026", amount: "£1,320",   vat: "No VAT" },
  ],
  "5040": [
    { name: "BOC Industrial Gases",       date: "10/04/2026", amount: "£1,850",   vat: "20%" },
    { name: "PPE & consumables",          date: "20/04/2026", amount: "£1,380",   vat: "20%" },
  ],
  // Operating Expenses
  "6000": [
    { name: "Peel Holdings Ltd",          date: "01/04/2026", amount: "£8,500",   vat: "No VAT" },
  ],
  "6010": [
    { name: "Salford City Council",       date: "01/04/2026", amount: "£2,100",   vat: "No VAT" },
  ],
  "6020": [
    { name: "British Gas Business",       date: "08/04/2026", amount: "£2,140",   vat: "5%" },
    { name: "EDF Energy",                 date: "08/04/2026", amount: "£1,500",   vat: "5%" },
  ],
  "6030": [
    { name: "Zurich Insurance plc",       date: "01/04/2026", amount: "£2,450",   vat: "No VAT" },
  ],
  "6040": [
    { name: "Arco Industrial Services",   date: "07/04/2026", amount: "£2,680",   vat: "20%" },
    { name: "Northern Refrigeration",     date: "18/04/2026", amount: "£940",     vat: "20%" },
    { name: "FastFix Electrical",         date: "25/04/2026", amount: "£500",     vat: "20%" },
  ],
  "6110": [
    { name: "Meta Platforms (Facebook)",   date: "05/04/2026", amount: "£1,400",   vat: "20%" },
    { name: "Google Ads",                 date: "12/04/2026", amount: "£1,100",   vat: "20%" },
    { name: "Print Solutions NW",         date: "20/04/2026", amount: "£700",     vat: "20%" },
  ],
  "6200": [
    { name: "Grant Thornton UK LLP",      date: "15/04/2026", amount: "£4,800",   vat: "20%" },
    { name: "Clifton & Harrow",           date: "15/04/2026", amount: "£2,000",   vat: "20%" },
  ],
  "6210": [
    { name: "Barclays Bank plc",          date: "30/04/2026", amount: "£320",     vat: "No VAT" },
    { name: "Stripe Payments",            date: "30/04/2026", amount: "£160",     vat: "No VAT" },
  ],
  "6220": [
    { name: "Xero Ltd",                   date: "01/04/2026", amount: "£420",     vat: "20%" },
    { name: "Microsoft 365",              date: "01/04/2026", amount: "£290",     vat: "20%" },
    { name: "Slack Technologies",         date: "01/04/2026", amount: "£180",     vat: "20%" },
  ],
  "6230": [
    { name: "BT Business",               date: "14/04/2026", amount: "£480",     vat: "20%" },
    { name: "Vodafone Business",          date: "14/04/2026", amount: "£240",     vat: "20%" },
  ],
  "6250": [
    { name: "Premier Inn",               date: "08/04/2026", amount: "£640",     vat: "20%" },
    { name: "Trainline",                  date: "07/04/2026", amount: "£420",     vat: "0%" },
    { name: "Misc expenses – S. Clarke",  date: "22/04/2026", amount: "£380",     vat: "20%" },
    { name: "Uber / taxi receipts",       date: "24/04/2026", amount: "£240",     vat: "20%" },
  ],
  "6310": [
    { name: "BP Fleet Card",             date: "30/04/2026", amount: "£1,240",   vat: "20%" },
    { name: "ATS Euromaster",            date: "12/04/2026", amount: "£680",     vat: "20%" },
    { name: "RAC Business",              date: "01/04/2026", amount: "£420",     vat: "No VAT" },
  ],
  "6420": [
    { name: "Barclays Card – unallocated", date: "30/04/2026", amount: "£1,850",  vat: "20%" },
    { name: "Amazon Business",            date: "14/04/2026", amount: "£1,200",   vat: "20%" },
    { name: "Miscellaneous – petty cash", date: "28/04/2026", amount: "£800",     vat: "No VAT" },
  ],
  // Payroll & staff — exempt from VAT
  "7000": [
    { name: "April payroll – office",     date: "25/04/2026", amount: "£32,400",  vat: "No VAT" },
  ],
  "7002": [
    { name: "HMRC – Employer NI",         date: "22/04/2026", amount: "£3,890",   vat: "No VAT" },
  ],
  "7003": [
    { name: "Aviva Workplace Pension",    date: "25/04/2026", amount: "£2,160",   vat: "No VAT" },
  ],
  "7010": [
    { name: "Director salary – M. Seabrook", date: "25/04/2026", amount: "£8,333", vat: "No VAT" },
  ],
  // Depreciation & amortisation — no VAT (internal journals)
  "8000": [
    { name: "Monthly depreciation charge", date: "30/04/2026", amount: "£6,012",  vat: "No VAT" },
  ],
  "8010": [
    { name: "Monthly amortisation charge", date: "30/04/2026", amount: "£2,000",  vat: "No VAT" },
  ],
  "8100": [
    { name: "Bad debt provision – Carter & Sons", date: "30/04/2026", amount: "£1,240", vat: "No VAT" },
  ],
};

// ── Context analysis per account (only for CONTEXT_AVAILABLE accounts) ──────
var PL_CONTEXT = {
  "4000": {
    title: "Wholesale Volumes Trending Up",
    text: "Revenue of £312,450 is 3.5% above March, driven by increased wholesale orders ahead of the summer season. Tesco and Sainsbury's accounted for nearly half of total sales. This is consistent with the seasonal pattern seen in prior years and no adjustments are needed.",
  },
  "5020": {
    title: "Fuel Surcharge Driving Freight Increase",
    text: "Freight costs rose 16.2% month-on-month to £11,850, primarily due to a fuel surcharge increase from XPO Logistics. The surcharge was applied mid-month and affects all outbound deliveries. Consider reviewing the carrier contract terms ahead of renewal in Q3.",
  },
  "5030": {
    title: "Stock Write-Off Within Normal Range",
    text: "Stock adjustments of £3,420 are down 7.1% from March, reflecting fewer expired items this period. The write-off of £2,100 relates to short-dated product pulled from the chilled warehouse. This ties to the BS 1200 stock balance and no further action is required.",
  },
  "6200": {
    title: "Year-End Audit Accrual Posted",
    text: "Professional fees jumped to £6,800 from £2,400 in March due to a £4,800 audit fee accrual from Grant Thornton. The monthly retainer to Clifton & Harrow remains unchanged at £2,000. The audit accrual should be reviewed to confirm it aligns with the engagement letter.",
  },
  "6420": {
    title: "Barclays Card Miscodings Suspected",
    text: "General expenses increased 92.5% to £3,850, flagged for review. £1,850 of unallocated Barclays card transactions appear to include personal purchases that may need reclassifying. The remaining £2,000 covers Amazon Business supplies and petty cash, both within expected ranges.",
  },
  "7000": {
    title: "Pay Review Uplift Now Reflected",
    text: "Wages increased 6.2% to £32,400 following the annual pay review effective 1 April. The increase is in line with the 6% average uplift approved by the board. No further variance is expected in coming months unless headcount changes.",
  },
  "8000": {
    title: "Depreciation Charge Unchanged",
    text: "The monthly depreciation charge of £6,012 is unchanged from prior months and matches the fixed asset register schedule. No new capital additions or disposals occurred in April. This ties to BS accounts 0020–0040.",
  },
  "8100": {
    title: "New Bad Debt Provision Required",
    text: "A provision of £1,240 has been raised against Carter & Sons, whose invoice is now 120 days overdue with no response to collection attempts. This is the first bad debt provision in the current year. Consider escalating to the credit control team for formal write-off approval.",
  },
};

// ── Comment icon SVG (inline) ───────────────────────────────────────────────
var CommentIconSvg = function() {
  return React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none" },
    React.createElement("path", {
      d: "M14 7.66669C14.0023 8.5466 13.7967 9.41461 13.4 10.2C12.9296 11.1412 12.2065 11.9328 11.3116 12.4862C10.4168 13.0396 9.3855 13.3329 8.33337 13.3334C7.45346 13.3356 6.58545 13.1301 5.80004 12.7334L2 14L3.26667 10.2C2.86995 9.41461 2.66441 8.5466 2.66671 7.66669C2.66714 6.61456 2.96041 5.58325 3.51385 4.6884C4.06729 3.79355 4.85893 3.07041 5.80004 2.60002C6.58545 2.2033 7.45346 1.99776 8.33337 2.00002H8.66671C10.0562 2.07668 11.3687 2.66319 12.3528 3.64726C13.3368 4.63132 13.9234 5.94388 14 7.33335V7.66669Z",
      stroke: "#080908", strokeWidth: 1.25, strokeLinecap: "round", strokeLinejoin: "round",
    })
  );
};

// ── Expanded Row Content (P&L) ──────────────────────────────────────────────
var PLExpandedRow = function(props) {
  var row = props.row;
  var comments = props.comments || [];
  var onAddComment = props.onAddComment;
  var reviewData = props.reviewData;
  var onToggleReview = props.onToggleReview;
  var isReviewed = reviewData && reviewData.status === "Reviewed";
  var txns = PL_TRANSACTIONS[row.code] || [];
  var hasContext = CONTEXT_AVAILABLE[row.code];
  var contextData = PL_CONTEXT[row.code];
  // Deterministic "total" based on code digits — always more than shown highlights
  var codeNum = parseInt(row.code, 10) || 0;
  var totalCount = txns.length + (codeNum % 7) + 5;
  var colTemplate = "minmax(200px, 2fr) minmax(100px, 1fr) minmax(100px, 1fr)";
  var borderDark = "1px solid " + T.colorBorderDark;

  var _composing = useState(false);
  var composing = _composing[0];
  var setComposing = _composing[1];
  var _commentText = useState("");
  var commentText = _commentText[0];
  var setCommentText = _commentText[1];

  var handleSubmit = function() {
    if (!commentText.trim()) return;
    if (onAddComment) onAddComment(row.code, commentText.trim());
    setCommentText("");
    setComposing(false);
  };

  var handleCancel = function() {
    setCommentText("");
    setComposing(false);
  };

  var secondaryBtnStyle = {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "8px 14px", borderRadius: T.radius8,
    border: borderDark, background: T.colorSurfacePrimary, cursor: "pointer",
    ...T.textSm, fontWeight: T.fontWeightMedium, color: T.colorTextPrimary,
    fontFamily: T.fontFamily,
  };

  // Review toggle element (reused in comment section)
  var reviewToggle = React.createElement("div", {
    style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 },
  },
    React.createElement("div", {
      onClick: function() { if (onToggleReview) onToggleReview(row.code); },
      style: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" },
    },
      React.createElement("span", { style: { ...T.textSm, fontWeight: T.fontWeightMedium, color: T.colorTextPrimary } },
        isReviewed ? "Marked as reviewed" : "Mark as reviewed"
      ),
      React.createElement("div", {
        style: {
          width: 44, height: 24, borderRadius: 12,
          background: isReviewed ? T.colorBrandPrimary : T.colorBorderDark,
          position: "relative", transition: "background 0.2s ease", flexShrink: 0,
        },
      },
        React.createElement("div", {
          style: {
            width: 20, height: 20, borderRadius: "50%", background: T.colorSurfacePrimary,
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
            position: "absolute", top: 2,
            left: isReviewed ? 22 : 2,
            transition: "left 0.2s ease",
          },
        })
      )
    ),
    isReviewed && reviewData && React.createElement("span", {
      style: { ...T.textSm, color: T.colorTextSecondary },
    }, reviewData.reviewer + ", " + reviewData.date)
  );

  // ── Shared comment section (used in both context and non-context boxes) ──
  var commentSection = React.createElement(React.Fragment, null,
    // Existing comments
    comments.length > 0 && React.createElement("div", {
      style: { display: "flex", flexDirection: "column", gap: T.space5, marginBottom: T.space5 },
    },
      comments.map(function(c, ci) {
        return React.createElement("div", { key: ci, style: { display: "flex", flexDirection: "column", gap: 4 } },
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
            React.createElement("div", {
              style: {
                width: 24, height: 24, borderRadius: "50%", background: T.colorBorderDark,
                display: "flex", alignItems: "center", justifyContent: "center",
                ...T.textXs, fontWeight: T.fontWeightSemibold, color: T.colorTextThird, flexShrink: 0,
              },
            }, c.user.split(" ").map(function(n) { return n[0]; }).join("")),
            React.createElement("span", { style: { fontSize: 13, fontWeight: T.fontWeightSemibold, color: T.colorTextPrimary } }, c.user),
            React.createElement("span", { style: { fontSize: 13, color: T.colorTextSecondary } }, c.timestamp)
          ),
          React.createElement("p", { style: { ...T.textSm, color: T.colorTextPrimary, lineHeight: "22px", margin: 0, paddingLeft: 32 } }, c.text)
        );
      })
    ),

    // Compose / Add comment + review toggle
    composing
      ? React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: T.space4 } },
          React.createElement("textarea", {
            autoFocus: true,
            value: commentText,
            onChange: function(e) { setCommentText(e.target.value); },
            placeholder: "Write a comment...",
            style: {
              width: "100%", minHeight: 80, padding: "10px 12px",
              borderRadius: T.radius8, border: borderDark,
              ...T.textSm, fontFamily: T.fontFamily, lineHeight: "22px",
              color: T.colorTextPrimary, resize: "vertical", outline: "none",
              boxSizing: "border-box",
            },
            onFocus: function(e) { e.target.style.borderColor = T.colorBorderHover; },
            onBlur: function(e) { e.target.style.borderColor = T.colorBorderDark; },
          }),
          React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
            React.createElement("div", { style: { display: "flex", gap: 8 } },
              React.createElement("button", {
                onClick: handleSubmit,
                style: {
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 14px", borderRadius: T.radius8,
                  border: "1px solid " + T.colorBrandPrimary, background: T.colorBrandPrimary, cursor: "pointer",
                  ...T.textSm, fontWeight: T.fontWeightMedium, color: T.colorTextLight,
                  fontFamily: T.fontFamily,
                  opacity: commentText.trim() ? 1 : 0.4,
                },
                onMouseEnter: function(e) { if (commentText.trim()) { e.currentTarget.style.background = T.colorBrandPrimaryHover; } },
                onMouseLeave: function(e) { e.currentTarget.style.background = T.colorBrandPrimary; },
              }, "Add comment"),
              React.createElement("button", {
                onClick: handleCancel,
                style: secondaryBtnStyle,
                onMouseEnter: function(e) { e.currentTarget.style.borderColor = T.colorBorderHover; e.currentTarget.style.background = T.colorSurfaceSecondary; },
                onMouseLeave: function(e) { e.currentTarget.style.borderColor = T.colorBorderDark; e.currentTarget.style.background = T.colorSurfacePrimary; },
              }, "Cancel")
            ),
            reviewToggle
          )
        )
      : React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
          React.createElement("button", {
            onClick: function() { setComposing(true); },
            style: secondaryBtnStyle,
            onMouseEnter: function(e) { e.currentTarget.style.borderColor = T.colorBorderHover; e.currentTarget.style.background = T.colorSurfaceSecondary; },
            onMouseLeave: function(e) { e.currentTarget.style.borderColor = T.colorBorderDark; e.currentTarget.style.background = T.colorSurfacePrimary; },
          },
            React.createElement(CommentIconSvg),
            "Add comment"
          ),
          reviewToggle
        )
  );

  return React.createElement("div", {
    style: { display: "flex", flexDirection: "column", gap: T.space7 },
  },

    // ── Context box (only for accounts with context) ──
    hasContext && contextData && React.createElement("div", {
      style: {
        background: T.colorSurfacePrimary, borderRadius: T.radius8, border: borderDark,
        padding: T.space7, display: "flex", flexDirection: "column", gap: 0,
      },
    },
      // Context badge
      React.createElement("div", { style: { marginBottom: T.space4, alignSelf: "flex-start" } },
        React.createElement(StatusBadge, { variant: "success", size: "mini" },
          React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 3 } },
            React.createElement("svg", { width: 12, height: 12, viewBox: "0 0 20 20", fill: "none", style: { flexShrink: 0 } },
              React.createElement("path", {
                d: "M10 1.5L11.5 7L17 8.5L11.5 10L10 15.5L8.5 10L3 8.5L8.5 7L10 1.5Z",
                fill: T.colorSuccess, stroke: T.colorSuccess, strokeWidth: 1.5,
                strokeLinejoin: "round", paintOrder: "stroke",
              })
            ),
            "Context"
          )
        )
      ),
      // Title
      React.createElement("div", {
        style: { ...T.textMd, fontWeight: T.fontWeightSemibold, color: T.colorTextPrimary, marginBottom: T.space3 },
      }, contextData.title),
      // Analysis text
      React.createElement("p", {
        style: { ...T.textSm, color: T.colorTextPrimary, lineHeight: "22px", margin: 0 },
      }, contextData.text),

      // Divider
      React.createElement("div", { style: { height: 1, background: T.colorBorderDark, marginTop: T.space7, marginBottom: T.space7 } }),

      // Comments
      commentSection
    ),

    // ── Comment box for rows WITHOUT context ──
    !hasContext && React.createElement("div", {
      style: {
        background: T.colorSurfacePrimary, borderRadius: T.radius8, border: borderDark,
        padding: T.space7, display: "flex", flexDirection: "column", gap: 0,
      },
    }, commentSection),

    // ── Highlights title ──
    React.createElement("span", {
      style: { ...T.textSm, fontWeight: T.fontWeightSemibold, color: T.colorTextPrimary },
    }, "Highlights"),

    // ── Mini table (no extra card wrapper) ──
    React.createElement("div", {
      style: { border: borderDark, borderRadius: T.radius8, overflow: "hidden" },
    },
      // Header
      React.createElement("div", {
        style: { display: "grid", gridTemplateColumns: colTemplate, background: T.colorSurfacePrimary },
      },
        React.createElement("span", { style: { padding: "10px 16px", ...T.textSm, fontWeight: T.fontWeightMedium, color: T.colorTextSecondary, borderBottom: borderDark, borderRight: borderDark } }, "Description"),
        React.createElement("span", { style: { padding: "10px 16px", ...T.textSm, fontWeight: T.fontWeightMedium, color: T.colorTextSecondary, borderBottom: borderDark, borderRight: borderDark, textAlign: "right" } }, "Amount"),
        React.createElement("span", { style: { padding: "10px 16px", ...T.textSm, fontWeight: T.fontWeightMedium, color: T.colorTextSecondary, borderBottom: borderDark } }, "VAT")
      ),

      // Rows
      txns.map(function(tx, i) {
        return React.createElement("div", {
          key: i,
          style: {
            display: "grid", gridTemplateColumns: colTemplate,
            background: i % 2 === 0 ? T.colorSurfaceSecondary : T.colorSurfacePrimary,
            borderBottom: i < txns.length - 1 ? borderDark : "none",
          },
        },
          // Name + date
          React.createElement("span", {
            style: { padding: "14px 16px", borderRight: borderDark, display: "flex", flexDirection: "column", gap: 2 },
          },
            React.createElement("span", { style: { ...T.textSm, fontWeight: T.fontWeightMedium, color: T.colorTextPrimary } }, tx.name),
            React.createElement("span", { style: { ...T.textXs, color: T.colorTextSecondary } }, tx.date)
          ),
          // Amount
          React.createElement("span", {
            style: { padding: "14px 16px", ...T.textSm, color: T.colorTextPrimary, textAlign: "right", borderRight: borderDark, display: "flex", alignItems: "center", justifyContent: "flex-end" },
          }, tx.amount),
          // VAT
          React.createElement("span", {
            style: { padding: "14px 16px", ...T.textSm, color: T.colorTextPrimary, display: "flex", alignItems: "center" },
          }, tx.vat)
        );
      })
    ),

    // ── "Show all Journal entries" button ──
    React.createElement("div", { style: { display: "flex", justifyContent: "center" } },
      React.createElement("button", {
        style: {
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "8px 16px", borderRadius: T.radius8,
          border: borderDark, background: T.colorSurfacePrimary, cursor: "pointer",
          ...T.textSm, fontWeight: T.fontWeightMedium, color: T.colorTextPrimary,
          fontFamily: T.fontFamily,
        },
        onMouseEnter: function(e) { e.currentTarget.style.background = T.colorSurfaceSecondary; },
        onMouseLeave: function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; },
      }, "Show all Journal entries (" + totalCount + ")")
    )
  );
};


// ── Main ProfitAndLossPage Component ────────────────────────────────────────
function ProfitAndLossPage(props) {
  var ctx = props.ctx;

  // Local UI state
  var _compareTo = useState("last_month");
  var compareTo = _compareTo[0];
  var setCompareTo = _compareTo[1];

  var _resolvedSug = useState(function() { return new Set(); });
  var resolvedSug = _resolvedSug[0];
  var setResolvedSug = _resolvedSug[1];

  var _ignoredSug = useState(function() { return new Set(); });
  var ignoredSug = _ignoredSug[0];
  var setIgnoredSug = _ignoredSug[1];

  var _sugActions = useState(function() { return {}; });
  var sugActions = _sugActions[0];
  var setSugActions = _sugActions[1];

  // Review statuses per account: { [code]: { status, reviewer, date } }
  var _plReviewStatuses = useState(function() { return {}; });
  var plReviewStatuses = _plReviewStatuses[0];
  var setPlReviewStatuses = _plReviewStatuses[1];

  var handleTogglePlReview = function(code) {
    setPlReviewStatuses(function(prev) {
      var current = prev[code];
      if (current && current.status === "Reviewed") {
        var next = Object.assign({}, prev);
        delete next[code];
        return next;
      }
      var now = new Date();
      var day = now.getDate();
      var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      var dateStr = day + " " + monthNames[now.getMonth()] + " " + now.getFullYear();
      var next = Object.assign({}, prev);
      next[code] = { status: "Reviewed", reviewer: "Laura Bennett", date: dateStr };
      return next;
    });
  };

  var resolveSuggestion = function(key, actionLabel) {
    setResolvedSug(function(prev) {
      var next = new Set(prev);
      next.add(key);
      return next;
    });
    if (actionLabel) {
      setSugActions(function(prev) { var o = Object.assign({}, prev); o[key] = actionLabel; return o; });
    }
  };

  var ignoreSuggestion = function(key) {
    setIgnoredSug(function(prev) {
      var next = new Set(prev);
      next.add(key);
      return next;
    });
  };

  // Build columns with review column that has access to component state
  var plColumns = PL_COLUMNS.concat([{
    key: "pctDiff",
    label: "Review",
    width: "120px",
    render: function(v, row) {
      // If toggled as reviewed, show green badge
      var rd = plReviewStatuses[row.code];
      if (rd && rd.status === "Reviewed") {
        return React.createElement(StatusBadge, { variant: "success", size: "mini" }, "Reviewed");
      }
      // Check pctStatus flag (for accounts with null pctDiff but flagged for review)
      if (row.pctStatus === "review") {
        return React.createElement(StatusBadge, { variant: "error", size: "mini" }, "Review");
      }
      var pctStr = row.pctDiff;
      if (!pctStr || pctStr === "0.0%") {
        return React.createElement(StatusBadge, { variant: "neutral", size: "mini" }, "Not reviewed");
      }
      var num = parseFloat(pctStr.replace("+", "").replace("%", ""));
      var absNum = Math.abs(num);
      if (absNum >= 15) {
        return React.createElement(StatusBadge, { variant: "error", size: "mini" }, "Review");
      }
      return React.createElement(StatusBadge, { variant: "neutral", size: "mini" }, "Not reviewed");
    },
  }]);

  var sugCount = PL_SUGGESTIONS.filter(function(s) { return !resolvedSug.has(s.key) && !ignoredSug.has(s.key); }).length;


  return React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" } },
    React.createElement(TopBar, null),
    React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "32px 48px 48px", display: "flex", flexDirection: "column", gap: 0 } },

      // ── Page header ──────────────────────────────────────────────────────
      React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
          React.createElement("h1", { style: { fontSize: 32, fontWeight: 500, color: T.colorTextPrimary, lineHeight: "40px", letterSpacing: "-1px", margin: 0 } }, "Profit and Loss"),
          React.createElement(StatusBadge, { variant: "success" }, "Started by Mark Smith")
        ),
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
          React.createElement(PrimaryButton, { style: { height: 40, padding: "0 16px" } }, "Mark as prepared"),
          React.createElement(SecondaryButton, { style: { height: 40, boxSizing: "border-box", padding: "0 16px", display: "inline-flex", alignItems: "center", gap: 6 } },
            React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none" },
              React.createElement("path", { d: "M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10M4.66667 6.66667L8 10M8 10L11.3333 6.66667M8 10V2", stroke: "#545453", strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round" })
            ),
            "Export"
          )
        )
      ),
      // Entries synced subtitle
      React.createElement("div", { style: { textAlign: "right", fontSize: 12, color: T.colorTextSecondary, marginTop: 4 } },
        "Entries synced: 11 Dec 2025, 20:34:40"
      ),

      // ── Summary + Overall Performance cards ──────────────────────────────
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 32, alignItems: "start" } },

        // Summary card
        React.createElement("div", { style: {
          background: T.colorSurfacePrimary, border: "1px solid " + T.colorBorderDark, borderRadius: 12,
          padding: "16px", display: "flex", flexDirection: "column", gap: 16,
        } },
          React.createElement("h2", { style: { fontSize: 18, fontWeight: 500, color: T.colorTextPrimary, margin: 0 } }, "Summary"),
          PL_SUMMARY_TEXT.map(function(para, i) {
            return React.createElement("p", { key: i, style: { fontSize: 14, lineHeight: "22px", color: T.colorTextThird, margin: 0 } }, para);
          })
        ),

        // Overall Performance card
        React.createElement("div", { style: {
          background: T.colorSurfacePrimary, border: "1px solid " + T.colorBorderDark, borderRadius: 12,
          padding: "16px", display: "flex", flexDirection: "column", gap: 0,
        } },
          // Card header
          React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, padding: "0" } },
            React.createElement("h2", { style: { fontSize: 18, fontWeight: 500, color: T.colorTextPrimary, margin: 0 } }, "Overall Performance"),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
              React.createElement("span", { style: { fontSize: 13, color: T.colorTextSecondary } }, "Compare to"),
              React.createElement(Dropdown, {
                value: compareTo,
                onChange: setCompareTo,
                options: COMPARE_OPTIONS,
                width: 150,
                size: "sm",
              })
            )
          ),
          // Column headers
          React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 0, padding: "0 12px 8px" } },
            React.createElement("span", { style: { width: 120, textAlign: "right", fontSize: 12, fontWeight: 500, color: T.colorTextSecondary } }, "Actual (Apr)"),
            React.createElement("span", { style: { width: 100, textAlign: "right", fontSize: 12, fontWeight: 500, color: T.colorTextSecondary } }, "vs. Last month")
          ),
          // Performance rows
          PERFORMANCE_ROWS.map(function(row, i) {
            var isZebra = i % 2 === 0;
            return React.createElement("div", {
              key: row.label,
              style: {
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 12px",
                background: isZebra ? T.colorSurfaceSecondary : T.colorSurfacePrimary,
                borderRadius: 6,
              },
            },
              React.createElement("span", { style: { fontSize: 14, fontWeight: 500, color: T.colorTextPrimary } }, row.label),
              React.createElement("div", { style: { display: "flex", gap: 0 } },
                React.createElement("span", { style: { width: 120, textAlign: "right", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary } }, row.actual),
                React.createElement("span", { style: {
                  width: 100, textAlign: "right", fontSize: 14, fontWeight: 500,
                  color: T.colorTextPrimary,
                } }, row.change)
              )
            );
          })
        )
      ),

      // ── Suggestions accordion (DS Accordion + RecommendationCard) ──────
      PL_SUGGESTIONS.length > 0 && React.createElement("div", { style: { marginTop: 20 } },
        React.createElement(Accordion, {
          title: sugCount > 0
            ? sugCount + " suggested adjustment" + (sugCount !== 1 ? "s" : "")
            : "All suggestions resolved",
          icon: React.createElement(SparkleIcon, null),
          defaultExpanded: false,
        },
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12, paddingTop: 4 } },
            PL_SUGGESTIONS.map(function(sug) {
              var isRes = resolvedSug.has(sug.key);
              var isIgn = ignoredSug.has(sug.key);
              var primaryActionLabels = { "Create accrual": "Accrual created", "Post release": "Release posted", "Add to schedule": "Added to schedule" };
              var statusLabel = isRes ? (sugActions[sug.key] || "Resolved") : isIgn ? "Resolved" : "Unresolved";
              var statusStyle = isRes ? { background: T.colorBrandLighter, border: "none", color: T.colorBrandPrimary } : isIgn ? { background: T.colorButtonDisabled, border: "none", color: T.colorTextSecondary } : { background: T.colorWarningBg, border: "none", color: T.colorWarning };
              return React.createElement(RecommendationCard, {
                key: sug.key,
                title: sug.title,
                description: sug.description,
                statusLabel: statusLabel,
                statusStyle: statusStyle,
                collapsed: isRes || isIgn,
                isIgnored: isIgn,
                tableRow: sug.tableRow,
                verticalTable: true,
                primaryLabel: sug.primaryLabel,
                secondaryLabel: sug.secondaryLabel,
                hideMore: true,
                onPrimaryAction: function() { resolveSuggestion(sug.key, primaryActionLabels[sug.primaryLabel] || "Resolved"); },
                onSecondaryAction: function() { resolveSuggestion(sug.key, "Resolved"); },
                onIgnore: function() { ignoreSuggestion(sug.key); },
              });
            })
          )
        )
      ),

      // ── P&L Data Sections ────────────────────────────────────────────────
      PL_SECTIONS.map(function(section, si) {
        return React.createElement("div", { key: si, style: { display: "flex", flexDirection: "column", gap: 0, marginTop: si === 0 ? 28 : 32 } },
          React.createElement("h3", { style: { fontSize: 18, fontWeight: 500, color: T.colorTextPrimary, margin: "0 0 12px" } }, section.heading),
          React.createElement(DataTable, {
            columns: plColumns,
            rows: section.rows,
            footerLabel: section.footer,
            showExpandColumn: true,
            renderExpanded: function(row) {
              var rc = ctx.store.rowComments || {};
              return React.createElement(PLExpandedRow, {
                row: row,
                comments: rc[row.code] || [],
                onAddComment: function(code, text) { ctx.dispatch({ type: "ADD_COMMENT", accountCode: code, text: text }); },
                reviewData: plReviewStatuses[row.code],
                onToggleReview: handleTogglePlReview,
              });
            },
            showCommentColumn: true,
            rowComments: ctx.store.rowComments || {},
            minWidth: 1000,
          })
        );
      }),

      // Bottom spacing
      React.createElement("div", { style: { height: 48 } })
    )
  );
}

registerPage("Profit and Loss", {
  render: ProfitAndLossPage,
  keepAlive: true,
});

})();
