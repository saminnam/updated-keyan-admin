import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ChartComponent = () => {
  const data = [
    { name: "Jan", Sales: 4000, Revenue: 2400 },
    { name: "Feb", Sales: 3000, Revenue: 1398 },
    { name: "Mar", Sales: 2000, Revenue: 9800 },
    { name: "Apr", Sales: 2780, Revenue: 3908 },
    { name: "May", Sales: 1890, Revenue: 4800 },
    { name: "Jun", Sales: 2390, Revenue: 3800 },
    { name: "Jul", Sales: 3490, Revenue: 4300 },
    { name: "Aug", Sales: 2780, Revenue: 3908 },
    { name: "Sep", Sales: 1890, Revenue: 4800 },
    { name: "Oct", Sales: 2390, Revenue: 3800 },
    { name: "Nov", Sales: 3490, Revenue: 4300 },
    { name: "Dec", Sales: 3490, Revenue: 4300 },
  ];

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Sales" stroke="#8884d8" />
          <Line type="monotone" dataKey="Revenue" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
