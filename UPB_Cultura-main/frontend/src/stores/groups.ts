import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiService, handleApiError } from '@/services/api'

export interface Group {
  id: string
  name: string
  description: string
  category: string
  categoryColor: string
  image: string
  members: number
  director: string
  photos: string[]
}

export const useGroupsStore = defineStore('groups', () => {
  const groups = ref<Group[]>([])
  const searchTerm = ref('')
  const selectedCategory = ref('')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Grupos de ejemplo
  const sampleGroups: Group[] = [
    {
      id: '1',
      name: 'Coro UPB',
      description: 'Grupo vocal dedicado a la interpretación de música coral clásica y contemporánea.',
      category: 'Música',
      categoryColor: 'blue',
      image: 'https://placehold.co/400x300/1e40af/ffffff?text=Coro+UPB',
      members: 25,
      director: 'María González',
      photos: []
    },
    {
      id: '2',
      name: 'Grupo de Teatro UPB',
      description: 'Compañía teatral estudiantil que presenta obras clásicas y contemporáneas.',
      category: 'Teatro',
      categoryColor: 'red',
      image: 'https://placehold.co/400x300/b91c1c/ffffff?text=Teatro+UPB',
      members: 18,
      director: 'Carlos Mendoza',
      photos: []
    },
    {
      id: '3',
      name: 'Danza Folclórica UPB',
      description: 'Grupo de danza tradicional colombiana que preserva y difunde nuestras raíces culturales.',
      category: 'Danza',
      categoryColor: 'green',
      image: 'https://placehold.co/400x300/059669/ffffff?text=Danza+Folclórica',
      members: 30,
      director: 'Ana Rodríguez',
      photos: []
    },
    {
      id: '4',
      name: 'Orquesta Sinfónica UPB',
      description: 'Orquesta estudiantil que interpreta repertorio sinfónico y de cámara.',
      category: 'Música',
      categoryColor: 'purple',
      image: 'https://placehold.co/400x300/7c3aed/ffffff?text=Orquesta+UPB',
      members: 45,
      director: 'Roberto Silva',
      photos: []
    },
    {
      id: '5',
      name: 'Cine Club UPB',
      description: 'Grupo dedicado al análisis, producción y difusión del arte cinematográfico.',
      category: 'Cine',
      categoryColor: 'indigo',
      image: 'https://placehold.co/400x300/4f46e5/ffffff?text=Cine+Club',
      members: 22,
      director: 'Laura Torres',
      photos: []
    },
    {
      id: '6',
      name: 'Literatura UPB',
      description: 'Círculo literario que promueve la lectura, escritura y análisis de textos.',
      category: 'Literatura',
      categoryColor: 'yellow',
      image: 'https://placehold.co/400x300/eab308/ffffff?text=Literatura+UPB',
      members: 15,
      director: 'Pedro Vargas',
      photos: []
    }
  ]

  const initializeGroups = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await apiService.getGroups()
      if (response.data) {
        groups.value = response.data
<<<<<<< HEAD
        // Guardar en localStorage solo los datos reales de la API
        saveGroups()
      }
    } catch (err: any) {
      console.error('Error al cargar grupos desde la API:', err)
      error.value = handleApiError(err)
      // Mostrar array vacío en caso de error
      groups.value = []
=======
      }
    } catch (err: any) {
      error.value = handleApiError(err)
      // Fallback a datos locales si hay error de conexión
      const storedGroups = localStorage.getItem('groups')
      if (storedGroups) {
        groups.value = JSON.parse(storedGroups)
      } else {
        groups.value = sampleGroups
        saveGroups()
      }
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
    } finally {
      isLoading.value = false
    }
  }

  const saveGroups = () => {
    localStorage.setItem('groups', JSON.stringify(groups.value))
  }

  const addGroup = async (group: Omit<Group, 'id'>): Promise<{ success: boolean; error?: string }> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await apiService.createGroup(group)
      if (response.data) {
        groups.value.push(response.data)
        saveGroups()
        return { success: true }
      } else {
        return { success: false, error: 'Error al crear el grupo' }
      }
    } catch (err: any) {
      error.value = handleApiError(err)
      return { success: false, error: handleApiError(err) }
    } finally {
      isLoading.value = false
    }
  }

  const updateGroup = async (id: string, updatedGroup: Partial<Group>): Promise<{ success: boolean; error?: string }> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await apiService.updateGroup(id, updatedGroup)
      if (response.data) {
        const index = groups.value.findIndex(group => group.id === id)
        if (index !== -1) {
          groups.value[index] = response.data
          saveGroups()
        }
        return { success: true }
      } else {
        return { success: false, error: 'Error al actualizar el grupo' }
      }
    } catch (err: any) {
      error.value = handleApiError(err)
      return { success: false, error: handleApiError(err) }
    } finally {
      isLoading.value = false
    }
  }

  const deleteGroup = async (id: string): Promise<{ success: boolean; error?: string }> => {
    isLoading.value = true
    error.value = null
    
    try {
      await apiService.deleteGroup(id)
      groups.value = groups.value.filter(group => group.id !== id)
      saveGroups()
      return { success: true }
    } catch (err: any) {
      error.value = handleApiError(err)
      return { success: false, error: handleApiError(err) }
    } finally {
      isLoading.value = false
    }
  }

  const addPhotoToGroup = (groupId: string, photoUrl: string) => {
    const group = groups.value.find(g => g.id === groupId)
    if (group) {
      group.photos.push(photoUrl)
      saveGroups()
    }
  }

  const removePhotoFromGroup = (groupId: string, photoIndex: number) => {
    const group = groups.value.find(g => g.id === groupId)
    if (group && group.photos[photoIndex]) {
      group.photos.splice(photoIndex, 1)
      saveGroups()
    }
  }

  const filteredGroups = computed(() => {
    let filtered = groups.value

    if (searchTerm.value) {
      const term = searchTerm.value.toLowerCase()
      filtered = filtered.filter(group =>
        group.name.toLowerCase().includes(term) ||
        group.description.toLowerCase().includes(term) ||
        group.category.toLowerCase().includes(term) ||
        group.director.toLowerCase().includes(term)
      )
    }

    if (selectedCategory.value) {
      filtered = filtered.filter(group => group.category === selectedCategory.value)
    }

    return filtered
  })

  const categories = computed(() => {
    const uniqueCategories = [...new Set(groups.value.map(group => group.category))]
    return uniqueCategories
  })

  return {
    groups,
    searchTerm,
    selectedCategory,
    isLoading,
    error,
    filteredGroups,
    categories,
    initializeGroups,
    addGroup,
    updateGroup,
    deleteGroup,
    addPhotoToGroup,
    removePhotoFromGroup
  }
})
