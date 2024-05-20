import { createSelector } from '@ngrx/store';

import { selectRouteParams } from 'src/app/store/app.selectors';
import { adapter, contactManagerFeature } from './contact-manager.feature';

const { selectAll } = adapter.getSelectors();

export const getUsers = createSelector(
  contactManagerFeature.selectContactManagerState,
  selectAll,
);

export const getCurrentUser = createSelector(
  contactManagerFeature.selectEntities,
  selectRouteParams,
  (entities, { userId }) => entities[userId as string] ?? null,
);
