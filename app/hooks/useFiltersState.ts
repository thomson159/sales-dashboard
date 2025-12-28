import { useReducer, useState, useCallback } from 'react';
import { reducer, toFiltersValue, computeHasChanges } from '~/components/Filters/Filters.state';
import type { FiltersProps } from '~/types/components.types';
import type { UseFiltersStateResult } from '~/types/hooks.types';
import type { Filters } from '~/types/types';

export const useFiltersState = ({
  channelName,
  channelNames,
  minDate,
  maxDate,
  onChange,
}: FiltersProps): UseFiltersStateResult => {
  const [state, dispatch] = useReducer(reducer, {
    channelName: channelName ?? '',
    minDate: minDate ?? '2024-09-01',
    maxDate: maxDate ?? '2024-09-29',
    channelNames: channelNames ?? [],
  });

  const [lastApplied, setLastApplied] = useState<Filters>(toFiltersValue(state));
  const hasChanges = computeHasChanges(state, lastApplied);

  const apply = useCallback(() => {
    const value: Filters = toFiltersValue(state);
    onChange(value);
    setLastApplied(value);
  }, [state, onChange]);

  return {
    state,
    hasChanges,
    apply,
    dispatch,
  };
};
