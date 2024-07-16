import React, { useEffect, useState } from 'react';

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setLightTheme = () => {
    setTheme('light');
  };

  const setDarkTheme = () => {
    setTheme('dark');
  };

  return (
    <div className="w-48 h-16 flex items-center justify-center">
      <button
        className={`bg-[#272926] rounded-xl flex items-center justify-evenly w-[90%] h-[90%] theme-toggle ${theme === 'dark' ? 'dark-mode' : ''}`}
      >
        <span
          className={`light-mode w-[44%] h-[80%] text-white flex  items-center rounded-xl justify-center ${theme === 'light' ? 'active' : ''}`}
          onClick={setLightTheme}
          style={{
            backgroundColor: theme === 'light' ? '#4A00FF' : 'transparent',
            // color: theme === 'light' ? 'black' : 'inherit'
          }}
        >
          Normal
        </span>
        <span
          className={`dark-mode w-[44%] h-[80%] text-[#A6ADBB] flex items-center justify-center rounded-xl ${theme === 'dark' ? 'active' : ''}`}
          onClick={setDarkTheme}
          style={{
            backgroundColor: theme === 'dark' ? '#646EE4' : 'transparent',
          }}
        >
          Dark
        </span>
      </button>
    </div>
  );
};

export default ThemeToggleButton;
