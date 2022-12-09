import type { ResponseData } from '@/models/response-data';
import type { Token } from '@/models/token';
import { JWT_TOKEN_PREF_KEY } from '@/plugins/constants';
import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';

export const useSignInStore = defineStore('signin', {
  state() {
    return {
      valid: false,
      showPassword: false,
      loading: false,
      showErrorSnackbar: false,
      error: <string | null>null,
      email: '',
      password: '',
    };
  },
  getters: {
    emailRules: () => [
      (v: string) => !!v || 'Emailnya harus diisi yah',
      (v: string) => /.+@.+\..+/.test(v) || 'Emailnya enggak valid',
    ],
    passwordRules: () => [(v: string) => !!v || 'Passwordnya harus diisi yah'],
  },
  actions: {
    async onSignInPressed() {
      this.loading = true;
      this.showErrorSnackbar = false;
      this.error = null;

      await this.publicClient
        .post<ResponseData>('/user/sign/in', {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            const token = response.data.data as Token;

            localStorage.setItem(JWT_TOKEN_PREF_KEY, JSON.stringify(token));

            this.router.push({ name: 'overview' });
          }
        })
        .catch((error: AxiosError<ResponseData>) => {
          if (error.response) {
            this.error = error.response?.data?.message ?? '';
          } else {
            this.error = JSON.stringify(error.toJSON());
          }
          this.showErrorSnackbar = true;
          console.error(
            '⛔ | file: signin.ts | onSignInPressed | error',
            error
          );
        });
      this.loading = false;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    goToSignUpPage() {
      this.router.push({ name: 'up' });
    },
  },
});
