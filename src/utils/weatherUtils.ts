export const convertTemperature = (celsius: number, unit: 'C' | 'F'): number => {
  if (unit === 'F') {
    return Math.round((celsius * 9/5) + 32);
  }
  return Math.round(celsius);
};

export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
};

export const getBackgroundGradient = (weatherCondition: string): string => {
  const condition = weatherCondition.toLowerCase();
  
  if (condition.includes('sunny') || condition.includes('clear')) {
    return 'from-yellow-400 via-orange-300 to-red-400';
  } else if (condition.includes('cloud')) {
    return 'from-gray-400 via-blue-300 to-gray-500';
  } else if (condition.includes('rain')) {
    return 'from-blue-400 via-blue-500 to-indigo-600';
  } else if (condition.includes('snow')) {
    return 'from-blue-100 via-blue-200 to-white';
  } else if (condition.includes('thunder')) {
    return 'from-purple-400 via-indigo-500 to-gray-700';
  }
  return 'from-blue-400 to-blue-600';
};

export const formatTime = (timestamp: number, timezone: number): string => {
  // Create UTC date from timestamp
  const utcDate = new Date(timestamp * 1000);
  
  // Get the timezone offset in milliseconds and add to UTC time
  const localMs = utcDate.getTime() + timezone * 1000;
  
  // Create a temporary date object for calculation
  const localDate = new Date(localMs);
  
  // Use getUTC methods to extract components (ignoring browser timezone)
  const hours = localDate.getUTCHours();
  const minutes = localDate.getUTCMinutes();
  
  // Format time as 12-hour format
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = String(hours % 12 || 12).padStart(2, '0');
  const displayMinutes = String(minutes).padStart(2, '0');
  
  return `${displayHours}:${displayMinutes} ${ampm}`;
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const formatFullDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
