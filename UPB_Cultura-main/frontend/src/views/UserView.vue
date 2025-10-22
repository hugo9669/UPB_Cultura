<template>
  <div class="min-h-screen bg-gray-50">
<<<<<<< HEAD
    <NotificationContainer />
=======
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Panel de Usuario</h1>
            <p class="text-gray-600 mt-1">Bienvenido a UPB Cultura</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right">
              <p class="text-sm text-gray-600">Bienvenido</p>
              <p class="font-semibold text-gray-900">{{ user?.name }}</p>
            </div>
<<<<<<< HEAD
            <router-link
              to="/"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Inicio
            </router-link>
=======
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
            <button
              @click="handleLogout"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido Principal -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Mis Grupos -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Mis Grupos</h2>
          <router-link
            to="/grupos"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Explorar Grupos
          </router-link>
        </div>
        
<<<<<<< HEAD
        <!-- Indicador de carga -->
        <div v-if="loadingGroups" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p class="mt-4 text-gray-600">Cargando tus grupos...</p>
        </div>

        <!-- Sin grupos -->
        <div v-else-if="myGroups.length === 0" class="text-center py-12">
=======
        <div v-if="myGroups.length === 0" class="text-center py-12">
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p class="mt-4 text-gray-600">No estás en ningún grupo aún</p>
          <p class="text-sm text-gray-500">Explora los grupos disponibles y únete a los que te interesen</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="group in myGroups"
            :key="group.id"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300"
          >
            <h3 class="font-semibold text-lg text-gray-900">{{ group.name }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ group.category }}</p>
            <div class="mt-4 flex items-center justify-between">
              <span class="text-sm text-gray-500">{{ group.members }} miembros</span>
<<<<<<< HEAD
              <button 
                @click="viewGroupDetails(group)"
                class="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
=======
              <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
                Ver detalles
              </button>
            </div>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <!-- Mis Solicitudes -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Mis Solicitudes</h2>
          <div class="flex gap-2">
            <button
              v-for="filter in ['todas', 'pendiente', 'aprobada', 'rechazada']"
              :key="filter"
              @click="filterRequests = filter"
              :class="[
                'px-3 py-1 text-sm font-medium rounded-full transition duration-300',
                filterRequests === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              ]"
            >
              {{ filter === 'todas' ? 'Todas' : filter.charAt(0).toUpperCase() + filter.slice(1) }}
            </button>
          </div>
        </div>

        <!-- Indicador de carga -->
        <div v-if="loadingRequests" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p class="mt-4 text-gray-600">Cargando solicitudes...</p>
        </div>

        <!-- Sin solicitudes -->
        <div v-else-if="filteredRequests.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="mt-4 text-gray-600">No tienes solicitudes {{ filterRequests === 'todas' ? '' : filterRequests + 's' }}</p>
          <p class="text-sm text-gray-500">Explora grupos y solicita unirte a los que te interesen</p>
        </div>

        <!-- Lista de solicitudes -->
        <div v-else class="space-y-4">
          <div
            v-for="request in filteredRequests"
            :key="request.id"
=======
      <!-- Próximos Eventos -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Próximos Eventos</h2>
          <router-link
            to="/eventos"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Ver Todos
          </router-link>
        </div>

        <div v-if="upcomingEvents.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="mt-4 text-gray-600">No hay eventos próximos</p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="event in upcomingEvents"
            :key="event.id"
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
<<<<<<< HEAD
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="font-semibold text-lg text-gray-900">{{ request.grupo.nombreGrupo }}</h3>
                  <span
                    :class="[
                      'px-3 py-1 text-xs font-semibold rounded-full',
                      request.estado === 'pendiente'
                        ? 'bg-yellow-100 text-yellow-800'
                        : request.estado === 'aprobada'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ request.estado === 'pendiente' ? 'Pendiente' : request.estado === 'aprobada' ? 'Aprobada' : 'Rechazada' }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 mb-2">
                  <span class="font-medium">Fecha de solicitud:</span> {{ formatDate(request.fechaSolicitud) }}
                </p>
                <p class="text-sm text-gray-700 mb-2">
                  <span class="font-medium">Tu motivación:</span> {{ request.motivacion }}
                </p>
                <p v-if="request.mensajeRespuesta" class="text-sm text-gray-700 p-3 bg-blue-50 rounded border border-blue-200">
                  <span class="font-medium text-blue-900">Respuesta del líder:</span> {{ request.mensajeRespuesta }}
                </p>
              </div>
              <button
                v-if="request.estado === 'pendiente'"
                @click="cancelRequest(request.id)"
                class="ml-4 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition duration-300"
                :disabled="cancelingRequest === request.id"
              >
                <span v-if="cancelingRequest !== request.id">Cancelar</span>
                <span v-else>Cancelando...</span>
              </button>
              <button
                v-else
                @click="deleteRequestNotification(request.id)"
                class="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-300"
                :disabled="deletingRequest === request.id"
                :title="'Eliminar notificación'"
              >
                <svg v-if="deletingRequest !== request.id" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <div v-else class="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mensajes y Recordatorios -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <h2 class="text-2xl font-bold text-gray-900">Mensajes y Recordatorios</h2>
            <span v-if="unreadMessagesCount > 0" class="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
              {{ unreadMessagesCount }} nuevo{{ unreadMessagesCount !== 1 ? 's' : '' }}
            </span>
          </div>
          <div class="flex gap-2">
            <button
              v-for="filter in ['todos', 'noLeidos', 'leidos']"
              :key="filter"
              @click="filterMessages = filter"
              :class="[
                'px-3 py-1 text-sm font-medium rounded-full transition duration-300',
                filterMessages === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              ]"
            >
              {{ filter === 'todos' ? 'Todos' : filter === 'noLeidos' ? 'No Leídos' : 'Leídos' }}
            </button>
          </div>
        </div>

        <!-- Indicador de carga -->
        <div v-if="loadingMessages" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p class="mt-4 text-gray-600">Cargando mensajes...</p>
        </div>

        <!-- Sin mensajes -->
        <div v-else-if="filteredMessages.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p class="mt-4 text-gray-600">No tienes mensajes {{ filterMessages === 'todos' ? '' : filterMessages === 'noLeidos' ? 'no leídos' : 'leídos' }}</p>
          <p class="text-sm text-gray-500">Los líderes de tus grupos pueden enviarte recordatorios y notificaciones</p>
        </div>

        <!-- Lista de mensajes -->
        <div v-else class="space-y-3">
          <div
            v-for="message in filteredMessages"
            :key="message.id"
            :class="[
              'border rounded-lg p-4 hover:shadow-md transition duration-300',
              !message.leido ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white'
            ]"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1 cursor-pointer" @click="viewMessageDetail(message)">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="font-semibold text-lg text-gray-900">{{ message.asunto }}</h3>
                  <span v-if="!message.leido" class="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                    Nuevo
                  </span>
                </div>
                <p class="text-sm text-gray-600 mb-2">
                  <span class="font-medium">De:</span> {{ message.lider?.nombre }} (Líder de {{ message.grupo?.nombreGrupo }})
                </p>
                <p class="text-sm text-gray-600 mb-2">
                  <span class="font-medium">Fecha:</span> {{ formatDate(message.fechaEnvio) }}
                </p>
                <p v-if="message.evento" class="text-sm text-blue-700 mb-2">
                  <span class="font-medium">📅 Evento relacionado:</span> {{ message.evento.titulo }}
                </p>
                <p class="text-gray-700 line-clamp-2">{{ message.mensaje }}</p>
              </div>
              <div class="flex items-center gap-2 flex-shrink-0 ml-4">
                <button
                  @click.stop="deleteMessage(message.id)"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-300"
                  :disabled="deletingMessage === message.id"
                  :title="'Eliminar mensaje'"
                >
                  <svg v-if="deletingMessage !== message.id" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <div v-else class="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                </button>
                <svg class="w-5 h-5 text-gray-400 cursor-pointer" @click="viewMessageDetail(message)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Calendario de Eventos -->
      <EventCalendar
        :events="calendarEvents"
        :loading="loadingEvents"
      />
    </div> <!-- Cierre de max-w-7xl - Contenedor de contenido -->
  </div> <!-- Cierre de min-h-screen - Contenedor principal -->

  <!-- Modal: Detalles del Grupo con sus Eventos -->
  <div
    v-if="showGroupDetailsModal"
    class="fixed inset-0 z-50 overflow-y-auto"
    @click.self="closeGroupDetailsModal"
  >
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <!-- Overlay -->
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closeGroupDetailsModal"></div>

        <!-- Modal Content -->
        <div class="relative inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <!-- Header -->
        <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-4">
              <img 
                v-if="selectedGroup?.image" 
                :src="selectedGroup.image" 
                :alt="selectedGroup.name"
                class="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 class="text-2xl font-bold text-gray-900">{{ selectedGroup?.name }}</h3>
                <p class="text-sm text-gray-600">{{ selectedGroup?.category }}</p>
              </div>
            </div>
            <button
              @click="closeGroupDetailsModal"
              class="text-gray-400 hover:text-gray-600 transition"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Descripción del Grupo -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-2">Descripción</h4>
            <p class="text-gray-600">{{ selectedGroup?.description }}</p>
          </div>

          <!-- Información del Grupo -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-600">Miembros</p>
              <p class="text-xl font-semibold text-gray-900">{{ selectedGroup?.members }}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-600">Categoría</p>
              <p class="text-xl font-semibold text-gray-900">{{ selectedGroup?.category }}</p>
            </div>
          </div>

          <!-- Próximos Eventos del Grupo -->
          <div class="mt-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Próximos Eventos</h4>
            
            <!-- Indicador de carga -->
            <div v-if="loadingGroupEvents" class="text-center py-8">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p class="mt-4 text-gray-600">Cargando eventos...</p>
        </div>

            <!-- Sin eventos -->
            <div v-else-if="groupEvents.length === 0" class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
              <p class="mt-4 text-gray-600">No hay eventos próximos para este grupo</p>
        </div>

            <!-- Lista de eventos -->
        <div v-else class="space-y-4">
          <div
                v-for="event in groupEvents"
            :key="event.id"
                class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300 cursor-pointer"
                @click="viewEventDetails(event)"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                    <h5 class="font-semibold text-lg text-gray-900">{{ event.title }}</h5>
                <p class="text-sm text-gray-600 mt-1">{{ event.group }}</p>
                <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>📅 {{ formatDate(event.date) }}</span>
                      <span>🕐 {{ event.time }}</span>
                      <span>📍 {{ event.location }}</span>
                </div>
                    <p class="text-sm text-gray-600 mt-2 line-clamp-2">{{ event.description }}</p>
              </div>
                  <button class="text-blue-600 hover:text-blue-700 text-sm font-medium ml-4">
=======
                <h3 class="font-semibold text-lg text-gray-900">{{ event.title }}</h3>
                <p class="text-sm text-gray-600 mt-1">{{ event.group }}</p>
                <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>{{ formatDate(event.date) }}</span>
                  <span>{{ event.location }}</span>
                </div>
              </div>
              <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
                Ver detalles
              </button>
            </div>
          </div>
        </div>
<<<<<<< HEAD
          </div>

          <!-- Footer -->
          <div class="mt-6 flex justify-end gap-3">
            <button
              @click="openContactLeaderModal"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contactar al Líder
            </button>
            <button
              @click="closeGroupDetailsModal"
              class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div> <!-- Cierre del Modal de Grupo -->

    <!-- Modal de contactar al líder -->
    <ContactLeaderModal
      v-if="showContactLeaderModal && selectedGroup"
      :group="selectedGroup"
      @close="closeContactLeaderModal"
      @sent="handleContactLeaderMessageSent"
    />

  <!-- Modal: Detalles del Evento -->
  <div
    v-if="showEventDetailsModal"
    class="fixed inset-0 z-50 overflow-y-auto"
    @click.self="closeEventDetailsModal"
  >
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
      <!-- Overlay -->
      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closeEventDetailsModal"></div>

      <!-- Modal Content -->
      <div class="relative inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-900">{{ selectedEvent?.title }}</h3>
          <button
            @click="closeEventDetailsModal"
            class="text-gray-400 hover:text-gray-600 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Imagen del evento (si existe) -->
        <div v-if="selectedEvent?.image" class="mb-6">
          <img 
            :src="selectedEvent.image" 
            :alt="selectedEvent.title"
            class="w-full h-64 object-cover rounded-lg"
          />
        </div>

        <!-- Información Principal -->
        <div class="space-y-4 mb-6">
          <!-- Categoría -->
          <div class="flex items-center gap-2">
            <span class="text-sm font-semibold text-gray-600">Categoría:</span>
            <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {{ selectedEvent?.group }}
            </span>
          </div>

          <!-- Fecha y Hora -->
          <div class="bg-blue-50 p-4 rounded-lg">
            <div class="flex items-start gap-3">
              <svg class="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p class="font-semibold text-gray-900">Fecha y Hora</p>
                <p class="text-gray-700 mt-1">📅 {{ formatDate(selectedEvent?.date || '') }}</p>
                <p class="text-gray-700 mt-1">🕐 {{ selectedEvent?.time }}</p>
              </div>
            </div>
          </div>

          <!-- Ubicación -->
          <div class="bg-green-50 p-4 rounded-lg">
            <div class="flex items-start gap-3">
              <svg class="w-6 h-6 text-green-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p class="font-semibold text-gray-900">Ubicación</p>
                <p class="text-gray-700 mt-1">{{ selectedEvent?.location }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Descripción -->
        <div class="mb-6">
          <h4 class="text-lg font-semibold text-gray-900 mb-2">Descripción</h4>
          <p class="text-gray-600 whitespace-pre-line">{{ selectedEvent?.description }}</p>
        </div>

        <!-- Footer -->
        <div class="flex justify-end gap-3">
          <button
            @click="closeEventDetailsModal"
            class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div> <!-- Cierre del Modal de Evento -->

  <!-- Modal: Detalle del Mensaje -->
  <div
    v-if="showMessageDetailModal"
    class="fixed inset-0 z-50 overflow-y-auto"
    @click.self="closeMessageDetailModal"
  >
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
      <!-- Overlay -->
      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closeMessageDetailModal"></div>

      <!-- Modal Content -->
      <div class="relative inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-2xl font-bold text-gray-900">{{ selectedMessage?.asunto }}</h3>
            <p class="text-sm text-gray-600 mt-1">
              De: <span class="font-medium">{{ selectedMessage?.lider?.nombre }}</span> - Líder de {{ selectedMessage?.grupo?.nombreGrupo }}
            </p>
          </div>
          <button
            @click="closeMessageDetailModal"
            class="text-gray-400 hover:text-gray-600 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Fecha y Estado -->
        <div class="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="text-sm text-gray-600">
              <span class="font-medium">Fecha de envío:</span> {{ formatDate(selectedMessage?.fechaEnvio) }}
            </span>
          </div>
          <span
            v-if="selectedMessage?.leido"
            class="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full"
          >
            Leído
          </span>
          <span
            v-else
            class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full"
          >
            Nuevo
          </span>
        </div>

        <!-- Evento relacionado (si existe) -->
        <div v-if="selectedMessage?.evento" class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div class="flex items-start gap-3">
            <svg class="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div class="flex-1">
              <p class="font-semibold text-blue-900">Evento Relacionado</p>
              <p class="text-blue-800 mt-1">{{ selectedMessage.evento.titulo }}</p>
              <p class="text-sm text-blue-700 mt-1">
                📅 {{ formatDate(selectedMessage.evento.fechaEvento) }} • 📍 {{ selectedMessage.evento.ubicacion }}
              </p>
            </div>
          </div>
        </div>

        <!-- Mensaje -->
        <div class="mb-6">
          <h4 class="text-lg font-semibold text-gray-900 mb-3">Mensaje:</h4>
          <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p class="text-gray-700 whitespace-pre-line">{{ selectedMessage?.mensaje }}</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-end gap-3">
          <button
            @click="closeMessageDetailModal"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Cerrar
          </button>
      </div>
    </div>
  </div>
  </div> <!-- Cierre del Modal de Mensaje -->
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { apiService } from '@/services/api'
import { useNotifications } from '@/composables/useNotifications'
import NotificationContainer from '@/components/NotificationContainer.vue'
import EventCalendar from '@/components/EventCalendar.vue'
import ContactLeaderModal from '@/components/ContactLeaderModal.vue'

const router = useRouter()
const authStore = useAuthStore()
const { showNotification } = useNotifications()

const user = computed(() => authStore.user)

const myGroups = ref<any[]>([])
const upcomingEvents = ref<any[]>([])
const loadingGroups = ref(false)
const loadingEvents = ref(false)

// Estados para solicitudes de membresía
const myRequests = ref<any[]>([])
const loadingRequests = ref(false)
const filterRequests = ref('todas')
const cancelingRequest = ref<number | null>(null)
const deletingRequest = ref<number | null>(null)

// Estados para mensajes recibidos
const myMessages = ref<any[]>([])
const loadingMessages = ref(false)
const filterMessages = ref('todos') // 'todos', 'noLeidos', 'leidos'
const unreadMessagesCount = ref(0)
const showMessageDetailModal = ref(false)
const selectedMessage = ref<any>(null)
const markingAsRead = ref<number | null>(null)
const deletingMessage = ref<number | null>(null)

// Estados para el modal de detalles del grupo
const showGroupDetailsModal = ref(false)
const selectedGroup = ref<any>(null)
const groupEvents = ref<any[]>([])
const loadingGroupEvents = ref(false)

// Estados para el modal de contactar al líder
const showContactLeaderModal = ref(false)

// Estados para el modal de detalles del evento
const showEventDetailsModal = ref(false)
const selectedEvent = ref<any>(null)

// Computed: Eventos para el calendario (solo eventos futuros de grupos del usuario)
const calendarEvents = computed(() => {
  if (!upcomingEvents.value || upcomingEvents.value.length === 0) {
    console.log('📅 [Calendario] No hay eventos en upcomingEvents')
    return []
  }
  
  const myGroupIds = myGroups.value.map(group => group.id)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  console.log('📅 [Calendario] Eventos cargados:', upcomingEvents.value.length)
  console.log('📅 [Calendario] IDs de mis grupos:', myGroupIds)
  
  // Helper para obtener el color de la categoría
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Musica':
      case 'Música':
        return '#3B82F6' // Azul
      case 'Teatro':
        return '#EF4444' // Rojo
      case 'Danza':
        return '#F59E0B' // Amarillo
      default:
        return '#6B7280' // Gris
    }
  }
  
  const filteredEvents = upcomingEvents.value.filter((event: any) => {
    // Crear fecha del evento con su hora
    const eventDateStr = event.date // formato "YYYY-MM-DD"
    const eventTimeStr = event.time || "00:00" // formato "HH:MM"
    const [year, month, day] = eventDateStr.split('-').map(Number)
    const [hours, minutes] = eventTimeStr.split(':').map(Number)
    
    // Crear fecha del evento en hora local
    const eventDateTime = new Date(year, month - 1, day, hours, minutes)
    const now = new Date()
    
    const belongsToMyGroup = myGroupIds.includes(event.groupId)
    const isFuture = eventDateTime >= now
    return belongsToMyGroup && isFuture
  }).map((event: any) => ({
    id: event.id,
    name: event.title || event.name, // Usar title o name
    date: event.date,
    time: event.time,
    location: event.location,
    category: event.category,
    categoryColor: getCategoryColor(event.category)
  }))
  
  console.log('📅 [Calendario] Eventos filtrados para calendario:', filteredEvents.length)
  console.log('📅 [Calendario] Eventos:', filteredEvents)
  
  return filteredEvents
})

// Computed: Solicitudes filtradas por estado
const filteredRequests = computed(() => {
  if (filterRequests.value === 'todas') {
    return myRequests.value
  }
  return myRequests.value.filter((request: any) => request.estado === filterRequests.value)
})

// Computed: Mensajes filtrados por estado de lectura
const filteredMessages = computed(() => {
  if (filterMessages.value === 'todos') {
    return myMessages.value
  } else if (filterMessages.value === 'noLeidos') {
    return myMessages.value.filter((msg: any) => !msg.leido)
  } else {
    return myMessages.value.filter((msg: any) => msg.leido)
  }
})

const loadMyGroups = async () => {
  loadingGroups.value = true
  try {
    const response = await apiService.getMyMemberships()
    if (response.data) {
      myGroups.value = response.data.map((membership: any) => ({
        id: membership.group.id,
        name: membership.group.name,
        description: membership.group.description,
        category: membership.group.category,
        members: membership.group.members || 0,
        image: membership.group.image,
        joinDate: membership.joinDate
      }))
    }
  } catch (error: any) {
    console.error('Error al cargar grupos:', error)
    showNotification('Error al cargar tus grupos', 'error')
  } finally {
    loadingGroups.value = false
  }
}

const loadUpcomingEvents = async () => {
  loadingEvents.value = true
  try {
    const response = await apiService.getEvents()
    console.log('📊 Respuesta de eventos:', response.data)
    
    if (response.data && Array.isArray(response.data)) {
      const now = new Date()
      
      // Obtener IDs de los grupos a los que pertenece el usuario
      const myGroupIds = myGroups.value.map(g => g.id)
      console.log('👥 IDs de mis grupos:', myGroupIds)
      
      // Debug: Ver todos los eventos con sus groupIds
      console.log('🔍 Eventos disponibles:', response.data.map((e: any) => ({
        id: e.id,
        name: e.name,
        groupId: e.groupId,
        date: e.date
      })))
      
      upcomingEvents.value = response.data
        .filter((event: any) => {
          const eventDate = new Date(event.date + 'T' + event.time)
          const isFuture = eventDate > now
          
          // Solo mostrar eventos de los grupos a los que pertenece el usuario
          const belongsToMyGroup = myGroupIds.includes(event.groupId)
          
          console.log(`Evento "${event.name}": groupId=${event.groupId}, perteneceAGrupo=${belongsToMyGroup}, esFuturo=${isFuture}`)
          
          return isFuture && belongsToMyGroup
        })
        .slice(0, 5) // Mostrar solo los próximos 5 eventos
        .map((event: any) => ({
          id: event.id,
          title: event.name,
          date: event.date,
          time: event.time,
          location: event.location,
          group: event.category,
          description: event.description,
          groupId: event.groupId
        }))
        
      console.log('✅ Eventos filtrados para mostrar:', upcomingEvents.value.length)
    }
  } catch (error: any) {
    console.error('Error al cargar eventos:', error)
  } finally {
    loadingEvents.value = false
  }
}

const formatDate = (date: string) => {
  if (!date) return 'Fecha no disponible'
  
  // Detectar si es un timestamp completo (incluye 'T' o tiene hora)
  if (date.includes('T') || date.includes(' ')) {
    // Es un timestamp completo (ISO string), parsearlo directamente
    const dateObj = new Date(date)
    
    // Verificar si la fecha es válida
    if (isNaN(dateObj.getTime())) {
      return 'Fecha inválida'
    }
    
    return dateObj.toLocaleDateString('es-ES', {
=======
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const myGroups = ref([
  // Aquí se cargarían los grupos del usuario desde la API
])

const upcomingEvents = ref([
  // Aquí se cargarían los próximos eventos desde la API
])

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-ES', {
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
<<<<<<< HEAD
  } else {
    // Es solo una fecha (YYYY-MM-DD), parsear manualmente
    const [year, month, day] = date.split('-').map(Number)
    
    // Crear fecha con Date.UTC para evitar problemas de zona horaria
    const dateObj = new Date(Date.UTC(year, month - 1, day))
    
    return dateObj.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    })
  }
=======
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
<<<<<<< HEAD

// Funciones para solicitudes de membresía
const loadMyRequests = async () => {
  loadingRequests.value = true
  try {
    const response = await apiService.getMyMembershipRequests()
    if (response.data) {
      myRequests.value = response.data
    }
  } catch (error: any) {
    console.error('Error al cargar solicitudes:', error)
    showNotification('Error al cargar tus solicitudes', 'error')
  } finally {
    loadingRequests.value = false
  }
}

const cancelRequest = async (requestId: number) => {
  if (!confirm('¿Estás seguro de que deseas cancelar esta solicitud?')) return
  
  cancelingRequest.value = requestId
  try {
    await apiService.cancelMembershipRequest(requestId)
    showNotification('Solicitud cancelada exitosamente', 'success')
    // Recargar solicitudes
    await loadMyRequests()
  } catch (error: any) {
    console.error('Error al cancelar solicitud:', error)
    const errorMessage = error.response?.data?.message || error.message || 'Error al cancelar la solicitud'
    showNotification(errorMessage, 'error')
  } finally {
    cancelingRequest.value = null
  }
}

const deleteRequestNotification = async (requestId: number) => {
  if (!confirm('¿Estás seguro de que deseas eliminar esta notificación?')) return
  
  deletingRequest.value = requestId
  try {
    await apiService.deleteProcessedMembershipRequest(requestId)
    showNotification('Notificación eliminada exitosamente', 'success')
    // Recargar solicitudes
    await loadMyRequests()
  } catch (error: any) {
    console.error('Error al eliminar notificación:', error)
    const errorMessage = error.response?.data?.message || error.message || 'Error al eliminar la notificación'
    showNotification(errorMessage, 'error')
  } finally {
    deletingRequest.value = null
  }
}

// Funciones para mensajes recibidos
const loadMyMessages = async () => {
  loadingMessages.value = true
  try {
    const response = await apiService.getReceivedUserMessages()
    if (response.data) {
      myMessages.value = response.data
      unreadMessagesCount.value = response.data.filter((msg: any) => !msg.leido).length
    }
  } catch (error: any) {
    console.error('Error al cargar mensajes:', error)
    showNotification('Error al cargar tus mensajes', 'error')
  } finally {
    loadingMessages.value = false
  }
}

const viewMessageDetail = (message: any) => {
  selectedMessage.value = message
  showMessageDetailModal.value = true
  
  // Si el mensaje no está leído, marcarlo como leído automáticamente
  if (!message.leido) {
    markMessageAsRead(message.id)
  }
}

const markMessageAsRead = async (messageId: number) => {
  markingAsRead.value = messageId
  try {
    await apiService.markUserMessageAsRead(messageId)
    // Actualizar el estado local
    const message = myMessages.value.find((msg: any) => msg.id === messageId)
    if (message) {
      message.leido = true
      unreadMessagesCount.value = Math.max(0, unreadMessagesCount.value - 1)
    }
  } catch (error: any) {
    console.error('Error al marcar mensaje como leído:', error)
  } finally {
    markingAsRead.value = null
  }
}

const closeMessageDetailModal = () => {
  showMessageDetailModal.value = false
  selectedMessage.value = null
}

const deleteMessage = async (messageId: number) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este mensaje?')) return
  
  deletingMessage.value = messageId
  try {
    await apiService.deleteReceivedUserMessage(messageId)
    showNotification('Mensaje eliminado exitosamente', 'success')
    // Recargar mensajes
    await loadMyMessages()
  } catch (error: any) {
    console.error('Error al eliminar mensaje:', error)
    const errorMessage = error.response?.data?.message || error.message || 'Error al eliminar el mensaje'
    showNotification(errorMessage, 'error')
  } finally {
    deletingMessage.value = null
  }
}

// Funciones para el modal de detalles del grupo
const viewGroupDetails = async (group: any) => {
  selectedGroup.value = group
  showGroupDetailsModal.value = true
  await loadGroupEvents(group.id)
}

const loadGroupEvents = async (groupId: number) => {
  loadingGroupEvents.value = true
  groupEvents.value = []
  
  try {
    const response = await apiService.getEvents()
    console.log('📊 Eventos cargados para el grupo:', groupId)
    
    if (response.data && Array.isArray(response.data)) {
      const now = new Date()
      
      groupEvents.value = response.data
        .filter((event: any) => {
          // Crear fecha del evento con su hora
          const eventDateStr = event.date // formato "YYYY-MM-DD"
          const eventTimeStr = event.time || "00:00" // formato "HH:MM"
          const [year, month, day] = eventDateStr.split('-').map(Number)
          const [hours, minutes] = eventTimeStr.split(':').map(Number)
          
          // Crear fecha del evento en hora local
          const eventDateTime = new Date(year, month - 1, day, hours, minutes)
          const isFuture = eventDateTime >= now
          const belongsToGroup = event.groupId == groupId // Usar == para comparar number y string
          
          console.log(`Evento "${event.name}": groupId=${event.groupId}, perteneceAlGrupo=${belongsToGroup}, esFuturo=${isFuture}`)
          
          return isFuture && belongsToGroup
        })
        .map((event: any) => ({
          id: event.id,
          title: event.name,
          date: event.date,
          time: event.time,
          location: event.location,
          group: event.category,
          description: event.description,
          groupId: event.groupId
        }))
        
      console.log('✅ Eventos del grupo filtrados:', groupEvents.value.length)
    }
  } catch (error: any) {
    console.error('Error al cargar eventos del grupo:', error)
    showNotification('Error al cargar los eventos del grupo', 'error')
  } finally {
    loadingGroupEvents.value = false
  }
}

const closeGroupDetailsModal = () => {
  showGroupDetailsModal.value = false
  selectedGroup.value = null
  groupEvents.value = []
}

// Funciones para el modal de contactar al líder
const openContactLeaderModal = () => {
  showContactLeaderModal.value = true
}

const closeContactLeaderModal = () => {
  showContactLeaderModal.value = false
}

const handleContactLeaderMessageSent = () => {
  showNotification('Mensaje enviado al líder cultural exitosamente', 'success')
  closeContactLeaderModal()
}

// Funciones para el modal de detalles del evento
const viewEventDetails = (event: any) => {
  selectedEvent.value = event
  showEventDetailsModal.value = true
}

const closeEventDetailsModal = () => {
  showEventDetailsModal.value = false
  selectedEvent.value = null
}

onMounted(async () => {
  // Cargar los grupos del usuario
  await loadMyGroups()
  // Cargar eventos para el calendario
  await loadUpcomingEvents()
  // Cargar solicitudes de membresía
  await loadMyRequests()
  // Cargar mensajes recibidos
  await loadMyMessages()
})
=======
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
</script>



<<<<<<< HEAD




=======
>>>>>>> 2a4d31bf707bb7e535d6fe594859d8b61919a628
