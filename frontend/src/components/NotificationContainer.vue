<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <TransitionGroup name="notification" tag="div">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'notification',
          `notification-${notification.type}`,
          'px-4 py-3 rounded-lg shadow-lg max-w-sm cursor-pointer'
        ]"
        @click="removeNotification(notification.id)"
      >
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium">{{ notification.message }}</span>
          <button
            @click.stop="removeNotification(notification.id)"
            class="ml-2 text-white hover:text-gray-200"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useNotifications } from '../composables/useNotifications'

const { notifications, removeNotification } = useNotifications()
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.notification-success {
  @apply bg-green-500 text-white;
}

.notification-error {
  @apply bg-red-500 text-white;
}

.notification-warning {
  @apply bg-yellow-500 text-white;
}

.notification-info {
  @apply bg-blue-500 text-white;
}
</style>
