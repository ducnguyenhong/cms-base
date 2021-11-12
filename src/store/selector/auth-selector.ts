import { isEqual } from 'lodash';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import { RootState } from '../store';

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

export const getAuthRequest = createDeepEqualSelector(
  (state: RootState) => state.auth,
  (auth) => auth.user,
);

export const getRefreshToken = createDeepEqualSelector(
  (state: RootState) => state.auth,
  (auth) => auth.refreshToken,
);

export const getToken = createDeepEqualSelector(
  (state: RootState) => state.auth,
  (auth) => auth.token,
);
export const getDeviceId = createDeepEqualSelector(
  (state: RootState) => state.auth,
  (auth) => auth.deviceId,
);
