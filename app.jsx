// ── App Shell ───────────────────────────────────────────────────────────────
// Thin router: reads PAGE_REGISTRY, initialises the shared store, renders
// MainMenu + TopBar + active page. Pages register themselves — this file
// rarely needs editing.

function App() {
  const [activeNav, setActiveNav] = useState("Home");
  const [store, dispatch] = useReducer(storeReducer, INITIAL_STORE);
  const [fullScreen, setFullScreen] = useState(false);

  // Build the ctx object passed to every page
  const ctx = useMemo(function() {
    return {
      ds: {
        T: T,
        PrimaryButton: PrimaryButton,
        SecondaryButton: SecondaryButton,
        DestructiveButton: typeof DestructiveButton !== "undefined" ? DestructiveButton : null,
        DataTable: DataTable,
        Tooltip: typeof Tooltip !== "undefined" ? Tooltip : null,
        StatusBadge: typeof StatusBadge !== "undefined" ? StatusBadge : null,
        TrMatchBadge: typeof TrMatchBadge !== "undefined" ? TrMatchBadge : null,
        TrMatchingBadge: typeof TrMatchingBadge !== "undefined" ? TrMatchingBadge : null,
        ReconciledCard: typeof ReconciledCard !== "undefined" ? ReconciledCard : null,
        ReconciliationCard: typeof ReconciliationCard !== "undefined" ? ReconciliationCard : null,
        RecommendationCard: typeof RecommendationCard !== "undefined" ? RecommendationCard : null,
        StatsWidget: typeof StatsWidget !== "undefined" ? StatsWidget : null,
        StatsRow: typeof StatsRow !== "undefined" ? StatsRow : null,
        WorkflowStepsAccordion: typeof WorkflowStepsAccordion !== "undefined" ? WorkflowStepsAccordion : null,
        CommentThread: typeof CommentThread !== "undefined" ? CommentThread : null,
        Sidebar: typeof Sidebar !== "undefined" ? Sidebar : null,
        Dropdown: typeof Dropdown !== "undefined" ? Dropdown : null,
        Input: typeof Input !== "undefined" ? Input : null,
        RadioGroup: typeof RadioGroup !== "undefined" ? RadioGroup : null,
        RadioOption: typeof RadioOption !== "undefined" ? RadioOption : null,
        Toggle: typeof Toggle !== "undefined" ? Toggle : null,
        TabsNavigation: typeof TabsNavigation !== "undefined" ? TabsNavigation : null,
        Modal: typeof Modal !== "undefined" ? Modal : null,
        Banner: typeof Banner !== "undefined" ? Banner : null,
        ChatBox: typeof ChatBox !== "undefined" ? ChatBox : null,
        CanvasLoader: typeof CanvasLoader !== "undefined" ? CanvasLoader : null,
        LinkCard: typeof LinkCard !== "undefined" ? LinkCard : null,
        LinkCardGroup: typeof LinkCardGroup !== "undefined" ? LinkCardGroup : null,
        NavIcon: NavIcon,
        Chevron: Chevron,
        ProgressRing: typeof ProgressRing !== "undefined" ? ProgressRing : null,
        SortIcon: typeof SortIcon !== "undefined" ? SortIcon : null,
        PlayCircleIcon: typeof PlayCircleIcon !== "undefined" ? PlayCircleIcon : null,
        DocIcon: typeof DocIcon !== "undefined" ? DocIcon : null,
        InvoiceIcon: typeof InvoiceIcon !== "undefined" ? InvoiceIcon : null,
        PdfIcon: typeof PdfIcon !== "undefined" ? PdfIcon : null,
        CsvIcon: typeof CsvIcon !== "undefined" ? CsvIcon : null,
        FileIcon: typeof FileIcon !== "undefined" ? FileIcon : null,
        PATHS: PATHS,
        TopBar: TopBar,
      },
      store: store,
      dispatch: dispatch,
      navigate: function(label) { setActiveNav(label); },
      activeNav: activeNav,
      setFullScreen: setFullScreen,
    };
  }, [store, activeNav]);

  // Nav label → page label mapping. Multiple nav items can map to one page.
  // "Balance sheet" maps to the "Review" page. P&L is now its own page.
  var NAV_TO_PAGE = {
    "Balance sheet": "Review",
  };

  // All pages stay mounted (display:none when inactive) so state is preserved
  // across navigation. To opt OUT, set keepAlive: false in registerPage config.
  var resolvedNav = NAV_TO_PAGE[activeNav] || activeNav;
  var pages = Object.keys(PAGE_REGISTRY).map(function(label) {
    var page = PAGE_REGISTRY[label];
    var isActive = resolvedNav === label;
    var keepAlive = page.keepAlive !== false; // default: true (all pages keep state)

    if (!keepAlive && !isActive) return null;

    return React.createElement("div", {
      key: label,
      style: { flex: 1, display: isActive ? "flex" : "none", flexDirection: "column", overflow: "hidden" },
    }, React.createElement(page.render, { ctx: ctx }));
  });

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: T.colorSurfacePrimary }}>
      {/* Left sidebar — hidden during full-screen reconciliation flows */}
      {!fullScreen && <MainMenu activeNav={activeNav} onNavChange={setActiveNav} />}

      {/* Pages — all mounted, shown/hidden via display */}
      {pages}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
