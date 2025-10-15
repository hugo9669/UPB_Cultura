// Adaptadores de datos para convertir entre formatos del backend y frontend
export interface BackendEvent {
  id: string
  title: string
  description: string
  category: string
  groupId: string
  location: string
  startAt: string
  endAt: string
  visibility: 'public' | 'members' | 'private'
  ticketUrl?: string
  publishAt?: string
  image?: string
  categoryColor?: string
  createdAt: string
  updatedAt: string
}

export interface FrontendEvent {
  id: string
  name: string
  description: string
  date: string
  time: string
  location: string
  category: string
  categoryColor: string
  image: string
  createdAt: string
}

export interface BackendGroup {
  id: string
  name: string
  category: string
  description: string
  logoUrl?: string
  ownerId?: string
  image?: string
  categoryColor?: string
  members: number
  founded?: string
  director?: string
  photos: string[]
  createdAt: string
  updatedAt: string
}

export interface FrontendGroup {
  id: string
  name: string
  description: string
  category: string
  categoryColor: string
  image: string
  members: number
  founded: string
  director: string
  photos: string[]
}

// Adaptador: Backend Event → Frontend Event
export function adaptEventFromBackend(backendEvent: BackendEvent): FrontendEvent {
  const startDate = new Date(backendEvent.startAt)

  return {
    id: backendEvent.id,
    name: backendEvent.title,
    description: backendEvent.description,
    date: startDate.toISOString().split('T')[0],
    time: startDate.toTimeString().split(' ')[0].substring(0, 5),
    location: backendEvent.location,
    category: backendEvent.category,
    categoryColor: backendEvent.categoryColor || getCategoryColor(backendEvent.category),
    image: backendEvent.image || 'https://placehold.co/600x400/1a202c/ffffff?text=Evento',
    createdAt: backendEvent.createdAt
  }
}

// Adaptador: Frontend Event → Backend Event
export function adaptEventToBackend(frontendEvent: Partial<FrontendEvent>, groupId: string): Partial<BackendEvent> {
  if (!frontendEvent.date || !frontendEvent.time) {
    throw new Error('Fecha y hora son requeridos para crear un evento')
  }

  const startAt = new Date(`${frontendEvent.date}T${frontendEvent.time}`)
  const endAt = new Date(startAt.getTime() + 2 * 60 * 60 * 1000) // +2 horas por defecto

  return {
    title: frontendEvent.name,
    description: frontendEvent.description,
    category: frontendEvent.category,
    groupId: groupId,
    location: frontendEvent.location,
    startAt: startAt.toISOString(),
    endAt: endAt.toISOString(),
    visibility: 'public',
    image: frontendEvent.image,
    categoryColor: frontendEvent.categoryColor
  }
}

// Adaptador: Backend Group → Frontend Group
export function adaptGroupFromBackend(backendGroup: BackendGroup): FrontendGroup {
  return {
    id: backendGroup.id,
    name: backendGroup.name,
    description: backendGroup.description,
    category: backendGroup.category,
    categoryColor: backendGroup.categoryColor || getCategoryColor(backendGroup.category),
    image: backendGroup.image || backendGroup.logoUrl || 'https://placehold.co/400x300/1e40af/ffffff?text=Grupo',
    members: backendGroup.members,
    founded: backendGroup.founded || '2020',
    director: backendGroup.director || 'Director',
    photos: backendGroup.photos || []
  }
}

// Adaptador: Frontend Group → Backend Group
export function adaptGroupToBackend(frontendGroup: Partial<FrontendGroup>): Partial<BackendGroup> {
  return {
    name: frontendGroup.name,
    category: frontendGroup.category,
    description: frontendGroup.description,
    image: frontendGroup.image,
    categoryColor: frontendGroup.categoryColor,
    members: frontendGroup.members || 0,
    founded: frontendGroup.founded,
    director: frontendGroup.director,
    photos: frontendGroup.photos || []
  }
}

// Función helper para obtener colores de categoría
function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    'Música': 'blue',
    'Teatro': 'red',
    'Danza': 'green',
    'Artes Visuales': 'purple',
    'Literatura': 'yellow',
    'Cine': 'indigo',
    'General': 'gray'
  }

  return colorMap[category] || 'blue'
}

// Función para convertir arrays de eventos
export function adaptEventsFromBackend(backendEvents: BackendEvent[]): FrontendEvent[] {
  return backendEvents.map(adaptEventFromBackend)
}

// Función para convertir arrays de grupos
export function adaptGroupsFromBackend(backendGroups: BackendGroup[]): FrontendGroup[] {
  return backendGroups.map(adaptGroupFromBackend)
}
