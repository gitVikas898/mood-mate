import React from 'react'
import { useState } from 'react'
import { moods } from '../constants/constants';

const MoodSelector = ({setMood,mood ,error}) => {
    const[selectedMood,setSelectedMood] = useState(null);

    const handleMoodClick = (mood)=>{
        setSelectedMood(mood.label);
        setMood(mood.label);
    }
  return (
    <div className='flex flex-col items-center justify-between gap-2'>
        <h1 className='text-2xl text-blue-950 font-semibold'>How are you feeling today?</h1>
        <p className='text-xl text-blue-950 font-semibold'>Selected Mood: {mood.toUpperCase()}</p>
        <div>
            {
                moods.map((mood)=>{
                    return(
                        <button
                            key={mood.label}
                            onClick={()=>handleMoodClick(mood)}
                            className={`text-4xl p-2 rounded-full mr-4 transition-transform duration-150 text-center ${
                                selectedMood === mood.label
                                  ? "bg-blue-200 scale-125"
                                  : "bg-gray-100 hover:scale-125"
                              }`}
                        >
                            {mood.emoji}
                        </button>
                    )
                })
            }
        </div>
       {error?.mood && <p className='text-red-500 text-sm'>{error?.mood}</p>}
    </div>
  )
}

export default MoodSelector