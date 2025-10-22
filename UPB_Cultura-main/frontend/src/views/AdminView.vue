<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Panel de Administrador</h1>
            <p class="text-gray-600 mt-1">Gestión de Grupos Culturales UPB</p>
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

    <!-- Navegación de Páginas Públicas -->
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex items-center justify-center gap-12 py-4">
          <router-link
            to="/eventos"
            class="text-[#5C636E] hover:text-gray-900 font-medium text-base transition duration-200"
          >
            Eventos
          </router-link>
          <router-link
            to="/grupos"
            class="text-[#5C636E] hover:text-gray-900 font-medium text-base transition duration-200"
          >
            Grupos Culturales
          </router-link>
          <router-link
            to="/acerca"
            class="text-[#5C636E] hover:text-gray-900 font-medium text-base transition duration-200"
          >
            Acerca de Nosotros
          </router-link>
          <router-link
            to="/contacto"
            class="text-[#5C636E] hover:text-gray-900 font-medium text-base transition duration-200"
          >
            Contacto
          </router-link>
        </nav>
      </div>
    </div>

    <!-- Estadísticas -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-semibold">Grupos Totales</p>
              <p class="text-3xl font-bold text-blue-700 mt-2">{{ stats.totalGroups }}</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-semibold">Usuarios Activos</p>
              <p class="text-3xl font-bold text-green-700 mt-2">{{ stats.activeUsers }}</p>
            </div>
            <div class="bg-green-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-semibold">Eventos Programados</p>
              <p class="text-3xl font-bold text-purple-700 mt-2">{{ stats.scheduledEvents }}</p>
            </div>
            <div class="bg-purple-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Funcionalidades -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <router-link
          to="/grupos"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
        >
          <div class="flex items-center gap-4">
            <div class="bg-blue-100 p-3 rounded-lg">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Gestionar Grupos</h3>
              <p class="text-sm text-gray-600">Ver y administrar grupos culturales</p>
            </div>
          </div>
        </router-link>

        <button
          @click="openCreateGroupModal"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 text-left"
        >
          <div class="flex items-center gap-4">
            <div class="bg-cyan-100 p-3 rounded-lg">
              <svg class="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Crear Grupo Cultural</h3>
              <p class="text-sm text-gray-600">Agregar un nuevo grupo al sistema</p>
            </div>
          </div>
        </button>

        <router-link
          to="/eventos-gestion"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
        >
          <div class="flex items-center gap-4">
            <div class="bg-green-100 p-3 rounded-lg">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Gestionar Eventos</h3>
              <p class="text-sm text-gray-600">Crear y editar eventos</p>
            </div>
          </div>
        </router-link>

        <button
          @click="openManageUsersModal"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 text-left"
        >
          <div class="flex items-center gap-4">
            <div class="bg-teal-100 p-3 rounded-lg">
              <svg class="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Gestionar Usuarios</h3>
              <p class="text-sm text-gray-600">Ver y editar información de usuarios</p>
            </div>
          </div>
        </button>

        <button
          @click="showCreateUserModal = true"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 text-left"
        >
          <div class="flex items-center gap-4">
            <div class="bg-indigo-100 p-3 rounded-lg">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Crear Usuario</h3>
              <p class="text-sm text-gray-600">Agregar nuevos usuarios al sistema</p>
            </div>
          </div>
        </button>

        <button
          @click="openCreateLeaderModal"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 text-left"
        >
          <div class="flex items-center gap-4">
            <div class="bg-yellow-100 p-3 rounded-lg">
              <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Crear Líder Cultural</h3>
              <p class="text-sm text-gray-600">Agregar líder para grupos culturales</p>
            </div>
          </div>
        </button>

        <router-link
          to="/reportes"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
        >
          <div class="flex items-center gap-4">
            <div class="bg-purple-100 p-3 rounded-lg">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Reportes</h3>
              <p class="text-sm text-gray-600">Ver reportes y estadísticas del sistema</p>
            </div>
          </div>
        </router-link>

        <button
          @click="openSelectGroupModal"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 text-left"
        >
          <div class="flex items-center gap-4">
            <div class="bg-pink-100 p-3 rounded-lg">
              <svg class="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Contactar Líderes</h3>
              <p class="text-sm text-gray-600">Enviar mensajes a líderes culturales</p>
            </div>
          </div>
        </button>
      </div>

      <!-- Calendario de Eventos -->
      <div class="mt-8">
        <EventCalendar
          :events="calendarEvents"
          :loading="loadingEvents"
        />
      </div>
    </div>

    <!-- Modal: Crear Usuario -->
    <div v-if="showCreateUserModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-900">Crear Nuevo Usuario</h3>
            <button @click="closeCreateUserModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="createNewUser" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre Completo *</label>
              <input
                v-model="newUserForm.nombre"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ej: Juan Pérez"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico *</label>
              <input
                v-model="newUserForm.correo"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ej: juan.perez@upb.edu.co"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña *</label>
              <input
                v-model="newUserForm.contrasena"
                type="password"
                required
                minlength="6"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Mínimo 6 caracteres"
              >
            </div>

            <div class="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div>
                <p class="text-sm font-semibold text-green-700">Usuario Estándar</p>
                <p class="text-xs text-green-600">Este usuario podrá acceder a las funciones básicas</p>
              </div>
            </div>

            <div class="flex gap-3 pt-4">
              <button
                type="submit"
                :disabled="creatingUser"
                class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-50"
              >
                {{ creatingUser ? 'Creando...' : 'Crear Usuario' }}
              </button>
              <button
                type="button"
                @click="closeCreateUserModal"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal: Crear Líder Cultural -->
    <div v-if="showCreateLeaderModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-900">Crear Nuevo Líder Cultural</h3>
            <button @click="closeCreateLeaderModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="createNewLeader" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre Completo *</label>
              <input
                v-model="newLeaderForm.nombre"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Ej: María García"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico *</label>
              <input
                v-model="newLeaderForm.correo"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Ej: maria.garcia@upb.edu.co"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña *</label>
              <input
                v-model="newLeaderForm.contrasena"
                type="password"
                required
                minlength="6"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Mínimo 6 caracteres"
              >
            </div>

            <div class="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <div>
                <p class="text-sm font-semibold text-yellow-700">Líder Cultural</p>
                <p class="text-xs text-yellow-600">Este usuario podrá gestionar un grupo cultural</p>
              </div>
            </div>

            <div class="flex gap-3 pt-4">
              <button
                type="submit"
                :disabled="creatingLeader"
                class="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-300 disabled:opacity-50"
              >
                {{ creatingLeader ? 'Creando...' : 'Crear Líder Cultural' }}
              </button>
              <button
                type="button"
                @click="closeCreateLeaderModal"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal: Crear Grupo Cultural -->
    <div v-if="showCreateGroupModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-900">Crear Nuevo Grupo Cultural</h3>
            <button @click="closeCreateGroupModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="createNewGroup" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del Grupo *</label>
              <input
                v-model="newGroupForm.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Ej: Coro UPB Bucaramanga"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
              <textarea
                v-model="newGroupForm.description"
                required
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Describe las actividades y propósito del grupo cultural"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
              <select
                v-model="newGroupForm.category"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">Selecciona una categoría</option>
                <option value="Musica">Música</option>
                <option value="Teatro">Teatro</option>
                <option value="Danza">Danza</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Líder del Grupo *</label>
              <select
                v-model="newGroupForm.leaderId"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">Selecciona un líder</option>
                <option v-for="leader in availableLeaders" :key="leader.id" :value="leader.id">
                  {{ leader.name }} ({{ leader.email }})
                </option>
              </select>
              <p class="text-xs text-gray-500 mt-1">
                Selecciona un usuario con rol "Líder Cultural"
                <button
                  type="button"
                  @click="loadLeaders"
                  class="text-cyan-600 hover:text-cyan-700 ml-2"
                >
                  Recargar lista
                </button>
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">URL del Logo (opcional)</label>
              <input
                v-model="newGroupForm.image"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="https://ejemplo.com/logo.png"
              >
              <p class="text-xs text-gray-500 mt-1">URL de la imagen del grupo (si no se proporciona, se usará una por defecto)</p>
            </div>

            <div class="flex items-center gap-2 p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
              <svg class="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-sm text-cyan-700">El grupo será creado y asignado al líder seleccionado</p>
            </div>

            <div class="flex gap-3 pt-4">
              <button
                type="submit"
                :disabled="creatingGroup || !newGroupForm.leaderId"
                class="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition duration-300 disabled:opacity-50"
              >
                {{ creatingGroup ? 'Creando...' : 'Crear Grupo Cultural' }}
              </button>
              <button
                type="button"
                @click="closeCreateGroupModal"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal: Gestionar Usuarios -->
    <div v-if="showManageUsersModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-gray-900">Gestión de Usuarios</h3>
            <button @click="closeManageUsersModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Tabla de usuarios -->
          <div v-if="!editingUser" class="space-y-4">
            <div v-if="loadingUsers" class="text-center py-8">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p class="mt-2 text-gray-600">Cargando usuarios...</p>
            </div>

            <div v-else class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="p-3 font-semibold text-gray-700">ID</th>
                    <th class="p-3 font-semibold text-gray-700">Nombre</th>
                    <th class="p-3 font-semibold text-gray-700">Correo</th>
                    <th class="p-3 font-semibold text-gray-700">Rol</th>
                    <th class="p-3 font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in allUsers" :key="user.id" class="border-b hover:bg-gray-50">
                    <td class="p-3">{{ user.id }}</td>
                    <td class="p-3">{{ user.name }}</td>
                    <td class="p-3">{{ user.email }}</td>
                    <td class="p-3">
                      <span :class="{
                        'bg-red-100 text-red-800': user.role === 'administrador',
                        'bg-blue-100 text-blue-800': user.role === 'Lcultural',
                        'bg-gray-100 text-gray-800': user.role === 'usuario'
                      }" class="px-2 py-1 rounded-full text-xs font-semibold">
                        {{ user.role === 'Lcultural' ? 'Líder Cultural' : user.role === 'administrador' ? 'Administrador' : 'Usuario' }}
                      </span>
                    </td>
                    <td class="p-3">
                      <button
                        @click="openEditUserForm(user)"
                        class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 text-sm"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Formulario de edición -->
          <div v-if="editingUser" class="space-y-4">
            <div class="flex items-center gap-2 mb-4">
              <button @click="cancelEditUser" class="text-gray-600 hover:text-gray-800">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h4 class="text-xl font-semibold text-gray-900">Editar Usuario: {{ editingUser.name }}</h4>
            </div>

            <form @submit.prevent="updateUserInfo" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  v-model="editUserForm.nombre"
                  type="text"
                  placeholder="Nombre completo del usuario"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input
                  v-model="editUserForm.correo"
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña (dejar en blanco para no cambiar)</label>
                <input
                  v-model="editUserForm.contrasena"
                  type="password"
                  placeholder="(opcional)"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p class="text-xs text-gray-500 mt-1">Solo ingresa una contraseña si deseas cambiarla</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <select
                  v-model="editUserForm.rol"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="usuario">Usuario</option>
                  <option value="Lcultural">Líder Cultural</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>

              <div class="flex gap-4 justify-end pt-4">
                <button
                  type="submit"
                  :disabled="updatingUser"
                  class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {{ updatingUser ? 'Guardando...' : 'Guardar Cambios' }}
                </button>
                <button
                  type="button"
                  @click="cancelEditUser"
                  class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Seleccionar Grupo para Contactar -->
    <div v-if="showSelectGroupModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-gray-900">Selecciona un Grupo Cultural</h3>
            <button @click="closeSelectGroupModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div v-if="loadingGroups" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p class="mt-2 text-gray-600">Cargando grupos...</p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="group in allGroups"
              :key="group.id"
              @click="selectGroupForContact(group)"
              class="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition duration-300"
            >
              <div class="flex items-center gap-4">
                <img
                  :src="group.image || 'https://via.placeholder.com/80'"
                  :alt="group.name"
                  class="w-16 h-16 rounded-lg object-cover"
                />
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900 text-lg">{{ group.name }}</h4>
                  <p class="text-sm text-gray-600">{{ group.category }}</p>
                  <p class="text-sm text-gray-500">Líder: {{ group.director || 'No asignado' }}</p>
                </div>
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            <div v-if="allGroups.length === 0" class="text-center py-8">
              <p class="text-gray-500">No hay grupos culturales disponibles</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Contactar Líder del Grupo -->
    <ContactGroupModal
      v-if="showContactLeaderModal && selectedGroupForContact"
      :group-id="selectedGroupForContact.id"
      :group-name="selectedGroupForContact.name"
      @close="closeContactLeaderModal"
      @success="handleMessageSent"
    />

    <!-- Notificación -->
    <div v-if="notification.show" class="fixed bottom-4 right-4 z-50">
      <div
        :class="{
          'bg-green-500': notification.type === 'success',
          'bg-red-500': notification.type === 'error',
          'bg-blue-500': notification.type === 'info'
        }"
        class="text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3"
      >
        <svg v-if="notification.type === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-if="notification.type === 'error'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <svg v-if="notification.type === 'info'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ notification.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { apiService } from '@/services/api'
import EventCalendar from '@/components/EventCalendar.vue'
import ContactGroupModal from '@/components/ContactGroupModal.vue'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const stats = ref({
  totalGroups: 0,
  activeUsers: 0,
  scheduledEvents: 0
})

const allEvents = ref<any[]>([])
const loadingEvents = ref(false)

// Computed: Eventos para el calendario (TODOS los eventos incluyendo históricos)
// Los administradores pueden ver el historial completo de eventos
const calendarEvents = computed(() => {
  if (!allEvents.value || allEvents.value.length === 0) return []
  
  return allEvents.value.map((event: any) => ({
    id: event.id,
    name: event.name,
    date: event.date,
    time: event.time,
    location: event.location,
    category: event.category,
    categoryColor: event.categoryColor
  }))
})

// Cargar estadísticas
const loadStats = async () => {
  try {
    const response = await apiService.getStats()
    if (response.data) {
      stats.value = response.data
    }
  } catch (error: any) {
    console.error('Error al cargar estadísticas:', error)
  }
}

// Cargar eventos
const loadEvents = async () => {
  loadingEvents.value = true
  try {
    const response = await apiService.getEvents({})
    if (response.data && Array.isArray(response.data)) {
      allEvents.value = response.data
    }
  } catch (error: any) {
    console.error('Error al cargar eventos:', error)
  } finally {
    loadingEvents.value = false
  }
}

// Cargar datos al montar el componente
onMounted(() => {
  loadStats()
  loadEvents()
})

// Modal de creación de usuarios
const showCreateUserModal = ref(false)
const creatingUser = ref(false)
const newUserForm = ref({
  nombre: '',
  correo: '',
  contrasena: '',
  rol: 'usuario'
})

// Modal de creación de líderes culturales
const showCreateLeaderModal = ref(false)
const creatingLeader = ref(false)
const newLeaderForm = ref({
  nombre: '',
  correo: '',
  contrasena: ''
})

// Modal de creación de grupos
const showCreateGroupModal = ref(false)
const creatingGroup = ref(false)
const newGroupForm = ref({
  name: '',
  description: '',
  category: '',
  leaderId: '',
  image: ''
})
const availableLeaders = ref<Array<{ id: number; name: string; email: string }>>([])

// Notificación
const notification = ref({
  show: false,
  message: '',
  type: 'info' as 'success' | 'error' | 'info'
})

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}

const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  notification.value = { show: true, message, type }
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

const closeCreateUserModal = () => {
  showCreateUserModal.value = false
  newUserForm.value = {
    nombre: '',
    correo: '',
    contrasena: '',
    rol: 'usuario'
  }
}

const createNewUser = async () => {
  if (!newUserForm.value.nombre || !newUserForm.value.correo || !newUserForm.value.contrasena) {
    showNotification('Por favor completa todos los campos', 'error')
    return
  }
  
  if (newUserForm.value.contrasena.length < 6) {
    showNotification('La contraseña debe tener al menos 6 caracteres', 'error')
    return
  }

  creatingUser.value = true
  try {
    const response = await apiService.createUser(newUserForm.value)
    
    if (response.data) {
      showNotification(`Usuario ${response.data.name} creado correctamente`, 'success')
      await loadStats() // Recargar estadísticas
      closeCreateUserModal()
    }
  } catch (error: any) {
    console.error('Error al crear usuario:', error)
    const errorMessage = 
      error.response?.data?.message || 
      error.response?.data?.error || 
      error.message || 
      'Error al crear el usuario'
    showNotification(errorMessage, 'error')
  } finally {
    creatingUser.value = false
  }
}

// Funciones para líderes culturales
const openCreateLeaderModal = () => {
  showCreateLeaderModal.value = true
}

const closeCreateLeaderModal = () => {
  showCreateLeaderModal.value = false
  newLeaderForm.value = {
    nombre: '',
    correo: '',
    contrasena: ''
  }
}

const createNewLeader = async () => {
  if (!newLeaderForm.value.nombre || !newLeaderForm.value.correo || !newLeaderForm.value.contrasena) {
    showNotification('Por favor completa todos los campos', 'error')
    return
  }
  
  if (newLeaderForm.value.contrasena.length < 6) {
    showNotification('La contraseña debe tener al menos 6 caracteres', 'error')
    return
  }

  creatingLeader.value = true
  try {
    const leaderData = {
      nombre: newLeaderForm.value.nombre,
      correo: newLeaderForm.value.correo,
      contrasena: newLeaderForm.value.contrasena,
      rol: 'Lcultural'  // Rol fijo para líder cultural
    }
    
    const response = await apiService.createUser(leaderData)
    
    if (response.data) {
      showNotification(`Líder Cultural "${response.data.name}" creado correctamente`, 'success')
      await loadStats() // Recargar estadísticas
      
      // Actualizar la lista de líderes disponibles si está cargada
      if (availableLeaders.value.length > 0) {
        await loadLeaders()
      }
      
      closeCreateLeaderModal()
    }
  } catch (error: any) {
    console.error('Error al crear líder cultural:', error)
    const errorMessage = 
      error.response?.data?.message || 
      error.response?.data?.error || 
      error.message || 
      'Error al crear el líder cultural'
    showNotification(errorMessage, 'error')
  } finally {
    creatingLeader.value = false
  }
}

// Funciones para gestión de grupos
const loadLeaders = async () => {
  try {
    const response = await apiService.getUsers('Lcultural')
    if (response.data) {
      availableLeaders.value = response.data
    }
  } catch (error: any) {
    console.error('Error al cargar líderes:', error)
    showNotification('Error al cargar la lista de líderes', 'error')
  }
}

const closeCreateGroupModal = () => {
  showCreateGroupModal.value = false
  newGroupForm.value = {
    name: '',
    description: '',
    category: '',
    leaderId: '',
    image: ''
  }
}

const createNewGroup = async () => {
  if (!newGroupForm.value.name || !newGroupForm.value.description || !newGroupForm.value.category || !newGroupForm.value.leaderId) {
    showNotification('Por favor completa todos los campos obligatorios', 'error')
    return
  }

  creatingGroup.value = true
  try {
    const groupData = {
      name: newGroupForm.value.name,
      description: newGroupForm.value.description,
      category: newGroupForm.value.category,
      leaderId: parseInt(newGroupForm.value.leaderId),
      image: newGroupForm.value.image || undefined
    }
    
    const response = await apiService.createGroup(groupData)
    
    if (response.data) {
      showNotification(`Grupo "${response.data.name}" creado correctamente`, 'success')
      await loadStats() // Recargar estadísticas
      closeCreateGroupModal()
    }
  } catch (error: any) {
    console.error('Error al crear grupo:', error)
    // Capturar el mensaje de error de múltiples posibles ubicaciones
    const errorMessage = 
      error.response?.data?.message || 
      error.response?.data?.error || 
      error.message || 
      'Error al crear el grupo'
    showNotification(errorMessage, 'error')
  } finally {
    creatingGroup.value = false
  }
}

// Cargar líderes al abrir el modal
const openCreateGroupModal = async () => {
  showCreateGroupModal.value = true
  if (availableLeaders.value.length === 0) {
    await loadLeaders()
  }
}

// Actualizar la función del botón para cargar líderes automáticamente
// Reemplazar @click="showCreateGroupModal = true" con @click="openCreateGroupModal" en el template

// Gestión de Usuarios
const showManageUsersModal = ref(false)
const loadingUsers = ref(false)
const allUsers = ref<any[]>([])
const editingUser = ref<any | null>(null)
const updatingUser = ref(false)
const editUserForm = ref({
  nombre: '',
  correo: '',
  contrasena: '',
  rol: 'usuario'
})

// Contactar Líderes
const showContactLeaderModal = ref(false)
const showSelectGroupModal = ref(false)
const allGroups = ref<any[]>([])
const selectedGroupForContact = ref<any | null>(null)
const loadingGroups = ref(false)

const openManageUsersModal = async () => {
  showManageUsersModal.value = true
  await loadAllUsers()
}

const closeManageUsersModal = () => {
  showManageUsersModal.value = false
  editingUser.value = null
  editUserForm.value = {
    nombre: '',
    correo: '',
    contrasena: '',
    rol: 'usuario'
  }
}

const loadAllUsers = async () => {
  loadingUsers.value = true
  try {
    const response = await apiService.getUsers()
    if (response.data) {
      allUsers.value = response.data
    }
  } catch (error: any) {
    console.error('Error al cargar usuarios:', error)
    showNotification('Error al cargar la lista de usuarios', 'error')
  } finally {
    loadingUsers.value = false
  }
}

const openEditUserForm = (user: any) => {
  editingUser.value = user
  editUserForm.value = {
    nombre: user.name,
    correo: user.email,
    contrasena: '', // No mostrar la contraseña actual
    rol: user.role
  }
}

const cancelEditUser = () => {
  editingUser.value = null
  editUserForm.value = {
    nombre: '',
    correo: '',
    contrasena: '',
    rol: 'usuario'
  }
}

const updateUserInfo = async () => {
  if (!editingUser.value) return

  // Validar campos
  if (!editUserForm.value.nombre || !editUserForm.value.correo) {
    showNotification('El nombre y correo son obligatorios', 'error')
    return
  }

  // Si se proporciona contraseña, validar longitud
  if (editUserForm.value.contrasena && editUserForm.value.contrasena.length < 6) {
    showNotification('La contraseña debe tener al menos 6 caracteres', 'error')
    return
  }

  updatingUser.value = true
  try {
    // Preparar datos para actualizar (solo enviar campos que cambien)
    const updateData: any = {}
    
    if (editUserForm.value.nombre !== editingUser.value.name) {
      updateData.nombre = editUserForm.value.nombre
    }
    
    if (editUserForm.value.correo !== editingUser.value.email) {
      updateData.correo = editUserForm.value.correo
    }
    
    if (editUserForm.value.contrasena && editUserForm.value.contrasena.trim() !== '') {
      updateData.contrasena = editUserForm.value.contrasena
    }
    
    if (editUserForm.value.rol !== editingUser.value.role) {
      updateData.rol = editUserForm.value.rol
    }

    // Si no hay cambios, mostrar mensaje
    if (Object.keys(updateData).length === 0) {
      showNotification('No hay cambios para guardar', 'info')
      cancelEditUser()
      return
    }

    const response = await apiService.updateUser(editingUser.value.id, updateData)
    
    if (response.data) {
      showNotification(`Usuario ${response.data.name} actualizado correctamente`, 'success')
      
      // Recargar la lista de usuarios
      await loadAllUsers()
      
      // Limpiar formulario de edición
      cancelEditUser()
      
      // Recargar estadísticas si el rol cambió
      if (updateData.rol) {
        await loadStats()
      }
    }
  } catch (error: any) {
    console.error('Error al actualizar usuario:', error)
    const errorMessage = 
      error.response?.data?.message || 
      error.response?.data?.error || 
      error.message || 
      'Error al actualizar el usuario'
    showNotification(errorMessage, 'error')
  } finally {
    updatingUser.value = false
  }
}

// Funciones para contactar líderes
const openSelectGroupModal = async () => {
  showSelectGroupModal.value = true
  await loadAllGroups()
}

const closeSelectGroupModal = () => {
  showSelectGroupModal.value = false
  selectedGroupForContact.value = null
}

const loadAllGroups = async () => {
  loadingGroups.value = true
  try {
    const response = await apiService.getGroups({})
    if (response.data) {
      allGroups.value = response.data
    }
  } catch (error: any) {
    console.error('Error al cargar grupos:', error)
    showNotification('Error al cargar la lista de grupos', 'error')
  } finally {
    loadingGroups.value = false
  }
}

const selectGroupForContact = (group: any) => {
  selectedGroupForContact.value = group
  showSelectGroupModal.value = false
  showContactLeaderModal.value = true
}

const closeContactLeaderModal = () => {
  showContactLeaderModal.value = false
  selectedGroupForContact.value = null
}

const handleMessageSent = () => {
  showNotification('Mensaje enviado exitosamente al líder cultural', 'success')
  closeContactLeaderModal()
}
</script>







