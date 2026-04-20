import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/storage'

NProgress.configure({ showSpinner: false })

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('@/layouts/index.vue'),
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '工作台', icon: 'Odometer' }
      },
      {
        path: 'activity-admin',
        name: 'ActivityAdmin',
        component: () => import('@/views/activity-admin/index.vue'),
        meta: { title: '活动管理' }
      },
      {
        path: 'signup-admin',
        name: 'SignupAdmin',
        component: () => import('@/views/signup-admin/index.vue'),
        meta: { title: '报名管理' }
      },
      {
        path: 'store-admin',
        name: 'StoreAdmin',
        component: () => import('@/views/store-admin/index.vue'),
        meta: { title: '门店管理' }
      },
      {
        path: 'user-admin',
        name: 'UserAdmin',
        component: () => import('@/views/user-admin/index.vue'),
        meta: { title: '用户管理' }
      },
      {
        path: 'user',
        name: 'User',
        redirect: '/user/list',
        meta: { title: '用户管理', icon: 'User' },
        children: [
          {
            path: 'list',
            name: 'UserList',
            component: () => import('@/views/user/List.vue'),
            meta: { title: '用户列表' }
          }
        ]
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  document.title = (to.meta.title as string || '管理系统') + ' - 骑行平台'

  const token = getToken()
  if (to.meta.requiresAuth !== false) {
    if (!token) {
      next('/login')
      return
    }
  }

  if (token && to.path === '/login') {
    next('/')
    return
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
