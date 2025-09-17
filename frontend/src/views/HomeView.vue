<template>
  <div class="min-h-screen">
    <!-- Hero Section con Carrusel -->
    <section class="relative">
      <div class="carousel-container shadow-2xl">
        <div
          v-for="(item, index) in carouselItems"
          :key="index"
          :class="[
            'carousel-item',
            { active: currentIndex === index }
          ]"
        >
          <img :src="item.image" :alt="item.title" class="w-full h-full object-cover object-center">
        </div>
      </div>
      
      <!-- Contenido superpuesto al carrusel -->
      <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 bg-black bg-opacity-50">
        <h2 class="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-wide drop-shadow-lg animate-fade-in">
          {{ currentItem.title }}
        </h2>
        <p class="mt-4 text-base md:text-lg lg:text-xl max-w-2xl font-light drop-shadow-lg animate-fade-in">
          {{ currentItem.description }}
        </p>
        <RouterLink 
          to="/eventos" 
          class="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition duration-300 shadow-xl animate-fade-in"
        >
          Explora Nuestros Eventos
        </RouterLink>
      </div>

      <!-- Controles del carrusel -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button
          v-for="(item, index) in carouselItems"
          :key="index"
          @click="goTo(index)"
          :class="[
            'w-3 h-3 rounded-full transition duration-300',
            currentIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'
          ]"
        />
      </div>

      <!-- Botones de navegación -->
      <button
        @click="previous"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        @click="next"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>

    <!-- Sección de características -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h3 class="text-3xl font-bold text-center text-gray-900 mb-12">
          ¿Por qué elegir UPB Cultura?
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold text-gray-900 mb-2">Diversidad Cultural</h4>
            <p class="text-gray-600">Explora una amplia gama de grupos culturales y eventos que enriquecen la vida universitaria.</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold text-gray-900 mb-2">Fácil Gestión</h4>
            <p class="text-gray-600">Plataforma intuitiva para coordinar eventos y gestionar grupos culturales de manera eficiente.</p>
          </div>
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold text-gray-900 mb-2">Comunidad Activa</h4>
            <p class="text-gray-600">Conecta con una comunidad vibrante de artistas, músicos y creadores culturales.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de estadísticas -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl font-bold text-blue-600 mb-2">{{ eventsStore.events.length }}</div>
            <div class="text-gray-600">Eventos Activos</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-green-600 mb-2">{{ groupsStore.groups.length }}</div>
            <div class="text-gray-600">Grupos Culturales</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-purple-600 mb-2">{{ totalMembers }}</div>
            <div class="text-gray-600">Miembros Activos</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-yellow-600 mb-2">5+</div>
            <div class="text-gray-600">Años de Experiencia</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCarousel } from '../composables/useCarousel'
import { useEventsStore } from '../stores/events'
import { useGroupsStore } from '../stores/groups'

const eventsStore = useEventsStore()
const groupsStore = useGroupsStore()

const carouselItems = [
  {
    title: 'Descubre el Arte y la Cultura en la UPB',
    description: 'Sumérgete en un mundo de creatividad y expresión a través de nuestros grupos culturales y eventos.',
    image: 'https://placehold.co/1920x600/1e40af/ffffff?text=Coro+de+la+UPB'
  },
  {
    title: 'Teatro que Inspira',
    description: 'Obras clásicas y contemporáneas que despiertan emociones y reflexiones profundas.',
    image: 'https://placehold.co/1920x600/b91c1c/ffffff?text=Grupo+de+Teatro+UPB'
  },
  {
    title: 'Danza que Conmueve',
    description: 'Tradiciones folclóricas y expresiones modernas que celebran nuestra identidad cultural.',
    image: 'https://placehold.co/1920x600/059669/ffffff?text=Grupo+de+Danza+UPB'
  }
]

const { currentIndex, next, previous, goTo } = useCarousel(carouselItems, true, 5000)

const currentItem = computed(() => carouselItems[currentIndex.value])

const totalMembers = computed(() => {
  return groupsStore.groups.reduce((total, group) => total + group.members, 0)
})
</script>