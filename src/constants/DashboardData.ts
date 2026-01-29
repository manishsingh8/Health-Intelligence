export const RCM_CENTRAL_ENGINE_DATA = [
  {
    headerText: "Total Files Ingested",
    percentage: 5,
    value: 126,
    status: "positive",
  },
  {
    headerText: "BAI Amount",
    percentage: 8,
    value: "$118",
    status: "positive",
  },
  {
    headerText: "Remittance Amount",
    percentage: -1,
    value: "$120",
    status: "moderate",
  },
  {
    headerText: "Cash Posting Amount",
    percentage: 3,
    value: "$34",
    status: "positive",
  },
  {
    headerText: "Average File Processing time/File",
    percentage: 6,
    value: "52 Min",
    status: "positive",
  },
];

export const INTAKE_ORCHESTRATOR_DATA = [
  {
    headerText: "Total Files Ingested",
    percentage: "12",
    value: "982",
    status: "positive",
  },
  {
    headerText: "BAI Files and Success rate",
    percentage: "9",
    value: "870",
    status: "positive",
    processingRate: "33%",
  },
  {
    headerText: "EDI Files and Success Rate",
    percentage: "-4",
    value: "112",
    processingRate: "23%",
    status: "moderate",
  },
  {
    headerText: "Correspondence Files and Success Rate",
    percentage: "-2",
    value: "25",
    processingRate: "53%",
    status: "moderate",
  },
  {
    headerText: "Payment Posting files and Success Rate",
    percentage: "6",
    value: "14",
    processingRate: "40%",
    status: "positive",
  },
  {
    headerText: "Average File Processing time",
    percentage: "-15",
    value: "16 Min",
    processingRate: "30%",
    status: "negative",
  },
];

export const RECONCILIATION_DATA = [
  {
    headerText: "Total Transactions Processed",
    percentage: "5",
    value: "684",
    status: "positive",
  },
  {
    headerText: "Transactions Auto-Matched",
    percentage: "8",
    value: "512",
    status: "positive",
  },
  {
    headerText: "Matching Accuracy",
    percentage: "-1",
    value: "65%",
    status: "moderate",
  },
  {
    headerText: "Exceptions Detected",
    percentage: "3",
    value: "23",
    status: "positive",
  },
  {
    headerText: "Validations Performed",
    percentage: "3",
    value: "11",
    status: "positive",
  },
  {
    headerText: "Ready for Posting",
    percentage: "3",
    value: "2",
    status: "positive",
  },
];

export const CASH_POSTING_DATA = [
  {
    headerText: "Auto Posting Rate",
    percentage: "5",
    value: "23%",
    status: "positive",
  },
  {
    headerText: "Total Payments Posted Today",
    percentage: "8",
    value: "311",
    status: "positive",
  },
  {
    headerText: "Total Payment Amount Posted",
    percentage: "-1",
    value: "$6,12,441.22",
    status: "moderate",
  },
  {
    headerText: "Payments Pending Posting",
    percentage: "3",
    value: "221",
    status: "positive",
  },
  {
    headerText: "Payments Partially Posted",
    percentage: "-6",
    value: "8",
    status: "positive",
  },
  {
    headerText: "Average Posting Time per Payment",
    percentage: "-6",
    value: "13 Min",
    status: "positive",
  },
];

export const TABS = [
  { value: "rcm", label: "RCM Central Engine" },
  { value: "intake", label: "Intake Workflow Agent" },
  { value: "reconciliation", label: "Reconciliation Agent" },
  { value: "cashPosting", label: "Payment Posting Agent" },
];

export const DROPDOWN_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "1week", label: "1 Week" },
  { value: "lastMonth", label: "Last Month" },
];
