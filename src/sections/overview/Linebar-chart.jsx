import { ComposedChart, Line, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 13000 },
  { month: "May", revenue: 22000 },
  { month: "Jun", revenue: 19000 },
  { month: "Jul", revenue: 25000 },
  { month: "Aug", revenue: 21000 },
  { month: "Sep", revenue: 23000 },
  { month: "Oct", revenue: 28000 },
  { month: "Nov", revenue: 30000 },
  { month: "Dec", revenue: 32000 },
];

export default function LineBarAreaComposedChart() {
  return (
    <div className="w-full  mx-auto p-4 bg-white shadow-lg rounded-lg">
      Total income in year
      <h2 className="text-center text-white text-xl font-semibold mb-4">Tổng Thu Nhập Từng Tháng</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="gray" />
          <XAxis dataKey="month" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
          <Legend />
          
          {/* Area Chart */}
          <Area type="monotone" dataKey="revenue" fill="#8884d8" stroke="#8884d8" />

          {/* Bar Chart */}
          <Bar dataKey="revenue" barSize={30} fill="#00C49F" />

          {/* Line Chart */}
          <Line type="monotone" dataKey="revenue" stroke="#FFBB28" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
