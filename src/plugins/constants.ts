import { createStore } from 'idb-keyval';

export const BASE_API_URL = 'http://localhost:20109';
export const BASE_API_VERSION = '/api/v1';
export const API_URL = BASE_API_URL + BASE_API_VERSION;

export const LANGUAGE_PREF_KEY = 'language';
export const THEME_PREF_KEY = 'theme';
export const JWT_TOKEN_PREF_KEY = 'jwt_token';

export const DOWNLOADED_DIRECTORIES_STORE = createStore(
  'downloaded-directories',
  'outclass'
);
