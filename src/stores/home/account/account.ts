import { defineStore } from 'pinia';

export const useAccountStore = defineStore('account', {
  state() {
    return {
      showQrDialog: false,
    };
  },
  actions: {
    goToMembers() {
      this.router.push({ name: 'members' });
    },
    goToSettings() {
      this.router.push({ name: 'settings' });
    },
  },
});
