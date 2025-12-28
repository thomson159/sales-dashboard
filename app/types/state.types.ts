export interface State {
  readonly channelName: string;
  readonly minDate: string;
  readonly maxDate: string;
  readonly channelNames: readonly string[];
}

export type Action =
  | { readonly type: 'SET_CHANNEL_NAME'; readonly value: string }
  | { readonly type: 'CLEAR_CHANNEL_NAME' }
  | { readonly type: 'SET_MIN_DATE'; readonly value: string }
  | { readonly type: 'SET_MAX_DATE'; readonly value: string }
  | { readonly type: 'TOGGLE_CHANNEL'; readonly value: string };
