import React from 'react'

const DateDisplay = () => {
    const today = new Date().toDateString();

  return (
    <p className='text-2xl font-semibold'>
        {today}
    </p>
  )
}

export default DateDisplay