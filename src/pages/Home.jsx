import { useState } from "react";
import Header from "../components/Header";
import DateDisplay from "../components/DateDisplay";
import MoodSelector from "../components/MoodSelector";
import NoteInput from "../components/NoteInput";
import CalendarView from "../components/CalendarView";
import Popup from "../components/Popup";

function Home() {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState({});
  const [showPopup,setShowPopup] = useState(false);

  const handleSave = () => {
    const errorMessage = {};
    if (!mood) {
      errorMessage.mood = "Please Select a Mood Emoji";
    }
    if (!note) {
      errorMessage.note = "Please Type a note";
    }

    if (Object.keys(errorMessage).length > 0) {
      setError(errorMessage);
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
    setError({});
    setShowPopup(true);

    setTimeout(()=>{
      setShowPopup(false);
    },2500)
  };

  return (
    <>
      <Header setWeather={setWeather} />
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
          <div className="flex flex-col lg:flex-row gap-6 items-start justify-center max-w-7xl mx-auto">
            <div className="grid gap-4 p-6 bg-white rounded-xl shadow-md w-full max-w-2xl border border-gray-200">
              <DateDisplay />
              <MoodSelector setMood={setMood} mood={mood} error={error} />
              <NoteInput onNoteChange={setNote} error={error} />
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
      </div>
      {
        showPopup && (<Popup/>)
      }
    </>
  );
}

export default Home;
