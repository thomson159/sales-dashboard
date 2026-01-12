import { useEffect } from 'react';
import { useThemeStore, type Theme, type ThemeStore } from './useThemeStore';

export const ThemeEffect = () => {
  const theme: Theme = useThemeStore((s: ThemeStore) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return null;
};
