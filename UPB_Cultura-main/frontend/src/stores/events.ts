import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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

  const initializeEvents = () => {
    const storedEvents = localStorage.getItem('events')
    if (storedEvents) {
      events.value = JSON.parse(storedEvents)
    } else {
      events.value = sampleEvents
      saveEvents()
    }
  }

  const saveEvents = () => {
    localStorage.setItem('events', JSON.stringify(events.value))
  }

  const addEvent = (event: Omit<Event, 'id' | 'createdAt'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    events.value.push(newEvent)
    saveEvents()
  }

  const updateEvent = (id: string, updatedEvent: Partial<Event>) => {
    const index = events.value.findIndex(event => event.id === id)
    if (index !== -1) {
      events.value[index] = { ...events.value[index], ...updatedEvent }
      saveEvents()
    }
  }

  const deleteEvent = (id: string) => {
    events.value = events.value.filter(event => event.id !== id)
    saveEvents()
  }

  const filteredEvents = computed(() => {
    let filtered = events.value

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
    const uniqueCategories = [...new Set(events.value.map(event => event.category))]
    return uniqueCategories
  })

  return {
    events,
    searchTerm,
    selectedCategory,
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
