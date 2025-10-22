import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiService, handleApiError } from '@/services/api'

export interface User {
  id: string
  email: string
  name: string
  role: 'administrador' | 'usuario' | 'Lcultural'
}

// Versión del sistema de autenticación
// Incrementa este número cuando hagas cambios importantes que requieran limpiar el localStorage
const AUTH_VERSION = '4.0'

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

  // Función auxiliar para limpiar todos los datos de autenticación
  const cleanupAuth = () => {
    user.value = null
    isLoggedIn.value = false
    jwt.value = null
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
    // No removemos authVersion para mantener el control de versión
  }

  const logout = async () => {
    try {
      await apiService.logout()
    } catch (error) {
      // Ignorar errores de logout en el servidor
      console.warn('Error al hacer logout en el servidor:', error)
    } finally {
      cleanupAuth()
    }
  }

  const initializeAuth = () => {
    // Verificar versión del sistema de autenticación
    const storedVersion = localStorage.getItem('authVersion')
    if (storedVersion !== AUTH_VERSION) {
      console.log(`🔄 Nueva versión del sistema de autenticación (${AUTH_VERSION}), limpiando datos antiguos...`)
      cleanupAuth()
      localStorage.setItem('authVersion', AUTH_VERSION)
      return
    }
    
    const storedAuth = localStorage.getItem('isLoggedIn')
    const storedUser = localStorage.getItem('userData')
    const storedToken = localStorage.getItem('token')
    
    // Asegurar que empezamos limpio si no hay token
    if (!storedToken) {
      console.log('ℹ️ No hay token, asegurando estado limpio')
      cleanupAuth()
      return
    }
    
    // Limpiar si hay datos parciales o inconsistentes
    if (!storedAuth && !storedUser && !storedToken) {
      console.log('ℹ️ No hay datos de autenticación')
      return
    }
    
    // Si hay datos parciales, limpiar todo
    if (!storedAuth || !storedUser || !storedToken || storedAuth !== 'true') {
      console.log('⚠️ Datos de autenticación incompletos o inconsistentes, limpiando...')
      cleanupAuth()
      return
    }
    
    // Validar formato JWT
    if (!storedToken || storedToken.split('.').length !== 3) {
      console.log('⚠️ Token inválido en localStorage, limpiando...')
      cleanupAuth()
      return
    }
    
    // Verificar si el token ha expirado
    try {
      const payload = JSON.parse(atob(storedToken.split('.')[1]))
      if (payload.exp) {
        const expirationTime = payload.exp * 1000
        const currentTime = Date.now()
        
        if (currentTime >= expirationTime) {
          console.log('⚠️ Token expirado, limpiando sesión...')
          cleanupAuth()
          return
        }
      }
      
      // Validar que el payload tenga rol
      if (!payload.role || !['administrador','usuario','Lcultural'].includes(payload.role)) {
        console.log('⚠️ Token sin rol válido, limpiando...')
        cleanupAuth()
        return
      }
    } catch (error) {
      console.log('⚠️ Error al decodificar token, limpiando...')
      cleanupAuth()
      return
    }
    
    // Validar datos del usuario
    try {
      const userData = JSON.parse(storedUser)
      
      if (!userData || !userData.id || !userData.email || !userData.role) {
        console.log('⚠️ Datos de usuario incompletos, limpiando...')
        cleanupAuth()
        return
      }
      
      const validRole = ['administrador','usuario','Lcultural'].includes(userData.role)
      if (!validRole) {
        console.log('⚠️ Rol de usuario inválido, limpiando...')
        cleanupAuth()
        return
      }
      
      // Todo válido, inicializar sesión
      isLoggedIn.value = true
      user.value = userData
      jwt.value = storedToken
      console.log('✅ Usuario autenticado desde localStorage:', userData.name, '- Rol:', userData.role)
    } catch (error) {
      console.log('⚠️ Error al parsear datos de usuario, limpiando...')
      cleanupAuth()
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
