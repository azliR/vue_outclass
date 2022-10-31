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
    exitClass() {
      this.router.push({ name: 'join' });
    },
    signOutAccount() {
      this.router.push({ name: 'in' });
    },
  },
});
