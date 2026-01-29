export interface CDMDocument {
  id: string;
  splitFileName: string;
  classification: string;
  payer: string;
  assignee: string;
  batchDate: string;
  processedDate: string;
  tags: string[];
  status: string;
}
