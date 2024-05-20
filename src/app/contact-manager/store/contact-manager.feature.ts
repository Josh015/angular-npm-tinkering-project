import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { ContactManagerActions } from './contact-manager.grouped-actions';
import { User } from '../models';
import * as app from 'src/app/store';

export interface State extends app.State {
  contactManager: ContactManagerState;
}

export interface ContactManagerState extends EntityState<User> {
  usersLoading: boolean;
  error: string;
}

export const adapter = createEntityAdapter<User>();

export const contactManagerFeature = createFeature({
  name: 'contactManager',
  reducer: createReducer<ContactManagerState>(
    adapter.getInitialState({
      usersLoading: false,
      error: '',
    }),
    on(ContactManagerActions.loadUsers, (state) => ({
      ...state,
      usersLoading: true,
    })),
    on(ContactManagerActions.loadUsersSuccess, (state, { users }) =>
      adapter.addMany(users, {
        ...state,
        usersLoading: false,
        error: '',
      }),
    ),
    on(ContactManagerActions.loadUsersError, (state, { error }) =>
      adapter.removeAll({ ...state, usersLoading: false, error }),
    ),
    on(ContactManagerActions.createUser, (state) => ({
      ...state,
      usersLoading: true,
    })),
    on(ContactManagerActions.createUserSuccess, (state, { user }) =>
      adapter.addOne(user, { ...state, usersLoading: false, error: '' }),
    ),
    on(ContactManagerActions.createUserError, (state, { error }) => ({
      ...state,
      usersLoading: false,
      error,
    })),
  ),
});
