// ── Page Registry ────────────────────────────────────────────────────────────
// Pages register themselves by calling registerPage(label, config).
// app.jsx reads PAGE_REGISTRY to build nav and render the active page.

const PAGE_REGISTRY = {};

function registerPage(label, config) {
  // config: { icon: string, render: function({ ctx }), keepAlive?: boolean, section?: string }
  PAGE_REGISTRY[label] = config;
}
