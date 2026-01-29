import { useCallback } from "react";

type ToastVariant = "default" | "destructive" | "success";

interface ToastPayload {
  title?: string;
  description?: string;
  variant?: ToastVariant;
}

function formatMessage({ title, description }: ToastPayload) {
  if (title && description) {
    return `${title}\n${description}`;
  }
  return title || description || "";
}

export function useToast() {
  const toast = useCallback((payload: ToastPayload) => {
    const message = formatMessage(payload);

    if (!message) {
      return;
    }

    if (typeof window !== "undefined") {
      // Basic fallback: use native alert for visible feedback.
      window.alert(message);
    } else {
      console.log(message);
    }
  }, []);

  return { toast };
}







