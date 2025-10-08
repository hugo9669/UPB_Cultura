<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-blue-600 mb-4">404</h1>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Página no encontrada</h2>
        <p class="text-gray-600 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
      </div>
      
      <div class="space-y-4">
        <RouterLink
          to="/"
          class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
        >
          Volver al Inicio
        </RouterLink>
        
        <div class="text-sm text-gray-500">
          <p>O puedes navegar a:</p>
          <div class="mt-2 space-x-4">
            <RouterLink to="/eventos" class="text-blue-600 hover:text-blue-800">
              Eventos
            </RouterLink>
            <RouterLink to="/grupos" class="text-blue-600 hover:text-blue-800">
              Grupos
            </RouterLink>
            <RouterLink to="/contacto" class="text-blue-600 hover:text-blue-800">
              Contacto
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No se necesita lógica adicional para esta vista
</script>
