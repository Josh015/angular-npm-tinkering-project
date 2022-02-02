import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState, FEATURE_KEY } from './app.state';

export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getSelectors(selectRouter);

const getAppFeatureState = createFeatureSelector<AppState>(FEATURE_KEY);

export const getIsDarkTheme = createSelector(
  getAppFeatureState,
  ({ isDarkTheme }) => isDarkTheme
);

export const getTextDirection = createSelector(
  getAppFeatureState,
  ({ textDirection }) => textDirection
);
