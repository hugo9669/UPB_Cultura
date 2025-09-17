<template>
  <div id="app" class="min-h-screen bg-gray-50">
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
import NotificationContainer from './components/NotificationContainer.vue'

const authStore = useAuthStore()
const eventsStore = useEventsStore()
const groupsStore = useGroupsStore()

onMounted(() => {
  // Inicializar stores
  authStore.initializeAuth()
  eventsStore.initializeEvents()
  groupsStore.initializeGroups()
})
</script>