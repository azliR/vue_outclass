import type { Token } from '@/models/token';
import { API_URL, JWT_TOKEN_PREF_KEY } from '@/plugins/constants';
import axios from 'axios';
import { memoizedRefreshToken } from './refresh_token';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});

client.interceptors.request.use(
  async (config) => {
    const tokenAccess = localStorage.getItem(JWT_TOKEN_PREF_KEY);

    if (tokenAccess === null) {
      return config;
    }
    const token = JSON.parse(tokenAccess) as Token;

    config.headers = {
      ...config.headers,
      authorization: `Bearer ${token.access_token}`,
    };
    return config;
  },
  (error) => {
    console.error('⛔ ~ file: private_client.ts ~ line 34 ~ error', error);
    Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('⛔ ~ file: private_client.ts ~ line 37 ~ error', error);
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const result = await memoizedRefreshToken();

      if (result?.access_token) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.access_token}`,
        };
      }
      return axios(config);
    }
    return Promise.reject(error);
  }
);

export const privateClient = client;
