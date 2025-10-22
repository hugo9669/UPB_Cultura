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
        Grupos Culturales
      </h2>
      
      <!-- Sección de Filtros -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8 max-w-xl mx-auto">
        <div class="flex items-center space-x-4">
          <input 
            v-model="groupsStore.searchTerm"
            type="text" 
            placeholder="Buscar grupos..." 
            class="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
          <button 
            @click="searchGroups"
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
            v-model="groupsStore.selectedCategory"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas las categorías</option>
            <option v-for="category in groupsStore.categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
      </div>

      <!-- Grid de Grupos Culturales -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="group in groupsStore.filteredGroups"
          :key="group.id"
          class="group-card bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img :src="group.image" :alt="group.name" class="w-full h-48 object-cover">
          <div class="p-6">
            <span :class="`text-sm font-semibold text-${group.categoryColor}-600`">
              {{ group.category }}
            </span>
            <h3 class="text-xl font-bold text-gray-900 mt-2">{{ group.name }}</h3>
            <p class="text-gray-600 text-sm mt-2">{{ group.description }}</p>
            <div class="mt-4 space-y-2 text-sm text-gray-500">
              <div class="flex justify-between">
                <span>Miembros:</span>
                <span class="font-medium">{{ group.members }}</span>
              </div>
              <div class="flex justify-between">
                <span>Líder:</span>
                <span class="font-medium">{{ group.director }}</span>
              </div>
            </div>
            <div class="mt-4 flex justify-between items-center">
              <button 
                @click="viewGroupProfile(group)"
                class="text-blue-600 hover:text-blue-800 font-medium transition duration-300"
              >
                Ver Perfil
              </button>
              <!-- Botón para Usuarios: Solicitar Unirse o Ya Miembro -->
              <button 
                v-if="authStore.isLoggedIn && authStore.user?.role === 'usuario'"
                @click="requestToJoin(group)"
                :disabled="isUserMember(group.id)"
                :class="[
                  'px-4 py-2 rounded-full text-sm font-medium transition duration-300',
                  isUserMember(group.id)
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                ]"
              >
                {{ isUserMember(group.id) ? 'Ya eres miembro' : 'Solicitar Unirse' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mensaje cuando no hay grupos -->
      <div v-if="groupsStore.filteredGroups.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No se encontraron grupos</h3>
        <p class="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
      </div>
    </div>

    <!-- Modal de perfil del grupo -->
    <GroupProfileModal 
      v-if="selectedGroup"
      :group="selectedGroup"
      @close="selectedGroup = null"
      @deleted="handleGroupDeleted"
    />

    <!-- Modal de solicitud de membresía (para usuarios) -->
    <JoinGroupModal
      :is-open="showJoinModal"
      :group-id="groupToJoin?.id || ''"
      :group-name="groupToJoin?.name || ''"
      @close="closeJoinModal"
      @success="handleJoinSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGroupsStore } from '../stores/groups'
import { useAuthStore } from '../stores/auth'
import { useNotifications } from '../composables/useNotifications'
import { apiService } from '@/services/api'
import GroupProfileModal from '../components/GroupProfileModal.vue'
import JoinGroupModal from '../components/JoinGroupModal.vue'
import type { Group } from '../stores/groups'

const router = useRouter()
const groupsStore = useGroupsStore()
const authStore = useAuthStore()
const { showNotification } = useNotifications()

const selectedGroup = ref<Group | null>(null)
const showJoinModal = ref(false)
const groupToJoin = ref<Group | null>(null)
const myGroupIds = ref<number[]>([])

const searchGroups = () => {
  showNotification('Búsqueda realizada', 'info')
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

const viewGroupProfile = (group: Group) => {
  selectedGroup.value = group
}

const loadMyGroupIds = async () => {
  if (!authStore.isLoggedIn || authStore.user?.role !== 'usuario') {
    return
  }
  
  try {
    const response = await apiService.getMyMemberships()
    if (response.data) {
      myGroupIds.value = response.data.map((membership: any) => membership.group.id)
    }
  } catch (error: any) {
    console.error('Error al cargar membresías:', error)
  }
}

const isUserMember = (groupId: number): boolean => {
  return myGroupIds.value.includes(groupId)
}

const requestToJoin = (group: Group) => {
  // Verificar si el usuario ya es miembro del grupo
  if (isUserMember(group.id)) {
    showNotification('Ya eres miembro de este grupo cultural', 'info')
    return
  }
  
  groupToJoin.value = group
  showJoinModal.value = true
}

const closeJoinModal = () => {
  showJoinModal.value = false
  groupToJoin.value = null
}

const handleJoinSuccess = () => {
  // La solicitud fue enviada exitosamente
  // El usuario recibirá una notificación cuando sea aprobada/rechazada
  // Recargar los IDs de los grupos por si la solicitud fue aprobada automáticamente
  loadMyGroupIds()
}

const handleGroupDeleted = () => {
  // Recargar la lista de grupos después de eliminar
  groupsStore.initializeGroups()
  // También recargar los IDs de grupos del usuario si está logueado como usuario
  if (authStore.isLoggedIn && authStore.user?.role === 'usuario') {
    loadMyGroupIds()
  }
}

onMounted(() => {
  // Si es un usuario regular, cargar sus grupos
  if (authStore.isLoggedIn && authStore.user?.role === 'usuario') {
    loadMyGroupIds()
  }
})
</script>
