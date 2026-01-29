import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
import { Clock } from "lucide-react";

export interface BarSegmentConfig {
  dataKey: string;
  color: string;
  label?: string;
}

interface CustomBarChartProps {
  title?: string;
  description?: string;
  data: Record<string, any>[];
  xKey: string;
  dataKey?: string;
  color?: string;
  tooltipLabel?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  segments?: BarSegmentConfig[];
  barSize?: number;
}

const CustomBarChart = ({
  title,
  description,
  data,
  xKey,
  dataKey,
  color = "#249563",
  barSize = 40,
  tooltipLabel,
  segments,
  xAxisLabel,
  yAxisLabel,
}: CustomBarChartProps) => {
  const isStacked = Array.isArray(segments) && segments.length > 0;
  const hasData = Array.isArray(data) && data.length > 0;

  const chartConfig: ChartConfig = {};

  if (isStacked) {
    segments.forEach((segment) => {
      chartConfig[segment.dataKey] = {
        label: segment.label || segment.dataKey,
        color: segment.color,
      };
    });
  } else if (dataKey) {
    chartConfig[dataKey] = {
      label: tooltipLabel || dataKey,
      color,
    };
  }

  return (
    <Card className="flex flex-col w-full">
      {hasData ? (
        <>
          <CardHeader className="items-start pb-0">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <CardTitle>{title}</CardTitle>
            </div>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent className="flex-1 pb-4">
            <ChartContainer
              config={chartConfig}
              className="min-h-[300px] w-full"
            >
            <BarChart
                accessibilityLayer
                data={data}
                width={500}
                height={300}
                margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey={xKey}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
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
                          dx: -10,
                        }
                      : undefined
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel={!isStacked} />}
                />
                {isStacked && <ChartLegend content={<ChartLegendContent />} />}
                {isStacked
                  ? segments!.map((segment, index) => {
                      const isLast = index === segments!.length - 1;
                      const radius = isLast ? [4, 4, 0, 0] : [0, 0, 0, 0];

                      return (
                        <Bar
                          key={segment.dataKey}
                          dataKey={segment.dataKey}
                          stackId="a"
                          fill={segment.color}
                          radius={radius as [number, number, number, number]}
                          barSize={barSize}
                        />
                      );
                    })
                  : dataKey && (
                      <Bar
                        dataKey={dataKey}
                        fill={color}
                        radius={8}
                        barSize={barSize}
                      />
                    )}
              </BarChart>
            </ChartContainer>
          </CardContent>
        </>
      ) : (
        <div className="flex h-[100px] w-full items-center justify-center text-sm text-muted-foreground">
          No data found
        </div>
      )}
    </Card>
  );
};

export default CustomBarChart;
