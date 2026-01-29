import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditIcon from "../../assets/images/edit-2.png";
// import { Search } from "lucide-react";
// import { Input } from "../ui/input";

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  className?: string; // header classes
  bodyClassName?: string; //  NEW: body-only class
  conditionalClassName?: (value: unknown, row: T) => string; // NEW: dynamic class
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  selectable?: boolean; // show checkboxes
  selectedRows?: Set<string>;
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
  idKey?: keyof T; // key to use for unique id
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
}

export function DataTable<T extends object = Record<string, unknown>>({
  data,
  columns,
  selectable = false,
  selectedRows = new Set(),
  onRowSelect,
  onSelectAll,
  searchEnabled = false,
  // searchTerm = "",
  // onSearchChange,
  filtersEnabled = false,
  // filterOptions = [],
  // selectedFilters = [],
  // onFilterChange,
  exportEnabled = false,
  onExport,
  idKey = "id" as keyof T,
  pageInfo,
  editRow,
}: DataTableProps<T>) {
  const hasSelectedRows = selectedRows.size > 0;
  const showEditButton = editRow?.enabled && selectable && hasSelectedRows;

  const handleEditClick = () => {
    if (selectedRows.size > 0 && editRow?.onEditClick) {
      editRow.onEditClick();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header: Search and Export */}
      {(searchEnabled || exportEnabled || filtersEnabled) && (
        <div className="flex items-center justify-end gap-4">
          {/* <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              // onClick={() => {
              //   setShowPromptSearchInput((prev) => !prev);
              //   onAdvancedSearch?.();
              // }}
            >
              Prompt Search
            </Button>
          </div>
          {searchEnabled && onSearchChange && (
            <div className="relative flex-1 max-w-sm shadow-none">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground shadow-none" />
              <Input
                placeholder="Search"
                className="pl-10 shadow-none"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onSearchChange(e.target.value)
                }
              />
            </div>
          )} */}

          <div className="flex gap-2">
            {showEditButton && (
              <Button
                // variant="default"
                className="bg-gray-[100] hover:bg-gray-100 text-[#474747] border-1 border-[#e5e5e5] cursor-pointer"
                onClick={handleEditClick}
              >
                <img src={EditIcon} alt="edit icon" />
                Edit
              </Button>
            )}

            {/* {filtersEnabled && onFilterChange && (
              <Button
                variant="outline"
                className="text-green-600 border-none bg-green-50 cursor-pointer"
              >
                <img src={FilterIcon} alt="filter-icon" />
                <span className="text-sm">Filters</span>
              </Button>
            )} */}

            {exportEnabled && onExport && (
              <Button
                variant="default"
                className="bg-[#249563] hover:bg-green-700"
                onClick={onExport}
              >
                Export
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Filter Buttons */}
      {/* {filtersEnabled && filterOptions.length > 0 && onFilterChange && (
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <Button
              key={option}
              variant={selectedFilters.includes(option) ? "default" : "outline"}
              size="sm"
              className={
                selectedFilters.includes(option)
                  ? "bg-[rgba(36,149,99,0.1)] border border-green-700 text-[#249563] hover:bg-[rgba(36,149,99,0.3)] text-xs"
                  : "border-gray-300 hover:bg-gray-50 text-xs"
              }
              onClick={() => onFilterChange(option)}
            >
              <img
                src={selectedFilters.includes(option) ? CircleTick : CirclePlus}
                alt="tick-icon"
              />
              {option}
            </Button>
          ))}
        </div>
      )} */}

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
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
                    className="w-4 h-4 cursor-pointer accent-green-600 bg-green-50 border-green-600"
                  />
                </TableHead>
              )}
              {columns.map((col) => (
                <TableHead
                  key={String(col.key)}
                  className={`font-semibold text-foreground text-xs ${
                    col.className || ""
                  }`}
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((row) => {
                const rowId = String(row[idKey]);
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
                          className="w-4 h-4 cursor-pointer accent-green-600 bg-green-50 border-green-600"
                        />
                      </TableCell>
                    )}

                    {columns.map((col) => {
                      const cellValue = row[col.key];

                      return (
                        <TableCell
                          key={String(col.key)}
                          className={`
                  text-xs
                  ${col.bodyClassName || ""}
                  ${
                    col.conditionalClassName
                      ? col.conditionalClassName(cellValue, row)
                      : ""
                  }
                `}
                        >
                          {col.render
                            ? col.render(cellValue, row)
                            : String(cellValue ?? "")}
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

      {/* Pagination Footer */}
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
                onChange={(e) =>
                  pageInfo.onRowsPerPageChange(Number(e.target.value))
                }
                className="border border-border rounded px-2 py-1 text-xs bg-background cursor-pointer"
              >
                {(pageInfo.rowsPerPageOptions || [5, 10, 15]).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-xs text-muted-foreground">
              Page {pageInfo.currentPage} of {pageInfo.totalPages || 1}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => pageInfo.onPageChange(1)}
                disabled={pageInfo.currentPage === 1}
              >
                {"<<"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  pageInfo.onPageChange(Math.max(1, pageInfo.currentPage - 1))
                }
                disabled={pageInfo.currentPage === 1}
              >
                {"<"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  pageInfo.onPageChange(
                    Math.min(pageInfo.totalPages, pageInfo.currentPage + 1)
                  )
                }
                disabled={pageInfo.currentPage === pageInfo.totalPages}
              >
                {">"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => pageInfo.onPageChange(pageInfo.totalPages)}
                disabled={pageInfo.currentPage === pageInfo.totalPages}
              >
                {">>"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
