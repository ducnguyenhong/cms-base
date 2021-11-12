import { v4 as uuid } from 'uuid';
import { UserType } from './user.type';

export const AUTH_REDUCER_KEY = 'auth';

export interface AuthState {
  token?: string;
  refreshToken?: string;
  user?: UserType;
  deviceId: string;
  request?: {
    id?: string;
    loading?: boolean;
    error?: string;
  };
}

export const initialState: AuthState = {
  token: sessionStorage.getItem('user_token') || localStorage.getItem('user_token') || undefined,

  user: (function () {
    const key = 'user_info';

    const info = sessionStorage.getItem(key) || localStorage.getItem(key);
    if (typeof info === 'undefined' || info === null || info === '') {
      return undefined;
    }

    return JSON.parse(info) as UserType;
  })(),

  deviceId: (function () {
    let deviceId = localStorage.getItem('device-id');

    if (typeof deviceId === 'undefined' || deviceId === null || deviceId === '') {
      deviceId = uuid();
      localStorage.setItem('device-id', deviceId);
    }

    return deviceId;
  })(),
};
