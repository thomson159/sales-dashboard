import { NavLink } from 'react-router';
import { DashboardLayout } from '~/components/Dashboard/DashboardLayout';
import { ThemeEffect } from '~/store/ThemeEffect';
import { useThemeStore } from '~/store/useThemeStore';

export default function SharedLayout() {
  const { theme, toggleTheme } = useThemeStore();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${isActive ? 'text-blue-600' : ''
    }`;

  return (
    <>
      <ThemeEffect />
      <nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <NavLink to="/" end className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/charts" className={linkClass}>
                Charts
              </NavLink>
              <NavLink to="/404" className={linkClass}>
                404
              </NavLink>
              <NavLink to="/all" className={linkClass}>
                No Routes
              </NavLink>
              <button onClick={toggleTheme} className="ml-4 cursor-pointer">
                {theme === 'dark' ? '🌞' : '🌑'}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <DashboardLayout />
    </>
  );
}
