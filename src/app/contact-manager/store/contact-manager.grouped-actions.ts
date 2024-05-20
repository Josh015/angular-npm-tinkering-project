import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { User } from '../models';

export const ContactManagerActions = createActionGroup({
  source: '[Contact Manager]',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Error': props<{ error: string }>(),
    'Create User': props<{ user: User }>(),
    'Create User Success': props<{ user: User }>(),
    'Create User Error': props<{ error: string }>(),
  },
});
