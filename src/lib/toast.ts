import { toast } from "sonner";

export type ToastSeverity =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading";

const severityStyles: Record<
  ToastSeverity,
  {
    background: string;
    color: string;
    border: string;
  }
> = {
  success: {
    background: "#ecfdf5",
    color: "#047857",
    border: "#a7f3d0",
  },
  error: {
    background: "#fef2f2",
    color: "#b91c1c",
    border: "#fecaca",
  },
  warning: {
    background: "#fffbeb",
    color: "#92400e",
    border: "#fde68a",
  },
  info: {
    background: "#eff6ff",
    color: "#1d4ed8",
    border: "#bfdbfe",
  },
  loading: {
    background: "#f9fafb",
    color: "#374151",
    border: "#e5e7eb",
  },
};

interface ShowToastOptions {
  message: string;
  severity?: ToastSeverity;
  duration?: number;
  id?: string;
}

export const showToast = ({
  message,
  severity = "info",
  duration = 4000,
  id,
}: ShowToastOptions) => {
  const styles = severityStyles[severity];

  toast(message, {
    duration,
    id,
    style: {
      background: styles.background,
      color: styles.color,
      border: `1px solid ${styles.border}`,
    },
  });
};
