import { useAppStore } from '@/stores/app';
import EmptyRouterView from '@/views/EmptyRouterView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/in',
      name: 'in',
      meta: { title: 'Sign In' },
      component: () => import('../views/auth/SignInView.vue'),
    },
    {
      path: '/join',
      name: 'join',
      meta: { title: 'Join' },
      component: () => import('../views/auth/JoinView.vue'),
    },
    {
      path: '/scan',
      name: 'scan',
      meta: { title: 'Scan' },
      component: () => import('../views/auth/ScanCodeView.vue'),
    },
    {
      path: '/',
      component: () => import('../views/home/HomeView.vue'),
      children: [
        {
          path: '',
          name: 'overview',
          meta: { title: 'Home' },
          component: () => import('../views/home/overview/OverviewView.vue'),
        },
        {
          path: 'calendar',
          name: 'calendar',
          meta: { title: 'Calendar' },
          component: () => import('../views/home/calendar/CalendarView.vue'),
        },
        {
          path: 'folders',
          component: EmptyRouterView,
          children: [
            {
              path: '',
              name: 'folders',
              meta: { title: 'Folders' },
              component: () =>
                import('../views/home/links/FoldersWrapperView.vue'),
            },
            {
              path: ':folderId',
              name: 'links',
              meta: { title: 'Links' },
              component: () => import('../views/home/links/LinksView.vue'),
            },
          ],
        },
        {
          path: 'account',
          component: EmptyRouterView,
          children: [
            {
              path: '',
              name: 'account',
              meta: { title: 'Account' },
              component: () => import('../views/home/account/AccountView.vue'),
            },
            {
              path: 'settings',
              name: 'settings',
              meta: { title: 'Settings' },
              component: () => import('../views/home/account/SettingsView.vue'),
            },
            {
              path: 'members',
              name: 'members',
              meta: { title: 'Members' },
              component: () => import('../views/home/account/MembersView.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
});

const DEFAULT_TITLE = 'OutClass';
router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = DEFAULT_TITLE + ' - ' + to.meta.title;
  } else {
    document.title = DEFAULT_TITLE;
  }

  const appStore = useAppStore();
  appStore.startLoading();

  // if (typeof to?.matched[0]?.components?.default === 'function') {
  // }
});

router.beforeResolve(() => {
  const appStore = useAppStore();
  appStore.stopLoading();
});

export default router;
