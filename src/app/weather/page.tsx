'use client';

import GlowingEffectDemo from "../../text"
import "../globals.css";
import axios from "axios";
import { a } from "motion/react-client";
import { use, useState } from "react";
import { BsSearch } from "react-icons/bs"; 

export default function WeatherPage() {

  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState(" ");

  const fetchWeather = async (e) =>{
    e.preventDefault(); 

    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY }`;

    try{
      const response = await axios.get(url);
      setWeather(response.data);
      console.log(response.data); 
      setLoading(false);
    }
     
    catch(error){
      console.error("Fetch Weather Error", error);
      
      if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
        setError("City not found. Please check the spelling.");
      } else {
        setError("Failed to fetch weather data. Please try again.");
      }
    }
    finally{
      setCity("");
      setLoading(false);
    }
    
  }

  
    return (
      <>
      <GlowingEffectDemo />

      <div className="relative flex items-center justify-between max-w-[500px] w-full m-auto mt-10 text-black z-10 "> 
        <form onSubmit={fetchWeather} className="flex justify-between w-full m-auto p-3 bg-transparent border border-gray-300 rounded-2xl">
           <div>
            <input onChange={(e)=>setCity(e.target.value)} className="bg-transparent border-none focus:outline-none w-full" type="text" placeholder="Search city " />
           </div>
           <button onClick={fetchWeather}>
             <BsSearch />
           </button>
        </form>
      </div>

      {/* {weather} */}

      
      </>
        
      
    );
  }
  