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
      homeTabs: homeTabs,
    };
  },
  actions: {
    onTabChange(newTab: HomeTab, i: number) {
      const currentPath = this.router.currentRoute.value.path;
      const rootPath = `/${currentPath.split('/')[1]}`;

      this.homeTabs.map((tab) => {
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

interface HomeTab {
  title: string;
  path: string;
  currentPath: string;
  icon: string;
  activeIcon: string;
}

const homeTabs = <HomeTab[]>[
  {
    title: 'home.homeTabs.home',
    path: '/',
    currentPath: '/',
    icon: 'mdi-home-variant-outline',
    activeIcon: 'mdi-home-variant',
  },
  {
    title: 'home.homeTabs.calendar',
    path: '/calendar',
    currentPath: '/calendar',
    icon: 'mdi-calendar-outline',
    activeIcon: 'mdi-calendar',
  },
  {
    title: 'home.homeTabs.files',
    path: '/folders',
    currentPath: '/folders',
    icon: 'mdi-folder-outline',
    activeIcon: 'mdi-folder',
  },
  {
    title: 'home.homeTabs.account',
    path: '/account',
    currentPath: '/account',
    icon: 'mdi-account-outline',
    activeIcon: 'mdi-account',
  },
];
