import { useEffect, useState } from 'react';

const QUERY = '(max-width: 900px)';

export const useIsMobileCharts = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(QUERY);

    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener('change', update);

    return () => {
      media.removeEventListener('change', update);
    };
  }, []);

  return isMobile;
};
