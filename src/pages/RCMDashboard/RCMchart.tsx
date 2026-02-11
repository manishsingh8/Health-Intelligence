import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  DollarSign,
  FileText,
  AlertCircle,
  Clock,
  Repeat,
} from "lucide-react";
import { piePalette, COLORS } from "@/lib/utils";

export default function OperationalView() {
  /* ---------------- KPI CARD DATA ---------------- */
  const kpis = [
    {
      title: "Bank Statements",
      amount: 1250000,
      count: 3482,
      icon: FileText,
    },
    {
      title: "Remits",
      amount: 920000,
      count: 1924,
      icon: Repeat,
    },
    {
      title: "Posting",
      amount: 1480000,
      count: 2875,
      icon: DollarSign,
    },
    {
      title: "Exceptions",
      amount: 86000,
      count: 94,
      icon: AlertCircle,
    },
    {
      title: "Avg Posting Time",
      minutes: 7.4,
      icon: Clock,
    },
  ];

  /* ---------------- CHART DATA ---------------- */
  const postingTypeData = [
    { type: "Auto", count: 1800, amount: 450000 },
    { type: "Manual", count: 485, amount: 120000 },
  ];

  const remittanceIntakeData = [
    { type: "ERA", count: 2400, amount: 780000 },
    { type: "EOB", count: 1173, amount: 420000 },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <p className="text-lg font-semibold">Operational Performance View</p>
        <p className="text-sm text-muted-foreground">
          KPI definitions and chart-based insights
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ================= KPI CARDS ================= */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;

            return (
              <Card key={idx}>
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">{kpi.title}</p>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  {/* Amount */}
                  {kpi.amount !== undefined && (
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Amount in Dollars
                      </p>
                      <p className="font-medium">
                        ${kpi.amount.toLocaleString()}
                      </p>
                    </div>
                  )}

                  {/* Transactions */}
                  {kpi.count !== undefined && (
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Count of Transactions
                      </p>
                      <p className="font-medium">
                        {kpi.count.toLocaleString()}
                      </p>
                    </div>
                  )}

                  {/* Avg Posting Time */}
                  {kpi.minutes !== undefined && (
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Average Time (mins)
                      </p>
                      <p className="font-medium">
                        {kpi.minutes} mins
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ================= ROW 19 ================= */}
        <Card>
          <CardHeader>
            <p className="text-sm font-medium">
              Different Types of Posting (Chart)
            </p>
            <p className="text-xs text-muted-foreground">
              Amount in Dollars, Count of Transactions
            </p>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={postingTypeData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Count" fill={COLORS.medium} />
                <Bar dataKey="amount" name="Amount ($)" fill={COLORS.high} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ================= ROW 20 ================= */}
        <Card>
          <CardHeader>
            <p className="text-sm font-medium">
              Remittance Intake (Chart)
            </p>
            <p className="text-xs text-muted-foreground">
              ERA vs EOB
            </p>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={remittanceIntakeData}
                  dataKey="count"
                  nameKey="type"
                  outerRadius={90}
                  label={(e: any) => `${e.type}: ${e.count}`}
                >
                  {remittanceIntakeData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={piePalette[i % piePalette.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
