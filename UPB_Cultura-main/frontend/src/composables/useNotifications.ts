import { ref } from 'vue'

export interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

// Estado compartido a nivel de módulo para asegurar instancia única en toda la app
const notifications = ref<Notification[]>([])

export function useNotifications() {

  const showNotification = (message: string, type: Notification['type'] = 'info', duration = 3000) => {
    const id = Date.now().toString()
    const notification: Notification = {
      id,
      message,
      type,
      duration
    }

    notifications.value.push(notification)

    // Auto remove notification
    setTimeout(() => {
      removeNotification(id)
    }, duration)

    return id
  }

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearAll = () => {
    notifications.value = []
  }

  return {
    notifications,
    showNotification,
    removeNotification,
    clearAll
  }
}
