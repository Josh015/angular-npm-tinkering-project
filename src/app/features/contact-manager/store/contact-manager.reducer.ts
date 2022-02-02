import { createReducer, on } from '@ngrx/store';

import {
  createUser,
  createUserError,
  createUserSuccess,
  loadUsers,
  loadUsersError,
  loadUsersSuccess,
} from './contact-manager.actions';
import {
  adapter,
  ContactManagerState,
  initialState,
} from './contact-manager.state';

export const contactManagerReducer = createReducer<ContactManagerState>(
  initialState,
  on(loadUsers, (state) => ({ ...state, usersLoading: true })),
  on(loadUsersSuccess, (state, { users }) =>
    adapter.addMany(users, {
      ...state,
      usersLoading: false,
      error: '',
    })
  ),
  on(loadUsersError, (state, { error }) =>
    adapter.removeAll({ ...state, usersLoading: false, error })
  ),
  on(createUser, (state) => ({ ...state, usersLoading: true })),
  on(createUserSuccess, (state, { user }) =>
    adapter.addOne(user, { ...state, usersLoading: false, error: '' })
  ),
  on(createUserError, (state, { error }) => ({
    ...state,
    usersLoading: false,
    error,
  }))
);
