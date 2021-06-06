import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectRouteParams } from 'src/app/state/app.selectors';

import { adapter, ContactManagerState } from './contact-manager.state';

const { selectEntities, selectAll } = adapter.getSelectors();

const getContactManagerFeatureState =
  createFeatureSelector<ContactManagerState>('contact-manager');

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
