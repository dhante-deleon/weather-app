import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { WeatherProvider } from './context/WeatherContext'

// Initialize dark mode before React mounts
// Default to light mode (false)
const darkModeValue = localStorage.getItem('darkMode') === 'true';
if (darkModeValue) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </StrictMode>,
)
