import { Direction } from '@angular/cdk/bidi';
import { createFeature, createReducer, on } from '@ngrx/store';

import { AppActions } from './app.grouped-actions';

export interface State {
  app: AppState;
}

export interface AppState {
  isDarkTheme: boolean;
  textDirection: Direction;
}

export const appFeature = createFeature({
  name: 'app',
  reducer: createReducer<AppState>(
    {
      isDarkTheme: false,
      textDirection: 'ltr',
    },
    on(AppActions.toggleDarkTheme, (state) => ({
      ...state,
      isDarkTheme: !state.isDarkTheme,
    })),
    on(AppActions.toggleTextDirection, (state) => ({
      ...state,
      textDirection: state.textDirection === 'ltr' ? 'rtl' : 'ltr',
    })),
  ),
});
