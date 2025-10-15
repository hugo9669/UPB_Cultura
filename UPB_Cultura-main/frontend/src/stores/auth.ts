import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiService, handleApiError } from '@/services/api'

export interface User {
  id: string
  email: string
  name: string
  role: 'administrador' | 'usuario' | 'Lcultural'
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = ref(false)
  const jwt = ref<string | null>(null)

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await apiService.login(email, password)
      
      if (response.data?.token && response.data?.user) {
        user.value = response.data.user
        isLoggedIn.value = true
        jwt.value = response.data.token
        
        // Guardar en localStorage
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userData', JSON.stringify(user.value))
        localStorage.setItem('token', response.data.token)
        
        return { success: true }
      } else {
        return { success: false, error: 'Credenciales incorrectas' }
      }
    } catch (error: any) {
      return { success: false, error: handleApiError(error) }
    }
  }

  const logout = async () => {
    try {
      await apiService.logout()
    } catch (error) {
      // Ignorar errores de logout en el servidor
      console.warn('Error al hacer logout en el servidor:', error)
    } finally {
      user.value = null
      isLoggedIn.value = false
      jwt.value = null
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userData')
      localStorage.removeItem('token')
    }
  }

  const initializeAuth = () => {
    const storedAuth = localStorage.getItem('isLoggedIn')
    const storedUser = localStorage.getItem('userData')
    const storedToken = localStorage.getItem('token')
    
    // Solo inicializar si hay TODOS los datos necesarios
    if (storedAuth === 'true' && storedUser && storedToken) {
      // Validación básica de forma de JWT (tres segmentos)
      const looksLikeJwt = storedToken.split('.').length === 3
      if (!looksLikeJwt) {
        console.log('⚠️ Token inválido en localStorage, limpiando...')
        logout()
        return
      }
      try {
        const userData = JSON.parse(storedUser)
        // Verificar que el usuario tiene los campos necesarios
        const validRole = ['administrador','usuario','Lcultural'].includes(userData?.role)
        if (userData && userData.id && userData.email && validRole) {
          isLoggedIn.value = true
          user.value = userData
          jwt.value = storedToken
          console.log('✅ Usuario autenticado desde localStorage:', userData.name)
        } else {
          console.log('⚠️ Datos de usuario inválidos, limpiando...')
          logout()
        }
      } catch (error) {
        console.log('⚠️ Error al parsear datos de usuario, limpiando...')
        logout()
      }
    } else {
      console.log('ℹ️ No hay datos de autenticación válidos')
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

  const isAdmin = computed(() => user.value?.role === 'administrador')
  const isUsuario = computed(() => user.value?.role === 'usuario')
  const isLider = computed(() => user.value?.role === 'Lcultural')

  return {
    user,
    isLoggedIn,
    jwt,
    isAdmin,
    isUsuario,
    isLider,
    login,
    logout,
    initializeAuth,
    loginWithToken
  }
})
