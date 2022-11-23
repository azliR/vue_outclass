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
    console.log(
      '⛔ ~ file: refresh_token.ts ~ line 15 ~ refreshToken ~ privateClient',
      privateClient.defaults.headers
    );

    const response = await privateClient.post('/user/refresh', {
      refresh_token: token?.refresh_token,
    });

    const newToken = response.data.data as Token;
    console.log(
      '⛔ ~ file: refresh_token.ts ~ line 19 ~ refreshToken ~ newToken',
      newToken
    );

    if (!newToken?.access_token) {
      localStorage.removeItem(JWT_TOKEN_PREF_KEY);
    }

    localStorage.setItem(JWT_TOKEN_PREF_KEY, JSON.stringify(newToken));

    return newToken;
  } catch (error) {
    console.log(
      '⛔ ~ file: refresh_token.ts ~ line 32 ~ refreshToken ~ error',
      error
    );
    localStorage.removeItem(JWT_TOKEN_PREF_KEY);
  }
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshToken, {
  maxAge,
});
