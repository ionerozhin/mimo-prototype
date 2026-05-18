# Store Actions Reference

All cross-page state lives in the shared store (`store.jsx`). Pages write to it via `ctx.dispatch(action)`. This file lists every available action.

## Period

| Action | Payload | Effect |
|---|---|---|
| `SET_PERIOD` | `{ period: "April 2026" }` | Updates `selectedPeriod` |

## Bank Reconciliation

| Action | Payload | Effect |
|---|---|---|
| `MARK_RECONCILED` | `{ account, status?, date?, count? }` | Adds account to `reconciledAccounts` Set, sets date/status/count. Status defaults to "reconciled", date defaults to today. |
| `RESET_ACCOUNT` | `{ account }` | Removes account from reconciledAccounts, deletes its status/count/date entries. |
| `UPLOAD_STATEMENT` | `{ account, file: { fileName, date, time? } }` | Stores uploaded bank statement info for account. |
| `SYNC_BANK_REC_TO_BS` | `{ bankNameToBsCode, bankRows? }` | Syncs bank rec status into bsReconciledData for balance sheet display. Call after any bank rec change. |

## Balance Sheet Reconciliation

| Action | Payload | Effect |
|---|---|---|
| `SET_BS_RECONCILED_DATA` | `{ data }` or `{ updater: fn(prev) => next }` | Sets or updates bsReconciledData. Use updater for partial updates. |
| `SET_BS_REVIEW_STATE` | `{ value: "preparing"\|"reviewing"\|"reviewed" }` | Updates balance sheet review workflow state. |

## Comments

| Action | Payload | Effect |
|---|---|---|
| `ADD_COMMENT` | `{ accountCode, text, user? }` | Adds a timestamped comment to the account. User defaults to "Laura Bennett". |

## Account Review

| Action | Payload | Effect |
|---|---|---|
| `TOGGLE_ACCOUNT_REVIEW` | `{ code }` | Toggles account review status between "Reviewed" and null. |
| `MARK_ALL_ACCOUNTS_REVIEWED` | `{ codes: string[] }` | Marks all specified account codes as "Reviewed". |
| `RESTORE_ACCOUNT_REVIEW_STATUSES` | `{ snapshot }` | Replaces entire accountReviewStatuses with snapshot (for undo). |

## VAT

| Action | Payload | Effect |
|---|---|---|
| `SET_VAT_REVIEW_COMPLETED` | `{ value: boolean }` | Marks VAT review as completed or not. |
| `ADD_VAT_RESOLVED` | `{ cardId }` | Adds card to vatResolvedCards Set. |
| `ADD_VAT_IGNORED` | `{ cardId }` | Adds card to vatIgnoredCards Set. |
| `REMOVE_VAT_RESOLVED` | `{ cardId }` | Removes card from vatResolvedCards. |
| `REMOVE_VAT_IGNORED` | `{ cardId }` | Removes card from vatIgnoredCards. |

## Store Shape

For reference, the full initial state shape:

```jsx
{
  selectedPeriod: "April 2026",
  reconciledAccounts: new Set(),      // bank account names
  reconciledDates: {},                // { [accountName]: "13 Apr" }
  reconciledStatuses: {},             // { [accountName]: "reconciled"|"suggestions"|"completed" }
  reconciledCounts: {},               // { [accountName]: number | null }
  bankStatements: {},                 // { [accountName]: { fileName, date, time } }
  bsReconciledData: {},               // { [code]: { date, status, suggestionCount, ... } }
  rowComments: {},                    // { [accountCode]: [{ user, timestamp, text }] }
  accountReviewStatuses: {},          // { [accountCode]: { status, reviewer, date } | null }
  bsReviewState: "preparing",        // "preparing" | "reviewing" | "reviewed"
  vatReviewCompleted: false,
  vatResolvedCards: new Set(),
  vatIgnoredCards: new Set(),
}
```

## When to use store vs page-local state

**Store (ctx.dispatch):** Data that other pages need to read, or data the user produced that should survive navigation.

**Page-local (useState):** UI state like which sidebar is open, which row is hovered, animation state, which tab within the page. Resets on navigation — that's by design.
