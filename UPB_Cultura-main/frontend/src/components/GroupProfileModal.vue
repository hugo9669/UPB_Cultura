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
              <h4 class="font-semibold text-gray-900">Líder</h4>
              <p class="text-2xl font-bold text-blue-600">{{ group.director }}</p>
            </div>
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
              v-if="isAdmin"
              @click="handleDelete"
              :disabled="deletingGroup"
              class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!deletingGroup">Eliminar Grupo</span>
              <span v-else>Eliminando...</span>
            </button>
            <button 
              v-if="canContactLeader"
              @click="openContactModal"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contactar al Líder
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

    <!-- Modal de contactar al líder -->
    <ContactLeaderModal
      v-if="showContactModal"
      :group="group"
      @close="closeContactModal"
      @sent="handleMessageSent"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useModal } from '../composables/useModal'
import { useAuthStore } from '../stores/auth'
import { apiService } from '../services/api'
import { useNotifications } from '../composables/useNotifications'
import ContactLeaderModal from './ContactLeaderModal.vue'
import type { Group } from '../stores/groups'

const props = defineProps<{
  group: Group
}>()

const emit = defineEmits<{
  close: []
  deleted: []
}>()

const authStore = useAuthStore()
const { showNotification } = useNotifications()
const { open: openPhotoModal } = useModal()

const deletingGroup = ref(false)
const showContactModal = ref(false)

// Verificar si el usuario es administrador
const isAdmin = computed(() => authStore.user?.role === 'administrador')

// Verificar si el usuario puede contactar al líder
// Solo pueden contactar si están logueados (usuarios y administradores)
const canContactLeader = computed(() => {
  if (!authStore.isLoggedIn) return false
  // Permitir contacto para usuarios normales y administradores
  // Solo excluir a los líderes culturales (ellos tienen su propio sistema de mensajería)
  return authStore.user?.role === 'usuario' || authStore.user?.role === 'administrador'
})

const viewPhoto = (photoUrl: string) => {
  openPhotoModal({ photoUrl })
}

const openContactModal = () => {
  showContactModal.value = true
}

const closeContactModal = () => {
  showContactModal.value = false
}

const handleMessageSent = () => {
  showNotification('Mensaje enviado al líder cultural exitosamente', 'success')
  closeContactModal()
}

const handleDelete = async () => {
  const confirmDelete = confirm(
    `¿Estás seguro de que deseas eliminar el grupo "${props.group.name}"?\n\n` +
    `Esta acción NO se puede deshacer y eliminará:\n` +
    `• El grupo cultural\n` +
    `• Todas las membresías asociadas\n` +
    `• Todos los eventos del grupo\n` +
    `• Todos los mensajes relacionados\n\n` +
    `Los miembros del grupo perderán su vinculación.`
  )
  
  if (!confirmDelete) return

  deletingGroup.value = true
  try {
    await apiService.deleteGroup(props.group.id)
    showNotification(`Grupo "${props.group.name}" eliminado exitosamente`, 'success')
    
    // Cerrar el modal y notificar al padre para que recargue la lista
    emit('deleted')
    emit('close')
  } catch (error: any) {
    console.error('Error al eliminar grupo:', error)
    showNotification(
      error.response?.data?.message || 'Error al eliminar el grupo',
      'error'
    )
  } finally {
    deletingGroup.value = false
  }
}
</script>
