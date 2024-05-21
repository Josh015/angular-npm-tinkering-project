import { createSelector } from '@ngrx/store';

import { adapter, contactManagerFeature } from './contact-manager.feature';
import { selectRouteParams } from 'src/app/store/app.selectors';

const { selectAll } = adapter.getSelectors();

export const selectGetUsers = createSelector(
  contactManagerFeature.selectContactManagerState,
  selectAll,
);

export const selectGetCurrentUser = createSelector(
  contactManagerFeature.selectEntities,
  selectRouteParams,
  (entities, { userId }) => entities[userId as string] ?? null,
);
