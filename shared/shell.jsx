function TopBar({
  contextLabel = "Month-end close",
  period = "April 2026",
  syncStatus = "Last synced 32 minutes ago",
  syncLabel = "Sync with Xero",
  onPeriodClick,
  onSyncClick,
}) {
  return (
    <div style={{ height: 56, background: T.colorSurfacePrimary, borderBottom: `1px solid ${T.colorBorderDark}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 14, color: T.colorTextSecondary }}>{contextLabel}</span>
        <button onClick={onPeriodClick} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", border: `1px solid ${T.colorBorderDark}`, borderRadius: 6, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}
          onMouseEnter={e => e.currentTarget.style.borderColor = T.colorBorderHover} onMouseLeave={e => e.currentTarget.style.borderColor = T.colorBorderDark}>
          {period} <Chevron up={false} color={T.colorTextPrimary} size={13} />
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 12, color: T.colorTextSecondary }}>{syncStatus}</span>
        <button onClick={onSyncClick} style={{ padding: "0 12px", height: 36, border: `1px solid ${T.colorBorderDark}`, borderRadius: 6, background: T.colorSurfacePrimary, cursor: "pointer", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = T.colorBorderHover; e.currentTarget.style.background = T.colorSurfaceSecondary; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = T.colorBorderDark; e.currentTarget.style.background = T.colorSurfacePrimary; }}>
          {syncLabel}
        </button>
      </div>
    </div>
  );
}

// ── Button components (from Buttons.jsx) ──────────────────────────────────────
function PrimaryButton({ children, icon, onClick, disabled = false, style = {} }) {
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", background: disabled ? T.colorBorderLight : T.colorBrandPrimary, color: disabled ? T.colorTextDisabled : T.colorSurfacePrimary, border: "none", borderRadius: 8, cursor: disabled ? "default" : "pointer", fontSize: 14, fontWeight: 500, transition: "background 0.15s ease", ...style }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = T.colorBrandPrimaryHover; }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = T.colorBrandPrimary; }}>
      {children}{icon}
    </button>
  );
}

function SecondaryButton({ children, icon, onClick, disabled = false, style = {}, onMouseEnter, onMouseLeave }) {
  const defaultEnter = e => { if (!disabled) { e.currentTarget.style.borderColor = T.colorBorderHover; e.currentTarget.style.background = T.colorSurfaceSecondary; } };
  const defaultLeave = e => { if (!disabled) { e.currentTarget.style.borderColor = T.colorBorderDark; e.currentTarget.style.background = T.colorSurfacePrimary; } };
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 12px", background: disabled ? T.colorBorderLight : T.colorSurfacePrimary, color: disabled ? T.colorTextDisabled : T.colorTextPrimary, border: `1px solid ${disabled ? T.colorBorderLight : T.colorBorderDark}`, borderRadius: 6, cursor: disabled ? "default" : "pointer", fontSize: 14, fontWeight: 500, whiteSpace: "nowrap", transition: "all 0.15s ease", ...style }}
      onMouseEnter={onMouseEnter || defaultEnter}
      onMouseLeave={onMouseLeave || defaultLeave}>
      {children}{icon}
    </button>
  );
}

// ── Widgets components (from Widgets.jsx) ─────────────────────────────────────
function StatsWidget({ label, value, progress = 0 }) {
  return (
    <div style={{ background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
      <ProgressRing progress={progress} size={40} strokeWidth={3} />
      <div>
        <div style={{ fontSize: 14, color: T.colorTextSecondary, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 16, fontWeight: 500, color: T.colorTextPrimary }}>{value}</div>
      </div>
    </div>
  );
}

function StatsRow({ items = [], columns }) {
  const cols = columns || items.length || 1;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
      {items.map((item, i) => <StatsWidget key={i} label={item.label} value={item.value} progress={item.progress} />)}
    </div>
  );
}

// ── DataTable — unified DS component (CSS Grid table with optional expand/collapse, comments, footerRow) ──
// Consolidated from old DataTable + DataTableV2. Single component for all table use cases.
// Simple mode: just pass columns + rows.
// Advanced mode: add showExpandColumn, renderExpanded, showCommentColumn for expandable rows.
// footerRow: optional bold summary row rendered at the bottom using the same grid.
function DataTable({
  title,
  columns = [],
  rows = [],
  footerLabel,
  footerRow,
  onRowClick,
  showExpandColumn = false,
  showCommentColumn = false,
  renderExpanded,
  expandedByDefault,
  rowComments = {},
  minWidth,
  noBorder = false,
}) {
  const [hovered, setHovered] = useState(null);
  const [expandedRows, setExpandedRows] = useState(() => {
    if (expandedByDefault) return new Set(expandedByDefault);
    return new Set();
  });

  const toggleExpand = (ri) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(ri)) next.delete(ri); else next.add(ri);
      return next;
    });
  };

  // Build grid template
  const parts = [];
  if (showExpandColumn) parts.push("40px");
  parts.push(...columns.map(c => c.width || "1fr"));
  if (showCommentColumn) parts.push("40px");
  const gridTemplate = parts.join(" ");

  // Enforce minWidth: caller prop, or auto-calculate from column minimums
  const autoMin = (function() {
    let total = 0;
    if (showExpandColumn) total += 40;
    if (showCommentColumn) total += 40;
    columns.forEach(function(c) {
      const w = c.width || "";
      // Extract the minimum from "minmax(Npx, ...)" or fixed "Npx"
      const minmaxMatch = w.match(/minmax\(\s*(\d+)px/);
      const fixedMatch = w.match(/^(\d+)px$/);
      if (minmaxMatch) total += parseInt(minmaxMatch[1], 10);
      else if (fixedMatch) total += parseInt(fixedMatch[1], 10);
      else total += 100; // fallback for "1fr" etc.
    });
    return total;
  })();
  const minTableWidth = minWidth || autoMin || 0;

  // Chevron icon for expandable rows
  const ChevronIcon = ({ expanded }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{
      transition: "transform 0.15s ease",
      transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
    }}>
      <path d="M4 6L8 10L12 6" stroke={T.colorTextSecondary} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  // Comment icon with green dot when has comments
  const CommentIcon = ({ hasComments }) => (
    <span style={{ position: "relative", display: "inline-flex" }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M14 7.66669C14.0023 8.5466 13.7967 9.41461 13.4 10.2C12.9296 11.1412 12.2065 11.9328 11.3116 12.4862C10.4168 13.0396 9.3855 13.3329 8.33337 13.3334C7.45346 13.3356 6.58545 13.1301 5.80004 12.7334L2 14L3.26667 10.2C2.86995 9.41461 2.66441 8.5466 2.66671 7.66669C2.66714 6.61456 2.96041 5.58325 3.51385 4.6884C4.06729 3.79355 4.85893 3.07041 5.80004 2.60002C6.58545 2.2033 7.45346 1.99776 8.33337 2.00002H8.66671C10.0562 2.07668 11.3687 2.66319 12.3528 3.64726C13.3368 4.63132 13.9234 5.94388 14 7.33335V7.66669Z" stroke={hasComments ? "#6BAC5B" : T.colorTextSecondary} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {hasComments && (
        <span style={{
          position: "absolute", top: -1, right: -1,
          width: 6, height: 6, borderRadius: "50%",
          background: "#6BAC5B",
        }} />
      )}
    </span>
  );

  return (
    <div style={{ background: T.colorSurfacePrimary, border: noBorder ? "none" : `1px solid ${T.colorBorderDark}`, borderRadius: noBorder ? 0 : 8, overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
      {/* Section title */}
      {title && (
        <div style={{ padding: "16px 16px 14px", borderBottom: `1px solid ${T.colorBorderDark}` }}>
          <span style={{ fontSize: 18, fontWeight: 500, color: T.colorTextPrimary }}>{title}</span>
        </div>
      )}

      {/* Scrollable wrapper */}
      <div style={{ overflowX: minTableWidth ? "auto" : undefined }}>
      <div style={minTableWidth ? { minWidth: minTableWidth } : undefined}>

      {/* Column headers */}
      <div style={{ display: "grid", gridTemplateColumns: gridTemplate, borderBottom: `1px solid ${T.colorBorderDark}`, background: T.colorSurfacePrimary }}>
        {showExpandColumn && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 0", borderRight: `1px solid ${T.colorBorderDark}` }} />
        )}
        {columns.map((col, ci) => (
          <div key={col.key} style={{
            display: "flex", alignItems: "center", gap: 4,
            fontSize: 14, fontWeight: 500, color: T.colorTextSecondary,
            padding: "10px 16px",
            borderRight: ci < columns.length - 1 ? `1px solid ${T.colorBorderDark}` : "none",
            justifyContent: col.align === "right" ? "flex-end" : "flex-start",
          }}>
            {col.label}{col.sortable && <SortIcon />}
          </div>
        ))}
        {showCommentColumn && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 0", borderLeft: `1px solid ${T.colorBorderDark}` }} />
        )}
      </div>

      {/* Data rows */}
      {rows.map((row, ri) => {
        const isExpanded = expandedRows.has(ri);
        return (
          <React.Fragment key={ri}>
            <div
              onClick={() => {
                if (renderExpanded) toggleExpand(ri);
                onRowClick?.(row, ri);
              }}
              onMouseEnter={() => setHovered(ri)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "grid",
                gridTemplateColumns: gridTemplate,
                borderBottom: (isExpanded || ri < rows.length - 1) ? `1px solid ${T.colorBorderDark}` : "none",
                background: hovered === ri ? T.colorSurfaceSecondary : T.colorSurfacePrimary,
                transition: "background 0.1s",
                cursor: (renderExpanded || onRowClick) ? "pointer" : "default",
              }}
            >
              {/* Expand chevron cell */}
              {showExpandColumn && (
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRight: `1px solid ${T.colorBorderDark}`,
                }}>
                  {renderExpanded && <ChevronIcon expanded={isExpanded} />}
                </div>
              )}

              {/* Data cells */}
              {columns.map((col, ci) => (
                <div key={col.key} style={{
                  display: "flex", alignItems: "center",
                  justifyContent: col.align === "right" ? "flex-end" : "flex-start",
                  fontSize: 14, color: T.colorTextPrimary,
                  padding: "14px 16px",
                  borderRight: ci < columns.length - 1 ? `1px solid ${T.colorBorderDark}` : "none",
                }}>
                  {col.render ? col.render(row[col.key], row, ri) : row[col.key]}
                </div>
              ))}

              {/* Comment icon cell */}
              {showCommentColumn && (
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderLeft: `1px solid ${T.colorBorderDark}`,
                }}>
                  <CommentIcon hasComments={row.code && rowComments[row.code] && rowComments[row.code].length > 0} />
                </div>
              )}
            </div>

            {/* Expanded content */}
            {isExpanded && renderExpanded && (
              <div style={{
                background: T.colorSurfaceSecondary,
                borderBottom: ri < rows.length - 1 ? `1px solid ${T.colorBorderDark}` : "none",
                padding: 16,
              }}>
                {renderExpanded(row, ri)}
              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* Footer row (bold summary row using same grid) */}
      {footerRow && (
        <div style={{ display: "grid", gridTemplateColumns: gridTemplate, background: T.colorSurfaceSecondary, borderTop: `1px solid ${T.colorBorderDark}` }}>
          {showExpandColumn && <div style={{ borderRight: `1px solid ${T.colorBorderDark}` }} />}
          {columns.map((col, ci) => (
            <div key={col.key} style={{
              display: "flex", alignItems: "center",
              justifyContent: col.align === "right" ? "flex-end" : "flex-start",
              fontSize: 14, fontWeight: 600, color: T.colorTextPrimary,
              padding: "14px 16px",
              borderRight: ci < columns.length - 1 ? `1px solid ${T.colorBorderDark}` : "none",
            }}>
              {footerRow[col.key]}
            </div>
          ))}
          {showCommentColumn && <div style={{ borderLeft: `1px solid ${T.colorBorderDark}` }} />}
        </div>
      )}

      {/* Footer label (text string below the table) */}
      {footerLabel && (
        <div style={{ padding: "12px 16px", fontSize: 14, color: T.colorTextSecondary, borderTop: `1px solid ${T.colorBorderDark}` }}>
          {footerLabel}
        </div>
      )}

      </div>
      </div>
    </div>
  );
}



// ── StatusBadge: variant + children API (matches Figma Badge component) ───
// Backward compat: map old status strings → variant names
var STATUS_TO_VARIANT = {
  "Not started":  "neutral",
  "In progress":  "warning",
  "Review":       "warning",
  "In review":    "warning",
  "Suggestions":  "error",
  "Completed":    "success",
  "Reconciled":   "success",
  "Preparing":    "info",
};

function StatusBadge({ variant, status, children, count, total, size = "default" }) {
  var VARIANT_STYLES = {
    success:  { bg: T.colorSuccessBg,   color: T.colorSuccess },
    info:     { bg: T.colorInfoBg,      color: T.colorInfo },
    warning:  { bg: T.colorWarningBg,   color: T.colorWarningText },
    error:    { bg: T.colorErrorBg,     color: T.colorError },
    neutral:  { bg: T.colorNeutralBg,   color: T.colorTextSecondary },
    purple:   { bg: T.colorPurpleBg,    color: T.colorPurple },
    gold:     { bg: T.colorGoldBg,      color: T.colorGold },
  };

  var resolvedVariant = variant || STATUS_TO_VARIANT[status] || "neutral";
  var label = children || status;
  var s = VARIANT_STYLES[resolvedVariant] || VARIANT_STYLES.neutral;
  var hasProgress = count != null && total != null;
  var isMini = size === "mini";

  // Progress ring
  var ring = null;
  if (hasProgress) {
    var safeTotal = total > 0 ? total : 1;
    var safeCount = Math.min(Math.max(0, count), safeTotal);
    var pct = (safeCount / safeTotal) * 100;
    var SIZE = 16, RADIUS = 5, SW = 2;
    var CX = SIZE / 2, CY = SIZE / 2;
    var circ = 2 * Math.PI * RADIUS;
    var offset = circ * (1 - pct / 100);

    ring = (
      <svg width={SIZE} height={SIZE} viewBox={"0 0 " + SIZE + " " + SIZE} fill="none"
        style={{ transform: "rotate(-90deg)", flexShrink: 0, display: "block" }}>
        <circle cx={CX} cy={CY} r={RADIUS} stroke={s.color} strokeWidth={SW} fill="none"
          opacity="0.25" />
        <circle cx={CX} cy={CY} r={RADIUS} stroke={s.color} strokeWidth={SW} fill="none"
          strokeDasharray={circ + " " + circ}
          strokeDashoffset={offset}
          strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <span style={{
      ...T.textXs,
      display: "inline-flex", alignItems: "center",
      gap: hasProgress ? 5 : 0,
      padding: isMini ? "0 8px" : "8px 12px",
      height: isMini ? 25 : "auto",
      borderRadius: isMini ? 4 : 6,
      fontWeight: 500, letterSpacing: "0.15px",
      background: s.bg, color: s.color,
      whiteSpace: "nowrap",
    }}>
      {ring}
      {label}
    </span>
  );
}

// DataTableV2 removed — consolidated into DataTable above.
// Alias kept for backward compatibility during transition.
var DataTableV2 = DataTable;

// ── Accordion ────────────────────────────────────────────────────────────────
function Accordion({
  title,
  subtitle,
  icon,
  badge,
  actions,
  rightText,
  bg,
  defaultExpanded = false,
  onToggle,
  style = {},
  children,
}) {
  var _bg = bg || T.colorSurfacePrimary;
  var _expanded = React.useState(defaultExpanded);
  var expanded = _expanded[0];
  var setExpanded = _expanded[1];

  /* content height animation */
  var contentRef = React.useRef(null);
  var _contentHeight = React.useState(defaultExpanded ? "auto" : "0px");
  var contentHeight = _contentHeight[0];
  var setContentHeight = _contentHeight[1];

  React.useEffect(function() {
    if (!contentRef.current) return;
    if (expanded) {
      var h = contentRef.current.scrollHeight;
      setContentHeight(h + "px");
      var t = setTimeout(function() { setContentHeight("auto"); }, 250);
      return function() { clearTimeout(t); };
    } else {
      var h = contentRef.current.scrollHeight;
      setContentHeight(h + "px");
      contentRef.current.offsetHeight;
      requestAnimationFrame(function() { setContentHeight("0px"); });
    }
  }, [expanded]);

  function toggle() {
    var next = !expanded;
    setExpanded(next);
    if (onToggle) onToggle(next);
  }

  var hasSubtitle = subtitle != null;

  var containerStyle = {
    background: _bg,
    border: "1px solid " + T.colorBorderDark,
    borderRadius: T.radius12,
    width: "100%",
    boxSizing: "border-box",
    transition: "background 0.15s ease",
  };

  var headerStyle = {
    display: "flex",
    alignItems: "center",
    gap: T.space5,
    padding: hasSubtitle
      ? T.space5 + "px " + T.space7 + "px"
      : T.space7 + "px",
    cursor: "pointer",
    userSelect: "none",
    background: "transparent",
    border: "none",
    width: "100%",
    boxSizing: "border-box",
    textAlign: "left",
  };

  var contentWrapStyle = {
    height: contentHeight,
    overflow: "hidden",
    transition: "height 0.25s ease",
  };

  var contentInnerStyle = {
    padding: "0 " + T.space7 + "px " + T.space7 + "px",
    boxSizing: "border-box",
  };

  var titleStyle = {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: T.fontFamily,
    color: T.colorTextPrimary,
    lineHeight: "26px",
    letterSpacing: 0,
  };

  var subtitleStyle = {
    fontSize: 16,
    fontWeight: 400,
    fontFamily: T.fontFamily,
    color: T.colorTextSecondary,
    lineHeight: "26px",
    letterSpacing: 0,
    marginTop: 0,
  };

  var rightTextStyle = {
    fontSize: 16,
    fontWeight: 400,
    fontFamily: T.fontFamily,
    color: T.colorTextSecondary,
    lineHeight: "26px",
    whiteSpace: "nowrap",
    flexShrink: 0,
  };

  return React.createElement("div", {
    style: Object.assign({}, containerStyle, style),
    onMouseEnter: function(e) { e.currentTarget.style.background = T.colorSurfaceSecondary; },
    onMouseLeave: function(e) { e.currentTarget.style.background = _bg; },
  },
    React.createElement("div", { onClick: toggle, style: headerStyle },
      icon && React.createElement("span", { style: { display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, width: 24, height: 24, marginRight: -T.space5 + T.space4 } }, icon),
      React.createElement("div", { style: { flex: "1 1 0", minWidth: 0 } },
        React.createElement("div", { style: titleStyle }, title),
        hasSubtitle && React.createElement("div", { style: subtitleStyle }, subtitle)
      ),
      badge && React.createElement("span", { style: { display: "flex", alignItems: "center", flexShrink: 0 } }, badge),
      actions && React.createElement("span", {
        style: { display: "flex", alignItems: "center", gap: T.space5, flexShrink: 0 },
        onClick: function(e) { e.stopPropagation(); },
      }, actions),
      rightText && React.createElement("span", { style: rightTextStyle }, rightText),
      React.createElement("span", {
        style: {
          display: "flex", alignItems: "center", flexShrink: 0,
          transition: "transform 0.2s ease",
          transform: expanded ? "rotate(0deg)" : "rotate(180deg)",
          marginLeft: rightText ? -T.space5 + T.space3 : 0,
        },
      }, React.createElement(Chevron, { up: true, size: 20 }))
    ),
    React.createElement("div", { ref: contentRef, style: contentWrapStyle },
      (expanded || contentHeight !== "0px") && React.createElement("div", { style: contentInnerStyle }, children)
    )
  );
}

