import { createActionGroup, emptyProps } from '@ngrx/store';

export const AppActions = createActionGroup({
  source: '[App]',
  events: {
    'Toggle Dark Theme': emptyProps(),
    'Toggle Text Direction': emptyProps(),
  },
});
