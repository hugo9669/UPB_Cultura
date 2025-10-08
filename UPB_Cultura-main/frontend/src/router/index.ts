import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/eventos',
      name: 'events',
      component: () => import('../views/EventsView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/grupos',
      name: 'groups',
      component: () => import('../views/GroupsView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/acerca',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/contacto',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresAuth: false, hideForAuth: true }
    },
    {
      path: '/auth/callback',
      name: 'auth-callback',
      component: () => import('../views/AuthCallbackView.vue'),
      meta: { requiresAuth: false, hideForAuth: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/eventos-gestion',
      name: 'events-management',
      component: () => import('../views/EventsManagementView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

// Guard de navegación
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Si la ruta requiere autenticación
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login')
    return
  }
  
  // Si la ruta debe ocultarse para usuarios autenticados
  if (to.meta.hideForAuth && authStore.isLoggedIn) {
    next('/dashboard')
    return
  }
  
  next()
})

export default router