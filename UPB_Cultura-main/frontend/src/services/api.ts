// Servicio de API para comunicarse con el backend
import {
  adaptEventFromBackend,
  adaptEventToBackend,
  adaptGroupFromBackend,
  adaptGroupToBackend,
  adaptEventsFromBackend,
  adaptGroupsFromBackend,
  type BackendEvent,
  type BackendGroup,
  type FrontendEvent,
  type FrontendGroup
} from '@/utils/adapters'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

export interface ApiError {
  error: string
  message?: string
  status?: number
}

class ApiService {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.loadToken()
  }

  private loadToken() {
    this.token = localStorage.getItem('token')
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        throw {
          error: data.error || 'Error en la petición',
          message: data.message,
          status: response.status,
        } as ApiError
      }

      return { data }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw {
          error: 'Error de conexión',
          message: 'No se pudo conectar con el servidor',
        } as ApiError
      }
      throw error
    }
  }

  // Métodos HTTP
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }

  // Métodos específicos para autenticación
  async login(email: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> {
    const response = await this.post<{ token: string; user: any }>('/auth/login', {
      email,
      password,
    })

    if (response.data?.token) {
      this.token = response.data.token
      localStorage.setItem('token', this.token)
    }

    return response
  }

  async logout(): Promise<void> {
    this.token = null
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    localStorage.removeItem('isLoggedIn')
  }

  async register(userData: any): Promise<ApiResponse<{ token: string; user: any }>> {
    const response = await this.post<{ token: string; user: any }>('/auth/register', userData)

    if (response.data?.token) {
      this.token = response.data.token
      localStorage.setItem('token', this.token)
    }

    return response
  }

  // Métodos para eventos
  async getEvents(): Promise<ApiResponse<FrontendEvent[]>> {
    const response = await this.get<BackendEvent[]>('/events')
    if (response.data) {
      return { data: adaptEventsFromBackend(response.data) }
    }
    return response
  }

  async getEvent(id: string): Promise<ApiResponse<FrontendEvent>> {
    const response = await this.get<BackendEvent>(`/events/${id}`)
    if (response.data) {
      return { data: adaptEventFromBackend(response.data) }
    }
    return response
  }

  async createEvent(eventData: Partial<FrontendEvent>, groupId: string): Promise<ApiResponse<FrontendEvent>> {
    const backendData = adaptEventToBackend(eventData, groupId)
    const response = await this.post<BackendEvent>('/events', backendData)
    if (response.data) {
      return { data: adaptEventFromBackend(response.data) }
    }
    return response
  }

  async updateEvent(id: string, eventData: Partial<FrontendEvent>, groupId?: string): Promise<ApiResponse<FrontendEvent>> {
    // Para actualizar, necesitamos el groupId existente
    const existingEvent = await this.getEvent(id)
    if (!existingEvent.data) {
      return { error: 'Evento no encontrado' }
    }

    // Usar el groupId proporcionado o extraerlo del evento existente
    const targetGroupId = groupId || 'existing-group-id' // Se debería extraer del evento existente
    const backendData = adaptEventToBackend(eventData, targetGroupId)
    const response = await this.put<BackendEvent>(`/events/${id}`, backendData)
    if (response.data) {
      return { data: adaptEventFromBackend(response.data) }
    }
    return response
  }

  async deleteEvent(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/events/${id}`)
  }

  // Métodos para grupos
  async getGroups(): Promise<ApiResponse<FrontendGroup[]>> {
    const response = await this.get<BackendGroup[]>('/groups')
    if (response.data) {
      return { data: adaptGroupsFromBackend(response.data) }
    }
    return response
  }

  async getGroup(id: string): Promise<ApiResponse<FrontendGroup>> {
    const response = await this.get<BackendGroup>(`/groups/${id}`)
    if (response.data) {
      return { data: adaptGroupFromBackend(response.data) }
    }
    return response
  }

  async createGroup(groupData: Partial<FrontendGroup>): Promise<ApiResponse<FrontendGroup>> {
    const backendData = adaptGroupToBackend(groupData)
    const response = await this.post<BackendGroup>('/groups', backendData)
    if (response.data) {
      return { data: adaptGroupFromBackend(response.data) }
    }
    return response
  }

  async updateGroup(id: string, groupData: Partial<FrontendGroup>): Promise<ApiResponse<FrontendGroup>> {
    const backendData = adaptGroupToBackend(groupData)
    const response = await this.put<BackendGroup>(`/groups/${id}`, backendData)
    if (response.data) {
      return { data: adaptGroupFromBackend(response.data) }
    }
    return response
  }

  async deleteGroup(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/groups/${id}`)
  }

  // Métodos para membresías
  async getMemberships(): Promise<ApiResponse<any[]>> {
    return this.get<any[]>('/memberships')
  }

  async joinGroup(groupId: string): Promise<ApiResponse<any>> {
    return this.post<any>(`/memberships/${groupId}/join`)
  }

  async leaveGroup(groupId: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/memberships/${groupId}/leave`)
  }

  // Métodos para anuncios
  async getAnnouncements(): Promise<ApiResponse<any[]>> {
    return this.get<any[]>('/announcements')
  }

  async createAnnouncement(announcementData: any): Promise<ApiResponse<any>> {
    return this.post<any>('/announcements', announcementData)
  }

  // Métodos para búsqueda
  async search(query: string): Promise<ApiResponse<any>> {
    return this.get<any>(`/search?q=${encodeURIComponent(query)}`)
  }

  // Métodos para calendarios
  async getCalendar(): Promise<ApiResponse<any>> {
    return this.get<any>('/calendars')
  }

  async exportCalendar(): Promise<ApiResponse<any>> {
    return this.get<any>('/calendars/export')
  }

  // Métodos para dashboard
  async getDashboardData(): Promise<ApiResponse<any>> {
    return this.get<any>('/admin/dashboard')
  }

  // Métodos para media/archivos
  async uploadImage(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData()
    formData.append('file', file)

    const url = `${this.baseURL}/media/upload`

    const headers: Record<string, string> = {}
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw {
          error: data.error || 'Error al subir la imagen',
          message: data.message,
          status: response.status,
        } as ApiError
      }

      return { data: { url: data.url } }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw {
          error: 'Error de conexión',
          message: 'No se pudo conectar con el servidor',
        } as ApiError
      }
      throw error
    }
  }
}

// Instancia singleton del servicio API
export const apiService = new ApiService(API_BASE_URL)

// Función helper para manejar errores de API
export const handleApiError = (error: ApiError): string => {
  // Errores específicos de autenticación
  if (error.error === 'Usuario no encontrado') {
    return 'El correo electrónico no está registrado en el sistema.'
  }
  
  if (error.error === 'Contraseña incorrecta') {
    return 'La contraseña es incorrecta.'
  }
  
  if (error.error === 'Usuario sin contraseña configurada') {
    return 'El usuario no tiene contraseña configurada. Contacta al administrador.'
  }
  
  if (error.error === 'Credenciales inválidas') {
    return 'Correo electrónico o contraseña incorrectos.'
  }

  // Errores de estado HTTP
  if (error.status === 401) {
    // Token expirado o inválido
    apiService.logout()
    return 'Sesión expirada. Por favor, inicia sesión nuevamente.'
  }

  if (error.status === 403) {
    return 'No tienes permisos para realizar esta acción.'
  }

  if (error.status === 404) {
    return 'Recurso no encontrado.'
  }

  if (error.status === 500) {
    return 'Error interno del servidor. Inténtalo más tarde.'
  }

  // Error de conexión
  if (error.error === 'Error de conexión') {
    return 'No se pudo conectar con el servidor. Verifica tu conexión a internet.'
  }

  return error.message || error.error || 'Error desconocido'
}
