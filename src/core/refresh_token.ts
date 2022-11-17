import type { Token } from '@/models/token';
import { JWT_TOKEN_PREF_KEY } from '@/plugins/constants';
import mem from 'mem';

import { publicClient } from './public_client';

const refreshToken = async () => {
  const tokenJson = localStorage.getItem(JWT_TOKEN_PREF_KEY);
  if (tokenJson === null) {
    throw Error('token access not found');
  }
  const token = JSON.parse(tokenJson) as Token;

  try {
    const response = await publicClient.post('/user/refresh', {
      refreshToken: token?.refreshToken,
    });

    const newToken = response.data as Token;

    if (!newToken?.accessToken) {
      localStorage.removeItem(JWT_TOKEN_PREF_KEY);
    }

    localStorage.setItem(JWT_TOKEN_PREF_KEY, JSON.stringify(newToken));

    return newToken;
  } catch (error) {
    localStorage.removeItem(JWT_TOKEN_PREF_KEY);
  }
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshToken, {
  maxAge,
});
