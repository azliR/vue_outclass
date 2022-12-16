import type { SignUp as SignUpResponse } from '@/models/auth'
import type { ResponseData } from '@/models/response-data'
import { JWT_TOKEN_PREF_KEY } from '@/plugins/constants'
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'

export const useSignUpStore = defineStore('signup', {
  state() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      loading: false,
      error: <string | null>null,
      name: '',
      email: '',
      password: '',
    }
  },
  getters: {
    nameRules: () => [
      (v: string) => !!v || 'Ketik nama kamu disini yah',
      (v: string) =>
        (v && v.length <= 64) || 'Namanya jangan panjang-panjang, singkat aja',
    ],
    emailRules: () => [
      (v: string) => !!v || 'Emailnya harus diisi yah',
      (v: string) => /.+@.+\..+/.test(v) || 'Emailnya enggak valid',
    ],
    passwordRules: () => [
      (v: string) => !!v || 'Passwordnya harus diisi yah',
      (v: string) =>
        (v && v.length >= 8) ||
        'Password-nya minimal 8 karakter biar gak ke hack',
    ],
    confirmPasswordRules: (state) => [
      (v: string) =>
        v === state.password || 'Password-nya enggak sama kayak yang di atas',
    ],
  },
  actions: {
    async onSignUpPressed() {
      this.loading = true
      this.error = null

      await this.publicClient
        .post<ResponseData<SignUpResponse>>('/user/sign/up', {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then(({ data }) => {
          if (data.success) {
            const signUpResponse = data.data

            localStorage.setItem(
              JWT_TOKEN_PREF_KEY,
              JSON.stringify(signUpResponse?.token)
            )

            this.router.push({ name: 'join' })
          } else {
            return Promise.reject(data.message)
          }
        })
        .catch((error: Error) => {
          console.error('signup-store.ts -> onSignUpPressed', error)

          if (error instanceof AxiosError) {
            if (error.response) {
              this.error = error.response?.data?.message ?? ''
            } else {
              this.error = JSON.stringify(error.toJSON())
            }
          } else {
            this.error = error.message
          }
        })
      this.loading = false
    },
    goToSignInPage() {
      this.router.push({ name: 'in' })
    },
  },
})
