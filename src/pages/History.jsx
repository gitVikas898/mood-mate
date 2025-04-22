import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MoodTrend from "../components/MoodTrends";

const History = () => {
  const [entries, setEntries] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedWeather, setSelectedWeather] = useState("");
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("moodEntries")) || [];
    setEntries(stored.reverse());
  }, []);

  if (!entries.length) {
    return <p className="text-center mt-8 text-gray-500">No entries yet.</p>;
  }

  const filteredEntries = entries.filter((entry) => {
    const isMoodSelected = selectedMood !== "";
    const isWeatherSelected = selectedWeather !== "";
  
    const moodMatches = !isMoodSelected || entry.mood === selectedMood;
    const weatherMatches = !isWeatherSelected || entry.weather?.description?.toLowerCase().includes(selectedWeather.toLowerCase());
  
    return moodMatches && weatherMatches;
  });

  const renderMoodEmoji = (mood) => {
    switch (mood) {
      case "happy":
        return "😀";
      case "sad":
        return "😢";
      case "neutral":
        return "😐";
      case "angry":
        return "😠";
      case "excited":
        return "🤩";
      default:
        return "🙂";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <header className="mb-6 text-center">
        <Link
          to="/"
          className="text-indigo-600 hover:text-indigo-800 underline text-lg font-medium"
        >
          ← Back to Home
        </Link>
      </header>
  
      {/* Filter Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 justify-center mb-8">
        <select
          value={selectedMood}
          onChange={(e) => setSelectedMood(e.target.value)}
          className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All Moods</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="neutral">Neutral</option>
          <option value="angry">Angry</option>
          <option value="excited">Excited</option>
        </select>
  
        <select
          value={selectedWeather}
          onChange={(e) => setSelectedWeather(e.target.value)}
          className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All Weather</option>
          <option value="clear">Clear</option>
          <option value="clouds">Cloudy</option>
          <option value="rain">Rain</option>
          <option value="thunderstorm">Thunderstorm</option>
          <option value="snow">Snow</option>
        </select>
  
        <button
          onClick={() => {
            setSelectedMood("");
            setSelectedWeather("");
          }}
          className="text-sm bg-indigo-500 rounded-md text-white px-4 py-2 hover:bg-indigo-600 transition-all"
        >
          Clear Filters
        </button>
      </div>
  
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-center text-indigo-800">
          Mood Journal History
        </h1>
  
        <div className="grid gap-6">
          {filteredEntries.map((entry, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-400 transition-all hover:shadow-lg"
            >
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>{entry.date}</span>
                <span>{entry.weather?.temp} °C</span>
              </div>
  
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <span className="text-5xl">{renderMoodEmoji(entry.mood)}</span>
                <p className="text-gray-800 text-base">{entry.note}</p>
              </div>
  
              {entry.weather?.icon && (
                <div className="flex items-center justify-end gap-2">
                  <img
                    src={entry.weather.icon}
                    alt="weather"
                    className="w-10 h-10"
                  />
                  <span className="text-gray-600 text-sm italic">
                    {entry.weather.description}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
  
        <div className="mt-12">
          <MoodTrend />
        </div>
      </div>
    </div>
  );
};

export default History;
