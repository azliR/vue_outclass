import type { CreateFolderDto } from '@/dtos/directory';
import { colors } from '@/models/directory';
import { defineStore } from 'pinia';

export const useAddFolderStore = defineStore('add-folder', {
  state() {
    return {
      valid: false,
      folder: <CreateFolderDto>{},
    };
  },
  getters: {
    colors: () => colors,
    nameRules: () => [(v: string) => !!v || 'Namanya harus diisi dong'],
    // urlRules: () => [
    //   (v: string) => !!v || 'Url-nya harus diisi dong',
    //   (v: string) => isValidUrl(v) || 'Url-nya gak valid',
    // ],
    descriptionRules: () => [
      (v: string) => v.length <= 255 || 'Deskripsinya jangan kepanjangan',
    ],
  },
  actions: {},
});
