import type { Link } from '@/models/link';
import { API } from '@/plugins/constants';
import { defineStore } from 'pinia';

export const useLinksStore = defineStore('links', {
  state() {
    return {
      dialog: false,
      loading: false,
      error: <string | null>null,
      errorSave: <string | null>null,
      links: <Link[]>[],
    };
  },
  actions: {
    async getLinks() {
      this.error = null;
      this.loading = true;

      const folderId = this.router.currentRoute.value.params.folderId;

      await this.axios
        .get(`${API}/links?folderId=${folderId}`)
        .then(({ data }) => {
          return (this.links = data);
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
        .post(`${API}/links`, newLink)
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
