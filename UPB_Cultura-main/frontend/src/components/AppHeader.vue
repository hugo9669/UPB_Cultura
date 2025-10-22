<template>
  <header class="bg-white shadow-sm sticky top-0 z-40">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logo de la UPB -->
      <RouterLink to="/" class="flex items-center space-x-3">
        <svg width="80" height="40" viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto">
          <defs>
            <linearGradient id="upbGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#E91E63;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#9C27B0;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#673AB7;stop-opacity:1" />
            </linearGradient>
          </defs>
          <!-- Fondo con gradiente -->
          <rect width="80" height="40" rx="4" fill="url(#upbGradient)"/>
          <!-- Texto UPB -->
          <text x="40" y="28" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#E8E0F5" text-anchor="middle">UPB</text>
        </svg>
        <h1 class="text-xl md:text-2xl font-bold text-gray-900">UPB Cultura</h1>
      </RouterLink>

<<<<<<< HEAD
      <!-- Barra de navegación (Desktop) - Visible para todos -->
      <nav class="hidden md:flex items-center space-x-8">
=======
      <!-- Barra de navegación (Desktop) - Solo administradores -->
      <nav v-if="authStore.isAdmin" class="hidden md:flex items-center space-x-8">
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
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
      </nav>

      <!-- Botón de acción -->
      <div class="flex items-center space-x-4">
<<<<<<< HEAD
        <!-- Botón de Iniciar Sesión cuando NO está logueado -->
        <RouterLink 
          v-if="!authStore.isLoggedIn"
          to="/login" 
          class="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition duration-300 shadow-lg"
        >
          Iniciar Sesión
        </RouterLink>
        
        <!-- Botón de Cerrar Sesión cuando SÍ está logueado -->
        <button 
          v-else-if="authStore.isLoggedIn && authStore.user"
          @click="handleLogout"
          class="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition duration-300"
        >
          Cerrar Sesión
        </button>

        <!-- Menú móvil - Visible para todos -->
=======
        <template v-if="authStore.isLoggedIn">
          <!-- Dashboard solo visible para administradores -->
          <RouterLink 
            v-if="authStore.isAdmin"
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

        <!-- Menú móvil - Solo administradores -->
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
        <button 
          v-if="authStore.isAdmin"
          @click="toggleMobileMenu"
          class="md:hidden p-2 text-gray-600 hover:text-blue-600"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

<<<<<<< HEAD
    <!-- Menú móvil - Visible para todos -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-t border-gray-200">
=======
    <!-- Menú móvil - Solo administradores -->
    <div v-if="isMobileMenuOpen && authStore.isAdmin" class="md:hidden bg-white border-t border-gray-200">
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
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
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}

// Debug: Monitorear el estado de autenticación
onMounted(() => {
  console.log('🔍 AppHeader - Estado de autenticación:', {
    isLoggedIn: authStore.isLoggedIn,
    user: authStore.user,
    isAdmin: authStore.isAdmin,
    isUsuario: authStore.isUsuario,
    isLider: authStore.isLider
  })
})

// Watch para detectar cambios en autenticación y usuario
watch([() => authStore.isLoggedIn, () => authStore.user], ([newIsLoggedIn, newUser]) => {
  console.log('🔄 AppHeader - Estado cambió:', {
    isLoggedIn: newIsLoggedIn,
    hasUser: !!newUser,
    role: newUser?.role
  })
})
</script>
