import React from 'react';
import type { ForecastResponse } from '../services/weatherService';
import { useWeatherContext } from '../context/WeatherContext';
import { convertTemperature, getWeatherIconUrl, formatDate } from '../utils/weatherUtils';

interface ForecastListProps {
  forecast: ForecastResponse;
}

export const ForecastList: React.FC<ForecastListProps> = ({ forecast }) => {
  const { temperatureUnit } = useWeatherContext();

  // Group forecast by day (one entry per day at noon)
  const dailyForecasts = forecast.list
    .filter((_, index) => index % 8 === 0) // OpenWeatherMap returns 3-hour intervals, so 8 entries = 24 hours
    .slice(0, 7);

  return (
    <div className="w-full mt-8 animate-slideIn overflow-x-hidden">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">7-Day Forecast</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 w-full">
        {dailyForecasts.map((day, index) => {
          const temp = convertTemperature(day.main.temp, temperatureUnit);
          const minTemp = convertTemperature(day.main.temp_min, temperatureUnit);
          const maxTemp = convertTemperature(day.main.temp_max, temperatureUnit);
          const iconUrl = getWeatherIconUrl(day.weather[0].icon);
          
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Date */}
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">
                {formatDate(day.dt)}
              </p>

              {/* Icon */}
              <div className="flex justify-center mb-3">
                <img
                  src={iconUrl}
                  alt={day.weather[0].description}
                  className="w-16 h-16"
                  title={day.weather[0].description}
                />
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 dark:text-gray-400 capitalize mb-3 line-clamp-2">
                {day.weather[0].description}
              </p>

              {/* Temperature */}
              <div className="mb-3">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {temp}°{temperatureUnit}
                </p>
                <div className="flex justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>↑ {maxTemp}°</span>
                  <span>↓ {minTemp}°</span>
                </div>
              </div>

              {/* Additional Details */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-3 mt-3 space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </svg>
                  <span>{day.main.humidity}%</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.59 0c1.59 5.58 5 8 10.59 8 .46 0 .9-.03 1.35-.1V0H9.59zm0 10H0v5h10.59c0 1.48.35 2.9.99 4.14V10z" />
                  </svg>
                  <span>{Math.round(day.wind.speed)} m/s</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.04-1.04c-.29-.29-.77-.29-1.06 0-.29.29-.29.77 0 1.06l1.5 1.5c.29.29.77.29 1.06 0l3.25-4.13c.29-.38.21-.94-.17-1.23-.38-.29-.94-.21-1.23.17z" />
                  </svg>
                  <span>{(day.pop * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
