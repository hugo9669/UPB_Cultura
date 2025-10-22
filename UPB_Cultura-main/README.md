# UPB Cultura - Plataforma de Gestión Cultural

## Descripción General

**UPB Cultura** es una plataforma web completa para la gestión de grupos culturales de la Universidad Pontificia Bolivariana. Desarrollada con arquitectura moderna de **frontend** (Vue.js 3 + TypeScript) y **backend** (Node.js + Express), conectada a una base de datos PostgreSQL.

## Arquitectura del Sistema

### Frontend (Vue.js 3 + TypeScript)
- **Ubicación**: `frontend/`
- **Puerto**: 5173 (desarrollo)
- **Stack**: Vue.js 3, TypeScript, Tailwind CSS, Vite, Pinia, Vue Router
- **Características**:
  - Interfaz moderna y responsive
  - Carrusel interactivo en página de inicio
  - Sistema de autenticación con roles
  - Dashboard para coordinadores
  - Gestión completa de eventos y grupos
  - Validación en tiempo real
  - Diseño mobile-first

### Backend (Node.js + Express)
- **Ubicación**: `cultura-backend-js-es/`
- **Puerto**: 4000 (desarrollo)
- **Stack**: Node.js, Express, Sequelize, Passport.js, JWT, PostgreSQL
- **Características**:
  - API REST completa
  - Autenticación JWT segura
  - Gestión de usuarios y roles
  - CRUD completo de grupos y eventos
  - Sistema de mensajería
  - Gestión de membresías
  - Reportes y estadísticas

## Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 18+)
- PostgreSQL configurado
- Credenciales de base de datos

### Configuración del Backend

#### 1. Instalar Dependencias
```bash
cd cultura-backend-js-es
npm install
```

#### 2. Configurar Variables de Entorno
```bash
# Copiar plantilla
copy env.remoto.template .env
```

#### 3. Variables de Entorno Requeridas
```env
# Servidor
PORT=4000
NODE_ENV=development

# Base de Datos PostgreSQL
DB_HOST=192.168.X.X
DB_PORT=5432
DB_NAME=cultural_db
DB_USER=postgres
DB_PASS=tu_contraseña

# JWT
JWT_SECRET=dev-secret
JWT_EXPIRES_IN=8h

# Frontend
FRONT_AFTER_LOGIN_URL=http://localhost:5173/auth/callback
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

#### 4. Ejecutar Backend
```bash
npm run dev
```

### Configuración del Frontend

#### 1. Instalar Dependencias
```bash
cd frontend
npm install
```

#### 2. Ejecutar Frontend
```bash
npm run dev
```

#### 3. Acceder a la Aplicación
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000

## Credenciales de Prueba

### Usuario Administrador
- **Email**: `admin@upb.edu.co`
- **Contraseña**: `admin123`

### Roles de Usuario
- **Admin**: Acceso completo al sistema
- **Coordinator**: Gestión de grupos asignados
- **User**: Exploración y participación

## Estructura del Proyecto

```
UPB_Cultura/
├── frontend/                    # Frontend Vue.js
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   │   ├── AppHeader.vue
│   │   │   ├── EventDetailsModal.vue
│   │   │   ├── GroupProfileModal.vue
│   │   │   └── NotificationContainer.vue
│   │   ├── views/             # Vistas de la aplicación
│   │   │   ├── HomeView.vue
│   │   │   ├── EventsView.vue
│   │   │   ├── GroupsView.vue
│   │   │   ├── LoginView.vue
│   │   │   ├── DashboardView.vue
│   │   │   └── AdminView.vue
│   │   ├── stores/            # Gestión de estado (Pinia)
│   │   │   ├── auth.ts
│   │   │   ├── events.ts
│   │   │   └── groups.ts
│   │   ├── composables/       # Lógica reutilizable
│   │   │   ├── useNotifications.ts
│   │   │   ├── useModal.ts
│   │   │   └── useCarousel.ts
│   │   ├── router/           # Configuración de rutas
│   │   ├── services/         # Servicios de API
│   │   └── utils/           # Utilidades
│   └── package.json
├── cultura-backend-js-es/     # Backend Node.js
│   ├── src/
│   │   ├── controllers/      # Controladores de API
│   │   ├── models/           # Modelos de Sequelize
│   │   ├── routes/           # Definición de rutas
│   │   ├── services/         # Lógica de negocio
│   │   ├── utils/            # Utilidades y helpers
│   │   ├── validation/       # Validaciones de entrada
│   │   ├── config/           # Configuración
│   │   └── db/              # Configuración de BD
│   └── package.json
├── README.md                 # Este archivo
└── GUIA_RAPIDA_FELIPE.md     # Guía de inicio rápido
```

## Funcionalidades Principales

### Para Usuarios
- **Exploración de grupos culturales** con perfiles detallados
- **Visualización de eventos** con filtros avanzados
- **Búsqueda en tiempo real** por título, fecha, grupo
- **Solicitud de membresía** a grupos
- **Sistema de mensajería** entre usuarios

### Para Coordinadores
- **Dashboard completo** para gestión de grupos
- **Creación y edición** de eventos culturales
- **Gestión de miembros** y solicitudes
- **Estadísticas** y métricas de eventos
- **Reportes** de actividad del grupo

### Para Administradores
- **Gestión de usuarios** y roles
- **Administración de grupos**
- **Configuración del sistema**
- **Reportes globales** y estadísticas

## API Endpoints

### Autenticación
- `POST /auth/login` - Login de usuario
- `POST /auth/register` - Registro de usuario
- `GET /auth/profile` - Perfil del usuario
- `POST /auth/logout` - Cerrar sesión

### Grupos Culturales
- `GET /groups` - Listar grupos
- `POST /groups` - Crear grupo
- `GET /groups/:id` - Obtener grupo específico
- `PUT /groups/:id` - Actualizar grupo
- `DELETE /groups/:id` - Eliminar grupo

### Eventos
- `GET /events` - Listar eventos
- `POST /events` - Crear evento
- `GET /events/:id` - Obtener evento específico
- `PUT /events/:id` - Actualizar evento
- `DELETE /events/:id` - Eliminar evento

### Membresías y Mensajería
- `GET /memberships` - Listar membresías
- `POST /memberships` - Crear membresía
- `GET /messages` - Listar mensajes
- `POST /messages` - Enviar mensaje

### Dashboard y Reportes
- `GET /admin/dashboard/summary` - Resumen del dashboard
- `GET /reports/events` - Reportes de eventos
- `GET /reports/groups` - Reportes de grupos

## Base de Datos

### Entidades Principales
- **Users** - Usuarios del sistema (admin, coordinator, user)
- **Groups** - Grupos culturales con coordinadores
- **Events** - Eventos culturales con fechas y ubicaciones
- **Memberships** - Membresías de usuarios (pending, approved, rejected)
- **Messages** - Sistema de mensajería entre usuarios
- **Categories** - Categorías de eventos y grupos

## Diseño y UX

### Paleta de Colores
- **Azul UPB**: `#1e40af` (Color principal)
- **Azul Claro**: `#3b82f6` (Acentos)
- **Azul Oscuro**: `#1e3a8a` (Estados hover)
- **Gris**: `#6b7280` (Texto secundario)
- **Gris Claro**: `#f7f9fc` (Fondos)

### Características de Diseño
- **Responsive First**: Mobile-first approach
- **Accesibilidad**: Cumple estándares WCAG 2.1
- **Performance**: Optimizado para velocidad
- **Animaciones**: Transiciones suaves y naturales

### Breakpoints Responsive
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## Comandos Útiles

### Backend
```bash
npm run dev          # Desarrollo con auto-reload
npm start           # Producción
npm run test:db      # Verificar conexión BD
npm run diagnose     # Diagnóstico completo

# Scripts personalizados
node scripts/checkTablesStructure.js
node scripts/createTestData.js
node scripts/checkRemoteAccess.js
```

### Frontend
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construcción para producción
npm run preview      # Vista previa de producción
npm run lint         # Linting del código
npm run type-check   # Verificación de tipos TypeScript
npm run test:unit    # Pruebas unitarias
```

## Solución de Problemas

### Error de Conexión a Base de Datos
**Causa**: No se puede conectar a PostgreSQL
**Solución**:
1. Verificar que PostgreSQL esté corriendo
2. Revisar IP en `DB_HOST`
3. Verificar credenciales en `.env`
4. Contactar administrador de BD

### Error: `Authentication failed`
**Causa**: Credenciales incorrectas
**Solución**:
1. Verificar `DB_USER` y `DB_PASS`
2. Contactar administrador de BD

### Puerto en Uso
**Solución**:
```bash
# Windows PowerShell
netstat -ano | findstr :5173
taskkill /PID [PID] /F

# Para puerto 4000
netstat -ano | findstr :4000
taskkill /PID [PID] /F
```

### Frontend no se conecta al Backend
**Causa**: Backend no está corriendo
**Solución**:
1. Verificar que el backend esté en puerto 4000
2. Revisar configuración de API en `services/api.ts`
3. Verificar variables de entorno
4. Revisar configuración de CORS

### Error de TypeScript
**Causa**: Tipos incorrectos o faltantes
**Solución**:
1. Ejecutar `npm run type-check`
2. Revisar errores en consola
3. Corregir tipos según indicaciones

## Seguridad

### Autenticación
- Passwords hasheados con bcrypt
- Tokens JWT con expiración
- Middleware de autenticación en rutas protegidas

### Validación
- Validación de entrada en todos los endpoints
- Sanitización de datos
- Validación de tipos y formatos

### CORS
- Configuración restrictiva de orígenes
- Headers de seguridad
- Validación de métodos HTTP

## Performance y Optimización

### Frontend
- **Bundle Splitting**: Código dividido por rutas
- **Lazy Loading**: Componentes cargados bajo demanda
- **Image Optimization**: Imágenes optimizadas
- **CSS Purging**: CSS no utilizado eliminado

### Backend
- **Conexión pool** a PostgreSQL
- **Cache con Redis** (opcional)
- **Compresión de respuestas**
- **Paginación** en endpoints de listado

### Métricas Importantes
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.0s

## Testing

### Estrategia de Testing
- **Unit Tests**: Componentes individuales
- **Integration Tests**: Flujos completos
- **E2E Tests**: Experiencia de usuario completa

### Herramientas
- **Vitest**: Framework de testing (Frontend)
- **Vue Test Utils**: Utilidades para testing
- **Testing Library**: Testing centrado en usuario

## Despliegue

### Producción
```bash
# Frontend
npm run build
# Los archivos se generan en dist/

# Backend
npm start
```

### Variables de Entorno de Producción
```env
# Frontend
VITE_APP_TITLE=UPB Cultura
VITE_API_URL=https://api.upb-cultura.com
VITE_APP_VERSION=1.0.0

# Backend
NODE_ENV=production
DB_HOST=production-host
# ... otras variables de producción
```

## Estado del Proyecto

- **Frontend**: Completamente funcional
- **Backend**: API REST completa
- **Base de Datos**: Modelos y relaciones implementados
- **Autenticación**: Sistema JWT implementado
- **UI/UX**: Diseño responsive y moderno

## Flujo de Desarrollo

### Git Workflow
1. **Feature Branch**: Crear rama para nueva funcionalidad
2. **Development**: Desarrollar con hot-reload
3. **Testing**: Ejecutar tests y linting
4. **Build**: Verificar construcción
5. **Deploy**: Desplegar a producción

### Estándares de Código
- **ESLint**: Linting automático
- **Prettier**: Formateo de código
- **TypeScript**: Tipado estricto
- **Conventional Commits**: Mensajes estandarizados
