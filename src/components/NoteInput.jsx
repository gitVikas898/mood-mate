import React, { useState } from 'react'

const NoteInput = ({onNoteChange,error}) => {
    const[note,setNote] = useState("");
    
    const handleChange = (e)=>{
        setNote(e.target.value);
        onNoteChange(e.target.value);
    }

  return (
    <div>
        <textarea className="w-full p-3 border rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
         value={note} rows={4} id="note"
         placeholder='Add a note'
         onChange={handleChange}
         >

         </textarea>
       { error?.note && <p className='text-red-500 text-sm'>{error?.note}</p>}
    </div>
  )
}

export default NoteInput