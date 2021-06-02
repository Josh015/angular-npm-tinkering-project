import { createReducer, on } from '@ngrx/store';

import {
    createUser, createUserError, createUserSuccess, loadUsers, loadUsersError, loadUsersSuccess
} from './contact-manager.actions';
import { adapter, ContactManagerState, initialState } from './contact-manager.state';

export const contactManagerReducer = createReducer<ContactManagerState>(
  initialState,
  on(loadUsers, (state): ContactManagerState => {
    return { ...state, usersLoading: true };
  }),
  on(loadUsersSuccess, (state, { users }): ContactManagerState => {
    return adapter.addMany(users, {
      ...state,
      usersLoading: false,
      error: '',
    });
  }),
  on(loadUsersError, (state, { error }): ContactManagerState => {
    return adapter.removeAll({ ...state, usersLoading: false, error });
  }),
  on(createUser, (state): ContactManagerState => {
    return { ...state, usersLoading: true };
  }),
  on(createUserSuccess, (state, { user }): ContactManagerState => {
    return adapter.addOne(user, { ...state, usersLoading: false, error: '' });
  }),
  on(createUserError, (state, { error }): ContactManagerState => {
    return { ...state, usersLoading: false, error };
  })
);
