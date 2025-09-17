<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8 md:py-12">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Contacto
        </h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Formulario de Contacto -->
          <div class="bg-white rounded-lg shadow-lg p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Envíanos un Mensaje</h3>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  :class="{ 'border-red-500': errors.name }"
                  placeholder="Tu nombre completo"
                />
                <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  :class="{ 'border-red-500': errors.email }"
                  placeholder="tu@email.com"
                />
                <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
              </div>
              
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                  Asunto
                </label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  :class="{ 'border-red-500': errors.subject }"
                  placeholder="¿En qué podemos ayudarte?"
                />
                <p v-if="errors.subject" class="mt-1 text-sm text-red-600">{{ errors.subject }}</p>
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  :class="{ 'border-red-500': errors.message }"
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
                <div class="flex justify-between items-center mt-1">
                  <p v-if="errors.message" class="text-sm text-red-600">{{ errors.message }}</p>
                  <p class="text-sm text-gray-500 ml-auto">{{ form.message.length }}/1000 caracteres</p>
                </div>
              </div>
              
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isSubmitting" class="loading mr-2"></span>
                {{ isSubmitting ? 'Enviando...' : 'Enviar Mensaje' }}
              </button>
            </form>
          </div>

          <!-- Información de Contacto -->
          <div class="space-y-8">
            <!-- Información General -->
            <div class="bg-white rounded-lg shadow-lg p-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
              <div class="space-y-4">
                <div 
                  v-for="(contact, index) in contactInfo" 
                  :key="index"
                  class="flex items-start space-x-3 hover:transform hover:scale-105 transition duration-300"
                >
                  <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <component :is="contact.icon" class="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900">{{ contact.title }}</h4>
                    <p class="text-gray-600">{{ contact.value }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Horarios de Atención -->
            <div class="bg-white rounded-lg shadow-lg p-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Horarios de Atención</h3>
              <div class="space-y-3">
                <div 
                  v-for="(schedule, index) in schedules" 
                  :key="index"
                  class="flex justify-between"
                >
                  <span class="font-medium text-gray-900">{{ schedule.day }}</span>
                  <span class="text-gray-600">{{ schedule.hours }}</span>
                </div>
              </div>
            </div>

            <!-- Redes Sociales -->
            <div class="bg-white rounded-lg shadow-lg p-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">Síguenos</h3>
              <div class="flex space-x-4">
                <a 
                  v-for="(social, index) in socialMedia" 
                  :key="index"
                  :href="social.url"
                  class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition duration-300"
                >
                  <component :is="social.icon" class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useNotifications } from '../composables/useNotifications'

const { showNotification } = useNotifications()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const contactInfo = ref([
  {
    title: 'Dirección',
    value: 'Circular 1 No. 70-01, Medellín, Colombia',
    icon: 'LocationIcon'
  },
  {
    title: 'Email',
    value: 'cultura@upb.edu.co',
    icon: 'MailIcon'
  },
  {
    title: 'Teléfono',
    value: '+57 (4) 354 45 67',
    icon: 'PhoneIcon'
  }
])

const schedules = ref([
  { day: 'Lunes - Viernes', hours: '8:00 AM - 6:00 PM' },
  { day: 'Sábados', hours: '9:00 AM - 1:00 PM' },
  { day: 'Domingos', hours: 'Cerrado' }
])

const socialMedia = ref([
  {
    name: 'Twitter',
    url: '#',
    icon: 'TwitterIcon'
  },
  {
    name: 'Facebook',
    url: '#',
    icon: 'FacebookIcon'
  },
  {
    name: 'Instagram',
    url: '#',
    icon: 'InstagramIcon'
  }
])

const validateForm = () => {
  let isValid = true
  
  // Limpiar errores anteriores
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  // Validar nombre
  if (!form.name.trim()) {
    errors.name = 'El nombre es obligatorio'
    isValid = false
  } else if (form.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres'
    isValid = false
  }

  // Validar email
  if (!form.email.trim()) {
    errors.email = 'El email es obligatorio'
    isValid = false
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Ingresa un email válido'
    isValid = false
  }

  // Validar asunto
  if (!form.subject.trim()) {
    errors.subject = 'El asunto es obligatorio'
    isValid = false
  } else if (form.subject.trim().length < 5) {
    errors.subject = 'El asunto debe tener al menos 5 caracteres'
    isValid = false
  }

  // Validar mensaje
  if (!form.message.trim()) {
    errors.message = 'El mensaje es obligatorio'
    isValid = false
  } else if (form.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres'
    isValid = false
  } else if (form.message.length > 1000) {
    errors.message = 'El mensaje no puede exceder 1000 caracteres'
    isValid = false
  }

  return isValid
}

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const handleSubmit = async () => {
  if (!validateForm()) {
    showNotification('Por favor, corrige los errores en el formulario', 'error')
    return
  }

  isSubmitting.value = true

  try {
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Guardar en localStorage (en un proyecto real, esto sería una llamada al backend)
    const contactData = {
      ...form,
      timestamp: new Date().toISOString()
    }
    
    const contacts = JSON.parse(localStorage.getItem('contactMessages') || '[]')
    contacts.push(contactData)
    localStorage.setItem('contactMessages', JSON.stringify(contacts))
    
    showNotification('¡Mensaje enviado exitosamente! Te responderemos pronto.', 'success')
    
    // Limpiar formulario
    Object.keys(form).forEach(key => {
      form[key as keyof typeof form] = ''
    })
    
  } catch (error) {
    showNotification('Error al enviar el mensaje. Inténtalo de nuevo.', 'error')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<!-- Iconos SVG como componentes -->
<template>
  <!-- LocationIcon -->
  <svg v-if="false" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
  </svg>
  
  <!-- MailIcon -->
  <svg v-if="false" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
  </svg>
  
  <!-- PhoneIcon -->
  <svg v-if="false" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
  </svg>
</template>
