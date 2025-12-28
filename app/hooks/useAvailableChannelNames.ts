import { useEffect, useState } from 'react';
import type { SaleArray } from '~/types/types';
import { normalizeChannelName } from '~/utils/utils';

export const useAvailableChannelNames = (data: SaleArray): readonly string[] => {
  const [firstNames, setFirstNames] = useState<readonly string[]>([]);

  useEffect(() => {
    if (!data?.length) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFirstNames((prev) => {
      if (prev.length > 0) return prev;

      const names = Array.from(
        new Set(data.map((s) => normalizeChannelName(s.channel_name)).filter(Boolean)),
      );

      return names.length > 0 ? names : prev;
    });
  }, [data]);

  return firstNames;
};
