import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useDarkMode } from '../hooks/useDarkMode';
import { useState } from 'react';

export function DarkModeToggle() {
  const { isDarkMode, setDarkMode } = useDarkMode();
  const [showOptions, setShowOptions] = useState(false);

  const handleSystemPreference = () => {
    // Clear manual preference and use system
    localStorage.removeItem('darkMode');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(systemPreference);
    setShowOptions(false);
  };

  const handleManualToggle = (darkMode: boolean) => {
    setDarkMode(darkMode);
    setShowOptions(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <MoonIcon className="h-5 w-5" />
        ) : (
          <SunIcon className="h-5 w-5" />
        )}
      </button>

      {showOptions && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50">
          <div className="p-1">
            <button
              onClick={() => handleManualToggle(false)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                !isDarkMode 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <SunIcon className="h-4 w-4" />
              <span>Light</span>
            </button>
            <button
              onClick={() => handleManualToggle(true)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isDarkMode 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <MoonIcon className="h-4 w-4" />
              <span>Dark</span>
            </button>
            <button
              onClick={handleSystemPreference}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ComputerDesktopIcon className="h-4 w-4" />
              <span>System</span>
            </button>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {showOptions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowOptions(false)}
        />
      )}
    </div>
  );
}