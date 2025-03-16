import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Dịch vụ A", sales: 120 },
  { name: "Dịch vụ B", sales: 150 },
  { name: "Dịch vụ C", sales: 80 },
  { name: "Dịch vụ D", sales: 200 },
  { name: "Dịch vụ E", sales: 90 },
];

export default function ServiceSalesChart() {
  return (
    <div className="w-full  p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-center text-black text-lg font-semibold mb-4">Services sales</h2>
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" stroke="black" hide />
          <YAxis dataKey="name" type="category" stroke="black" />
          <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
          <Bar dataKey="sales" fill="#00C49F" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
