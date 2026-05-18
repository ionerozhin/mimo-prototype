// ── Balance Sheet (migrated from BS lite source — original logic preserved) ──
(function() {

// Bank account codes — accounts that are reconciled via bank reconciliation
var BANK_ACCOUNT_CODES_SET = new Set(["1210", "1211", "1212", "1213", "1250", "1251"]);


// ── Balance Sheet: ExpandedRowContent ────────────────────────────────────────
function ExpandedRowContent({ row, comments = [], onAddComment, reviewData, onToggleReview }) {
  var isReviewed = reviewData && reviewData.status === "Reviewed";
  const [composing, setComposing] = useState(false);
  const [commentText, setCommentText] = useState("");
  const hasContext = row.reconciled && row.contextText;
  const showSource = row.reconciled;
  const dividerStyle = { height: 1, background: T.colorBorderDark, margin: 0 };
  const headers = ["Balance per Xero", "Balance per source", "Variance", "Suggestions", "Status"];
  const colTemplate = "minmax(120px,1fr) minmax(130px,1fr) minmax(80px,1fr) minmax(100px,1fr) 160px";

  const handleSubmit = () => {
    if (!commentText.trim()) return;
    onAddComment(row.code, commentText.trim());
    setCommentText("");
    setComposing(false);
  };

  const handleCancel = () => {
    setCommentText("");
    setComposing(false);
  };

  // Secondary button style (matches the "Add comment" trigger button)
  const secondaryBtnStyle = {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "8px 14px", borderRadius: 8,
    border: `1px solid ${T.colorBorderDark}`, background: T.colorSurfacePrimary, cursor: "pointer",
    fontSize: 14, fontWeight: 500, color: T.colorTextPrimary,
  };

  return (
    <div style={{
      background: T.colorSurfacePrimary, borderRadius: 8, border: `1px solid ${T.colorBorderDark}`,
      padding: 24, display: "flex", flexDirection: "column", gap: 0,
    }}>
      {/* 1. Context text – only when reconciliation has been executed */}
      {hasContext && (
        <>
          <p style={{ fontSize: 14, lineHeight: "22px", color: T.colorTextPrimary, margin: 0 }}>
            {row.contextText}
          </p>
          <div style={{ ...dividerStyle, marginTop: 24, marginBottom: 24 }} />
        </>
      )}

      {/* 2. Reconciliation summary */}
      {row.reconciled && BANK_ACCOUNT_CODES_SET.has(row.code) ? (() => {
        const bankHeaders = ["GL balance", "Feed balance", "Suggestions", "Status"];
        const bankColTemplate = "minmax(100px,1fr) minmax(100px,1fr) minmax(100px,1fr) 160px";
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: T.colorTextPrimary }}>Bank reconciliation</span>
            <div style={{ border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, overflowX: "auto", overflowY: "hidden" }}>
              <div style={{ minWidth: 500 }}>
              <div style={{ display: "grid", gridTemplateColumns: bankColTemplate }}>
                {bankHeaders.map(function(h, i) {
                  return (
                    <span key={h} style={{
                      padding: "10px 16px",
                      fontSize: 14, fontWeight: 500, color: T.colorTextSecondary,
                      borderBottom: `1px solid ${T.colorBorderDark}`,
                      borderRight: i < bankHeaders.length - 1 ? `1px solid ${T.colorBorderDark}` : "none",
                      textAlign: h === "Status" ? "left" : "right",
                    }}>{h}</span>
                  );
                })}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: bankColTemplate }}>
                <span style={{ padding: "14px 16px", fontSize: 14, color: T.colorTextPrimary, textAlign: "right", borderRight: `1px solid ${T.colorBorderDark}` }}>{row.xeroBalance || "—"}</span>
                <span style={{ padding: "14px 16px", fontSize: 14, color: T.colorTextPrimary, textAlign: "right", borderRight: `1px solid ${T.colorBorderDark}` }}>{row.sourceBalance || "—"}</span>
                <span style={{ padding: "14px 16px", fontSize: 14, color: T.colorTextSecondary, textAlign: "right", borderRight: `1px solid ${T.colorBorderDark}` }}>{row.suggestions != null ? row.suggestions : "—"}</span>
                <span style={{ padding: "14px 16px", display: "flex", alignItems: "center" }}>
                  <StatusBadge status={row.status === "Suggestions" && row.suggestions != null ? (row.suggestions + (row.suggestions === 1 ? " suggestion" : " suggestions")) : (row.status || "Not started")} />
                </span>
              </div>
              </div>
            </div>
          </div>
        );
      })() : row.reconciled && DLA_ACCOUNT_CODES.has(row.code) ? (() => {
        const dlaHeaders = ["Opening balance (1 Apr 2025)", "Movement in year", "Closing balance (31 Mar 2026)", "Status"];
        const dlaColTemplate = "1fr 0.9fr 1fr 160px";
        const dlaRow = DLA_OVERVIEW_ROWS.find(r => !r.isSummary && r.account.startsWith(row.code));
        if (!dlaRow) return null;
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: T.colorTextPrimary }}>Reconciliation</span>
            <div style={{ border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: dlaColTemplate }}>
                {dlaHeaders.map((h, i) => (
                  <span key={h} style={{
                    padding: "10px 16px",
                    fontSize: 14, fontWeight: 500, color: T.colorTextSecondary,
                    borderBottom: `1px solid ${T.colorBorderDark}`,
                    borderRight: i < dlaHeaders.length - 1 ? `1px solid ${T.colorBorderDark}` : "none",
                    textAlign: h === "Status" ? "left" : "right",
                  }}>{h}</span>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: dlaColTemplate }}>
                <span style={{ padding: "14px 16px", fontSize: 14, color: T.colorTextPrimary, textAlign: "right", borderRight: `1px solid ${T.colorBorderDark}` }}>{dlaRow.opening}</span>
                <span style={{ padding: "14px 16px", fontSize: 14, color: T.colorTextPrimary, textAlign: "right", borderRight: `1px solid ${T.colorBorderDark}` }}>{dlaRow.movement}</span>
                <span style={{ padding: "14px 16px", fontSize: 14, color: T.colorTextPrimary, textAlign: "right", borderRight: `1px solid ${T.colorBorderDark}` }}>{dlaRow.closing}</span>
                <span style={{ padding: "14px 16px", display: "flex", alignItems: "center" }}>
                  <StatusBadge status={row.status || "Not started"} />
                </span>
              </div>
            </div>
          </div>
        );
      })() : (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: T.colorTextPrimary }}>Reconciliation</span>

        {/* Mini table – DS Data Table pattern */}
        <div style={{ border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, overflowX: "auto", overflowY: "hidden" }}>
          <div style={{ minWidth: 640 }}>
          {/* Header */}
          <div style={{
            display: "grid", gridTemplateColumns: colTemplate,
          }}>
            {headers.map((h, i) => (
              <span key={h} style={{
                padding: "10px 16px",
                fontSize: 14, fontWeight: 500, color: T.colorTextSecondary,
                borderBottom: `1px solid ${T.colorBorderDark}`,
                borderRight: i < headers.length - 1 ? `1px solid ${T.colorBorderDark}` : "none",
                textAlign: h === "Balance per Xero" ? "left" : h === "Status" ? "left" : "right",
              }}>{h}</span>
            ))}
          </div>
          {/* Row */}
          <div style={{
            display: "grid", gridTemplateColumns: colTemplate,
          }}>
            {/* Balance per Xero */}
            <span style={{ padding: "14px 16px", fontSize: 14, color: T.colorTextPrimary, borderRight: `1px solid ${T.colorBorderDark}` }}>{row.xeroBalance || "—"}</span>
            {/* Balance per source */}
            <span style={{ padding: "14px 16px", fontSize: 14, color: showSource ? T.colorTextPrimary : T.colorTextDisabled, textAlign: "right", borderRight: `1px solid ${T.colorBorderDark}` }}>{showSource ? (row.sourceBalance || "—") : "—"}</span>
            {/* Variance */}
            <span style={{ padding: "14px 16px", fontSize: 14, color: showSource ? T.colorTextPrimary : T.colorTextDisabled, textAlign: "right", borderRight: `1px solid ${T.colorBorderDark}` }}>{showSource ? (row.variance || "—") : "—"}</span>
            {/* Suggestions */}
            <span style={{ padding: "14px 16px", fontSize: 14, color: T.colorTextSecondary, textAlign: "right", borderRight: `1px solid ${T.colorBorderDark}` }}>{row.suggestions != null ? row.suggestions : "—"}</span>
            {/* Status */}
            <span style={{ padding: "14px 16px", display: "flex", alignItems: "center" }}>
              <StatusBadge status={row.status === "Suggestions" && row.suggestions != null ? (row.suggestions + (row.suggestions === 1 ? " suggestion" : " suggestions")) : (row.status || "Not started")} />
            </span>
          </div>
          </div>
        </div>
      </div>
      )}

      {/* Divider before comments section */}
      <div style={{ ...dividerStyle, marginTop: 24, marginBottom: 24 }} />

      {/* 3. Comments section */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Existing comments */}
        {comments.map((c, ci) => (
          <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Avatar */}
              <div style={{
                width: 24, height: 24, borderRadius: "50%", background: T.colorBorderDark,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 600, color: T.colorTextThird, flexShrink: 0,
              }}>
                {c.user.split(" ").map(n => n[0]).join("")}
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: T.colorTextPrimary }}>{c.user}</span>
              <span style={{ fontSize: 13, color: T.colorTextSecondary }}>{c.timestamp}</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: "22px", color: T.colorTextPrimary, margin: 0, paddingLeft: 32 }}>{c.text}</p>
          </div>
        ))}

        {/* Composing state: textarea + buttons */}
        {composing ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <textarea
              autoFocus
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              style={{
                width: "100%", minHeight: 80, padding: "10px 12px",
                borderRadius: 8, border: `1px solid ${T.colorBorderDark}`,
                fontSize: 14, fontFamily: "'Inter', sans-serif", lineHeight: "22px",
                color: T.colorTextPrimary, resize: "vertical", outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={e => { e.target.style.borderColor = T.colorBorderHover; }}
              onBlur={e => { e.target.style.borderColor = T.colorBorderDark; }}
            />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 8 }}>
                {/* Primary button – Add comment (DS main button) */}
                <button
                  onClick={handleSubmit}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "8px 14px", borderRadius: 8,
                    border: `1px solid ${T.colorBrandPrimary}`, background: T.colorBrandPrimary, cursor: "pointer",
                    fontSize: 14, fontWeight: 500, color: T.colorTextLight,
                    opacity: commentText.trim() ? 1 : 0.4,
                  }}
                  onMouseEnter={e => { if (commentText.trim()) { e.currentTarget.style.background = T.colorBrandPrimaryHover; e.currentTarget.style.borderColor = T.colorBrandPrimaryHover; } }}
                  onMouseLeave={e => { e.currentTarget.style.background = T.colorBrandPrimary; e.currentTarget.style.borderColor = T.colorBrandPrimary; }}
                >
                  Add comment
                </button>
                {/* Secondary button – Cancel */}
                <button
                  onClick={handleCancel}
                  style={{ ...secondaryBtnStyle }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.colorBorderHover; e.currentTarget.style.background = T.colorSurfaceSecondary; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.colorBorderDark; e.currentTarget.style.background = T.colorSurfacePrimary; }}
                >
                  Cancel
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <div
                  onClick={() => onToggleReview && onToggleReview(row.code)}
                  style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}
                >
                  <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>{isReviewed ? "Marked as reviewed" : "Mark as reviewed"}</span>
                  <div style={{
                    width: 44, height: 24, borderRadius: 12,
                    background: isReviewed ? T.colorBrandPrimary : T.colorBorderDark,
                    position: "relative",
                    transition: "background 0.2s ease",
                    flexShrink: 0,
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%", background: T.colorSurfacePrimary,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                      position: "absolute", top: 2,
                      left: isReviewed ? 22 : 2,
                      transition: "left 0.2s ease",
                    }} />
                  </div>
                </div>
                {isReviewed && (
                  <span style={{ fontSize: 14, color: T.colorTextSecondary }}>{reviewData.reviewer}, {reviewData.date}</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Add comment button + Review toggle on the same row */
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <button
              onClick={() => setComposing(true)}
              style={{ ...secondaryBtnStyle }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.colorBorderHover; e.currentTarget.style.background = T.colorSurfaceSecondary; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.colorBorderDark; e.currentTarget.style.background = T.colorSurfacePrimary; }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 7.66669C14.0023 8.5466 13.7967 9.41461 13.4 10.2C12.9296 11.1412 12.2065 11.9328 11.3116 12.4862C10.4168 13.0396 9.3855 13.3329 8.33337 13.3334C7.45346 13.3356 6.58545 13.1301 5.80004 12.7334L2 14L3.26667 10.2C2.86995 9.41461 2.66441 8.5466 2.66671 7.66669C2.66714 6.61456 2.96041 5.58325 3.51385 4.6884C4.06729 3.79355 4.85893 3.07041 5.80004 2.60002C6.58545 2.2033 7.45346 1.99776 8.33337 2.00002H8.66671C10.0562 2.07668 11.3687 2.66319 12.3528 3.64726C13.3368 4.63132 13.9234 5.94388 14 7.33335V7.66669Z" stroke="#080908" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Add comment
            </button>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
              <div
                onClick={() => onToggleReview && onToggleReview(row.code)}
                style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}
              >
                <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>{isReviewed ? "Marked as reviewed" : "Mark as reviewed"}</span>
                <div style={{
                  width: 44, height: 24, borderRadius: 12,
                  background: isReviewed ? T.colorBrandPrimary : T.colorBorderDark,
                  position: "relative",
                  transition: "background 0.2s ease",
                  flexShrink: 0,
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%", background: T.colorSurfacePrimary,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                    position: "absolute", top: 2,
                    left: isReviewed ? 22 : 2,
                    transition: "left 0.2s ease",
                  }} />
                </div>
              </div>
              {isReviewed && (
                <span style={{ fontSize: 14, color: T.colorTextSecondary }}>{reviewData.reviewer}, {reviewData.date}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── PresetExpandedContent: aggregated member account tables inside preset accordion ──
function PresetReviewToggle({ itemCode, accountReviewStatuses, onToggleAccountReview }) {
  var reviewData = accountReviewStatuses && accountReviewStatuses[itemCode];
  var isReviewed = !!(reviewData && reviewData.status === "Reviewed");
  return React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 } },
    React.createElement("div", {
      onClick: function() { onToggleAccountReview && onToggleAccountReview(itemCode); },
      style: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" },
    },
      React.createElement("span", { style: { fontSize: 14, fontWeight: 500, color: T.colorTextPrimary } }, isReviewed ? "Marked as reviewed" : "Mark as reviewed"),
      React.createElement("div", { style: {
        width: 44, height: 24, borderRadius: 12,
        background: isReviewed ? T.colorBrandPrimary : T.colorBorderDark,
        position: "relative",
        transition: "background 0.2s ease",
        flexShrink: 0,
      } },
        React.createElement("div", { style: {
          width: 20, height: 20, borderRadius: "50%", background: T.colorSurfacePrimary,
          boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          position: "absolute", top: 2,
          left: isReviewed ? 22 : 2,
          transition: "left 0.2s ease",
        } })
      )
    ),
    isReviewed && reviewData.reviewer && React.createElement("span", { style: { fontSize: 14, color: T.colorTextSecondary } }, reviewData.reviewer + ", " + reviewData.date)
  );
}

function PresetExpandedContent({ item, bsReconciledData, rowComments, onAddComment, accountReviewStatuses, onToggleAccountReview }) {
  var memberCodes = (item.code === "__payroll__" && bsReconciledData && bsReconciledData["__payroll_custom_accounts__"])
    ? bsReconciledData["__payroll_custom_accounts__"]
    : PRESET_MEMBER_CODES[item.code];
  if (!memberCodes) return null;

  // Check if any member account has reconciliation data
  var memberData = memberCodes.map(function(c) { return bsReconciledData && bsReconciledData[c]; }).filter(Boolean);
  var isEmpty = memberData.length === 0;

  // Find member rows from BS_SECTIONS
  var memberRows = memberCodes.map(function(code) {
    for (var si = 0; si < BS_SECTIONS.length; si++) {
      for (var ti = 0; ti < BS_SECTIONS[si].tables.length; ti++) {
        var found = BS_SECTIONS[si].tables[ti].rows.find(function(r) { return r.code === code; });
        if (found) {
          var rd = bsReconciledData && bsReconciledData[code];
          if (rd) {
            return Object.assign({}, found, {
              reconciled: true,
              xeroBalance: rd.resyncedXeroBalance || found.xeroBalance,
              sourceBalance: rd.sourceBalance,
              variance: rd.resyncedVariance || rd.variance,
              suggestions: rd.accountSuggestions ? rd.accountSuggestions.length : (rd.suggestionCount != null ? rd.suggestionCount : rd.suggestions),
              accountSuggestions: rd.accountSuggestions || null,
              status: (STATUS_CONFIG[rd.status] && STATUS_CONFIG[rd.status].label) || "Reconciled",
            });
          }
          return found;
        }
      }
    }
    return null;
  }).filter(Boolean);

  var isDLA = item.code === "__dla__";
  var [composing, setComposing] = useState(false);
  var [commentText, setCommentText] = useState("");

  var handleSubmit = function() {
    if (!commentText.trim()) return;
    onAddComment(item.code, commentText.trim());
    setCommentText("");
    setComposing(false);
  };

  var handleCancel = function() {
    setCommentText("");
    setComposing(false);
  };

  var secondaryBtnStyle = {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "8px 14px", borderRadius: 8,
    border: `1px solid ${T.colorBorderDark}`, background: T.colorSurfacePrimary, cursor: "pointer",
    fontSize: 14, fontWeight: 500, color: T.colorTextPrimary,
  };

  var dividerStyle = { height: 1, background: T.colorBorderDark, margin: 0 };

  // Table configuration per preset type
  var headers, colTemplate;
  if (isDLA) {
    headers = ["Account", "Opening balance (1 Apr 2025)", "Movement in year", "Closing balance (31 Mar 2026)", "Status"];
    colTemplate = "1.8fr 1fr 0.9fr 1fr 160px";
  } else {
    headers = ["Account", "Balance per Xero", "Balance per source", "Variance", "Suggestions", "Status"];
    colTemplate = "minmax(140px,1.8fr) minmax(130px,1fr) minmax(135px,1fr) minmax(80px,0.8fr) minmax(100px,0.7fr) 160px";
  }

  var presetComments = (rowComments && rowComments[item.code]) || [];

  return React.createElement("div", { style: { borderTop: `1px solid ${T.colorBorderDark}`, padding: "24px", background: T.colorSurfaceSecondary } },
    React.createElement("div", { style: { background: T.colorSurfacePrimary, borderRadius: 8, border: `1px solid ${T.colorBorderDark}`, padding: 24, display: "flex", flexDirection: "column", gap: 0 } },
      // Reconciliation label
      React.createElement("span", { style: { fontSize: 14, fontWeight: 600, color: T.colorTextPrimary, marginBottom: 12 } }, "Reconciliation"),

      // Table
      React.createElement("div", { style: { border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, overflowX: "auto", overflowY: "hidden" } },
        React.createElement("div", { style: { minWidth: 760 } },
        // Header row
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: colTemplate } },
          headers.map(function(h, i) {
            return React.createElement("span", {
              key: h,
              style: {
                padding: "10px 16px",
                fontSize: 14, fontWeight: 500, color: T.colorTextSecondary,
                borderBottom: `1px solid ${T.colorBorderDark}`,
                borderRight: i < headers.length - 1 ? `1px solid ${T.colorBorderDark}` : "none",
                textAlign: h === "Account" ? "left" : h === "Status" ? "left" : "right",
                minWidth: 0,
              }
            }, h);
          })
        ),
        // Data rows or empty state
        isEmpty
          ? React.createElement("div", { style: { padding: "32px 16px", textAlign: "center" } },
              React.createElement("span", { style: { fontSize: 14, color: T.colorTextSecondary } }, "Run reconciliation to see a summary across all accounts in this preset.")
            )
          : memberRows.map(function(row, ri) {
          var rd = bsReconciledData && bsReconciledData[row.code];
          var hasData = !!rd;
          if (isDLA) {
            var dlaRow = DLA_OVERVIEW_ROWS.find(function(r) { return !r.isSummary && r.account.startsWith(row.code); });
            return React.createElement("div", {
              key: row.code,
              style: {
                display: "grid", gridTemplateColumns: colTemplate,
                borderBottom: ri < memberRows.length - 1 ? `1px solid ${T.colorBorderDark}` : "none",
              }
            },
              React.createElement("span", { style: { padding: "14px 16px", fontSize: 14, color: T.colorTextPrimary, borderRight: `1px solid ${T.colorBorderDark}` } },
                row.code + " – " + row.account
              ),
              React.createElement("span", { style: { padding: "14px 16px", fontSize: 14, color: T.colorTextPrimary, textAlign: "right", borderRight: `1px solid ${T.colorBorderDark}` } },
                dlaRow ? dlaRow.opening : "—"
              ),
              React.createElement("span", { style: { padding: "14px 16px", fontSize: 14, color: T.colorTextPrimary, textAlign: "right", borderRight: `1px solid ${T.colorBorderDark}` } },
                dlaRow ? dlaRow.movement : "—"
              ),
              React.createElement("span", { style: { padding: "14px 16px", fontSize: 14, color: T.colorTextPrimary, textAlign: "right", borderRight: `1px solid ${T.colorBorderDark}` } },
                dlaRow ? dlaRow.closing : "—"
              ),
              React.createElement("span", { style: { padding: "14px 16px", display: "flex", alignItems: "center" } },
                React.createElement(StatusBadge, { status: hasData && row.status === "Suggestions" && row.suggestions != null ? (row.suggestions + (row.suggestions === 1 ? " suggestion" : " suggestions")) : (hasData ? (row.status || "Not started") : "Not started") })
              )
            );
          } else {
            return React.createElement("div", {
              key: row.code,
              style: {
                display: "grid", gridTemplateColumns: colTemplate,
                borderBottom: ri < memberRows.length - 1 ? `1px solid ${T.colorBorderDark}` : "none",
              }
            },
              React.createElement("span", { style: { padding: "14px 16px", fontSize: 14, color: T.colorTextPrimary, borderRight: `1px solid ${T.colorBorderDark}`, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } },
                row.code + " – " + row.account
              ),
              React.createElement("span", { style: { padding: "14px 16px", fontSize: 14, color: T.colorTextPrimary, textAlign: "right", borderRight: `1px solid ${T.colorBorderDark}`, minWidth: 0, overflow: "hidden", whiteSpace: "nowrap" } },
                row.xeroBalance || "—"
              ),
              React.createElement("span", { style: { padding: "14px 16px", fontSize: 14, color: hasData ? T.colorTextPrimary : T.colorTextDisabled, textAlign: "right", borderRight: `1px solid ${T.colorBorderDark}`, minWidth: 0, overflow: "hidden", whiteSpace: "nowrap" } },
                hasData ? (row.sourceBalance || "—") : "—"
              ),
              React.createElement("span", { style: { padding: "14px 16px", fontSize: 14, color: hasData ? T.colorTextPrimary : T.colorTextDisabled, textAlign: "right", borderRight: `1px solid ${T.colorBorderDark}`, minWidth: 0, overflow: "hidden", whiteSpace: "nowrap" } },
                hasData ? (row.variance || "—") : "—"
              ),
              React.createElement("span", { style: { padding: "14px 16px", fontSize: 14, color: T.colorTextSecondary, textAlign: "right", borderRight: `1px solid ${T.colorBorderDark}`, minWidth: 0, overflow: "hidden", whiteSpace: "nowrap" } },
                row.suggestions != null ? row.suggestions : "—"
              ),
              React.createElement("span", { style: { padding: "14px 16px", display: "flex", alignItems: "center", minWidth: 0 } },
                React.createElement(StatusBadge, { status: hasData && row.status === "Suggestions" && row.suggestions != null ? (row.suggestions + (row.suggestions === 1 ? " suggestion" : " suggestions")) : (hasData ? (row.status || "Not started") : "Not started") })
              )
            );
          }
        })
      )),

      // Divider
      React.createElement("div", { style: Object.assign({}, dividerStyle, { marginTop: 24, marginBottom: 24 }) }),

      // Comments section
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
        // Existing comments
        presetComments.map(function(c, ci) {
          return React.createElement("div", { key: ci, style: { display: "flex", flexDirection: "column", gap: 4 } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
              React.createElement("div", { style: { width: 24, height: 24, borderRadius: "50%", background: T.colorBorderDark, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: T.colorTextThird, flexShrink: 0 } },
                c.user.split(" ").map(function(n) { return n[0]; }).join("")
              ),
              React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: T.colorTextPrimary } }, c.user),
              React.createElement("span", { style: { fontSize: 13, color: T.colorTextSecondary } }, c.timestamp)
            ),
            React.createElement("p", { style: { fontSize: 14, lineHeight: "22px", color: T.colorTextPrimary, margin: 0, paddingLeft: 32 } }, c.text),
            ci < presetComments.length - 1 ? React.createElement("div", { style: Object.assign({}, dividerStyle, { marginTop: 12 }) }) : null
          );
        }),
        // Compose or add comment button
        composing ?
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
            React.createElement("textarea", {
              autoFocus: true,
              value: commentText,
              onChange: function(e) { setCommentText(e.target.value); },
              placeholder: "Write a comment...",
              style: { width: "100%", minHeight: 80, padding: "10px 12px", borderRadius: 8, border: `1px solid ${T.colorBorderDark}`, fontSize: 14, fontFamily: "'Inter', sans-serif", lineHeight: "22px", color: T.colorTextPrimary, resize: "vertical", outline: "none", boxSizing: "border-box" },
            }),
            React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between" } },
              React.createElement("div", { style: { display: "flex", gap: 8 } },
                React.createElement("button", {
                  onClick: handleSubmit,
                  style: { display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: `1px solid ${T.colorBrandPrimary}`, background: T.colorBrandPrimary, cursor: "pointer", fontSize: 14, fontWeight: 500, color: T.colorTextLight, opacity: commentText.trim() ? 1 : 0.4 },
                }, "Add comment"),
                React.createElement("button", {
                  onClick: handleCancel,
                  style: secondaryBtnStyle,
                }, "Cancel")
              ),
              React.createElement(PresetReviewToggle, { itemCode: item.code, accountReviewStatuses: accountReviewStatuses, onToggleAccountReview: onToggleAccountReview })
            )
          )
        :
          React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between" } },
            React.createElement("button", {
              onClick: function() { setComposing(true); },
              style: Object.assign({}, secondaryBtnStyle),
            },
              React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none" },
                React.createElement("path", { d: "M14 7.66669C14.0023 8.5466 13.7967 9.41461 13.4 10.2C12.9296 11.1412 12.2065 11.9328 11.3116 12.4862C10.4168 13.0396 9.3855 13.3329 8.33337 13.3334C7.45346 13.3356 6.58545 13.1301 5.80004 12.7334L2 14L3.26667 10.2C2.86995 9.41461 2.66441 8.5466 2.66671 7.66669C2.66714 6.61456 2.96041 5.58325 3.51385 4.6884C4.06729 3.79355 4.85893 3.07041 5.80004 2.60002C6.58545 2.2033 7.45346 1.99776 8.33337 2.00002H8.66671C10.0562 2.07668 11.3687 2.66319 12.3528 3.64726C13.3368 4.63132 13.9234 5.94388 14 7.33335V7.66669Z", stroke: T.colorTextPrimary, strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round" })
              ),
              "Add comment"
            ),
            React.createElement(PresetReviewToggle, { itemCode: item.code, accountReviewStatuses: accountReviewStatuses, onToggleAccountReview: onToggleAccountReview })
          )
      )
    )
  );
}

// Group preset → member account codes
var PRESET_MEMBER_CODES = {
  "__payroll__": ["2210", "2230"],
  "__dla__": ["2300", "2301"],
  "__fixed_assets__": ["0010", "0011", "0020", "0030", "0031", "0032", "0040"],
};

// ── Reconciliation Accordions (top-level to preserve state across re-renders) ──
var RECON_ACCORDIONS = [
  { code: "__payroll__", title: "Payroll", subtitle: "Check payroll accounts against the payroll source for any balance discrepancies." },
  { code: "__dla__", title: "Directors' loan account", subtitle: "Check for S455 tax exposure, benefit in kind, £10,000 threshold and transaction classification." },
  { code: "__fixed_assets__", title: "Fixed assets", subtitle: "Check accounts for balance discrepancies, missing depreciation, and misclassified capex." },
];

function ReconAccordionItem({ item, bsReconciledData, onRunAccountReconciliation, rowComments, onAddComment, accountReviewStatuses, onToggleAccountReview }) {
  var isDisabled = false;
  var _exp = useState(false);
  var expanded = _exp[0];
  var setExpanded = _exp[1];
  var hasComments = rowComments && rowComments[item.code] && rowComments[item.code].length > 0;

  if (isDisabled) {
    return React.createElement("div", { style: { background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, overflow: "hidden", opacity: 0.7 } },
      React.createElement("div", {
        style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px" }
      },
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 } },
          React.createElement("span", { style: { fontSize: 16, fontWeight: 500, color: T.colorTextPrimary } }, item.title),
          React.createElement("span", { style: { fontSize: 14, color: T.colorTextSecondary } }, item.subtitle)
        ),
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginLeft: 24, flexShrink: 0 } },
          React.createElement("span", { style: {
            display: "inline-flex", alignItems: "center",
            padding: "2px 8px", borderRadius: 4,
            fontSize: 12, fontWeight: 600, lineHeight: "17px",
            background: T.colorInfoBg, border: `1px solid ${T.colorInfoBorder}`, color: T.colorInfoAlt,
            whiteSpace: "nowrap",
          } }, "Coming soon")
        )
      )
    );
  }

  return React.createElement("div", { style: { background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, overflow: "hidden" } },
    React.createElement("div", {
      onClick: function() { setExpanded(!expanded); },
      style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", cursor: "pointer" }
    },
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 } },
        React.createElement("span", { style: { fontSize: 16, fontWeight: 500, color: T.colorTextPrimary } }, item.title),
        React.createElement("span", { style: { fontSize: 14, color: T.colorTextSecondary } }, item.subtitle)
      ),
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginLeft: 24, flexShrink: 0 } },
        React.createElement(ReconciliationCell, { code: item.code, account: item.title, bsReconciledData: bsReconciledData, onRunReconciliation: onRunAccountReconciliation }),
        React.createElement("span", { style: { position: "relative", display: "inline-flex", flexShrink: 0 } },
          React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none" },
            React.createElement("path", { d: "M14 7.66669C14.0023 8.5466 13.7967 9.41461 13.4 10.2C12.9296 11.1412 12.2065 11.9328 11.3116 12.4862C10.4168 13.0396 9.3855 13.3329 8.33337 13.3334C7.45346 13.3356 6.58545 13.1301 5.80004 12.7334L2 14L3.26667 10.2C2.86995 9.41461 2.66441 8.5466 2.66671 7.66669C2.66714 6.61456 2.96041 5.58325 3.51385 4.6884C4.06729 3.79355 4.85893 3.07041 5.80004 2.60002C6.58545 2.2033 7.45346 1.99776 8.33337 2.00002H8.66671C10.0562 2.07668 11.3687 2.66319 12.3528 3.64726C13.3368 4.63132 13.9234 5.94388 14 7.33335V7.66669Z", stroke: hasComments ? T.colorSuccess : T.colorTextSecondary, strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round" })
          ),
          hasComments && React.createElement("span", { style: { position: "absolute", top: -1, right: -1, width: 6, height: 6, borderRadius: "50%", background: T.colorSuccess } })
        ),
        React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", style: { flexShrink: 0, transition: "transform 0.2s", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" } },
          React.createElement("path", { d: "M4 6L8 10L12 6", stroke: T.colorTextSecondary, strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round" })
        )
      )
    ),
    expanded && React.createElement(PresetExpandedContent, { item: item, bsReconciledData: bsReconciledData, rowComments: rowComments, onAddComment: onAddComment, accountReviewStatuses: accountReviewStatuses, onToggleAccountReview: onToggleAccountReview })
  );
}

// ── Balance Sheet: ReconciliationCell ────────────────────────────────────────
function ReconciliationCell({ code, account, bsReconciledData, onViewResults, onRunReconciliation }) {
  // For group presets, aggregate the member account statuses
  var memberCodes = (code === "__payroll__" && bsReconciledData && bsReconciledData["__payroll_custom_accounts__"])
    ? bsReconciledData["__payroll_custom_accounts__"]
    : PRESET_MEMBER_CODES[code];
  if (memberCodes && bsReconciledData) {
    var memberData = memberCodes.map(function(c) { return bsReconciledData[c]; }).filter(Boolean);
    // Only show ReconciledCard when ALL member accounts have been reconciled
    if (memberData.length === memberCodes.length) {
      // Use the latest date among members
      var latestDate = memberData.reduce(function(latest, d) { return d.date > latest ? d.date : latest; }, memberData[0].date);
      // Aggregate status: if any are "reviewing", group is "reviewing"; only "reconciled" if all are
      var allReconciled = memberData.every(function(d) { return d.status === "reconciled"; });
      // Sum open suggestion counts across members
      var totalSuggestions = memberData.reduce(function(sum, d) {
        return sum + (d.status === "suggestions" ? (d.suggestionCount || 0) : 0);
      }, 0);
      var groupStatus = allReconciled ? "reconciled" : (totalSuggestions > 0 ? "suggestions" : "reviewing");
      return (
        <ReconciledCard
          date={latestDate}
          status={groupStatus}
          suggestionCount={groupStatus === "suggestions" ? totalSuggestions : null}
          onPlay={() => onRunReconciliation?.({ code, account })}
        />
      );
    }
  }

  var data = bsReconciledData && bsReconciledData[code];
  if (data) {
    return (
      <ReconciledCard
        date={data.date}
        status={data.status || "reconciled"}
        suggestionCount={data.suggestionCount}
        onPlay={() => onRunReconciliation?.({ code, account })}
      />
    );
  }
  return (
    <button
      onClick={e => { e.stopPropagation(); onRunReconciliation?.({ code, account }); }}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "6px 12px", height: 44, boxSizing: "border-box",
        border: `1px solid ${T.colorBorderDark}`, borderRadius: 6,
        background: T.colorSurfacePrimary, cursor: "pointer",
        fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, whiteSpace: "nowrap",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = T.colorBorderHover; e.currentTarget.style.background = T.colorSurfaceSecondary; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = T.colorBorderDark; e.currentTarget.style.background = T.colorSurfacePrimary; }}
    >
      Run reconciliation
      <PlayCircleIcon color={T.colorTextPrimary} />
    </button>
  );
}

// ── Balance Sheet: BS_COLUMNS ──────────────────────────────────────────────
const BS_COLUMNS = [
  { key: "account", label: "Account", width: "minmax(280px, 2fr)", sortable: true, render: (v, row) => (
    <span style={{ fontSize: 14, color: T.colorTextPrimary }}>{row.code} &ndash; {v}</span>
  )},
  { key: "closingBalance", label: "Closing balance", width: "minmax(150px, 1fr)", align: "right", sortable: true, render: (v, row) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: T.colorTextPrimary }}>{v}</span>
      {row.trend && (
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 3,
          background: T.colorButtonDisabled,
          borderRadius: 4, padding: "2px 6px", marginTop: 4,
          fontSize: 11, fontWeight: 500,
          color: T.colorTextThird,
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            {row.trend.dir === "up"
              ? <path d="M5 8V2M5 2L2.5 4.5M5 2L7.5 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              : <path d="M5 2V8M5 8L2.5 5.5M5 8L7.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            }
          </svg>
          {row.trend.months >= 12 ? "12m+" : row.trend.months + "m"}
        </span>
      )}
    </div>
  )},
  { key: "vsLastMonth", label: "vs Last month", width: "minmax(150px, 1fr)", align: "right", sortable: true, render: (v, row) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      <span style={{ fontSize: 14, color: T.colorTextPrimary }}>{v}</span>
      {row.pct && (
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 2,
          background: T.colorButtonDisabled,
          borderRadius: 4, padding: "2px 6px", marginTop: 4,
          fontSize: 11, fontWeight: 500,
          color: T.colorTextThird,
        }}>
          {row.pct}
        </span>
      )}
    </div>
  )},
  { key: "reconciliation", label: "Reconciliation", width: "220px" },
  { key: "review", label: "Review", width: "140px", render: (v) => (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "2px 8px", borderRadius: 4,
      fontSize: 12, fontWeight: 600, lineHeight: "17px",
      background: v === "Reviewed" ? T.colorSuccessBg : v === "Flagged" ? T.colorErrorBg : T.colorSurfaceSecondary,
      border: v === "Reviewed" ? `1px solid ${T.colorSuccessBorder}` : v === "Flagged" ? `1px solid ${T.colorErrorBorder}` : `1px solid ${T.colorBorderLight}`,
      color: v === "Reviewed" ? T.colorSuccess : v === "Flagged" ? T.colorError : T.colorTextThird,
      whiteSpace: "nowrap",
    }}>
      {v || "Not reviewed"}
    </span>
  )},
];

// ── Balance Sheet: BS_SECTIONS data ────────────────────────────────────────
const BS_SECTIONS = [
  {
    heading: "Assets",
    tables: [
      {
        title: "Non-current assets",
        rows: [
          { code: "0010", account: "Freehold property",                closingBalance: "£450,000.00", vsLastMonth: "£0.00",        pct: null, trend: null,                          xeroBalance: "£450,000.00", sourceBalance: "£450,000.00", variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "0011", account: "Leasehold improvements",           closingBalance: "£32,500.00",  vsLastMonth: "-£1,625.00",   pct: "-4.8%", trend: { dir: "down", months: 12 }, xeroBalance: "£32,500.00",  sourceBalance: "£32,500.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "0020", account: "Plant and machinery",              closingBalance: "£87,200.00",  vsLastMonth: "-£2,180.00",   pct: "-2.4%", trend: { dir: "down", months: 8 },  xeroBalance: "£87,200.00",  sourceBalance: "£85,020.00",  variance: "£2,180.00",  suggestions: null, status: "Not started" },
          { code: "0030", account: "Fixtures and fittings",            closingBalance: "£14,800.00",  vsLastMonth: "-£740.00",     pct: "-4.8%", trend: { dir: "down", months: 12 }, xeroBalance: "£14,800.00",  sourceBalance: "£14,800.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "0031", account: "Office equipment",                 closingBalance: "£9,350.00",   vsLastMonth: "-£467.50",     pct: "-4.8%", trend: { dir: "down", months: 6 },  xeroBalance: "£9,350.00",   sourceBalance: "£9,350.00",   variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "0032", account: "Computer equipment",               closingBalance: "£18,600.00",  vsLastMonth: "+£3,200.00",   pct: "+20.8%", trend: { dir: "up", months: 2 },   xeroBalance: "£18,600.00",  sourceBalance: "£18,600.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "0040", account: "Motor vehicles",                   closingBalance: "£24,000.00",  vsLastMonth: "-£1,000.00",   pct: "-4.0%", trend: { dir: "down", months: 12 }, xeroBalance: "£24,000.00",  sourceBalance: "£23,200.00",  variance: "£800.00",    suggestions: null, status: "Not started" },
          { code: "0050", account: "Goodwill",                         closingBalance: "£120,000.00", vsLastMonth: "-£2,000.00",   pct: "-1.6%", trend: { dir: "down", months: 5 },  xeroBalance: "£120,000.00", sourceBalance: "£120,000.00", variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "0051", account: "Trademarks and licences",          closingBalance: "£7,500.00",   vsLastMonth: "£0.00",        pct: null, trend: null,                          xeroBalance: "£7,500.00",   sourceBalance: "£7,500.00",   variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "0060", account: "Long-term investments",            closingBalance: "£50,000.00",  vsLastMonth: "+£1,250.00",   pct: "+2.6%", trend: { dir: "up", months: 9 },    xeroBalance: "£50,000.00",  sourceBalance: "£50,000.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
        ],
        footer: "10 accounts",
      },
      {
        title: "Current assets",
        rows: [
          { code: "1100", account: "Trade debtors",                    closingBalance: "£184,320.00", vsLastMonth: "+£12,500.00",  pct: "+7.3%", trend: { dir: "up", months: 4 },    xeroBalance: "£184,320.00", sourceBalance: "£181,070.00", variance: "£3,250.00",  suggestions: null, status: "Not started" },
          { code: "1101", account: "Other debtors",                    closingBalance: "£6,750.00",   vsLastMonth: "-£1,200.00",   pct: "-15.1%", trend: { dir: "down", months: 2 },  xeroBalance: "£6,750.00",   sourceBalance: "£6,750.00",   variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "1103", account: "Prepayments",                      closingBalance: "£23,400.00",  vsLastMonth: "+£8,400.00",   pct: "+56.0%", trend: { dir: "up", months: 1 },    xeroBalance: "£23,400.00",  sourceBalance: "£23,400.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "1104", account: "Accrued income",                   closingBalance: "£11,250.00",  vsLastMonth: "+£3,750.00",   pct: "+50.0%", trend: { dir: "up", months: 3 },    xeroBalance: "£11,250.00",  sourceBalance: "£11,250.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "1200", account: "Stock",                            closingBalance: "£41,800.00",  vsLastMonth: "+£2,300.00",   pct: "+5.8%", trend: { dir: "up", months: 6 },     xeroBalance: "£41,800.00",  sourceBalance: "£41,800.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "1201", account: "VAT receivable",                   closingBalance: "£14,680.00",  vsLastMonth: "+£6,230.00",   pct: "+73.7%", trend: { dir: "up", months: 1 },    xeroBalance: "£14,680.00",  sourceBalance: "£14,680.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "1210", account: "Lloyds Bank - Operations GBP",     closingBalance: "£127,000.00", vsLastMonth: "+£18,400.00",  pct: "+16.9%", trend: { dir: "up", months: 3 },    xeroBalance: "£127,000.00", sourceBalance: "£125,460.00", variance: "£1,540.00",  suggestions: null, status: "Not started" },
          { code: "1211", account: "Lloyds Bank - Business",           closingBalance: "£155,000.00", vsLastMonth: "-£3,200.00",   pct: "-2.0%", trend: { dir: "down", months: 1 },   xeroBalance: "£155,000.00", sourceBalance: "£155,000.00", variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "1212", account: "HSBC - Business Transactions",     closingBalance: "£93,000.00",  vsLastMonth: "+£7,650.00",   pct: "+9.0%", trend: { dir: "up", months: 5 },     xeroBalance: "£93,000.00",  sourceBalance: "£92,180.00",  variance: "£820.00",    suggestions: null, status: "Not started" },
          { code: "1213", account: "Barclays - Operations",            closingBalance: "£374,000.00", vsLastMonth: "+£41,000.00",  pct: "+12.3%", trend: { dir: "up", months: 7 },    xeroBalance: "£374,000.00", sourceBalance: "£374,000.00", variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "1230", account: "Petty cash",                       closingBalance: "£350.00",     vsLastMonth: "-£50.00",      pct: "-12.5%", trend: { dir: "down", months: 3 },  xeroBalance: "£350.00",     sourceBalance: "£350.00",     variance: "£0.00",      suggestions: null, status: "Not started" },
        ],
        footer: "11 accounts",
      },
    ],
  },
  {
    heading: "Liabilities",
    tables: [
      {
        title: "Current liabilities",
        rows: [
          { code: "2100", account: "Trade creditors",                  closingBalance: "£98,450.00",  vsLastMonth: "+£5,200.00",   pct: "+5.6%", trend: { dir: "up", months: 3 },    xeroBalance: "£98,450.00",  sourceBalance: "£97,200.00",  variance: "£1,250.00",  suggestions: null, status: "Not started" },
          { code: "2101", account: "Other creditors",                  closingBalance: "£4,300.00",   vsLastMonth: "-£800.00",     pct: "-15.7%", trend: { dir: "down", months: 2 },  xeroBalance: "£4,300.00",   sourceBalance: "£4,300.00",   variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "2109", account: "Accruals",                         closingBalance: "£31,200.00",  vsLastMonth: "+£6,400.00",   pct: "+25.8%", trend: { dir: "up", months: 4 },    xeroBalance: "£31,200.00",  sourceBalance: "£31,200.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "2110", account: "Deferred income",                  closingBalance: "£18,000.00",  vsLastMonth: "+£4,500.00",   pct: "+33.3%", trend: { dir: "up", months: 2 },    xeroBalance: "£18,000.00",  sourceBalance: "£18,000.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "2210", account: "PAYE and NI",                      closingBalance: "£22,180.00",  vsLastMonth: "+£1,340.00",   pct: "+6.4%", trend: { dir: "up", months: 12 },    xeroBalance: "£22,180.00",  sourceBalance: "£22,180.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "2201", account: "VAT payable",                      closingBalance: "£36,900.00",  vsLastMonth: "+£8,750.00",   pct: "+31.1%", trend: { dir: "up", months: 1 },    xeroBalance: "£36,900.00",  sourceBalance: "£36,900.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "2150", account: "Corporation tax",                  closingBalance: "£42,500.00",  vsLastMonth: "+£14,150.00",  pct: "+49.9%", trend: { dir: "up", months: 10 },   xeroBalance: "£42,500.00",  sourceBalance: "£42,500.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "2230", account: "Pension contributions",            closingBalance: "£8,640.00",   vsLastMonth: "+£720.00",     pct: "+9.1%", trend: { dir: "up", months: 12 },    xeroBalance: "£8,640.00",   sourceBalance: "£8,640.00",   variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "1250", account: "American Express OP GBP",          closingBalance: "£12,400.00",  vsLastMonth: "+£3,100.00",   pct: "+33.3%", trend: { dir: "up", months: 2 },    xeroBalance: "£12,400.00",  sourceBalance: "£12,400.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "1251", account: "Mastercard Business",              closingBalance: "£7,850.00",   vsLastMonth: "-£2,600.00",   pct: "-24.9%", trend: { dir: "down", months: 1 },  xeroBalance: "£7,850.00",   sourceBalance: "£7,850.00",   variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "2300", account: "Directors' loan — J Smith",   closingBalance: "£15,000.00",  vsLastMonth: "£0.00",   pct: null, trend: null,                          xeroBalance: "£15,000.00",  sourceBalance: "£15,000.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "2301", account: "Directors' loan — A Jones",   closingBalance: "-£3,200.00",  vsLastMonth: "-£800.00", pct: null, trend: null,                          xeroBalance: "-£3,200.00",  sourceBalance: "-£3,200.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
        ],
        footer: "12 accounts",
      },
      {
        title: "Non-current liabilities",
        rows: [
          { code: "2400", account: "Bank loan — Lloyds (5yr)",         closingBalance: "£180,000.00", vsLastMonth: "-£3,000.00",  pct: "-1.6%", trend: { dir: "down", months: 12 }, xeroBalance: "£180,000.00", sourceBalance: "£177,000.00", variance: "£3,000.00", suggestions: null, status: "Not started" },
          { code: "2410", account: "Finance lease obligations",        closingBalance: "£22,400.00",  vsLastMonth: "-£1,400.00",   pct: "-5.9%", trend: { dir: "down", months: 8 },  xeroBalance: "£22,400.00",  sourceBalance: "£22,400.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "2420", account: "Deferred tax provision",           closingBalance: "£9,800.00",   vsLastMonth: "+£650.00",     pct: "+7.1%", trend: { dir: "up", months: 3 },    xeroBalance: "£9,800.00",   sourceBalance: "£9,800.00",   variance: "£0.00",      suggestions: null, status: "Not started" },
        ],
        footer: "3 accounts",
      },
    ],
  },
  {
    heading: "Equity",
    tables: [
      {
        title: "Shareholders' equity",
        rows: [
          { code: "3000", account: "Ordinary share capital",           closingBalance: "£100.00",     vsLastMonth: "£0.00",        pct: null, trend: null,                          xeroBalance: "£100.00",        sourceBalance: "£100.00",        variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "3001", account: "Share premium",                    closingBalance: "£49,900.00",  vsLastMonth: "£0.00",        pct: null, trend: null,                          xeroBalance: "£49,900.00",     sourceBalance: "£49,900.00",     variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "3100", account: "Retained earnings",                closingBalance: "£1,273,730.00", vsLastMonth: "+£48,275.00", pct: "+3.9%", trend: { dir: "up", months: 12 }, xeroBalance: "£1,273,730.00",  sourceBalance: "£1,273,730.00",  variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "3101", account: "Dividends paid",                   closingBalance: "-£25,000.00", vsLastMonth: "£0.00",        pct: null, trend: null,                          xeroBalance: "-£25,000.00",    sourceBalance: "-£25,000.00",    variance: "£0.00",      suggestions: null, status: "Not started" },
          { code: "3200", account: "Revaluation reserve",              closingBalance: "£85,000.00",  vsLastMonth: "£0.00",        pct: null, trend: null,                          xeroBalance: "£85,000.00",     sourceBalance: "£85,000.00",     variance: "£0.00",      suggestions: null, status: "Not started" },
        ],
        footer: "5 accounts",
      },
    ],
  },
];

// Flat list of all BS accounts for the account selector dropdown
const BS_ALL_ACCOUNTS = BS_SECTIONS.flatMap(section =>
  section.tables.flatMap(table => table.rows.map(row => ({ code: row.code, account: row.account })))
);
// Expose globally so home.jsx can read BS account progress
window.BS_ALL_ACCOUNTS = BS_ALL_ACCOUNTS;

// Preset items for the account selector dropdown
var BS_PRESET_ITEMS = [
  { code: "__payroll__", account: "Payroll" },
  { code: "__dla__", account: "Directors' loan account" },
  { code: "__fixed_assets__", account: "Fixed assets" },
];

// ── Balance Sheet: PAYROLL_RECONCILIATION_STEPS ─────────────────────────────
const PAYROLL_RECONCILIATION_STEPS = [
  { title: "Reading source",              subtext: null,                                                      duration: 800  },
  { title: "Syncing Xero",                subtext: null,                                                      duration: 1000 },
  { title: "Mapping source to accounts",  subtext: "Mapped to 2210 – PAYE and NI, 2230 – Pension contributions.", duration: 1200 },
  { title: "Comparing balances",          subtext: "Xero: £30,820.00. Payroll report: £30,720.00.",           duration: 1000 },
  { title: "Looking for variances",       subtext: "1 variance found (£100.00).",                             duration: 1500 },
  { title: "Identifying root causes",     subtext: "Pension contribution timing difference identified.",       duration: 1200 },
  { title: "Suggesting actions",          subtext: null,                                                      duration: 800  },
];


// ── Balance Sheet: PAYROLL_SUGGESTIONS (shared between PayrollResultsPanel, ACCOUNT_REC_DATA, and app.jsx) ──
const PAYROLL_SUGGESTIONS = [
  {
    id: 0, accountCode: "2230",
    type: "Variance",
    contact: "Pension contributions",
    description: "A variance of £100.00 was found between the Xero balance (£8,640.00) and the payroll report (£8,540.00) for Pension contributions (2230). This may be due to a timing difference on the March employer contribution.",
    primaryLabel: "Create journal entry", external: false, fileAction: null,
    toastMessage: "Journal entry created successfully",
    tableData: { description: "Pension contribution variance – March employer posting", account: "2230 – Pension contributions", amount: "£100.00", date: "31 Mar 2026" },
  },
  {
    id: 1, accountCode: "2210",
    type: "Timing difference",
    contact: "PAYE and NI",
    description: "The PAYE and NI liability (2210) increased by £1,340.00 this month. The payroll report shows a corresponding HMRC payment due 22 Apr 2026. Please confirm this timing difference is expected.",
    primaryLabel: "Acknowledge", external: false, fileAction: null,
    toastMessage: "Timing difference acknowledged",
    tableData: null, hideSecondary: true,
  },
  {
    id: 2, accountCode: "2210",
    type: "Missing entry",
    contact: "Employer NI – new starter",
    description: "The payroll report includes an employer NI contribution of £186.00 for a new starter (employee #25) from 15 Mar 2026. No corresponding entry was found in Xero under account 2210.",
    primaryLabel: "Create journal entry", external: false, fileAction: null,
    toastMessage: "Journal entry created successfully",
    tableData: { description: "Employer NI – new starter (employee #25)", account: "2210 – PAYE and NI", amount: "£186.00", date: "15 Mar 2026" },
  },
];

// ── Balance Sheet: Account-specific reconciliation data ──────────────────────
const ACCOUNT_REC_DATA = {
  // ── 0010 – Freehold property ──
  "0010": {
    steps: [
      { title: "Reading source",                subtext: null,                                                       duration: 800  },
      { title: "Syncing Xero",                  subtext: null,                                                       duration: 1000 },
      { title: "Analysing fixed asset register", subtext: "Matched 3 freehold assets to Xero records.",              duration: 1200 },
      { title: "Comparing balances",            subtext: "Xero: £450,000.00. Fixed asset register: £450,000.00.",    duration: 1000 },
      { title: "Looking for variances",         subtext: "No variances found.",                                      duration: 1500 },
      { title: "Reviewing valuations",          subtext: "Last revaluation was 18 months ago.",                      duration: 1200 },
      { title: "Suggesting actions",            subtext: null,                                                       duration: 800  },
    ],
    overviewRows: [
      { account: "0010 – Freehold property", xeroBalance: "£450,000.00", sourceBalance: "£450,000.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded fixed asset register against Xero account 0010 (Freehold property). All 3 freehold assets matched with no balance discrepancy." },
      { title: "Revaluation review", text: "The freehold at Unit 4 Riverside Industrial Estate was last revalued on 30 Sep 2024 at £320,000.00. Under IAS 16, if the fair value model is used, revaluations should be carried out regularly. Consider obtaining a current market valuation." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Revaluation – Unit 4 Riverside Industrial Estate", date: "30 Sep 2024", amount: "£320,000.00", description: "The freehold property at Unit 4 Riverside Industrial Estate was last revalued on 30 Sep 2024. The carrying amount of £320,000.00 may no longer reflect fair value. Consider commissioning an updated valuation, particularly if market conditions have changed materially since the last assessment.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Revaluation review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£450,000.00", variance: "£0.00" },
  },
  // ── 0011 – Leasehold improvements ──
  "0011": {
    steps: [
      { title: "Reading source",                subtext: null,                                                       duration: 800  },
      { title: "Syncing Xero",                  subtext: null,                                                       duration: 1000 },
      { title: "Analysing fixed asset register", subtext: "Matched 8 leasehold improvement items to Xero records.",  duration: 1200 },
      { title: "Comparing balances",            subtext: "Xero: £68,400.00. Fixed asset register: £65,200.00.",      duration: 1000 },
      { title: "Looking for variances",         subtext: "1 variance found (£3,200.00).",                            duration: 1500 },
      { title: "Identifying root causes",       subtext: "March amortisation journal not posted.",                   duration: 1200 },
      { title: "Suggesting actions",            subtext: null,                                                       duration: 800  },
    ],
    overviewRows: [
      { account: "0011 – Leasehold improvements", xeroBalance: "£68,400.00", sourceBalance: "£65,200.00", variance: "£3,200.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded fixed asset register against Xero account 0011 (Leasehold improvements). Xero balance is £68,400.00 vs register total of £65,200.00, resulting in a variance of £3,200.00." },
      { title: "Missing amortisation", text: "The March amortisation charge for the office fit-out (LH-003, original cost £76,800.00) has not been posted. The monthly charge of £3,200.00 is based on a 24-month lease term. The register shows accumulated amortisation of £51,200.00 while Xero shows £48,000.00." },
    ],
    suggestions: [
      { id: 0, type: "Variance", state: "Open", contact: "Amortisation – office fit-out LH-003", date: "31 Mar 2026", amount: "£3,200.00", description: "The fixed asset register shows accumulated amortisation of £51,200.00 for office fit-out LH-003, but Xero account 0011 only reflects £48,000.00. The March amortisation charge of £3,200.00 has not been posted.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Amortisation journal posted successfully", tableData: { description: "March amortisation – office fit-out LH-003", account: "0011 – Leasehold improvements", amount: "£3,200.00", date: "31 Mar 2026" } },
    ],
    reconciledResult: { sourceBalance: "£65,200.00", variance: "£3,200.00" },
  },
  // ── 0020 – Plant and machinery ──
  "0020": {
    steps: [
      { title: "Reading source",                subtext: null,                                                       duration: 800  },
      { title: "Syncing Xero",                  subtext: null,                                                       duration: 1000 },
      { title: "Analysing fixed asset register", subtext: "Matched 47 assets to Xero records.",                      duration: 1200 },
      { title: "Comparing balances",            subtext: "Xero: £87,200.00. Fixed asset register: £85,020.00.",      duration: 1000 },
      { title: "Looking for variances",         subtext: "1 variance found (£2,180.00).",                            duration: 1500 },
      { title: "Identifying root causes",       subtext: "Depreciation charge discrepancy on forklift (FA-031).",    duration: 1200 },
      { title: "Suggesting actions",            subtext: null,                                                       duration: 800  },
    ],
    overviewRows: [
      { account: "0020 – Plant and machinery", xeroBalance: "£87,200.00", sourceBalance: "£85,020.00", variance: "£2,180.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded fixed asset register against Xero account 0020 (Plant and machinery). Xero balance is £87,200.00 vs register total of £85,020.00, resulting in a variance of £2,180.00." },
      { title: "Depreciation discrepancy", text: "A £2,180.00 difference relates to forklift FA-031. The fixed asset register shows accumulated depreciation of £14,520.00 while Xero shows £12,340.00, suggesting the March depreciation charge was not posted." },
      { title: "Asset count", text: "All 47 assets on the register are present in Xero. No disposals or additions are unaccounted for." },
    ],
    suggestions: [
      { id: 0, type: "Variance", state: "Open", contact: "Depreciation – forklift FA-031", date: "31 Mar 2026", amount: "£2,180.00", description: "The fixed asset register shows accumulated depreciation of £14,520.00 for forklift FA-031, but Xero account 0020 only reflects £12,340.00. The March depreciation charge of £2,180.00 appears to be missing.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted successfully", tableData: { description: "March depreciation – forklift FA-031", account: "0020 – Plant and machinery", amount: "£2,180.00", date: "31 Mar 2026" } },
      { id: 1, type: "Missing entry", state: "Open", contact: "Disposal – office printer FA-012", date: "28 Feb 2026", amount: "£0.00", description: "Asset FA-012 (office printer) was marked as disposed on 28 Feb 2026 in the register but no disposal entry exists in Xero. The net book value at disposal was £0.00, so no P&L impact, but the cost and accumulated depreciation should be cleared.", primaryLabel: "Create disposal entry", external: false, fileAction: null, toastMessage: "Disposal entry created", tableData: { description: "Disposal of office printer FA-012", account: "0020 – Plant and machinery", amount: "£0.00", date: "28 Feb 2026" } },
    ],
    reconciledResult: { sourceBalance: "£85,020.00", variance: "£2,180.00" },
  },
  // ── 0030 – Fixtures and fittings ──
  "0030": {
    steps: [
      { title: "Reading source",                subtext: null,                                                       duration: 800  },
      { title: "Syncing Xero",                  subtext: null,                                                       duration: 1000 },
      { title: "Analysing fixed asset register", subtext: "Matched 22 fixtures items to Xero records.",              duration: 1200 },
      { title: "Comparing balances",            subtext: "Xero: £34,800.00. Fixed asset register: £34,800.00.",      duration: 1000 },
      { title: "Looking for variances",         subtext: "No variances found.",                                      duration: 1500 },
      { title: "Reviewing depreciation",        subtext: "All depreciation schedules up to date.",                   duration: 1200 },
      { title: "Suggesting actions",            subtext: "No issues found.",                                         duration: 800  },
    ],
    overviewRows: [
      { account: "0030 – Fixtures and fittings", xeroBalance: "£34,800.00", sourceBalance: "£34,800.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded fixed asset register against Xero account 0030 (Fixtures and fittings). All 22 items matched with no balance discrepancy." },
      { title: "Depreciation schedules", text: "All fixtures are depreciated on a straight-line basis over 5 years. Depreciation charges are up to date through March 2026." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Fully depreciated items – 4 assets", date: "31 Mar 2026", amount: "£0.00", description: "Four fixtures items (FF-008, FF-011, FF-014, FF-019) are fully depreciated with a net book value of £0.00 but remain on the register. Consider whether these assets are still in use and whether they should be written off to keep the register tidy.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Fully depreciated assets noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£34,800.00", variance: "£0.00" },
  },
  // ── 0031 – Office equipment ──
  "0031": {
    steps: [
      { title: "Reading source",                subtext: null,                                                       duration: 800  },
      { title: "Syncing Xero",                  subtext: null,                                                       duration: 1000 },
      { title: "Analysing fixed asset register", subtext: "Matched 15 office equipment items to Xero records.",      duration: 1200 },
      { title: "Comparing balances",            subtext: "Xero: £12,600.00. Fixed asset register: £11,850.00.",      duration: 1000 },
      { title: "Looking for variances",         subtext: "1 variance found (£750.00).",                              duration: 1500 },
      { title: "Identifying root causes",       subtext: "Capex misclassified as revenue expense.",                  duration: 1200 },
      { title: "Suggesting actions",            subtext: null,                                                       duration: 800  },
    ],
    overviewRows: [
      { account: "0031 – Office equipment", xeroBalance: "£12,600.00", sourceBalance: "£11,850.00", variance: "£750.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded fixed asset register against Xero account 0031 (Office equipment). Xero balance is £12,600.00 vs register total of £11,850.00, resulting in a variance of £750.00." },
      { title: "Capex misclassification", text: "A standing desk purchase for £750.00 (invoice OE-2026-047, 12 Feb 2026) was posted to account 6420 (General expenses) rather than account 0031 (Office equipment). The item meets the £500 capitalisation threshold and should be reclassified." },
    ],
    suggestions: [
      { id: 0, type: "Variance", state: "Open", contact: "Reclassification – standing desk OE-2026-047", date: "12 Feb 2026", amount: "£750.00", description: "A standing desk purchased for £750.00 on 12 Feb 2026 was posted to general expenses (6420) rather than office equipment (0031). The item exceeds the £500 capitalisation threshold. A reallocation journal is needed to move the cost to the fixed asset register.", primaryLabel: "Post reallocation journal", external: false, fileAction: null, toastMessage: "Reallocation journal posted successfully", tableData: { description: "Reclassify standing desk to fixed assets", account: "0031 – Office equipment", amount: "£750.00", date: "12 Feb 2026" } },
    ],
    reconciledResult: { sourceBalance: "£11,850.00", variance: "£750.00" },
  },
  // ── 0032 – Computer equipment ──
  "0032": {
    steps: [
      { title: "Reading source",                subtext: null,                                                       duration: 800  },
      { title: "Syncing Xero",                  subtext: null,                                                       duration: 1000 },
      { title: "Analysing fixed asset register", subtext: "Matched 38 computer equipment items to Xero records.",    duration: 1200 },
      { title: "Comparing balances",            subtext: "Xero: £56,200.00. Fixed asset register: £54,460.00.",      duration: 1000 },
      { title: "Looking for variances",         subtext: "1 variance found (£1,740.00).",                            duration: 1500 },
      { title: "Identifying root causes",       subtext: "March depreciation charge not posted.",                    duration: 1200 },
      { title: "Suggesting actions",            subtext: null,                                                       duration: 800  },
    ],
    overviewRows: [
      { account: "0032 – Computer equipment", xeroBalance: "£56,200.00", sourceBalance: "£54,460.00", variance: "£1,740.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded fixed asset register against Xero account 0032 (Computer equipment). Xero balance is £56,200.00 vs register total of £54,460.00, resulting in a variance of £1,740.00." },
      { title: "Missing depreciation charge", text: "The March depreciation charge of £1,740.00 for computer equipment has not been posted in Xero. The register shows monthly depreciation across 38 items totalling £1,740.00 based on a 3-year straight-line policy." },
    ],
    suggestions: [
      { id: 0, type: "Variance", state: "Open", contact: "Depreciation – computer equipment March", date: "31 Mar 2026", amount: "£1,740.00", description: "The fixed asset register shows a total depreciation charge of £1,740.00 for March 2026 across 38 computer equipment items, but this has not been posted in Xero. The monthly charge is calculated on a 3-year straight-line basis.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Depreciation journal posted successfully", tableData: { description: "March depreciation – computer equipment", account: "0032 – Computer equipment", amount: "£1,740.00", date: "31 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "Software licences capitalised – 3 items", date: "31 Mar 2026", amount: "£4,200.00", description: "Three SaaS subscriptions totalling £4,200.00 per annum have been capitalised as computer equipment. Under IFRS, SaaS arrangements are typically expensed as incurred unless the company has a software asset it controls. Review whether these should be reclassified as operating expenses.", primaryLabel: "Investigate", external: false, fileAction: null, toastMessage: "Investigation logged", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£54,460.00", variance: "£1,740.00" },
  },
  // ── 0040 – Motor vehicles ──
  "0040": {
    steps: [
      { title: "Reading source",                subtext: null,                                                       duration: 800  },
      { title: "Syncing Xero",                  subtext: null,                                                       duration: 1000 },
      { title: "Analysing fixed asset register", subtext: "Matched 9 motor vehicle items to Xero records.",          duration: 1200 },
      { title: "Comparing balances",            subtext: "Xero: £118,030.00. Fixed asset register: £112,830.00.",    duration: 1000 },
      { title: "Looking for variances",         subtext: "1 variance found (£5,200.00).",                            duration: 1500 },
      { title: "Identifying root causes",       subtext: "Disposal of van MV-004 not recorded in Xero.",            duration: 1200 },
      { title: "Suggesting actions",            subtext: null,                                                       duration: 800  },
    ],
    overviewRows: [
      { account: "0040 – Motor vehicles", xeroBalance: "£118,030.00", sourceBalance: "£112,830.00", variance: "£5,200.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded fixed asset register against Xero account 0040 (Motor vehicles). Xero balance is £118,030.00 vs register total of £112,830.00, resulting in a variance of £5,200.00." },
      { title: "Disposal not recorded", text: "Van MV-004 (Ford Transit, original cost £24,000.00) was sold on 28 Feb 2026 for £8,800.00. The register shows it as disposed with proceeds of £8,800.00 and a net book value at disposal of £14,000.00, resulting in a loss on disposal of £5,200.00. No corresponding entries exist in Xero." },
      { title: "Depreciation check", text: "All remaining motor vehicle depreciation schedules are up to date. Vehicles are depreciated on a 25% reducing balance basis, consistent with prior periods." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "Disposal – van MV-004 (Ford Transit)", date: "28 Feb 2026", amount: "£5,200.00", description: "Van MV-004 (Ford Transit) was sold on 28 Feb 2026 for £8,800.00. The original cost was £24,000.00 with accumulated depreciation of £10,000.00, giving a net book value of £14,000.00. The loss on disposal of £5,200.00 needs to be recognised, and the cost and depreciation cleared from the balance sheet.", primaryLabel: "Create disposal entry", external: false, fileAction: null, toastMessage: "Disposal entry created", tableData: { description: "Disposal of van MV-004 – Ford Transit", account: "0040 – Motor vehicles", amount: "£5,200.00", date: "28 Feb 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "Proceeds receivable – MV-004 sale", date: "28 Feb 2026", amount: "£8,800.00", description: "Sale proceeds of £8,800.00 for van MV-004 should be recorded as a receivable or confirmed as received. Verify whether the funds have been banked and posted to the correct account.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Proceeds receipt confirmed", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£112,830.00", variance: "£5,200.00" },
  },
  // ── 1100 – Trade debtors ──
  "1100": {
    steps: [
      { title: "Reading source",              subtext: null,                                                       duration: 800  },
      { title: "Syncing Xero",                subtext: null,                                                       duration: 1000 },
      { title: "Matching invoices to ledger",  subtext: "Matched 284 of 291 invoices.",                            duration: 1200 },
      { title: "Comparing balances",          subtext: "Xero: £184,320.00. Aged debtors report: £181,070.00.",     duration: 1000 },
      { title: "Looking for variances",       subtext: "2 variances found (£3,250.00 total).",                     duration: 1500 },
      { title: "Identifying root causes",     subtext: "Unmatched credit note and duplicate posting identified.",   duration: 1200 },
      { title: "Suggesting actions",          subtext: null,                                                       duration: 800  },
    ],
    overviewRows: [
      { account: "1100 – Trade debtors", xeroBalance: "£184,320.00", sourceBalance: "£181,070.00", variance: "£3,250.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded aged debtors report against Xero account 1100 (Trade debtors). 284 of 291 invoices matched. Total variance is £3,250.00." },
      { title: "Credit note not applied", text: "A credit note (CN-0482) for £1,750.00 issued to Greenfield Ltd on 22 Mar 2026 is recorded in Xero but does not appear on the aged debtors report. This may indicate a reporting timing difference." },
      { title: "Duplicate posting", text: "Invoice INV-3847 for £1,500.00 (Harrison & Co) appears twice in Xero, inflating the Xero balance. The aged debtors report shows it only once." },
    ],
    suggestions: [
      { id: 0, type: "Variance", state: "Open", contact: "Credit note CN-0482 – Greenfield Ltd", date: "22 Mar 2026", amount: "£1,750.00", description: "Credit note CN-0482 for £1,750.00 issued to Greenfield Ltd is recorded in Xero but does not appear on the aged debtors report. Verify whether the credit note was applied to the correct customer account and reporting period.", primaryLabel: "Investigate credit note", external: false, fileAction: null, toastMessage: "Credit note investigation logged", tableData: null },
      { id: 1, type: "Duplicate", state: "Open", contact: "Invoice INV-3847 – Harrison & Co", date: "18 Mar 2026", amount: "£1,500.00", description: "Invoice INV-3847 for £1,500.00 to Harrison & Co appears twice in Xero account 1100 but only once on the aged debtors report. The duplicate entry should be reversed to correct the Xero balance.", primaryLabel: "Reverse duplicate", external: false, fileAction: null, toastMessage: "Duplicate entry reversed", tableData: { description: "Reverse duplicate invoice INV-3847", account: "1100 – Trade debtors", amount: "£1,500.00", date: "18 Mar 2026" } },
      { id: 2, type: "Review", state: "Review", contact: "Overdue invoice INV-3612 – Baxter Group", date: "07 Feb 2026", amount: "£4,200.00", description: "Invoice INV-3612 for £4,200.00 to Baxter Group has been outstanding for 68 days. Consider whether a bad debt provision should be made or whether the debt should be written off.", primaryLabel: "Create provision", external: false, fileAction: null, toastMessage: "Bad debt provision created", tableData: { description: "Bad debt provision – Baxter Group", account: "1100 – Trade debtors", amount: "£4,200.00", date: "31 Mar 2026" } },
    ],
    reconciledResult: { sourceBalance: "£181,070.00", variance: "£3,250.00" },
  },
  // ── 1103 – Prepayments ──
  "1103": {
    steps: [
      { title: "Reading source",                  subtext: null,                                                 duration: 800  },
      { title: "Syncing Xero",                    subtext: null,                                                 duration: 1000 },
      { title: "Matching prepayment schedule",     subtext: "Matched 12 prepayment items.",                      duration: 1200 },
      { title: "Comparing balances",              subtext: "Xero: £23,400.00. Prepayments schedule: £23,400.00.", duration: 1000 },
      { title: "Looking for variances",           subtext: "No variances found.",                                duration: 1500 },
      { title: "Reviewing amortisation",          subtext: "2 items flagged for review.",                         duration: 1200 },
      { title: "Suggesting actions",              subtext: null,                                                 duration: 800  },
    ],
    overviewRows: [
      { account: "1103 – Prepayments", xeroBalance: "£23,400.00", sourceBalance: "£23,400.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded prepayments schedule against Xero account 1103 (Prepayments). All 12 items matched with no balance discrepancy." },
      { title: "Expired prepayment", text: "Annual software licence (PP-007, £3,600.00) expired on 28 Feb 2026 but the full amount remains on the balance sheet. The March amortisation journal of £300.00 has not been posted." },
      { title: "Insurance renewal", text: "The buildings insurance prepayment (PP-002) is amortising correctly. The next renewal is due 1 May 2026 — the schedule confirms this is already accounted for." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "Software licence amortisation – PP-007", date: "31 Mar 2026", amount: "£300.00", description: "The annual software licence (PP-007, total £3,600.00) has not had its March amortisation posted. A journal of £300.00 should be posted to release the monthly portion from prepayments to the software expense account.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted successfully", tableData: { description: "Monthly amortisation – software licence PP-007", account: "1103 – Prepayments", amount: "£300.00", date: "31 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "Insurance renewal approaching – PP-002", date: "01 May 2026", amount: "£12,000.00", description: "The buildings insurance policy (PP-002) renews on 1 May 2026. The current annual premium is £12,000.00. Confirm whether the renewal quote has been received and whether the new premium amount will differ.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Renewal noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£23,400.00", variance: "£0.00" },
  },
  // ── 1200 – Stock ──
  "1200": {
    steps: [
      { title: "Reading source",               subtext: null,                                                      duration: 800  },
      { title: "Syncing Xero",                 subtext: null,                                                      duration: 1000 },
      { title: "Analysing stock valuation",    subtext: "Matched 156 stock lines to Xero inventory.",              duration: 1200 },
      { title: "Comparing balances",           subtext: "Xero: £41,800.00. Stock count valuation: £41,800.00.",    duration: 1000 },
      { title: "Looking for variances",        subtext: "No variances found.",                                     duration: 1500 },
      { title: "Reviewing stock ageing",       subtext: "Slow-moving stock identified.",                            duration: 1200 },
      { title: "Suggesting actions",           subtext: "No issues found.",                                        duration: 800  },
    ],
    overviewRows: [
      { account: "1200 – Stock", xeroBalance: "£41,800.00", sourceBalance: "£41,800.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded stock count valuation against Xero account 1200 (Stock). All 156 stock lines matched with no balance discrepancy." },
      { title: "Valuation method", text: "All items are valued on a weighted average cost basis, consistent with the prior period. No change in valuation method detected." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Slow-moving stock – SKU-0482", date: "31 Mar 2026", amount: "£6,200.00", description: "SKU-0482 (aluminium housings, 340 units) has not moved in over 180 days. The current carrying value is £6,200.00. Consider whether a write-down provision is needed under IAS 2 net realisable value requirements.", primaryLabel: "Create provision", external: false, fileAction: null, toastMessage: "Provision created", tableData: { description: "Slow-moving stock provision – SKU-0482", account: "1200 – Stock", amount: "£6,200.00", date: "31 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "Obsolete stock – SKU-0119", date: "31 Mar 2026", amount: "£1,400.00", description: "SKU-0119 (legacy connector cables, 85 units) was discontinued by the supplier in January 2026. Current carrying value is £1,400.00. Confirm whether these items can be sold at a discount or should be written off.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Obsolete stock noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£41,800.00", variance: "£0.00" },
  },
  // ── 2100 – Trade creditors ──
  "2100": {
    steps: [
      { title: "Reading source",                subtext: null,                                                       duration: 800  },
      { title: "Syncing Xero",                  subtext: null,                                                       duration: 1000 },
      { title: "Matching supplier invoices",     subtext: "Matched 198 of 203 invoices.",                            duration: 1200 },
      { title: "Comparing balances",            subtext: "Xero: £98,450.00. Aged creditors report: £97,200.00.",     duration: 1000 },
      { title: "Looking for variances",         subtext: "1 variance found (£1,250.00).",                            duration: 1500 },
      { title: "Identifying root causes",       subtext: "Supplier invoice recorded in Xero but not on report.",     duration: 1200 },
      { title: "Suggesting actions",            subtext: null,                                                       duration: 800  },
    ],
    overviewRows: [
      { account: "2100 – Trade creditors", xeroBalance: "£98,450.00", sourceBalance: "£97,200.00", variance: "£1,250.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded aged creditors report against Xero account 2100 (Trade creditors). 198 of 203 invoices matched. Variance of £1,250.00." },
      { title: "Unmatched invoice", text: "Invoice SI-7821 from DataLink Systems (£1,250.00, dated 29 Mar 2026) is in Xero but not on the aged creditors report. This is likely due to the report being generated before the invoice was entered." },
      { title: "Disputed invoice", text: "Invoice SI-7340 from Apex Supplies (£780.00) has been in dispute since February 2026. The balance appears in both Xero and the creditors report but a credit note is expected." },
    ],
    suggestions: [
      { id: 0, type: "Timing", state: "Open", contact: "Invoice SI-7821 – DataLink Systems", date: "29 Mar 2026", amount: "£1,250.00", description: "Invoice SI-7821 from DataLink Systems for £1,250.00 is recorded in Xero but does not appear on the aged creditors report. This is likely a timing difference — confirm the report cut-off date aligns with the Xero posting date.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Timing difference acknowledged", tableData: null },
      { id: 1, type: "Review", state: "Review", contact: "Disputed invoice SI-7340 – Apex Supplies", date: "12 Feb 2026", amount: "£780.00", description: "Invoice SI-7340 from Apex Supplies for £780.00 has been in dispute since February. Contact the supplier to confirm whether a credit note will be issued or whether the invoice should be paid.", primaryLabel: "Contact supplier", external: false, fileAction: null, toastMessage: "Supplier contact logged", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£97,200.00", variance: "£1,250.00" },
  },
  // ── 2109 – Accruals ──
  "2109": {
    steps: [
      { title: "Reading source",              subtext: null,                                                  duration: 800  },
      { title: "Syncing Xero",                subtext: null,                                                  duration: 1000 },
      { title: "Matching accruals schedule",   subtext: "Matched 8 accrual items.",                           duration: 1200 },
      { title: "Comparing balances",          subtext: "Xero: £31,200.00. Accruals schedule: £31,200.00.",    duration: 1000 },
      { title: "Looking for variances",       subtext: "No variances found.",                                 duration: 1500 },
      { title: "Reviewing accrual ageing",    subtext: "1 item flagged for review.",                          duration: 1200 },
      { title: "Suggesting actions",          subtext: null,                                                  duration: 800  },
    ],
    overviewRows: [
      { account: "2109 – Accruals", xeroBalance: "£31,200.00", sourceBalance: "£31,200.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded accruals schedule against Xero account 2109 (Accruals). All 8 items matched with no balance discrepancy." },
      { title: "Stale accrual", text: "An electricity accrual for £2,400.00 was posted in December 2025. The actual invoice has since been received (£2,380.00) but has not been matched against the accrual, resulting in both entries remaining on the ledger." },
      { title: "Rent accrual", text: "The quarterly office rent accrual (£7,500.00) was posted correctly for Q1 2026. The corresponding invoice is due for payment on 1 Apr 2026." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "Stale accrual – Electricity Q4", date: "31 Dec 2025", amount: "£2,400.00", description: "An electricity accrual for £2,400.00 was posted in December 2025. The actual invoice for £2,380.00 has been received and posted to trade creditors, but the accrual has not been reversed. A journal is needed to clear the accrual and recognise the £20.00 difference.", primaryLabel: "Post reversal journal", external: false, fileAction: null, toastMessage: "Reversal journal posted", tableData: { description: "Reverse electricity accrual Q4", account: "2109 – Accruals", amount: "£2,400.00", date: "31 Dec 2025" } },
    ],
    reconciledResult: { sourceBalance: "£31,200.00", variance: "£0.00" },
  },
  // ── 2201 – VAT payable ──
  "2201": {
    steps: [
      { title: "Reading source",             subtext: null,                                                 duration: 800  },
      { title: "Syncing Xero",               subtext: null,                                                 duration: 1000 },
      { title: "Matching VAT return figures", subtext: "Compared Box 1–9 to Xero VAT account.",             duration: 1200 },
      { title: "Comparing balances",         subtext: "Xero: £36,900.00. VAT return: £36,900.00.",          duration: 1000 },
      { title: "Looking for variances",      subtext: "No variances found.",                                duration: 1500 },
      { title: "Reviewing VAT period",       subtext: "Q4 return submitted. Filing deadline met.",          duration: 1200 },
      { title: "Suggesting actions",         subtext: "No issues found.",                                   duration: 800  },
    ],
    overviewRows: [
      { account: "2201 – VAT payable", xeroBalance: "£36,900.00", sourceBalance: "£36,900.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded VAT return against Xero account 2201 (VAT payable). All nine boxes on the return agree with the Xero VAT report. No variance." },
      { title: "Payment due", text: "The Q4 VAT liability of £36,900.00 is due for payment to HMRC by 7 May 2026. The return has been filed on time." },
      { title: "Input VAT", text: "One claim for input VAT on client entertainment expenses (£890.00) was included in Box 4. Under HMRC rules, business entertainment is generally not recoverable — this should be reviewed." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Input VAT on entertainment – Box 4", date: "31 Mar 2026", amount: "£890.00", description: "An input VAT claim of £890.00 on client entertainment expenses was included in Box 4 of the VAT return. Under HMRC rules, VAT on business entertainment is generally not recoverable. Review whether this claim should be reversed to avoid a potential assessment.", primaryLabel: "Reverse VAT claim", external: false, fileAction: null, toastMessage: "VAT reversal journal posted", tableData: { description: "Reverse input VAT on entertainment", account: "2201 – VAT payable", amount: "£890.00", date: "31 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "HMRC payment due – Q4 2025/26", date: "07 May 2026", amount: "£36,900.00", description: "The Q4 VAT liability of £36,900.00 is due for payment to HMRC by 7 May 2026. Confirm the payment has been scheduled and the correct amount is being remitted, taking into account any adjustments from the entertainment claim above.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Payment schedule confirmed", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£36,900.00", variance: "£0.00" },
  },
  // ── 2150 – Corporation tax ──
  "2150": {
    steps: [
      { title: "Reading source",                subtext: null,                                                         duration: 800  },
      { title: "Syncing Xero",                  subtext: null,                                                         duration: 1000 },
      { title: "Matching tax computation",       subtext: "Compared CT600 computation to Xero tax account.",           duration: 1200 },
      { title: "Comparing balances",            subtext: "Xero: £42,500.00. Tax computation: £42,500.00.",             duration: 1000 },
      { title: "Looking for variances",         subtext: "No variances found.",                                        duration: 1500 },
      { title: "Reviewing payment schedule",    subtext: "Instalment payments on track.",                               duration: 1200 },
      { title: "Suggesting actions",            subtext: "No issues found.",                                               duration: 800  },
    ],
    overviewRows: [
      { account: "2150 – Corporation tax", xeroBalance: "£42,500.00", sourceBalance: "£42,500.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded CT600 tax computation against Xero account 2150 (Corporation tax). The provision of £42,500.00 matches the computation exactly." },
      { title: "Payment schedule", text: "Corporation tax for the year ending 31 Mar 2026 is due by 1 Jan 2027. No quarterly instalment payments are required as the company does not meet the large company threshold." },
      { title: "Prior year", text: "The prior year corporation tax liability of £28,350.00 was settled on 15 Dec 2025. No outstanding balance remains from previous periods." },
    ],
    suggestions: [],
    reconciledResult: { sourceBalance: "£42,500.00", variance: "£0.00" },
  },

  // ── 1210 – Lloyds Bank - Operations GBP ──
  "1210": {
    steps: [
      { title: "Reading source",              subtext: null,                                                         duration: 800  },
      { title: "Syncing Xero",                subtext: null,                                                         duration: 1000 },
      { title: "Matching transactions",        subtext: "Matched 361 of 380 bank transactions.",                     duration: 1200 },
      { title: "Comparing balances",          subtext: "Xero: £127,000.00. Bank feed: £125,460.00.",               duration: 1000 },
      { title: "Looking for variances",       subtext: "1 variance found (£1,540.00).",                                 duration: 1500 },
      { title: "Identifying root causes",     subtext: "Unreconciled bank charge and timing difference identified.", duration: 1200 },
      { title: "Suggesting actions",          subtext: null,                                                         duration: 800  },
    ],
    overviewRows: [
      { account: "1210 – Lloyds Bank - Operations GBP", xeroBalance: "£127,000.00", sourceBalance: "£125,460.00", variance: "£1,540.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the bank feed against Xero account 1210 (Lloyds Bank - Operations GBP). 361 of 380 transactions matched. Total variance is £1,540.00." },
      { title: "Bank charge not posted", text: "A Lloyds bank service charge of £840.00 (29 Mar 2026) appears on the bank feed but has not been posted to Xero. This is the largest contributor to the variance." },
      { title: "Timing difference", text: "A BACS payment of £700.00 to Hartfield Consulting (31 Mar 2026) cleared the bank on the last day of the period but is dated 1 Apr in Xero, creating a £700.00 timing difference." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "Lloyds bank service charge", date: "29 Mar 2026", amount: "£840.00", description: "A Lloyds bank service charge of £840.00 (ref: CHARGE-03/26) appears on the bank feed but has not been posted to Xero. Create a bank charges journal entry to record this expense.", primaryLabel: "Create journal entry", external: false, fileAction: null, toastMessage: "Journal entry created", tableData: { description: "Bank service charge – CHARGE-03/26", account: "1210 – Lloyds Bank - Operations GBP", amount: "£840.00", date: "29 Mar 2026" } },
      { id: 1, type: "Timing", state: "Open", contact: "BACS payment – Hartfield Consulting", date: "31 Mar 2026", amount: "£700.00", description: "A BACS payment of £700.00 cleared the bank on 31 Mar 2026 but is dated 1 Apr in Xero. Confirm the correct posting date to ensure the period-end balance is accurate.", primaryLabel: "Adjust posting date", external: false, fileAction: null, toastMessage: "Posting date updated", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£125,460.00", variance: "£1,540.00" },
  },
  // ── 1211 – Lloyds Bank - Business ──
  "1211": {
    steps: [
      { title: "Reading source",              subtext: null,                                               duration: 800  },
      { title: "Syncing Xero",                subtext: null,                                               duration: 1000 },
      { title: "Matching transactions",        subtext: "Matched all 241 bank transactions.",               duration: 1200 },
      { title: "Comparing balances",          subtext: "Xero: £155,000.00. Bank feed: £155,000.00.",       duration: 1000 },
      { title: "Looking for variances",       subtext: "No variances found.",                              duration: 1500 },
      { title: "Reviewing transactions",      subtext: "All transactions verified.",                       duration: 1200 },
      { title: "Suggesting actions",          subtext: "No issues found.",                                 duration: 800  },
    ],
    overviewRows: [
      { account: "1211 – Lloyds Bank - Business", xeroBalance: "£155,000.00", sourceBalance: "£155,000.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the bank feed against Xero account 1211 (Lloyds Bank - Business). All 241 transactions matched with no balance discrepancy." },
      { title: "Large unclassified receipt", text: "A receipt of £18,500.00 (14 Mar 2026, ref: BACS-REF-8821) is posted to a holding account in Xero. The source of this payment is not yet identified and should be allocated to the correct income or liability account." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Unclassified receipt – BACS-REF-8821", date: "14 Mar 2026", amount: "£18,500.00", description: "A BACS receipt of £18,500.00 (ref: BACS-REF-8821) on 14 Mar 2026 is currently posted to a holding account (9999). The source of this payment needs to be identified and allocated to the correct income or liability account before period close.", primaryLabel: "Investigate receipt", external: false, fileAction: null, toastMessage: "Investigation logged", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£155,000.00", variance: "£0.00" },
  },
  // ── 1212 – HSBC - Business Transactions ──
  "1212": {
    steps: [
      { title: "Reading source",              subtext: null,                                                     duration: 800  },
      { title: "Syncing Xero",                subtext: null,                                                     duration: 1000 },
      { title: "Matching transactions",        subtext: "Matched 189 of 195 bank transactions.",                 duration: 1200 },
      { title: "Comparing balances",          subtext: "Xero: £93,000.00. Bank feed: £92,180.00.",             duration: 1000 },
      { title: "Looking for variances",       subtext: "1 variance found (£820.00).",                               duration: 1500 },
      { title: "Identifying root causes",     subtext: "Direct debit not matched in Xero.",                     duration: 1200 },
      { title: "Suggesting actions",          subtext: null,                                                     duration: 800  },
    ],
    overviewRows: [
      { account: "1212 – HSBC - Business Transactions", xeroBalance: "£93,000.00", sourceBalance: "£92,180.00", variance: "£820.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the bank feed against Xero account 1212 (HSBC - Business Transactions). 189 of 195 transactions matched. Variance of £820.00." },
      { title: "Unmatched direct debit", text: "A direct debit of £820.00 (28 Mar 2026, payee: HMRC CUMBERNAULD) appears on the HSBC feed but has no corresponding entry in Xero. This is likely a PAYE or NI payment that needs to be recorded." },
      { title: "Minor timing items", text: "Five transactions totalling £4,200.00 are within a 2-day timing window and are expected to clear in the following period. No action needed." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "Direct debit – HMRC CUMBERNAULD", date: "28 Mar 2026", amount: "£820.00", description: "A direct debit of £820.00 to HMRC CUMBERNAULD on 28 Mar 2026 appears on the HSBC bank feed but is not recorded in Xero. This is likely a PAYE or NI payment — post the corresponding journal entry to account 2210.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "PAYE/NI payment – HMRC CUMBERNAULD", account: "2210 – PAYE and NI", amount: "£820.00", date: "28 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "5 timing difference items", date: "31 Mar 2026", amount: "£4,200.00", description: "Five transactions totalling £4,200.00 are within a 2-day clearing window at period end. These are expected to reconcile automatically in April. Confirm no manual adjustment is needed.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Timing items acknowledged", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£92,180.00", variance: "£820.00" },
  },
  // ── 1213 – Barclays - Operations ──
  "1213": {
    steps: [
      { title: "Reading source",              subtext: null,                                               duration: 800  },
      { title: "Syncing Xero",                subtext: null,                                               duration: 1000 },
      { title: "Matching transactions",        subtext: "Matched all 409 bank transactions.",               duration: 1200 },
      { title: "Comparing balances",          subtext: "Xero: £374,000.00. Bank feed: £374,000.00.",       duration: 1000 },
      { title: "Looking for variances",       subtext: "No variances found.",                              duration: 1500 },
      { title: "Reviewing transactions",      subtext: "All transactions verified.",                       duration: 1200 },
      { title: "Suggesting actions",          subtext: "No issues found.",                                 duration: 800  },
    ],
    overviewRows: [
      { account: "1213 – Barclays - Operations", xeroBalance: "£374,000.00", sourceBalance: "£374,000.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the bank feed against Xero account 1213 (Barclays - Operations). All 409 transactions matched with no balance discrepancy." },
      { title: "Recurring payment review", text: "Two standing order payments totalling £4,800.00 per month are posting to a generic expenses account. Consider reviewing whether these should be allocated to more specific cost codes for accurate reporting." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Standing order misallocation – 7770", date: "31 Mar 2026", amount: "£4,800.00", description: "Two standing order payments totalling £4,800.00/month are posting to account 7770 (General expenses). £3,200.00 relates to office cleaning (should be 7810 – Cleaning) and £1,600.00 to IT support (should be 7804 – IT maintenance). Reallocating improves cost reporting accuracy.", primaryLabel: "Post reallocation journal", external: false, fileAction: null, toastMessage: "Reallocation journal posted", tableData: { description: "Reallocate standing orders from 7770", account: "1213 – Barclays - Operations", amount: "£4,800.00", date: "31 Mar 2026" } },
    ],
    reconciledResult: { sourceBalance: "£374,000.00", variance: "£0.00" },
  },
  // ── 2110 – Deferred income ──
  "2110": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Matching deferred income schedule", subtext: "Matched 5 deferred revenue items.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £18,000.00. Schedule: £18,000.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing revenue recognition", subtext: "1 item flagged for review.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "2110 – Deferred income", xeroBalance: "£18,000.00", sourceBalance: "£18,000.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded deferred income schedule against Xero account 2110 (Deferred income). All 5 items matched with no balance discrepancy." },
      { title: "Revenue recognition", text: "A £6,000.00 annual support contract (DI-003, client: Meridian Consulting) started 1 Jan 2026. Three months of revenue (£1,500.00) should have been recognised by 31 Mar but only two months (£1,000.00) have been released." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "Revenue recognition – DI-003 Meridian", date: "31 Mar 2026", amount: "£500.00", description: "The March revenue release of £500.00 for annual support contract DI-003 (Meridian Consulting) has not been posted. A journal is needed to release one month's revenue from deferred income to the income account.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "March revenue release – DI-003", account: "2110 – Deferred income", amount: "£500.00", date: "31 Mar 2026" } },
    ],
    reconciledResult: { sourceBalance: "£18,000.00", variance: "£0.00" },
  },
  // ── 2400 – Bank loan ──
  "2400": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Matching loan schedule", subtext: "Compared amortisation schedule to Xero.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £180,000.00. Loan statement: £177,000.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "1 variance found (£3,000.00).", duration: 1500 },
      { title: "Identifying root causes", subtext: "March repayment not posted to Xero.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "2400 – Bank loan – Lloyds (5yr)", xeroBalance: "£180,000.00", sourceBalance: "£177,000.00", variance: "£3,000.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded loan statement against Xero account 2400 (Bank loan – Lloyds 5yr). Variance of £3,000.00 identified." },
      { title: "Missing repayment", text: "The March loan repayment of £3,000.00 (direct debit 28 Mar 2026) appears on the loan statement but has not been posted to Xero. The bank account (1210) shows the debit but the corresponding credit to the loan account is missing." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "March loan repayment – Lloyds", date: "28 Mar 2026", amount: "£3,000.00", description: "The March loan repayment of £3,000.00 (direct debit 28 Mar) has been debited from the bank account but the corresponding reduction in the loan liability has not been posted. A journal entry is needed to credit account 2400.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "March loan repayment – Lloyds", account: "2400 – Bank loan", amount: "£3,000.00", date: "28 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "Interest rate review due", date: "01 Jun 2026", amount: "£180,000.00", description: "The Lloyds facility agreement includes an interest rate review on 1 Jun 2026. The current rate is 5.25%. Confirm whether the bank has communicated any rate changes and whether the interest accrual needs updating.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Rate review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£177,000.00", variance: "£3,000.00" },
  },
  // ── 3100 – Retained earnings ──
  "3100": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Comparing retained earnings", subtext: "Cross-referenced P&L and prior year accounts.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £1,273,730.00. Computation: £1,273,730.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing movements", subtext: "1 item flagged for review.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "3100 – Retained earnings", xeroBalance: "£1,273,730.00", sourceBalance: "£1,273,730.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the retained earnings computation against Xero account 3100. Opening balance, current year profit, and dividends all agree. No variance." },
      { title: "Prior year adjustment", text: "A prior year adjustment of £4,200.00 was posted in January 2026 to correct a 2024/25 accrual. This has been correctly reflected in both the computation and Xero." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Dividend authorisation – Q1 2026", date: "31 Mar 2026", amount: "£25,000.00", description: "A dividend of £25,000.00 was declared and paid during Q1 2026. Confirm that a board resolution was properly documented and that the company had sufficient distributable reserves at the time of payment.", primaryLabel: "Confirm authorisation", external: false, fileAction: null, toastMessage: "Authorisation confirmed", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£1,273,730.00", variance: "£0.00" },
  },
  // ── 0050 – Goodwill ──
  "0050": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Analysing intangible asset register", subtext: "Reviewed goodwill and impairment records.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £120,000.00. Source: £120,000.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing impairment and documentation", subtext: "2 items flagged.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "0050 – Goodwill", xeroBalance: "£120,000.00", sourceBalance: "£120,000.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the intangible asset register against Xero account 0050 (Goodwill). Balances agree with no variance." },
      { title: "Impairment adjustment", text: "The annual impairment review indicates a potential adjustment of £2,000.00. This relates to revised cash flow projections for the acquired business unit and should be reflected in the accounts." },
      { title: "Documentation", text: "The assumptions underlying the impairment test — including discount rates, growth projections, and terminal value — should be formally documented and approved by management to support the carrying amount." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "Annual impairment review – goodwill", date: "31 Mar 2026", amount: "£2,000.00", description: "The annual impairment review for goodwill indicates a write-down of £2,000.00 is required based on updated cash flow projections. A journal entry is needed to debit impairment expense and credit account 0050.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "Goodwill impairment adjustment", account: "0050 – Goodwill", amount: "£2,000.00", date: "31 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "Impairment test documentation", date: "31 Mar 2026", amount: "£120,000.00", description: "The assumptions used in the goodwill impairment test — including discount rate, revenue growth rate, and terminal value — should be formally documented and approved by the board. This supports the carrying amount under FRS 102 Section 27.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Documentation review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£120,000.00", variance: "£0.00" },
  },
  // ── 1101 – Other debtors ──
  "1101": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Matching debtor balances", subtext: "Reviewed other debtor items.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £6,750.00. Source: £6,750.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing aged items", subtext: "2 items flagged for review.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "1101 – Other debtors", xeroBalance: "£6,750.00", sourceBalance: "£6,750.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the other debtors schedule against Xero account 1101 (Other debtors). Balances agree with no variance." },
      { title: "Aged staff loan", text: "A staff loan of £2,500.00 has been outstanding for over 90 days with no repayment activity. The terms of the loan and recoverability should be reviewed." },
      { title: "Deposit on closed account", text: "A deposit of £1,200.00 is held on a supplier account that has since been closed. The deposit may be irrecoverable and should be followed up or written off." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Staff loan – outstanding > 90 days", date: "31 Mar 2026", amount: "£2,500.00", description: "A staff loan of £2,500.00 on account 1101 has been outstanding for over 90 days with no repayment activity. Review the loan agreement, confirm whether a repayment schedule is in place, and assess recoverability.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Staff loan review noted", tableData: null },
      { id: 1, type: "Review", state: "Review", contact: "Deposit on closed supplier account", date: "31 Mar 2026", amount: "£1,200.00", description: "A deposit of £1,200.00 remains on a supplier account that has been closed. Contact the supplier to request a refund. If the deposit is irrecoverable, a write-off should be considered.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Deposit review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£6,750.00", variance: "£0.00" },
  },
  // ── 1104 – Accrued income ──
  "1104": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Matching accruals schedule", subtext: "Reviewed accrued income items.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £11,250.00. Source: £11,250.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing accrued items", subtext: "2 items flagged.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "1104 – Accrued income", xeroBalance: "£11,250.00", sourceBalance: "£11,250.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the accrued income schedule against Xero account 1104 (Accrued income). Balances agree with no variance." },
      { title: "Unaccrued consulting income", text: "March consulting income of £3,750.00 has been earned but not yet accrued. The work was completed and the invoice is expected to be raised in April." },
      { title: "Pending rebate confirmation", text: "A Q4 supplier rebate of £1,800.00 has been included in the accrued income schedule but confirmation from the supplier has not yet been received." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "March consulting income accrual", date: "31 Mar 2026", amount: "£3,750.00", description: "Consulting income of £3,750.00 was earned in March but has not yet been accrued in Xero. A journal entry is needed to debit account 1104 (Accrued income) and credit consulting revenue.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "March consulting income accrual", account: "1104 – Accrued income", amount: "£3,750.00", date: "31 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "Q4 rebate – supplier confirmation pending", date: "31 Mar 2026", amount: "£1,800.00", description: "A Q4 supplier rebate of £1,800.00 is included in accrued income but formal confirmation from the supplier has not been received. Follow up with the supplier to obtain written confirmation before the balance can be relied upon.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Rebate review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£11,250.00", variance: "£0.00" },
  },
  // ── 1201 – VAT receivable ──
  "1201": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Matching VAT return data", subtext: "Cross-referenced VAT return and Xero.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £14,680.00. Source: £14,680.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing VAT reclaim status", subtext: "1 item flagged for review.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "1201 – VAT receivable", xeroBalance: "£14,680.00", sourceBalance: "£14,680.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the VAT return data against Xero account 1201 (VAT receivable). Balances agree with no variance." },
      { title: "HMRC repayment tracking", text: "The VAT reclaim of £14,680.00 was submitted to HMRC but the repayment has not yet been received. Ensure the reclaim is being tracked and followed up if payment is delayed beyond the standard processing period." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "VAT reclaim – HMRC repayment tracking", date: "31 Mar 2026", amount: "£14,680.00", description: "The VAT reclaim of £14,680.00 has been submitted to HMRC but repayment has not yet been received. Confirm the submission was acknowledged, track the expected repayment date, and follow up if payment is delayed beyond 30 days.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "VAT reclaim tracking noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£14,680.00", variance: "£0.00" },
  },
  // ── 2101 – Other creditors ──
  "2101": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Matching creditor balances", subtext: "Reviewed other creditor items.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £4,300.00. Source: £4,300.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing aged balances", subtext: "1 item flagged for review.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "2101 – Other creditors", xeroBalance: "£4,300.00", sourceBalance: "£4,300.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the other creditors schedule against Xero account 2101 (Other creditors). Balances agree with no variance." },
      { title: "Aged credit balance", text: "A credit balance of £1,100.00 relates to a cancelled supplier invoice. The credit has been sitting on the account for over 6 months and may need to be written back to the profit and loss account." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Aged credit balance – cancelled invoice", date: "31 Mar 2026", amount: "£1,100.00", description: "A credit balance of £1,100.00 on account 2101 relates to a cancelled supplier invoice and has been outstanding for over 6 months. Contact the supplier to confirm whether a refund is due, or write the balance back to the profit and loss account.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Credit balance review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£4,300.00", variance: "£0.00" },
  },
  // ── 1250 – American Express OP GBP ──
  "1250": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Matching transactions", subtext: "Compared card statement to Xero entries.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £12,400.00. Source: £12,400.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing unposted charges and receipts", subtext: "2 items flagged.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "1250 – American Express OP GBP", xeroBalance: "£12,400.00", sourceBalance: "£12,400.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the Amex card statement against Xero account 1250 (American Express OP GBP). Balances agree with no variance." },
      { title: "Unposted statement charge", text: "The March statement charge of £240.00 has not been posted to Xero. This is a recurring monthly fee that should be expensed." },
      { title: "Unreceipted transactions", text: "Four transactions totalling £1,850.00 do not have receipts attached. These need expense allocation and supporting documentation before they can be fully reconciled." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "March Amex statement charge", date: "31 Mar 2026", amount: "£240.00", description: "The March statement charge of £240.00 from American Express has not been posted to Xero. A journal entry is needed to debit card charges expense and credit account 1250.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "March Amex statement charge", account: "1250 – American Express OP GBP", amount: "£240.00", date: "31 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "Unreceipted Amex transactions", date: "31 Mar 2026", amount: "£1,850.00", description: "Four transactions on the American Express card totalling £1,850.00 do not have receipts or expense allocations. Cardholders should be contacted to provide supporting documentation and confirm the expense categories.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Receipt chase noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£12,400.00", variance: "£0.00" },
  },
  // ── 1251 – Mastercard Business ──
  "1251": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Matching transactions", subtext: "Compared card statement to Xero entries.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £7,850.00. Source: £7,850.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing card transactions", subtext: "1 item flagged for review.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "1251 – Mastercard Business", xeroBalance: "£7,850.00", sourceBalance: "£7,850.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the Mastercard statement against Xero account 1251 (Mastercard Business). Balances agree with no variance." },
      { title: "Personal expense on corporate card", text: "A transaction of £620.00 appears to be a personal expense charged to the corporate card. The cardholder should reimburse the company and the transaction should be reclassified." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Personal expense – corporate Mastercard", date: "31 Mar 2026", amount: "£620.00", description: "A transaction of £620.00 on the corporate Mastercard appears to be a personal expense. The cardholder should be contacted to arrange reimbursement. Once received, the transaction should be reclassified from card expenses to a staff debtor account.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Reimbursement chase noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£7,850.00", variance: "£0.00" },
  },
  // ── 2410 – Finance lease obligations ──
  "2410": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Matching lease schedule", subtext: "Compared lease amortisation schedule to Xero.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £22,400.00. Source: £22,400.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing lease payments and terms", subtext: "2 items flagged.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "2410 – Finance lease obligations", xeroBalance: "£22,400.00", sourceBalance: "£22,400.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the lease amortisation schedule against Xero account 2410 (Finance lease obligations). Balances agree with no variance." },
      { title: "Payment split required", text: "A lease payment of £1,400.00 was posted in full to the lease liability account. Under FRS 102, lease payments must be split between the principal repayment (reducing the liability) and the interest element (charged to the profit and loss account)." },
      { title: "Lease modification", text: "A modification is pending on the office copier lease. The revised terms have not yet been reflected in the lease schedule or Xero. Once agreed, the carrying amount and future payments will need to be recalculated." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "Lease payment split – principal and interest", date: "31 Mar 2026", amount: "£1,400.00", description: "The March lease payment of £1,400.00 has been posted entirely to the lease liability. Under FRS 102, this must be split: the principal element should reduce the liability and the interest element should be charged to the profit and loss account. A journal entry is needed to reclassify the interest portion.", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "Lease payment split – interest reclassification", account: "2410 – Finance lease obligations", amount: "£1,400.00", date: "31 Mar 2026" } },
      { id: 1, type: "Review", state: "Review", contact: "Lease modification – office copier", date: "31 Mar 2026", amount: "£22,400.00", description: "A lease modification is pending on the office copier. Once the revised terms are agreed, the lease liability and right-of-use asset will need to be recalculated in accordance with FRS 102. Monitor progress and update the schedule when terms are finalised.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Lease modification review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£22,400.00", variance: "£0.00" },
  },
  // ── 2420 – Deferred tax provision ──
  "2420": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Analysing deferred tax computation", subtext: "Reviewed timing differences and tax rates.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £9,800.00. Source: £9,800.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing timing differences", subtext: "1 item flagged.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "2420 – Deferred tax provision", xeroBalance: "£9,800.00", sourceBalance: "£9,800.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the deferred tax computation against Xero account 2420 (Deferred tax provision). Balances agree with no variance." },
      { title: "Timing difference adjustment", text: "Accelerated capital allowances have created a timing difference requiring a deferred tax adjustment of £650.00. This reflects the difference between the accounting depreciation and the tax depreciation claimed in the current period." },
    ],
    suggestions: [
      { id: 0, type: "Missing entry", state: "Open", contact: "Deferred tax adjustment – accelerated depreciation", date: "31 Mar 2026", amount: "£650.00", description: "A deferred tax adjustment of £650.00 is required to reflect timing differences arising from accelerated capital allowances. A journal entry is needed to debit the deferred tax charge and credit account 2420 (Deferred tax provision).", primaryLabel: "Post journal entry", external: false, fileAction: null, toastMessage: "Journal entry posted", tableData: { description: "Deferred tax adjustment – timing differences", account: "2420 – Deferred tax provision", amount: "£650.00", date: "31 Mar 2026" } },
    ],
    reconciledResult: { sourceBalance: "£9,800.00", variance: "£0.00" },
  },
  // ── 3001 – Share premium ──
  "3001": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Reviewing share capital records", subtext: "Cross-referenced Companies House and Xero.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £49,900.00. Source: £49,900.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing share premium movements", subtext: "1 item flagged for review.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "3001 – Share premium", xeroBalance: "£49,900.00", sourceBalance: "£49,900.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the share premium records against Xero account 3001 (Share premium). Balances agree with no variance." },
      { title: "No movement in 3 years", text: "The share premium account has not changed since 2023. Confirm that no share issuances at a premium have occurred that are unrecorded. Cross-reference against the Companies House confirmation statement and any board minutes relating to share allotments." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Share premium – no movement in 3 years", date: "31 Mar 2026", amount: "£49,900.00", description: "The share premium account has remained unchanged for 3 years. Confirm that no share issuances at a premium have occurred that remain unrecorded. Cross-reference the Companies House confirmation statement and any recent board minutes regarding share allotments.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Share premium review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£49,900.00", variance: "£0.00" },
  },
  // ── 3101 – Dividends paid ──
  "3101": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Reviewing dividend records", subtext: "Cross-referenced board minutes and bank payments.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: -£25,000.00. Source: -£25,000.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing dividend authorisation", subtext: "2 items flagged for review.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "3101 – Dividends paid", xeroBalance: "-£25,000.00", sourceBalance: "-£25,000.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the dividend records against Xero account 3101 (Dividends paid). Balances agree with no variance." },
      { title: "Board minutes", text: "A dividend of £25,000.00 was paid during the period. Confirm that the declaration is supported by a board resolution or written shareholder resolution, as required under the Companies Act 2006." },
      { title: "Distributable reserves", text: "Before a dividend is paid, the company must have sufficient distributable reserves. Confirm that the reserves position at the date of payment supported the distribution." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Board minutes – dividend declaration", date: "31 Mar 2026", amount: "£25,000.00", description: "A dividend of £25,000.00 was paid during Q1 2026. Confirm that the dividend declaration is supported by a proper board resolution or written shareholder resolution, as required under the Companies Act 2006.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Board minutes review noted", tableData: null },
      { id: 1, type: "Review", state: "Review", contact: "Distributable reserves at payment date", date: "31 Mar 2026", amount: "£25,000.00", description: "Ensure the company had sufficient distributable reserves at the date the dividend was paid. Under the Companies Act 2006, a dividend may only be paid out of profits available for distribution. Review the reserves position as at the payment date.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Reserves review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "-£25,000.00", variance: "£0.00" },
  },
  // ── 3200 – Revaluation reserve ──
  "3200": {
    steps: [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Reviewing revaluation records", subtext: "Cross-referenced property valuations and reserve movements.", duration: 1200 },
      { title: "Comparing balances", subtext: "Xero: £85,000.00. Source: £85,000.00.", duration: 1000 },
      { title: "Looking for variances", subtext: "No variances found.", duration: 1500 },
      { title: "Reviewing reserve appropriateness", subtext: "1 item flagged for review.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ],
    overviewRows: [
      { account: "3200 – Revaluation reserve", xeroBalance: "£85,000.00", sourceBalance: "£85,000.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the revaluation reserve records against Xero account 3200 (Revaluation reserve). Balances agree with no variance." },
      { title: "Last revaluation", text: "The revaluation reserve of £85,000.00 relates to a property revaluation carried out in March 2023. Given that over 3 years have elapsed, the reserve should be reviewed to ensure it remains appropriate and that the underlying property value supports the carrying amount." },
    ],
    suggestions: [
      { id: 0, type: "Review", state: "Review", contact: "Revaluation reserve – appropriateness review", date: "31 Mar 2026", amount: "£85,000.00", description: "The revaluation reserve of £85,000.00 was established following a property revaluation in March 2023. Over 3 years have passed and the reserve should be reviewed to confirm the underlying property value still supports the carrying amount. If a new valuation indicates a reduction, the reserve may need to be adjusted.", primaryLabel: "Acknowledge", external: false, fileAction: null, toastMessage: "Revaluation reserve review noted", tableData: null },
    ],
    reconciledResult: { sourceBalance: "£85,000.00", variance: "£0.00" },
  },
  // ── 2301 – Directors' loan — A Jones ──
  "2301": {
    steps: [
      { title: "Syncing Xero",                    subtext: null,                                                      duration: 1000 },
      { title: "Analysing DLA transactions",       subtext: "18 transactions found on account 2301.",                  duration: 1200 },
      { title: "Checking sign and classification", subtext: "Credit balance of £3,200.00 – company owes director.", duration: 1200 },
      { title: "Reviewing transaction history",    subtext: "Regular expense reimbursements identified.",              duration: 1000 },
      { title: "Classifying transactions",         subtext: "Reimbursements: 14, Personal expenses: 3, Other: 1.",    duration: 1200 },
      { title: "Generating findings",              subtext: null,                                                      duration: 800  },
    ],
    overviewRows: [
      { account: "2301 – Directors' loan — A Jones", xeroBalance: "-£3,200.00", sourceBalance: "–", variance: "–" },
    ],
    analysis: [
      { title: "Overview", text: "Analysis of directors' loan account 2301 (A Jones) based on Xero GL data. The account shows a credit balance of £3,200.00, meaning the company owes A Jones. No S455 exposure arises as the account is not overdrawn." },
      { title: "Sign and classification", text: "The credit balance correctly reflects amounts owed to the director. The account is classified as a current liability, which is appropriate for a credit-balance DLA." },
      { title: "Transaction classification", text: "Of 18 transactions, 14 are expense reimbursements (travel, client entertainment), 3 appear to be personal expenses paid by the company, and 1 is unclassified. The 3 personal expenses totalling £480 may need reclassifying if they were not agreed director benefits." },
    ],
    suggestions: [
      { id: 0, type: "Reclassification", state: "Open", contact: "Confirm with A Jones – review personal expense coding", date: "31 Mar 2026", amount: "£480.00", description: "Three transactions totalling £480.00 on account 2301 appear to be personal expenses rather than business reimbursements. Confirm with A Jones whether these are personal or business expenses and reclassify if needed.", primaryLabel: "I have resolved this", hideSecondary: true, external: false, fileAction: null, toastMessage: "Marked as resolved", tableData: null },
      { id: 1, type: "Disclosure", state: "Review", contact: "Acknowledge related party disclosure – A Jones", date: "31 Mar 2026", amount: "£3,200.00", description: "The credit balance of £3,200.00 owed to A Jones should be disclosed as a related party transaction under FRS 102 Section 33. Ensure this is included in the financial statements.", primaryLabel: "I have resolved this", hideSecondary: true, external: false, fileAction: null, toastMessage: "Marked as resolved", tableData: null },
    ],
    reconciledResult: { sourceBalance: "–", variance: "–" },
  },
  // ── 2300 – Directors' loan — J Smith ──
  "2300": {
    steps: [
      { title: "Syncing Xero",                    subtext: null,                                                           duration: 1000 },
      { title: "Analysing DLA transactions",       subtext: "42 transactions found on account 2300.",                       duration: 1200 },
      { title: "Checking S455 exposure",           subtext: "Overdrawn balance of £15,000.00 – S455 charge may apply.", duration: 1500 },
      { title: "Assessing benefit in kind",        subtext: "Interest-free loan above £10,000 threshold.",                  duration: 1200 },
      { title: "Classifying transactions",         subtext: "Drawings: 28, Repayments: 12, Dividends: 2.",                 duration: 1200 },
      { title: "Generating findings",              subtext: null,                                                           duration: 800  },
    ],
    overviewRows: [
      { account: "2300 – Directors' loan — J Smith", xeroBalance: "£15,000.00", sourceBalance: "–", variance: "–" },
    ],
    analysis: [
      { title: "Overview", text: "Analysis of directors' loan account 2300 (J Smith) based on Xero GL data. The account shows an overdrawn balance of £15,000.00, meaning J Smith owes the company. This triggers S455 tax exposure, benefit-in-kind reporting and Companies Act s197 disclosure requirements." },
      { title: "S455 exposure", text: "The overdrawn balance of £15,000.00 will attract a S455 corporation tax charge of £5,062.50 (at 33.75%) if not repaid by the 9-month deadline. Based on the year-end of 31 March 2026, the deadline is 1 January 2027." },
      { title: "Benefit in kind", text: "The loan exceeded £10,000 for 9 months during the tax year. At the HMRC official rate of 3.75%, the estimated BIK is £421.88 with Class 1A NIC of £63.28. This should be reported on J Smith's P11D." },
      { title: "Bed-and-breakfasting", text: "A repayment of £8,000 on 12 Jan 2026 was followed by a redrawing of £6,500 on 28 Jan 2026 (16 days later). This may be caught by the 30-day anti-avoidance rule under CTA 2010 s464C, which would disregard the repayment for S455 purposes." },
      { title: "Transaction classification", text: "Of 42 transactions, 28 are drawings (personal expenses and transfers), 12 are repayments, and 2 are dividend offsets. Three personal expenses totalling £2,340 are currently coded to general overheads and may need reclassifying to the DLA." },
    ],
    suggestions: [
      { id: 0, type: "S455 exposure", state: "Open", contact: "Accrue S455 liability – J Smith DLA", date: "01 Jan 2027", amount: "£5,062.50", description: "The overdrawn DLA balance of £15,000.00 will trigger an S455 corporation tax charge of £5,062.50 (33.75%) if not repaid by 1 January 2027. Consider accruing the liability and confirming the director's repayment plan.", primaryLabel: "Create accrual", external: false, fileAction: null, toastMessage: "S455 accrual posted", tableData: { description: "S455 accrual – DLA J Smith", account: "2300 – Directors' loan — J Smith", amount: "£5,062.50", date: "31 Mar 2026" } },
      { id: 1, type: "Benefit in kind", state: "Open", contact: "Flag P11D – interest-free loan above threshold", date: "05 Apr 2026", amount: "£421.88", description: "J Smith's interest-free loan exceeded £10,000 for 9 months, giving rise to a benefit in kind of £421.88 and Class 1A NIC of £63.28. Ensure this is included on the P11D.", primaryLabel: "I have resolved this", hideSecondary: true, external: false, fileAction: null, toastMessage: "Marked as resolved", tableData: null },
      { id: 2, type: "Anti-avoidance", state: "Review", contact: "Confirm bed-and-breakfasting – Jan 2026 repayment", date: "12 Jan 2026", amount: "£6,500.00", description: "A repayment of £8,000 on 12 Jan was followed by a redrawing of £6,500 on 28 Jan (16 days). The 30-day rule under CTA 2010 s464C may disregard this repayment for S455 purposes. Confirm whether the repayment was funded by taxed income.", primaryLabel: "I have resolved this", hideSecondary: true, external: false, fileAction: null, toastMessage: "Marked as resolved", tableData: null },
      { id: 3, type: "Reclassification", state: "Open", contact: "Post journal – reclassify personal expenses to DLA", date: "31 Mar 2026", amount: "£2,340.00", description: "Three transactions totalling £2,340.00 appear to be personal expenses currently coded to general overheads (6100). These should be reclassified to the directors' loan account.", primaryLabel: "Create journal", external: false, fileAction: null, toastMessage: "Reclassification journal posted", tableData: { description: "Reclass personal expenses to DLA", account: "2300 – Directors' loan — J Smith", amount: "£2,340.00", date: "31 Mar 2026" } },
      { id: 4, type: "Disclosure", state: "Review", contact: "Request board minutes – Companies Act s197 approval", date: "31 Mar 2026", amount: "£15,000.00", description: "The overdrawn DLA exceeds £10,000, requiring board or shareholder approval under Companies Act 2006 s197. No board minutes or loan agreement were found. Confirm approval is in place.", primaryLabel: "I have resolved this", hideSecondary: true, external: false, fileAction: null, toastMessage: "Marked as resolved", tableData: null },
    ],
    reconciledResult: { sourceBalance: "–", variance: "–" },
  },

  // ── 2210 – PAYE and NI (payroll group account) ──
  "2210": {
    steps: [
      { title: "Reading source",                subtext: null,                                                       duration: 800  },
      { title: "Syncing Xero",                  subtext: null,                                                       duration: 1000 },
      { title: "Matching payroll figures",       subtext: "Compared PAYE & NI entries to Xero account.",              duration: 1200 },
      { title: "Comparing balances",            subtext: "Xero: £22,180.00. Payroll report: £22,180.00.",            duration: 1000 },
      { title: "Looking for variances",         subtext: "No variances found.",                                      duration: 1500 },
      { title: "Reviewing HMRC timing",         subtext: "HMRC payment due 22 Apr 2026.",                            duration: 1200 },
      { title: "Suggesting actions",            subtext: null,                                                       duration: 800  },
    ],
    overviewRows: [
      { account: "2210 – PAYE and NI", xeroBalance: "£22,180.00", sourceBalance: "£22,180.00", variance: "£0.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the payroll report against Xero account 2210 (PAYE and NI). Balances match at £22,180.00 with no variance." },
      { title: "PAYE and NI timing", text: "Account 2210 shows an increase of £1,340.00 this period. The payroll report confirms a corresponding HMRC payment is due 22 Apr 2026, indicating a normal timing difference." },
      { title: "Missing journal entry", text: "An employer NI contribution of £186.00 for a new starter (employee #25, 15 Mar 2026) appears in the payroll report but has no matching entry in Xero under account 2210." },
    ],
    suggestions: PAYROLL_SUGGESTIONS.filter(function(s) { return s.accountCode === "2210"; }),
    reconciledResult: { sourceBalance: "£22,180.00", variance: "£0.00" },
  },

  // ── 2230 – Pension contributions (payroll group account) ──
  "2230": {
    steps: [
      { title: "Reading source",                  subtext: null,                                                       duration: 800  },
      { title: "Syncing Xero",                    subtext: null,                                                       duration: 1000 },
      { title: "Matching pension entries",         subtext: "Compared pension contributions to Xero account.",          duration: 1200 },
      { title: "Comparing balances",              subtext: "Xero: £8,640.00. Payroll report: £8,540.00.",              duration: 1000 },
      { title: "Looking for variances",           subtext: "1 variance found (£100.00).",                              duration: 1500 },
      { title: "Identifying root causes",         subtext: "Timing difference on March employer contribution.",         duration: 1200 },
      { title: "Suggesting actions",              subtext: null,                                                       duration: 800  },
    ],
    overviewRows: [
      { account: "2230 – Pension contributions", xeroBalance: "£8,640.00", sourceBalance: "£8,540.00", variance: "£100.00" },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the payroll report against Xero account 2230 (Pension contributions). Xero balance is £8,640.00 vs payroll report of £8,540.00, resulting in a variance of £100.00." },
      { title: "Pension contribution variance", text: "A £100.00 difference was identified in account 2230. The Xero balance exceeds the payroll report figure, likely due to a timing difference on the March employer contribution posting." },
    ],
    suggestions: PAYROLL_SUGGESTIONS.filter(function(s) { return s.accountCode === "2230"; }),
    reconciledResult: { sourceBalance: "£8,540.00", variance: "£100.00" },
  },
};

// ── DLA accounts and shared config ──────────────────────────────────────────
const DLA_ACCOUNTS = [
  { code: "2300", account: "Directors' loan — J Smith" },
  { code: "2301", account: "Directors' loan — A Jones" },
];
const DLA_ACCOUNT_CODES = new Set(DLA_ACCOUNTS.map(a => a.code));

// ── DLA-specific reconciliation steps (used when no file uploaded) ───────────
const DLA_RECONCILIATION_STEPS = [
  { title: "Syncing Xero",                    subtext: null,                                                                          duration: 1000 },
  { title: "Analysing DLA transactions",       subtext: "60 transactions found across 2 director accounts.",                           duration: 1200 },
  { title: "Checking S455 exposure",           subtext: "Overdrawn balance on 2300 (£15,000.00) – S455 charge may apply.",        duration: 1500 },
  { title: "Assessing benefit in kind",        subtext: "Interest-free loan above £10,000 threshold on 2300.",                         duration: 1200 },
  { title: "Classifying transactions",         subtext: "2300: Drawings 28, Repayments 12, Dividends 2. 2301: Reimbursements 14.",     duration: 1200 },
  { title: "Generating findings",              subtext: null,                                                                          duration: 800  },
];

// ── Fixed Assets accounts and shared config ──────────────────────────────────
const FA_ACCOUNTS = [
  { code: "0010", account: "Freehold property" },
  { code: "0011", account: "Leasehold improvements" },
  { code: "0020", account: "Plant and machinery" },
  { code: "0030", account: "Fixtures and fittings" },
  { code: "0031", account: "Office equipment" },
  { code: "0032", account: "Computer equipment" },
  { code: "0040", account: "Motor vehicles" },
];
const FA_ACCOUNT_CODES = new Set(FA_ACCOUNTS.map(a => a.code));

// ── Fixed-assets-specific reconciliation steps ───────────────────────────────
const FA_RECONCILIATION_STEPS = [
  { title: "Syncing Xero",                     subtext: null,                                                                     duration: 1000 },
  { title: "Reading fixed asset register",      subtext: "142 assets identified across 7 accounts.",                               duration: 1200 },
  { title: "Comparing cost and NBV",            subtext: "Xero total cost £824,600.00 vs register £821,340.00.",                   duration: 1500 },
  { title: "Checking depreciation schedules",   subtext: "3 accounts with unposted depreciation charges.",                         duration: 1200 },
  { title: "Identifying disposals",             subtext: "1 disposal in register with no matching Xero entry.",                    duration: 1200 },
  { title: "Generating findings",               subtext: null,                                                                     duration: 800  },
];

// Helper: get reconciliation data for an account, with generic fallback
function getAccountRecData(code, account) {
  if (ACCOUNT_REC_DATA[code]) return ACCOUNT_REC_DATA[code];

  // Find the row in BS_SECTIONS to get balances
  let rowData = null;
  for (const section of BS_SECTIONS) {
    for (const table of section.tables) {
      const found = table.rows.find(r => r.code === code);
      if (found) { rowData = found; break; }
    }
    if (rowData) break;
  }
  const xero = rowData ? rowData.xeroBalance : "—";
  const source = rowData ? rowData.sourceBalance : "—";
  const variance = rowData ? rowData.variance : "£0.00";
  const hasVariance = variance !== "£0.00";

  return {
    steps: [
      { title: "Reading source",          subtext: null,                                                           duration: 800  },
      { title: "Syncing Xero",            subtext: null,                                                           duration: 1000 },
      { title: "Analysing document",      subtext: "Matched source entries to Xero records.",                      duration: 1200 },
      { title: "Comparing balances",      subtext: "Xero: " + xero + ". Source document: " + source + ".",        duration: 1000 },
      { title: "Looking for variances",   subtext: hasVariance ? "Variance found (" + variance + ")." : "No variances found.", duration: 1500 },
      { title: "Reviewing entries",       subtext: hasVariance ? "Investigating variance." : "All entries verified.", duration: 1200 },
      { title: "Suggesting actions",      subtext: null,                                                           duration: 800  },
    ],
    overviewRows: [
      { account: code + " – " + account, xeroBalance: xero, sourceBalance: source, variance: variance },
    ],
    analysis: [
      { title: "Overview", text: "Reconciliation compared the uploaded document against Xero account " + code + " (" + account + "). Xero balance is " + xero + " vs source document of " + source + (hasVariance ? ", resulting in a variance of " + variance + "." : ". No variance was found.") },
      { title: "Entries review", text: hasVariance ? "A variance of " + variance + " was identified between the source document and Xero. Review the individual transactions to determine whether this relates to a timing difference, posting error, or missing entry." : "All entries in the source document matched the corresponding Xero transactions. No discrepancies were identified." },
    ],
    suggestions: hasVariance ? [
      { id: 0, type: "Variance", state: "Open", contact: code + " – " + account, date: "31 Mar 2026", amount: variance, description: "A variance of " + variance + " was found between the Xero balance (" + xero + ") and the source document (" + source + ") for account " + code + " (" + account + "). Investigate the difference and post a correcting journal if necessary.", primaryLabel: "Investigate", external: false, fileAction: null, toastMessage: "Investigation logged", tableData: null },
      { id: 1, type: "Review", state: "Review", contact: "Period-end confirmation – " + code, date: "31 Mar 2026", amount: xero, description: "Confirm that all transactions posted to account " + code + " (" + account + ") during the period have been reviewed and that the variance of " + variance + " has been fully explained before closing.", primaryLabel: "Confirm & close", external: false, fileAction: null, toastMessage: "Period-end confirmed", tableData: null },
    ] : [],
    reconciledResult: { sourceBalance: source, variance: variance },
  };
}

// Helper: derive status label from the action button label
function _actionToStatusLabel(actionLabel) {
  if (!actionLabel) return "Resolved";
  var lower = actionLabel.toLowerCase();
  if (/post journal|reverse|create journal|create disposal|reallocation/i.test(lower)) return "Journal posted";
  if (/create accrual/i.test(lower)) return "Accrual posted";
  if (/create provision/i.test(lower)) return "Provision created";
  if (/acknowledge/i.test(lower)) return "Acknowledged";
  return "Resolved";
}

// ── Balance Sheet: PayrollResultsPanel ───────────────────────────────────────
function PayrollResultsPanel({ resolvedCards = new Set(), ignoredCards = new Set(), onResolveCard, onIgnoreCard, onShowToast, accountReconciled = false, noDocument = false, customOverviewRows, infoBannerAccounts, customSuggestions, onResyncComplete, initialResyncedData, resolvedLabels = {} }) {
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [resyncedData, setResyncedData] = useState(initialResyncedData || {});

  const _rawOverviewRows = customOverviewRows || [
    { account: "2210 \u2013 PAYE and NI",         xeroBalance: "\u00a322,180.00", sourceBalance: "\u00a322,366.00", variance: "\u00a3186.00" },
    { account: "2230 \u2013 Pension contributions", xeroBalance: "\u00a38,640.00",  sourceBalance: "\u00a38,540.00",  variance: "\u00a3100.00" },
  ];
  // When no document provided, override sourceBalance/variance to "–"
  const overviewRows = noDocument
    ? _rawOverviewRows.map(r => ({ ...r, sourceBalance: "\u2013", variance: "\u2013" }))
    : _rawOverviewRows;

  // Notify parent whenever resynced data changes so it can persist
  useEffect(() => {
    if (onResyncComplete && Object.keys(resyncedData).length > 0) {
      onResyncComplete(resyncedData);
    }
  }, [resyncedData]);

  const suggestions = customSuggestions || PAYROLL_SUGGESTIONS;

  // Apply resynced data overrides to overview rows (keyed by account code)
  const effectiveRows = overviewRows.map((row) => {
    var code = row.account.split(" ")[0];
    return resyncedData[code] ? Object.assign({}, row, resyncedData[code]) : row;
  });

  const handleResyncAll = () => {
    if (isSyncingAll) return;
    setIsSyncingAll(true);
    setTimeout(() => {
      var allUpdates = {};
      overviewRows.forEach(function(row) {
        var accountCode = row.account.split(" ")[0];
        var updates = {};
        suggestions.forEach(function(s) {
          if (s.accountCode !== accountCode) return;
          if (!resolvedCards.has(s.id)) return;
          if (s.id === 0 && accountCode === "2230") {
            updates.xeroBalance = "£8,540.00";
            updates.variance = "£0.00";
          }
          if (s.id === 2 && accountCode === "2210") {
            updates.xeroBalance = "£22,366.00";
            updates.variance = "£0.00";
          }
        });
        if (noDocument) { delete updates.variance; }
        if (Object.keys(updates).length > 0) {
          allUpdates[accountCode] = updates;
        }
      });
      if (Object.keys(allUpdates).length > 0) {
        setResyncedData(function(prev) { return Object.assign({}, prev, allUpdates); });
      }
      setIsSyncingAll(false);
    }, 2000);
  };

  const getCardStatus = (id) => {
    if (resolvedCards.has(id)) return "resolved";
    if (ignoredCards.has(id)) return "ignored";
    return "open";
  };

  return (
    <div style={{ padding: "48px", fontFamily: "'Inter', sans-serif", minHeight: "100%" }}>
      <style>{`
        @keyframes resyncShimmer { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes resyncSpin { to{transform:rotate(360deg)} }
      `}</style>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

      {/* Heading + Re-sync button */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0 0 20px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: T.colorTextPrimary, margin: 0 }}>Overview</h2>
        {isSyncingAll ? (
          <SecondaryButton disabled style={{ padding: "0 12px", height: 32, fontSize: 13, whiteSpace: "nowrap", cursor: "default", display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 68 }}>
            <span style={{ display: "inline-block", width: 14, height: 14, border: `2px solid ${T.colorBrandLighter}`, borderTopColor: T.colorBrandPrimary, borderRadius: "50%", animation: "resyncSpin 0.6s linear infinite" }} />
          </SecondaryButton>
        ) : (
          <SecondaryButton onClick={handleResyncAll} style={{ padding: "0 12px", height: 32, fontSize: 13, whiteSpace: "nowrap" }}>Re-sync</SecondaryButton>
        )}
      </div>

      {/* Info banner for no-document reconciliation */}
      {noDocument && !infoBannerAccounts && (
        <div style={{ background: T.colorInfoBg, border: `1px solid ${T.colorInfoBorder}`, borderRadius: 8, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "flex-start", gap: 10 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
            <circle cx="8" cy="8" r="7" stroke="#6389CF" strokeWidth="1.5" fill="none"/>
            <path d="M8 7v4M8 5.5v0" stroke="#6389CF" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 13, color: T.colorTextThird, lineHeight: "20px" }}>
            {"This reconciliation was performed using connected Xero data only. No source document was provided for comparison."}
          </span>
        </div>
      )}

      {/* Info banner for non-payroll accounts analysed via Xero only */}
      {infoBannerAccounts && infoBannerAccounts.length > 0 && (
        <div style={{ background: T.colorInfoBg, border: `1px solid ${T.colorInfoBorder}`, borderRadius: 8, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "flex-start", gap: 10 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
            <circle cx="8" cy="8" r="7" stroke="#6389CF" strokeWidth="1.5" fill="none"/>
            <path d="M8 7v4M8 5.5v0" stroke="#6389CF" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 13, color: T.colorTextThird, lineHeight: "20px" }}>
            {"I couldn\u2019t find numbers in the source files for " + infoBannerAccounts.join(" and ") + ". I analysed " + (infoBannerAccounts.length === 1 ? "it" : "them") + " against Xero data instead."}
          </span>
        </div>
      )}

      {/* Account balances table */}
      <div style={{ marginBottom: 12 }}>
        <DataTable
          columns={[
            { key: "account", label: "Account", width: "1.6fr", render: (v, row, ri) => (
              <span style={isSyncingAll ? { animation: "resyncShimmer 1s ease-in-out infinite" } : {}}>{v}</span>
            )},
            { key: "xeroBalance", label: "Balance per Xero", width: "1fr", align: "right", render: (v, row, ri) => (
              <span style={isSyncingAll ? { animation: "resyncShimmer 1s ease-in-out infinite" } : {}}>{v}</span>
            )},
            { key: "sourceBalance", label: "Balance per source", width: "1fr", align: "right", render: (v, row, ri) => (
              <span style={isSyncingAll ? { animation: "resyncShimmer 1s ease-in-out infinite" } : {}}>{v}</span>
            )},
            { key: "variance", label: "Variance", width: "0.8fr", align: "right", render: (v, row, ri) => (
              <span style={Object.assign({ color: T.colorTextPrimary, fontWeight: v === "\u00a30.00" || v === "\u2013" || v === "\u2014" ? 400 : 600 }, isSyncingAll ? { animation: "resyncShimmer 1s ease-in-out infinite" } : {})}>{v}</span>
            )},
          ]}
          rows={effectiveRows}
        />
      </div>

      {/* Analysis & key findings */}
      <div style={{ background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, marginBottom: 28 }}>
        <button onClick={() => setAnalysisOpen(o => !o)}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", border: "none", background: "none", cursor: "pointer" }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>Analysis & key findings</span>
          <div style={{ display: "flex", transform: analysisOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s", flexShrink: 0 }}>
            <ChevronUpIcon />
          </div>
        </button>
        {analysisOpen && (
          <div style={{ padding: "0 16px 16px", fontSize: 14, color: T.colorTextThird, lineHeight: "22px", borderTop: `1px solid ${T.colorBorderDark}`, paddingTop: 14 }}>
            {noDocument ? (
            <>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: T.colorTextPrimary, marginBottom: 2 }}>Overview</div>
              <div>Payroll accounts 2210 (PAYE and NI) and 2230 (Pension contributions) were analysed using Xero data only. No source document was provided, so balance comparison and variance detection were not performed.</div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: T.colorTextPrimary, marginBottom: 2 }}>PAYE and NI (2210)</div>
              <div>The current Xero balance is £22,180.00. Account 2210 shows an increase of £1,340.00 this period, consistent with a monthly PAYE cycle. An HMRC payment appears due around 22 Apr 2026.</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: T.colorTextPrimary, marginBottom: 2 }}>Pension contributions (2230)</div>
              <div>The current Xero balance is £8,640.00. Posting activity this period is consistent with expected employer and employee contribution patterns. No unusual entries were identified.</div>
            </div>
            </>
            ) : (
            <>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: T.colorTextPrimary, marginBottom: 2 }}>Overview</div>
              <div>The payroll reconciliation compared the uploaded payroll report against Xero accounts 2210 (PAYE and NI) and 2230 (Pension contributions). Combined Xero balance is £30,820.00 vs payroll report total of £30,906.00, resulting in a net variance of £286.00.</div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: T.colorTextPrimary, marginBottom: 2 }}>Pension contribution variance</div>
              <div>A £100.00 difference was identified in account 2230 (Pension contributions). The Xero balance exceeds the payroll report figure, likely due to a timing difference on the March employer contribution posting.</div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: T.colorTextPrimary, marginBottom: 2 }}>PAYE and NI timing</div>
              <div>Account 2210 shows an increase of £1,340.00 this period. The payroll report confirms a corresponding HMRC payment is due 22 Apr 2026, indicating a normal timing difference rather than an error.</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: T.colorTextPrimary, marginBottom: 2 }}>Missing journal entry</div>
              <div>An employer NI contribution of £186.00 for a new starter (employee #25, 15 Mar 2026) appears in the payroll report but has no matching entry in Xero under account 2210.</div>
            </div>
            </>
            )}
          </div>
        )}
      </div>

      {/* Suggestions */}
      <h2 style={{ fontSize: 22, fontWeight: 600, color: T.colorTextPrimary, margin: "0 0 20px" }}>Suggestions</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {suggestions.map((entry) => {
          const status = getCardStatus(entry.id);
          const isResolved = status === "resolved";
          const isIgnored = status === "ignored";
          const isClosed = isResolved || isIgnored;
          var storedLabel = resolvedLabels[entry.id];
          var displayStatusLabel = storedLabel || (isIgnored ? "Ignored" : isResolved ? "Resolved" : "Unresolved");
          return (
            <RecommendationCard
              key={entry.id}
              title={`${entry.type}: ${entry.contact}`}
              description={entry.description}
              statusLabel={displayStatusLabel}
              statusStyle={isIgnored
                ? { background: T.colorButtonDisabled, border: "none", color: T.colorTextSecondary }
                : isResolved
                  ? { background: T.colorBrandLighter, border: "none", color: T.colorBrandPrimary }
                  : { background: T.colorWarningBg, border: "none", color: T.colorWarning }
              }
              collapsed={isClosed}
              accountReconciled={accountReconciled && !isClosed}
              tableRow={entry.tableData || null}
              tableColumns={entry.tableData ? [
                { key: "description", label: "Description", width: "1.6fr" },
                { key: "account",     label: "Account",     width: "1.2fr" },
                { key: "amount",      label: "Amount",      width: "0.8fr" },
                { key: "date",        label: "Date",        width: "0.8fr" },
              ] : null}
              primaryLabel={entry.primaryLabel}
              secondaryLabel={entry.hideSecondary ? null : "I have resolved this"}
              external={entry.external}
              fileAction={entry.fileAction}
              hideMore
              onPrimaryAction={() => { onResolveCard?.(entry.id, _actionToStatusLabel(entry.primaryLabel)); onShowToast?.(entry.toastMessage); }}
              onSecondaryAction={entry.hideSecondary ? null : (() => { onResolveCard?.(entry.id, "Resolved"); onShowToast?.("Marked as resolved"); })}
              onIgnore={() => { onIgnoreCard?.(entry.id); onShowToast?.("Suggestion ignored"); }}
            />
          );
        })}
      </div>

      <div style={{ paddingBottom: 32 }} />
      </div>
    </div>
  );
}

// ── Balance Sheet: AccountResultsPanel (generic, data-driven) ────────────────
// ── DLA Overview Table ─────────────────────────────────────────────────────
const DLA_OVERVIEW_ROWS = [
  { account: "2300 – Directors' loan — J Smith", opening: "£12,400.00 (asset)", movement: "+£2,600.00", closing: "£15,000.00 (asset)", isSummary: false },
  { account: "2301 – Directors' loan — A Jones", opening: "-£2,800.00 (liability)", movement: "-£400.00", closing: "-£3,200.00 (liability)", isSummary: false },
  { account: "Net DLA position", opening: "£9,600.00", movement: "+£2,200.00", closing: "£11,800.00", isSummary: true },
];

function _parseDLAVal(s) { return parseFloat(String(s || "0").replace(/[£,]/g, "").replace(/\s*\(.*\)/, "")) || 0; }

// ── Resync mapping for generic accounts ──
// Defines how resolved suggestions update overview row figures.
// Each entry: suggestionId → cumulative updates if that suggestion is resolved.
// We compute the final xeroBalance/variance from original + all resolved suggestion effects.
var ACCOUNT_RESYNC_EFFECTS = {
  "0011": [{ id: 0, xeroAdjust: -3200 }],   // amortisation correction reduces Xero by £3,200
  "0020": [{ id: 0, xeroAdjust: -2180 }],   // depreciation correction reduces Xero by £2,180
  "0031": [{ id: 0, xeroAdjust: -750 }],    // reclassification of standing desk reduces Xero by £750
  "0032": [{ id: 0, xeroAdjust: -1740 }],   // depreciation correction reduces Xero by £1,740
  "0040": [{ id: 0, xeroAdjust: -5200 }],   // disposal of van MV-004 reduces Xero by £5,200
  "1100": [{ id: 1, xeroAdjust: -1500 }],    // reverse duplicate reduces Xero by £1,500
  "1210": [{ id: 0, xeroAdjust: -840 }, { id: 1, xeroAdjust: -700 }],  // bank charge + timing adj
  "1212": [{ id: 0, xeroAdjust: -820 }],     // direct debit posted reduces Xero by £820
  "2400": [{ id: 0, xeroAdjust: -3000 }],    // loan repayment reduces Xero by £3,000
};

function _parseGBP(s) { return parseFloat(String(s || "0").replace(/[£,\-]/g, "")) || 0; }
function _fmtGBP(n) { return "£" + Math.abs(n).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

function AccountResultsPanel({ config, isDLAPanel, dlaSingleCode, fromCustomPayroll = false, noDocument = false, resolvedCards = new Set(), ignoredCards = new Set(), onResolveCard, onIgnoreCard, onShowToast, accountReconciled = false, onResyncComplete, initialResyncedData, resolvedLabels = {}, resyncIdOffsets = null }) {
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [isSyncingDLA, setIsSyncingDLA] = useState(false);
  const [resyncedDLAData, setResyncedDLAData] = useState((isDLAPanel || dlaSingleCode) ? (initialResyncedData || {}) : {});
  const [resyncedAccountData, setResyncedAccountData] = useState((!isDLAPanel && !dlaSingleCode) ? (initialResyncedData || {}) : {});

  // Notify parent when DLA resync data changes
  useEffect(function() {
    if (onResyncComplete && (isDLAPanel || dlaSingleCode) && Object.keys(resyncedDLAData).length > 0) {
      onResyncComplete(resyncedDLAData);
    }
  }, [resyncedDLAData]);

  // Notify parent when generic account resync data changes
  useEffect(function() {
    if (onResyncComplete && !isDLAPanel && !dlaSingleCode && Object.keys(resyncedAccountData).length > 0) {
      onResyncComplete(resyncedAccountData);
    }
  }, [resyncedAccountData]);

  // Compute effective DLA rows with resync overrides + recomputed summary
  var effectiveDLARows = DLA_OVERVIEW_ROWS.map(function(row) {
    if (row.isSummary) return row;
    var code = row.account.split(" ")[0];
    return resyncedDLAData[code] ? Object.assign({}, row, resyncedDLAData[code]) : row;
  });
  // Recompute net position summary row
  var _dlaDataRows = effectiveDLARows.filter(function(r) { return !r.isSummary; });
  var _sumO = 0, _sumM = 0, _sumC = 0;
  _dlaDataRows.forEach(function(r) { _sumO += _parseDLAVal(r.opening); _sumM += _parseDLAVal(r.movement); _sumC += _parseDLAVal(r.closing); });
  var _fmtAbs = function(n) { return "£" + Math.abs(n).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  effectiveDLARows = effectiveDLARows.map(function(r) {
    if (!r.isSummary) return r;
    return Object.assign({}, r, {
      opening: (_sumO < 0 ? "-" : "") + _fmtAbs(_sumO),
      movement: (_sumM >= 0 ? "+" : "-") + _fmtAbs(_sumM),
      closing: (_sumC < 0 ? "-" : "") + _fmtAbs(_sumC),
    });
  });

  var handleDLAResyncAll = function() {
    if (isSyncingDLA) return;
    setIsSyncingDLA(true);
    setTimeout(function() {
      var rows = isDLAPanel ? DLA_OVERVIEW_ROWS.filter(function(r) { return !r.isSummary; }) : (dlaSingleCode ? [DLA_OVERVIEW_ROWS.find(function(r) { return !r.isSummary && r.account.startsWith(dlaSingleCode); })] : []);
      var allUpdates = {};
      rows.forEach(function(row) {
        if (!row) return;
        var code = row.account.split(" ")[0];
        var updates = {};
        if (code === "2300") {
          var s3Id = isDLAPanel ? 3 : 3;
          if (resolvedCards.has(s3Id)) {
            updates.closing = "£17,340.00 (asset)";
            updates.movement = "+£4,940.00";
          }
        }
        if (code === "2301") {
          var s0Id = isDLAPanel ? 5 : 0;
          if (resolvedCards.has(s0Id)) {
            updates.closing = "-£2,720.00 (liability)";
            updates.movement = "+£80.00";
          }
        }
        if (Object.keys(updates).length > 0) {
          allUpdates[code] = updates;
        }
      });
      if (Object.keys(allUpdates).length > 0) {
        setResyncedDLAData(function(prev) { return Object.assign({}, prev, allUpdates); });
      }
      setIsSyncingDLA(false);
    }, 2000);
  };

  // Generic account resync handler — syncs all rows at once
  var [isSyncingAccount, setIsSyncingAccount] = useState(false);
  var handleAccountResyncAll = function() {
    if (isSyncingAccount) return;
    setIsSyncingAccount(true);
    setTimeout(function() {
      var allUpdates = {};
      config.overviewRows.forEach(function(row) {
        var code = row.account.split(" ")[0];
        var effects = ACCOUNT_RESYNC_EFFECTS[code];
        if (!effects || effects.length === 0) return;
        var origXero = _parseGBP(row.xeroBalance);
        var origSource = _parseGBP(row.sourceBalance);
        var totalAdjust = 0;
        var codeOffset = (resyncIdOffsets && resyncIdOffsets[code] != null) ? resyncIdOffsets[code] : 0;
        effects.forEach(function(eff) {
          if (resolvedCards.has(eff.id + codeOffset)) { totalAdjust += eff.xeroAdjust; }
        });
        if (totalAdjust !== 0) {
          var newXero = origXero + totalAdjust;
          var newVariance = Math.abs(newXero - origSource);
          var updates = { xeroBalance: _fmtGBP(newXero), variance: _fmtGBP(newVariance) };
          if (noDocument) { delete updates.variance; }
          allUpdates[code] = updates;
        }
      });
      if (Object.keys(allUpdates).length > 0) {
        setResyncedAccountData(function(prev) { return Object.assign({}, prev, allUpdates); });
      }
      setIsSyncingAccount(false);
    }, 2000);
  };

  const { suggestions } = config;
  // When no document provided or fromCustomPayroll, override sourceBalance/variance to "–"
  const overviewRows = (noDocument || fromCustomPayroll)
    ? config.overviewRows.map(r => ({ ...r, sourceBalance: "\u2013", variance: "\u2013" }))
    : config.overviewRows;
  // Apply generic account resync overrides
  var effectiveOverviewRows = overviewRows.map(function(row) {
    var code = row.account.split(" ")[0];
    return resyncedAccountData[code] ? Object.assign({}, row, resyncedAccountData[code]) : row;
  });
  // When no document provided, replace analysis with Xero-only version
  const analysis = (noDocument || fromCustomPayroll) ? (() => {
    const accountName = config.overviewRows[0] ? config.overviewRows[0].account : "this account";
    const xeroBalance = config.overviewRows[0] ? config.overviewRows[0].xeroBalance : "\u2013";
    return [
      { title: "Overview", text: accountName + " was analysed using Xero data only. The current Xero balance is " + xeroBalance + ". No source document was provided, so balance comparison and variance detection were not performed." },
      { title: "Transaction review", text: "Xero postings were reviewed for unusual entries, classification errors and timing anomalies. No issues were identified from the available data." },
    ];
  })() : config.analysis;

  const getCardStatus = (id) => {
    if (resolvedCards.has(id)) return "resolved";
    if (ignoredCards.has(id)) return "ignored";
    return "open";
  };

  return (
    <div style={{ padding: "48px", fontFamily: "'Inter', sans-serif", minHeight: "100%" }}>
      <style>{`
        @keyframes resyncShimmer { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes resyncSpin { to{transform:rotate(360deg)} }
      `}</style>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

      {/* Heading + Re-sync button */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0 0 20px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: T.colorTextPrimary, margin: 0 }}>Overview</h2>
        {!fromCustomPayroll && (() => {
          var syncing = (isDLAPanel || dlaSingleCode) ? isSyncingDLA : isSyncingAccount;
          var handler = (isDLAPanel || dlaSingleCode) ? handleDLAResyncAll : handleAccountResyncAll;
          return syncing ? (
            <SecondaryButton disabled style={{ padding: "0 12px", height: 32, fontSize: 13, whiteSpace: "nowrap", cursor: "default", display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 68 }}>
              <span style={{ display: "inline-block", width: 14, height: 14, border: `2px solid ${T.colorBrandLighter}`, borderTopColor: T.colorBrandPrimary, borderRadius: "50%", animation: "resyncSpin 0.6s linear infinite" }} />
            </SecondaryButton>
          ) : (
            <SecondaryButton onClick={handler} style={{ padding: "0 12px", height: 32, fontSize: 13, whiteSpace: "nowrap" }}>Re-sync</SecondaryButton>
          );
        })()}
      </div>

      {/* Info banner for no-document reconciliation */}
      {noDocument && !fromCustomPayroll && (
        <div style={{ background: T.colorInfoBg, border: `1px solid ${T.colorInfoBorder}`, borderRadius: 8, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "flex-start", gap: 10 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
            <circle cx="8" cy="8" r="7" stroke="#6389CF" strokeWidth="1.5" fill="none"/>
            <path d="M8 7v4M8 5.5v0" stroke="#6389CF" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 13, color: T.colorTextThird, lineHeight: "20px" }}>
            {"This account was analysed using connected Xero data only. No source document was provided for comparison."}
          </span>
        </div>
      )}

      {/* Account balances table */}
      <div style={{ marginBottom: 12 }}>
        {isDLAPanel ? (
          <DataTable
            columns={[
              { key: "account",  label: "Account",                          width: "1.8fr", render: function(v, row, ri) {
                var isShimmer = !row.isSummary && isSyncingDLA;
                return <span style={Object.assign({ fontWeight: row.isSummary ? 600 : 400, color: T.colorTextPrimary }, isShimmer ? { animation: "resyncShimmer 1s ease-in-out infinite" } : {})}>{v}</span>;
              }},
              { key: "opening",  label: "Opening balance (1 Apr 2025)",     width: "1fr", align: "right", render: function(v, row, ri) {
                var isShimmer = !row.isSummary && isSyncingDLA;
                return <span style={Object.assign({ fontWeight: row.isSummary ? 600 : 400 }, isShimmer ? { animation: "resyncShimmer 1s ease-in-out infinite" } : {})}>{v}</span>;
              }},
              { key: "movement", label: "Movement in year",                 width: "0.9fr", align: "right", render: function(v, row, ri) {
                var isShimmer = !row.isSummary && isSyncingDLA;
                return <span style={Object.assign({ fontWeight: row.isSummary ? 600 : 400 }, isShimmer ? { animation: "resyncShimmer 1s ease-in-out infinite" } : {})}>{v}</span>;
              }},
              { key: "closing",  label: "Closing balance (31 Mar 2026)",    width: "1fr", align: "right", render: function(v, row, ri) {
                var isShimmer = !row.isSummary && isSyncingDLA;
                return <span style={Object.assign({ fontWeight: row.isSummary ? 600 : 400 }, isShimmer ? { animation: "resyncShimmer 1s ease-in-out infinite" } : {})}>{v}</span>;
              }},
            ]}
            rows={effectiveDLARows}
          />
        ) : dlaSingleCode ? (() => {
          var baseDlaRow = DLA_OVERVIEW_ROWS.find(function(r) { return !r.isSummary && r.account.startsWith(dlaSingleCode); });
          if (!baseDlaRow) return null;
          var code = baseDlaRow.account.split(" ")[0];
          var dlaRow = resyncedDLAData[code] ? Object.assign({}, baseDlaRow, resyncedDLAData[code]) : baseDlaRow;
          return (
            <DataTable
              columns={[
                { key: "opening",  label: "Opening balance (1 Apr 2025)",   width: "1fr", align: "right", render: function(v, row, ri) {
                  return <span style={isSyncingDLA ? { animation: "resyncShimmer 1s ease-in-out infinite" } : {}}>{v}</span>;
                }},
                { key: "movement", label: "Movement in year",               width: "0.9fr", align: "right", render: function(v, row, ri) {
                  return <span style={isSyncingDLA ? { animation: "resyncShimmer 1s ease-in-out infinite" } : {}}>{v}</span>;
                }},
                { key: "closing",  label: "Closing balance (31 Mar 2026)",  width: "1fr", align: "right", render: function(v, row, ri) {
                  return <span style={isSyncingDLA ? { animation: "resyncShimmer 1s ease-in-out infinite" } : {}}>{v}</span>;
                }},
              ]}
              rows={[dlaRow]}
            />
          );
        })() : fromCustomPayroll ? (
        <>
        <div style={{ background: T.colorInfoBg, border: `1px solid ${T.colorInfoBorder}`, borderRadius: 8, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "flex-start", gap: 10 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
            <circle cx="8" cy="8" r="7" stroke="#6389CF" strokeWidth="1.5" fill="none"/>
            <path d="M8 7v4M8 5.5v0" stroke="#6389CF" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 13, color: T.colorTextThird, lineHeight: "20px" }}>
            {"This account was analysed as part of payroll reconciliation using Xero data only. To reconcile against a source file, restart reconciliation for this account individually."}
          </span>
        </div>
        <DataTable
          columns={[
            { key: "account",       label: "Account",            width: "1.6fr" },
            { key: "xeroBalance",   label: "Balance per Xero",   width: "1fr", align: "right" },
            { key: "sourceBalance", label: "Balance per source",  width: "1fr", align: "right" },
            { key: "variance",      label: "Variance",           width: "0.8fr", align: "right" },
          ]}
          rows={overviewRows}
        />
        </>
        ) : (
        <DataTable
          columns={[
            { key: "account",       label: "Account",            width: "1.6fr", render: function(v, row, ri) {
              return <span style={isSyncingAccount ? { animation: "resyncShimmer 1s ease-in-out infinite" } : {}}>{v}</span>;
            }},
            { key: "xeroBalance",   label: "Balance per Xero",   width: "1fr", align: "right", render: function(v, row, ri) {
              return <span style={isSyncingAccount ? { animation: "resyncShimmer 1s ease-in-out infinite" } : {}}>{v}</span>;
            }},
            { key: "sourceBalance", label: "Balance per source",  width: "1fr", align: "right", render: function(v, row, ri) {
              return <span style={isSyncingAccount ? { animation: "resyncShimmer 1s ease-in-out infinite" } : {}}>{v}</span>;
            }},
            { key: "variance",      label: "Variance",           width: "0.8fr", align: "right", render: function(v, row, ri) {
              return <span style={Object.assign({ color: T.colorTextPrimary, fontWeight: v === "£0.00" || v === "–" || v === "—" ? 400 : 600 }, isSyncingAccount ? { animation: "resyncShimmer 1s ease-in-out infinite" } : {})}>{v}</span>;
            }},
          ]}
          rows={effectiveOverviewRows}
        />
        )}
      </div>

      {/* Analysis & key findings */}
      <div style={{ background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, marginBottom: 28 }}>
        <button onClick={() => setAnalysisOpen(o => !o)}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", border: "none", background: "none", cursor: "pointer" }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>Analysis & key findings</span>
          <div style={{ display: "flex", transform: analysisOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s", flexShrink: 0 }}>
            <ChevronUpIcon />
          </div>
        </button>
        {analysisOpen && (
          <div style={{ padding: "0 16px 16px", fontSize: 14, color: T.colorTextThird, lineHeight: "22px", borderTop: `1px solid ${T.colorBorderDark}`, paddingTop: 14 }}>
            {analysis.map((section, i) => (
              <div key={i} style={{ marginBottom: i < analysis.length - 1 ? 14 : 0 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: T.colorTextPrimary, marginBottom: 2 }}>{section.title}</div>
                <div>{section.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Suggestions */}
      <h2 style={{ fontSize: 22, fontWeight: 600, color: T.colorTextPrimary, margin: "0 0 20px" }}>Suggestions</h2>

      {suggestions.length === 0 ? (
        <div style={{ background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 12, padding: "32px 24px", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="#05A105" strokeWidth="2"/>
              <path d="M13 20L18 25L27 15" stroke="#05A105" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: T.colorTextPrimary, margin: "0 0 6px" }}>No suggestions or variance found</h3>
          <p style={{ fontSize: 14, color: T.colorTextThird, margin: 0, lineHeight: "22px" }}>Mark this account as reconciled, or restart reconciliation to re-check.</p>
        </div>
      ) : (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {suggestions.map((entry) => {
          const status = getCardStatus(entry.id);
          const isResolved = status === "resolved";
          const isIgnored = status === "ignored";
          const isClosed = isResolved || isIgnored;
          var isJournalAction = /post journal|reverse|create journal|create accrual|create provision|create disposal/i.test(entry.primaryLabel || "");
          var effectivePrimary = !isJournalAction ? "Acknowledge" : entry.primaryLabel;
          var effectiveSecondary = !isJournalAction ? null : (entry.hideSecondary ? null : "I have resolved this");
          var effectiveToast = !isJournalAction ? "Acknowledged" : entry.toastMessage;
          return (
            <RecommendationCard
              key={entry.id}
              title={entry.type + ": " + entry.contact}
              description={entry.description}
              statusLabel={resolvedLabels[entry.id] || (isIgnored ? "Ignored" : isResolved ? "Resolved" : "Unresolved")}
              statusStyle={isIgnored
                ? { background: T.colorButtonDisabled, border: "none", color: T.colorTextSecondary }
                : isResolved
                  ? { background: T.colorBrandLighter, border: "none", color: T.colorBrandPrimary }
                  : { background: T.colorWarningBg, border: "none", color: T.colorWarning }
              }
              collapsed={isClosed}
              accountReconciled={accountReconciled && !isClosed}
              tableRow={entry.tableData || null}
              tableColumns={entry.tableData ? [
                { key: "description", label: "Description", width: "1.6fr" },
                { key: "account",     label: "Account",     width: "1.2fr" },
                { key: "amount",      label: "Amount",      width: "0.8fr" },
                { key: "date",        label: "Date",        width: "0.8fr" },
              ] : null}
              primaryLabel={effectivePrimary}
              secondaryLabel={effectiveSecondary}
              external={entry.external}
              fileAction={entry.fileAction}
              hideMore
              onPrimaryAction={() => { onResolveCard?.(entry.id, _actionToStatusLabel(effectivePrimary)); onShowToast?.(effectiveToast); }}
              onSecondaryAction={effectiveSecondary ? (() => { onResolveCard?.(entry.id, "Resolved"); onShowToast?.("Marked as resolved"); }) : null}
              onIgnore={() => { onIgnoreCard?.(entry.id); onShowToast?.("Suggestion ignored"); }}
            />
          );
        })}
      </div>
      )}

      <div style={{ paddingBottom: 32 }} />
      </div>
    </div>
  );
}

// ── Balance Sheet: BSReconciliationFlow ──────────────────────────────────────
function BSReconciliationFlow({ onClose, onMarkReconciled, onSwitchAccount, onSaveState, directAccount, presetType, savedState, bsReconciledData }) {
  const isDirectFlow = !!directAccount;
  const isResume = !!savedState;
  const isCustomPayrollResume = isResume && savedState && savedState.customPayrollAccounts && savedState.customPayrollAccounts.length > 0;
  const [selectedType, setSelectedType] = useState(presetType || null);
  const [typeSelected, setTypeSelected] = useState(!!presetType);
  const [accountChoiceSelected, setAccountChoiceSelected] = useState(isCustomPayrollResume ? "Pick accounts to reconcile" : (isResume && presetType === "Payroll" ? "Continue with suggested accounts" : null));
  const [pickedBSAccount, setPickedBSAccount] = useState(null);
  const [pickedAccountAction, setPickedAccountAction] = useState(null); // "View reconciliation results" | "Restart reconciliation" | null
  const [presetAction, setPresetAction] = useState(null); // "View reconciliation results" | "Start new reconciliation" | null
  const [accountSearch, setAccountSearch] = useState("");
  const [bsDropdownOpen, setBsDropdownOpen] = useState(false);
  const [bsDropdownSearch, setBsDropdownSearch] = useState("");
  // Effective direct account: either from prop (table click) or from chat picker
  const effectiveDirectAccount = directAccount || pickedBSAccount;
  // Active preset for the top bar selector (when in a preset flow)
  const activePreset = selectedType === "Payroll" ? BS_PRESET_ITEMS[0]
    : selectedType === "Directors' loan account" ? BS_PRESET_ITEMS[1]
    : selectedType === "Fixed assets" ? BS_PRESET_ITEMS[2]
    : null;
  const selectorLabel = effectiveDirectAccount
    ? (effectiveDirectAccount.code.startsWith("__") ? effectiveDirectAccount.account : effectiveDirectAccount.code + " – " + effectiveDirectAccount.account)
    : activePreset ? activePreset.account : null;
  // Safe account label for chat messages (avoids null access when in preset flow)
  const accountLabel = effectiveDirectAccount
    ? (effectiveDirectAccount.code + " – " + effectiveDirectAccount.account)
    : activePreset ? activePreset.account : "this account";
  const _baseRecData = effectiveDirectAccount ? getAccountRecData(effectiveDirectAccount.code, effectiveDirectAccount.account) : null;
  // When resuming from savedState that has per-account suggestions (from group reconciliation), override suggestions
  const accountRecData = _baseRecData && savedState && savedState.accountSuggestions
    ? { ..._baseRecData, suggestions: savedState.accountSuggestions }
    : _baseRecData;
  const activeSteps = effectiveDirectAccount ? accountRecData.steps : PAYROLL_RECONCILIATION_STEPS;
  const reconciliationTypes = [
    "Payroll", "Directors' loan account", "Fixed assets", "Choose account from balance sheet",
  ];
  // Check if a preset type has existing results (all member accounts reconciled/reviewing)
  const presetMemberCodes = selectedType === "Payroll" ? PRESET_MEMBER_CODES["__payroll__"]
    : selectedType === "Directors' loan account" ? PRESET_MEMBER_CODES["__dla__"]
    : selectedType === "Fixed assets" ? PRESET_MEMBER_CODES["__fixed_assets__"]
    : null;
  const presetHasResults = !presetType && typeSelected && presetMemberCodes && bsReconciledData
    && presetMemberCodes.every(function(c) { return bsReconciledData[c] && (bsReconciledData[c].status === "reconciled" || bsReconciledData[c].status === "reviewing" || bsReconciledData[c].status === "suggestions"); });
  const isNoDocResume = isResume && savedState && savedState.noDocument;
  const [uploadedFiles, setUploadedFiles] = useState((isResume && !isNoDocResume) || isCustomPayrollResume ? [{ name: "Uploaded document.pdf", type: "application/pdf", label: "Reconciliation document" }] : []);
  const uploadedFile = uploadedFiles.length > 0 ? uploadedFiles[0] : null; // compat alias
  const [prepDone, setPrepDone] = useState((isResume && !isNoDocResume) || isCustomPayrollResume ? true : false);
  const [noDocument, setNoDocument] = useState(isNoDocResume && !isCustomPayrollResume ? true : false); // true when user clicks "I don't have a file"
  const [noDocChoice, setNoDocChoice] = useState(isNoDocResume && !isCustomPayrollResume ? "analyse" : null); // null | "analyse" | "upload"
  const [readyChoice, setReadyChoice] = useState((isResume && !isNoDocResume) || isCustomPayrollResume ? "Start reconciliation" : null);
  // "Add another document" loop state
  const [addMoreRound, setAddMoreRound] = useState(0); // increments each "Add another document"
  const [addMorePrepDone, setAddMorePrepDone] = useState(false);
  const [startAfterMore, setStartAfterMore] = useState(false); // true when user clicks Start after adding files
  const [addMoreWaitingUpload, setAddMoreWaitingUpload] = useState(false); // true after user clicks "Add another document", reset when file uploaded

  // "Pick accounts to reconcile" flow state
  const [pickAccountsOpen, setPickAccountsOpen] = useState(false); // dropdown open/closed
  const [pickAccountsDropUp, setPickAccountsDropUp] = useState(false); // true = open upward
  const pickAccountsTriggerRef = useRef(null);
  const [pickAccountsSearch, setPickAccountsSearch] = useState("");
  const [pickedPayrollAccounts, setPickedPayrollAccounts] = useState(isCustomPayrollResume ? savedState.customPayrollAccounts : ["2210", "2230"]); // pre-selected payroll codes
  const [pickAccountsConfirmed, setPickAccountsConfirmed] = useState(!!isCustomPayrollResume);
  const isCustomPayroll = !!(accountChoiceSelected === "Pick accounts to reconcile" && pickAccountsConfirmed);

  // Restart reconciliation flow state
  const [restartMode, setRestartMode] = useState(null); // null | "choosing" | "same_file" | "new_file"
  const [restartChoice, setRestartChoice] = useState(null); // "Reconcile against the same file" | "Reconcile against another file"
  const [restartUploadedFiles, setRestartUploadedFiles] = useState([]);
  const [restartPrepDone, setRestartPrepDone] = useState(false);
  const [restartReadyChoice, setRestartReadyChoice] = useState(null);
  const [restartStepStatuses, setRestartStepStatuses] = useState([]);
  const [restartStepSubtexts, setRestartStepSubtexts] = useState([]);
  const [restartCanvasReady, setRestartCanvasReady] = useState(false);
  const [restartResultsVisible, setRestartResultsVisible] = useState(false);
  const [restartAddMoreRound, setRestartAddMoreRound] = useState(0);
  const [restartAddMorePrepDone, setRestartAddMorePrepDone] = useState(false);
  const [restartStartAfterMore, setRestartStartAfterMore] = useState(false);

  // ── DLA-specific state ──
  const [dlaDirectChoice, setDlaDirectChoice] = useState(null); // "Reconcile entire DLA" | "Reconcile this account only" | null
  // dlaHasResults: when true, DLA direct accounts jump straight to results view
  const isDLAAccount = isDirectFlow && directAccount && DLA_ACCOUNT_CODES.has(directAccount.code);
  const dlaHasResults = isDLAAccount && bsReconciledData && DLA_ACCOUNTS.every(function(a) { return bsReconciledData[a.code] && (bsReconciledData[a.code].status === "reconciled" || bsReconciledData[a.code].status === "reviewing"); });
  const isDLA = selectedType === "Directors' loan account" || (isDLAAccount && dlaDirectChoice === "Reconcile entire DLA");
  const isDLAResume = isResume && savedState && savedState.isDLA;
  const isDlaNoDocResume = isDLAResume && savedState && savedState.noDocument;
  const [dlaReadyChoice, setDlaReadyChoice] = useState(isDLAResume && !isDlaNoDocResume ? "Start reconciliation" : null); // "Start reconciliation" | "Add document"
  const [dlaUploadedFiles, setDlaUploadedFiles] = useState([]);
  const [dlaPrepDone, setDlaPrepDone] = useState(false);
  const [dlaNoDocument, setDlaNoDocument] = useState(isDlaNoDocResume ? true : false);
  const [dlaNoDocChoice, setDlaNoDocChoice] = useState(isDlaNoDocResume ? "analyse" : null); // null | "analyse" | "upload"
  const [dlaStartChoice, setDlaStartChoice] = useState(null); // after upload: "Start reconciliation" | "Add another document"
  const [dlaAddMoreRound, setDlaAddMoreRound] = useState(0);
  const [dlaAddMorePrepDone, setDlaAddMorePrepDone] = useState(false);
  const [dlaAddMoreWaiting, setDlaAddMoreWaiting] = useState(false);
  const [dlaStartAfterMore, setDlaStartAfterMore] = useState(false);
  const [dlaStepStatuses, setDlaStepStatuses] = useState(isDLAResume ? DLA_RECONCILIATION_STEPS.map(() => "done") : []);
  const [dlaStepSubtexts, setDlaStepSubtexts] = useState(isDLAResume ? DLA_RECONCILIATION_STEPS.map(() => true) : []);
  const [dlaCanvasReady, setDlaCanvasReady] = useState(!!isDLAResume || !!dlaHasResults);
  const [dlaResultsVisible, setDlaResultsVisible] = useState(!!isDLAResume || !!dlaHasResults);
  const [dlaRestartTrigger, setDlaRestartTrigger] = useState(0); // increment to re-run DLA steps

  // ── Fixed Assets-specific state ──
  const isFA = selectedType === "Fixed assets";
  const isFAResume = isResume && savedState && savedState.isFA;
  const isFaNoDocResume = isFAResume && savedState && savedState.noDocument;
  const [faReadyChoice, setFaReadyChoice] = useState(isFAResume && !isFaNoDocResume ? "Start reconciliation" : null);
  const [faUploadedFiles, setFaUploadedFiles] = useState([]);
  const [faPrepDone, setFaPrepDone] = useState(false);
  const [faNoDocument, setFaNoDocument] = useState(isFaNoDocResume ? true : false);
  const [faNoDocChoice, setFaNoDocChoice] = useState(isFaNoDocResume ? "analyse" : null);
  const [faStartChoice, setFaStartChoice] = useState(null);
  const [faAddMoreRound, setFaAddMoreRound] = useState(0);
  const [faAddMorePrepDone, setFaAddMorePrepDone] = useState(false);
  const [faAddMoreWaiting, setFaAddMoreWaiting] = useState(false);
  const [faStartAfterMore, setFaStartAfterMore] = useState(false);
  const [faStepStatuses, setFaStepStatuses] = useState(isFAResume ? FA_RECONCILIATION_STEPS.map(() => "done") : []);
  const [faStepSubtexts, setFaStepSubtexts] = useState(isFAResume ? FA_RECONCILIATION_STEPS.map(() => true) : []);
  const [faCanvasReady, setFaCanvasReady] = useState(!!isFAResume);
  const [faResultsVisible, setFaResultsVisible] = useState(!!isFAResume);
  const [faRestartTrigger, setFaRestartTrigger] = useState(0);

  // Account choice for FA (same pattern as payroll)
  const [faAccountChoiceSelected, setFaAccountChoiceSelected] = useState(isFAResume ? "Continue with suggested accounts" : null);
  const [faPickAccountsOpen, setFaPickAccountsOpen] = useState(false);
  const [faPickAccountsSearch, setFaPickAccountsSearch] = useState("");
  const [faPickedAccounts, setFaPickedAccounts] = useState(FA_ACCOUNTS.map(a => a.code)); // all pre-selected
  const [faPickAccountsConfirmed, setFaPickAccountsConfirmed] = useState(false);
  const faPickAccountsTriggerRef = useRef(null);
  const [faPickAccountsDropUp, setFaPickAccountsDropUp] = useState(false);

  // FA resync overrides
  const [faResyncOverrides, setFaResyncOverrides] = useState(() => {
    var overrides = {};
    FA_ACCOUNTS.forEach(function(acc) {
      var rd = bsReconciledData && bsReconciledData[acc.code];
      if (rd && (rd.resyncedXeroBalance || rd.resyncedVariance)) {
        overrides[acc.code] = {};
        if (rd.resyncedXeroBalance) overrides[acc.code].xeroBalance = rd.resyncedXeroBalance;
        if (rd.resyncedVariance) overrides[acc.code].variance = rd.resyncedVariance;
      }
    });
    return Object.keys(overrides).length > 0 ? overrides : {};
  });

  // File label helpers — context-based placeholder names
  const FILE_LABELS = ["Reconciliation document", "Supporting document", "Additional document"];
  const getFileLabel = (index) => index < FILE_LABELS.length ? FILE_LABELS[index] : "Document " + (index + 1);

  // Handler for adding files (single or multi-drop)
  const handleFilesAdded = (files) => {
    const labelled = files.map((f, i) => ({ ...f, label: getFileLabel(uploadedFiles.length + i) }));
    setUploadedFiles(prev => [...prev, ...labelled]);
  };
  const handleFirstFile = (file) => {
    setUploadedFiles([{ ...file, label: getFileLabel(0) }]);
  };
  const handleAddMoreFiles = (files) => {
    const labelled = files.map((f, i) => ({ ...f, label: getFileLabel(uploadedFiles.length + i) }));
    setUploadedFiles(prev => [...prev, ...labelled]);
  };
  const [stepStatuses, setStepStatuses] = useState(isResume ? activeSteps.map(() => "done") : []);
  const [stepSubtexts, setStepSubtexts] = useState(isResume ? activeSteps.map(() => true) : []);
  const [resultsVisible, setResultsVisible] = useState(!!isResume);
  const [canvasReady, setCanvasReady] = useState(!!isResume);
  const [chatWidth, setChatWidth] = useState(400);
  const [isDragging, setIsDragging] = useState(false);
  const [resolvedCards, setResolvedCards] = useState(() => {
    if (dlaHasResults) {
      // Single DLA account from table — use only this account's suggestion statuses
      var acctData = bsReconciledData[directAccount.code];
      if (acctData && acctData.accountSuggestions) {
        return new Set(acctData.accountSuggestions.filter(function(s) { return s.resolvedStatus === "resolved"; }).map(function(s) { return s.id; }));
      }
      return new Set();
    }
    if (!isResume) return new Set();
    if (savedState.accountSuggestions) return new Set(savedState.accountSuggestions.filter(s => s.resolvedStatus === "resolved").map(s => s.id));
    return savedState.resolvedCards ? new Set(savedState.resolvedCards) : new Set();
  });
  const [ignoredCards, setIgnoredCards] = useState(() => {
    if (dlaHasResults) {
      // Single DLA account from table — use only this account's suggestion statuses
      var acctData = bsReconciledData[directAccount.code];
      if (acctData && acctData.accountSuggestions) {
        return new Set(acctData.accountSuggestions.filter(function(s) { return s.resolvedStatus === "ignored"; }).map(function(s) { return s.id; }));
      }
      return new Set();
    }
    if (!isResume) return new Set();
    if (savedState.accountSuggestions) return new Set(savedState.accountSuggestions.filter(s => s.resolvedStatus === "ignored").map(s => s.id));
    return savedState.ignoredCards ? new Set(savedState.ignoredCards) : new Set();
  });
  const [resolvedLabels, setResolvedLabels] = useState(() => {
    if (dlaHasResults) {
      var acctData = bsReconciledData[directAccount.code];
      return (acctData && acctData.resolvedLabels) || {};
    }
    if (!isResume) return {};
    return savedState.resolvedLabels || {};
  });
  const [payrollResyncOverrides, setPayrollResyncOverrides] = useState(() => {
    var overrides = {};
    ["2210", "2230"].forEach(function(code) {
      var rd = bsReconciledData && bsReconciledData[code];
      if (rd && (rd.resyncedXeroBalance || rd.resyncedVariance)) {
        overrides[code] = {};
        if (rd.resyncedXeroBalance) overrides[code].xeroBalance = rd.resyncedXeroBalance;
        if (rd.resyncedVariance) overrides[code].variance = rd.resyncedVariance;
      }
    });
    return Object.keys(overrides).length > 0 ? overrides : {};
  });
  const [dlaResyncOverrides, setDlaResyncOverrides] = useState(() => {
    var overrides = {};
    ["2300", "2301"].forEach(function(code) {
      var rd = bsReconciledData && bsReconciledData[code];
      if (rd && (rd.resyncedClosing || rd.resyncedMovement)) {
        overrides[code] = {};
        if (rd.resyncedClosing) overrides[code].closing = rd.resyncedClosing;
        if (rd.resyncedMovement) overrides[code].movement = rd.resyncedMovement;
      }
    });
    return Object.keys(overrides).length > 0 ? overrides : {};
  });
  // Generic account resync overrides (non-DLA, non-payroll individual accounts)
  const [accountResyncOverrides, setAccountResyncOverrides] = useState(() => {
    if (!effectiveDirectAccount || !bsReconciledData) return {};
    var code = effectiveDirectAccount.code;
    var rd = bsReconciledData[code];
    if (rd && (rd.resyncedXeroBalance || rd.resyncedVariance)) {
      var ov = {};
      if (rd.resyncedXeroBalance) ov.xeroBalance = rd.resyncedXeroBalance;
      if (rd.resyncedVariance) ov.variance = rd.resyncedVariance;
      return { [code]: ov };
    }
    return {};
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerComment, setDrawerComment] = useState("");
  const [markedReconciled, setMarkedReconciled] = useState(false);
  const isAccountReconciled = (savedState && savedState.status === "reconciled") || markedReconciled;
  const chatScrollRef = useRef(null);
  const chatEndRef = useRef(null);

  // Payroll accounts from balance sheet
  const payrollAccounts = [
    { code: "2210", name: "PAYE and NI" },
    { code: "2230", name: "Pension contributions" },
  ];

  // All balance sheet accounts for the picker
  const allBSAccounts = [];
  for (const section of BS_SECTIONS) {
    for (const table of section.tables) {
      for (const row of table.rows) {
        allBSAccounts.push({ code: row.code, account: row.account });
      }
    }
  }

  // Custom payroll reconciliation steps — dynamic based on picked accounts
  const customPayrollSteps = (() => {
    if (!isCustomPayroll) return null;
    const accountNames = pickedPayrollAccounts.map(code => {
      const acc = allBSAccounts.find(a => a.code === code);
      return acc ? code + " \u2013 " + acc.account : code;
    });
    const mappedStr = accountNames.join(", ") + ".";
    const hasNonPayroll = pickedPayrollAccounts.some(c => !["2210", "2230"].includes(c));
    return [
      { title: "Reading source", subtext: null, duration: 800 },
      { title: "Syncing Xero", subtext: null, duration: 1000 },
      { title: "Mapping source to accounts", subtext: "Mapped to " + mappedStr, duration: 1200 },
      { title: "Comparing payroll balances", subtext: hasNonPayroll ? "Comparing balances for " + pickedPayrollAccounts.length + " accounts." : "Xero: \u00a330,820.00. Payroll report: \u00a330,720.00.", duration: 1000 },
      { title: "Looking for variances", subtext: hasNonPayroll ? pickedPayrollAccounts.length + " accounts analysed, checking for variances." : "1 variance found (\u00a3100.00).", duration: 1500 },
      { title: "Cross-referencing payroll data", subtext: hasNonPayroll ? "Checking non-payroll accounts against Xero data." : null, duration: 1000 },
      { title: "Identifying root causes", subtext: hasNonPayroll ? "Analysing root causes across selected accounts." : "Pension contribution timing difference identified.", duration: 1200 },
      { title: "Suggesting actions", subtext: null, duration: 800 },
    ];
  })();

  // Effective steps — uses custom payroll steps when in pick flow
  const effectiveActiveSteps = effectiveDirectAccount ? accountRecData.steps : (isCustomPayroll && customPayrollSteps ? customPayrollSteps : PAYROLL_RECONCILIATION_STEPS);

  // Total suggestion count for payroll (including custom accounts)
  const payrollTotalSuggestions = (() => {
    let count = PAYROLL_SUGGESTIONS.length;
    if (isCustomPayroll) {
      const PAYROLL_CODES_SET = new Set(["2210", "2230"]);
      pickedPayrollAccounts.forEach(code => {
        if (PAYROLL_CODES_SET.has(code)) return;
        const acc = allBSAccounts.find(a => a.code === code);
        const acctData = getAccountRecData(code, acc ? acc.account : code);
        if (acctData && acctData.suggestions) count += acctData.suggestions.length;
      });
    }
    return count;
  })();

  // Line 1 – opening AI message
  const line1Segments = [
    { text: "Great, let's reconcile the ", bold: false },
    { text: "balance sheet.",                    bold: true  },
  ];
  const line1Full = line1Segments.map(s => s.text).join("");
  const { done: line1Done } = useTypewriter(line1Full, 18, isResume);

  // Line 2 – prompt to pick type
  const line2Text = "Tell me what you'd like to reconcile";
  const { done: line2Done } = useTypewriter(line1Done ? line2Text : "", 18, isResume);

  // Line 3 – after type selected: accounts intro message (Payroll)
  const line3Segments = selectedType === "Payroll" ? [
    { text: "I will look at the following accounts to reconcile ", bold: false },
    { text: "Payroll",                                             bold: true  },
    { text: ":",                                                   bold: false },
  ] : [];
  const line3Full = line3Segments.map(s => s.text).join("");
  const { done: line3Done } = useTypewriter(typeSelected ? line3Full : "", 18, isResume);

  // Line 3b – after "Choose account from balance sheet" selected
  const line3bText = "Which account would you like to reconcile?";
  const { done: line3bDone } = useTypewriter(typeSelected && selectedType === "Choose account from balance sheet" ? line3bText : "", 18, isResume);

  // Line 4 – confirmation after "Continue with suggested accounts"
  const line4Segments = accountChoiceSelected === "Continue with suggested accounts" ? [
    { text: "Great, I will reconcile ",  bold: false },
    { text: "Payroll",                   bold: true  },
    { text: " with accounts ",           bold: false },
    { text: "2210 – PAYE and NI",   bold: true  },
    { text: " and ",                     bold: false },
    { text: "2230 – Pension contributions", bold: true },
    { text: ".",                         bold: false },
  ] : [];
  const line4Full = line4Segments.map(s => s.text).join("");
  const { done: line4Done } = useTypewriter(accountChoiceSelected === "Continue with suggested accounts" ? line4Full : "", 18, isResume);

  // Pick accounts AI message – after "Pick accounts to reconcile" selected
  const pickAccountsMsg = "Of course. Choose the accounts you would like to include in the payroll reconciliation.";
  const { done: pickAccountsMsgDone } = useTypewriter(accountChoiceSelected === "Pick accounts to reconcile" ? pickAccountsMsg : "", 18, isResume);

  // Pick accounts confirmation – after Continue
  const pickConfirmSegments = pickAccountsConfirmed ? [
    { text: "Cool, I\u2019ll look at the following accounts to reconcile ", bold: false },
    { text: "Payroll", bold: true },
    { text: ":", bold: false },
  ] : [];
  const pickConfirmFull = pickConfirmSegments.map(s => s.text).join("");
  const { done: pickConfirmDone } = useTypewriter(pickAccountsConfirmed ? pickConfirmFull : "", 18, isResume);

  // Pick accounts – upload prompt after confirmation
  const pickUploadText = "Please upload a payroll report.";
  const { done: pickUploadDone } = useTypewriter(pickConfirmDone ? pickUploadText : "", 18, isResume);

  // Line 5 – "Please upload a payroll report"
  const line5Text = "Please upload a payroll report.";
  const { done: line5Done } = useTypewriter(line4Done ? line5Text : "", 18, isResume);

  // Unified gate for payroll upload card — fires for both standard and custom pick flow
  const payrollUploadReady = line5Done || pickUploadDone;

  // Line 6 – after file uploaded + prep done: ready message
  const noDocSuffix = noDocument && !uploadedFile ? " using your connected Xero data. Tell me when you're ready to start." : " against the document you provided. Tell me when you're ready to start.";
  const line6Segments = prepDone ? (isDirectFlow ? [
    { text: "I have everything I need to reconcile ", bold: false },
    { text: `${directAccount.code} – ${directAccount.account}`, bold: true },
    { text: noDocSuffix, bold: false },
  ] : pickedBSAccount ? [
    { text: "I have everything I need to reconcile ", bold: false },
    { text: `${pickedBSAccount.code} – ${pickedBSAccount.account}`, bold: true },
    { text: noDocSuffix, bold: false },
  ] : [
    { text: "I have everything I need to reconcile ", bold: false },
    { text: "Payroll",                                bold: true  },
    { text: noDocument && !uploadedFile ? " using your connected Xero data. Tell me when you're ready to start." : " against the payroll report you provided. Tell me when you're ready to start.", bold: false },
  ]) : [];
  const line6Full = line6Segments.map(s => s.text).join("");
  const { done: line6Done } = useTypewriter(prepDone ? line6Full : "", 18, isResume);

  // Line 7 – after canvasReady: ready for review message
  const line7Text = "Reconciliation is ready for your review. If something doesn't look right or is unclear simply ask me for any changes or information.";
  const { done: line7Done } = useTypewriter(canvasReady ? line7Text : "", 18, isResume);

  // \u2500\u2500 DLA flow lines \u2500\u2500
  const dlaActive = isDLA && (typeSelected || dlaDirectChoice === "Reconcile entire DLA");
  const dlaLine1Segments = dlaActive ? [
    { text: "I'll analyse the following directors' loan accounts using your connected Xero data:", bold: false },
  ] : [];
  const dlaLine1Full = dlaLine1Segments.map(s => s.text).join("");
  const { done: dlaLine1Done } = useTypewriter(dlaActive ? dlaLine1Full : "", 18, isResume);

  const dlaLine2Segments = dlaActive && dlaLine1Done ? [
    { text: "The analysis covers ", bold: false },
    { text: "S455 tax exposure", bold: true },
    { text: ", ", bold: false },
    { text: "benefit in kind", bold: true },
    { text: ", the ", bold: false },
    { text: "£10,000 threshold", bold: true },
    { text: " and ", bold: false },
    { text: "transaction classification", bold: true },
    { text: ".", bold: false },
  ] : [];
  const dlaLine2Full = dlaLine2Segments.map(s => s.text).join("");
  const { done: dlaLine2Done } = useTypewriter(dlaActive && dlaLine1Done ? dlaLine2Full : "", 18, isResume);

  const dlaLine3Text = "You can start now or add a document to include in the analysis.";
  const { done: dlaLine3Done } = useTypewriter(dlaActive && dlaLine2Done ? dlaLine3Text : "", 18, isResume);

  // DLA: after upload + prep done
  const dlaUploadReadySegments = dlaActive && dlaPrepDone ? [
    { text: "I'll include this document when analysing the directors' loan accounts. Tell me when you're ready to start.", bold: false },
  ] : [];
  const dlaUploadReadyFull = dlaUploadReadySegments.map(s => s.text).join("");
  const { done: dlaUploadReadyDone } = useTypewriter(dlaActive && dlaPrepDone ? dlaUploadReadyFull : "", 18, isResume);

  // DLA: after reconciliation complete
  const dlaReviewText = "Analysis is ready for your review. If something doesn't look right or is unclear simply ask me for any changes or information.";
  const { done: dlaReviewDone } = useTypewriter(dlaActive && dlaCanvasReady ? dlaReviewText : "", 18, isResume);

  // ── DLA direct flow: "reconcile this account only" messaging ──
  const isDLASingleAccount = isDLAAccount && dlaDirectChoice === "Reconcile this account only";
  const dlaSingleIsOverdrawn = isDLASingleAccount && directAccount && !directAccount.account.includes("Jones"); // J Smith is overdrawn, A Jones is credit
  const dlaSingleLine1Segments = isDLASingleAccount ? [
    { text: "Let's reconcile ", bold: false },
    { text: `${directAccount.code} – ${directAccount.account}`, bold: true },
    { text: ".", bold: false },
  ] : [];
  const dlaSingleLine1Full = dlaSingleLine1Segments.map(s => s.text).join("");
  const { done: dlaSingleLine1Done } = useTypewriter(isDLASingleAccount ? dlaSingleLine1Full : "", 18, isResume);

  const dlaSingleLine2Text = dlaSingleIsOverdrawn
    ? "I'll check the balance against Xero, verify the sign is correct, review transaction history and flag any entries that may need reclassifying to the DLA."
    : "I'll verify the credit balance is correctly classified, check the transaction history for any miscodings and confirm the related party disclosure is in order.";
  const { done: dlaSingleLine2Done } = useTypewriter(isDLASingleAccount && dlaSingleLine1Done ? dlaSingleLine2Text : "", 18, isResume);

  const dlaSingleLine3Text = "Please upload a document to reconcile this account.";
  const { done: dlaSingleLine3Done } = useTypewriter(isDLASingleAccount && dlaSingleLine2Done ? dlaSingleLine3Text : "", 18, isResume);

  // \u2500\u2500 Direct account flow lines \u2500\u2500
  const directLine1Segments = isDirectFlow ? [
    { text: "Let's reconcile ", bold: false },
    { text: `${directAccount.code} – ${directAccount.account}`, bold: true },
    { text: ".",                     bold: false },
  ] : [];
  const directLine1Full = directLine1Segments.map(s => s.text).join("");
  const { done: directLine1Done } = useTypewriter(isDirectFlow ? directLine1Full : "", 18, isResume);

  const directLine2Text = "Please upload a document to reconcile this account.";
  const { done: directLine2Done } = useTypewriter(isDirectFlow && directLine1Done ? directLine2Text : "", 18, isResume);

  // No-doc message streaming trackers (gate choice cards until message finishes)
  const noDocMsgText = "I can reconcile this account without a file – I'll analyse the account using your latest Xero data and historical patterns.";
  const { done: noDocMsgDone } = useTypewriter(noDocument && !uploadedFile ? noDocMsgText : "", 18, isNoDocResume);

  const dlaNoDocMsgText = "I can reconcile Directors' loan account without a file – I'll analyse the accounts using your latest Xero data and historical patterns.";
  const { done: dlaNoDocMsgDone } = useTypewriter(dlaNoDocument && dlaUploadedFiles.length === 0 ? dlaNoDocMsgText : "", 18, isDlaNoDocResume);

  // ── Fixed Assets flow lines ──
  // Pre-choice: intro message + account list streaming
  const faPreChoice = isFA && typeSelected && (!presetHasResults || presetAction === "Start new reconciliation" || faAccountChoiceSelected || faPickAccountsConfirmed);
  const faIntroText = "I'll reconcile the following fixed asset accounts:";
  const { done: faIntroDone } = useTypewriter(faPreChoice ? faIntroText : "", 18, isFAResume);

  const faActive = isFA && typeSelected && (faAccountChoiceSelected === "Continue with suggested accounts" || faPickAccountsConfirmed);
  // Post-choice message: different depending on choice
  const faPostChoiceText = faAccountChoiceSelected === "Continue with suggested accounts"
    ? "I'll reconcile chosen accounts against your register."
    : faPickAccountsConfirmed
    ? "I'll reconcile chosen accounts against your register."
    : "";
  const faPostChoiceSegments = faActive ? [
    { text: faPostChoiceText, bold: false },
  ] : [];
  const { done: faPostChoiceDone } = useTypewriter(faActive ? faPostChoiceText : "", 18, isFAResume);

  const faLine2Segments = faActive && faPostChoiceDone ? [
    { text: "The reconciliation checks ", bold: false },
    { text: "cost and net book value", bold: true },
    { text: ", ", bold: false },
    { text: "depreciation schedules", bold: true },
    { text: ", ", bold: false },
    { text: "additions and disposals", bold: true },
    { text: " and ", bold: false },
    { text: "capex classification", bold: true },
    { text: ".", bold: false },
  ] : [];
  const faLine2Full = faLine2Segments.map(s => s.text).join("");
  const { done: faLine2Done } = useTypewriter(faActive && faPostChoiceDone ? faLine2Full : "", 18, isFAResume);

  const faLine3Text = "Upload your fixed asset register to get started. This is typically an Excel export from your asset management system or a schedule maintained outside Xero.";
  const { done: faLine3Done } = useTypewriter(faActive && faLine2Done ? faLine3Text : "", 18, isFAResume);

  // FA: after upload + prep done
  const faUploadReadyFull = "I'll compare this register against the Xero accounts. Tell me when you're ready to start.";
  const { done: faUploadReadyDone } = useTypewriter(faActive && faPrepDone ? faUploadReadyFull : "", 18, isFAResume);

  // FA: after reconciliation complete
  const faReviewText = "Reconciliation is ready for your review. If something doesn't look right or is unclear simply ask me for any changes or information.";
  const { done: faReviewDone } = useTypewriter(faActive && faCanvasReady ? faReviewText : "", 18, isResume);

  // FA no-doc message
  const faNoDocMsgText = "I can reconcile fixed assets without a register – I'll analyse the accounts using your latest Xero data and compare depreciation patterns against prior periods.";
  const { done: faNoDocMsgDone } = useTypewriter(faNoDocument && faUploadedFiles.length === 0 ? faNoDocMsgText : "", 18, isFaNoDocResume);

  const handleFileSelected = (file) => {
    handleFirstFile(file);
  };

  // After first file is selected (or no-doc analyse chosen), wait then mark prep done
  useEffect(() => {
    if (!uploadedFile) return;
    const t = setTimeout(() => setPrepDone(true), 2200);
    return () => clearTimeout(t);
  }, [uploadedFile]);

  // After "Add another document" round: prep timer for added files
  useEffect(() => {
    if (addMoreRound === 0) return;
    setAddMorePrepDone(false);
    const t = setTimeout(() => setAddMorePrepDone(true), 2200);
    return () => clearTimeout(t);
  }, [addMoreRound]);

  // Determine effective start trigger: direct start, after adding more files, or no-doc analyse
  const effectiveStart = (readyChoice === "Start reconciliation") || startAfterMore || (noDocument && noDocChoice === "analyse");

  // Run reconciliation steps after "Start reconciliation"
  useEffect(() => {
    if (!effectiveStart) return;
    if (isResume) return; // Skip animation on resume \u2014 steps already done
    if (pickedAccountAction === "View reconciliation results") return; // Skip for view results
    setStepStatuses(effectiveActiveSteps.map((_, i) => i === 0 ? "active" : "pending"));
    setStepSubtexts(effectiveActiveSteps.map(() => false));
    let cumulative = 0;
    const timers = [];
    effectiveActiveSteps.forEach((step, i) => {
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
          if (i + 1 < effectiveActiveSteps.length) next[i + 1] = "active";
          return next;
        });
      }, cumulative));
    });
    return () => timers.forEach(clearTimeout);
  }, [readyChoice, startAfterMore, noDocChoice]);

  const reconciliationComplete = stepStatuses.length > 0 && stepStatuses.every(s => s === "done");

  // Results are shown after accordion collapse callback (first run) or immediately (resume)
  const handleAccordionCollapsed = () => {
    setResultsVisible(true);
  };

  const handleDlaAccordionCollapsed = () => {
    setDlaResultsVisible(true);
  };

  const handleRestartAccordionCollapsed = () => {
    setCanvasReady(true);
    setResultsVisible(true);
    setRestartResultsVisible(true);
  };

  // Delay canvas content until panel has slid in (skip delay on resume)
  useEffect(() => {
    if (!resultsVisible) return;
    if (isResume) { setCanvasReady(true); return; }
    setCanvasReady(false);
    const t = setTimeout(() => setCanvasReady(true), 3200);
    return () => clearTimeout(t);
  }, [resultsVisible]);

  // ─── Restart reconciliation effects ───

  // Restart: prep timer for uploaded file (new_file path)
  useEffect(() => {
    if (restartMode !== "new_file" || restartUploadedFiles.length === 0) return;
    setRestartPrepDone(false);
    const t = setTimeout(() => setRestartPrepDone(true), 2200);
    return () => clearTimeout(t);
  }, [restartUploadedFiles.length]);

  // Restart: add more round prep
  useEffect(() => {
    if (restartAddMoreRound === 0) return;
    setRestartAddMorePrepDone(false);
    const t = setTimeout(() => setRestartAddMorePrepDone(true), 2200);
    return () => clearTimeout(t);
  }, [restartAddMoreRound]);

  // Restart: run reconciliation steps animation
  useEffect(() => {
    const shouldRun = restartMode === "same_file" || (restartMode === "new_file" && (restartReadyChoice === "Start reconciliation" || restartStartAfterMore));
    if (!shouldRun) return;
    // Reset canvas states for fresh results
    setResultsVisible(false);
    setCanvasReady(false);
    setResolvedCards(new Set());
    setIgnoredCards(new Set());
    setRestartStepStatuses(effectiveActiveSteps.map((_, i) => i === 0 ? "active" : "pending"));
    setRestartStepSubtexts(effectiveActiveSteps.map(() => false));
    let cumulative = 0;
    const timers = [];
    effectiveActiveSteps.forEach((step, i) => {
      cumulative += step.duration;
      if (step.subtext) {
        timers.push(setTimeout(() => {
          setRestartStepSubtexts(prev => { const next = [...prev]; next[i] = true; return next; });
        }, cumulative - 400));
      }
      timers.push(setTimeout(() => {
        setRestartStepStatuses(prev => {
          const next = [...prev];
          next[i] = "done";
          if (i + 1 < effectiveActiveSteps.length) next[i + 1] = "active";
          return next;
        });
      }, cumulative));
    });
    return () => timers.forEach(clearTimeout);
  }, [restartMode, restartReadyChoice, restartStartAfterMore]);

  // Restart: when all steps done — results shown via accordion onCollapsed callback
  const restartReconciliationComplete = restartStepStatuses.length > 0 && restartStepStatuses.every(s => s === "done");

  // \u2500\u2500 DLA effects \u2500\u2500

  // DLA: prep timer after file upload or no-doc analyse chosen
  useEffect(() => {
    if (!dlaActive || dlaUploadedFiles.length === 0) return;
    setDlaPrepDone(false);
    const t = setTimeout(() => setDlaPrepDone(true), 2200);
    return () => clearTimeout(t);
  }, [dlaUploadedFiles.length]);

  // DLA: add more round prep
  useEffect(() => {
    if (!dlaActive || dlaAddMoreRound === 0) return;
    setDlaAddMorePrepDone(false);
    const t = setTimeout(() => setDlaAddMorePrepDone(true), 2200);
    return () => clearTimeout(t);
  }, [dlaAddMoreRound]);

  // DLA: determine effective start
  const dlaEffectiveStart = dlaActive && (dlaReadyChoice === "Start reconciliation" || (dlaStartChoice === "Start reconciliation") || dlaStartAfterMore || (dlaNoDocument && dlaNoDocChoice === "analyse"));

  // DLA: run reconciliation steps
  useEffect(() => {
    if (!dlaEffectiveStart) return;
    if (isDLAResume) return; // skip step animation on resume
    const steps = DLA_RECONCILIATION_STEPS;
    setDlaStepStatuses(steps.map((_, i) => i === 0 ? "active" : "pending"));
    setDlaStepSubtexts(steps.map(() => false));
    let cumulative = 0;
    const timers = [];
    steps.forEach((step, i) => {
      cumulative += step.duration;
      if (step.subtext) {
        timers.push(setTimeout(() => {
          setDlaStepSubtexts(prev => { const next = [...prev]; next[i] = true; return next; });
        }, cumulative - 400));
      }
      timers.push(setTimeout(() => {
        setDlaStepStatuses(prev => {
          const next = [...prev];
          next[i] = "done";
          if (i + 1 < steps.length) next[i + 1] = "active";
          return next;
        });
      }, cumulative));
    });
    return () => timers.forEach(clearTimeout);
  }, [dlaEffectiveStart, dlaRestartTrigger, dlaNoDocChoice]);

  // DLA: when all steps done — results shown via accordion onCollapsed callback
  const dlaReconciliationComplete = dlaStepStatuses.length > 0 && dlaStepStatuses.every(s => s === "done");

  // DLA: delay canvas content (skip delay on resume)
  useEffect(() => {
    if (!dlaResultsVisible) return;
    if (isDLAResume || dlaHasResults || presetAction === "View reconciliation results") { setDlaCanvasReady(true); return; }
    setDlaCanvasReady(false);
    const t = setTimeout(() => setDlaCanvasReady(true), 3200);
    return () => clearTimeout(t);
  }, [dlaResultsVisible]);

  // ── FA effects ──

  // FA: prep timer after file upload
  useEffect(() => {
    if (!faActive || faUploadedFiles.length === 0) return;
    setFaPrepDone(false);
    const t = setTimeout(() => setFaPrepDone(true), 2200);
    return () => clearTimeout(t);
  }, [faUploadedFiles.length]);

  // FA: add more round prep
  useEffect(() => {
    if (!faActive || faAddMoreRound === 0) return;
    setFaAddMorePrepDone(false);
    const t = setTimeout(() => setFaAddMorePrepDone(true), 2200);
    return () => clearTimeout(t);
  }, [faAddMoreRound]);

  // FA: determine effective start
  const faEffectiveStart = faActive && ((faStartChoice === "Start reconciliation") || faStartAfterMore || (faNoDocument && faNoDocChoice === "analyse"));

  // FA: run reconciliation steps
  useEffect(() => {
    if (!faEffectiveStart) return;
    if (isFAResume) return;
    const steps = FA_RECONCILIATION_STEPS;
    setFaStepStatuses(steps.map((_, i) => i === 0 ? "active" : "pending"));
    setFaStepSubtexts(steps.map(() => false));
    let cumulative = 0;
    const timers = [];
    steps.forEach((step, i) => {
      cumulative += step.duration;
      if (step.subtext) {
        timers.push(setTimeout(() => {
          setFaStepSubtexts(prev => { const next = [...prev]; next[i] = true; return next; });
        }, cumulative - 400));
      }
      timers.push(setTimeout(() => {
        setFaStepStatuses(prev => {
          const next = [...prev];
          next[i] = "done";
          if (i + 1 < steps.length) next[i + 1] = "active";
          return next;
        });
      }, cumulative));
    });
    return () => timers.forEach(clearTimeout);
  }, [faEffectiveStart, faRestartTrigger, faNoDocChoice]);

  // FA: when all steps done
  const faReconciliationComplete = faStepStatuses.length > 0 && faStepStatuses.every(s => s === "done");

  const handleFaAccordionCollapsed = () => {
    setFaResultsVisible(true);
  };

  // FA: delay canvas content (skip delay on resume)
  useEffect(() => {
    if (!faResultsVisible) return;
    if (isFAResume || presetAction === "View reconciliation results") { setFaCanvasReady(true); return; }
    setFaCanvasReady(false);
    const t = setTimeout(() => setFaCanvasReady(true), 3200);
    return () => clearTimeout(t);
  }, [faResultsVisible]);

  // Drag handler for resizable chat panel
  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const startX = e.clientX;
    const startWidth = chatWidth;
    const onMouseMove = (e) => {
      const newWidth = Math.max(280, Math.min(700, startWidth + (e.clientX - startX)));
      setChatWidth(newWidth);
    };
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

  // Auto-scroll
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [line1Done, line2Done, typeSelected, line3Done, line3bDone, accountChoiceSelected, line4Done, line5Done, uploadedFile, prepDone, line6Done, readyChoice, stepStatuses, line7Done, directLine1Done, directLine2Done, pickedBSAccount, pickedAccountAction, uploadedFiles.length, addMoreRound, addMorePrepDone, startAfterMore, restartMode, restartChoice, restartUploadedFiles.length, restartPrepDone, restartReadyChoice, restartStepStatuses, restartAddMoreRound, restartAddMorePrepDone, restartStartAfterMore, pickAccountsConfirmed, pickConfirmDone, pickUploadDone, faAccountChoiceSelected, faIntroDone, faPostChoiceDone, faLine2Done, faLine3Done, faReadyChoice, faUploadedFiles.length, faPrepDone, faStartChoice, faStepStatuses, faNoDocument, faNoDocChoice, faAddMoreRound, faAddMorePrepDone, faStartAfterMore]);

  // Auto-save state to bsReconciledData when results are visible or cards change
  useEffect(() => {
    if (!onSaveState) return;
    if (!(canvasReady || dlaCanvasReady || faCanvasReady)) return;
    // When viewing a single DLA account from the table (dlaHasResults && !dlaActive),
    // save as a regular account — not as DLA merge — so IDs stay per-account
    onSaveState(
      { resolvedCards: Array.from(resolvedCards), ignoredCards: Array.from(ignoredCards), isDLA: dlaActive, isFA: faActive, noDocument: noDocument || dlaNoDocument || faNoDocument, customPayrollAccounts: isCustomPayroll ? pickedPayrollAccounts : null, payrollResyncOverrides: payrollResyncOverrides, dlaResyncOverrides: dlaResyncOverrides, accountResyncOverrides: accountResyncOverrides, faResyncOverrides: faResyncOverrides, resolvedLabels: resolvedLabels },
      effectiveDirectAccount
    );
  }, [canvasReady, dlaCanvasReady, faCanvasReady, resolvedCards, ignoredCards, payrollResyncOverrides, dlaResyncOverrides, accountResyncOverrides, faResyncOverrides, resolvedLabels]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'Inter', sans-serif", background: T.colorSurfaceContrast }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        @keyframes resultsFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes drawerSlideIn { from{transform:translateX(100%)} to{transform:translateX(0)} }
        @keyframes modalBackdropIn { from{opacity:0} to{opacity:1} }
        @keyframes modalPanelIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
      `}</style>

      {/* Top bar */}
      <div style={{ height: 96, background: T.colorSurfacePrimary, borderBottom: `1px solid ${T.colorBorderDark}`, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)", display: "flex", alignItems: "center", padding: "0 24px", flexShrink: 0, gap: 16, zIndex: 10, position: "relative" }}>
        <span style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, flexShrink: 0, letterSpacing: "-1px" }}>Balance sheet reconciliation</span>

        {/* Account selector dropdown — always visible */}
        <div style={{ position: "relative", width: 240, minWidth: 200, flexShrink: 0 }}>
            <button
              onClick={() => { setBsDropdownOpen(o => !o); setBsDropdownSearch(""); }}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 12px", height: 48, width: "100%", border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 14, fontWeight: 500, color: selectorLabel ? T.colorTextPrimary : T.colorTextSecondary, boxSizing: "border-box" }}
            >
              <span style={{ color: selectorLabel ? T.colorTextPrimary : T.colorTextSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, textAlign: "left" }}>
                {selectorLabel || "Select account"}
              </span>
              <Chevron color={selectorLabel ? T.colorTextPrimary : T.colorTextSecondary} />
            </button>
            {bsDropdownOpen && (() => {
              const q = bsDropdownSearch.toLowerCase();
              const filteredPresets = BS_PRESET_ITEMS.filter(a => !q || a.account.toLowerCase().includes(q));
              const filteredAccounts = BS_ALL_ACCOUNTS.filter(a => !q || a.code.toLowerCase().includes(q) || a.account.toLowerCase().includes(q));
              const currentCode = effectiveDirectAccount ? effectiveDirectAccount.code : activePreset ? activePreset.code : null;
              return (
              <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.08)", zIndex: 100, minWidth: 300, maxHeight: 400, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <div style={{ padding: "8px 8px 4px", flexShrink: 0 }}>
                  <input
                    value={bsDropdownSearch}
                    onChange={e => setBsDropdownSearch(e.target.value)}
                    placeholder="Search..."
                    autoFocus
                    style={{ width: "100%", padding: "8px 10px", border: `1px solid ${T.colorBorderDark}`, borderRadius: 6, fontSize: 13, color: T.colorTextPrimary, outline: "none", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
                <div style={{ overflowY: "auto", maxHeight: 340 }}>
                  {/* Presets section */}
                  {filteredPresets.length > 0 && (
                    <div style={{ padding: "8px 14px 4px", fontSize: 11, fontWeight: 600, color: T.colorTextSecondary, textTransform: "uppercase", letterSpacing: "0.5px" }}>Presets</div>
                  )}
                  {filteredPresets.map(preset => {
                    const isCurrent = preset.code === currentCode;
                    return (
                      <button key={preset.code} onClick={() => {
                        setBsDropdownOpen(false);
                        if (!isCurrent) onSwitchAccount?.({ code: preset.code, account: preset.account });
                      }}
                        style={{ width: "100%", display: "block", textAlign: "left", padding: "10px 14px", fontSize: 14, color: isCurrent ? T.colorTextPrimary : T.colorTextThird, fontWeight: isCurrent ? 500 : 400, background: isCurrent ? T.colorBorderLight : "transparent", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
                        onMouseEnter={e => { if (!isCurrent) e.currentTarget.style.background = T.colorSurfaceSecondary; }}
                        onMouseLeave={e => { if (!isCurrent) e.currentTarget.style.background = isCurrent ? T.colorBorderLight : "transparent"; }}
                      >{preset.account}</button>
                    );
                  })}
                  {/* Accounts section */}
                  {filteredAccounts.length > 0 && (
                    <div style={{ padding: "8px 14px 4px", fontSize: 11, fontWeight: 600, color: T.colorTextSecondary, textTransform: "uppercase", letterSpacing: "0.5px", borderTop: filteredPresets.length > 0 ? `1px solid ${T.colorSurfaceActive}` : "none", marginTop: filteredPresets.length > 0 ? 4 : 0 }}>Accounts</div>
                  )}
                  {filteredAccounts.map(acc => {
                    const isCurrent = acc.code === currentCode;
                    return (
                      <button key={acc.code} onClick={() => {
                        setBsDropdownOpen(false);
                        if (!isCurrent) onSwitchAccount?.(acc);
                      }}
                        style={{ width: "100%", display: "block", textAlign: "left", padding: "10px 14px", fontSize: 14, color: isCurrent ? T.colorTextPrimary : T.colorTextThird, fontWeight: isCurrent ? 500 : 400, background: isCurrent ? T.colorBorderLight : "transparent", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
                        onMouseEnter={e => { if (!isCurrent) e.currentTarget.style.background = T.colorSurfaceSecondary; }}
                        onMouseLeave={e => { if (!isCurrent) e.currentTarget.style.background = isCurrent ? T.colorBorderLight : "transparent"; }}
                      >{acc.code} &ndash; {acc.account}</button>
                    );
                  })}
                </div>
              </div>
              );
            })()}
        </div>

        <div style={{ flex: 1 }} />
        {(resultsVisible || dlaResultsVisible || faResultsVisible) && (() => {
          const isAlreadyReconciled = savedState && savedState.status === "reconciled";
          if (isAlreadyReconciled) {
            return (
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                height: 36, padding: "0 14px", borderRadius: 8,
                background: T.colorBrandLighter, fontSize: 14, fontWeight: 500, color: T.colorBrandPrimary,
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5L6.5 12L13 4" stroke="#05A105" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Reconciled
              </div>
            );
          }
          const faTotalSuggestions = faActive ? FA_ACCOUNTS.reduce((sum, a) => sum + (ACCOUNT_REC_DATA[a.code] ? ACCOUNT_REC_DATA[a.code].suggestions.length : 0), 0) : 0;
          const totalSuggestions = faActive ? faTotalSuggestions : dlaActive ? (ACCOUNT_REC_DATA["2300"].suggestions.length + ACCOUNT_REC_DATA["2301"].suggestions.length) : effectiveDirectAccount && accountRecData ? accountRecData.suggestions.length : payrollTotalSuggestions;
          const remaining = totalSuggestions - resolvedCards.size - ignoredCards.size;
          const allHandled = remaining <= 0;
          return (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 14, color: T.colorTextThird, whiteSpace: "nowrap" }}>
                Left to review: <strong style={{ color: T.colorTextPrimary }}>{Math.max(0, remaining)} suggestion{remaining !== 1 ? "s" : ""}</strong>
              </span>
              <button
                onClick={() => { if (allHandled) { onMarkReconciled?.(null, effectiveDirectAccount, dlaActive || faActive, { resolvedCards: Array.from(resolvedCards), ignoredCards: Array.from(ignoredCards), customPayrollAccounts: isCustomPayroll ? pickedPayrollAccounts : null, isFA: faActive, resolvedLabels: resolvedLabels }); setMarkedReconciled(true); } else { setDrawerOpen(true); } }}
                style={{
                  height: 36, padding: "0 16px",
                  borderRadius: 8, border: "none",
                  background: T.colorBrandPrimary, color: T.colorTextLight,
                  fontSize: 14, fontWeight: 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => e.currentTarget.style.background = T.colorBrandPrimaryHover}
                onMouseLeave={e => e.currentTarget.style.background = T.colorBrandPrimary}
              >
                Mark as reconciled
              </button>
            </div>
          );
        })()}
        {/* Close button */}
        <button onClick={() => {
          const isAlreadyReconciled = savedState && savedState.status === "reconciled";
          if ((resultsVisible || dlaResultsVisible || faResultsVisible) && !isAlreadyReconciled) {
            onClose?.({ resolvedCards: Array.from(resolvedCards), ignoredCards: Array.from(ignoredCards), isDLA: dlaActive, isFA: faActive, noDocument: noDocument || dlaNoDocument || faNoDocument, customPayrollAccounts: isCustomPayroll ? pickedPayrollAccounts : null, payrollResyncOverrides: payrollResyncOverrides, dlaResyncOverrides: dlaResyncOverrides, accountResyncOverrides: accountResyncOverrides, faResyncOverrides: faResyncOverrides, resolvedLabels: resolvedLabels }, effectiveDirectAccount);
          } else {
            onClose?.(null, effectiveDirectAccount);
          }
        }} style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 36, height: 36, borderRadius: 8, border: `1px solid ${T.colorBorderDark}`,
          background: T.colorSurfacePrimary, cursor: "pointer",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = T.colorSurfaceSecondary; }}
          onMouseLeave={e => { e.currentTarget.style.background = T.colorSurfacePrimary; }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="#080908" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Content area \u2014 position:relative so the canvas overlay can anchor to it */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>

      {/* Left: chat panel */}
      <div style={{
        display: "flex", flexDirection: "column",
        width: (resultsVisible || dlaResultsVisible || faResultsVisible) ? chatWidth : "100%",
        flexShrink: 0,
        transition: isDragging ? "none" : "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
        willChange: "width",
      }}>

      {/* Chat area */}
      <div ref={chatScrollRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <div style={{ maxWidth: (resultsVisible || dlaResultsVisible || faResultsVisible) ? "100%" : 680, width: "100%", margin: "0 auto", padding: (resultsVisible || dlaResultsVisible || faResultsVisible) ? "32px 24px 40px" : "40px 24px 40px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", transition: "max-width 0.6s cubic-bezier(0.4, 0, 0.2, 1), padding 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }}>

          {/* \u2500\u2500 Direct account flow \u2500\u2500 */}
          {isDirectFlow && !isDLAAccount && (
            <>
              <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                <p><StreamingMessage segments={directLine1Segments} speed={18} instant={isResume} /></p>
                {directLine1Done && (
                  <p style={{ marginTop: 6 }}>
                    <StreamingMessage key="directLine2" segments={[{ text: directLine2Text, bold: false }]} speed={18} instant={isResume} />
                  </p>
                )}
              </div>

              {/* Upload card \u2014 appears after direct line 2 finishes */}
              {directLine2Done && !uploadedFile && !noDocument && (
                <div style={{ marginTop: 16 }}>
                  <UploadCard onFileSelected={handleFileSelected} title="Upload file" onNoDocument={() => setNoDocument(true)} />
                </div>
              )}

              {/* User bubble \u2014 no document chosen */}
              {noDocument && !uploadedFile && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                    I don't have a file
                  </div>
                </div>
              )}

              {/* AI no-doc message (stays visible after choice) */}
              {noDocument && !uploadedFile && (
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                  <p><StreamingMessage key="no-doc-direct" instant={isResume} segments={[
                    { text: "I can reconcile ", bold: false },
                    { text: directAccount.code + " – " + directAccount.account, bold: true },
                    { text: " without a file – I'll analyse the account using your latest Xero data and historical patterns.", bold: false },
                  ]} speed={18} /></p>
                </div>
              )}

              {/* No-doc choice card */}
              {noDocument && !uploadedFile && !noDocChoice && noDocMsgDone && (
                <div style={{ marginTop: 16, background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16, padding: "20px 20px 12px", maxWidth: 480, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)" }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, marginBottom: 12 }}>How would you like to continue?</p>
                  <button onClick={() => setNoDocChoice("analyse")} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", marginBottom: 8, background: T.colorSurfaceTertiary, border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 400, color: T.colorTextPrimary }} onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive} onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}>Start reconciliation</button>
                  <button disabled style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", textAlign: "left", padding: "12px 16px", marginBottom: 8, background: T.colorSurfaceTertiary, border: "none", borderRadius: 10, cursor: "default", fontSize: 14, fontWeight: 400, color: T.colorTextDisabled }}>Share details to include in reconciliation<span style={{ fontSize: 11, fontWeight: 600, color: T.colorTextSecondary, background: "#EBEBEB", borderRadius: 4, padding: "2px 6px", marginLeft: 8, whiteSpace: "nowrap" }}>Coming soon</span></button>
                </div>
              )}

              {/* User bubble \u2014 analyse choice echo */}
              {noDocument && !uploadedFile && noDocChoice === "analyse" && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                    Start reconciliation
                  </div>
                </div>
              )}

              {/* User bubble \u2014 file preview after upload */}
              {uploadedFile && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 320 }}>
                    <div style={{ background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: "12px 12px 2px 12px", padding: "20px 16px 16px", width: 260 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <FileIcon file={uploadedFile} width={20} height={24} />
                        <span style={{ fontSize: 12, fontWeight: 500, color: T.colorTextPrimary }}>{directAccount.account} report</span>
                      </div>
                      <div style={{ height: 1, background: T.colorSurfaceActive, marginBottom: 10 }} />
                      {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
                        <div key={i} style={{ height: 6, borderRadius: 3, background: T.colorSurfaceActive, width: `${w}%`, marginBottom: 6 }} />
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                      <FileIcon file={uploadedFile} width={13} height={16} />
                      <span style={{ fontSize: 12, color: T.colorTextThird, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>{uploadedFile.name}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Preparing status */}
              {!(noDocument && noDocChoice === "analyse") && ((uploadedFile && !prepDone)) && (
                <p style={{ fontSize: 13, color: T.colorBorderInput, marginTop: 20, lineHeight: "20px" }}>
                  Preparing the document and getting ready for reconciliation
                </p>
              )}

              {/* AI ready message \u2014 after prep done */}
              {!(noDocument && noDocChoice === "analyse") && prepDone && (
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                  <p><StreamingMessage key="line6-direct" instant={isResume} segments={line6Segments.length > 0 ? line6Segments : [
                    { text: "I have everything I need to reconcile ", bold: false },
                    { text: `${directAccount.code} – ${directAccount.account}`, bold: true },
                    { text: " against the document you provided. Tell me when you're ready to start.", bold: false },
                  ]} speed={18} /></p>
                </div>
              )}

              {/* Choice: start \u2014 appears after ready message finishes */}
              {!(noDocument && noDocChoice === "analyse") && prepDone && line6Done && !readyChoice && (
                <div style={{ marginTop: 16 }}>
                  <div style={{
                    background: T.colorSurfacePrimary,
                    border: `1px solid ${T.colorBorderDark}`,
                    borderRadius: 16,
                    padding: "20px 20px 12px",
                    maxWidth: 480,
                    boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                  }}>
                    {["Start reconciliation", "Add another document"].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setReadyChoice(opt)}
                        style={{
                          display: "block", width: "100%", textAlign: "left",
                          padding: "12px 16px", marginBottom: 8,
                          background: T.colorSurfaceTertiary, border: "none",
                          borderRadius: 10, cursor: "pointer",
                          fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                        onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* User reply bubble for ready choice */}
              {readyChoice && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                    {readyChoice}
                  </div>
                </div>
              )}

              {/* Add another document flow (direct) */}
              {readyChoice === "Add another document" && (
                <>
                  <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key={"add-doc-direct-" + addMoreRound} segments={[{ text: "Upload another document and I'll include it in the reconciliation.", bold: false }]} speed={18} /></p>
                  </div>
                  {addMoreRound === 0 && !addMoreWaitingUpload && (
                    <div style={{ marginTop: 16 }}>
                      <UploadCard onFileSelected={(file) => { handleAddMoreFiles([file]); setAddMoreWaitingUpload(false); setAddMoreRound(prev => prev + 1); }} title="Upload file" onNoDocument={() => setReadyChoice("Start reconciliation")} />
                    </div>
                  )}
                  {uploadedFiles.length > 1 && addMoreRound > 0 && uploadedFiles.slice(1).map((file, idx) => (
                    <div key={"add-preview-direct-" + idx} style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                      <div style={{ maxWidth: 320 }}>
                        <div style={{ background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: "12px 12px 2px 12px", padding: "20px 16px 16px", width: 260 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                            <FileIcon file={file} width={20} height={24} />
                            <span style={{ fontSize: 12, fontWeight: 500, color: T.colorTextPrimary }}>{file.label}</span>
                          </div>
                          <div style={{ height: 1, background: T.colorSurfaceActive, marginBottom: 10 }} />
                          {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
                            <div key={i} style={{ height: 6, borderRadius: 3, background: T.colorSurfaceActive, width: `${w}%`, marginBottom: 6 }} />
                          ))}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                          <FileIcon file={file} width={13} height={16} />
                          <span style={{ fontSize: 12, color: T.colorTextThird, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>{file.label}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {uploadedFiles.length > 1 && !addMorePrepDone && !addMoreWaitingUpload && (
                    <p style={{ fontSize: 13, color: T.colorBorderInput, marginTop: 20, lineHeight: "20px" }}>
                      Preparing the document and getting ready for reconciliation
                    </p>
                  )}
                  {addMorePrepDone && (() => {
                    const labels = uploadedFiles.map(f => f.label);
                    const docSegments = [];
                    labels.forEach((lbl, i) => {
                      if (i > 0) {
                        if (i === labels.length - 1) docSegments.push({ text: " and ", bold: false });
                        else docSegments.push({ text: ", ", bold: false });
                      }
                      docSegments.push({ text: lbl, bold: true });
                    });
                    return (
                      <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                        <p><StreamingMessage key={"add-doc-direct-ready-" + addMoreRound} segments={[
                          { text: "I have everything I need to reconcile ", bold: false },
                          { text: `${directAccount.code} – ${directAccount.account}`, bold: true },
                          { text: " against ", bold: false },
                          ...docSegments,
                          { text: ". Tell me when you're ready to start.", bold: false },
                        ]} speed={18} /></p>
                      </div>
                    );
                  })()}
                  {addMorePrepDone && !addMoreWaitingUpload && !startAfterMore && (
                    <div style={{ marginTop: 16 }}>
                      <div style={{
                        background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16,
                        padding: "20px 20px 12px", maxWidth: 480,
                        boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                      }}>
                        {["Start reconciliation", "Add another document"].map(opt => (
                          <button key={opt} onClick={() => {
                            if (opt === "Start reconciliation") { setStartAfterMore(true); }
                            else { setAddMoreWaitingUpload(true); }
                          }} style={{
                            display: "block", width: "100%", textAlign: "left",
                            padding: "12px 16px", marginBottom: 8,
                            background: T.colorSurfaceTertiary, border: "none",
                            borderRadius: 10, cursor: "pointer",
                            fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                          onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                          >{opt}</button>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* User chose "Add another document" — new upload round */}
                  {addMoreWaitingUpload && (
                    <>
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                        <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                          Add another document
                        </div>
                      </div>
                      <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                        <p><StreamingMessage key={"add-doc-direct-waiting-" + addMoreRound} segments={[{ text: "Upload another document and I'll include it in the reconciliation.", bold: false }]} speed={18} /></p>
                      </div>
                      <div style={{ marginTop: 16 }}>
                        <UploadCard onFileSelected={(file) => { handleAddMoreFiles([file]); setAddMoreWaitingUpload(false); setAddMoreRound(prev => prev + 1); }} title="Upload file" onNoDocument={() => setReadyChoice("Start reconciliation")} />
                      </div>
                    </>
                  )}
                </>
              )}
              {readyChoice === "Add another document" && startAfterMore && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                    Start reconciliation
                  </div>
                </div>
              )}

              {/* Reconciliation progress steps */}
              {effectiveStart && stepStatuses.length > 0 && (
                <ReconciliationStepsAccordion steps={effectiveActiveSteps} stepStatuses={stepStatuses} stepSubtexts={stepSubtexts} onCollapsed={handleAccordionCollapsed} />
              )}

              {canvasReady && (
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                  <p><StreamingMessage key="line7-direct" segments={[{ text: line7Text, bold: false }]} speed={18} instant={isResume} /></p>
                </div>
              )}
            </>
          )}

          {/* \u2500\u2500 DLA direct account interception \u2500\u2500 */}
          {isDLAAccount && !dlaDirectChoice && !dlaHasResults && (
            <>
              <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                <p><StreamingMessage key={"dla-intercept-1-" + directAccount.code} segments={[
                  { text: `${directAccount.code} – ${directAccount.account}`, bold: true },
                  { text: " is part of the directors' loan accounts. These are usually analysed together so that S455 exposure, benefit in kind and threshold checks are assessed across all directors.", bold: false },
                ]} speed={18} /></p>
              </div>

              <div style={{ marginTop: 16 }}>
                <div style={{
                  background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16,
                  padding: "20px 20px 12px", maxWidth: 480,
                  boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, marginBottom: 12 }}>How would you like to proceed?</p>
                  {["Reconcile entire DLA", "Reconcile this account only"].map(opt => (
                    <button key={opt} onClick={() => setDlaDirectChoice(opt)}
                      style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "12px 16px", marginBottom: 8,
                        background: T.colorSurfaceTertiary, border: "none",
                        borderRadius: 10, cursor: "pointer",
                        fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                      onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                    >{opt}</button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* User reply bubble for DLA direct choice */}
          {isDLAAccount && dlaDirectChoice && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                {dlaDirectChoice}
              </div>
            </div>
          )}

          {/* ── DLA direct account: results already exist — show account-specific accordion + review message ── */}
          {isDLAAccount && dlaHasResults && (() => {
            const acctRecData = ACCOUNT_REC_DATA[directAccount.code];
            const acctSteps = acctRecData ? acctRecData.steps : [];
            return (
              <>
                {acctSteps.length > 0 && (
                  <ReconciliationStepsAccordion
                    steps={acctSteps}
                    stepStatuses={acctSteps.map(() => "done")}
                    stepSubtexts={acctSteps.map(() => true)}
                  />
                )}
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                  <p><StreamingMessage key={"dla-direct-viewresults-" + directAccount.code} segments={[
                    { text: "Analysis is ready for your review. If something doesn't look right or is unclear simply ask me for any changes or information.", bold: false },
                  ]} speed={18} instant={true} /></p>
                </div>
              </>
            );
          })()}

          {/* DLA direct \u2192 "Reconcile entire DLA" \u2014 renders the full DLA flow below via isDLA/dlaActive */}

          {/* DLA direct \u2192 "Reconcile this account only" */}
          {isDLASingleAccount && (
            <>
              <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                <p><StreamingMessage key={"dla-single-1-" + directAccount.code} segments={dlaSingleLine1Segments} speed={18} /></p>
                {dlaSingleLine1Done && (
                  <p style={{ marginTop: 6 }}>
                    <StreamingMessage key={"dla-single-2-" + directAccount.code} segments={[{ text: dlaSingleLine2Text, bold: false }]} speed={18} />
                  </p>
                )}
                {dlaSingleLine2Done && (
                  <p style={{ marginTop: 6 }}>
                    <StreamingMessage key={"dla-single-3-" + directAccount.code} segments={[{ text: dlaSingleLine3Text, bold: false }]} speed={18} />
                  </p>
                )}
              </div>

              {/* Upload card for single DLA account */}
              {dlaSingleLine3Done && !uploadedFile && !noDocument && (
                <div style={{ marginTop: 16 }}>
                  <UploadCard onFileSelected={handleFileSelected} title="Upload file" onNoDocument={() => setNoDocument(true)} />
                </div>
              )}

              {/* User bubble — no document chosen */}
              {noDocument && !uploadedFile && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                    I don't have a file
                  </div>
                </div>
              )}

              {/* AI no-doc message (DLA single — stays visible after choice) */}
              {noDocument && !uploadedFile && (
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                  <p><StreamingMessage key="no-doc-dla-single" instant={isResume} segments={[
                    { text: "I can reconcile ", bold: false },
                    { text: directAccount.code + " – " + directAccount.account, bold: true },
                    { text: " without a file – I'll analyse the account using your latest Xero data and historical patterns.", bold: false },
                  ]} speed={18} /></p>
                </div>
              )}

              {/* No-doc choice card (DLA single) */}
              {noDocument && !uploadedFile && !noDocChoice && noDocMsgDone && (
                <div style={{ marginTop: 16, background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16, padding: "20px 20px 12px", maxWidth: 480, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)" }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, marginBottom: 12 }}>How would you like to continue?</p>
                  <button onClick={() => setNoDocChoice("analyse")} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", marginBottom: 8, background: T.colorSurfaceTertiary, border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 400, color: T.colorTextPrimary }} onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive} onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}>Start reconciliation</button>
                  <button disabled style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", textAlign: "left", padding: "12px 16px", marginBottom: 8, background: T.colorSurfaceTertiary, border: "none", borderRadius: 10, cursor: "default", fontSize: 14, fontWeight: 400, color: T.colorTextDisabled }}>Share details to include in reconciliation<span style={{ fontSize: 11, fontWeight: 600, color: T.colorTextSecondary, background: "#EBEBEB", borderRadius: 4, padding: "2px 6px", marginLeft: 8, whiteSpace: "nowrap" }}>Coming soon</span></button>
                </div>
              )}

              {/* User bubble \u2014 analyse choice echo (DLA single) */}
              {noDocument && !uploadedFile && noDocChoice === "analyse" && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                    Start reconciliation
                  </div>
                </div>
              )}

              {/* File preview */}
              {uploadedFile && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 320 }}>
                    <div style={{ background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: "12px 12px 2px 12px", padding: "20px 16px 16px", width: 260 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <FileIcon file={uploadedFile} width={20} height={24} />
                        <span style={{ fontSize: 12, fontWeight: 500, color: T.colorTextPrimary }}>{directAccount.account} report</span>
                      </div>
                      <div style={{ height: 1, background: T.colorSurfaceActive, marginBottom: 10 }} />
                      {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
                        <div key={i} style={{ height: 6, borderRadius: 3, background: T.colorSurfaceActive, width: `${w}%`, marginBottom: 6 }} />
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                      <FileIcon file={uploadedFile} width={13} height={16} />
                      <span style={{ fontSize: 12, color: T.colorTextThird, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>{uploadedFile.name}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Preparing status */}
              {!(noDocument && noDocChoice === "analyse") && ((uploadedFile && !prepDone)) && (
                <p style={{ fontSize: 13, color: T.colorBorderInput, marginTop: 20, lineHeight: "20px" }}>
                  Preparing the document and getting ready for reconciliation
                </p>
              )}

              {/* Ready message */}
              {!(noDocument && noDocChoice === "analyse") && prepDone && (
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                  <p><StreamingMessage key={"dla-single-ready-" + directAccount.code} segments={[
                    { text: "I have everything I need to reconcile ", bold: false },
                    { text: `${directAccount.code} – ${directAccount.account}`, bold: true },
                    { text: " against the document you provided. Tell me when you're ready to start.", bold: false },
                  ]} speed={18} /></p>
                </div>
              )}

              {/* Start choice */}
              {!(noDocument && noDocChoice === "analyse") && prepDone && line6Done && !readyChoice && (
                <div style={{ marginTop: 16 }}>
                  <div style={{
                    background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16,
                    padding: "20px 20px 12px", maxWidth: 480,
                    boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                  }}>
                    {["Start reconciliation", "Add another document"].map(opt => (
                      <button key={opt} onClick={() => setReadyChoice(opt)}
                        style={{
                          display: "block", width: "100%", textAlign: "left",
                          padding: "12px 16px", marginBottom: 8,
                          background: T.colorSurfaceTertiary, border: "none",
                          borderRadius: 10, cursor: "pointer",
                          fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                        onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                      >{opt}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* User reply */}
              {readyChoice && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                    {readyChoice}
                  </div>
                </div>
              )}

              {/* Progress steps (reuses existing effectiveStart and stepStatuses) */}
              {effectiveStart && stepStatuses.length > 0 && (
                <ReconciliationStepsAccordion steps={effectiveActiveSteps} stepStatuses={stepStatuses} stepSubtexts={stepSubtexts} onCollapsed={handleAccordionCollapsed} />
              )}

              {/* Ready for review message */}
              {canvasReady && (
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                  <p><StreamingMessage key={"dla-single-review-" + directAccount.code} segments={[{ text: line7Text, bold: false }]} speed={18} /></p>
                </div>
              )}
            </>
          )}

          {/* \u2500\u2500 Normal flow (type picker \u2192 accounts \u2192 upload) \u2500\u2500 */}
          {!isDirectFlow && !presetType && (
          <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
            <p><StreamingMessage segments={line1Segments} speed={18} instant={isResume} /></p>
            {line1Done && (
              <p style={{ marginTop: 6 }}>
                <StreamingMessage key="line2" segments={[{ text: line2Text, bold: false }]} speed={18} instant={isResume} />
              </p>
            )}
          </div>
          )}

          {/* Type picker \u2014 appears after AI finishes line 2, before user selects */}
          {!isDirectFlow && !presetType && line2Done && !typeSelected && (
            <div style={{ marginTop: 16 }}>
              <div style={{
                background: T.colorSurfacePrimary,
                border: `1px solid ${T.colorBorderDark}`,
                borderRadius: 16,
                padding: "20px 20px 12px",
                maxWidth: 480,
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
              }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, marginBottom: 12 }}>What would you like to reconcile?</p>
                {reconciliationTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => { setSelectedType(type); setTypeSelected(true); }}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "12px 16px", marginBottom: 8,
                      background: T.colorSurfaceTertiary, border: "none",
                      borderRadius: 10, cursor: "pointer",
                      fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                    onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User reply bubble \u2014 after type is selected */}
          {/* User reply bubble — preset shortcut (first message, no AI intro) */}
          {!isDirectFlow && presetType && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{
                maxWidth: 400,
                background: T.colorBrandLighter,
                borderRadius: "12px 12px 2px 12px",
                padding: "10px 14px",
                fontSize: 14,
                color: T.colorTextPrimary,
                lineHeight: "22px",
              }}>
                Reconcile {selectedType}
              </div>
            </div>
          )}
          {/* User reply bubble — normal flow after type picker */}
          {!isDirectFlow && !presetType && typeSelected && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{
                maxWidth: 400,
                background: T.colorBrandLighter,
                borderRadius: "12px 12px 2px 12px",
                padding: "10px 14px",
                fontSize: 14,
                color: T.colorTextPrimary,
                lineHeight: "22px",
              }}>
                {selectedType}
              </div>
            </div>
          )}

          {/* ── Preset has existing results: show view/restart choice ── */}
          {!isDirectFlow && presetHasResults && !presetAction && !(faActive && !isFAResume) && (() => {
            const allReconciled = presetMemberCodes.every(function(c) { return bsReconciledData[c].status === "reconciled"; });
            const statusLabel = allReconciled ? "reconciled" : "in review";
            return (
              <>
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                  <p><StreamingMessage key={"preset-status-" + selectedType} segments={[
                    { text: selectedType, bold: true },
                    { text: " has already been " + statusLabel + ". Would you like to view the results or start fresh?", bold: false },
                  ]} speed={18} /></p>
                </div>
                <div style={{ marginTop: 16 }}>
                  <div style={{
                    background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16,
                    padding: "20px 20px 12px", maxWidth: 480,
                    boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                  }}>
                    {["View reconciliation results", "Start new reconciliation"].map(opt => (
                      <button key={opt} onClick={() => {
                        setPresetAction(opt);
                        if (opt === "View reconciliation results") {
                          // Restore resolved/ignored cards from all member accounts
                          const allResolved = new Set();
                          const allIgnored = new Set();
                          presetMemberCodes.forEach(function(c) {
                            const d = bsReconciledData[c];
                            if (d && d.resolvedCards) d.resolvedCards.forEach(function(id) { allResolved.add(id); });
                            if (d && d.ignoredCards) d.ignoredCards.forEach(function(id) { allIgnored.add(id); });
                          });
                          setResolvedCards(allResolved);
                          setIgnoredCards(allIgnored);
                          // Jump to results view
                          if (selectedType === "Payroll") {
                            setResultsVisible(true);
                            setCanvasReady(true);
                          } else if (selectedType === "Directors' loan account") {
                            setDlaResultsVisible(true);
                            setDlaCanvasReady(true);
                          } else if (selectedType === "Fixed assets") {
                            setFaAccountChoiceSelected("Continue with suggested accounts");
                            setFaResultsVisible(true);
                            setFaCanvasReady(true);
                          }
                        }
                      }}
                      style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "12px 16px", marginBottom: 8,
                        background: T.colorSurfaceTertiary, border: "none",
                        borderRadius: 10, cursor: "pointer",
                        fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                      onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                      >{opt}</button>
                    ))}
                  </div>
                </div>
              </>
            );
          })()}

          {/* User reply bubble for preset action choice */}
          {!isDirectFlow && presetHasResults && presetAction && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                {presetAction}
              </div>
            </div>
          )}

          {/* AI message after "View reconciliation results" for preset */}
          {!isDirectFlow && presetAction === "View reconciliation results" && (
            <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key={"preset-viewresults-" + selectedType} segments={[
                { text: "Here are the reconciliation results for ", bold: false },
                { text: selectedType, bold: true },
                { text: ". If something doesn't look right or is unclear simply ask me for any changes or information.", bold: false },
              ]} speed={18} instant={true} /></p>
            </div>
          )}

          {/* ── DLA preset resume: show full chat history (instant) + accordion + review message ── */}
          {dlaActive && isDLAResume && (
            <>
              {/* AI intro message */}
              <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                <p><StreamingMessage key="dla-resume-line1" segments={[
                  { text: "I'll analyse the following directors' loan accounts using your connected Xero data:", bold: false },
                ]} speed={18} instant={true} /></p>
                <ul style={{ margin: "8px 0 0", paddingLeft: 20, listStyleType: "disc" }}>
                  {DLA_ACCOUNTS.map(acc => (
                    <li key={acc.code} style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "24px" }}>
                      <span style={{ fontWeight: 500 }}>{acc.code}</span>
                      <span style={{ margin: "0 6px" }}>{"–"}</span>
                      <span>{acc.account}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ marginTop: 10 }}>
                  <StreamingMessage key="dla-resume-line2" segments={[
                    { text: "The analysis covers ", bold: false },
                    { text: "S455 tax exposure", bold: true },
                    { text: ", ", bold: false },
                    { text: "benefit in kind", bold: true },
                    { text: ", the ", bold: false },
                    { text: "£10,000 threshold", bold: true },
                    { text: " and ", bold: false },
                    { text: "transaction classification", bold: true },
                    { text: ".", bold: false },
                  ]} speed={18} instant={true} />
                </p>
                <p style={{ marginTop: 6 }}>
                  <StreamingMessage key="dla-resume-line3" segments={[
                    { text: "You can start now or add a document to include in the analysis.", bold: false },
                  ]} speed={18} instant={true} />
                </p>
              </div>
              {/* User reply bubble */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                  Start reconciliation
                </div>
              </div>
              <ReconciliationStepsAccordion steps={DLA_RECONCILIATION_STEPS} stepStatuses={dlaStepStatuses} stepSubtexts={dlaStepSubtexts} />
              <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                <p><StreamingMessage key="dla-resume-review" segments={[
                  { text: "Analysis is ready for your review. If something doesn't look right or is unclear simply ask me for any changes or information.", bold: false },
                ]} speed={18} instant={true} /></p>
              </div>
            </>
          )}

          {/* ── "Choose account from balance sheet" flow ── */}
          {/* ── Directors' loan account flow ── */}
          {dlaActive && !isDLAResume && (!presetHasResults || presetAction === "Start new reconciliation" || dlaReadyChoice) && (
            <>
              {/* AI intro message */}
              <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                <p><StreamingMessage key="dla-line1" segments={dlaLine1Segments} speed={18} instant={isResume} /></p>

                {/* Account list */}
                {dlaLine1Done && (
                  <ul style={{ margin: "8px 0 0", paddingLeft: 20, listStyleType: "disc" }}>
                    {DLA_ACCOUNTS.map(acc => (
                      <li key={acc.code} style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "24px" }}>
                        <span style={{ fontWeight: 500 }}>{acc.code}</span>
                        <span style={{ margin: "0 6px" }}>{"–"}</span>
                        <span>{acc.account}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {dlaLine1Done && (
                  <p style={{ marginTop: 10 }}>
                    <StreamingMessage key="dla-line2" segments={dlaLine2Segments} speed={18} instant={isResume} />
                  </p>
                )}
                {dlaLine2Done && (
                  <p style={{ marginTop: 6 }}>
                    <StreamingMessage key="dla-line3" segments={[{ text: dlaLine3Text, bold: false }]} speed={18} instant={isResume} />
                  </p>
                )}
              </div>

              {/* First choice: Start reconciliation / Add document */}
              {dlaLine3Done && !dlaReadyChoice && (
                <div style={{ marginTop: 16 }}>
                  <div style={{
                    background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16,
                    padding: "20px 20px 12px", maxWidth: 480,
                    boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                  }}>
                    {["Start reconciliation", "Add document"].map(opt => (
                      <button key={opt} onClick={() => setDlaReadyChoice(opt)}
                        style={{
                          display: "block", width: "100%", textAlign: "left",
                          padding: "12px 16px", marginBottom: 8,
                          background: T.colorSurfaceTertiary, border: "none",
                          borderRadius: 10, cursor: "pointer",
                          fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                        onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                      >{opt}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* User reply bubble for first choice */}
              {dlaReadyChoice && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                    {dlaReadyChoice}
                  </div>
                </div>
              )}

              {/* "Add document" path */}
              {dlaReadyChoice === "Add document" && (
                <>
                  <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key={"dla-upload-msg-" + dlaAddMoreRound} segments={[{ text: "Upload a document and I'll include it when analysing the directors' loan accounts.", bold: false }]} speed={18} /></p>
                  </div>

                  {/* Upload card (first file) */}
                  {dlaUploadedFiles.length === 0 && !dlaAddMoreWaiting && !dlaNoDocument && (
                    <div style={{ marginTop: 16 }}>
                      <UploadCard onFileSelected={(file) => {
                        setDlaUploadedFiles([{ ...file, label: "Reconciliation document" }]);
                      }} title="Upload file" onNoDocument={() => setDlaNoDocument(true)} />
                    </div>
                  )}

                  {/* User bubble — no document chosen (DLA) */}
                  {dlaNoDocument && dlaUploadedFiles.length === 0 && (
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                      <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                        I don't have a file
                      </div>
                    </div>
                  )}

                  {/* AI no-doc message (DLA preset — stays visible after choice) */}
                  {dlaNoDocument && dlaUploadedFiles.length === 0 && (
                    <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                      <p><StreamingMessage key="no-doc-dla-preset" instant={isResume} segments={[
                        { text: "I can reconcile ", bold: false },
                        { text: "Directors' loan account", bold: true },
                        { text: " without a file – I'll analyse the accounts using your latest Xero data and historical patterns.", bold: false },
                      ]} speed={18} /></p>
                    </div>
                  )}

                  {/* No-doc choice card (DLA preset) */}
                  {dlaNoDocument && dlaUploadedFiles.length === 0 && !dlaNoDocChoice && dlaNoDocMsgDone && (
                    <div style={{ marginTop: 16, background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16, padding: "20px 20px 12px", maxWidth: 480, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)" }}>
                      <p style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, marginBottom: 12 }}>How would you like to continue?</p>
                      <button onClick={() => setDlaNoDocChoice("analyse")} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", marginBottom: 8, background: T.colorSurfaceTertiary, border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 400, color: T.colorTextPrimary }} onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive} onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}>Start reconciliation</button>
                      <button disabled style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", textAlign: "left", padding: "12px 16px", marginBottom: 8, background: T.colorSurfaceTertiary, border: "none", borderRadius: 10, cursor: "default", fontSize: 14, fontWeight: 400, color: T.colorTextDisabled }}>Share details to include in reconciliation<span style={{ fontSize: 11, fontWeight: 600, color: T.colorTextSecondary, background: "#EBEBEB", borderRadius: 4, padding: "2px 6px", marginLeft: 8, whiteSpace: "nowrap" }}>Coming soon</span></button>
                    </div>
                  )}

                  {/* User bubble \u2014 analyse choice echo (DLA preset) */}
                  {dlaNoDocument && dlaUploadedFiles.length === 0 && dlaNoDocChoice === "analyse" && (
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                      <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                        Start reconciliation
                      </div>
                    </div>
                  )}

                  {/* File previews */}
                  {dlaUploadedFiles.map((file, idx) => (
                    <div key={"dla-file-" + idx} style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                      <div style={{ maxWidth: 320 }}>
                        <div style={{ background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: "12px 12px 2px 12px", padding: "20px 16px 16px", width: 260 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                            <FileIcon file={file} width={20} height={24} />
                            <span style={{ fontSize: 12, fontWeight: 500, color: T.colorTextPrimary }}>{file.label}</span>
                          </div>
                          <div style={{ height: 1, background: T.colorSurfaceActive, marginBottom: 10 }} />
                          {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
                            <div key={i} style={{ height: 6, borderRadius: 3, background: T.colorSurfaceActive, width: `${w}%`, marginBottom: 6 }} />
                          ))}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                          <FileIcon file={file} width={13} height={16} />
                          <span style={{ fontSize: 12, color: T.colorTextThird, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>{file.name}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Preparing status */}
                  {!(dlaNoDocument && dlaNoDocChoice === "analyse") && ((dlaUploadedFiles.length > 0 && !dlaPrepDone && !dlaAddMoreWaiting)) && (
                    <p style={{ fontSize: 13, color: T.colorBorderInput, marginTop: 20, lineHeight: "20px" }}>
                      Preparing the document and getting ready for analysis
                    </p>
                  )}

                  {/* Ready message after prep */}
                  {!(dlaNoDocument && dlaNoDocChoice === "analyse") && dlaPrepDone && (
                    <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                      <p><StreamingMessage key={"dla-ready-" + dlaAddMoreRound} segments={dlaUploadReadySegments} speed={18} /></p>
                    </div>
                  )}

                  {/* Second choice: Start / Add another document */}
                  {!(dlaNoDocument && dlaNoDocChoice === "analyse") && dlaPrepDone && dlaUploadReadyDone && !dlaStartChoice && !dlaAddMoreWaiting && !dlaStartAfterMore && (
                    <div style={{ marginTop: 16 }}>
                      <div style={{
                        background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16,
                        padding: "20px 20px 12px", maxWidth: 480,
                        boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                      }}>
                        {["Start reconciliation", "Add another document"].map(opt => (
                          <button key={opt} onClick={() => {
                            if (opt === "Start reconciliation") { setDlaStartChoice(opt); }
                            else { setDlaAddMoreWaiting(true); }
                          }}
                            style={{
                              display: "block", width: "100%", textAlign: "left",
                              padding: "12px 16px", marginBottom: 8,
                              background: T.colorSurfaceTertiary, border: "none",
                              borderRadius: 10, cursor: "pointer",
                              fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                            onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                          >{opt}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* User reply for second choice */}
                  {dlaStartChoice && (
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                      <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                        {dlaStartChoice}
                      </div>
                    </div>
                  )}

                  {/* "Add another document" loop */}
                  {dlaAddMoreWaiting && (
                    <>
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                        <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                          Add another document
                        </div>
                      </div>
                      <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                        <p><StreamingMessage key={"dla-addmore-" + dlaAddMoreRound} segments={[{ text: "Upload another document and I'll include it when analysing the directors' loan accounts.", bold: false }]} speed={18} /></p>
                      </div>
                      <div style={{ marginTop: 16 }}>
                        <UploadCard onFileSelected={(file) => {
                          const labels = ["Reconciliation document", "Supporting document", "Additional document"];
                          const label = dlaUploadedFiles.length < labels.length ? labels[dlaUploadedFiles.length] : "Document " + (dlaUploadedFiles.length + 1);
                          setDlaUploadedFiles(prev => [...prev, { ...file, label }]);
                          setDlaAddMoreWaiting(false);
                          setDlaPrepDone(false);
                          setDlaAddMoreRound(prev => prev + 1);
                        }} title="Upload file" onNoDocument={() => setDlaStartChoice("Start reconciliation")} />
                      </div>
                    </>
                  )}

                  {/* Start after adding more files */}
                  {dlaStartAfterMore && (
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                      <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                        Start reconciliation
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Progress steps */}
              {dlaEffectiveStart && dlaStepStatuses.length > 0 && (
                <ReconciliationStepsAccordion steps={DLA_RECONCILIATION_STEPS} stepStatuses={dlaStepStatuses} stepSubtexts={dlaStepSubtexts} onCollapsed={handleDlaAccordionCollapsed} />
              )}

              {/* Ready for review message */}
              {dlaCanvasReady && (
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                  <p><StreamingMessage key="dla-review" segments={[{ text: dlaReviewText, bold: false }]} speed={18} /></p>
                </div>
              )}
            </>
          )}

          {/* ── Fixed Assets: intro + account list with streaming ── */}
          {faPreChoice && (
            <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key="fa-intro" segments={[{ text: faIntroText, bold: false }]} speed={18} instant={isFAResume} /></p>
              {faIntroDone && (
                <ul style={{ margin: "8px 0 0", paddingLeft: 20, listStyleType: "disc" }}>
                  {FA_ACCOUNTS.map(acc => (
                    <li key={acc.code} style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "24px" }}>
                      <span style={{ fontWeight: 500 }}>{acc.code}</span>
                      <span style={{ margin: "0 6px" }}>{"–"}</span>
                      <span>{acc.account}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* FA account choice card — shown after streaming completes */}
          {faPreChoice && faIntroDone && !faAccountChoiceSelected && (
            <div style={{ marginTop: 16 }}>
              <div style={{
                background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16,
                padding: "20px 20px 12px", maxWidth: 480,
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
              }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, marginBottom: 12 }}>How would you like to continue?</p>
                {["Continue with suggested accounts", "Pick accounts to reconcile"].map(opt => (
                  <button key={opt} onClick={() => setFaAccountChoiceSelected(opt)}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "12px 16px", marginBottom: 8,
                      background: T.colorSurfaceTertiary, border: "none",
                      borderRadius: 10, cursor: "pointer",
                      fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                    onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                  >{opt}</button>
                ))}
              </div>
            </div>
          )}

          {/* FA account choice user bubble */}
          {!isDirectFlow && isFA && faAccountChoiceSelected && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                {faAccountChoiceSelected}
              </div>
            </div>
          )}

          {/* FA "Pick accounts to reconcile" flow */}
          {!isDirectFlow && isFA && faAccountChoiceSelected === "Pick accounts to reconcile" && !faPickAccountsConfirmed && (
            <div style={{ marginTop: 16, background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16, padding: "20px 20px 16px", maxWidth: 480, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)" }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, marginBottom: 12 }}>Choose accounts</p>
              <div style={{ position: "relative" }}>
                <button ref={faPickAccountsTriggerRef} onClick={() => {
                  setFaPickAccountsOpen(o => {
                    if (!o && faPickAccountsTriggerRef.current) {
                      const rect = faPickAccountsTriggerRef.current.getBoundingClientRect();
                      const spaceBelow = window.innerHeight - rect.bottom;
                      setFaPickAccountsDropUp(spaceBelow < 300);
                    }
                    return !o;
                  });
                }} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", padding: "10px 12px",
                  background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 8,
                  cursor: "pointer", fontSize: 14, color: T.colorTextPrimary, textAlign: "left",
                }}>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                    {faPickedAccounts.length === 0 ? "Select accounts..." : (() => {
                      const first = FA_ACCOUNTS.find(a => a.code === faPickedAccounts[0]);
                      const label1 = first ? first.code + " – " + first.account : faPickedAccounts[0];
                      if (faPickedAccounts.length === 1) return label1;
                      const second = FA_ACCOUNTS.find(a => a.code === faPickedAccounts[1]);
                      const label2 = second ? second.code + " – " + second.account : faPickedAccounts[1];
                      if (faPickedAccounts.length === 2) return label1 + ", " + label2;
                      return label1 + ", " + label2 + ", +" + (faPickedAccounts.length - 2);
                    })()}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginLeft: 8, transform: faPickAccountsOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                    <path d="M4 6l4 4 4-4" stroke="#8C8C8B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {faPickAccountsOpen && (
                  <div style={{
                    position: "absolute", left: 0, right: 0,
                    ...(faPickAccountsDropUp ? { bottom: "calc(100% + 4px)" } : { top: "calc(100% + 4px)" }),
                    background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 8,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 10,
                    maxHeight: 280, display: "flex", flexDirection: "column",
                  }}>
                    <div style={{ padding: "8px 12px", borderBottom: `1px solid ${T.colorBorderLight}` }}>
                      <input type="text" placeholder="Search accounts..." value={faPickAccountsSearch}
                        onChange={e => setFaPickAccountsSearch(e.target.value)} autoFocus
                        style={{ width: "100%", padding: "6px 8px", border: `1px solid ${T.colorBorderDark}`, borderRadius: 6, fontSize: 13, outline: "none", boxSizing: "border-box" }}
                        onFocus={e => e.target.style.borderColor = T.colorBorderHover}
                        onBlur={e => e.target.style.borderColor = T.colorBorderDark}
                      />
                    </div>
                    <div style={{ overflowY: "auto", flex: 1 }}>
                      {FA_ACCOUNTS
                        .filter(a => !faPickAccountsSearch || (a.code + " " + a.account).toLowerCase().includes(faPickAccountsSearch.toLowerCase()))
                        .map(a => {
                          const isChecked = faPickedAccounts.includes(a.code);
                          return (
                            <div key={a.code} onClick={() => {
                              setFaPickedAccounts(prev => prev.includes(a.code) ? prev.filter(c => c !== a.code) : [...prev, a.code]);
                            }} style={{
                              display: "flex", alignItems: "center", gap: 8,
                              padding: "8px 12px", cursor: "pointer", fontSize: 13,
                              color: T.colorTextPrimary, background: isChecked ? T.colorBrandBg : "transparent",
                            }}
                              onMouseEnter={e => { if (!isChecked) e.currentTarget.style.background = T.colorSurfaceSecondary; }}
                              onMouseLeave={e => { e.currentTarget.style.background = isChecked ? T.colorBrandBg : "transparent"; }}
                            >
                              <div style={{
                                width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                                border: isChecked ? "none" : `1.5px solid ${T.colorBorderHover}`,
                                background: isChecked ? T.colorBrandPrimary : T.colorSurfacePrimary,
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}>
                                {isChecked && (
                                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M2 5l2.5 2.5L8 3" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                )}
                              </div>
                              <span>{a.code} – {a.account}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
              <button onClick={() => { setFaPickAccountsOpen(false); setFaPickAccountsConfirmed(true); }}
                disabled={faPickedAccounts.length === 0}
                style={{
                  marginTop: 12, width: "100%", padding: "10px 16px",
                  background: faPickedAccounts.length === 0 ? T.colorBorderLight : T.colorBrandPrimary,
                  color: faPickedAccounts.length === 0 ? T.colorTextDisabled : T.colorSurfacePrimary,
                  border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500,
                  cursor: faPickedAccounts.length === 0 ? "default" : "pointer",
                }}>
                Continue
              </button>
            </div>
          )}

          {/* ── Fixed Assets preset resume: show full chat history (instant) + accordion + review message ── */}
          {faActive && isFAResume && (
            <>
              <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                <p><StreamingMessage key="fa-resume-line1" segments={[
                  { text: "I'll reconcile the following fixed asset accounts against your uploaded register:", bold: false },
                ]} speed={18} instant={true} /></p>
                <ul style={{ margin: "8px 0 0", paddingLeft: 20, listStyleType: "disc" }}>
                  {FA_ACCOUNTS.map(acc => (
                    <li key={acc.code} style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "24px" }}>
                      <span style={{ fontWeight: 500 }}>{acc.code}</span>
                      <span style={{ margin: "0 6px" }}>{"–"}</span>
                      <span>{acc.account}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ marginTop: 10 }}>
                  <StreamingMessage key="fa-resume-line2" segments={[
                    { text: "The reconciliation checks ", bold: false },
                    { text: "cost and net book value", bold: true },
                    { text: ", ", bold: false },
                    { text: "depreciation schedules", bold: true },
                    { text: ", ", bold: false },
                    { text: "additions and disposals", bold: true },
                    { text: " and ", bold: false },
                    { text: "capex classification", bold: true },
                    { text: ".", bold: false },
                  ]} speed={18} instant={true} />
                </p>
                <p style={{ marginTop: 6 }}>
                  <StreamingMessage key="fa-resume-line3" segments={[
                    { text: "Upload your fixed asset register to get started. This is typically an Excel export from your asset management system or a schedule maintained outside Xero.", bold: false },
                  ]} speed={18} instant={true} />
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                  Start reconciliation
                </div>
              </div>
              <ReconciliationStepsAccordion steps={FA_RECONCILIATION_STEPS} stepStatuses={faStepStatuses} stepSubtexts={faStepSubtexts} />
              <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                <p><StreamingMessage key="fa-resume-review" segments={[
                  { text: "Reconciliation is ready for your review. If something doesn't look right or is unclear simply ask me for any changes or information.", bold: false },
                ]} speed={18} instant={true} /></p>
              </div>
            </>
          )}

          {/* ── Fixed Assets flow ── */}
          {faActive && !isFAResume && (
            <>
              {/* Post-choice AI message */}
              <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                <p><StreamingMessage key="fa-postchoice" segments={faPostChoiceSegments} speed={18} instant={isFAResume} /></p>

                {faPostChoiceDone && (
                  <p style={{ marginTop: 10 }}>
                    <StreamingMessage key="fa-line2" segments={faLine2Segments} speed={18} instant={isFAResume} />
                  </p>
                )}
                {faLine2Done && (
                  <p style={{ marginTop: 6 }}>
                    <StreamingMessage key="fa-line3" segments={[{ text: faLine3Text, bold: false }]} speed={18} instant={isFAResume} />
                  </p>
                )}
              </div>

              {/* Upload card — shown directly after streaming, no choice step */}
              {faLine3Done && faUploadedFiles.length === 0 && !faAddMoreWaiting && !faNoDocument && (
                <div style={{ marginTop: 16 }}>
                  <UploadCard onFileSelected={(file) => {
                    setFaUploadedFiles([{ ...file, label: "Fixed asset register" }]);
                  }} title="Upload file" onNoDocument={() => setFaNoDocument(true)} />
                </div>
              )}

              {/* User bubble — no document chosen (FA) */}
              {faNoDocument && faUploadedFiles.length === 0 && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                    I don't have a file
                  </div>
                </div>
              )}

              {/* AI no-doc message (FA preset) */}
              {faNoDocument && faUploadedFiles.length === 0 && (
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                  <p><StreamingMessage key="no-doc-fa-preset" instant={isFAResume} segments={[
                    { text: "I can reconcile ", bold: false },
                    { text: "Fixed assets", bold: true },
                    { text: " without a register – I'll analyse the accounts using your latest Xero data and compare depreciation patterns against prior periods.", bold: false },
                  ]} speed={18} /></p>
                </div>
              )}

              {/* No-doc choice card (FA preset) */}
              {faNoDocument && faUploadedFiles.length === 0 && !faNoDocChoice && faNoDocMsgDone && (
                <div style={{ marginTop: 16, background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16, padding: "20px 20px 12px", maxWidth: 480, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)" }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, marginBottom: 12 }}>How would you like to continue?</p>
                  <button onClick={() => setFaNoDocChoice("analyse")} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", marginBottom: 8, background: T.colorSurfaceTertiary, border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 400, color: T.colorTextPrimary }} onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive} onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}>Start reconciliation</button>
                  <button disabled style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", textAlign: "left", padding: "12px 16px", marginBottom: 8, background: T.colorSurfaceTertiary, border: "none", borderRadius: 10, cursor: "default", fontSize: 14, fontWeight: 400, color: T.colorTextDisabled }}>Share details to include in reconciliation<span style={{ fontSize: 11, fontWeight: 600, color: T.colorTextSecondary, background: "#EBEBEB", borderRadius: 4, padding: "2px 6px", marginLeft: 8, whiteSpace: "nowrap" }}>Coming soon</span></button>
                </div>
              )}

              {/* User bubble — analyse choice echo (FA preset) */}
              {faNoDocument && faUploadedFiles.length === 0 && faNoDocChoice === "analyse" && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                    Start reconciliation
                  </div>
                </div>
              )}

              {/* File previews */}
              {faUploadedFiles.map((file, idx) => (
                <div key={"fa-file-" + idx} style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 320 }}>
                    <div style={{ background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: "12px 12px 2px 12px", padding: "20px 16px 16px", width: 260 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <FileIcon file={file} width={20} height={24} />
                        <span style={{ fontSize: 12, fontWeight: 500, color: T.colorTextPrimary }}>{file.label}</span>
                      </div>
                      <div style={{ height: 1, background: T.colorSurfaceActive, marginBottom: 10 }} />
                      {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
                        <div key={i} style={{ height: 6, borderRadius: 3, background: T.colorSurfaceActive, width: `${w}%`, marginBottom: 6 }} />
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                      <FileIcon file={file} width={13} height={16} />
                      <span style={{ fontSize: 12, color: T.colorTextThird, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>{file.name}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Preparing status */}
              {!(faNoDocument && faNoDocChoice === "analyse") && ((faUploadedFiles.length > 0 && !faPrepDone && !faAddMoreWaiting)) && (
                <p style={{ fontSize: 13, color: T.colorBorderInput, marginTop: 20, lineHeight: "20px" }}>
                  Preparing the document and getting ready for analysis
                </p>
              )}

              {/* Ready message after prep */}
              {!(faNoDocument && faNoDocChoice === "analyse") && faPrepDone && (
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                  <p><StreamingMessage key={"fa-ready-" + faAddMoreRound} segments={[{ text: faUploadReadyFull, bold: false }]} speed={18} /></p>
                </div>
              )}

              {/* Choice: Start / Add another document — shown AFTER file upload */}
              {!(faNoDocument && faNoDocChoice === "analyse") && faPrepDone && faUploadReadyDone && !faStartChoice && !faAddMoreWaiting && !faStartAfterMore && (
                <div style={{ marginTop: 16 }}>
                  <div style={{
                    background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16,
                    padding: "20px 20px 12px", maxWidth: 480,
                    boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                  }}>
                    {["Start reconciliation", "Add another document"].map(opt => (
                      <button key={opt} onClick={() => {
                        if (opt === "Start reconciliation") { setFaStartChoice(opt); }
                        else { setFaAddMoreWaiting(true); }
                      }}
                        style={{
                          display: "block", width: "100%", textAlign: "left",
                          padding: "12px 16px", marginBottom: 8,
                          background: T.colorSurfaceTertiary, border: "none",
                          borderRadius: 10, cursor: "pointer",
                          fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                        onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                      >{opt}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* User reply for start choice */}
              {faStartChoice && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                    {faStartChoice}
                  </div>
                </div>
              )}

              {/* "Add another document" loop */}
              {faAddMoreWaiting && (
                <>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                    <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                      Add another document
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key={"fa-addmore-" + faAddMoreRound} segments={[{ text: "Upload another document and I'll include it in the fixed asset reconciliation.", bold: false }]} speed={18} /></p>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <UploadCard onFileSelected={(file) => {
                      const labels = ["Reconciliation document", "Supporting document", "Additional document"];
                      const label = faUploadedFiles.length < labels.length ? labels[faUploadedFiles.length] : "Document " + (faUploadedFiles.length + 1);
                      setFaUploadedFiles(prev => [...prev, { ...file, label }]);
                      setFaAddMoreWaiting(false);
                      setFaPrepDone(false);
                      setFaAddMoreRound(prev => prev + 1);
                    }} title="Upload file" onNoDocument={() => setFaStartChoice("Start reconciliation")} />
                  </div>
                </>
              )}

              {/* Start after adding more files */}
              {faStartAfterMore && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                    Start reconciliation
                  </div>
                </div>
              )}

              {/* Progress steps */}
              {faEffectiveStart && faStepStatuses.length > 0 && (
                <ReconciliationStepsAccordion steps={FA_RECONCILIATION_STEPS} stepStatuses={faStepStatuses} stepSubtexts={faStepSubtexts} onCollapsed={handleFaAccordionCollapsed} />
              )}

              {/* Ready for review message */}
              {faCanvasReady && (
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                  <p><StreamingMessage key="fa-review" segments={[{ text: faReviewText, bold: false }]} speed={18} /></p>
                </div>
              )}
            </>
          )}

          {!isDirectFlow && typeSelected && selectedType === "Choose account from balance sheet" && (
            <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key="line3b" segments={[{ text: line3bText, bold: false }]} speed={18} instant={isResume} /></p>
            </div>
          )}

          {/* BS Account picker card */}
          {!isDirectFlow && typeSelected && selectedType === "Choose account from balance sheet" && line3bDone && !pickedBSAccount && (
            <div style={{ marginTop: 16 }}>
              <div style={{
                background: T.colorSurfacePrimary,
                border: `1px solid ${T.colorBorderDark}`,
                borderRadius: 16,
                padding: "20px 20px 12px",
                maxWidth: 480,
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                height: 400,
                display: "flex",
                flexDirection: "column",
              }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, marginBottom: 12, flexShrink: 0 }}>Select an account</p>
                <input
                  type="text"
                  placeholder="Search accounts..."
                  value={accountSearch}
                  onChange={e => setAccountSearch(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 12px", marginBottom: 10,
                    border: `1px solid ${T.colorBorderDark}`, borderRadius: 8,
                    fontSize: 14, color: T.colorTextPrimary, outline: "none",
                    fontFamily: "'Inter', sans-serif",
                    boxSizing: "border-box",
                    flexShrink: 0,
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = T.colorBorderHover}
                  onBlur={e => e.currentTarget.style.borderColor = T.colorBorderDark}
                />
                <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
                  {allBSAccounts.filter(acc => !accountSearch || acc.code.toLowerCase().includes(accountSearch.toLowerCase()) || acc.account.toLowerCase().includes(accountSearch.toLowerCase())).map(acc => (
                    <button
                      key={acc.code}
                      onClick={() => setPickedBSAccount(acc)}
                      style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "10px 16px", marginBottom: 6,
                        background: T.colorSurfaceTertiary, border: "none",
                        borderRadius: 10, cursor: "pointer",
                        fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                      onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                    >
                      <span style={{ fontWeight: 500 }}>{acc.code}</span>
                      <span style={{ margin: "0 6px" }}>{"–"}</span>
                      <span>{acc.account}</span>
                    </button>
                  ))}
                  {allBSAccounts.filter(acc => !accountSearch || acc.code.toLowerCase().includes(accountSearch.toLowerCase()) || acc.account.toLowerCase().includes(accountSearch.toLowerCase())).length === 0 && (
                    <p style={{ fontSize: 14, color: T.colorTextSecondary, padding: "20px 24px", textAlign: "center" }}>No accounts found</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* User reply bubble for picked BS account */}
          {!isDirectFlow && pickedBSAccount && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{
                maxWidth: 400,
                background: T.colorBrandLighter,
                borderRadius: "12px 12px 2px 12px",
                padding: "10px 14px",
                fontSize: 14,
                color: T.colorTextPrimary,
                lineHeight: "22px",
              }}>
                {pickedBSAccount.code} {"–"} {pickedBSAccount.account}
              </div>
            </div>
          )}

          {/* After picking BS account: check if previously reconciled */}
          {!isDirectFlow && pickedBSAccount && (() => {
            const pickedRecData = bsReconciledData && bsReconciledData[pickedBSAccount.code];
            const isPreviouslyReconciled = pickedRecData && (pickedRecData.status === "reconciled" || pickedRecData.status === "reviewing");

            // If previously reconciled and no action chosen yet, show choice
            if (isPreviouslyReconciled && !pickedAccountAction) {
              const statusLabel = pickedRecData.status === "reconciled" ? "reconciled" : "in review";
              return (
                <>
                  <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key={"bs-pick-status-" + pickedBSAccount.code} segments={[
                      { text: pickedBSAccount.code + " – " + pickedBSAccount.account, bold: true },
                      { text: " has already been " + statusLabel + ". Would you like to view the results or start fresh?", bold: false },
                    ]} speed={18} /></p>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <div style={{
                      background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16,
                      padding: "20px 20px 12px", maxWidth: 480,
                      boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                    }}>
                      {["View reconciliation results", "Restart reconciliation"].map(opt => (
                        <button key={opt} onClick={() => {
                          setPickedAccountAction(opt);
                          if (opt === "View reconciliation results") {
                            // Jump to results immediately
                            const data = getAccountRecData(pickedBSAccount.code, pickedBSAccount.account);
                            setStepStatuses(data.steps.map(() => "done"));
                            setStepSubtexts(data.steps.map(() => true));
                            setUploadedFile({ name: "Uploaded document.pdf", type: "application/pdf" });
                            setPrepDone(true);
                            setReadyChoice("Start reconciliation");
                            setResultsVisible(true);
                            setCanvasReady(true);
                            // Restore resolved/ignored cards from saved data
                            if (pickedRecData.resolvedCards) setResolvedCards(new Set(pickedRecData.resolvedCards));
                            if (pickedRecData.ignoredCards) setIgnoredCards(new Set(pickedRecData.ignoredCards));
                          }
                        }}
                        style={{
                          display: "block", width: "100%", textAlign: "left",
                          padding: "12px 16px", marginBottom: 8,
                          background: T.colorSurfaceTertiary, border: "none",
                          borderRadius: 10, cursor: "pointer",
                          fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                        onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                        >{opt}</button>
                      ))}
                    </div>
                  </div>
                </>
              );
            }

            // If "View reconciliation results" chosen, show the view results message
            if (pickedAccountAction === "View reconciliation results") {
              return (
                <>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                    <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                      View reconciliation results
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key={"bs-pick-viewresults-" + pickedBSAccount.code} segments={[
                      { text: "Here are the reconciliation results for ", bold: false },
                      { text: pickedBSAccount.code + " – " + pickedBSAccount.account, bold: true },
                      { text: ". If something doesn't look right or is unclear simply ask me for any changes or information.", bold: false },
                    ]} speed={18} instant={true} /></p>
                  </div>
                </>
              );
            }

            // If "Restart reconciliation" chosen, show the normal flow
            if (pickedAccountAction === "Restart reconciliation") {
              const bsDirectLine1Segments = [
                { text: "Let's reconcile ", bold: false },
                { text: pickedBSAccount.code + " – " + pickedBSAccount.account, bold: true },
                { text: ".", bold: false },
              ];
              const bsDirectLine2Text = "Please upload a document to reconcile this account.";
              return (
                <>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                    <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                      Restart reconciliation
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key={"bs-pick-line1-" + pickedBSAccount.code} segments={bsDirectLine1Segments} speed={18} /></p>
                    <p style={{ marginTop: 6 }}>
                      <StreamingMessage key={"bs-pick-line2-" + pickedBSAccount.code} segments={[{ text: bsDirectLine2Text, bold: false }]} speed={18} />
                    </p>
                  </div>
                </>
              );
            }

            // Not previously reconciled – show normal upload flow
            const bsDirectLine1Segments = [
              { text: "Let's reconcile ", bold: false },
              { text: pickedBSAccount.code + " – " + pickedBSAccount.account, bold: true },
              { text: ".", bold: false },
            ];
            const bsDirectLine2Text = "Please upload a document to reconcile this account.";
            return (
              <>
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                  <p><StreamingMessage key={"bs-pick-line1-" + pickedBSAccount.code} segments={bsDirectLine1Segments} speed={18} /></p>
                  <p style={{ marginTop: 6 }}>
                    <StreamingMessage key={"bs-pick-line2-" + pickedBSAccount.code} segments={[{ text: bsDirectLine2Text, bold: false }]} speed={18} />
                  </p>
                </div>
              </>
            );
          })()}

          {/* Upload card for picked BS account */}
          {!isDirectFlow && pickedBSAccount && pickedAccountAction !== "View reconciliation results" && (pickedAccountAction === "Restart reconciliation" || !(bsReconciledData && bsReconciledData[pickedBSAccount.code] && (bsReconciledData[pickedBSAccount.code].status === "reconciled" || bsReconciledData[pickedBSAccount.code].status === "reviewing"))) && !uploadedFile && !noDocument && (
            <div style={{ marginTop: 16 }}>
              <UploadCard onFileSelected={handleFileSelected} title="Upload file" onNoDocument={() => setNoDocument(true)} />
            </div>
          )}

          {/* User bubble — no document chosen (picked BS account) */}
          {!isDirectFlow && pickedBSAccount && pickedAccountAction !== "View reconciliation results" && (pickedAccountAction === "Restart reconciliation" || !(bsReconciledData && bsReconciledData[pickedBSAccount.code] && (bsReconciledData[pickedBSAccount.code].status === "reconciled" || bsReconciledData[pickedBSAccount.code].status === "reviewing"))) && noDocument && !uploadedFile && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                I don't have a file
              </div>
            </div>
          )}

          {/* AI no-doc message (picked BS account — stays visible after choice) */}
          {!isDirectFlow && pickedBSAccount && noDocument && !uploadedFile && (
            <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key={"no-doc-bs-" + pickedBSAccount.code} instant={isResume} segments={[
                { text: "I can reconcile ", bold: false },
                { text: pickedBSAccount.code + " – " + pickedBSAccount.account, bold: true },
                { text: " without a file – I'll analyse the account using your latest Xero data and historical patterns.", bold: false },
              ]} speed={18} /></p>
            </div>
          )}

          {/* No-doc choice card (picked BS account) */}
          {!isDirectFlow && pickedBSAccount && noDocument && !uploadedFile && !noDocChoice && noDocMsgDone && (
            <div style={{ marginTop: 16, background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16, padding: "20px 20px 12px", maxWidth: 480, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)" }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, marginBottom: 12 }}>How would you like to continue?</p>
              <button onClick={() => setNoDocChoice("analyse")} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", marginBottom: 8, background: T.colorSurfaceTertiary, border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 400, color: T.colorTextPrimary }} onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive} onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}>Start reconciliation</button>
              <button disabled style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", textAlign: "left", padding: "12px 16px", marginBottom: 8, background: T.colorSurfaceTertiary, border: "none", borderRadius: 10, cursor: "default", fontSize: 14, fontWeight: 400, color: T.colorTextDisabled }}>Share details to include in reconciliation<span style={{ fontSize: 11, fontWeight: 600, color: T.colorTextSecondary, background: "#EBEBEB", borderRadius: 4, padding: "2px 6px", marginLeft: 8, whiteSpace: "nowrap" }}>Coming soon</span></button>
            </div>
          )}

          {/* User bubble \u2014 analyse choice echo (picked BS account) */}
          {!isDirectFlow && pickedBSAccount && noDocument && !uploadedFile && noDocChoice === "analyse" && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                Start reconciliation
              </div>
            </div>
          )}

          {/* File preview for picked BS account */}
          {!isDirectFlow && pickedBSAccount && pickedAccountAction !== "View reconciliation results" && (pickedAccountAction === "Restart reconciliation" || !(bsReconciledData && bsReconciledData[pickedBSAccount.code] && (bsReconciledData[pickedBSAccount.code].status === "reconciled" || bsReconciledData[pickedBSAccount.code].status === "reviewing"))) && uploadedFile && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ maxWidth: 320 }}>
                <div style={{ background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: "12px 12px 2px 12px", padding: "20px 16px 16px", width: 260 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <FileIcon file={uploadedFile} width={20} height={24} />
                    <span style={{ fontSize: 12, fontWeight: 500, color: T.colorTextPrimary }}>{pickedBSAccount.account} report</span>
                  </div>
                  <div style={{ height: 1, background: T.colorSurfaceActive, marginBottom: 10 }} />
                  {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
                    <div key={i} style={{ height: 6, borderRadius: 3, background: T.colorSurfaceActive, width: `${w}%`, marginBottom: 6 }} />
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                  <FileIcon file={uploadedFile} width={13} height={16} />
                  <span style={{ fontSize: 12, color: T.colorTextThird, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>{uploadedFile.name}</span>
                </div>
              </div>
            </div>
          )}

          {/* Preparing status for picked BS account */}
          {!(noDocument && noDocChoice === "analyse") && !isDirectFlow && pickedBSAccount && pickedAccountAction !== "View reconciliation results" && (pickedAccountAction === "Restart reconciliation" || !(bsReconciledData && bsReconciledData[pickedBSAccount.code] && (bsReconciledData[pickedBSAccount.code].status === "reconciled" || bsReconciledData[pickedBSAccount.code].status === "reviewing"))) && ((uploadedFile && !prepDone)) && (
            <p style={{ fontSize: 13, color: T.colorBorderInput, marginTop: 20, lineHeight: "20px" }}>
              Preparing the document and getting ready for reconciliation
            </p>
          )}

          {/* Ready message for picked BS account */}
          {!(noDocument && noDocChoice === "analyse") && !isDirectFlow && pickedBSAccount && pickedAccountAction !== "View reconciliation results" && (pickedAccountAction === "Restart reconciliation" || !(bsReconciledData && bsReconciledData[pickedBSAccount.code] && (bsReconciledData[pickedBSAccount.code].status === "reconciled" || bsReconciledData[pickedBSAccount.code].status === "reviewing"))) && prepDone && (
            <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key={"bs-pick-ready-" + pickedBSAccount.code} segments={[
                { text: "I have everything I need to reconcile ", bold: false },
                { text: pickedBSAccount.code + " – " + pickedBSAccount.account, bold: true },
                { text: " against the document you provided. Tell me when you're ready to start.", bold: false },
              ]} speed={18} /></p>
            </div>
          )}

          {/* Start choice for picked BS account */}
          {!(noDocument && noDocChoice === "analyse") && !isDirectFlow && pickedBSAccount && pickedAccountAction !== "View reconciliation results" && (pickedAccountAction === "Restart reconciliation" || !(bsReconciledData && bsReconciledData[pickedBSAccount.code] && (bsReconciledData[pickedBSAccount.code].status === "reconciled" || bsReconciledData[pickedBSAccount.code].status === "reviewing"))) && prepDone && line6Done && !readyChoice && (
            <div style={{ marginTop: 16 }}>
              <div style={{
                background: T.colorSurfacePrimary,
                border: `1px solid ${T.colorBorderDark}`,
                borderRadius: 16,
                padding: "20px 20px 12px",
                maxWidth: 480,
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
              }}>
                {["Start reconciliation", "Add another document"].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setReadyChoice(opt)}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "12px 16px", marginBottom: 8,
                      background: T.colorSurfaceTertiary, border: "none",
                      borderRadius: 10, cursor: "pointer",
                      fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                    onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User reply for start choice (picked BS account) */}
          {!isDirectFlow && pickedBSAccount && pickedAccountAction !== "View reconciliation results" && (pickedAccountAction === "Restart reconciliation" || !(bsReconciledData && bsReconciledData[pickedBSAccount.code] && (bsReconciledData[pickedBSAccount.code].status === "reconciled" || bsReconciledData[pickedBSAccount.code].status === "reviewing"))) && readyChoice && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                {readyChoice}
              </div>
            </div>
          )}

          {/* Add another document flow (picked BS account) */}
          {!isDirectFlow && pickedBSAccount && pickedAccountAction !== "View reconciliation results" && (pickedAccountAction === "Restart reconciliation" || !(bsReconciledData && bsReconciledData[pickedBSAccount.code] && (bsReconciledData[pickedBSAccount.code].status === "reconciled" || bsReconciledData[pickedBSAccount.code].status === "reviewing"))) && readyChoice === "Add another document" && (
            <>
              <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                <p><StreamingMessage key={"add-doc-bs-" + pickedBSAccount.code + "-" + addMoreRound} segments={[{ text: "Upload another document and I'll include it in the reconciliation.", bold: false }]} speed={18} /></p>
              </div>
              {addMoreRound === 0 && !addMoreWaitingUpload && (
                <div style={{ marginTop: 16 }}>
                  <UploadCard onFileSelected={(file) => { handleAddMoreFiles([file]); setAddMoreWaitingUpload(false); setAddMoreRound(prev => prev + 1); }} title="Upload file" onNoDocument={() => setReadyChoice("Start reconciliation")} />
                </div>
              )}
              {uploadedFiles.length > 1 && addMoreRound > 0 && uploadedFiles.slice(1).map((file, idx) => (
                <div key={"add-preview-bs-" + idx} style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 320 }}>
                    <div style={{ background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: "12px 12px 2px 12px", padding: "20px 16px 16px", width: 260 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <FileIcon file={file} width={20} height={24} />
                        <span style={{ fontSize: 12, fontWeight: 500, color: T.colorTextPrimary }}>{file.label}</span>
                      </div>
                      <div style={{ height: 1, background: T.colorSurfaceActive, marginBottom: 10 }} />
                      {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
                        <div key={i} style={{ height: 6, borderRadius: 3, background: T.colorSurfaceActive, width: `${w}%`, marginBottom: 6 }} />
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                      <FileIcon file={file} width={13} height={16} />
                      <span style={{ fontSize: 12, color: T.colorTextThird, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>{file.label}</span>
                    </div>
                  </div>
                </div>
              ))}
              {uploadedFiles.length > 1 && !addMorePrepDone && !addMoreWaitingUpload && (
                <p style={{ fontSize: 13, color: T.colorBorderInput, marginTop: 20, lineHeight: "20px" }}>
                  Preparing the document and getting ready for reconciliation
                </p>
              )}
              {addMorePrepDone && (() => {
                const labels = uploadedFiles.map(f => f.label);
                const docSegments = [];
                labels.forEach((lbl, i) => {
                  if (i > 0) {
                    if (i === labels.length - 1) docSegments.push({ text: " and ", bold: false });
                    else docSegments.push({ text: ", ", bold: false });
                  }
                  docSegments.push({ text: lbl, bold: true });
                });
                return (
                  <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key={"add-doc-bs-ready-" + pickedBSAccount.code + "-" + addMoreRound} segments={[
                      { text: "I have everything I need to reconcile ", bold: false },
                      { text: `${pickedBSAccount.code} – ${pickedBSAccount.account}`, bold: true },
                      { text: " against ", bold: false },
                      ...docSegments,
                      { text: ". Tell me when you're ready to start.", bold: false },
                    ]} speed={18} /></p>
                  </div>
                );
              })()}
              {addMorePrepDone && !addMoreWaitingUpload && !startAfterMore && (
                <div style={{ marginTop: 16 }}>
                  <div style={{
                    background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16,
                    padding: "20px 20px 12px", maxWidth: 480,
                    boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                  }}>
                    {["Start reconciliation", "Add another document"].map(opt => (
                      <button key={opt} onClick={() => {
                        if (opt === "Start reconciliation") { setStartAfterMore(true); }
                        else { setAddMoreWaitingUpload(true); }
                      }} style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "12px 16px", marginBottom: 8,
                        background: T.colorSurfaceTertiary, border: "none",
                        borderRadius: 10, cursor: "pointer",
                        fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                      onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                      >{opt}</button>
                    ))}
                  </div>
                </div>
              )}
              {/* User chose "Add another document" — new upload round */}
              {addMoreWaitingUpload && (
                <>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                    <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                      Add another document
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key={"add-doc-bs-waiting-" + addMoreRound} segments={[{ text: "Upload another document and I'll include it in the reconciliation.", bold: false }]} speed={18} /></p>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <UploadCard onFileSelected={(file) => { handleAddMoreFiles([file]); setAddMoreWaitingUpload(false); setAddMoreRound(prev => prev + 1); }} title="Upload file" onNoDocument={() => setReadyChoice("Start reconciliation")} />
                  </div>
                </>
              )}
            </>
          )}
          {!isDirectFlow && pickedBSAccount && readyChoice === "Add another document" && startAfterMore && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                Start reconciliation
              </div>
            </div>
          )}

          {/* Reconciliation steps for picked BS account */}
          {!isDirectFlow && pickedBSAccount && pickedAccountAction !== "View reconciliation results" && (pickedAccountAction === "Restart reconciliation" || !(bsReconciledData && bsReconciledData[pickedBSAccount.code] && (bsReconciledData[pickedBSAccount.code].status === "reconciled" || bsReconciledData[pickedBSAccount.code].status === "reviewing"))) && effectiveStart && stepStatuses.length > 0 && (
            <ReconciliationStepsAccordion steps={effectiveActiveSteps} stepStatuses={stepStatuses} stepSubtexts={stepSubtexts} onCollapsed={handleAccordionCollapsed} />
          )}

          {/* Ready for review message (picked BS account) */}
          {!isDirectFlow && pickedBSAccount && canvasReady && (
            <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key={"bs-pick-review-" + pickedBSAccount.code} segments={[{ text: line7Text, bold: false }]} speed={18} /></p>
            </div>
          )}

          {/* AI message: accounts intro + bullet list (Payroll flow) */}
          {!isDirectFlow && typeSelected && selectedType === "Payroll" && (!presetHasResults || presetAction === "Start new reconciliation") && (
            <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key="line3" segments={line3Segments} speed={18} instant={isResume} /></p>

              {/* Account bullet list \u2014 appears after line3 finishes */}
              {line3Done && (
                <ul style={{ margin: "8px 0 0", paddingLeft: 20, listStyleType: "disc" }}>
                  {payrollAccounts.map(acc => (
                    <li key={acc.code} style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "24px" }}>
                      <span style={{ color: T.colorTextPrimary, fontWeight: 500 }}>{acc.code}</span>
                      <span style={{ margin: "0 6px" }}>{"–"}</span>
                      <span>{acc.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Choice: how to continue \u2014 appears after account list */}
          {!isDirectFlow && typeSelected && selectedType === "Payroll" && (!presetHasResults || presetAction === "Start new reconciliation") && line3Done && !accountChoiceSelected && (
            <div style={{ marginTop: 16 }}>
              <div style={{
                background: T.colorSurfacePrimary,
                border: `1px solid ${T.colorBorderDark}`,
                borderRadius: 16,
                padding: "20px 20px 12px",
                maxWidth: 480,
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
              }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, marginBottom: 12 }}>How would you like to continue?</p>
                {["Continue with suggested accounts", "Pick accounts to reconcile"].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setAccountChoiceSelected(opt)}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "12px 16px", marginBottom: 8,
                      background: T.colorSurfaceTertiary, border: "none",
                      borderRadius: 10, cursor: "pointer",
                      fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                    onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User reply bubble for account choice */}
          {!isDirectFlow && accountChoiceSelected && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{
                maxWidth: 400,
                background: T.colorBrandLighter,
                borderRadius: "12px 12px 2px 12px",
                padding: "10px 14px",
                fontSize: 14,
                color: T.colorTextPrimary,
                lineHeight: "22px",
              }}>
                {accountChoiceSelected}
              </div>
            </div>
          )}

          {/* AI message after "Pick accounts to reconcile" */}
          {!isDirectFlow && accountChoiceSelected === "Pick accounts to reconcile" && (
            <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key="pick-accounts-msg" segments={[{ text: pickAccountsMsg, bold: false }]} speed={18} instant={isResume} /></p>
            </div>
          )}

          {/* Account picker choice box */}
          {!isDirectFlow && accountChoiceSelected === "Pick accounts to reconcile" && pickAccountsMsgDone && !pickAccountsConfirmed && (
            <div style={{ marginTop: 16, background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16, padding: "20px 20px 16px", maxWidth: 480, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)" }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, marginBottom: 12 }}>Choose accounts</p>

              {/* Multiselect dropdown */}
              <div style={{ position: "relative" }}>
                {/* Trigger button */}
                <button ref={pickAccountsTriggerRef} onClick={() => {
                  setPickAccountsOpen(o => {
                    if (!o && pickAccountsTriggerRef.current) {
                      const rect = pickAccountsTriggerRef.current.getBoundingClientRect();
                      const spaceBelow = window.innerHeight - rect.bottom;
                      setPickAccountsDropUp(spaceBelow < 300);
                    }
                    return !o;
                  });
                }} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", padding: "10px 12px",
                  background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 8,
                  cursor: "pointer", fontSize: 14, color: T.colorTextPrimary, textAlign: "left",
                }}>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                    {pickedPayrollAccounts.length === 0 ? "Select accounts..." : (() => {
                      const first = BS_ALL_ACCOUNTS.find(a => a.code === pickedPayrollAccounts[0]);
                      const label1 = first ? first.code + " – " + first.account : pickedPayrollAccounts[0];
                      if (pickedPayrollAccounts.length === 1) return label1;
                      const second = BS_ALL_ACCOUNTS.find(a => a.code === pickedPayrollAccounts[1]);
                      const label2 = second ? second.code + " – " + second.account : pickedPayrollAccounts[1];
                      if (pickedPayrollAccounts.length === 2) return label1 + ", " + label2;
                      return label1 + ", " + label2 + ", +" + (pickedPayrollAccounts.length - 2);
                    })()}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginLeft: 8, transform: pickAccountsOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                    <path d="M4 6l4 4 4-4" stroke="#8C8C8B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Dropdown panel */}
                {pickAccountsOpen && (
                  <div style={{
                    position: "absolute", left: 0, right: 0,
                    ...(pickAccountsDropUp ? { bottom: "calc(100% + 4px)" } : { top: "calc(100% + 4px)" }),
                    background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 8,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 10,
                    maxHeight: 280, display: "flex", flexDirection: "column",
                  }}>
                    {/* Search */}
                    <div style={{ padding: "8px 12px", borderBottom: `1px solid ${T.colorBorderLight}` }}>
                      <input
                        type="text"
                        placeholder="Search accounts..."
                        value={pickAccountsSearch}
                        onChange={e => setPickAccountsSearch(e.target.value)}
                        autoFocus
                        style={{
                          width: "100%", padding: "6px 8px", border: `1px solid ${T.colorBorderDark}`,
                          borderRadius: 6, fontSize: 13, outline: "none", boxSizing: "border-box",
                        }}
                        onFocus={e => e.target.style.borderColor = T.colorBorderHover}
                        onBlur={e => e.target.style.borderColor = T.colorBorderDark}
                      />
                    </div>

                    {/* Account list */}
                    <div style={{ overflowY: "auto", flex: 1 }}>
                      {BS_ALL_ACCOUNTS
                        .filter(a => !pickAccountsSearch || (a.code + " " + a.account).toLowerCase().includes(pickAccountsSearch.toLowerCase()))
                        .map(a => {
                          const isChecked = pickedPayrollAccounts.includes(a.code);
                          return (
                            <div
                              key={a.code}
                              onClick={() => {
                                setPickedPayrollAccounts(prev =>
                                  prev.includes(a.code) ? prev.filter(c => c !== a.code) : [...prev, a.code]
                                );
                              }}
                              style={{
                                display: "flex", alignItems: "center", gap: 8,
                                padding: "8px 12px", cursor: "pointer", fontSize: 13,
                                color: T.colorTextPrimary, background: isChecked ? T.colorBrandBg : "transparent",
                              }}
                              onMouseEnter={e => { if (!isChecked) e.currentTarget.style.background = T.colorSurfaceSecondary; }}
                              onMouseLeave={e => { e.currentTarget.style.background = isChecked ? T.colorBrandBg : "transparent"; }}
                            >
                              {/* Checkbox */}
                              <div style={{
                                width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                                border: isChecked ? "none" : `1.5px solid ${T.colorBorderHover}`,
                                background: isChecked ? T.colorBrandPrimary : T.colorSurfacePrimary,
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}>
                                {isChecked && (
                                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M2 5l2.5 2.5L8 3" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                )}
                              </div>
                              <span>{a.code} – {a.account}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>

              {/* Continue button */}
              <button
                onClick={() => {
                  setPickAccountsOpen(false);
                  setPickAccountsConfirmed(true);
                }}
                disabled={pickedPayrollAccounts.length === 0}
                style={{
                  marginTop: 12, width: "100%", padding: "10px 16px",
                  background: pickedPayrollAccounts.length === 0 ? T.colorBorderLight : T.colorBrandPrimary,
                  color: pickedPayrollAccounts.length === 0 ? T.colorTextDisabled : T.colorSurfacePrimary,
                  border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500,
                  cursor: pickedPayrollAccounts.length === 0 ? "default" : "pointer",
                }}
                onMouseEnter={e => { if (pickedPayrollAccounts.length > 0) e.currentTarget.style.background = T.colorBrandPrimaryHover; }}
                onMouseLeave={e => { if (pickedPayrollAccounts.length > 0) e.currentTarget.style.background = T.colorBrandPrimary; }}
              >
                Continue
              </button>
            </div>
          )}

          {/* AI confirmation after pick accounts \u2014 account list + upload prompt */}
          {!isDirectFlow && isCustomPayroll && (
            <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key="pick-confirm" segments={pickConfirmSegments} speed={18} instant={isResume} /></p>
              {pickConfirmDone && (
                <ul style={{ margin: "8px 0 0 0", padding: "0 0 0 20px", listStyle: "disc" }}>
                  {pickedPayrollAccounts.map(code => {
                    const acc = allBSAccounts.find(a => a.code === code);
                    return <li key={code} style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "24px" }}>{code} &ndash; {acc ? acc.account : code}</li>;
                  })}
                </ul>
              )}
              {pickConfirmDone && (
                <p style={{ marginTop: 10 }}>
                  <StreamingMessage key="pick-upload-prompt" segments={[{ text: pickUploadText, bold: false }]} speed={18} instant={isResume} />
                </p>
              )}
            </div>
          )}

          {/* AI confirmation message \u2014 after "Continue with suggested accounts" */}
          {!isDirectFlow && accountChoiceSelected === "Continue with suggested accounts" && (
            <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key="line4" segments={line4Segments} speed={18} instant={isResume} /></p>
              {line4Done && (
                <p style={{ marginTop: 6 }}>
                  <StreamingMessage key="line5" segments={[{ text: line5Text, bold: false }]} speed={18} instant={isResume} />
                </p>
              )}
            </div>
          )}

          {/* Upload card \u2014 appears after "Please upload a payroll report" finishes */}
          {!isDirectFlow && !isDLA && !pickedBSAccount && payrollUploadReady && !uploadedFile && !noDocument && (
            <div style={{ marginTop: 16 }}>
              <UploadCard onFileSelected={handleFileSelected} title="Upload payroll report" onNoDocument={() => setNoDocument(true)} />
            </div>
          )}

          {/* User bubble — no document chosen (payroll) */}
          {!isDirectFlow && !isDLA && !pickedBSAccount && noDocument && !uploadedFile && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                I don't have a file
              </div>
            </div>
          )}

          {/* AI no-doc message (payroll — stays visible after choice) */}
          {!isDirectFlow && !isDLA && !pickedBSAccount && noDocument && !uploadedFile && (
            <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key="no-doc-payroll" instant={isResume} segments={[
                { text: "I can reconcile ", bold: false },
                { text: "Payroll", bold: true },
                { text: " without a file – I'll analyse the accounts using your latest Xero data and historical patterns.", bold: false },
              ]} speed={18} /></p>
            </div>
          )}

          {/* No-doc choice card (payroll) */}
          {!isDirectFlow && !isDLA && !pickedBSAccount && noDocument && !uploadedFile && !noDocChoice && noDocMsgDone && (
            <div style={{ marginTop: 16, background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16, padding: "20px 20px 12px", maxWidth: 480, boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)" }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary, marginBottom: 12 }}>How would you like to continue?</p>
              <button onClick={() => setNoDocChoice("analyse")} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", marginBottom: 8, background: T.colorSurfaceTertiary, border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 400, color: T.colorTextPrimary }} onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive} onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}>Start reconciliation</button>
              <button disabled style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", textAlign: "left", padding: "12px 16px", marginBottom: 8, background: T.colorSurfaceTertiary, border: "none", borderRadius: 10, cursor: "default", fontSize: 14, fontWeight: 400, color: T.colorTextDisabled }}>Share details to include in reconciliation<span style={{ fontSize: 11, fontWeight: 600, color: T.colorTextSecondary, background: "#EBEBEB", borderRadius: 4, padding: "2px 6px", marginLeft: 8, whiteSpace: "nowrap" }}>Coming soon</span></button>
            </div>
          )}

          {/* User bubble \u2014 analyse choice echo (payroll) */}
          {!isDirectFlow && !isDLA && !pickedBSAccount && noDocument && !uploadedFile && noDocChoice === "analyse" && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                Start reconciliation
              </div>
            </div>
          )}

          {/* User bubble \u2014 file preview after upload */}
          {!isDirectFlow && !isDLA && !pickedBSAccount && !isCustomPayrollResume && uploadedFile && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ maxWidth: 320 }}>
                <div style={{ background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: "12px 12px 2px 12px", padding: "20px 16px 16px", width: 260 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <FileIcon file={uploadedFile} width={20} height={24} />
                    <span style={{ fontSize: 12, fontWeight: 500, color: T.colorTextPrimary }}>Payroll report</span>
                  </div>
                  <div style={{ height: 1, background: T.colorSurfaceActive, marginBottom: 10 }} />
                  {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
                    <div key={i} style={{ height: 6, borderRadius: 3, background: T.colorSurfaceActive, width: `${w}%`, marginBottom: 6 }} />
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                  <FileIcon file={uploadedFile} width={13} height={16} />
                  <span style={{ fontSize: 12, color: T.colorTextThird, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>{uploadedFile.name}</span>
                </div>
              </div>
            </div>
          )}

          {/* Preparing status \u2014 shows while waiting for prep */}
          {!(noDocument && noDocChoice === "analyse") && !isDirectFlow && !isDLA && !pickedBSAccount && !isCustomPayrollResume && ((uploadedFile && !prepDone)) && (
            <p style={{ fontSize: 13, color: T.colorBorderInput, marginTop: 20, lineHeight: "20px" }}>
              Preparing the payroll report and getting ready for reconciliation
            </p>
          )}

          {/* AI ready message \u2014 after prep done */}
          {!(noDocument && noDocChoice === "analyse") && !isDirectFlow && !isDLA && !pickedBSAccount && !isCustomPayrollResume && prepDone && (
            <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key="line6" segments={line6Segments} speed={18} instant={isResume} /></p>
            </div>
          )}

          {/* Choice: start or add another \u2014 appears after ready message finishes */}
          {!(noDocument && noDocChoice === "analyse") && !isDirectFlow && !isDLA && !pickedBSAccount && !isCustomPayrollResume && line6Done && !readyChoice && (
            <div style={{ marginTop: 16 }}>
              <div style={{
                background: T.colorSurfacePrimary,
                border: `1px solid ${T.colorBorderDark}`,
                borderRadius: 16,
                padding: "20px 20px 12px",
                maxWidth: 480,
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
              }}>
                {["Start reconciliation", "Add another payroll report"].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setReadyChoice(opt)}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "12px 16px", marginBottom: 8,
                      background: T.colorSurfaceTertiary, border: "none",
                      borderRadius: 10, cursor: "pointer",
                      fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                    onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User reply bubble for ready choice */}
          {!isDirectFlow && !isDLA && !pickedBSAccount && !isCustomPayrollResume && readyChoice && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{
                maxWidth: 400,
                background: T.colorBrandLighter,
                borderRadius: "12px 12px 2px 12px",
                padding: "10px 14px",
                fontSize: 14,
                color: T.colorTextPrimary,
                lineHeight: "22px",
              }}>
                {readyChoice}
              </div>
            </div>
          )}

          {/* Add another payroll report flow */}
          {!isDirectFlow && !isDLA && !pickedBSAccount && readyChoice === "Add another payroll report" && (
            <>
              <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                <p><StreamingMessage key={"add-doc-payroll-" + addMoreRound} segments={[{ text: "Upload another payroll report and I'll include it in the reconciliation.", bold: false }]} speed={18} /></p>
              </div>
              {addMoreRound === 0 && !addMoreWaitingUpload && (
                <div style={{ marginTop: 16 }}>
                  <UploadCard onFileSelected={(file) => { handleAddMoreFiles([file]); setAddMoreWaitingUpload(false); setAddMoreRound(prev => prev + 1); }} title="Upload payroll report" onNoDocument={() => setReadyChoice("Start reconciliation")} />
                </div>
              )}
              {uploadedFiles.length > 1 && addMoreRound > 0 && uploadedFiles.slice(1).map((file, idx) => (
                <div key={"add-preview-payroll-" + idx} style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 320 }}>
                    <div style={{ background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: "12px 12px 2px 12px", padding: "20px 16px 16px", width: 260 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <FileIcon file={file} width={20} height={24} />
                        <span style={{ fontSize: 12, fontWeight: 500, color: T.colorTextPrimary }}>{file.label}</span>
                      </div>
                      <div style={{ height: 1, background: T.colorSurfaceActive, marginBottom: 10 }} />
                      {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
                        <div key={i} style={{ height: 6, borderRadius: 3, background: T.colorSurfaceActive, width: `${w}%`, marginBottom: 6 }} />
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                      <FileIcon file={file} width={13} height={16} />
                      <span style={{ fontSize: 12, color: T.colorTextThird, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>{file.label}</span>
                    </div>
                  </div>
                </div>
              ))}
              {uploadedFiles.length > 1 && !addMorePrepDone && !addMoreWaitingUpload && (
                <p style={{ fontSize: 13, color: T.colorBorderInput, marginTop: 20, lineHeight: "20px" }}>
                  Preparing the payroll report and getting ready for reconciliation
                </p>
              )}
              {addMorePrepDone && (() => {
                const labels = uploadedFiles.map(f => f.label);
                const docSegments = [];
                labels.forEach((lbl, i) => {
                  if (i > 0) {
                    if (i === labels.length - 1) docSegments.push({ text: " and ", bold: false });
                    else docSegments.push({ text: ", ", bold: false });
                  }
                  docSegments.push({ text: lbl, bold: true });
                });
                return (
                  <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key={"add-doc-payroll-ready-" + addMoreRound} segments={[
                      { text: "I have everything I need to reconcile ", bold: false },
                      { text: "Payroll", bold: true },
                      { text: " against ", bold: false },
                      ...docSegments,
                      { text: ". Tell me when you're ready to start.", bold: false },
                    ]} speed={18} /></p>
                  </div>
                );
              })()}
              {addMorePrepDone && !addMoreWaitingUpload && !startAfterMore && (
                <div style={{ marginTop: 16 }}>
                  <div style={{
                    background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16,
                    padding: "20px 20px 12px", maxWidth: 480,
                    boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                  }}>
                    {["Start reconciliation", "Add another payroll report"].map(opt => (
                      <button key={opt} onClick={() => {
                        if (opt === "Start reconciliation") { setStartAfterMore(true); }
                        else { setAddMoreWaitingUpload(true); }
                      }} style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "12px 16px", marginBottom: 8,
                        background: T.colorSurfaceTertiary, border: "none",
                        borderRadius: 10, cursor: "pointer",
                        fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                      onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                      >{opt}</button>
                    ))}
                  </div>
                </div>
              )}
              {/* User chose "Add another payroll report" — new upload round */}
              {addMoreWaitingUpload && (
                <>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                    <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                      Add another payroll report
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key={"add-doc-payroll-waiting-" + addMoreRound} segments={[{ text: "Upload another payroll report and I'll include it in the reconciliation.", bold: false }]} speed={18} /></p>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <UploadCard onFileSelected={(file) => { handleAddMoreFiles([file]); setAddMoreWaitingUpload(false); setAddMoreRound(prev => prev + 1); }} title="Upload payroll report" onNoDocument={() => setReadyChoice("Start reconciliation")} />
                  </div>
                </>
              )}
            </>
          )}
          {!isDirectFlow && !isDLA && !pickedBSAccount && readyChoice === "Add another payroll report" && startAfterMore && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                Start reconciliation
              </div>
            </div>
          )}

          {/* Reconciliation progress steps \u2014 after "Start reconciliation" */}
          {!isDirectFlow && !isDLA && !pickedBSAccount && effectiveStart && stepStatuses.length > 0 && (
            <ReconciliationStepsAccordion steps={effectiveActiveSteps} stepStatuses={stepStatuses} stepSubtexts={stepSubtexts} onCollapsed={handleAccordionCollapsed} />
          )}

          {!isDirectFlow && !isDLA && !pickedBSAccount && canvasReady && presetAction !== "View reconciliation results" && (
            <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key="line7" segments={[{ text: line7Text, bold: false }]} speed={18} instant={isResume} /></p>
            </div>
          )}

          {/* ─── Restart reconciliation flow ─── */}
          {restartMode && (
            <>
              {/* User bubble: Restart reconciliation */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                  Restart reconciliation
                </div>
              </div>

              {/* AI message: how would you like to restart? */}
              <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                <p><StreamingMessage key="restart-ask" segments={[{ text: "How would you like to restart the reconciliation?", bold: false }]} speed={18} /></p>
              </div>

              {/* Choice card: same file vs new file */}
              {restartMode === "choosing" && !restartChoice && (
                <div style={{ marginTop: 16 }}>
                  <div style={{
                    background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16,
                    padding: "20px 20px 12px", maxWidth: 480,
                    boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                  }}>
                    {["Reconcile against the same file", "Reconcile against another file"].map(opt => (
                      <button key={opt} onClick={() => {
                        setRestartChoice(opt);
                        if (opt === "Reconcile against the same file") {
                          setRestartMode("same_file");
                        } else {
                          setRestartMode("new_file");
                        }
                      }} style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "12px 16px", marginBottom: 8,
                        background: T.colorSurfaceTertiary, border: "none",
                        borderRadius: 10, cursor: "pointer",
                        fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                      onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                      >{opt}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* User bubble for restart choice */}
              {restartChoice && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                  <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                    {restartChoice}
                  </div>
                </div>
              )}

              {/* ─── SAME FILE path: progress steps immediately ─── */}
              {restartMode === "same_file" && restartStepStatuses.length > 0 && (
                <ReconciliationStepsAccordion steps={effectiveActiveSteps} stepStatuses={restartStepStatuses} stepSubtexts={restartStepSubtexts} onCollapsed={handleRestartAccordionCollapsed} />
              )}

              {restartMode === "same_file" && canvasReady && (
                <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                  <p><StreamingMessage key="restart-line7-same" segments={[{ text: line7Text, bold: false }]} speed={18} /></p>
                </div>
              )}

              {/* ─── NEW FILE path: upload flow ─── */}
              {restartMode === "new_file" && (
                <>
                  {/* AI message: upload a document */}
                  <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                    <p><StreamingMessage key="restart-upload-msg" segments={[
                      { text: "Upload a document and I'll reconcile ", bold: false },
                      { text: accountLabel, bold: true },
                      { text: " against it.", bold: false },
                    ]} speed={18} /></p>
                  </div>

                  {/* Upload card */}
                  {restartUploadedFiles.length === 0 && !restartReadyChoice && (
                    <div style={{ marginTop: 16 }}>
                      <UploadCard onFileSelected={(file) => { setRestartUploadedFiles([{ ...file, label: "Reconciliation document" }]); }} title="Upload file" onNoDocument={() => setRestartReadyChoice("Start reconciliation")} />
                    </div>
                  )}

                  {/* File preview (user bubble) */}
                  {restartUploadedFiles.length > 0 && restartUploadedFiles.map((file, idx) => (
                    <div key={"restart-file-" + idx} style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                      <div style={{ maxWidth: 320 }}>
                        <div style={{ background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: "12px 12px 2px 12px", padding: "20px 16px 16px", width: 260 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                            <FileIcon file={file} width={20} height={24} />
                            <span style={{ fontSize: 12, fontWeight: 500, color: T.colorTextPrimary }}>{file.label}</span>
                          </div>
                          <div style={{ height: 1, background: T.colorSurfaceActive, marginBottom: 10 }} />
                          {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
                            <div key={i} style={{ height: 6, borderRadius: 3, background: T.colorSurfaceActive, width: `${w}%`, marginBottom: 6 }} />
                          ))}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                          <FileIcon file={file} width={13} height={16} />
                          <span style={{ fontSize: 12, color: T.colorTextThird, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>{file.label}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Prep status */}
                  {restartUploadedFiles.length > 0 && !restartPrepDone && (
                    <p style={{ fontSize: 13, color: T.colorBorderInput, marginTop: 20, lineHeight: "20px" }}>
                      Preparing the document and getting ready for reconciliation
                    </p>
                  )}

                  {/* AI ready message */}
                  {restartPrepDone && !restartReadyChoice && !restartStartAfterMore && (() => {
                    const labels = restartUploadedFiles.map(f => f.label);
                    const docSegments = [];
                    labels.forEach((lbl, i) => {
                      if (i > 0) {
                        if (i === labels.length - 1) docSegments.push({ text: " and ", bold: false });
                        else docSegments.push({ text: ", ", bold: false });
                      }
                      docSegments.push({ text: lbl, bold: true });
                    });
                    return (
                      <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                        <p><StreamingMessage key={"restart-ready-" + restartAddMoreRound} segments={[
                          { text: "I have everything I need to reconcile ", bold: false },
                          { text: accountLabel, bold: true },
                          { text: " against ", bold: false },
                          ...docSegments,
                          { text: ". Tell me when you're ready to start.", bold: false },
                        ]} speed={18} /></p>
                      </div>
                    );
                  })()}

                  {/* Choice: start or add another */}
                  {restartPrepDone && !restartReadyChoice && !restartStartAfterMore && restartAddMoreRound === 0 && (
                    <div style={{ marginTop: 16 }}>
                      <div style={{
                        background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16,
                        padding: "20px 20px 12px", maxWidth: 480,
                        boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                      }}>
                        {["Start reconciliation", "Add another document"].map(opt => (
                          <button key={opt} onClick={() => {
                            if (opt === "Start reconciliation") { setRestartReadyChoice("Start reconciliation"); }
                            else {
                              setRestartAddMorePrepDone(false);
                              setRestartAddMoreRound(prev => prev + 1);
                            }
                          }} style={{
                            display: "block", width: "100%", textAlign: "left",
                            padding: "12px 16px", marginBottom: 8,
                            background: T.colorSurfaceTertiary, border: "none",
                            borderRadius: 10, cursor: "pointer",
                            fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                          onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                          >{opt}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* User bubble for start choice */}
                  {(restartReadyChoice === "Start reconciliation" || restartStartAfterMore) && (
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                      <div style={{ maxWidth: 400, background: T.colorBrandLighter, borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px" }}>
                        Start reconciliation
                      </div>
                    </div>
                  )}

                  {/* Add another document sub-flow */}
                  {restartAddMoreRound > 0 && !restartReadyChoice && !restartStartAfterMore && (
                    <>
                      {/* AI message */}
                      <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                        <p><StreamingMessage key={"restart-add-doc-" + restartAddMoreRound} segments={[{ text: "Upload another document and I'll include it in the reconciliation.", bold: false }]} speed={18} /></p>
                      </div>
                      {/* Upload card for additional file */}
                      {!restartAddMorePrepDone && (
                        <div style={{ marginTop: 16 }}>
                          <UploadCard onFileSelected={(file) => {
                            const label = restartUploadedFiles.length < 3 ? ["Reconciliation document", "Supporting document", "Additional document"][restartUploadedFiles.length] : "Document " + (restartUploadedFiles.length + 1);
                            setRestartUploadedFiles(prev => [...prev, { ...file, label }]);
                          }} title="Upload file" onNoDocument={() => setRestartStartAfterMore(true)} />
                        </div>
                      )}
                      {/* Prep status for add-more */}
                      {restartUploadedFiles.length > 1 && !restartAddMorePrepDone && (
                        <p style={{ fontSize: 13, color: T.colorBorderInput, marginTop: 20, lineHeight: "20px" }}>
                          Preparing the document and getting ready for reconciliation
                        </p>
                      )}
                      {/* Ready message after add-more prep */}
                      {restartAddMorePrepDone && (() => {
                        const labels = restartUploadedFiles.map(f => f.label);
                        const docSegments = [];
                        labels.forEach((lbl, i) => {
                          if (i > 0) {
                            if (i === labels.length - 1) docSegments.push({ text: " and ", bold: false });
                            else docSegments.push({ text: ", ", bold: false });
                          }
                          docSegments.push({ text: lbl, bold: true });
                        });
                        return (
                          <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                            <p><StreamingMessage key={"restart-add-ready-" + restartAddMoreRound} segments={[
                              { text: "I have everything I need to reconcile ", bold: false },
                              { text: accountLabel, bold: true },
                              { text: " against ", bold: false },
                              ...docSegments,
                              { text: ". Tell me when you're ready to start.", bold: false },
                            ]} speed={18} /></p>
                          </div>
                        );
                      })()}
                      {/* Choice after add-more */}
                      {restartAddMorePrepDone && (
                        <div style={{ marginTop: 16 }}>
                          <div style={{
                            background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 16,
                            padding: "20px 20px 12px", maxWidth: 480,
                            boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                          }}>
                            {["Start reconciliation", "Add another document"].map(opt => (
                              <button key={opt} onClick={() => {
                                if (opt === "Start reconciliation") { setRestartStartAfterMore(true); }
                                else { setRestartAddMorePrepDone(false); setRestartAddMoreRound(prev => prev + 1); }
                              }} style={{
                                display: "block", width: "100%", textAlign: "left",
                                padding: "12px 16px", marginBottom: 8,
                                background: T.colorSurfaceTertiary, border: "none",
                                borderRadius: 10, cursor: "pointer",
                                fontSize: 14, fontWeight: 400, color: T.colorTextPrimary,
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceActive}
                              onMouseLeave={e => e.currentTarget.style.background = T.colorSurfaceTertiary}
                              >{opt}</button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Progress steps for new file restart */}
                  {(restartReadyChoice === "Start reconciliation" || restartStartAfterMore) && restartStepStatuses.length > 0 && (
                    <ReconciliationStepsAccordion steps={effectiveActiveSteps} stepStatuses={restartStepStatuses} stepSubtexts={restartStepSubtexts} onCollapsed={handleRestartAccordionCollapsed} />
                  )}

                  {(restartReadyChoice === "Start reconciliation" || restartStartAfterMore) && canvasReady && (
                    <div style={{ fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", marginTop: 20 }}>
                      <p><StreamingMessage key="restart-line7-newfile" segments={[{ text: line7Text, bold: false }]} speed={18} /></p>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          <div ref={chatEndRef} style={{ height: 32, flexShrink: 0 }} />
        </div>
      </div>

      {/* Chat input area \u2014 appears after canvas is ready */}
      {(canvasReady || dlaCanvasReady || faCanvasReady) && (
        <div style={{ padding: "0 24px 20px", flexShrink: 0 }}>
          <div style={{ maxWidth: (resultsVisible || dlaResultsVisible || faResultsVisible) ? "100%" : 680, margin: "0 auto" }}>
            {/* Restart reconciliation button */}
            {dlaCanvasReady ? (
              <button
                onClick={() => {
                  // DLA restart: reset results and re-run reconciliation steps
                  setDlaStepStatuses([]);
                  setDlaStepSubtexts([]);
                  setDlaCanvasReady(false);
                  setDlaResultsVisible(false);
                  setResolvedCards(new Set());
                  setIgnoredCards(new Set());
                  // Increment trigger to re-fire the steps effect
                  setDlaRestartTrigger(prev => prev + 1);
                }}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                  height: 40, padding: "0 16px", marginBottom: 10,
                  border: `1px solid ${T.colorBorderDark}`, borderRadius: 8,
                  background: T.colorSurfacePrimary, cursor: "pointer",
                  boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                  fontSize: 14, fontWeight: 500, color: T.colorTextPrimary,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = T.colorSurfaceSecondary; e.currentTarget.style.borderColor = T.colorBorderHover; }}
                onMouseLeave={e => { e.currentTarget.style.background = T.colorSurfacePrimary; e.currentTarget.style.borderColor = T.colorBorderDark; }}
              >
                <PlayCircleIcon color={T.colorTextPrimary} size={20} />
                Restart reconciliation
              </button>
            ) : (!restartMode || restartResultsVisible) && (
              <button
                onClick={() => {
                  if (restartMode) {
                    // Reset all restart state for a fresh restart
                    setRestartChoice(null);
                    setRestartUploadedFiles([]);
                    setRestartPrepDone(false);
                    setRestartReadyChoice(null);
                    setRestartStepStatuses([]);
                    setRestartStepSubtexts([]);
                    setRestartCanvasReady(false);
                    setRestartResultsVisible(false);
                    setRestartAddMoreRound(0);
                    setRestartAddMorePrepDone(false);
                    setRestartStartAfterMore(false);
                  }
                  setRestartMode("choosing");
                }}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                  height: 40, padding: "0 16px", marginBottom: 10,
                  border: `1px solid ${T.colorBorderDark}`, borderRadius: 8,
                  background: T.colorSurfacePrimary, cursor: "pointer",
                  boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                  fontSize: 14, fontWeight: 500, color: T.colorTextPrimary,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = T.colorSurfaceSecondary; e.currentTarget.style.borderColor = T.colorBorderHover; }}
                onMouseLeave={e => { e.currentTarget.style.background = T.colorSurfacePrimary; e.currentTarget.style.borderColor = T.colorBorderDark; }}
              >
                <PlayCircleIcon color={T.colorTextPrimary} size={20} />
                Restart reconciliation
              </button>
            )}
            <div style={{
              borderRadius: 16, padding: "14px 14px 12px", background: T.colorSurfacePrimary,
              boxShadow: `0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px ${T.colorBorderDark}`,
            }}>
              <textarea
                placeholder="Ask for changes or information..."
                rows={3}
                style={{ width: "100%", border: "none", outline: "none", resize: "none", fontSize: 14, color: T.colorTextPrimary, lineHeight: "22px", background: "transparent", fontFamily: "'Inter', sans-serif", display: "block" }}
              />
              <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                {/* Attachment */}
                <button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: T.colorTextSecondary, padding: 0 }}
                  onMouseEnter={e => e.currentTarget.style.background = T.colorBorderLight}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M15.5 8.5L8.5 15.5C7.12 16.88 4.88 16.88 3.5 15.5C2.12 14.12 2.12 11.88 3.5 10.5L10.5 3.5C11.33 2.67 12.67 2.67 13.5 3.5C14.33 4.33 14.33 5.67 13.5 6.5L6.5 13.5C6.08 13.92 5.42 13.92 5 13.5C4.58 13.08 4.58 12.42 5 12L11.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div style={{ flex: 1 }} />
                {/* Microphone */}
                <button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: T.colorTextSecondary, padding: 0 }}
                  onMouseEnter={e => e.currentTarget.style.background = T.colorBorderLight}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="6" y="1" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1.25" />
                    <path d="M3 9C3 12.31 5.69 15 9 15C12.31 15 15 12.31 15 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                    <line x1="9" y1="15" x2="9" y2="17" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                  </svg>
                </button>
                {/* Send */}
                <button style={{ width: 36, height: 36, marginLeft: 6, border: `1px solid ${T.colorBorderDark}`, borderRadius: 10, background: T.colorSurfaceSecondary, cursor: "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s", padding: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M9.99984 15.8346V4.16797M9.99984 4.16797L4.1665 10.0013M9.99984 4.16797L15.8332 10.0013" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      </div> {/* end left chat panel */}

      {/* Canvas \u2014 absolutely positioned overlay, slides in from right */}
      <div style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: chatWidth + 6,
        right: 0,
        background: T.colorSurfacePrimary,
        borderLeft: `1px solid ${T.colorBorderDark}`,
        overflowY: "auto",
        zIndex: 2,
        transform: (resultsVisible || dlaResultsVisible || faResultsVisible) ? "translateX(0)" : "translateX(100vw)",
        transition: isDragging ? "none" : "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "transform",
      }}>
        {(resultsVisible || dlaResultsVisible || faResultsVisible) && ((canvasReady || dlaCanvasReady || faCanvasReady) ? (
          <div style={{ animation: "resultsFadeIn 0.5s ease both", height: "100%" }}>
            {faActive && faCanvasReady ? (() => {
              // Merge all FA account data into one config
              const faOverviewRows = [];
              const faAnalysis = [];
              const faSuggestions = [];
              const faIdOffsetMap = {};
              let faOffset = 0;
              FA_ACCOUNTS.forEach(acc => {
                const data = ACCOUNT_REC_DATA[acc.code];
                if (!data) return;
                faOverviewRows.push(...data.overviewRows);
                faAnalysis.push(...(data.analysis || []).filter(a => a.title !== "Overview"));
                faIdOffsetMap[acc.code] = faOffset;
                data.suggestions.forEach(s => {
                  faSuggestions.push({ ...s, id: faOffset + s.id });
                });
                faOffset += data.suggestions.length;
              });
              const faConfig = {
                overviewRows: faOverviewRows,
                analysis: faAnalysis,
                suggestions: faSuggestions,
              };
              return (
                <AccountResultsPanel
                  config={faConfig}
                  isDLAPanel={false}
                  resolvedCards={resolvedCards}
                  ignoredCards={ignoredCards}
                  onResolveCard={(idx, label) => { setResolvedCards(prev => new Set([...prev, idx])); if (label) setResolvedLabels(prev => Object.assign({}, prev, { [idx]: label })); }}
                  onIgnoreCard={(idx) => { setIgnoredCards(prev => new Set([...prev, idx])); setResolvedLabels(prev => Object.assign({}, prev, { [idx]: "Ignored" })); }}
                  onShowToast={function() {}}
                  accountReconciled={isAccountReconciled}
                  resolvedLabels={resolvedLabels}
                  onResyncComplete={setFaResyncOverrides}
                  initialResyncedData={Object.keys(faResyncOverrides).length > 0 ? faResyncOverrides : null}
                  resyncIdOffsets={faIdOffsetMap}
                />
              );
            })() : (dlaActive || dlaHasResults) && dlaCanvasReady ? (() => {
              const d2300 = ACCOUNT_REC_DATA["2300"];
              const d2301 = ACCOUNT_REC_DATA["2301"];
              // When viewing a specific DLA account from the table (dlaHasResults && !dlaActive),
              // show only that account's suggestions. When in full DLA flow, show merged.
              if (dlaHasResults && !dlaActive && directAccount) {
                const singleData = ACCOUNT_REC_DATA[directAccount.code];
                if (singleData) {
                  const singleConfig = {
                    overviewRows: singleData.overviewRows || [],
                    analysis: (singleData.analysis || []).filter(a => a.title !== "Overview"),
                    suggestions: singleData.suggestions || [],
                  };
                  return (
                    <AccountResultsPanel
                      config={singleConfig}
                      isDLAPanel={false}
                      dlaSingleCode={directAccount.code}
                      resolvedCards={resolvedCards}
                      ignoredCards={ignoredCards}
                      onResolveCard={(idx, label) => { setResolvedCards(prev => new Set([...prev, idx])); if (label) setResolvedLabels(prev => Object.assign({}, prev, { [idx]: label })); }}
                      onIgnoreCard={(idx) => { setIgnoredCards(prev => new Set([...prev, idx])); setResolvedLabels(prev => Object.assign({}, prev, { [idx]: "Ignored" })); }}
                      onShowToast={function() {}}
                      accountReconciled={isAccountReconciled}
                      resolvedLabels={resolvedLabels}
                      onResyncComplete={setDlaResyncOverrides}
                      initialResyncedData={Object.keys(dlaResyncOverrides).length > 0 ? dlaResyncOverrides : null}
                    />
                  );
                }
              }
              const mergedConfig = {
                overviewRows: [...d2300.overviewRows, ...d2301.overviewRows],
                analysis: [...d2300.analysis, ...d2301.analysis].filter(a => a.title !== "Overview"),
                suggestions: [...d2300.suggestions, ...d2301.suggestions.map(s => ({ ...s, id: s.id + d2300.suggestions.length }))],
              };
              return (
                <AccountResultsPanel
                  config={mergedConfig}
                  isDLAPanel={true}
                  resolvedCards={resolvedCards}
                  ignoredCards={ignoredCards}
                  onResolveCard={(idx, label) => { setResolvedCards(prev => new Set([...prev, idx])); if (label) setResolvedLabels(prev => Object.assign({}, prev, { [idx]: label })); }}
                  onIgnoreCard={(idx) => { setIgnoredCards(prev => new Set([...prev, idx])); setResolvedLabels(prev => Object.assign({}, prev, { [idx]: "Ignored" })); }}
                  onShowToast={function() {}}
                  accountReconciled={isAccountReconciled}
                  resolvedLabels={resolvedLabels}
                  onResyncComplete={setDlaResyncOverrides}
                  initialResyncedData={Object.keys(dlaResyncOverrides).length > 0 ? dlaResyncOverrides : null}
                />
              );
            })() : effectiveDirectAccount && accountRecData ? (
              <AccountResultsPanel
                config={accountRecData}
                fromCustomPayroll={!!(savedState && savedState.fromCustomPayroll)}
                noDocument={!!(noDocument || (savedState && savedState.noDocument))}
                resolvedCards={resolvedCards}
                ignoredCards={ignoredCards}
                onResolveCard={(idx, label) => { setResolvedCards(prev => new Set([...prev, idx])); if (label) setResolvedLabels(prev => Object.assign({}, prev, { [idx]: label })); }}
                onIgnoreCard={(idx) => { setIgnoredCards(prev => new Set([...prev, idx])); setResolvedLabels(prev => Object.assign({}, prev, { [idx]: "Ignored" })); }}
                onShowToast={function() {}}
                accountReconciled={isAccountReconciled}
                resolvedLabels={resolvedLabels}
                onResyncComplete={setAccountResyncOverrides}
                initialResyncedData={Object.keys(accountResyncOverrides).length > 0 ? accountResyncOverrides : null}
              />
            ) : (
              <PayrollResultsPanel
                resolvedCards={resolvedCards}
                ignoredCards={ignoredCards}
                onResolveCard={(idx, label) => { setResolvedCards(prev => new Set([...prev, idx])); if (label) setResolvedLabels(prev => Object.assign({}, prev, { [idx]: label })); }}
                onIgnoreCard={(idx) => { setIgnoredCards(prev => new Set([...prev, idx])); setResolvedLabels(prev => Object.assign({}, prev, { [idx]: "Ignored" })); }}
                onShowToast={function() {}}
                accountReconciled={isAccountReconciled}
                resolvedLabels={resolvedLabels}
                noDocument={!!(noDocument || (savedState && savedState.noDocument))}
                customOverviewRows={isCustomPayroll ? pickedPayrollAccounts.map(code => {
                  const acc = allBSAccounts.find(a => a.code === code);
                  const name = acc ? code + " \u2013 " + acc.account : code;
                  const PAYROLL_CODES = ["2210", "2230"];
                  if (PAYROLL_CODES.includes(code)) {
                    const rd = bsReconciledData && bsReconciledData[code];
                    return code === "2210"
                      ? { account: name, xeroBalance: (rd && rd.resyncedXeroBalance) || "\u00a322,180.00", sourceBalance: "\u00a322,366.00", variance: (rd && rd.resyncedVariance) || "\u00a3186.00" }
                      : { account: name, xeroBalance: (rd && rd.resyncedXeroBalance) || "\u00a38,640.00", sourceBalance: "\u00a38,540.00", variance: (rd && rd.resyncedVariance) || "\u00a3100.00" };
                  }
                  let xeroBalance = "\u2013";
                  for (const section of BS_SECTIONS) {
                    for (const table of section.tables) {
                      const row = table.rows.find(r => r.code === code);
                      if (row) { xeroBalance = row.xeroBalance || row.amount || "\u2013"; break; }
                    }
                    if (xeroBalance !== "\u2013") break;
                  }
                  return { account: name, xeroBalance, sourceBalance: "\u2013", variance: "\u2013" };
                }) : null}
                infoBannerAccounts={isCustomPayroll ? pickedPayrollAccounts.filter(c => !["2210", "2230"].includes(c)).map(code => {
                  const acc = allBSAccounts.find(a => a.code === code);
                  return acc ? code + " \u2013 " + acc.account : code;
                }) : null}
                onResyncComplete={setPayrollResyncOverrides}
                initialResyncedData={Object.keys(payrollResyncOverrides).length > 0 ? payrollResyncOverrides : null}
                customSuggestions={isCustomPayroll ? (() => {
                  const PAYROLL_CODES_SET = new Set(["2210", "2230"]);
                  let allSuggestions = [...PAYROLL_SUGGESTIONS];
                  let nextId = 100;
                  pickedPayrollAccounts.forEach(code => {
                    if (PAYROLL_CODES_SET.has(code)) return;
                    const acc = allBSAccounts.find(a => a.code === code);
                    const acctName = acc ? acc.account : code;
                    const acctRecData = getAccountRecData(code, acctName);
                    if (acctRecData && acctRecData.suggestions) {
                      acctRecData.suggestions.forEach(s => {
                        allSuggestions.push({ ...s, id: nextId, accountCode: code });
                        nextId++;
                      });
                    }
                  });
                  return allSuggestions;
                })() : null}
              />
            )}
          </div>
        ) : <CanvasLoader />)}
      </div>

      {/* Drag handle \u2014 thin absolute strip between chat and canvas */}
      {(resultsVisible || dlaResultsVisible || faResultsVisible) && (
        <div
          onMouseDown={handleDragStart}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: chatWidth,
            width: 6,
            cursor: "col-resize",
            zIndex: 10,
            background: isDragging ? T.colorBorderDark : "transparent",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => { if (!isDragging) e.currentTarget.style.background = T.colorSurfaceActive; }}
          onMouseLeave={e => { if (!isDragging) e.currentTarget.style.background = "transparent"; }}
        />
      )}

      </div> {/* end content area */}

      {/* Drawer overlay — review suggestions before reconciling */}
      {(() => {
        const faDrawerTotal = faActive ? FA_ACCOUNTS.reduce((sum, a) => sum + (ACCOUNT_REC_DATA[a.code] ? ACCOUNT_REC_DATA[a.code].suggestions.length : 0), 0) : 0;
        const totalSuggestions = faActive ? faDrawerTotal : dlaActive ? (ACCOUNT_REC_DATA["2300"].suggestions.length + ACCOUNT_REC_DATA["2301"].suggestions.length) : effectiveDirectAccount && accountRecData ? accountRecData.suggestions.length : payrollTotalSuggestions;
        const unreviewed = totalSuggestions - resolvedCards.size - ignoredCards.size;
        const variance = accountRecData && accountRecData.reconciledResult ? accountRecData.reconciledResult.variance : "£0.00";
        const hasVariance = variance && variance !== "£0.00";
        return (
          <Sidebar
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            title="Review suggestions before reconciling"
            width={600}
            footer={
              <>
                <SecondaryButton onClick={() => setDrawerOpen(false)} style={{ flex: 1, height: 44, justifyContent: "center" }}>
                  Back to reconciliation
                </SecondaryButton>
                <DestructiveButton
                  onClick={() => { onMarkReconciled?.(drawerComment, effectiveDirectAccount, dlaActive || faActive, { resolvedCards: Array.from(resolvedCards), ignoredCards: Array.from(ignoredCards), customPayrollAccounts: isCustomPayroll ? pickedPayrollAccounts : null, isFA: faActive, resolvedLabels: resolvedLabels }); setMarkedReconciled(true); setDrawerOpen(false); }}
                  style={{ flex: 1, height: 44, justifyContent: "center" }}
                >
                  Mark as reconciled
                </DestructiveButton>
              </>
            }
          >
            <div style={{ padding: "20px 24px" }}>
              <p style={{ fontSize: 14, color: T.colorTextThird, lineHeight: "22px", margin: "0 0 24px" }}>
                This account has <strong style={{ color: T.colorTextPrimary }}>{unreviewed} unreviewed {unreviewed === 1 ? "suggestion" : "suggestions"}</strong>
                {hasVariance && <> and a balance discrepancy of <strong style={{ color: T.colorTextPrimary }}>{variance}</strong></>}
                . You can go back and review them, or mark the account as reconciled with a comment explaining why.
              </p>

              <label style={{ display: "block", fontSize: 12, color: T.colorTextSecondary, marginBottom: 4 }}>Comment</label>
              <textarea
                value={drawerComment}
                onChange={e => setDrawerComment(e.target.value)}
                placeholder="Explain why this account is being reconciled with unreviewed suggestions..."
                style={{
                  width: "100%", minHeight: 120, padding: "8px 10px",
                  border: `1px solid ${T.colorBorderDark}`, borderRadius: 6,
                  fontSize: 14, fontFamily: "'Inter', sans-serif", color: T.colorTextPrimary,
                  lineHeight: "22px", resize: "vertical", outline: "none",
                  boxSizing: "border-box", background: T.colorSurfacePrimary,
                }}
                onFocus={e => e.currentTarget.style.borderColor = T.colorBorderHover}
                onBlur={e => e.currentTarget.style.borderColor = T.colorBorderDark}
              />
            </div>
          </Sidebar>
        );
      })()}

    </div>
  );
}


// ── Balance Sheet Review page ─────────────────────────────────────────────
function BalanceSheetReviewPage({ rowComments, onAddComment, onRunBSReconciliation, onRunAccountReconciliation, bsReconciledData, activeTab, onTabChange, savedScrollTop, onSaveScroll, bsReviewState, onReviewStateChange, accountReviewStatuses, onToggleAccountReview, onMarkAllAccountsReviewed, onRestoreAccountReviewStatuses }) {
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareValue, setCompareValue] = useState("Last month");
  const compareOptions = ["Last month", "Last quarter", "Last year", "Same month last year"];
  const scrollRef = useRef(null);

  // ── Review balance sheet state machine ──
  // States: "preparing" → "reviewing" → "reviewed"
  // bsReviewState and onReviewStateChange come from props (lifted to app.jsx)

  const [reviewAnimated, setReviewAnimated] = useState(false);

  var handleMarkPrepared = function() {
    onReviewStateChange("reviewing");
  };
  // Drawer state for unreviewed accounts warning
  const [reviewDrawerOpen, setReviewDrawerOpen] = useState(false);
  const [reviewDrawerClosing, setReviewDrawerClosing] = useState(false);
  const [reviewDrawerAccordionOpen, setReviewDrawerAccordionOpen] = useState(false);

  // Snapshot of account review statuses before marking BS as reviewed
  const [accountReviewSnapshot, setAccountReviewSnapshot] = useState(null);

  // Export drawer state
  const [exportDrawerOpen, setExportDrawerOpen] = useState(false);

  // "Not reconciled" review warning modal state
  const [skipReviewWarning, setSkipReviewWarning] = useState(false);
  const [reviewWarningModal, setReviewWarningModal] = useState(null); // null | { code }
  const [reviewWarningDontShow, setReviewWarningDontShow] = useState(false);

  var handleToggleReviewWithCheck = function(code) {
    // If toggling OFF, just toggle
    var current = accountReviewStatuses && accountReviewStatuses[code];
    if (current && current.status === "Reviewed") {
      onToggleAccountReview(code);
      return;
    }
    // If toggling ON and account is reconciled, or user opted out of warning — just toggle
    var recData = bsReconciledData && bsReconciledData[code];
    var isReconciled = recData && recData.status === "reconciled";
    if (isReconciled || skipReviewWarning) {
      onToggleAccountReview(code);
      return;
    }
    // Otherwise show warning modal
    setReviewWarningDontShow(false);
    setReviewWarningModal({ code: code });
  };

  var handleWarningConfirm = function() {
    if (reviewWarningDontShow) setSkipReviewWarning(true);
    var code = reviewWarningModal.code;
    setReviewWarningModal(null);
    onToggleAccountReview(code);
  };

  var handleWarningCancel = function() {
    setReviewWarningModal(null);
  };

  var getUnreviewedAccounts = function() {
    return BS_ALL_ACCOUNTS.filter(function(a) {
      var rd = accountReviewStatuses && accountReviewStatuses[a.code];
      return !rd || rd.status !== "Reviewed";
    });
  };

  var closeReviewDrawer = function() {
    setReviewDrawerOpen(false);
    setReviewDrawerAccordionOpen(false);
  };

  var handleMarkReviewed = function() {
    var unreviewed = getUnreviewedAccounts();
    if (unreviewed.length === 0) {
      // All accounts reviewed — proceed directly
      setAccountReviewSnapshot(accountReviewStatuses ? { ...accountReviewStatuses } : {});
      onReviewStateChange("reviewed");

    } else {
      // Some accounts not reviewed — show drawer
      setReviewDrawerOpen(true);
      setReviewDrawerClosing(false);
      setReviewDrawerAccordionOpen(false);
    }
  };

  var handleDrawerMarkReviewed = function() {
    // Save snapshot so Reopen can restore, then mark BS as reviewed without changing individual accounts
    setAccountReviewSnapshot(accountReviewStatuses ? { ...accountReviewStatuses } : {});
    closeReviewDrawer();
    onReviewStateChange("reviewed");
  };
  var handleSendBack = function() {
    onReviewStateChange("preparing");
  };
  var handleReopen = function() {
    // Restore account review statuses to what they were before marking BS as reviewed
    if (accountReviewSnapshot) {
      onRestoreAccountReviewStatuses(accountReviewSnapshot);
      setAccountReviewSnapshot(null);
    }
    onReviewStateChange("reviewing");
  };

  // Restore scroll position on mount
  useEffect(() => {
    if (scrollRef.current && savedScrollTop) {
      scrollRef.current.scrollTop = savedScrollTop;
    }
  }, []);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <TopBar />
      <div ref={scrollRef} onScroll={e => onSaveScroll?.(e.currentTarget.scrollTop)} style={{ flex: 1, overflowY: "auto", padding: "32px 48px 48px", display: "flex", flexDirection: "column", gap: 0 }}>
        {/* Page title row with badge + actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h1 style={{ fontSize: 32, fontWeight: 500, color: T.colorTextPrimary, lineHeight: "40px", letterSpacing: "-1px" }}>{activeTab}</h1>
            {activeTab === "Balance sheet" && (
              <span key={bsReviewState} style={{
                display: "inline-flex", alignItems: "center", padding: "4px 10px",
                borderRadius: 6, fontSize: 13, fontWeight: 500,
                background: bsReviewState === "reviewed" ? T.colorSuccessBg : T.colorBrandLighter,
                color: bsReviewState === "reviewed" ? T.colorSuccess : T.colorBrandPrimary,
                animation: reviewAnimated ? "reviewBtnIn 0.3s ease both" : "none",
              }}>
                {bsReviewState === "preparing" ? "Preparing" : bsReviewState === "reviewing" ? "Reviewing" : "Reviewed"}
              </span>
            )}
          </div>
          {activeTab === "Balance sheet" && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <style>{`
                @keyframes reviewBtnIn {
                  from { opacity: 0; transform: translateY(-6px); }
                  to   { opacity: 1; transform: translateY(0); }
                }
              `}</style>
              {/* Dynamic primary CTA */}
              {bsReviewState === "preparing" && (
                <PrimaryButton key="mark-prepared" onClick={handleMarkPrepared} style={{ height: 40, boxSizing: "border-box", padding: "0 16px", animation: reviewAnimated ? "reviewBtnIn 0.3s ease both" : "none" }}>Mark as prepared</PrimaryButton>
              )}
              {bsReviewState === "reviewing" && (
                <PrimaryButton key="mark-reviewed" onClick={handleMarkReviewed} style={{ height: 40, boxSizing: "border-box", padding: "0 16px", animation: reviewAnimated ? "reviewBtnIn 0.3s ease both" : "none" }}>Mark as reviewed</PrimaryButton>
              )}
              {/* Secondary state buttons */}
              {bsReviewState === "reviewing" && (
                <SecondaryButton key="send-back" onClick={handleSendBack} style={{ height: 40, boxSizing: "border-box", padding: "0 16px", animation: reviewAnimated ? "reviewBtnIn 0.3s ease 0.1s both" : "none" }}>Send back to preparer</SecondaryButton>
              )}
              {bsReviewState === "reviewed" && (
                <SecondaryButton key="reopen" onClick={handleReopen} style={{ height: 40, boxSizing: "border-box", padding: "0 16px", animation: reviewAnimated ? "reviewBtnIn 0.3s ease both" : "none" }}>Reopen</SecondaryButton>
              )}
              {/* Run reconciliation — secondary */}
              <SecondaryButton onClick={onRunBSReconciliation} style={{ height: 40, boxSizing: "border-box", padding: "0 16px", display: "inline-flex", alignItems: "center", gap: 6 }}>
                <PlayCircleIcon color={T.colorTextPrimary} />
                Run reconciliation
              </SecondaryButton>
              {/* Export — secondary button */}
              <SecondaryButton onClick={() => setExportDrawerOpen(true)} style={{ height: 40, boxSizing: "border-box", padding: "0 16px", display: "inline-flex", alignItems: "center", gap: 6 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10M4.66667 6.66667L8 10M8 10L11.3333 6.66667M8 10V2" stroke="#545453" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Export
              </SecondaryButton>
            </div>
          )}
        </div>

        {/* Reconciliation section — only on Balance sheet tab */}
        {activeTab === "Balance sheet" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 48 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontSize: 22, fontWeight: 500, color: T.colorTextPrimary, letterSpacing: "-0.5px", margin: 0 }}>Reconciliation presets</h2>
            </div>
            <div style={{ background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, overflow: "hidden", display: "none" }}>
              {/* Title bar — HIDDEN: presets table kept for potential restore */}
              <div style={{ padding: "16px 16px 14px", borderBottom: `1px solid ${T.colorBorderDark}` }}><span style={{ fontSize: 18, fontWeight: 500, color: T.colorTextPrimary }}>Presets</span></div>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "40px 1.5fr 2fr 220px 40px", borderBottom: `1px solid ${T.colorBorderDark}` }}>
                <div style={{ borderRight: `1px solid ${T.colorBorderDark}`, padding: "10px 0" }} />
                <div style={{ padding: "10px 16px", fontSize: 14, fontWeight: 500, color: T.colorTextSecondary, borderRight: `1px solid ${T.colorBorderDark}`, display: "flex", alignItems: "center" }}>Preset</div>
                <div style={{ padding: "10px 16px", fontSize: 14, fontWeight: 500, color: T.colorTextSecondary, borderRight: `1px solid ${T.colorBorderDark}`, display: "flex", alignItems: "center" }}>Accounts</div>
                <div style={{ padding: "10px 16px", fontSize: 14, fontWeight: 500, color: T.colorTextSecondary, borderRight: `1px solid ${T.colorBorderDark}`, display: "flex", alignItems: "center" }}>Reconciliation</div>
                <div style={{ padding: "10px 0" }} />
              </div>
              {/* Rows */}
              {[
                { code: "__payroll__", preset: "Payroll", accounts: "2210 – PAYE and NI, 2230 – Pension contributions" },
                { code: "__dla__", preset: "Directors' loan accounts", accounts: "2300 – Directors' loan — J Smith, 2301 – Directors' loan — A Jones" },
                { code: "__fixed_assets__", preset: "Fixed assets", accounts: "0010 – Freehold property, 0011 – Leasehold improvements, 0020 – Plant and machinery, 0030 – Fixtures and fittings, 0031 – Office equipment, 0032 – Computer equipment, 0040 – Motor vehicles" },
              ].map((row, ri, arr) => (
                <div key={row.code} style={{ display: "grid", gridTemplateColumns: "40px 1.5fr 2fr 220px 40px", borderBottom: ri < arr.length - 1 ? `1px solid ${T.colorBorderDark}` : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderRight: `1px solid ${T.colorBorderDark}` }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <div style={{ padding: "14px 16px", fontSize: 14, fontWeight: 400, color: T.colorTextPrimary, borderRight: `1px solid ${T.colorBorderDark}`, display: "flex", alignItems: "center", minHeight: 0, overflow: "hidden" }}>
                    <span style={{ overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{row.preset}</span>
                  </div>
                  <div style={{ padding: "14px 16px", fontSize: 14, color: T.colorTextPrimary, borderRight: `1px solid ${T.colorBorderDark}`, display: "flex", alignItems: "center", minHeight: 0, overflow: "hidden" }}>
                    <span style={{ overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{row.accounts}</span>
                  </div>
                  <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", borderRight: `1px solid ${T.colorBorderDark}` }}>
                    <ReconciliationCell code={row.code} account={row.preset} bsReconciledData={bsReconciledData} onRunReconciliation={onRunAccountReconciliation} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M14 7.66669C14.0023 8.5466 13.7967 9.41461 13.4 10.2C12.9296 11.1412 12.2065 11.9328 11.3116 12.4862C10.4168 13.0396 9.3855 13.3329 8.33337 13.3334C7.45346 13.3356 6.58545 13.1301 5.80004 12.7334L2 14L3.26667 10.2C2.86995 9.41461 2.66441 8.5466 2.66671 7.66669C2.66714 6.61456 2.96041 5.58325 3.51385 4.6884C4.06729 3.79355 4.85893 3.07041 5.80004 2.60002C6.58545 2.2033 7.45346 1.99776 8.33337 2.00002H8.66671C10.0562 2.07668 11.3687 2.66319 12.3528 3.64726C13.3368 4.63132 13.9234 5.94388 14 7.33335V7.66669Z" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Reconciliation accordions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 0 }}>
              {RECON_ACCORDIONS.map(function(item) {
                return React.createElement(ReconAccordionItem, { key: item.code, item: item, bsReconciledData: bsReconciledData, onRunAccountReconciliation: onRunAccountReconciliation, rowComments: rowComments, onAddComment: onAddComment, accountReviewStatuses: accountReviewStatuses, onToggleAccountReview: handleToggleReviewWithCheck });
              })}
            </div>

          </div>
        )}

        {/* Divider before BS sections */}
        {activeTab === "Balance sheet" && <div style={{ width: "100%", height: 0, borderTop: `1px solid ${T.colorBorderDark}`, marginTop: 40, marginBottom: 40 }} />}

        {BS_SECTIONS.map((section, si) => (
            <div key={si} style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: si === 0 ? 0 : 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 500, color: T.colorTextPrimary, letterSpacing: "-0.5px", margin: 0 }}>{section.heading}</h2>
              {section.tables.map((table, ti) => (
                <DataTable
                  key={ti}
                  title={table.title}
                  columns={BS_COLUMNS.map(col => col.key === "reconciliation" ? { ...col, render: (v, row) => React.createElement(ReconciliationCell, { code: row.code, account: row.account, bsReconciledData: bsReconciledData, onRunReconciliation: onRunAccountReconciliation }) } : col.key === "review" ? { ...col, render: (v, row) => {
                    var rs = accountReviewStatuses && accountReviewStatuses[row.code];
                    var label = (rs && rs.status) || "Not reviewed";
                    return React.createElement("span", { style: {
                      display: "inline-flex", alignItems: "center",
                      padding: "2px 8px", borderRadius: 4,
                      fontSize: 12, fontWeight: 600, lineHeight: "17px",
                      background: label === "Reviewed" ? T.colorSuccessBg : label === "Flagged" ? T.colorErrorBg : T.colorSurfaceSecondary,
                      border: label === "Reviewed" ? `1px solid ${T.colorSuccessBorder}` : label === "Flagged" ? `1px solid ${T.colorErrorBorder}` : `1px solid ${T.colorBorderLight}`,
                      color: label === "Reviewed" ? T.colorSuccess : label === "Flagged" ? T.colorError : T.colorTextThird,
                      whiteSpace: "nowrap",
                    }}, label);
                  }} : col)}
                  rows={table.rows.map(row => {
                    const rd = bsReconciledData && bsReconciledData[row.code];
                    if (!rd) return row;
                    return { ...row, reconciled: true, xeroBalance: rd.resyncedXeroBalance || row.xeroBalance, sourceBalance: rd.sourceBalance, variance: rd.resyncedVariance || rd.variance, suggestions: rd.accountSuggestions ? rd.accountSuggestions.length : (rd.suggestionCount != null ? rd.suggestionCount : rd.suggestions), accountSuggestions: rd.accountSuggestions || null, status: (STATUS_CONFIG[rd.status] && STATUS_CONFIG[rd.status].label) || "Reconciled" };
                  })}
                  footerLabel={table.footer}
                  showExpandColumn={true}
                  showCommentColumn={true}
                  rowComments={rowComments}
                  renderExpanded={(row) => (
                    <ExpandedRowContent row={row} comments={rowComments[row.code] || []} onAddComment={onAddComment} reviewData={accountReviewStatuses && accountReviewStatuses[row.code]} onToggleReview={handleToggleReviewWithCheck} />
                  )}
                />
              ))}
            </div>
          ))}
      </div>


      {/* Review warning modal — DS Modal component */}
      <Modal
        open={!!reviewWarningModal}
        onClose={handleWarningCancel}
        width={440}
        title="This account hasn't been reconciled yet"
        text="Consider verifying the balance before marking it as reviewed."
        footer={<>
          <SecondaryButton onClick={handleWarningCancel} style={{ padding: "8px 16px" }}>Cancel</SecondaryButton>
          <DestructiveButton onClick={handleWarningConfirm} style={{ padding: "8px 16px" }}>Mark as reviewed</DestructiveButton>
        </>}
      >
        <label
          onClick={() => setReviewWarningDontShow(!reviewWarningDontShow)}
          style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", userSelect: "none" }}
        >
          <div style={{
            width: 16, height: 16, borderRadius: 4, flexShrink: 0,
            border: reviewWarningDontShow ? "none" : `1.5px solid ${T.colorBorderHover}`,
            background: reviewWarningDontShow ? T.colorBrandPrimary : T.colorSurfacePrimary,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s ease",
          }}>
            {reviewWarningDontShow && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <span style={{ fontSize: 13, color: T.colorTextThird }}>Don't show this again</span>
        </label>
      </Modal>

      {/* Review drawer — slides in from right when some accounts are unreviewed */}
      {(() => {
        var unreviewedAccounts = getUnreviewedAccounts();
        return (
          <Sidebar
            open={reviewDrawerOpen}
            onClose={closeReviewDrawer}
            title="Some accounts haven't been reviewed"
            width={600}
            footer={
              <>
                <SecondaryButton onClick={closeReviewDrawer} style={{ flex: 1, height: 44, justifyContent: "center" }}>
                  Back to review
                </SecondaryButton>
                <DestructiveButton onClick={handleDrawerMarkReviewed} style={{ flex: 1, height: 44, justifyContent: "center" }}>
                  Mark balance sheet as reviewed
                </DestructiveButton>
              </>
            }
          >
            <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ fontSize: 14, lineHeight: "22px", color: T.colorTextThird, margin: 0 }}>
                The following accounts haven't been marked as reviewed. Check you haven't missed anything before marking the balance sheet as reviewed.
              </p>

              {/* Accordion: Not reviewed accounts */}
              <div style={{ border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, overflow: "hidden" }}>
                <div
                  onClick={() => setReviewDrawerAccordionOpen(!reviewDrawerAccordionOpen)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "0 16px", height: 40, cursor: "pointer",
                    background: T.colorSurfacePrimary,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = T.colorSurfaceSecondary}
                  onMouseLeave={e => e.currentTarget.style.background = T.colorSurfacePrimary}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: T.colorTextPrimary }}>Not reviewed</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: T.colorTextSecondary }}>{unreviewedAccounts.length}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{
                      transition: "transform 0.15s ease",
                      transform: reviewDrawerAccordionOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}>
                      <path d="M4 6L8 10L12 6" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                {reviewDrawerAccordionOpen && (
                  <div style={{ borderTop: `1px solid ${T.colorBorderLight}` }}>
                    {unreviewedAccounts.map(function(a, i) {
                      return (
                        <div key={a.code} style={{
                          padding: "10px 16px",
                          borderBottom: i < unreviewedAccounts.length - 1 ? `1px solid ${T.colorBorderLight}` : "none",
                          fontSize: 14, color: T.colorTextPrimary,
                        }}>
                          {a.code} &ndash; {a.account}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </Sidebar>
        );
      })()}

      {/* Export drawer */}
      <Sidebar
        open={exportDrawerOpen}
        onClose={() => setExportDrawerOpen(false)}
        title="Export"
        width={480}
      >
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontSize: 14, color: T.colorTextThird, margin: 0, lineHeight: "22px" }}>
            Download the balance sheet in your preferred format.
          </p>

          {[
            { format: "PDF", desc: "Formatted report suitable for sharing with clients or filing.", icon: "pdf" },
            { format: "Excel (.xlsx)", desc: "Editable spreadsheet with all accounts, balances, and variances.", icon: "xlsx" },
            { format: "CSV", desc: "Raw data export for use in other tools or systems.", icon: "csv" },
          ].map(function(item) {
            return (
              <div
                key={item.format}
                style={{
                  display: "flex", alignItems: "center", gap: 16,
                  padding: "16px 20px", borderRadius: 8,
                  border: `1px solid ${T.colorBorderDark}`, background: T.colorSurfacePrimary,
                  cursor: "pointer", transition: "all 0.15s ease",
                }}
                onMouseEnter={function(e) { e.currentTarget.style.borderColor = T.colorBorderHover; e.currentTarget.style.background = T.colorSurfaceSecondary; }}
                onMouseLeave={function(e) { e.currentTarget.style.borderColor = T.colorBorderDark; e.currentTarget.style.background = T.colorSurfacePrimary; }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 8,
                  background: item.icon === "pdf" ? T.colorErrorBg : item.icon === "xlsx" ? T.colorSuccessBg : T.colorInfoBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                    <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10M4.66667 6.66667L8 10M8 10L11.3333 6.66667M8 10V2"
                      stroke={item.icon === "pdf" ? T.colorError : item.icon === "xlsx" ? T.colorSuccess : T.colorInfoAlt}
                      strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}>{item.format}</div>
                  <div style={{ fontSize: 13, color: T.colorTextSecondary, marginTop: 2, lineHeight: "18px" }}>{item.desc}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M6 12L10 8L6 4" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            );
          })}
        </div>
      </Sidebar>

    </div>
  );
}



// ── BalanceSheetPage wrapper (wires store props + manages reconciliation state) ──
function BalanceSheetPage({ ctx }) {
  const bsReconciledData = ctx.store.bsReconciledData;
  const rowComments = ctx.store.rowComments;
  const bsReviewState = ctx.store.bsReviewState;
  const accountReviewStatuses = ctx.store.accountReviewStatuses;
  const dispatch = ctx.dispatch;

  // Page-local UI state
  const [bsReconciling, setBsReconciling] = useState(null); // null | true | "payroll" | "dla" | "fixed_assets" | { code, account }
  const [bsActiveTab, setBsActiveTab] = useState("Balance sheet");
  const [bsScrollTop, setBsScrollTop] = useState(0);

  // Notify shell when reconciliation flow is active (to hide nav)
  useEffect(() => {
    if (ctx.setFullScreen) ctx.setFullScreen(!!bsReconciling);
  }, [bsReconciling]);

  const handleAddComment = (accountCode, text) => {
    dispatch({ type: "ADD_COMMENT", accountCode, text });
  };

  const handleRunBSReconciliation = (info) => {
    if (info && info.presetType) {
      // Map preset types to the reconciling sentinel values used in the original
      if (info.presetType === "Payroll") { setBsReconciling("payroll"); return; }
      if (info.presetType === "Directors' loan account") { setBsReconciling("dla"); return; }
      if (info.presetType === "Fixed assets") { setBsReconciling("fixed_assets"); return; }
    }
    setBsReconciling(true);
  };

  const handleRunAccountReconciliation = (acct) => {
    // Group preset codes → open BS reconciliation flow pre-selected to that type
    if (acct && acct.code === "__payroll__") { setBsReconciling("payroll"); return; }
    if (acct && acct.code === "__dla__") { setBsReconciling("dla"); return; }
    if (acct && acct.code === "__fixed_assets__") { setBsReconciling("fixed_assets"); return; }
    // Bank accounts: check if this is a bank account code and skip (handled by bank rec page)
    if (acct && BANK_ACCOUNT_CODES_SET.has(acct.code)) return;
    setBsReconciling(acct); // { code, account }
  };

  // Save reconciliation state to bsReconciledData without closing the flow
  // (Copied from original app.jsx saveBSState — adapted for dispatch pattern)
  const saveBSState = (partialState, accountFromChild) => {
    const currentReconciling = (typeof bsReconciling !== "object" && accountFromChild) ? accountFromChild : bsReconciling;
    if (partialState && partialState.isDLA) {
      const d2300 = ACCOUNT_REC_DATA["2300"];
      const d2301 = ACCOUNT_REC_DATA["2301"];
      const resolvedSet = new Set(partialState.resolvedCards || []);
      const ignoredSet = new Set(partialState.ignoredCards || []);
      const dateStr = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }).replace(/ /g, " ");
      dispatch({
        type: "SET_BS_RECONCILED_DATA",
        updater: function(prev) {
          const next = { ...prev };
          const offset2301 = d2300.suggestions.length;
          DLA_ACCOUNTS.forEach(acc => {
            const data = ACCOUNT_REC_DATA[acc.code];
            const result = data.reconciledResult || {};
            const isSecond = acc.code === "2301";
            const acctWithStatus = data.suggestions.map((s, i) => {
              const mergedId = isSecond ? i + offset2301 : i;
              return { ...s, resolvedStatus: resolvedSet.has(mergedId) ? "resolved" : ignoredSet.has(mergedId) ? "ignored" : "open" };
            });
            const acctRemaining = acctWithStatus.filter(s => s.resolvedStatus === "open").length;
            var prevStatus = prev[acc.code] && prev[acc.code].status;
            var dlaResyncOverride = (partialState.dlaResyncOverrides || {})[acc.code];
            next[acc.code] = {
              code: acc.code, date: dateStr,
              status: prevStatus === "reconciled" ? "reconciled" : (acctRemaining > 0 ? "suggestions" : "reviewing"),
              suggestionCount: acctRemaining,
              sourceBalance: result.sourceBalance || "\u2013", variance: result.variance || "\u2013",
              resolvedCards: partialState.resolvedCards || [], ignoredCards: partialState.ignoredCards || [],
              accountSuggestions: acctWithStatus,
              noDocument: partialState.noDocument || false,
              resyncedClosing: dlaResyncOverride ? dlaResyncOverride.closing : (prev[acc.code] && prev[acc.code].resyncedClosing),
              resyncedMovement: dlaResyncOverride ? dlaResyncOverride.movement : (prev[acc.code] && prev[acc.code].resyncedMovement),
              resolvedLabels: partialState.resolvedLabels || (prev[acc.code] && prev[acc.code].resolvedLabels) || {},
            };
          });
          return next;
        },
      });
    } else if (partialState && partialState.isFA) {
      const faCodes = PRESET_MEMBER_CODES["__fixed_assets__"];
      const resolvedSet = new Set(partialState.resolvedCards || []);
      const ignoredSet = new Set(partialState.ignoredCards || []);
      const dateStr = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }).replace(/ /g, " ");
      dispatch({
        type: "SET_BS_RECONCILED_DATA",
        updater: function(prev) {
          const next = { ...prev };
          let offset = 0;
          faCodes.forEach(code => {
            const data = ACCOUNT_REC_DATA[code];
            if (!data) return;
            const result = data.reconciledResult || {};
            const acctWithStatus = data.suggestions.map((s, i) => {
              const mergedId = offset + i;
              return { ...s, resolvedStatus: resolvedSet.has(mergedId) ? "resolved" : ignoredSet.has(mergedId) ? "ignored" : "open" };
            });
            const acctRemaining = acctWithStatus.filter(s => s.resolvedStatus === "open").length;
            var prevStatus = prev[code] && prev[code].status;
            var faResyncOverride = (partialState.faResyncOverrides || {})[code];
            next[code] = {
              code, date: dateStr,
              status: prevStatus === "reconciled" ? "reconciled" : (acctRemaining > 0 ? "suggestions" : "reviewing"),
              suggestionCount: acctRemaining,
              sourceBalance: result.sourceBalance || "\u2013", variance: result.variance || "\u2013",
              resolvedCards: partialState.resolvedCards || [], ignoredCards: partialState.ignoredCards || [],
              accountSuggestions: acctWithStatus,
              noDocument: partialState.noDocument || false,
              resyncedXeroBalance: faResyncOverride ? faResyncOverride.xeroBalance : (prev[code] && prev[code].resyncedXeroBalance),
              resyncedVariance: faResyncOverride ? faResyncOverride.variance : (prev[code] && prev[code].resyncedVariance),
              resolvedLabels: partialState.resolvedLabels || (prev[code] && prev[code].resolvedLabels) || {},
            };
            offset += data.suggestions.length;
          });
          return next;
        },
      });
    } else if (partialState && typeof currentReconciling === "object" && currentReconciling) {
      const data = getAccountRecData(currentReconciling.code, currentReconciling.account);
      const result = data.reconciledResult || {};
      const resolvedSet = new Set(partialState.resolvedCards || []);
      const ignoredSet = new Set(partialState.ignoredCards || []);
      dispatch({
        type: "SET_BS_RECONCILED_DATA",
        updater: function(prev) {
          var prevData = prev[currentReconciling.code];
          var prevStatus = prevData && prevData.status;
          var isFromCustomPayroll = prevData && prevData.fromCustomPayroll;
          var baseSuggestions = isFromCustomPayroll && prevData.accountSuggestions
            ? prevData.accountSuggestions : data.suggestions;
          var acctWithStatus = baseSuggestions.map(function(s) {
            return Object.assign({}, s, {
              resolvedStatus: resolvedSet.has(s.id) ? "resolved" : ignoredSet.has(s.id) ? "ignored" : "open",
            });
          });
          var remaining = acctWithStatus.filter(function(s) { return s.resolvedStatus === "open"; }).length;
          var acctResyncOverride = (partialState.accountResyncOverrides || {})[currentReconciling.code];
          return {
            ...prev,
            [currentReconciling.code]: {
              code: currentReconciling.code,
              date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }).replace(/ /g, " "),
              status: prevStatus === "reconciled" ? "reconciled" : (remaining > 0 ? "suggestions" : "reviewing"),
              suggestionCount: remaining,
              sourceBalance: (isFromCustomPayroll || partialState.noDocument) ? "\u2013" : (result.sourceBalance || "\u2014"),
              variance: (isFromCustomPayroll || partialState.noDocument) ? "\u2013" : (result.variance || "\u00a30.00"),
              resolvedCards: partialState.resolvedCards || [], ignoredCards: partialState.ignoredCards || [],
              accountSuggestions: acctWithStatus,
              noDocument: isFromCustomPayroll ? true : (partialState.noDocument || false),
              fromCustomPayroll: isFromCustomPayroll || false,
              resyncedXeroBalance: acctResyncOverride ? acctResyncOverride.xeroBalance : (prevData && prevData.resyncedXeroBalance),
              resyncedVariance: acctResyncOverride ? acctResyncOverride.variance : (prevData && prevData.resyncedVariance),
              resolvedLabels: partialState.resolvedLabels || (prevData && prevData.resolvedLabels) || {},
            },
          };
        },
      });
    } else if (partialState && (currentReconciling === true || currentReconciling === "payroll")) {
      const resolvedSet = new Set(partialState.resolvedCards || []);
      const ignoredSet = new Set(partialState.ignoredCards || []);
      const payrollCodes = partialState.customPayrollAccounts || ["2210", "2230"];
      const STANDARD_PAYROLL = new Set(["2210", "2230"]);
      dispatch({
        type: "SET_BS_RECONCILED_DATA",
        updater: function(prev) {
          const next = { ...prev };
          if (partialState.customPayrollAccounts) {
            next["__payroll_custom_accounts__"] = partialState.customPayrollAccounts;
          }
          payrollCodes.forEach(code => {
            if (STANDARD_PAYROLL.has(code)) {
              const acctSuggestions = PAYROLL_SUGGESTIONS.filter(s => s.accountCode === code);
              const acctWithStatus = acctSuggestions.map(s => ({
                ...s, resolvedStatus: resolvedSet.has(s.id) ? "resolved" : ignoredSet.has(s.id) ? "ignored" : "open",
              }));
              const acctRemaining = acctWithStatus.filter(s => s.resolvedStatus === "open").length;
              var prevStatus = prev[code] && prev[code].status;
              var resyncOverride = (partialState.payrollResyncOverrides || {})[code];
              next[code] = {
                code,
                date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }).replace(/ /g, " "),
                status: prevStatus === "reconciled" ? "reconciled" : (acctRemaining > 0 ? "suggestions" : "reviewing"),
                suggestionCount: acctRemaining,
                sourceBalance: partialState.noDocument ? "\u2013" : (code === "2210" ? "\u00a322,366.00" : "\u00a38,540.00"),
                variance: partialState.noDocument ? "\u2013" : (code === "2210" ? "\u00a3186.00" : "\u00a3100.00"),
                resolvedCards: partialState.resolvedCards || [], ignoredCards: partialState.ignoredCards || [],
                accountSuggestions: acctWithStatus,
                noDocument: partialState.noDocument || false,
                resyncedXeroBalance: resyncOverride ? resyncOverride.xeroBalance : undefined,
                resyncedVariance: resyncOverride ? resyncOverride.variance : undefined,
                resolvedLabels: partialState.resolvedLabels || (prev[code] && prev[code].resolvedLabels) || {},
              };
            } else {
              var accountName = code;
              for (var si = 0; si < BS_SECTIONS.length; si++) {
                for (var ti = 0; ti < BS_SECTIONS[si].tables.length; ti++) {
                  var found = BS_SECTIONS[si].tables[ti].rows.find(function(r) { return r.code === code; });
                  if (found) { accountName = found.account; break; }
                }
                if (accountName !== code) break;
              }
              var acctRecData = getAccountRecData(code, accountName);
              var acctSuggestions2 = acctRecData.suggestions || [];
              var idOffset = 100;
              var acctWithStatus2 = acctSuggestions2.map(function(s, idx) {
                var mappedId = idOffset + idx;
                return Object.assign({}, s, { id: mappedId, accountCode: code, resolvedStatus: resolvedSet.has(mappedId) ? "resolved" : ignoredSet.has(mappedId) ? "ignored" : "open" });
              });
              idOffset += acctSuggestions2.length;
              var acctRemaining2 = acctWithStatus2.filter(function(s) { return s.resolvedStatus === "open"; }).length;
              var prevStatus2 = prev[code] && prev[code].status;
              next[code] = {
                code,
                date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }).replace(/ /g, " "),
                status: prevStatus2 === "reconciled" ? "reconciled" : "reviewing",
                suggestionCount: acctRemaining2,
                sourceBalance: "\u2013", variance: "\u2013",
                resolvedCards: partialState.resolvedCards || [], ignoredCards: partialState.ignoredCards || [],
                accountSuggestions: acctWithStatus2,
                noDocument: true, fromCustomPayroll: true,
                resolvedLabels: partialState.resolvedLabels || (prev[code] && prev[code].resolvedLabels) || {},
              };
            }
          });
          return next;
        },
      });
    }
  };

  // Mark reconciled + close flow (from original app.jsx handleMarkBSReconciled)
  const handleMarkBSReconciled = (comment, accountFromChild, isDLA, cardState) => {
    const currentReconciling = (typeof bsReconciling !== "object" && accountFromChild) ? accountFromChild : bsReconciling;
    const resolvedSet = new Set(cardState ? cardState.resolvedCards : []);
    const ignoredSet = new Set(cardState ? cardState.ignoredCards : []);
    dispatch({
      type: "SET_BS_RECONCILED_DATA",
      updater: function(prev) {
        const next = { ...prev };
        if (cardState && cardState.isFA) {
          const faCodes = PRESET_MEMBER_CODES["__fixed_assets__"];
          const dateStr = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }).replace(/ /g, " ");
          let offset = 0;
          faCodes.forEach(code => {
            const data = ACCOUNT_REC_DATA[code];
            if (!data) return;
            const result = data.reconciledResult || {};
            next[code] = {
              code, date: dateStr, status: "reconciled",
              suggestionCount: data.suggestions.length,
              sourceBalance: result.sourceBalance || "\u2013", variance: result.variance || "\u2013",
              resolvedCards: cardState ? cardState.resolvedCards : [], ignoredCards: cardState ? cardState.ignoredCards : [],
              accountSuggestions: data.suggestions.map((s, i) => {
                const mergedId = offset + i;
                return { ...s, resolvedStatus: resolvedSet.has(mergedId) ? "resolved" : ignoredSet.has(mergedId) ? "ignored" : "open" };
              }),
              noDocument: (prev[code] && prev[code].noDocument) || false,
              resyncedXeroBalance: prev[code] && prev[code].resyncedXeroBalance,
              resyncedVariance: prev[code] && prev[code].resyncedVariance,
              resolvedLabels: (cardState && cardState.resolvedLabels) || (prev[code] && prev[code].resolvedLabels) || {},
            };
            offset += data.suggestions.length;
          });
        } else if (isDLA) {
          const d2300 = ACCOUNT_REC_DATA["2300"];
          const d2301 = ACCOUNT_REC_DATA["2301"];
          const dateStr = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }).replace(/ /g, " ");
          const offset2301 = d2300.suggestions.length;
          DLA_ACCOUNTS.forEach(acc => {
            const data = ACCOUNT_REC_DATA[acc.code];
            const result = data.reconciledResult || {};
            const isSecond = acc.code === "2301";
            next[acc.code] = {
              code: acc.code, date: dateStr, status: "reconciled",
              suggestionCount: data.suggestions.length,
              sourceBalance: result.sourceBalance || "\u2013", variance: result.variance || "\u2013",
              resolvedCards: cardState ? cardState.resolvedCards : [], ignoredCards: cardState ? cardState.ignoredCards : [],
              accountSuggestions: data.suggestions.map((s, i) => {
                const mergedId = isSecond ? i + offset2301 : i;
                return { ...s, resolvedStatus: resolvedSet.has(mergedId) ? "resolved" : ignoredSet.has(mergedId) ? "ignored" : "open" };
              }),
              noDocument: (prev[acc.code] && prev[acc.code].noDocument) || false,
              resyncedClosing: prev[acc.code] && prev[acc.code].resyncedClosing,
              resyncedMovement: prev[acc.code] && prev[acc.code].resyncedMovement,
              resolvedLabels: (cardState && cardState.resolvedLabels) || (prev[acc.code] && prev[acc.code].resolvedLabels) || {},
            };
          });
        } else if (typeof currentReconciling === "object" && currentReconciling) {
          const data = getAccountRecData(currentReconciling.code, currentReconciling.account);
          const result = data.reconciledResult || {};
          var prevDataMR = prev[currentReconciling.code];
          var isFromCustomPayrollMR = prevDataMR && prevDataMR.fromCustomPayroll;
          var baseSuggestionsMR = isFromCustomPayrollMR && prevDataMR.accountSuggestions
            ? prevDataMR.accountSuggestions : data.suggestions;
          next[currentReconciling.code] = {
            code: currentReconciling.code,
            date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }).replace(/ /g, " "),
            status: "reconciled",
            suggestionCount: baseSuggestionsMR.length,
            sourceBalance: (isFromCustomPayrollMR || (prevDataMR && prevDataMR.noDocument)) ? "\u2013" : (result.sourceBalance || "\u2014"),
            variance: (isFromCustomPayrollMR || (prevDataMR && prevDataMR.noDocument)) ? "\u2013" : (result.variance || "\u00a30.00"),
            resolvedCards: cardState ? cardState.resolvedCards : [], ignoredCards: cardState ? cardState.ignoredCards : [],
            accountSuggestions: baseSuggestionsMR.map(function(s) {
              return Object.assign({}, s, { resolvedStatus: resolvedSet.has(s.id) ? "resolved" : ignoredSet.has(s.id) ? "ignored" : "open" });
            }),
            noDocument: isFromCustomPayrollMR ? true : ((prevDataMR && prevDataMR.noDocument) || false),
            fromCustomPayroll: isFromCustomPayrollMR || false,
            resyncedXeroBalance: prevDataMR && prevDataMR.resyncedXeroBalance,
            resyncedVariance: prevDataMR && prevDataMR.resyncedVariance,
            resolvedLabels: (cardState && cardState.resolvedLabels) || (prevDataMR && prevDataMR.resolvedLabels) || {},
          };
        } else {
          // Payroll mark reconciled
          const dateStr = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }).replace(/ /g, " ");
          const payrollCodes = cardState && cardState.customPayrollAccounts ? cardState.customPayrollAccounts : ["2210", "2230"];
          const STANDARD_PAYROLL = new Set(["2210", "2230"]);
          if (cardState && cardState.customPayrollAccounts) {
            next["__payroll_custom_accounts__"] = cardState.customPayrollAccounts;
          }
          payrollCodes.forEach(code => {
            if (STANDARD_PAYROLL.has(code)) {
              const acctSuggestions = PAYROLL_SUGGESTIONS.filter(s => s.accountCode === code);
              var isNoDocPayroll = (prev[code] && prev[code].noDocument) || false;
              var prevResyncXero = prev[code] && prev[code].resyncedXeroBalance;
              var prevResyncVar = prev[code] && prev[code].resyncedVariance;
              next[code] = {
                code, date: dateStr, status: "reconciled",
                suggestionCount: acctSuggestions.length,
                sourceBalance: isNoDocPayroll ? "\u2013" : (code === "2210" ? "\u00a322,366.00" : "\u00a38,540.00"),
                variance: isNoDocPayroll ? "\u2013" : (code === "2210" ? "\u00a3186.00" : "\u00a3100.00"),
                resolvedCards: cardState ? cardState.resolvedCards : [], ignoredCards: cardState ? cardState.ignoredCards : [],
                accountSuggestions: acctSuggestions.map(s => ({
                  ...s, resolvedStatus: resolvedSet.has(s.id) ? "resolved" : ignoredSet.has(s.id) ? "ignored" : "open",
                })),
                noDocument: isNoDocPayroll,
                resyncedXeroBalance: prevResyncXero, resyncedVariance: prevResyncVar,
                resolvedLabels: (cardState && cardState.resolvedLabels) || (prev[code] && prev[code].resolvedLabels) || {},
              };
            } else {
              var accountName2 = code;
              for (var si2 = 0; si2 < BS_SECTIONS.length; si2++) {
                for (var ti2 = 0; ti2 < BS_SECTIONS[si2].tables.length; ti2++) {
                  var found2 = BS_SECTIONS[si2].tables[ti2].rows.find(function(r) { return r.code === code; });
                  if (found2) { accountName2 = found2.account; break; }
                }
                if (accountName2 !== code) break;
              }
              var acctRecData2 = getAccountRecData(code, accountName2);
              var acctSuggestions3 = acctRecData2.suggestions || [];
              var idOffset2 = 100;
              var acctMapped = acctSuggestions3.map(function(s, idx) {
                var mappedId = idOffset2 + idx;
                return Object.assign({}, s, { id: mappedId, accountCode: code, resolvedStatus: resolvedSet.has(mappedId) ? "resolved" : ignoredSet.has(mappedId) ? "ignored" : "open" });
              });
              next[code] = {
                code, date: dateStr, status: "reconciled",
                suggestionCount: acctSuggestions3.length,
                sourceBalance: "\u2013", variance: "\u2013",
                resolvedCards: cardState ? cardState.resolvedCards : [], ignoredCards: cardState ? cardState.ignoredCards : [],
                accountSuggestions: acctMapped,
                noDocument: true, fromCustomPayroll: true,
                resolvedLabels: (cardState && cardState.resolvedLabels) || (prev[code] && prev[code].resolvedLabels) || {},
              };
            }
          });
        }
        return next;
      },
    });
    // Add comment if provided
    if (comment) {
      const now = new Date();
      const day = now.getDate();
      const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const hours = now.getHours().toString().padStart(2, "0");
      const mins = now.getMinutes().toString().padStart(2, "0");
      const timestamp = day + " " + monthNames[now.getMonth()] + " at " + hours + ":" + mins;
      const entry = { user: "Laura Bennett", timestamp, text: comment };
      if (cardState && cardState.isFA) {
        dispatch({ type: "ADD_COMMENT", accountCode: "__fixed_assets__", text: comment });
      } else if (isDLA) {
        dispatch({ type: "ADD_COMMENT", accountCode: "__dla__", text: comment });
      } else if (typeof currentReconciling === "object" && currentReconciling) {
        dispatch({ type: "ADD_COMMENT", accountCode: currentReconciling.code, text: comment });
      } else if (currentReconciling === true || currentReconciling === "payroll") {
        dispatch({ type: "ADD_COMMENT", accountCode: "__payroll__", text: comment });
      }
    }
    setBsReconciling(null);
  };

  const handleCloseBS = (partialState, accountFromChild) => {
    saveBSState(partialState, accountFromChild);
    setBsActiveTab("Balance sheet");
    setBsReconciling(null);
  };

  const handleSwitchAccount = (info) => {
    if (info && info.code === "__payroll__") { setBsReconciling("payroll"); }
    else if (info && info.code === "__dla__") { setBsReconciling("dla"); }
    else if (info && info.code === "__fixed_assets__") { setBsReconciling("fixed_assets"); }
    else { setBsReconciling(info); }
  };

  const handleToggleAccountReview = (code) => {
    dispatch({ type: "TOGGLE_ACCOUNT_REVIEW", code });
  };

  const handleMarkAllAccountsReviewed = (codes) => {
    dispatch({ type: "MARK_ALL_ACCOUNTS_REVIEWED", codes });
  };

  const handleSetBsReviewState = (newState) => {
    dispatch({ type: "SET_BS_REVIEW_STATE", value: newState });
  };

  const handleRestoreAccountReviewStatuses = (snapshot) => {
    dispatch({ type: "RESTORE_ACCOUNT_REVIEW_STATUSES", snapshot });
  };

  if (bsReconciling) {
    // Determine presetType and directAccount from the bsReconciling value
    let presetType = null;
    let directAccount = null;
    if (bsReconciling === true) { presetType = null; directAccount = null; }
    else if (bsReconciling === "payroll") { presetType = "Payroll"; }
    else if (bsReconciling === "dla") { presetType = "Directors' loan account"; }
    else if (bsReconciling === "fixed_assets") { presetType = "Fixed assets"; }
    else if (typeof bsReconciling === "object") { directAccount = bsReconciling; }

    // Compute savedState — must aggregate across member accounts for preset flows
    let savedState = null;
    if (directAccount && bsReconciledData[directAccount.code] && (bsReconciledData[directAccount.code].status === "reviewing" || bsReconciledData[directAccount.code].status === "reconciled" || bsReconciledData[directAccount.code].status === "suggestions")) {
      savedState = bsReconciledData[directAccount.code];
    } else if (bsReconciling === "payroll" && bsReconciledData["2210"] && bsReconciledData["2230"]) {
      const payrollMemberCodes = bsReconciledData["__payroll_custom_accounts__"] || ["2210", "2230"];
      const allResolved = new Set();
      const allIgnored = new Set();
      payrollMemberCodes.forEach(c => {
        const d = bsReconciledData[c];
        if (d && d.resolvedCards) d.resolvedCards.forEach(id => allResolved.add(id));
        if (d && d.ignoredCards) d.ignoredCards.forEach(id => allIgnored.add(id));
      });
      var allPayrollReconciled = payrollMemberCodes.every(function(c) { return bsReconciledData[c] && bsReconciledData[c].status === "reconciled"; });
      var payrollNoDoc = ["2210", "2230"].some(function(c) { return bsReconciledData[c] && bsReconciledData[c].noDocument; });
      var anyPayrollSuggestions = payrollMemberCodes.some(function(c) { return bsReconciledData[c] && bsReconciledData[c].status === "suggestions"; });
      savedState = { status: allPayrollReconciled ? "reconciled" : (anyPayrollSuggestions ? "suggestions" : "reviewing"), resolvedCards: allResolved, ignoredCards: allIgnored, noDocument: payrollNoDoc, customPayrollAccounts: bsReconciledData["__payroll_custom_accounts__"] || null };
    } else if (bsReconciling === "dla" && bsReconciledData["2300"] && bsReconciledData["2301"]) {
      const allResolved = new Set();
      const allIgnored = new Set();
      ["2300", "2301"].forEach(c => {
        const d = bsReconciledData[c];
        if (d && d.resolvedCards) d.resolvedCards.forEach(id => allResolved.add(id));
        if (d && d.ignoredCards) d.ignoredCards.forEach(id => allIgnored.add(id));
      });
      var allDLAReconciled = ["2300", "2301"].every(function(c) { return bsReconciledData[c] && bsReconciledData[c].status === "reconciled"; });
      var dlaNoDoc = ["2300", "2301"].some(function(c) { return bsReconciledData[c] && bsReconciledData[c].noDocument; });
      var anyDLASuggestions = ["2300", "2301"].some(function(c) { return bsReconciledData[c] && bsReconciledData[c].status === "suggestions"; });
      savedState = { status: allDLAReconciled ? "reconciled" : (anyDLASuggestions ? "suggestions" : "reviewing"), isDLA: true, resolvedCards: allResolved, ignoredCards: allIgnored, noDocument: dlaNoDoc };
    } else if (bsReconciling === "fixed_assets" && bsReconciledData["0020"]) {
      const faCodes = PRESET_MEMBER_CODES["__fixed_assets__"];
      const allResolved = new Set();
      const allIgnored = new Set();
      faCodes.forEach(c => {
        const d = bsReconciledData[c];
        if (d && d.resolvedCards) d.resolvedCards.forEach(id => allResolved.add(id));
        if (d && d.ignoredCards) d.ignoredCards.forEach(id => allIgnored.add(id));
      });
      var allFAReconciled = faCodes.every(function(c) { return bsReconciledData[c] && bsReconciledData[c].status === "reconciled"; });
      var anyFASuggestions = faCodes.some(function(c) { return bsReconciledData[c] && bsReconciledData[c].status === "suggestions"; });
      var faNoDoc = faCodes.some(function(c) { return bsReconciledData[c] && bsReconciledData[c].noDocument; });
      savedState = { status: allFAReconciled ? "reconciled" : (anyFASuggestions ? "suggestions" : "reviewing"), isFA: true, resolvedCards: allResolved, ignoredCards: allIgnored, noDocument: faNoDoc };
    }

    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 100, background: T.colorSurfaceContrast }}>
        <BSReconciliationFlow
          key={typeof bsReconciling === "object" ? bsReconciling.code : typeof bsReconciling === "string" ? bsReconciling : "general"}
          onClose={handleCloseBS}
          onMarkReconciled={handleMarkBSReconciled}
          onSwitchAccount={handleSwitchAccount}
          onSaveState={saveBSState}
          directAccount={directAccount}
          presetType={presetType}
          savedState={savedState}
          bsReconciledData={bsReconciledData}
        />
      </div>
    );
  }

  return (
    <>
      <BalanceSheetReviewPage
        rowComments={rowComments}
        onAddComment={handleAddComment}
        onRunBSReconciliation={handleRunBSReconciliation}
        onRunAccountReconciliation={handleRunAccountReconciliation}
        bsReconciledData={bsReconciledData}
        activeTab={bsActiveTab}
        onTabChange={setBsActiveTab}
        savedScrollTop={bsScrollTop}
        onSaveScroll={setBsScrollTop}
        bsReviewState={bsReviewState}
        onReviewStateChange={handleSetBsReviewState}
        accountReviewStatuses={accountReviewStatuses}
        onToggleAccountReview={handleToggleAccountReview}
        onMarkAllAccountsReviewed={handleMarkAllAccountsReviewed}
        onRestoreAccountReviewStatuses={handleRestoreAccountReviewStatuses}
      />
      {/* Success toast after marking reconciled */}
    </>
  );
}

registerPage("Review", {
  render: BalanceSheetPage,
  keepAlive: true,
});
})();
