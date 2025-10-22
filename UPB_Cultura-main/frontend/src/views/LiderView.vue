<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Panel de Líder Cultural</h1>
            <p class="text-gray-600 mt-1">{{ myGroup ? `Gestiona ${myGroup.name}` : 'Cargando...' }}</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right">
              <p class="text-sm text-gray-600">Bienvenido</p>
              <p class="font-semibold text-gray-900">{{ user?.name }}</p>
            </div>
            <router-link
              to="/"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Inicio
            </router-link>
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
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center py-12">
        <p class="text-gray-600">Cargando información...</p>
      </div>
    </div>

    <div v-else-if="!myGroup" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-lg shadow-md p-8 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">No tienes un grupo asignado</h3>
        <p class="mt-2 text-gray-600">Contacta con el administrador para ser asignado como líder de un grupo.</p>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Información del Grupo -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex items-start gap-6">
          <img :src="myGroup.image" :alt="myGroup.name" class="w-32 h-32 rounded-lg object-cover">
          <div class="flex-1">
            <div class="flex items-start justify-between">
              <div>
                <h2 class="text-2xl font-bold text-gray-900">{{ myGroup.name }}</h2>
                <p class="text-sm text-gray-600 mt-1">
                  <span :class="getCategoryClass(myGroup.category)">
                    {{ myGroup.category === 'Musica' ? 'Música' : myGroup.category }}
                  </span>
                </p>
                <p class="text-gray-700 mt-3">{{ myGroup.description }}</p>
              </div>
              <button
                @click="showEditGroupModal = true"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Editar Grupo
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Estadísticas del Grupo -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-semibold">Miembros</p>
              <p class="text-3xl font-bold text-blue-700 mt-2">{{ members.length }}</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-semibold">Eventos</p>
              <p class="text-3xl font-bold text-green-700 mt-2">{{ groupEvents.length }}</p>
            </div>
            <div class="bg-green-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-semibold">Próximos Eventos</p>
              <p class="text-3xl font-bold text-purple-700 mt-2">{{ upcomingEvents.length }}</p>
            </div>
            <div class="bg-purple-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Acciones Rápidas -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            @click="showCreateEventModal = true"
            class="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300"
          >
            <div class="bg-blue-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-900">Crear Evento</span>
          </button>

          <button
            @click="showMembersModal = true"
            class="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300"
          >
            <div class="bg-purple-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-900">Gestionar Miembros</span>
          </button>

          <button
            @click="showEditGroupModal = true"
            class="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300"
          >
            <div class="bg-yellow-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-900">Editar Información</span>
          </button>

          <button
            @click="openUnifiedMessagesModal"
            class="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300 relative"
          >
            <div class="bg-blue-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-900">Mensajes</span>
            <span v-if="totalUnreadMessages > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {{ totalUnreadMessages }}
            </span>
          </button>

          <button
            @click="showRequestsModal = true"
            class="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300 relative"
          >
            <div class="bg-indigo-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-900">Gestionar Solicitudes</span>
            <span v-if="pendingRequestsCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {{ pendingRequestsCount }}
            </span>
          </button>
        </div>
      </div>

      <!-- Calendario de Eventos -->
      <EventCalendar
        :events="calendarEvents"
        :loading="loading"
      />

      <!-- Miembros del Grupo -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-900">Miembros del Grupo</h2>
          <button
            @click="showMembersModal = true"
            class="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Ver Todos
          </button>
        </div>
        
        <div v-if="members.length === 0" class="text-center py-8">
          <p class="text-gray-600">No hay miembros en el grupo</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="member in members.slice(0, 6)"
            :key="member.id"
            class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg"
          >
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-blue-600 font-semibold">{{ getInitials(member.User?.fullName || member.User?.username) }}</span>
            </div>
            <div class="flex-1">
              <p class="font-medium text-gray-900">{{ member.User?.fullName || member.User?.username }}</p>
              <p class="text-xs text-gray-500">{{ member.User?.email }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Eventos Próximos -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-900">Próximos Eventos del Grupo</h2>
          <button
            @click="showCreateEventModal = true"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Crear Evento
          </button>
        </div>
        
        <div v-if="groupEvents.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="mt-4 text-gray-600">No hay eventos programados</p>
          <button
            @click="showCreateEventModal = true"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Crear Primer Evento
          </button>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="event in groupEvents"
            :key="event.id"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300"
          >
            <div class="flex items-start justify-between">
              <div class="flex gap-4 flex-1">
                <img :src="event.image" :alt="event.name" class="w-20 h-20 rounded-lg object-cover">
                <div class="flex-1">
                  <h3 class="font-semibold text-lg text-gray-900">{{ event.name }}</h3>
                  <p class="text-sm text-gray-600 mt-1">{{ event.description }}</p>
                  <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>📅 {{ formatDate(event.date) }}</span>
                    <span>🕐 {{ event.time }}</span>
                    <span>📍 {{ event.location }}</span>
                  </div>
                </div>
              </div>
              <div class="flex gap-2">
                <button
                  @click="editEvent(event)"
                  class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Editar
                </button>
                <button
                  @click="deleteEvent(event.id)"
                  class="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Crear/Editar Evento -->
    <div v-if="showCreateEventModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-900">{{ editingEvent ? 'Editar Evento' : 'Crear Nuevo Evento' }}</h3>
            <button @click="closeEventModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="submitEvent" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del Evento</label>
              <input
                v-model="eventForm.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Concierto de Fin de Año"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                v-model="eventForm.description"
                required
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe el evento..."
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input
                  v-model="eventForm.date"
                  type="date"
                  :min="minDate"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <p class="text-xs text-gray-500 mt-1">La fecha debe ser igual o posterior a hoy</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                <input
                  v-model="eventForm.time"
                  type="time"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
              <input
                v-model="eventForm.location"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Auditorio Principal"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">URL de Imagen</label>
              <input
                v-model="eventForm.image"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://ejemplo.com/imagen.jpg"
              >
            </div>

            <div class="flex gap-3 pt-4">
              <button
                type="submit"
                :disabled="savingEvent"
                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
              >
                {{ savingEvent ? 'Guardando...' : (editingEvent ? 'Actualizar Evento' : 'Crear Evento') }}
              </button>
              <button
                type="button"
                @click="closeEventModal"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal: Gestionar Miembros -->
    <div v-if="showMembersModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-gray-900">Gestionar Miembros del Grupo</h3>
            <button @click="closeMembersModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Tabs -->
          <div class="flex border-b border-gray-200 mb-6">
            <button
              @click="activeTab = 'current'"
              class="px-4 py-2 font-medium transition-colors"
              :class="activeTab === 'current' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'"
            >
              Miembros Actuales ({{ members.length }})
            </button>
            <button
              @click="activeTab = 'add'"
              class="px-4 py-2 font-medium transition-colors"
              :class="activeTab === 'add' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'"
            >
              Agregar Miembros
            </button>
          </div>

          <!-- Tab: Miembros Actuales -->
          <div v-if="activeTab === 'current'">
            <div v-if="members.length === 0" class="text-center py-12">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p class="mt-4 text-gray-600">No hay miembros en el grupo</p>
              <p class="text-sm text-gray-500 mt-2">Agrega miembros usando las otras pestañas</p>
            </div>

            <div v-else class="space-y-3">
              <div
                v-for="member in members"
                :key="member.id"
                class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 font-semibold text-lg">
                      {{ getInitials(member.User?.nombre || member.User?.fullName || member.User?.username || member.User?.name) }}
                    </span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ member.User?.nombre || member.User?.fullName || member.User?.username || member.User?.name }}</p>
                    <p class="text-sm text-gray-500">{{ member.User?.correo || member.User?.email }}</p>
                    <p class="text-xs text-gray-400" v-if="member.fechaUnion">Unido: {{ formatDate(member.fechaUnion) }}</p>
                  </div>
                </div>
                <button
                  @click="confirmRemoveMember(member.idUsuario)"
                  class="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition duration-300"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>

          <!-- Tab: Agregar Miembros -->
          <div v-if="activeTab === 'add'">
            <div v-if="loadingUsers" class="text-center py-12">
              <p class="text-gray-600">Cargando usuarios...</p>
            </div>

            <div v-else-if="availableUsers.length === 0" class="text-center py-12">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p class="mt-4 text-gray-600">No hay usuarios disponibles para agregar</p>
              <p class="text-sm text-gray-500 mt-2">Todos los usuarios ya son miembros del grupo</p>
            </div>

            <div v-else>
              <div class="mb-4">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Buscar usuarios por nombre o email..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>

              <div class="space-y-2 max-h-96 overflow-y-auto">
                <div
                  v-for="user in filteredAvailableUsers"
                  :key="user.id"
                  class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span class="text-green-600 font-semibold">{{ getInitials(user.name) }}</span>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">{{ user.name }}</p>
                      <p class="text-sm text-gray-500">{{ user.email }}</p>
                      <p class="text-xs text-gray-400">Rol: {{ user.role }}</p>
                    </div>
                  </div>
                  <button
                    @click="addMemberToGroup(user.id)"
                    :disabled="addingMember"
                    class="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300 disabled:opacity-50"
                  >
                    {{ addingMember ? 'Agregando...' : 'Agregar' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Modal: Editar Grupo -->
    <div v-if="showEditGroupModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-900">Editar Información del Grupo</h3>
            <button @click="showEditGroupModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="submitGroupUpdate" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del Grupo</label>
              <input
                v-model="groupForm.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                v-model="groupForm.description"
                required
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select
                v-model="groupForm.category"
                disabled
                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
              >
                <option value="Musica">Música</option>
                <option value="Teatro">Teatro</option>
                <option value="Danza">Danza</option>
              </select>
              <p class="text-xs text-gray-500 mt-1">
                <svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Solo los administradores pueden cambiar la categoría del grupo
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">URL de Logo</label>
              <input
                v-model="groupForm.image"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://ejemplo.com/logo.jpg"
              >
            </div>

            <div class="flex gap-3 pt-4">
              <button
                type="submit"
                :disabled="savingGroup"
                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
              >
                {{ savingGroup ? 'Guardando...' : 'Actualizar Grupo' }}
              </button>
              <button
                type="button"
                @click="showEditGroupModal = false"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Toast de Notificación -->
    <div
      v-if="notification.show"
      class="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-50 border-l-4"
      :class="{
        'border-green-500': notification.type === 'success',
        'border-red-500': notification.type === 'error',
        'border-blue-500': notification.type === 'info'
      }"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          :class="{
            'bg-green-100': notification.type === 'success',
            'bg-red-100': notification.type === 'error',
            'bg-blue-100': notification.type === 'info'
          }"
        >
          <svg
            v-if="notification.type === 'success'"
            class="w-5 h-5 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <svg
            v-else-if="notification.type === 'error'"
            class="w-5 h-5 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <svg
            v-else
            class="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p class="text-gray-900">{{ notification.message }}</p>
      </div>
    </div>

    <!-- Modal: Ver Mensajes -->
    <div v-if="showMessagesModal" class="modal active" @click.self="showMessagesModal = false">
      <div class="modal-content max-w-4xl max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-2xl font-bold text-gray-900">Mensajes Recibidos</h3>
            <p class="text-sm text-gray-600 mt-1">{{ messages.length }} mensaje(s) - {{ unreadCount }} sin leer</p>
          </div>
          <button 
            @click="showMessagesModal = false"
            class="text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>

        <!-- Filtros -->
        <div class="flex gap-2 mb-4">
          <button
            @click="filterMessagesBy = 'all'"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition duration-300',
              filterMessagesBy === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            Todos
          </button>
          <button
            @click="filterMessagesBy = 'unread'"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition duration-300',
              filterMessagesBy === 'unread' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            No leídos ({{ unreadCount }})
          </button>
          <button
            @click="filterMessagesBy = 'read'"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition duration-300',
              filterMessagesBy === 'read' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            Leídos
          </button>
        </div>

        <!-- Lista de mensajes -->
        <div v-if="loadingMessages" class="text-center py-8">
          <p class="text-gray-600">Cargando mensajes...</p>
        </div>

        <div v-else-if="filteredMessages.length === 0" class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p class="mt-2 text-gray-600">No hay mensajes</p>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="message in filteredMessages"
            :key="message.id"
            @click="viewMessage(message)"
            :class="[
              'p-4 border rounded-lg cursor-pointer transition duration-300',
              message.leido 
                ? 'bg-white border-gray-200 hover:bg-gray-50' 
                : 'bg-blue-50 border-blue-300 hover:bg-blue-100'
            ]"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h4 class="font-semibold text-gray-900">{{ message.nombreRemitente }}</h4>
                  <span v-if="!message.leido" class="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                    Nuevo
                  </span>
                </div>
                <p class="text-sm text-gray-600 mb-2">
                  {{ message.correoRemitente }} • {{ formatDate(message.fechaEnvio, true) }}
                </p>
                <p class="font-medium text-gray-800 mb-1">{{ message.motivo }}</p>
                <p class="text-gray-700 line-clamp-2">{{ message.mensaje }}</p>
              </div>
              <div class="text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Detalle del Mensaje -->
    <div v-if="selectedMessage" class="modal active" @click.self="closeMessageDetail">
      <div class="modal-content max-w-2xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-gray-900">Detalle del Mensaje</h3>
          <button 
            @click="closeMessageDetail"
            class="text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="text-sm font-semibold text-gray-600">De:</label>
            <p class="text-lg text-gray-900">{{ selectedMessage.nombreRemitente }}</p>
          </div>

          <div>
            <label class="text-sm font-semibold text-gray-600">Correo:</label>
            <p class="text-lg text-gray-900">{{ selectedMessage.correoRemitente }}</p>
          </div>

          <div>
            <label class="text-sm font-semibold text-gray-600">Fecha:</label>
            <p class="text-lg text-gray-900">{{ formatDate(selectedMessage.fechaEnvio, true) }}</p>
          </div>

          <div>
            <label class="text-sm font-semibold text-gray-600">Motivo:</label>
            <p class="text-lg font-medium text-gray-900">{{ selectedMessage.motivo }}</p>
          </div>

          <div>
            <label class="text-sm font-semibold text-gray-600">Mensaje:</label>
            <div class="mt-2 p-4 bg-gray-50 rounded-lg">
              <p class="text-gray-900 whitespace-pre-wrap">{{ selectedMessage.mensaje }}</p>
            </div>
          </div>

          <div class="flex gap-3 justify-end pt-4">
            <button
              @click="closeMessageDetail"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Enviar Mensaje a Miembros -->
    <div v-if="showSendMessageModal" class="modal active" @click.self="closeSendMessageModal">
      <div class="modal-content max-w-3xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-gray-900">Enviar Mensaje a Miembros</h3>
          <button 
            @click="closeSendMessageModal"
            class="text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>

        <form @submit.prevent="sendMessageToMembers" class="space-y-6">
          <!-- Selección de Destinatarios -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Destinatarios *
            </label>
            <div class="space-y-2 max-h-60 overflow-y-auto border border-gray-300 rounded-lg p-4">
              <label class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <input
                  type="checkbox"
                  :checked="selectAll"
                  @change="toggleSelectAll"
                  class="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                >
                <span class="font-medium text-gray-900">Seleccionar todos</span>
              </label>
              <hr class="border-gray-200">
              <label 
                v-for="member in members"
                :key="member.id"
                class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  :value="member.idUsuario"
                  v-model="messageForm.destinatarios"
                  class="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                >
                <div class="flex-1">
                  <p class="font-medium text-gray-900">{{ member.User?.fullName || member.User?.username }}</p>
                  <p class="text-xs text-gray-500">{{ member.User?.email }}</p>
                </div>
              </label>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              {{ messageForm.destinatarios.length }} {{ messageForm.destinatarios.length === 1 ? 'miembro seleccionado' : 'miembros seleccionados' }}
            </p>
          </div>

          <!-- Evento Relacionado (Opcional) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Evento Relacionado (opcional)
            </label>
            <select
              v-model="messageForm.idEvento"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option :value="null">Sin evento relacionado</option>
              <option v-for="event in groupEvents" :key="event.id" :value="event.id">
                {{ event.name }} - {{ formatDate(event.date) }}
              </option>
            </select>
            <p class="text-xs text-gray-500 mt-1">
              Si el mensaje está relacionado con un evento, selecciónalo aquí
            </p>
          </div>

          <!-- Asunto -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Asunto *
            </label>
            <input
              type="text"
              v-model="messageForm.asunto"
              required
              minlength="5"
              maxlength="200"
              placeholder="Ej: Recordatorio de presentación próxima"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
          </div>

          <!-- Mensaje -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Mensaje *
            </label>
            <textarea
              v-model="messageForm.mensaje"
              required
              minlength="10"
              rows="6"
              placeholder="Escribe tu mensaje aquí..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
          </div>

          <!-- Botones -->
          <div class="flex gap-3 justify-end pt-4">
            <button
              type="button"
              @click="closeSendMessageModal"
              class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="sendingMessage || messageForm.destinatarios.length === 0"
              class="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ sendingMessage ? 'Enviando...' : 'Enviar Mensaje' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal: Gestionar Solicitudes de Membresía -->
    <div v-if="showRequestsModal" class="modal active" @click.self="closeRequestsModal">
      <div class="modal-content max-w-4xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-2xl font-bold text-gray-900">Solicitudes de Membresía</h3>
            <p class="text-sm text-gray-600 mt-1">{{ myGroup?.nombreGrupo }}</p>
          </div>
          <button
            @click="closeRequestsModal"
            class="text-gray-400 hover:text-gray-600 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Filtros -->
        <div class="flex gap-2 mb-6">
          <button
            v-for="filter in ['todas', 'pendiente', 'aprobada', 'rechazada']"
            :key="filter"
            @click="requestsFilter = filter"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-lg transition duration-300',
              requestsFilter === filter
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            {{ filter === 'todas' ? 'Todas' : filter.charAt(0).toUpperCase() + filter.slice(1) }}
          </button>
        </div>

        <!-- Indicador de carga -->
        <div v-if="loadingRequests" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p class="mt-4 text-gray-600">Cargando solicitudes...</p>
        </div>

        <!-- Sin solicitudes -->
        <div v-else-if="filteredMembershipRequests.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="mt-4 text-gray-600">No hay solicitudes {{ requestsFilter === 'todas' ? '' : requestsFilter + 's' }}</p>
        </div>

        <!-- Lista de solicitudes -->
        <div v-else class="space-y-4">
          <div
            v-for="request in filteredMembershipRequests"
            :key="request.id"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300"
          >
            <div class="flex items-start gap-4">
              <!-- Información del solicitante -->
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h4 class="font-semibold text-lg text-gray-900">{{ request.usuario.nombre }}</h4>
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
                  <span class="font-medium">Correo:</span> {{ request.usuario.correo }}
                </p>
                <p class="text-sm text-gray-600 mb-2">
                  <span class="font-medium">Fecha de solicitud:</span> {{ formatDate(request.fechaSolicitud) }}
                </p>
                <div class="mt-3 p-3 bg-gray-50 rounded border border-gray-200">
                  <p class="text-sm font-medium text-gray-900 mb-1">Motivación:</p>
                  <p class="text-sm text-gray-700">{{ request.motivacion }}</p>
                </div>
                <div v-if="request.experiencia" class="mt-2 p-3 bg-blue-50 rounded border border-blue-200">
                  <p class="text-sm font-medium text-blue-900 mb-1">Experiencia:</p>
                  <p class="text-sm text-blue-700">{{ request.experiencia }}</p>
                </div>
                <div v-if="request.mensajeRespuesta" class="mt-2 p-3 bg-green-50 rounded border border-green-200">
                  <p class="text-sm font-medium text-green-900 mb-1">Tu respuesta:</p>
                  <p class="text-sm text-green-700">{{ request.mensajeRespuesta }}</p>
                </div>
              </div>

              <!-- Acciones (solo para solicitudes pendientes) -->
              <div v-if="request.estado === 'pendiente'" class="flex flex-col gap-2">
                <button
                  @click="openResponseModal(request, 'aprobada')"
                  class="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition duration-300"
                  :disabled="processingRequest === request.id"
                >
                  Aprobar
                </button>
                <button
                  @click="openResponseModal(request, 'rechazada')"
                  class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition duration-300"
                  :disabled="processingRequest === request.id"
                >
                  Rechazar
                </button>
              </div>

              <!-- Botón eliminar (solo para solicitudes ya procesadas) -->
              <div v-else class="flex items-center">
                <button
                  @click="deleteProcessedRequest(request.id)"
                  :disabled="processingRequest === request.id"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-300"
                  title="Eliminar solicitud"
                >
                  <svg v-if="processingRequest !== request.id" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <div v-else class="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Responder Solicitud -->
    <div v-if="showResponseModal" class="modal active" @click.self="closeResponseModal">
      <div class="modal-content max-w-2xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-gray-900">
            {{ responseAction === 'aprobada' ? 'Aprobar' : 'Rechazar' }} Solicitud
          </h3>
          <button
            @click="closeResponseModal"
            class="text-gray-400 hover:text-gray-600 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="submitResponse">
          <div class="mb-4">
            <p class="text-sm text-gray-700 mb-2">
              <span class="font-medium">Solicitante:</span> {{ selectedRequest?.usuario.nombre }}
            </p>
            <p class="text-sm text-gray-700">
              <span class="font-medium">Correo:</span> {{ selectedRequest?.usuario.correo }}
            </p>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Mensaje de respuesta (opcional)
            </label>
            <textarea
              v-model="responseMessage"
              rows="4"
              placeholder="Puedes agregar un mensaje personalizado para el solicitante..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <p class="mt-1 text-sm text-gray-500">
              Este mensaje será visible para el solicitante junto con el estado de su solicitud.
            </p>
          </div>

          <div
            :class="[
              'p-4 rounded-lg mb-6',
              responseAction === 'aprobada'
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            ]"
          >
            <p :class="['text-sm font-medium', responseAction === 'aprobada' ? 'text-green-900' : 'text-red-900']">
              {{ responseAction === 'aprobada' 
                ? '✓ Al aprobar, el usuario se unirá automáticamente a tu grupo cultural.' 
                : '✗ Al rechazar, el usuario será notificado y podrá volver a solicitar unirse en el futuro.'
              }}
            </p>
          </div>

          <div class="flex gap-3 justify-end">
            <button
              type="button"
              @click="closeResponseModal"
              class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
              :disabled="processingRequest !== null"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :class="[
                'px-6 py-2 text-white rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
                responseAction === 'aprobada'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              ]"
              :disabled="processingRequest !== null"
            >
              {{ processingRequest !== null ? 'Procesando...' : (responseAction === 'aprobada' ? 'Aprobar Solicitud' : 'Rechazar Solicitud') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal: Mensajes Recibidos de Usuarios -->
    <div v-if="showReceivedMessagesModal" class="modal active" @click.self="closeReceivedMessagesModal">
      <div class="modal-content max-w-4xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-gray-900">Mensajes Recibidos de Usuarios</h3>
          <button 
            @click="closeReceivedMessagesModal"
            class="text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>

        <!-- Indicador de carga -->
        <div v-if="loadingReceivedMessages" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p class="mt-4 text-gray-600">Cargando mensajes...</p>
        </div>

        <!-- Sin mensajes -->
        <div v-else-if="receivedMessages.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p class="mt-4 text-gray-600">No has recibido mensajes aún</p>
          <p class="text-sm text-gray-500">Los usuarios podrán contactarte desde la página de grupos</p>
        </div>

        <!-- Lista de mensajes -->
        <div v-else class="space-y-4 max-h-96 overflow-y-auto">
          <div
            v-for="message in receivedMessages"
            :key="message.id"
            :class="[
              'border rounded-lg p-4 hover:shadow-md transition duration-300 cursor-pointer',
              !message.leido ? 'border-purple-300 bg-purple-50' : 'border-gray-200 bg-white'
            ]"
            @click="viewReceivedMessage(message)"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h4 class="font-semibold text-lg text-gray-900">{{ message.asunto }}</h4>
                  <span v-if="!message.leido" class="px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">
                    Nuevo
                  </span>
                </div>
                <p class="text-sm text-gray-600 mb-2">
                  <span class="font-medium">De:</span> {{ message.remitente?.nombre }} ({{ message.remitente?.correo }})
                </p>
                <p class="text-sm text-gray-600 mb-2">
                  <span class="font-medium">Fecha:</span> {{ formatDate(message.fechaEnvio) }}
                </p>
                <p class="text-gray-700 line-clamp-2">{{ message.mensaje }}</p>
              </div>
              <svg class="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Detalle del Mensaje Recibido -->
    <div v-if="selectedReceivedMessage" class="modal active" @click.self="closeReceivedMessageDetail">
      <div class="modal-content max-w-2xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-gray-900">{{ selectedReceivedMessage.asunto }}</h3>
          <button 
            @click="closeReceivedMessageDetail"
            class="text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>

        <div class="space-y-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm text-gray-600">
              <span class="font-medium">De:</span> {{ selectedReceivedMessage.remitente?.nombre }}
            </p>
            <p class="text-sm text-gray-600">
              <span class="font-medium">Correo:</span> {{ selectedReceivedMessage.remitente?.correo }}
            </p>
            <p class="text-sm text-gray-600">
              <span class="font-medium">Fecha:</span> {{ formatDate(selectedReceivedMessage.fechaEnvio) }}
            </p>
          </div>

          <div class="bg-white rounded-lg border border-gray-200 p-4">
            <p class="text-gray-800 whitespace-pre-wrap">{{ selectedReceivedMessage.mensaje }}</p>
          </div>

          <div class="flex justify-between pt-4">
            <button
              @click="deleteReceivedMessage(selectedReceivedMessage.id)"
              :disabled="deletingReceivedMessage === selectedReceivedMessage.id"
              class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {{ deletingReceivedMessage === selectedReceivedMessage.id ? 'Eliminando...' : 'Eliminar' }}
            </button>
            <button
              @click="closeReceivedMessageDetail"
              class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Unificado de Mensajes -->
    <div v-if="showUnifiedMessagesModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-gray-900">Centro de Mensajes</h3>
            <button @click="closeUnifiedMessagesModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Tabs -->
          <div class="border-b border-gray-200 mb-6">
            <nav class="-mb-px flex space-x-8">
              <button
                @click="messagesTab = 'admin'"
                :class="[
                  'py-4 px-1 border-b-2 font-medium text-sm relative',
                  messagesTab === 'admin'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                Mensajes del Administrador
                <span v-if="unreadCount > 0" class="absolute -top-1 -right-4 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {{ unreadCount }}
                </span>
              </button>
              <button
                @click="messagesTab = 'users'"
                :class="[
                  'py-4 px-1 border-b-2 font-medium text-sm relative',
                  messagesTab === 'users'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                Mensajes de Usuarios
                <span v-if="unreadUserMessagesCount > 0" class="absolute -top-1 -right-4 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {{ unreadUserMessagesCount }}
                </span>
              </button>
              <button
                @click="messagesTab = 'send'"
                :class="[
                  'py-4 px-1 border-b-2 font-medium text-sm',
                  messagesTab === 'send'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                Enviar Mensaje a Miembros
              </button>
            </nav>
          </div>

          <!-- Contenido de las pestañas -->
          <div class="min-h-[400px]">
            <!-- Pestaña: Mensajes del Administrador -->
            <div v-if="messagesTab === 'admin'">
              <div v-if="loadingMessages" class="text-center py-12">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                <p class="mt-4 text-gray-600">Cargando mensajes...</p>
              </div>

              <div v-else-if="messages.length === 0" class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p class="mt-4 text-gray-600">No hay mensajes del administrador</p>
              </div>

              <div v-else class="space-y-3">
                <div
                  v-for="message in messages"
                  :key="message.id"
                  :class="[
                    'border rounded-lg p-4 hover:shadow-md transition duration-300',
                    !message.leido ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white'
                  ]"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <h4 class="font-semibold text-gray-900">{{ message.motivo }}</h4>
                        <span v-if="!message.leido" class="px-2 py-0.5 bg-green-600 text-white text-xs rounded-full">
                          Nuevo
                        </span>
                      </div>
                      <p class="text-sm text-gray-600 mb-2">
                        <span class="font-medium">De:</span> {{ message.nombreRemitente }} ({{ message.correoRemitente }})
                      </p>
                      <p class="text-sm text-gray-600 mb-2">
                        <span class="font-medium">Fecha:</span> {{ formatDate(message.fechaEnvio) }}
                      </p>
                      <p class="text-gray-700 mt-2">{{ message.mensaje }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pestaña: Mensajes de Usuarios -->
            <div v-if="messagesTab === 'users'">
              <div v-if="loadingReceivedMessages" class="text-center py-12">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                <p class="mt-4 text-gray-600">Cargando mensajes...</p>
              </div>

              <div v-else-if="receivedMessages.length === 0" class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p class="mt-4 text-gray-600">No has recibido mensajes de usuarios</p>
              </div>

              <div v-else class="space-y-3">
                <div
                  v-for="message in receivedMessages"
                  :key="message.id"
                  :class="[
                    'border rounded-lg p-4 hover:shadow-md transition duration-300',
                    !message.leido ? 'border-purple-300 bg-purple-50' : 'border-gray-200 bg-white'
                  ]"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1 cursor-pointer" @click="viewReceivedMessage(message)">
                      <div class="flex items-center gap-3 mb-2">
                        <h4 class="font-semibold text-lg text-gray-900">{{ message.asunto }}</h4>
                        <span v-if="!message.leido" class="px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">
                          Nuevo
                        </span>
                      </div>
                      <p class="text-sm text-gray-600 mb-2">
                        <span class="font-medium">De:</span> {{ message.remitente?.nombre }} ({{ message.remitente?.correo }})
                      </p>
                      <p class="text-sm text-gray-600 mb-2">
                        <span class="font-medium">Fecha:</span> {{ formatDate(message.fechaEnvio) }}
                      </p>
                      <p class="text-gray-700 line-clamp-2">{{ message.mensaje }}</p>
                    </div>
                    <div class="flex items-center gap-2 ml-4">
                      <button
                        @click.stop="deleteReceivedMessage(message.id)"
                        :disabled="deletingReceivedMessage === message.id"
                        class="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-red-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Eliminar mensaje"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <svg class="w-5 h-5 text-gray-400 flex-shrink-0 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" @click="viewReceivedMessage(message)">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pestaña: Enviar Mensaje -->
            <div v-if="messagesTab === 'send'">
              <form @submit.prevent="sendMessageToMembers" class="space-y-4">
                <!-- Destinatarios -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Destinatarios <span class="text-red-500">*</span>
                  </label>
                  <div class="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
                    <div v-if="members.length === 0" class="text-center py-4 text-gray-500 text-sm">
                      No hay miembros en el grupo
                    </div>
                    <label
                      v-else
                      v-for="member in members"
                      :key="member.id || member.idUsuario"
                      class="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        :value="member.idUsuario"
                        v-model="messageForm.destinatarios"
                        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span class="text-sm">
                        {{ member.User?.nombre || member.nombre }} 
                        ({{ member.User?.correo || member.correo }})
                      </span>
                    </label>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ messageForm.destinatarios.length }} seleccionado(s)
                  </p>
                </div>

                <!-- Asunto -->
                <div>
                  <label for="asunto-send" class="block text-sm font-medium text-gray-700 mb-2">
                    Asunto <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="asunto-send"
                    v-model="messageForm.asunto"
                    type="text"
                    required
                    maxlength="200"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ej: Recordatorio de ensayo"
                  />
                </div>

                <!-- Mensaje -->
                <div>
                  <label for="mensaje-send" class="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="mensaje-send"
                    v-model="messageForm.mensaje"
                    required
                    rows="6"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    placeholder="Escribe tu mensaje aquí..."
                  ></textarea>
                </div>

                <!-- Evento relacionado (opcional) -->
                <div>
                  <label for="evento-send" class="block text-sm font-medium text-gray-700 mb-2">
                    Evento Relacionado (Opcional)
                  </label>
                  <select
                    id="evento-send"
                    v-model="messageForm.idEvento"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option :value="null">Sin evento relacionado</option>
                    <option v-for="event in groupEvents" :key="event.id" :value="event.id">
                      {{ event.name }} - {{ formatDate(event.date) }}
                    </option>
                  </select>
                </div>

                <!-- Botones -->
                <div class="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    @click="closeUnifiedMessagesModal"
                    class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    :disabled="sendingMessage"
                    class="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>{{ sendingMessage ? 'Enviando...' : 'Enviar Mensaje' }}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Detalle del Mensaje Recibido (permanece igual) -->
    <div v-if="selectedReceivedMessage" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-gray-900">{{ selectedReceivedMessage.asunto }}</h3>
            <button @click="closeReceivedMessageDetail" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-sm text-gray-600">
                <span class="font-medium">De:</span> {{ selectedReceivedMessage.remitente?.nombre }}
              </p>
              <p class="text-sm text-gray-600">
                <span class="font-medium">Correo:</span> {{ selectedReceivedMessage.remitente?.correo }}
              </p>
              <p class="text-sm text-gray-600">
                <span class="font-medium">Fecha:</span> {{ formatDate(selectedReceivedMessage.fechaEnvio) }}
              </p>
            </div>

            <div class="bg-white rounded-lg border border-gray-200 p-4">
              <p class="text-gray-800 whitespace-pre-wrap">{{ selectedReceivedMessage.mensaje }}</p>
            </div>

            <div class="flex justify-end pt-4">
              <button
                @click="closeReceivedMessageDetail"
                class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { apiService } from '@/services/api'
import type { FrontendGroup, FrontendEvent } from '@/utils/adapters'
import EventCalendar from '@/components/EventCalendar.vue'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

// Estado
const loading = ref(true)
const myGroup = ref<FrontendGroup | null>(null)
const members = ref<any[]>([])
const groupEvents = ref<FrontendEvent[]>([])

// Computed: Eventos para el calendario (solo eventos futuros del grupo del líder)
const calendarEvents = computed(() => {
  if (!groupEvents.value || groupEvents.value.length === 0) return []
  
  const now = new Date()
  
  return groupEvents.value.filter((event: FrontendEvent) => {
    // Crear fecha del evento con su hora
    const eventDateStr = event.date // formato "YYYY-MM-DD"
    const eventTimeStr = event.time || "00:00" // formato "HH:MM"
    const [year, month, day] = eventDateStr.split('-').map(Number)
    const [hours, minutes] = eventTimeStr.split(':').map(Number)
    
    // Crear fecha del evento en hora local
    const eventDateTime = new Date(year, month - 1, day, hours, minutes)
    
    return eventDateTime >= now
  }).map((event: FrontendEvent) => ({
    id: event.id,
    name: event.name,
    date: event.date,
    time: event.time,
    location: event.location,
    category: event.category,
    categoryColor: event.categoryColor
  }))
})

// Modales
const showCreateEventModal = ref(false)
const showMembersModal = ref(false)
const showEditGroupModal = ref(false)
const showMessagesModal = ref(false)
const showSendMessageModal = ref(false)
const showReceivedMessagesModal = ref(false)
const receivedMessages = ref<any[]>([])
const loadingReceivedMessages = ref(false)
const selectedReceivedMessage = ref<any | null>(null)
const unreadUserMessagesCount = ref(0)
const deletingReceivedMessage = ref<number | null>(null)

// Modal unificado de mensajes
const showUnifiedMessagesModal = ref(false)
const messagesTab = ref<'admin' | 'users' | 'send'>('admin') // Pestaña activa

// Formularios
const eventForm = ref({
  name: '',
  description: '',
  date: '',
  time: '',
  location: '',
  image: ''
})

const groupForm = ref({
  name: '',
  description: '',
  category: '',
  image: ''
})

const messageForm = ref({
  destinatarios: [] as number[],
  asunto: '',
  mensaje: '',
  idEvento: null as number | null
})

// Estados de guardado
const savingEvent = ref(false)
const sendingMessage = ref(false)
const savingGroup = ref(false)
const editingEvent = ref<FrontendEvent | null>(null)

// Fecha mínima para eventos (hoy)
const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

// Gestión de miembros
const activeTab = ref('current')
const allUsers = ref<any[]>([])
const loadingUsers = ref(false)
const addingMember = ref(false)
const searchQuery = ref('')

// Notificaciones
const notification = ref({
  show: false,
  message: '',
  type: 'info' as 'success' | 'error' | 'info'
})

// Mensajes
const messages = ref<any[]>([])
const unreadCount = ref(0)
const loadingMessages = ref(false)
const selectedMessage = ref<any>(null)
const filterMessagesBy = ref('all') // 'all', 'unread', 'read'

// Estados para solicitudes de membresía
const membershipRequests = ref<any[]>([])
const loadingRequests = ref(false)
const pendingRequestsCount = ref(0)
const requestsFilter = ref('pendiente') // 'todas', 'pendiente', 'aprobada', 'rechazada'
const showRequestsModal = ref(false)
const showResponseModal = ref(false)
const selectedRequest = ref<any>(null)
const responseAction = ref<'aprobada' | 'rechazada'>('aprobada')
const responseMessage = ref('')
const processingRequest = ref<number | null>(null)

// Computadas
const totalUnreadMessages = computed(() => {
  return unreadCount.value + unreadUserMessagesCount.value
})

const upcomingEvents = computed(() => {
  const now = new Date()
  return groupEvents.value.filter(event => new Date(event.date) >= now)
})

const availableUsers = computed(() => {
  const memberIds = members.value.map(m => m.idUsuario)
  return allUsers.value.filter(u => !memberIds.includes(u.id))
})

const filteredAvailableUsers = computed(() => {
  if (!searchQuery.value) return availableUsers.value
  
  const query = searchQuery.value.toLowerCase()
  return availableUsers.value.filter(u => 
    u.name.toLowerCase().includes(query) ||
    u.email.toLowerCase().includes(query)
  )
})

const filteredMembershipRequests = computed(() => {
  if (requestsFilter.value === 'todas') {
    return membershipRequests.value
  }
  return membershipRequests.value.filter((request: any) => request.estado === requestsFilter.value)
})

// Métodos
const loadData = async () => {
  loading.value = true
  try {
    // Cargar grupo del líder
    if (user.value?.id) {
      console.log('🔍 Buscando grupo para líder ID:', user.value.id)
      const groupResponse = await apiService.getLeaderGroup(user.value.id.toString())
      if (groupResponse.data) {
        myGroup.value = groupResponse.data
        console.log('✅ Grupo encontrado:', myGroup.value.name)

        // Cargar miembros
        const membersResponse = await apiService.getGroupMembers(myGroup.value.id)
        if (membersResponse.data) {
          members.value = membersResponse.data
          console.log('✅ Miembros cargados:', members.value.length)
        }

        // Cargar eventos
        const eventsResponse = await apiService.getGroupEvents(myGroup.value.id)
        if (eventsResponse.data) {
          groupEvents.value = eventsResponse.data
          console.log('✅ Eventos cargados:', groupEvents.value.length)
        }

        // Cargar formulario de grupo
        groupForm.value = {
          name: myGroup.value.name,
          description: myGroup.value.description,
          category: myGroup.value.category,
          image: myGroup.value.image
        }
      } else {
        console.log('⚠️ No se encontró grupo para el líder')
      }
    } else {
      console.log('⚠️ Usuario no tiene ID disponible')
    }
  } catch (error: any) {
    console.error('❌ Error cargando datos:', error)
    showNotification('Error al cargar los datos', 'error')
  } finally {
    loading.value = false
  }
}

const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  notification.value = { show: true, message, type }
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

const getCategoryClass = (category: string) => {
  const baseClasses = 'inline-block px-3 py-1 rounded-full text-white'
  const categoryClasses: Record<string, string> = {
    'Musica': 'bg-blue-600',
    'Música': 'bg-blue-600',
    'Teatro': 'bg-red-600',
    'Danza': 'bg-green-600'
  }
  return `${baseClasses} ${categoryClasses[category] || 'bg-blue-600'}`
}

const formatDate = (date: string | Date, includeTime: boolean = false) => {
  if (!date) return ''
  
  try {
    // Si es una fecha ISO completa (con hora)
    if (typeof date === 'string' && (date.includes('T') || date.includes(' '))) {
      const dateObj = new Date(date)
      
      // Verificar si la fecha es válida
      if (isNaN(dateObj.getTime())) {
        return 'Fecha inválida'
      }
      
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
      
      // Solo agregar hora si se solicita explícitamente
      if (includeTime) {
        options.hour = '2-digit'
        options.minute = '2-digit'
      }
      
      return dateObj.toLocaleDateString('es-ES', options)
    }
    
    // Si es una fecha simple (YYYY-MM-DD) - usada en eventos
    if (typeof date === 'string' && date.includes('-') && !date.includes('T')) {
      const [year, month, day] = date.split('-').map(Number)
      const dateObj = new Date(Date.UTC(year, month - 1, day, 12, 0, 0))
      return dateObj.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
      })
    }
    
    // Si es un objeto Date
    if (date instanceof Date) {
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    // Fallback: intentar crear un objeto Date
    const dateObj = new Date(date)
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    
    return 'Fecha no válida'
  } catch (error) {
    console.error('Error al formatear fecha:', error, date)
    return 'Fecha no válida'
  }
}

const getInitials = (name?: string) => {
  if (!name) return '?'
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

// Gestión de eventos
const closeEventModal = () => {
  showCreateEventModal.value = false
  editingEvent.value = null
  eventForm.value = {
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: ''
  }
}

const editEvent = (event: FrontendEvent) => {
  editingEvent.value = event
  eventForm.value = {
    name: event.name,
    description: event.description,
    date: event.date,
    time: event.time,
    location: event.location,
    image: event.image
  }
  showCreateEventModal.value = true
}

const submitEvent = async () => {
  if (!myGroup.value) return

  // Validar que la fecha no sea pasada
  const eventDate = new Date(eventForm.value.date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  if (eventDate < today) {
    showNotification('La fecha del evento no puede ser anterior a hoy', 'error')
    return
  }

  savingEvent.value = true
  try {
    if (editingEvent.value) {
      // Actualizar evento
      const response = await apiService.updateEvent(editingEvent.value.id, eventForm.value, myGroup.value.id)
      if (response.data) {
        const index = groupEvents.value.findIndex(e => e.id === editingEvent.value!.id)
        if (index !== -1) {
          groupEvents.value[index] = response.data
        }
        showNotification('Evento actualizado correctamente', 'success')
        closeEventModal()
      }
    } else {
      // Crear evento
      const response = await apiService.createEvent(eventForm.value, myGroup.value.id)
      if (response.data) {
        groupEvents.value.push(response.data)
        showNotification('Evento creado correctamente', 'success')
        closeEventModal()
      }
    }
  } catch (error: any) {
    console.error('Error al guardar evento:', error)
    const errorMessage = error.response?.data?.error || error.message || 'Error al guardar el evento'
    showNotification(errorMessage, 'error')
  } finally {
    savingEvent.value = false
  }
}

const deleteEvent = async (eventId: string) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este evento?')) return

  try {
    await apiService.deleteEvent(eventId)
    groupEvents.value = groupEvents.value.filter(e => e.id !== eventId)
    showNotification('Evento eliminado correctamente', 'success')
  } catch (error: any) {
    console.error('Error al eliminar evento:', error)
    showNotification('Error al eliminar el evento', 'error')
  }
}

// Gestión de miembros
const loadUsers = async () => {
  loadingUsers.value = true
  try {
    const response = await apiService.getUsers('usuario')
    if (response.data) {
      allUsers.value = response.data
      console.log('✅ Usuarios cargados:', allUsers.value.length)
    }
  } catch (error: any) {
    console.error('Error al cargar usuarios:', error)
    showNotification('Error al cargar usuarios', 'error')
  } finally {
    loadingUsers.value = false
  }
}

const closeMembersModal = () => {
  showMembersModal.value = false
  activeTab.value = 'current'
  searchQuery.value = ''
}

const confirmRemoveMember = async (userId: string) => {
  if (!myGroup.value) return
  if (!confirm('¿Estás seguro de que deseas eliminar este miembro del grupo?')) return

  try {
    await apiService.removeMember(myGroup.value.id, userId.toString())
    members.value = members.value.filter(m => m.idUsuario !== userId)
    showNotification('Miembro eliminado correctamente', 'success')
    // Recargar usuarios disponibles
    await loadUsers()
  } catch (error: any) {
    console.error('Error al eliminar miembro:', error)
    showNotification('Error al eliminar el miembro', 'error')
  }
}

const addMemberToGroup = async (userId: string) => {
  if (!myGroup.value) return

  addingMember.value = true
  try {
    await apiService.addMemberToGroup(myGroup.value.id, userId.toString(), 'miembro')
    showNotification('Miembro agregado correctamente', 'success')
    
    // Recargar miembros
    const membersResponse = await apiService.getGroupMembers(myGroup.value.id)
    if (membersResponse.data) {
      members.value = membersResponse.data
    }
    
    // Actualizar tab a miembros actuales
    activeTab.value = 'current'
  } catch (error: any) {
    console.error('Error al agregar miembro:', error)
    showNotification(error.response?.data?.error || 'Error al agregar el miembro', 'error')
  } finally {
    addingMember.value = false
  }
}


// Interceptor para cargar usuarios cuando se abre el modal
watch(showMembersModal, async (newValue) => {
  if (newValue && activeTab.value === 'add' && allUsers.value.length === 0) {
    await loadUsers()
  }
})

watch(activeTab, async (newValue) => {
  if (newValue === 'add' && allUsers.value.length === 0) {
    await loadUsers()
  }
})

// Cuando se abre el modal de edición, cargar los datos actuales del grupo
watch(showEditGroupModal, (newValue) => {
  if (newValue && myGroup.value) {
    groupForm.value = {
      name: myGroup.value.name,
      description: myGroup.value.description,
      category: myGroup.value.category,
      image: myGroup.value.image
    }
  }
})

// Gestión de grupo
const submitGroupUpdate = async () => {
  if (!myGroup.value) return

  savingGroup.value = true
  try {
    // Crear una copia del formulario excluyendo la categoría
    // Los líderes culturales no pueden cambiar la categoría
    const { category, ...updateData } = groupForm.value
    
    const response = await apiService.updateGroup(myGroup.value.id, updateData)
    if (response.data) {
      // Actualizar myGroup con los datos del servidor
      myGroup.value = response.data
      
      // Actualizar también el formulario para reflejar los cambios
      groupForm.value = {
        name: response.data.name,
        description: response.data.description,
        category: response.data.category,
        image: response.data.image
      }
      
      showNotification('Grupo actualizado correctamente', 'success')
      showEditGroupModal.value = false
    }
  } catch (error: any) {
    console.error('Error al actualizar grupo:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Error al actualizar el grupo'
    showNotification(errorMessage, 'error')
  } finally {
    savingGroup.value = false
  }
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}

// Gestión de mensajes
const loadMessages = async () => {
  if (!myGroup.value) {
    return
  }
  
  loadingMessages.value = true
  try {
    const [messagesRes, unreadRes] = await Promise.all([
      apiService.getMessagesByGroup(parseInt(myGroup.value.id)),
      apiService.getUnreadCount(parseInt(myGroup.value.id))
    ])
    
    if (messagesRes.data) {
      messages.value = messagesRes.data
    }
    
    if (unreadRes.data) {
      unreadCount.value = unreadRes.data.count
    }
  } catch (error) {
    console.error('Error al cargar mensajes:', error)
    showNotification('Error al cargar mensajes', 'error')
  } finally {
    loadingMessages.value = false
  }
}

const markAsRead = async (messageId: number) => {
  try {
    await apiService.markMessageAsRead(messageId)
    
    // Actualizar el mensaje en la lista local
    const message = messages.value.find(m => m.id === messageId)
    if (message && !message.leido) {
      message.leido = true
      unreadCount.value = Math.max(0, unreadCount.value - 1)
    }
    
    showNotification('Mensaje marcado como leído', 'success')
  } catch (error) {
    console.error('Error al marcar mensaje como leído:', error)
    showNotification('Error al marcar mensaje', 'error')
  }
}

const viewMessage = (message: any) => {
  selectedMessage.value = message
  if (!message.leido) {
    markAsRead(message.id)
  }
}

const closeMessageDetail = () => {
  selectedMessage.value = null
}

// Funciones para enviar mensajes a miembros
const selectAll = computed(() => {
  return members.value.length > 0 && messageForm.value.destinatarios.length === members.value.length
})

const toggleSelectAll = () => {
  if (selectAll.value) {
    messageForm.value.destinatarios = []
  } else {
    messageForm.value.destinatarios = members.value.map(m => m.idUsuario)
  }
}

const closeSendMessageModal = () => {
  showSendMessageModal.value = false
  messageForm.value = {
    destinatarios: [],
    asunto: '',
    mensaje: '',
    idEvento: null
  }
}

// Funciones para mensajes recibidos de usuarios
const loadReceivedMessages = async () => {
  loadingReceivedMessages.value = true
  try {
    const response = await apiService.getMessagesForLeader()
    if (response.data) {
      receivedMessages.value = response.data
      // Contar mensajes no leídos
      unreadUserMessagesCount.value = receivedMessages.value.filter((m: any) => !m.leido).length
    }
  } catch (error: any) {
    console.error('Error al cargar mensajes recibidos:', error)
    showNotification('Error al cargar los mensajes recibidos', 'error')
  } finally {
    loadingReceivedMessages.value = false
  }
}

const closeReceivedMessagesModal = () => {
  showReceivedMessagesModal.value = false
}

const viewReceivedMessage = async (message: any) => {
  selectedReceivedMessage.value = message
  
  // Marcar como leído si no lo está
  if (!message.leido) {
    try {
      await apiService.markUserMessageAsRead(message.id)
      message.leido = true
      unreadUserMessagesCount.value = Math.max(0, unreadUserMessagesCount.value - 1)
    } catch (error) {
      console.error('Error al marcar mensaje como leído:', error)
    }
  }
}

const closeReceivedMessageDetail = () => {
  selectedReceivedMessage.value = null
}

// Función para eliminar mensaje recibido de usuario
const deleteReceivedMessage = async (messageId: number) => {
  const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este mensaje?')
  
  if (!confirmDelete) return

  deletingReceivedMessage.value = messageId
  try {
    await apiService.deleteReceivedUserMessage(messageId)
    
    // Actualizar el contador si el mensaje era no leído
    const messageToDelete = receivedMessages.value.find(m => m.id === messageId)
    if (messageToDelete && !messageToDelete.leido) {
      unreadUserMessagesCount.value = Math.max(0, unreadUserMessagesCount.value - 1)
    }
    
    // Eliminar el mensaje de la lista
    receivedMessages.value = receivedMessages.value.filter(m => m.id !== messageId)
    
    showNotification('Mensaje eliminado exitosamente', 'success')
    
    // Cerrar el detalle si este mensaje estaba abierto
    if (selectedReceivedMessage.value?.id === messageId) {
      selectedReceivedMessage.value = null
    }
  } catch (error: any) {
    console.error('Error al eliminar mensaje:', error)
    showNotification(
      error.response?.data?.message || 'Error al eliminar el mensaje',
      'error'
    )
  } finally {
    deletingReceivedMessage.value = null
  }
}

// Función para abrir el modal unificado de mensajes
const openUnifiedMessagesModal = async () => {
  // Determinar qué pestaña abrir basándose en los mensajes no leídos
  if (unreadUserMessagesCount.value > 0) {
    messagesTab.value = 'users'
  } else if (unreadCount.value > 0) {
    messagesTab.value = 'admin'
  } else {
    messagesTab.value = 'admin' // Por defecto
  }
  
  showUnifiedMessagesModal.value = true
  
  // Cargar mensajes si no están cargados
  if (messages.value.length === 0) {
    await loadMessages()
  }
  if (receivedMessages.value.length === 0) {
    await loadReceivedMessages()
  }
  
  // Debug: mostrar información de miembros
  console.log('📋 Miembros disponibles:', members.value.length)
  if (members.value.length > 0) {
    console.log('📋 Estructura del primer miembro:', members.value[0])
  }
}

const closeUnifiedMessagesModal = () => {
  showUnifiedMessagesModal.value = false
}

const sendMessageToMembers = async () => {
  if (messageForm.value.destinatarios.length === 0) {
    showNotification('Debes seleccionar al menos un destinatario', 'error')
    return
  }

  if (!messageForm.value.asunto || messageForm.value.asunto.length < 5) {
    showNotification('El asunto debe tener al menos 5 caracteres', 'error')
    return
  }

  if (!messageForm.value.mensaje || messageForm.value.mensaje.length < 10) {
    showNotification('El mensaje debe tener al menos 10 caracteres', 'error')
    return
  }

  sendingMessage.value = true

  try {
    const messageData = {
      idGrupo: myGroup.value.id,
      destinatarios: messageForm.value.destinatarios,
      asunto: messageForm.value.asunto,
      mensaje: messageForm.value.mensaje,
      idEvento: messageForm.value.idEvento
    }

    const response = await apiService.sendUserMessage(messageData)

    if (response.data) {
      showNotification(
        `Mensaje enviado exitosamente a ${response.data.count} ${response.data.count === 1 ? 'miembro' : 'miembros'}`,
        'success'
      )
      closeSendMessageModal()
    }
  } catch (error: any) {
    console.error('Error al enviar mensaje:', error)
    const errorMessage = error.message || error.error || 'Error al enviar el mensaje'
    showNotification(errorMessage, 'error')
  } finally {
    sendingMessage.value = false
  }
}

const filteredMessages = computed(() => {
  if (filterMessagesBy.value === 'unread') {
    return messages.value.filter(m => !m.leido)
  } else if (filterMessagesBy.value === 'read') {
    return messages.value.filter(m => m.leido)
  }
  return messages.value
})

// Funciones para gestionar solicitudes de membresía
const loadMembershipRequests = async () => {
  if (!myGroup.value) return
  
  loadingRequests.value = true
  try {
    const response = await apiService.getGroupMembershipRequests(myGroup.value.id)
    if (response.data) {
      membershipRequests.value = response.data
      // Actualizar contador de solicitudes pendientes
      pendingRequestsCount.value = response.data.filter((r: any) => r.estado === 'pendiente').length
    }
  } catch (error: any) {
    console.error('Error al cargar solicitudes:', error)
    showNotification('Error al cargar solicitudes de membresía', 'error')
  } finally {
    loadingRequests.value = false
  }
}

const openResponseModal = (request: any, action: 'aprobada' | 'rechazada') => {
  selectedRequest.value = request
  responseAction.value = action
  responseMessage.value = ''
  showResponseModal.value = true
}

const closeResponseModal = () => {
  showResponseModal.value = false
  selectedRequest.value = null
  responseMessage.value = ''
}

const submitResponse = async () => {
  if (!selectedRequest.value) return
  
  processingRequest.value = selectedRequest.value.id
  try {
    const data = {
      estado: responseAction.value,
      mensajeRespuesta: responseMessage.value.trim() || undefined
    }
    
    await apiService.updateMembershipRequest(selectedRequest.value.id, data)
    
    const action = responseAction.value === 'aprobada' ? 'aprobada' : 'rechazada'
    showNotification(
      `Solicitud ${action} exitosamente`,
      'success'
    )
    
    closeResponseModal()
    await loadMembershipRequests()
    
    // Si se aprobó, recargar miembros
    if (responseAction.value === 'aprobada') {
      const membersResponse = await apiService.getGroupMembers(myGroup.value.id)
      if (membersResponse.data) {
        members.value = membersResponse.data
      }
    }
  } catch (error: any) {
    console.error('Error al procesar solicitud:', error)
    const errorMessage = error.response?.data?.message || error.message || 'Error al procesar la solicitud'
    showNotification(errorMessage, 'error')
  } finally {
    processingRequest.value = null
  }
}

const deleteProcessedRequest = async (requestId: number) => {
  if (!confirm('¿Estás seguro de que deseas eliminar esta solicitud de tu lista?')) {
    return
  }
  
  processingRequest.value = requestId
  try {
    await apiService.deleteProcessedRequestByLeader(requestId)
    showNotification('Solicitud eliminada exitosamente', 'success')
    await loadMembershipRequests()
  } catch (error: any) {
    console.error('Error al eliminar solicitud:', error)
    const errorMessage = error.response?.data?.message || error.message || 'Error al eliminar la solicitud'
    showNotification(errorMessage, 'error')
  } finally {
    processingRequest.value = null
  }
}

const closeRequestsModal = () => {
  showRequestsModal.value = false
  requestsFilter.value = 'pendiente'
}

// Watch para cargar solicitudes cuando se abre el modal
watch(showRequestsModal, async (newValue) => {
  if (newValue && myGroup.value) {
    await loadMembershipRequests()
  }
})

onMounted(async () => {
  await loadData()
  if (authStore.user?.role === 'Lcultural') {
    await loadMessages()
    await loadMembershipRequests()
    await loadReceivedMessages()
  }
})

// Watch para recargar mensajes recibidos cuando se abre el modal
watch(showReceivedMessagesModal, (newValue) => {
  if (newValue) {
    loadReceivedMessages()
  }
})
</script>
