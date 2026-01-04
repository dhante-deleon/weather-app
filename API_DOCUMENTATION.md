# WeatherApp - API Documentation

## OpenWeatherMap API Integration

This document explains how the WeatherApp integrates with the OpenWeatherMap API.

---

## API Overview

**Provider**: OpenWeatherMap  
**Base URL**: `https://api.openweathermap.org/data/2.5`  
**Authentication**: Query parameter `appid` with API key  
**Free Tier Limits**: 60 calls/minute, 1,000,000 calls/month  
**Response Format**: JSON  

---

## Endpoints Used

### 1. Current Weather Endpoint

**URL**: `/weather`

**Purpose**: Get current weather for a specific location

#### By City Name
```
GET /weather?q={city}&units=metric&appid={key}
```

**Parameters:**
- `q` (string) - City name (e.g., "London", "New York")
- `units` (string) - "metric" for Celsius, "imperial" for Fahrenheit
- `appid` (string) - Your OpenWeatherMap API key

**Example Request:**
```javascript
GET https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=YOUR_API_KEY
```

**Response Structure:**
```json
{
  "coord": {
    "lon": -0.1257,
    "lat": 51.5085
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04d"
    }
  ],
  "main": {
    "temp": 15.5,
    "feels_like": 14.8,
    "temp_min": 13.2,
    "temp_max": 17.8,
    "pressure": 1013,
    "humidity": 72
  },
  "visibility": 10000,
  "wind": {
    "speed": 5.5,
    "deg": 230,
    "gust": 8.2
  },
  "clouds": {
    "all": 75
  },
  "dt": 1704298800,
  "sys": {
    "type": 2,
    "id": 2019646,
    "country": "GB",
    "sunrise": 1704270600,
    "sunset": 1704304500
  },
  "timezone": 0,
  "id": 2643743,
  "name": "London",
  "cod": 200
}
```

#### By Coordinates
```
GET /weather?lat={lat}&lon={lon}&units=metric&appid={key}
```

**Parameters:**
- `lat` (float) - Latitude (-90 to 90)
- `lon` (float) - Longitude (-180 to 180)
- `units` (string) - "metric" for Celsius
- `appid` (string) - Your API key

**Example Request:**
```javascript
GET https://api.openweathermap.org/data/2.5/weather?lat=51.5085&lon=-0.1257&units=metric&appid=YOUR_API_KEY
```

---

### 2. Forecast Endpoint

**URL**: `/forecast`

**Purpose**: Get 5-day forecast with 3-hour intervals

```
GET /forecast?lat={lat}&lon={lon}&units=metric&appid={key}
```

**Parameters:**
- `lat` (float) - Latitude
- `lon` (float) - Longitude
- `units` (string) - "metric" for Celsius
- `appid` (string) - Your API key

**Example Request:**
```javascript
GET https://api.openweathermap.org/data/2.5/forecast?lat=51.5085&lon=-0.1257&units=metric&appid=YOUR_API_KEY
```

**Response Structure:**
```json
{
  "cod": "200",
  "message": 0,
  "cnt": 40,
  "list": [
    {
      "dt": 1704307200,
      "main": {
        "temp": 14.5,
        "feels_like": 13.8,
        "temp_min": 14.2,
        "temp_max": 14.5,
        "pressure": 1015,
        "humidity": 75
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": {
        "all": 90
      },
      "wind": {
        "speed": 4.8,
        "deg": 240,
        "gust": 7.5
      },
      "visibility": 10000,
      "pop": 0.1,
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2024-01-04 00:00:00"
    }
    // ... 39 more 3-hour intervals
  ],
  "city": {
    "id": 2643743,
    "name": "London",
    "coord": {
      "lat": 51.5085,
      "lon": -0.1257
    },
    "country": "GB",
    "population": 8382000,
    "timezone": 0,
    "sunrise": 1704270600,
    "sunset": 1704304500
  }
}
```

---

## Weather Icons

OpenWeatherMap provides weather icons in different sizes.

**Icon URL Format:**
```
https://openweathermap.org/img/wn/{icon_code}@{size}x.png
```

**Sizes Available:**
- `@1x` - 50×50 pixels
- `@2x` - 100×100 pixels (default)
- `@4x` - 200×200 pixels (used in WeatherApp)

**Example:**
```
https://openweathermap.org/img/wn/04d@4x.png
```

**Common Icon Codes:**
- `01d` - Clear sky (day)
- `01n` - Clear sky (night)
- `02d` - Few clouds (day)
- `02n` - Few clouds (night)
- `03d` - Scattered clouds (day)
- `04d` - Broken clouds
- `09d` - Shower rain
- `10d` - Rain (day)
- `11d` - Thunderstorm
- `13d` - Snow
- `50d` - Mist

---

## Response Fields Explained

### Main Weather Object

| Field | Type | Description |
|-------|------|-------------|
| `temp` | Float | Temperature in Celsius |
| `feels_like` | Float | "Feels like" temperature |
| `temp_min` | Float | Minimum temperature |
| `temp_max` | Float | Maximum temperature |
| `pressure` | Integer | Atmospheric pressure (hPa) |
| `humidity` | Integer | Humidity percentage (0-100) |

### Wind Object

| Field | Type | Description |
|-------|------|-------------|
| `speed` | Float | Wind speed (m/s) |
| `deg` | Integer | Wind direction in degrees (0-360) |
| `gust` | Float | Wind gust speed (optional) |

### Weather Array

| Field | Type | Description |
|-------|------|-------------|
| `main` | String | Main weather condition (Clouds, Rain, etc.) |
| `description` | String | Detailed description (broken clouds) |
| `icon` | String | Icon code for display |

### System Object

| Field | Type | Description |
|-------|------|-------------|
| `country` | String | Country code (ISO 3166-1 alpha-2) |
| `sunrise` | Integer | Sunrise time (Unix timestamp) |
| `sunset` | Integer | Sunset time (Unix timestamp) |
| `timezone` | Integer | Timezone offset in seconds |

---

## Temperature Conversion

The WeatherApp stores all temperatures in Celsius and converts on-the-fly.

**Formula:**
```
Fahrenheit = (Celsius × 9/5) + 32
```

**Implementation:**
```typescript
const convertTemperature = (celsius: number, unit: 'C' | 'F'): number => {
  if (unit === 'F') {
    return Math.round((celsius * 9/5) + 32);
  }
  return Math.round(celsius);
};
```

---

## Wind Direction Conversion

Wind directions are converted from degrees (0-360) to compass directions.

**Compass Points:**
- 0° = N (North)
- 45° = NE (Northeast)
- 90° = E (East)
- 135° = SE (Southeast)
- 180° = S (South)
- 225° = SW (Southwest)
- 270° = W (West)
- 315° = NW (Northwest)

**Implementation:**
```typescript
const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
                     'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};
```

---

## Error Handling

### Common Error Codes

| Code | Status | Meaning | Solution |
|------|--------|---------|----------|
| 200 | OK | Request successful | - |
| 400 | Bad Request | Invalid parameters | Check query parameters |
| 401 | Unauthorized | Invalid API key | Verify API key |
| 404 | Not Found | City not found | Try different city name |
| 429 | Too Many Requests | Rate limit exceeded | Wait before retrying |
| 500 | Server Error | API server error | Retry later |

### Error Response Example

```json
{
  "cod": "404",
  "message": "city not found"
}
```

---

## API Key Management

### Getting Your API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to "API Keys" in your account
4. Copy your default API key (or create a new one)

### Storing API Key

Use environment variables for security:

```bash
# .env.local
VITE_WEATHER_API_KEY=your_api_key_here
VITE_WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
```

### Using in Code

```typescript
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL;
```

---

## Rate Limiting

**Free Tier**: 60 calls/minute, 1,000,000 calls/month

**Tips to Stay Within Limits:**
- Cache API responses
- Don't search too frequently
- Implement loading indicators to prevent duplicate requests
- Use 5-day forecast instead of multiple 3-hour calls

---

## Data Persistence

The WeatherApp implements smart caching:

1. **Current Weather**: Refreshed on every search
2. **Forecast**: Loaded with current weather
3. **Preferences**: Stored in localStorage
4. **Recent Searches**: Stored in localStorage (5 max)

---

## Future API Enhancements

The application is structured to easily add:

### Air Quality Index (AQI)
```
GET /air_pollution?lat={lat}&lon={lon}&appid={key}
```

### UV Index
```
GET /uvi?lat={lat}&lon={lon}&appid={key}
```

### Historical Weather
```
GET /weather/history?q={city}&start={unix}&end={unix}&appid={key}
```

### Weather Alerts
Included in main current weather response if available

---

## Testing API Calls

### Using cURL

```bash
# Current weather for London
curl "https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=YOUR_API_KEY"

# Forecast for London
curl "https://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&appid=YOUR_API_KEY"
```

### Using Browser DevTools

1. Open DevTools (F12)
2. Go to Network tab
3. Search for requests to "openweathermap.org"
4. Click to view response data

---

## Troubleshooting

### API Returns 404
- Check city spelling
- Try with country code: "London, GB"
- Some small towns may not be available

### API Returns 401
- Verify API key is correct
- Check key is active in your OpenWeatherMap dashboard
- Ensure key hasn't expired

### Slow Responses
- Network latency may vary
- API might be under load
- Check your internet connection

### Missing Data
- Some weather data is only available in paid tiers
- Ensure you're using the correct endpoint
- Check API response status code

---

## Rate Limit Headers

The API returns rate limit information in response headers:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1234567890
```

---

## Documentation Links

- **OpenWeatherMap API Docs**: https://openweathermap.org/api
- **Current Weather API**: https://openweathermap.org/current
- **Forecast API**: https://openweathermap.org/forecast5
- **Weather Icons**: https://openweathermap.org/weather-conditions

---

**Last Updated**: January 4, 2026  
**API Version**: 2.5 (Current)  
**Status**: Active and Working ✅
