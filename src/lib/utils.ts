import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Chart color constants
export const COLORS = {
  high: "#166F4C",
  medium: "#249563",
  low: "#6CCBA2",
  alt1: "#1f7a4a",
  alt2: "#2fa06a",
};

export const piePalette = [
  COLORS.high,
  COLORS.medium,
  COLORS.low,
  COLORS.alt1,
  COLORS.alt2,
];

// Formatting utilities
export const formatCurrency = (v: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(v);

export const formatNumber = (v: number) => new Intl.NumberFormat("en-US").format(v);

export function formatShortDate(iso: string) {
  try {
    const d = new Date(iso);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  } catch {
    return iso;
  }
}
