import { defineStore } from 'pinia';

export const useSignInStore = defineStore('signin', {
  state() {
    return {
      valid: false,
      showPassword: false,
      loading: false,
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
      setTimeout(() => {
        this.loading = false;
        this.router.push({ name: 'join' });
      }, 1000);
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    goToSignUpPage() {
      this.router.push({ name: 'up' });
    },
  },
});
