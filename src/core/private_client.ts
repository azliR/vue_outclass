import type { Token } from '@/models/token';
import { API_URL, JWT_TOKEN_PREF_KEY } from '@/plugins/constants';
import axios from 'axios';
import { memoizedRefreshToken } from './refresh_token';

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use(
  async (config) => {
    const tokenAccess = localStorage.getItem(JWT_TOKEN_PREF_KEY);
    if (tokenAccess === null) {
      throw Error('token access not found');
    }
    const session = JSON.parse(tokenAccess) as Token;

    if (session?.accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${session?.accessToken}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const result = await memoizedRefreshToken();

      if (result?.accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.accessToken}`,
        };
      }
      return axios(config);
    }
    return Promise.reject(error);
  }
);

export const privateClient = axios;
