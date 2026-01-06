import type { Filters } from '~/types/types';
import type { Action, State } from '../../types/state.types';

export const toFiltersValue = (state: State): Filters => ({
  channelName: state.channelName || undefined,
  channelNames: state.channelNames.length ? state.channelNames : undefined,
  minDate: state.minDate || undefined,
  maxDate: state.maxDate || undefined,
});

export const computeHasChanges = (state: State, lastApplied: Filters): boolean =>
  !Object.is(state.channelName, lastApplied.channelName ?? '') ||
  !Object.is(state.minDate, lastApplied.minDate ?? '') ||
  !Object.is(state.maxDate, lastApplied.maxDate ?? '') ||
  state.channelNames?.length !== (lastApplied.channelNames?.length ?? 0) ||
  state.channelNames.some((c, i) => !Object.is(c, lastApplied.channelNames?.[i]));

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CHANNEL_NAME':
      return Object.is(action.value, state.channelName)
        ? state
        : { ...state, channelName: action.value };
    case 'CLEAR_CHANNEL_NAME':
      return state.channelName === '' ? state : { ...state, channelName: '' };
    case 'SET_MIN_DATE':
      return Object.is(action.value, state.minDate) ? state : { ...state, minDate: action.value };
    case 'SET_MAX_DATE':
      return Object.is(action.value, state.maxDate) ? state : { ...state, maxDate: action.value };
    case 'TOGGLE_CHANNEL':
      return state.channelNames.includes(action.value)
        ? {
            ...state,
            channelNames: state.channelNames.filter((c) => c !== action.value),
          }
        : {
            ...state,
            channelNames: [...state.channelNames, action.value],
          };
    default:
      return state;
  }
};
