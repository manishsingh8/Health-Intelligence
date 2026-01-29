import { Pie, PieChart, Cell } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { AlertTriangle } from "lucide-react";

const chartData = [
  { reason: "Missing Patient ID :", count: 45, fill: "var(--color-missing)" },
  {
    reason: "Unrecognized Document Type :",
    count: 15,
    fill: "var(--color-invalid)",
  },
  { reason: "Invalid Date Formate :", count: 22, fill: "var(--color-network)" },
  { reason: "OCR Confidence Low :", count: 8, fill: "var(--color-auth)" },
];

const chartConfig = {
  count: {
    label: "Exceptions",
  },
  missing: {
    label: "Missing Patient ID",
    color: "#BCAFFBFF",
  },
  invalid: {
    label: "Invalid Format",
    color: "#F7BB82FF",
  },
  network: {
    label: "Network Error",
    color: "#F26B66FF",
  },
  auth: {
    label: "Auth Failed",
    color: "#249563",
  },
} satisfies ChartConfig;

const ProcessingChart = () => {
  return (
    <Card className="flex flex-col w-[100%]">
      <CardHeader className="items-start pb-0">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Top Exception Reasons</CardTitle>
        </div>
        <CardDescription>
          Breakdown of documents that failed automated processing.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="reason"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={0} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="reason" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ProcessingChart;
