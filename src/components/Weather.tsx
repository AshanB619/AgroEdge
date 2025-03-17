'use client';

// import GlowingEffectDemo from "../../text";
import "../app/globals.css";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FiWind } from "react-icons/fi";
import { WiHumidity, WiSunrise, WiSunset } from "react-icons/wi";
import Loading from "../components/loading";


export default function WeatherPage() {
  const [weather, setWeather] = useState<{ main?: any; name?: string; sys?: any; weather?: any[]; wind?: any }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("");

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Fetch Weather Error", error);
      
      if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
        setError("City not found. Please check the spelling.");
      } else {
        setError("Failed to fetch weather data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (weatherCode: string) => {
    // Map OpenWeatherMap weather codes to appropriate icon components or images
    switch (weatherCode) {
      case '01d': return '☀️'; // clear sky day
      case '01n': return '🌙'; // clear sky night
      case '02d': case '02n': return '🌤️'; // few clouds
      case '03d': case '03n': return '☁️'; // scattered clouds
      case '04d': case '04n': return '☁️'; // broken clouds
      case '09d': case '09n': return '🌧️'; // shower rain
      case '10d': case '10n': return '🌦️'; // rain
      case '11d': case '11n': return '⛈️'; // thunderstorm
      case '13d': case '13n': return '❄️'; // snow
      case '50d': case '50n': return '🌫️'; // mist
      default: return '☁️';
    }
  };

  // Function to generate forecast data (placeholder)
  const generateForecastData = () => {
    if (!weather.main) return [];
    
    // This is a placeholder. In a real app, you'd use the forecast API
    const baseTemp = weather.main.temp;
    const weatherIcons = weather.weather && weather.weather[0] ? [
      weather.weather[0].icon,
      '01d', // sunny
      '10d', // rain
      '02d', // partly cloudy
      '01d', // sunny
      '03d', // cloudy
      '10d', // rain
      '01d', // sunny
      '02d', // partly cloudy
      '01d'  // sunny
    ] : Array(10).fill('01d');
    
    return Array(10).fill(0).map((_, i) => ({
      day: i === 0 ? 'Today' : `Day ${i+1}`,
      temp: Math.round(baseTemp + (Math.random() * 6 - 3)), // Random temp variation
      icon: weatherIcons[i]
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Content Area - Next to Sidebar */}
      <div className="flex-grow pl-80"> {/* Add left padding to make space for sidebar */}
        <div className="px-6 py-8">
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <form onSubmit={fetchWeather} className="flex items-center w-full bg-white rounded-full shadow-md overflow-hidden border border-gray-200">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-grow px-4 py-3 bg-transparent border-none focus:outline-none text-gray-700"
                type="text"
                placeholder="Search city"
              />
              <button 
                type="submit" 
                className="px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <BsSearch size={18} />
              </button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-center mb-6 text-red-500 bg-red-50 mx-auto max-w-md p-2 rounded">
              {error}
            </div>
          )}

          {/* Loading Indicator */}
          {loading && <Loading />}

          {/* Weather Display */}
          {!loading && weather.main && (
            <div>
              {/* Main Weather Card */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex items-center">
                  <div className="rounded-full bg-green-500 text-white px-4 py-1 mr-3">
                    {weather.name}
                  </div>
                  <div className="text-gray-500">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-8">
                  <div className="text-7xl font-light">
                    {Math.round(weather.main.temp)}°C
                  </div>
                  <div className="text-9xl">
                    {weather.weather && weather.weather[0] && getWeatherIcon(weather.weather[0].icon)}
                  </div>
                </div>
                
                <div className="mt-4 text-xl text-gray-600">
                  {weather.weather && weather.weather[0] && weather.weather[0].main}
                  <span className="text-sm ml-2">Feels like {Math.round(weather.main.feels_like)}°</span>
                </div>
              </div>
              
              {/* Weather Details Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Wind Status */}
                <div className="bg-white rounded-xl shadow-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-gray-500">Wind Status</h3>
                    <FiWind size={24} className="text-blue-500" />
                  </div>
                  <div className="flex items-end">
                    <span className="text-3xl font-medium">{weather.wind ? weather.wind.speed : 0}</span>
                    <span className="ml-1 text-gray-500">km/h</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    {weather.wind && weather.wind.deg ? `Direction: ${weather.wind.deg}°` : ''}
                  </div>
                </div>
                
                {/* Humidity */}
                <div className="bg-white rounded-xl shadow-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-gray-500">Humidity</h3>
                    <WiHumidity size={32} className="text-teal-500" />
                  </div>
                  <div className="flex items-end">
                    <span className="text-3xl font-medium">{weather.main.humidity}</span>
                    <span className="ml-1 text-gray-500">%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-teal-500 h-2 rounded-full" 
                      style={{ width: `${weather.main.humidity}%` }} 
                    />
                  </div>
                </div>
                
                {/* Sunrise */}
                <div className="bg-white rounded-xl shadow-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-gray-500">Sunrise</h3>
                    <WiSunrise size={32} className="text-yellow-500" />
                  </div>
                  <div className="text-2xl font-medium">
                    {weather.sys && new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    {weather.sys && `${new Date(weather.sys.sunrise * 1000).toLocaleDateString()}`}
                  </div>
                </div>
                
                {/* Sunset */}
                <div className="bg-white rounded-xl shadow-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-gray-500">Sunset</h3>
                    <WiSunset size={32} className="text-orange-500" />
                  </div>
                  <div className="text-2xl font-medium">
                    {weather.sys && new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    {weather.sys && `${new Date(weather.sys.sunset * 1000).toLocaleDateString()}`}
                  </div>
                </div>
              </div>
              
              {/* 10 Day Forecast */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-medium mb-4">10 Day Forecast</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {generateForecastData().map((day, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="font-medium">{day.day}</div>
                      <div className="text-4xl my-2">
                        {getWeatherIcon(day.icon)}
                      </div>
                      <div className="font-medium">{day.temp}°C</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}