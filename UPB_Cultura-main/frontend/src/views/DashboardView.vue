<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8 md:py-12">
      <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center">
          Gestión de Mi Grupo
        </h2>
        <p class="text-lg text-gray-600 mb-6 text-center">
          Actualiza la información, descripción y fotos de tu grupo cultural.
        </p>
        
        <!-- Información del usuario -->
        <div class="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 class="font-semibold text-blue-900">Bienvenido, {{ authStore.user?.name }}</h3>
          <p class="text-sm text-blue-700">ID de Usuario: {{ authStore.user?.id }}</p>
        </div>

        <!-- Formulario de gestión del grupo -->
        <form @submit.prevent="saveGroupProfile" class="space-y-6">
          <!-- Sección de Información General -->
          <div class="space-y-4">
            <h3 class="text-2xl font-bold text-gray-900">Información General</h3>
            
            <div>
              <label for="group-name" class="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Grupo
              </label>
              <input
                id="group-name"
                v-model="groupForm.name"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Nombre del Coro UPB"
                :class="{ 'border-red-500': errors.name }"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
            </div>
            
            <div>
              <label for="group-description" class="block text-sm font-medium text-gray-700 mb-1">
                Descripción del Grupo
              </label>
              <textarea
                id="group-description"
                v-model="groupForm.description"
                rows="5"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                placeholder="Somos un grupo de música vocal..."
                :class="{ 'border-red-500': errors.description }"
              ></textarea>
              <div class="flex justify-between items-center mt-1">
                <p v-if="errors.description" class="text-sm text-red-600">{{ errors.description }}</p>
                <p class="text-sm text-gray-500 ml-auto">{{ groupForm.description.length }}/500 caracteres</p>
              </div>
            </div>
          </div>
          
          <!-- Separador visual -->
          <hr class="border-t border-gray-200">

          <!-- Sección de Fotos -->
          <div class="space-y-4">
            <h3 class="text-2xl font-bold text-gray-900">Fotos del Grupo</h3>
            
            <!-- Área de subida de archivos -->
            <div>
              <label for="file-upload" class="block text-sm font-medium text-gray-700 mb-1">
                Subir nueva foto
              </label>
              <div 
                class="drag-drop-area"
                :class="{ 'dragover': isDragOver }"
                @drop="handleFileDrop"
                @dragover.prevent="isDragOver = true"
                @dragleave="isDragOver = false"
                @click="triggerFileInput"
              >
                <input
                  ref="fileInput"
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleFileUpload"
                />
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m-4-4l-12-12" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <span class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      Sube un archivo
                    </span>
                    <p class="pl-1">o arrastra y suelta</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                </div>
              </div>
            </div>

            <!-- Galería de fotos existentes -->
            <div v-if="groupPhotos.length > 0" class="photo-gallery">
              <div
                v-for="(photo, index) in groupPhotos"
                :key="index"
                class="photo-item bg-gray-200 h-32 w-full rounded-md overflow-hidden relative"
              >
                <img :src="photo" :alt="`Foto ${index + 1}`" class="object-cover w-full h-full">
                <button
                  @click="removePhoto(index)"
                  class="photo-delete-btn"
                >
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div v-else class="text-center py-8 text-gray-500">
              <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>No hay fotos subidas aún</p>
            </div>
          </div>

          <!-- Estado de guardado -->
          <div v-if="saveStatus" class="text-sm font-medium text-center" :class="saveStatusClass">
            {{ saveStatus }}
          </div>

          <!-- Botón de guardar -->
          <button
            type="submit"
            :disabled="isSaving"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
          >
            <span v-if="isSaving" class="loading mr-2"></span>
            {{ isSaving ? 'Guardando...' : 'Guardar Cambios' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useGroupsStore } from '../stores/groups'
import { useNotifications } from '../composables/useNotifications'

const authStore = useAuthStore()
const groupsStore = useGroupsStore()
const { showNotification } = useNotifications()

const groupForm = reactive({
  name: '',
  description: ''
})

const errors = reactive({
  name: '',
  description: ''
})

const groupPhotos = ref<string[]>([])
const isDragOver = ref(false)
const isSaving = ref(false)
const saveStatus = ref('')
const fileInput = ref<HTMLInputElement>()

const saveStatusClass = computed(() => {
  if (saveStatus.value.includes('exitosamente')) {
    return 'text-green-600'
  } else if (saveStatus.value.includes('error')) {
    return 'text-red-600'
  }
  return 'text-gray-600'
})

const validateForm = () => {
  let isValid = true
  
  errors.name = ''
  errors.description = ''

  if (!groupForm.name.trim()) {
    errors.name = 'El nombre del grupo es obligatorio'
    isValid = false
  } else if (groupForm.name.trim().length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres'
    isValid = false
  }

  if (groupForm.description.length > 500) {
    errors.description = 'La descripción no puede exceder 500 caracteres'
    isValid = false
  }

  return isValid
}

const saveGroupProfile = async () => {
  if (!validateForm()) {
    return
  }

  isSaving.value = true
  saveStatus.value = ''

  try {
    // Simular delay de guardado
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Aquí se guardaría en el store o se enviaría al backend
    const groupData = {
      name: groupForm.name.trim(),
      description: groupForm.description.trim(),
      photos: groupPhotos.value,
      lastUpdated: new Date().toISOString()
    }
    
    localStorage.setItem('groupData', JSON.stringify(groupData))
    
    saveStatus.value = '¡Cambios guardados exitosamente!'
    showNotification('Perfil del grupo actualizado correctamente', 'success')
    
    // Limpiar estado después de 3 segundos
    setTimeout(() => {
      saveStatus.value = ''
    }, 3000)
    
  } catch (error) {
    saveStatus.value = 'Error al guardar los cambios'
    showNotification('Error al guardar el perfil', 'error')
  } finally {
    isSaving.value = false
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    processFiles(Array.from(files))
  }
}

const handleFileDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
  
  const files = event.dataTransfer?.files
  if (files) {
    processFiles(Array.from(files))
  }
}

const processFiles = (files: File[]) => {
  files.forEach(file => {
    if (!file.type.startsWith('image/')) {
      showNotification('Solo se permiten archivos de imagen', 'error')
      return
    }
    
    if (file.size > 10 * 1024 * 1024) {
      showNotification('El archivo es demasiado grande. Máximo 10MB', 'error')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (result) {
        groupPhotos.value.push(result)
        showNotification('Foto agregada exitosamente', 'success')
      }
    }
    reader.readAsDataURL(file)
  })
}

const removePhoto = (index: number) => {
  groupPhotos.value.splice(index, 1)
  showNotification('Foto eliminada', 'info')
}

const loadGroupData = () => {
  const storedData = localStorage.getItem('groupData')
  if (storedData) {
    const data = JSON.parse(storedData)
    groupForm.name = data.name || ''
    groupForm.description = data.description || ''
    groupPhotos.value = data.photos || []
  }
}

onMounted(() => {
  loadGroupData()
})
</script>
