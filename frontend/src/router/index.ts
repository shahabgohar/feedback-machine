import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { ROUTE } from './constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
      name: ROUTE.HOME
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
  if (to.name === ROUTE.LOGIN || to.name === ROUTE.SIGNUP) {
    document.body.classList.add('auth')
  } else {
    document.body.classList.remove('auth')
  }

  if (to.name === ROUTE.FEEDBACK.LIST) {
    document.body.classList.add('dashboard')
  }

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
