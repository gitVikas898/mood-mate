import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const MoodTrend = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem("moodEntries")) || [];
    const transformed = raw.map((entry) => ({
      date: entry.date,
      moodValue:
        entry.mood === "happy" ? 5 :
        entry.mood === "excited" ? 4 :
        entry.mood === "neutral" ? 3 :
        entry.mood === "sad" ? 2 :
        entry.mood === "angry" ? 1 : 0
    }));

    setData(transformed.reverse()); 
  }, []);

  return (
    <div className="w-full h-[300px] grid gap-2">
         <h1 className="text-3xl font-semibold text-center text-indigo-800">
          Mood Trends
        </h1>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 5]} tickCount={6} />
          <Tooltip />
          <Line type="monotone" dataKey="moodValue" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodTrend;
