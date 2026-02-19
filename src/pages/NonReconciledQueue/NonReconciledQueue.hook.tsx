import { useState, useMemo, useEffect } from "react";
import { type Transaction } from "@/constants/TableData";
import { mapPaymentCardsWithBg } from "@/utils/mapObjectToPaymentCard";
import { API_ENDPOINTS } from "@/config/api";
import { buildColumns } from "@/utils/buildColumns";
import type { Column } from "@/components/DataTable/DataTable";
import {
  NON_RECONCILED_COLUMN_LABELS,
  NON_RECONCILED_HEADER_TEXT,
} from "@/constants/TableData";
import { validateDateRange } from "@/utils/dateRangeValidator";
import { showToast } from "@/lib/toast";
import {
  BANK_DEPOSIT_COLUMNS,
  REMITTANCE_COLUMNS,
  EMR_DETAILS_COLUMNS,
} from "@/constants/TableData";
import { baseExcludeKeys, amountFields } from "@/constants/DashboardData";
import { getNonReconciledColumnRules } from "@/pages/NonReconciledQueue/nonReconciledColumnRules";

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

export type EmrAmountRow = {
  __rowId?: string;
  eftNo?: string | null;
  payerName?: string | null;
  officeKey?: string | null;
  visitId?: string | null;
  paymentMethod?: string | null;
  paymentType?: string | null;
  paidAmount?: string | number | null;
  batchId?: string | number | null;
  batchOwner?: string | null;
  depositDate?: string | null;
  entryDate?: string | null;
  fileId?: string | number | null;
  fileName?: string | null;
  fileReceivedDate?: string | null;
};

type SelectOption = {
  value: string;
  label: string;
};

type DataModalState = {
  type: string | null;
  row: Transaction | null;
  details: unknown;
};

type UsePaymentLogicReturn = {
  toggle: string;
  from: string;
  to: string;
  payerOptions: SelectOption[];
  statusOptions: SelectOption[];
  selectedPayer: string;
  selectedStatus: string;
  setSelectedPayer: React.Dispatch<React.SetStateAction<string>>;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
  setToggle: React.Dispatch<React.SetStateAction<string>>;
  setFrom: React.Dispatch<React.SetStateAction<string>>;
  setTo: React.Dispatch<React.SetStateAction<string>>;
  columns: Column<Transaction>[];
  edit_columns: Column<Transaction>[];
  columnRules: Record<string, unknown>;
  handleEditCancel: () => void;
  handleEditSubmit: () => void;
  handleFieldChange: (
    rowIndex: number,
    field: keyof Transaction,
    value: unknown,
  ) => void;
  handleExport: () => void;
  handleBrandToggle: (region: string) => void;
  handleSelectAll: () => void;
  handleRowSelect: (id: string) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedBrands: string[];
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  paginatedData: Transaction[];
  totalPages: number;
  selectedRows: Set<string>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<string>>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  editedData: Partial<Transaction>[];
  paymentCardsData: unknown[];
  tableLoading: boolean;
  widgetLoading: boolean;
  handleEditClick: () => void;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: DataModalState;
  loadingData: boolean;
  dataModalColumns: unknown;
  emrTableOpen: boolean;
  setEmrTableOpen: React.Dispatch<React.SetStateAction<boolean>>;
  emrFileDetailsOpen: boolean;
  setEmrFileDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  emrTableData: EmrAmountRow[];
  openEmrFileDetails: (fileName: string) => void;
  selectedEmrFileName: string | null;
  selectedEmrFileRows: EmrAmountRow[];
};

export const usePaymentLogic = (): UsePaymentLogicReturn => {
  const [toggle, setToggle] = useState("dateRange");
  const [from, setFrom] = useState("2025-01-01");
  const [to, setTo] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [selectedPayer, setSelectedPayer] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [payerOptions, setPayerOptions] = useState<SelectOption[]>([
    { value: "all", label: "All Payers" },
  ]);
  const [statusOptions, setStatusOptions] = useState<SelectOption[]>([
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
  const [emrTableOpen, setEmrTableOpen] = useState(false);
  const [emrFileDetailsOpen, setEmrFileDetailsOpen] = useState(false);
  const [emrTableData, setEmrTableData] = useState<EmrAmountRow[]>([]);
  const [selectedEmrFileName, setSelectedEmrFileName] = useState<string | null>(
    null,
  );
  const [modalData, setModalData] = useState<DataModalState>({
    type: null,
    row: null,
    details: null,
  });
  const [loadingData, setLoadingData] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dataModalColumns, setDataModalColumns] =
    useState(BANK_DEPOSIT_COLUMNS);

  const openEmrFileDetails = (fileName: string) => {
    setSelectedEmrFileName(fileName);
    setEmrFileDetailsOpen(true);
  };

  const fetchSelectOptions = async <TItem,>(params: {
    url: string;
    allOptionLabel: string;
    errorMessage: string;
    mapItem: (item: TItem) => { value: string; label: string };
    setOptions: React.Dispatch<
      React.SetStateAction<{ value: string; label: string }[]>
    >;
  }) => {
    if (!validateDateRange({ from, to })) return;

    try {
      const res = await fetch(params.url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
      if (!res.ok) throw new Error(params.errorMessage);

      const response = await res.json();
      const mapped = response?.data?.map(params.mapItem) ?? [];

      params.setOptions([
        { value: "all", label: params.allOptionLabel },
        ...mapped,
      ]);
    } catch (error) {
      console.error(params.errorMessage, error);
    }
  };

  const fetchPayers = async () => {
    await fetchSelectOptions<{ id: string; name: string }>({
      url: API_ENDPOINTS.PAYERS,
      allOptionLabel: "All Payers",
      errorMessage: "Payer API failed",
      mapItem: (payer) => ({ value: payer.id, label: payer.name }),
      setOptions: setPayerOptions,
    });
  };

  const fetchStatuses = async () => {
    await fetchSelectOptions<{ id: string; name: string }>({
      url: API_ENDPOINTS.TRANSACTION_STATUSES,
      allOptionLabel: "All Status",
      errorMessage: "Status API failed",
      mapItem: (status) => ({ value: status.id, label: status.name }),
      setOptions: setStatusOptions,
    });
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

  const handleColumnClick = async (
    row: Transaction,
    api: string,
    type: string,
  ) => {
    const transactionNo = row?.transactionNo;
    const isEmr = type === "Emr Amount";

    if (isEmr) {
      setEmrTableOpen(true);
      setLoadingData(true);
      setEmrTableData([]);
      setSelectedEmrFileName(null);
      setEmrFileDetailsOpen(false);
    } else {
      setOpen(true);
      setLoadingData(true);
      if (type === "Remmitance") {
        setDataModalColumns(REMITTANCE_COLUMNS);
      } else if (type === "Bank Deposit") {
        setDataModalColumns(BANK_DEPOSIT_COLUMNS);
      } else {
        setDataModalColumns(EMR_DETAILS_COLUMNS);
      }
      setModalData({
        type,
        row,
        details: null,
      });
    }

    try {
      const response = await fetch(`${api}?transactionNo=${transactionNo}`);
      const data = await response.json();

      if (isEmr) {
        const payload = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data)
            ? data
            : [];
        setEmrTableData(
          payload.map((item: EmrAmountRow, index: number) => ({
            ...item,
            __rowId: String(
              item.fileId ?? item.fileName ?? item.visitId ?? index,
            ).concat(`-${index}`),
          })),
        );
      } else {
        setModalData({
          type,
          row,
          details: data,
        });
      }
    } catch (error) {
      console.error("Failed to fetch bank deposit details", error);
      if (isEmr) {
        setEmrTableData([]);
      } else {
        setModalData({
          type,
          row,
          details: null,
        });
      }
    } finally {
      setLoadingData(false);
    }
  };

  const columnRules = getNonReconciledColumnRules({
    handleColumnClick,
  });

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

  const selectedEmrFileRows = selectedEmrFileName
    ? emrTableData.filter((r) => r.fileName === selectedEmrFileName)
    : [];

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
    emrTableOpen,
    setEmrTableOpen,
    emrFileDetailsOpen,
    setEmrFileDetailsOpen,
    emrTableData,
    openEmrFileDetails,
    selectedEmrFileName,
    modalData,
    loadingData,
    edit_columns,
    dataModalColumns,
    selectedEmrFileRows,
  };
};
