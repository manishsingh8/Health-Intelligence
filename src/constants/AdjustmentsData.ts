export type LedgerCategory =
  | "SUSPENSE"
  | "PIP"
  | "RECOUPMENT"
  | "OTHER_ADJUSTMENT";

export interface LedgerRow {
  id: string;
  effectiveDate: string;
  ledgerCategory: LedgerCategory;
  type: string;
  description: string;
  source: string;
  amount: number;
  openBalance: number | null;
  status:
    | "Open"
    | "Closed"
    | "Pending"
    | "Approved"
    | "Completed"
    | "Reconciled";
}

export const DUMMY_LEDGER_DATA: LedgerRow[] = [
  // ---------------- SUSPENSE ----------------
  {
    id: "S1",
    effectiveDate: "09/01/2025",
    ledgerCategory: "SUSPENSE",
    type: "SUSPENSE",
    description: "Payment correction",
    source: "United Health",
    amount: 1200,
    openBalance: 300,
    status: "Open",
  },
  {
    id: "S2",
    effectiveDate: "09/05/2025",
    ledgerCategory: "SUSPENSE",
    type: "Charge",
    description: "Late fee",
    source: "Humana",
    amount: 300,
    openBalance: 300,
    status: "Open",
  },
  {
    id: "S1",
    effectiveDate: "09/01/2025",
    ledgerCategory: "SUSPENSE",
    type: "SUSPENSE",
    description: "Payment correction",
    source: "United Health",
    amount: 1200,
    openBalance: 300,
    status: "Open",
  },
  {
    id: "S2",
    effectiveDate: "09/05/2025",
    ledgerCategory: "SUSPENSE",
    type: "Charge",
    description: "Late fee",
    source: "Humana",
    amount: 300,
    openBalance: 300,
    status: "Open",
  },

  // ---------------- PIP ----------------
  {
    id: "P1",
    effectiveDate: "12/29/2025",
    ledgerCategory: "PIP",
    type: "PIP",
    description: "Payment from CIGNA via PIP",
    source: "CIGNA",
    amount: 20116.43,
    openBalance: null,
    status: "Reconciled",
  },
  {
    id: "P2",
    effectiveDate: "12/27/2025",
    ledgerCategory: "PIP",
    type: "PIP",
    description: "Payment from CMS via PIP",
    source: "CMS",
    amount: 25000,
    openBalance: null,
    status: "Pending",
  },
  {
    id: "P1",
    effectiveDate: "12/29/2025",
    ledgerCategory: "PIP",
    type: "PIP",
    description: "Payment from CIGNA via PIP",
    source: "CIGNA",
    amount: 20116.43,
    openBalance: null,
    status: "Reconciled",
  },
  {
    id: "P2",
    effectiveDate: "12/27/2025",
    ledgerCategory: "PIP",
    type: "PIP",
    description: "Payment from CMS via PIP",
    source: "CMS",
    amount: 25000,
    openBalance: null,
    status: "Pending",
  },

  // ---------------- RECOUPMENTS ----------------
  {
    id: "R1",
    effectiveDate: "12/22/2025",
    ledgerCategory: "RECOUPMENT",
    type: "Recoupment",
    description: "Contractual obligation",
    source: "Unknown Payer",
    amount: -260.62,
    openBalance: null,
    status: "Pending",
  },
  {
    id: "R2",
    effectiveDate: "12/08/2025",
    ledgerCategory: "RECOUPMENT",
    type: "Recoupment",
    description: "Contractual obligation",
    source: "Unknown Payer",
    amount: -317.72,
    openBalance: null,
    status: "Completed",
  },
  {
    id: "R1",
    effectiveDate: "12/22/2025",
    ledgerCategory: "RECOUPMENT",
    type: "Recoupment",
    description: "Contractual obligation",
    source: "Unknown Payer",
    amount: -260.62,
    openBalance: null,
    status: "Pending",
  },
  {
    id: "R2",
    effectiveDate: "12/08/2025",
    ledgerCategory: "RECOUPMENT",
    type: "Recoupment",
    description: "Contractual obligation",
    source: "Unknown Payer",
    amount: -317.72,
    openBalance: null,
    status: "Completed",
  },

  // ---------------- OTHER ADJUSTMENTS ----------------
  {
    id: "OA1",
    effectiveDate: "12/26/2025",
    ledgerCategory: "OTHER_ADJUSTMENT",
    type: "Adjustment",
    description: "Write-off reversal",
    source: "Unknown Payer",
    amount: 354.68,
    openBalance: null,
    status: "Pending",
  },
  {
    id: "OA2",
    effectiveDate: "12/20/2025",
    ledgerCategory: "OTHER_ADJUSTMENT",
    type: "Adjustment",
    description: "Write-off reversal",
    source: "Unknown Payer",
    amount: 105.24,
    openBalance: null,
    status: "Completed",
  },
  {
    id: "OA1",
    effectiveDate: "12/26/2025",
    ledgerCategory: "OTHER_ADJUSTMENT",
    type: "Adjustment",
    description: "Write-off reversal",
    source: "Unknown Payer",
    amount: 354.68,
    openBalance: null,
    status: "Pending",
  },
  {
    id: "OA2",
    effectiveDate: "12/20/2025",
    ledgerCategory: "OTHER_ADJUSTMENT",
    type: "Adjustment",
    description: "Write-off reversal",
    source: "Unknown Payer",
    amount: 105.24,
    openBalance: null,
    status: "Completed",
  },
];
