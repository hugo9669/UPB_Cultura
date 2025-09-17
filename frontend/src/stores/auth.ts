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
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userData')
  }

  const initializeAuth = () => {
    const storedAuth = localStorage.getItem('isLoggedIn')
    const storedUser = localStorage.getItem('userData')
    
    if (storedAuth === 'true' && storedUser) {
      isLoggedIn.value = true
      user.value = JSON.parse(storedUser)
    }
  }

  const isAdmin = computed(() => user.value?.role === 'admin')
  const isCoordinator = computed(() => user.value?.role === 'coordinator')

  return {
    user,
    isLoggedIn,
    isAdmin,
    isCoordinator,
    login,
    logout,
    initializeAuth
  }
})
