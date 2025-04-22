import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import "react-calendar/dist/Calendar.css";


const CalendarView = () => {

    const[entries,setEntries] = useState([]);

    useEffect(()=>{
        const stored = JSON.parse(localStorage.getItem("moodEntries"))|| [];
        setEntries(stored);
    },[]);

    const getMoodForDate = (date)=>{
        const formatted = date.toISOString().split("T")[0];
        const entry = entries.find((e)=>e.date === formatted);
        return entry?.mood || null;
    }

  return (
    <div className="mt-10 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Mood Calendar</h2>

      <Calendar
        tileClassName={({ date }) => {
          const mood = getMoodForDate(date);
          return mood ? `mood-${mood}` : "";
        }}
      />
    </div>
  )
}

export default CalendarView