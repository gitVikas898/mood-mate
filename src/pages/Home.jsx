import { useState } from "react";
import Header from "../components/Header";
import DateDisplay from "../components/DateDisplay"
import MoodSelector from "../components/MoodSelector"
import NoteInput from "../components/NoteInput"
import CalendarView from "../components/CalendarView"

function Home() {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [weather, setWeather] = useState(null);

  const handleSave = () => {
    if (!mood || !note || !weather) {
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
  };

  return (
    <>
      <Header setWeather={setWeather}/>
      <div className="flex gap-4  items-center justify-center min-h-screen">
        <div className="grid gap-4 p-4 max-w-2xl border border-solid border-black">
          <DateDisplay />
          <MoodSelector setMood={setMood} mood={mood} />
          <NoteInput onNoteChange={setNote} />
          <button
            onClick={handleSave}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </div>
        <div className="border border-solid border-black p-4">
          <CalendarView />
        </div>
      </div>
    </>
  );
}

export default Home;
