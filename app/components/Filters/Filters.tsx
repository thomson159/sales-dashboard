import { memo } from 'react';
import { useAvailableChannelNames } from '~/hooks/useAvailableChannelNames';
import { FiltersView } from './Filters.view';
import { useFiltersState } from '~/hooks/useFiltersState';
import type { FiltersProps } from '~/types/components.types';
import type { UseFiltersStateResult } from '~/types/hooks.types';

const FiltersComponent = (props: FiltersProps) => {
  const availableChannels: readonly string[] = useAvailableChannelNames(props.data);
  const { state, hasChanges, apply, dispatch }: UseFiltersStateResult = useFiltersState(props);

  return (
    <FiltersView
      state={state}
      availableChannels={availableChannels}
      hasChanges={hasChanges}
      apply={apply}
      dispatch={dispatch}
    />
  );
};

const Filters = memo(FiltersComponent);
export default Filters;
