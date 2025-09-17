<template>
  <header class="bg-white shadow-sm sticky top-0 z-40">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logo de la UPB -->
      <RouterLink to="/" class="flex items-center space-x-3">
        <div class="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13v2.9c0 .5-.2.9-.6 1.2L8.5 13.9c-.3.3-.8.5-1.4.5h-.6V8h1.8c.6 0 1.1-.2 1.4-.5.4-.3.6-.7.6-1.2V6.1c0-.4-.2-.8-.6-1.1s-.9-.4-1.4-.4H6.5v2.9h1.8v1.8h-1.8v2.9h.6c.3 0 .7-.1 1.1-.3l.7-.7.6-.6c.2-.2.3-.5.3-.8V12h-1.8v-1.8h1.8v-2.9h-1.8V5h1.8c.4 0 .7.1.9.3.2.2.3.4.3.7zm4.7 9c-.3.3-.6.5-1.1.5h-.6v-2.9h1.8v-1.8h-1.8v-2.9h-1.8v-1.8h3.6V5h-5.4v14h3.6V12c0-.7.3-1.1.9-1.3.6-.2 1.2-.2 1.8 0 .6.2.9.6.9 1.3V19h-1.8v-2.9h1.8v-1.8h-1.8v-2.9h1.8v-1.8h1.8V12h-1.8v2.9h1.8v-1.8h-1.8V19z"/>
          </svg>
        </div>
        <h1 class="text-xl md:text-2xl font-bold text-gray-900">UPB Cultura</h1>
      </RouterLink>

      <!-- Barra de navegación (Desktop) -->
      <nav class="hidden md:flex items-center space-x-8">
        <RouterLink 
          to="/eventos" 
          class="nav-link text-gray-600 hover:text-blue-600 transition duration-300 font-medium"
          :class="{ 'text-blue-600': $route.path === '/eventos' }"
        >
          Eventos
        </RouterLink>
        <RouterLink 
          to="/grupos" 
          class="nav-link text-gray-600 hover:text-blue-600 transition duration-300 font-medium"
          :class="{ 'text-blue-600': $route.path === '/grupos' }"
        >
          Grupos Culturales
        </RouterLink>
        <RouterLink 
          to="/acerca" 
          class="nav-link text-gray-600 hover:text-blue-600 transition duration-300 font-medium"
          :class="{ 'text-blue-600': $route.path === '/acerca' }"
        >
          Acerca de Nosotros
        </RouterLink>
        <RouterLink 
          to="/contacto" 
          class="nav-link text-gray-600 hover:text-blue-600 transition duration-300 font-medium"
          :class="{ 'text-blue-600': $route.path === '/contacto' }"
        >
          Contacto
        </RouterLink>
      </nav>

      <!-- Botón de acción -->
      <div class="flex items-center space-x-4">
        <template v-if="authStore.isLoggedIn">
          <RouterLink 
            to="/dashboard" 
            class="bg-green-600 text-white px-4 py-2 rounded-full font-medium hover:bg-green-700 transition duration-300 shadow-lg"
          >
            Dashboard
          </RouterLink>
          <button 
            @click="handleLogout"
            class="bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition duration-300 shadow-lg"
          >
            Cerrar Sesión
          </button>
        </template>
        <template v-else>
          <RouterLink 
            to="/login" 
            class="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition duration-300 shadow-lg"
          >
            Iniciar Sesión
          </RouterLink>
        </template>

        <!-- Menú móvil -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden p-2 text-gray-600 hover:text-blue-600"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Menú móvil -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-t border-gray-200">
      <div class="px-4 py-2 space-y-2">
        <RouterLink 
          to="/eventos" 
          class="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
          @click="closeMobileMenu"
        >
          Eventos
        </RouterLink>
        <RouterLink 
          to="/grupos" 
          class="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
          @click="closeMobileMenu"
        >
          Grupos Culturales
        </RouterLink>
        <RouterLink 
          to="/acerca" 
          class="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
          @click="closeMobileMenu"
        >
          Acerca de Nosotros
        </RouterLink>
        <RouterLink 
          to="/contacto" 
          class="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
          @click="closeMobileMenu"
        >
          Contacto
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useNotifications } from '../composables/useNotifications'

const router = useRouter()
const authStore = useAuthStore()
const { showNotification } = useNotifications()

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogout = () => {
  authStore.logout()
  showNotification('Sesión cerrada correctamente', 'info')
  router.push('/')
}
</script>
