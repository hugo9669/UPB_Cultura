<template>
  <div class="modal active" @click.self="$emit('close')">
    <div class="modal-content max-w-2xl">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-bold text-gray-900">Contactar a {{ groupName }}</h3>
        <button 
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 text-2xl"
        >
          &times;
        </button>
      </div>
      
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
        <p class="text-sm text-blue-700">
          <strong>Nota:</strong> El mensaje se enviará desde tu cuenta de administrador. El líder del grupo verá tu nombre y correo electrónico.
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Motivo del Mensaje <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.motivo"
            type="text"
            required
            minlength="5"
            maxlength="200"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Solicitud de información, Coordinación de evento, etc."
          />
          <p class="text-xs text-gray-500 mt-1">Mínimo 5 caracteres, máximo 200</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Mensaje <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="form.mensaje"
            required
            minlength="10"
            rows="6"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Escribe tu mensaje aquí... (Mínimo 10 caracteres)"
          ></textarea>
        </div>

        <div class="flex gap-4 justify-end pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="sending"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {{ sending ? 'Enviando...' : 'Enviar Mensaje' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { apiService } from '@/services/api'
import { useNotifications } from '@/composables/useNotifications'

const props = defineProps<{
  groupId: string | number
  groupName: string
}>()

const emit = defineEmits<{
  close: []
  success: []
}>()

const { showNotification } = useNotifications()

const form = ref({
  motivo: '',
  mensaje: ''
})

const sending = ref(false)

const handleSubmit = async () => {
  // Validaciones básicas
  if (form.value.motivo.length < 5) {
    showNotification('El motivo debe tener al menos 5 caracteres', 'error')
    return
  }

  if (form.value.mensaje.length < 10) {
    showNotification('El mensaje debe tener al menos 10 caracteres', 'error')
    return
  }

  sending.value = true
  try {
    const response = await apiService.sendMessage({
      idGrupo: parseInt(props.groupId),
      motivo: form.value.motivo,
      mensaje: form.value.mensaje
    })

    if (response.data) {
      showNotification('¡Mensaje enviado correctamente! El líder del grupo lo recibirá pronto.', 'success')
      emit('success')
      emit('close')
    }
  } catch (error: any) {
    console.error('Error al enviar mensaje:', error)
    const errorMessage = error.response?.data?.error || error.message || 'Error al enviar el mensaje'
    showNotification(errorMessage, 'error')
  } finally {
    sending.value = false
  }
}
</script>

