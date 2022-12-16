export interface SignUp {
  token: Token
  user: User
}

export interface User {
  id: string
  email: string
  name: string
}

export interface Token {
  access_token: string
  token_expires_in: string
  refresh_token: string
  refresh_token_expires_in: string
}
