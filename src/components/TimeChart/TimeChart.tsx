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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Clock } from "lucide-react";

const chartData = [
  { workflow: "Referrals", time: 25 },
  { workflow: "Lab Results", time: 15 },
  { workflow: "Clinical Notes", time: 30 },
  { workflow: "Prescriptions", time: 20 },
];

const chartConfig = {
  time: {
    label: "Processing Time (min)",
    color: "#249563",
  },
} satisfies ChartConfig;

const TimeChart = () => {
  return (
    <Card className="flex flex-col w-[100%]">
      <CardHeader className="items-start pb-0">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Average Processing Time (min)</CardTitle>
        </div>
        <CardDescription>
          Average time (in seconds) to process documents by workflow.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="workflow"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={10} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="time"
              fill="var(--color-time)"
              radius={8}
              barSize={40}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TimeChart;
