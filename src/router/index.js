import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('../views/registrationPage.vue')
    },
    {
      path: '/websitePage',
      name: 'websitePage',
      component: () => import('../views/websitePage.vue')
    },
    {
      path: '/registrationPage',
      name: 'registrationPage',
      component: () => import('../views/registrationPage.vue')
    },
    {
      path: '/coursesPage',
      name: 'coursesPage',
      component: () => import('../views/coursesPage.vue')
    },
    {
      path: '/accountsPage',
      name: 'accountsPage',
      component: () => import('../views/accountsPage.vue')
    },
  ]
})

export default router
