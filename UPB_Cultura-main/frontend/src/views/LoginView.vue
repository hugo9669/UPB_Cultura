<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header con botón de volver -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <button
            @click="goToHome"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition duration-300"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </button>
          <span class="text-gray-700 font-semibold">UPB Cultura</span>
        </div>
      </div>
    </div>

    <!-- Contenido del login centrado -->
    <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
        <div class="mx-auto h-16 w-24">
          <svg width="96" height="64" viewBox="0 0 96 64" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="upbLoginGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#E91E63;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#9C27B0;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#673AB7;stop-opacity:1" />
              </linearGradient>
            </defs>
            <!-- Fondo con gradiente -->
            <rect width="96" height="64" rx="8" fill="url(#upbLoginGradient)"/>
            <!-- Texto UPB -->
            <text x="48" y="44" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#E8E0F5" text-anchor="middle">UPB</text>
          </svg>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Inicia Sesión
        </h2>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Correo Electrónico</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Correo electrónico"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>
          <div>
            <label for="password" class="sr-only">Contraseña</label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                :class="{ 'border-red-500': errors.password }"
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg v-if="showPassword" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
                <svg v-else class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
          >
            <span v-if="isLoading" class="loading mr-2"></span>
            <span v-else class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
            {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
          </button>
          <p v-if="formError" class="mt-3 text-sm text-red-600 text-center">{{ formError }}</p>
        </div>
      </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useNotifications } from '../composables/useNotifications'

const router = useRouter()
const authStore = useAuthStore()
const { showNotification } = useNotifications()

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const isLoading = ref(false)
const showPassword = ref(false)
const formError = ref('')

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const validateForm = () => {
  let isValid = true
  
  // Limpiar errores anteriores
  errors.email = ''
  errors.password = ''

  // Validar email
  if (!form.email) {
    errors.email = 'El email es obligatorio'
    isValid = false
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Ingresa un email válido'
    isValid = false
  }

  // Validar contraseña
  if (!form.password) {
    errors.password = 'La contraseña es obligatoria'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres'
    isValid = false
  }

  return isValid
}

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const goToHome = () => {
  router.push('/')
}

const handleLogin = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true
  formError.value = ''

  try {
    const result = await authStore.login(form.email, form.password)
    
    if (result.success) {
      showNotification('¡Inicio de sesión exitoso!', 'success')
      
      // Redirigir según el rol del usuario
      const userRole = authStore.user?.role
      
      if (userRole === 'administrador') {
        router.push('/admin')
      } else if (userRole === 'usuario') {
        router.push('/usuario')
      } else if (userRole === 'Lcultural') {
        router.push('/lider')
      } else {
        router.push('/dashboard')
      }
    } else {
      const msg = result.error || 'Usuario o contraseña incorrecto'
      formError.value = msg
      showNotification(msg, 'error')
    }
  } catch (error) {
    formError.value = 'Usuario o contraseña incorrecto'
    showNotification('Usuario o contraseña incorrecto', 'error')
  } finally {
    isLoading.value = false
  }
}
</script>
