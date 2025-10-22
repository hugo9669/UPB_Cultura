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

      // Manejar respuestas sin contenido (204 No Content)
      if (response.status === 204) {
        if (!response.ok) {
          throw {
            error: 'Error en la petición',
            status: response.status,
          } as ApiError
        }
        return { data: undefined as T }
      }

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

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
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

  // Métodos para categorías
  async getCategories(): Promise<ApiResponse<Array<{ id: number; name: string; description: string }>>> {
    return this.get('/categories')
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
    // Para actualizar, necesitamos el groupId
    // Primero intentar obtenerlo de eventData, luego del parámetro, luego del evento existente
    let targetGroupId = eventData.groupId || groupId
    
    if (!targetGroupId) {
      const existingEvent = await this.getEvent(id)
      if (!existingEvent.data) {
        return { error: 'Evento no encontrado' }
      }
      // Obtener el groupId del evento existente
      targetGroupId = existingEvent.data.groupId || '1' // Fallback a grupo 1 si no existe
    }

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
    const response = await this.patch<BackendGroup>(`/groups/${id}`, backendData)
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

  async getGroupMembers(groupId: string): Promise<ApiResponse<any[]>> {
    return this.get<any[]>(`/memberships/groups/${groupId}/members`)
  }

  async removeMember(groupId: string, userId: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/memberships/groups/${groupId}/members/${userId}`)
  }

  // Métodos para líder de grupo
  async getLeaderGroup(leaderId: string): Promise<ApiResponse<FrontendGroup>> {
    console.log('🔍 Buscando grupo para líder:', leaderId)
    const response = await this.get<BackendGroup[]>('/groups')
    if (response.data) {
      console.log('📊 Grupos obtenidos:', response.data.length)
      console.log('📋 Grupos disponibles:', response.data.map((g: BackendGroup) => ({
        id: g.id,
        nombre: g.nombreGrupo || g.name,
        idLider: g.idLider
      })))
      
      const leaderGroup = response.data.find((g: BackendGroup) => {
        const match = g.idLider?.toString() === leaderId.toString()
        console.log(`   Comparando grupo "${g.nombreGrupo || g.name}" (idLider: ${g.idLider}) con ${leaderId}: ${match}`)
        return match
      })
      
      if (leaderGroup) {
        console.log('✅ Grupo encontrado:', leaderGroup.nombreGrupo || leaderGroup.name)
        return { data: adaptGroupFromBackend(leaderGroup) }
      } else {
        console.log('❌ No se encontró grupo con idLider:', leaderId)
      }
    } else {
      console.log('❌ No se obtuvieron datos de grupos')
    }
    return { error: 'No se encontró grupo para este líder' }
  }

  async getGroupEvents(groupId: string): Promise<ApiResponse<FrontendEvent[]>> {
    const response = await this.get<BackendEvent[]>('/events')
    if (response.data) {
      const groupEvents = response.data.filter((e: BackendEvent) => e.idGrupo?.toString() === groupId.toString())
      return { data: adaptEventsFromBackend(groupEvents) }
    }
    return response
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

  async getStats(): Promise<ApiResponse<{ totalGroups: number; activeUsers: number; scheduledEvents: number }>> {
    return this.get<{ totalGroups: number; activeUsers: number; scheduledEvents: number }>('/admin/dashboard/stats')
  }

  // Métodos para usuarios
  async getUsers(role?: string): Promise<ApiResponse<any[]>> {
    const endpoint = role ? `/users?role=${role}` : '/users'
    return this.get<any[]>(endpoint)
  }

  async createUser(userData: { nombre: string; correo: string; contrasena: string; rol?: string }): Promise<ApiResponse<any>> {
    return this.post<any>('/users', userData)
  }

  async updateUser(userId: number, userData: { nombre?: string; correo?: string; contrasena?: string; rol?: string }): Promise<ApiResponse<any>> {
    return this.patch<any>(`/users/${userId}`, userData)
  }

  // Métodos para gestión de miembros
  async addMemberToGroup(groupId: string, userId: string, role: string = 'miembro'): Promise<ApiResponse<any>> {
    return this.post<any>('/memberships', { groupId, userId, role })
  }

  async getMyMemberships(): Promise<ApiResponse<any[]>> {
    return this.get<any[]>('/memberships/my-memberships')
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
    return 'Usuario o contraseña incorrecto'
  }
  
  if (error.error === 'Contraseña incorrecta') {
    return 'Usuario o contraseña incorrecto'
  }
  
  if (error.error === 'Usuario sin contraseña configurada') {
    return 'Usuario o contraseña incorrecto'
  }
  
  if (error.error === 'Usuario o contraseña incorrecto') {
    return 'Usuario o contraseña incorrecto'
  }
  
  if (error.error === 'Credenciales inválidas') {
    return 'Usuario o contraseña incorrecto'
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

// Métodos para mensajes
apiService.sendMessage = async function(messageData: {
  idGrupo: number
  motivo: string
  mensaje: string
}): Promise<ApiResponse<any>> {
  return this.post<any>('/messages', messageData)
}

apiService.getMessagesByGroup = async function(groupId: number): Promise<ApiResponse<any[]>> {
  return this.get<any[]>(`/messages/group/${groupId}`)
}

apiService.markMessageAsRead = async function(messageId: number): Promise<ApiResponse<any>> {
  return this.patch<any>(`/messages/${messageId}/read`, {})
}

apiService.getUnreadCount = async function(groupId: number): Promise<ApiResponse<{ count: number }>> {
  return this.get<{ count: number }>(`/messages/group/${groupId}/unread`)
}

// Métodos para reportes
apiService.getEventsReport = async function(filters?: {
  startDate?: string
  endDate?: string
  categoryId?: number
  groupId?: number
}): Promise<ApiResponse<any>> {
  const params = new URLSearchParams()
  if (filters?.startDate) params.append('startDate', filters.startDate)
  if (filters?.endDate) params.append('endDate', filters.endDate)
  if (filters?.categoryId) params.append('categoryId', filters.categoryId.toString())
  if (filters?.groupId) params.append('groupId', filters.groupId.toString())
  
  const queryString = params.toString()
  return this.get<any>(`/reports/events${queryString ? '?' + queryString : ''}`)
}

apiService.getGroupsReport = async function(): Promise<ApiResponse<any>> {
  return this.get<any>('/reports/groups')
}

apiService.getUsersReport = async function(): Promise<ApiResponse<any>> {
  return this.get<any>('/reports/users')
}

apiService.getMessagesReport = async function(filters?: {
  groupId?: number
  readStatus?: boolean
}): Promise<ApiResponse<any>> {
  const params = new URLSearchParams()
  if (filters?.groupId) params.append('groupId', filters.groupId.toString())
  if (filters?.readStatus !== undefined) params.append('readStatus', filters.readStatus.toString())
  
  const queryString = params.toString()
  return this.get<any>(`/reports/messages${queryString ? '?' + queryString : ''}`)
}

apiService.getGeneralReport = async function(): Promise<ApiResponse<any>> {
  return this.get<any>('/reports/general')
}

// Métodos para mensajes de líder a usuarios
apiService.sendUserMessage = async function(messageData: {
  idGrupo: number
  destinatarios: number[]
  asunto: string
  mensaje: string
  idEvento?: number | null
}): Promise<ApiResponse<any>> {
  return this.post<any>('/user-messages', messageData)
}

apiService.getReceivedUserMessages = async function(filters?: {
  readStatus?: boolean
  groupId?: number
}): Promise<ApiResponse<any[]>> {
  const params = new URLSearchParams()
  if (filters?.readStatus !== undefined) params.append('readStatus', filters.readStatus.toString())
  if (filters?.groupId) params.append('groupId', filters.groupId.toString())
  
  const queryString = params.toString()
  return this.get<any[]>(`/user-messages/received${queryString ? '?' + queryString : ''}`)
}

apiService.getSentUserMessages = async function(groupId?: number): Promise<ApiResponse<any[]>> {
  const queryString = groupId ? `?groupId=${groupId}` : ''
  return this.get<any[]>(`/user-messages/sent${queryString}`)
}

apiService.markUserMessageAsRead = async function(messageId: number): Promise<ApiResponse<any>> {
  return this.patch<any>(`/user-messages/${messageId}/read`, {})
}

apiService.getUnreadUserMessagesCount = async function(): Promise<ApiResponse<{ count: number }>> {
  return this.get<{ count: number }>('/user-messages/unread-count')
}

apiService.deleteUserMessage = async function(messageId: number): Promise<ApiResponse<any>> {
  return this.delete<any>(`/user-messages/${messageId}`)
}

apiService.deleteReceivedUserMessage = async function(messageId: number): Promise<ApiResponse<any>> {
  return this.delete<any>(`/user-messages/${messageId}/received`)
}

apiService.sendMessageToLeader = async function(data: { idGrupo: number; asunto: string; mensaje: string }): Promise<ApiResponse<any>> {
  return this.post<any>('/user-messages/to-leader', data)
}

apiService.getMessagesForLeader = async function(params?: { readStatus?: boolean; groupId?: number }): Promise<ApiResponse<any[]>> {
  return this.get<any[]>('/user-messages/leader-inbox', { params })
}

// ===== Membership Requests (Solicitudes de Membresía) =====
apiService.createMembershipRequest = async function(data: { idGrupo: number; motivacion: string; experiencia?: string }): Promise<ApiResponse<any>> {
  return this.post<any>('/membership-requests', data)
}

apiService.getMyMembershipRequests = async function(estado?: string): Promise<ApiResponse<any[]>> {
  const params = estado ? { estado } : {}
  return this.get<any[]>('/membership-requests/my', { params })
}

apiService.getGroupMembershipRequests = async function(groupId: number, estado?: string): Promise<ApiResponse<any[]>> {
  const params = estado ? { estado } : {}
  return this.get<any[]>(`/membership-requests/group/${groupId}`, { params })
}

apiService.getPendingRequestsCount = async function(groupId: number): Promise<ApiResponse<{ count: number }>> {
  return this.get<{ count: number }>(`/membership-requests/group/${groupId}/pending-count`)
}

apiService.updateMembershipRequest = async function(requestId: number, data: { estado: string; mensajeRespuesta?: string }): Promise<ApiResponse<any>> {
  return this.patch<any>(`/membership-requests/${requestId}`, data)
}

apiService.cancelMembershipRequest = async function(requestId: number): Promise<ApiResponse<any>> {
  return this.delete<any>(`/membership-requests/${requestId}`)
}

apiService.deleteProcessedMembershipRequest = async function(requestId: number): Promise<ApiResponse<any>> {
  return this.delete<any>(`/membership-requests/${requestId}/notification`)
}

apiService.deleteProcessedRequestByLeader = async function(requestId: number): Promise<ApiResponse<any>> {
  return this.delete<any>(`/membership-requests/${requestId}/leader`)
}
