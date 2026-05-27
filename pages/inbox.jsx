// ── Inbox page ───────────────────────────────────────────────────────────
registerPage("Inbox", {
  icon: "inbox",
  render: function InboxPage({ ctx }) {
    var T = ctx.ds.T;
    var TopBar = ctx.ds.TopBar;
    var PATHS = ctx.ds.PATHS;

    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar />
        <div style={{ padding: "32px 48px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, background: T.colorSurfacePrimary }}>
          <h1 style={{ fontSize: 36, fontWeight: 500, color: "#2A2A2A", letterSpacing: "-0.5px", margin: 0 }}>Inbox</h1>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "0 48px 48px", display: "flex", flexDirection: "column" }}>
          <div style={{
            background: T.colorSurfaceSecondary, border: "1px solid " + T.colorBorderDark, borderRadius: 12,
            padding: "64px 48px", display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", textAlign: "center", gap: 12,
          }}>
            <svg width="48" height="48" viewBox="0 0 20 20" fill="none" style={{ opacity: 0.4 }}>
              <path d={PATHS.inbox} stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span style={{ fontSize: 16, fontWeight: 500, color: T.colorTextThird }}>Inbox</span>
            <span style={{ fontSize: 14, color: T.colorTextSecondary }}>Notifications, messages, and items requiring your attention will appear here.</span>
          </div>
        </div>
      </div>
    );
  }
});
