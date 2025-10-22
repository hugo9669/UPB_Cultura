<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="close">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-900">Solicitar Unirse</h3>
          <button
            @click="close"
            class="text-gray-400 hover:text-gray-600 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Group Info -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p class="text-sm text-blue-800 mb-1 font-semibold">Grupo Cultural:</p>
          <p class="text-lg font-bold text-blue-900">{{ groupName }}</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="submitRequest">
          <!-- Motivación -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              ¿Por qué quieres unirte a este grupo? *
            </label>
            <textarea
              v-model="form.motivacion"
              rows="5"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Cuéntanos tu motivación para unirte a este grupo cultural. Mínimo 20 caracteres."
              :class="{ 'border-red-500': errors.motivacion }"
              required
            ></textarea>
            <p v-if="errors.motivacion" class="mt-1 text-sm text-red-600">{{ errors.motivacion }}</p>
            <p class="mt-1 text-sm text-gray-500">{{ form.motivacion.length }} / 20 caracteres mínimo</p>
          </div>

          <!-- Experiencia -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              ¿Tienes experiencia previa? (Opcional)
            </label>
            <textarea
              v-model="form.experiencia"
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Si tienes experiencia relacionada con este grupo (música, teatro, danza, etc.), cuéntanos. Mínimo 10 caracteres si decides llenar este campo."
              :class="{ 'border-red-500': errors.experiencia }"
            ></textarea>
            <p v-if="errors.experiencia" class="mt-1 text-sm text-red-600">{{ errors.experiencia }}</p>
            <p v-if="form.experiencia" class="mt-1 text-sm text-gray-500">{{ form.experiencia.length }} / 10 caracteres mínimo</p>
          </div>

          <!-- Info Note -->
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <div>
                <p class="text-sm font-medium text-yellow-800">Nota importante</p>
                <p class="text-sm text-yellow-700 mt-1">
                  Tu solicitud será revisada por el líder del grupo cultural. Recibirás una notificación cuando sea aprobada o rechazada.
                </p>
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex gap-3">
            <button
              type="button"
              @click="close"
              class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition duration-300"
              :disabled="submitting"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="submitting || !isFormValid"
            >
              <span v-if="!submitting">Enviar Solicitud</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { apiService } from '@/services/api'
import { useNotifications } from '@/composables/useNotifications'

const { showNotification } = useNotifications()

interface Props {
  isOpen: boolean
  groupId: string | number
  groupName: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  success: []
}>()

const form = ref({
  motivacion: '',
  experiencia: ''
})

const errors = ref({
  motivacion: '',
  experiencia: ''
})

const submitting = ref(false)

const isFormValid = computed(() => {
  return form.value.motivacion.length >= 20 &&
         (form.value.experiencia === '' || form.value.experiencia.length >= 10)
})

const validateForm = () => {
  errors.value = {
    motivacion: '',
    experiencia: ''
  }

  let isValid = true

  if (form.value.motivacion.length < 20) {
    errors.value.motivacion = 'La motivación debe tener al menos 20 caracteres'
    isValid = false
  }

  if (form.value.experiencia && form.value.experiencia.length < 10) {
    errors.value.experiencia = 'La experiencia debe tener al menos 10 caracteres'
    isValid = false
  }

  return isValid
}

const submitRequest = async () => {
  if (!validateForm()) return

  submitting.value = true
  try {
    const requestData = {
      idGrupo: Number(props.groupId),
      motivacion: form.value.motivacion.trim(),
      experiencia: form.value.experiencia.trim() || undefined
    }

    await apiService.createMembershipRequest(requestData)
    
    showNotification('¡Solicitud enviada exitosamente! El líder del grupo la revisará pronto.', 'success')
    emit('success')
    close()
  } catch (error: any) {
    console.error('Error al enviar solicitud:', error)
    const errorMessage = error.response?.data?.message || error.message || 'Error al enviar la solicitud'
    showNotification(errorMessage, 'error')
  } finally {
    submitting.value = false
  }
}

const close = () => {
  form.value = {
    motivacion: '',
    experiencia: ''
  }
  errors.value = {
    motivacion: '',
    experiencia: ''
  }
  emit('close')
}

// Reset form when modal closes
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    form.value = {
      motivacion: '',
      experiencia: ''
    }
    errors.value = {
      motivacion: '',
      experiencia: ''
    }
  }
})
</script>


