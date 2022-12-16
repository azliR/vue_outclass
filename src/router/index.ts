import {
  DEFAULT_CLASSROOM_ID_PREF_KEY,
  JWT_TOKEN_PREF_KEY,
} from '@/plugins/constants'
import { useAppStore } from '@/stores/app'
import EmptyRouterView from '@/views/EmptyRouterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/in',
      name: 'in',
      meta: { title: 'Sign In' },
      component: () => import('@/views/auth/SignInView.vue'),
    },
    {
      path: '/signin',
      redirect: '/in',
    },
    {
      path: '/up',
      name: 'up',
      meta: { title: 'Sign Up' },
      component: () => import('@/views/auth/SignUpView.vue'),
    },
    {
      path: '/signup',
      redirect: '/up',
    },
    {
      path: '/join',
      name: 'join',
      meta: { title: 'Join' },
      component: () => import('@/views/auth/JoinView.vue'),
    },
    {
      path: '/join/:classCode',
      name: 'joinInsertStudentId',
      meta: { title: 'Join' },
      component: () => import('@/views/auth/JoinInsertStudentIdView.vue'),
    },
    {
      path: '/scan',
      name: 'scan',
      meta: { title: 'Scan' },
      component: () => import('@/views/auth/ScanCodeView.vue'),
    },
    {
      path: '/',
      component: () => import('@/views/home/HomeView.vue'),
      children: [
        {
          path: '',
          name: 'overview',
          meta: { title: 'Home' },
          component: () => import('@/views/home/overview/OverviewView.vue'),
        },
        {
          path: 'calendar',
          name: 'calendar',
          meta: { title: 'Calendar' },
          component: () => import('@/views/home/calendar/CalendarView.vue'),
        },
        {
          path: 'folders',
          component: EmptyRouterView,
          children: [
            {
              path: ':shareType',
              component: () =>
                import('@/views/home/directories/DirectoriesWrapperView.vue'),
              children: [
                {
                  path: '',
                  name: 'rootFolders',
                  meta: { title: 'Files' },
                  component: () =>
                    import('@/views/home/directories/DirectoriesView.vue'),
                },
                {
                  path: ':folderId',
                  name: 'folders',
                  meta: { title: 'Files' },
                  component: () =>
                    import('@/views/home/directories/DirectoriesView.vue'),
                },
              ],
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
              component: () => import('@/views/home/account/AccountView.vue'),
            },
            {
              path: 'settings',
              name: 'settings',
              meta: { title: 'Settings' },
              component: () => import('@/views/home/account/SettingsView.vue'),
            },
            {
              path: 'members',
              name: 'members',
              meta: { title: 'Members' },
              component: () => import('@/views/home/account/MembersView.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

const DEFAULT_TITLE = 'OutClass'
router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = DEFAULT_TITLE + ' - ' + to.meta.title
  } else {
    document.title = DEFAULT_TITLE
  }

  const appStore = useAppStore()
  appStore.startLoading()

  if (
    localStorage.getItem(JWT_TOKEN_PREF_KEY) === null &&
    to.name !== 'in' &&
    to.name !== 'up' &&
    to.name !== 'reset'
  ) {
    return { name: 'in' }
  } else if (
    localStorage.getItem(DEFAULT_CLASSROOM_ID_PREF_KEY) === null &&
    to.name !== 'join' &&
    to.name !== 'scan' &&
    to.name !== 'in' &&
    to.name !== 'up' &&
    to.name !== 'reset'
  ) {
    return { name: 'join' }
  }
})

router.beforeResolve(() => {
  const appStore = useAppStore()
  appStore.stopLoading()
})

export default router
