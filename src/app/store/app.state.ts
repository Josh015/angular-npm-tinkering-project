import { Direction } from '@angular/cdk/bidi';

export const FEATURE_KEY = 'app';

export interface State {
  app: AppState;
}

export interface AppState {
  isDarkTheme: boolean;
  textDirection: Direction;
}

export const initialState: AppState = {
  isDarkTheme: false,
  textDirection: 'ltr',
};
