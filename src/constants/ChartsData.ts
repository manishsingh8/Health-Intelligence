export const HCD_CARD_MAPPER = [
  {
    id: 1,
    key: "totalDocumentsProcessed",
    headerText: "Total Document Processed",
  },
  {
    id: 2,
    key: "autoClassificationAccuracy",
    headerText: "Auto-Classification Accuracy",
  },
  {
    id: 3,
    key: "documentsAwaitingReview",
    headerText: "Documents Awaiting Review",
  },
  {
    id: 4,
    key: "meanProcessingTime",
    headerText: "Mean Processing Time",
  },
] as const;

export const AVG_TIME_CHART_DATA = [
  { workflow: "Referrals", time: 25 },
  { workflow: "Lab Results", time: 15 },
  { workflow: "Clinical Notes", time: 30 },
  { workflow: "Prescriptions", time: 20 },
];
export const TOP_EXCEPTION_CHART_DATA = [
  { label: "Missing Patient ID", value: 45, color: "#DC2626" },
  { label: "Unrecognized Document Type", value: 22, color: "#F59E0B" },
  { label: "Invalid Date Formate", value: 15, color: "#1D4ED8" },
  { label: "OCR Confidence Low", value: 12, color: "#249563" },
];

export const DAILY_DOCS_CHART_DATA = [
  { date: "2025-10-01", authForm: 3, eob: 20 },
  { date: "2025-10-02", authForm: 5, eob: 6 },
  { date: "2025-10-03", authForm: 3, eob: 13 },
  { date: "2025-10-04", authForm: 4, eob: 11 },
  { date: "2025-10-05", authForm: 5, eob: 16 },
  { date: "2025-10-06", authForm: 0, eob: 10 },
  { date: "2025-10-07", authForm: 2, eob: 17 },
];
export const DAILY_DOCS_SEGMENTS_DATA = [
  { dataKey: "authForm", color: "#0047ba", label: "Authorization Form" },
  { dataKey: "eob", color: "#e69f00", label: "EOB" },
  { dataKey: "letter", color: "#009e73", label: "Letter - Appeal" },
];
export const DOCUMENT_STATUS_CHART_DATA = [
  { label: "Completed", value: 80, color: "#1D4ED8" },
  { label: "In Progress", value: 45, color: "#F59E0B" },
  { label: "Ready", value: 30, color: "#249563" },
  { label: "Archived", value: 12, color: "#DC2626" },
];

// 3. Data for Agent Performance Chart
export const agentData = [
  { agentId: "Agent 1", completed: 70 },
  { agentId: "Agent 4", completed: 65 },
  { agentId: "Agent 10", completed: 61 },
  { agentId: "Agent 9", completed: 61 },
  { agentId: "Agent 13", completed: 59 },
  { agentId: "Agent 7", completed: 59 },
  { agentId: "Agent 6", completed: 58 },
  { agentId: "Agent 8", completed: 55 },
  { agentId: "Agent 5", completed: 53 },
  { agentId: "Agent 2", completed: 51 },
];

// 4. Data for Processing Time Chart
export const processingTimeData = [
  { documentType: "Authorization Form", avgTime: 3.9 },
  { documentType: "EOB", avgTime: 3.7 },
  { documentType: "Letter - Appeal", avgTime: 3.6 },
  { documentType: "Medical Record", avgTime: 3.6 },
];

// 5. Data for SLA Compliance Chart
export const slaComplianceData = [
  { date: "2025-10-01", breached: 5, withinTAT: 42 },
  { date: "2025-10-02", breached: 3, withinTAT: 45 },
  { date: "2025-10-03", breached: 6, withinTAT: 38 },
  { date: "2025-10-04", breached: 4, withinTAT: 40 },
  { date: "2025-10-05", breached: 7, withinTAT: 35 },
  { date: "2025-10-06", breached: 2, withinTAT: 32 },
  { date: "2025-10-07", breached: 8, withinTAT: 37 },
  { date: "2025-10-08", breached: 5, withinTAT: 36 },
  { date: "2025-10-09", breached: 6, withinTAT: 31 },
  { date: "2025-10-10", breached: 3, withinTAT: 30 },
  { date: "2025-10-11", breached: 4, withinTAT: 35 },
  { date: "2025-10-12", breached: 7, withinTAT: 37 },
  { date: "2025-10-13", breached: 5, withinTAT: 40 },
  { date: "2025-10-14", breached: 6, withinTAT: 38 },
  { date: "2025-10-15", breached: 3, withinTAT: 48 },
  { date: "2025-10-16", breached: 8, withinTAT: 45 },
  { date: "2025-10-17", breached: 4, withinTAT: 41 },
  { date: "2025-10-18", breached: 5, withinTAT: 50 },
  { date: "2025-10-19", breached: 7, withinTAT: 42 },
  { date: "2025-10-20", breached: 6, withinTAT: 39 },
  { date: "2025-10-21", breached: 2, withinTAT: 44 },
  { date: "2025-10-22", breached: 9, withinTAT: 47 },
  { date: "2025-10-23", breached: 5, withinTAT: 43 },
  { date: "2025-10-24", breached: 4, withinTAT: 51 },
  { date: "2025-10-25", breached: 8, withinTAT: 55 },
];

export const slaSegments = [
  { dataKey: "breached", color: "#249563", label: "Breached" }, // Blue
  { dataKey: "withinTAT", color: "#1D4ED8", label: "Within TAT" }, // Orange
];
