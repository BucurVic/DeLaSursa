import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function IncomeChart({
  data,
}: {
  data: { date: string; income: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value) => `${value} LEI`} />
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
