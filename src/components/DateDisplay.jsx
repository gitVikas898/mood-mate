import React from 'react'

const DateDisplay = () => {
    const today = new Date().toDateString();

  return (
    <p className='text-2xl text-center text-blue-950 font-semibold'>
        {today}
    </p>
  )
}

export default DateDisplay