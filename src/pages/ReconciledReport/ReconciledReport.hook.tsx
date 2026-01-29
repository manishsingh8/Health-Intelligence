import { useState, useMemo, useEffect } from "react";
import { type ReconciledTransaction } from "@/constants/TableData";
import { mapPaymentCardsWithBg } from "@/utils/mapObjectToPaymentCard";
import { API_ENDPOINTS } from "@/config/api";
import { buildColumns } from "@/utils/buildColumns";
import {
  RECONCILED_REPORT_COLUMN_LABELS,
  RECONCILED_REPORT_HEADER_TEXT,
} from "@/constants/TableData";
import { validateDateRange } from "@/utils/dateRangeValidator";

type VarianceWidgetResponse = {
  data?: {
    headerText: string;
    amount: string;
  }[];
  totalClaims?: number;
  totalAmount?: number;
  pendingCount?: number;
  exceptionCount?: number;
};

export const useReconciledReportLogic = () => {
  const [toggle, setToggle] = useState("dateRange");
  const [from, setFrom] = useState("2025-01-01");
  const [to, setTo] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  const [selectedPayer, setSelectedPayer] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["CH"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedData, setEditedData] = useState<
    Partial<ReconciledTransaction>[]
  >([]);
  const [payerOptions, setPayerOptions] = useState([
    { value: "all", label: "All Payers" },
  ]);
  const [widgetData, setWidgetData] = useState<VarianceWidgetResponse | null>(
    null,
  );
  const [widgetLoading, setWidgetLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState<ReconciledTransaction[]>([]);

  const fetchPayers = async () => {
    if (!validateDateRange({ from, to })) return;
    try {
      const res = await fetch(API_ENDPOINTS.PAYERS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
      if (!res.ok) throw new Error("Payer API failed");
      const response = await res.json();
      const mapped =
        response?.data?.map((payer: any) => ({
          value: payer.id,
          label: payer.name,
        })) ?? [];

      setPayerOptions([{ value: "all", label: "All Payers" }, ...mapped]);
    } catch (error) {
      console.error("Payer API error", error);
    }
  };
  const getPayerIds = () => {
    if (selectedPayer === "all") {
      return payerOptions.filter((p) => p.value !== "all").map((p) => p.value);
    }
    return [selectedPayer];
  };

  const fetchVarianceWidget = async () => {
    if (!validateDateRange({ from, to })) return;
    const payload = {
      fromDate: from,
      toDate: to,
      payerIds: getPayerIds(),
      statusIds: null,
      pageNo: currentPage,
      pageSize: rowsPerPage,
    };

    try {
      setWidgetLoading(true);
      setTableLoading(true);

      const [widgetRes, tableRes] = await Promise.allSettled([
        fetch(API_ENDPOINTS.RECONCILED_WIDGET, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify(payload),
        }),
        fetch(API_ENDPOINTS.RECONCILED_TABLE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify(payload),
        }),
      ]);

      if (widgetRes.status === "fulfilled" && widgetRes.value.ok) {
        const widgetData = await widgetRes.value.json();
        setWidgetData(widgetData);
      } else {
        console.error("Widget API failed", widgetRes);
        setWidgetData(null);
      }
      if (tableRes.status === "fulfilled" && tableRes.value.ok) {
        const tableData = await tableRes.value.json();
        setTableData(tableData?.data || []);
      } else {
        console.error("Table API failed", tableRes);
        setTableData([]);
      }
    } catch (error) {
      console.error("Variance API error:", error);
    } finally {
      setWidgetLoading(false);
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchPayers();
  }, []);
  useEffect(() => {
    fetchVarianceWidget();
  }, [from, to, selectedPayer, selectedStatus, rowsPerPage, currentPage]);

  const filteredData = useMemo(() => {
    return tableData.filter((t) => {
      const matchesSearch =
        String(t.transactionNo || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(t.payerName || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(t.account || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [tableData, selectedBrands, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData;

  const reconciledCardsData = useMemo(() => {
    if (!widgetData?.data) return [];
    return mapPaymentCardsWithBg(
      widgetData?.data,
      RECONCILED_REPORT_HEADER_TEXT,
    );
  }, [widgetData]);

  const handleRowSelect = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (
      selectedRows.size === paginatedData.length &&
      paginatedData.length > 0
    ) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(
        new Set(paginatedData.map((row) => String(row.reconciledDataId))),
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
    const headers = Object.keys(tableData[0]);
    const rows = filteredData.map((t) =>
      headers.map((key) => t[key as keyof typeof t]),
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

  const handleEditClick = () => {
    if (selectedRows.size > 0) {
      const selectedRowsData = paginatedData.filter((row) =>
        selectedRows.has(String(row.id)),
      );
      setEditedData(
        selectedRowsData.map((row) => ({
          ...row,
        })),
      );
      setIsEditModalOpen(true);
    }
  };

  const handleFieldChange = (
    rowIndex: number,
    field: keyof ReconciledTransaction,
    value: unknown,
  ) => {
    const updated = [...editedData];
    updated[rowIndex] = {
      ...updated[rowIndex],
      [field]: value,
    };
    setEditedData(updated);
  };

  const handleEditSubmit = () => {
    console.log("Updated data:", editedData);
    setIsEditModalOpen(false);
    setEditedData([]);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditedData([]);
  };

  const columnRules: Record<
    string,
    {
      bodyClassName?: string;
      conditionalClassName?: (
        value: unknown,
        row: ReconciledTransaction,
      ) => string;
    }
  > = {
    region: {
      conditionalClassName: () => {
        return "bg-white border-1 border-[#E5E5E5] px-2 py-1 rounded-[6px] inline-block mt-1";
      },
    },
    status: {
      conditionalClassName: (value) => {
        if (typeof value !== "string") return "";
        switch (value) {
          case "Pending Approval":
            return "text-[#FF9500] bg-yellow-100 px-2 py-1 rounded-[6px] inline-block mt-1";
          case "Done":
            return "text-[#34A255] bg-green-100 px-2 py-[2px] rounded-[6px] inline-block mt-1";
          case "Exception":
            return "text-[#E63435] bg-red-100 px-2 py-1 rounded-[6px] inline-block mt-1";
          default:
            return "";
        }
      },
    },
    amount: {
      conditionalClassName: (value) => {
        if (typeof value !== "number") return "";
        return value < 0 ? "text-red-600" : "text-green-600";
      },
    },
    Netsmart: {
      conditionalClassName: (value) => {
        if (typeof value !== "number") return "";
        return value <= 0 ? "text-[#EC7723]" : "text-[#0A0A0A]";
      },
    },
    remittance: {
      conditionalClassName: (value) => {
        if (typeof value !== "number") return "";
        return value <= 0 ? "text-[#EC7723]" : "text-[#0A0A0A]";
      },
    },
    transactionNo: {
      conditionalClassName: () => {
        return "text-[#0090FF]";
      },
    },
    variance: {
      conditionalClassName: () => {
        return "text-[#E63435]";
      },
    },
    email: {
      bodyClassName: "text-blue-600",
    },
  };

  const columns = useMemo(
    () =>
      buildColumns<ReconciledTransaction>({
        tableData,
        labelMap: RECONCILED_REPORT_COLUMN_LABELS,
        excludeKeys: ["id", "reconciledDataId", "region"],
        amountFields: ["bankDeposit", "remittance", "emrAmount", "glAmount"],
        columnRules,
      }),
    [tableData],
  );

  return {
    toggle,
    from,
    to,
    payerOptions,
    // statusOptions,
    selectedPayer,
    selectedStatus,
    setSelectedPayer,
    setSelectedStatus,
    setToggle,
    setFrom,
    setTo,
    columns,
    columnRules,
    handleEditCancel,
    handleEditSubmit,
    handleFieldChange,
    handleEditClick,
    handleExport,
    handleBrandToggle,
    handleSelectAll,
    handleRowSelect,
    totalPages,
    isEditModalOpen,
    setSearchTerm,
    setRowsPerPage,
    paginatedData,
    selectedRows,
    setSelectedRows,
    searchTerm,
    selectedBrands,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setIsEditModalOpen,
    editedData,
    widgetData,
    widgetLoading,
    tableData,
    tableLoading,
    reconciledCardsData,
  };
};
