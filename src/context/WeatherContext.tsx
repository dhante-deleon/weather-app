import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface WeatherContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  temperatureUnit: 'C' | 'F';
  setTemperatureUnit: (unit: 'C' | 'F') => void;
  recentSearches: string[];
  addRecentSearch: (city: string) => void;
  clearRecentSearches: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    // Default to false (light mode) if not saved
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>(() => {
    const saved = localStorage.getItem('temperatureUnit');
    return (saved as 'C' | 'F') || 'C';
  });

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  // Apply dark mode class on mount
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    const darkModeValue = saved !== null ? JSON.parse(saved) : false;
    // Ensure HTML element is properly configured
    if (darkModeValue) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Update dark mode class and localStorage when isDarkMode changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('temperatureUnit', temperatureUnit);
  }, [temperatureUnit]);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const addRecentSearch = (city: string) => {
    const filtered = recentSearches.filter(s => s.toLowerCase() !== city.toLowerCase());
    setRecentSearches([city, ...filtered].slice(0, 5));
  };

  const clearRecentSearches = () => setRecentSearches([]);

  return (
    <WeatherContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        temperatureUnit,
        setTemperatureUnit,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeatherContext must be used within WeatherProvider');
  }
  return context;
};
