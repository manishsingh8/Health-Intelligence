import TrandingUp from "@/assets/icons/trending-up.svg";
import TradingDown from "@/assets/icons/trending-down.svg";
import RightArrow from "@/assets/icons/arrow-right.svg";

interface MapCardProps {
  headerText: string;
  value: number | string;
  percentage: number | string;
  chartData?: number[];
  color?: string;
  colorClass?: {
    text: string;
    border: string;
    chart: string;
  };
  image?: any;
  status: string;
  processingRate?: string;
}

const MapCard = ({
  headerText,
  value,
  percentage,
  colorClass = {
    text: "text-teal-600",
    border: "border-teal-600",
    chart: "stroke-teal-600",
  },
  image,
  status,
  processingRate,
}: MapCardProps) => {
  const isPositive = Number(percentage) >= 0;

  const getArrowIcon = () => {
    switch (status) {
      case "positive":
        return <img src={TrandingUp} alt="Up" className="w-4 h-4" />;
      case "negative":
        return <img src={TradingDown} alt="Down" className="w-4 h-4" />;
      default:
        return <img src={RightArrow} alt="Right" className="w-4 h-4" />;
    }
  };

  const percentageText = `${isPositive ? "+" : ""}${percentage}%`;

  // ✅ Only format when value already contains "$"
  const shouldFormat = (val: any) => {
    if (!val) return false;
    return String(val).includes("$");
  };

  const formatCurrency = (val: string | number) => {
    const raw = String(val).replace(/[^0-9.-]/g, ""); // Remove $, commas, etc.
    const numberValue = Number(raw);

    if (isNaN(numberValue)) return String(val);

    return numberValue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formattedValue = shouldFormat(value) ? formatCurrency(value) : value;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 w-full gap-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 h-4">
        <h3 className="text-xs font-medium text-gray-500">{headerText}</h3>
        <div
          className={`flex items-center gap-1 px-1 py-0 rounded-full border ${colorClass.border} ${colorClass.text}`}
        >
          <span className="text-xs font-semibold">{percentageText}</span>
          <span className="text-xs">{getArrowIcon()}</span>
        </div>
      </div>

      {/* Value */}
      <div className="flex justify-between mb-4 items-center">
        <p className="text-2xl font-bold text-gray-900">{formattedValue}</p>
        {processingRate ? (
          <div
            className={`w-10 h-5 flex items-center gap-1 px-1 py-0 rounded-full border ${colorClass.border} ${colorClass.text}`}
          >
            <span className="text-xs font-semibold">{processingRate}</span>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Image */}
      {image && (
        <div className="flex justify-center">
          <img
            src={image}
            alt={`${headerText} chart`}
            className="h-16 w-auto object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default MapCard;
