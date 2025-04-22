import React from 'react'
import WeatherDisplay from './WeatherDisplay'
import { Link } from 'react-router-dom'

const Header = ({setWeather}) => {
  return (
    <nav className='flex items-center justify-between container mx-auto p-4'>
        <div>
            <h1 className='text-2xl'>Mood Mate</h1>
        </div>
        <div>
            <Link to={"/history"}>History</Link>
        </div>
        <div>
            <WeatherDisplay onWeatherFetched={setWeather} />
        </div>
    </nav>
  )
}

export default Header