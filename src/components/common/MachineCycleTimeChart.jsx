import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

export default function MachineCycleTimeChart({Arrdata}) {

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
    cycle_time: Arrdata[i] ?? 0,
  }));
  
  return (
    <div className="w-full h-[400px] py-8 rounded-2xl">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">
        Cycle Time Analysis by Hour
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data} responsive>
          <CartesianGrid strokeDasharray="3 3" className="strock-gray-200" />
          <XAxis
            dataKey="time"
            interval={0}
            // angle={-60}
            textAnchor="middle"
            height={60}
            tick={{ fontSize: 12 }}
            // name="Time"
          >
            <Label value="Time (hour)" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis tick={{ fontSize: 12 }}>
            <Label
              value="Cycle Time Value (sec)"
              angle={-90}
              position="insideLeft"
              // offset={0}
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip />
          <Legend />
          <Line
            type="monotone" // โค้ง smooth
            dataKey="cycle_time"
            stroke="#60a5fa"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
