import React from 'react'
import { useState } from 'react'
import { moods } from '../constants/constants';

const MoodSelector = ({setMood}) => {
    const[selectedMood,setSelectedMood] = useState(null);

    const handleMoodClick = (mood)=>{
        setSelectedMood(mood.label);
        setMood(mood.label);
    }
  return (
    <div>
        <h1>How are you feeling today?</h1>
        <div>
            {
                moods.map((mood)=>{
                    return(
                        <button
                            key={mood.label}
                            onClick={()=>handleMoodClick(mood)}
                            className={`text-4xl p-2 rounded-full transition-transform duration-150 ${
                                selectedMood === mood.label
                                  ? "bg-blue-200 scale-110"
                                  : "bg-gray-100 hover:scale-105"
                              }`}
                        >
                            {mood.emoji}
                        </button>
                    )
                })
            }
        </div>
    </div>
  )
}

export default MoodSelector