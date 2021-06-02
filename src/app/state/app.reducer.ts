import { createReducer, on } from '@ngrx/store';

import { toggleDarkTheme, toggleTextDirection } from './app.actions';
import { initialState, State } from './app.state';

export const appReducer = createReducer<State>(
  initialState,
  on(toggleDarkTheme, (state): State => {
    return { ...state, isDarkTheme: !state.isDarkTheme };
  }),
  on(toggleTextDirection, (state): State => {
    return {
      ...state,
      textDirection: state.textDirection === 'ltr' ? 'rtl' : 'ltr',
    };
  })
);
