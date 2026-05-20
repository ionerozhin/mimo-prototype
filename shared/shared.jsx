
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
  var renderCardAction = _rcRef.renderCardAction;

  var _rcExp = useState(!collapsed && !isIgnored && !accountReconciled);
  var expanded = _rcExp[0]; var setExpanded = _rcExp[1];
  var _rcHov = useState(false);
  var cardHovered = _rcHov[0]; var setCardHovered = _rcHov[1];
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

  var cardActionContent = renderCardAction ? renderCardAction() : null;

  return (
    <div>
    <div style={{ background: "#FFFFFF", border: "1px solid #ECECEC", borderRadius: 8, padding: "20px", fontFamily: "'Inter', sans-serif" }}>
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
        onClick={function() { setExpanded(function(o) { return !o; }); }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>{title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: 12 }}>
          {cardActionContent && (
            <span onClick={function(e) { e.stopPropagation(); }}>{cardActionContent}</span>
          )}
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

