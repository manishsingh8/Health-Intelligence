import React from "react";
import { type Transaction } from "@/constants/TableData";
import { API_ENDPOINTS } from "@/config/api";
import { formatDate } from "@/utils/formate";
import { truncateWithTooltip } from "@/utils/truncatedTooltipRenderer";
import { valueWithInfoIcon } from "@/utils/valueWithInfoIcon";
import type { Column } from "@/components/DataTable/DataTable";
import type { EmrAmountRow } from "./NonReconciledQueue.hook";

type ColumnRule = {
  bodyClassName?: string;
  conditionalClassName?: (value: unknown, row: Transaction) => string;
  render?: (value: unknown, row: Transaction) => React.ReactNode;
  clickable?: boolean;
  onClick?: (value: unknown, row: Transaction) => void;
};

export const getNonReconciledColumnRules = (params: {
  handleColumnClick: (row: Transaction, api: string, type: string) => void;
}): Record<string, ColumnRule> => {
  const blueTextRule = {
    conditionalClassName: () => "text-[#0090FF]",
  };

  return {
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
      render: (value) => {
        const formatted =
          typeof value === "number" ? `$${value.toFixed(2)}` : "-";

        return valueWithInfoIcon(formatted, {
          tooltipText: "View Remittance Details",
        });
      },
      clickable: true,
      onClick: (_value, row) => {
        params.handleColumnClick(row, API_ENDPOINTS?.REMIT_DATA, "Remmitance");
      },
    },

    bankDeposit: {
      ...blueTextRule,
      clickable: true,
      render: (value) => {
        const formatted =
          typeof value === "number" ? `$${value.toFixed(2)}` : "-";

        return valueWithInfoIcon(formatted, {
          tooltipText: "View BankDeposit Details",
        });
      },
      onClick: (_value, row) => {
        params.handleColumnClick(row, API_ENDPOINTS?.BAI_DATA, "Bank Deposit");
      },
    },
    emrAmount: {
      ...blueTextRule,
      clickable: true,
      render: (value) => {
        const formatted =
          typeof value === "number" ? `$${value.toFixed(2)}` : "-";

        return valueWithInfoIcon(formatted, {
          tooltipText: "View EMR Details",
        });
      },
      onClick: (_value, row) => {
        params.handleColumnClick(row, API_ENDPOINTS?.EMR_DATA, "Emr Amount");
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
};

export const getEmrSummaryColumns = (params: {
  openEmrFileDetails: (fileName: string) => void;
}): Column<EmrAmountRow>[] => [
  {
    key: "fileReceivedDate",
    label: "File Received Date",
    render: (value) => formatDate(String(value ?? "")),
  },
  {
    key: "paidAmount",
    label: "Amount",
    render: (value) =>
      value === null || value === undefined ? "-" : String(value),
  },
  {
    key: "payerName",
    label: "Payer Name",
  },
  {
    key: "batchId",
    label: "Batch Id",
    render: (value) =>
      value === null || value === undefined ? "-" : String(value),
  },
  {
    key: "batchOwner",
    label: "Batch Owner",
  },
  {
    key: "fileName",
    label: "File Name",
    clickable: true,
    render: (value) => (value ? String(value) : "-"),
    onClick: (value) => {
      if (!value) return;
      params.openEmrFileDetails(String(value));
    },
    bodyClassName: "text-blue-600",
  },
];

export const emrFileDetailsColumns: Column<EmrAmountRow>[] = [
  { key: "visitId", label: "Visit Id" },
  { key: "entryDate", label: "Entry Date" },
  { key: "eftNo", label: "EFT No" },
  { key: "paymentMethod", label: "Payment Method" },
  { key: "paymentType", label: "Payment Type" },
  {
    key: "paidAmount",
    label: "Paid Amount",
    render: (value) =>
      value === null || value === undefined ? "-" : String(value),
  },
  {
    key: "depositDate",
    label: "Deposit Date",
    render: (value) => formatDate(String(value ?? "")),
  },
  { key: "payerName", label: "Payer Name" },
  {
    key: "batchId",
    label: "Batch Id",
    render: (value) =>
      value === null || value === undefined ? "-" : String(value),
  },
  { key: "batchOwner", label: "Batch Owner" },
];
