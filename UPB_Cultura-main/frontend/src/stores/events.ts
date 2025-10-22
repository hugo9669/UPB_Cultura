import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiService, handleApiError } from '@/services/api'

export interface Event {
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

export const useEventsStore = defineStore('events', () => {
  const events = ref<Event[]>([])
  const searchTerm = ref('')
  const selectedCategory = ref('')
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const availableCategories = ref<Array<{ id: number; name: string; description: string }>>([])


  // Eventos de ejemplo
  const sampleEvents: Event[] = [
    {
      id: '1',
      name: 'Concierto de Fin de Semestre',
      description: 'Una noche mágica de melodías con el coro de la UPB. ¡No te lo pierdas!',
      date: '2024-12-27',
      time: '19:00',
      location: 'Forum UPB',
      category: 'Música',
      categoryColor: 'blue',
      image: 'https://placehold.co/600x400/1a202c/ffffff?text=Concierto+de+Coro',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'La Casa de Bernarda Alba',
      description: 'La aclamada obra de Federico García Lorca, interpretada por el grupo de teatro UPB.',
      date: '2024-10-03',
      time: '20:00',
      location: 'Forum UPB',
      category: 'Teatro',
      categoryColor: 'red',
      image: 'https://placehold.co/600x400/9b2c2c/ffffff?text=Obra+de+Teatro',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Festival Folclórico Nacional',
      description: 'Un vibrante festival que celebra las danzas tradicionales de todo el país.',
      date: '2024-10-15',
      time: '18:00',
      location: 'Coliseo Cubierto (Bloque 20)',
      category: 'Danza',
      categoryColor: 'green',
      image: 'https://placehold.co/600x400/10b981/ffffff?text=Festival+de+Danza',
      createdAt: new Date().toISOString()
    },
    {
      id: '4',
      name: 'Exposición de Arte Digital',
      description: 'Una muestra de las mejores creaciones digitales de nuestros estudiantes de arte.',
      date: '2024-10-20',
      time: '10:00',
      location: 'Biblioteca Central',
      category: 'Artes Visuales',
      categoryColor: 'purple',
      image: 'https://placehold.co/600x400/7c3aed/ffffff?text=Arte+Digital',
      createdAt: new Date().toISOString()
    },
    {
      id: '5',
      name: 'Noche de Poesía',
      description: 'Una velada íntima con los mejores poetas de la universidad.',
      date: '2024-10-25',
      time: '17:00',
      location: 'Sala de Lectura',
      category: 'Literatura',
      categoryColor: 'yellow',
      image: 'https://placehold.co/600x400/eab308/ffffff?text=Poesía',
      createdAt: new Date().toISOString()
    },
    {
      id: '6',
      name: 'Festival de Cine Estudiantil',
      description: 'Proyección de cortometrajes realizados por estudiantes de comunicación.',
      date: '2024-10-30',
      time: '19:00',
      location: 'Aula Magna',
      category: 'Cine',
      categoryColor: 'indigo',
      image: 'https://placehold.co/600x400/4f46e5/ffffff?text=Cine+Estudiantil',
      createdAt: new Date().toISOString()
    }
  ]

  const initializeEvents = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // Cargar categorías desde el backend
      const categoriesResponse = await apiService.getCategories()
      if (categoriesResponse.data) {
        availableCategories.value = categoriesResponse.data
      }
      
      // Cargar eventos
      const response = await apiService.getEvents()
      if (response.data) {
        events.value = response.data
      }
    } catch (err: any) {
      error.value = handleApiError(err)
      console.error('Error al cargar eventos:', err)
      events.value = []
    } finally {
      isLoading.value = false
    }
  }

  const saveEvents = () => {
    localStorage.setItem('events', JSON.stringify(events.value))
  }

  const addEvent = async (event: Omit<Event, 'id' | 'createdAt'>, groupId: string): Promise<{ success: boolean; error?: string }> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await apiService.createEvent(event, groupId)
      if (response.data) {
        events.value.push(response.data)
        saveEvents()
        return { success: true }
      } else {
        return { success: false, error: 'Error al crear el evento' }
      }
    } catch (err: any) {
      error.value = handleApiError(err)
      return { success: false, error: handleApiError(err) }
    } finally {
      isLoading.value = false
    }
  }

  const updateEvent = async (id: string, updatedEvent: Partial<Event>): Promise<{ success: boolean; error?: string }> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await apiService.updateEvent(id, updatedEvent)
      if (response.data) {
        const index = events.value.findIndex(event => event.id === id)
        if (index !== -1) {
          events.value[index] = response.data
          saveEvents()
        }
        return { success: true }
      } else {
        return { success: false, error: 'Error al actualizar el evento' }
      }
    } catch (err: any) {
      error.value = handleApiError(err)
      return { success: false, error: handleApiError(err) }
    } finally {
      isLoading.value = false
    }
  }

  const deleteEvent = async (id: string): Promise<{ success: boolean; error?: string }> => {
    isLoading.value = true
    error.value = null
    
    try {
      await apiService.deleteEvent(id)
      events.value = events.value.filter(event => event.id !== id)
      saveEvents()
      return { success: true }
    } catch (err: any) {
      error.value = handleApiError(err)
      return { success: false, error: handleApiError(err) }
    } finally {
      isLoading.value = false
    }
  }

  const filteredEvents = computed(() => {
    let filtered = events.value
    
    // Filtrar eventos que ya pasaron (solo mostrar eventos futuros)
    const now = new Date()
    filtered = filtered.filter(event => {
      // Construir la fecha del evento con su hora
      const eventDateStr = event.date // formato "YYYY-MM-DD"
      const eventTimeStr = event.time || "00:00" // formato "HH:MM"
      const [year, month, day] = eventDateStr.split('-').map(Number)
      const [hours, minutes] = eventTimeStr.split(':').map(Number)
      
      // Crear fecha del evento en hora local
      const eventDate = new Date(year, month - 1, day, hours, minutes)
      
      return eventDate >= now
    })

    if (searchTerm.value) {
      const term = searchTerm.value.toLowerCase()
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term) ||
        event.category.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term)
      )
    }

    if (selectedCategory.value) {
      filtered = filtered.filter(event => event.category === selectedCategory.value)
    }

    return filtered
  })

  const upcomingEvents = computed(() => {
    const now = new Date()
    return filteredEvents.value.filter(event => {
      const eventDate = new Date(event.date + 'T' + event.time)
      return eventDate > now
    })
  })

  const pastEvents = computed(() => {
    const now = new Date()
    return filteredEvents.value.filter(event => {
      const eventDate = new Date(event.date + 'T' + event.time)
      return eventDate <= now
    })
  })

  const categories = computed(() => {
    // Retornar categorías cargadas de la BD
    return availableCategories.value.map(cat => cat.name)
  })

  return {
    events,
    searchTerm,
    selectedCategory,
    isLoading,
    error,
    filteredEvents,
    upcomingEvents,
    pastEvents,
    categories,
    initializeEvents,
    addEvent,
    updateEvent,
    deleteEvent
  }
})
