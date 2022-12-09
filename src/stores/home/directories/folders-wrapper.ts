import type { Folder } from '@/models/directory';
import type { ResponseData } from '@/models/response-data';
import { AxiosError } from 'axios';
import { defineStore } from 'pinia';

export interface Breadcrumb {
  folderId: string | null;
  folderName: string;
}

export const useFoldersWrapperStore = defineStore('folders-wrapper', {
  state() {
    return {
      currentFolder: <Folder | null>null,
      selectedTabIndex: 0,
      breadcrumbs: <Breadcrumb[]>[],
      folderTabs: folderTabs,
      errorSnackbar: <string | null>null,
      addDialog: false,
    };
  },
  actions: {
    async getCurrentFolder(folderId: string): Promise<Folder | null> {
      return await this.privateClient
        .get<ResponseData<Folder>>(`/directories/${folderId}`)
        .then(({ data }) => {
          if (data.success && data.data) {
            return (this.currentFolder = data.data);
          } else {
            return Promise.reject(data.message);
          }
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            this.errorSnackbar = JSON.stringify(error.toJSON());
          }
          return null;
        });
    },
    async getBreadcrumbs(folderId: string | undefined) {
      let breadcrumb: Breadcrumb;
      if (folderId) {
        const folder = await this.getCurrentFolder(folderId);
        this.currentFolder = folder;

        const parentDirectoryId = (folderId as string) ?? null;

        breadcrumb = {
          folderId: parentDirectoryId,
          folderName: folder?.name ?? 'Berkas',
        };
      } else {
        this.currentFolder = null;
        breadcrumb = {
          folderId: null,
          folderName: 'Berkas',
        };
      }
      const index = this.breadcrumbs.findIndex(
        (e) => e.folderId === breadcrumb.folderId
      );

      if (index != -1) {
        this.breadcrumbs = this.breadcrumbs.slice(0, index + 1);
      } else {
        this.breadcrumbs.push(breadcrumb);
      }
    },
    onTabChange(i: number) {
      const newTab = folderTabs[i];
      console.log(
        '⛔ | file: folders-wrapper.ts | line 13 | onTabChange | newTab',
        newTab
      );
      const currentPath = this.router.currentRoute.value.path;
      const rootPath = `/${currentPath.split('/')[1]}`;

      this.folderTabs = this.folderTabs.map((tab) => {
        if (tab.path === rootPath) {
          if (newTab.path === rootPath) {
            newTab.currentPath = tab.path;
          } else {
            tab.currentPath = currentPath;
          }
        }
        return tab;
      });

      this.router.push(newTab.currentPath);
      this.selectedTabIndex = i;
    },
    onBackPressed() {
      this.router.push({
        name: 'folders',
        params: { folderId: this.currentFolder?.parent_id },
      });
    },
  },
});

export default interface FolderTab {
  title: string;
  alert: string;
  path: string;
  currentPath: string;
}

const folderTabs = <FolderTab[]>[
  {
    title: 'files.folderTabs.class.title',
    alert: 'files.folderTabs.class.alert',
    path: '/folders/class',
    currentPath: '/folders/class',
  },
  {
    title: 'files.folderTabs.shared.title',
    alert: 'files.folderTabs.shared.alert',
    path: '/folders/shared',
    currentPath: '/folders/group',
  },
  {
    title: 'files.folderTabs.personal.title',
    alert: 'files.folderTabs.personal.alert',
    path: '/folders/personal',
    currentPath: '/folders/personal',
  },
];
