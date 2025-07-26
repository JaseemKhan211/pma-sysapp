'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const root = window.document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const saved = localStorage.getItem('theme');
    const currentTheme = saved || 'system';
    setTheme(currentTheme);

    if (currentTheme === 'dark' || (currentTheme === 'system' && systemDark)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  const toggleTheme = (newTheme) => {
    const root = window.document.documentElement;
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);

    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else if (newTheme === 'light') {
      root.classList.remove('dark');
    } else {
      // System preference
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      systemDark ? root.classList.add('dark') : root.classList.remove('dark');
    }
  };

  return (
    <div className="flex space-x-4 items-center text-sm">
      <button onClick={() => toggleTheme('light')} className={theme === 'light' ? 'font-bold underline' : ''}>Light</button>
      <button onClick={() => toggleTheme('dark')} className={theme === 'dark' ? 'font-bold underline' : ''}>Dark</button>
      <button onClick={() => toggleTheme('system')} className={theme === 'system' ? 'font-bold underline' : ''}>System</button>
    </div>
  );
}