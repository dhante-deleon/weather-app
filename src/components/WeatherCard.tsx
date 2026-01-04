import React, { useState, useEffect } from 'react';
import type { CurrentWeatherResponse } from '../services/weatherService';
import { useWeatherContext } from '../context/WeatherContext';
import { convertTemperature, getWeatherIconUrl, formatDate, getWindDirection, formatTime } from '../utils/weatherUtils';

interface WeatherCardProps {
  weather: CurrentWeatherResponse;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const { temperatureUnit } = useWeatherContext();
  const [currentTime, setCurrentTime] = useState<string>(formatTime(Math.floor(Date.now() / 1000), weather.timezone));
  
  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      setCurrentTime(formatTime(now, weather.timezone));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [weather.timezone]);
  
  const temperature = convertTemperature(weather.main.temp, temperatureUnit);
  const feelsLike = convertTemperature(weather.main.feels_like, temperatureUnit);
  const minTemp = convertTemperature(weather.main.temp_min, temperatureUnit);
  const maxTemp = convertTemperature(weather.main.temp_max, temperatureUnit);
  
  const weatherDescription = weather.weather[0].description;
  const weatherIcon = getWeatherIconUrl(weather.weather[0].icon);
  const windDirection = getWindDirection(weather.wind.deg);
  
  return (
    <div className="w-full animate-fadeIn mb-8">
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-indigo-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        {/* Location and Date */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-4xl font-bold mb-1">{weather.name}, {weather.sys.country}</h2>
            <p className="text-blue-100">{formatDate(weather.dt)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100 mb-1">Local Time</p>
            <p className="text-lg font-semibold">{currentTime}</p>
          </div>
        </div>

        {/* Main Weather Display */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="mr-6">
              <img src={weatherIcon} alt={weatherDescription} className="w-32 h-32 filter drop-shadow-lg" />
            </div>
            <div>
              <div className="text-7xl font-bold mb-2">{temperature}°{temperatureUnit}</div>
              <p className="text-xl text-blue-100 capitalize">{weatherDescription}</p>
              <p className="text-sm text-blue-200 mt-2">Feels like {feelsLike}°{temperatureUnit}</p>
            </div>
          </div>
        </div>

        {/* Temperature Range */}
        <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-50 rounded-xl p-4 mb-6 shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-1 font-semibold">High</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{maxTemp}°{temperatureUnit}</p>
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-1 font-semibold">Low</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{minTemp}°{temperatureUnit}</p>
            </div>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Humidity */}
          <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-50 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300 text-sm font-semibold">Humidity</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{weather.main.humidity}%</p>
          </div>

          {/* Wind Speed */}
          <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-50 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.59 0c1.59 5.58 5 8 10.59 8 .46 0 .9-.03 1.35-.1V0H9.59zm0 10H0v5h10.59c0 1.48.35 2.9.99 4.14V10z" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300 text-sm font-semibold">Wind</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(weather.wind.speed)} m/s</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{windDirection}</p>
          </div>

          {/* Pressure */}
          <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-50 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300 text-sm font-semibold">Pressure</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{weather.main.pressure} mb</p>
          </div>

          {/* Visibility */}
          <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-50 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300 text-sm font-semibold">Visibility</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{(weather.visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>
      </div>
    </div>
  );
};
