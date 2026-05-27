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
  userAvatar,
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
  var _avatar = userAvatar !== undefined ? userAvatar : (typeof AVATAR_URL !== "undefined" && AVATAR_URL ? AVATAR_URL : null);
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
          onClick={() => onNavChange?.("Client context")}
          style={{
            width: "calc(100% - 16px)", display: "flex", alignItems: "center", gap: 8,
            height: 40, padding: "0 12px", marginBottom: 1,
            marginLeft: 8, marginRight: 8,
            borderRadius: 6, border: "none", cursor: "pointer",
            background: activeNav === "Client context" ? "#F0F0F0" : "transparent", textAlign: "left", boxShadow: "none",
          }}
          onMouseEnter={e => { if (activeNav !== "Client context") e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
          onMouseLeave={e => { if (activeNav !== "Client context") e.currentTarget.style.background = "transparent"; }}
        >
          <NavIcon name="settings" color={activeNav === "Client context" ? "#080908" : "#4F4F4F"} />
          <span style={{ fontSize: 14, fontWeight: activeNav === "Client context" ? 600 : 400, color: activeNav === "Client context" ? "#080908" : "#4F4F4F" }}>Settings</span>
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
          {_avatar
            ? <img src={_avatar} alt={userName} style={{ width: 36, height: 36, objectFit: "cover" }} />
            : <span style={{ fontSize: 13, fontWeight: 600, color: "#4C71DF" }}>{userName.charAt(0)}</span>
          }
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
