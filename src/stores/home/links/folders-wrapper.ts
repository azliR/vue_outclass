import { defineStore } from 'pinia';

export const useFoldersWrapperStore = defineStore('folders-wrapper', {
  state() {
    return {
      selectedTab: 0,
    };
  },
  getters: {
    folderTabs: () => folderTabs,
  },
});

export default interface FolderTab {
  title: string;
  alert: string;
  path: string;
}

const folderTabs = <FolderTab[]>[
  {
    title: 'files.folderTabs.class.title',
    alert: 'files.folderTabs.class.alert',
    path: '/class',
  },
  {
    title: 'files.folderTabs.shared.title',
    alert: 'files.folderTabs.shared.alert',
    path: '/shared',
  },
  {
    title: 'files.folderTabs.personal.title',
    alert: 'files.folderTabs.personal.alert',
    path: '/personal',
  },
];
