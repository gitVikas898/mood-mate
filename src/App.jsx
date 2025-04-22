
import { useState } from 'react'
import './App.css'
import DateDisplay from './components/DateDisplay'
import MoodSelector from './components/MoodSelector'
import NoteInput from './components/NoteInput';
import CalendarView from './components/CalendarView';
import WeatherDisplay from './components/WeatherDisplay';


function App() {
  const [mood,setMood] = useState("");
  const [note, setNote] = useState("");
  const [weather, setWeather] = useState(null);
  const handleSave =()=>{
    if(!mood || !note ||!weather){
      alert("Please select a mood and note");
      return;
    }

    const entry = {
      date: new Date().toISOString().split("T")[0],
      mood,
      note,
      weather,
    };

    const stored = JSON.parse(localStorage.getItem("moodEntries")) || [];
    localStorage.setItem("moodEntries", JSON.stringify([...stored, entry]));

    setMood("");
    setNote("");
    alert("Entry saved!");
  }
  return (
   <div>
        <h1>Mood Mate</h1>
        <DateDisplay/>
        <WeatherDisplay onWeatherFetched={setWeather} />
        <MoodSelector setMood={setMood}/>
        <p>Selected Mood:{mood}</p>
        <NoteInput onNoteChange={setNote}/>
        <button onClick={handleSave} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Save
        </button>
        <CalendarView/>
   </div>
  )
}

export default App
