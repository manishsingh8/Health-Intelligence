import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export interface DoughnutDataItem {
  label: string;
  value: number;
  color: string;
}

interface Props {
  title?: string;
  description?: string;
  data: DoughnutDataItem[];
  icon?: React.ComponentType<{ className?: string }>;
  legendPosition?: "right" | "bottom"; // customizable
}

const ReusableDoughnutChart = ({
  title,
  description,
  data,
  icon: Icon,
}: // legendPosition = "right",
Props) => {
  return (
    <div className="w-full flex flex-col gap-4 p-4 border rounded-xl bg-white">
      {/* HEADER */}
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
        {title && <h2 className="font-semibold text-lg">{title}</h2>}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      {/* FLEX LAYOUT — legend can be placed right or bottom */}
      <div className="flex relative justify-start">
        {/* DOUGHNUT CHART */}
        <div className="w-[300px] h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip />
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                innerRadius="50%"
                outerRadius="80%"
                paddingAngle={2}
              >
                {data.map((item, index) => (
                  <Cell key={index} fill={item.color} stroke="#fff" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* CUSTOM LEGEND */}
        <div className="absolute right-0 bottom-0 max-w-[150px]">
          <h3 className="font-medium">Status</h3>
          {data.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span
                className="h-3 w-3 rounded-sm min-w-[12px]"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-600">
                {item.label} ({item.value}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReusableDoughnutChart;
