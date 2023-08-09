import { createStore } from 'idb-keyval'

export const BASE_API_URL = 'https://api.outclass.azlir.my.id'
export const BASE_API_VERSION = '/api/v1'
export const API_URL = BASE_API_URL + BASE_API_VERSION

export const LANGUAGE_PREF_KEY = 'language'
export const DEFAULT_CLASSROOM_ID_PREF_KEY = 'default_classroom_id'
export const THEME_PREF_KEY = 'theme'
export const JWT_TOKEN_PREF_KEY = 'jwt_token'

export const DOWNLOADED_DIRECTORIES_STORE = createStore(
  'downloaded-directories',
  'outclass'
)
