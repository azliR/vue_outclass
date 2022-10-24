import { defineStore } from 'pinia';

export const useJoinStore = defineStore('join', {
  state() {
    return {
      valid: false,
      loading: false,
      classCode: '',
    };
  },
  getters: {
    classCodeRules: () => [
      (v: string) => !!v || 'Kode kelasnya harus diisi yah',
      (v: string) =>
        (v && v.length === 6) || 'Kode kelasnya harus ada 6 karakter yah',
    ],
  },
  actions: {
    async onJoinPressed() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.router.push({ name: 'overview' });
      }, 1000);
    },
    goToScanCode() {
      this.router.push('scan');
    },
  },
});
