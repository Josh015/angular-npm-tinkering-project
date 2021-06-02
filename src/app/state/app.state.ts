import { Direction } from '@angular/cdk/bidi';

export interface State {
  isDarkTheme: boolean;
  textDirection: Direction;
}

export const initialState: State = {
  isDarkTheme: false,
  textDirection: 'ltr',
};
