# WeatherApp - Setup and Installation Guide

## Quick Start

The WeatherApp React weather application is now ready to use! Follow these steps to get it running.

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- A free OpenWeatherMap API key

### Step 1: Get an OpenWeatherMap API Key

1. Visit [OpenWeatherMap API](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to your API keys page
4. Copy your API key

### Step 2: Configure Environment Variables

1. The `.env.local` file is already created with a placeholder
2. Update it with your actual API key:
   ```bash
   VITE_WEATHER_API_KEY=your_actual_api_key_here
   VITE_WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
   ```

### Step 3: Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

## Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Project Setup Completed ✅

### What's Included

✅ **React 18+ with TypeScript** - Modern type-safe React development
✅ **Tailwind CSS** - Beautiful utility-first styling
✅ **Vite** - Lightning-fast build tool and dev server
✅ **Context API** - Global state management
✅ **Axios** - HTTP client for API calls
✅ **OpenWeatherMap Integration** - Real weather data

### Folder Structure

```
weather-app/
├── src/
│   ├── components/           # React components
│   │   ├── Header.tsx        # App header with controls
│   │   ├── SearchBar.tsx     # City search input
│   │   ├── WeatherCard.tsx   # Current weather display
│   │   ├── ForecastList.tsx  # 7-day forecast
│   │   ├── Footer.tsx        # App footer
│   │   ├── SkeletonLoader.tsx # Loading states
│   │   └── index.ts          # Component exports
│   ├── context/
│   │   └── WeatherContext.tsx # Global state (theme, temp unit, searches)
│   ├── services/
│   │   └── weatherService.ts # Weather API integration
│   ├── utils/
│   │   └── weatherUtils.ts   # Helper functions
│   ├── App.tsx               # Main component
│   ├── App.css               # App styles
│   ├── index.css             # Global styles + Tailwind
│   └── main.tsx              # Entry point
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
├── .env.example              # Environment variables template
├── .env.local                # Your actual environment variables
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
└── README.md                 # Full documentation
```

## Key Features

### 🌍 Geolocation
- Automatically detects user's location on app load
- Shows current weather for your location
- Gracefully falls back to London if permission denied

### 🔍 Search
- Search any city in the world
- Recent searches stored in browser
- Quick access dropdown for previously searched cities

### 📅 7-Day Forecast
- Daily weather cards with temperatures
- Weather icons and descriptions
- Humidity, wind speed, and rain probability
- Responsive grid layout

### 🎨 Themes
- Dark/Light mode toggle
- Persistent preference storage
- Smooth transitions between themes

### 🌡️ Temperature Units
- Easily switch between Celsius and Fahrenheit
- Preference saved in browser storage
- All temperatures update instantly

### ⚡ Performance
- Skeleton loading states while fetching
- Smooth animations and transitions
- Optimized API calls
- Error handling with user feedback

## API Configuration

The app uses OpenWeatherMap API endpoints:

```javascript
// Current weather
GET /weather?q={city}&units=metric&appid={key}

// Forecast (5-day 3-hour intervals)
GET /forecast?lat={lat}&lon={lon}&units=metric&appid={key}

// By coordinates
GET /weather?lat={lat}&lon={lon}&units=metric&appid={key}
```

All data is fetched in metric units (Celsius, m/s) and converted on the client side.

## Troubleshooting

### Port 5173 Already in Use
```bash
# Kill the process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### API Key Not Working
- Ensure API key is from OpenWeatherMap
- Check key is active in your dashboard
- Verify rate limits (free: 60 calls/min, 1M calls/month)

### Geolocation Not Working
- Browser needs location permission
- Some browsers require HTTPS
- App falls back to London automatically

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `rm -rf .vite`
- Check Node.js version: `node --version` (need v18+)

## Next Steps

1. **Customize the appearance**
   - Edit colors in `tailwind.config.js`
   - Modify component styles in Tailwind classes
   - Update the header logo/branding

2. **Add more features**
   - Historical weather data
   - Weather alerts
   - Multiple favorite locations
   - Air quality index (AQI)

3. **Deploy**
   - `npm run build` creates production bundle
   - Deploy `dist/` folder to hosting service
   - Netlify, Vercel, GitHub Pages all support static deployment

4. **Environment Setup**
   - Use environment variables for API keys
   - Never commit `.env.local` to version control
   - Set environment variables in your hosting platform

## Performance Tips

- Browser caching reduces API calls
- Forecast is fetched once per search
- Recent searches are stored locally
- Images loaded from OpenWeatherMap CDN

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS, Android)

## Need Help?

- Check the README.md for detailed documentation
- Review component files for code comments
- Error messages are user-friendly
- Network tab in DevTools shows API responses

## Happy Coding! 🎉

Your modern weather application is ready to deploy. Enjoy building amazing features!
