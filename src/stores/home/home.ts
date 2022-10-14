import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useHomeStore = defineStore('home', {
  state() {
    const router = useRouter();
    const currentPath = router.currentRoute.value.path;
    const rootPath = `/${currentPath.split('/')[1]}`;

    const index = homeTabs.findIndex((tab) => tab.path === rootPath);

    return {
      selectedTab: index !== -1 ? index : 0,
      tabs: homeTabs,
    };
  },
  actions: {
    onTabChange(newTab: Tab, i: number) {
      const currentPath = this.router.currentRoute.value.path;
      const rootPath = `/${currentPath.split('/')[1]}`;

      this.tabs.map((tab) => {
        if (tab.path === rootPath) {
          if (newTab.path === rootPath) {
            newTab.currentPath = tab.path;
          } else {
            if (tab.currentPath === currentPath) {
              tab.currentPath = tab.path;
            } else {
              tab.currentPath = currentPath;
            }
          }
        }
        return tab;
      });

      this.router.push(newTab.currentPath);
      this.selectedTab = i;
    },
  },
});

interface Tab {
  title: string;
  path: string;
  currentPath: string;
  icon: string;
}

const homeTabs = <Tab[]>[
  {
    title: 'home',
    path: '/',
    currentPath: '/',
    icon: 'mdi-home-variant-outline',
  },
  {
    title: 'calendar',
    path: '/calendar',
    currentPath: '/calendar',
    icon: 'mdi-calendar',
  },
  {
    title: 'link',
    path: '/folders',
    currentPath: '/folders',
    icon: 'mdi-link',
  },
  {
    title: 'classroom',
    path: '/classroom',
    currentPath: '/classroom',
    icon: 'mdi-google-classroom',
  },
];
