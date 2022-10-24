import type { Link } from '@/models/link';
import type { LinkFolder } from '@/models/link-folder';
import { API_URL, BASE_API_URL } from '@/plugins/constants';
import { defineStore } from 'pinia';

export const useLinksStore = defineStore('links', {
  state() {
    return {
      dialog: false,
      loading: false,
      error: <string | null>null,
      errorSave: <string | null>null,
      folder: <LinkFolder | undefined>undefined,
      links: <Link[] | undefined>undefined,
    };
  },
  actions: {
    async getLinks() {
      this.error = null;
      this.loading = true;

      const folderId = this.router.currentRoute.value.params.folderId;

      await this.axios
        .get(`${API_URL}/files?folderId=${folderId}`)
        .then(({ data }) => {
          this.loading = false;
          if (data.success) {
            this.error = null;
            this.folder = data.data.folder;
            this.links = data.data.files;
          } else {
            return Promise.reject(data.message);
          }
        })
        .catch((error) => {
          this.error = error;
          return console.log(error);
        });
      this.loading = false;
    },
    async saveLink(newLink: Link) {
      this.errorSave = null;
      this.loading = true;

      const folderId = this.router.currentRoute.value.path as string;
      newLink.folderId = folderId;

      await this.axios
        .post(`${BASE_API_URL}/links`, newLink)
        .then(({ data }) => {
          return (this.links = data);
        })
        .catch((error) => {
          this.errorSave = error;
          return console.log(error);
        });
      this.loading = false;
    },
    onCloseDialogPressed() {
      this.dialog = false;
    },
    async onSavePressed(newLink: Link) {
      await this.saveLink(newLink);
      this.dialog = false;
    },
    onBackPressed() {
      this.router.push({ name: 'folders' });
    },
    onEscapePressed(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        this.onBackPressed();
      }
    },
  },
});
