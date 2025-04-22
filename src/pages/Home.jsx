import { useState } from "react";
import Header from "../components/Header";
import DateDisplay from "../components/DateDisplay";
import MoodSelector from "../components/MoodSelector";
import NoteInput from "../components/NoteInput";
import CalendarView from "../components/CalendarView";

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
      <Header setWeather={setWeather} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center max-w-7xl mx-auto">
          <div className="grid gap-4 p-6 bg-white rounded-xl shadow-md w-full max-w-2xl border border-gray-200">
            <DateDisplay />
            <MoodSelector setMood={setMood} mood={mood} />
            <NoteInput onNoteChange={setNote} />
            <button
              onClick={handleSave}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              Save
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md border border-gray-200">
            <CalendarView />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
