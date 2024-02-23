import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { ROUTE } from './constants'
import { useAuthStore } from '@/views/auth/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        public: true
      },
      component: HomeView
    },
    {
      path: '/login',
      name: ROUTE.LOGIN,
      meta: {
        public: true
      },
      component: () => import('@/views/auth/login/index.vue')
    },
    {
      path: '/signup',
      name: ROUTE.SIGNUP,
      meta: {
        public: true
      },
      component: () => import('@/views/auth/signup/index.vue')
    },
    {
      path: '/feedback/create',
      name: ROUTE.FEEDBACK.CREATE,
      meta: {},
      component: () => import('@/views/feedback/create/index.vue')
    },
    {
      path: '/feedback/list',
      name: ROUTE.FEEDBACK.LIST,
      meta: {},
      component: () => import('@/views/feedback/list/index.vue')
    },
    {
      path: '/feedback/:id',
      name: ROUTE.FEEDBACK.SHOW,
      meta: {},
      component: () => import('@/views/feedback/[id]/index.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = 'Feedback Machine'
  const authRequired = !to.matched.some((record) => record.meta.public)
  const loggedIn = localStorage.getItem('accessToken')
  if (authRequired && !loggedIn) {
    next({
      name: ROUTE.LOGIN,
      query: {
        redirect: to.fullPath
      }
    })
  } else if (!authRequired && loggedIn) {
    next({
      name: ROUTE.FEEDBACK.LIST
    })
  }
  next()
})

export default router
