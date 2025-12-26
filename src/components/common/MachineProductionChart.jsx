import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

export default function MachineProductionChart({Arrdata}) {
  const hours = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
  ];

  const data = hours.map((t, i) => ({
    time: t,
    Production: Arrdata[i] ?? 0,
  }));

  return (
    <div className="w-full h-[400px] py-8 rounded-2xl">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">
        Production by Hour
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} responsive>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12 }}
            interval={0} // แสดงทุกค่า ไม่เว้น
            height={40}
            // angle={-45}
            //   tickMargin={1}
            name="Time"
          >
            <Label value="Time (hour)" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis tick={{ fontSize: 12 }}>
            <Label
              value="Production Qty (pcs)"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip />
          <Bar dataKey="Production" fill="#60a5fa" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
