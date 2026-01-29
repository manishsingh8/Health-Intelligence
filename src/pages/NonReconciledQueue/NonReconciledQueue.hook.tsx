import { useState, useMemo, useEffect } from "react";
import { type Transaction } from "@/constants/TableData";
import { mapPaymentCardsWithBg } from "@/utils/mapObjectToPaymentCard";
import { API_ENDPOINTS } from "@/config/api";
import { buildColumns } from "@/utils/buildColumns";
import {
  NON_RECONCILED_COLUMN_LABELS,
  NON_RECONCILED_HEADER_TEXT,
} from "@/constants/TableData";
import { validateDateRange } from "@/utils/dateRangeValidator";
import { showToast } from "@/lib/toast";
import { formatDate } from "@/utils/formate";
import { truncateWithTooltip } from "@/utils/truncatedTooltipRenderer";
import { valueWithInfoIcon } from "@/utils/valueWithInfoIcon";

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

export const usePaymentLogic: any = () => {
  const [toggle, setToggle] = useState("dateRange");
  const [from, setFrom] = useState("2025-01-01");
  const [to, setTo] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  const [selectedPayer, setSelectedPayer] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [payerOptions, setPayerOptions] = useState([
    { value: "all", label: "All Payers" },
  ]);
  const [statusOptions, setStatusOptions] = useState([
    { value: "all", label: "All Status" },
  ]);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["CH"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedData, setEditedData] = useState<Partial<Transaction>[]>([]);
  const [widgetData, setWidgetData] = useState<VarianceWidgetResponse | null>(
    null,
  );
  const [widgetLoading, setWidgetLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState<Transaction[]>([]);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    type: any;
    row: any;
    details: any;
    error: any;
  }>({ type: null, row: null, details: null, error: null });
  const [loadingData, setLoadingData] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

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

  const fetchStatuses = async () => {
    if (!validateDateRange({ from, to })) return;
    try {
      const res = await fetch(API_ENDPOINTS.TRANSACTION_STATUSES, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
      if (!res.ok) throw new Error("Status API failed");

      const response = await res.json();

      const mapped =
        response?.data?.map((status: any) => ({
          value: status.id,
          label: status.name,
        })) ?? [];

      setStatusOptions([{ value: "all", label: "All Status" }, ...mapped]);
    } catch (error) {
      console.error("Status API error", error);
    }
  };

  const getPayerIds = () => {
    if (selectedPayer === "all") {
      return payerOptions.filter((p) => p.value !== "all").map((p) => p.value);
    }
    return [selectedPayer];
  };
  const getStatusIds = () => {
    if (selectedStatus === "all") return null;
    return [selectedStatus];
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const fetchVarianceWidget = async () => {
    if (!validateDateRange({ from, to })) return;

    const payload = {
      fromDate: from,
      toDate: to,
      payerIds: getPayerIds(),
      statusIds: getStatusIds(),
      pageNo: currentPage,
      pageSize: rowsPerPage,
    };

    const MIN_LOADER_TIME = 1000;
    const startTime = Date.now();

    try {
      setWidgetLoading(true);
      setTableLoading(true);
      const [widgetRes, tableRes] = await Promise.allSettled([
        fetch(API_ENDPOINTS.VARIANCE_WIDGET, {
          method: "POST",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          body: JSON.stringify(payload),
        }),
        fetch(API_ENDPOINTS.VARIANCE_TABLE, {
          method: "POST",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          body: JSON.stringify(payload),
        }),
      ]);

      if (widgetRes.status === "fulfilled" && widgetRes.value.ok) {
        setWidgetData(await widgetRes.value.json());
      } else {
        setWidgetData(null);
      }

      if (tableRes.status === "fulfilled" && tableRes.value.ok) {
        const tableData = await tableRes.value.json();
        setTableData(tableData?.data || []);
      } else {
        setTableData([]);
      }
    } catch (error) {
      console.error("Variance API error:", error);
    } finally {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_LOADER_TIME - elapsed);

      await delay(remaining);

      setWidgetLoading(false);
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchPayers();
    fetchStatuses();
  }, []);
  useEffect(() => {
    fetchVarianceWidget();
  }, [from, to, selectedPayer, selectedStatus, rowsPerPage, currentPage]);

  const paymentCardsData = useMemo(() => {
    if (!widgetData?.data) return [];
    return mapPaymentCardsWithBg(widgetData?.data, NON_RECONCILED_HEADER_TEXT);
  }, [widgetData]);

  const filteredData = useMemo(() => {
    return tableData.filter((t) => {
      const matchesSearch =
        String(t.transactionNo || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(t.payer || "")
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
  const updateData = async () => {
    try {
      if (!editedData?.length) return false;
      setIsUpdating(true);
      const storedUserId = sessionStorage.getItem("userId");
      const payload = {
        ...editedData[0],
        userId: storedUserId ? Number(storedUserId) : null,
      };
      const response = await fetch(API_ENDPOINTS.UPDATE_VARIANCE_TABLE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }
      showToast({
        message: "Details updated successfully",
        severity: "success",
        id: "update-variance",
      });
      return true;
    } catch (e) {
      console.error("Error while updating data", e);
      showToast({
        message: "Failed to update details",
        severity: "error",
        id: "update-variance",
      });
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

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
        new Set(paginatedData.map((row) => String(row.nonReconciledDataId))),
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
      headers.map((key) => t[key as keyof Transaction]),
    );

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleEditClick = () => {
    if (selectedRows.size > 0) {
      const selectedRowsData = paginatedData.filter((row) =>
        selectedRows.has(String(row.nonReconciledDataId)),
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
    field: keyof Transaction,
    value: unknown,
  ) => {
    const updated = [...editedData];
    updated[rowIndex] = {
      ...updated[rowIndex],
      [field]: value,
    };
    setEditedData(updated);
  };

  const handleEditSubmit = async () => {
    if (isUpdating) return;
    const success = await updateData();
    if (!success) return;
    await fetchVarianceWidget();
    setIsEditModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditedData([]);
  };

  const blueTextRule = {
    conditionalClassName: () => "text-[#0090FF]",
  };

  const handleColumnClick = async (row: any, api: any, type: string) => {
    const transactionNo = row?.transactionNo;
    setOpen(true);
    setLoadingData(true);
    setModalData({
      type,
      row,
      details: null,
    });

    try {
      const response = await fetch(`${api}?transactionNo=${transactionNo}`);
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
        error: true,
      });
    } finally {
      setLoadingData(false);
    }
  };

  const columnRules: Record<
    string,
    {
      bodyClassName?: string;
      conditionalClassName?: (value: unknown, row: Transaction) => string;
      render?: (value: unknown, row: any) => React.ReactNode;
      clickable?: boolean;
      onClick?: (value: unknown, row: any) => void;
    }
  > = {
    region: {
      conditionalClassName: () => {
        return "bg-white border-1 border-[#E5E5E5] px-2 py-1 rounded-[6px] inline-block mt-1";
      },
    },
    statusName: {
      render: (value: unknown) => {
        if (typeof value !== "string") return "-";
        const [primary, secondary] = value.split(",");
        return (
          <div className="flex flex-col items-center gap-1">
            <span className="text-[#34A255] bg-green-100 px-2 py-[2px] rounded-[6px] text-xs">
              {primary}
            </span>
            {secondary && (
              <>
                <hr className="w-[70%] border-t border-gray-300 my-1" />
                <span className="text-[#E63435] text-xs">{secondary}</span>
              </>
            )}
          </div>
        );
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
    transactionType: {
      bodyClassName: "max-w-[100px]",
      render: (value: unknown) => truncateWithTooltip(value, { limit: 4 }),
    },
    payer: {
      bodyClassName: "max-w-[120px]",
      render: (value: unknown) => truncateWithTooltip(value, { limit: 6 }),
    },
    remittance: {
      conditionalClassName: (value) => {
        if (typeof value !== "number") return "";
        return value === 0 ? "text-[#EC7723]" : "text-[#0090FF]";
      },
      render: (value) =>
        valueWithInfoIcon(value, { tooltipText: "View Remittance Details" }),
      clickable: true,
      onClick: (_value, row) => {
        handleColumnClick(row, API_ENDPOINTS?.REMIT_DATA, "Remmitance");
      },
    },
    bankDeposit: {
      ...blueTextRule,
      clickable: true,
      render: (value) =>
        valueWithInfoIcon(value, { tooltipText: "View BankDeposit Details" }),
      onClick: (_value: any, row: any) => {
        handleColumnClick(row, API_ENDPOINTS?.BAI_DATA, "Bank Deposit");
      },
    },
    emrAmount: {
      ...blueTextRule,
      clickable: true,
      render: (value) =>
        valueWithInfoIcon(value, { tooltipText: "View EMR Details" }),
      onClick: (_value: any, row: any) => {
        handleColumnClick(row, API_ENDPOINTS?.EMR_DATA, "Emr Amount");
      },
    },
    payVariance: {
      conditionalClassName: () => {
        return "text-[#E63435]";
      },
    },
    depositDate: {
      render: (value: unknown) => formatDate(value as string),
    },
    postVariance: {
      conditionalClassName: () => {
        return "text-[#E63435]";
      },
    },
    email: {
      bodyClassName: "text-blue-600",
    },
  };

  const baseExcludeKeys: (keyof Transaction)[] = [
    "id",
    "nonReconciledDataId",
    "statusId",
    "region",
    "history",
    "userId",
  ];

  const amountFields: (keyof Transaction)[] = [
    "bankDeposit",
    "remittance",
    "emrAmount",
    "payVariance",
    "glAmount",
  ];

  const columns = useMemo(
    () =>
      buildColumns<Transaction>({
        tableData,
        labelMap: NON_RECONCILED_COLUMN_LABELS,
        excludeKeys: [...baseExcludeKeys, "comments"],
        amountFields,
        columnRules,
      }),
    [tableData],
  );
  const edit_columns = useMemo(
    () =>
      buildColumns<Transaction>({
        tableData,
        labelMap: NON_RECONCILED_COLUMN_LABELS,
        excludeKeys: baseExcludeKeys,
        amountFields,
        columnRules,
      }),
    [tableData],
  );

  return {
    toggle,
    from,
    to,
    payerOptions,
    statusOptions,
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
    paymentCardsData,
    tableLoading,
    widgetLoading,
    comment,
    setComment,
    open,
    setOpen,
    modalData,
    loadingData,
    edit_columns,
  };
};
