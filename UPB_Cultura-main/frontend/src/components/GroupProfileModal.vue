<template>
  <div class="modal active" @click.self="$emit('close')">
    <div class="modal-content max-w-4xl">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-3xl font-bold text-gray-900">{{ group.name }}</h3>
        <button 
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 text-2xl"
        >
          &times;
        </button>
      </div>
      
      <div class="flex flex-col md:flex-row gap-6">
        <div class="md:w-1/3">
          <img :src="group.image" :alt="group.name" class="w-full h-64 object-cover rounded-lg">
        </div>
        
        <div class="md:w-2/3 space-y-4">
          <div>
            <span :class="`inline-block px-3 py-1 bg-${group.categoryColor}-100 text-${group.categoryColor}-800 text-sm font-medium rounded-full`">
              {{ group.category }}
            </span>
          </div>
          
          <p class="text-gray-600 text-lg">{{ group.description }}</p>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900">Miembros</h4>
              <p class="text-2xl font-bold text-blue-600">{{ group.members }}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900">Fundado</h4>
              <p class="text-2xl font-bold text-blue-600">{{ group.founded }}</p>
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-900">Director</h4>
            <p class="text-lg text-gray-700">{{ group.director }}</p>
          </div>

          <!-- Galería de fotos -->
          <div v-if="group.photos.length > 0" class="mt-6">
            <h4 class="font-semibold text-gray-900 mb-3">Galería de Fotos</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
              <img
                v-for="(photo, index) in group.photos"
                :key="index"
                :src="photo"
                :alt="`Foto ${index + 1} de ${group.name}`"
                class="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition duration-300"
                @click="viewPhoto(photo)"
              />
            </div>
          </div>
          
          <div class="flex space-x-3">
            <button 
              @click="handleContact"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Contactar
            </button>
            <button 
              @click="$emit('close')"
              class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModal } from '../composables/useModal'
import type { Group } from '../stores/groups'

defineProps<{
  group: Group
}>()

defineEmits<{
  close: []
  contact: [group: Group]
}>()

const { open: openPhotoModal } = useModal()

const handleContact = () => {
  // Emitir evento de contacto
  // En un componente padre, esto se manejaría
}

const viewPhoto = (photoUrl: string) => {
  openPhotoModal({ photoUrl })
}
</script>
