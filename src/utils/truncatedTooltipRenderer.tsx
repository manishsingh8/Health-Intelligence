import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

interface TruncateWithTooltipOptions {
  limit?: number;
  maxWidthClass?: string;
}

export const truncateWithTooltip = (
  value: unknown,
  {
    limit = 4,
    maxWidthClass = "max-w-[100px]",
  }: TruncateWithTooltipOptions = {},
) => {
  if (typeof value !== "string" || !value) return "-";

  const truncated =
    value.length > limit ? value.slice(0, limit) + "..." : value;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`inline-block truncate cursor-pointer whitespace-nowrap ${maxWidthClass}`}
          >
            {truncated}
          </span>
        </TooltipTrigger>

        <TooltipContent
          className="text-xs whitespace-pre-wrap
            bg-gray-200 text-black
            border border-gray-300 shadow-md max-w-[360px]"
        >
          {value}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
