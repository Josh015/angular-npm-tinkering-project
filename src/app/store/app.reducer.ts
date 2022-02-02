import { createReducer, on } from '@ngrx/store';

import { toggleDarkTheme, toggleTextDirection } from './app.actions';
import { AppState, initialState } from './app.state';

export const appReducer = createReducer<AppState>(
  initialState,
  on(toggleDarkTheme, (state) => ({
    ...state,
    isDarkTheme: !state.isDarkTheme,
  })),
  on(toggleTextDirection, (state) => ({
    ...state,
    textDirection: state.textDirection === 'ltr' ? 'rtl' : 'ltr',
  }))
);
