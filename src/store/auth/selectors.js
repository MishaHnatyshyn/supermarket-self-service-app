import { compose, prop } from 'lodash/fp';
import { createSelector } from 'reselect';

const root = (state) => state.auth;

export const getUserId = compose(prop('user'), root);

export const isAuthorized = createSelector(getUserId, (userId) => !!userId);

export const getAccessToken = compose(prop('token'), root);

export const getIsAuthError = compose(prop('isError'), root);

export const getIsAuthLoading = compose(prop('isLoading'), root);
