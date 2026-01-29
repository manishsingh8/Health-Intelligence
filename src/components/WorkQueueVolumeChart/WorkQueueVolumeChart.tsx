import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { workQueueData, type WorkQueueDataPoint } from "@/constants/RCMDashboardData";


/**
 * Visual styling/colors — pick values consistent with your theme.
 * You can replace these with CSS variables if you prefer.
 */
const colors = {
  new: "#166F4C", // dark green
  completed: "#249563", // primary green
  rollover: "#6CCBA2", // light green / teal
};

interface Props {
  data?: WorkQueueDataPoint[]; // optional override, defaults to workQueueData
}

export default function WorkQueueVolumeChart({ data = workQueueData }: Props) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-start gap-1">
        <p className="text-sm font-medium">
          Work Queue Activity Analysis
        </p>
        <div className="text-xs text-muted-foreground">
          Daily Activity summary showing in the queue.
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-4">
          <div style={{ width: "100%", height: 340 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 8, right: 16, left: 0, bottom: 4 }}
              >
                <defs>
                  <linearGradient id="gNew" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor={colors.new} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={colors.new} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gCompleted" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor={colors.completed} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={colors.completed} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gRollover" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor={colors.rollover} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={colors.rollover} stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  fontSize={12}
                  // optionally format dates here if needed
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                  }}
                  labelStyle={{ color: "var(--muted-foreground)", fontWeight: 600 }}
                  itemStyle={{ color: "var(--foreground)" }}
                  formatter={(value: number) => `${value}`}
                />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: 8 }} />

                <Area
                  type="monotone"
                  dataKey="New Items"
                  stroke={colors.new}
                  fill="url(#gNew)"
                  fillOpacity={1}
                  name="New"
                />
                <Area
                  type="monotone"
                  dataKey="Completed Items"
                  stroke={colors.completed}
                  fill="url(#gCompleted)"
                  fillOpacity={1}
                  name="Completed"
                />
                <Area
                  type="monotone"
                  dataKey="Rollover Items"
                  stroke={colors.rollover}
                  fill="url(#gRollover)"
                  fillOpacity={1}
                  name="Rollover"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
