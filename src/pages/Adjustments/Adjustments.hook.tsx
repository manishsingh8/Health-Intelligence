import { useState, useMemo, useEffect } from "react";
import { RowActions } from "./layout/modal/ActionModal";
import { DUMMY_LEDGER_DATA } from "@/constants/AdjustmentsData";

import { type Column } from "@/components/DataTable/DataTable";
import { type LedgerRow } from "@/constants/AdjustmentsData";

type ActionModalType = "ican" | "note" | "exception" | "source" | null;

export const useAdjustmentsLogic = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [activeModal, setActiveModal] = useState<ActionModalType>(null);
  const [activeTab, setActiveTab] = useState("SUSPENSE");

  const TABS = [
    { label: "Suspense", value: "SUSPENSE" },
    { label: "PIP", value: "PIP" },
    { label: "Recoupments", value: "RECOUPMENT" },
    { label: "Other Adjustments", value: "OTHER_ADJUSTMENT" },
  ];

  const ledgerColumns: Column<LedgerRow>[] = [
    {
      key: "id",
      label: "Actions",
      render: (_, row) => (
        <RowActions rowId={row.id} onOpenModal={setActiveModal} />
      ),
    },
    { key: "effectiveDate", label: "Effective Date" },

    // ✅ TYPE
    {
      key: "type",
      label: "Type",
      render: (value: any, row) => {
        const typeStyles =
          row.ledgerCategory === "PIP"
            ? "bg-blue-100 text-blue-700"
            : row.ledgerCategory === "RECOUPMENT"
            ? "bg-red-100 text-red-700"
            : row.ledgerCategory === "OTHER_ADJUSTMENT"
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-700";

        return (
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeStyles}`}
          >
            {value}
          </span>
        );
      },
    },

    { key: "description", label: "Description" },
    { key: "source", label: "Source / Provider" },

    // ✅ AMOUNT
    {
      key: "amount",
      label: "Amount",
      isAmount: true,
      render: (value: any) => (
        <span
          className={
            value > 0
              ? "text-green-600 font-medium"
              : "text-red-600 font-medium"
          }
        >
          {value < 0
            ? `-$${Math.abs(value).toFixed(2)}`
            : `$${value.toFixed(2)}`}
        </span>
      ),
    },

    { key: "openBalance", label: "Open Balance", isAmount: true },

    {
      key: "status",
      label: "Status",
      conditionalClassName: (value) =>
        value === "Open"
          ? "text-orange-600 font-medium"
          : value === "Closed" || value === "Completed"
          ? "text-green-600 font-medium"
          : "text-blue-600 font-medium",
    },
  ];

  const filteredData = useMemo(() => {
    return DUMMY_LEDGER_DATA.filter((row) => row.ledgerCategory === activeTab);
  }, [activeTab]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  return {
    ledgerColumns,
    currentPage,
    rowsPerPage,
    setCurrentPage,
    setRowsPerPage,
    totalPages,
    paginatedData,
    activeModal,
    setActiveModal,
    TABS,
    activeTab,
    setActiveTab,
  };
};
