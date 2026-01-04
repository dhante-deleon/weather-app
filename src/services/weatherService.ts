import axios from 'axios';
import type { AxiosInstance } from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL || 'https://api.openweathermap.org/data/2.5';

if (!API_KEY) {
  console.warn('Warning: VITE_WEATHER_API_KEY is not set. Please configure your .env file.');
}

export interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface CurrentWeatherResponse {
  coord: { lon: number; lat: number };
  weather: WeatherData[];
  main: MainWeatherInfo;
  visibility: number;
  wind: { speed: number; deg: number; gust?: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastItem {
  dt: number;
  main: MainWeatherInfo;
  weather: WeatherData[];
  clouds: { all: number };
  wind: { speed: number; deg: number; gust?: number };
  visibility: number;
  pop: number;
  sys: { pod: string };
  dt_txt: string;
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: { lat: number; lon: number };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

class WeatherService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      params: {
        appid: API_KEY,
      },
    });
  }

  async getCurrentWeather(lat: number, lon: number): Promise<CurrentWeatherResponse> {
    try {
      const response = await this.client.get<CurrentWeatherResponse>('/weather', {
        params: {
          lat,
          lon,
          units: 'metric',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch current weather: ${error}`);
    }
  }

  async getWeatherByCity(city: string): Promise<CurrentWeatherResponse> {
    try {
      const response = await this.client.get<CurrentWeatherResponse>('/weather', {
        params: {
          q: city,
          units: 'metric',
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error(`City not found: ${city}`);
      }
      throw new Error(`Failed to fetch weather for ${city}: ${error.message}`);
    }
  }

  async getWeatherForecast(lat: number, lon: number): Promise<ForecastResponse> {
    try {
      const response = await this.client.get<ForecastResponse>('/forecast', {
        params: {
          lat,
          lon,
          units: 'metric',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch weather forecast: ${error}`);
    }
  }

  async searchCity(query: string): Promise<CurrentWeatherResponse[]> {
    try {
      // Using weather endpoint to search for cities
      const response = await this.client.get<CurrentWeatherResponse>('/weather', {
        params: {
          q: query,
          units: 'metric',
        },
      });
      return [response.data];
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error(`City not found: ${query}`);
      }
      throw new Error(`Failed to search for cities: ${error.message}`);
    }
  }
}

export const weatherService = new WeatherService();
