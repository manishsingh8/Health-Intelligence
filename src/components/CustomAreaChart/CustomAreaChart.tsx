import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

export interface AreaSegmentConfig {
  dataKey: string;
  color: string;
  label?: string;
}

interface CustomAreaChartProps {
  title: string;
  description?: string;
  data: any[];
  xKey: string;
  segments: AreaSegmentConfig[];
  xAxisLabel?: string;
  yAxisLabel?: string;
}

const CustomAreaChart = ({
  title,
  description,
  data,
  xKey,
  segments,
  xAxisLabel,
  yAxisLabel,
}: CustomAreaChartProps) => {
  // Generate chart configuration
  const chartConfig: ChartConfig = {};

  segments.forEach((segment) => {
    chartConfig[segment.dataKey] = {
      label: segment.label || segment.dataKey,
      color: segment.color,
    };
  });

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-start pb-0">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
          <CardTitle>{title}</CardTitle>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="min-h-[450px] w-full p-0"
        >
          <AreaChart accessibilityLayer data={data}>
            <defs>
              {segments.map((segment) => (
                <linearGradient
                  key={`gradient-${segment.dataKey}`}
                  id={`gradient-${segment.dataKey}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={segment.color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={segment.color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey={xKey}
              tickLine={false}
              tickMargin={15}
              axisLine={false}
              angle={-90}
              textAnchor="end"
              height={100}
              label={
                xAxisLabel
                  ? {
                      value: xAxisLabel,
                      position: "insideBottom",
                      offset: -10,
                    }
                  : undefined
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              label={
                yAxisLabel
                  ? {
                      value: yAxisLabel,
                      angle: -90,
                      position: "insideLeft",
                      dy: 60,
                    }
                  : undefined
              }
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel={false} />} />
            <ChartLegend content={<ChartLegendContent />} />
            {segments.map((segment) => (
              <Area
                key={segment.dataKey}
                type="monotone"
                dataKey={segment.dataKey}
                stackId="1"
                stroke={segment.color}
                strokeWidth={2}
                fill={`url(#gradient-${segment.dataKey})`}
                isAnimationActive={true}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CustomAreaChart;
