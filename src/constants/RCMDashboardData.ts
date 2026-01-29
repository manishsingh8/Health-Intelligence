export interface TransactionPostingMetrics {
  autoPostRate: number; // percent
  autoPostedCount: number;
  totalTransactionsPosted: number;
}

export interface PerformanceMetrics {
  avgProcessingTimeMinutes: number;
  mtdComparison: {
    percentageChange: number; // positive => slower, negative => faster
  };
}

export interface PostingReportsMetrics {
  exceptionRate: number; // percent (0-100)
  totalExceptions: number;
}

export interface OperationalMetrics {
  transactionPosting: TransactionPostingMetrics;
  performance: PerformanceMetrics;
  postingReports: PostingReportsMetrics;
}

export interface KpiCardItem {
  title: string;
  value: string;
  description?: string;
  iconName?: string;
  trend?: "up" | "down" | "neutral";
}
export type BackendKpi = {
  id: string;
  title: string;
  value: string | null;
  subText?: {
    icon?: string;
    text?: string;
  };
  topRightIcon?: string;
  trend: "up" | "down";
};

export const operationalMetrics: OperationalMetrics = {
  transactionPosting: {
    autoPostRate: 78.0, // "78.0%"
    autoPostedCount: 2480, // "2,480 of 3,179 auto-posted"
    totalTransactionsPosted: 3179,
  },
  performance: {
    avgProcessingTimeMinutes: 16.0, // "16.0 min"
    mtdComparison: {
      // screenshot shows "2.7% slower than last month" => positive 2.7
      percentageChange: 2.7,
    },
  },
  postingReports: {
    // Quality Rate 95.7% => exceptionRate = 100 - 95.7 = 4.3
    exceptionRate: 4.3,
    totalExceptions: 117,
  },
};

export function buildKpiCards(data: BackendKpi[]): KpiCardItem[] {
  return data?.map((item) => ({
    title: item.title,
    value: item.value && item.value !== "null" ? item.value : "--",
    description: item.subText?.text ?? "",
    iconName: item.topRightIcon ?? "TrendingUp",
    trend: item.trend,
  }));
}

export interface UserProductivity {
  userId: string;
  userName: string;
  tasksCompleted: number;
  avgTimeToResolution: number; // hours
  team: string;
  role: string;
}

export type WorkQueueDataPoint = {
  date: string;
  "New Items": number;
  "Completed Items": number;
  "Rollover Items": number;
};

export type ByDayOfWeekItem = {
  day: string;
  count: number;
  amount: number;
  percentage: number;
};

export type TrendPoint = {
  date: string; // YYYY-MM-DD
  count: number;
  amount: number;
};

export type RemitTypeItem = {
  type: string;
  count: number;
  transactionCount: number;
  totalAmount: number;
  percentage: number;
};

export type PostingByType = {
  type: string;
  count: number;
  totalAmount: number;
  percentage: number;
};

export type PostingByEmr = {
  emrName: string;
  transactionsPosted: number;
  totalAmount: number;
  percentage: number;
  byType: PostingByType[];
};

export const userProductivityData: UserProductivity[] = [
  {
    userId: "user-5",
    userName: "Pamela Cruz",
    tasksCompleted: 214,
    avgTimeToResolution: 14.4,
    team: "Denials",
    role: "Specialist",
  },
  {
    userId: "user-1",
    userName: "Logan Roberts",
    tasksCompleted: 208,
    avgTimeToResolution: 15.9,
    team: "Denials",
    role: "Senior Specialist",
  },
  {
    userId: "user-3",
    userName: "Joshua Gonzalez",
    tasksCompleted: 165,
    avgTimeToResolution: 15.6,
    team: "Denials",
    role: "Specialist",
  },
  {
    userId: "user-4",
    userName: "Christian Ramos",
    tasksCompleted: 142,
    avgTimeToResolution: 15.5,
    team: "Denials",
    role: "Specialist",
  },
  {
    userId: "user-2",
    userName: "Shirley Rogers",
    tasksCompleted: 135,
    avgTimeToResolution: 12.7,
    team: "Denials",
    role: "Senior Specialist",
  },
  {
    userId: "user-6",
    userName: "Pamela Turner",
    tasksCompleted: 206,
    avgTimeToResolution: 22.1,
    team: "Prior Auth",
    role: "Senior Specialist",
  },
  {
    userId: "user-8",
    userName: "Laura Harris",
    tasksCompleted: 185,
    avgTimeToResolution: 27.1,
    team: "Prior Auth",
    role: "Specialist",
  },
  {
    userId: "user-10",
    userName: "Tyler Nelson",
    tasksCompleted: 182,
    avgTimeToResolution: 28.2,
    team: "Prior Auth",
    role: "Specialist",
  },
  {
    userId: "user-9",
    userName: "Eugene Morris",
    tasksCompleted: 168,
    avgTimeToResolution: 25.9,
    team: "Prior Auth",
    role: "Specialist",
  },
  {
    userId: "user-7",
    userName: "William Richardson",
    tasksCompleted: 134,
    avgTimeToResolution: 22.2,
    team: "Prior Auth",
    role: "Senior Specialist",
  },
  {
    userId: "user-11",
    userName: "Rebecca Kim",
    tasksCompleted: 315,
    avgTimeToResolution: 10.3,
    team: "A/R Follow-up",
    role: "Senior Specialist",
  },
  {
    userId: "user-15",
    userName: "Janet Ward",
    tasksCompleted: 309,
    avgTimeToResolution: 9,
    team: "A/R Follow-up",
    role: "Specialist",
  },
  {
    userId: "user-13",
    userName: "Melissa Smith",
    tasksCompleted: 264,
    avgTimeToResolution: 10.3,
    team: "A/R Follow-up",
    role: "Specialist",
  },
  {
    userId: "user-14",
    userName: "Sara Stewart",
    tasksCompleted: 262,
    avgTimeToResolution: 9.5,
    team: "A/R Follow-up",
    role: "Specialist",
  },
  {
    userId: "user-12",
    userName: "Alan Bailey",
    tasksCompleted: 239,
    avgTimeToResolution: 8.3,
    team: "A/R Follow-up",
    role: "Senior Specialist",
  },
];

export const workQueueData: WorkQueueDataPoint[] = [
  {
    date: "2025-10-26",
    "New Items": 275,
    "Completed Items": 239,
    "Rollover Items": 55,
  },
  {
    date: "2025-10-27",
    "New Items": 187,
    "Completed Items": 283,
    "Rollover Items": 42,
  },
  {
    date: "2025-10-28",
    "New Items": 264,
    "Completed Items": 260,
    "Rollover Items": 45,
  },
  {
    date: "2025-10-29",
    "New Items": 243,
    "Completed Items": 221,
    "Rollover Items": 47,
  },
  {
    date: "2025-10-30",
    "New Items": 222,
    "Completed Items": 202,
    "Rollover Items": 42,
  },
  {
    date: "2025-10-31",
    "New Items": 86,
    "Completed Items": 79,
    "Rollover Items": 19,
  },
  {
    date: "2025-11-01",
    "New Items": 105,
    "Completed Items": 96,
    "Rollover Items": 18,
  },
  {
    date: "2025-11-02",
    "New Items": 208,
    "Completed Items": 175,
    "Rollover Items": 60,
  },
  {
    date: "2025-11-03",
    "New Items": 237,
    "Completed Items": 263,
    "Rollover Items": 41,
  },
  {
    date: "2025-11-04",
    "New Items": 237,
    "Completed Items": 294,
    "Rollover Items": 59,
  },
  {
    date: "2025-11-05",
    "New Items": 244,
    "Completed Items": 227,
    "Rollover Items": 51,
  },
  {
    date: "2025-11-06",
    "New Items": 286,
    "Completed Items": 265,
    "Rollover Items": 56,
  },
  {
    date: "2025-11-07",
    "New Items": 111,
    "Completed Items": 107,
    "Rollover Items": 18,
  },
  {
    date: "2025-11-08",
    "New Items": 77,
    "Completed Items": 115,
    "Rollover Items": 20,
  },
  {
    date: "2025-11-09",
    "New Items": 232,
    "Completed Items": 220,
    "Rollover Items": 49,
  },
  {
    date: "2025-11-10",
    "New Items": 208,
    "Completed Items": 188,
    "Rollover Items": 51,
  },
  {
    date: "2025-11-11",
    "New Items": 263,
    "Completed Items": 230,
    "Rollover Items": 54,
  },
  {
    date: "2025-11-12",
    "New Items": 283,
    "Completed Items": 188,
    "Rollover Items": 46,
  },
  {
    date: "2025-11-13",
    "New Items": 218,
    "Completed Items": 311,
    "Rollover Items": 62,
  },
  {
    date: "2025-11-14",
    "New Items": 104,
    "Completed Items": 106,
    "Rollover Items": 21,
  },
  {
    date: "2025-11-15",
    "New Items": 89,
    "Completed Items": 99,
    "Rollover Items": 17,
  },
  {
    date: "2025-11-16",
    "New Items": 217,
    "Completed Items": 272,
    "Rollover Items": 45,
  },
  {
    date: "2025-11-17",
    "New Items": 261,
    "Completed Items": 251,
    "Rollover Items": 56,
  },
  {
    date: "2025-11-18",
    "New Items": 277,
    "Completed Items": 277,
    "Rollover Items": 63,
  },
  {
    date: "2025-11-19",
    "New Items": 283,
    "Completed Items": 275,
    "Rollover Items": 44,
  },
  {
    date: "2025-11-20",
    "New Items": 252,
    "Completed Items": 319,
    "Rollover Items": 60,
  },
  {
    date: "2025-11-21",
    "New Items": 117,
    "Completed Items": 94,
    "Rollover Items": 21,
  },
  {
    date: "2025-11-22",
    "New Items": 92,
    "Completed Items": 80,
    "Rollover Items": 26,
  },
  {
    date: "2025-11-23",
    "New Items": 220,
    "Completed Items": 319,
    "Rollover Items": 53,
  },
  {
    date: "2025-11-24",
    "New Items": 293,
    "Completed Items": 314,
    "Rollover Items": 45,
  },
];
export const workQueueSegments = [
  { dataKey: "New Items", color: "#249563", label: "New Items" },
  { dataKey: "Completed Items", color: "#4CAF50", label: "Completed Items" },
  { dataKey: "Rollover Items", color: "#FF9800", label: "Rollover Items" },
];

export interface ExecutiveSummaryChartPoint {
  activityDate: string;
  statementCount: string | number;
  remitCount: string | number;
  postingCount: string | number;
}

export interface ExecutiveSummary {
  bankStatementsProcessed: string | number;
  bankStatementsSubtext: string;
  remittanceFilesCompleted: string | number | null;
  remittanceSubtext: string;
  postedTransactionsCount: string | number;
  postedTransactionsSubtext: string;
  automatedPostingIndex: string;
  automatedPostingSubtext: string;
  postingReportCount: string | number;
  postingReportSubtext: string;
  avgProcessingDuration: string;
  avgDurationSubtext: string;
  executiveSummaryChart: ExecutiveSummaryChartPoint[];
}

export interface BankStatementByDay {
  day: string;
  count: number;
  amount: string;
  percentage: string;
}

export interface BankStatements {
  statementsProcessed: number;
  statementsProcessedSubText: string;
  transactionsProcessed: number;
  transactionsProcessedSubText: string;
  totalAmount: number;
  avgTransactionsPerStatement: string;
  ytdAndMtdValues: string;
  ytdAndMtdValuesSubText: string;
  byDayOfWeek: BankStatementByDay[];
  trend: TrendPoint[];
}

export interface RemitByTypeItem {
  type: string;
  count: number;
  percentage: string;
}

export interface RemitDetailItem {
  type: string;
  count: number;
  amount: string;
}

export interface Remits {
  totalRemitsProcessed: number | null;
  byType: RemitByTypeItem[];
  details: RemitDetailItem[];
  trend: TrendPoint[];
}

export interface TransactionPostingByType {
  type: string;
  count: number;
}

export interface TransactionPostingByEmr {
  emrName: string;
  count: number;
  amount: number;
  percentage: number;
}

export interface TransactionPosting {
  byType: TransactionPostingByType[];
  byEmr: TransactionPostingByEmr[];
  trend: TrendPoint[];
}

export interface MtdComparison {
  currentMonth: string;
  lastMonth: string;
  percentageChange: string;
}

export interface ExceptionRateBlock {
  exceptionRatePercent: string;
  exceptionRateSubText: string;
  mtdExceptions: string;
  ytdExceptions: string;
}

export interface Performance {
  avgProcessingTimeMinutes: string;
  peakProcessingDay: string;
  peakProcessingHour: string;
  totalProcessingTimeHours: string;
  mtdComparison: MtdComparison;
  exceptionRate: ExceptionRateBlock;
  trend: TrendPoint[];
}

export interface RcmDashboardData {
  lastUpdated: string;
  executiveSummary: ExecutiveSummary;
  bankStatements: BankStatements;
  remits: Remits;
  transactionPosting: TransactionPosting;
  performance: Performance;
}

export interface RcmDashboardResponse {
  statusCode: number;
  message: string;
  data: RcmDashboardData;
}

export const rcmDashboardData: RcmDashboardResponse = {
  statusCode: 200,
  message: "Success",
  data: {
    lastUpdated: "2026-01-06T13:29:10.865220",
    executiveSummary: {
      bankStatementsProcessed: "27",
      bankStatementsSubtext: "2,735 transactions",
      remittanceFilesCompleted: "55",
      remittanceSubtext: "$4,000,705 total",
      postedTransactionsCount: "63",
      postedTransactionsSubtext: "$3,371,490 total",
      automatedPostingIndex: "94.1%",
      automatedPostingSubtext: "14,405 auto / 911 manual",
      postingReportCount: "0",
      postingReportSubtext: "926 transactions",
      avgProcessingDuration: "0.3 min",
      avgDurationSubtext: "60.0h total (Period)",
      executiveSummaryChart: [
        {
          activityDate: "2025-10-01",
          statementCount: "1",
          remitCount: "12",
          postingCount: "10",
        },
        {
          activityDate: "2025-10-02",
          statementCount: "1",
          remitCount: "8",
          postingCount: "35",
        },
        {
          activityDate: "2025-10-03",
          statementCount: "1",
          remitCount: "8",
          postingCount: "34",
        },
        {
          activityDate: "2025-10-04",
          statementCount: "0",
          remitCount: "1",
          postingCount: "0",
        },
        {
          activityDate: "2025-10-05",
          statementCount: "0",
          remitCount: "0",
          postingCount: "11",
        },
        {
          activityDate: "2025-10-06",
          statementCount: "1",
          remitCount: "1",
          postingCount: "59",
        },
        {
          activityDate: "2025-10-07",
          statementCount: "1",
          remitCount: "14",
          postingCount: "31",
        },
        {
          activityDate: "2025-10-08",
          statementCount: "1",
          remitCount: "10",
          postingCount: "18",
        },
        {
          activityDate: "2025-10-09",
          statementCount: "1",
          remitCount: "1",
          postingCount: "55",
        },
        {
          activityDate: "2025-10-10",
          statementCount: "1",
          remitCount: "0",
          postingCount: "27",
        },
        {
          activityDate: "2025-10-11",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-10-12",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-10-13",
          statementCount: "0",
          remitCount: "0",
          postingCount: "41",
        },
        {
          activityDate: "2025-10-14",
          statementCount: "2",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-10-15",
          statementCount: "1",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-10-16",
          statementCount: "1",
          remitCount: "0",
          postingCount: "47",
        },
        {
          activityDate: "2025-10-17",
          statementCount: "1",
          remitCount: "0",
          postingCount: "47",
        },
        {
          activityDate: "2025-10-18",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-10-19",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-10-20",
          statementCount: "1",
          remitCount: "0",
          postingCount: "68",
        },
        {
          activityDate: "2025-10-21",
          statementCount: "2",
          remitCount: "0",
          postingCount: "45",
        },
        {
          activityDate: "2025-10-22",
          statementCount: "1",
          remitCount: "0",
          postingCount: "9",
        },
        {
          activityDate: "2025-10-23",
          statementCount: "1",
          remitCount: "0",
          postingCount: "130",
        },
        {
          activityDate: "2025-10-24",
          statementCount: "1",
          remitCount: "0",
          postingCount: "39",
        },
        {
          activityDate: "2025-10-25",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-10-26",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-10-27",
          statementCount: "1",
          remitCount: "0",
          postingCount: "36",
        },
        {
          activityDate: "2025-10-28",
          statementCount: "1",
          remitCount: "0",
          postingCount: "38",
        },
        {
          activityDate: "2025-10-29",
          statementCount: "1",
          remitCount: "0",
          postingCount: "34",
        },
        {
          activityDate: "2025-10-30",
          statementCount: "1",
          remitCount: "0",
          postingCount: "40",
        },
        {
          activityDate: "2025-10-31",
          statementCount: "1",
          remitCount: "0",
          postingCount: "23",
        },
        {
          activityDate: "2025-11-01",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-02",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-03",
          statementCount: "0",
          remitCount: "0",
          postingCount: "49",
        },
        {
          activityDate: "2025-11-04",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-05",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-06",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-07",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-08",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-09",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-10",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-11",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-12",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-13",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-14",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-15",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-16",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-17",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-18",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-19",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-20",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-21",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-22",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-23",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-24",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-25",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-26",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-27",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-28",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-29",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-11-30",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-01",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-02",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-03",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-04",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-05",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-06",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-07",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-08",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-09",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-10",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-11",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-12",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-13",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-14",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-15",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-16",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-17",
          statementCount: "3",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-18",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-19",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-20",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-21",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-22",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-23",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
        {
          activityDate: "2025-12-24",
          statementCount: "0",
          remitCount: "0",
          postingCount: "0",
        },
      ],
    },
    bankStatements: {
      statementsProcessed: 27,
      statementsProcessedSubText: "101 avg txns/statement",
      transactionsProcessed: 2735,
      transactionsProcessedSubText: "$-24,373,865",
      totalAmount: -24373865,
      avgTransactionsPerStatement: "101 avg txns/statement",
      ytdAndMtdValues: "27 / 27",
      ytdAndMtdValuesSubText: "2,735 / 2,735",
      byDayOfWeek: [
        {
          day: "Monday",
          count: 3,
          amount: "$-7,174,620",
          percentage: "11.1%",
        },
        {
          day: "Tuesday",
          count: 6,
          amount: "$5,883,155",
          percentage: "22.2%",
        },
        {
          day: "Wednesday",
          count: 8,
          amount: "$-23,040,282",
          percentage: "29.6%",
        },
        {
          day: "Thursday",
          count: 5,
          amount: "$-18,288,214",
          percentage: "18.5%",
        },
        {
          day: "Friday",
          count: 5,
          amount: "$18,246,096",
          percentage: "18.5%",
        },
        {
          day: "Saturday",
          count: 0,
          amount: "$0",
          percentage: "0.0%",
        },
        {
          day: "Sunday",
          count: 0,
          amount: "$0",
          percentage: "0.0%",
        },
      ],
      trend: [
        {
          date: "2025-10-01",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-02",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-03",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-04",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-05",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-06",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-07",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-08",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-09",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-10",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-11",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-12",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-13",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-14",
          count: 2,
          amount: 0.0,
        },
        {
          date: "2025-10-15",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-16",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-17",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-18",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-19",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-20",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-21",
          count: 2,
          amount: 0.0,
        },
        {
          date: "2025-10-22",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-23",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-24",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-25",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-26",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-27",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-28",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-29",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-30",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-31",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-11-01",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-02",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-03",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-04",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-05",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-06",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-07",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-08",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-09",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-10",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-11",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-12",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-13",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-14",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-15",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-16",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-17",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-18",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-19",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-20",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-21",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-22",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-23",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-24",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-25",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-26",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-27",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-28",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-29",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-30",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-01",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-02",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-03",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-04",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-05",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-06",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-07",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-08",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-09",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-10",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-11",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-12",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-13",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-14",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-15",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-16",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-17",
          count: 3,
          amount: 0.0,
        },
        {
          date: "2025-12-18",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-19",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-20",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-21",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-22",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-23",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-24",
          count: 0,
          amount: 0.0,
        },
      ],
    },
    remits: {
      totalRemitsProcessed: null,
      byType: [
        {
          type: "835 ERA",
          count: 55,
          percentage: "100.0%",
        },
      ],
      details: [
        {
          type: "835 ERA",
          count: 55,
          amount: "$4,000,705",
        },
      ],
      trend: [
        {
          date: "2025-10-01",
          count: 12,
          amount: 0.0,
        },
        {
          date: "2025-10-02",
          count: 8,
          amount: 0.0,
        },
        {
          date: "2025-10-03",
          count: 8,
          amount: 0.0,
        },
        {
          date: "2025-10-04",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-05",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-06",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-07",
          count: 14,
          amount: 0.0,
        },
        {
          date: "2025-10-08",
          count: 10,
          amount: 0.0,
        },
        {
          date: "2025-10-09",
          count: 1,
          amount: 0.0,
        },
        {
          date: "2025-10-10",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-11",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-12",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-13",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-14",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-15",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-16",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-17",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-18",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-19",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-20",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-21",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-22",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-23",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-24",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-25",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-26",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-27",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-28",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-29",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-30",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-10-31",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-01",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-02",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-03",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-04",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-05",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-06",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-07",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-08",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-09",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-10",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-11",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-12",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-13",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-14",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-15",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-16",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-17",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-18",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-19",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-20",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-21",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-22",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-23",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-24",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-25",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-26",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-27",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-28",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-29",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-11-30",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-01",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-02",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-03",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-04",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-05",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-06",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-07",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-08",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-09",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-10",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-11",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-12",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-13",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-14",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-15",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-16",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-17",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-18",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-19",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-20",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-21",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-22",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-23",
          count: 0,
          amount: 0.0,
        },
        {
          date: "2025-12-24",
          count: 0,
          amount: 0.0,
        },
      ],
    },
    transactionPosting: {
      byType: [
        {
          type: "Payment",
          count: 1367,
        },
        {
          type: "Adjustment",
          count: 1,
        },
        {
          type: "Charge",
          count: 15018,
        },
        {
          type: "Refund",
          count: 0,
        },
        {
          type: "Transfer",
          count: 0,
        },
        {
          type: "Write-off",
          count: 752,
        },
      ],
      byEmr: [
        {
          emrName: "Epic",
          count: 671,
          amount: 36728150.94,
          percentage: 100,
        },
      ],
      trend: [
        {
          date: "2025-10-01",
          count: 9,
          amount: 0.0,
        },
        {
          date: "2025-10-02",
          count: 6,
          amount: 0.0,
        },
        {
          date: "2025-10-06",
          count: 24,
          amount: 0.0,
        },
        {
          date: "2025-10-09",
          count: 15,
          amount: 0.0,
        },
        {
          date: "2025-10-10",
          count: 9,
          amount: 0.0,
        },
      ],
    },
    performance: {
      avgProcessingTimeMinutes: "0.3 min",
      peakProcessingDay: "Monday",
      peakProcessingHour: "05:00",
      totalProcessingTimeHours: "60.0 hours",
      mtdComparison: {
        currentMonth: "63",
        lastMonth: "0",
        percentageChange: "+0.00%",
      },
      exceptionRate: {
        exceptionRatePercent: "5.9%",
        exceptionRateSubText: "911 exceptions out of 15,316 transactions",
        mtdExceptions: "0",
        ytdExceptions: "911",
      },
      trend: [
        {
          date: "2025-10-01",
          count: 9,
          amount: 0.0,
        },
        {
          date: "2025-10-02",
          count: 6,
          amount: 0.0,
        },
        {
          date: "2025-10-06",
          count: 24,
          amount: 0.0,
        },
        {
          date: "2025-10-09",
          count: 15,
          amount: 0.0,
        },
        {
          date: "2025-10-10",
          count: 9,
          amount: 0.0,
        },
      ],
    },
  },
};
