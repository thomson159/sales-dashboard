import { Button } from '../small/Button';
import type { FiltersViewProps } from '~/types/components.types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const FiltersView = ({
  state,
  availableChannels,
  hasChanges,
  apply,
  dispatch,
}: FiltersViewProps) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-end gap-4 flex-wrap">
      <div className="flex flex-wrap gap-4 w-full md:w-auto">
        <div className="flex flex-col relative w-full md:w-auto">
          <label htmlFor="channelName">Search</label>
          <input
            autoComplete="off"
            id="channelName"
            value={state.channelName}
            onChange={(e) =>
              dispatch({
                type: 'SET_CHANNEL_NAME',
                value: e.target.value.slice(0, 20),
              })
            }
            className={`${'filter-input'} w-full`}
          />
          {state.channelName && (
            <button
              type="button"
              onClick={() => dispatch({ type: 'CLEAR_CHANNEL_NAME' })}
              className="absolute right-4 top-[30px]"
              aria-label="Clear name filter"
            >
              ✕
            </button>
          )}
        </div>
        <div className="flex flex-col w-full md:w-auto">
          <label htmlFor="minDate">Date</label>
          <div className="flex flex-wrap items-center">
            <DatePicker
              id="minDate"
              name="minDate"
              selected={state.minDate ? new Date(state.minDate) : null}
              onChange={(date: Date | null) =>
                dispatch({
                  type: 'SET_MIN_DATE',
                  value: date ? date.toLocaleDateString('en-CA') : '',
                })
              }
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              className={`${'filter-input'} w-full max-w-[112px]`}
            />
            <span className="pt-0">-</span>
            <DatePicker
              id="maxDate"
              name="maxDate"
              aria-label="To Date"
              selected={state.maxDate ? new Date(state.maxDate) : null}
              onChange={(date: Date | null) =>
                dispatch({
                  type: 'SET_MAX_DATE',
                  value: date ? date.toLocaleDateString('en-CA') : '',
                })
              }
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              className={`${'filter-input'} w-full max-w-[112px]`}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 w-full md:w-auto items-end min-h-[84px] md:min-h-auto">
        <div className={`${'sort-container'} flex flex-wrap gap-2`}>
          {availableChannels.map((name) => {
            const active = state.channelNames.includes(name);

            return (
              <button
                key={name}
                onClick={() => dispatch({ type: 'TOGGLE_CHANNEL', value: name })}
                className={`${'sort'} ${
                  active ? `${'sort-active'} bg-blue-600 text-white` : 'sort-in-active'
                }`}
                aria-pressed={active}
              >
                {name}
                {active && ' ✓'}
              </button>
            );
          })}
        </div>
      </div>
      <Button
        disabled={!hasChanges}
        onClick={apply}
        className={`w-full md:w-auto ${hasChanges ? '' : 'opacity-40'}`}
      >
        Apply
      </Button>
    </div>
  );
};
