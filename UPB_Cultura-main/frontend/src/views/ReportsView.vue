<template>
  <div class="min-h-screen bg-gray-50">
    <NotificationContainer />
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">📊 Reportes</h1>
            <p class="text-gray-600 mt-1">Analítica y estadísticas del sistema</p>
          </div>
          <router-link
            to="/admin"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Panel
          </router-link>
        </div>
      </div>
    </div>

    <!-- Contenido Principal -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Tabs -->
      <div class="bg-white rounded-lg shadow-md mb-6">
        <div class="flex border-b overflow-x-auto">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-4 font-semibold transition duration-300 whitespace-nowrap',
              activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            {{ tab.icon }} {{ tab.name }}
          </button>
        </div>
      </div>

      <!-- Contenido de Tabs -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <!-- Tab: Reporte General -->
        <div v-if="activeTab === 'general'" class="space-y-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold text-gray-900">Resumen General del Sistema</h2>
            <button
              @click="loadGeneralReport"
              :disabled="loading"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            >
              {{ loading ? 'Cargando...' : 'Actualizar' }}
            </button>
          </div>

          <div v-if="generalReport" class="space-y-6">
            <!-- Estadísticas Generales -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="bg-blue-50 rounded-lg p-4">
                <p class="text-sm text-blue-600 font-semibold">Grupos Totales</p>
                <p class="text-3xl font-bold text-blue-700 mt-1">{{ generalReport.resumenGeneral.totalGrupos }}</p>
              </div>
              <div class="bg-green-50 rounded-lg p-4">
                <p class="text-sm text-green-600 font-semibold">Usuarios Activos</p>
                <p class="text-3xl font-bold text-green-700 mt-1">{{ generalReport.resumenGeneral.totalUsuarios }}</p>
              </div>
              <div class="bg-purple-50 rounded-lg p-4">
                <p class="text-sm text-purple-600 font-semibold">Eventos Totales</p>
                <p class="text-3xl font-bold text-purple-700 mt-1">{{ generalReport.resumenGeneral.totalEventos }}</p>
              </div>
              <div class="bg-yellow-50 rounded-lg p-4">
                <p class="text-sm text-yellow-600 font-semibold">Mensajes</p>
                <p class="text-3xl font-bold text-yellow-700 mt-1">{{ generalReport.resumenGeneral.totalMensajes }}</p>
              </div>
            </div>

            <!-- Usuarios por Rol -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Usuarios por Rol</h3>
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-gray-100">
                      <th class="p-3 font-semibold text-gray-700">Rol</th>
                      <th class="p-3 font-semibold text-gray-700">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in generalReport.usuariosPorRol" :key="index" class="border-b hover:bg-gray-50">
                      <td class="p-3">{{ getRoleLabel(item.rol) }}</td>
                      <td class="p-3 font-semibold">{{ item.cantidad }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Grupos por Categoría -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Grupos por Categoría</h3>
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-gray-100">
                      <th class="p-3 font-semibold text-gray-700">Categoría</th>
                      <th class="p-3 font-semibold text-gray-700">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in generalReport.gruposPorCategoria" :key="index" class="border-b hover:bg-gray-50">
                      <td class="p-3">{{ item.categoria === 'Musica' ? 'Música' : item.categoria }}</td>
                      <td class="p-3 font-semibold">{{ item.cantidad }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div v-else-if="!loading" class="text-center py-8 text-gray-600">
            Haz clic en "Actualizar" para cargar el reporte
          </div>
        </div>

        <!-- Tab: Reporte de Eventos -->
        <div v-if="activeTab === 'events'" class="space-y-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold text-gray-900">Reporte de Eventos</h2>
            <button
              @click="loadEventsReport"
              :disabled="loading"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            >
              {{ loading ? 'Cargando...' : 'Generar Reporte' }}
            </button>
          </div>

          <!-- Filtros -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Fecha Desde</label>
              <input
                v-model="eventsFilters.startDate"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Fecha Hasta</label>
              <input
                v-model="eventsFilters.endDate"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>

          <!-- Tabla de Eventos -->
          <div v-if="eventsReport" class="space-y-4">
            <p class="text-sm text-gray-600">Total de eventos: <span class="font-semibold">{{ eventsReport.total }}</span></p>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="p-3 font-semibold text-gray-700">Título</th>
                    <th class="p-3 font-semibold text-gray-700">Fecha</th>
                    <th class="p-3 font-semibold text-gray-700">Ubicación</th>
                    <th class="p-3 font-semibold text-gray-700">Grupo</th>
                    <th class="p-3 font-semibold text-gray-700">Categoría</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="event in eventsReport.eventos" :key="event.id" class="border-b hover:bg-gray-50">
                    <td class="p-3">{{ event.titulo }}</td>
                    <td class="p-3">{{ formatDate(event.fechaEvento) }}</td>
                    <td class="p-3">{{ event.ubicacion }}</td>
                    <td class="p-3">{{ event.grupoNombre }}</td>
                    <td class="p-3">
                      <span :class="getCategoryClass(event.categoria)">
                        {{ event.categoria === 'Musica' ? 'Música' : event.categoria }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Tab: Reporte de Grupos -->
        <div v-if="activeTab === 'groups'" class="space-y-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold text-gray-900">Reporte de Grupos Culturales</h2>
            <button
              @click="loadGroupsReport"
              :disabled="loading"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            >
              {{ loading ? 'Cargando...' : 'Generar Reporte' }}
            </button>
          </div>

          <div v-if="groupsReport" class="space-y-4">
            <p class="text-sm text-gray-600">Total de grupos: <span class="font-semibold">{{ groupsReport.total }}</span></p>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-sm">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="p-3 font-semibold text-gray-700">Grupo</th>
                    <th class="p-3 font-semibold text-gray-700">Categoría</th>
                    <th class="p-3 font-semibold text-gray-700">Líder</th>
                    <th class="p-3 font-semibold text-gray-700">Miembros</th>
                    <th class="p-3 font-semibold text-gray-700">Eventos</th>
                    <th class="p-3 font-semibold text-gray-700">Mensajes</th>
                    <th class="p-3 font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="group in groupsReport.grupos" :key="group.id" class="border-b hover:bg-gray-50">
                    <td class="p-3 font-semibold">{{ group.nombre }}</td>
                    <td class="p-3">{{ group.categoria === 'Musica' ? 'Música' : group.categoria }}</td>
                    <td class="p-3">{{ group.lider }}</td>
                    <td class="p-3 text-center">{{ group.miembros }}</td>
                    <td class="p-3 text-center">{{ group.eventosTotales }} ({{ group.eventosFuturos }} futuros)</td>
                    <td class="p-3 text-center">{{ group.mensajesRecibidos }}</td>
                    <td class="p-3">
                      <div class="flex items-center gap-2 justify-center">
                        <button
                          @click="viewGroupDetails(group)"
                          class="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition duration-300 text-xs font-medium"
                        >
                          Ver Detalles
                        </button>
                        <button
                          @click="handleDeleteGroup(group)"
                          :disabled="deletingGroup === group.id"
                          class="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition duration-300 text-xs font-medium disabled:opacity-50"
                          :title="'Eliminar grupo'"
                        >
                          <span v-if="deletingGroup !== group.id">Eliminar</span>
                          <span v-else>Eliminando...</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Tab: Reporte de Usuarios -->
        <div v-if="activeTab === 'users'" class="space-y-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold text-gray-900">Reporte de Usuarios</h2>
            <button
              @click="loadUsersReport"
              :disabled="loading"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            >
              {{ loading ? 'Cargando...' : 'Generar Reporte' }}
            </button>
          </div>

          <div v-if="usersReport" class="space-y-4">
            <p class="text-sm text-gray-600">Total de usuarios: <span class="font-semibold">{{ usersReport.total }}</span></p>
            
            <!-- Estadísticas por Rol -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div v-for="(stat, index) in usersReport.estadisticasPorRol" :key="index" class="bg-gray-50 rounded-lg p-4">
                <p class="text-sm text-gray-600 font-semibold">{{ getRoleLabel(stat.rol) }}</p>
                <p class="text-2xl font-bold text-gray-900 mt-1">{{ stat.cantidad }}</p>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="p-3 font-semibold text-gray-700">ID</th>
                    <th class="p-3 font-semibold text-gray-700">Nombre</th>
                    <th class="p-3 font-semibold text-gray-700">Correo</th>
                    <th class="p-3 font-semibold text-gray-700">Rol</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in usersReport.usuarios" :key="user.id" class="border-b hover:bg-gray-50">
                    <td class="p-3">{{ user.id }}</td>
                    <td class="p-3">{{ user.nombre }}</td>
                    <td class="p-3">{{ user.correo }}</td>
                    <td class="p-3">
                      <span :class="{
                        'bg-red-100 text-red-800': user.rol === 'administrador',
                        'bg-blue-100 text-blue-800': user.rol === 'Lcultural',
                        'bg-gray-100 text-gray-800': user.rol === 'usuario'
                      }" class="px-2 py-1 rounded-full text-xs font-semibold">
                        {{ getRoleLabel(user.rol) }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Indicador de carga -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p class="mt-4 text-gray-600">Generando reporte...</p>
        </div>

        <!-- Mensaje de error -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p class="font-semibold">Error al cargar el reporte</p>
          <p class="text-sm">{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Modal: Detalles del Grupo -->
    <div
      v-if="selectedGroupDetails && selectedGroupDetails.detallesMiembros"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click.self="closeGroupDetailsModal"
    >
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <!-- Overlay -->
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closeGroupDetailsModal"></div>

        <!-- Modal Content -->
        <div class="relative inline-block w-full max-w-5xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-2xl font-bold text-gray-900">📊 {{ selectedGroupDetails.nombre || 'Grupo' }}</h3>
              <p class="text-sm text-gray-600 mt-1">
                <span :class="getCategoryClass(selectedGroupDetails.categoria || '')">
                  {{ selectedGroupDetails.categoria === 'Musica' ? 'Música' : selectedGroupDetails.categoria }}
                </span>
                <span class="ml-2">• Líder: {{ selectedGroupDetails.lider || 'Sin líder' }}</span>
              </p>
            </div>
            <button
              @click="closeGroupDetailsModal"
              class="text-gray-400 hover:text-gray-600 transition"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Grid de secciones -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto">
            <!-- Sección: Miembros -->
            <div class="bg-blue-50 rounded-lg p-4">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h4 class="text-lg font-semibold text-blue-900">Miembros ({{ selectedGroupDetails.miembros || 0 }})</h4>
              </div>
              <div v-if="!selectedGroupDetails.detallesMiembros || selectedGroupDetails.detallesMiembros.length === 0" class="text-sm text-blue-700">
                No hay miembros registrados
              </div>
              <div v-else class="space-y-2">
                <div
                  v-for="member in selectedGroupDetails.detallesMiembros"
                  :key="member.id"
                  class="bg-white rounded p-2 text-sm"
                >
                  <p class="font-medium text-gray-900">{{ member.nombre }}</p>
                  <p class="text-xs text-gray-600">{{ member.correo }}</p>
                  <p class="text-xs text-gray-500 mt-1">Unido: {{ formatDate(member.fechaUnion) }}</p>
                </div>
              </div>
            </div>

            <!-- Sección: Eventos -->
            <div class="bg-green-50 rounded-lg p-4">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h4 class="text-lg font-semibold text-green-900">Eventos ({{ selectedGroupDetails.eventosTotales || 0 }})</h4>
              </div>
              <div v-if="!selectedGroupDetails.detallesEventos || selectedGroupDetails.detallesEventos.length === 0" class="text-sm text-green-700">
                No hay eventos programados
              </div>
              <div v-else class="space-y-2">
                <div
                  v-for="event in selectedGroupDetails.detallesEventos"
                  :key="event.id"
                  class="bg-white rounded p-2 text-sm"
                  :class="event.esFuturo ? 'border-l-2 border-green-500' : 'border-l-2 border-gray-300'"
                >
                  <div class="flex items-center gap-2 mb-1">
                    <p class="font-medium text-gray-900">{{ event.titulo }}</p>
                    <span v-if="event.esFuturo" class="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                      Próximo
                    </span>
                  </div>
                  <p class="text-xs text-gray-600">📅 {{ formatDate(event.fechaEvento) }}</p>
                  <p class="text-xs text-gray-600">📍 {{ event.ubicacion }}</p>
                </div>
              </div>
            </div>

            <!-- Sección: Mensajes -->
            <div class="bg-purple-50 rounded-lg p-4">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h4 class="text-lg font-semibold text-purple-900">Mensajes ({{ selectedGroupDetails.mensajesRecibidos || 0 }})</h4>
              </div>
              <div v-if="!selectedGroupDetails.detallesMensajes || selectedGroupDetails.detallesMensajes.length === 0" class="text-sm text-purple-700">
                No hay mensajes enviados
              </div>
              <div v-else class="space-y-2">
                <div
                  v-for="message in selectedGroupDetails.detallesMensajes"
                  :key="message.id"
                  class="bg-white rounded p-2 text-sm"
                >
                  <p class="font-medium text-gray-900">{{ message.asunto }}</p>
                  <p class="text-xs text-gray-600 mt-1 line-clamp-2">{{ message.mensaje }}</p>
                  <div class="flex items-center justify-between mt-2">
                    <p class="text-xs text-gray-500">{{ message.remitente }}</p>
                    <p class="text-xs text-gray-500">{{ formatDate(message.fechaEnvio) }}</p>
                  </div>
                  <span
                    v-if="!message.leido"
                    class="inline-block text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full mt-1"
                  >
                    No leído
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              @click="closeGroupDetailsModal"
              class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
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
import { ref, onMounted } from 'vue'
import { apiService } from '@/services/api'
import { useNotifications } from '@/composables/useNotifications'
import NotificationContainer from '@/components/NotificationContainer.vue'

const { showNotification } = useNotifications()

// Estado
const activeTab = ref('general')
const loading = ref(false)
const error = ref('')
const deletingGroup = ref<number | null>(null)

// Datos de reportes
const generalReport = ref<any>(null)
const eventsReport = ref<any>(null)
const groupsReport = ref<any>(null)
const usersReport = ref<any>(null)

// Detalles del grupo seleccionado (inicializado como null)
const selectedGroupDetails = ref<any | null>(null)

// Filtros
const eventsFilters = ref({
  startDate: '',
  endDate: ''
})

// Tabs disponibles
const tabs = [
  { id: 'general', name: 'Resumen General', icon: '📈' },
  { id: 'events', name: 'Eventos', icon: '📅' },
  { id: 'groups', name: 'Grupos', icon: '🎭' },
  { id: 'users', name: 'Usuarios', icon: '👥' }
]

// Funciones de carga
const loadGeneralReport = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await apiService.getGeneralReport()
    if (response.data) {
      generalReport.value = response.data
    }
  } catch (err: any) {
    error.value = err.message || 'Error al cargar el reporte general'
    console.error('Error al cargar reporte general:', err)
  } finally {
    loading.value = false
  }
}

const loadEventsReport = async () => {
  loading.value = true
  error.value = ''
  try {
    const filters: any = {}
    if (eventsFilters.value.startDate) filters.startDate = eventsFilters.value.startDate
    if (eventsFilters.value.endDate) filters.endDate = eventsFilters.value.endDate
    
    const response = await apiService.getEventsReport(filters)
    if (response.data) {
      eventsReport.value = response.data
    }
  } catch (err: any) {
    error.value = err.message || 'Error al cargar el reporte de eventos'
    console.error('Error al cargar reporte de eventos:', err)
  } finally {
    loading.value = false
  }
}

const loadGroupsReport = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await apiService.getGroupsReport()
    if (response.data) {
      groupsReport.value = response.data
    }
  } catch (err: any) {
    error.value = err.message || 'Error al cargar el reporte de grupos'
    console.error('Error al cargar reporte de grupos:', err)
  } finally {
    loading.value = false
  }
}

const loadUsersReport = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await apiService.getUsersReport()
    if (response.data) {
      usersReport.value = response.data
    }
  } catch (err: any) {
    error.value = err.message || 'Error al cargar el reporte de usuarios'
    console.error('Error al cargar reporte de usuarios:', err)
  } finally {
    loading.value = false
  }
}

// Funciones para el modal de detalles de grupo
const viewGroupDetails = (group: any) => {
  selectedGroupDetails.value = group
}

const closeGroupDetailsModal = () => {
  selectedGroupDetails.value = null
}

// Función para eliminar un grupo
const handleDeleteGroup = async (group: any) => {
  const confirmDelete = confirm(
    `¿Estás seguro de que deseas eliminar el grupo "${group.nombre}"?\n\n` +
    `Esta acción NO se puede deshacer y eliminará:\n` +
    `• El grupo cultural\n` +
    `• Todas las membresías asociadas\n` +
    `• Todos los eventos del grupo\n` +
    `• Todos los mensajes relacionados\n\n` +
    `Los miembros del grupo perderán su vinculación.`
  )
  
  if (!confirmDelete) return

  deletingGroup.value = group.id
  try {
    await apiService.deleteGroup(group.id.toString())
    showNotification(`Grupo "${group.nombre}" eliminado exitosamente`, 'success')
    
    // Recargar el reporte de grupos
    await loadGroupsReport()
    
    // También recargar el reporte general para actualizar estadísticas
    if (generalReport.value) {
      await loadGeneralReport()
    }
  } catch (error: any) {
    console.error('Error al eliminar grupo:', error)
    showNotification(
      error.response?.data?.message || 'Error al eliminar el grupo',
      'error'
    )
  } finally {
    deletingGroup.value = null
  }
}

// Funciones auxiliares
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', { 
    timeZone: 'UTC',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  })
}

const getRoleLabel = (role: string) => {
  const labels: Record<string, string> = {
    'administrador': 'Administrador',
    'Lcultural': 'Líder Cultural',
    'usuario': 'Usuario'
  }
  return labels[role] || role
}

const getCategoryClass = (category: string) => {
  const classes: Record<string, string> = {
    'Musica': 'px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800',
    'Teatro': 'px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800',
    'Danza': 'px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800'
  }
  return classes[category] || 'px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800'
}

// Cargar reporte general al montar
onMounted(() => {
  loadGeneralReport()
})
</script>

