<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8 md:py-12">
      <!-- Botón Volver al Panel (visible solo cuando está logueado) -->
      <div v-if="authStore.isLoggedIn" class="mb-6">
        <button
          @click="goToPanel"
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al Panel
        </button>
      </div>

      <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
        Próximos Eventos
      </h2>
      
      <!-- Sección de Filtros de Búsqueda -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8 max-w-xl mx-auto">
        <div class="flex items-center space-x-4">
          <input 
            v-model="eventsStore.searchTerm"
            type="text" 
            placeholder="Buscar eventos..." 
            class="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
          <button 
            @click="searchEvents"
            class="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition duration-300 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <!-- Filtro por categoría -->
        <div class="mt-4">
          <select 
            v-model="eventsStore.selectedCategory"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas las categorías</option>
            <option v-for="category in eventsStore.categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
      </div>

      <!-- Grid de Eventos -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="event in eventsStore.filteredEvents"
          :key="event.id"
          class="event-card bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img :src="event.image" :alt="event.name" class="w-full h-48 object-cover">
          <div class="p-6">
            <span :class="`text-sm font-semibold text-${event.categoryColor}-600`">
              {{ event.category }}
            </span>
            <h3 class="text-xl font-bold text-gray-900 mt-2">{{ event.name }}</h3>
            <p class="text-gray-500 text-sm mt-1">
              {{ formatDate(event.date) }} | {{ event.location }}
            </p>
            <p class="mt-4 text-gray-600">{{ event.description }}</p>
            <div class="mt-4 flex justify-start">
              <button 
                @click="viewEventDetails(event)"
                class="text-blue-600 hover:text-blue-800 font-medium transition duration-300"
              >
                Ver Detalles
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mensaje cuando no hay eventos -->
      <div v-if="eventsStore.filteredEvents.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No se encontraron eventos</h3>
        <p class="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
      </div>
    </div>

    <!-- Modal de detalles del evento -->
    <EventDetailsModal 
      v-if="selectedEvent"
      :event="selectedEvent"
      @close="selectedEvent = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEventsStore } from '../stores/events'
import { useAuthStore } from '../stores/auth'
import { useNotifications } from '../composables/useNotifications'
import { useModal } from '../composables/useModal'
import EventDetailsModal from '../components/EventDetailsModal.vue'
import type { Event } from '../stores/events'

const router = useRouter()
const eventsStore = useEventsStore()
const authStore = useAuthStore()
const { showNotification } = useNotifications()
const { open: openModal } = useModal()

const selectedEvent = ref<Event | null>(null)

const searchEvents = () => {
  // La búsqueda se maneja automáticamente con el computed filteredEvents
  showNotification('Búsqueda realizada', 'info')
}

const viewEventDetails = (event: Event) => {
  selectedEvent.value = event
}

const formatDate = (dateString: string) => {
  // dateString viene como "2025-10-29"
  // Parsear directamente sin usar Date object para evitar problemas de timezone
  const [year, month, day] = dateString.split('-')
  
  const monthNames = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ]
  
  const monthIndex = parseInt(month) - 1
  const monthName = monthNames[monthIndex]
  
  return `${parseInt(day)} de ${monthName} de ${year}`
}

const goToPanel = () => {
  const role = authStore.user?.role
  
  switch (role) {
    case 'administrador':
      router.push('/admin')
      break
    case 'Lcultural':
      router.push('/lider')
      break
    case 'usuario':
      router.push('/usuario')
      break
    default:
      router.push('/')
  }
}
</script>
