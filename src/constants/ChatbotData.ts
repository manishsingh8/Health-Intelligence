export const USE_MOCK_DATA = false;

export const MOCK_CHAT_RESPONSE = {
  reply: "The BAI files status report shows that all listed files have been processed. The number of transactions found in each file ranges from 73 to 161.",
  sql: "SELECT pk_bai_files_status_id, fk_bai_file_scheduler_tracking_id, file_name, is_file_processed, no_of_txns_found, no_of_txns_recorded, no_of_txns_with_incomplete_info, file_processed_on, created_on FROM bai_files_status LIMIT 200",
  rows: [
    { pk_bai_files_status_id: 44, fk_bai_file_scheduler_tracking_id: 16051, file_name: "09.30.2025 bank activity for CH.xlsx", is_file_processed: 1, no_of_txns_found: 107, no_of_txns_recorded: 33, no_of_txns_with_incomplete_info: 107, file_processed_on: "2025-10-01T11:40:06", created_on: "2025-10-01T10:40:00" },
    { pk_bai_files_status_id: 45, fk_bai_file_scheduler_tracking_id: 16075, file_name: "10.01.2025 bank activity for CH.xlsx", is_file_processed: 1, no_of_txns_found: 94, no_of_txns_recorded: 30, no_of_txns_with_incomplete_info: 94, file_processed_on: "2025-10-02T11:40:04", created_on: "2025-10-02T10:40:00" },
    { pk_bai_files_status_id: 46, fk_bai_file_scheduler_tracking_id: 16099, file_name: "10.02.2025 bank activity for CH.xlsx", is_file_processed: 1, no_of_txns_found: 129, no_of_txns_recorded: 34, no_of_txns_with_incomplete_info: 129, file_processed_on: "2025-10-03T11:40:04", created_on: "2025-10-03T10:40:00" },
    { pk_bai_files_status_id: 47, fk_bai_file_scheduler_tracking_id: 16171, file_name: "10.03.2025 bank activity for CH.xlsx", is_file_processed: 1, no_of_txns_found: 113, no_of_txns_recorded: 43, no_of_txns_with_incomplete_info: 113, file_processed_on: "2025-10-06T11:40:02", created_on: "2025-10-06T10:40:00" },
    { pk_bai_files_status_id: 48, fk_bai_file_scheduler_tracking_id: 16195, file_name: "10.06.2025 bank activity for CH.xlsx", is_file_processed: 1, no_of_txns_found: 116, no_of_txns_recorded: 31, no_of_txns_with_incomplete_info: 116, file_processed_on: "2025-10-07T11:40:02", created_on: "2025-10-07T10:40:00" },
  ],
};
