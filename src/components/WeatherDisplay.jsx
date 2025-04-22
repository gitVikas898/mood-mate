import React, { useEffect, useState } from 'react'
import { IoLocation } from "react-icons/io5";
import { FaTemperatureHigh } from "react-icons/fa";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const fetchWeather = async (lat, lon) => {
    
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&lat=${lat}&lon=${lon}&units=metric`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    return {
      location:data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };
  };


const WeatherDisplay = ({ onWeatherFetched}) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            const weatherData = await fetchWeather(latitude, longitude);
            setWeather(weatherData);
            onWeatherFetched(weatherData); 
          },
          (err) => console.error("Geolocation error:", err)
        );
      }, [onWeatherFetched]);
      if (!weather) return <p>Fetching weather...</p>;
  
      return (
        <div className="flex flex-wrap items-center justify-center gap-4 text-base sm:text-lg text-gray-600">
        <div className="flex items-center gap-2">
          <img src={weather.icon} alt="weather" className="w-8 h-8 sm:w-10 sm:h-10" />
          <span>{weather.description}</span>
        </div>
      
        <div className="flex items-center gap-2">
          <FaTemperatureHigh fill="orange" className="text-xl" />
          <span>{weather.temp}°C</span>
        </div>
      
        <div className="flex items-center gap-2">
          <IoLocation fill="red" className="text-xl" />
          <span>{weather.location}</span>
        </div>
      </div>
      
      );
 };


export default WeatherDisplay