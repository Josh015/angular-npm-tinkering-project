import { createAction, props } from '@ngrx/store';

import { User } from '../models';

export const loadUsers = createAction('[Contact Manager] Load Users');

export const loadUsersSuccess = createAction(
  '[Contact Manager] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersError = createAction(
  '[Contact Manager] Load Users Error',
  props<{ error: string }>()
);

export const createUser = createAction(
  '[Contact Manager] Create User',
  props<{ user: User }>()
);

export const createUserSuccess = createAction(
  '[Contact Manager] Create User Success',
  props<{ user: User }>()
);

export const createUserError = createAction(
  '[Contact Manager] Create User Error',
  props<{ error: string }>()
);
