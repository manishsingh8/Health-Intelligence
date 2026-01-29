import MapImage from "@/assets/icons/trading-positive.svg";
import MapMediumImg from "@/assets/icons/trading-med.svg";
import MapNegative from "@/assets/icons/trading-negative.svg";

type Status = "positive" | "moderate" | "negative" | string;

export const getStatusMeta = (status: Status) => {
  switch (status) {
    case "positive":
      return {
        colorClass: {
          text: "text-teal-600",
          border: "border-teal-600",
          chart: "stroke-teal-600",
        },
        image: MapImage,
      };

    case "moderate":
      return {
        colorClass: {
          text: "text-amber-500",
          border: "border-amber-500",
          chart: "stroke-amber-500",
        },
        image: MapMediumImg,
      };

    case "negative":
      return {
        colorClass: {
          text: "text-red-600",
          border: "border-red-600",
          chart: "stroke-red-600",
        },
        image: MapNegative,
      };

    default:
      return {
        colorClass: {
          text: "text-slate-500",
          border: "border-slate-300",
          chart: "stroke-slate-400",
        },
        image: MapImage,
      };
  }
};
