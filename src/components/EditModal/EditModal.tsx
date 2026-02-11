import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import React from "react";

export interface Column<T> {
  key: keyof T;
  label: React.ReactNode;
}

interface EditModalProps<T extends object> {
  open: boolean;
  data: Partial<T>[];
  columns: Column<T>[];
  editableFields: (keyof T)[];
  onFieldChange: (rowIndex: number, field: keyof T, value: unknown) => void;
  onSubmit: () => void;
  onCancel: () => void;
  idKey: keyof T;
  title?: string;
}

type WithMeta = {
  history?: unknown;
  comments?: string | null;
};

const formatDateDisplay = (value: unknown): string => {
  if (typeof value !== "string") return "";

  const date = new Date(value);
  if (isNaN(date.getTime())) return value;

  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();

  return `${mm}-${dd}-${yyyy}`;
};

const formatDateToISO = (value: string): string => {
  const [mm, dd, yyyy] = value.split("-");
  if (!mm || !dd || !yyyy) return value;
  return `${yyyy}-${mm}-${dd}`;
};

const formatAmountDisplay = (value: unknown): string => {
  if (typeof value === "number") {
    return `$${value.toLocaleString("en-US")}`;
  }
  return value ? String(value) : "";
};

const parseAmount = (value: string): number =>
  Number(value.replace(/[^0-9.]/g, "")) || 0;

export function EditModal<
  T extends WithMeta = Record<string, unknown> & WithMeta,
>({
  open,
  data,
  columns,
  editableFields,
  onFieldChange,
  onSubmit,
  onCancel,
  idKey,
  title,
}: EditModalProps<T>) {
  const renderHistory = (history: unknown) => {
    if (!history) {
      return (
        <div className="text-xs text-muted-foreground">
          No History Available
        </div>
      );
    }

    if (typeof history === "string") return <div>{history}</div>;

    if (Array.isArray(history)) {
      return history.map((item, i) => (
        <div key={i} className="mb-1">
          {typeof item === "string" ? item : JSON.stringify(item)}
        </div>
      ));
    }

    if (typeof history === "object") {
      return <div>{JSON.stringify(history)}</div>;
    }

    return String(history);
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="w-full max-w-[60vw] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-md">
            {title || `Edit Row${data.length > 1 ? "s" : ""}`}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-1">
          {data.map((row, rowIndex) => (
            <div
              key={String(row[idKey])}
              className="mb-6 border-b border-border pb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {columns.map((column) => {
                  const field = column.key;
                  const value = row[field];
                  const isEditable = editableFields.includes(field);
                  const isCommentField = field === "comments";

                  const lowerKey = String(field).toLowerCase();
                  const isAmountField =
                    lowerKey.includes("amount") ||
                    lowerKey.includes("bankdeposit") ||
                    lowerKey.includes("variance") ||
                    lowerKey.includes("remittance");

                  const isDateField = lowerKey.includes("date");

                  const displayValue: string = (() => {
                    if (value === null || value === undefined) return "";

                    if (isAmountField) return formatAmountDisplay(value);
                    if (isDateField) return formatDateDisplay(value);

                    return String(value);
                  })();

                  return (
                    <div
                      key={String(field)}
                      className={`space-y-2 ${
                        isCommentField ? "md:col-span-3" : ""
                      }`}
                    >
                      <label className="text-xs font-medium">
                        {column.label}
                      </label>

                      {isCommentField ? (
                        <>
                          <textarea
                            rows={2}
                            value={String(value ?? "")}
                            disabled={!isEditable}
                            onChange={(e) =>
                              onFieldChange(rowIndex, field, e.target.value)
                            }
                            className="w-full border rounded-md p-3 text-sm"
                          />

                          <div className="mt-3">
                            <div className="text-xs font-semibold">History</div>
                            <div className="rounded-md border mt-1 p-2 text-xs">
                              {renderHistory(row.history)}
                            </div>
                          </div>
                        </>
                      ) : (
                        <Input
                          type="text"
                          disabled={!isEditable}
                          value={displayValue}
                          onChange={(e) => {
                            const v = e.target.value;

                            if (isAmountField) {
                              onFieldChange(rowIndex, field, parseAmount(v));
                            } else if (isDateField) {
                              onFieldChange(
                                rowIndex,
                                field,
                                formatDateToISO(v),
                              );
                            } else {
                              onFieldChange(rowIndex, field, v);
                            }
                          }}
                          className="w-full text-sm"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onCancel}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={onSubmit}
            className="bg-[#249563] hover:bg-green-700 cursor-pointer"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
