import type { LinkFolder } from '@/models/link-folder';
import type { ResponseData } from '@/models/response-data';
import { API_URL } from '@/plugins/constants';
import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { useLinksStore } from './links';

export const useFoldersStore = (id: string) =>
  defineStore('folders' + id, {
    state() {
      return {
        loading: false,
        error: <string | null>null,
        deleteDialog: false,
        linkFolders: <LinkFolder[] | undefined>undefined,
      };
    },
    actions: {
      async getFolders(path: string) {
        this.error = null;
        this.loading = true;

        await this.axios
          .get<ResponseData>(API_URL + '/folders' + path)
          .then(({ data }) => {
            this.loading = false;
            if (data.success) {
              this.error = null;
              return (this.linkFolders = data.data as LinkFolder[]);
            } else {
              return Promise.reject(data.message);
            }
          })
          .catch((error: AxiosError) => {
            this.error = JSON.stringify(error.toJSON());
            this.loading = false;
            console.log(error);
          });
      },
      async deleteFolder(id: string) {
        this.error = null;
        this.loading = true;

        await this.axios
          .get<ResponseData>(API_URL + '/folders' + id)
          .then<LinkFolder[]>(({ data }) => {
            this.loading = false;
            if (data.success) {
              this.error = null;
              return (this.linkFolders = data.data as LinkFolder[]);
            } else {
              return Promise.reject(data.message);
            }
          })
          .catch((error: AxiosError) => {
            this.error = JSON.stringify(error.toJSON());
            this.loading = false;
            console.log(error);
          });
      },
      onFolderPressed(folder: LinkFolder) {
        const linksStore = useLinksStore();
        linksStore.$reset();

        this.router.push({ name: 'links', params: { folderId: folder.id } });
      },
    },
  });
