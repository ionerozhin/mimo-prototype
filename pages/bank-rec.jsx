// ── Bank Reconciliation ─────────────────────────────────────────────────────
(function() {

// ── Hardcoded data ──────────────────────────────────────────────────────────
var STATUS_CONFIG = {
  reconciled:  { label: "Reconciled",  color: "#05A105", tooltip: "Account is fully reconciled in Xero" },
  suggestions: { label: "suggestions", color: "#C8543A", tooltip: "Resolve suggestions to reconcile account" },
  completed:   { label: "Completed",   color: "#4C71DF", tooltip: "Account ready to be reconciled in Xero" },
  reviewing:   { label: "In review",   color: "#D5A750", tooltip: "Reconciliation in progress — suggestions need review" },
};

var STATUSES = ["reconciled", "suggestions", "completed"];
var randomOutcome = function() {
  var status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
  var count = status === "suggestions" ? Math.floor(Math.random() * 20) + 20 : null;
  return { status: status, count: count };
};

var ALL_DOCUMENTS = [
  { name: "Lloyds_Business_April_2026.pdf",        type: "pdf", date: "15 Apr, 2026" },
  { name: "Lloyds_Operations_GBP_April_2026.csv",  type: "csv", date: "15 Apr, 2026" },
  { name: "HSBC_Business_April_2026.pdf",           type: "pdf", date: "14 Apr, 2026" },
  { name: "Barclays_Operations_April_2026.csv",     type: "csv", date: "14 Apr, 2026" },
  { name: "AmEx_OP_GBP_April26.pdf",               type: "pdf", date: "12 Apr, 2026" },
  { name: "Mastercard_Business_April26.csv",        type: "csv", date: "12 Apr, 2026" },
];

var RECONCILIATION_STEPS = [
  { title: "Reading source",                                    subtext: null,                                                    duration: 900  },
  { title: "Parsing bank statement",                            subtext: "Found 380 transactions. Period 1-30 Apr 2026.",         duration: 1500 },
  { title: "Checking transactions against statement balance",   subtext: "Balance matching (£12,439.00)",                        duration: 1300 },
  { title: "Matching GL records",                               subtext: "361 of 380 bank statement lines are matching.",         duration: 1800 },
  { title: "Summarise and suggest actions",                     subtext: null,                                                    duration: 1000 },
];

// ── AccountTable ────────────────────────────────────────────────────────────
function AccountTable({ title, rows, footerLabel, onRunReconciliation, onViewResults, reconciledAccounts = new Set(), reconciledData = {}, reconciledDates = {}, reconciledStatuses = {}, reconciledCounts = {}, bankStatements = {}, onUploadStatement, onAutoReconcile, onResetAccount, externalReconcilingAccounts = new Set() }) {
  var [hovered, setHovered] = useState(null);
  var fileInputRef = useRef(null);
  var [uploadingFor, setUploadingFor] = useState(null);
  var [reconcilingViaUpload, setReconcilingViaUpload] = useState(new Set());
  var scrollRef = useRef(null);
  var [isScrollable, setIsScrollable] = useState(false);

  useEffect(function() {
    var el = scrollRef.current;
    if (!el) return;
    var check = function() { setIsScrollable(el.scrollWidth > el.clientWidth); };
    check();
    var ro = new ResizeObserver(check);
    ro.observe(el);
    return function() { ro.disconnect(); };
  }, []);

  var handleFileChange = function(e) {
    var file = e.target.files && e.target.files[0];
    if (file && uploadingFor) {
      var now = new Date();
      var dateStr = now.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
      var timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
      onUploadStatement && onUploadStatement(uploadingFor, { fileName: file.name, date: dateStr, time: timeStr });
      var accountName = uploadingFor;
      var outcome = accountName === "Lloyds Bank - Operations GBP"
        ? { status: "reconciled", count: null }
        : accountName === "Lloyds Bank - Business"
        ? { status: "suggestions", count: 8 }
        : { status: "suggestions", count: reconciledData[accountName] && reconciledData[accountName].suggestions || 3 };
      setReconcilingViaUpload(function(prev) { return new Set([...prev, accountName]); });
      setTimeout(function() {
        setReconcilingViaUpload(function(prev) { var next = new Set(prev); next.delete(accountName); return next; });
        onAutoReconcile && onAutoReconcile(accountName, outcome.status, outcome.count);
      }, 3000);
    }
    e.target.value = "";
    setUploadingFor(null);
  };

  var cols = ["Account", "Feed balance", "Statement balance", "GL balance", "Tr. matching", "Bank statement", "Actions"];
  var sortable = new Set(["Account", "Feed balance", "Statement balance", "GL balance"]);
  var colTooltips = {
    "Account": "The bank or financial account being reconciled",
    "Feed balance": "Real-time balance pulled directly from ledger",
    "Statement balance": "Closing balance from the uploaded bank statement",
    "GL balance": "Current balance recorded in ledger",
    "Tr. matching": "Number of bank statement lines matched",
    "Bank statement": "The bank statement file used for this reconciliation",
    "Actions": "Run reconciliation or review results for this account",
  };
  var [colTooltipVisible, setColTooltipVisible] = useState(null);
  var [colTooltipPos, setColTooltipPos] = useState({ x: 0, y: 0 });
  var [badgeTooltip, setBadgeTooltip] = useState({ visible: false, x: 0, y: 0, text: "" });
  var [cardTip, setCardTip] = useState(null);

  var tipStyle = function(x, y) {
    var margin = 10;
    var halfEst = 140;
    var clamped = Math.max(margin + halfEst, Math.min(x, window.innerWidth - margin - halfEst));
    return { position: "fixed", left: clamped, top: y - 8, transform: "translate(-50%, -100%)" };
  };
  var [dragOverRow, setDragOverRow] = useState(null);
  var [replacePrompt, setReplacePrompt] = useState(null);

  var startReconciliationWithFile = function(rowName, file, dateStr, timeStr) {
    onResetAccount && onResetAccount(rowName);
    onUploadStatement && onUploadStatement(rowName, { fileName: file.name, date: dateStr, time: timeStr });
    var getOutcome = function(name) {
      if (name === "Lloyds Bank - Operations GBP")  return { status: "reconciled",  count: null };
      if (name === "Lloyds Bank - Business")         return { status: "suggestions", count: 8 };
      if (name === "HSBC - Business Transactions")   return { status: "suggestions", count: 58 };
      return { status: "suggestions", count: reconciledData[name] && reconciledData[name].suggestions || 3 };
    };
    var outcome = getOutcome(rowName);
    setReconcilingViaUpload(function(prev) { return new Set([...prev, rowName]); });
    setTimeout(function() {
      setReconcilingViaUpload(function(prev) { var next = new Set(prev); next.delete(rowName); return next; });
      onAutoReconcile && onAutoReconcile(rowName, outcome.status, outcome.count);
    }, 3000);
  };

  var handleRowDragOver = function(e, rowName) {
    if (reconcilingViaUpload.has(rowName)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setDragOverRow(rowName);
  };

  var handleRowDragLeave = function(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) setDragOverRow(null);
  };

  var handleRowDrop = function(e, rowName) {
    e.preventDefault();
    setDragOverRow(null);
    if (reconcilingViaUpload.has(rowName)) return;
    var file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (!file) return;
    var now = new Date();
    var dateStr = now.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    var timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    if (bankStatements[rowName]) {
      setReplacePrompt({ rowName: rowName, file: file, dateStr: dateStr, timeStr: timeStr });
    } else {
      startReconciliationWithFile(rowName, file, dateStr, timeStr);
    }
  };

  return (
    <>
    <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>

    {replacePrompt && (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#FFFFFF", borderRadius: 8, padding: "0", maxWidth: 450, width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.18)", fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>
          <div style={{ padding: "24px 24px 0" }}>
            <p style={{ fontSize: 18, fontWeight: 600, color: "#080908", margin: "0 0 16px" }}>Replace bank statement</p>
          </div>
          <div style={{ height: 1, background: "#E9E9EB" }} />
          <div style={{ padding: "16px 24px 20px" }}>
            <p style={{ fontSize: 14, color: "#545453", lineHeight: "22px", margin: 0 }}>
              <strong style={{ color: "#080908" }}>{bankStatements[replacePrompt.rowName] && bankStatements[replacePrompt.rowName].fileName}</strong> is already uploaded for <strong style={{ color: "#080908" }}>{replacePrompt.rowName}</strong>. Do you want to replace it with <strong style={{ color: "#080908" }}>{replacePrompt.file.name}</strong> and start a new reconciliation?
            </p>
          </div>
          <div style={{ height: 1, background: "#E9E9EB" }} />
          <div style={{ padding: "16px 24px", display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button
              onClick={function() { setReplacePrompt(null); }}
              style={{ padding: "0 18px", height: 40, border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", fontSize: 14, fontWeight: 500, color: "#080908", cursor: "pointer" }}
              onMouseEnter={function(e) { e.currentTarget.style.background = "#F5F5F5"; }}
              onMouseLeave={function(e) { e.currentTarget.style.background = "#FFFFFF"; }}
            >Cancel</button>
            <button
              onClick={function() { var rp = replacePrompt; setReplacePrompt(null); startReconciliationWithFile(rp.rowName, rp.file, rp.dateStr, rp.timeStr); }}
              style={{ padding: "0 18px", height: 40, border: "none", borderRadius: 8, background: "#05A105", fontSize: 14, fontWeight: 500, color: "#FFFFFF", cursor: "pointer" }}
              onMouseEnter={function(e) { e.currentTarget.style.background = "#058F05"; }}
              onMouseLeave={function(e) { e.currentTarget.style.background = "#05A105"; }}
            >Replace and reconcile</button>
          </div>
        </div>
      </div>
    )}

    {badgeTooltip.visible && (
      <div style={{
        ...tipStyle(badgeTooltip.x, badgeTooltip.y),
        background: "#2A2A2A", color: "#FFFFFF",
        fontSize: 14, fontWeight: 400, lineHeight: "20px",
        padding: "6px 8px", borderRadius: 8,
        whiteSpace: "nowrap", zIndex: 9999,
        pointerEvents: "none",
        fontFamily: "'Inter', sans-serif",
      }}>
        {badgeTooltip.text}
      </div>
    )}
    {colTooltipVisible && (
      <div style={{
        ...tipStyle(colTooltipPos.x, colTooltipPos.y),
        background: "#2A2A2A", color: "#FFFFFF",
        fontSize: 14, fontWeight: 400, lineHeight: "20px",
        padding: "6px 8px", borderRadius: 8,
        whiteSpace: "nowrap", zIndex: 9999,
        pointerEvents: "none",
        fontFamily: "'Inter', sans-serif",
      }}>
        {colTooltips[colTooltipVisible]}
      </div>
    )}
    {cardTip && (
      <div style={{
        ...tipStyle(cardTip.x, cardTip.y),
        background: "#2A2A2A", color: "#FFFFFF",
        fontSize: 14, fontWeight: 400, lineHeight: "20px",
        padding: "6px 8px", borderRadius: 8,
        whiteSpace: "nowrap", zIndex: 9999,
        pointerEvents: "none",
        fontFamily: "'Inter', sans-serif",
      }}>
        {cardTip.text}
      </div>
    )}
    <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, overflow: "hidden" }}>
      <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={handleFileChange} />

      <div style={{ padding: "16px 16px 14px", borderBottom: "1px solid #E9E9EB" }}>
        <span style={{ fontSize: 18, fontWeight: 500, color: "#080908" }}>{title}</span>
      </div>

      <div ref={scrollRef} style={{ overflowX: "auto" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto auto 160px 260px 220px",
        minWidth: "100%",
        width: "max-content",
      }}>

        {cols.map(function(col, ci) {
          var isActions = col === "Actions";
          var isLast = ci === cols.length - 1;
          return (
            <div key={"h-" + col} style={{
              display: "flex", alignItems: "center", gap: 4,
              fontSize: 14, fontWeight: 500, color: "#8C8C8B",
              padding: "10px 16px",
              borderBottom: "1px solid #E9E9EB",
              borderRight: !isLast ? "1px solid #E9E9EB" : "none",
              background: "#FFFFFF",
              whiteSpace: "nowrap",
              ...(isActions ? {
                position: "sticky", right: 0,
                boxShadow: isScrollable ? "-6px 0 12px rgba(0,0,0,0.06)" : "none",
                zIndex: 2,
              } : {}),
            }}>
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 4, cursor: "default" }}
                onMouseEnter={function(e) {
                  var rect = e.currentTarget.getBoundingClientRect();
                  setColTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
                  setColTooltipVisible(col);
                }}
                onMouseLeave={function() { setColTooltipVisible(null); }}
              >
                {col}
                {sortable.has(col) && <SortIcon />}
              </span>
            </div>
          );
        })}

        {rows.map(function(row, i) {
          var isReconciled = reconciledAccounts.has(row.name);
          var rData = reconciledData[row.name] || {};
          var rowStatus = reconciledStatuses[row.name] || "reconciled";
          var suggCount = reconciledCounts[row.name] || 3;
          var isDragOver = dragOverRow === row.name;
          var rowBg = isDragOver ? "#F1F8F0" : hovered === i ? "#FAFAFA" : "#FFFFFF";
          var borderBottom = i < rows.length - 1 ? "1px solid #E9E9EB" : "none";

          var cellProps = {
            onMouseEnter: function() { setHovered(i); },
            onMouseLeave: function() { setHovered(null); },
            onDragOver: function(e) { handleRowDragOver(e, row.name); },
            onDragLeave: handleRowDragLeave,
            onDrop: function(e) { handleRowDrop(e, row.name); },
          };
          var getCellBg = function(pos) {
            if (!isDragOver) return rowBg;
            var dash = function(dir) { return "repeating-linear-gradient(" + dir + ", #05A105 0, #05A105 3px, transparent 3px, transparent 6px)"; };
            var layers = [
              dash("90deg") + " top / 100% 1px no-repeat",
              dash("90deg") + " bottom / 100% 1px no-repeat",
              pos === "first" ? dash("0deg") + " left / 1px 100% no-repeat" : null,
              pos === "last"  ? dash("0deg") + " right / 1px 100% no-repeat" : null,
              rowBg,
            ].filter(Boolean).join(", ");
            return layers;
          };
          var cell = function(extra, pos) {
            if (!extra) extra = {};
            if (!pos) pos = "middle";
            return {
              background: getCellBg(pos),
              borderBottom: borderBottom,
              ...extra,
            };
          };

          return (
            <React.Fragment key={i}>
              <div style={cell({ display: "flex", alignItems: "center", fontSize: 14, color: "#080908", padding: "14px 16px", borderRight: "1px solid #E9E9EB", whiteSpace: "nowrap" }, "first")} {...cellProps}>
                {row.name}
              </div>

              <div style={cell({ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, fontSize: 14, color: row.noFeedBalance ? "#9D9D9E" : "#080908", padding: "14px 16px", borderRight: "1px solid #E9E9EB", whiteSpace: "nowrap" })} {...cellProps}>
                {row.noFeedBalance ? (
                  <Tooltip text="This account has no connected bank feed">No feed balance</Tooltip>
                ) : (
                  <>
                    {row.feedBalance}
                    <span
                      style={{ fontSize: 11, fontWeight: 500, color: "#7C7C7C", background: "#ECECEC", borderRadius: 4, padding: "0 6px", height: 25, display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", flexShrink: 0, cursor: "default" }}
                      onMouseEnter={function(e) {
                        var rect = e.currentTarget.getBoundingClientRect();
                        setBadgeTooltip({ visible: true, x: rect.left + rect.width / 2, y: rect.top, text: "Last synced: 3 April at 14:57" });
                      }}
                      onMouseLeave={function() { setBadgeTooltip(function(t) { return { ...t, visible: false }; }); }}
                    >
                      3 Apr
                    </span>
                  </>
                )}
              </div>

              <div style={cell({ display: "flex", alignItems: "center", fontSize: 14, color: isReconciled ? "#080908" : "#9D9D9E", padding: "14px 16px", borderRight: "1px solid #E9E9EB", whiteSpace: "nowrap" })} {...cellProps}>
                {isReconciled
                  ? (rowStatus === "suggestions" ? (rData.statementBalance || row.feedBalance) : row.feedBalance)
                  : <Tooltip text="No bank statement has been uploaded for this account">No bank statement</Tooltip>}
              </div>

              <div style={cell({ display: "flex", flexDirection: "column", justifyContent: "center", padding: "14px 16px", borderRight: "1px solid #E9E9EB" })} {...cellProps}>
                <div style={{ fontSize: 14, color: "#080908", whiteSpace: "nowrap" }}>
                  {isReconciled && rowStatus !== "suggestions" ? row.feedBalance : row.glBalance}
                </div>
                {(function() {
                  var bg = "#ECECEC", color = "#7C7C7C", value = row.glSub;
                  if (isReconciled) {
                    var stmtBalance = rData.statementBalance || row.feedBalance;
                    var diff = rowStatus === "suggestions"
                      ? parseGBP(row.glBalance) - parseGBP(stmtBalance)
                      : 0;
                    value = formatGBPDiff(diff);
                    if (rowStatus === "suggestions") { bg = "#FCEFEC"; color = "#C8543A"; }
                    else if (rowStatus === "completed") { bg = "#EBF0FB"; color = "#4C71DF"; }
                    else { bg = "#F1F8F0"; color = "#6BAC5B"; }
                  }
                  return (
                    <span
                      style={{ display: "inline-block", background: bg, borderRadius: 4, padding: "2px 6px", fontSize: 11, fontWeight: 500, color: color, marginTop: 4, alignSelf: "flex-start", whiteSpace: "nowrap", cursor: "default" }}
                      onMouseEnter={function(e) { var rect = e.currentTarget.getBoundingClientRect(); setBadgeTooltip({ visible: true, x: rect.left + rect.width / 2, y: rect.top, text: isReconciled ? "Difference between statement balance and GL balance" : "Difference between feed balance and GL balance" }); }}
                      onMouseLeave={function() { setBadgeTooltip(function(t) { return { ...t, visible: false }; }); }}
                    >
                      {value}
                    </span>
                  );
                })()}
              </div>

              <div style={cell({ display: "flex", alignItems: "center", padding: "14px 16px", borderRight: "1px solid #E9E9EB" })} {...cellProps}>
                <span
                  onMouseEnter={function(e) { var rect = e.currentTarget.getBoundingClientRect(); setBadgeTooltip({ visible: true, x: rect.left + rect.width / 2, y: rect.top, text: isReconciled ? "Difference between statement balance and GL balance" : row.noFeedBalance ? "This account has no connected bank feed" : "Difference between feed balance and GL balance" }); }}
                  onMouseLeave={function() { setBadgeTooltip(function(t) { return { ...t, visible: false }; }); }}
                >
                  {isReconciled ? (function() {
                    var total    = parseInt((rData.matched || "100/100").split("/")[1]) || 100;
                    var sc       = reconciledCounts[row.name] || 3;
                    var matchedN = rowStatus === "suggestions" ? Math.max(0, total - sc) : total;
                    return <TrMatchingBadge matchedCount={matchedN} totalCount={total} status={rowStatus} />;
                  })() : (
                    <TrMatchBadge value={row.trMatching || "0/0"} noFeed={!!row.noFeedBalance} />
                  )}
                </span>
              </div>

              <div style={cell({ display: "flex", alignItems: "center", padding: "14px 16px", borderRight: "1px solid #E9E9EB", overflow: "hidden", minWidth: 0 })} {...cellProps}>
                {isDragOver && !bankStatements[row.name] ? (
                  <span style={{ fontSize: 13, color: "#05A105", fontWeight: 500, whiteSpace: "nowrap", width: "100%", textAlign: "center" }}>Drop to upload</span>
                ) : bankStatements[row.name] ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0, width: "100%" }}>
                    <DocIcon />
                    <span
                      style={{ fontSize: 14, color: "#080908", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, minWidth: 0, cursor: "default" }}
                      onMouseEnter={function(e) {
                        var rect = e.currentTarget.getBoundingClientRect();
                        setBadgeTooltip({ visible: true, x: rect.left + rect.width / 2, y: rect.top, text: bankStatements[row.name].fileName });
                      }}
                      onMouseLeave={function() { setBadgeTooltip(function(t) { return { ...t, visible: false }; }); }}
                    >
                      {bankStatements[row.name].fileName}
                    </span>
                    <span
                      style={{ fontSize: 11, fontWeight: 500, color: "#7C7C7C", background: "#ECECEC", borderRadius: 4, padding: "0 6px", height: 25, display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", flexShrink: 0, cursor: "default" }}
                      onMouseEnter={function(e) {
                        var rect = e.currentTarget.getBoundingClientRect();
                        var stmt = bankStatements[row.name];
                        var tooltipText = stmt.uploadedBy
                          ? "Bank statement uploaded " + (stmt.displayDate || stmt.date) + (stmt.time ? " at " + stmt.time : "") + " by Client " + stmt.uploadedBy
                          : "Bank statement uploaded " + stmt.date + (stmt.time ? " at " + stmt.time : "") + " by accountant Laura Bennett";
                        setBadgeTooltip({ visible: true, x: rect.left + rect.width / 2, y: rect.top, text: tooltipText });
                      }}
                      onMouseLeave={function() { setBadgeTooltip(function(t) { return { ...t, visible: false }; }); }}
                    >
                      {bankStatements[row.name].date}
                    </span>
                  </div>
                ) : (
                  <SecondaryButton
                    style={{ color: "#05A105", justifyContent: "center", width: "100%" }}
                    onMouseEnter={function(e) { e.currentTarget.style.borderColor = "#ACD394"; e.currentTarget.style.background = "#F4F9F1"; }}
                    onMouseLeave={function(e) { e.currentTarget.style.borderColor = "#E9E9EB"; e.currentTarget.style.background = "#FFFFFF"; }}
                    onClick={function() { setUploadingFor(row.name); fileInputRef.current && fileInputRef.current.click(); }}
                  >
                    Drop file or upload
                  </SecondaryButton>
                )}
              </div>

              <div style={cell({
                display: "flex", alignItems: "center", padding: "14px 16px",
                position: "sticky", right: 0,
                boxShadow: isDragOver ? "none" : isScrollable ? "-6px 0 12px rgba(0,0,0,0.06)" : "none",
                zIndex: 1,
              }, "last")} {...cellProps}>
                {(reconcilingViaUpload.has(row.name) || externalReconcilingAccounts.has(row.name)) ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, color: "#000000", whiteSpace: "nowrap" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: "spin 0.75s linear infinite", flexShrink: 0 }}>
                      <path d="M8 1.5A6.5 6.5 0 1 1 1.5 8" stroke="#05A105" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Reconciling account
                  </span>
                ) : isReconciled ? (
                  <ReconciledCard
                    date={reconciledDates[row.name]}
                    status={reconciledStatuses[row.name] || "reconciled"}
                    suggestionCount={reconciledCounts[row.name]}
                    onPlay={function() { onViewResults && onViewResults(row.name); }}
                    onTipShow={function(x, y, text) { setCardTip({ x: x, y: y, text: text }); }}
                    onTipHide={function() { setCardTip(null); }}
                  />
                ) : (
                  <SecondaryButton icon={<PlayCircleIcon color="#080908" />} onClick={function() { onRunReconciliation && onRunReconciliation(row.name); }}>
                    Run reconciliation
                  </SecondaryButton>
                )}
              </div>

            </React.Fragment>
          );
        })}

      </div>
      </div>

      <div style={{ padding: "12px 16px", fontSize: 14, color: "#8C8C8B", borderTop: "1px solid #E9E9EB" }}>
        {footerLabel}
      </div>
    </div>
    </>
  );
}

// ── useTypewriter ───────────────────────────────────────────────────────────
function useTypewriter(text, speed, instant) {
  if (speed === undefined) speed = 80;
  if (instant === undefined) instant = false;
  var words = text ? text.split(" ") : [];
  var [displayed, setDisplayed] = useState(instant && text ? words.length : 0);
  useEffect(function() {
    if (instant) {
      setDisplayed(words.length);
      return;
    }
    setDisplayed(0);
    if (!words.length) return;
    var i = 0;
    var tick = function() {
      i++;
      setDisplayed(i);
      if (i < words.length) setTimeout(tick, speed + Math.random() * 40);
    };
    var t = setTimeout(tick, 200);
    return function() { clearTimeout(t); };
  }, [text]);
  var visibleText = words.slice(0, displayed).join(" ");
  return { chars: visibleText, done: !!text && displayed >= words.length };
}

// ── StreamingMessage ────────────────────────────────────────────────────────
function StreamingMessage({ segments, speed, instant }) {
  if (speed === undefined) speed = 80;
  if (instant === undefined) instant = false;
  var fullText = segments.map(function(s) { return s.text; }).join("");
  var tw = useTypewriter(fullText, speed, instant);

  var remaining = tw.chars;
  var rendered = [];
  for (var i = 0; i < segments.length; i++) {
    var seg = segments[i];
    if (!remaining) break;
    var slice = remaining.slice(0, seg.text.length);
    remaining = remaining.slice(seg.text.length);
    if (seg.bold) {
      rendered.push(<strong key={i}>{slice}</strong>);
    } else {
      rendered.push(<span key={i}>{slice}</span>);
    }
  }

  return <span>{rendered}</span>;
}

// ── DocFileIcon ─────────────────────────────────────────────────────────────
function DocFileIcon({ type }) {
  if (type === "csv") return <CsvIcon width={20} height={24} />;
  return <PdfIcon width={20} height={24} />;
}

// ── AllDocumentsSidebar ─────────────────────────────────────────────────────
function AllDocumentsSidebar({ onClose, onSelect }) {
  var [visible, setVisible] = useState(false);
  var [search, setSearch] = useState("");
  var [selected, setSelected] = useState(new Set());
  useEffect(function() { requestAnimationFrame(function() { setVisible(true); }); }, []);

  var close = function() {
    setVisible(false);
    setTimeout(function() { onClose(); }, 320);
  };

  var filtered = ALL_DOCUMENTS.filter(function(d) {
    return d.name.toLowerCase().includes(search.toLowerCase());
  });

  var toggleRow = function(i) {
    setSelected(function(prev) {
      var next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  var handleAdd = function() {
    var docs = [...selected].map(function(i) { return filtered[i]; });
    onSelect && onSelect(docs);
    close();
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9000 }} onClick={close}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)", opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }} />
      <div
        onClick={function(e) { e.stopPropagation(); }}
        style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: 560,
          background: "#FFFFFF",
          boxShadow: "-4px 0 32px rgba(0,0,0,0.10)",
          display: "flex", flexDirection: "column",
          transform: visible ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 28px 24px", borderBottom: "1px solid #ECECEC", flexShrink: 0 }}>
          <span style={{ fontSize: 20, fontWeight: 500, color: "#080908", letterSpacing: "-0.3px" }}>All statements</span>
          <button
            onClick={close}
            style={{ width: 30, height: 30, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 0 }}
            onMouseEnter={function(e) { e.currentTarget.querySelector("rect").setAttribute("fill", "#EBEBEB"); }}
            onMouseLeave={function(e) { e.currentTarget.querySelector("rect").setAttribute("fill", "#F5F5F5"); }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <rect width="30" height="30" rx="15" fill="#F5F5F5"/>
              <path d="M20 10L10 20M10 10L20 20" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 0" }}>
          <div style={{ border: "1px solid #E9E9EB", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: "1px solid #E9E9EB", flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="#4F4F4F" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                value={search}
                onChange={function(e) { setSearch(e.target.value); }}
                placeholder="Search"
                style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: "#4F4F4F", background: "transparent", fontFamily: "'Inter', sans-serif" }}
              />
              <button style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 36, padding: "0 10px", border: "1px solid #DBDBDB", borderRadius: 7, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908", flexShrink: 0 }}
                onMouseEnter={function(e) { e.currentTarget.style.background = "#F5F5F5"; }}
                onMouseLeave={function(e) { e.currentTarget.style.background = "#FFFFFF"; }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9.99996 4.16675V15.8334M4.16663 10.0001H15.8333" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add filter
              </button>
            </div>
            <div style={{ display: "flex", background: "#FBFBFB", borderBottom: "1px solid #E9E9EB", flexShrink: 0 }}>
              <div style={{ width: 44, flexShrink: 0, borderRight: "1px solid #E9E9EB" }} />
              <div style={{ flex: 1, padding: "10px 14px", fontSize: 14, color: "#8C8C8B", fontWeight: 400, borderRight: "1px solid #E9E9EB" }}>Name</div>
              <div style={{ width: 130, padding: "10px 14px", fontSize: 14, color: "#8C8C8B", fontWeight: 400, flexShrink: 0 }}>Date uploaded</div>
            </div>
            {filtered.map(function(doc, i) {
              var isSelected = selected.has(i);
              return (
                <div
                  key={i}
                  onClick={function() { toggleRow(i); }}
                  style={{ display: "flex", alignItems: "center", borderBottom: i < filtered.length - 1 ? "1px solid #E9E9EB" : "none", cursor: "pointer", background: isSelected ? "#F4F9F1" : "#FFFFFF", transition: "background 0.1s" }}
                  onMouseEnter={function(e) { if (!isSelected) e.currentTarget.style.background = "#FAFAFA"; }}
                  onMouseLeave={function(e) { e.currentTarget.style.background = isSelected ? "#F4F9F1" : "#FFFFFF"; }}
                >
                  <div style={{ width: 44, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, borderRight: "1px solid #E9E9EB", alignSelf: "stretch" }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                      border: isSelected ? "none" : "1.5px solid #CFCFD1",
                      background: isSelected ? "#05A105" : "#FFFFFF",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.15s",
                    }}>
                      {isSelected && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <div style={{ flex: 1, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, borderRight: "1px solid #E9E9EB", minWidth: 0 }}>
                    <DocFileIcon type={doc.type} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#080908", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.name}</div>
                      <div style={{ fontSize: 14, color: "#8C8C8B", marginTop: 1 }}>Bank statement</div>
                    </div>
                  </div>
                  <div style={{ width: 130, padding: "10px 14px", fontSize: 14, color: "#080908", flexShrink: 0 }}>{doc.date}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ padding: "16px 24px", flexShrink: 0, background: "#FFFFFF", borderTop: "1px solid #ECECEC" }}>
          <button
            onClick={handleAdd}
            disabled={selected.size === 0}
            style={{
              width: "100%", height: 40, border: "none", borderRadius: 8,
              fontSize: 14, fontWeight: 500, fontFamily: "'Inter', sans-serif",
              background: selected.size === 0 ? "#E9E9EB" : "#05A105",
              color: selected.size === 0 ? "#BCBCBC" : "#FFFFFF",
              cursor: selected.size === 0 ? "default" : "pointer",
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={function(e) { if (selected.size > 0) e.currentTarget.style.background = "#058F05"; }}
            onMouseLeave={function(e) { if (selected.size > 0) e.currentTarget.style.background = "#05A105"; }}
          >
            {selected.size > 0 ? "Add " + selected.size + " " + (selected.size === 1 ? "file" : "files") : "Add files"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── CanvasLoader ────────────────────────────────────────────────────────────
function CanvasLoader() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      height: "100%", gap: 14, fontFamily: "'Inter', sans-serif",
    }}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ animation: "spin 0.75s linear infinite", flexShrink: 0 }}>
        <path d="M18 3A15 15 0 1 1 3 18" stroke="#05A105" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
      <p style={{ fontSize: 14, color: "#8C8C8B", margin: 0 }}>Preparing canvas...</p>
    </div>
  );
}

// ── ChevronUpIcon ───────────────────────────────────────────────────────────
function ChevronUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 12.5L10 7.5L5 12.5" stroke="#2A2A2A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Icons ───────────────────────────────────────────────────────────────────
function BankBuildingIcon({ size }) {
  if (!size) size = 18;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4.965 8.938v7.944M9.434 8.938v7.944M14.399 8.938v7.944M18.868 8.938v7.944M2.979 18.471v.795c0 .556 0 .834.108 1.047a.993.993 0 00.434.434c.213.108.49.108 1.047.108h14.697c.556 0 .834 0 1.047-.108a.993.993 0 00.434-.434c.108-.213.108-.49.108-1.047v-.795c0-.556 0-.834-.108-1.047a.993.993 0 00-.434-.434c-.213-.108-.49-.108-1.047-.108H4.568c-.556 0-.834 0-1.047.108a.993.993 0 00-.434.434c-.108.213-.108.49-.108 1.047zM11.572 3.056l-7.349 1.633c-.444.099-.666.148-.832.268a.993.993 0 00-.333.414c-.08.188-.08.415-.08.87v1.109c0 .556 0 .834.109 1.046.095.187.247.339.434.434.212.109.49.109 1.046.109h14.698c.556 0 .834 0 1.046-.109a.993.993 0 00.434-.434c.108-.212.108-.49.108-1.046V6.24c0-.454 0-.682-.08-.87a.993.993 0 00-.333-.413c-.166-.12-.388-.17-.832-.268l-7.348-1.633a1.987 1.987 0 00-.259-.03 1.006 1.006 0 00-.173 0c-.066.006-.13.02-.259.03z" stroke="#4F4F4F" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PencilIcon({ size }) {
  if (!size) size = 18;
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M16.364 1.818l3.636 3.637M1.818 20l1.16-4.255c.076-.277.114-.416.172-.546a1.82 1.82 0 01.19-.326c.083-.114.185-.216.389-.42l9.394-9.394c.18-.18.27-.27.374-.303a.364.364 0 01.28 0c.104.034.194.124.374.304l2.607 2.608c.18.18.27.27.304.373a.364.364 0 010 .281c-.034.104-.124.194-.304.374L7.364 18.09c-.203.204-.305.305-.42.389a1.82 1.82 0 01-.325.19c-.13.057-.269.095-.546.171L1.818 20z" stroke="#4F4F4F" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function InvoiceFileIcon({ width, height }) {
  if (!width) width = 24;
  if (!height) height = 30;
  return (
    <svg width={width} height={height} viewBox="0 0 31 38" fill="none">
      <path d="M0 3.434A3.434 3.434 0 013.434 0H21.637l4.038 5.235 5.235 6.786v21.637a3.434 3.434 0 01-3.434 3.434H3.434A3.434 3.434 0 010 33.658V3.434z" fill="#F4F4F2"/>
      <path d="M12.297 12.601c3.477-1.043-.133 16.677-2.841 14.24-3.358-3.023 12.586-7.63 11.107-3.197-1.295 3.885-12.141-9.88-8.266-11.043z" stroke="#FF6056" strokeWidth="1.188"/>
      <path d="M21.637 10.089V0l9.273 12.021h-7.341c-.911 0-1.366 0-1.649-.283-.283-.283-.283-.738-.283-1.649z" fill="#D6D6D4"/>
    </svg>
  );
}

function FileQuestionIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M16.6666 7.916V5.666c0-1.4-.0001-2.1-.2725-2.635a2.5 2.5 0 00-1.0925-1.0925C14.7668 1.666 14.0667 1.666 12.6666 1.666H7.333c-1.4 0-2.1 0-2.635.2725a2.5 2.5 0 00-1.0925 1.0925C3.333 3.566 3.333 4.266 3.333 5.666v8.667c0 1.4 0 2.1.273 2.635a2.5 2.5 0 001.092 1.092c.535.273 1.235.273 2.635.273h4.333M11.667 9.166H6.667M8.333 12.499H6.667M13.333 5.833H6.667M13.75 12.501a2.083 2.083 0 013.641.625c0 1.249-1.874 1.874-1.874 1.874M15.542 17.499h.008" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BankStatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M4.167 7.499v6.667M7.917 7.499v6.667M12.083 7.499v6.667M15.833 7.499v6.667M2.5 15.499v.667c0 .467 0 .7.091.878a.833.833 0 00.364.364c.178.091.412.091.878.091h12.334c.467 0 .7 0 .878-.091a.833.833 0 00.364-.364c.091-.178.091-.411.091-.878v-.667c0-.467 0-.7-.091-.878a.833.833 0 00-.364-.364c-.178-.091-.412-.091-.878-.091H3.833c-.467 0-.7 0-.878.091a.833.833 0 00-.364.364c-.091.178-.091.411-.091.878zM9.711 2.563L3.544 3.934c-.373.083-.559.124-.698.224a.833.833 0 00-.279.347C2.5 4.663 2.5 4.854 2.5 5.235v.931c0 .467 0 .7.091.878a.833.833 0 00.364.364c.178.091.412.091.878.091h12.334c.467 0 .7 0 .878-.091a.833.833 0 00.364-.364c.091-.178.091-.412.091-.878v-.931c0-.382 0-.573-.068-.73a.833.833 0 00-.279-.347c-.139-.1-.326-.142-.698-.225l-6.167-1.37a1.167 1.167 0 00-.216-.041.833.833 0 00-.146 0c-.054.005-.108.017-.216.041z" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function UsersCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M13.333 15l1.667 1.667 3.333-3.334M10 12.5H6.667c-1.554 0-2.33 0-2.943.254a3.333 3.333 0 00-1.804 1.804C1.667 15.17 1.667 15.947 1.667 17.5M12.917 2.742a3.333 3.333 0 010 6.183M11.25 5.833a3.333 3.333 0 11-6.667 0 3.333 3.333 0 016.667 0z" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DownloadIcon({ size, color }) {
  if (!size) size = 18;
  if (!color) color = "#7C7C7C";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M21 15V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V15M17 10L12 15M12 15L7 10M12 15V3" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// NOTE: The remaining bank-rec-specific components (UploadCard, RecommendationCard,
// AuditTrailSidebar, AuditEntry, SpendMoneySidebar, UploadStatementsSidebar,
// BatchDraftSidebar, SuggestionsBox, ResultsPanel, AccountPicker, BSOptionPicker,
// WorkflowCard, ReconciliationFlow) are very large (~3000 lines of JSX).
// They are faithfully extracted from the source file below.
// Due to extreme length, they reference globals from the shared layer:
// T, Tooltip, Chevron, PrimaryButton, SecondaryButton, DataTable, NavIcon,
// PATHS, SortIcon, PlayCircleIcon, TrMatchBadge, TrMatchingBadge,
// ReconciledCard, FileIcon, DocIcon, InvoiceIcon, PdfIcon, CsvIcon,
// parseGBP, formatGBPDiff, ProgressRing, StatusBadge


// ── BankRecPage (main page wrapper) ─────────────────────────────────────────
function BankRecPage({ ctx }) {
  var reconciledAccounts = ctx.store.reconciledAccounts;
  var reconciledStatuses = ctx.store.reconciledStatuses;
  var reconciledCounts = ctx.store.reconciledCounts;
  var reconciledDates = ctx.store.reconciledDates;
  var bankStatements = ctx.store.bankStatements;
  var selectedPeriod = ctx.store.selectedPeriod;
  var dispatch = ctx.dispatch;

  // Page-local UI state
  var [reconciling, setReconciling] = useState(null);
  var [showResultsMode, setShowResultsMode] = useState(false);
  var [allResolvedOnOpen, setAllResolvedOnOpen] = useState(false);
  var [isCleanReconcileOnOpen, setIsCleanReconcileOnOpen] = useState(false);
  var [accountResolvedCards, setAccountResolvedCards] = useState({});
  var [accountIgnoredCards, setAccountIgnoredCards] = useState({});
  var [externalReconcilingAccounts, setExternalReconcilingAccounts] = useState(new Set());
  var [uploadStatementsSidebarOpen, setUploadStatementsSidebarOpen] = useState(false);
  var [allStatementsOpen, setAllStatementsOpen] = useState(false);

  // Notify shell when reconciliation flow is active (to hide nav)
  useEffect(function() {
    if (ctx.setFullScreen) ctx.setFullScreen(!!reconciling);
  }, [reconciling]);

  var reconciledData = {
    "Lloyds Bank - Operations GBP":   { statementBalance: "£127,000.00", difference: "£27,000.00", matched: "361/380", suggestions: 3 },
    "Lloyds Bank - Business":          { statementBalance: "£155,000.00", difference: "£0.00",      matched: "241/244", suggestions: 2 },
    "HSBC - Business Transactions":   { statementBalance: "£95,500.00",  difference: "£2,500.00",  matched: "189/195", suggestions: 2 },
    "Barclays - Operations":          { statementBalance: "£374,000.00", difference: "£6,000.00",  matched: "409/420", suggestions: 5 },
    "American Express OP GBP":        { statementBalance: "£127,000.00", difference: "£27,000.00", matched: "98/105",  suggestions: 4 },
    "Mastercard Business":            { statementBalance: "£152,500.00", difference: "£2,500.00",  matched: "53/56",   suggestions: 3 },
  };

  var bankAccounts = [
    { name: "Lloyds Bank - Business",          feedBalance: "£155,000.00", glBalance: "£143,000.00", glSub: "£0,00", trMatching: "241/244" },
    { name: "Lloyds Bank - Operations GBP",   feedBalance: "£127,000.00", glBalance: "£115,000.00", glSub: "£0,00", trMatching: "361/380" },
    { name: "HSBC - Business Transactions",   feedBalance: "£93,000.00",  glBalance: "£61,020.00",  glSub: "£0,00", trMatching: "189/195" },
    { name: "Barclays - Operations",          feedBalance: "£374,000.00", glBalance: "£380,000.00", glSub: "£0,00", trMatching: "409/420" },
    { name: "American Express OP GBP",        feedBalance: "£87,420.00",  glBalance: "£85,640.00",  glSub: "£0,00", trMatching: "98/105" },
    { name: "Mastercard Business",            feedBalance: "£155,000.00", glBalance: "£152,500.00", glSub: "£0,00", trMatching: "53/56"   },
  ];

  var ACCOUNT_OUTCOMES = {
    "Lloyds Bank - Business":       { status: "suggestions", count: 8 },
    "HSBC - Business Transactions": { status: "suggestions", count: 58 },
    "Barclays - Operations":        { status: "suggestions", count: 5 },
    "American Express OP GBP":      { status: "suggestions", count: 4 },
    "Mastercard Business":          { status: "suggestions", count: 3 },
  };

  var getDateLabel = function() {
    return new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  };

  var handleCloseReconciliation = function(accountName, completed, allSuggestionsResolved, remainingCount, resolvedSet, ignoredSet) {
    if (resolvedSet) setAccountResolvedCards(function(prev) { return { ...prev, [accountName]: resolvedSet }; });
    if (ignoredSet) setAccountIgnoredCards(function(prev) { return { ...prev, [accountName]: ignoredSet }; });
    if (completed) {
      var currentStatus = reconciledStatuses[accountName];
      if (!(showResultsMode && currentStatus === "reconciled")) {
        var outcome = ACCOUNT_OUTCOMES[accountName];
        var accountsWithCompletedState = new Set(["Lloyds Bank - Business", "HSBC - Business Transactions"]);
        var resolvedStatus = (accountsWithCompletedState.has(accountName) && allSuggestionsResolved)
          ? "completed"
          : "suggestions";
        var resolvedCount = (resolvedStatus === "completed" || resolvedStatus === "reconciled") ? null
          : remainingCount !== null && remainingCount !== undefined ? remainingCount
          : (outcome && outcome.count !== undefined ? outcome.count : reconciledData[accountName] && reconciledData[accountName].suggestions || 3);
        dispatch({ type: "MARK_RECONCILED", account: accountName, status: resolvedStatus, count: resolvedCount, date: getDateLabel() });
      }
    } else {
      if (remainingCount !== null && remainingCount !== undefined) {
        dispatch({ type: "MARK_RECONCILED", account: accountName, status: reconciledStatuses[accountName] || "suggestions", count: remainingCount, date: reconciledDates[accountName] || getDateLabel() });
      }
    }
    setReconciling(null);
    setShowResultsMode(false);
  };

  var handleRunReconciliation = function(accountName) {
    setReconciling(accountName);
    setShowResultsMode(false);
    setAllResolvedOnOpen(false);
    setIsCleanReconcileOnOpen(false);
  };

  var handleAutoReconcile = function(accountName, status, count) {
    dispatch({ type: "MARK_RECONCILED", account: accountName, status: status || "reconciled", count: count !== undefined ? count : null, date: getDateLabel() });
  };

  var handleResetAccount = function(accountName) {
    dispatch({ type: "RESET_ACCOUNT", account: accountName });
  };

  var handleViewResults = function(accountName) {
    setReconciling(accountName);
    setShowResultsMode(true);
    var status = reconciledStatuses[accountName] || "reconciled";
    setAllResolvedOnOpen(status !== "suggestions");
    setIsCleanReconcileOnOpen(status === "reconciled");
  };

  var handleUploadStatement = function(accountName, fileInfo) {
    dispatch({ type: "UPLOAD_STATEMENT", account: accountName, file: fileInfo });
  };

  // Fullscreen reconciliation flow
  if (reconciling) {
    return <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "#FBFBFB" }}>
    <ReconciliationFlow
      accountName={reconciling}
      onClose={function(completed, allSuggestionsResolved, actualAccount, remaining, resolvedSet, ignoredSet) {
        handleCloseReconciliation(actualAccount || reconciling, completed, allSuggestionsResolved, remaining, resolvedSet, ignoredSet);
      }}
      initialResolvedCards={accountResolvedCards[reconciling] ? [...accountResolvedCards[reconciling]] : null}
      initialIgnoredCards={accountIgnoredCards[reconciling] ? [...accountIgnoredCards[reconciling]] : null}
      showResults={showResultsMode}
      allResolved={allResolvedOnOpen}
      isCleanReconcile={isCleanReconcileOnOpen}
      onUploadStatement={handleUploadStatement}
      reconciledDate={reconciledDates[reconciling] || null}
      reconciledMatchedStr={reconciledData[reconciling] ? reconciledData[reconciling].matched : null}
      accountStatus={reconciledStatuses[reconciling] || null}
      existingStatement={bankStatements[reconciling] || null}
      reconciledStatuses={reconciledStatuses}
      reconciledCounts={reconciledCounts}
      selectedPeriod={selectedPeriod}
    />
    </div>;
  }

  // ── Account overview (table view) ───────────────────────────────────────
  var reconciledCount = reconciledAccounts.size;
  var fullyReconciled = [...reconciledAccounts].filter(function(name) { return (reconciledStatuses[name] || "reconciled") === "reconciled"; }).length;

  // Compute GL match stats for StatsRow
  var glStats = [...reconciledAccounts].reduce(function(acc, name) {
    var d = reconciledData[name] || {};
    var status = reconciledStatuses[name] || "reconciled";
    var count = reconciledCounts[name] || 3;
    var total = parseInt((d.matched || "100/100").split("/")[1]) || 100;
    var matched = status === "suggestions" ? Math.max(0, total - count) : total;
    return { matchedGL: acc.matchedGL + matched, totalMatches: acc.totalMatches + total };
  }, { matchedGL: 0, totalMatches: 0 });

  var openUploadSidebar = function() { setUploadStatementsSidebarOpen(true); };
  var closeUploadSidebar = function() { setUploadStatementsSidebarOpen(false); };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>

      {/* Top context bar */}
      <TopBar period={selectedPeriod} onPeriodChange={function(p) { dispatch({ type: "SET_PERIOD", period: p }); }} />

      {/* Page header */}
      <div style={{ padding: "32px 48px 32px", flexShrink: 0, background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ fontSize: 36, fontWeight: 500, color: "#080908", lineHeight: "44px", letterSpacing: "-1px" }}>Bank reconciliation</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <PrimaryButton icon={<PlayCircleIcon color="white" />} onClick={function() { setReconciling("__picker__"); setShowResultsMode(false); }}>
              Run reconciliation
            </PrimaryButton>
            <Tooltip text="Upload statements">
              <button onClick={openUploadSidebar}
                style={{ width: 40, height: 40, border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                onMouseEnter={function(e) { e.currentTarget.style.background = "#F5F5F5"; }}
                onMouseLeave={function(e) { e.currentTarget.style.background = "#FFFFFF"; }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.6666 8.74935V5.66602C16.6666 4.26588 16.6666 3.56582 16.3941 3.03104C16.1544 2.56063 15.772 2.17818 15.3016 1.9385C14.7668 1.66602 14.0667 1.66602 12.6666 1.66602H7.33325C5.93312 1.66602 5.23306 1.66602 4.69828 1.9385C4.22787 2.17818 3.84542 2.56063 3.60574 3.03104C3.33325 3.56582 3.33325 4.26588 3.33325 5.66602V14.3327C3.33325 15.7328 3.33325 16.4329 3.60574 16.9677C3.84542 17.4381 4.22787 17.8205 4.69828 18.0602C5.23306 18.3327 5.93312 18.3327 7.33325 18.3327H9.99992M11.6666 9.16602H6.66659M8.33325 12.4993H6.66659M13.3333 5.83268H6.66659M14.9999 17.4993V12.4993M12.4999 14.9993H17.4999" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </Tooltip>
            <Tooltip text="All statements">
              <button
                onClick={function() { setAllStatementsOpen(true); }}
                style={{ width: 40, height: 40, border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                onMouseEnter={function(e) { e.currentTarget.style.background = "#F5F5F5"; }}
                onMouseLeave={function(e) { e.currentTarget.style.background = "#FFFFFF"; }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2.08341 10.0007H4.90172C5.47272 10.0007 5.99472 10.3233 6.25008 10.834C6.50544 11.3447 7.02744 11.6673 7.59844 11.6673H12.4017C12.9727 11.6673 13.4947 11.3447 13.7501 10.834C14.0054 10.3233 14.5274 10.0007 15.0984 10.0007H17.9167M7.47222 3.33398H12.5279C13.4253 3.33398 13.874 3.33398 14.2702 3.47062C14.6205 3.59145 14.9396 3.78865 15.2043 4.04794C15.5037 4.34115 15.7043 4.74248 16.1057 5.54513L17.9111 9.15607C18.0686 9.47106 18.1474 9.62855 18.2029 9.79361C18.2522 9.94019 18.2878 10.091 18.3093 10.2442C18.3334 10.4167 18.3334 10.5928 18.3334 10.9449V12.6673C18.3334 14.0674 18.3334 14.7675 18.0609 15.3023C17.8212 15.7727 17.4388 16.1552 16.9684 16.3948C16.4336 16.6673 15.7335 16.6673 14.3334 16.6673H5.66675C4.26662 16.6673 3.56655 16.6673 3.03177 16.3948C2.56137 16.1552 2.17892 15.7727 1.93923 15.3023C1.66675 14.7675 1.66675 14.0674 1.66675 12.6673V10.9449C1.66675 10.5928 1.66675 10.4167 1.69089 10.2442C1.71234 10.091 1.74795 9.94019 1.79726 9.79361C1.8528 9.62855 1.93155 9.47105 2.08904 9.15607L3.89451 5.54513C4.29583 4.74248 4.4965 4.34115 4.79587 4.04794C5.06061 3.78865 5.37968 3.59145 5.72999 3.47062C6.12613 3.33398 6.57482 3.33398 7.47222 3.33398Z" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 48, paddingTop: 0 }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Stats summary cards */}
          <StatsRow items={[
            { label: "Bank statements received", value: reconciledCount + " of " + bankAccounts.length + " statements", progress: Math.round((reconciledCount / bankAccounts.length) * 100) },
            { label: "Matched GL record", value: glStats.matchedGL + " of " + glStats.totalMatches + " matches", progress: glStats.totalMatches > 0 ? Math.round((glStats.matchedGL / glStats.totalMatches) * 100) : 0 },
            { label: "Accounts reconciled", value: fullyReconciled + " of " + bankAccounts.length + " accounts", progress: Math.round((fullyReconciled / bankAccounts.length) * 100) },
          ]} />

          {/* Account table */}
          <AccountTable
            title="Accounts"
            rows={bankAccounts}
            footerLabel={bankAccounts.length + " accounts"}
            onRunReconciliation={handleRunReconciliation}
            onViewResults={handleViewResults}
            reconciledAccounts={reconciledAccounts}
            reconciledData={reconciledData}
            reconciledDates={reconciledDates}
            reconciledStatuses={reconciledStatuses}
            reconciledCounts={reconciledCounts}
            bankStatements={bankStatements}
            onUploadStatement={handleUploadStatement}
            onAutoReconcile={handleAutoReconcile}
            onResetAccount={handleResetAccount}
            externalReconcilingAccounts={externalReconcilingAccounts}
          />

        </div>
      </div>

      {/* Upload statements sidebar */}
      {uploadStatementsSidebarOpen && (
        <>
          <div onClick={closeUploadSidebar} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", zIndex: 200 }} />
          <UploadStatementsSidebar
            onClose={closeUploadSidebar}
            onUploaded={function(files) {
              closeUploadSidebar();
            }}
          />
        </>
      )}

      {/* All statements sidebar */}
      {allStatementsOpen && (
        <>
          <div onClick={function() { setAllStatementsOpen(false); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", zIndex: 200 }} />
          <AllDocumentsSidebar onClose={function() { setAllStatementsOpen(false); }} />
        </>
      )}

    </div>
  );
}

// NOTE: The full implementations of UploadCard, RecommendationCard, AuditTrailSidebar,
// AuditEntry, SpendMoneySidebar, UploadStatementsSidebar, BatchDraftSidebar,
// SuggestionsBox, ResultsPanel, AccountPicker, BSOptionPicker, WorkflowCard,
// and ReconciliationFlow are extremely large (>2500 lines combined).
// They are included as stub declarations below that reference the source file.
// In the actual prototype build, these will be loaded from the source.
// For now, they are declared as pass-through stubs so the page registers without errors.

// ── UploadCard ────────────────────────────────────────────────────────────────
function UploadCard({ onFileSelected, onFilesSelected, onOpenAllDocs, title, bare, noDash, suggestedFiles, preselectedFiles }) {
  if (title === undefined) title = "Add bank statement";
  if (bare === undefined) bare = false;
  if (noDash === undefined) noDash = false;
  if (!suggestedFiles) suggestedFiles = [];
  if (!preselectedFiles) preselectedFiles = null;
  var [dragging, setDragging] = useState(false);
  var [fileName, setFileName] = useState(null);
  var [selectedFileName, setSelectedFileName] = useState(null);
  var [checkedFiles, setCheckedFiles] = useState(new Set());
  var [sidebarFiles, setSidebarFiles] = useState(null);
  var [localAllDocsOpen, setLocalAllDocsOpen] = useState(false);
  useEffect(function() { if (preselectedFiles && preselectedFiles.length > 0) { setSidebarFiles(preselectedFiles); setSelectedFileName("__sidebar__"); } }, [preselectedFiles]);
  var fileInputRef = useRef(null);

  var handleFile = function(file) {
    if (file) {
      setFileName(file.name);
      setSelectedFileName(file.name);
    }
  };

  var handleFiles = function(fileList) {
    if (!fileList || fileList.length === 0) return;
    var files = Array.from(fileList);
    if (onFilesSelected) {
      var name = files.length === 1 ? files[0].name : files.length + " files";
      setFileName(name); setSelectedFileName(name);
      onFilesSelected(files);
    } else {
      handleFile(files[0]);
    }
  };

  var handleConfirm = function() {
    if (sidebarFiles && sidebarFiles.length > 0) {
      var files = sidebarFiles.map(function(f) { return { name: f.name, type: f.name.endsWith(".csv") ? "text/csv" : "application/pdf" }; });
      if (files.length === 1) { onFileSelected?.(files[0]); } else { onFilesSelected ? onFilesSelected(files) : onFileSelected?.(files[0]); }
      return;
    }
    if (checkedFiles.size > 0 && suggestedFiles.length > 0) {
      var cfiles = [...checkedFiles].map(function(i) { return suggestedFiles[i]; }).map(function(f) { return { name: f.name, type: f.name.endsWith(".csv") ? "text/csv" : "application/pdf" }; });
      if (cfiles.length === 1) { onFileSelected?.(cfiles[0]); }
      else { onFilesSelected ? onFilesSelected(cfiles) : onFileSelected?.(cfiles[0]); }
      return;
    }
    var name = selectedFileName || fileName;
    if (!name || name === "__sidebar__") return;
    onFileSelected?.({ name: name, type: name.endsWith(".csv") ? "text/csv" : name.endsWith(".pdf") ? "application/pdf" : "application/octet-stream" });
  };

  // Compact "file selected" view
  if (selectedFileName) {
    var isCsv = selectedFileName?.endsWith(".csv");
    var isPdf = selectedFileName?.endsWith(".pdf");
    var fileChipIcon = isCsv ? (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="1" y="1" width="18" height="18" rx="3" fill="#EAF2E2"/><path d="M5 7h10M5 10h10M5 13h6" stroke="#05A105" strokeWidth="1.25" strokeLinecap="round"/></svg>
    ) : isPdf ? (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="1" y="1" width="18" height="18" rx="3" fill="#FDECEA"/><path d="M6 7h8M6 10h8M6 13h5" stroke="#E53935" strokeWidth="1.25" strokeLinecap="round"/></svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="1" y="1" width="18" height="18" rx="3" fill="#EEF2FF"/><path d="M6 7h8M6 10h8M6 13h5" stroke="#4C71DF" strokeWidth="1.25" strokeLinecap="round"/></svg>
    );
    var selectedView = (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* File chips */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {sidebarFiles ? sidebarFiles.map(function(f, i) {
            return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, padding: "0 10px", height: 34, boxSizing: "border-box", alignSelf: "flex-start", maxWidth: "100%" }}>
              <FileIcon file={f} width={20} height={20} />
              <span style={{ fontSize: 14, fontWeight: 500, color: "#080908", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</span>
              <button onClick={function() { var next = sidebarFiles.filter(function(_, j) { return j !== i; }); if (next.length === 0) { setSidebarFiles(null); setSelectedFileName(null); } else setSidebarFiles(next); }} style={{ border: "none", background: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", color: "#8C8C8B", flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            );
          }) : checkedFiles.size > 0 ? [...checkedFiles].map(function(i) {
            var f = suggestedFiles[i];
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, padding: "0 10px", height: 34, boxSizing: "border-box", alignSelf: "flex-start", maxWidth: "100%" }}>
                <FileIcon file={f} width={20} height={20} />
                <span style={{ fontSize: 14, fontWeight: 500, color: "#080908", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</span>
                <button onClick={function() { var next = new Set(checkedFiles); next.delete(i); setCheckedFiles(next); if (next.size === 0) setSelectedFileName(null); }} style={{ border: "none", background: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", color: "#8C8C8B", flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              </div>
            );
          }) : (
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, padding: "0 10px", height: 34, boxSizing: "border-box", alignSelf: "flex-start", maxWidth: "100%" }}>
              {fileChipIcon}
              <span style={{ fontSize: 14, fontWeight: 500, color: "#080908", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{selectedFileName}</span>
              <button onClick={function() { setSelectedFileName(null); }} style={{ border: "none", background: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", color: "#8C8C8B", flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
          )}
        </div>
        {/* Footer row */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <SecondaryButton onClick={function() { fileInputRef.current?.click(); }} style={{ height: 36, padding: "0 12px", fontSize: 14 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M2 8h12" stroke="#545453" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Upload file
          </SecondaryButton>
          <SecondaryButton onClick={function() { setLocalAllDocsOpen(true); }} style={{ height: 36, padding: "0 12px", fontSize: 14 }}>
            All documents
          </SecondaryButton>
          <div style={{ flex: 1 }} />
          <button onClick={handleConfirm} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 40, padding: "0 20px", background: "#05A105", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#FFFFFF", fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "#058F05"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "#05A105"; }}>
            Continue
          </button>
        </div>
        {localAllDocsOpen && <AllDocumentsSidebar onClose={function() { setLocalAllDocsOpen(false); }} onSelect={function(docs) { setSidebarFiles(function(prev) { var existing = prev || []; var newFiles = docs.map(function(d) { return { name: d.name, type: "text/csv" }; }).filter(function(f) { return !existing.some(function(e) { return e.name === f.name; }); }); var result = [].concat(existing, newFiles); return result; }); setSelectedFileName("__sidebar__"); setLocalAllDocsOpen(false); }} />}
        <input ref={fileInputRef} type="file" multiple style={{ display: "none" }} onChange={function(e) {
          if (!e.target.files || e.target.files.length === 0) return;
          var newFiles = Array.from(e.target.files).map(function(f) { return { name: f.name, type: f.type }; });
          setSidebarFiles(function(prev) {
            var existing = prev || [];
            var toAdd = newFiles.filter(function(f) { return !existing.some(function(ex) { return ex.name === f.name; }); });
            return [].concat(existing, toAdd);
          });
          setSelectedFileName('__sidebar__');
          e.target.value = '';
        }} />
      </div>
    );
    if (bare) return selectedView;
    return (
      <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, padding: "24px", width: "100%", boxSizing: "border-box", boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)" }}>
        {selectedView}
      </div>
    );
  }

  var inner = (
    <React.Fragment>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        multiple
        onChange={function(e) { handleFiles(e.target.files); }}
      />

      {/* Drop zone */}
      <div
        onDragOver={function(e) { e.preventDefault(); setDragging(true); }}
        onDragLeave={function() { setDragging(false); }}
        onDrop={function(e) { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        style={noDash ? {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 32,
          background: dragging ? "#F4F9F1" : "transparent",
          transition: "background 0.15s",
        } : {
          border: "1.5px dashed " + (dragging ? "#05A105" : "#DBDBDB"),
          borderRadius: 12,
          padding: "36px 24px 28px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: dragging ? "#F4F9F1" : "transparent",
          transition: "background 0.15s, border-color 0.15s",
          marginBottom: 16,
        }}
      >
        {/* 3-document fan illustration */}
        <svg width="86" height="56" viewBox="0 0 86 56" fill="none" style={{ marginBottom: 20 }}>
          <defs>
            <filter id="filter0_d_upload" x="15.84" y="-3.31" width="57.44" height="65.62" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4.96"/>
              <feGaussianBlur stdDeviation="4.13"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            <clipPath id="clip0_upload">
              <rect width="86" height="56" fill="white"/>
            </clipPath>
          </defs>
          <g clipPath="url(#clip0_upload)">
            <path d="M53.2218 13.2854C53.7433 11.3393 55.7436 10.1844 57.6897 10.7059L76.3653 15.71L79.0693 22.1909L82.5746 30.5922L76.6263 52.7914C76.1049 54.7375 74.1046 55.8924 72.1585 55.3709L47.4927 48.7617C45.5466 48.2403 44.3917 46.2399 44.9132 44.2939L53.2218 13.2854Z" fill="#DCF0D7"/>
            <path d="M73.5917 26.0618L76.3652 15.7109L82.5746 30.5931L75.0427 28.5749C74.1084 28.3246 73.6412 28.1994 73.4287 27.8314C73.2162 27.4633 73.3414 26.9961 73.5917 26.0618Z" fill="#D0EFC8"/>
            <path d="M32.7772 13.2854C32.2557 11.3393 30.2554 10.1844 28.3093 10.7059L9.63377 15.71L6.92969 22.1909L3.42441 30.5922L9.37268 52.7914C9.89413 54.7375 11.8945 55.8924 13.8405 55.3709L38.5064 48.7617C40.4524 48.2403 41.6073 46.2399 41.0859 44.2939L32.7772 13.2854Z" fill="#D2DEF6"/>
            <path d="M12.4073 26.0618L9.63379 15.7109L3.42442 30.5931L10.9563 28.5749C11.8907 28.3246 12.3578 28.1994 12.5703 27.8314C12.7828 27.4633 12.6576 26.9961 12.4073 26.0618Z" fill="#BCCFF2"/>
            <g filter="url(#filter0_d_upload)">
              <path d="M24.1064 4.54527C24.1064 2.03499 26.1414 0 28.6517 0H52.7417L58.086 6.92787L65.0139 15.9084V44.5437C65.0139 47.0539 62.9789 49.0889 60.4686 49.0889H28.6517C26.1414 49.0889 24.1064 47.0539 24.1064 44.5437V4.54527Z" fill="#F4F4F2"/>
              <path d="M40.5298 16.6758C45.1308 15.296 40.3532 38.7468 36.769 35.521C32.3247 31.521 53.4258 25.4246 51.4695 31.2906C49.7549 36.4317 35.4016 18.2137 40.5298 16.6758Z" stroke="#FF6056" strokeWidth="1.57261"/>
              <path d="M52.7412 13.3517V0L65.0134 15.9085H55.2979C54.0927 15.9085 53.4901 15.9085 53.1156 15.534C52.7412 15.1596 52.7412 14.557 52.7412 13.3517Z" fill="#D6D6D4"/>
            </g>
          </g>
        </svg>

        {/* Primary instruction */}
        <p style={{ fontSize: 14, fontWeight: 500, color: "#080908", textAlign: "center", margin: "0 0 2px" }}>
          Drag &amp; drop your file here, or
        </p>
        <p style={{ fontSize: 14, textAlign: "center", margin: "0 0 10px" }}>
          <span style={{ color: "#05A105", fontWeight: 600, cursor: "pointer" }} onClick={function() { fileInputRef.current?.click(); }}>
            Choose a file
          </span>{" "}to upload it manually
        </p>

        {/* Subtitle */}
        <p style={{ fontSize: 13, color: "#8C8C8B", margin: "0 0 20px", textAlign: "center" }}>
          Can be any document type
        </p>

        {/* Selected file name */}
        {fileName && (
          <p style={{ fontSize: 12, color: "#545453", marginBottom: 12, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {"📄"} {fileName}
          </p>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          <button onClick={function() { fileInputRef.current?.click(); }}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 16px", background: "#05A105", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#FFFFFF", whiteSpace: "nowrap" }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "#058F05"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "#05A105"; }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M2 8h12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/></svg>
            Upload document
          </button>
          <button onClick={function() { onOpenAllDocs?.(); }}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 16px", background: "#FFFFFF", border: "1px solid #DBDBDB", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908", whiteSpace: "nowrap" }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "#F5F5F5"; e.currentTarget.style.borderColor = "#CFCFD1"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.borderColor = "#DBDBDB"; }}
          >All documents</button>
        </div>
      </div>

      {/* Pre-populated suggested files with checkboxes */}
      {suggestedFiles && suggestedFiles.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 14, color: "#080908", fontWeight: 500, margin: "0 0 10px 0" }}>Previously uploaded</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {suggestedFiles.map(function(f, i) {
              var checked = checkedFiles.has(i);
              return (
                <div key={i}
                  onClick={function() { var next = new Set(checkedFiles); checked ? next.delete(i) : next.add(i); setCheckedFiles(next); }}
                  style={{ display: "flex", alignItems: "center", gap: 10, background: "#FFFFFF", border: "none", boxShadow: checked ? "inset 0 0 0 2px #05A105" : "inset 0 0 0 1px #E9E9EB", borderRadius: 8, padding: 16, cursor: "pointer", transition: "box-shadow 0.15s", boxSizing: "border-box" }}
                  onMouseEnter={function(e) { if (!checked) { e.currentTarget.style.boxShadow = "inset 0 0 0 1px #CFCFD1"; var cb = e.currentTarget.querySelector(".file-checkbox"); if (cb) cb.style.border = "1px solid #05A105"; } }}
                  onMouseLeave={function(e) { if (!checked) { e.currentTarget.style.boxShadow = "inset 0 0 0 1px #E9E9EB"; var cb = e.currentTarget.querySelector(".file-checkbox"); if (cb) cb.style.border = "1px solid #DBDBDB"; } }}
                >
                  <FileIcon file={f} width={24} height={24} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "#080908", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</p>
                    {f.date && <p style={{ fontSize: 14, color: "#7C7C7C", margin: "2px 0 0" }}>{f.date}</p>}
                  </div>
                  {/* Checkbox — right aligned */}
                  <div className="file-checkbox" style={{ width: 22, height: 22, borderRadius: 4, border: "1px solid " + (checked ? "#05A105" : "#DBDBDB"), background: checked ? "#05A105" : "#FFFFFF", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                    {checked && <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
            <PrimaryButton onClick={function() { if (checkedFiles.size > 0) { var files = [...checkedFiles].map(function(i) { return suggestedFiles[i]; }).filter(Boolean); setSidebarFiles(files); setSelectedFileName('__sidebar__'); } }} disabled={checkedFiles.size === 0} style={{ height: 40, padding: "0 20px" }}>
              {checkedFiles.size > 0 ? "Add " + checkedFiles.size + " " + (checkedFiles.size === 1 ? "file" : "files") : "Add file"}
            </PrimaryButton>
          </div>
        </div>
      )}
    </React.Fragment>
  );

  if (bare) return inner;

  return (
    <div style={{
      background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8,
      padding: "24px", width: "100%", boxSizing: "border-box",
      boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
    }}>
      <p style={{ fontSize: 16, fontWeight: 500, color: "#080908", marginBottom: 20 }}>{title}</p>
      {inner}
    </div>
  );
}

// ── RecommendationCard ───────────────────────────────────────────────────────
function RecommendationCard(_ref) {
  var title = _ref.title !== undefined ? _ref.title : "Missing entry";
  var description = _ref.description !== undefined ? _ref.description : "";
  var statusLabel = _ref.statusLabel !== undefined ? _ref.statusLabel : "Unresolved";
  var statusStyle = _ref.statusStyle !== undefined ? _ref.statusStyle : { background: "#FDF8EE", border: "none", color: "#D5A750" };
  var collapsed = _ref.collapsed !== undefined ? _ref.collapsed : false;
  var isIgnored = _ref.isIgnored !== undefined ? _ref.isIgnored : false;
  var tableRow = _ref.tableRow || {};
  var tableRows = _ref.tableRows || null;
  var primaryLabel = _ref.primaryLabel !== undefined ? _ref.primaryLabel : "Create spend money";
  var secondaryLabel = _ref.secondaryLabel !== undefined ? _ref.secondaryLabel : "Upload document";
  var external = _ref.external !== undefined ? _ref.external : false;
  var fileAction = _ref.fileAction || null;
  var score = _ref.score || null;
  var verticalTable = _ref.verticalTable !== undefined ? _ref.verticalTable : false;
  var hideMore = _ref.hideMore !== undefined ? _ref.hideMore : false;
  var onPrimaryAction = _ref.onPrimaryAction;
  var onFileAction = _ref.onFileAction;
  var onSecondaryAction = _ref.onSecondaryAction;
  var onIgnore = _ref.onIgnore;
  var onMore = _ref.onMore;

  var [expanded, setExpanded] = useState(!collapsed && !isIgnored);
  var [collectMenuOpen, setCollectMenuOpen] = useState(false);
  var [collectMenuPos, setCollectMenuPos] = useState({ top: 0, left: 0 });
  var collectBtnRef = useRef(null);
  useEffect(function() { setExpanded(!collapsed && !isIgnored); }, [collapsed, isIgnored]);
  useEffect(function() {
    if (!collectMenuOpen) return;
    var handler = function(e) {
      if (collectBtnRef.current && collectBtnRef.current.contains(e.target)) return;
      setCollectMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return function() { document.removeEventListener("mousedown", handler); };
  }, [collectMenuOpen]);
  var isResolved = collapsed && !isIgnored;
  var showBody = expanded;

  var effectiveStatusLabel = isIgnored ? "Ignored" : statusLabel;
  var effectiveStatusStyle = isIgnored
    ? { background: "#F0F0F0", border: "none", color: "#8C8C8B" }
    : statusStyle;

  var RcPdfIcon = function() { return <InvoiceIcon width={14} height={17} />; };
  var ExternalIcon = function() {
    return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M17.5 7.5L17.5 2.5M17.5 2.5H12.5M17.5 2.5L10.8333 9.16667M8.33333 4.16667H6.5C5.09987 4.16667 4.3998 4.16667 3.86502 4.43915C3.39462 4.67883 3.01217 5.06129 2.77248 5.53169C2.5 6.06647 2.5 6.76654 2.5 8.16667V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5H11.8333C13.2335 17.5 13.9335 17.5 14.4683 17.2275C14.9387 16.9878 15.3212 16.6054 15.5608 16.135C15.8333 15.6002 15.8333 14.9001 15.8333 13.5V11.6667" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    );
  };
  var MoreIcon = function() {
    return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="2.5" r="1.2" fill="#545453"/>
      <circle cx="7" cy="7" r="1.2" fill="#545453"/>
      <circle cx="7" cy="11.5" r="1.2" fill="#545453"/>
    </svg>
    );
  };
  var SuccessIcon = function() {
    return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#05A105"/>
      <path d="M5.5 10.5L8.5 13.5L14.5 7" stroke="#FFFFFF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    );
  };
  var IgnoredIcon = function() {
    return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    );
  };

  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #ECECEC", borderRadius: 8, padding: "20px", fontFamily: "'Inter', sans-serif" }}>
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
        onClick={function() { setExpanded(function(o) { return !o; }); }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {(isResolved || isIgnored) && <SuccessIcon />}
          <span style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>{title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 500, padding: "0 8px", height: 25, display: "inline-flex", alignItems: "center", borderRadius: 4, background: effectiveStatusStyle.background, border: effectiveStatusStyle.border, color: effectiveStatusStyle.color, whiteSpace: "nowrap", transition: "all 0.4s ease" }}>
            {effectiveStatusLabel}
          </span>
          <div style={{ display: "flex", transform: showBody ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
            <ChevronUpIcon />
          </div>
        </div>
      </div>
      <div style={{ overflow: "hidden", maxHeight: showBody ? 1200 : 0, opacity: showBody ? 1 : 0, transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease" }}>
        <p style={{ fontSize: 14, color: "#2A2A2A", lineHeight: "20px", margin: "16px 0 14px" }}>{description}</p>
        <div style={{ marginBottom: isResolved ? 0 : 14 }}>
          {verticalTable ? (
            <div style={{ border: "1px solid #E9E9EB", borderRadius: 8, overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
              {Object.entries(tableRow).map(function(_entry, i, arr) {
                var key = _entry[0]; var val = _entry[1];
                return (
                <div key={key} style={{ display: "grid", gridTemplateColumns: "180px 1fr", borderBottom: i < arr.length - 1 ? "1px solid #E9E9EB" : "none", background: "#FFFFFF" }}>
                  <div style={{ padding: "12px 16px", fontSize: 14, fontWeight: 400, color: "#000000", borderRight: "1px solid #E9E9EB" }}>{key}</div>
                  <div style={{ padding: "12px 16px", fontSize: 14, color: "#080908" }}>
                    {val && typeof val === "object" && val.strikethrough
                      ? <span style={{ textDecoration: "line-through", color: "#000000" }}>{val.text}</span>
                      : val}
                  </div>
                </div>
                );
              })}
            </div>
          ) : (
            <DataTable
              columns={[
                { key: "state",   label: "State",     width: "1fr" },
                { key: "contact", label: "Contact",   width: "1.4fr" },
                { key: "date",    label: "Date",      width: "1fr" },
                { key: "amount",  label: "Amount",    width: "0.8fr" },
                { key: "email",   label: "Email b...", width: "0.9fr" },
              ]}
              rows={tableRows && tableRows.length ? tableRows : [tableRow]}
            />
          )}
        </div>
        {(!isResolved || isIgnored) && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <PrimaryButton style={{ height: 40, padding: "0 14px", fontSize: 14, borderRadius: 8 }} icon={external ? <ExternalIcon /> : undefined} onClick={onPrimaryAction}>
              {primaryLabel}
            </PrimaryButton>
            {!isIgnored && fileAction ? (
              <SecondaryButton style={{ height: 40, padding: "0 12px", fontSize: 14, borderRadius: 8, borderColor: "#EFF1F4" }} icon={null} onClick={onFileAction}>
                <RcPdfIcon />{fileAction}
              </SecondaryButton>
            ) : !isIgnored && secondaryLabel ? (
              <SecondaryButton style={{ height: 40, padding: "0 12px", fontSize: 14, borderRadius: 8, borderColor: "#EFF1F4" }} onClick={onSecondaryAction || onFileAction}>
                {secondaryLabel}
              </SecondaryButton>
            ) : null}
            {!hideMore && !isIgnored && (fileAction || secondaryLabel) && (
              <div style={{ position: "relative" }}>
                <button
                  ref={collectBtnRef}
                  onClick={function() {
                    var rect = collectBtnRef.current.getBoundingClientRect();
                    setCollectMenuPos({ top: rect.bottom + 4, left: rect.left });
                    setCollectMenuOpen(function(o) { return !o; });
                  }}
                  style={{ width: 40, height: 40, border: "1px solid #EFF1F4", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.15s" }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = "#F5F5F5"; }}
                  onMouseLeave={function(e) { e.currentTarget.style.background = "#FFFFFF"; }}
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M9.99984 10.8333C10.4601 10.8333 10.8332 10.4602 10.8332 9.99992C10.8332 9.53968 10.4601 9.16659 9.99984 9.16659C9.5396 9.16659 9.1665 9.53968 9.1665 9.99992C9.1665 10.4602 9.5396 10.8333 9.99984 10.8333Z" fill="#2A2A2A" stroke="#2A2A2A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.99984 4.99992C10.4601 4.99992 10.8332 4.62682 10.8332 4.16659C10.8332 3.70635 10.4601 3.33325 9.99984 3.33325C9.5396 3.33325 9.1665 3.70635 9.1665 4.16659C9.1665 4.62682 9.5396 4.99992 9.99984 4.99992Z" fill="#2A2A2A" stroke="#2A2A2A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.99984 16.6666C10.4601 16.6666 10.8332 16.2935 10.8332 15.8333C10.8332 15.373 10.4601 14.9999 9.99984 14.9999C9.5396 14.9999 9.1665 15.373 9.1665 15.8333C9.1665 16.2935 9.5396 16.6666 9.99984 16.6666Z" fill="#2A2A2A" stroke="#2A2A2A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {collectMenuOpen && (
                  <div style={{ position: "fixed", top: collectMenuPos.top, left: collectMenuPos.left, background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", zIndex: 9999, minWidth: 200, padding: "4px" }}>
                    <button
                      onClick={function() { setCollectMenuOpen(false); }}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", fontSize: 14, color: "#080908", background: "transparent", border: "none", cursor: "pointer", borderRadius: 6, textAlign: "left", whiteSpace: "nowrap" }}
                      onMouseEnter={function(e) { e.currentTarget.style.background = "#F5F5F5"; }}
                      onMouseLeave={function(e) { e.currentTarget.style.background = "transparent"; }}
                    >
                      View in collect documents
                    </button>
                  </div>
                )}
              </div>
            )}
            {!hideMore && !isIgnored && onMore && (
              <button style={{ width: 40, height: 40, border: "1px solid #EFF1F4", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                onMouseEnter={function(e) { e.currentTarget.style.background = "#F5F5F5"; }}
                onMouseLeave={function(e) { e.currentTarget.style.background = "#FFFFFF"; }}
                onClick={onMore}
              ><MoreIcon /></button>
            )}
            {!isIgnored && <><div style={{ flex: 1 }} />
            <button style={{ height: 40, padding: "0 12px", border: "none", borderRadius: 8, background: "#FCEFEC", fontSize: 14, fontWeight: 500, color: "#C8543A", cursor: "pointer", whiteSpace: "nowrap" }}
              onMouseEnter={function(e) { e.currentTarget.style.background = "#F9E5E1"; }}
              onMouseLeave={function(e) { e.currentTarget.style.background = "#FCEFEC"; }}
              onClick={onIgnore}
            >Ignore suggestion</button></>}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Audit Trail Sidebar ───────────────────────────────────────────────────────
function AuditTrailSidebar({ onClose }) {
  var [visible, setVisible] = useState(false);
  var [closing, setClosing] = useState(false);
  useEffect(function() { requestAnimationFrame(function() { setVisible(true); }); }, []);

  var handleClose = function() {
    setClosing(true);
    setTimeout(onClose, 340);
  };

  var AUDIT_DATA = [
    {
      date: "28/04/2026",
      entries: [
        { time: "14:12", color: "#05A105", action: "Review re-run", actor: "Daniel Victorin", details: "VAT and miscoding review re-run triggered manually." },
        { time: "13:55", color: "#05A105", action: "Suggestion resolved", actor: "Daniel Victorin", details: "Suggestion resolved: Non-reclaimable VAT on client entertainment (£340.00). Marked as reviewed and corrected." },
        { time: "13:41", color: "#8C8C8B", action: "Suggestion ignored", actor: "Daniel Victorin", details: "Suggestion ignored: Late VAT claim outside HMRC 4-year limit (£125.00)." },
        { time: "13:30", color: "#4C71DF", action: "Suggestion resolved", actor: "Mimo AI Agent", details: "Duplicate entry from Premier Office Supplies removed. Input VAT adjustment: –£90.00." },
      ],
    },
    {
      date: "23/04/2026",
      entries: [
        { time: "15:36", color: "#05A105", action: "Suggestion resolved", actor: "Daniel Victorin", details: "Wrong VAT code on Yorkshire Tea Estates corrected. VAT reclaimed: £480.00." },
        { time: "15:20", color: "#05A105", action: "Suggestion resolved", actor: "Daniel Victorin", details: "Missing VAT number added for Clifton & Harrow Supplies. VAT reclaimed: £210.00." },
        { time: "14:58", color: "#C8543A", action: "Review started", actor: "Daniel Victorin", details: "VAT and miscoding review initiated for April 2026. 184 transactions analysed, 6 suggestions generated." },
      ],
    },
    {
      date: "22/04/2026",
      entries: [
        { time: "09:10", color: "#4C71DF", action: "Transactions imported", actor: "Mimo AI Agent", details: "184 transactions pulled from Xero for April 2026. VAT codes and rates scanned." },
      ],
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div onClick={handleClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", zIndex: 200, opacity: visible && !closing ? 1 : 0, transition: "opacity 0.32s ease" }} />

      {/* Sidebar */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 600,
        background: "#FFFFFF", zIndex: 201,
        boxShadow: "-4px 0 24px rgba(0,0,0,0.10)",
        transform: visible && !closing ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
      }}>
        {/* Header */}
        <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid #ECECEC", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: 20, fontWeight: 500, color: "#080908", margin: 0, letterSpacing: "-0.3px" }}>Audit log</h2>
          <button onClick={handleClose} style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none"><rect width="30" height="30" rx="15" fill="#F5F5F5"/><path d="M20 10L10 20M10 10L20 20" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 24px" }}>
          {AUDIT_DATA.map(function(_group) {
            var date = _group.date; var entries = _group.entries;
            return (
            <div key={date} style={{ marginBottom: 20 }}>
              {/* Date header */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F5F5F5", borderRadius: 8, padding: "8px 12px", marginBottom: 12 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 2v4M8 2v4M3 10h18" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#545453" }}>{date}</span>
              </div>

              {/* Entries */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {entries.map(function(entry, i) {
                  return <AuditEntry key={i} time={entry.time} color={entry.color} action={entry.action} actor={entry.actor} details={entry.details} />;
                })}
              </div>
            </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ flexShrink: 0, borderTop: "1px solid #ECECEC", padding: "16px 24px" }}>
          <button
            onClick={handleClose}
            style={{ width: "100%", height: 44, border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908", fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "#F5F5F5"; e.currentTarget.style.borderColor = "#CFCFD1"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.borderColor = "#E9E9EB"; }}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

function AuditEntry({ time, color, action, actor, details }) {
  var [open, setOpen] = useState(false);
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 10, overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "flex-start", padding: "14px 16px", gap: 12 }}>
        <span style={{ fontSize: 14, color: "#8C8C8B", whiteSpace: "nowrap", minWidth: 36, paddingTop: 1 }}>{time}</span>
        <div style={{ width: 3, alignSelf: "stretch", borderRadius: 2, background: color, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14, color: "#545453", margin: "0 0 2px" }}>{action}</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#080908", margin: 0 }}>{actor}</p>
        </div>
      </div>
      {/* Details section */}
      <div style={{ borderTop: "1px solid #F0F0F0", padding: "0 16px" }}>
        <button onClick={function() { setOpen(function(o) { return !o; }); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "none", border: "none", padding: "10px 0", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#545453" }}>Details</span>
          <div style={{ height: 1, flex: 1, background: "#ECECEC", margin: "0 10px" }} />
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(0deg)" : "rotate(180deg)" }}>
            <path d="M3 9.5L7 5.5L11 9.5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div style={{ overflow: "hidden", maxHeight: open ? 200 : 0, opacity: open ? 1 : 0, transition: "max-height 0.3s ease, opacity 0.2s ease" }}>
          <p style={{ fontSize: 13, color: "#545453", lineHeight: "20px", margin: "0 0 12px" }}>{details}</p>
        </div>
      </div>
    </div>
  );
}

// ── Spend Money Sidebar ───────────────────────────────────────────────────────
function SpendMoneySidebar({ contact, amount, date, onClose, onPublish }) {
  if (contact === undefined) contact = "Yorkshire Tea Estates";
  if (amount === undefined) amount = "£240.00";
  if (date === undefined) date = "24 Feb 2026";
  var [spentAs, setSpentAs] = useState("spend");
  var [amountsAre, setAmountsAre] = useState("Tax inclusive");
  var [reference, setReference] = useState("YTE-26-03");
  var [bankStatement, setBankStatement] = useState(contact);
  var [issueDate, setIssueDate] = useState(date);
  var [visible, setVisible] = useState(false);
  var [detailsOpen, setDetailsOpen] = useState(true);
  var [lineItemsOpen, setLineItemsOpen] = useState(true);
  var [publishing, setPublishing] = useState(false);
  useEffect(function() { requestAnimationFrame(function() { setVisible(true); }); }, []);

  var handlePublish = function() {
    setPublishing(true);
    setTimeout(function() {
      setVisible(false);
      setTimeout(function() {
        onPublish?.();
        onClose();
      }, 320);
    }, 2500);
  };

  var inputStyle = {
    width: "100%", padding: "9px 12px", border: "1px solid #E9E9EB", borderRadius: 8,
    fontSize: 14, color: "#080908", background: "#FFFFFF", outline: "none",
    fontFamily: "'Inter', sans-serif", boxSizing: "border-box",
  };
  var labelStyle = { fontSize: 14, fontWeight: 500, color: "#000000", marginBottom: 6, display: "block" };
  var sectionHeaderStyle = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "12px 16px", cursor: "pointer", background: "none", border: "none",
    width: "100%",
  };
  var sectionBarStyle = {
    margin: "16px 16px 0", background: "#F5F5F5", borderRadius: 8,
  };

  return (
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, width: 600,
      background: "#FFFFFF", boxShadow: "-4px 0 24px rgba(0,0,0,0.10)",
      display: "flex", flexDirection: "column", zIndex: 201,
      transform: visible ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #ECECEC", flexShrink: 0, height: 112, boxSizing: "border-box" }}>
        <span style={{ fontSize: 24, fontWeight: 500, color: "#080908" }}>Review spend money</span>
        <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: "50%", flexShrink: 0, padding: 0 }}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <rect width="30" height="30" rx="15" fill="#F5F5F5"/>
            <path d="M20 10L10 20M10 10L20 20" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* Details section */}
        <div>
          <div style={sectionBarStyle}>
            <button style={sectionHeaderStyle} onClick={function() { setDetailsOpen(function(o) { return !o; }); }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#080908" }}>Details</span>
              <div style={{ transform: detailsOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s", display: "flex" }}>
                <ChevronUpIcon />
              </div>
            </button>
          </div>
          {detailsOpen && (
            <div style={{ padding: "16px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>Bank statement line</label>
                <input style={inputStyle} value={bankStatement} onChange={function(e) { setBankStatement(e.target.value); }} />
              </div>
              <div>
                <label style={labelStyle}>Issue date</label>
                <div style={{ position: "relative" }}>
                  <input style={Object.assign({}, inputStyle, { paddingRight: 36 })} value={issueDate} onChange={function(e) { setIssueDate(e.target.value); }} />
                  <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%) rotate(180deg)", pointerEvents: "none", display: "flex" }}>
                    <ChevronUpIcon />
                  </div>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Reference</label>
                <input style={inputStyle} value={reference} onChange={function(e) { setReference(e.target.value); }} />
              </div>
              <div>
                <label style={labelStyle}>Spent as</label>
                <div style={{ display: "flex", gap: 24 }}>
                  {[["spend", "Spend money"], ["receive", "Receive money"]].map(function(_pair) {
                    var val = _pair[0]; var lbl = _pair[1];
                    return (
                    <label key={val} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "#080908" }}>
                      <div onClick={function() { setSpentAs(val); }} style={{
                        width: 18, height: 18, borderRadius: "50%", border: "2px solid " + (spentAs === val ? "#05A105" : "#CFCFD1"),
                        background: spentAs === val ? "#05A105" : "#FFFFFF",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer",
                      }}>
                        {spentAs === val && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFFFFF" }} />}
                      </div>
                      {lbl}
                    </label>
                    );
                  })}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Amounts are</label>
                <div style={{ position: "relative" }}>
                  <select style={Object.assign({}, inputStyle, { appearance: "none", paddingRight: 36, cursor: "pointer" })} value={amountsAre} onChange={function(e) { setAmountsAre(e.target.value); }}>
                    <option>Tax inclusive</option>
                    <option>Tax exclusive</option>
                    <option>No tax</option>
                  </select>
                  <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%) rotate(180deg)", pointerEvents: "none", display: "flex" }}>
                    <ChevronUpIcon />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Line items section */}
        <div>
          <div style={sectionBarStyle}>
            <button style={sectionHeaderStyle} onClick={function() { setLineItemsOpen(function(o) { return !o; }); }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#080908" }}>Line items</span>
              <div style={{ transform: lineItemsOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s", display: "flex" }}>
                <ChevronUpIcon />
              </div>
            </button>
          </div>
          {lineItemsOpen && (
          <div style={{ padding: "16px 28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 8, marginBottom: 8, fontSize: 12, fontWeight: 500, color: "#8C8C8B", borderBottom: "1px solid #ECECEC", paddingBottom: 8 }}>
              <span>Description</span>
              <span style={{ textAlign: "right" }}>Actions</span>
              <span style={{ width: 24 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 8, alignItems: "center", padding: "10px 0", borderBottom: "1px solid #ECECEC" }}>
              <div>
                <div style={{ fontSize: 14, color: "#080908", fontWeight: 500 }}>{contact} Spend Money</div>
                <div style={{ fontSize: 12, color: "#8C8C8B", marginTop: 2 }}>Cost of Goods Sold</div>
              </div>
              <span style={{ fontSize: 14, color: "#080908", fontWeight: 500 }}>{amount}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ border: "none", background: "none", cursor: "pointer", padding: 4, color: "#8C8C8B", display: "flex" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 11.5V14H4.5L11.87 6.63L9.37 4.13L2 11.5ZM13.71 4.79a.996.996 0 000-1.41L12.21 1.88a.996.996 0 00-1.41 0l-1.18 1.18 2.5 2.5 1.59-1.77z" fill="#8C8C8B"/></svg>
                </button>
                <button style={{ border: "none", background: "none", cursor: "pointer", padding: 4, color: "#C8543A", display: "flex" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5 4V2.667A.667.667 0 015.667 2h4.666A.667.667 0 0111 2.667V4M6.333 7.333v4M9.667 7.333v4M3.333 4l.667 9.333A.667.667 0 004.667 14h6.666a.667.667 0 00.667-.667L12.667 4" stroke="#C8543A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12, marginBottom: 16 }}>
              {[["£48.00", "Sub total"], ["£192.00", "Tax"], [amount, "Total"]].map(function(_pair) {
                var val = _pair[0]; var lbl = _pair[1];
                return (
                <div key={lbl} style={{ display: "flex", justifyContent: "flex-end", gap: 32, fontSize: lbl === "Total" ? 14 : 13, fontWeight: lbl === "Total" ? 600 : 400, color: "#080908" }}>
                  <span style={{ color: lbl === "Total" ? "#080908" : "#8C8C8B" }}>{lbl}</span>
                  <span style={{ minWidth: 70, textAlign: "right" }}>{val}</span>
                </div>
                );
              })}
            </div>
            <button style={{
              width: "100%", padding: "10px 16px", border: "1.5px dashed #CFCFD1", borderRadius: 8,
              background: "none", cursor: "pointer", fontSize: 14, color: "#8C8C8B", textAlign: "center",
            }}
              onMouseEnter={function(e) { e.currentTarget.style.borderColor = "#05A105"; e.currentTarget.style.color = "#05A105"; }}
              onMouseLeave={function(e) { e.currentTarget.style.borderColor = "#CFCFD1"; e.currentTarget.style.color = "#8C8C8B"; }}
            >
              Add line item
            </button>
          </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 24px", borderTop: "1px solid #ECECEC", display: "flex", gap: 12, flexShrink: 0 }}>
        <button onClick={onClose} style={{
          flex: 1, padding: "10px 16px", border: "1px solid #E9E9EB", borderRadius: 8,
          background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908",
        }}
          onMouseEnter={function(e) { e.currentTarget.style.background = "#FAFAFA"; }}
          onMouseLeave={function(e) { e.currentTarget.style.background = "#FFFFFF"; }}
        >
          Cancel
        </button>
        <button
          onClick={!publishing ? handlePublish : undefined}
          style={{
            flex: 2, padding: "10px 16px", border: publishing ? "1px solid #E9E9EB" : "none", borderRadius: 8,
            background: publishing ? "#F5F5F5" : "#05A105", cursor: publishing ? "default" : "pointer",
            fontSize: 14, fontWeight: 500, color: "#FFFFFF",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={function(e) { if (!publishing) e.currentTarget.style.background = "#058F05"; }}
          onMouseLeave={function(e) { if (!publishing) e.currentTarget.style.background = "#05A105"; }}
        >
          {publishing ? (
            <div style={{
              width: 20, height: 20, borderRadius: "50%",
              border: "2.5px solid #E9E9EB",
              borderTopColor: "#05A105",
              animation: "spin 0.75s linear infinite",
            }} />
          ) : "Create spend money and publish"}
        </button>
      </div>
    </div>
  );
}

// ── Upload Statements Sidebar ─────────────────────────────────────────────────
function UploadStatementsSidebar({ onClose, onUploaded }) {
  var [visible, setVisible] = useState(false);
  var [copied, setCopied] = useState(false);
  var [dragging, setDragging] = useState(false);
  var [droppedFiles, setDroppedFiles] = useState([]);
  var [uploading, setUploading] = useState(false);
  var [allDocsOpen, setAllDocsOpen] = useState(false);
  var fileInputRef = useRef(null);
  var email = "associatetesting@dev.platform.mimohq.com";

  useEffect(function() { requestAnimationFrame(function() { setVisible(true); }); }, []);

  var handleClose = function() {
    setVisible(false);
    setTimeout(onClose, 320);
  };

  var handleCopy = function() {
    navigator.clipboard?.writeText(email).catch(function() {});
    setCopied(true);
    setTimeout(function() { setCopied(false); }, 2000);
  };

  var startUploading = function(files) {
    setUploading(true);
    setTimeout(function() {
      onUploaded?.(files);
      setVisible(false);
      setTimeout(onClose, 320);
    }, 2000);
  };

  var handleFiles = function(fileList) {
    if (!fileList || fileList.length === 0) return;
    var files = Array.from(fileList);
    setDroppedFiles(function(prev) { return [].concat(prev, files); });
    startUploading(files);
  };

  var handleDocsSelected = function(docs) {
    var files = docs.map(function(d) { return { name: d.name, type: d.type === "csv" ? "text/csv" : "application/pdf" }; });
    setDroppedFiles(files);
    startUploading(files);
  };

  return (
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, width: 600,
      background: "#FFFFFF", boxShadow: "-4px 0 24px rgba(0,0,0,0.10)",
      display: "flex", flexDirection: "column", zIndex: 201,
      transform: visible ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #ECECEC", flexShrink: 0, height: 112, boxSizing: "border-box" }}>
        <span style={{ fontSize: 24, fontWeight: 500, color: "#080908" }}>Upload statements</span>
        <button onClick={handleClose} style={{ border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: "50%", flexShrink: 0, padding: 0 }}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <rect width="30" height="30" rx="15" fill="#F5F5F5"/>
            <path d="M20 10L10 20M10 10L20 20" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        {uploading ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, minHeight: 300 }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ animation: "spin 0.75s linear infinite", flexShrink: 0 }}>
              <path d="M18 3A15 15 0 1 1 3 18" stroke="#05A105" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <div style={{ fontSize: 20, fontWeight: 500, color: "#080908" }}>Uploading statements</div>
            <div style={{ fontSize: 14, color: "#8C8C8B" }}>Please wait while we're uploading your documents.</div>
          </div>
        ) : (<>

        {/* Forward a document */}
        <div style={{ border: "1px solid #E9E9EB", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, height: 78, boxSizing: "border-box", flexShrink: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#080908" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 6L12 13L2 6" stroke="#080908" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#080908", marginBottom: 2 }}>Forward a document</div>
            <div style={{ fontSize: 13, color: "#8C8C8B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email}</div>
          </div>
          <button onClick={handleCopy}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 34, padding: "0 12px", border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#080908", flexShrink: 0, whiteSpace: "nowrap" }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "#F5F5F5"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "#FFFFFF"; }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="9" width="13" height="13" rx="2" stroke="#080908" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 15H4C2.9 15 2 14.1 2 13V4C2 2.9 2.9 2 4 2H13C14.1 2 15 2.9 15 4V5" stroke="#080908" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={function(e) { e.preventDefault(); setDragging(true); }}
          onDragLeave={function(e) { if (!e.currentTarget.contains(e.relatedTarget)) setDragging(false); }}
          onDrop={function(e) { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
          style={{
            border: "1.5px dashed " + (dragging ? "#05A105" : "#DBDBDB"),
            borderRadius: 12,
            padding: "36px 24px 28px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: dragging ? "#F4F9F1" : "transparent",
            transition: "background 0.15s, border-color 0.15s",
            flex: 1,
          }}
        >
          {/* 3-document fan illustration */}
          <svg width="86" height="56" viewBox="0 0 86 56" fill="none" style={{ marginBottom: 20 }}>
            <defs>
              <filter id="filter0_d_upload_ss" x="15.84" y="-3.31" width="57.44" height="65.62" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4.96"/>
                <feGaussianBlur stdDeviation="4.13"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
              </filter>
              <clipPath id="clip0_upload_ss">
                <rect width="86" height="56" fill="white"/>
              </clipPath>
            </defs>
            <g clipPath="url(#clip0_upload_ss)">
              <path d="M53.2218 13.2854C53.7433 11.3393 55.7436 10.1844 57.6897 10.7059L76.3653 15.71L79.0693 22.1909L82.5746 30.5922L76.6263 52.7914C76.1049 54.7375 74.1046 55.8924 72.1585 55.3709L47.4927 48.7617C45.5466 48.2403 44.3917 46.2399 44.9132 44.2939L53.2218 13.2854Z" fill="#DCF0D7"/>
              <path d="M73.5917 26.0618L76.3652 15.7109L82.5746 30.5931L75.0427 28.5749C74.1084 28.3246 73.6412 28.1994 73.4287 27.8314C73.2162 27.4633 73.3414 26.9961 73.5917 26.0618Z" fill="#D0EFC8"/>
              <path d="M32.7772 13.2854C32.2557 11.3393 30.2554 10.1844 28.3093 10.7059L9.63377 15.71L6.92969 22.1909L3.42441 30.5922L9.37268 52.7914C9.89413 54.7375 11.8945 55.8924 13.8405 55.3709L38.5064 48.7617C40.4524 48.2403 41.6073 46.2399 41.0859 44.2939L32.7772 13.2854Z" fill="#D2DEF6"/>
              <path d="M12.4073 26.0618L9.63379 15.7109L3.42442 30.5931L10.9563 28.5749C11.8907 28.3246 12.3578 28.1994 12.5703 27.8314C12.7828 27.4633 12.6576 26.9961 12.4073 26.0618Z" fill="#BCCFF2"/>
              <g filter="url(#filter0_d_upload_ss)">
                <path d="M24.1064 4.54527C24.1064 2.03499 26.1414 0 28.6517 0H52.7417L58.086 6.92787L65.0139 15.9084V44.5437C65.0139 47.0539 62.9789 49.0889 60.4686 49.0889H28.6517C26.1414 49.0889 24.1064 47.0539 24.1064 44.5437V4.54527Z" fill="#F4F4F2"/>
                <path d="M40.5298 16.6758C45.1308 15.296 40.3532 38.7468 36.769 35.521C32.3247 31.521 53.4258 25.4246 51.4695 31.2906C49.7549 36.4317 35.4016 18.2137 40.5298 16.6758Z" stroke="#FF6056" strokeWidth="1.57261"/>
                <path d="M52.7412 13.3517V0L65.0134 15.9085H55.2979C54.0927 15.9085 53.4901 15.9085 53.1156 15.534C52.7412 15.1596 52.7412 14.557 52.7412 13.3517Z" fill="#D6D6D4"/>
              </g>
            </g>
          </svg>

          <p style={{ fontSize: 14, fontWeight: 500, color: "#080908", textAlign: "center", margin: "0 0 2px" }}>
            Drag &amp; drop your file here, or
          </p>
          <p style={{ fontSize: 14, textAlign: "center", margin: "0 0 10px" }}>
            <span style={{ color: "#05A105", fontWeight: 600, cursor: "pointer" }} onClick={function() { fileInputRef.current?.click(); }}>
              Choose a file
            </span>{" "}to upload it manually
          </p>
          <p style={{ fontSize: 13, color: "#8C8C8B", margin: "0 0 20px", textAlign: "center" }}>
            Can be any document type
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={function() { fileInputRef.current?.click(); }}
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 20px", background: "#05A105", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#FFFFFF" }}
              onMouseEnter={function(e) { e.currentTarget.style.background = "#058F05"; }}
              onMouseLeave={function(e) { e.currentTarget.style.background = "#05A105"; }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v12M2 8h12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Upload document
            </button>
            <button
              onClick={function() { setAllDocsOpen(true); }}
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908" }}
              onMouseEnter={function(e) { e.currentTarget.style.background = "#F5F5F5"; }}
              onMouseLeave={function(e) { e.currentTarget.style.background = "#FFFFFF"; }}>
              All documents
            </button>
          </div>
          {droppedFiles.length > 0 && (
            <div style={{ marginTop: 16, width: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
              {droppedFiles.map(function(f, i) {
                return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: "#F5F5F5", borderRadius: 6, fontSize: 13, color: "#080908" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="#545453" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="#545453" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</span>
                  <button onClick={function() { setDroppedFiles(function(prev) { return prev.filter(function(_, j) { return j !== i; }); }); }} style={{ border: "none", background: "none", cursor: "pointer", padding: 2, display: "flex", color: "#8C8C8B", fontSize: 14 }}>{"✕"}</button>
                </div>
                );
              })}
            </div>
          )}
          <input ref={fileInputRef} type="file" multiple style={{ display: "none" }} onChange={function(e) { handleFiles(e.target.files); }} />
        </div>

        {/* Separator */}
        <div style={{ height: 1, background: "#E9E9EB", flexShrink: 0 }} />

        {/* Close button */}
        <button
          onClick={handleClose}
          style={{ width: "100%", height: 44, border: "1px solid #E9E9EB", background: "#FFFFFF", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908", flexShrink: 0 }}
          onMouseEnter={function(e) { e.currentTarget.style.background = "#F5F5F5"; }}
          onMouseLeave={function(e) { e.currentTarget.style.background = "#FFFFFF"; }}>
          Close
        </button>
        </>)}
      </div>

      {/* All Documents overlay */}
      {allDocsOpen && (
        <AllDocumentsSidebar
          onClose={function() { setAllDocsOpen(false); }}
          onSelect={function(docs) { handleDocsSelected(docs); }}
        />
      )}
    </div>
  );
}

// ── Batch Draft Sidebar ───────────────────────────────────────────────────────
function BatchDraftSidebar({ contact, amount, date, fileName, onClose, onConfirm }) {
  if (contact === undefined) contact = "Yorkshire Tea Estates";
  if (amount === undefined) amount = "£240.00";
  if (date === undefined) date = "23 March 2026";
  if (fileName === undefined) fileName = "yte-invoice172.pdf";
  var [visible, setVisible] = useState(false);
  var [activeTab, setActiveTab] = useState("Document");
  var [confirming, setConfirming] = useState(false);

  useEffect(function() { requestAnimationFrame(function() { setVisible(true); }); }, []);

  var handleConfirm = function() {
    setConfirming(true);
    setTimeout(function() {
      setVisible(false);
      setTimeout(function() { onConfirm?.(); onClose(); }, 320);
    }, 2000);
  };

  var cardStyle = { border: "1px solid #E9E9EB", borderRadius: 12, background: "#FFFFFF" };
  var tabs = ["Document", "Notes", "Audit log"];

  return (
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, width: 600,
      background: "#FFFFFF", boxShadow: "-4px 0 24px rgba(0,0,0,0.10)",
      display: "flex", flexDirection: "column", zIndex: 201,
      transform: visible ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 28px", borderBottom: "1px solid #ECECEC", flexShrink: 0 }}>
        <span style={{ fontSize: 22, fontWeight: 600, color: "#080908" }}>{contact}</span>
        <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", display: "flex", padding: 4 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="#545453" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Bank account card */}
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <BankBuildingIcon size={18} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>Lloyds Bank - Business</div>
                <div style={{ fontSize: 14, color: "#7C7C7C", marginTop: 1 }}>1048 9418-2251</div>
              </div>
            </div>
            <button style={{ padding: "7px 14px", border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908" }}
              onMouseEnter={function(e) { e.currentTarget.style.background = "#FAFAFA"; }}
              onMouseLeave={function(e) { e.currentTarget.style.background = "#FFFFFF"; }}
            >Copy upload link</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", borderTop: "1px solid #F0F0F0" }}>
            <div style={{ flex: 1, padding: "14px 18px" }}>
              <div style={{ fontSize: 14, color: "#7C7C7C", marginBottom: 4 }}>Amount</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>-{amount}</div>
            </div>
            <div style={{ width: 1, background: "#F0F0F0", height: 28, flexShrink: 0 }} />
            <div style={{ flex: 1, padding: "14px 18px" }}>
              <div style={{ fontSize: 14, color: "#7C7C7C", marginBottom: 4 }}>Date</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>{date}</div>
            </div>
          </div>
        </div>

        {/* Batch info card */}
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 18px" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <PencilIcon size={16} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>Lloyd Bank - Operations GBP</div>
              <div style={{ fontSize: 14, color: "#7C7C7C", marginTop: 1 }}>Drafted batch</div>
            </div>
          </div>
          <div style={{ margin: "0 18px", border: "1px solid #E9E9EB", borderRadius: 8 }}>
            <div style={{ display: "flex", padding: "10px 0", alignItems: "center" }}>
              {[
                { icon: <FileQuestionIcon />, label: "8 requests" },
                { icon: <BankStatIcon />, label: "2 accounts" },
                { icon: <UsersCheckIcon />, label: "2 assignees" },
              ].map(function(_item, i) {
                return (
                <React.Fragment key={_item.label}>
                  {i > 0 && <div style={{ width: 1, background: "#E9E9EB", height: 14, flexShrink: 0 }} />}
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: "#1F2024", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    {_item.icon} {_item.label}
                  </span>
                </React.Fragment>
                );
              })}
            </div>
          </div>
          <div style={{ margin: "12px 18px 0", borderTop: "1px solid #F0F0F0" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 0, padding: "16px 18px" }}>
            {[["S", "Sara Thompson"], ["O", "Oliver Davies"]].map(function(_pair, i) {
              var initial = _pair[0]; var name = _pair[1];
              return (
              <React.Fragment key={name}>
                {i > 0 && <div style={{ width: 1, background: "#E9E9EB", alignSelf: "stretch", margin: "0 16px" }} />}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#F0F5FC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#6389CF" }}>{initial}</span>
                  </div>
                  <span style={{ fontSize: 14, color: "#080908" }}>{name}</span>
                </div>
              </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Archive request */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", border: "1px solid #E9E9EB", borderRadius: 12, background: "#FFFFFF" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#080908", marginBottom: 2 }}>Archive request</div>
            <div style={{ fontSize: 14, color: "#7C7C7C" }}>If no document needed, archive this request</div>
          </div>
          <button style={{ padding: "7px 14px", border: "none", borderRadius: 8, background: "#FCEFEC", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#C8543A", whiteSpace: "nowrap", flexShrink: 0 }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "#F9DDD8"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "#FCEFEC"; }}
          >Archive request</button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #ECECEC", marginTop: 4 }}>
          {tabs.map(function(tab) {
            return (
            <button key={tab} onClick={function() { setActiveTab(tab); }} style={{
              padding: "10px 0", marginRight: 24, fontSize: 14, fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? "#080908" : "#7C7C7C", background: "none", border: "none",
              borderBottom: activeTab === tab ? "2px solid #05A105" : "2px solid transparent",
              cursor: "pointer", transition: "all 0.15s",
            }}>{tab}</button>
            );
          })}
        </div>

        {/* Document tab */}
        {activeTab === "Document" && (
          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "16px 18px", borderBottom: "1px solid #F0F0F0" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#080908" }}>Invoice</div>
                <div style={{ fontSize: 14, color: "#7C7C7C", marginTop: 2 }}><span style={{ fontWeight: 500 }}>Direct Expenses</span> 325</div>
              </div>
              <button style={{ padding: "6px 14px", border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908" }}
                onMouseEnter={function(e) { e.currentTarget.style.background = "#FAFAFA"; }}
                onMouseLeave={function(e) { e.currentTarget.style.background = "#FFFFFF"; }}
              >Review</button>
            </div>
            <div style={{ padding: "14px 18px" }}>
              <div style={{ fontSize: 14, color: "#080908" }}>
                <span style={{ fontWeight: 500 }}>{contact}</span> 31 Jan 2026
              </div>
              <div style={{ fontSize: 14, color: "#7C7C7C", marginTop: 4 }}>
                <span style={{ fontWeight: 500, color: "#080908" }}>-{amount}</span> 20% tax, £48.00
              </div>
            </div>
            <div style={{ margin: "0 14px 14px", border: "1px solid #E9E9EB", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", height: 70 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <InvoiceFileIcon width={32} height={38} />
                <span style={{ fontSize: 14, color: "#080908" }}>{fileName}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ padding: "3px 8px", borderRadius: 6, background: "#FDF8EE", fontSize: 13, fontWeight: 500, color: "#D5A750" }}>Review</span>
                <button style={{ border: "none", background: "none", cursor: "pointer", display: "flex", padding: 2 }}>
                  <DownloadIcon />
                </button>
                <button style={{ border: "none", background: "none", cursor: "pointer", display: "flex", padding: 2 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="#7C7C7C" strokeWidth="1.25" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Notes" && (
          <div style={{ color: "#7C7C7C", fontSize: 14, padding: "8px 0" }}>No notes yet.</div>
        )}
        {activeTab === "Audit log" && (
          <div style={{ color: "#7C7C7C", fontSize: 14, padding: "8px 0" }}>No audit events yet.</div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 28px", borderTop: "1px solid #ECECEC", display: "flex", gap: 12, flexShrink: 0 }}>
        <button onClick={onClose} style={{ padding: "10px 24px", border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908" }}
          onMouseEnter={function(e) { e.currentTarget.style.background = "#FAFAFA"; }}
          onMouseLeave={function(e) { e.currentTarget.style.background = "#FFFFFF"; }}
        >Close</button>
        <button onClick={!confirming ? handleConfirm : undefined}
          style={{ flex: 1, padding: "10px 16px", border: confirming ? "1px solid #E9E9EB" : "none", borderRadius: 8, background: confirming ? "#F5F5F5" : "#05A105", cursor: confirming ? "default" : "pointer", fontSize: 14, fontWeight: 500, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s ease" }}
          onMouseEnter={function(e) { if (!confirming) e.currentTarget.style.background = "#058F05"; }}
          onMouseLeave={function(e) { if (!confirming) e.currentTarget.style.background = "#05A105"; }}
        >
          {confirming ? (
            <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2.5px solid #E9E9EB", borderTopColor: "#05A105", animation: "spin 0.75s linear infinite" }} />
          ) : "Publish to Xero"}
        </button>
      </div>
    </div>
  );
}

// ── SuggestionsBox ────────────────────────────────────────────────────────────
function SuggestionsBox({ isCleanReconcile, allJustResolved, accountStatus, resolvedCount, totalSuggestions, matchedTotal, navCategories, resolvedCards, ignoredCards, completedTitle, completedDescription, completedColor }) {
  if (allJustResolved === undefined) allJustResolved = false;
  if (!ignoredCards) ignoredCards = new Set();
  if (completedTitle === undefined) completedTitle = "Ready to reconcile in Xero";
  if (completedDescription === undefined) completedDescription = "All suggestions resolved. Go to Xero to finalise and post the reconciliation.";
  if (completedColor === undefined) completedColor = "#4C71DF";
  var color = accountStatus === "completed" ? "#4C71DF" : "#05A105";
  var bg    = accountStatus === "completed" ? "#EEF2FF" : "#EAF2E2";
  var label = accountStatus === "completed" ? "Completed" : "Reconciled";
  var msg   = accountStatus === "completed" ? "Ready to reconcile in Xero" : "Fully reconciled in Xero";
  var pct   = totalSuggestions > 0 ? Math.min(100, Math.round((resolvedCount / totalSuggestions) * 100)) : 0;
  var [collapsedCats, setCollapsedCats] = useState({});
  var [boxCollapsed, setBoxCollapsed] = useState(false);
  var toggleCat = function(key) { setCollapsedCats(function(prev) { var n = {}; for (var k in prev) n[k] = prev[k]; n[key] = !prev[key]; return n; }); };
  var scrollTo = function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 8, overflow: "hidden", fontFamily: "'Inter', sans-serif", border: "1px solid #ECECEC", flex: boxCollapsed ? "0 0 auto" : 1, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div onClick={function() { setBoxCollapsed(function(c) { return !c; }); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", cursor: "pointer" }}>
        <span style={{ fontSize: 16, fontWeight: 500, color: "#080908" }}>Suggestions</span>
        <div style={{ flexShrink: 0, transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)", transform: boxCollapsed ? "rotate(0deg)" : "rotate(180deg)" }}>
          <Chevron color="#000000" size={16} />
        </div>
      </div>
      {/* Progress / clean state */}
      <div style={{ overflow: "hidden", maxHeight: boxCollapsed ? 0 : 1200, opacity: boxCollapsed ? 0 : 1, transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease", flex: boxCollapsed ? "none" : 1, display: "flex", flexDirection: "column" }}>
      <div style={{ borderTop: "1px solid #F0F0F0", padding: "20px" }}>
        {allJustResolved ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: completedColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5.5L3.5 7.5L8.5 2.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontSize: 14, fontWeight: 500, color: completedColor }}>{completedTitle}</span>
            </div>
            <span style={{ fontSize: 14, color: "#8C8C8B", lineHeight: "18px" }}>{completedDescription}</span>
            <div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 20, fontWeight: 600, color: "#080908" }}>{resolvedCount}</span>
                <span style={{ fontSize: 14, color: "#8C8C8B" }}>{" "}/ {totalSuggestions} resolved</span>
              </div>
              <div style={{ height: 4, background: "#E9E9EB", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: pct + "%", background: completedColor, borderRadius: 2, transition: "width 0.4s ease" }} />
              </div>
            </div>
          </div>
        ) : isCleanReconcile ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center", paddingTop: 4, paddingBottom: 4 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8.5L6.5 12L13 5" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: color }}>{label}</span>
            <span style={{ fontSize: 14, color: "#8C8C8B", lineHeight: "20px" }}>{msg}</span>
            {matchedTotal && <span style={{ fontSize: 14, fontWeight: 500, color: "#4F4F4F", marginTop: 2 }}>{matchedTotal} transactions matched</span>}
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 20, fontWeight: 600, color: "#080908" }}>{resolvedCount}</span>
              <span style={{ fontSize: 14, color: "#8C8C8B" }}>{" "}/ {totalSuggestions} resolved</span>
            </div>
            <div style={{ height: 4, background: "#E9E9EB", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: pct + "%", background: "#05A105", borderRadius: 2, transition: "width 0.4s ease" }} />
            </div>
          </>
        )}
      </div>
      {/* Nav list */}
      {!isCleanReconcile && (
        <div style={{ borderTop: "1px solid #F0F0F0", padding: "12px 10px 16px", flex: 1, overflowY: "auto" }}>
          {navCategories.length === 0 ? (
            <div style={{ padding: "10px 10px", fontSize: 14, color: "#8C8C8B", textAlign: "center" }}>No suggestions</div>
          ) : (
            navCategories.map(function(cat, ci) {
              var isCatCollapsed = !!collapsedCats[cat.key];
              var remaining = cat.items.filter(function(_, ii) { return !resolvedCards.has(cat.baseIdx + ii) && !ignoredCards.has(cat.baseIdx + ii); }).length;
              var catAllDone = remaining === 0;
              return (
              <div key={ci} style={{ marginBottom: ci < navCategories.length - 1 ? 6 : 0 }}>
                <button
                  onClick={function() { toggleCat(cat.key); }}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 10px", border: "none", background: "none", cursor: "pointer", fontFamily: "inherit", borderRadius: 6 }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = "#F7F7F7"; }}
                  onMouseLeave={function(e) { e.currentTarget.style.background = "none"; }}
                >
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#000000" }}>{cat.label}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: catAllDone ? "#05A105" : "#6B6B6B", background: catAllDone ? "#EAF2E2" : "#F0F0F0", borderRadius: 4, padding: "1px 7px", lineHeight: "18px", transition: "background 0.2s, color 0.2s" }}>{remaining}</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, transition: "transform 0.2s ease", transform: isCatCollapsed ? "rotate(-90deg)" : "rotate(0deg)" }}>
                      <path d="M3 5L7 9L11 5" stroke="#ADADAD" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
                {!isCatCollapsed && cat.items.map(function(item, ii) {
                  var isItemResolved = resolvedCards.has(cat.baseIdx + ii);
                  var isItemIgnored  = ignoredCards.has(cat.baseIdx + ii);
                  return (
                    <button
                      key={ii}
                      onClick={function() { scrollTo("result-" + cat.key + "-" + ii); }}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "9px 10px", border: "none", background: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit", borderRadius: 6 }}
                      onMouseEnter={function(e) { e.currentTarget.style.background = "#F7F7F7"; }}
                      onMouseLeave={function(e) { e.currentTarget.style.background = "none"; }}
                    >
                      {(isItemResolved || isItemIgnored) ? (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                          <circle cx="10" cy="10" r="10" fill="#05A105"/>
                          <path d="M5.5 10.5L8.5 13.5L14.5 7" stroke="#FFFFFF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                          <circle cx="10" cy="10" r="9.25" stroke="#E9E9EB" strokeWidth="1.5"/>
                        </svg>
                      )}
                      <span style={{ fontSize: 14, color: (isItemResolved || isItemIgnored) ? "#ADADAD" : "#080908", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.contact}
                      </span>
                    </button>
                  );
                })}
              </div>
              );
            })
          )}
        </div>
      )}
      </div>
    </div>
  );
}

// ── ResultsPanel ─────────────────────────────────────────────────────────────
function ResultsPanel({ accountName, onOpenSpendMoney, onOpenBatchDraft, resolvedCards, onResolveCard, ignoredCards, onIgnoreCard, onShowToast, isCleanReconcile, allJustResolved, onAccountsOverview, matchedTotal, accountStatus, boxesOpen, uploadedFileName }) {
  if (!resolvedCards) resolvedCards = new Set();
  if (!ignoredCards) ignoredCards = new Set();
  if (isCleanReconcile === undefined) isCleanReconcile = false;
  if (allJustResolved === undefined) allJustResolved = false;
  if (onAccountsOverview === undefined) onAccountsOverview = null;
  if (matchedTotal === undefined) matchedTotal = null;
  if (accountStatus === undefined) accountStatus = null;
  if (boxesOpen === undefined) boxesOpen = true;
  if (uploadedFileName === undefined) uploadedFileName = null;
  var [analysisOpen, setAnalysisOpen] = useState(false);
  var containerRef = useRef(null);
  var [resyncOverride, setResyncOverride] = useState(null);
  var [resyncing, setResyncing] = useState(false);

  var handleReSync = function() {
    setResyncing(true);
    setTimeout(function() {
      var allCards = ACCOUNT_CARDS[accountName] || [];
      var unresolved = allCards.filter(function(c) { return !resolvedCards.has(c.idx) && !ignoredCards.has(c.idx); });
      var toResolve = unresolved.slice(0, Math.min(2, unresolved.length));
      toResolve.forEach(function(c) { onResolveCard?.(c.idx); });

      var RESYNC_OVERRIDES = {
        "Lloyds Bank - Business":        { feed: "£155,000.00", statement: "£155,000.00", gl: "£155,000.00", diff: "£0.00",      matched: "244/244" },
        "Lloyds Bank - Operations GBP":  { feed: "£127,000.00", statement: "£127,000.00", gl: "£127,000.00", diff: "£0.00",      matched: "380/380" },
        "HSBC - Business Transactions":  { feed: "£95,500.00",  statement: "£95,500.00",  gl: "£95,500.00",  diff: "£0.00",      matched: "195/195" },
        "Barclays - Operations":         { feed: "£374,000.00", statement: "£374,000.00", gl: "£374,000.00", diff: "£0.00",      matched: "420/420" },
        "American Express OP GBP":       { feed: "£87,420.00",  statement: "£87,420.00",  gl: "£87,420.00",  diff: "£0.00",      matched: "105/105" },
        "Mastercard Business":           { feed: "£155,000.00", statement: "£155,000.00", gl: "£155,000.00", diff: "£0.00",      matched: "56/56"   },
      };
      setResyncOverride(RESYNC_OVERRIDES[accountName] || null);
      setResyncing(false);
      onShowToast?.("Re-sync complete");
    }, 1400);
  };

  var isHSBC = accountName === "HSBC - Business Transactions";
  var effectiveClean = isCleanReconcile && !allJustResolved;

  var resultRows = effectiveClean ? [
    { description: "Missing entries",    issues: 0, total: "£0.00" },
    { description: "Anomalies",          issues: 0, total: "£0.00" },
    { description: "Duplicates",         issues: 0, total: "£0.00" },
    { description: "Date differences",   issues: 0, total: "£0.00" },
    { description: "Omitted",            issues: 0, total: "£0.00" },
    { description: "General",            issues: 0, total: "£0.00" },
  ] : isHSBC ? [
    { description: "Missing entries",    issues: 18, total: "£3,370.00" },
    { description: "Anomalies",          issues: 12, total: "£11,480.00"  },
    { description: "Duplicates",         issues: 10, total: "£5,640.00"  },
    { description: "Date differences",   issues: 10, total: "£3,620.00"  },
    { description: "Omitted",            issues:  5, total: "£7,800.00"  },
    { description: "General",            issues:  3, total: "£70.00"    },
  ] : accountName === "Barclays - Operations" ? [
    { description: "Missing entries",    issues: 2, total: "£3,200.00" },
    { description: "Anomalies",          issues: 1, total: "£1,600.00" },
    { description: "Omitted",            issues: 1, total: "£800.00"   },
    { description: "General",            issues: 1, total: "£400.00"   },
  ] : accountName === "American Express OP GBP" ? [
    { description: "Missing entries",    issues: 1, total: "£940.00"   },
    { description: "Date differences",   issues: 2, total: "£560.00"   },
    { description: "Duplicates",         issues: 1, total: "£280.00"   },
  ] : accountName === "Mastercard Business" ? [
    { description: "Missing entries",    issues: 1, total: "£1,250.00" },
    { description: "Anomalies",          issues: 1, total: "£850.00"   },
    { description: "Duplicates",         issues: 1, total: "£400.00"   },
  ] : [
    { description: "Missing entries",    issues: 3, total: "£6,000.00" },
    { description: "Anomalies",          issues: 1, total: "£2,400.00" },
    { description: "Duplicates",         issues: 1, total: "£1,200.00" },
    { description: "Date differences",   issues: 1, total: "£1,080.00" },
    { description: "Omitted",            issues: 1, total: "£810.00"   },
    { description: "General",            issues: 1, total: "£510.00"   },
  ];

  // Per-account suggestion cards
  var ACCOUNT_CARDS = {
    "HSBC - Business Transactions": [
      { idx:  0, cat: "missing",   contact: "Meridian Freight Ltd",       state: "Open",   date: "3 Mar 2026",  amount: "£140.00",  email: "2 Mar, 09:10",  description: "A bank statement line for Meridian Freight Ltd (£1,240.00) dated 3 Mar 2026 was found with no matching GL entry in Xero.",       primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx:  1, cat: "missing",   contact: "Hartley & Sons Supplies",    state: "Open",   date: "5 Mar 2026",  amount: "£40.00",    email: "4 Mar, 11:45",  description: "A bank statement line for Hartley & Sons Supplies (£380.00) dated 5 Mar 2026 was found with no matching GL entry in Xero.",       primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx:  2, cat: "missing",   contact: "Queensbury Engineering",     state: "Review", date: "6 Mar 2026",  amount: "£240.00",  email: "5 Mar, 14:20",  description: "A bank statement line for Queensbury Engineering (£2,150.00) dated 6 Mar 2026 was found with no matching GL entry in Xero.",       primaryLabel: "Review and publish", external: false, fileAction: "Queensbury-invoice.pdf" },
      { idx:  3, cat: "missing",   contact: "Lakewood Solutions",         state: "Open",   date: "7 Mar 2026",  amount: "£90.00",    email: "6 Mar, 08:55",  description: "A bank statement line for Lakewood Solutions (£760.00) dated 7 Mar 2026 was found with no matching GL entry in Xero.",             primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx:  4, cat: "missing",   contact: "Pinecroft Consulting",       state: "Open",   date: "9 Mar 2026",  amount: "£360.00",  email: "8 Mar, 16:30",  description: "A bank statement line for Pinecroft Consulting (£3,200.00) dated 9 Mar 2026 was found with no matching GL entry in Xero.",          primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx:  5, cat: "missing",   contact: "Ashford & Clarke",           state: "Open",   date: "10 Mar 2026", amount: "£60.00",    email: "9 Mar, 10:00",  description: "A bank statement line for Ashford & Clarke (£490.00) dated 10 Mar 2026 was found with no matching GL entry in Xero.",              primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx:  6, cat: "missing",   contact: "Northgate Financial",        state: "Open",   date: "11 Mar 2026", amount: "£210.00",  email: "10 Mar, 13:15", description: "A bank statement line for Northgate Financial (£1,875.00) dated 11 Mar 2026 was found with no matching GL entry in Xero.",         primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx:  7, cat: "missing",   contact: "Westbrook Services",         state: "Open",   date: "12 Mar 2026", amount: "£70.00",    email: "11 Mar, 09:40", description: "A bank statement line for Westbrook Services (£640.00) dated 12 Mar 2026 was found with no matching GL entry in Xero.",            primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx:  8, cat: "missing",   contact: "Templeton & Ward",           state: "Review", date: "13 Mar 2026", amount: "£100.00",    email: "12 Mar, 15:00", description: "A bank statement line for Templeton & Ward (£920.00) dated 13 Mar 2026 was found with no matching GL entry in Xero.",              primaryLabel: "Review and publish", external: false, fileAction: "Templeton-invoice.pdf" },
      { idx:  9, cat: "missing",   contact: "Greystone Technologies",     state: "Open",   date: "14 Mar 2026", amount: "£610.00",  email: "13 Mar, 11:25", description: "A bank statement line for Greystone Technologies (£5,400.00) dated 14 Mar 2026 was found with no matching GL entry in Xero.",     primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx: 10, cat: "missing",   contact: "Fairfield Logistics",        state: "Open",   date: "15 Mar 2026", amount: "£130.00",  email: "14 Mar, 08:30", description: "A bank statement line for Fairfield Logistics (£1,100.00) dated 15 Mar 2026 was found with no matching GL entry in Xero.",         primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx: 11, cat: "missing",   contact: "Coppergate Partners",        state: "Open",   date: "16 Mar 2026", amount: "£310.00",  email: "15 Mar, 14:50", description: "A bank statement line for Coppergate Partners (£2,750.00) dated 16 Mar 2026 was found with no matching GL entry in Xero.",         primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx: 12, cat: "missing",   contact: "Riverside Digital",          state: "Open",   date: "17 Mar 2026", amount: "£40.00",    email: "16 Mar, 10:10", description: "A bank statement line for Riverside Digital (£385.00) dated 17 Mar 2026 was found with no matching GL entry in Xero.",             primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx: 13, cat: "missing",   contact: "Whitmore Agency",            state: "Review", date: "18 Mar 2026", amount: "£180.00",  email: "17 Mar, 16:20", description: "A bank statement line for Whitmore Agency (£1,560.00) dated 18 Mar 2026 was found with no matching GL entry in Xero.",            primaryLabel: "Review and publish", external: false, fileAction: "Whitmore-invoice.pdf" },
      { idx: 14, cat: "missing",   contact: "Stonegate Ventures",         state: "Open",   date: "19 Mar 2026", amount: "£90.00",    email: "18 Mar, 09:05", description: "A bank statement line for Stonegate Ventures (£820.00) dated 19 Mar 2026 was found with no matching GL entry in Xero.",           primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx: 15, cat: "missing",   contact: "Elmwood Trading",            state: "Open",   date: "20 Mar 2026", amount: "£470.00",  email: "19 Mar, 13:45", description: "A bank statement line for Elmwood Trading (£4,100.00) dated 20 Mar 2026 was found with no matching GL entry in Xero.",            primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx: 16, cat: "missing",   contact: "Bridgewater Associates",     state: "Open",   date: "21 Mar 2026", amount: "£80.00",    email: "20 Mar, 11:30", description: "A bank statement line for Bridgewater Associates (£670.00) dated 21 Mar 2026 was found with no matching GL entry in Xero.",       primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx: 17, cat: "missing",   contact: "Redwood Consulting",         state: "Open",   date: "22 Mar 2026", amount: "£150.00",  email: "21 Mar, 15:55", description: "A bank statement line for Redwood Consulting (£1,340.00) dated 22 Mar 2026 was found with no matching GL entry in Xero.",         primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx: 18, cat: "anomaly",   contact: "Premier Office Supplies",    state: "Open",   date: "4 Mar 2026",  amount: "£960.00",  email: "3 Mar, 10:00",  description: "A transaction of £8,400.00 from Premier Office Supplies is significantly above the account average.",    primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 19, cat: "anomaly",   contact: "Highfield Analytics",        state: "Open",   date: "8 Mar 2026",  amount: "£1,400.00", email: "7 Mar, 14:30",  description: "A transaction of £12,300.00 from Highfield Analytics is significantly above the account average.",      primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 20, cat: "anomaly",   contact: "Oakwood Research",           state: "Open",   date: "11 Mar 2026", amount: "£770.00",  email: "10 Mar, 09:15", description: "A transaction of £6,750.00 from Oakwood Research is significantly above the account average.",         primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 21, cat: "anomaly",   contact: "Silverstone Group",          state: "Open",   date: "13 Mar 2026", amount: "£1,050.00",  email: "12 Mar, 11:00", description: "A transaction of £9,200.00 from Silverstone Group is significantly above the account average.",          primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 22, cat: "anomaly",   contact: "Blackthorn Events",          state: "Open",   date: "15 Mar 2026", amount: "£670.00",  email: "14 Mar, 16:45", description: "A transaction of £5,850.00 from Blackthorn Events is significantly above the account average.",          primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 23, cat: "anomaly",   contact: "Mapleton Industries",        state: "Open",   date: "16 Mar 2026", amount: "£860.00",  email: "15 Mar, 10:20", description: "A transaction of £7,600.00 from Mapleton Industries is significantly above the account average.",        primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 24, cat: "anomaly",   contact: "Greenfield Partners",        state: "Open",   date: "18 Mar 2026", amount: "£1,270.00", email: "17 Mar, 13:40", description: "A transaction of £11,200.00 from Greenfield Partners is significantly above the account average.",       primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 25, cat: "anomaly",   contact: "Haverstock Ltd",             state: "Open",   date: "19 Mar 2026", amount: "£560.00",  email: "18 Mar, 08:50", description: "A transaction of £4,950.00 from Haverstock Ltd is significantly above the account average.",            primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 26, cat: "anomaly",   contact: "Bramblewood Services",       state: "Open",   date: "20 Mar 2026", amount: "£720.00",  email: "19 Mar, 15:10", description: "A transaction of £6,300.00 from Bramblewood Services is significantly above the account average.",      primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 27, cat: "anomaly",   contact: "Thornfield Capital",         state: "Open",   date: "22 Mar 2026", amount: "£1,710.00", email: "21 Mar, 12:00", description: "A transaction of £15,000.00 from Thornfield Capital is significantly above the account average.",        primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 28, cat: "anomaly",   contact: "Clearwater Tech",            state: "Open",   date: "24 Mar 2026", amount: "£920.00",  email: "23 Mar, 10:35", description: "A transaction of £8,100.00 from Clearwater Tech is significantly above the account average.",          primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 29, cat: "anomaly",   contact: "Longbridge Agency",          state: "Open",   date: "25 Mar 2026", amount: "£590.00",  email: "24 Mar, 14:00", description: "A transaction of £5,200.00 from Longbridge Agency is significantly above the account average.",        primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 30, cat: "duplicate", contact: "Meridian Freight Ltd",       state: "Open",   date: "3 Mar 2026",  amount: "£140.00",  email: "2 Mar, 09:10",  description: "Two identical transactions of £1,240.00 from Meridian Freight Ltd were recorded on 3 Mar 2026.",       primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 31, cat: "duplicate", contact: "Premier Office Supplies",    state: "Open",   date: "4 Mar 2026",  amount: "£960.00",  email: "3 Mar, 10:00",  description: "Two identical transactions of £8,400.00 from Premier Office Supplies were recorded on 4 Mar 2026.",    primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 32, cat: "duplicate", contact: "Hartley & Sons Supplies",    state: "Open",   date: "5 Mar 2026",  amount: "£40.00",    email: "4 Mar, 11:45",  description: "Two identical transactions of £380.00 from Hartley & Sons Supplies were recorded on 5 Mar 2026.",    primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 33, cat: "duplicate", contact: "Highfield Analytics",        state: "Open",   date: "8 Mar 2026",  amount: "£1,400.00", email: "7 Mar, 14:30",  description: "Two identical transactions of £12,300.00 from Highfield Analytics were recorded on 8 Mar 2026.",        primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 34, cat: "duplicate", contact: "Westbrook Services",         state: "Open",   date: "12 Mar 2026", amount: "£70.00",    email: "11 Mar, 09:40", description: "Two identical transactions of £640.00 from Westbrook Services were recorded on 12 Mar 2026.",         primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 35, cat: "duplicate", contact: "Oakwood Research",           state: "Open",   date: "11 Mar 2026", amount: "£770.00",  email: "10 Mar, 09:15", description: "Two identical transactions of £6,750.00 from Oakwood Research were recorded on 11 Mar 2026.",           primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 36, cat: "duplicate", contact: "Coppergate Partners",        state: "Open",   date: "16 Mar 2026", amount: "£310.00",  email: "15 Mar, 14:50", description: "Two identical transactions of £2,750.00 from Coppergate Partners were recorded on 16 Mar 2026.",        primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 37, cat: "duplicate", contact: "Silverstone Group",          state: "Open",   date: "13 Mar 2026", amount: "£1,050.00",  email: "12 Mar, 11:00", description: "Two identical transactions of £9,200.00 from Silverstone Group were recorded on 13 Mar 2026.",          primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 38, cat: "duplicate", contact: "Riverside Digital",          state: "Open",   date: "17 Mar 2026", amount: "£40.00",    email: "16 Mar, 10:10", description: "Two identical transactions of £385.00 from Riverside Digital were recorded on 17 Mar 2026.",            primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 39, cat: "duplicate", contact: "Mapleton Industries",        state: "Open",   date: "16 Mar 2026", amount: "£860.00",  email: "15 Mar, 10:20", description: "Two identical transactions of £7,600.00 from Mapleton Industries were recorded on 16 Mar 2026.",        primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 40, cat: "date",      contact: "Ashford & Clarke",           state: "Open",   date: "10 Mar 2026", amount: "£60.00",    email: "9 Mar, 10:00",  description: "A bank statement entry for Ashford & Clarke dated 10 Mar is matched to a GL entry dated 14 Mar — a 4-day discrepancy.",      primaryLabel: "Acknowledge",    external: false, fileAction: null },
      { idx: 41, cat: "date",      contact: "Northgate Financial",        state: "Open",   date: "11 Mar 2026", amount: "£210.00",  email: "10 Mar, 13:15", description: "A bank statement entry for Northgate Financial dated 11 Mar is matched to a GL entry dated 16 Mar — a 5-day discrepancy.",    primaryLabel: "Acknowledge",    external: false, fileAction: null },
      { idx: 42, cat: "date",      contact: "Blackthorn Events",          state: "Open",   date: "15 Mar 2026", amount: "£670.00",  email: "14 Mar, 16:45", description: "A bank statement entry for Blackthorn Events dated 15 Mar is matched to a GL entry dated 19 Mar — a 4-day discrepancy.",      primaryLabel: "Acknowledge",    external: false, fileAction: null },
      { idx: 43, cat: "date",      contact: "Templeton & Ward",           state: "Open",   date: "13 Mar 2026", amount: "£100.00",    email: "12 Mar, 15:00", description: "A bank statement entry for Templeton & Ward dated 13 Mar is matched to a GL entry dated 16 Mar — a 3-day discrepancy.",        primaryLabel: "Acknowledge",    external: false, fileAction: null },
      { idx: 44, cat: "date",      contact: "Greystone Technologies",     state: "Open",   date: "14 Mar 2026", amount: "£610.00",  email: "13 Mar, 11:25", description: "A bank statement entry for Greystone Technologies dated 14 Mar is matched to a GL entry dated 18 Mar — a 4-day discrepancy.",  primaryLabel: "Acknowledge",    external: false, fileAction: null },
      { idx: 45, cat: "date",      contact: "Haverstock Ltd",             state: "Open",   date: "19 Mar 2026", amount: "£560.00",  email: "18 Mar, 08:50", description: "A bank statement entry for Haverstock Ltd dated 19 Mar is matched to a GL entry dated 23 Mar — a 4-day discrepancy.",          primaryLabel: "Acknowledge",    external: false, fileAction: null },
      { idx: 46, cat: "date",      contact: "Fairfield Logistics",        state: "Open",   date: "15 Mar 2026", amount: "£130.00",  email: "14 Mar, 08:30", description: "A bank statement entry for Fairfield Logistics dated 15 Mar is matched to a GL entry dated 18 Mar — a 3-day discrepancy.",      primaryLabel: "Acknowledge",    external: false, fileAction: null },
      { idx: 47, cat: "date",      contact: "Bramblewood Services",       state: "Open",   date: "20 Mar 2026", amount: "£720.00",  email: "19 Mar, 15:10", description: "A bank statement entry for Bramblewood Services dated 20 Mar is matched to a GL entry dated 24 Mar — a 4-day discrepancy.",    primaryLabel: "Acknowledge",    external: false, fileAction: null },
      { idx: 48, cat: "date",      contact: "Stonegate Ventures",         state: "Open",   date: "19 Mar 2026", amount: "£90.00",    email: "18 Mar, 09:05", description: "A bank statement entry for Stonegate Ventures dated 19 Mar is matched to a GL entry dated 22 Mar — a 3-day discrepancy.",       primaryLabel: "Acknowledge",    external: false, fileAction: null },
      { idx: 49, cat: "date",      contact: "Elmwood Trading",            state: "Open",   date: "20 Mar 2026", amount: "£470.00",  email: "19 Mar, 13:45", description: "A bank statement entry for Elmwood Trading dated 20 Mar is matched to a GL entry dated 25 Mar — a 5-day discrepancy.",          primaryLabel: "Acknowledge",    external: false, fileAction: null },
      { idx: 50, cat: "omitted",   contact: "Internal Transfer",          state: "Open",   date: "2 Mar 2026",  amount: "£2,840.00", email: "2 Mar, 09:00",  description: "A bank statement line for an internal transfer of £25,000.00 on 2 Mar 2026 has no corresponding GL entry in Xero.",                      primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 51, cat: "omitted",   contact: "Standing Order — HMRC",     state: "Open",   date: "7 Mar 2026",  amount: "£480.00",  email: "7 Mar, 08:00",  description: "A standing order payment of £4,200.00 to HMRC on 7 Mar 2026 has no corresponding GL entry in Xero.",                           primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 52, cat: "omitted",   contact: "Direct Debit — Utilities",  state: "Open",   date: "14 Mar 2026", amount: "£100.00",    email: "14 Mar, 06:00", description: "A direct debit of £890.00 for utilities on 14 Mar 2026 has no corresponding GL entry in Xero.",                                primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 53, cat: "omitted",   contact: "Payroll Batch",             state: "Open",   date: "28 Mar 2026", amount: "£4,370.00", email: "28 Mar, 07:30", description: "A payroll batch payment of £38,400.00 on 28 Mar 2026 has no corresponding GL entry in Xero.",                              primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 54, cat: "omitted",   contact: "Bank Charges",              state: "Open",   date: "31 Mar 2026", amount: "£10.00",    email: "31 Mar, 00:01", description: "A bank charge of £120.00 on 31 Mar 2026 has no corresponding GL entry in Xero.",                                            primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 55, cat: "general",   contact: "Unclassified Entry A",      state: "Open",   date: "9 Mar 2026",  amount: "£40.00",    email: "8 Mar, 17:00",  description: "A transaction of £340.00 on 9 Mar 2026 could not be automatically classified.",  primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 56, cat: "general",   contact: "Unclassified Entry B",      state: "Open",   date: "17 Mar 2026", amount: "£10.00",     email: "16 Mar, 12:30", description: "A transaction of £75.00 on 17 Mar 2026 could not be automatically classified.",   primaryLabel: "Remove in Xero", external: true,  fileAction: null },
      { idx: 57, cat: "general",   contact: "Unclassified Entry C",      state: "Open",   date: "24 Mar 2026", amount: "£20.00",    email: "23 Mar, 14:15", description: "A transaction of £210.00 on 24 Mar 2026 could not be automatically classified.", primaryLabel: "Remove in Xero", external: true,  fileAction: null },
    ],
    "Barclays - Operations": [
      { idx: 0, cat: "missing",   contact: "Hillcrest Imports",    state: "Open",   date: "18 Mar 2026", amount: "£620.00",   email: "17 Mar, 09:15", description: "A bank statement line for Hillcrest Imports (£620.00) dated 18 Mar 2026 was found with no matching GL entry in Xero.", primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx: 1, cat: "missing",   contact: "NorthStar Media",      state: "Review", date: "11 Mar 2026", amount: "£1,600.00", email: "10 Mar, 14:30", description: "A bank statement line for NorthStar Media (£1,450.00) dated 11 Mar 2026 was found with no matching GL entry in Xero.", primaryLabel: "Review and publish", external: false, fileAction: "NorthStar-invoice.pdf" },
      { idx: 2, cat: "anomaly",   contact: "Parkway Solutions",    state: "Open",   date: "15 Mar 2026", amount: "£1,600.00", email: "14 Mar, 11:00", description: "A transaction of £7,200.00 from Parkway Solutions is significantly above the account average.", primaryLabel: "Remove in Xero", external: true, fileAction: null },
      { idx: 3, cat: "omitted",   contact: "Central Freight Co",   state: "Open",   date: "5 Mar 2026",  amount: "£800.00", email: "5 Mar, 08:00",  description: "A bank statement line for Central Freight Co (£3,800.00) on 5 Mar 2026 has no corresponding GL entry in Xero.", primaryLabel: "Remove in Xero", external: true, fileAction: null },
      { idx: 4, cat: "general",   contact: "Unclassified",         state: "Open",   date: "20 Mar 2026", amount: "£400.00",   email: "19 Mar, 16:45", description: "A transaction of £140.00 on 20 Mar 2026 could not be automatically classified.", primaryLabel: "Remove in Xero", external: true, fileAction: null },
    ],
    "American Express OP GBP": [
      { idx: 0, cat: "missing",   contact: "Vantage Digital",      state: "Open",   date: "19 Mar 2026", amount: "£940.00",   email: "18 Mar, 10:00", description: "A bank statement line for Vantage Digital (£890.00) dated 19 Mar 2026 was found with no matching GL entry in Xero.", primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx: 1, cat: "date",      contact: "Apex Consulting",       state: "Open",   date: "13 Mar 2026", amount: "£280.00", email: "12 Mar, 09:30", description: "A bank statement entry for Apex Consulting dated 13 Mar 2026 is matched to a GL entry dated 18 Mar 2026 — a 5-day discrepancy.", primaryLabel: "Acknowledge", external: false, fileAction: null },
      { idx: 2, cat: "date",      contact: "BlueSky Events",        state: "Open",   date: "7 Mar 2026",  amount: "£280.00",   email: "6 Mar, 15:20",  description: "A bank statement entry for BlueSky Events dated 7 Mar 2026 is matched to a GL entry dated 10 Mar 2026 — a 3-day discrepancy.", primaryLabel: "Acknowledge", external: false, fileAction: null },
      { idx: 3, cat: "duplicate", contact: "Vantage Digital",       state: "Open",   date: "19 Mar 2026", amount: "£280.00",   email: "18 Mar, 10:00", description: "Two identical transactions of £890.00 from Vantage Digital were recorded on 19 Mar 2026.", primaryLabel: "Remove in Xero", external: true, fileAction: null },
    ],
    "Mastercard Business": [
      { idx: 0, cat: "missing",   contact: "Harrison & Webb",       state: "Open",   date: "16 Mar 2026", amount: "£1,250.00",   email: "15 Mar, 11:00", description: "A bank statement line for Harrison & Webb (£730.00) dated 16 Mar 2026 was found with no matching GL entry in Xero.", primaryLabel: "Create spend money", external: false, fileAction: null },
      { idx: 1, cat: "anomaly",   contact: "Clearpoint Services",   state: "Open",   date: "9 Mar 2026",  amount: "£850.00", email: "8 Mar, 14:15",  description: "A transaction of £5,500.00 from Clearpoint Services is significantly above the account average.", primaryLabel: "Remove in Xero", external: true, fileAction: null },
      { idx: 2, cat: "duplicate", contact: "Harrison & Webb",       state: "Open",   date: "16 Mar 2026", amount: "£400.00",   email: "15 Mar, 11:00", description: "Two identical transactions of £730.00 from Harrison & Webb were recorded on 16 Mar 2026.", primaryLabel: "Remove in Xero", external: true, fileAction: null },
    ],
  };

  var CAT_LABELS = { missing: "Missing entry", anomaly: "Anomaly", duplicate: "Duplicate", date: "Date difference", omitted: "Omitted", general: "General" };

  // Default (Lloyds Bank - Business) card lists
  var missingEntries = [
    { state: "Open",   contact: "Yorkshire Tea Estates",     date: "17 Mar 2026", amount: "£1,800.00",   email: "12 Mar, 09:00", description: "A bank statement line for Yorkshire Tea Estates (£240.00) dated 17 Mar 2026 was found with no matching GL entry in Xero.",     primaryLabel: "Create spend money", external: false, fileAction: null },
    { state: "Review", contact: "Clifton & Harrow Supplies", date: "14 Mar 2026", amount: "£3,200.00", email: "13 Mar, 10:15", description: "A bank statement line for Clifton & Harrow Supplies (£1,180.00) dated 14 Mar 2026 was found with no matching GL entry in Xero.", primaryLabel: "Review and publish", external: false, fileAction: "CliftonHarrow-invoice.pdf" },
    { state: "Ready",  contact: "Meridian Office Solutions", date: "9 Mar 2026",  amount: "£1,000.00",   email: "8 Mar, 16:40",  description: "A bank statement line for Meridian Office Solutions (£530.00) dated 9 Mar 2026 was found with no matching GL entry in Xero.",  primaryLabel: "Reconcile in Xero", external: true,  fileAction: "Meridian-invoice.pdf" },
  ];
  var anomalies = [
    { state: "Open", contact: "Bakery & Food Supplies", date: "12 Mar 2026", amount: "£2,400.00", email: "10 Mar, 11:30", description: "A transaction of £4,850.00 from Bakery & Food Supplies is significantly above the account average of £240.00.", primaryLabel: "Remove in Xero", external: true, fileAction: null },
  ];
  var duplicates = [
    { state: "Open", contact: "Yorkshire Tea Estates", date: "17 Mar 2026", amount: "£1,200.00", email: "15 Mar, 08:45", description: "Two identical transactions of £1,200.00 from Yorkshire Tea Estates were recorded on 17 Mar 2026.", primaryLabel: "Remove in Xero", external: true, fileAction: null,
      extraRows: [
        { state: "Open", contact: "Yorkshire Tea Estates", date: "17 Mar 2026", amount: "£1,200.00", email: "15 Mar, 08:45" },
      ]
    },
  ];
  var dateDifferences = [
    { state: "Open", contact: "Direct Expenses", date: "14 Mar 2026", amount: "£1,080.00", email: "13 Mar, 14:00", description: "A bank statement entry dated 14 Mar 2026 is matched to a GL entry dated 17 Mar 2026 — a 3-day discrepancy.", primaryLabel: "Acknowledge", external: false, fileAction: null },
  ];
  var omitted = [
    { state: "Open", contact: "Internal Transfer", date: "28 Feb 2026", amount: "£810.00", email: "28 Feb, 09:00", description: "A bank statement line for an internal transfer of £12,000.00 on 28 Feb 2026 has no corresponding GL entry in Xero.", primaryLabel: "Remove in Xero", external: true, fileAction: null },
  ];
  var general = [
    { state: "Open", contact: "Unclassified", date: "22 Mar 2026", amount: "£510.00", email: "21 Mar, 17:20", description: "A transaction of £85.00 on 22 Mar 2026 could not be automatically classified.", primaryLabel: "Remove in Xero", external: true, fileAction: null },
  ];

  var bannerConfig = null;

  var navCategories = effectiveClean ? [] : [
    { key: "missing",   label: "Missing entries",   items: missingEntries,  baseIdx: 0 },
    { key: "anomaly",   label: "Anomalies",          items: isHSBC ? [] : anomalies,       baseIdx: 3 },
    { key: "duplicate", label: "Duplicates",         items: isHSBC ? [] : duplicates,      baseIdx: 4 },
    { key: "date",      label: "Date differences",   items: isHSBC ? [] : dateDifferences, baseIdx: 5 },
    { key: "omitted",   label: "Omitted",            items: isHSBC ? [] : omitted,         baseIdx: 6 },
    { key: "general",   label: "General",            items: isHSBC ? [] : general,         baseIdx: 7 },
  ].filter(function(c) { return c.items.length > 0; });

  var categoryCounts = navCategories.map(function(c) { return { label: c.label, count: c.items.length }; });
  var rpTotalSuggestions = categoryCounts.reduce(function(s, c) { return s + c.count; }, 0);

  // Helper to render a card for any entry
  var renderCard = function(entry, cardIdx, catKey, localIdx) {
    var isCardResolved = resolvedCards.has(cardIdx);
    var isCardIgnored  = ignoredCards.has(cardIdx);
    return (
      <div key={cardIdx} id={"result-" + catKey + "-" + localIdx} style={{ scrollMarginTop: 64 }}>
        <RecommendationCard
          title={(CAT_LABELS[catKey] || catKey) + ": " + entry.contact}
          description={entry.description}
          statusLabel={isCardResolved ? "Resolved" : "Unresolved"}
          statusStyle={isCardResolved ? { background: "#EAF2E2", border: "none", color: "#05A105" } : { background: "#FDF8EE", border: "none", color: "#D5A750" }}
          collapsed={isCardResolved || isCardIgnored}
          isIgnored={isCardIgnored}
          tableRow={{ state: entry.state, contact: entry.contact, date: entry.date, amount: entry.amount, email: entry.email }}
          tableRows={entry.extraRows ? [{ state: entry.state, contact: entry.contact, date: entry.date, amount: entry.amount, email: entry.email }].concat(entry.extraRows) : null}
          primaryLabel={entry.primaryLabel}
          secondaryLabel={catKey === "missing" ? null : "Mark as done"}
          external={entry.external}
          fileAction={entry.fileAction}
          onPrimaryAction={
            entry.primaryLabel === "Create spend money" ? function() { onOpenSpendMoney?.(entry, cardIdx); } :
            entry.primaryLabel === "Review and publish"  ? function() { onOpenBatchDraft?.(entry, cardIdx); } :
            entry.primaryLabel === "Reconcile in Xero"   ? function() { onResolveCard?.(cardIdx); onShowToast?.("Reconciled in Xero successfully"); } :
            function() { onResolveCard?.(cardIdx); onShowToast?.("Action completed successfully"); }
          }
          onSecondaryAction={catKey === "missing" ? undefined : function() { onResolveCard?.(cardIdx); onShowToast?.("Marked as done"); }}
          onMore={undefined}
          onIgnore={function() { onIgnoreCard?.(cardIdx); onShowToast?.("Suggestion ignored"); }}
        />
      </div>
    );
  };

  return (
    <div ref={containerRef} style={{ fontFamily: "'Inter', sans-serif", minHeight: "100%" }}>
      <div style={{ padding: "48px " + (boxesOpen ? 338 : 48) + "px 48px 48px", transition: "padding-right 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

      {/* Heading */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: "#080908", margin: 0 }}>Results</h2>
        <SecondaryButton onClick={handleReSync} disabled={resyncing} style={{ height: 36, padding: "0 14px", fontSize: 14, borderRadius: 8, gap: resyncing ? 8 : 0 }}>
          {resyncing && (
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, animation: "spin 0.75s linear infinite" }}>
              <path d="M10 2A8 8 0 1 1 2 10" stroke="#05A105" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
          {resyncing ? "Syncing..." : "Re-sync"}
        </SecondaryButton>
      </div>

      {/* Matched box — shown for clean accounts */}
      {effectiveClean && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "40px 24px", textAlign: "center", border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", marginBottom: 28 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#EAF2E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4.5 11.5L8.5 15.5L17.5 7" stroke="#05A105" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p style={{ fontSize: 16, fontWeight: 500, color: "#080908", margin: 0 }}>All {matchedTotal != null ? matchedTotal : 420} transactions matched</p>
          <p style={{ fontSize: 14, color: "#8C8C8B", margin: 0, maxWidth: 520, lineHeight: "22px" }}>Every bank statement line has been matched and verified against GL records in Xero. No suggestions found.</p>
          {onAccountsOverview && (
            <PrimaryButton onClick={onAccountsOverview} style={{ marginTop: 8 }}>Accounts overview</PrimaryButton>
          )}
        </div>
      )}

      {/* Analysis & key findings */}
      <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, marginBottom: 28, overflow: "hidden" }}>
        <button onClick={function() { setAnalysisOpen(function(o) { return !o; }); }}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", border: "none", background: "none", cursor: "pointer" }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>Analysis & key findings</span>
          <div style={{ display: "flex", transform: analysisOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s", flexShrink: 0 }}>
            <ChevronUpIcon />
          </div>
        </button>
        {analysisOpen && (
          <div style={{ padding: "0 16px 16px", fontSize: 14, color: "#4F4F4F", lineHeight: "22px", borderTop: "1px solid #EFF1F4", paddingTop: 14 }}>
            {effectiveClean
              ? "The reconciliation completed successfully with no issues found. All 420 bank statement lines were matched to GL records in Xero. The account balance is confirmed with zero discrepancy."
              : "The reconciliation found 8 items requiring attention across 6 categories. The most significant issues are 3 missing entries totalling £720.00. Balance is confirmed matching at £12,439.00 with 361 of 380 bank statement lines matched to GL records."
            }
          </div>
        )}
      </div>

      {/* Account summary table */}
      {(function() {
        var ACCOUNT_SUMMARY = {
          "Lloyds Bank - Business":        { feed: "£155,000.00", statement: "£155,000.00", gl: "£143,000.00", diff: "£12,000.00", matched: "241/244" },
          "Lloyds Bank - Operations GBP":  { feed: "£127,000.00", statement: "£127,000.00", gl: "£115,000.00", diff: "£12,000.00", matched: "361/380" },
          "HSBC - Business Transactions":  { feed: "£93,000.00",  statement: "£95,500.00",  gl: "£61,020.00",  diff: "£31,980.00", matched: "189/195" },
          "Barclays - Operations":         { feed: "£374,000.00", statement: "£374,000.00", gl: "£380,000.00", diff: "£6,000.00",  matched: "409/420" },
          "American Express OP GBP":       { feed: "£87,420.00",  statement: "£87,420.00",  gl: "£85,640.00",  diff: "£1,780.00",  matched: "98/105"  },
          "Mastercard Business":           { feed: "£155,000.00", statement: "£155,000.00", gl: "£152,500.00", diff: "£2,500.00",  matched: "53/56"   },
        };
        var s = resyncOverride || ACCOUNT_SUMMARY[accountName] || { feed: "—", statement: "—", gl: "—", diff: "—", matched: "—" };
        var rows = [
          { label: "Feed balance",            value: s.feed      },
          { label: "Bank statement balance",  value: s.statement },
          { label: "GL balance",              value: s.gl        },
          { label: "Difference",              value: s.diff      },
          { label: "Transactions matched",    value: s.matched   },
        ];
        return (
          <div style={{ marginBottom: 12 }}>
            <DataTable
              columns={[
                { key: "label", label: "Description", width: "1fr" },
                { key: "value", label: "Value",       width: "160px" },
              ]}
              rows={rows.map(function(r) { return Object.assign({}, r, { value: <span style={{ fontWeight: 400 }}>{r.value}</span> }); })}
            />
          </div>
        );
      })()}

      {/* Suggestions heading */}
      {!effectiveClean && <h3 style={{ fontSize: 16, fontWeight: 500, color: "#080908", margin: "32px 0 16px" }}>Suggestions</h3>}

      {/* Results summary table */}
      <div style={{ marginBottom: 12 }}>
        <DataTable
          columns={[
            { key: "description", label: "Suggestion description", width: "1fr" },
            { key: "issues",      label: "Suggestions found",      width: "160px" },
            { key: "total",       label: "Total",                  width: "140px" },
          ]}
          rows={resultRows}
          footerRow={{
            description: "Total",
            issues: resultRows.reduce(function(s, r) { return s + r.issues; }, 0),
            total: "£" + resultRows.reduce(function(s, r) { return s + parseFloat((r.total || "£0").replace(/[£,]/g, "")); }, 0).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          }}
        />
      </div>

      {!effectiveClean && !ACCOUNT_CARDS[accountName] && <p style={{ fontSize: 14, color: "#000000", margin: "32px 0 16px" }}>{missingEntries.length} Missing {missingEntries.length === 1 ? "entry" : "entries"}</p>}

      {/* Per-account cards for HSBC etc — grouped by category */}
      {!effectiveClean && ACCOUNT_CARDS[accountName] && (function() {
        var CAT_GROUP_LABELS = { missing: "Missing entries", anomaly: "Anomalies", duplicate: "Duplicates", date: "Date differences", omitted: "Omitted", general: "General" };
        var catOrder = ["missing", "anomaly", "duplicate", "date", "omitted", "general"];
        var grouped = catOrder.reduce(function(acc, key) {
          var items = ACCOUNT_CARDS[accountName].filter(function(e) { return e.cat === key; });
          if (items.length) acc.push({ key: key, items: items });
          return acc;
        }, []);
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {grouped.map(function(group, gi) {
              return (
              <div key={group.key}>
                {gi > 0 && <div style={{ height: 32 }} />}
                <h3 style={{ fontSize: 14, fontWeight: 500, color: "#000000", margin: "32px 0 12px" }}>{CAT_GROUP_LABELS[group.key] || group.key}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {group.items.map(function(entry, localIdx) {
                    return renderCard(entry, entry.idx, entry.cat, localIdx);
                  })}
                </div>
              </div>
              );
            })}
          </div>
        );
      })()}

      {/* Missing entry cards — default (Lloyds) */}
      {!effectiveClean && !ACCOUNT_CARDS[accountName] && <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {missingEntries.map(function(entry, i) {
          return renderCard(entry, i, "missing", i);
        })}
      </div>}

      {!effectiveClean && !isHSBC && !ACCOUNT_CARDS[accountName] && (<>
      <p style={{ fontSize: 14, color: "#000000", margin: "24px 0 16px" }}>1 Anomaly</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {anomalies.map(function(entry, i) { return renderCard(entry, 3 + i, "anomaly", i); })}
      </div>
      <p style={{ fontSize: 14, color: "#000000", margin: "24px 0 16px" }}>1 Duplicate</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {duplicates.map(function(entry, i) { return renderCard(entry, 4 + i, "duplicate", i); })}
      </div>
      <p style={{ fontSize: 14, color: "#000000", margin: "24px 0 16px" }}>1 Date difference</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {dateDifferences.map(function(entry, i) { return renderCard(entry, 5 + i, "date", i); })}
      </div>
      <p style={{ fontSize: 14, color: "#000000", margin: "24px 0 16px" }}>1 Omitted</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {omitted.map(function(entry, i) { return renderCard(entry, 6 + i, "omitted", i); })}
      </div>
      <p style={{ fontSize: 14, color: "#000000", margin: "24px 0 16px" }}>1 General</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {general.map(function(entry, i) { return renderCard(entry, 7 + i, "general", i); })}
      </div>
      </>)}
      <div style={{ paddingBottom: 32 }} />

      </div>
      </div>
    </div>
  );
}

// ── Account picker (keyboard-navigable) ────────────────────────────────────
function AccountPicker(_ref) {
  var accounts = _ref.accounts;
  var highlightedAccount = _ref.highlightedAccount;
  var setHighlightedAccount = _ref.setHighlightedAccount;
  var onConfirm = _ref.onConfirm;
  var _s = React.useState(-1), hoveredIndex = _s[0], setHoveredIndex = _s[1];

  React.useEffect(function() {
    var handler = function(e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedAccount(function(i) { return Math.min(i + 1, accounts.length - 1); });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedAccount(function(i) { return Math.max(i - 1, 0); });
      } else if (e.key === "Enter") {
        e.preventDefault();
        onConfirm(accounts[highlightedAccount]);
      }
    };
    window.addEventListener("keydown", handler);
    return function() { window.removeEventListener("keydown", handler); };
  }, [highlightedAccount, accounts, onConfirm, setHighlightedAccount]);

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{
        background: "#FFFFFF",
        border: "1px solid #E9E9EB",
        borderRadius: 8,
        padding: "20px 20px 12px",
        boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
      }}>
        <p style={{ fontSize: 14, fontWeight: 500, color: "#080908", marginBottom: 12, marginTop: 0 }}>Select bank account</p>
        {accounts.map(function(acc, i) {
          var isKeyActive = i === highlightedAccount;
          var isHovered = i === hoveredIndex;
          var bg = isKeyActive ? "#E3E3E3" : isHovered ? "#F0F0F0" : "#F7F7F7";
          return (
            <div
              key={acc}
              onClick={function() { onConfirm(acc); }}
              onMouseEnter={function() { setHoveredIndex(i); }}
              onMouseLeave={function() { setHoveredIndex(-1); }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "15px 16px",
                marginBottom: 8,
                background: bg,
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: isKeyActive ? 600 : 400,
                color: "#080908",
                boxSizing: "border-box",
                transition: "background 0.1s",
              }}
            >
              <span>{acc}</span>
              {isKeyActive && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginLeft: 8, opacity: 0.45 }}>
                  <path d="M3.69714 14.804L7.69604 18.8029C7.758 18.8653 7.83171 18.9149 7.91293 18.9487C7.99415 18.9826 8.08126 19 8.16924 19C8.25723 19 8.34434 18.9826 8.42556 18.9487C8.50677 18.9149 8.58049 18.8653 8.64245 18.8029C8.70491 18.7409 8.7545 18.6672 8.78833 18.586C8.82217 18.5047 8.83959 18.4176 8.83959 18.3297C8.83959 18.2417 8.82217 18.1546 8.78833 18.0733C8.7545 17.9921 8.70491 17.9184 8.64245 17.8565L5.77657 14.9972H17.5C18.3838 14.9972 19.2314 14.6461 19.8564 14.0212C20.4813 13.3962 20.8324 12.5486 20.8324 11.6648V5.66648C20.8324 5.48972 20.7622 5.3202 20.6372 5.19521C20.5122 5.07022 20.3427 5 20.1659 5C19.9892 5 19.8196 5.07022 19.6947 5.19521C19.5697 5.3202 19.4994 5.48972 19.4994 5.66648V11.6648C19.4994 12.1951 19.2888 12.7037 18.9138 13.0786C18.5389 13.4536 18.0303 13.6643 17.5 13.6643H5.77657L8.64245 10.8051C8.76795 10.6796 8.83845 10.5093 8.83845 10.3319C8.83845 10.1544 8.76795 9.98416 8.64245 9.85866C8.51694 9.73316 8.34673 9.66265 8.16924 9.66265C7.99176 9.66265 7.82154 9.73316 7.69604 9.85866L3.69714 13.8576C3.63468 13.9195 3.58509 13.9932 3.55126 14.0744C3.51742 14.1557 3.5 14.2428 3.5 14.3308C3.5 14.4187 3.51742 14.5059 3.55126 14.5871C3.58509 14.6683 3.63468 14.742 3.69714 14.804Z" fill="black"/>
                </svg>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 10 }}>
        <span style={{ fontSize: 12, color: "#8C8C8B" }}>{"↑↓ to navigate"}</span>
        <span style={{ fontSize: 12, color: "#CFCFD1" }}>{"·"}</span>
        <span style={{ fontSize: 12, color: "#8C8C8B" }}>{"Enter to select"}</span>
      </div>
    </div>
  );
}

// ── Generic option picker (keyboard-navigable, used in BS flow) ──────────────
function BSOptionPicker(_ref) {
  var title = _ref.title;
  var options = _ref.options;
  var onSelect = _ref.onSelect;
  var _s = React.useState(0), highlighted = _s[0], setHighlighted = _s[1];
  var _s2 = React.useState(-1), hovered = _s2[0], setHovered = _s2[1];
  React.useEffect(function() {
    var handler = function(e) {
      if (e.key === "ArrowDown") { e.preventDefault(); setHighlighted(function(i) { return Math.min(i + 1, options.length - 1); }); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setHighlighted(function(i) { return Math.max(i - 1, 0); }); }
      else if (e.key === "Enter") { e.preventDefault(); onSelect(options[highlighted]); }
    };
    window.addEventListener("keydown", handler);
    return function() { window.removeEventListener("keydown", handler); };
  }, [highlighted, options, onSelect]);
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, padding: "20px 20px 12px", boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)" }}>
        {title && <p style={{ fontSize: 14, fontWeight: 500, color: "#080908", marginBottom: 12, marginTop: 0 }}>{title}</p>}
        {options.map(function(opt, i) {
          var isKeyActive = i === highlighted;
          var isHov = i === hovered;
          var bg = isKeyActive ? "#E3E3E3" : isHov ? "#F0F0F0" : "#F7F7F7";
          return (
            <div key={opt} onClick={function() { onSelect(opt); }} onMouseEnter={function() { setHovered(i); }} onMouseLeave={function() { setHovered(-1); }}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "15px 16px", marginBottom: 8, background: bg, borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: isKeyActive ? 600 : 400, color: "#080908", boxSizing: "border-box" }}>
              <span>{opt}</span>
              {isKeyActive && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginLeft: 8, opacity: 0.45 }}>
                  <path d="M3.69714 14.804L7.69604 18.8029C7.758 18.8653 7.83171 18.9149 7.91293 18.9487C7.99415 18.9826 8.08126 19 8.16924 19C8.25723 19 8.34434 18.9826 8.42556 18.9487C8.50677 18.9149 8.58049 18.8653 8.64245 18.8029C8.70491 18.7409 8.7545 18.6672 8.78833 18.586C8.82217 18.5047 8.83959 18.4176 8.83959 18.3297C8.83959 18.2417 8.82217 18.1546 8.78833 18.0733C8.7545 17.9921 8.70491 17.9184 8.64245 17.8565L5.77657 14.9972H17.5C18.3838 14.9972 19.2314 14.6461 19.8564 14.0212C20.4813 13.3962 20.8324 12.5486 20.8324 11.6648V5.66648C20.8324 5.48972 20.7622 5.3202 20.6372 5.19521C20.5122 5.07022 20.3427 5 20.1659 5C19.9892 5 19.8196 5.07022 19.6947 5.19521C19.5697 5.3202 19.4994 5.48972 19.4994 5.66648V11.6648C19.4994 12.1951 19.2888 12.7037 18.9138 13.0786C18.5389 13.4536 18.0303 13.6643 17.5 13.6643H5.77657L8.64245 10.8051C8.76795 10.6796 8.83845 10.5093 8.83845 10.3319C8.83845 10.1544 8.76795 9.98416 8.64245 9.85866C8.51694 9.73316 8.34673 9.66265 8.16924 9.66265C7.99176 9.66265 7.82154 9.73316 7.69604 9.85866L3.69714 13.8576C3.63468 13.9195 3.58509 13.9932 3.55126 14.0744C3.51742 14.1557 3.5 14.2428 3.5 14.3308C3.5 14.4187 3.51742 14.5059 3.55126 14.5871C3.58509 14.6683 3.63468 14.742 3.69714 14.804Z" fill="black"/>
                </svg>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 10 }}>
        <span style={{ fontSize: 12, color: "#8C8C8B" }}>{"↑↓ to navigate"}</span>
        <span style={{ fontSize: 12, color: "#CFCFD1" }}>{"·"}</span>
        <span style={{ fontSize: 12, color: "#8C8C8B" }}>{"Enter to select"}</span>
      </div>
    </div>
  );
}

// ── Reconciliation flow ───────────────────────────────────────────────────────
function ReconciliationFlow(_ref) {
  var accountName = _ref.accountName;
  var onClose = _ref.onClose;
  var showResults = _ref.showResults || false;
  var allResolved = _ref.allResolved || false;
  var isCleanReconcile = _ref.isCleanReconcile || false;
  var onUploadStatement = _ref.onUploadStatement;
  var reconciledDate = _ref.reconciledDate || null;
  var reconciledMatchedStr = _ref.reconciledMatchedStr || null;
  var accountStatus = _ref.accountStatus || null;
  var existingStatement = _ref.existingStatement || null;
  var reconciledStatuses = _ref.reconciledStatuses || {};
  var reconciledCounts = _ref.reconciledCounts || {};
  var selectedPeriod = _ref.selectedPeriod || "April 2026";
  var initialResolvedCards = _ref.initialResolvedCards || null;
  var initialIgnoredCards = _ref.initialIgnoredCards || null;

  var accounts = [
    "Lloyds Bank - Business", "Lloyds Bank - Operations GBP",
    "HSBC - Business Transactions", "Barclays - Operations",
    "American Express OP GBP", "Mastercard Business",
  ];
  var isPicker = accountName === "__picker__";
  var _sAcc = useState(isPicker ? null : accountName), selectedAccount = _sAcc[0], setSelectedAccount = _sAcc[1];
  var _sAccSel = useState(!isPicker), accountSelected = _sAccSel[0], setAccountSelected = _sAccSel[1];
  var _sHL = useState(isPicker ? 0 : -1), highlightedAccount = _sHL[0], setHighlightedAccount = _sHL[1];
  var effectiveIsCleanReconcile = isCleanReconcile || (isPicker && selectedAccount === "Lloyds Bank - Operations GBP");
  var effectiveAccountName = selectedAccount || accountName;
  var _sDD = useState(false), dropdownOpen = _sDD[0], setDropdownOpen = _sDD[1];
  var _sIV = useState(""), inputValue = _sIV[0], setInputValue = _sIV[1];
  var _sAB = useState(true), isAtBottom = _sAB[0], setIsAtBottom = _sAB[1];
  var _sUF = useState(showResults ? [{ name: (existingStatement && existingStatement.fileName) || "bank-statement.pdf", type: "application/pdf" }] : existingStatement ? [{ name: existingStatement.fileName, type: existingStatement.fileName && existingStatement.fileName.endsWith(".csv") ? "text/csv" : "application/pdf" }] : null), uploadedFiles = _sUF[0], setUploadedFiles = _sUF[1];
  var _sPU = useState(null), previewUrl = _sPU[0], setPreviewUrl = _sPU[1];
  var _sPD = useState(showResults || !!existingStatement), prepDone = _sPD[0], setPrepDone = _sPD[1];
  var _sSC = useState(showResults), startClicked = _sSC[0], setStartClicked = _sSC[1];
  var _sHS = useState(0), highlightedStart = _sHS[0], setHighlightedStart = _sHS[1];
  var _sSS = useState(showResults ? RECONCILIATION_STEPS.map(function() { return "done"; }) : []), stepStatuses = _sSS[0], setStepStatuses = _sSS[1];
  var _sST = useState(showResults ? RECONCILIATION_STEPS.map(function(s) { return s.subtext || ""; }) : []), stepSubtexts = _sST[0], setStepSubtexts = _sST[1];
  var _sVS = useState(showResults ? RECONCILIATION_STEPS.length : 0), visibleSteps = _sVS[0], setVisibleSteps = _sVS[1];
  var _sSP = useState(showResults), stepsPopulated = _sSP[0], setStepsPopulated = _sSP[1];
  var _sRC = useState(showResults), reconciliationCollapsed = _sRC[0], setReconciliationCollapsed = _sRC[1];
  var _sUM = useState([]), userMessages = _sUM[0], setUserMessages = _sUM[1];
  var _sFP = useState(showResults ? "upload" : null), feedProceedChoice = _sFP[0], setFeedProceedChoice = _sFP[1];
  var _sCC = useState(false), csvConverting = _sCC[0], setCsvConverting = _sCC[1];
  var _sCD = useState(false), csvConvertDone = _sCD[0], setCsvConvertDone = _sCD[1];
  var _sRP = useState(false), reuploadPhase = _sRP[0], setReuploadPhase = _sRP[1];
  var _sRSM = useState(false), replaceStatementMode = _sRSM[0], setReplaceStatementMode = _sRSM[1];
  var _sRV = useState(showResults), resultsVisible = _sRV[0], setResultsVisible = _sRV[1];
  var _sCR = useState(showResults), canvasReady = _sCR[0], setCanvasReady = _sCR[1];
  var _sBO = useState(false), boxesOpen = _sBO[0], setBoxesOpen = _sBO[1];
  var _sCBD = useState(false), creditCardBannerDismissed = _sCBD[0], setCreditCardBannerDismissed = _sCBD[1];
  var addStatementInputRef = useRef(null);
  var _sCW = useState(400), chatWidth = _sCW[0], setChatWidth = _sCW[1];
  var _sID = useState(false), isDragging = _sID[0], setIsDragging = _sID[1];
  var _sAD = useState(false), allDocsOpen = _sAD[0], setAllDocsOpen = _sAD[1];
  var _sPSD = useState(null), preselectedDocs = _sPSD[0], setPreselectedDocs = _sPSD[1];
  var _sSMS = useState(null), spendMoneySidebar = _sSMS[0], setSpendMoneySidebar = _sSMS[1];
  var chatScrollRef = useRef(null);
  var chatEndRef    = useRef(null);
  var dropdownRef   = useRef(null);
  var stepRowRefs   = useRef([]);
  var _sBDS = useState(null), batchDraftSidebar = _sBDS[0], setBatchDraftSidebar = _sBDS[1];
  var _sIC = useState(false), isClosing = _sIC[0], setIsClosing = _sIC[1];
  var ACCOUNT_TOTAL_SUGGESTIONS = {
    "Lloyds Bank - Business": 8,
    "HSBC - Business Transactions": 58,
    "Barclays - Operations": 5,
    "American Express OP GBP": 4,
    "Mastercard Business": 3,
  };
  var totalSuggestions = ACCOUNT_TOTAL_SUGGESTIONS[accountName] != null ? ACCOUNT_TOTAL_SUGGESTIONS[accountName] : 8;
  var allResolvedSet = allResolved ? new Set(Array.from({ length: totalSuggestions }, function(_, i) { return i; })) : new Set();
  var _sRCards = useState(initialResolvedCards ? new Set(initialResolvedCards) : allResolvedSet), resolvedCards = _sRCards[0], setResolvedCards = _sRCards[1];
  var _sICards = useState(initialIgnoredCards ? new Set(initialIgnoredCards) : new Set()), ignoredCards = _sICards[0], setIgnoredCards = _sICards[1];

  // Drag handler for resizable chat panel
  var handleDragStart = function(e) {
    e.preventDefault();
    setIsDragging(true);
    var startX = e.clientX;
    var startWidth = chatWidth;

    var onMouseMove = function(e) {
      var newWidth = Math.max(280, Math.min(700, startWidth + (e.clientX - startX)));
      setChatWidth(newWidth);
    };

    var onMouseUp = function() {
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

  var reconciliationComplete = stepStatuses.length > 0 && stepStatuses.every(function(s) { return s === "done"; });

  useEffect(function() {
    if (reconciliationComplete) setResultsVisible(true);
  }, [reconciliationComplete]);

  // Escape key
  useEffect(function() {
    var onKeyDown = function(e) {
      if (e.key !== "Escape") return;
      if (allDocsOpen)        { setAllDocsOpen(false); return; }
      if (spendMoneySidebar)  { setSpendMoneySidebar(null); return; }
      if (batchDraftSidebar)  { setBatchDraftSidebar(null); return; }
      var remaining = Math.max(0, totalSuggestions - resolvedCards.size - ignoredCards.size);
      onClose(canvasReady, (resolvedCards.size + ignoredCards.size) >= totalSuggestions, effectiveAccountName, remaining, resolvedCards, ignoredCards);
    };
    window.addEventListener("keydown", onKeyDown);
    return function() { window.removeEventListener("keydown", onKeyDown); };
  }, [allDocsOpen, spendMoneySidebar, batchDraftSidebar, canvasReady, resolvedCards, ignoredCards, totalSuggestions, effectiveAccountName]);

  // Delay canvas content until panel has slid in; auto-open sidebar
  useEffect(function() {
    if (!resultsVisible) return;
    if (showResults) { setCanvasReady(true); setBoxesOpen(true); return; }
    setCanvasReady(false);
    var t1 = setTimeout(function() { setCanvasReady(true); }, 3200);
    var t2 = setTimeout(function() { setBoxesOpen(true); }, 3800);
    return function() { clearTimeout(t1); clearTimeout(t2); };
  }, [resultsVisible]);

  useEffect(function() {
    if (stepStatuses.length > 0 && stepStatuses.every(function(s) { return s === "done"; })) {
      var t = setTimeout(function() { setReconciliationCollapsed(true); }, 600);
      return function() { clearTimeout(t); };
    }
  }, [stepStatuses]);

  var handleRestart = function() {
    setResultsVisible(false);
    setUploadedFiles(null);
    setPreviewUrl(null);
    setPrepDone(false);
    setStartClicked(false);
    setStepStatuses([]);
    setStepSubtexts([]);
    setUserMessages([]);
    setReuploadPhase(false);
    setFeedProceedChoice(null);
    setCsvConverting(false);
    setCsvConvertDone(false);
    setInputValue("");
    setTimeout(function() { setCanvasReady(false); }, 720);
  };

  var handleAddStatementFile = function(e) {
    var file = e.target.files && e.target.files[0];
    if (!file) return;
    e.target.value = "";
    var newFiles = (uploadedFiles || []).concat([{ name: file.name, type: file.type }]);
    setResultsVisible(false);
    setPreviewUrl(null);
    setPrepDone(false);
    setStartClicked(false);
    setStepStatuses([]);
    setStepSubtexts([]);
    setUserMessages([]);
    setReuploadPhase(false);
    setFeedProceedChoice("upload");
    setInputValue("");
    setCreditCardBannerDismissed(false);
    setTimeout(function() {
      setCanvasReady(false);
      setUploadedFiles(newFiles);
    }, 50);
  };

  var handleReplaceStatement = function() {
    setReplaceStatementMode(true);
    setResultsVisible(false);
    setCanvasReady(false);
    setBoxesOpen(false);
  };

  var handleSend = function() {
    var msg = inputValue.trim();
    if (!msg) return;
    setUserMessages(function(prev) { return prev.concat([msg]); });
    setInputValue("");
    setUploadedFiles(null);
    setPreviewUrl(null);
    setPrepDone(false);
    setStartClicked(false);
    setStepStatuses([]);
    setStepSubtexts([]);
    setReuploadPhase(true);
  };

  // Phase 1: reveal steps one by one
  useEffect(function() {
    if (!startClicked || showResults) return;
    var REVEAL_INTERVAL = 600;
    var timers = [];
    RECONCILIATION_STEPS.forEach(function(_, i) {
      timers.push(setTimeout(function() {
        setVisibleSteps(i + 1);
      }, i * REVEAL_INTERVAL));
    });
    var totalRevealTime = (RECONCILIATION_STEPS.length - 1) * REVEAL_INTERVAL + 450;
    timers.push(setTimeout(function() { setStepsPopulated(true); }, totalRevealTime));
    return function() { timers.forEach(clearTimeout); };
  }, [startClicked]);

  // Phase 2: run spinner through steps once all are populated
  useEffect(function() {
    if (!stepsPopulated || showResults) return;
    setStepStatuses(RECONCILIATION_STEPS.map(function(_, i) { return i === 0 ? "active" : "pending"; }));
    setStepSubtexts(RECONCILIATION_STEPS.map(function() { return false; }));
    var cumulative = 0;
    var timers = [];
    RECONCILIATION_STEPS.forEach(function(step, i) {
      cumulative += step.duration;
      if (step.subtext) {
        timers.push(setTimeout(function() {
          setStepSubtexts(function(prev) { var next = prev.slice(); next[i] = true; return next; });
        }, cumulative - 400));
      }
      timers.push(setTimeout(function() {
        setStepStatuses(function(prev) {
          var next = prev.slice();
          next[i] = "done";
          if (i + 1 < RECONCILIATION_STEPS.length) next[i + 1] = "active";
          return next;
        });
      }, cumulative));
    });
    return function() { timers.forEach(clearTimeout); };
  }, [stepsPopulated]);

  // After file is selected, wait 2.2s then start AI response
  useEffect(function() {
    if (!uploadedFiles || showResults || feedProceedChoice === "convert") return;
    var t = setTimeout(function() { setPrepDone(true); }, 2200);
    return function() { clearTimeout(t); };
  }, [uploadedFiles]);

  // Inject spin keyframe once
  useEffect(function() {
    if (document.getElementById("_spin_kf")) return;
    var s = document.createElement("style");
    s.id = "_spin_kf";
    s.textContent = "@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }";
    document.head.appendChild(s);
  }, []);

  // CSV conversion flow
  useEffect(function() {
    if (feedProceedChoice !== "convert" || !uploadedFiles || csvConvertDone) return;
    var t1 = setTimeout(function() { setCsvConverting(true); }, 600);
    var t2 = setTimeout(function() { setCsvConverting(false); setCsvConvertDone(true); }, 3200);
    return function() { clearTimeout(t1); clearTimeout(t2); };
  }, [uploadedFiles, feedProceedChoice]);

  var handleFileSelected = function(fileOrDocs) {
    var files = Array.isArray(fileOrDocs) ? fileOrDocs : [fileOrDocs];
    setUploadedFiles(files);
    if (files.length === 1 && files[0].type && files[0].type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(files[0]));
    }
    var now = new Date();
    var dateStr = now.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    if (onUploadStatement) onUploadStatement(selectedAccount, { fileName: files[0].name, date: dateStr });
  };

  // Thinking delay
  var _sTD = useState(showResults), thinkingDone = _sTD[0], setThinkingDone = _sTD[1];
  var _sWS = useState(showResults ? 2 : 0), workflowStep = _sWS[0], setWorkflowStep = _sWS[1];
  var _sSTM = useState(false), slowThinkingMsg = _sSTM[0], setSlowThinkingMsg = _sSTM[1];
  var isSlowAccount = accountName === "Lloyds Bank - Operations GBP";
  useEffect(function() {
    if (showResults) return;
    var slow = accountName === "Lloyds Bank - Operations GBP";
    var pickerFlow = accountName === "__picker__";
    if (!pickerFlow) {
      var thinkDuration = slow ? 20000 : 2400;
      var t1 = setTimeout(function() { setWorkflowStep(1); }, 1200);
      var t2 = setTimeout(function() { setWorkflowStep(2); setThinkingDone(true); }, thinkDuration);
      var t3 = slow ? setTimeout(function() { setSlowThinkingMsg(true); }, 5000) : null;
      return function() { clearTimeout(t1); clearTimeout(t2); if (t3) clearTimeout(t3); };
    } else {
      var t = setTimeout(function() { setThinkingDone(true); }, 3000);
      return function() { clearTimeout(t); };
    }
  }, []);

  // Visual completion tracker
  var _sL2VD = useState(showResults), line2VisualDone = _sL2VD[0], setLine2VisualDone = _sL2VD[1];
  useEffect(function() {
    if (!thinkingDone || showResults) return;
    var t = setTimeout(function() { setLine2VisualDone(true); }, 900);
    return function() { clearTimeout(t); };
  }, [thinkingDone]);

  // Two-line message
  var line1Segments = [
    { text: "Great, let's reconcile a ", bold: false },
    { text: "bank account.",             bold: true  },
  ];
  var line1Full = line1Segments.map(function(s) { return s.text; }).join("");
  var _tw1 = useTypewriter(line1Full, 18, showResults); var line1Done = _tw1.done;

  var line2Text = "Tell me what bank account you want to reconcile";
  var _tw2 = useTypewriter(isPicker && line1Done ? line2Text : "", 18, showResults); var line2Done = _tw2.done;

  // Line 3 AI message
  var isNoFeedAccount = effectiveAccountName === "American Express OP GBP";
  var clientUpload = showResults && existingStatement && existingStatement.uploadedBy;
  var line3Segments = isNoFeedAccount ? [
    { text: selectedAccount, bold: true },
    { text: " doesn't have a bank feed connected. To reconcile this account, you'll need to provide a bank statement.", bold: false },
  ] : clientUpload ? [
    { text: "Client ", bold: false },
    { text: existingStatement.uploadedBy, bold: true },
    { text: " uploaded a bank statement for ", bold: false },
    { text: selectedAccount, bold: true },
    { text: " on " + existingStatement.date + (existingStatement.time ? " at " + existingStatement.time : "") + ".", bold: false },
  ] : [
    { text: "I couldn't find any bank statement for ", bold: false },
    { text: selectedAccount,                          bold: true  },
    { text: ". Could you upload the bank statement for me, or click All documents and select one that has already been uploaded.", bold: false },
  ];
  var line3Full = line3Segments.map(function(s) { return s.text; }).join("");
  var line3Trigger = isPicker ? accountSelected : (line1Done && accountSelected);
  var _sL3TD = useState(showResults), line3ThinkingDone = _sL3TD[0], setLine3ThinkingDone = _sL3TD[1];
  var _sTS = useState(0), thinkingSeconds = _sTS[0], setThinkingSeconds = _sTS[1];
  useEffect(function() {
    if (!line3Trigger || showResults) return;
    var slow = accountName === "Lloyds Bank - Operations GBP";
    setLine3ThinkingDone(false);
    setSlowThinkingMsg(false);
    setThinkingSeconds(0);
    var t = setTimeout(function() { setLine3ThinkingDone(true); }, slow ? 20000 : 3000);
    var t2 = slow ? setTimeout(function() { setSlowThinkingMsg(true); }, 5000) : null;
    var ticker = slow ? setInterval(function() { setThinkingSeconds(function(s) { return s + 1; }); }, 1000) : null;
    return function() { clearTimeout(t); if (t2) clearTimeout(t2); if (ticker) clearInterval(ticker); };
  }, [line3Trigger]);
  var _tw3 = useTypewriter(line3ThinkingDone ? line3Full : "", 18, showResults); var line3Done = _tw3.done;

  // Convert-path AI response
  var convertRespText = "Upload your PDF or image statement and I'll convert it to CSV for you before running the reconciliation.";
  var _twCR = useTypewriter(feedProceedChoice === "convert" ? convertRespText : "", 18, showResults); var convertRespDone = _twCR.done;

  // Line 4
  var fileCount = uploadedFiles ? uploadedFiles.length : 1;
  var line4Segments = fileCount > 1 ? [
    { text: "I have everything I need to reconcile ", bold: false },
    { text: selectedAccount,                          bold: true  },
    { text: " with account number ",                  bold: false },
    { text: "601613 31926819",                         bold: true  },
    { text: ". I've received ",                       bold: false },
    { text: fileCount + " bank statements",           bold: true  },
    { text: " and will reconcile across all of them.", bold: false },
  ] : [
    { text: "I have everything I need to reconcile ", bold: false },
    { text: selectedAccount,                          bold: true  },
    { text: " with account number ",                  bold: false },
    { text: "601613 31926819",                         bold: true  },
    { text: ".",                                      bold: false },
  ];
  var line4Full = line4Segments.map(function(s) { return s.text; }).join("");
  var _tw4 = useTypewriter(prepDone ? line4Full : "", 18, showResults); var line4Done = _tw4.done;

  // Line 5
  var line5Text = "Tell me whenever you're ready to start.";
  var _tw5 = useTypewriter(line4Done ? line5Text : "", 18, showResults); var line5Done = _tw5.done;

  // Replace statement AI response
  var replaceRespText = "Sure! Upload a new bank statement and I'll re-run the reconciliation against it.";
  var _twRR = useTypewriter(replaceStatementMode ? replaceRespText : "", 18); var replaceRespChars = _twRR.chars; var replaceRespDone = _twRR.done;

  // Arrow key + Enter navigation for "Ready to start?" card
  var startOptions = [
    { label: "Start reconciliation", primary: true },
    { label: "Upload another bank statement", primary: false },
  ];
  useEffect(function() {
    if (!line5Done || startClicked) return;
    var handler = function(e) {
      if (e.key === "ArrowDown") { e.preventDefault(); setHighlightedStart(function(i) { return Math.min(i + 1, startOptions.length - 1); }); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setHighlightedStart(function(i) { return Math.max(i - 1, 0); }); }
      else if (e.key === "Enter") { e.preventDefault(); if (highlightedStart === 0) setStartClicked(true); }
    };
    window.addEventListener("keydown", handler);
    return function() { window.removeEventListener("keydown", handler); };
  }, [line5Done, startClicked, highlightedStart]);

  // Close dropdown on click outside
  useEffect(function() {
    if (!dropdownOpen) return;
    var handler = function(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return function() { document.removeEventListener("mousedown", handler); };
  }, [dropdownOpen]);

  // Auto-scroll chat to bottom
  useEffect(function() {
    var t = setTimeout(function() {
      if (chatScrollRef.current) {
        chatScrollRef.current.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: "smooth" });
      }
    }, 120);
    return function() { clearTimeout(t); };
  }, [line1Done, line2Done, line3Done, line4Done, line5Done, prepDone, startClicked, stepStatuses, userMessages, accountSelected, replaceStatementMode, replaceRespDone, visibleSteps]);

  // Track whether the chat is scrolled to the bottom
  useEffect(function() {
    var el = chatScrollRef.current;
    if (!el) return;
    var onScroll = function() {
      setIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 40);
    };
    el.addEventListener("scroll", onScroll);
    return function() { el.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'Inter', sans-serif", background: "#FBFBFB", transform: isClosing ? "translateX(100%)" : undefined, transition: isClosing ? "transform 0.5s cubic-bezier(0.16,1,0.3,1)" : undefined }}>
      <style>{"\
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }\
        @keyframes pulse { 0%,80%,100%{opacity:0.3;transform:scale(0.9)} 40%{opacity:1;transform:scale(1)} }\
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }\
        @keyframes fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }\
        @keyframes resultsFadeIn { from{opacity:0} to{opacity:1} }\
        @keyframes textShimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }\
        @keyframes slideInFromRight { from{transform:translateX(100%)} to{transform:translateX(0)} }\
        @keyframes slideUpFade { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }\
        @keyframes thinkingShimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }\
        @keyframes stepPop { 0%{transform:scale(0.8);opacity:0} 100%{transform:scale(1);opacity:1} }\
        @keyframes stepReveal { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }\
        .mimo-loader { width:auto; height:20px; overflow:visible; }\
        .mimo-loader path { fill:#1F2024; transform-box:fill-box; transform-origin:center; }\
        .mimo-loader--spinning .m-right, .mimo-loader--spinning .m-left { animation:mimo-counter-a 2.2s infinite; }\
        .mimo-loader--spinning .m-diag { animation:mimo-counter-b 2.2s infinite; }\
        @keyframes mimo-counter-a {\
          0%   { transform:rotate(0deg);    animation-timing-function:linear; }\
          10%  { transform:rotate(0deg);    animation-timing-function:cubic-bezier(.65,0,.35,1); }\
          45%  { transform:rotate(360deg);  animation-timing-function:linear; }\
          55%  { transform:rotate(360deg);  animation-timing-function:cubic-bezier(.65,0,.35,1); }\
          90%, 100% { transform:rotate(0deg); }\
        }\
        @keyframes mimo-counter-b {\
          0%   { transform:rotate(0deg);    animation-timing-function:linear; }\
          10%  { transform:rotate(0deg);    animation-timing-function:cubic-bezier(.65,0,.35,1); }\
          45%  { transform:rotate(-360deg); animation-timing-function:linear; }\
          55%  { transform:rotate(-360deg); animation-timing-function:cubic-bezier(.65,0,.35,1); }\
          90%, 100% { transform:rotate(0deg); }\
        }\
      "}</style>

      {/* Top bar */}
      <div style={{ height: 96, background: "#FFFFFF", borderBottom: "1px solid #ECECEC", display: "flex", alignItems: "center", padding: "0 24px", flexShrink: 0, gap: 16, zIndex: 10, position: "relative" }}>
        <span style={{ fontSize: 24, fontWeight: 500, color: "#080908", flexShrink: 0, letterSpacing: "-1px" }}>Bank reconciliation</span>

        {/* Account dropdown */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            onClick={function() { setDropdownOpen(function(o) { return !o; }); }}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 12px", height: 48, border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908" }}
          >
            <span style={{ color: selectedAccount ? "#080908" : "#9D9D9E" }}>
              {selectedAccount || "Select account"}
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition: "transform 0.2s ease", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>
              <path d="M4 6L8 10L12 6" stroke="#080908" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {dropdownOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 100, minWidth: 380, overflow: "hidden", padding: "6px" }}>
              {accounts.map(function(acc) {
                var isSelected = acc === selectedAccount;
                var status = reconciledStatuses[acc];
                var count  = reconciledCounts[acc];
                var cfg    = STATUS_CONFIG[status];
                var label  = status === "suggestions" && count != null ? count + " suggestions" : cfg && cfg.label;
                return (
                  <button key={acc} onClick={function() { setSelectedAccount(acc); setDropdownOpen(false); }}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, textAlign: "left", padding: "10px 12px", fontSize: 14, color: "#080908", fontWeight: isSelected ? 500 : 400, background: isSelected ? "#F5F5F5" : "transparent", border: "none", cursor: "pointer", borderRadius: 8, boxSizing: "border-box" }}
                    onMouseEnter={function(e) { if (!isSelected) e.currentTarget.style.background = "#FAFAFA"; }}
                    onMouseLeave={function(e) { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
                  >
                    <span style={{ whiteSpace: "nowrap" }}>{acc}</span>
                    {cfg && (
                      <span style={{ fontSize: 12, fontWeight: 500, color: cfg.color, background: cfg.color + "18", padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>
                        {label}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ flex: 1 }} />

        {/* Uploaded file pills */}
        {uploadedFiles && uploadedFiles.length > 0 && (
          <>
            <div style={{ display: "flex", alignItems: "center", height: 48, border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", flexShrink: 0, overflow: "hidden" }}>
              {uploadedFiles.map(function(file, i) {
                return (
                  <React.Fragment key={i}>
                    {i > 0 && <div style={{ width: 1, height: 32, background: "#E9E9EB", flexShrink: 0 }} />}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 12px" }}>
                      <FileIcon file={file} width={24} height={24} />
                      <span style={{ fontSize: 14, color: "#080908", fontWeight: 500, whiteSpace: "nowrap" }}>
                        {file.name}
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
            {resultsVisible && canvasReady && !effectiveIsCleanReconcile && (
              <div style={{ width: 1, height: 32, background: "#E9E9EB", flexShrink: 0, margin: "0 8px" }} />
            )}
          </>
        )}

        {resultsVisible && canvasReady && !effectiveIsCleanReconcile && (function() {
          var isHSBCCanvas = effectiveAccountName === "HSBC - Business Transactions";
          var totalSugg = ACCOUNT_TOTAL_SUGGESTIONS[effectiveAccountName] != null ? ACCOUNT_TOTAL_SUGGESTIONS[effectiveAccountName] : 8;
          var resolved = resolvedCards.size + ignoredCards.size;
          var pct = totalSugg > 0 ? Math.min(100, Math.round((resolved / totalSugg) * 100)) : 0;
          var allDone = resolved >= totalSugg;
          return (
            <button
              onClick={function() { setBoxesOpen(function(o) { return !o; }); }}
              style={{
                display: "flex", alignItems: "center", gap: 0,
                marginRight: 8, cursor: "pointer", fontFamily: "inherit",
                border: "1px solid #E9E9EB",
                borderRadius: 8,
                background: "#FFFFFF",
                height: 48,
                minWidth: 48,
                padding: boxesOpen ? 0 : "0 12px 0 0",
                overflow: "hidden",
                justifyContent: "center",
                flexShrink: 0,
                transition: "padding 0.35s cubic-bezier(0.16,1,0.3,1), background 0.15s",
              }}
              onMouseEnter={function(e) { e.currentTarget.style.background = "#F7F7F7"; }}
              onMouseLeave={function(e) { e.currentTarget.style.background = "#FFFFFF"; }}
            >
              {/* Expandable text + progress */}
              <div style={{
                maxWidth: boxesOpen ? 0 : 180,
                opacity: boxesOpen ? 0 : 1,
                overflow: "hidden",
                transition: "max-width 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s, padding 0.35s cubic-bezier(0.16,1,0.3,1)",
                display: "flex", flexDirection: "column", gap: 4,
                paddingLeft: boxesOpen ? 0 : 12, paddingRight: boxesOpen ? 0 : 10,
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#545453", whiteSpace: "nowrap" }}>Suggestions</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#080908", whiteSpace: "nowrap" }}>{resolved}/{totalSugg}</span>
                </div>
                <div style={{ height: 2, background: "#E9E9EB", borderRadius: 1, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: pct + "%", background: allDone ? "#4C71DF" : "#05A105", borderRadius: 1, transition: "width 0.4s ease, background 0.3s ease" }} />
                </div>
              </div>
              {/* Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M15 21L15 3M16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21Z" stroke="#1F2024" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          );
        })()}
        <button onClick={function() { var remaining = Math.max(0, totalSuggestions - resolvedCards.size - ignoredCards.size); onClose(canvasReady, (resolvedCards.size + ignoredCards.size) >= totalSuggestions, effectiveAccountName, remaining, resolvedCards, ignoredCards); }}
          style={{ border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: "50%", flexShrink: 0, padding: 0 }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <rect width="30" height="30" rx="15" fill="#F5F5F5"/>
            <path d="M20 10L10 20M10 10L20 20" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Content area */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative", padding: 16 }}>

      {/* Left: chat panel */}
      <div style={{
        display: "flex", flexDirection: "column",
        width: resultsVisible ? chatWidth : "100%",
        flexShrink: 0,
        transition: isDragging ? "none" : "width 0.72s cubic-bezier(0.16, 1, 0.3, 1)",
        overflow: "hidden",
        willChange: "width",
        position: "relative",
        zIndex: 1,
      }}>

        {/* Floating scroll-to-bottom button */}
        {resultsVisible && (
          <button
            onClick={function() {
              var el = chatScrollRef.current;
              if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
            }}
            style={{
              position: "absolute", bottom: 218, left: "50%", transform: "translateX(-50%)",
              zIndex: 10,
              width: 32, height: 32, borderRadius: "50%",
              background: "#FFFFFF", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
              opacity: isAtBottom ? 0 : 1,
              pointerEvents: isAtBottom ? "none" : "auto",
              transition: "opacity 0.35s ease",
            }}
            onMouseEnter={function(e) { e.currentTarget.style.background = "#F5F5F5"; }}
            onMouseLeave={function(e) { e.currentTarget.style.background = "#FFFFFF"; }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

      {/* Chat area */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
      <div ref={chatScrollRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", scrollBehavior: "smooth" }}>
        {/* Top fade */}
        {resultsVisible && <div style={{ position: "sticky", top: 0, left: 0, right: 0, height: 40, marginBottom: -40, background: "linear-gradient(to bottom, rgba(251,251,251,1) 0%, rgba(251,251,251,0) 100%)", zIndex: 2, pointerEvents: "none", flexShrink: 0 }} />}
        <div style={{ maxWidth: 680, width: "100%", margin: "0 auto", padding: resultsVisible ? "24px 24px 72px" : "24px 24px 72px", flex: 1, display: "flex", flexDirection: "column" }}>

          {!clientUpload && (
            <>
              <WorkflowCard />
              {thinkingDone && (
                <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", width: resultsVisible ? "90%" : "70%" }}>
                  {isPicker && <p style={{ marginTop: 0 }}><StreamingMessage segments={line1Segments} speed={18} instant={showResults} /></p>}
                  {isPicker && line1Done && (
                    <p style={{ marginTop: 6 }}>
                      <StreamingMessage key="line2" segments={[{ text: line2Text, bold: false }]} speed={18} instant={showResults} />
                    </p>
                  )}
                </div>
              )}
              {/* Logo row — only visible while on the initial greeting */}
              {!thinkingDone && !accountSelected && <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12, animation: "slideUpFade 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
                <svg className="mimo-loader mimo-loader--spinning" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg" aria-label="Thinking">
                  <path className="m-right" d="M21.2948 0.314453H16.2686V19.8217H21.2948V0.314453Z"/>
                  <path className="m-diag"  d="M3.55406 0L0 3.55406L10.9144 14.4685L14.4685 10.9144L3.55406 0Z"/>
                  <path className="m-left"  d="M5.56185 10.7432H0.535645V19.8207H5.56185V10.7432Z"/>
                </svg>
                <span style={{
                  fontSize: 14, display: "inline-block",
                  background: "linear-gradient(90deg, #8C8C8B 0%, #8C8C8B 25%, #D4D4D4 50%, #8C8C8B 75%, #8C8C8B 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "thinkingShimmer 2.4s linear infinite, slideUpFade 0.4s cubic-bezier(0.16,1,0.3,1) 0.15s both",
                }}>{!isPicker && workflowStep === 0 ? "Running workflow..." : "Thinking..."}</span>
              </div>}
              {slowThinkingMsg && !thinkingDone && !accountSelected && (
                <div style={{ marginTop: 8, paddingLeft: 4, animation: "slideUpFade 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
                  <span style={{
                    fontSize: 13, display: "inline-block",
                    background: "linear-gradient(90deg, #BCBCBC 0%, #BCBCBC 20%, #6E6E6E 50%, #BCBCBC 80%, #BCBCBC 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "thinkingShimmer 2.8s linear infinite",
                  }}>This is taking a bit longer — working on matching transactions against your GL records in Xero...</span>
                </div>
              )}
            </>
          )}

          {/* User reply bubble */}
          {!clientUpload && accountSelected && line1Done && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, animation: "slideUpFade 0.4s cubic-bezier(0.16,1,0.3,1) both" }}>
              <div style={{
                maxWidth: 400,
                background: "#EAF2E2",
                borderRadius: "12px 12px 2px 12px",
                padding: "10px 14px",
                fontSize: 14,
                color: "#080908",
                lineHeight: "22px",
              }}>
                {selectedAccount}
              </div>
            </div>
          )}

          {/* AI line 3 — thinking + couldn't find statement */}
          {line3Trigger && (
            <>
              {!line3ThinkingDone && (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 20, animation: "slideUpFade 0.5s cubic-bezier(0.16,1,0.3,1) 0.5s both" }}>
                    <svg className="mimo-loader mimo-loader--spinning" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg" aria-label="Thinking">
                      <path className="m-right" d="M21.2948 0.314453H16.2686V19.8217H21.2948V0.314453Z"/>
                      <path className="m-diag"  d="M3.55406 0L0 3.55406L10.9144 14.4685L14.4685 10.9144L3.55406 0Z"/>
                      <path className="m-left"  d="M5.56185 10.7432H0.535645V19.8207H5.56185V10.7432Z"/>
                    </svg>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{
                        fontSize: 14, display: "inline-block",
                        background: "linear-gradient(90deg, #8C8C8B 0%, #8C8C8B 25%, #D4D4D4 50%, #8C8C8B 75%, #8C8C8B 100%)",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        animation: "thinkingShimmer 2.4s linear infinite",
                      }}>Thinking...</span>
                      {slowThinkingMsg && (
                        <>
                          <span style={{ fontSize: 14, color: "#7C7C7C" }}>{"·"}</span>
                          <span style={{ fontSize: 14, color: "#7C7C7C", fontVariantNumeric: "tabular-nums" }}>{thinkingSeconds}s</span>
                        </>
                      )}
                    </div>
                  </div>
                  {slowThinkingMsg && (
                    <div style={{ marginTop: 20, animation: "slideUpFade 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
                      <span style={{
                        fontSize: 14, display: "inline-block",
                        background: "linear-gradient(90deg, #7C7C7C 0%, #7C7C7C 20%, #C0C0C0 50%, #7C7C7C 80%, #7C7C7C 100%)",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        animation: "thinkingShimmer 2.8s linear infinite",
                      }}>This is taking a bit longer — working on matching transactions against your GL records in Xero...</span>
                    </div>
                  )}
                </>
              )}
              {line3ThinkingDone && (
                <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20, width: "70%" }}>
                  <p><StreamingMessage key="line3" segments={line3Segments} speed={18} instant={showResults} /></p>
                </div>
              )}
            </>
          )}

          {/* User bubble — file preview after upload */}
          {uploadedFiles && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "flex-end", maxWidth: "100%" }}>
                {uploadedFiles.map(function(file, idx) {
                  return (
                    <div key={idx} style={{
                      width: 180,
                      background: "#FFFFFF",
                      border: "1px solid #E9E9EB",
                      borderRadius: 8,
                      overflow: "hidden",
                    }}>
                      {previewUrl && idx === 0 ? (
                        <img src={previewUrl} alt="preview" style={{ width: "100%", display: "block" }} />
                      ) : (
                        <div style={{ padding: "14px 12px 12px", background: "#FFFFFF", borderBottom: "1px solid #F0F0F0" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                            {[55, 30].map(function(w, i) { return <div key={i} style={{ height: 5, borderRadius: 3, background: "#E8E8E8", width: w + "%" }} />; })}
                          </div>
                          {[100, 75, 90, 60, 85, 70, 95, 55, 80].map(function(w, i) {
                            return <div key={i} style={{ height: 4, borderRadius: 2, background: i % 3 === 2 ? "#F0F0F0" : "#EBEBEB", width: w + "%", marginBottom: 5 }} />;
                          })}
                          <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                            {[80, 60, 90, 70, 75, 55].map(function(w, i) {
                              return <div key={i} style={{ height: 4, borderRadius: 2, background: "#EBEBEB", width: w + "%" }} />;
                            })}
                          </div>
                        </div>
                      )}
                      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px" }}>
                        <FileIcon file={file} width={18} height={22} />
                        <span style={{ fontSize: 14, fontWeight: 500, color: "#080908", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{file.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CSV conversion progress */}
          {feedProceedChoice === "convert" && uploadedFiles && !csvConvertDone && (
            <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20, width: "70%", display: "flex", alignItems: "center", gap: 10 }}>
              {csvConverting ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, animation: "spin 1s linear infinite" }}>
                    <circle cx="8" cy="8" r="6.5" stroke="#E9E9EB" strokeWidth="1.5"/>
                    <path d="M8 1.5A6.5 6.5 0 0 1 14.5 8" stroke="#05A105" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>Converting your statement to CSV…</span>
                </>
              ) : (
                <span style={{ color: "#8C8C8B" }}>Preparing…</span>
              )}
            </div>
          )}

          {/* CSV conversion done — steps card */}
          {feedProceedChoice === "convert" && csvConvertDone && (
            <>
              <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20, width: "70%" }}>
                <p>Your statement has been converted to CSV and is ready to download. You'll need to upload it to Xero to complete the bank reconciliation.</p>
              </div>
              <div style={{ marginTop: 16, background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, padding: "24px 24px 16px", boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)" }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#080908", marginBottom: 16, marginTop: 0 }}>Proceed with bank statement</p>
                {/* Step 1 — Download CSV */}
                <div
                  onClick={function() {
                    var csv = "Date,Description,Amount\n2026-03-01,Opening balance,0.00\n2026-03-05,Yorkshire Tea Estates,-240.00\n2026-03-12,Clifton & Harrow Supplies,-1180.00\n2026-03-14,Meridian Office Solutions,-530.00";
                    var blob = new Blob([csv], { type: "text/csv" });
                    var url = URL.createObjectURL(blob);
                    var a = document.createElement("a");
                    a.href = url;
                    a.download = ((uploadedFiles && uploadedFiles[0] && uploadedFiles[0].name) ? uploadedFiles[0].name.replace(/\.[^.]+$/, "") : "statement") + "-converted.csv";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "14px 18px", marginBottom: 8, background: "#F7F7F7", borderRadius: 10, cursor: "pointer", boxSizing: "border-box", transition: "background 0.1s" }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = "#F0F0F0"; }}
                  onMouseLeave={function(e) { e.currentTarget.style.background = "#F7F7F7"; }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#E9E9EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, fontWeight: 600, color: "#545453" }}>1</span>
                  <span style={{ fontSize: 14, color: "#080908" }}>Download file in CSV</span>
                </div>
                {/* Step 2 — Go to Xero */}
                <div
                  onClick={function() { window.open("https://go.xero.com", "_blank", "noopener,noreferrer"); }}
                  style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "14px 18px", marginBottom: 8, background: "#F7F7F7", borderRadius: 10, cursor: "pointer", boxSizing: "border-box", transition: "background 0.1s" }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = "#F0F0F0"; }}
                  onMouseLeave={function(e) { e.currentTarget.style.background = "#F7F7F7"; }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#E9E9EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, fontWeight: 600, color: "#545453" }}>2</span>
                  <span style={{ fontSize: 14, color: "#080908" }}>Go to Xero and import statement</span>
                </div>
                {/* Step 3 — Reconcile now */}
                <div
                  onClick={function() { setFeedProceedChoice("upload"); setCsvConvertDone(false); setPrepDone(true); setStartClicked(true); }}
                  style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "14px 18px", marginBottom: 8, background: "#F7F7F7", borderRadius: 10, cursor: "pointer", boxSizing: "border-box", transition: "background 0.1s" }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = "#F0F0F0"; }}
                  onMouseLeave={function(e) { e.currentTarget.style.background = "#F7F7F7"; }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#E9E9EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, fontWeight: 600, color: "#545453" }}>3</span>
                  <span style={{ fontSize: 14, color: "#080908" }}>I have imported the statement in Xero. Reconcile account now</span>
                </div>
              </div>
            </>
          )}

          {/* AI line 4 */}
          {prepDone && feedProceedChoice !== "convert" && (
            <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20, width: "70%" }}>
              <p><StreamingMessage key="line4" segments={line4Segments} speed={18} instant={showResults} /></p>
            </div>
          )}

          {/* AI line 5 */}
          {line4Done && feedProceedChoice !== "convert" && !clientUpload && (
            <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 6, width: "70%" }}>
              <p><StreamingMessage key="line5" segments={[{ text: line5Text, bold: false }]} speed={18} instant={showResults} /></p>
            </div>
          )}

          {/* User sent messages + re-upload flow */}
          {userMessages.map(function(msg, i) {
            return (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                  <div style={{ maxWidth: 400, background: "#EAF2E2", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: "#080908", lineHeight: "22px" }}>
                    {msg}
                  </div>
                </div>
                {i === userMessages.length - 1 && (
                  <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                    <p>Sure! Please upload the new bank statement.</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* User bubble — Start reconciliation */}
          {startClicked && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
              <div style={{
                maxWidth: 400,
                background: clientUpload ? "#F0F0F0" : "#EAF2E2",
                borderRadius: "12px 12px 2px 12px",
                padding: "10px 14px",
                fontSize: 14,
                color: clientUpload ? "#8C8C8B" : "#080908",
                lineHeight: "22px",
                fontStyle: clientUpload ? "italic" : "normal",
              }}>
                {clientUpload ? "Reconciliation triggered automatically" : "Start reconciliation"}
              </div>
            </div>
          )}

          {/* Reconciliation progress */}
          {startClicked && visibleSteps > 0 && (
            <div style={{ marginTop: 24 }}>
              {/* Header */}
              <div
                onClick={function() { setReconciliationCollapsed(function(c) { return !c; }); }}
                style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: reconciliationCollapsed ? 0 : 20, cursor: "pointer" }}
              >
                <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6.50065 6.4987L10.6257 10.6237M6.50065 6.4987H3.75065L2.83398 3.7487L3.75065 2.83203L6.50065 3.7487V6.4987ZM18.6547 3.51129L16.2461 5.91994C15.8831 6.28296 15.7016 6.46446 15.6335 6.67377C15.5737 6.85787 15.5737 7.05619 15.6335 7.2403C15.7016 7.4496 15.8831 7.63111 16.2461 7.99412L16.4636 8.21161C16.8266 8.57462 17.0081 8.75613 17.2174 8.82414C17.4015 8.88396 17.5998 8.88396 17.7839 8.82414C17.9932 8.75613 18.1747 8.57462 18.5377 8.21161L20.7908 5.95852C21.0335 6.54901 21.1673 7.19573 21.1673 7.8737C21.1673 10.6581 18.9101 12.9154 16.1257 12.9154C15.79 12.9154 15.4619 12.8826 15.1446 12.82C14.699 12.7321 14.4761 12.6881 14.3411 12.7016C14.1975 12.7159 14.1267 12.7374 13.9995 12.8055C13.8798 12.8696 13.7597 12.9896 13.5196 13.2298L6.95898 19.7904C6.19959 20.5497 4.96838 20.5497 4.20899 19.7904C3.44959 19.031 3.44959 17.7997 4.20899 17.0403L10.7696 10.4798C11.0097 10.2396 11.1298 10.1196 11.1938 9.99989C11.2619 9.87265 11.2834 9.80188 11.2977 9.65827C11.3112 9.5232 11.2673 9.30038 11.1794 8.85475C11.1168 8.53742 11.084 8.20939 11.084 7.8737C11.084 5.08926 13.3412 2.83203 16.1257 2.83203C17.0474 2.83203 17.9113 3.07937 18.6547 3.51129ZM12.0007 14.7486L17.0423 19.7903C17.8017 20.5497 19.0329 20.5497 19.7923 19.7903C20.5517 19.0309 20.5517 17.7996 19.7923 17.0403L15.6447 12.8927C15.3511 12.8649 15.0648 12.812 14.788 12.736C14.4314 12.6381 14.0402 12.7092 13.7787 12.9707L12.0007 14.7486Z" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#080908" }}>Reconciliation</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: "transform 0.2s ease", transform: reconciliationCollapsed ? "rotate(180deg)" : "rotate(0deg)" }}>
                      <path d="M3 8.5L7 4.5L11 8.5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 13, color: "#8C8C8B" }}>
                    {stepsPopulated && stepStatuses.every(function(s) { return s === "done"; }) ? "Completed" : "In progress"}
                  </span>
                </div>
              </div>

              {/* Steps */}
              {!reconciliationCollapsed && RECONCILIATION_STEPS.map(function(step, i) {
                if (i >= visibleSteps) return null;
                var status = stepsPopulated ? (stepStatuses[i] || "pending") : "pending";
                var isLast = i === RECONCILIATION_STEPS.length - 1;
                return (
                  <div key={i} ref={function(el) { stepRowRefs.current[i] = el; }} style={{ display: "flex", gap: 16, animation: "stepReveal 0.4s cubic-bezier(0.16,1,0.3,1) both" }}>
                    {/* Circle + connector line */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 2, overflow: "visible" }}>
                      <div style={{ width: 20, height: 20, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "visible" }}>
                        {status === "done" && (
                          <svg key={"done-" + i} width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: "stepPop 0.35s cubic-bezier(0.34,1.4,0.64,1) both", overflow: "visible" }}>
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
                      {!isLast && i + 1 < visibleSteps && (
                        <div style={{ width: 1, flexGrow: 1, minHeight: 20, background: "#E9E9EB", margin: "4px 0" }} />
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ paddingBottom: isLast ? 0 : 20, paddingTop: 0 }}>
                      <div style={{
                        fontSize: 14, lineHeight: "24px",
                        fontWeight: 400,
                        color: status === "pending" ? "#BCBCBC" : "#080908",
                        transition: "color 0.3s ease",
                      }}>
                        {step.title}
                      </div>
                      {(stepSubtexts[i] || status === "done") && step.subtext && (
                        <div style={{ fontSize: 13, color: "#8C8C8B", marginTop: 2, lineHeight: "18px", animation: "fadeIn 0.3s ease" }}>
                          {step.subtext}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Replace statement flow */}
          {replaceStatementMode && (
            <>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                <div style={{ maxWidth: 400, background: "#EAF2E2", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: "#080908", lineHeight: "22px" }}>
                  New statement
                </div>
              </div>
              {replaceRespChars && (
                <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20, width: "70%" }}>
                  <p style={{ margin: 0 }}>{replaceRespChars}</p>
                </div>
              )}
            </>
          )}

          {/* Mimo loader */}
          {(function() {
            var isStreaming = (isPicker && thinkingDone && !line2VisualDone)
              || thinkingDone && (!line1Done
              || (isPicker && line1Done && !line2Done))
              || (line3ThinkingDone && !line3Done && (isPicker ? (line2Done && accountSelected) : line1Done))
              || (uploadedFiles && !prepDone)
              || (prepDone && !line4Done)
              || (line4Done && !line5Done);
            return isStreaming ? (
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 20 }}>
                <svg className="mimo-loader mimo-loader--spinning" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg" aria-label="Loading">
                  <path className="m-right" d="M21.2948 0.314453H16.2686V19.8217H21.2948V0.314453Z"/>
                  <path className="m-diag"  d="M3.55406 0L0 3.55406L10.9144 14.4685L14.4685 10.9144L3.55406 0Z"/>
                  <path className="m-left"  d="M5.56185 10.7432H0.535645V19.8207H5.56185V10.7432Z"/>
                </svg>
                <span style={{
                  fontSize: 14, display: "inline-block",
                  background: "linear-gradient(90deg, #8C8C8B 0%, #8C8C8B 25%, #D4D4D4 50%, #8C8C8B 75%, #8C8C8B 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "thinkingShimmer 2.4s linear infinite",
                }}>Writing...</span>
              </div>
            ) : null;
          })()}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Account picker — pinned at the bottom */}
      {!clientUpload && isPicker && thinkingDone && line2Done && line2VisualDone && !accountSelected && (
        <div style={{ padding: "28px 24px 24px", flexShrink: 0 }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <AccountPicker
              accounts={accounts}
              highlightedAccount={highlightedAccount}
              setHighlightedAccount={setHighlightedAccount}
              onConfirm={function(acc) { setSelectedAccount(acc); setAccountSelected(true); }}
            />
          </div>
        </div>
      )}

      {/* Upload card — pinned at the bottom */}
      {!clientUpload && line3Done && !uploadedFiles && !reuploadPhase && !replaceStatementMode && (
        <div style={{ padding: "28px 24px 24px", flexShrink: 0 }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <UploadCard
                onFileSelected={handleFileSelected}
                onFilesSelected={handleFileSelected}
                onOpenAllDocs={function() { setAllDocsOpen(true); }}
                preselectedFiles={preselectedDocs}
                suggestedFiles={effectiveAccountName ? (function() {
                  var baseName = {
                    "Lloyds Bank - Business":       "lloyds-bank",
                    "Lloyds Bank - Operations GBP": "lloyds-operations",
                    "HSBC - Business Transactions": "hsbc-business",
                    "Barclays - Operations":        "barclays-operations",
                    "American Express OP GBP":      "amex-op",
                    "Mastercard Business":          "mastercard-business",
                  }[effectiveAccountName];
                  if (!baseName) return [];
                  return [
                    { name: baseName + "-statement-apr2026.csv", date: "Uploaded 4 Apr at 15:32 · Client · Sarah Thompson" },
                    { name: baseName + "-statement-mar2026.csv", date: "Uploaded 3 Mar at 09:14 · Client · Sarah Thompson" },
                  ];
                })() : []}
              />
          </div>
        </div>
      )}

      {/* Re-upload card */}
      {reuploadPhase && !uploadedFiles && (
        <div style={{ padding: "28px 24px 24px", flexShrink: 0 }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <UploadCard onFileSelected={function(file) { handleFileSelected(file); setReuploadPhase(false); }} onOpenAllDocs={function() { setAllDocsOpen(true); }} />
          </div>
        </div>
      )}

      {/* Replace statement upload */}
      {replaceStatementMode && replaceRespDone && (
        <div style={{ padding: "28px 24px 24px", flexShrink: 0 }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <UploadCard
              title="New statement"
              onFileSelected={function(file) {
                setReplaceStatementMode(false);
                setUploadedFiles([{ name: file.name, type: file.type }]);
                setPreviewUrl(null);
                setPrepDone(false);
                setStartClicked(false);
                setStepStatuses([]);
                setStepSubtexts([]);
                setResultsVisible(false);
                setCanvasReady(false);
              }}
              onOpenAllDocs={function() { setAllDocsOpen(true); }}
            />
          </div>
        </div>
      )}

      {/* Ready to start card */}
      {line5Done && !startClicked && feedProceedChoice !== "convert" && (
        <div style={{ padding: "28px 24px 24px", flexShrink: 0 }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{
              background: "#FFFFFF",
              border: "1px solid #E9E9EB",
              borderRadius: 8,
              padding: "24px 24px 16px",
              width: "100%",
              boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
            }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#080908", marginBottom: 16, marginTop: 0 }}>Ready to start?</p>
              {startOptions.map(function(_opt, i) {
                var label = _opt.label;
                var isKeyActive = i === highlightedStart;
                return (
                  <div
                    key={label}
                    onClick={function() { if (label === "Start reconciliation") setStartClicked(true); }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      width: "100%", padding: "14px 18px", marginBottom: 8,
                      background: isKeyActive ? "#E3E3E3" : "#F7F7F7",
                      border: "none", borderRadius: 10, cursor: "pointer",
                      fontSize: 14, fontWeight: isKeyActive ? 600 : 400, color: "#080908",
                      boxSizing: "border-box", transition: "background 0.1s",
                    }}
                    onMouseEnter={function(e) { if (!isKeyActive) e.currentTarget.style.background = "#F0F0F0"; }}
                    onMouseLeave={function(e) { if (!isKeyActive) e.currentTarget.style.background = "#F7F7F7"; }}
                  >
                    <span>{label}</span>
                    {isKeyActive && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginLeft: 8, opacity: 0.45 }}>
                        <path d="M3.69714 14.804L7.69604 18.8029C7.758 18.8653 7.83171 18.9149 7.91293 18.9487C7.99415 18.9826 8.08126 19 8.16924 19C8.25723 19 8.34434 18.9826 8.42556 18.9487C8.50677 18.9149 8.58049 18.8653 8.64245 18.8029C8.70491 18.7409 8.7545 18.6672 8.78833 18.586C8.82217 18.5047 8.83959 18.4176 8.83959 18.3297C8.83959 18.2417 8.82217 18.1546 8.78833 18.0733C8.7545 17.9921 8.70491 17.9184 8.64245 17.8565L5.77657 14.9972H17.5C18.3838 14.9972 19.2314 14.6461 19.8564 14.0212C20.4813 13.3962 20.8324 12.5486 20.8324 11.6648V5.66648C20.8324 5.48972 20.7622 5.3202 20.6372 5.19521C20.5122 5.07022 20.3427 5 20.1659 5C19.9892 5 19.8196 5.07022 19.6947 5.19521C19.5697 5.3202 19.4994 5.48972 19.4994 5.66648V11.6648C19.4994 12.1951 19.2888 12.7037 18.9138 13.0786C18.5389 13.4536 18.0303 13.6643 17.5 13.6643H5.77657L8.64245 10.8051C8.76795 10.6796 8.83845 10.5093 8.83845 10.3319C8.83845 10.1544 8.76795 9.98416 8.64245 9.85866C8.51694 9.73316 8.34673 9.66265 8.16924 9.66265C7.99176 9.66265 7.82154 9.73316 7.69604 9.85866L3.69714 13.8576C3.63468 13.9195 3.58509 13.9932 3.55126 14.0744C3.51742 14.1557 3.5 14.2428 3.5 14.3308C3.5 14.4187 3.51742 14.5059 3.55126 14.5871C3.58509 14.6683 3.63468 14.742 3.69714 14.804Z" fill="black"/>
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 10 }}>
              <span style={{ fontSize: 12, color: "#8C8C8B" }}>{"↑↓ to navigate"}</span>
              <span style={{ fontSize: 12, color: "#CFCFD1" }}>{"·"}</span>
              <span style={{ fontSize: 12, color: "#8C8C8B" }}>{"Enter to select"}</span>
            </div>
          </div>
        </div>
      )}

      {/* Reconciliation in progress box */}
      {startClicked && !resultsVisible && (
        <div style={{ padding: "0 24px 20px", flexShrink: 0 }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ borderRadius: 8, padding: "14px 14px 12px", background: "#FFFFFF", boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px #E9E9EB" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ fontSize: 14, lineHeight: "22px", flex: 1 }}>
                  <span style={{ background: "linear-gradient(90deg, #9D9D9E 0%, #9D9D9E 30%, #2A2A2A 50%, #9D9D9E 70%, #9D9D9E 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "textShimmer 2s linear infinite", display: "inline-block" }}>
                    Reconciliation in progress...
                  </span>
                </div>
                <button
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 36, padding: "0 10px", border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#080908", flexShrink: 0, boxSizing: "border-box" }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = "#F5F5F5"; }}
                  onMouseLeave={function(e) { e.currentTarget.style.background = "#FFFFFF"; }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="2" y="2" width="10" height="10" rx="1.5" stroke="#080908" strokeWidth="1.25" />
                  </svg>
                  Stop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Standalone textarea */}
      {thinkingDone && !((isPicker && line2Done && !accountSelected) || (line5Done && !startClicked) || (line3Done && !uploadedFiles && !reuploadPhase) || reuploadPhase || replaceStatementMode || (isNoFeedAccount && line3Done && !feedProceedChoice) || (feedProceedChoice === "convert" && uploadedFiles && !resultsVisible) || (uploadedFiles && !prepDone) || (prepDone && !line4Done) || (line4Done && !line5Done) || (startClicked && !resultsVisible) || (line3Trigger && !line3ThinkingDone) || (line3ThinkingDone && !line3Done)) && (
          <div style={{ padding: resultsVisible ? "60px 12px 16px" : "0 12px 16px", flexShrink: 0, background: resultsVisible ? "linear-gradient(to bottom, rgba(251,251,251,0) 0%, rgba(251,251,251,1) 60px)" : undefined, marginTop: resultsVisible ? -60 : 0 }}>
            <div style={{ maxWidth: 680, margin: "0 auto" }}>
              {/* Action buttons */}
              {resultsVisible && !replaceStatementMode && (
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  <button
                    onClick={handleRestart}
                    style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                      height: 40, padding: "0 16px",
                      border: "1px solid #E9E9EB", borderRadius: 8,
                      background: "#FFFFFF", cursor: "pointer",
                      boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                      fontSize: 14, fontWeight: 500, color: "#080908",
                    }}
                    onMouseEnter={function(e) { e.currentTarget.style.background = "#FAFAFA"; e.currentTarget.style.borderColor = "#CFCFD1"; }}
                    onMouseLeave={function(e) { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.borderColor = "#E9E9EB"; }}
                  >
                    <PlayCircleIcon color="#080908" size={18} />
                    Re-run
                  </button>
                </div>
              )}
              <div style={{
                borderRadius: 8, padding: "14px 14px 12px", background: "#FFFFFF",
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px #E9E9EB",
              }}>
                <textarea
                  value={inputValue}
                  onChange={function(e) { setInputValue(e.target.value); }}
                  onKeyDown={function(e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="Ask for changes or information..."
                  rows={3}
                  style={{ width: "100%", border: "none", outline: "none", resize: "none", fontSize: 14, color: "#080908", lineHeight: "22px", background: "transparent", fontFamily: "'Inter', sans-serif", display: "block" }}
                />
                <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                  {/* Attachment */}
                  <button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: "#8C8C8B", padding: 0 }}
                    onMouseEnter={function(e) { e.currentTarget.style.background = "#F5F5F5"; }}
                    onMouseLeave={function(e) { e.currentTarget.style.background = "none"; }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M15.5 8.5L8.5 15.5C7.12 16.88 4.88 16.88 3.5 15.5C2.12 14.12 2.12 11.88 3.5 10.5L10.5 3.5C11.33 2.67 12.67 2.67 13.5 3.5C14.33 4.33 14.33 5.67 13.5 6.5L6.5 13.5C6.08 13.92 5.42 13.92 5 13.5C4.58 13.08 4.58 12.42 5 12L11.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div style={{ flex: 1 }} />
                  {/* Microphone */}
                  <button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: "#8C8C8B", padding: 0 }}
                    onMouseEnter={function(e) { e.currentTarget.style.background = "#F5F5F5"; }}
                    onMouseLeave={function(e) { e.currentTarget.style.background = "none"; }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="6" y="1" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1.25" />
                      <path d="M3 9C3 12.31 5.69 15 9 15C12.31 15 15 12.31 15 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                      <line x1="9" y1="15" x2="9" y2="17" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                    </svg>
                  </button>
                  {/* Send */}
                  <button onClick={handleSend} style={{ width: 36, height: 36, marginLeft: 6, border: "1px solid #E9E9EB", borderRadius: 10, background: inputValue.trim() ? "#05A105" : "#FAFAFA", cursor: inputValue.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s", padding: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M9.99984 15.8346V4.16797M9.99984 4.16797L4.1665 10.0013M9.99984 4.16797L15.8332 10.0013" stroke={inputValue.trim() ? "#FFFFFF" : "#8C8C8B"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
      )}

      </div> {/* end chat area wrapper */}
      </div> {/* end left chat panel */}

      {/* Canvas — slides in from right */}
      <div style={{
        position: "absolute",
        top: 16, bottom: 16,
        left: chatWidth + 32,
        right: boxesOpen ? 432 : 16,
        background: "#FFFFFF",
        borderRadius: 8,
        border: "1px solid #ECECEC",
        overflow: "hidden",
        zIndex: 2,
        transform: resultsVisible ? "none" : "translateX(calc(100% + 32px))",
        transition: isDragging ? "none" : "transform 0.72s cubic-bezier(0.16, 1, 0.3, 1), right 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: resultsVisible ? "auto" : "transform",
      }}>
        {canvasReady ? (
          <div style={{ animation: "resultsFadeIn 0.4s ease 0.1s both", height: "100%", overflowY: "auto" }}>
            {/* Credit card statement warning banner */}
            {effectiveAccountName === "American Express OP GBP" && !creditCardBannerDismissed && (function() {
              var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
              var parts = selectedPeriod.split(" ");
              var mIdx = MONTHS.indexOf(parts[0]);
              var yr = parseInt(parts[1]);
              var prevM = MONTHS[(mIdx - 1 + 12) % 12];
              var nextM = MONTHS[(mIdx + 1) % 12];
              var nextY = mIdx === 11 ? yr + 1 : yr;
              var period1 = prevM + " 15 – " + parts[0] + " 14, " + yr;
              var period2 = parts[0] + " 15 – " + nextM + " 14, " + nextY;
              return (
                <div style={{ padding: "48px 48px 0 48px" }}><div style={{ maxWidth: 800, margin: "0 auto", background: "#FDF8EE", border: "1px solid #F5E1B5", borderRadius: 8, padding: "12px 16px", display: "flex", gap: 12, alignItems: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M9.99984 13.3334V10.0001M9.99984 6.66675H10.0082M18.3332 10.0001C18.3332 14.6025 14.6022 18.3334 9.99984 18.3334C5.39746 18.3334 1.6665 14.6025 1.6665 10.0001C1.6665 5.39771 5.39746 1.66675 9.99984 1.66675C14.6022 1.66675 18.3332 5.39771 18.3332 10.0001Z" stroke="#EAB758" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p style={{ flex: 1, fontSize: 14, fontWeight: 400, color: "#2A2A2A", margin: 0, lineHeight: "22px" }}>
                    Credit card statements cover a mid-month to mid-month period. To reconcile <strong>{parts[0]} {yr}</strong> in full, upload two files: <strong>{period1}</strong> and <strong>{period2}</strong>.
                  </p>
                  <input ref={addStatementInputRef} type="file" accept=".pdf,.csv,.xlsx,.xls" style={{ display: "none" }} onChange={handleAddStatementFile} />
                  <button onClick={function() { if (addStatementInputRef.current) addStatementInputRef.current.click(); }} style={{ flexShrink: 0, height: 36, padding: "0 14px", background: "#05A105", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#FFFFFF", whiteSpace: "nowrap", transition: "background 0.15s" }}
                    onMouseEnter={function(e) { e.currentTarget.style.background = "#058F05"; }}
                    onMouseLeave={function(e) { e.currentTarget.style.background = "#05A105"; }}>
                    Add statement
                  </button>
                  <button onClick={function() { setCreditCardBannerDismissed(true); }} style={{ flexShrink: 0, height: 36, padding: "0 14px", background: "#FFFFFF", border: "1px solid #DBDBDB", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#2A2A2A", whiteSpace: "nowrap", transition: "border-color 0.15s", boxSizing: "border-box" }}
                    onMouseEnter={function(e) { e.currentTarget.style.borderColor = "#CFCFD1"; }}
                    onMouseLeave={function(e) { e.currentTarget.style.borderColor = "#DBDBDB"; }}>
                    Dismiss
                  </button>
                </div></div>
              );
            })()}
            {false ? null : (
              <ResultsPanel
                accountName={effectiveAccountName}
                isCleanReconcile={effectiveIsCleanReconcile || (!allResolved && (resolvedCards.size + ignoredCards.size) >= totalSuggestions)}
                allJustResolved={!allResolved && (resolvedCards.size + ignoredCards.size) >= totalSuggestions}
                onAccountsOverview={function() { var remaining = Math.max(0, totalSuggestions - resolvedCards.size - ignoredCards.size); onClose(true, (resolvedCards.size + ignoredCards.size) >= totalSuggestions, effectiveAccountName, remaining, resolvedCards, ignoredCards); }}
                matchedTotal={reconciledMatchedStr ? parseInt(reconciledMatchedStr.split("/")[1]) || null : null}
                onOpenSpendMoney={function(entry, cardIndex) { setSpendMoneySidebar(Object.assign({}, entry, { cardIndex: cardIndex })); }}
                onOpenBatchDraft={function(entry, cardIndex) { setBatchDraftSidebar(Object.assign({}, entry, { cardIndex: cardIndex })); }}
                resolvedCards={resolvedCards}
                onResolveCard={function(idx) { setResolvedCards(function(prev) { return new Set([].concat(Array.from(prev), [idx])); }); }}
                ignoredCards={ignoredCards}
                onIgnoreCard={function(idx) { setIgnoredCards(function(prev) { return new Set([].concat(Array.from(prev), [idx])); }); }}
                onShowToast={function() {}}
                accountStatus={accountStatus}
                boxesOpen={false}
                uploadedFileName={uploadedFiles && uploadedFiles[0] ? uploadedFiles[0].name : undefined}
              />
            )}
          </div>
        ) : resultsVisible ? <CanvasLoader /> : null}
      </div>

      {/* Suggestions sidebar */}
      {canvasReady && (function() {
          var isHSBCCanvas = effectiveAccountName === "HSBC - Business Transactions";
          var isPreClean = effectiveIsCleanReconcile;
          var allJustResolved = (
            (!allResolved && (resolvedCards.size + ignoredCards.size) >= totalSuggestions) ||
            (allResolved && accountStatus === "completed")
          );
          var isClean = isPreClean || allJustResolved;

          var navCats = isPreClean ? []
            : isHSBCCanvas ? [
              { key: "missing",   label: "Missing entries",  baseIdx:  0, items: [{ contact: "Meridian Freight Ltd" }, { contact: "Hartley & Sons Supplies" }, { contact: "Queensbury Engineering" }, { contact: "Lakewood Solutions" }, { contact: "Pinecroft Consulting" }, { contact: "Ashford & Clarke" }, { contact: "Northgate Financial" }, { contact: "Westbrook Services" }, { contact: "Templeton & Ward" }, { contact: "Greystone Technologies" }, { contact: "Fairfield Logistics" }, { contact: "Coppergate Partners" }, { contact: "Riverside Digital" }, { contact: "Whitmore Agency" }, { contact: "Stonegate Ventures" }, { contact: "Elmwood Trading" }, { contact: "Bridgewater Associates" }, { contact: "Redwood Consulting" }] },
              { key: "anomaly",   label: "Anomalies",        baseIdx: 18, items: [{ contact: "Premier Office Supplies" }, { contact: "Highfield Analytics" }, { contact: "Oakwood Research" }, { contact: "Silverstone Group" }, { contact: "Blackthorn Events" }, { contact: "Mapleton Industries" }, { contact: "Greenfield Partners" }, { contact: "Haverstock Ltd" }, { contact: "Bramblewood Services" }, { contact: "Thornfield Capital" }, { contact: "Clearwater Tech" }, { contact: "Longbridge Agency" }] },
              { key: "duplicate", label: "Duplicates",       baseIdx: 30, items: [{ contact: "Meridian Freight Ltd" }, { contact: "Premier Office Supplies" }, { contact: "Hartley & Sons Supplies" }, { contact: "Highfield Analytics" }, { contact: "Westbrook Services" }, { contact: "Oakwood Research" }, { contact: "Coppergate Partners" }, { contact: "Silverstone Group" }, { contact: "Riverside Digital" }, { contact: "Mapleton Industries" }] },
              { key: "date",      label: "Date differences", baseIdx: 40, items: [{ contact: "Ashford & Clarke" }, { contact: "Northgate Financial" }, { contact: "Blackthorn Events" }, { contact: "Templeton & Ward" }, { contact: "Greystone Technologies" }, { contact: "Haverstock Ltd" }, { contact: "Fairfield Logistics" }, { contact: "Bramblewood Services" }, { contact: "Stonegate Ventures" }, { contact: "Elmwood Trading" }] },
              { key: "omitted",   label: "Omitted",          baseIdx: 50, items: [{ contact: "Internal Transfer" }, { contact: "Standing Order — HMRC" }, { contact: "Direct Debit — Utilities" }, { contact: "Payroll Batch" }, { contact: "Bank Charges" }] },
              { key: "general",   label: "General",          baseIdx: 55, items: [{ contact: "Unclassified Entry A" }, { contact: "Unclassified Entry B" }, { contact: "Unclassified Entry C" }] },
            ]
            : effectiveAccountName === "Barclays - Operations" ? [
              { key: "missing", label: "Missing entries", baseIdx: 0, items: [{ contact: "Hillcrest Imports" }, { contact: "NorthStar Media" }] },
              { key: "anomaly", label: "Anomalies",       baseIdx: 2, items: [{ contact: "Parkway Solutions" }] },
              { key: "omitted", label: "Omitted",         baseIdx: 3, items: [{ contact: "Central Freight Co" }] },
              { key: "general", label: "General",         baseIdx: 4, items: [{ contact: "Unclassified" }] },
            ]
            : effectiveAccountName === "American Express OP GBP" ? [
              { key: "missing",   label: "Missing entries",   baseIdx: 0, items: [{ contact: "Vantage Digital" }] },
              { key: "date",      label: "Date differences",  baseIdx: 1, items: [{ contact: "Apex Consulting" }, { contact: "BlueSky Events" }] },
              { key: "duplicate", label: "Duplicates",        baseIdx: 3, items: [{ contact: "Vantage Digital" }] },
            ]
            : effectiveAccountName === "Mastercard Business" ? [
              { key: "missing",   label: "Missing entries", baseIdx: 0, items: [{ contact: "Harrison & Webb" }] },
              { key: "anomaly",   label: "Anomalies",       baseIdx: 1, items: [{ contact: "Clearpoint Services" }] },
              { key: "duplicate", label: "Duplicates",      baseIdx: 2, items: [{ contact: "Harrison & Webb" }] },
            ]
            : [
              { key: "missing",   label: "Missing entries",   baseIdx: 0, items: [{ contact: "Yorkshire Tea Estates" }, { contact: "Clifton & Harrow Supplies" }, { contact: "Meridian Office Solutions" }] },
              { key: "anomaly",   label: "Anomalies",         baseIdx: 3, items: [{ contact: "Bakery & Food Supplies" }] },
              { key: "duplicate", label: "Duplicates",        baseIdx: 4, items: [{ contact: "Yorkshire Tea Estates" }] },
              { key: "date",      label: "Date differences",  baseIdx: 5, items: [{ contact: "Direct Expenses" }] },
              { key: "omitted",   label: "Omitted",           baseIdx: 6, items: [{ contact: "Internal Transfer" }] },
              { key: "general",   label: "General",           baseIdx: 7, items: [{ contact: "Unclassified" }] },
            ];
          var totalSugg = navCats.reduce(function(s, c) { return s + c.items.length; }, 0);
          var cats = navCats.map(function(c) { return { label: c.label, count: c.items.length }; });
          var matchedTotalNum = reconciledMatchedStr ? parseInt(reconciledMatchedStr.split("/")[1]) || null : null;

          if (isPreClean) return null;
          return (
            <div style={{
              position: "absolute",
              top: 16, bottom: 16, right: 16,
              width: 400,
              zIndex: 3,
              display: "flex",
              flexDirection: "column",
              fontFamily: "'Inter', sans-serif",
              transform: boxesOpen ? "translateX(0)" : "translateX(calc(100% + 32px))",
              transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              pointerEvents: boxesOpen ? "auto" : "none",
            }}>
              <SuggestionsBox
                isCleanReconcile={false}
                allJustResolved={allJustResolved}
                accountStatus={accountStatus}
                resolvedCount={resolvedCards.size + ignoredCards.size}
                totalSuggestions={totalSugg}
                matchedTotal={matchedTotalNum}
                navCategories={navCats}
                resolvedCards={resolvedCards}
                ignoredCards={ignoredCards}
              />
            </div>
          );
        })()}

      {/* Drag handle */}
      {resultsVisible && (
        <div
          onMouseDown={handleDragStart}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: chatWidth + 27,
            width: 12,
            cursor: "col-resize",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={function(e) { var notch = e.currentTarget.firstChild; if (notch) notch.style.opacity = "1"; }}
          onMouseLeave={function(e) { if (!isDragging) { var notch = e.currentTarget.firstChild; if (notch) notch.style.opacity = "0"; } }}
        >
          <div style={{
            width: 5,
            height: 56,
            borderRadius: 2.5,
            background: "#7C7C7C",
            opacity: isDragging ? 1 : 0,
            transition: "opacity 0.15s",
            pointerEvents: "none",
          }} />
        </div>
      )}

      </div> {/* end content area */}

      {/* All documents sidebar */}
      {allDocsOpen && (
        <AllDocumentsSidebar
          onClose={function() { setAllDocsOpen(false); }}
          onSelect={function(docs) { setPreselectedDocs(docs.map(function(d) { return { name: d.name, type: "text/csv" }; })); setAllDocsOpen(false); }}
        />
      )}

      {/* Spend money sidebar */}
      {spendMoneySidebar && (
        <>
          <div onClick={function() { setSpendMoneySidebar(null); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 200 }} />
          <SpendMoneySidebar
            contact={spendMoneySidebar.contact}
            amount={spendMoneySidebar.amount}
            date={spendMoneySidebar.date}
            onClose={function() { setSpendMoneySidebar(null); }}
            onPublish={function() {
              if (spendMoneySidebar.cardIndex != null) {
                setResolvedCards(function(prev) { return new Set([].concat(Array.from(prev), [spendMoneySidebar.cardIndex])); });
              }
            }}
          />
        </>
      )}

      {/* Batch draft sidebar */}
      {batchDraftSidebar && (
        <>
          <div onClick={function() { setBatchDraftSidebar(null); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 200 }} />
          <BatchDraftSidebar
            contact={batchDraftSidebar.contact}
            amount={batchDraftSidebar.amount}
            date={batchDraftSidebar.date}
            fileName={batchDraftSidebar.fileAction}
            onClose={function() { setBatchDraftSidebar(null); }}
            onConfirm={function() {
              if (batchDraftSidebar.cardIndex != null) {
                setResolvedCards(function(prev) { return new Set([].concat(Array.from(prev), [batchDraftSidebar.cardIndex])); });
              }
            }}
          />
        </>
      )}

    </div>
  );
}

registerPage("Bank reconciliation", {
  render: BankRecPage,
  keepAlive: true,
});

})();
