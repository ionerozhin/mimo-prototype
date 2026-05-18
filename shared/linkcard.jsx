/**
 * LinkCard — Navigational card row with optional badge/checkmark
 *
 * Figma name: link card
 *
 * A clickable row that links to another view. Shows a label on the left
 * and an arrow on the right, with optional badge count or checkmark.
 *
 * Usage:
 *   <LinkCard label="Reconcile balance sheet" onClick={fn} />
 *   <LinkCard label="Reconcile balance sheet" badge={13} onClick={fn} />
 *   <LinkCard label="Reconcile balance sheet" checked onClick={fn} />
 *
 * Variants (controls background and border treatment):
 *   "divider"  — border-top separator, transparent bg (default)
 *   "flat"     — no border, no background
 *   "gray"     — gray background (T.colorSurfaceDark)
 *   "outlined" — white bg, rounded 8px, 1px border (T.colorBorderMedium)
 *
 * Stack multiple cards with LinkCardGroup:
 *   <LinkCardGroup variant="outlined">
 *     <LinkCard label="Review transactions" badge={5} />
 *     <LinkCard label="Post adjustments" checked />
 *     <LinkCard label="Reconcile balance sheet" />
 *   </LinkCardGroup>
 *
 * LinkCardGroup passes variant down automatically so you don't repeat it.
 */

/* ── Arrow icon (20×20, matches Figma arrow-right) ───────────────────── */
function LinkCardArrow({ color }) {
  color = color || T.colorTextSecondary;
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M4.167 10h11.666M10.833 5l5 5-5 5"
        stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Check circle icon (20×20, green filled) ─────────────────────────── */
function LinkCardCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="10" cy="10" r="10" fill={T.colorSuccess} />
      <path
        d="M6.5 10.5L8.75 12.75L13.5 7.5"
        stroke={T.colorTextLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── LinkCard ─────────────────────────────────────────────────────────── */
function LinkCard({
  label,
  badge,
  checked = false,
  variant = "divider",
  onClick,
  href,
  style = {},
}) {
  var LINK_CARD_VARIANTS = {
    divider: {
      background: "transparent",
      border: "none",
      borderTop: "1px solid " + T.colorBorderLight,
      borderRadius: 0,
    },
    flat: {
      background: "transparent",
      border: "none",
      borderTop: "none",
      borderRadius: 0,
    },
    gray: {
      background: T.colorSurfaceDark,
      border: "none",
      borderTop: "none",
      borderRadius: T.radius8,
    },
    outlined: {
      background: T.colorSurfacePrimary,
      border: "1px solid " + T.colorBorderMedium,
      borderTop: "1px solid " + T.colorBorderMedium,
      borderRadius: T.radius8,
    },
  };
  var v = LINK_CARD_VARIANTS[variant] || LINK_CARD_VARIANTS.divider;

  var base = {
    display: "flex",
    alignItems: "center",
    gap: T.space5,
    padding: T.space5 + "px " + T.space7 + "px",
    background: v.background,
    border: v.border,
    borderTop: v.borderTop,
    borderRadius: v.borderRadius,
    cursor: "pointer",
    textDecoration: "none",
    boxSizing: "border-box",
    transition: "background 0.15s ease",
    width: "100%",
  };

  var Tag = href ? "a" : "div";
  var extraProps = href ? { href: href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Tag
      {...extraProps}
      onClick={onClick}
      onMouseEnter={function(e) {
        e.currentTarget.style.background =
          variant === "outlined" ? T.colorSurfaceSecondary :
          variant === "gray" ? "#E3E3E3" :
          T.colorSurfaceSecondary;
      }}
      onMouseLeave={function(e) {
        e.currentTarget.style.background = v.background;
      }}
      style={{ ...base, ...style }}
    >
      {/* Left slot — label */}
      <span style={{
        fontSize: 14,
        fontWeight: 500,
        fontFamily: T.fontFamily,
        color: T.colorTextPrimary,
        lineHeight: "22px",
        letterSpacing: "0.15px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}>
        {label}
      </span>

      {/* Right slot — badge / check + arrow */}
      <span style={{
        display: "flex",
        flex: "1 0 0",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: T.space3,
        minWidth: 0,
      }}>
        {badge != null && (
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "2px 8px",
            borderRadius: T.radius6,
            background: T.colorSurfaceDark,
            fontSize: 12,
            fontWeight: 500,
            fontFamily: T.fontFamily,
            color: T.colorTextSecondary,
            lineHeight: "17px",
            letterSpacing: "0.15px",
            whiteSpace: "nowrap",
          }}>
            {badge}
          </span>
        )}
        {checked && <LinkCardCheck />}
        <LinkCardArrow />
      </span>
    </Tag>
  );
}

/* ── LinkCardGroup — stack cards, pass variant down ───────────────────── */
function LinkCardGroup({ children, variant = "divider", style = {} }) {
  var isOutlined = variant === "outlined";

  var wrapStyle = {
    display: "flex",
    flexDirection: "column",
    ...(isOutlined ? {
      border: "1px solid " + T.colorBorderMedium,
      borderRadius: T.radius8,
      overflow: "hidden",
      background: T.colorSurfacePrimary,
    } : {}),
    ...style,
  };

  var items = React.Children.toArray(children);
  return (
    <div style={wrapStyle}>
      {items.map(function(child, i) {
        if (!React.isValidElement(child)) return child;

        var childVariant = variant;
        var childStyle = {};

        if (isOutlined) {
          // Inside a group, outlined cards become flat rows with dividers between them
          childVariant = "flat";
          if (i > 0) {
            childStyle.borderTop = "1px solid " + T.colorBorderLight;
          }
        } else if (variant === "divider" && i === 0) {
          // First card in divider group has no top border
          childStyle.borderTop = "none";
        }

        return React.cloneElement(child, {
          variant: childVariant,
          style: { ...childStyle, ...(child.props.style || {}) },
          key: i,
        });
      })}
    </div>
  );
}
