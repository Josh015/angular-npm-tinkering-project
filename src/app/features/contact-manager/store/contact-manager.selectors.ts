import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  adapter,
  ContactManagerState,
  FEATURE_KEY,
} from './contact-manager.state';
import { selectRouteParams } from 'src/app/store/app.selectors';

const { selectEntities, selectAll } = adapter.getSelectors();

const getContactManagerFeatureState =
  createFeatureSelector<ContactManagerState>(FEATURE_KEY);

const getUserEntities = createSelector(
  getContactManagerFeatureState,
  selectEntities
);

export const getUsers = createSelector(
  getContactManagerFeatureState,
  selectAll
);

export const getCurrentUser = createSelector(
  getUserEntities,
  selectRouteParams,
  (entities, { userId }) => entities[userId as string] ?? null
);

export const getUsersLoading = createSelector(
  getContactManagerFeatureState,
  (state) => state.usersLoading
);

// export const getError = createSelector(
//     getContactManagerFeatureState,
//     state => state.error
// );
