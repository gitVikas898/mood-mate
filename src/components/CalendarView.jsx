import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './calendarMoodStyles.css'; 

const CalendarView = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('moodEntries')) || [];
    setEntries(stored);
  }, []);

  const getMoodForDate = (date) => {
    const localDate = new Date(date);
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset()); // Handle timezone offset
    const formatted = localDate.toISOString().split('T')[0];
    const entry = entries.find((e) => e.date === formatted);
    return entry?.mood || null;
  };

  return (
    <div className="w-full px-4 mt-6 flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Mood Calendar</h2>

      <div className="w-full max-w-md rounded-xl overflow-hidden border border-gray-300 shadow-md p-4 bg-white">
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
