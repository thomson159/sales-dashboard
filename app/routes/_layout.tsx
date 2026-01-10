import { Outlet, useNavigate } from 'react-router';
import { ThemeEffect } from '~/store/ThemeEffect';
import { useThemeStore } from '~/store/useThemeStore';

export default function SharedLayout() {
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  return (
    <>
      <ThemeEffect />
      <nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 font-bold text-lg">
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/charts')}
                className="cursor-pointer"
              >
                Charts
              </button>
              <button
                onClick={() => navigate('/404')}
                className="cursor-pointer"
              >
                404
              </button>
              <button
                onClick={toggleTheme}
                className="ml-4 cursor-pointer"
              >
                {theme === 'dark' ? '🌞' : '🌑'}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
