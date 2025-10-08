import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'coordinator'
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = ref(false)
  const jwt = ref<string | null>(null)

  const login = (email: string, password: string): boolean => {
    // Simular autenticación
    if (email === 'admin@upb.edu.co' && password === 'admin123') {
      user.value = {
        id: '1',
        email: email,
        name: 'Coordinador de Cultura',
        role: 'coordinator'
      }
      isLoggedIn.value = true
      
      // Guardar en localStorage
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userData', JSON.stringify(user.value))
      
      return true
    }
    return false
  }

  const logout = () => {
    user.value = null
    isLoggedIn.value = false
    jwt.value = null
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
  }

  const initializeAuth = () => {
    const storedAuth = localStorage.getItem('isLoggedIn')
    const storedUser = localStorage.getItem('userData')
    const storedToken = localStorage.getItem('token')
    
    if (storedAuth === 'true' && storedUser) {
      isLoggedIn.value = true
      user.value = JSON.parse(storedUser)
    }

    if (storedToken) {
      jwt.value = storedToken
      // Si solo hay token, considera al usuario logueado a nivel de token
      if (!isLoggedIn.value) {
        isLoggedIn.value = true
      }
    }
  }

  const loginWithToken = (token: string) => {
    jwt.value = token
    isLoggedIn.value = true
    localStorage.setItem('token', token)
    localStorage.setItem('isLoggedIn', 'true')
    // Opcional: decodificar JWT para poblar datos mínimos del usuario si el token lo trae
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      if (payload && (payload.email || payload.username || payload.name || payload.role)) {
        user.value = {
          id: payload.sub || payload.id || 'unknown',
          email: payload.email || 'unknown@unknown',
          name: payload.name || payload.username || 'Usuario',
          role: (payload.role === 'admin' || payload.role === 'coordinator') ? payload.role : 'coordinator'
        }
        localStorage.setItem('userData', JSON.stringify(user.value))
      }
    } catch (e) {
      // Si no se puede decodificar, no detenemos el flujo: el token sigue guardado
    }
  }

  const isAdmin = computed(() => user.value?.role === 'admin')
  const isCoordinator = computed(() => user.value?.role === 'coordinator')

  return {
    user,
    isLoggedIn,
    jwt,
    isAdmin,
    isCoordinator,
    login,
    logout,
    initializeAuth,
    loginWithToken
  }
})
