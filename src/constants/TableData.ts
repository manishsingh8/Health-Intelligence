// Define transaction type
export interface Transaction {
  id: string;
  transactionNo: string;
  transactionType: string;
  region: string;
  payer: string;
  account: string;
  depositDate: string;
  bankDeposit: number;
  remittance: number;
  emrAmount: number;
  glAmount: number;
  payVariance: number;
  statusName: string;
  nonReconciledDataId?: string;
  statusId?: string;
  comments: string;
  history: string;
  userId: string;
}
export interface ReconciledTransaction {
  id: string;
  transactionNo: string;
  transactionType: string;
  region: string;
  payerName?: string;
  account: string;
  depositDate: string;
  bankDeposit: number;
  remittance: number;
  emrAmount: number;
  glAmount: number;
  payer?: string;
  reconciledDataId?: string;
}

export const BANK_DEPOSIT_COLUMNS = [
  { key: "transactionNumber", label: "Transaction Number" },
  { key: "bankName", label: "Bank Name" },
  { key: "payerName", label: "Payer Name" },
  { key: "amountPaid", label: "Amount Paid" },
  { key: "transactionType", label: "Transaction Type" },
  { key: "fileReceivedDate", label: "File Received Date" },
  { key: "fileName", label: "File Name" },
  { key: "description", label: "Description" },
];

export const EDITABLE_FIELDS: (keyof Transaction)[] = [
  // "payer",
  // "account",
  // "bankDeposit",
  "remittance",
  "emrAmount",
  "glAmount",
  "comments",
  // "statusName",
];
export const EDITABLE_RECONCILED_FIELDS: (keyof ReconciledTransaction)[] = [
  "payer",
  "account",
  "bankDeposit",
  "remittance",
  "emrAmount",
  "glAmount",
];

export interface Cash_Posting_Transaction {
  id: string;
  cashPostingId: number;
  cheque: string;
  payerName: string;
  region: string;
  postingType: string;
  totalAmount: number;
  postedAmount: number;
  remittance: number;
  attemptedOn: string | null; // updated to string or null
  status: string;
  reason: string;
}

export const CASH_POSTING_COLUMN_LABELS: Partial<
  Record<keyof Cash_Posting_Transaction, string>
> = {
  cheque: "Check Number",
  payerName: "Payer Name",
  region: "Region",
  postingType: "Posting Method",
  totalAmount: "Total Payment Amount",
  postedAmount: "Amount Successfully Posted",
  remittance: "Remittance Amount Received",
  attemptedOn: "Last Attempt Date",
  status: "Status",
  reason: "Posting Exception Reason",
};

export const CASH_POSTING_REPORT_COLUMN_LABELS: Partial<
  Record<keyof Cash_Posting_Transaction, string>
> = {
  cheque: "Check Number",
  payerName: "Payer Name",
  region: "Region",
  postingType: "Posting Method",
  totalAmount: "Total Payment Amount",
  postedAmount: "Amount Successfully Posted",
  remittance: "Remittance Amount Received",
  attemptedOn: "Last Attempt Date",
  status: "Status",
  reason: "Posting Exception Reason",
};

export const RECONCILED_REPORT_COLUMN_LABELS: Partial<
  Record<keyof ReconciledTransaction, string>
> = {
  transactionNo: "Check #",
  transactionType: "Transaction Category",
  region: "Region",
  payer: "Payer Name",
  account: "Account Number",
  depositDate: "	Deposit Date",
  bankDeposit: "BAI Amount",
  remittance: "Remittance Amount",
  emrAmount: "EMR Amount",
  glAmount: "Others",
};

export const NON_RECONCILED_COLUMN_LABELS: Partial<
  Record<keyof Transaction, string>
> = {
  transactionNo: "Check #",
  transactionType: "Transaction Category",
  region: "Region",
  payer: "Payer Name",
  account: "Account Number",
  depositDate: "	Deposit Date",
  bankDeposit: "BAI Amount",
  remittance: "Remittance Amount",
  emrAmount: "EMR Amount",
  payVariance: "Variance Amount",
  statusName: "Current Status",
  glAmount: "Others",
};

export const NON_RECONCILED_HEADER_TEXT = {
  "Bank Deposit": "Bank Deposit Amount",
  Remittance: "Remittance Amount",
  "Cash Posting": "Posted Amount",
  "Pay Variance": "Variance With Remit",
  "Post Variance": "Variance With Posting",
};
export const RECONCILED_REPORT_HEADER_TEXT = {
  "Bank Deposit": "Bank Deposit Amount",
  Remittance: "Remittance Amount",
  "Cash Posting": "Posted Amount",
};
