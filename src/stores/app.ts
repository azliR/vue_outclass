import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state() {
    return {
      loading: false,
    };
  },
  actions: {
    startLoading() {
      this.loading = true;
    },
    stopLoading() {
      this.loading = false;
    },
  },
});
