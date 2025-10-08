<template>
  <div class="modal active" @click.self="$emit('close')">
    <div class="modal-content max-w-2xl">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-2xl font-bold text-gray-900">{{ event.name }}</h3>
        <button 
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 text-2xl"
        >
          &times;
        </button>
      </div>
      
      <img :src="event.image" :alt="event.name" class="w-full h-64 object-cover rounded-lg mb-4">
      
      <div class="space-y-3">
        <p>
          <span class="font-semibold">Categoría:</span> 
          <span :class="`text-${event.categoryColor}-600`">{{ event.category }}</span>
        </p>
        <p>
          <span class="font-semibold">Fecha:</span> {{ formatDate(event.date) }}
        </p>
        <p>
          <span class="font-semibold">Hora:</span> {{ event.time }}
        </p>
        <p>
          <span class="font-semibold">Lugar:</span> {{ event.location }}
        </p>
        <p>
          <span class="font-semibold">Descripción:</span> {{ event.description }}
        </p>
      </div>
      
      <div class="mt-6 flex justify-end space-x-3">
        <button 
          @click="$emit('close')"
          class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
        >
          Cerrar
        </button>
        <button 
          @click="handleRegister"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Registrarse
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '../stores/events'

defineProps<{
  event: Event
}>()

defineEmits<{
  close: []
  register: [event: Event]
}>()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleRegister = () => {
  // Emitir evento de registro
  // En un componente padre, esto se manejaría
}
</script>
