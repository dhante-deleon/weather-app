import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-fadeIn">
      <div className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-2xl p-8 shadow-xl">
        {/* Location and Date Skeleton */}
        <div className="mb-6">
          <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg mb-3 w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 animate-pulse"></div>
        </div>

        {/* Main Weather Display Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center w-full">
            <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full mr-6 animate-pulse"></div>
            <div className="flex-1">
              <div className="h-16 bg-gray-300 dark:bg-gray-600 rounded-lg mb-3 animate-pulse"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-2/3 animate-pulse"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Temperature Range Skeleton */}
        <div className="bg-white dark:bg-gray-500 bg-opacity-10 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2 animate-pulse"></div>
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4 animate-pulse"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2 animate-pulse"></div>
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Details Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-500 bg-opacity-10 rounded-lg p-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-3 animate-pulse"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Forecast Skeleton */}
      <div className="mt-8">
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-700 rounded-lg p-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full mb-3 animate-pulse"></div>
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded mx-auto mb-3 animate-pulse"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mx-auto animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ErrorMessage: React.FC<{ message: string; onRetry?: () => void }> = ({ message, onRetry }) => {
  // Check if it's an API key error
  const isApiKeyError = message.includes('401') || message.includes('Unauthorized');
  
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 animate-fadeIn">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <svg className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">Error</h3>
            <p className="text-red-700 dark:text-red-300 mb-4">{message}</p>
            {isApiKeyError && (
              <p className="text-sm text-red-600 dark:text-red-400 mb-4 bg-red-100 dark:bg-red-900/40 p-2 rounded">
                <strong>🔑 API Key Issue:</strong> Add your free OpenWeatherMap API key to <code className="bg-red-200 dark:bg-red-800 px-1 rounded">.env.local</code>
                <br />
                <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-800 dark:hover:text-red-200">
                  Get free API key →
                </a>
              </p>
            )}
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
