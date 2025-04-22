
import { useState } from 'react'
import './App.css'
import DateDisplay from './components/DateDisplay'
import MoodSelector from './components/MoodSelector'
import NoteInput from './components/NoteInput';
import CalendarView from './components/CalendarView';


function App() {
  const [mood,setMood] = useState("");
  const [note, setNote] = useState("");
  const handleSave =()=>{
    if(!mood || !note){
      alert("Please select a mood and note");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const newEntery = {date:today,mood,note};
    const existing = JSON.parse(localStorage.getItem("moodEntries"))||[];
    const updated = [...existing,newEntery];

    localStorage.setItem("moodEntries",JSON.stringify(updated));
    alert("Entery Saved");
  }
  return (
   <div>
        <h1>Mood Mate</h1>
        <DateDisplay/>
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
