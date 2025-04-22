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
        <div className="flex items-center gap-3 text-lg text-gray-600">
          <img src={weather.icon} alt="weather" className="w-10 h-10" />
          <span>{weather.description}</span>
          <span className='flex items-center gap-2'><FaTemperatureHigh fill='orange'/>{weather.temp}°C</span>
          <span className='flex items-center gap-2'><IoLocation fill='red'/>{weather.location}</span>
        </div>
      );
 };


export default WeatherDisplay