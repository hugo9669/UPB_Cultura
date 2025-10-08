<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

onMounted(() => {
  const token = (route.query.token as string) || ''

  if (token) {
    auth.loginWithToken(token)
    router.replace('/dashboard')
  } else {
    router.replace('/login')
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <p class="text-gray-600">Procesando inicio de sesión...</p>
    </div>
  </div>
  
</template>



