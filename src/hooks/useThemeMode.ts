import { useState, useEffect } from 'react';
import { safeScopedStorage } from '@/lib/safeScopedStorage';

type ThemeMode = 'dark' | 'light';

const THEME_KEY = 'history-theme';

export function useThemeMode() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = safeScopedStorage.getItem(THEME_KEY);
    return (saved as ThemeMode) || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-mode');
      root.classList.remove('dark');
    } else {
      root.classList.remove('light-mode');
      root.classList.add('dark');
    }
    safeScopedStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  };

  return { theme, setTheme, toggleTheme };
}
