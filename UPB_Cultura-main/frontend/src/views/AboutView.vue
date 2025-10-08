<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8 md:py-12">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Acerca de UPB Cultura
        </h2>
        
        <!-- Sección de Misión -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8 animate-fade-in">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
          <p class="text-gray-600 text-lg leading-relaxed">
            UPB Cultura es la plataforma digital que conecta y promueve la riqueza cultural de la Universidad Pontificia Bolivariana. 
            Nuestro objetivo es facilitar la gestión, promoción y participación en los diversos grupos culturales y eventos que 
            enriquecen la vida estudiantil y comunitaria.
          </p>
        </div>

        <!-- Sección de Visión -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8 animate-fade-in">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Nuestra Visión</h3>
          <p class="text-gray-600 text-lg leading-relaxed">
            Ser la plataforma líder en la gestión cultural universitaria, creando un ecosistema digital que impulse la creatividad, 
            el talento y la expresión artística de toda la comunidad UPB, fortaleciendo los lazos culturales y promoviendo el 
            desarrollo integral de nuestros estudiantes.
          </p>
        </div>

        <!-- Sección de Valores -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8 animate-fade-in">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">Nuestros Valores</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="(value, index) in values" 
              :key="index"
              class="flex items-start space-x-3 hover:transform hover:scale-105 transition duration-300"
            >
              <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">{{ value.title }}</h4>
                <p class="text-gray-600">{{ value.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección de Equipo -->
        <div class="bg-white rounded-lg shadow-lg p-8 animate-fade-in">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">Nuestro Equipo</h3>
          <p class="text-gray-600 text-lg leading-relaxed mb-6">
            UPB Cultura es desarrollado y mantenido por un equipo multidisciplinario de estudiantes y profesionales 
            comprometidos con la promoción de la cultura universitaria.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              v-for="(member, index) in teamMembers" 
              :key="index"
              class="text-center hover:transform hover:scale-105 transition duration-300"
            >
              <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h4 class="font-semibold text-gray-900">{{ member.role }}</h4>
              <p class="text-gray-600">{{ member.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const values = ref([
  {
    title: 'Creatividad',
    description: 'Fomentamos la expresión artística y la innovación cultural.'
  },
  {
    title: 'Inclusión',
    description: 'Promovemos la participación de toda la comunidad universitaria.'
  },
  {
    title: 'Excelencia',
    description: 'Buscamos la calidad en cada presentación y evento cultural.'
  },
  {
    title: 'Tradición',
    description: 'Valoramos y preservamos las tradiciones culturales de nuestra universidad.'
  }
])

const teamMembers = ref([
  {
    role: 'Desarrollo',
    description: 'Equipo de programación y diseño'
  },
  {
    role: 'Gestión Cultural',
    description: 'Coordinadores de grupos culturales'
  },
  {
    role: 'Comunicación',
    description: 'Marketing y difusión cultural'
  }
])
</script>