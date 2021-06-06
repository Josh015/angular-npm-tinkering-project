import { createEntityAdapter, EntityState } from '@ngrx/entity';

import * as AppState from 'src/app/state';

import { User } from '../models/users.model';

export interface State extends AppState.State {
  contactManager: ContactManagerState;
}

export interface ContactManagerState extends EntityState<User> {
  usersLoading: boolean;
  error: string;
}

export const adapter = createEntityAdapter<User>();

export const initialState = adapter.getInitialState({
  usersLoading: false,
  error: '',
});
