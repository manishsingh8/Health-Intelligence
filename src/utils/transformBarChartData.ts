interface BEItem {
  processingDate: string;
  documentCategory: string;
  documentCount: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  Denials: "#0047ba",
  EOB: "#e69f00",
  "Remittance Report": "#009e73",
  OTHER: "#6b7280",
  "Over Payment": "#dc2626",
};

export const transformBarData = (raw: BEItem[], xKey = "date") => {
  const grouped: Record<string, any> = {};
  const categories = new Set<string>();

  raw.forEach(({ processingDate, documentCategory, documentCount }) => {
    categories.add(documentCategory);

    if (!grouped[processingDate]) {
      grouped[processingDate] = { [xKey]: processingDate };
    }

    grouped[processingDate][documentCategory] =
      (grouped[processingDate][documentCategory] || 0) + documentCount;
  });

  const chartData = Object.values(grouped).sort(
    (a: any, b: any) =>
      new Date(a[xKey]).getTime() - new Date(b[xKey]).getTime(),
  );

  const segments = Array.from(categories).map((category) => ({
    dataKey: category,
    label: category,
    color: CATEGORY_COLORS[category] || "#9ca3af",
  }));

  return { chartData, segments };
};
