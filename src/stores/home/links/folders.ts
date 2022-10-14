import type { LinkCategory as LinkFolder } from '@/models/link-folder';
import { API } from '@/plugins/constants';
import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';

export const useFoldersStore = defineStore('folders', {
  state() {
    return {
      loading: false,
      error: <string | null>null,
      deleteDialog: false,
      linkFolders: <LinkFolder[]>[],
    };
  },
  actions: {
    async getCategories() {
      this.error = null;
      this.loading = true;

      await this.axios
        .get(API + '/link-folders')
        .then(({ data }) => {
          this.error = null;
          return (this.linkFolders = data);
        })
        .catch((error: AxiosError) => {
          this.error = JSON.stringify(error.toJSON());
          return console.log(error);
        });
      this.loading = false;
    },
    onCategoryClick(folder: LinkFolder) {
      this.router.push({ name: 'links', params: { folderId: folder.id } });
    },
  },
});
