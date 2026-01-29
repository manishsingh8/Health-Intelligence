import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { Info } from "lucide-react";

export function buildColumns<T extends Record<string, any>>({
  tableData,
  labelMap = {},
  excludeKeys = [],
  amountFields = [],
  columnRules = {},
  amountFormatter = (val: number) => `$${val.toFixed(2)}`,
  defaultRenderer = (val: unknown) =>
    val === null || val === undefined || val === "" ? "-" : String(val),
}: any) {
  if (!tableData.length) return [];

  let firstColumnAssigned = false;

  return (Object.keys(tableData[0]) as Array<keyof T>)
    .filter((key) => !excludeKeys.includes(key))
    .map((key) => {
      const rule = columnRules[String(key)] || {};
      const isAmount = amountFields.includes(key);
      const isFirstVisibleColumn = !firstColumnAssigned;
      if (isFirstVisibleColumn) firstColumnAssigned = true;

      return {
        key,

        label:
          labelMap[key] ??
          String(key)
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase()),

        isAmount,

        showHistoryIcon: isFirstVisibleColumn,

        render: (value: unknown, row: T) => {
          const baseContent =
            rule.render?.(value, row) ??
            (isAmount
              ? typeof value === "number"
                ? amountFormatter(value)
                : "-"
              : defaultRenderer(value));

          const history = (row as any)?.history;
          const hasHistory =
            isFirstVisibleColumn &&
            (Array.isArray(history) ? history.length > 0 : Boolean(history));

          if (!hasHistory) return baseContent;

          return (
            <div className="flex items-center gap-2 justify-center">
              <span>{baseContent}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer text-muted-foreground hover:text-foreground">
                      <Info
                        size={14}
                        className="text-blue-600 hover:text-blue-800"
                      />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    className=" text-xs whitespace-pre-wrap 
                 bg-gray-200 text-black 
                 border border-gray-300 shadow-md  max-w-[360px]"
                  >
                    {Array.isArray(history)
                      ? history.map((h: any, i: number) => (
                          <div key={i} className="mb-1">
                            {String(h)}
                          </div>
                        ))
                      : String(history)}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        },
        bodyClassName: rule.bodyClassName ?? "",
        conditionalClassName: rule.conditionalClassName,
        clickable: rule.clickable ?? false,
        onClick: rule.onClick,
      };
    });
}
