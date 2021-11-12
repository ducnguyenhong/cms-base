import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { get } from 'lodash';

export const login = createAsyncThunk(
  'login',
  async (request: { username: string; password: string; deviceId: string }) => {
    return axios
      .post(`https://mock-api.hotqa.io/login`, {
        username: request.username,
        password: request.password,
        device_id: request.deviceId,
      })
      .then((res) => {
        const { ok, message, data } = res.data;
        console.log('ducnh7', data);

        if (!ok || res.status > 400) {
          throw new Error(message);
        }

        return {
          ok,
          message,
          data: {
            token: get(data, 'token'),
            refreshToken: get(data, 'refresh_token'),
            userInfo: get(data, 'user_info'),
          },
        };
      })
      .catch((err) => {
        if (err.message) {
          throw new Error(err.message);
        }

        throw err;
      });
  },
);
