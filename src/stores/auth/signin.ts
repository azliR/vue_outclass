import { defineStore } from 'pinia';

export const useSignInStore = defineStore('signin', {
  state() {
    return {
      valid: false,
      loading: false,
      name: '',
      nim: '',
    };
  },
  getters: {
    nameRules: () => [
      (v: string) => !!v || 'Ketik nama kamu disini yah',
      (v: string) =>
        (v && v.length <= 64) || 'Namanya jangan panjang-panjang, singkat aja',
    ],
    nimRules: () => [(v: string) => !!v || 'NIM-nya harus diisi yah'],
  },
  actions: {
    async onSignInPressed() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.router.push({ name: 'join' });
      }, 3000);
    },
  },
});
