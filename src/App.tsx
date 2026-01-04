import { useState, useEffect } from 'react';
import './App.css';
import { Header, SearchBar, WeatherCard, ForecastList, Footer, SkeletonLoader, ErrorMessage } from './components';
import { weatherService } from './services/weatherService';
import type { CurrentWeatherResponse, ForecastResponse } from './services/weatherService';
import { useWeatherContext } from './context/WeatherContext';

function App() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherResponse | null>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addRecentSearch } = useWeatherContext();

  // Fetch weather by geolocation on mount
  useEffect(() => {
    fetchWeatherByGeolocation();
  }, []);

  const fetchWeatherByGeolocation = () => {
    setLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const weather = await weatherService.getCurrentWeather(latitude, longitude);
            const forecastData = await weatherService.getWeatherForecast(latitude, longitude);
            
            setCurrentWeather(weather);
            setForecast(forecastData);
            setLoading(false);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch weather');
            setLoading(false);
          }
        },
        () => {
          console.log('Geolocation error, loading default location...');
          // Fallback to a default city if geolocation fails
          fetchWeatherByCity('London');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      // Fallback to default city
      fetchWeatherByCity('London');
    }
  };

  const fetchWeatherByCity = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const weather = await weatherService.getWeatherByCity(city);
      const forecastData = await weatherService.getWeatherForecast(weather.coord.lat, weather.coord.lon);
      
      setCurrentWeather(weather);
      setForecast(forecastData);
      addRecentSearch(city);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
      setLoading(false);
    }
  };

  const handleSearch = (city: string) => {
    fetchWeatherByCity(city);
  };

  const handleLocationClick = () => {
    fetchWeatherByGeolocation();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col overflow-x-hidden">
      <Header onLocationClick={handleLocationClick} />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
        {/* Search Bar */}
        <div className="mb-8 max-w-7xl mx-auto w-full">
          <SearchBar onSearch={handleSearch} isLoading={loading} />
        </div>

        {/* Content */}
        {loading && <SkeletonLoader />}
        
        {error && (
          <ErrorMessage message={error} onRetry={fetchWeatherByGeolocation} />
        )}

        {!loading && !error && currentWeather && (
          <div className="max-w-7xl mx-auto w-full">
            <WeatherCard weather={currentWeather} />
            {forecast && <ForecastList forecast={forecast} />}
          </div>
        )}

        {!loading && !error && !currentWeather && (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.051A4.002 4.002 0 003 15z" />
            </svg>
            <p className="text-gray-600 dark:text-gray-400 text-lg">No weather data available. Please search for a city.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
