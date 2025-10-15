<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Panel de Usuario</h1>
            <p class="text-gray-600 mt-1">Bienvenido a UPB Cultura</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right">
              <p class="text-sm text-gray-600">Bienvenido</p>
              <p class="font-semibold text-gray-900">{{ user?.name }}</p>
            </div>
            <button
              @click="handleLogout"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido Principal -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Mis Grupos -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Mis Grupos</h2>
          <router-link
            to="/grupos"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Explorar Grupos
          </router-link>
        </div>
        
        <div v-if="myGroups.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p class="mt-4 text-gray-600">No estás en ningún grupo aún</p>
          <p class="text-sm text-gray-500">Explora los grupos disponibles y únete a los que te interesen</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="group in myGroups"
            :key="group.id"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300"
          >
            <h3 class="font-semibold text-lg text-gray-900">{{ group.name }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ group.category }}</p>
            <div class="mt-4 flex items-center justify-between">
              <span class="text-sm text-gray-500">{{ group.members }} miembros</span>
              <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Ver detalles
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Próximos Eventos -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Próximos Eventos</h2>
          <router-link
            to="/eventos"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Ver Todos
          </router-link>
        </div>

        <div v-if="upcomingEvents.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="mt-4 text-gray-600">No hay eventos próximos</p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="event in upcomingEvents"
            :key="event.id"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="font-semibold text-lg text-gray-900">{{ event.title }}</h3>
                <p class="text-sm text-gray-600 mt-1">{{ event.group }}</p>
                <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>{{ formatDate(event.date) }}</span>
                  <span>{{ event.location }}</span>
                </div>
              </div>
              <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Ver detalles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const myGroups = ref([
  // Aquí se cargarían los grupos del usuario desde la API
])

const upcomingEvents = ref([
  // Aquí se cargarían los próximos eventos desde la API
])

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>



