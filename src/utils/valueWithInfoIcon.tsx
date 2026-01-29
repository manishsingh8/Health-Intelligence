import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

interface ValueWithInfoIconOptions {
  tooltipText?: string;
  currency?: string;
  decimals?: number;
}

const formatAmount = (value: number, currency = "$", decimals = 2) =>
  `${currency}${value.toFixed(decimals)}`;

export const valueWithInfoIcon = (
  value: unknown,
  {
    tooltipText = "Click to view details",
    currency = "$",
    decimals = 2,
  }: ValueWithInfoIconOptions = {},
) => {
  if (typeof value !== "number") return "-";

  const formattedValue = formatAmount(value, currency, decimals);

  return (
    <span className="inline-flex items-center gap-1">
      <span>{formattedValue}</span>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info
              size={14}
              className="text-muted-foreground hover:text-foreground cursor-pointer "
            />
          </TooltipTrigger>

          <TooltipContent
            className="text-xs whitespace-pre-wrap 
                 bg-gray-200 text-black 
                 border border-gray-300 shadow-md  max-w-[360px]"
          >
            {tooltipText}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>
  );
};
