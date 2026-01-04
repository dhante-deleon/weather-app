import React, { useState } from 'react';
import { useWeatherContext } from '../context/WeatherContext';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading = false }) => {
  const [query, setQuery] = useState('');
  const [showRecent, setShowRecent] = useState(false);
  const { recentSearches, addRecentSearch } = useWeatherContext();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addRecentSearch(query.trim());
      onSearch(query.trim());
      setQuery('');
      setShowRecent(false);
    }
  };

  const handleRecentClick = (city: string) => {
    onSearch(city);
    setQuery('');
    setShowRecent(false);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowRecent(true);
            }}
            onBlur={() => setTimeout(() => setShowRecent(false), 200)}
            onFocus={() => setShowRecent(true)}
            placeholder="Search for a city..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
          />
          
          {/* Recent Searches Dropdown */}
          {showRecent && recentSearches.length > 0 && query === '' && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50">
              <div className="p-2">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 px-2 py-1">Recent Searches</p>
                {recentSearches.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleRecentClick(city)}
                    className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-sm transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </>
          )}
        </button>
      </form>
    </div>
  );
};
