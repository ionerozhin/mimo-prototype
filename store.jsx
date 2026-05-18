// ── Shared Store ────────────────────────────────────────────────────────────
// Cross-page state managed by useReducer. Pages read via ctx.store, write via ctx.dispatch.
// Page-local UI state (sidebars open, hover, scroll) stays in page-level useState.

const INITIAL_STORE = {
  selectedPeriod: "April 2026",
  reconciledAccounts: new Set(),
  reconciledDates: {},           // { [accountName]: "13 Apr" }
  reconciledStatuses: {},        // { [accountName]: "reconciled"|"suggestions"|"completed" }
  reconciledCounts: {},          // { [accountName]: number | null }
  bankStatements: {},            // { [accountName]: { fileName, date, time } }
  bsReconciledData: {},          // { [code]: { date, status, suggestionCount, ... } }
  rowComments: {},               // { [accountCode]: [{ user, timestamp, text }] }
  accountReviewStatuses: {},     // { [accountCode]: { status, reviewer, date } | null }
  bsReviewState: "preparing",   // "preparing" | "reviewing" | "reviewed"
  vatReviewCompleted: false,
  vatResolvedCards: new Set(),
  vatIgnoredCards: new Set(),
};

function storeReducer(state, action) {
  switch (action.type) {

    case "SET_PERIOD":
      return { ...state, selectedPeriod: action.period };

    case "MARK_RECONCILED": {
      var next = { ...state };
      next.reconciledAccounts = new Set([...state.reconciledAccounts, action.account]);
      next.reconciledDates = { ...state.reconciledDates, [action.account]: action.date || new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }) };
      next.reconciledStatuses = { ...state.reconciledStatuses, [action.account]: action.status || "reconciled" };
      next.reconciledCounts = { ...state.reconciledCounts, [action.account]: action.count !== undefined ? action.count : null };
      return next;
    }

    case "RESET_ACCOUNT": {
      var nextRA = { ...state };
      var nextSet = new Set(state.reconciledAccounts);
      nextSet.delete(action.account);
      nextRA.reconciledAccounts = nextSet;
      var nextStatuses = { ...state.reconciledStatuses }; delete nextStatuses[action.account];
      var nextCounts = { ...state.reconciledCounts }; delete nextCounts[action.account];
      var nextDates = { ...state.reconciledDates }; delete nextDates[action.account];
      nextRA.reconciledStatuses = nextStatuses;
      nextRA.reconciledCounts = nextCounts;
      nextRA.reconciledDates = nextDates;
      return nextRA;
    }

    case "UPLOAD_STATEMENT":
      return { ...state, bankStatements: { ...state.bankStatements, [action.account]: action.file } };

    case "ADD_COMMENT": {
      var now = new Date();
      var day = now.getDate();
      var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      var hours = now.getHours().toString().padStart(2, "0");
      var mins = now.getMinutes().toString().padStart(2, "0");
      var timestamp = day + " " + monthNames[now.getMonth()] + " at " + hours + ":" + mins;
      var entry = { user: action.user || "Laura Bennett", timestamp: timestamp, text: action.text };
      return {
        ...state,
        rowComments: {
          ...state.rowComments,
          [action.accountCode]: [...(state.rowComments[action.accountCode] || []), entry],
        },
      };
    }

    case "SET_BS_RECONCILED_DATA":
      if (typeof action.updater === "function") {
        return { ...state, bsReconciledData: action.updater(state.bsReconciledData) };
      }
      return { ...state, bsReconciledData: action.data };

    case "TOGGLE_ACCOUNT_REVIEW": {
      var nextAR = { ...state.accountReviewStatuses };
      if (nextAR[action.code] && nextAR[action.code].status === "Reviewed") {
        nextAR[action.code] = null;
      } else {
        var nowAR = new Date();
        var dayAR = nowAR.getDate().toString().padStart(2, "0");
        var mnAR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var yearAR = nowAR.getFullYear();
        nextAR[action.code] = { status: "Reviewed", reviewer: "Mark Smith", date: mnAR[nowAR.getMonth()] + " " + dayAR + " " + yearAR };
      }
      return { ...state, accountReviewStatuses: nextAR };
    }

    case "MARK_ALL_ACCOUNTS_REVIEWED": {
      var nextAll = { ...state.accountReviewStatuses };
      var nowAll = new Date();
      var dayAll = nowAll.getDate().toString().padStart(2, "0");
      var mnAll = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      var yearAll = nowAll.getFullYear();
      var dateStr = mnAll[nowAll.getMonth()] + " " + dayAll + " " + yearAll;
      action.codes.forEach(function(code) {
        if (!nextAll[code] || nextAll[code].status !== "Reviewed") {
          nextAll[code] = { status: "Reviewed", reviewer: "Mark Smith", date: dateStr };
        }
      });
      return { ...state, accountReviewStatuses: nextAll };
    }

    case "RESTORE_ACCOUNT_REVIEW_STATUSES":
      return { ...state, accountReviewStatuses: action.snapshot };

    case "SET_BS_REVIEW_STATE":
      return { ...state, bsReviewState: action.value };

    case "SET_VAT_REVIEW_COMPLETED":
      return { ...state, vatReviewCompleted: action.value };

    case "ADD_VAT_RESOLVED":
      return { ...state, vatResolvedCards: new Set([...state.vatResolvedCards, action.cardId]) };

    case "ADD_VAT_IGNORED":
      return { ...state, vatIgnoredCards: new Set([...state.vatIgnoredCards, action.cardId]) };

    case "REMOVE_VAT_RESOLVED": {
      var nextVR = new Set(state.vatResolvedCards);
      nextVR.delete(action.cardId);
      return { ...state, vatResolvedCards: nextVR };
    }

    case "REMOVE_VAT_IGNORED": {
      var nextVI = new Set(state.vatIgnoredCards);
      nextVI.delete(action.cardId);
      return { ...state, vatIgnoredCards: nextVI };
    }

    // Sync bank rec results into bsReconciledData (replaces the old useEffect in app.jsx)
    case "SYNC_BANK_REC_TO_BS": {
      var bsNext = { ...state.bsReconciledData };
      var mapping = action.bankNameToBsCode; // { [bankName]: bsCode }
      state.reconciledAccounts.forEach(function(name) {
        var code = mapping[name];
        if (!code) return;
        var bankStatus = state.reconciledStatuses[name] || "reconciled";
        var bsStatus;
        if (bankStatus === "reconciled") bsStatus = "reconciled";
        else if (bankStatus === "completed") bsStatus = "reconciled";
        else if (bankStatus === "suggestions") bsStatus = "suggestions";
        else bsStatus = "reviewing";
        bsNext[code] = {
          code: code,
          date: state.reconciledDates[name] || "",
          status: bsStatus,
          suggestionCount: state.reconciledCounts[name] || null,
          sourceBalance: action.bankRows ? (action.bankRows.find(function(r) { return r.name === name; }) || {}).feedBalance || null : null,
          variance: null,
          isBankAccount: true,
          bankAccountName: name,
        };
      });
      // Remove entries for bank accounts no longer reconciled
      Object.keys(mapping).forEach(function(name) {
        if (!state.reconciledAccounts.has(name)) {
          var c = mapping[name];
          if (bsNext[c] && bsNext[c].isBankAccount) delete bsNext[c];
        }
      });
      return { ...state, bsReconciledData: bsNext };
    }

    default:
      return state;
  }
}
