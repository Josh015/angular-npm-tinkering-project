import { selectRouteParams } from 'src/app/state/app.selectors';

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { adapter, ContactManagerState } from './contact-manager.state';

const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

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
  (entities, { userId }) => entities[userId] || null
);

export const getUsersLoading = createSelector(
  getContactManagerFeatureState,
  (state) => state.usersLoading
);

// export const getError = createSelector(
//     getContactManagerFeatureState,
//     state => state.error
// );
