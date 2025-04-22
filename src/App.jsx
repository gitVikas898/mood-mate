
import { useState } from 'react'
import './App.css'
import DateDisplay from './components/DateDisplay'
import MoodSelector from './components/MoodSelector'

function App() {
  const [mood,setMood] = useState("");

  return (
   <div>
        <h1>Mood Mate</h1>
        <DateDisplay/>
        <MoodSelector setMood={setMood}/>
        <p>Selected Mood:{mood}</p>
   </div>
  )
}

export default App
