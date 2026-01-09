import { useEffect } from 'react';
import { useThemeStore } from '~/store/useThemeStore';

export const ThemeEffect = () => {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return null;
};
