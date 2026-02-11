export const formatDate = (value?: string | null) => {
  if (!value) return "-";
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
};

export const formatAmount = (value: number) => {
  if (typeof value !== "number") return value;
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
