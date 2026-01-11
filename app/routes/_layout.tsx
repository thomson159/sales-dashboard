import { NavLink } from 'react-router';
import { DashboardLayout } from '~/components/Dashboard/DashboardLayout';
import { slogan } from '~/consts';
import { ThemeEffect } from '~/store/ThemeEffect';
import { useThemeStore } from '~/store/useThemeStore';

export default function SharedLayout() {
  return (
    <>
      <ThemeEffect />
      <Navbar />
      <DashboardLayout />
    </>
  );
}

const NavbarLinks = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-2 py-1 ${isActive && 'text-red-700 font-semibold'
    }`;

  return (
    <>
      <NavLink to="/" className={linkClass}>Home</NavLink>
      <NavLink to="/charts" className={linkClass}>Charts</NavLink>
      <NavLink to="/404" className={linkClass}>404</NavLink>
      <NavLink to="/all" className={linkClass}>NoRoutes</NavLink>
    </>
  );
}

export const ThemeButton = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button onClick={toggleTheme} className="text-xl  cursor-pointer">
      {theme === 'dark' ? '🌞' : '🌑'}
    </button>
  );
}

const Navbar = () => {
  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden md:grid grid-cols-3 h-16 items-center">
          <h2 className={slogan} style={{ width: 154 }}>
            Dashboard
          </h2>
          <div className="flex justify-center gap-4">
            <NavbarLinks />
          </div>
          <div className="flex justify-end">
            <ThemeButton />
          </div>
        </div>
        <div className="md:hidden py-3 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className={slogan}>
              Dashboard
            </h2>
            <ThemeButton />
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <NavbarLinks />
          </div>
        </div>
      </div>
    </nav>
  )
};
