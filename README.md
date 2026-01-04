# WeatherApp - Modern Weather Application

A beautiful, responsive weather application built with React, TypeScript, and Tailwind CSS. Get real-time weather data for any location worldwide with a 7-day forecast.

## Features

✨ **Current Weather Display**
- Real-time temperature, humidity, wind speed, and pressure
- Current location detection using geolocation API
- Beautiful weather icons and conditions
- Local time display for searched locations

🔍 **City Search**
- Search for weather in any city worldwide
- Recent searches stored in browser storage
- Quick access to recently searched cities

📅 **7-Day Forecast**
- Detailed forecast for the next 7 days
- Daily high/low temperatures
- Weather conditions and precipitation probability
- Wind speed and humidity information

🌓 **Dark/Light Mode**
- Toggle between dark and light themes
- Smooth transitions and persistent preference
- Optimized for both day and night viewing

🌡️ **Temperature Units**
- Switch between Celsius and Fahrenheit
- Persistent preference stored in browser
- Easy unit toggle in the header

📱 **Responsive Design**
- Seamless experience on mobile, tablet, and desktop
- Mobile-first approach
- Touch-friendly interface

⚡ **Performance**
- Skeleton loading states while fetching data
- Smooth animations and micro-interactions
- Optimized API calls with error handling

## Tech Stack

- **Frontend Framework**: React 18+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **API Calls**: Axios
- **State Management**: React Context API
- **Weather Data**: OpenWeatherMap API

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- An OpenWeatherMap API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   cd d:\Dhante\practice\weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Add your API key to `.env.local`:
     ```
     VITE_WEATHER_API_KEY=your_api_key_here
     VITE_WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
     ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:5173/`

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header.tsx       # Navigation bar with controls
│   ├── SearchBar.tsx    # City search input
│   ├── WeatherCard.tsx  # Current weather display
│   ├── ForecastList.tsx # 7-day forecast
│   ├── Footer.tsx       # Footer with links
│   └── SkeletonLoader.tsx # Loading states
├── context/             # React Context API
│   └── WeatherContext.tsx # Global state management
├── services/            # API services
│   └── weatherService.ts # Weather API integration
├── utils/               # Utility functions
│   └── weatherUtils.ts  # Helper functions
├── App.tsx              # Main application component
├── App.css              # Component styles
├── index.css            # Global styles with Tailwind
└── main.tsx            # Entry point
```

## Configuration Files

- **tailwind.config.js** - Tailwind CSS configuration with custom colors and animations
- **postcss.config.js** - PostCSS configuration for Tailwind processing
- **vite.config.ts** - Vite build configuration
- **tsconfig.json** - TypeScript configuration
- **.env.example** - Environment variables template

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Component Documentation

### Header
- Location button for geolocation
- Temperature unit toggle (°C / °F)
- Dark/Light mode toggle
- Responsive navigation bar

### SearchBar
- City search input with validation
- Recent searches dropdown
- Loading state indicator
- Accessible form implementation

### WeatherCard
- Main weather display with large temperature
- Weather description and "feels like" temperature
- 4-column details grid (humidity, wind, pressure, visibility)
- Current location time display
- High/low temperature range

### ForecastList
- 7 cards displaying daily forecasts
- Weather icon and description
- Daily high/low temperatures
- Humidity, wind speed, and precipitation probability
- Hover effects and responsive grid layout

### Footer
- Company information
- Quick links to features
- Social media links
- API attribution

## State Management

The application uses **React Context API** to manage global state:
- `isDarkMode` - Current theme preference
- `temperatureUnit` - Temperature unit (C/F)
- `recentSearches` - List of recently searched cities

All preferences are persisted in `localStorage` for consistency across sessions.

## Error Handling

- User-friendly error messages for failed API calls
- Network error recovery with retry functionality
- Fallback to default location (London) if geolocation fails
- Graceful handling of invalid city searches

## API Integration

The app uses the **OpenWeatherMap API** with the following endpoints:
- Current weather: `/weather`
- Forecast: `/forecast`

All API calls include:
- Error handling with descriptive messages
- Loading states during data fetching
- Metric units (Celsius, meters/second)

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Skeleton loading states prevent layout shifts
- Smooth CSS transitions reduce perceived load time
- Efficient re-renders with proper dependency management
- Optimized image loading with external CDN

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast dark mode
- Readable font sizes and spacing

## Future Enhancements

- [ ] Historical weather data
- [ ] Weather alerts and notifications
- [ ] Air quality index (AQI)
- [ ] UV index tracking
- [ ] Sunrise/sunset times
- [ ] Multiple location favorites
- [ ] Weather maps integration
- [ ] Export weather data
- [ ] PWA capabilities
- [ ] Multi-language support

## Troubleshooting

### API Key Issues
- Ensure your API key is correctly set in `.env.local`
- Verify the key is active on OpenWeatherMap dashboard
- Check API rate limits (free tier: 60 calls/min)

### Geolocation Not Working
- Check browser permissions for location access
- Some browsers require HTTPS for geolocation
- The app falls back to London if geolocation is denied

### Build Issues
- Clear `node_modules` and reinstall: `npm install`
- Delete `.vite` cache directory
- Ensure Node.js version is 18+

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact & Support

For support, feature requests, or bug reports, please open an issue on the project repository.

## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities
- [React](https://react.dev/) for the amazing framework
- [Vite](https://vitejs.dev/) for the build tool
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
