// Adaptadores de datos para convertir entre formatos del backend y frontend
export interface BackendEvent {
<<<<<<< HEAD
  id?: string
  ID?: number
  // Campos de la BD (español)
  titulo?: string
  descripcion?: string
  fechaEvento?: string
  ubicacion?: string
  idGrupo?: number
  Id_grupo?: number
  enlaceBoleteria?: string
  urlImagen?: string
  groupName?: string
  // Campos alternativos (inglés) para compatibilidad
  title?: string
  description?: string
  category?: string
  groupId?: string
  location?: string
  startAt?: string
  endAt?: string
  visibility?: 'public' | 'members' | 'private'
=======
  id: string
  title: string
  description: string
  category: string
  groupId: string
  location: string
  startAt: string
  endAt: string
  visibility: 'public' | 'members' | 'private'
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
  ticketUrl?: string
  publishAt?: string
  image?: string
  categoryColor?: string
<<<<<<< HEAD
  createdAt?: string
  updatedAt?: string
=======
  createdAt: string
  updatedAt: string
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
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
<<<<<<< HEAD
  groupId?: number | string
  groupName?: string
=======
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
}

export interface BackendGroup {
  id: string
<<<<<<< HEAD
  nombreGrupo?: string
  name?: string
  idCategoria?: number
  category?: string
  descripcion?: string
  description?: string
  urlLogo?: string
  logoUrl?: string
  idLider?: number
  ownerId?: string
  image?: string
  categoryColor?: string
  memberCount?: number  // Número real de miembros desde el backend
  leaderName?: string   // Nombre del líder desde el backend
  members?: number
  director?: string
  photos?: string[]
  createdAt?: string
  updatedAt?: string
=======
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
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
}

export interface FrontendGroup {
  id: string
  name: string
  description: string
  category: string
  categoryColor: string
  image: string
  members: number
<<<<<<< HEAD
=======
  founded: string
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
  director: string
  photos: string[]
}

// Adaptador: Backend Event → Frontend Event
export function adaptEventFromBackend(backendEvent: BackendEvent): FrontendEvent {
<<<<<<< HEAD
  const dateString = backendEvent.startAt || backendEvent.fechaEvento || new Date().toISOString()
  
  const title = backendEvent.title || backendEvent.titulo || 'Sin título'
  const description = backendEvent.description || backendEvent.descripcion || 'Sin descripción'
  const location = backendEvent.location || backendEvent.ubicacion || 'Sin ubicación'
  const category = backendEvent.category || 'Musica'  // Default a Musica en vez de General
  const image = backendEvent.image || backendEvent.urlImagen || 'https://placehold.co/600x400/1a202c/ffffff?text=Evento'
  
  // Manejar ID que puede venir como string o number
  const id = backendEvent.id?.toString() || backendEvent.ID?.toString() || '0'

  // DEBUG: Ver qué formato está llegando desde el backend
  console.log('🔍 DEBUG - dateString recibido:', dateString)
  
  let dateOnly: string
  let timeOnly: string
  
  // SOLUCIÓN: Convertir UTC a hora de Colombia
  // El backend envía: "2025-10-29T20:00:00.000Z" (UTC)
  // PostgreSQL guarda: "2025-10-29 15:00:00-05" (Colombia)
  // Sequelize lee la BD y convierte a UTC (+5 horas): 15:00 -> 20:00 UTC
  // Necesitamos restar 5 horas para volver a hora de Colombia
  
  if (dateString.endsWith('Z')) {
    // Crear objeto Date a partir del string UTC
    const utcDate = new Date(dateString)
    console.log('📅 Fecha UTC parseada:', utcDate.toISOString())
    console.log('📅 Hora UTC:', utcDate.getUTCHours() + ':' + utcDate.getUTCMinutes())
    
    // Restar 5 horas para convertir a hora de Colombia
    utcDate.setUTCHours(utcDate.getUTCHours() - 5)
    
    // Extraer componentes en UTC (que ahora son hora de Colombia)
    const year = utcDate.getUTCFullYear()
    const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0')
    const day = String(utcDate.getUTCDate()).padStart(2, '0')
    dateOnly = `${year}-${month}-${day}`
    
    const hours = String(utcDate.getUTCHours()).padStart(2, '0')
    const minutes = String(utcDate.getUTCMinutes()).padStart(2, '0')
    timeOnly = `${hours}:${minutes}`
    
    console.log('✅ Resultado Colombia:', { 
      original: dateString, 
      dateOnly, 
      timeOnly,
      fechaCompleta: `${dateOnly} ${timeOnly}`
    })
  } 
  // Si el string tiene formato ISO con offset (ejemplo: "2025-12-31T19:00:00-05:00")
  // extraer directamente sin conversiones
  else if (dateString.match(/[+-]\d{2}:\d{2}$/)) {
    // Remover todo después del offset para obtener solo "2025-12-31T19:00:00"
    const cleanDateString = dateString.replace(/([+-]\d{2}:\d{2}|[+-]\d{2})$/, '')
    const parts = cleanDateString.split('T')
    dateOnly = parts[0]
    const timePart = parts[1].split(':')
    timeOnly = `${timePart[0]}:${timePart[1]}`
    console.log('✅ Parseado con offset:', { dateOnly, timeOnly })
  }
  // Fallback: formato sin zona horaria
  else {
    const parts = dateString.includes('T') ? dateString.split('T') : dateString.split(' ')
    dateOnly = parts[0]
    if (parts[1]) {
      const timePart = parts[1].split(':')
      timeOnly = `${timePart[0]}:${timePart[1]}`
    } else {
      timeOnly = '00:00'
    }
    console.log('✅ Parseado sin zona horaria:', { dateOnly, timeOnly })
  }

  return {
    id,
    name: title,
    description,
    date: dateOnly,
    time: timeOnly,
    location,
    category,
    categoryColor: backendEvent.categoryColor || getCategoryColor(category),
    image,
    createdAt: backendEvent.createdAt || new Date().toISOString(),
    groupId: backendEvent.groupId || backendEvent.idGrupo || backendEvent.Id_grupo,
    groupName: backendEvent.groupName || 'Sin grupo'
=======
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
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
  }
}

// Adaptador: Frontend Event → Backend Event
export function adaptEventToBackend(frontendEvent: Partial<FrontendEvent>, groupId: string): Partial<BackendEvent> {
  if (!frontendEvent.date || !frontendEvent.time) {
    throw new Error('Fecha y hora son requeridos para crear un evento')
  }

<<<<<<< HEAD
  // Crear string ISO con la fecha y hora exacta en zona horaria de Colombia (UTC-5)
  // Formato: "2025-11-12T19:00:00-05:00"
  const fechaEvento = `${frontendEvent.date}T${frontendEvent.time}:00-05:00`

  return {
    // Campos de la BD (español)
    titulo: frontendEvent.name || '',
    descripcion: frontendEvent.description || '',
    fechaEvento: fechaEvento,  // Ya es un string ISO con timezone
    ubicacion: frontendEvent.location || '',
    idGrupo: parseInt(groupId),
    enlaceBoleteria: null,
    urlImagen: frontendEvent.image || 'https://placehold.co/600x400/1a202c/ffffff?text=Evento'
=======
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
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
  }
}

// Adaptador: Backend Group → Frontend Group
export function adaptGroupFromBackend(backendGroup: BackendGroup): FrontendGroup {
<<<<<<< HEAD
  const name = backendGroup.name || backendGroup.nombreGrupo || 'Sin nombre'
  const description = backendGroup.description || backendGroup.descripcion || 'Sin descripción'
  const category = backendGroup.category || 'General'
  const image = backendGroup.image || backendGroup.urlLogo || backendGroup.logoUrl || 'https://placehold.co/400x300/1e40af/ffffff?text=Grupo'
  
  // Usar memberCount del backend (número real de miembros)
  const members = backendGroup.memberCount !== undefined ? backendGroup.memberCount : (backendGroup.members || 0)
  
  // Usar leaderName del backend
  const director = backendGroup.leaderName || backendGroup.director || 'Sin asignar'
  
  return {
    id: backendGroup.id,
    name,
    description,
    category,
    categoryColor: backendGroup.categoryColor || getCategoryColor(category),
    image,
    members,
    director,
=======
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
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
    photos: backendGroup.photos || []
  }
}

// Adaptador: Frontend Group → Backend Group
<<<<<<< HEAD
export function adaptGroupToBackend(frontendGroup: Partial<FrontendGroup> & { leaderId?: number }): Partial<BackendGroup> {
=======
export function adaptGroupToBackend(frontendGroup: Partial<FrontendGroup>): Partial<BackendGroup> {
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
  return {
    name: frontendGroup.name,
    category: frontendGroup.category,
    description: frontendGroup.description,
    image: frontendGroup.image,
    categoryColor: frontendGroup.categoryColor,
<<<<<<< HEAD
    photos: frontendGroup.photos || [],
    leaderId: frontendGroup.leaderId  // Agregar leaderId para creación de grupos
=======
    members: frontendGroup.members || 0,
    founded: frontendGroup.founded,
    director: frontendGroup.director,
    photos: frontendGroup.photos || []
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
  }
}

// Función helper para obtener colores de categoría
function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
<<<<<<< HEAD
    'Musica': 'blue',
    'Música': 'blue',  // Soporte para ambas versiones
    'Teatro': 'red',
    'Danza': 'green'
=======
    'Música': 'blue',
    'Teatro': 'red',
    'Danza': 'green',
    'Artes Visuales': 'purple',
    'Literatura': 'yellow',
    'Cine': 'indigo',
    'General': 'gray'
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
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
