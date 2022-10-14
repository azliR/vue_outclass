import type { Link } from '@/models/link';
import { isValidUrl } from '@/plugins/utils';
import { defineStore } from 'pinia';

export const useAddLinkStore = defineStore('new-link', {
  state() {
    return {
      valid: false,
      newLink: <Link>{},
    };
  },
  getters: {
    nameRules: () => [(v: string) => !!v || 'Namanya harus diisi dong'],
    urlRules: () => [
      (v: string) => !!v || 'Url-nya harus diisi dong',
      (v: string) => isValidUrl(v) || 'Url-nya gak valid',
    ],
    descriptionRules: () => [
      (v: string) => v.length <= 255 || 'Deskripsinya jangan kepanjangan',
    ],
  },
  actions: {},
});
