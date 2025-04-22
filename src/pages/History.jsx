import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const History = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('moodEntries')) || [];
    setEntries(stored.reverse());
  }, []);

  if (!entries.length) {
    return <p className="text-center mt-8 text-gray-500">No entries yet.</p>;
  }

  const renderMoodEmoji = (mood) => {
    switch (mood) {
      case 'happy':
        return '😀';
      case 'sad':
        return '😢';
      case 'neutral':
        return '😐';
      case 'angry':
        return '😠';
      case 'excited':
        return '🤩';
      default:
        return '🙂';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <header className="mb-6 text-center">
        <Link
          to="/"
          className="text-indigo-600 hover:text-indigo-800 underline text-lg"
        >
          ← Back to Home
        </Link>
      </header>

      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center text-indigo-800">
          Mood Journal History
        </h1>

        {entries.map((entry, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-indigo-300 transition-all hover:shadow-lg"
          >
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>{entry.date}</span>
              <span>{entry.weather?.temp} °C</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-6xl">{renderMoodEmoji(entry.mood)}</span>
              <p className="text-gray-800 text-lg">{entry.note}</p>
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
    </div>
  );
};

export default History;
