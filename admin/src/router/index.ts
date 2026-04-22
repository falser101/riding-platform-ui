import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/index.vue'),
    redirect: '/dashboard',
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

export default router