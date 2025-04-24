import React from 'react';
import WeatherDisplay from './WeatherDisplay';
import { Link } from 'react-router-dom';

const Header = ({ setWeather }) => {
  
  return (
    <nav className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-indigo-100 via-blue-50 to-indigo-100 shadow-md p-4">
      <div>
        <h1 className="text-3xl font-bold text-indigo-700 tracking-tight">Mood Mate</h1>
      </div>

      <div>
        <Link
          to="/history"
          className="text-indigo-600 hover:text-indigo-800 transition duration-200 underline underline-offset-4"
        >
          View History
        </Link>
      </div>
        
 
      <div>
        <WeatherDisplay onWeatherFetched={setWeather} />
      </div>
    </nav>
  );
};

export default Header;
