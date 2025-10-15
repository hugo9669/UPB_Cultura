<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Header de navegación -->
    <AppHeader />

    <!-- Notificaciones -->
    <NotificationContainer />

    <!-- Router View -->
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { useEventsStore } from './stores/events'
import { useGroupsStore } from './stores/groups'
import AppHeader from './components/AppHeader.vue'
import NotificationContainer from './components/NotificationContainer.vue'

const authStore = useAuthStore()
const eventsStore = useEventsStore()
const groupsStore = useGroupsStore()

onMounted(async () => {
  // Inicializar stores
  authStore.initializeAuth()
  await eventsStore.initializeEvents()
  await groupsStore.initializeGroups()
})
</script>
