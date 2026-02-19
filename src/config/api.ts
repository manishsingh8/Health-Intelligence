const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

export const API_ENDPOINTS = {
  /* =========================
     AUTH
  ========================== */
  LOGIN: `${BASE_URL}/auth/login`,

  /* =========================
     MASTER DATA
  ========================== */
  PAYERS: `${BASE_URL}/master/getPayers`,
  TRANSACTION_STATUSES: `${BASE_URL}/master/getTransactionStatuses`,

  /* =========================
     RECONCILED REPORT
  ========================== */
  RECONCILED_WIDGET: `${BASE_URL}/reconciledReport/reconciledReportWidget`,
  RECONCILED_TABLE: `${BASE_URL}/reconciledReport/getReconciledReportData`,

  /* =========================
     VARIANCE QUEUE
  ========================== */
  VARIANCE_WIDGET: `${BASE_URL}/varianceQueue/varianceWidget`,
  VARIANCE_TABLE: `${BASE_URL}/varianceQueue/getVarianceQueueData`,
  UPDATE_VARIANCE_TABLE: `${BASE_URL}/varianceQueue/manual-update`,
  BAI_DATA: `${BASE_URL}/varianceQueue/getBaiData`,
  REMIT_DATA: `${BASE_URL}/varianceQueue/getRemitData`,
  EMR_DATA: `${BASE_URL}/varianceQueue/getCashPostingData`,
  DOWNLOAD_REMIT_FILE: `${BASE_URL}/varianceQueue/downloadRemitFile`,

  /* =========================
     CASH POSTING
  ========================== */
  CASH_POSTING_QUEUE: `${BASE_URL}/cashPosting/getCashPostingQueue`,
  CASH_POSTING_REPORT: `${BASE_URL}/cashPosting/getCashPostingReport`,
  CASH_POSTING_CHECK_DETAILS: `${BASE_URL}/cashPosting/getCheckDetailsByCheckNum`,

  /* ==========================
      DASHBOARD DATA
  ==============================
  */
  REVENUE_WIDGETS: `${BASE_URL}/dashboard/revenueWidgets`,
  WORK_QUEUE_ACTIVITY: `${BASE_URL}/dashboard/workQueueActivityAnalysis`,
  OPERATIONAL_PERFORMANCE_VIEW: `${BASE_URL}/dashboard/operationalPerformanceView`,
  BAI_PARSER: "https://api.revpulseapp.com/bai-processor/api/files/upload",

  HCD_DOCUMENT_PROCESSING: `${BASE_URL}/dashboard/documentProcessingDuration`,
  HCD_DAILY_PROCESSING_VOLUME: `${BASE_URL}/dashboard/dailyProcessingVolumByCategory`,
  HCD_DOCUMENT_STATUS_OVERVIEW: `${BASE_URL}/dashboard/getDocumentStatusOverview`,
  HCD_DOCUMENT_INTELLIGENCE: `${BASE_URL}/dashboard/documentIntelligenceDashboard`,

  /* ==========================
      CDM SCREENS
  ==============================
  */
  CLAIM_FILTERS: `${BASE_URL}/cdm/filters`,
  FILTER_DOCS_LIST: `${BASE_URL}/cdm/fetchFilterDocsList`,
  ASSIGN_USER: `${BASE_URL}/cdm/updateDocsAssignedUserAndTags`,
  GET_CHILD_DATA: `${BASE_URL}/cdm/getChildData`,
  GET_EOB_FILE: `${BASE_URL}/cdm/getEobFileLevelDataProd`,
  SPLIT_FILE: `${BASE_URL}/cdm/splitFile`,
  FETCH_EOB_PATIENT: `${BASE_URL}/cdm/fetchEobPatientAndLineLevelData`,
  DELETE_SPLIT_FILE: `${BASE_URL}/cdm/deleteSplitFileWithLetterId`,
  SHOW_ORIGINAL_FILE_PATH: `${BASE_URL}/cdm/showOriginalFilePath`,
  SHOW_SPLITTED_FILE_PATH: `${BASE_URL}/cdm/showSplittedFilePath`,
};

export const CHATBOT_API_ENDPOINTS = {
  WEBHOOK: "https://djio73p3fh.execute-api.us-east-1.amazonaws.com/dev/webhook",
  CHAT: "https://djio73p3fh.execute-api.us-east-1.amazonaws.com/dev/chat",
} as const;
