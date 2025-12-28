import { useCallback, useMemo, memo, type MouseEventHandler } from 'react';
import type { NavbarProps } from '../types/components.types';
import { Spinner } from './small/Spinner';

const NavbarComponent = ({
  expanded,
  onToggle,
  loading = false,
  title = 'Dashboard',
  children,
}: NavbarProps) => {
  const containerClassName: string = useMemo(
    () => `filters-wrapper ${expanded ? 'filters-open' : 'filters-closed'}`,
    [expanded],
  );

  const handleToggle = useCallback((): void => onToggle(), [onToggle]);
  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event): void => {
      event.stopPropagation();
      onToggle();
    },
    [onToggle],
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-white pt-0 p-4 pb-0 md:px-12 lg:px-24">
      <div
        role="button"
        aria-label={expanded ? 'Collapse dashboard' : 'Expand dashboard'}
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleToggle();
        }}
        className="pt-4 pb-4 cursor-pointer select-none relative"
      >
        <h2
          className="
            text-3xl font-bold text-left
            text-transparent bg-clip-text
            bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
            animate-pulse
          "
        >
          {title}
        </h2>
        {loading && (
          <div className="absolute right-0 top-0 pt-4">
            <Spinner />
          </div>
        )}
      </div>
      <div className={containerClassName}>
        <div className="pb-2">
          {children}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleButtonClick}
              className="text-sm flex items-center gap-1 cursor-pointer mt-4"
              aria-label={'Expand dashboard'}
            >
              <span aria-hidden="true">▲</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Navbar = memo(NavbarComponent);
