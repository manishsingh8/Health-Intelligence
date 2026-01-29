import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { X, Search, User, UserCircle, Edit } from "lucide-react";
import { useState } from "react";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

const exportOptions = [
  { label: "CSV", value: "csv" },
  { label: "PDF", value: "pdf" },
];

export interface Column<T> {
  key: keyof T;
  label: React.ReactNode;
  render?: (value: unknown, row: T) => React.ReactNode;
  className?: string;
  bodyClassName?: string;
  conditionalClassName?: (value: unknown, row: T) => string;
  isAmount?: boolean;
  clickable?: boolean;
  onClick?: (value: any, row: T) => void;
}

export interface AssignmentUser {
  id: string;
  name: string;
  avatar?: string;
}

interface TableRow {
  [key: string]: any;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  stackHeaderText?: boolean;
  selectable?: boolean;
  selectedRows?: Set<string>;
  setSelectedRows?: any;
  onRowSelect?: (id: string) => void;
  onSelectAll?: () => void;
  searchEnabled?: boolean;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  filtersEnabled?: boolean;
  filterOptions?: string[];
  selectedFilters?: string[];
  onFilterChange?: (value: string) => void;
  exportEnabled?: boolean;
  onExport?: () => void;
  idKey?: string;
  pageInfo?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    rowsPerPage: number;
    onRowsPerPageChange: (value: number) => void;
    rowsPerPageOptions?: number[];
  };
  editRow?: {
    enabled?: boolean;
    onEditClick?: () => void;
  };
  assignmentFeature?: {
    enabled: boolean;
    onAssign?: (userId: string, selectedRowIds: string[]) => void;
    users?: AssignmentUser[];
    quickActions?: boolean;
    currentUserId?: string;
    onChangeStatus?: (selectedRowIds: string[]) => void;
    onWatchOptions?: (selectedRowIds: string[]) => void;
    onDelete?: (selectedRowIds: string[]) => void;
  };
  clickable?: boolean;
  onClick?: (row: T) => void;
  handleEditClick?: () => void;
}
const formatAmount = (value: unknown) => {
  if (value === null || value === undefined || value === "") return "$0.00";

  const num = Number(value);

  if (isNaN(num)) return String(value);

  return num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export function DataTable<T extends object = Record<string, unknown>>({
  data,
  columns,
  stackHeaderText = false,
  selectable = false,
  selectedRows = new Set(),
  setSelectedRows,
  onRowSelect,
  onSelectAll,
  searchEnabled = false,
  filtersEnabled = false,
  exportEnabled = false,
  // onExport,
  idKey = "",
  pageInfo,
  editRow,
  assignmentFeature,
  handleEditClick,
  // searchTerm = "",
  // onSearchChange,
}: DataTableProps<T>) {
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [exportType, setExportType] = useState("");

  // const [showPromptSearchInput, setShowPromptSearchInput] = useState(false);
  const hasSelectedRows = selectedRows.size > 0;
  const showEditButton = editRow?.enabled && selectable && hasSelectedRows;
  const showActionBar =
    assignmentFeature?.enabled && selectable && hasSelectedRows;
  // const handleEditClick = () => {
  //   if (selectedRows.size > 0) {
  //     if (editRow?.onEditClick) {
  //       editRow.onEditClick();
  //     }
  //     if (assignmentFeature?.enabled) {
  //       setIsAssignmentModalOpen(true);
  //     }
  //   }
  // };

  const handleAssignUser = (userId: string) => {
    if (assignmentFeature?.onAssign) {
      assignmentFeature.onAssign(userId, Array.from(selectedRows));
    }
    setIsAssignmentModalOpen(false);
    setSearchQuery("");
  };

  const filteredUsers =
    assignmentFeature?.users?.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getCellValue = (row: any, column: any) => {
    const value = row[column.key];
    if (value === null || value === undefined) return "";
    if (typeof value === "object") return "";

    return String(value);
  };

  const handleCSVExport = () => {
    if (!data?.length || !columns?.length) return;

    const headers = columns.map((col) => col.label).join(",");

    const rows = data.map((row) =>
      columns.map((col) => `"${getCellValue(row, col)}"`).join(","),
    );

    const csv = [headers, ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "table-data.csv";
    link.click();
  };

  const handlePDFExport = () => {
    if (!data?.length || !columns?.length) return;

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
    });

    doc.text("Report", 40, 30);

    const toText = (value: unknown): string => {
      if (value === null || value === undefined) return "";
      if (typeof value === "number") return value.toString();
      if (typeof value === "string") return value;
      return String(value);
    };

    // ✅ Date formatter
    const formatDateMMDDYYYY = (date: string) => {
      if (!date) return "";
      const d = new Date(date);
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const yyyy = d.getFullYear();
      return `${mm}-${dd}-${yyyy}`;
    };

    // ✅ Currency formatter
    const formatCurrency = (value: unknown) => {
      if (value === null || value === undefined || value === "") return "";
      const num = Number(value);
      if (Number.isNaN(num)) return toText(value);
      return `$${num}`;
    };

    const currencyFields = new Set([
      "bankDeposit",
      "remittance",
      "emrAmount",
      "glAmount",
      "payVariance",
    ]);

    // ✅ Rename Deposit Date header to "Ddate"
    const head = [
      columns.map((col) =>
        col.key === "depositDate" ? "Deposit-date" : toText(col.label),
      ),
    ];

    const body = data.map((row) =>
      columns.map((col) => {
        const value = getCellValue(row, col);

        if (col.key === "depositDate") {
          return formatDateMMDDYYYY(String(value));
        }

        if (currencyFields.has(String(col.key))) {
          return formatCurrency(value);
        }

        return toText(value);
      }),
    );

    const depositDateColumnIndex = columns.findIndex(
      (col) => col.key === "depositDate",
    );

    autoTable(doc, {
      head,
      body,
      styles: { fontSize: 8 },

      // Default header alignment
      headStyles: {
        halign: "center",
      },

      // Column alignment
      columnStyles: {
        [depositDateColumnIndex]: {
          halign: "left",
        },
      },

      // ✅ Left-align Deposit Date header
      didParseCell: (data) => {
        if (
          data.section === "head" &&
          data.column.index === depositDateColumnIndex
        ) {
          data.cell.styles.halign = "left";
        }
      },
    });

    doc.save("table-data.pdf");
  };

  const handleExportChange = (value: string) => {
    setExportType(value);

    if (value === "csv") {
      handleCSVExport();
    }

    if (value === "pdf") {
      handlePDFExport();
    }

    // Reset so button text stays "Export"
    setTimeout(() => setExportType(""), 0);
  };

  return (
    <div className="space-y-6 relative min-w-0 max-w-full overflow-hidden">
      {/* TOP BAR */}
      {(searchEnabled || exportEnabled || filtersEnabled) && (
        <div className="flex items-center justify-end gap-4">
          {/* <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-9"
              onClick={() => setShowPromptSearchInput((prev) => !prev)}
            >
              Prompt Search
            </Button>
          </div>

          {searchEnabled && onSearchChange && showPromptSearchInput && (
            <div className="relative flex-1 max-w-sm shadow-none">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-10 shadow-none"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          )} */}

          <div className="flex gap-2">
            {showEditButton && !showActionBar && (
              <Button
                variant="outline"
                onClick={handleEditClick}
                data-testid="button-edit"
                className="gap-2 cursor-pointer text-xs h-8"
              >
                <Edit style={{ width: 14, height: 14 }} />
                Edit
              </Button>
            )}
            <CustomDropdown
              options={exportOptions}
              value={exportType}
              onChange={handleExportChange}
              placeholder="Export"
            />
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="w-full rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-border hover:bg-gray-50">
              {selectable && (
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.size === data.length && data.length > 0
                    }
                    onChange={onSelectAll}
                    className="w-4 h-4 cursor-pointer accent-green-600"
                  />
                </TableHead>
              )}
              {columns.map((col) => (
                <TableHead
                  key={String(col.key)}
                  className={`font-semibold text-foreground text-xs text-center ${
                    col.className || ""
                  }`}
                >
                  {stackHeaderText ? (
                    <div className="flex flex-col items-center justify-center leading-tight">
                      {typeof col.label === "string"
                        ? col.label
                            .split(" ")
                            .map((word, idx) => <span key={idx}>{word}</span>)
                        : col.label}
                    </div>
                  ) : (
                    col.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length > 0 ? (
              data.map((row) => {
                const rowId = String((row as TableRow)[idKey]);
                return (
                  <TableRow
                    key={rowId}
                    className={`border-b border-border hover:bg-gray-50 ${
                      selectable && selectedRows.has(rowId) ? "bg-green-50" : ""
                    }`}
                  >
                    {selectable && onRowSelect && (
                      <TableCell className="w-12">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(rowId)}
                          onChange={() => onRowSelect(rowId)}
                          className="w-4 h-4 cursor-pointer accent-green-600"
                        />
                      </TableCell>
                    )}

                    {/* UPDATED RENDER HERE */}
                    {columns.map((col) => {
                      const cellValue = row[col.key];

                      return (
                        <TableCell
                          key={String(col.key)}
                          className={`text-xs text-center align-middle
                            ${col.bodyClassName || ""}
                            ${col.clickable ? "cursor-pointer text-green-600 hover:underline" : ""}
                            ${col.conditionalClassName ? col.conditionalClassName(cellValue, row) : ""}
                          `}
                          onClick={() => {
                            if (col.clickable && col.onClick) {
                              col.onClick(cellValue, row);
                            }
                          }}
                        >
                          {col.render
                            ? col.render(cellValue, row)
                            : col.isAmount
                              ? formatAmount(cellValue)
                              : String(cellValue ?? "-")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={(selectable ? 1 : 0) + columns.length}
                  className="text-center py-8 text-muted-foreground"
                >
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pageInfo && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <div className="text-xs text-muted-foreground">
            {selectedRows.size} of {data.length} row(s) selected.
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Rows per page
              </span>
              <select
                value={pageInfo.rowsPerPage}
                onChange={(e) => {
                  pageInfo.onRowsPerPageChange(Number(e.target.value));
                  setSelectedRows(new Set());
                }}
                className="border border-border rounded px-2 py-1 text-xs bg-background cursor-pointer"
                data-testid="select-rows-per-page"
              >
                {(
                  pageInfo.rowsPerPageOptions || [5, 10, 15, 20, 25, 50, 100]
                ).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-xs text-muted-foreground">
              Page {pageInfo.currentPage} of {pageInfo.totalPages || 1}
            </div>
            <div className="flex gap-2 mr-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  pageInfo.onPageChange(Math.max(1, pageInfo.currentPage - 1));
                  setSelectedRows(new Set());
                }}
                disabled={pageInfo.currentPage === 1}
                data-testid="button-prev-page"
              >
                {"<"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  pageInfo.onPageChange(pageInfo.currentPage + 1);
                  setSelectedRows(new Set());
                }}
                disabled={false}
              >
                {">"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {showActionBar && (
        <div
          className="absolute bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-40 animate-in slide-in-from-bottom duration-200"
          data-testid="action-bar"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between gap-3">
              <div
                className="text-sm font-medium"
                data-testid="text-selected-count"
              >
                {selectedRows.size} selected
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="default"
                  onClick={handleEditClick}
                  className="gap-2"
                  data-testid="button-edit-fields"
                >
                  <Edit className="w-4 h-4" />
                  Edit fields
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    // if (onSelectAll) onSelectAll();
                  }}
                  data-testid="button-close-action-bar"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAssignmentModalOpen && assignmentFeature?.enabled && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
            onClick={() => {
              setIsAssignmentModalOpen(false);
              setSearchQuery("");
            }}
            data-testid="overlay-assignment-modal"
          />
          <div
            className="fixed top-0 right-0 bottom-0 w-96 bg-background shadow-xl z-50 animate-in slide-in-from-right duration-250 flex flex-col"
            data-testid="modal-assignment"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2
                className="text-base font-semibold"
                data-testid="text-modal-title"
              >
                Assignee
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsAssignmentModalOpen(false);
                  setSearchQuery("");
                }}
                data-testid="button-close-modal"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="input-search-users"
                  />
                </div>
              </div>

              {assignmentFeature.quickActions !== false && (
                <div className="space-y-2 mb-6 pb-6 border-b border-border">
                  <button
                    onClick={() => handleAssignUser("unassigned")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover-elevate active-elevate-2 text-left"
                    data-testid="button-assign-unassigned"
                  >
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-sm">Unassigned</span>
                  </button>
                  {/* <button
                    onClick={() => handleAssignUser("automatic")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover-elevate active-elevate-2 text-left"
                    data-testid="button-assign-automatic"
                  >
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Zap className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-sm">Automatic</span>
                  </button> */}
                  <button
                    onClick={() => {
                      if (assignmentFeature.currentUserId) {
                        handleAssignUser(assignmentFeature.currentUserId);
                      }
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover-elevate active-elevate-2 text-left"
                    data-testid="button-assign-to-me"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <UserCircle className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-medium">Assign to me</span>
                  </button>
                </div>
              )}

              <div className="space-y-2">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleAssignUser(user.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover-elevate active-elevate-2 text-left"
                      data-testid={`button-assign-user-${user.id}`}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-xs">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{user.name}</span>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No users found
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
