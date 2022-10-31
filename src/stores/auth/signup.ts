import { defineStore } from 'pinia';

export const useSignUpStore = defineStore('signup', {
  state() {
    return {
      valid: false,
      showPassword: false,
      loading: false,
      name: '',
      nim: '',
      email: '',
      password: '',
    };
  },
  getters: {
    nameRules: () => [
      (v: string) => !!v || 'Ketik nama kamu disini yah',
      (v: string) =>
        (v && v.length <= 64) || 'Namanya jangan panjang-panjang, singkat aja',
    ],
    nimRules: () => [(v: string) => !!v || 'NIM-nya harus diisi yah'],
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
  },
});
