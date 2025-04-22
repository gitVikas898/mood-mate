import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const History = () => {
    const [entries, setEntries] = useState([]);
    
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("moodEntries")) || [];
        setEntries(stored.reverse());
      }, [])

      if (!entries.length) {
        return <p className="text-center mt-8">No entries yet.</p>;
      }
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
    <div>
        <header>
            <Link to={"/"}>Home</Link>
        </header>
        <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Mood Journal History</h1>

      {entries.map((entry, index) => (
        <div
          key={index}
          className="bg-white shadow rounded p-4 mb-4 border-l-4 grid gap-2"
         
        >
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>{entry.date}</span>
            <span>{entry.weather?.temp} °C </span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-7xl">{renderMoodEmoji(entry.mood)}</span>
            <p className="text-gray-700 text-2xl">{entry.note}</p>
          </div>

          {entry.weather?.icon && (
            <div className='flex items-center justify-end gap-2'>
                <img
              src={entry.weather.icon}
              alt="weather"
              className="w-10 h-10"
            />
                <span className='text-lg'>{entry.weather?.description}</span>
            </div>
            
          )}
        </div>
      ))}
    </div>
    </div>
  )
}

export default History