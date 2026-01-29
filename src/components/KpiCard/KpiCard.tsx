// src/components/reports/KpiCard.tsx
import { Card, CardContent, CardHeader } from "./UI/Card";
import type { LucideProps } from "lucide-react";
import { icons, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { cn } from "@/lib/utils";

type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

interface KpiCardProps {
  title: string;
  value: string;
  description?: string;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  iconName?: string; // name inside icons map (lucide-react)
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export default function KpiCard({
  title,
  value,
  description,
  change,
  changeType,
  iconName,
  trend,
  className,
}: KpiCardProps) {
  const IconComponent = iconName
    ? (icons[iconName as keyof typeof icons] as LucideIcon | undefined)
    : undefined;

  const renderIcon = () => {
    if (!IconComponent) return null;
    return <IconComponent className="h-5 w-5 text-muted-foreground" />;
  };

  const effectiveTrend =
    trend ||
    (changeType === "increase"
      ? "up"
      : changeType === "decrease"
      ? "down"
      : "neutral");

  const TrendIcon =
    effectiveTrend === "up"
      ? TrendingUp
      : effectiveTrend === "down"
      ? TrendingDown
      : Minus;

  const trendColor =
    effectiveTrend === "up"
      ? "text-green-600"
      : effectiveTrend === "down"
      ? "text-red-500"
      : "text-muted-foreground";

  const displayDescription = description || change || "";

  return (
    <Card className={cn("rounded-lg p-0", className)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 p-4 pb-2">
        <p className="text-sm font-medium">
          {title}
        </p>
        <div className="mt-0">{renderIcon()}</div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-semibold text-[#0A0A0A]">{value}</div>

        {displayDescription && (
          <p className={cn("text-xs flex items-center mt-2", trendColor)}>
            {effectiveTrend !== "neutral" && (
              <TrendIcon className="h-4 w-4 mr-1 inline-block" />
            )}
            <span className="truncate">{displayDescription}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
