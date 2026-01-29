import { showToast } from "@/lib/toast";

interface ValidateDateRangeOptions {
  from: string;
  to: string;
  showErrorToast?: boolean;
}

/**
 * Validates date range (from <= to)
 * @returns boolean – true if valid, false otherwise
 */
export const validateDateRange = ({
  from,
  to,
  showErrorToast = true,
}: ValidateDateRangeOptions): boolean => {
  if (!from || !to) return true;

  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (fromDate > toDate) {
    if (showErrorToast) {
      showToast({
        message: "From date should be less than or equal to To date",
        severity: "error",
        id: "invalid-date-range",
      });
    }
    return false;
  }

  return true;
};
