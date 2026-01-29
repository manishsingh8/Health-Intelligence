import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface ToggleOption {
  label: string;
  value: string;
}

interface FilterSearchBarProps {
  toggleOptions?: ToggleOption[];
  selectedToggle?: string;
  onToggleChange?: (value: string) => void;

  enableDateRange?: boolean;
  fromDate?: string;
  toDate?: string;
  onFromDateChange?: (value: string) => void;
  onToDateChange?: (value: string) => void;

  enablePayer?: boolean;
  payerOptions?: Option[];
  selectedPayer?: string;
  onPayerChange?: (value: string) => void;

  enableStatus?: boolean;
  statusOptions?: Option[];
  selectedStatus?: string;
  onStatusChange?: (value: string) => void;

  showAdvancedSearch?: boolean;

  // NEW PROPS
  promptSearchValue?: string;
  onPromptSearchChange?: (value: string) => void;
  onAdvancedSearch?: () => void;
}

export function FilterSearchBar({
  // toggleOptions = [],
  // selectedToggle,
  // onToggleChange,

  enableDateRange,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,

  enablePayer,
  payerOptions = [],
  selectedPayer,
  onPayerChange,

  enableStatus,
  statusOptions = [],
  selectedStatus,
  onStatusChange,
}: // showAdvancedSearch,
// promptSearchValue,
// onPromptSearchChange,
// onAdvancedSearch,
FilterSearchBarProps) {
  const [payerOpen, setPayerOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  // const [showPromptSearchInput, setShowPromptSearchInput] = useState(false);

  return (
    <div className="flex items-center justify-end  gap-4 px-3 py-3 bg-white rounded-md">
      <div className="flex items-center gap-4 flex-wrap">
        {/* ------- Date Range -------- */}
        {enableDateRange && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            {/* From Date */}
            <div className="flex items-center gap-1 sm:flex-row sm:items-center sm:gap-2 w-full sm:w-auto">
              <span className="text-xs font-medium  sm:whitespace-nowrap">
                From
              </span>
              <Input
                type="date"
                value={fromDate}
                onChange={(e) => onFromDateChange?.(e.target.value)}
                className="h-8 text-xs w-full sm:w-40"
              />
            </div>

            {/* To Date */}
            <div className="flex items-center gap-1 sm:flex-row sm:items-center sm:gap-2 w-full sm:w-auto">
              <span className="text-xs font-medium  sm:whitespace-nowrap">
                To
              </span>
              <Input
                type="date"
                value={toDate}
                onChange={(e) => onToDateChange?.(e.target.value)}
                className="h-8 text-xs w-full sm:w-40"
              />
            </div>
          </div>
        )}

        {/* ------- Payer Filter -------- */}
        {enablePayer && (
          <div className="flex items-center gap-1">
            <div className="text-xs font-medium">Select Payer</div>

            <DropdownMenu onOpenChange={setPayerOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs w-40 flex justify-between shadow-none focus-visible:ring-0"
                >
                  <span>
                    {payerOptions.find((p) => p.value === selectedPayer)
                      ?.label ?? "All Payers"}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      payerOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-40 shadow-none">
                {payerOptions.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => onPayerChange?.(opt.value)} // ✅ ID sent
                    className="!bg-transparent !shadow-none hover:!bg-gray-100"
                  >
                    {opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {/* ------- Status Filter -------- */}
        {enableStatus && (
          <div className="flex items-center gap-1">
            <div className="text-xs font-medium">Select Status</div>

            <DropdownMenu onOpenChange={setStatusOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs w-40 flex justify-between shadow-none focus-visible:ring-0"
                >
                  <span>
                    {statusOptions.find((s) => s.value === selectedStatus)
                      ?.label ?? "All Status"}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      statusOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-40 shadow-none">
                {statusOptions.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => onStatusChange?.(opt.value)} // ✅ ID sent
                    className="!bg-transparent !shadow-none hover:!bg-gray-100"
                  >
                    {opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* ------- Prompt Search -------- */}
        {/* {showAdvancedSearch && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => {
                setShowPromptSearchInput((prev) => !prev);
                onAdvancedSearch?.();
              }}
            >
              Prompt Search
            </Button>

            {showPromptSearchInput && (
              <Input
                type="text"
                placeholder="Search..."
                value={promptSearchValue}
                onChange={(e) => onPromptSearchChange?.(e.target.value)}
                className="h-7 text-xs w-48 transition-all duration-200"
              />
            )}
          </div>
        )} */}
      </div>
    </div>
  );
}
