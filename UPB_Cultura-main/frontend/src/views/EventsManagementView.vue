<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8 md:py-12">
      <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-6">
          Gestión de Eventos
        </h2>
        <p class="text-lg text-gray-600 text-center mb-8">
          Administra los eventos de tu grupo cultural. Puedes crear, editar o eliminar eventos.
        </p>
        
        <!-- Panel de Creación de Eventos -->
        <div class="mb-10">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Crear Nuevo Evento</h3>
          <form @submit.prevent="saveEvent" class="space-y-4">
            <div>
              <label for="event-name" class="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Evento
              </label>
              <input
                id="event-name"
                v-model="eventForm.name"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                :class="{ 'border-red-500': errors.name }"
                placeholder="Ej: Concierto de Navidad"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
            </div>
            
            <div>
              <label for="event-description" class="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                id="event-description"
                v-model="eventForm.description"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                :class="{ 'border-red-500': errors.description }"
                placeholder="Una breve descripción del evento..."
              ></textarea>
              <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="event-date" class="block text-sm font-medium text-gray-700 mb-1">
                  Fecha del Evento
                </label>
                <input
                  id="event-date"
                  v-model="eventForm.date"
                  type="date"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  :class="{ 'border-red-500': errors.date }"
                />
                <p v-if="errors.date" class="mt-1 text-sm text-red-600">{{ errors.date }}</p>
              </div>
              
              <div>
                <label for="event-time" class="block text-sm font-medium text-gray-700 mb-1">
                  Hora del Evento
                </label>
                <input
                  id="event-time"
                  v-model="eventForm.time"
                  type="time"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  :class="{ 'border-red-500': errors.time }"
                />
                <p v-if="errors.time" class="mt-1 text-sm text-red-600">{{ errors.time }}</p>
              </div>
            </div>
            
            <div>
              <label for="event-location" class="block text-sm font-medium text-gray-700 mb-1">
                Lugar del Evento
              </label>
              <input
                id="event-location"
                v-model="eventForm.location"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                :class="{ 'border-red-500': errors.location }"
                placeholder="Ej: Forum"
              />
              <p v-if="errors.location" class="mt-1 text-sm text-red-600">{{ errors.location }}</p>
            </div>
            
            <div>
              <label for="event-category" class="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                id="event-category"
                v-model="eventForm.category"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              >
                <option value="">Selecciona una categoría</option>
                <option value="Música">Música</option>
                <option value="Teatro">Teatro</option>
                <option value="Danza">Danza</option>
                <option value="Artes Visuales">Artes Visuales</option>
                <option value="Literatura">Literatura</option>
                <option value="Cine">Cine</option>
              </select>
            </div>
            
            <!-- ✅ Campo de selección de grupo -->
            <div>
              <label for="event-group" class="block text-sm font-medium text-gray-700 mb-1">
                Grupo Cultural
              </label>
              <select
                id="event-group"
                v-model="eventForm.groupId"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                :class="{ 'border-red-500': errors.groupId }"
              >
                <option value="">Selecciona un grupo</option>
                <option v-for="group in availableGroups" :key="group.id" :value="group.id">
                  {{ group.name }} ({{ group.category }})
                </option>
              </select>
              <p v-if="errors.groupId" class="mt-1 text-sm text-red-600">{{ errors.groupId }}</p>
            </div>
            
            <button
              type="submit"
              :disabled="isSaving"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
            >
              <span v-if="isSaving" class="loading mr-2"></span>
              {{ isSaving ? 'Guardando...' : 'Guardar Evento' }}
            </button>
          </form>
        </div>

        <!-- Separador visual -->
        <hr class="border-t border-gray-200 my-8">

        <!-- Panel de Próximos Eventos -->
        <div class="mb-10">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Próximos Eventos</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lugar
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="eventsStore.upcomingEvents.length === 0">
                  <td colspan="4" class="px-6 py-4 text-center text-gray-500">
                    No hay eventos próximos
                  </td>
                </tr>
                <tr v-else v-for="event in eventsStore.upcomingEvents" :key="event.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ event.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(event.date) }} {{ event.time }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ event.location }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      @click="editEvent(event)"
                      class="text-blue-600 hover:text-blue-900 transition duration-300"
                    >
                      Editar
                    </button>
                    <button 
                      @click="deleteEvent(event.id)"
                      class="text-red-600 hover:text-red-900 transition duration-300"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Separador visual -->
        <hr class="border-t border-gray-200 my-8">
        
        <!-- Panel de Eventos Anteriores -->
        <div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Eventos Anteriores</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lugar
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="eventsStore.pastEvents.length === 0">
                  <td colspan="4" class="px-6 py-4 text-center text-gray-500">
                    No hay eventos anteriores
                  </td>
                </tr>
                <tr v-else v-for="event in eventsStore.pastEvents" :key="event.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ event.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(event.date) }} {{ event.time }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ event.location }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      @click="viewEventDetails(event)"
                      class="text-blue-600 hover:text-blue-900 transition duration-300"
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useEventsStore } from '../stores/events'
import { useGroupsStore } from '../stores/groups'
import { useNotifications } from '../composables/useNotifications'
import type { Event } from '../stores/events'

const eventsStore = useEventsStore()
const groupsStore = useGroupsStore()
const { showNotification } = useNotifications()

// Cargar grupos disponibles
const availableGroups = ref([])

onMounted(async () => {
  await groupsStore.initializeGroups()
  availableGroups.value = groupsStore.groups
})

const eventForm = reactive({
  name: '',
  description: '',
  date: '',
  time: '',
  location: '',
  category: '',
  groupId: '' // ✅ Agregar selección de grupo
})

const errors = reactive({
  name: '',
  description: '',
  date: '',
  time: '',
  location: '',
  groupId: '' // ✅ Agregar validación para grupo
})

const isSaving = ref(false)
const editingEvent = ref<Event | null>(null)

const validateForm = () => {
  let isValid = true
  
  // Limpiar errores anteriores
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  if (!eventForm.name.trim()) {
    errors.name = 'El nombre del evento es obligatorio'
    isValid = false
  }

  if (!eventForm.date) {
    errors.date = 'La fecha del evento es obligatoria'
    isValid = false
  } else {
    const eventDate = new Date(eventForm.date + 'T' + eventForm.time)
    if (eventDate <= new Date()) {
      errors.date = 'La fecha y hora del evento deben ser futuras'
      isValid = false
    }
  }

  if (!eventForm.time) {
    errors.time = 'La hora del evento es obligatoria'
    isValid = false
  }

  if (!eventForm.location.trim()) {
    errors.location = 'El lugar del evento es obligatorio'
    isValid = false
  }

  // ✅ Validar que se seleccione un grupo
  if (!eventForm.groupId) {
    errors.groupId = 'Debe seleccionar un grupo cultural'
    isValid = false
  }

  return isValid
}

const saveEvent = async () => {
  if (!validateForm()) {
    showNotification('Por favor, corrige los errores en el formulario', 'error')
    return
  }

  isSaving.value = true

  try {
    const eventData = {
      name: eventForm.name.trim(),
      description: eventForm.description.trim(),
      date: eventForm.date,
      time: eventForm.time,
      location: eventForm.location.trim(),
      category: eventForm.category || 'General',
      categoryColor: getCategoryColor(eventForm.category),
      image: 'https://placehold.co/600x400/1a202c/ffffff?text=Evento'
    }

    let result: { success: boolean; error?: string }
    
    if (editingEvent.value) {
      result = await eventsStore.updateEvent(editingEvent.value.id, eventData)
      if (result.success) {
        showNotification('Evento actualizado exitosamente', 'success')
        editingEvent.value = null
      } else {
        showNotification(result.error || 'Error al actualizar el evento', 'error')
      }
    } else {
      // ✅ Usar el groupId seleccionado para crear el evento
      result = await eventsStore.addEvent(eventData, eventForm.groupId)
      if (result.success) {
        showNotification('Evento creado exitosamente', 'success')
      } else {
        showNotification(result.error || 'Error al crear el evento', 'error')
      }
    }

    // Limpiar formulario solo si fue exitoso
    if (result.success) {
      Object.keys(eventForm).forEach(key => {
        eventForm[key as keyof typeof eventForm] = ''
      })
    }

  } catch (error) {
    showNotification('Error al guardar el evento', 'error')
  } finally {
    isSaving.value = false
  }
}

const editEvent = (event: Event) => {
  editingEvent.value = event
  eventForm.name = event.name
  eventForm.description = event.description
  eventForm.date = event.date
  eventForm.time = event.time
  eventForm.location = event.location
  eventForm.category = event.category
  
  // Scroll al formulario
  document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })
  showNotification('Evento cargado para edición', 'info')
}

const deleteEvent = async (eventId: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
    const result = await eventsStore.deleteEvent(eventId)
    if (result.success) {
      showNotification('Evento eliminado exitosamente', 'success')
    } else {
      showNotification(result.error || 'Error al eliminar el evento', 'error')
    }
  }
}

const viewEventDetails = (event: Event) => {
  showNotification(`Viendo detalles de: ${event.name}`, 'info')
  // Aquí se podría abrir un modal con los detalles
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Música': 'blue',
    'Teatro': 'red',
    'Danza': 'green',
    'Artes Visuales': 'purple',
    'Literatura': 'yellow',
    'Cine': 'indigo'
  }
  return colors[category] || 'gray'
}

onMounted(() => {
  eventsStore.initializeEvents()
})
</script>
