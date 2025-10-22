<template>
  <div
    class="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center p-4"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 animate-fade-in">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Contactar al Líder Cultural</h2>
          <p class="text-sm text-gray-600 mt-1">{{ group.name }}</p>
        </div>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 transition duration-300"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Asunto -->
        <div>
          <label for="asunto" class="block text-sm font-medium text-gray-700 mb-2">
            Asunto <span class="text-red-500">*</span>
          </label>
          <input
            id="asunto"
            v-model="formData.asunto"
            type="text"
            required
            maxlength="200"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: Consulta sobre horarios de ensayo"
          />
          <p class="text-xs text-gray-500 mt-1">{{ formData.asunto.length }}/200 caracteres</p>
        </div>

        <!-- Mensaje -->
        <div>
          <label for="mensaje" class="block text-sm font-medium text-gray-700 mb-2">
            Mensaje <span class="text-red-500">*</span>
          </label>
          <textarea
            id="mensaje"
            v-model="formData.mensaje"
            required
            rows="6"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Escribe tu mensaje aquí..."
          ></textarea>
          <p class="text-xs text-gray-500 mt-1">{{ formData.mensaje.length }} caracteres</p>
        </div>

        <!-- Información adicional -->
        <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-blue-700">
                Tu mensaje será enviado directamente al líder del grupo <strong>{{ group.name }}</strong>. 
                Recibirás una respuesta en tu bandeja de mensajes.
              </p>
            </div>
          </div>
        </div>

        <!-- Botones -->
        <div class="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-300"
            :disabled="sending"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            :disabled="sending || !isFormValid"
          >
            <svg v-if="sending" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>{{ sending ? 'Enviando...' : 'Enviar Mensaje' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { apiService } from '../services/api'
import { useNotifications } from '../composables/useNotifications'
import type { Group } from '../stores/groups'

const props = defineProps<{
  group: Group
}>()

const emit = defineEmits<{
  close: []
  sent: []
}>()

const { showNotification } = useNotifications()

const formData = ref({
  asunto: '',
  mensaje: ''
})

const sending = ref(false)

const isFormValid = computed(() => {
  return formData.value.asunto.trim().length > 0 && 
         formData.value.mensaje.trim().length > 0
})

const handleSubmit = async () => {
  if (!isFormValid.value) return

  sending.value = true
  
  try {
    await apiService.sendMessageToLeader({
      idGrupo: parseInt(props.group.id),
      asunto: formData.value.asunto.trim(),
      mensaje: formData.value.mensaje.trim()
    })
    
    showNotification('Mensaje enviado exitosamente al líder cultural', 'success')
    emit('sent')
    emit('close')
  } catch (error: any) {
    console.error('Error al enviar mensaje:', error)
    showNotification(
      error.response?.data?.message || 'Error al enviar el mensaje',
      'error'
    )
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>


