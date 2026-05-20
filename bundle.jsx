// ── MainMenu component (uses PATHS, NavIcon, Chevron from shared.jsx) ────────────────────────────────────────────────────────
// Props:
//   activeNav      — string: currently active nav label
//   onNavChange    — fn(label): called when a nav item is clicked
//   companyName    — string: e.g. "Seabrook Foods Ltd."
//   userName       — string: e.g. "Laura Bennett"
//   userRole       — string: e.g. "Clifton & Harrow"
//   navItems       — array of { label, icon } for the Associate section
function MainMenu({
  activeNav,
  onNavChange,
  companyName = "Seabrook Foods Ltd.",
  userName = "Laura Bennett",
  userRole = "Clifton & Harrow",
  navItems = [
    { label: "Home",                icon: "home" },
    { label: "Collect documents",   icon: "fileQuestion" },
    { label: "Inbox",               icon: "inbox" },
    { label: "Bank reconciliation", icon: "checkVerified" },
    { label: "Adjustments",         icon: "switchHorizontal" },
    { label: "Profit and Loss",     icon: "calculator" },
    { label: "Balance sheet",       icon: "rows" },
  ],
}) {
  const [associateOpen, setAssociateOpen] = useState(true);
  const [paymentsOpen, setPaymentsOpen]   = useState(false);

  return (
    <aside style={{
      width: 264, flexShrink: 0, display: "flex", flexDirection: "column",
      background: "#FFFFFF", borderRight: "1px solid #E9E9EB", height: "100vh",
      fontFamily: "'Inter', sans-serif",
    }}>

      {/* Mimo logo — 96px header */}
      <div style={{ height: 96, display: "flex", alignItems: "center", padding: "0 40px", flexShrink: 0 }}>
        <svg width="93" height="20" viewBox="0 0 98 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#mimoClip)">
            <path d="M21.2948 0.316406H16.2686V19.8237H21.2948V0.316406Z" fill="#1F2024"/>
            <path d="M3.55406 0L0 3.55406L10.9144 14.4685L14.4685 10.9144L3.55406 0Z" fill="#1F2024"/>
            <path d="M5.56185 10.7422H0.535645V19.8197H5.56185V10.7422Z" fill="#1F2024"/>
            <path d="M32.0013 19.8173V0.316406H36.4094L41.4536 12.2309C41.7614 12.9701 42.0807 13.7995 42.4143 14.7189H42.4684C42.7929 13.7995 43.1084 12.9701 43.4162 12.2309L48.4449 0.316406H52.826V19.816H49.4314V5.84742H49.3773C49.215 6.2711 49.0373 6.73857 48.8429 7.24724C48.6497 7.7572 48.4437 8.2736 48.2273 8.79515L43.5488 19.816H41.29L36.5974 8.78099C36.381 8.25815 36.1763 7.74045 35.9818 7.22534C35.7886 6.71151 35.6109 6.24277 35.4474 5.81909H35.3933V19.8147H32L32.0013 19.8173Z" fill="#1F2024"/>
            <path d="M54.7979 3.35338V0H58.3135V3.35338H54.7979ZM54.8519 19.8151V5.38678H58.2594V19.8163H54.8519V19.8151Z" fill="#1F2024"/>
            <path d="M60.729 19.8153V5.38573H64.1365V7.31998H64.1777C64.4018 6.85123 64.7198 6.44815 65.1306 6.10946C65.5414 5.77207 66.0231 5.51193 66.5781 5.33293C67.1318 5.15264 67.7384 5.0625 68.3964 5.0625C69.4151 5.0625 70.2702 5.26726 70.9591 5.67677C71.6481 6.08757 72.1696 6.67995 72.5212 7.45519H72.5611C72.9938 6.67995 73.5888 6.08628 74.3473 5.67677C75.1045 5.26726 76.0008 5.0625 77.0387 5.0625C78.0767 5.0625 78.9227 5.26726 79.6619 5.67677C80.4011 6.08757 80.9677 6.69283 81.3592 7.49511C81.7507 8.2974 81.9477 9.27611 81.9477 10.43V19.814H78.5532V10.9296C78.5532 10.0282 78.3188 9.3199 77.85 8.80607C77.3813 8.29225 76.7271 8.03598 75.8887 8.03598C75.2938 8.03598 74.7838 8.16862 74.3614 8.43519C73.9378 8.70048 73.6107 9.07522 73.3801 9.55814C73.1509 10.0411 73.0363 10.6051 73.0363 11.2554V19.8153H69.6559V10.9039C69.6559 10.0114 69.4241 9.30831 68.9592 8.79448C68.4943 8.28066 67.8478 8.02439 67.0185 8.02439C66.4403 8.02439 65.9342 8.1609 65.4964 8.43648C65.0598 8.71207 64.7237 9.09196 64.4893 9.57874C64.2537 10.0655 64.1378 10.6244 64.1378 11.2554V19.8153H60.7303H60.729Z" fill="#1F2024"/>
            <path d="M90.6726 20.1284C89.2843 20.1284 88.0403 19.8193 86.9393 19.2012C85.8395 18.5844 84.9806 17.7048 84.3624 16.5651C83.7443 15.4254 83.4365 14.1106 83.4365 12.6232C83.4365 11.1358 83.7404 9.8223 84.3483 8.68133C84.9574 7.54036 85.8138 6.65566 86.9174 6.02464C88.021 5.39363 89.2766 5.07812 90.6829 5.07812C92.0891 5.07812 93.3408 5.39106 94.4355 6.0182C95.5301 6.64535 96.3826 7.52619 96.9917 8.66202C97.5995 9.79784 97.9034 11.1191 97.9034 12.6245C97.9034 14.1299 97.5918 15.437 96.9711 16.5728C96.3491 17.7087 95.4901 18.5856 94.3942 19.2025C93.2996 19.8206 92.0569 20.1297 90.6687 20.1297L90.6726 20.1284ZM90.6726 17.3159C91.4014 17.3159 92.0556 17.1317 92.6338 16.7621C93.2108 16.3926 93.6615 15.8556 93.986 15.1524C94.3105 14.4493 94.4728 13.6058 94.4728 12.6232C94.4728 11.6406 94.3118 10.7959 93.9925 10.0876C93.6731 9.37931 93.2236 8.83844 92.648 8.46499C92.0698 8.09024 91.4117 7.90223 90.6738 7.90223C89.9359 7.90223 89.265 8.09024 88.6932 8.46499C88.1202 8.83844 87.672 9.37931 87.3475 10.0876C87.023 10.7959 86.8607 11.6406 86.8607 12.6232C86.8607 13.6058 87.0256 14.4467 87.354 15.1447C87.6823 15.844 88.1343 16.3797 88.7061 16.7544C89.2792 17.1279 89.9347 17.3159 90.6751 17.3159H90.6726Z" fill="#1F2024"/>
          </g>
          <defs>
            <clipPath id="mimoClip">
              <rect width="98" height="20.2181" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Company selector — white bordered card */}
      <div style={{ padding: "0 12px", margin: "12px 0 0", flexShrink: 0, height: 42, display: "flex", alignItems: "center" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, width: "100%",
          height: 42, padding: "0 16px", background: "#FFFFFF",
          border: "1px solid #E9E9EB", borderRadius: 8, cursor: "pointer",
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 12.5L5.5 8L10 3.5" stroke="#545453" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>{companyName}</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "0 8px 0", overflowY: "auto" }}>

        {/* Divider above Associate */}
        <div style={{ height: 1, background: "#E9E9EB", margin: "16px 12px" }} />

        {/* Associate */}
        <button
          onClick={() => setAssociateOpen(o => !o)}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 20px 6px", background: "none", border: "none", cursor: "pointer" }}
        >
          <span style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>Associate</span>
          <Chevron up={associateOpen} />
        </button>

        {associateOpen && navItems.map(item => {
          const active = activeNav === item.label;
          return (
            <button
              key={item.label}
              onClick={() => onNavChange?.(item.label)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 8,
                height: 40, padding: "0 12px", marginBottom: 1,
                marginLeft: 8, marginRight: 8, width: "calc(100% - 16px)",
                borderRadius: 6, border: "none", cursor: "pointer",
                background: active ? "#F0F0F0" : "transparent",
                textAlign: "left", boxShadow: "none",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
            >
              <NavIcon name={item.icon} color={active ? "#080908" : "#4F4F4F"} />
              <span style={{ fontSize: 14, fontWeight: active ? 600 : 400, color: active ? "#080908" : "#4F4F4F", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Divider */}
        <div style={{ height: 1, background: "#E9E9EB", margin: "16px 12px" }} />

        {/* Payments */}
        <button
          onClick={() => setPaymentsOpen(o => !o)}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 20px 4px", background: "none", border: "none", cursor: "pointer" }}
        >
          <span style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>Payments</span>
          <Chevron up={paymentsOpen} />
        </button>

        {/* Divider */}
        <div style={{ height: 1, background: "#E9E9EB", margin: "16px 12px" }} />

        {/* Settings */}
        <button
          style={{
            width: "calc(100% - 16px)", display: "flex", alignItems: "center", gap: 8,
            height: 40, padding: "0 12px", marginBottom: 1,
            marginLeft: 8, marginRight: 8,
            borderRadius: 6, border: "none", cursor: "pointer",
            background: "transparent", textAlign: "left", boxShadow: "none",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.04)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <NavIcon name="settings" color="#4F4F4F" />
          <span style={{ fontSize: 14, fontWeight: 400, color: "#4F4F4F" }}>Settings</span>
        </button>

      </nav>

      {/* Divider above user */}
      <div style={{ height: 1, background: "#E9E9EB", margin: "0 12px", flexShrink: 0 }} />

      {/* User profile */}
      <div
        style={{ padding: "16px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0, cursor: "pointer", borderRadius: 8, margin: "8px", transition: "background 0.15s" }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.04)"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#F0F5FC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#4C71DF" }}>{userName.charAt(0)}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#080908", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userName}</div>
          <div style={{ fontSize: 12, color: "#8C8C8B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userRole}</div>
        </div>
        <button style={{ border: "none", background: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="3" r="1.2" fill="#545453"/>
            <circle cx="8" cy="8" r="1.2" fill="#545453"/>
            <circle cx="8" cy="13" r="1.2" fill="#545453"/>
          </svg>
        </button>
      </div>
    </aside>
  );
}
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
// ── Page Registry ────────────────────────────────────────────────────────────
// Pages register themselves by calling registerPage(label, config).
// app.jsx reads PAGE_REGISTRY to build nav and render the active page.

const PAGE_REGISTRY = {};

function registerPage(label, config) {
  // config: { icon: string, render: function({ ctx }), keepAlive?: boolean, section?: string }
  PAGE_REGISTRY[label] = config;
}

// ── DS Tokens ────────────────────────────────────────────────────────────────
const T = {
  // Brand
  colorBrandPrimary: "#05A105",
  colorBrandPrimaryHover: "#058F05",
  colorBrandLight: "#ACD394",
  colorBrandLighter: "#EAF2E2",
  colorBrandBg: "#F4F9F1",

  // Text & Icon
  colorTextPrimary: "#080908",
  colorTextSecondary: "#8C8C8B",
  colorTextThird: "#545453",
  colorTextBody: "#2A2A2A",
  colorTextHeading: "#1F2024",
  colorTextLight: "#FFFFFF",
  colorTextDisabled: "#9D9D9E",
  colorTextMuted: "#7C7C7C",
  colorTextBlack: "#000000",

  // Button
  colorButtonSecondary: "#ECECEC",
  colorButtonSecondaryHover: "#DBDBDB",
  colorButtonDisabled: "#F5F5F5",

  // Border
  colorBorderLight: "#F5F5F5",
  colorBorderDark: "#E9E9EB",
  colorBorderHover: "#CFCFD1",
  colorBorderSubtle: "#EFF1F4",
  colorBorderInput: "#BCBCBC",

  // Surface
  colorSurfacePrimary: "#FFFFFF",
  colorSurfaceSecondary: "#FAFAFA",
  colorSurfaceTertiary: "#F7F7F7",
  colorSurfaceActive: "#F0F0F0",
  colorSurfaceContrast: "#FBFBFB",
  colorSurfaceDark: "#ECECEC",

  // Status — Success
  colorSuccess: "#05A105",
  colorSuccessBg: "#F1F8F0",
  colorSuccessBorder: "#D5EBCF",
  // Status — Warning
  colorWarning: "#D5A750",
  colorWarningText: "#816530",
  colorWarningBg: "#FDF8EE",
  colorWarningBorder: "#F8E9CB",
  // Status — Error
  colorError: "#C8543A",
  colorErrorBg: "#FCEFEC",
  colorErrorBorder: "#F4CCC4",
  // Status — Info
  colorInfo: "#4C71DF",
  colorInfoAlt: "#6389CF",
  colorInfoBg: "#F0F5FC",
  colorInfoBorder: "#D2DEF6",
  // Status — Purple
  colorPurple: "#8266D5",
  colorPurpleBg: "#F4F1FD",
  // Status — Gold
  colorGold: "#B49D62",
  colorGoldBg: "#F9F7F0",
  // Status — Neutral
  colorNeutralBg: "#ECECEC",

  // Typography
  fontFamily: "'Inter', sans-serif",
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemibold: 600,
  textSm: { fontSize: 14, lineHeight: "22px" },
  textMd: { fontSize: 16, lineHeight: "26px" },
  textXs: { fontSize: 12, lineHeight: "17px" },
  colorBorderMedium: "#DBDBDB",
  colorTextPlaceholder: "#A5A5A5",

  // Spacing (px)
  space2: 4, space3: 8, space4: 12, space5: 16,
  space6: 20, space7: 24, space8: 28, space9: 32, space13: 48,

  // Radii
  radius4: 4, radius6: 6, radius8: 8, radius12: 12, radiusFull: 9999,
};

// ── DS TabsNavigation ────────────────────────────────────────────────────────
function TabsNavigation({ tabs = [], activeTab, onChange, gap = 24 }) {
  const scrollRef = useRef(null);
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  const updateIndicator = () => {
    const tabEl = tabRefs.current[activeTab];
    if (tabEl) {
      setIndicator({ left: tabEl.offsetLeft, width: tabEl.offsetWidth });
      requestAnimationFrame(() => setIsInitial(false));
    }
  };

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 0);
    setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => { updateIndicator(); updateArrows(); }, [activeTab, tabs]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => { updateIndicator(); updateArrows(); });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: direction * 120, behavior: "smooth" });
  };

  const arrowStyle = {
    position: "absolute", top: 0, bottom: 1, width: 32,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", zIndex: 2, border: "none", padding: 0, color: T.colorTextSecondary,
  };

  return (
    <div style={{ position: "relative", fontFamily: T.fontFamily }}>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: T.colorButtonSecondary }} />
      {showLeftArrow && (
        <button onClick={() => scroll(-1)} style={{ ...arrowStyle, left: 0, background: `linear-gradient(to right, ${T.colorSurfacePrimary} 60%, transparent)` }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      {showRightArrow && (
        <button onClick={() => scroll(1)} style={{ ...arrowStyle, right: 0, background: `linear-gradient(to left, ${T.colorSurfacePrimary} 60%, transparent)` }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      <div ref={scrollRef} onScroll={updateArrows} style={{ display: "flex", gap, overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none", position: "relative", paddingLeft: showLeftArrow ? 28 : 0, paddingRight: showRightArrow ? 28 : 0, transition: "padding 0.2s ease" }}>
        {tabs.map((tab) => {
          const active = activeTab === tab.value;
          const hasCount = tab.count !== undefined && tab.count !== null;
          const hasDot = tab.showDot === true;
          const displayCount = hasCount ? (tab.count > 99 ? "99+" : tab.count) : null;
          return (
            <button key={tab.value} ref={(el) => { tabRefs.current[tab.value] = el; }} onClick={() => { if (onChange) onChange(tab.value); }}
              style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", padding: 0, paddingBottom: 12, cursor: "pointer", position: "relative", flexShrink: 0 }}>
              <span style={{ position: "relative", display: "inline-flex", flexDirection: "column" }}>
                <span aria-hidden="true" style={{ ...T.textSm, fontWeight: 500, letterSpacing: "0.15px", whiteSpace: "nowrap", height: 0, overflow: "hidden", visibility: "hidden", pointerEvents: "none" }}>{tab.label}</span>
                <span style={{ ...T.textSm, fontWeight: active ? 500 : 400, color: active ? T.colorTextPrimary: T.colorTextMuted, letterSpacing: "0.15px", whiteSpace: "nowrap", transition: "color 0.2s ease, font-weight 0.2s ease" }}>{tab.label}</span>
              </span>
              {hasCount && (
                <span style={{ ...T.textXs, fontWeight: 500, color: tab.count > 0 ? T.colorSurfacePrimary : T.colorTextSecondary, background: tab.count > 0 ? T.colorBrandPrimary: T.colorSurfaceActive, borderRadius: 4, padding: "1px 4px", minWidth: 20, textAlign: "center", lineHeight: "18px" }}>{displayCount}</span>
              )}
              {hasDot && <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.colorError, flexShrink: 0 }} />}
            </button>
          );
        })}
        <div style={{ position: "absolute", bottom: 0, height: 2, background: T.colorBrandPrimary, borderRadius: 1, zIndex: 1, left: indicator.left, width: indicator.width, transition: isInitial ? "none" : "left 0.25s ease, width 0.25s ease", pointerEvents: "none" }} />
      </div>
    </div>
  );
}

// ── Icon SVG paths from Mimo nav icon set ─────────────────────────────────────
const PATHS = {
  home: "M7.5 17.5016V11.3349C7.5 10.8682 7.5 10.6348 7.59083 10.4566C7.67072 10.2998 7.79821 10.1723 7.95501 10.0924C8.13327 10.0016 8.36662 10.0016 8.83333 10.0016H11.1667C11.6334 10.0016 11.8667 10.0016 12.045 10.0924C12.2018 10.1723 12.3293 10.2998 12.4092 10.4566C12.5 10.6348 12.5 10.8682 12.5 11.3349V17.5016M9.18141 2.30492L3.52949 6.70086C3.15168 6.99471 2.96278 7.14163 2.82669 7.32563C2.70614 7.48862 2.61633 7.67224 2.56169 7.86746C2.5 8.08785 2.5 8.32717 2.5 8.8058V14.8349C2.5 15.7683 2.5 16.235 2.68166 16.5916C2.84144 16.9052 3.09641 17.1601 3.41002 17.3199C3.76654 17.5016 4.23325 17.5016 5.16667 17.5016H14.8333C15.7668 17.5016 16.2335 17.5016 16.59 17.3199C16.9036 17.1601 17.1586 16.9052 17.3183 16.5916C17.5 16.235 17.5 15.7683 17.5 14.8349V8.8058C17.5 8.32717 17.5 8.08785 17.4383 7.86746C17.3837 7.67224 17.2939 7.48862 17.1733 7.32563C17.0372 7.14163 16.8483 6.99471 16.4705 6.70086L10.8186 2.30492C10.5258 2.07721 10.3794 1.96335 10.2178 1.91959C10.0752 1.88097 9.92484 1.88097 9.78221 1.91959C9.62057 1.96335 9.47418 2.07721 9.18141 2.30492Z",
  bookOpen: "M9.99984 17.5L9.91646 17.3749C9.33759 16.5066 9.04816 16.0725 8.66575 15.7582C8.32722 15.4799 7.93714 15.2712 7.51784 15.1438C7.04421 15 6.52243 15 5.47886 15H4.33317C3.39975 15 2.93304 15 2.57652 14.8183C2.26292 14.6586 2.00795 14.4036 1.84816 14.09C1.6665 13.7335 1.6665 13.2668 1.6665 12.3333V5.16667C1.6665 4.23325 1.6665 3.76654 1.84816 3.41002C2.00795 3.09641 2.26292 2.84144 2.57652 2.68166C2.93304 2.5 3.39975 2.5 4.33317 2.5H4.6665C6.53335 2.5 7.46677 2.5 8.17981 2.86331C8.80701 3.18289 9.31695 3.69282 9.63653 4.32003C9.99984 5.03307 9.99984 5.96649 9.99984 7.83333M9.99984 17.5V7.83333M9.99984 17.5L10.0832 17.3749C10.6621 16.5066 10.9515 16.0725 11.3339 15.7582C11.6725 15.4799 12.0625 15.2712 12.4818 15.1438C12.9555 15 13.4772 15 14.5208 15H15.6665C16.5999 15 17.0666 15 17.4232 14.8183C17.7368 14.6586 17.9917 14.4036 18.1515 14.09C18.3332 13.7335 18.3332 13.2668 18.3332 12.3333V5.16667C18.3332 4.23325 18.3332 3.76654 18.1515 3.41002C17.9917 3.09641 17.7368 2.84144 17.4232 2.68166C17.0666 2.5 16.5999 2.5 15.6665 2.5H15.3332C13.4663 2.5 12.5329 2.5 11.8199 2.86331C11.1927 3.18289 10.6827 3.69282 10.3631 4.32003C9.99984 5.03307 9.99984 5.96649 9.99984 7.83333",
  inbox: "M2.08317 9.9987H4.90148C5.47248 9.9987 5.99448 10.3213 6.24984 10.832C6.5052 11.3428 7.02719 11.6654 7.5982 11.6654H12.4015C12.9725 11.6654 13.4945 11.3428 13.7498 10.832C14.0052 10.3213 14.5272 9.9987 15.0982 9.9987H17.9165M7.47197 3.33203H12.5277C13.4251 3.33203 13.8738 3.33203 14.2699 3.46867C14.6202 3.5895 14.9393 3.78669 15.204 4.04599C15.5034 4.33919 15.7041 4.74053 16.1054 5.54318L17.9109 9.15412C18.0684 9.4691 18.1471 9.6266 18.2027 9.79165C18.252 9.93824 18.2876 10.0891 18.309 10.2423C18.3332 10.4147 18.3332 10.5908 18.3332 10.943V12.6654C18.3332 14.0655 18.3332 14.7656 18.0607 15.3003C17.821 15.7707 17.4386 16.1532 16.9681 16.3929C16.4334 16.6654 15.7333 16.6654 14.3332 16.6654H5.6665C4.26637 16.6654 3.56631 16.6654 3.03153 16.3929C2.56112 16.1532 2.17867 15.7707 1.93899 15.3003C1.6665 14.7656 1.6665 14.0655 1.6665 12.6654V10.943C1.6665 10.5908 1.6665 10.4147 1.69065 10.2423C1.71209 10.0891 1.7477 9.93824 1.79702 9.79165C1.85255 9.6266 1.9313 9.4691 2.0888 9.15412L3.89426 5.54318C4.29559 4.74052 4.49625 4.3392 4.79562 4.04599C5.06036 3.78669 5.37943 3.5895 5.72974 3.46867C6.12588 3.33203 6.57458 3.33203 7.47197 3.33203Z",
  checkVerifiedBadge: "M7.66809 17.1687C7.94121 17.1326 8.21712 17.2067 8.43469 17.3742L9.43738 18.1437C9.76884 18.3983 10.2299 18.3983 10.5604 18.1437L11.6011 17.3446C11.7955 17.1955 12.0409 17.1298 12.2834 17.1622L13.5852 17.3335C13.999 17.3881 14.3981 17.1576 14.5583 16.7715L15.0591 15.5604C15.1526 15.3336 15.3323 15.1539 15.5591 15.0604L16.7701 14.5595C17.1562 14.4003 17.3867 14.0003 17.3321 13.5864L17.1673 12.3318C17.1312 12.0587 17.2053 11.7827 17.3728 11.5651L18.1422 10.5624C18.3968 10.2309 18.3968 9.76983 18.1422 9.43928L17.3432 8.39857C17.1941 8.20413 17.1284 7.95877 17.1608 7.71618L17.3321 6.41437C17.3867 6.00049 17.1562 5.60142 16.7701 5.44124L15.5591 4.94033C15.3323 4.84682 15.1526 4.66719 15.0591 4.44035L14.5583 3.22927C14.399 2.84317 13.999 2.61262 13.5852 2.66725L12.2834 2.83854C12.0409 2.87187 11.7955 2.80613 11.602 2.65799L10.5614 1.85894C10.2299 1.60431 9.76884 1.60431 9.43831 1.85894L8.39766 2.65799C8.20323 2.80613 7.95788 2.87187 7.71531 2.84039L6.41356 2.6691C5.99971 2.61447 5.60067 2.84502 5.4405 3.23112L4.94054 4.4422C4.8461 4.66812 4.66649 4.84774 4.44058 4.94218L3.22957 5.44217C2.84349 5.60235 2.61295 6.00141 2.66758 6.41529L2.83886 7.71711C2.87034 7.95969 2.8046 8.20506 2.65647 8.39857L1.85746 9.43928C1.60285 9.77075 1.60285 10.2319 1.85746 10.5624L2.65647 11.6031C2.80553 11.7975 2.87126 12.0429 2.83886 12.2855L2.66758 13.5873C2.61295 14.0012 2.84349 14.4003 3.22957 14.5604L4.44058 15.0613C4.66741 15.1549 4.84703 15.3345 4.94054 15.5613L5.44142 16.7724C5.60067 17.1585 6.00063 17.3891 6.41449 17.3344L7.66809 17.1687Z",
  checkVerifiedMark: "M7.49984 10.0013L9.1665 11.668L12.9165 7.91797",
  switchHorizontal: "M16.6668 14.1667H3.3335M3.3335 14.1667L6.66683 10.8333M3.3335 14.1667L6.66683 17.5M3.3335 5.83333H16.6668M16.6668 5.83333L13.3335 2.5M16.6668 5.83333L13.3335 9.16667",
  fileQuestion: "M16.6668 7.91797V5.66797C16.6668 4.26784 16.6668 3.56777 16.3943 3.03299C16.1547 2.56259 15.7722 2.18014 15.3018 1.94045C14.767 1.66797 14.067 1.66797 12.6668 1.66797H7.3335C5.93336 1.66797 5.2333 1.66797 4.69852 1.94045C4.22811 2.18014 3.84566 2.56259 3.60598 3.03299C3.3335 3.56777 3.3335 4.26784 3.3335 5.66797V14.3346C3.3335 15.7348 3.3335 16.4348 3.60598 16.9696C3.84566 17.44 4.22811 17.8225 4.69852 18.0622C5.2333 18.3346 5.93336 18.3346 7.3335 18.3346H11.6668M11.6668 9.16797H6.66683M8.3335 12.5013H6.66683M13.3335 5.83464H6.66683M13.7502 12.5032C13.897 12.0858 14.1868 11.7338 14.5683 11.5096C14.9497 11.2854 15.3982 11.2035 15.8343 11.2783C16.2704 11.3531 16.666 11.5798 16.9509 11.9183C17.2359 12.2568 17.3919 12.6852 17.3912 13.1277C17.3912 14.3768 15.5176 15.0013 15.5176 15.0013M15.5417 17.5013H15.5501",
  settingsGear: "M7.82936 16.1439L8.3164 17.2393C8.46118 17.5653 8.69747 17.8424 8.99659 18.0368C9.29571 18.2312 9.64483 18.3347 10.0016 18.3346C10.3583 18.3347 10.7075 18.2312 11.0066 18.0368C11.3057 17.8424 11.542 17.5653 11.6868 17.2393L12.1738 16.1439C12.3472 15.7552 12.6388 15.4312 13.0071 15.218C13.3778 15.0042 13.8066 14.9131 14.2321 14.9578L15.4238 15.0846C15.7785 15.1222 16.1365 15.056 16.4544 14.8941C16.7722 14.7322 17.0363 14.4816 17.2145 14.1726C17.393 13.8638 17.4781 13.5099 17.4593 13.1537C17.4406 12.7975 17.3189 12.4545 17.109 12.1661L16.4034 11.1967C16.1522 10.8489 16.018 10.4303 16.0201 10.0013C16.02 9.57346 16.1555 9.15659 16.4071 8.81056L17.1127 7.84112C17.3226 7.55276 17.4443 7.20969 17.463 6.85353C17.4818 6.49737 17.3967 6.14342 17.2183 5.83464C17.04 5.52566 16.7759 5.27504 16.4581 5.11316C16.1402 4.95127 15.7822 4.88508 15.4275 4.9226L14.2358 5.04945C13.8103 5.09414 13.3815 5.00307 13.0108 4.78927C12.6418 4.57485 12.3501 4.2491 12.1775 3.85871L11.6868 2.76334C11.542 2.43728 11.3057 2.16023 11.0066 1.9658C10.7075 1.77137 10.3583 1.66791 10.0016 1.66797C9.64483 1.66791 9.29571 1.77137 8.99659 1.9658C8.69747 2.16023 8.46118 2.43728 8.3164 2.76334L7.82936 3.85871C7.6568 4.2491 7.36509 4.57485 6.99603 4.78927C6.62538 5.00307 6.19659 5.09414 5.77103 5.04945L4.57566 4.9226C4.22094 4.88508 3.86294 4.95127 3.54509 5.11316C3.22724 5.27504 2.96317 5.52566 2.78492 5.83464C2.60644 6.14342 2.52141 6.49737 2.54014 6.85353C2.55888 7.20969 2.68058 7.55276 2.89048 7.84112L3.59603 8.81056C3.84765 9.15659 3.98315 9.57346 3.98307 10.0013C3.98315 10.4291 3.84765 10.846 3.59603 11.192L2.89048 12.1615C2.68058 12.4498 2.55888 12.7929 2.54014 13.1491C2.52141 13.5052 2.60644 13.8592 2.78492 14.168C2.96335 14.4768 3.22744 14.7273 3.54525 14.8891C3.86306 15.051 4.22096 15.1173 4.57566 15.08L5.76733 14.9532C6.19289 14.9085 6.62167 14.9995 6.99233 15.2133C7.36277 15.4272 7.65583 15.753 7.82936 16.1439Z",
  settingsCircle: "M10.0001 12.5013C11.3808 12.5013 12.5001 11.382 12.5001 10.0013C12.5001 8.62059 11.3808 7.5013 10.0001 7.5013C8.61939 7.5013 7.5001 8.62059 7.5001 10.0013C7.5001 11.382 8.61939 12.5013 10.0001 12.5013Z",
  download: "M10 2.5V13.3333M10 13.3333L14.1667 9.16667M10 13.3333L5.83333 9.16667M2.5 10V14.8333C2.5 15.7668 2.5 16.2335 2.68166 16.59C2.84144 16.9036 3.09641 17.1586 3.41002 17.3183C3.76654 17.5 4.23325 17.5 5.16667 17.5H14.8333C15.7668 17.5 16.2335 17.5 16.59 17.3183C16.9036 17.1586 17.1586 16.9036 17.3183 16.59C17.5 16.2335 17.5 15.7668 17.5 14.8333V10",
  file06: "M14.1667 1.66667H5.83333C4.9 1.66667 4.43333 1.66667 4.07667 1.84833C3.76333 2.00833 3.50833 2.26333 3.34833 2.57667C3.16667 2.93333 3.16667 3.4 3.16667 4.33333V15.6667C3.16667 16.6 3.16667 17.0667 3.34833 17.4233C3.50833 17.7367 3.76333 17.9917 4.07667 18.1517C4.43333 18.3333 4.9 18.3333 5.83333 18.3333H14.1667C15.1 18.3333 15.5667 18.3333 15.9233 18.1517C16.2367 17.9917 16.4917 17.7367 16.6517 17.4233C16.8333 17.0667 16.8333 16.6 16.8333 15.6667V4.33333C16.8333 3.4 16.8333 2.93333 16.6517 2.57667C16.4917 2.26333 16.2367 2.00833 15.9233 1.84833C15.5667 1.66667 15.1 1.66667 14.1667 1.66667ZM7.5 6.66667H12.5M7.5 10H12.5M7.5 13.3333H10",
  upload: "M10 13.3333V2.5M10 2.5L5.83333 6.66667M10 2.5L14.1667 6.66667M2.5 10V14.8333C2.5 15.7668 2.5 16.2335 2.68166 16.59C2.84144 16.9036 3.09641 17.1586 3.41002 17.3183C3.76654 17.5 4.23325 17.5 5.16667 17.5H14.8333C15.7668 17.5 16.2335 17.5 16.59 17.3183C16.9036 17.1586 17.1586 16.9036 17.3183 16.59C17.5 16.2335 17.5 15.7668 17.5 14.8333V10",
  plus: "M10 4.16667V15.8333M4.16667 10H15.8333",
  calculator: "M14.5833 5.41667L5.41667 14.5833M7.08333 8.75V5.41667M5.41667 7.08333H8.75M11.25 12.9167H14.5833M6.5 17.5H13.5C14.9001 17.5 15.6002 17.5 16.135 17.2275C16.6054 16.9878 16.9878 16.6054 17.2275 16.135C17.5 15.6002 17.5 14.9001 17.5 13.5V6.5C17.5 5.09987 17.5 4.3998 17.2275 3.86502C16.9878 3.39462 16.6054 3.01217 16.135 2.77248C15.6002 2.5 14.9001 2.5 13.5 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5Z",
  rowsTop: "M14.8333 8.33333C15.7668 8.33333 16.2335 8.33333 16.59 8.15168C16.9036 7.99189 17.1586 7.73692 17.3183 7.42332C17.5 7.0668 17.5 6.60009 17.5 5.66667V5.16667C17.5 4.23325 17.5 3.76654 17.3183 3.41002C17.1586 3.09641 16.9036 2.84145 16.59 2.68166C16.2335 2.5 15.7668 2.5 14.8333 2.5L5.16667 2.5C4.23325 2.5 3.76654 2.5 3.41002 2.68166C3.09641 2.84144 2.84144 3.09641 2.68166 3.41002C2.5 3.76654 2.5 4.23325 2.5 5.16667L2.5 5.66667C2.5 6.60009 2.5 7.0668 2.68166 7.42332C2.84144 7.73692 3.09641 7.99189 3.41002 8.15168C3.76654 8.33333 4.23325 8.33333 5.16667 8.33333L14.8333 8.33333Z",
  rowsBottom: "M14.8333 17.5C15.7668 17.5 16.2335 17.5 16.59 17.3183C16.9036 17.1586 17.1586 16.9036 17.3183 16.59C17.5 16.2335 17.5 15.7668 17.5 14.8333V14.3333C17.5 13.3999 17.5 12.9332 17.3183 12.5767C17.1586 12.2631 16.9036 12.0081 16.59 11.8483C16.2335 11.6667 15.7668 11.6667 14.8333 11.6667L5.16667 11.6667C4.23325 11.6667 3.76654 11.6667 3.41002 11.8483C3.09641 12.0081 2.84144 12.2631 2.68166 12.5767C2.5 12.9332 2.5 13.3999 2.5 14.3333L2.5 14.8333C2.5 15.7668 2.5 16.2335 2.68166 16.59C2.84144 16.9036 3.09641 17.1586 3.41002 17.3183C3.76654 17.5 4.23325 17.5 5.16667 17.5H14.8333Z",
};

// Backward-compat aliases used by Adjustments-era pages
var _MM_PATHS = PATHS;

// ── Reusable icon renderer ────────────────────────────────────────────────────
function NavIcon({ name, color }) {
  const sp = { stroke: color, strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === "checkVerified") return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={PATHS.checkVerifiedBadge} {...sp} />
      <path d={PATHS.checkVerifiedMark} {...sp} />
    </svg>
  );
  if (name === "settings") return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={PATHS.settingsGear} {...sp} />
      <path d={PATHS.settingsCircle} {...sp} />
    </svg>
  );
  if (name === "rows") return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={PATHS.rowsTop} {...sp} />
      <path d={PATHS.rowsBottom} {...sp} />
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={PATHS[name]} {...sp} />
    </svg>
  );
}

// ── Progress ring (circular indicator) ───────────────────────────────────────
function ProgressRing({ progress = 0, size = 40, strokeWidth = 3 }) {
  const r = (size - strokeWidth * 2) / 2;
  const circ = 2 * Math.PI * r;
  const c = size / 2;
  const clamped = Math.max(0, Math.min(100, progress));
  const offset = circ - (clamped / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx={c} cy={c} r={r} fill="none" stroke="#EAF2E2" strokeWidth={strokeWidth} />
      <circle cx={c} cy={c} r={r} fill="none" stroke="#05A105" strokeWidth={strokeWidth}
        strokeDasharray={`${circ} ${circ}`} strokeDashoffset={offset} strokeLinecap="butt" />
    </svg>
  );
}

// ── Sortable column header icon ───────────────────────────────────────────────
function parseGBP(str) {
  if (!str) return 0;
  return parseFloat(str.replace(/[£\s]/g, "").replace(/,(?=\d{3})/g, "").replace(",", ".")) || 0;
}
function formatGBPDiff(diff) {
  if (diff === 0) return "£0.00";
  const abs = Math.abs(diff).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${diff > 0 ? "+" : "-"}£${abs}`;
}

function SortIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
      <path d="M6 2v8M3.5 7.5L6 10l2.5-2.5M3.5 4.5L6 2l2.5 2.5" stroke="#8C8C8B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Play circle icon ──────────────────────────────────────────────────────────
function PlayCircleIcon({ color = T.colorTextPrimary, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M10 18.335C14.6024 18.335 18.3333 14.604 18.3333 10.0016C18.3333 5.39926 14.6024 1.66831 10 1.66831C5.39763 1.66831 1.66667 5.39926 1.66667 10.0016C1.66667 14.604 5.39763 18.335 10 18.335Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.9165 7.47241C7.9165 7.07467 7.9165 6.87581 7.99962 6.76478C8.07206 6.66803 8.18293 6.6075 8.30349 6.59889C8.44182 6.58901 8.60911 6.69655 8.94368 6.91163L12.8775 9.44052C13.1678 9.62715 13.313 9.72047 13.3631 9.83913C13.4069 9.94281 13.4069 10.0598 13.3631 10.1635C13.313 10.2821 13.1678 10.3755 12.8775 10.5621L8.94368 13.091C8.60911 13.3061 8.44182 13.4136 8.30349 13.4037C8.18293 13.3951 8.07206 13.3346 7.99962 13.2378C7.9165 13.1268 7.9165 12.9279 7.9165 12.5302V7.47241Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Tr. matching mini-badge ───────────────────────────────────────────────────
function TrMatchBadge({ value = "0/0", noFeed = false }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: T.colorButtonSecondary, border: "none",
      borderRadius: 4, padding: "0 8px", height: 25,
      fontSize: 12, fontWeight: 500, color: T.colorTextMuted,
    }}>
      {!noFeed && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="4" stroke="#E9E9EB" strokeWidth="1.5" />
          <path d="M5 1 A4 4 0 0 1 9 5" stroke="#CFCFD1" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
      {noFeed ? "No feed balance" : value}
    </span>
  );
}

// ── Tr. matching reconciled badge (with SVG progress ring) ───────────────────
function TrMatchingBadge({ matchedCount, totalCount, status }) {
  const isSuggestions = status === "suggestions";
  const isCompleted   = status === "completed";
  const trackColor = isSuggestions ? "#F4A59C" : isCompleted ? "#A0B4EE" : T.colorBrandLight;
  const fillColor  = isSuggestions ? T.colorError  : isCompleted ? T.colorInfo  : T.colorBrandPrimary;
  const textColor  = isSuggestions ? T.colorError  : isCompleted ? T.colorInfo  : T.colorSuccess;
  const bgColor    = isSuggestions ? T.colorErrorBg  : isCompleted ? T.colorInfoBg  : T.colorSuccessBg;

  const safeTotal   = totalCount > 0 ? totalCount : 1;
  const safeMatched = Math.min(matchedCount, safeTotal);
  const pct         = (safeMatched / safeTotal) * 100;

  const SIZE = 16;
  const RADIUS = 5;
  const SW = 2;
  const CX = SIZE / 2;   // 8
  const CY = SIZE / 2;   // 8
  const circ = 2 * Math.PI * RADIUS;
  const offset = circ * (1 - pct / 100);

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: bgColor, borderRadius: 4, padding: "0 8px", height: 25, fontSize: 12, fontWeight: 500, color: textColor }}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none" style={{ transform: "rotate(-90deg)", flexShrink: 0, display: "block" }}>
        <circle cx={CX} cy={CY} r={RADIUS} stroke={fillColor} strokeWidth={SW} fill="none"
          strokeDasharray={`${circ} ${circ}`}
          strokeDashoffset={offset}
          strokeLinecap="round" />
      </svg>
      {safeMatched}/{safeTotal}
    </span>
  );
}

// ── Chevron ───────────────────────────────────────────────────────────────────
function Chevron({ up = false, color = T.colorTextSecondary, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d={up ? "M3 9.5L7 5.5L11 9.5" : "M3 5.5L7 9.5L11 5.5"} stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Backward-compat alias for Adjustments-era pages
var _MM_Chevron = Chevron;

// ── Account / Credit card table ───────────────────────────────────────────────
function DocIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 23 28" fill="none" style={{ flexShrink: 0 }}>
      <path d="M0 2.59259C0 1.16074 1.14416 0 2.55556 0H16.1L19.1048 3.95161L23 9.07407V25.4074C23 26.8393 21.8558 28 20.4444 28H2.55556C1.14416 28 0 26.8393 0 25.4074V2.59259Z" fill="#F4F4F2"/>
      <path d="M6.49191 13.3299H16.508M6.49191 16.6686H16.508M11.5 9.99121V20.0073M9.16288 9.99121H13.8371C14.772 9.99121 15.2395 9.99121 15.5966 10.1732C15.9107 10.3332 16.166 10.5886 16.3261 10.9027C16.508 11.2598 16.508 11.7273 16.508 12.6622V17.3364C16.508 18.2713 16.508 18.7388 16.3261 19.0959C16.166 19.41 15.9107 19.6653 15.5966 19.8254C15.2395 20.0073 14.772 20.0073 13.8371 20.0073H9.16288C8.22795 20.0073 7.76049 20.0073 7.4034 19.8254C7.08929 19.6653 6.83391 19.41 6.67386 19.0959C6.49191 18.7388 6.49191 18.2713 6.49191 17.3364V12.6622C6.49191 11.7273 6.49191 11.2598 6.67386 10.9027C6.83391 10.5886 7.08929 10.3332 7.4034 10.1732C7.76049 9.99121 8.22795 9.99121 9.16288 9.99121Z" stroke="#0AAC63" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.1 7.61574V0L23 9.07407H17.5375C16.8599 9.07407 16.521 9.07407 16.3105 8.86051C16.1 8.64694 16.1 8.30321 16.1 7.61574Z" fill="#D6D6D4"/>
    </svg>
  );
}

function InvoiceIcon({ width = 20, height = 24 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M0 2.22222C0 0.994923 0.994923 0 2.22222 0H14L16.6129 3.3871L20 7.77778V21.7778C20 23.0051 19.0051 24 17.7778 24H2.22222C0.994923 24 0 23.0051 0 21.7778V2.22222Z" fill="#F4F4F2"/>
      <path d="M8.03267 8.15368C10.5633 7.47908 7.93554 18.9444 5.9642 17.3672C3.51971 15.4116 15.1258 12.431 14.0498 15.299C13.1067 17.8125 5.21208 8.90557 8.03267 8.15368Z" stroke="#FF6056" strokeWidth="0.864969"/>
      <path d="M14 6.52778V0L20 7.77778H15.25C14.6607 7.77778 14.3661 7.77778 14.1831 7.59472C14 7.41166 14 7.11703 14 6.52778Z" fill="#D6D6D4"/>
    </svg>
  );
}

function PdfIcon({ width = 20, height = 24 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 31 37" fill="none" style={{ flexShrink: 0 }}>
      <path d="M0 3.42593C0 1.53384 1.54213 0 3.44444 0H21.7L25.75 5.22177L31 11.9907V33.5741C31 35.4662 29.4579 37 27.5556 37H3.44444C1.54213 37 0 35.4662 0 33.5741V3.42593Z" fill="#F4F4F2"/>
      <path d="M13.1059 12.5745C17.2349 11.5345 12.9474 29.2102 9.73104 26.7787C5.74267 23.7638 24.6789 19.1687 22.9233 23.5901C21.3846 27.4652 8.5039 13.7337 13.1059 12.5745Z" stroke="#FF6056" strokeWidth="1.25"/>
      <path d="M21.7 10.0637V0L31 11.9907H23.6375C22.7241 11.9907 22.2674 11.9907 21.9837 11.7085C21.7 11.4263 21.7 10.9721 21.7 10.0637Z" fill="#D6D6D4"/>
    </svg>
  );
}

function CsvIcon({ width = 20, height = 24 }) {
  const scale = width / 23;
  return (
    <svg width={width} height={height} viewBox="0 0 23 28" fill="none" style={{ flexShrink: 0 }}>
      <path d="M0 2.59259C0 1.16074 1.14416 0 2.55556 0H16.1L19.1048 3.95161L23 9.07407V25.4074C23 26.8393 21.8558 28 20.4444 28H2.55556C1.14416 28 0 26.8393 0 25.4074V2.59259Z" fill="#F4F4F2"/>
      <path d="M6.49191 13.3299H16.508M6.49191 16.6686H16.508M11.5 9.99121V20.0073M9.16288 9.99121H13.8371C14.772 9.99121 15.2395 9.99121 15.5966 10.1732C15.9107 10.3332 16.166 10.5886 16.3261 10.9027C16.508 11.2598 16.508 11.7273 16.508 12.6622V17.3364C16.508 18.2713 16.508 18.7388 16.3261 19.0959C16.166 19.41 15.9107 19.6653 15.5966 19.8254C15.2395 20.0073 14.772 20.0073 13.8371 20.0073H9.16288C8.22795 20.0073 7.76049 20.0073 7.4034 19.8254C7.08929 19.6653 6.83391 19.41 6.67386 19.0959C6.49191 18.7388 6.49191 18.2713 6.49191 17.3364V12.6622C6.49191 11.7273 6.49191 11.2598 6.67386 10.9027C6.83391 10.5886 7.08929 10.3332 7.4034 10.1732C7.76049 9.99121 8.22795 9.99121 9.16288 9.99121Z" stroke="#0AAC63" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.1 7.61574V0L23 9.07407H17.5375C16.8599 9.07407 16.521 9.07407 16.3105 8.86051C16.1 8.64694 16.1 8.30321 16.1 7.61574Z" fill="#D6D6D4"/>
    </svg>
  );
}

const STATUS_CONFIG = {
  reconciled:  { label: "Reconciled",  color: T.colorBrandPrimary, tooltip: "Account is fully reconciled in Xero" },
  suggestions: { label: "Suggestions", color: T.colorError, tooltip: "Resolve suggestions to reconcile account" },
  completed:   { label: "Completed",   color: T.colorInfo, tooltip: "Account ready to be reconciled in Xero" },
  reviewing:   { label: "Awaiting action",   color: T.colorWarning, tooltip: "All suggestions handled — ready to be marked as reconciled" },
};

function ReconciledCard({ date, status = "reconciled", suggestionCount, onPlay, onTipShow, onTipHide }) {
  const { label, color, tooltip } = STATUS_CONFIG[status] || STATUS_CONFIG.reconciled;
  const displayLabel = status === "suggestions" && suggestionCount != null
    ? `${suggestionCount} ${suggestionCount === 1 ? "Suggestion" : label}`
    : label;
  return (
    <div
      onClick={onPlay}
      onMouseEnter={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        onTipShow && onTipShow(rect.left + rect.width / 2, rect.top, tooltip);
        e.currentTarget.style.borderColor = T.colorBorderInput;
        e.currentTarget.style.background = T.colorSurfaceSecondary;
      }}
      onMouseLeave={e => {
        onTipHide && onTipHide();
        e.currentTarget.style.borderColor = T.colorButtonSecondaryHover;
        e.currentTarget.style.background = T.colorSurfacePrimary;
      }}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: 184, height: 60, padding: "0 12px",
        background: T.colorSurfacePrimary, border: `1px solid ${T.colorButtonSecondaryHover}`, borderRadius: 8,
        boxSizing: "border-box", flexShrink: 0,
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color, lineHeight: 1 }}>{displayLabel}</span>
        {date && <span style={{ fontSize: 11, color: T.colorTextMuted, lineHeight: 1 }}>{date}</span>}
      </div>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8.333" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.917 7.4714C7.917 7.0737 7.917 6.8748 8 6.7638C8.072 6.6671 8.183 6.6065 8.304 6.5979C8.442 6.588 8.609 6.6956 8.944 6.9106L12.878 9.4395C13.168 9.6262 13.313 9.7195 13.363 9.8382C13.407 9.9418 13.407 10.0588 13.363 10.1625C13.313 10.2812 13.168 10.3745 12.878 10.5611L8.944 13.09C8.609 13.3051 8.442 13.4126 8.304 13.4027C8.183 13.3941 8.072 13.3336 8 13.2368C7.917 13.1258 7.917 12.927 7.917 12.5292V7.4714Z" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function FileIcon({ file, width = 20, height = 24 }) {
  if (!file) return <InvoiceIcon width={width} height={height} />;
  const name = (file.name || "").toLowerCase();
  const type = (file.type || "").toLowerCase();
  if (type === "application/pdf" || name.endsWith(".pdf")) return <PdfIcon width={width} height={height} />;
  if (type.includes("csv") || name.endsWith(".csv") || name.endsWith(".numbers")) return <CsvIcon width={width} height={height} />;
  return <InvoiceIcon width={width} height={height} />;
}

const STATUSES = ["reconciled", "suggestions", "completed"];
const randomOutcome = () => {
  const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
  const count = status === "suggestions" ? Math.floor(Math.random() * 20) + 20 : null;
  return { status, count };
};

// ── Reconciliation steps accordion ───────────────────────────────────────────
// Collapsible progress panel: expands while steps run, collapses when complete.
// Props: steps (array), stepStatuses (array), stepSubtexts (array), title (string)
function ReconciliationStepsAccordion({ steps, stepStatuses, stepSubtexts, title = "Reconciliation", onCollapsed }) {
  const allDone = stepStatuses.length > 0 && stepStatuses.every(s => s === "done");
  // Start collapsed if all steps are already done on mount (resume / viewing results)
  const [collapsed, setCollapsed] = useState(allDone);
  const wasAlreadyDone = useRef(allDone);

  // Auto-collapse once all steps finish during a live run (not on mount)
  useEffect(() => {
    if (allDone && !wasAlreadyDone.current) {
      const t = setTimeout(() => {
        setCollapsed(true);
        // Notify parent after collapse animation settles
        if (onCollapsed) setTimeout(onCollapsed, 350);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [allDone]);

  return (
    <div style={{ marginTop: 24 }}>
      {/* Header – clickable */}
      <div
        onClick={() => setCollapsed(c => !c)}
        style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: collapsed ? 0 : 20, cursor: "pointer" }}
      >
        <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6.50065 6.4987L10.6257 10.6237M6.50065 6.4987H3.75065L2.83398 3.7487L3.75065 2.83203L6.50065 3.7487V6.4987ZM18.6547 3.51129L16.2461 5.91994C15.8831 6.28296 15.7016 6.46446 15.6335 6.67377C15.5737 6.85787 15.5737 7.05619 15.6335 7.2403C15.7016 7.4496 15.8831 7.63111 16.2461 7.99412L16.4636 8.21161C16.8266 8.57462 17.0081 8.75613 17.2174 8.82414C17.4015 8.88396 17.5998 8.88396 17.7839 8.82414C17.9932 8.75613 18.1747 8.57462 18.5377 8.21161L20.7908 5.95852C21.0335 6.54901 21.1673 7.19573 21.1673 7.8737C21.1673 10.6581 18.9101 12.9154 16.1257 12.9154C15.79 12.9154 15.4619 12.8826 15.1446 12.82C14.699 12.7321 14.4761 12.6881 14.3411 12.7016C14.1975 12.7159 14.1267 12.7374 13.9995 12.8055C13.8798 12.8696 13.7597 12.9896 13.5196 13.2298L6.95898 19.7904C6.19959 20.5497 4.96838 20.5497 4.20899 19.7904C3.44959 19.031 3.44959 17.7997 4.20899 17.0403L10.7696 10.4798C11.0097 10.2396 11.1298 10.1196 11.1938 9.99989C11.2619 9.87265 11.2834 9.80188 11.2977 9.65827C11.3112 9.5232 11.2673 9.30038 11.1794 8.85475C11.1168 8.53742 11.084 8.20939 11.084 7.8737C11.084 5.08926 13.3412 2.83203 16.1257 2.83203C17.0474 2.83203 17.9113 3.07937 18.6547 3.51129ZM12.0007 14.7486L17.0423 19.7903C17.8017 20.5497 19.0329 20.5497 19.7923 19.7903C20.5517 19.0309 20.5517 17.7996 19.7923 17.0403L15.6447 12.8927C15.3511 12.8649 15.0648 12.812 14.788 12.736C14.4314 12.6381 14.0402 12.7092 13.7787 12.9707L12.0007 14.7486Z" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: T.colorTextPrimary }}>{title}</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: "transform 0.2s ease", transform: collapsed ? "rotate(180deg)" : "rotate(0deg)" }}>
              <path d="M3 8.5L7 4.5L11 8.5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontSize: 13, color: T.colorTextSecondary }}>
            {allDone ? "Completed" : "In progress"}
          </span>
        </div>
      </div>

      {/* Steps – hidden when collapsed */}
      {!collapsed && steps.map((step, i) => {
        const status = stepStatuses[i] || "pending";
        const isLast = i === steps.length - 1;
        return (
          <div key={i} style={{ display: "flex", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 2 }}>
              <div style={{
                width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                border: status === "active" ? "none" : `1.5px solid ${status === "done" ? T.colorBrandPrimary : T.colorBorderDark}`,
                background: status === "done" ? T.colorBorderLight : status === "active" ? "transparent" : T.colorSurfacePrimary,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.4s ease",
              }}>
                {status === "done" && (
                  <svg width="8" height="8" viewBox="0 0 13 13" fill="none">
                    <path d="M2 6.5L5 9.5L11 3.5" stroke="#05A105" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {status === "active" && (
                  <div style={{
                    width: 16, height: 16, borderRadius: "50%",
                    border: `1.5px solid ${T.colorBrandLight}`,
                    borderTopColor: T.colorBrandPrimary,
                    animation: "spin 0.7s linear infinite",
                  }} />
                )}
              </div>
              {!isLast && (
                <div style={{ width: 1, flexGrow: 1, minHeight: 20, background: T.colorBorderDark, margin: "4px 0" }} />
              )}
            </div>
            <div style={{ paddingBottom: isLast ? 0 : 20, paddingTop: 0 }}>
              <div style={{ fontSize: 14, lineHeight: "24px", fontWeight: status === "done" ? 500 : 400, color: status === "pending" ? T.colorBorderInput : T.colorTextPrimary, transition: "all 0.3s ease" }}>
                {step.title}
              </div>
              {(stepSubtexts[i] || status === "done") && step.subtext && (
                <div style={{ fontSize: 13, color: T.colorTextSecondary, marginTop: 2, lineHeight: "18px", animation: "fadeIn 0.3s ease" }}>
                  {step.subtext}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── DS Button components ────────────────────────────────────────────────────
function DestructiveButton({ children, icon, onClick, disabled = false, style = {} }) {
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "10px 12px",
        background: disabled ? T.colorBorderLight : T.colorErrorBg,
        color: disabled ? T.colorTextDisabled : T.colorError,
        border: "none", borderRadius: 8,
        cursor: disabled ? "default" : "pointer",
        fontSize: 14, fontWeight: 500, fontFamily: "'Inter', sans-serif",
        whiteSpace: "nowrap", transition: "background 0.15s ease",
        ...style,
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = "#F9E5E1"; }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = T.colorErrorBg; }}>
      {children}{icon}
    </button>
  );
}

// ── DS Modal component ──────────────────────────────────────────────────────
// Requires keyframes: modalBackdropIn, modalPanelIn
function Modal({
  open = false,
  onClose,
  width = 400,
  header,
  headerAlign = "left",
  title,
  text,
  contentAlign = "left",
  children,
  showDivider = true,
  showClose = false,
  footer,
  footerAlign = "right",
  footerFullWidth = false,
}) {
  if (!open) return null;
  const alignMap = { left: "flex-start", center: "center", right: "flex-end" };
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}
      style={{
        position: "fixed", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.4)", zIndex: 1000,
        fontFamily: "'Inter', sans-serif",
        animation: "modalBackdropIn 0.2s ease",
      }}
    >
      <div style={{
        width, maxHeight: "90vh", overflowY: "auto",
        background: T.colorSurfacePrimary, borderRadius: 16,
        border: `1px solid ${T.colorBorderSubtle}`,
        boxShadow: "0 3px 6px -3px rgba(0,0,0,0.05)",
        display: "flex", flexDirection: "column", gap: 24,
        paddingTop: 24, paddingBottom: 24,
        position: "relative",
        animation: "modalPanelIn 0.25s ease",
      }}>
        {showClose && (
          <button onClick={onClose} style={{
            position: "absolute", top: 16, right: 16,
            width: 24, height: 24,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "none", border: "none", cursor: "pointer",
            color: T.colorTextSecondary, padding: 0, zIndex: 1,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        {header && (
          <div style={{ display: "flex", justifyContent: alignMap[headerAlign] || "flex-start", paddingLeft: 24, paddingRight: 24 }}>
            {header}
          </div>
        )}
        {(title || text || children) && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingLeft: 24, paddingRight: 24 }}>
            {(title || text) && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4, textAlign: contentAlign }}>
                {title && <div style={{ fontSize: 18, lineHeight: "28px", fontWeight: 500, color: T.colorTextPrimary }}>{title}</div>}
                {text && <div style={{ fontSize: 14, lineHeight: "22px", fontWeight: 400, color: T.colorTextPrimary }}>{text}</div>}
              </div>
            )}
            {children}
          </div>
        )}
        {showDivider && <div style={{ height: 1, background: T.colorButtonSecondary, width: "100%", flexShrink: 0 }} />}
        {footer && (
          <div style={{ display: "flex", justifyContent: alignMap[footerAlign] || "flex-end", paddingLeft: 24, paddingRight: 24, gap: 12 }}>
            {footerFullWidth ? <div style={{ display: "flex", gap: 12, width: "100%" }}>{footer}</div> : footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ── DS Sidebar (drawer) component ───────────────────────────────────────────
function Sidebar({
  open = false,
  onClose,
  title = "",
  width = 600,
  showBackdrop = true,
  children,
  footer,
  headerRight,
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (open) { requestAnimationFrame(() => setVisible(true)); }
    else { setVisible(false); }
  }, [open]);
  const handleClose = () => { setVisible(false); setTimeout(() => onClose && onClose(), 320); };
  if (!open && !visible) return null;
  return (
    <>
      {showBackdrop && (
        <div onClick={handleClose} style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.3)", zIndex: 200,
          opacity: visible ? 1 : 0, transition: "opacity 0.3s ease",
        }} />
      )}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width,
        background: T.colorSurfacePrimary, boxShadow: "-4px 0 24px rgba(0,0,0,0.10)",
        display: "flex", flexDirection: "column", zIndex: 201,
        transform: visible ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 24px", borderBottom: `1px solid ${T.colorButtonSecondary}`,
          flexShrink: 0, minHeight: 72, boxSizing: "border-box",
        }}>
          <span style={{ fontSize: 24, fontWeight: 500, color: T.colorTextPrimary, flex: 1, minWidth: 0 }}>{title}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            {headerRight}
            <button onClick={handleClose} style={{
              border: "none", background: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 30, height: 30, borderRadius: "50%", padding: 0,
            }}>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <rect width="30" height="30" rx="15" fill="#F5F5F5"/>
                <path d="M20 10L10 20M10 10L20 20" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>{children}</div>
        {footer && (
          <div style={{ padding: "16px 24px", borderTop: `1px solid ${T.colorButtonSecondary}`, display: "flex", gap: 12, flexShrink: 0 }}>
            {footer}
          </div>
        )}
      </div>
    </>
  );
}

// ── DS Dropdown ──────────────────────────────────────────────────────────────
function Dropdown({
  value, onChange, options = [], placeholder = "Select…", searchable = false,
  searchPlaceholder = "Search…", multiple = false, disabled = false, width = "100%",
  maxHeight = 340, renderTrigger, align = "left", label, size = "md",
  state: stateProp = "enabled", helpText, icon,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [flipUp, setFlipUp] = useState(false);
  const ref = useRef(null);
  const triggerRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setSearch(""); } };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);
  const sections = options.length > 0 && options[0].section != null ? options : [{ section: null, items: options }];
  const q = search.toLowerCase();
  const filteredSections = sections.map(sec => ({ ...sec, items: sec.items.filter(opt => !q || opt.label.toLowerCase().includes(q) || (opt.value && opt.value.toLowerCase().includes(q))) })).filter(sec => sec.items.length > 0);
  const getLabel = () => {
    if (multiple && Array.isArray(value) && value.length > 0) { const allItems = sections.flatMap(s => s.items); const labels = value.map(v => { const item = allItems.find(i => i.value === v); return item ? item.label : v; }); if (labels.length <= 2) return labels.join(", "); return labels.slice(0, 2).join(", ") + " +" + (labels.length - 2); }
    if (!multiple && value) { const allItems = sections.flatMap(s => s.items); const item = allItems.find(i => i.value === value); return item ? item.label : value; }
    return placeholder;
  };
  const handleSelect = (optValue) => {
    if (multiple) { const current = Array.isArray(value) ? value : []; const next = current.includes(optValue) ? current.filter(v => v !== optValue) : [...current, optValue]; onChange?.(next); }
    else { onChange?.(optValue); setOpen(false); setSearch(""); }
  };
  const toggle = () => {
    if (disabled) return;
    setOpen(o => { if (!o && triggerRef.current) { const rect = triggerRef.current.getBoundingClientRect(); const spaceBelow = window.innerHeight - rect.bottom; const panelHeight = maxHeight + (searchable ? 48 : 0) + 8; setFlipUp(spaceBelow < panelHeight && rect.top > panelHeight); } return !o; });
    setSearch("");
  };
  const isSelected = (optValue) => multiple ? (Array.isArray(value) && value.includes(optValue)) : value === optValue;
  const displayLabel = getLabel();
  const hasValue = multiple ? (Array.isArray(value) && value.length > 0) : !!value;
  const heights = { lg: 48, md: 44, sm: 36 };
  const h = heights[size] || 44;
  const padX = size === "sm" ? 8 : 12;
  const iconGap = size === "sm" ? 4 : size === "md" ? 8 : 12;
  const isError = stateProp === "error";
  const isDisabled = disabled || stateProp === "disabled";
  const borderColor = isError ? T.colorError : isDisabled ? T.colorBorderMedium : open ? T.colorBrandPrimary : T.colorBorderMedium;
  const borderWidth = open ? 2 : 1;
  const padCompensation = open ? -1 : 0;
  const bg = isError ? T.colorErrorBg : isDisabled ? T.colorSurfaceSecondary : "#FFFFFF";
  const textColor = isDisabled ? T.colorTextDisabled : hasValue ? T.colorTextPrimary : "#8C8C8B";
  return (
    <div ref={ref} style={{ position: "relative", width, fontFamily: T.fontFamily }}>
      {label && <div style={{ ...T.textSm, fontWeight: 500, color: T.colorTextPrimary, marginBottom: 8 }}>{label}</div>}
      {renderTrigger ? renderTrigger({ open, toggle, label: displayLabel }) : (
        <button ref={triggerRef} onClick={toggle} disabled={isDisabled} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
          padding: `0 ${padX + padCompensation}px`, height: h, width: "100%",
          border: `${borderWidth}px solid ${borderColor}`, borderRadius: 8, background: bg,
          cursor: isDisabled ? "default" : "pointer", ...T.textSm, fontWeight: 500, color: textColor,
          boxSizing: "border-box", transition: "border-color 0.15s, background 0.15s", fontFamily: T.fontFamily,
        }}
          onMouseEnter={e => { if (!isDisabled && !open && !isError) e.currentTarget.style.borderColor = "#A5A5A5"; }}
          onMouseLeave={e => { if (!isDisabled && !open && !isError) e.currentTarget.style.borderColor = T.colorBorderMedium; }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: iconGap, flex: 1, minWidth: 0 }}>
            {icon && <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>{icon}</div>}
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, textAlign: "left" }}>{displayLabel}</span>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, transition: "transform 0.15s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
            <path d="M3 5.5L7 9.5L11 5.5" stroke={isDisabled ? T.colorTextDisabled : hasValue ? T.colorTextPrimary : "#8C8C8B"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      {helpText && <div style={{ ...T.textSm, color: isError ? T.colorError : T.colorTextSecondary, marginTop: 8 }}>{helpText}</div>}
      {open && (
        <div style={{
          position: "absolute", ...(flipUp ? { bottom: "calc(100% + 4px)" } : { top: "calc(100% + 4px)" }),
          [align === "right" ? "right" : "left"]: 0, background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8,
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)", zIndex: 100, width: "100%", minWidth: 200,
          maxHeight: maxHeight + (searchable ? 48 : 0), display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
          {searchable && (
            <div style={{ padding: "8px 8px 4px", flexShrink: 0 }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder={searchPlaceholder} autoFocus style={{
                width: "100%", padding: "8px 10px", border: "1px solid #E9E9EB", borderRadius: 6,
                fontSize: 13, color: "#080908", outline: "none", boxSizing: "border-box", fontFamily: "'Inter', sans-serif",
              }} />
            </div>
          )}
          <div style={{ overflowY: "auto", maxHeight }}>
            {filteredSections.map((sec, si) => (
              <div key={si}>
                {sec.section && <div style={{ padding: "8px 14px 4px", fontSize: 11, fontWeight: 600, color: "#8C8C8B", textTransform: "uppercase", letterSpacing: "0.5px", borderTop: si > 0 ? "1px solid #F0F0F0" : "none", marginTop: si > 0 ? 4 : 0 }}>{sec.section}</div>}
                {sec.items.map(opt => {
                  const selected = isSelected(opt.value);
                  return (
                    <button key={opt.value} onClick={() => handleSelect(opt.value)} style={{
                      ...T.textSm, width: "100%", display: "flex", alignItems: "center", gap: 8,
                      textAlign: "left", padding: "10px 14px", color: selected ? "#080908" : "#4F4F4F",
                      fontWeight: selected ? 500 : 400, background: selected && !multiple ? "#F5F5F5" : "transparent",
                      border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif",
                    }}
                      onMouseEnter={e => { if (!(selected && !multiple)) e.currentTarget.style.background = "#FAFAFA"; }}
                      onMouseLeave={e => { if (!(selected && !multiple)) e.currentTarget.style.background = "transparent"; }}
                    >
                      {multiple && (
                        <div style={{ width: 16, height: 16, borderRadius: 4, flexShrink: 0, border: `1.5px solid ${selected ? "#05A105" : "#CFCFD1"}`, background: selected ? "#05A105" : "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                          {selected && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        </div>
                      )}
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
            {filteredSections.length === 0 && <div style={{ ...T.textSm, padding: "16px 14px", color: "#8C8C8B", textAlign: "center" }}>No results</div>}
          </div>
        </div>
      )}
    </div>
  );
}

// ── DS Input ─────────────────────────────────────────────────────────────────
function Input({
  value, onChange, placeholder = "", label, mandatory = false, size = "lg",
  state: stateProp = "enabled", helpText, leftSlot, leftSlotType, leftSlotIcon,
  currencySymbol = "$", rightSlot, style = {}, inputStyle = {}, width = "100%",
}) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isDisabled = stateProp === "disabled";
  const isReadOnly = stateProp === "readonly";
  const isError = stateProp === "error";
  const visualState = isError ? "error" : isDisabled ? "disabled" : isReadOnly ? "readonly" : focused ? "focused" : hovered ? "hover" : "enabled";
  const h = size === "sm" ? 40 : 48;
  const borderColors = { enabled: T.colorBorderMedium, hover: "#A5A5A5", focused: T.colorBrandPrimary, error: T.colorError, disabled: T.colorBorderMedium, readonly: T.colorBorderMedium };
  const bgColors = { enabled: "#FFFFFF", hover: "#FFFFFF", focused: "#FFFFFF", error: T.colorErrorBg, disabled: T.colorSurfaceSecondary, readonly: T.colorSurfaceSecondary };
  const textColor = isDisabled ? T.colorTextDisabled : T.colorTextPrimary;
  let leftSlotContent = leftSlot;
  if (!leftSlotContent && leftSlotType) {
    if (leftSlotType === "currency") {
      leftSlotContent = <div style={{ display: "flex", alignItems: "center", height: "100%", flexShrink: 0 }}><span style={{ ...T.textMd, fontWeight: 500, color: T.colorTextThird }}>{currencySymbol}</span></div>;
    } else if (leftSlotType === "icon" && leftSlotIcon) {
      leftSlotContent = <div style={{ display: "flex", alignItems: "center", height: "100%", flexShrink: 0 }}>{leftSlotIcon}</div>;
    }
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width, ...style }}>
      {label && <div style={{ display: "flex", gap: 4, ...T.textMd, fontWeight: 500, color: T.colorTextPrimary }}><span>{label}</span>{mandatory && <span style={{ color: "#DC5C40" }}>*</span>}</div>}
      <div onMouseEnter={() => { if (!isDisabled && !isReadOnly) setHovered(true); }} onMouseLeave={() => setHovered(false)} style={{
        display: "flex", alignItems: "center", gap: 8, height: h, padding: `0 ${focused ? 15 : 16}px`,
        background: bgColors[visualState], border: `${focused ? 2 : 1}px solid ${borderColors[visualState]}`,
        borderRadius: 8, boxSizing: "border-box", transition: "border-color 0.15s, background 0.15s",
      }}>
        {leftSlotContent && <div style={{ display: "flex", alignItems: "center", height: "100%", flexShrink: 0 }}>{leftSlotContent}</div>}
        <input value={value} onChange={e => onChange?.(e.target.value)} placeholder={placeholder} disabled={isDisabled} readOnly={isReadOnly}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", ...T.textMd, fontWeight: 400, color: textColor, fontFamily: T.fontFamily, height: "100%", padding: 0, ...inputStyle }} />
        {rightSlot && <div style={{ display: "flex", alignItems: "center", height: "100%", flexShrink: 0 }}>{rightSlot}</div>}
      </div>
      {helpText && <div style={{ ...T.textSm, color: isError ? T.colorError : T.colorTextSecondary }}>{helpText}</div>}
    </div>
  );
}

// ── DS RadioGroup & RadioOption ──────────────────────────────────────────────
function RadioOption({ optionValue, label, selected, disabled, readOnly, onChange }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const isInteractive = !disabled && !readOnly;
  const getRadioStyles = () => {
    const sz = 16;
    const base = { width: sz, height: sz, borderRadius: "50%", position: "relative", flexShrink: 0, transition: "all 0.15s ease", boxSizing: "border-box" };
    if (disabled) return { ...base, background: "#ECECEC", border: "1px solid #DBDBDB" };
    if (readOnly) return { ...base, background: "#ECECEC", border: "1px solid #DBDBDB" };
    if (selected) return { ...base, background: T.colorBrandPrimary, border: "none" };
    if (focused) return { ...base, background: "#FFFFFF", border: "1px solid #ECECEC", boxShadow: "0 0 0 2px #DCF0D7" };
    if (hovered) return { ...base, background: "#FFFFFF", border: "1px solid " + T.colorBrandPrimary };
    return { ...base, background: "#FFFFFF", border: "1px solid #DBDBDB" };
  };
  const showDot = selected || readOnly;
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: isInteractive ? "pointer" : "default" }}
      onMouseEnter={() => { if (isInteractive && !selected) setHovered(true); }}
      onMouseLeave={() => { if (isInteractive) setHovered(false); }}>
      <input type="radio" value={optionValue} checked={selected} disabled={disabled || readOnly}
        onChange={() => { if (isInteractive && onChange) onChange(optionValue); }}
        onFocus={() => { if (isInteractive) setFocused(true); }} onBlur={() => setFocused(false)}
        style={{ position: "absolute", width: 1, height: 1, opacity: 0, margin: 0, padding: 0, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0 }} />
      <div style={getRadioStyles()}>
        {showDot && <div style={{ position: "absolute", top: "31.25%", left: "31.25%", width: "37.5%", height: "37.5%", borderRadius: "50%", background: "#FFFFFF" }} />}
      </div>
      <span style={{ ...T.textMd, color: disabled ? T.colorTextDisabled : T.colorTextPrimary, userSelect: "none" }}>{label}</span>
    </label>
  );
}

function RadioGroup({ value, onChange, options = [], name, disabled = false, readOnly = false, direction = "vertical", gap = 16, label, helpText, state = "enabled" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: T.fontFamily }}>
      {label && <span style={{ ...T.textMd, fontWeight: 500, color: T.colorTextPrimary }}>{label}</span>}
      <div style={{ display: "flex", flexDirection: direction === "horizontal" ? "row" : "column", gap }}>
        {options.map(opt => <RadioOption key={opt.value} optionValue={opt.value} label={opt.label} selected={value === opt.value} disabled={disabled || opt.disabled} readOnly={readOnly || opt.readOnly} onChange={onChange} />)}
      </div>
      {helpText && <span style={{ ...T.textSm, color: state === "error" ? T.colorError : T.colorTextSecondary, marginTop: 2 }}>{helpText}</span>}
    </div>
  );
}

// ── DS UploadBox ────────────────────────────────────────────────────────────
function UploadBox({ file, onFileChange, accept = ".xlsx,.csv", acceptLabel = "Supported file type: .xlsx, .csv" }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };
  const handleDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); setDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); if (e.currentTarget.contains(e.relatedTarget)) return; setDragging(false); };
  const handleDrop = (e) => { e.preventDefault(); e.stopPropagation(); setDragging(false); if (e.dataTransfer.files && e.dataTransfer.files.length > 0) { onFileChange?.(e.dataTransfer.files[0]); } };
  const handleInputChange = (e) => { if (e.target.files && e.target.files.length > 0) { onFileChange?.(e.target.files[0]); } };
  const handleRemove = () => { onFileChange?.(null); if (inputRef.current) inputRef.current.value = ""; };

  return (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: 8, border: `1px solid ${T.colorButtonSecondary}`, overflow: "hidden", fontFamily: T.fontFamily }}>
      {/* Header */}
      <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 16, borderBottom: `1px solid ${T.colorButtonSecondary}` }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
          <path d={_MM_PATHS.file06} stroke={T.colorTextSecondary} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ ...T.textSm, fontWeight: 500, color: T.colorTextPrimary }}>Upload file</span>
      </div>

      <input ref={inputRef} type="file" accept={accept} onChange={handleInputChange} style={{ display: "none" }} />

      {file ? (
        /* Uploaded file display */
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, background: T.colorSurfacePrimary }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
            <path d={_MM_PATHS.file06} stroke={T.colorBrandPrimary} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ ...T.textSm, fontWeight: 500, color: T.colorTextPrimary, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</span>
          <button onClick={handleRemove} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4 }}
            onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"} onMouseLeave={e => e.currentTarget.style.background = "none"}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke={T.colorTextSecondary} strokeWidth="1.25" strokeLinecap="round" /></svg>
          </button>
        </div>
      ) : (
        /* Drop zone */
        <div
          onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: "48px 16px", gap: 24, background: dragging ? T.colorBrandBg : T.colorSurfacePrimary,
            border: dragging ? `2px dashed ${T.colorBrandPrimary}` : "2px dashed transparent",
            transition: "background 0.15s, border-color 0.15s", cursor: "pointer",
          }}
          onClick={() => inputRef.current?.click()}
        >
          {/* File illustration */}
          <div style={{ position: "relative", width: 86, height: 56 }}>
            <svg width="33" height="40" viewBox="0 0 33 40" fill="none" style={{ position: "absolute", left: 0, top: 10, transform: "rotate(-15deg)" }}>
              <rect width="33" height="40" rx="3" fill="#F4F4F2"/>
              <path d="M22 6.5V0L33 8H26.5C25.4 8 24.8 8 24.3 7.8C23.9 7.6 23.5 7.3 23.3 6.9C23 6.5 23 5.9 23 5V0" fill="#D6D6D4"/>
              <rect x="7" y="14" width="12" height="1.5" rx="0.75" fill="#E5E5E3"/>
              <rect x="7" y="19" width="18" height="1.5" rx="0.75" fill="#E5E5E3"/>
              <rect x="7" y="24" width="15" height="1.5" rx="0.75" fill="#E5E5E3"/>
            </svg>
            <svg width="33" height="40" viewBox="0 0 33 40" fill="none" style={{ position: "absolute", right: 0, top: 10, transform: "rotate(15deg)" }}>
              <rect width="33" height="40" rx="3" fill="#F4F4F2"/>
              <path d="M22 6.5V0L33 8H26.5C25.4 8 24.8 8 24.3 7.8C23.9 7.6 23.5 7.3 23.3 6.9C23 6.5 23 5.9 23 5V0" fill="#D6D6D4"/>
              <rect x="7" y="14" width="12" height="1.5" rx="0.75" fill="#E5E5E3"/>
              <rect x="7" y="19" width="18" height="1.5" rx="0.75" fill="#E5E5E3"/>
              <rect x="7" y="24" width="15" height="1.5" rx="0.75" fill="#E5E5E3"/>
            </svg>
            <svg width="41" height="49" viewBox="0 0 41 49" fill="none" style={{ position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)", filter: "drop-shadow(0px 5px 4px rgba(0,0,0,0.11))" }}>
              <rect width="41" height="49" rx="3" fill="white"/>
              <path d="M27 7.5V0L41 9.5H33C31.6 9.5 30.9 9.5 30.3 9.3C29.8 9 29.4 8.6 29.1 8.1C28.8 7.5 28.8 6.8 28.8 5.5V0" fill="#E9E9EB"/>
              <path d="M20.5 28V20M20.5 20L17 23.5M20.5 20L24 23.5" stroke="#C8543A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Text */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", textAlign: "center" }}>
            <span style={{ ...T.textSm, fontWeight: 500, color: T.colorTextPrimary }}>
              Drag & drop your file here, or{" "}
              <span style={{ color: T.colorBrandPrimary }}>Choose a file</span>
              {" "}to upload it manually
            </span>
            <span style={{ ...T.textSm, fontWeight: 400, color: T.colorTextMuted }}>{acceptLabel}</span>
          </div>

          {/* Upload document button */}
          <PrimaryButton onClick={e => { e.stopPropagation(); inputRef.current?.click(); }} style={{ height: 40, padding: "8px 16px 8px 12px", fontSize: 14, gap: 8 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
              <path d={_MM_PATHS.plus} stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Upload document
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}

// ── DS Checkbox ──────────────────────────────────────────────────────────────
function Checkbox({ checked = false, onChange, label, disabled = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: disabled ? "default" : "pointer" }}
      onMouseEnter={() => !disabled && setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div onClick={e => { e.preventDefault(); if (!disabled) onChange?.(!checked); }}
        style={{
          width: 16, height: 16, borderRadius: 4, flexShrink: 0, marginTop: 5,
          background: checked ? T.colorBrandPrimary : "#FFFFFF",
          border: checked ? "none" : `1px solid ${hovered ? T.colorBrandPrimary : "#DBDBDB"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.15s", cursor: disabled ? "default" : "pointer", boxSizing: "border-box",
        }}>
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      {label && <span style={{ ...T.textMd, color: disabled ? T.colorTextDisabled : T.colorTextPrimary }}>{label}</span>}
    </label>
  );
}

// ── DS Tooltip ──────────────────────────────────────────────────────────────
function Tooltip({ text, children, placement = "top" }) {
  var [visible, setVisible] = useState(false);
  var [pos, setPos] = useState({ x: 0, y: 0 });
  var ref = useRef(null);
  return (
    <span ref={ref} style={{ display: "inline-flex", alignItems: "center" }}
      onMouseEnter={function() {
        if (ref.current) {
          var rect = ref.current.getBoundingClientRect();
          setPos({ x: rect.left + rect.width / 2, y: placement === "bottom" ? rect.bottom : rect.top });
        }
        setVisible(true);
      }}
      onMouseLeave={function() { setVisible(false); }}>
      {children}
      {visible && (
        <div style={{
          position: "fixed",
          top: placement === "bottom" ? pos.y + 8 : pos.y - 8,
          left: pos.x,
          transform: placement === "bottom" ? "translate(-50%, 0)" : "translate(-50%, -100%)",
          background: T.colorTextBody, color: T.colorTextLight,
          fontSize: 14, fontWeight: 400, lineHeight: "20px",
          padding: "6px 8px", borderRadius: 8,
          whiteSpace: "nowrap", zIndex: 9999,
          pointerEvents: "none", fontFamily: "'Inter', sans-serif",
        }}>
          {text}
        </div>
      )}
    </span>
  );
}

// ── useTypewriter (shared across flows) ─────────────────────────────────────
function useTypewriter(text, speed, instant) {
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

// ── StreamingMessage (shared across flows) ──────────────────────────────────
function StreamingMessage(_smRef) {
  var segments = _smRef.segments;
  var speed = _smRef.speed !== undefined ? _smRef.speed : 80;
  var instant = _smRef.instant !== undefined ? _smRef.instant : false;
  var fullText = segments.map(function(s) { return s.text; }).join("");
  var tw = useTypewriter(fullText, speed, instant);
  var remaining = tw.chars;
  var rendered = [];
  for (var i = 0; i < segments.length; i++) {
    var seg = segments[i];
    if (!remaining) break;
    var slice = remaining.slice(0, seg.text.length);
    remaining = remaining.slice(seg.text.length);
    if (seg.bold) { rendered.push(<strong key={i}>{slice}</strong>); }
    else { rendered.push(<span key={i}>{slice}</span>); }
  }
  return <span>{rendered}</span>;
}

// ── CanvasLoader (shared across flows) ──────────────────────────────────────
function CanvasLoader() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 14, fontFamily: "'Inter', sans-serif" }}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ animation: "spin 0.75s linear infinite", flexShrink: 0 }}>
        <path d="M18 3A15 15 0 1 1 3 18" stroke="#05A105" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
      <p style={{ fontSize: 14, color: "#8C8C8B", margin: 0 }}>Preparing canvas...</p>
    </div>
  );
}

// ── ChevronUpIcon (shared across flows) ─────────────────────────────────────
function ChevronUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 12.5L10 7.5L5 12.5" stroke="#2A2A2A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── RecommendationCard (DS canonical — extended for all flows) ───────────────
function RecommendationCard(_rcRef) {
  var title = _rcRef.title !== undefined ? _rcRef.title : "Missing entry";
  var description = _rcRef.description !== undefined ? _rcRef.description : "";
  var statusLabel = _rcRef.statusLabel !== undefined ? _rcRef.statusLabel : "Unresolved";
  var statusStyle = _rcRef.statusStyle !== undefined ? _rcRef.statusStyle : { background: "#FDF8EE", border: "none", color: "#D5A750" };
  var collapsed = _rcRef.collapsed !== undefined ? _rcRef.collapsed : false;
  var isIgnored = _rcRef.isIgnored !== undefined ? _rcRef.isIgnored : false;
  var tableRow = _rcRef.tableRow || {};
  var tableRows = _rcRef.tableRows || null;
  var primaryLabel = _rcRef.primaryLabel !== undefined ? _rcRef.primaryLabel : "Create spend money";
  var secondaryLabel = _rcRef.secondaryLabel !== undefined ? _rcRef.secondaryLabel : "Upload document";
  var external = _rcRef.external !== undefined ? _rcRef.external : false;
  var fileAction = _rcRef.fileAction || null;
  var score = _rcRef.score || null;
  var verticalTable = _rcRef.verticalTable !== undefined ? _rcRef.verticalTable : false;
  var hideMore = _rcRef.hideMore !== undefined ? _rcRef.hideMore : false;
  var accountReconciled = _rcRef.accountReconciled !== undefined ? _rcRef.accountReconciled : false;
  var tableColumns = _rcRef.tableColumns || null;
  var onPrimaryAction = _rcRef.onPrimaryAction;
  var onFileAction = _rcRef.onFileAction;
  var onSecondaryAction = _rcRef.onSecondaryAction;
  var onIgnore = _rcRef.onIgnore;
  var onMore = _rcRef.onMore;

  var _rcExp = useState(!collapsed && !isIgnored && !accountReconciled);
  var expanded = _rcExp[0]; var setExpanded = _rcExp[1];
  var _rcMenu = useState(false);
  var collectMenuOpen = _rcMenu[0]; var setCollectMenuOpen = _rcMenu[1];
  var _rcPos = useState({ top: 0, left: 0 });
  var collectMenuPos = _rcPos[0]; var setCollectMenuPos = _rcPos[1];
  var collectBtnRef = useRef(null);
  useEffect(function() { setExpanded(!collapsed && !isIgnored && !accountReconciled); }, [collapsed, isIgnored, accountReconciled]);
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
  var RcExternalIcon = function() {
    return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M17.5 7.5L17.5 2.5M17.5 2.5H12.5M17.5 2.5L10.8333 9.16667M8.33333 4.16667H6.5C5.09987 4.16667 4.3998 4.16667 3.86502 4.43915C3.39462 4.67883 3.01217 5.06129 2.77248 5.53169C2.5 6.06647 2.5 6.76654 2.5 8.16667V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5H11.8333C13.2335 17.5 13.9335 17.5 14.4683 17.2275C14.9387 16.9878 15.3212 16.6054 15.5608 16.135C15.8333 15.6002 15.8333 14.9001 15.8333 13.5V11.6667" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    );
  };
  var RcMoreIcon = function() {
    return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="2.5" r="1.2" fill="#545453"/>
      <circle cx="7" cy="7" r="1.2" fill="#545453"/>
      <circle cx="7" cy="11.5" r="1.2" fill="#545453"/>
    </svg>
    );
  };
  var RcSuccessIcon = function() {
    return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" fill="none" stroke="#05A105" strokeWidth="1.5"/>
      <path d="M6.66667 10L8.88889 12.2222L13.3333 7.77778" stroke="#05A105" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    );
  };
  var RcIgnoredIcon = function() {
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
        {((tableRow && Object.keys(tableRow).length > 0) || (tableRows && tableRows.length > 0)) && (
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
              columns={tableColumns || [
                { key: "description", label: "Description", width: "1.6fr" },
                { key: "account",     label: "Account",     width: "1.2fr" },
                { key: "amount",      label: "Amount",      width: "0.8fr" },
                { key: "date",        label: "Date",        width: "0.8fr" },
              ]}
              rows={tableRows && tableRows.length ? tableRows : [tableRow]}
            />
          )}
        </div>
        )}
        {(!isResolved || isIgnored) && !accountReconciled && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <PrimaryButton style={{ height: 40, padding: "0 14px", fontSize: 14, borderRadius: 8 }} icon={external ? <RcExternalIcon /> : undefined} onClick={onPrimaryAction}>
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
              ><RcMoreIcon /></button>
            )}
            {!isIgnored && onIgnore && <><div style={{ flex: 1 }} />
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

// ── SuggestionsBox (shared across flows) ────────────────────────────────────
function SuggestionsBox(_sbRef) {
  var isCleanReconcile = _sbRef.isCleanReconcile;
  var allJustResolved = _sbRef.allJustResolved !== undefined ? _sbRef.allJustResolved : false;
  var accountStatus = _sbRef.accountStatus;
  var resolvedCount = _sbRef.resolvedCount;
  var totalSuggestions = _sbRef.totalSuggestions;
  var matchedTotal = _sbRef.matchedTotal;
  var navCategories = _sbRef.navCategories;
  var resolvedCards = _sbRef.resolvedCards;
  var ignoredCards = _sbRef.ignoredCards || new Set();
  var completedTitle = _sbRef.completedTitle !== undefined ? _sbRef.completedTitle : "Ready to reconcile in Xero";
  var completedDescription = _sbRef.completedDescription !== undefined ? _sbRef.completedDescription : "All suggestions resolved. Go to Xero to finalise and post the reconciliation.";
  var completedColor = _sbRef.completedColor !== undefined ? _sbRef.completedColor : "#4C71DF";
  var color = accountStatus === "completed" ? "#4C71DF" : "#05A105";
  var bg    = accountStatus === "completed" ? "#EEF2FF" : "#EAF2E2";
  var sbLabel = accountStatus === "completed" ? "Completed" : "Reconciled";
  var msg   = accountStatus === "completed" ? "Ready to reconcile in Xero" : "Fully reconciled in Xero";
  var pct   = totalSuggestions > 0 ? Math.min(100, Math.round((resolvedCount / totalSuggestions) * 100)) : 0;
  var _sbCats = useState({});
  var collapsedCats = _sbCats[0]; var setCollapsedCats = _sbCats[1];
  var _sbCol = useState(false);
  var boxCollapsed = _sbCol[0]; var setBoxCollapsed = _sbCol[1];
  var toggleCat = function(key) { setCollapsedCats(function(prev) { var n = {}; for (var k in prev) n[k] = prev[k]; n[key] = !prev[key]; return n; }); };
  var scrollTo = function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 8, overflow: "hidden", fontFamily: "'Inter', sans-serif", border: "1px solid #ECECEC", flex: boxCollapsed ? "0 0 auto" : 1, display: "flex", flexDirection: "column" }}>
      <div onClick={function() { setBoxCollapsed(function(c) { return !c; }); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", cursor: "pointer" }}>
        <span style={{ fontSize: 16, fontWeight: 500, color: "#080908" }}>Suggestions</span>
        <div style={{ flexShrink: 0, transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)", transform: boxCollapsed ? "rotate(0deg)" : "rotate(180deg)" }}>
          <Chevron color="#000000" size={16} />
        </div>
      </div>
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
                <span style={{ fontSize: 14, color: "#8C8C8B" }}>{" "}/ {totalSuggestions} resolved</span>
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
            <span style={{ fontSize: 14, fontWeight: 600, color: color }}>{sbLabel}</span>
            <span style={{ fontSize: 14, color: "#8C8C8B", lineHeight: "20px" }}>{msg}</span>
            {matchedTotal && <span style={{ fontSize: 14, fontWeight: 500, color: "#4F4F4F", marginTop: 2 }}>{matchedTotal} transactions matched</span>}
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 20, fontWeight: 600, color: "#080908" }}>{resolvedCount}</span>
              <span style={{ fontSize: 14, color: "#8C8C8B" }}>{" "}/ {totalSuggestions} resolved</span>
            </div>
            <div style={{ height: 4, background: "#E9E9EB", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: pct + "%", background: "#05A105", borderRadius: 2, transition: "width 0.4s ease" }} />
            </div>
          </>
        )}
      </div>
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

// ── WorkflowCard (shared across flows) ──────────────────────────────────────
function WorkflowCard(_wfRef) {
  var label = _wfRef && _wfRef.label != null ? _wfRef.label : "Bank reconciliation";
  return (
    <div style={{
      border: "1px solid #E9E9EB",
      borderRadius: 8,
      background: "white",
      padding: "16px",
      display: "flex",
      alignItems: "center",
      gap: 16,
      marginBottom: 56,
      width: "100%",
      boxSizing: "border-box",
      boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
    }}>
      <div style={{ width: 56, height: 56, borderRadius: 8, background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="24" height="24" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="9.25" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.52 8.49C9.52 8.01 9.52 7.78 9.62 7.64C9.7 7.53 9.83 7.46 9.98 7.45C10.14 7.43 10.34 7.56 10.74 7.82L14.43 10.33C14.78 10.55 14.95 10.67 15.01 10.81C15.06 10.93 15.06 11.07 15.01 11.19C14.95 11.33 14.78 11.45 14.43 11.67L10.74 14.18C10.34 14.44 10.14 14.57 9.98 14.55C9.83 14.54 9.7 14.47 9.62 14.36C9.52 14.22 9.52 13.99 9.52 13.51V8.49Z" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div>
        <div style={{ fontSize: 16, color: "#000000", fontWeight: 500, marginBottom: 4 }}>Workflow</div>
        <div style={{ fontSize: 14, color: "#2A2A2A", fontWeight: 400 }}>{label}</div>
      </div>
    </div>
  );
}

// ── ALL_DOCUMENTS (shared data for AllDocumentsSidebar) ─────────────────────
var ALL_DOCUMENTS = [
  { name: "Lloyds_Business_April_2026.pdf",        type: "pdf", date: "15 Apr, 2026" },
  { name: "Lloyds_Operations_GBP_April_2026.csv",  type: "csv", date: "15 Apr, 2026" },
  { name: "HSBC_Business_April_2026.pdf",           type: "pdf", date: "14 Apr, 2026" },
  { name: "Barclays_Operations_April_2026.csv",     type: "csv", date: "14 Apr, 2026" },
  { name: "AmEx_OP_GBP_April26.pdf",               type: "pdf", date: "12 Apr, 2026" },
  { name: "Mastercard_Business_April26.csv",        type: "csv", date: "12 Apr, 2026" },
];

// ── DocFileIcon ─────────────────────────────────────────────────────────────
function DocFileIcon({ type }) {
  if (type === "csv") return <CsvIcon width={20} height={24} />;
  return <PdfIcon width={20} height={24} />;
}

// ── Audit Trail ─────────────────────────────────────────────────────────────
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
      <div onClick={handleClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", zIndex: 200, opacity: visible && !closing ? 1 : 0, transition: "opacity 0.32s ease" }} />
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 600,
        background: "#FFFFFF", zIndex: 201,
        boxShadow: "-4px 0 24px rgba(0,0,0,0.10)",
        transform: visible && !closing ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid #ECECEC", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: 20, fontWeight: 500, color: "#080908", margin: 0, letterSpacing: "-0.3px" }}>Audit log</h2>
          <button onClick={handleClose} style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none"><rect width="30" height="30" rx="15" fill="#F5F5F5"/><path d="M20 10L10 20M10 10L20 20" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 24px" }}>
          {AUDIT_DATA.map(function(_group) {
            var date = _group.date; var entries = _group.entries;
            return (
            <div key={date} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F5F5F5", borderRadius: 8, padding: "8px 12px", marginBottom: 12 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 2v4M8 2v4M3 10h18" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#545453" }}>{date}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {entries.map(function(entry, i) {
                  return <AuditEntry key={i} time={entry.time} color={entry.color} action={entry.action} actor={entry.actor} details={entry.details} />;
                })}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </>
  );
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

// ── UploadCard ──────────────────────────────────────────────────────────────
function UploadCard({ onFileSelected, onFilesSelected, onOpenAllDocs, onNoDocument, title, bare, noDash, suggestedFiles, preselectedFiles }) {
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
    <>
    <div style={{
      background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8,
      padding: "24px", width: "100%", boxSizing: "border-box",
      boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
    }}>
      <p style={{ fontSize: 16, fontWeight: 500, color: "#080908", marginBottom: 20 }}>{title}</p>
      {inner}
    </div>
    {onNoDocument && (
      <div onClick={onNoDocument} style={{
        background: T.colorSurfacePrimary, border: "1px solid " + T.colorBorderDark, borderRadius: 16,
        padding: 24, width: "100%", boxSizing: "border-box",
        boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)", marginTop: 8,
        cursor: "pointer", fontSize: 14, fontWeight: 500, color: T.colorTextPrimary,
      }}
      onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceSecondary; e.currentTarget.style.borderColor = T.colorBorderHover; }}
      onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; e.currentTarget.style.borderColor = T.colorBorderDark; }}
      >I don't have a file</div>
    )}
    </>
  );
}


// ── ReconciliationCard ──────────────────────────────────────────────────────
function ReconciliationCard({ status, date, suggestionCount, onClick }) {
  const RECON_STATUS_CONFIG = {
    reconciled:         { label: "Reconciled",  color: T.colorBrandPrimary },
    reconciled_warning: { label: "Reconciled",  color: T.colorError },
    suggestions:        { label: "suggestions", color: T.colorError },
    completed:          { label: "Completed",   color: T.colorInfo },
    reviewing:          { label: "In review",   color: T.colorWarning },
  };
  if (!status) {
    return (
      <button
        onClick={e => { e.stopPropagation(); onClick?.(); }}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "6px 12px", height: 44, boxSizing: "border-box",
          border: `1px solid ${T.colorBorderDark}`, borderRadius: 6,
          background: T.colorSurfacePrimary, cursor: "pointer",
          ...T.textSm, fontWeight: 500, color: T.colorTextPrimary, whiteSpace: "nowrap",
          fontFamily: T.fontFamily,
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = T.colorBorderHover; e.currentTarget.style.background = T.colorSurfaceSecondary; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = T.colorBorderDark; e.currentTarget.style.background = T.colorSurfacePrimary; }}
      >
        Run reconciliation
        <PlayCircleIcon color={T.colorTextPrimary} />
      </button>
    );
  }
  const config = RECON_STATUS_CONFIG[status] || RECON_STATUS_CONFIG.reconciled;
  const displayLabel = status === "suggestions" && suggestionCount != null
    ? `${suggestionCount} ${config.label}`
    : config.label;
  const isWarning = status === "reconciled_warning";
  return (
    <div
      onClick={e => { e.stopPropagation(); onClick?.(); }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = T.colorBorderHover; e.currentTarget.style.background = T.colorSurfaceSecondary; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = T.colorBorderMedium; e.currentTarget.style.background = T.colorSurfacePrimary; }}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: 184, minHeight: 48, padding: "8px 12px",
        background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderMedium}`, borderRadius: 8,
        boxSizing: "border-box", flexShrink: 0,
        cursor: "pointer", transition: "border-color 0.15s, background 0.15s",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ ...T.textSm, fontWeight: 500, color: config.color, lineHeight: "22px" }}>{displayLabel}</span>
        {isWarning
          ? <span style={{ ...T.textXs, color: T.colorError, lineHeight: "14px" }}>Review changes</span>
          : date && <span style={{ fontSize: 11, color: T.colorTextSecondary, lineHeight: "14px" }}>{date}</span>
        }
      </div>
      <PlayCircleIcon color={T.colorTextPrimary} size={20} />
    </div>
  );
}

// ── AdjWorkflowCard (DS WorkflowCard) ───────────────────────────────────────
function AdjWorkflowCard({
  label, subtitle, subtitleColor, color, icon, hideIcon = false,
  width, onClick, style = {},
}) {
  var isIdle = color == null;
  var _subtitleColor = subtitleColor || T.colorTextSecondary;
  var _width = width || "auto";
  var resolvedIcon = icon;
  if (resolvedIcon === undefined && !hideIcon) {
    resolvedIcon = React.createElement(PlayCircleIcon, { color: T.colorTextPrimary, size: 20 });
  }
  function handleClick(e) { e.stopPropagation(); if (onClick) onClick(); }
  if (isIdle) {
    var idleStyle = {
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "6px 12px", height: 44, boxSizing: "border-box",
      border: "1px solid " + T.colorBorderDark, borderRadius: T.radius6,
      background: T.colorSurfacePrimary, cursor: "pointer",
      fontSize: 14, fontWeight: 500, fontFamily: T.fontFamily,
      color: T.colorTextPrimary, lineHeight: "22px", letterSpacing: "0.15px",
      whiteSpace: "nowrap", width: _width, transition: "border-color 0.15s, background 0.15s",
    };
    return React.createElement("button", {
      onClick: handleClick,
      onMouseEnter: function(e) { e.currentTarget.style.borderColor = T.colorBorderHover; e.currentTarget.style.background = T.colorSurfaceSecondary; },
      onMouseLeave: function(e) { e.currentTarget.style.borderColor = T.colorBorderDark; e.currentTarget.style.background = T.colorSurfacePrimary; },
      style: Object.assign({}, idleStyle, style),
    }, label, !hideIcon && resolvedIcon);
  }
  var activeStyle = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: T.space3,
    width: _width, minHeight: 48, padding: "8px 12px",
    background: T.colorSurfacePrimary, border: "1px solid " + T.colorBorderMedium,
    borderRadius: T.radius8, boxSizing: "border-box", flexShrink: 0,
    cursor: onClick ? "pointer" : "default", transition: "border-color 0.15s, background 0.15s",
  };
  var labelStyle = { fontSize: 14, fontWeight: 500, fontFamily: T.fontFamily, color: color, lineHeight: "22px", letterSpacing: "0.15px" };
  var subtitleStyle = { fontSize: 11, fontFamily: T.fontFamily, color: _subtitleColor, lineHeight: "14px" };
  return React.createElement("div", {
    onClick: onClick ? handleClick : undefined,
    onMouseEnter: onClick ? function(e) { e.currentTarget.style.borderColor = T.colorBorderHover; e.currentTarget.style.background = T.colorSurfaceSecondary; } : undefined,
    onMouseLeave: onClick ? function(e) { e.currentTarget.style.borderColor = T.colorBorderMedium; e.currentTarget.style.background = T.colorSurfacePrimary; } : undefined,
    style: Object.assign({}, activeStyle, style),
  },
    React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 2 } },
      React.createElement("span", { style: labelStyle }, label),
      subtitle ? React.createElement("span", { style: subtitleStyle }, subtitle) : null
    ),
    !hideIcon && resolvedIcon
  );
}

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
  renderRowAction,
}) {
  const [hovered, setHovered] = useState(null);
  const rowRefs = useRef([]);
  const [refsReady, setRefsReady] = useState(false);
  useEffect(() => { if (renderRowAction && !refsReady) setRefsReady(true); }, [renderRowAction, refsReady]);
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
    <div style={renderRowAction ? { position: "relative" } : undefined}>
    <div style={{ background: T.colorSurfacePrimary, border: `1px solid ${T.colorBorderDark}`, borderRadius: 8, overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
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
              ref={renderRowAction ? (el => { rowRefs.current[ri] = el; }) : undefined}
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
        <div style={{ display: "grid", gridTemplateColumns: gridTemplate, borderTop: `1px solid ${T.colorBorderDark}`, background: T.colorSurfacePrimary }}>
          {showExpandColumn && <div style={{ borderRight: `1px solid ${T.colorBorderDark}` }} />}
          {columns.map((col, ci) => (
            <div key={col.key} style={{
              display: "flex", alignItems: "center",
              justifyContent: col.align === "right" ? "flex-end" : "flex-start",
              fontSize: 14, fontWeight: 600, color: T.colorTextPrimary,
              padding: "14px 16px",
              borderRight: ci < columns.length - 1 ? `1px solid ${T.colorBorderDark}` : "none",
            }}>
              {col.render ? col.render(footerRow[col.key], footerRow, -1) : footerRow[col.key]}
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
    {/* Row action overlays — outside overflow:hidden, positioned via row refs */}
    {renderRowAction && refsReady && rows.map((row, ri) => {
      const actionContent = renderRowAction(row, ri);
      if (!actionContent) return null;
      const alwaysShow = actionContent.props && actionContent.props.alwaysShow;
      const rowEl = rowRefs.current[ri];
      if (!rowEl) return null;
      return (
        <div key={"ra-" + ri}
          onMouseEnter={() => setHovered(ri)}
          onMouseLeave={() => setHovered(null)}
          style={{
            position: "absolute",
            top: rowEl.offsetTop,
            right: 0,
            height: rowEl.offsetHeight,
            transform: "translateX(50%)",
            display: "flex", alignItems: "center",
            paddingLeft: 8,
            opacity: alwaysShow ? 1 : (hovered === ri ? 1 : 0),
            transition: "opacity 0.15s",
            pointerEvents: alwaysShow ? "auto" : (hovered === ri ? "auto" : "none"),
            zIndex: 2,
          }}>
          {actionContent}
        </div>
      );
    })}
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

// ── Banner (DS: info / warning / success / error notification banner) ────────
function Banner({ variant, children, onDismiss, action, icon, style }) {
  var _variant = variant || "info";
  var _style = style || {};
  var _dismissed = useState(false);
  var dismissed = _dismissed[0];
  var setDismissed = _dismissed[1];
  if (dismissed) return null;

  var VARIANTS = {
    info:    { bg: T.colorInfoBg, border: T.colorInfoBorder, color: "#6389CF", iconColor: "#6389CF" },
    warning: { bg: T.colorWarningBg, border: T.colorWarningBorder, color: T.colorWarning, iconColor: T.colorWarning },
    success: { bg: T.colorSuccessBg, border: T.colorSuccessBorder, color: "#6BAC5B", iconColor: T.colorBrandPrimary },
    error:   { bg: T.colorErrorBg, border: T.colorErrorBorder, color: T.colorError, iconColor: T.colorError },
  };
  var v = VARIANTS[_variant] || VARIANTS.info;

  var defaultIcons = {
    info: React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", style: { flexShrink: 0, marginTop: 2 } },
      React.createElement("circle", { cx: 8, cy: 8, r: 7, stroke: v.iconColor, strokeWidth: 1.5, fill: "none" }),
      React.createElement("path", { d: "M8 7v4M8 5.5v0", stroke: v.iconColor, strokeWidth: 1.5, strokeLinecap: "round" })
    ),
    warning: React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", style: { flexShrink: 0, marginTop: 2 } },
      React.createElement("path", { d: "M8 1.333L1.333 13.333h13.334L8 1.333z", stroke: v.iconColor, strokeWidth: 1.25, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }),
      React.createElement("path", { d: "M8 6v3.333M8 11.333h.007", stroke: v.iconColor, strokeWidth: 1.25, strokeLinecap: "round", strokeLinejoin: "round" })
    ),
    success: React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", style: { flexShrink: 0, marginTop: 2 } },
      React.createElement("circle", { cx: 8, cy: 8, r: 7, stroke: v.iconColor, strokeWidth: 1.5, fill: "none" }),
      React.createElement("path", { d: "M5 8l2 2 4-4", stroke: v.iconColor, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" })
    ),
    error: React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", style: { flexShrink: 0, marginTop: 2 } },
      React.createElement("circle", { cx: 8, cy: 8, r: 7, stroke: v.iconColor, strokeWidth: 1.5, fill: "none" }),
      React.createElement("path", { d: "M10 6L6 10M6 6l4 4", stroke: v.iconColor, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" })
    ),
  };

  return React.createElement("div", { style: Object.assign({
    background: v.bg, border: "1px solid " + v.border, borderRadius: 8,
    padding: "12px 16px", display: "flex", alignItems: "flex-start", gap: 10,
    fontFamily: "'Inter', sans-serif",
  }, _style) },
    icon || defaultIcons[_variant],
    React.createElement("span", { style: { fontSize: 13, color: "#4F4F4F", lineHeight: "20px", flex: 1 } }, children),
    action && React.createElement("button", {
      onClick: action.onClick,
      style: { flexShrink: 0, padding: "4px 10px", borderRadius: 6, border: "1px solid " + v.border, background: "transparent", cursor: "pointer", fontSize: 12, fontWeight: 500, color: v.color, fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" },
    }, action.label),
    onDismiss && React.createElement("button", {
      onClick: function() { setDismissed(true); if (onDismiss) onDismiss(); },
      style: { flexShrink: 0, border: "none", background: "none", cursor: "pointer", padding: 2, display: "flex", alignItems: "center", justifyContent: "center" },
    }, React.createElement("svg", { width: 14, height: 14, viewBox: "0 0 14 14", fill: "none" },
      React.createElement("path", { d: "M10.5 3.5L3.5 10.5M3.5 3.5l7 7", stroke: v.color, strokeWidth: 1.25, strokeLinecap: "round", strokeLinejoin: "round" })
    ))
  );
}

// ── Balance Sheet (migrated from BS lite source — original logic preserved) ──
(function() {

// Bank account codes — accounts that are reconciled via bank reconciliation
var BANK_ACCOUNT_CODES_SET = new Set(["1210", "1211", "1212", "1213", "1250", "1251"]);

// Comment icon for overview table row hover button
function BSCommentIcon({ size = 16, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M14 7.667A5.33 5.33 0 0 1 13.4 10.2a5.333 5.333 0 0 1-5.067 3.133A5.33 5.33 0 0 1 5.8 12.733L2 14l1.267-3.8A5.33 5.33 0 0 1 2.667 7.667 5.333 5.333 0 0 1 8.333 2h.334A5.348 5.348 0 0 1 14 7.333v.334Z" stroke={color || T.colorTextSecondary} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Hover comment button for overview table rows — rendered via renderRowAction
function BSOverviewRowCommentBtn({ onClick, hasComments }) {
  return (
    <button
      alwaysShow={hasComments || false}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 32, height: 32, padding: 0,
        background: T.colorSurfacePrimary,
        border: "1px solid " + T.colorBorderDark,
        borderRadius: 6, cursor: "pointer",
        transition: "border-color 0.15s, background 0.15s",
      }}
      onMouseEnter={function(e) { e.currentTarget.style.borderColor = T.colorBorderHover; e.currentTarget.style.background = T.colorSurfaceSecondary; }}
      onMouseLeave={function(e) { e.currentTarget.style.borderColor = T.colorBorderDark; e.currentTarget.style.background = T.colorSurfacePrimary; }}
      onClick={function(e) { e.stopPropagation(); if (onClick) onClick(e); }}
    >
      <BSCommentIcon size={16} color={hasComments ? "#6BAC5B" : undefined} />
    </button>
  );
}

// Comment popover for overview table rows
function BSOverviewCommentPopover({ comments, onAdd, onClose, anchorRef }) {
  const [text, setText] = useState("");
  const popoverRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    function handleClick(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <div ref={popoverRef} style={{
      position: "absolute", top: "100%", right: 0, marginTop: 8,
      width: 320, background: T.colorSurfacePrimary,
      border: "1px solid " + T.colorBorderDark, borderRadius: 8,
      boxShadow: "0 4px 16px rgba(0,0,0,0.10)", zIndex: 100,
      padding: 16, display: "flex", flexDirection: "column", gap: 12,
    }} onClick={function(e) { e.stopPropagation(); }}>
      {/* Existing comments */}
      {comments.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 200, overflowY: "auto" }}>
          {comments.map((c, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: T.colorTextPrimary }}>{c.user}</span>
                <span style={{ fontSize: 12, color: T.colorTextSecondary }}>{c.timestamp}</span>
              </div>
              <span style={{ fontSize: 13, color: T.colorTextPrimary, lineHeight: "18px" }}>{c.text}</span>
            </div>
          ))}
        </div>
      )}
      {comments.length > 0 && <div style={{ height: 1, background: T.colorBorderDark }} />}
      {/* Textarea */}
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type your message here"
        rows={3}
        style={{
          width: "100%", resize: "none", border: "1px solid " + T.colorBorderDark,
          borderRadius: 6, padding: "8px 12px", fontSize: 13, fontFamily: "'Inter', sans-serif",
          color: T.colorTextPrimary, background: T.colorSurfacePrimary,
          outline: "none",
        }}
        onFocus={function(e) { e.target.style.borderColor = T.colorBorderHover; }}
        onBlur={function(e) { e.target.style.borderColor = T.colorBorderDark; }}
      />
      {/* Buttons */}
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button onClick={onClose} style={{
          padding: "6px 14px", borderRadius: 6, border: "1px solid " + T.colorBorderDark,
          background: T.colorSurfacePrimary, fontSize: 13, fontWeight: 500,
          color: T.colorTextPrimary, cursor: "pointer",
        }}
        onMouseEnter={function(e) { e.currentTarget.style.background = T.colorSurfaceSecondary; }}
        onMouseLeave={function(e) { e.currentTarget.style.background = T.colorSurfacePrimary; }}
        >Close</button>
        <button onClick={handleSubmit} style={{
          padding: "6px 14px", borderRadius: 6, border: "none",
          background: T.colorBrandPrimary || "#6389CF", fontSize: 13, fontWeight: 500,
          color: "#fff", cursor: "pointer", opacity: text.trim() ? 1 : 0.5,
        }}>Add comment</button>
      </div>
    </div>
  );
}

// Hook: manage overview row comments (local state per panel)
function useOverviewComments() {
  const [comments, setComments] = useState({});
  const [openRow, setOpenRow] = useState(null);

  const addComment = (rowKey, text) => {
    var now = new Date();
    var day = now.getDate();
    var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var hours = now.getHours().toString().padStart(2, "0");
    var mins = now.getMinutes().toString().padStart(2, "0");
    var timestamp = day + " " + monthNames[now.getMonth()] + " at " + hours + ":" + mins;
    var entry = { user: "Laura Bennett", timestamp: timestamp, text: text };
    setComments(prev => ({
      ...prev,
      [rowKey]: [...(prev[rowKey] || []), entry],
    }));
  };

  const getComments = (rowKey) => comments[rowKey] || [];
  const hasComments = (rowKey) => (comments[rowKey] || []).length > 0;
  const toggleRow = (rowKey) => setOpenRow(prev => prev === rowKey ? null : rowKey);
  const closeRow = () => setOpenRow(null);

  return { comments, openRow, addComment, getComments, hasComments, toggleRow, closeRow };
}

// Render helper: builds renderRowAction for overview tables with comment buttons
function overviewRowAction(oc, getRowKey) {
  return function(row, ri) {
    var rowKey = getRowKey(row, ri);
    var rowComments = oc.getComments(rowKey);
    var isOpen = oc.openRow === rowKey;
    var has = rowComments.length > 0;
    return (
      <div alwaysShow={has || isOpen} style={{ position: "relative" }}>
        <BSOverviewRowCommentBtn
          hasComments={has}
          onClick={function() { oc.toggleRow(rowKey); }}
        />
        {isOpen && (
          <BSOverviewCommentPopover
            comments={rowComments}
            onAdd={function(text) { oc.addComment(rowKey, text); }}
            onClose={function() { oc.closeRow(); }}
          />
        )}
      </div>
    );
  };
}

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
  const oc = useOverviewComments();

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
          renderRowAction={overviewRowAction(oc, function(row) { return "payroll_" + (row.account || "").split(" ")[0]; })}
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
  const oc = useOverviewComments();

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
            renderRowAction={function(row, ri) { if (row.isSummary) return null; return overviewRowAction(oc, function(r) { return "dla_" + (r.account || "").split(" ")[0]; })(row, ri); }}
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
              renderRowAction={overviewRowAction(oc, function(r) { return "dlasingle_" + (r.account || "").split(" ")[0]; })}
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
          renderRowAction={overviewRowAction(oc, function(r) { return "custpay_" + (r.account || "").split(" ")[0]; })}
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
          renderRowAction={overviewRowAction(oc, function(r) { return "acc_" + (r.account || "").split(" ")[0]; })}
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
