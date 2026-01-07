import type { Filters } from '~/types/types';
import type { Action, State } from '../../types/state.types';

// converts an empty string or empty array to undefined
export const toFiltersValue = (state: State): Filters => ({
  channelName: state.channelName || undefined,
  channelNames: state.channelNames.length ? state.channelNames : undefined,
  minDate: state.minDate || undefined,
  maxDate: state.maxDate || undefined,
});

const toStateValue = (filters: Filters): State => ({
  channelName: filters.channelName ?? '',
  minDate: filters.minDate ?? '',
  maxDate: filters.maxDate ?? '',
  channelNames: filters.channelNames ?? [],
});

const equalStringSets = (a: readonly string[], b: readonly string[]): boolean => {
  if (a.length !== b.length) return false;

  const setB = new Set(b);

  return a.every((value) => setB.has(value));
};

export const computeHasChanges = (state: State, lastApplied: Filters): boolean => {
  const normalized = toStateValue(lastApplied);

  if (state.channelName !== normalized.channelName) return true;
  if (state.minDate !== normalized.minDate) return true;
  if (state.maxDate !== normalized.maxDate) return true;

  if (!equalStringSets(state.channelNames, normalized.channelNames)) {
    return true;
  }

  return false;
};

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
