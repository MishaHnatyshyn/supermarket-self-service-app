import { compose, prop } from 'lodash/fp';

const root = (state) => state.auth;

export const getUserId = compose(
  prop('user'),
  root,
);

export const getAccessToken = compose(
  prop('token'),
  root,
);

export const getIsAuthError = compose(
  prop('isError'),
  root,
);

export const getIsAuthLoading = compose(
  prop('isLoading'),
  root,
);
