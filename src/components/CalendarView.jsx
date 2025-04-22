import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';


const CalendarView = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('moodEntries')) || [];
    setEntries(stored);
  }, []);

  const getMoodForDate = (date) => {
    const formatted = date.toISOString().split('T')[0];
    const entry = entries.find((e) => e.date === formatted);
    return entry?.mood || null;
  };

  return (
    <div className="mt-6 w-full flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Mood Calendar</h2>

      <div className="rounded-xl overflow-hidden border border-gray-300 shadow-sm p-2 bg-white">
        <Calendar
          tileClassName={({ date }) => {
            const mood = getMoodForDate(date);
            return mood ? `mood-${mood.toLowerCase()}` : '';
          }}
        />
      </div>
    </div>
  );
};

export default CalendarView;
