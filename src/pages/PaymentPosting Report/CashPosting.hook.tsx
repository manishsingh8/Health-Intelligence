import { useState, useMemo, useEffect } from "react";
import { type Cash_Posting_Transaction } from "@/constants/TableData";
import { API_ENDPOINTS } from "@/config/api";
import { buildColumns } from "@/utils/buildColumns";
import { CASH_POSTING_REPORT_COLUMN_LABELS } from "@/constants/TableData";
import { validateDateRange } from "@/utils/dateRangeValidator";

export const useCashPostingLogic = () => {
  const [toggle, setToggle] = useState("dateRange");
  const [from, setFrom] = useState("2025-01-01");
  const [to, setTo] = useState("2025-10-30");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState<Cash_Posting_Transaction[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const fetchTable = async () => {
    if (!validateDateRange({ from, to })) return;
    try {
      setTableLoading(true);
      const payload = {
        fromDate: from,
        toDate: to,
        pageNo: currentPage,
        pageSize: rowsPerPage,
      };
      const response = await fetch(API_ENDPOINTS.CASH_POSTING_REPORT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to fetch table data");
      const tableRes = await response.json();
      setTableData(tableRes?.data ?? []);
    } catch (error) {
      console.error("Table API error:", error);
      setTableData([]);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchTable();
  }, [from, to, rowsPerPage, currentPage]);
  const filteredData = useMemo(() => {
    if (!searchTerm) return tableData;
    return tableData.filter((t) =>
      t.payerName?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [tableData, searchTerm]);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  // const startIndex = (currentPage - 1) * rowsPerPage;

  const paginatedData = filteredData;
  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  const handleSelectAll = () => {
    if (
      selectedRows.size === paginatedData.length &&
      paginatedData.length > 0
    ) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(
        new Set(paginatedData.map((row) => String(row.cashPostingId))),
      );
    }
  };
  const handleExport = () => {
    if (!tableData.length) return;

    const headers = Object.keys(tableData[0]);
    const rows = filteredData.map((t) =>
      headers.map((key) => t[key as keyof Cash_Posting_Transaction]),
    );
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tableData.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };
  const columnRules: Record<
    string,
    {
      bodyClassName?: string;
      conditionalClassName?: (
        value: unknown,
        row: Cash_Posting_Transaction,
      ) => string;
    }
  > = {
    status: {
      conditionalClassName: (value) => {
        if (typeof value !== "string") return "";
        switch (value) {
          case "Partially Posted":
            return "text-[#FF9500] bg-yellow-100 px-2 py-1 rounded-[6px]";
          case "Fully Posted":
            return "text-[#34A255] bg-green-100 px-2 py-1 rounded-[6px]";
          case "Exception":
            return "text-[#E63435] bg-red-100 px-2 py-1 rounded-[6px]";
          default:
            return "";
        }
      },
    },
    cheque: { conditionalClassName: () => "text-[#0090FF]" },
    variance: { conditionalClassName: () => "text-[#E63435]" },
    reason: {
      conditionalClassName: () =>
        "text-[#E63435] px-2 py-1 rounded-[6px] mx-auto",
    },
  };
  const columns = useMemo(
    () =>
      buildColumns<Cash_Posting_Transaction>({
        tableData,
        labelMap: CASH_POSTING_REPORT_COLUMN_LABELS,
        excludeKeys: ["cashPostingId", "region"],
        amountFields: ["totalAmount", "postedAmount", "remittance"],
        // columnRules,
      }),
    [tableData, columnRules],
  );

  return {
    toggle,
    setToggle,
    from,
    setFrom,
    to,
    setTo,
    paginatedData,
    columns,
    selectedRows,
    setSelectedRows,
    handleRowSelect,
    handleSelectAll,
    searchTerm,
    setSearchTerm,
    handleExport,
    currentPage,
    totalPages,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    tableLoading,
  };
};
