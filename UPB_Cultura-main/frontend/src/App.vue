<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Header de navegación (oculto en login y paneles) -->
    <AppHeader v-if="!hideHeader" />

    <!-- Notificaciones -->
    <NotificationContainer />

    <!-- Router View -->
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useEventsStore } from './stores/events'
import { useGroupsStore } from './stores/groups'
import AppHeader from './components/AppHeader.vue'
import NotificationContainer from './components/NotificationContainer.vue'

const route = useRoute()
const authStore = useAuthStore()
const eventsStore = useEventsStore()
const groupsStore = useGroupsStore()

<<<<<<< HEAD
// Ocultar header en login y en los paneles (cada panel tiene su propio header)
const hideHeader = computed(() => {
  const path = route.path
  return path === '/login' || 
         path === '/admin' || 
         path === '/lider' || 
         path === '/usuario' ||
         path === '/dashboard'
})

=======
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
onMounted(async () => {
  // Inicializar stores
  authStore.initializeAuth()
  await eventsStore.initializeEvents()
  await groupsStore.initializeGroups()
})
</script>
