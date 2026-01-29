export const getFileLevelFields = (data: any) => {
  return [
    { label: "Payer Name", value: data?.payerName ?? "N/A" },
    { label: "Deposit Date", value: data?.depositDate ?? "N/A" },
    { label: "Check Number", value: data?.checkNumber ?? "N/A" },
    { label: "Number of Pages", value: data?.numberOfPages ?? "N/A" },
    { label: "Patient Count", value: data?.patientCount ?? "N/A" },
    { label: "Document Age", value: data?.documentAge ?? "N/A" },
    { label: "Confidence Score", value: data?.confidenceScore ?? "N/A" },
    { label: "Letter Name", value: data?.letterName ?? "N/A" },
  ];
}

export default getFileLevelFields;

export const mockFileLevelData = {
  id: "1",
  fileName: "EOB_835_123456789.pdf",
  uploadDate: "2023-10-27",
  status: "Processed",
  payerName: "-",
  depositDate: "12-12-2024",
  checkNumber: "451_2",
  checkAmount: "$1,250.00",
  numberOfPages: "3 Pages",
  patientCount: "Only N/A Patient",
  documentAge: "291 days ago",
  confidenceScore: "100.00",
  letterName: "N/A"
};

export interface PatientData {
  id: string;
  visitId: string;
  patientName: string;
  paidAmount: string;
  payerName: string;
  checkDate: string;
  claimNumber: string;
  checkNumber: string;
}

export interface LineLevelData {
  id: string;
  eobPatientLevelDataId: string;
  serviceStartDate: string;
  serviceEndDate: string;
  procedureCode: string;
  billedAmount: string;
  allowedAmount: string;
  coveredAmount: string;
  notCoveredAmount: string;
  discountAmount: string;
  adjustmentAmount: string;
  coPay: string;
  coInsurance: string;
  deductibleAmount: string;
  patientResponsibility: string;
  deniedAmount: string;
  reasonCodes: string;
  remarkCodes: string;
  description: string;
}

export interface PatientsData {
  patientLevelData: PatientData[];
  lineLevelData: LineLevelData[];
}


export const mockPatientOptions = [
  { id: "p1", patientName: "John Doe" },
  { id: "p2", patientName: "Jane Smith" },
  { id: "p3", patientName: "Robert Wilson" },
];


export const mockPatientLevelData: PatientData[] = [
  {
    id: "p1",
    visitId: "VIS-001",
    patientName: "John Doe",
    paidAmount: "350.00",
    payerName: "UnitedHealthcare",
    checkDate: "2023-10-15",
    claimNumber: "CLM-2023-001",
    checkNumber: "CHK-78901",
  },
  {
    id: "p2",
    visitId: "VIS-002",
    patientName: "Jane Smith",
    paidAmount: "900.00",
    payerName: "Blue Cross Blue Shield",
    checkDate: "2023-10-18",
    claimNumber: "CLM-2023-002",
    checkNumber: "CHK-78902",
  },
  {
    id: "p3",
    visitId: "VIS-003",
    patientName: "Robert Wilson",
    paidAmount: "1250.00",
    payerName: "Aetna",
    checkDate: "2023-10-20",
    claimNumber: "CLM-2023-003",
    checkNumber: "CHK-78903",
  },
];

export const mockLineLevelData: LineLevelData[] = [
  {
    id: "ll1",
    eobPatientLevelDataId: "p1",
    serviceStartDate: "2023-09-01",
    serviceEndDate: "2023-09-01",
    procedureCode: "99213",
    billedAmount: "150.00",
    allowedAmount: "120.00",
    coveredAmount: "100.00",
    notCoveredAmount: "20.00",
    discountAmount: "30.00",
    adjustmentAmount: "10.00",
    coPay: "25.00",
    coInsurance: "10%",
    deductibleAmount: "0.00",
    patientResponsibility: "35.00",
    deniedAmount: "0.00",
    reasonCodes: "CO-45",
    remarkCodes: "N362",
    description: "Office visit - established patient",
  },
  {
    id: "ll2",
    eobPatientLevelDataId: "p1",
    serviceStartDate: "2023-09-15",
    serviceEndDate: "2023-09-15",
    procedureCode: "99214",
    billedAmount: "200.00",
    allowedAmount: "180.00",
    coveredAmount: "150.00",
    notCoveredAmount: "30.00",
    discountAmount: "20.00",
    adjustmentAmount: "15.00",
    coPay: "25.00",
    coInsurance: "10%",
    deductibleAmount: "0.00",
    patientResponsibility: "40.00",
    deniedAmount: "0.00",
    reasonCodes: "CO-45",
    remarkCodes: "N519",
    description: "Office visit - detailed evaluation",
  },
  {
    id: "ll3",
    eobPatientLevelDataId: "p2",
    serviceStartDate: "2023-09-10",
    serviceEndDate: "2023-09-10",
    procedureCode: "99215",
    billedAmount: "300.00",
    allowedAmount: "275.00",
    coveredAmount: "250.00",
    notCoveredAmount: "25.00",
    discountAmount: "25.00",
    adjustmentAmount: "20.00",
    coPay: "30.00",
    coInsurance: "15%",
    deductibleAmount: "50.00",
    patientResponsibility: "80.00",
    deniedAmount: "0.00",
    reasonCodes: "PR-1",
    remarkCodes: "MA130",
    description: "Office visit - comprehensive evaluation",
  },
  {
    id: "ll4",
    eobPatientLevelDataId: "p2",
    serviceStartDate: "2023-09-22",
    serviceEndDate: "2023-09-22",
    procedureCode: "90837",
    billedAmount: "450.00",
    allowedAmount: "400.00",
    coveredAmount: "350.00",
    notCoveredAmount: "50.00",
    discountAmount: "50.00",
    adjustmentAmount: "25.00",
    coPay: "40.00",
    coInsurance: "20%",
    deductibleAmount: "0.00",
    patientResponsibility: "110.00",
    deniedAmount: "0.00",
    reasonCodes: "CO-97",
    remarkCodes: "N56",
    description: "Psychotherapy, 60 minutes",
  },
  {
    id: "ll5",
    eobPatientLevelDataId: "p3",
    serviceStartDate: "2023-09-05",
    serviceEndDate: "2023-09-05",
    procedureCode: "99203",
    billedAmount: "250.00",
    allowedAmount: "225.00",
    coveredAmount: "200.00",
    notCoveredAmount: "25.00",
    discountAmount: "25.00",
    adjustmentAmount: "15.00",
    coPay: "35.00",
    coInsurance: "10%",
    deductibleAmount: "100.00",
    patientResponsibility: "145.00",
    deniedAmount: "0.00",
    reasonCodes: "PR-2",
    remarkCodes: "N381",
    description: "Office visit - new patient, low complexity",
  },
  {
    id: "ll6",
    eobPatientLevelDataId: "p3",
    serviceStartDate: "2023-09-12",
    serviceEndDate: "2023-09-12",
    procedureCode: "99204",
    billedAmount: "350.00",
    allowedAmount: "320.00",
    coveredAmount: "280.00",
    notCoveredAmount: "40.00",
    discountAmount: "30.00",
    adjustmentAmount: "20.00",
    coPay: "35.00",
    coInsurance: "10%",
    deductibleAmount: "0.00",
    patientResponsibility: "55.00",
    deniedAmount: "0.00",
    reasonCodes: "CO-42",
    remarkCodes: "M15",
    description: "Office visit - new patient, moderate complexity",
  },
  {
    id: "ll7",
    eobPatientLevelDataId: "p3",
    serviceStartDate: "2023-09-25",
    serviceEndDate: "2023-09-25",
    procedureCode: "99205",
    billedAmount: "500.00",
    allowedAmount: "450.00",
    coveredAmount: "400.00",
    notCoveredAmount: "50.00",
    discountAmount: "50.00",
    adjustmentAmount: "30.00",
    coPay: "35.00",
    coInsurance: "10%",
    deductibleAmount: "0.00",
    patientResponsibility: "65.00",
    deniedAmount: "20.00",
    reasonCodes: "CO-16, PR-96",
    remarkCodes: "N115, MA01",
    description: "Office visit - new patient, high complexity",
  },
];

export const mockPatientsData: PatientsData = {
  patientLevelData: mockPatientLevelData,
  lineLevelData: mockLineLevelData,
};

export const documentSteps = [
  { label: 'Classification', isCompleted: true },
  { label: 'Data Extraction', isCompleted: true },
  { label: 'iCAN Data Verification', isCompleted: true },
  { label: 'User Validation', isCompleted: false },
  { label: 'Process', isCompleted: false },
];

export const MOCK_FILTER_DATA = {
  classification: [
    { id: 1, classificationType: "EOB" },
    { id: 2, classificationType: "ERA" },
    { id: 3, classificationType: "Correspondence" },
    { id: 4, classificationType: "Medical Records" },
    { id: 5, classificationType: "Appeal" },
    { id: 6, classificationType: "Other" },
  ],
  payerPortals: [
    { id: 1, payerName: "UHC" },
    { id: 2, payerName: "Aetna" },
    { id: 3, payerName: "Blue Cross Blue Shield" },
    { id: 4, payerName: "Cigna" },
    { id: 5, payerName: "Medicare" },
    { id: 6, payerName: "Medicaid" },
    { id: 7, payerName: "Humana" },
    { id: 8, payerName: "Kaiser Permanente" },
  ],
  tags: [
    "Urgent",
    "Review Required",
    "Follow-up",
    "Completed",
    "Pending Info",
    "Escalated",
    "Duplicate",
  ],
  status: [
    { id: 1, statusName: "Processed" },
    { id: 2, statusName: "Ready to Process" },
    { id: 3, statusName: "Waiting for User Validation" },
    { id: 4, statusName: "Found-Not Posted" },
    { id: 5, statusName: "Not Found-Not Posted" },
    { id: 6, statusName: "Found-Partially Posted" },
  ],
  users: [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Robert Wilson" },
    { id: 4, name: "Sarah Johnson" },
    { id: 5, name: "Michael Brown" },
    { id: 6, name: "Emily Davis" },
    { id: 7, name: "Chris Miller" },
    { id: 8, name: "Amanda Lee" },
  ],
  searchField: [
    "File Name",
    "Payer Name",
    "Claim ID",
    "Patient Name",
    "Provider Name",
  ]
};

export const COOKED_CDM_DATA = [
  {
    id: "CDM-1001",
    splitFileName: "UHC_EOB_20231220_001.pdf",
    classification: "EOB",
    payer: "UHC",
    assignee: "John Doe",
    batchDate: "12-20-2023",
    processedDate: "12-21-2023",
    tags: ["Urgent", "Review Required"],
    status: "Processed"
  },
  {
    id: "CDM-1002",
    splitFileName: "AETNA_ERA_20231220_042.pdf",
    classification: "ERA",
    payer: "Aetna",
    assignee: "Jane Smith",
    batchDate: "12-20-2023",
    processedDate: "12-20-2023",
    tags: ["Follow-up"],
    status: "Ready to Process"
  },
  {
    id: "CDM-1003",
    splitFileName: "CIGNA_CORR_20231219_089.pdf",
    classification: "Correspondence",
    payer: "Cigna",
    assignee: "Robert Wilson",
    batchDate: "12-19-2023",
    processedDate: "12-20-2023",
    tags: ["Pending Info"],
    status: "Waiting for User Validation"
  },
  {
    id: "CDM-1004",
    splitFileName: "MEDICARE_MR_20231218_112.pdf",
    classification: "Medical Records",
    payer: "Medicare",
    assignee: "Sarah Johnson",
    batchDate: "12-18-2023",
    processedDate: "12-19-2023",
    tags: ["Completed"],
    status: "Found-Not Posted"
  },
  {
    id: "CDM-1005",
    splitFileName: "HUMANA_APPEAL_20231217_056.pdf",
    classification: "Appeal",
    payer: "Humana",
    assignee: "Michael Brown",
    batchDate: "12-17-2023",
    processedDate: "12-18-2023",
    tags: ["Escalated"],
    status: "Not Found-Not Posted"
  },
  {
    id: "CDM-1006",
    splitFileName: "BCBS_EOB_20231221_005.pdf",
    classification: "EOB",
    payer: "Blue Cross Blue Shield",
    assignee: "Emily Davis",
    batchDate: "12-21-2023",
    processedDate: "--",
    tags: ["Urgent"],
    status: "Ready to Process"
  }
];

export const mockSplitData = [
  { letterId: 101, classificationType: "EOB", pageRange: "1-2" },
  { letterId: 102, classificationType: "Medical Records", pageRange: "3-5" },
];

export const mockClassifications = [
  { id: 1, classificationType: "Acknowledgement" },
  { id: 2, classificationType: "EOB" },
  { id: 3, classificationType: "Medical Records" },
  { id: 4, classificationType: "Appeal" },
  { id: 5, classificationType: "Denial" },
];
