import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { colors } from "../theme";

export default function IncomeChart({
  data,
}: {
  data: { date: string; income: number }[];
}) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: colors.white1,
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <p style={{ color: colors.darkGreen1 }}>{label}</p>
          <p style={{ color: colors.lightGreen2 }}>{payload[0].value} RON</p>
        </div>
      );
    }
    return null;
  };
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#82ca9d"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
