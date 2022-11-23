import { privateClient } from '@/core/private_client';
import type { Folder } from '@/models/directory';
import type { ResponseData } from '@/models/response-data';
import { API_URL } from '@/plugins/constants';
import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { useLinksStore } from './links';

export const useDirectoriesStore = (id: string) =>
  defineStore('directories' + id, {
    state() {
      return {
        loading: false,
        error: <string | null>null,
        deleteDialog: false,
      };
    },
    actions: {
      async getDirectories(
        type: string,
        parentId: string,
        page: number,
        pageLimit: number
      ): Promise<Folder[]> {
        this.error = null;

        return await privateClient
          .get<ResponseData>('/directories', {
            params: {
              type: type,
              parent_id: parentId,
              page: page,
              page_limit: pageLimit,
            },
          })
          .then(({ data }) => {
            if (data.success) {
              this.error = null;
              return data.data as Folder[];
            } else {
              return Promise.reject(data.message);
            }
          })
          .catch((error: AxiosError) => {
            console.error('⛔ ~ file: directories.ts ~ line 53 ~ error', error);
            this.error = JSON.stringify(error.toJSON());
            return [];
          });
      },
      async deleteFolder(id: string) {
        this.error = null;
        this.loading = true;

        await this.privateClient
          .get<ResponseData>(API_URL + '/folders' + id)
          .then<Folder[]>(({ data }) => {
            this.loading = false;
            if (data.success) {
              this.error = null;
              return data.data as Folder[];
            } else {
              return Promise.reject(data.message);
            }
          })
          .catch((error: AxiosError) => {
            console.error(
              '⛔ ~ file: directories.ts ~ line 69 ~ deleteFolder ~ error',
              error
            );
            this.error = JSON.stringify(error.toJSON());
            this.loading = false;
          });
      },
      onCategoryPressed(folder: Folder) {
        const linksStore = useLinksStore();
        linksStore.$reset();

        this.router.push({ name: 'links', params: { folderId: folder.id } });
      },
    },
  });
