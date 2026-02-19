import { useState, useMemo, useEffect } from "react";
import { type Cash_Posting_Transaction } from "@/constants/TableData";
import { API_ENDPOINTS } from "@/config/api";
import { buildColumns } from "@/utils/buildColumns";
import { CASH_POSTING_COLUMN_LABELS } from "@/constants/TableData";
import { validateDateRange } from "@/utils/dateRangeValidator";
import { truncateWithTooltip } from "@/utils/truncatedTooltipRenderer";
import { valueWithInfoIcon } from "@/utils/valueWithInfoIcon";
import { formatDate } from "@/utils/formate";

export const useCashPostingQueueLogic = () => {
  const [toggle, setToggle] = useState("dateRange");
  const [from, setFrom] = useState("2025-01-01");
  const [to, setTo] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["CH"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState<Cash_Posting_Transaction[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    row: any;
    type: any;
    details: null;
  }>({ row: null, type: null, details: null });
  const [loadingData, setLoadingData] = useState(false);
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
      const response = await fetch(API_ENDPOINTS.CASH_POSTING_QUEUE, {
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
    const data = searchTerm
      ? tableData.filter((t) =>
          t.payerName?.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : tableData;

    return data.map((item) => ({
      ...item,
      attemptedOn: formatDate(item?.attemptedOn),
    }));
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

  const handleBrandToggle = (region: string) => {
    setSelectedBrands((prev) =>
      prev.includes(region)
        ? prev.filter((b) => b !== region)
        : [...prev, region],
    );
    setCurrentPage(1);
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
  const handleColumnClick = async (row: any, api: any, type: any) => {
    const checkNo = row?.cheque;
    setOpen(true);
    setLoadingData(true);
    try {
      const response = await fetch(`${api}?checkNo=${checkNo}`);
      const data = await response.json();
      setModalData({
        type,
        row,
        details: data,
      });
    } catch (error) {
      console.error("Failed to fetch bank deposit details", error);
      setModalData({
        type,
        row,
        details: null,
      });
    } finally {
      setLoadingData(false);
    }
  };
  const blueTextRule = {
    conditionalClassName: () => "text-[#0090FF]",
  };

  const columnRules: Record<
    string,
    {
      bodyClassName?: string;
      conditionalClassName?: (
        value: unknown,
        row: Cash_Posting_Transaction,
      ) => string;
      render?: (value: unknown, row: any) => React.ReactNode;
      clickable?: boolean;
      onClick?: (value: unknown, row: any) => void;
    }
  > = {
    payerName: {
      bodyClassName: "max-w-[120px]",
      render: (value: unknown) => truncateWithTooltip(value, { limit: 6 }),
    },
    cheque: {
      ...blueTextRule,
      clickable: true,
      render: (value) =>
        valueWithInfoIcon(value, { tooltipText: "View Check Details" }),
      onClick: (_value: any, row: any) => {
        handleColumnClick(
          row,
          API_ENDPOINTS?.CASH_POSTING_CHECK_DETAILS,
          "Check",
        );
      },
    },
  };
  const columns = useMemo(
    () =>
      buildColumns<Cash_Posting_Transaction>({
        tableData,
        labelMap: CASH_POSTING_COLUMN_LABELS,
        excludeKeys: ["cashPostingId", "region"],
        amountFields: ["totalAmount", "postedAmount", "remittance"],
        columnRules,
      }),
    [tableData],
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
    selectedBrands,
    handleBrandToggle,
    handleExport,
    currentPage,
    totalPages,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    tableLoading,
    tableData,
    open,
    setOpen,
    modalData,
    loadingData,
  };
};
