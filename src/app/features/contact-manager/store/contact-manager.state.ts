import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { User } from '../models';
import * as app from 'src/app/store';

export const FEATURE_KEY = 'contactManager';

export interface State extends app.State {
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
