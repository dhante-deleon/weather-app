import React from 'react';
import { useWeatherContext } from '../context/WeatherContext';

interface HeaderProps {
  onLocationClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLocationClick }) => {
  const { isDarkMode, toggleDarkMode, temperatureUnit, setTemperatureUnit } = useWeatherContext();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 7 15.5 7 14 7.67 14 8.5s.67 1.5 1.5 1.5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">WeatherApp</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Real-time Weather Updates</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Current Location Button */}
            <button
              onClick={onLocationClick}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 group"
              title="Use current location"
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94-3c-.46-1.27-1.51-2.32-2.78-2.78V2h-2v.44C16.16 2.16 14.17 2 12 2s-4.16.16-4.16.44V2H5.84v.22C4.51 2.68 3.46 3.73 3 5H2v2h.22C2.16 7.84 2 9.83 2 12s.16 4.16.44 4.16H2v2h2v-.22c.46 1.27 1.51 2.32 2.78 2.78V22h2v-.44C7.84 21.84 9.83 22 12 22s4.16-.16 4.16-.44V22h2v-.22c1.27-.46 2.32-1.51 2.78-2.78H22v-2h-.22c.28-.99.44-2.98.44-5.16s-.16-4.16-.44-4.16H22V5h-2v.22zm-1 8c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z" />
              </svg>
            </button>

            {/* Temperature Unit Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setTemperatureUnit('C')}
                className={`px-3 py-1 rounded-md font-semibold text-sm transition-all ${
                  temperatureUnit === 'C'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                °C
              </button>
              <button
                onClick={() => setTemperatureUnit('F')}
                className={`px-3 py-1 rounded-md font-semibold text-sm transition-all ${
                  temperatureUnit === 'F'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                °F
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 group"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
