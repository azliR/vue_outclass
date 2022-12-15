import type { Token } from '@/models/token';
import { JWT_TOKEN_PREF_KEY } from '@/plugins/constants';
import mem from 'mem';
import { privateClient } from './private_client';

const refreshToken = async () => {
  const tokenJson = localStorage.getItem(JWT_TOKEN_PREF_KEY);
  if (tokenJson === null) {
    return;
  }
  const token = JSON.parse(tokenJson) as Token;

  try {
    const response = await privateClient.post('/user/refresh', {
      refresh_token: token?.refresh_token,
    });

    const newToken = response.data.data as Token;

    if (!newToken?.access_token) {
      localStorage.removeItem(JWT_TOKEN_PREF_KEY);
    }

    localStorage.setItem(JWT_TOKEN_PREF_KEY, JSON.stringify(newToken));

    return newToken;
  } catch (error) {
    console.error('refresh_token.ts -> refreshToken', error);
    localStorage.removeItem(JWT_TOKEN_PREF_KEY);
  }
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshToken, {
  maxAge,
});
