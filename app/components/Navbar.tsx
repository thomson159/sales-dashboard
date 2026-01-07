import { useCallback, useMemo, memo, useState } from 'react';
import type { NavbarProps, MouseEvent } from '../types/components.types';
import { Spinner } from './small/Spinner';
import { slogan } from '~/consts';

const NavbarComponent = ({ loading = false, title = 'Dashboard', children }: NavbarProps) => {
  const [expanded, setToggle] = useState<boolean>(true);

  const containerClassName: string = useMemo(
    () => `filters-wrapper ${expanded ? 'filters-open' : 'filters-closed'}`,
    [expanded],
  );

  const handleToggle = useCallback(() => setToggle((prev: boolean) => !prev), [setToggle]);
  const handleButtonClick: MouseEvent = useCallback(
    (event) => {
      event.stopPropagation();
      setToggle((prev: boolean) => !prev);
    },
    [setToggle],
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-white">
      <div
        role="button"
        aria-label={expanded ? 'Collapse dashboard' : 'Expand dashboard'}
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleToggle();
        }}
        className="cursor-pointer select-none relative p-4 md:px-10 lg:px-24"
      >
        <h2 className={slogan} style={{ display: 'inline-block' }}>
          {title}
        </h2>
        {loading && (
          <div className="absolute right-0 top-0 mt-4 mr-4">
            <Spinner />
          </div>
        )}
      </div>
      <div className={containerClassName + ' pl-4 pr-4 md:px-10 lg:px-24'}>
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
