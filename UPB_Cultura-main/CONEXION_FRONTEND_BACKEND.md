# UPB Cultura - Instrucciones de Conexión Frontend-Backend

## Configuración Completada ✅

He configurado exitosamente la conexión entre el frontend (Vue.js) y el backend (Node.js/Express) de tu proyecto UPB Cultura.

### Cambios Realizados

#### Backend (`cultura-backend-js-es/`)
1. **Archivo `.env` creado** con configuración completa:
   - Puerto: 4000
   - CORS configurado para `http://localhost:5173`
   - Variables de base de datos PostgreSQL
   - Configuración JWT
   - URLs del frontend

#### Frontend (`frontend/`)
1. **Servicio API (`src/services/api.ts`)** creado con:
   - Cliente HTTP completo para comunicarse con el backend
   - Manejo de autenticación JWT
   - Métodos para todas las entidades (eventos, grupos, usuarios, etc.)
   - Manejo de errores centralizado

2. **Archivo `.env` creado** con:
   - URL del backend: `http://localhost:4000`
   - Variables de configuración de la aplicación

3. **Stores actualizados**:
   - `auth.ts`: Ahora usa autenticación real con JWT
   - `events.ts`: Conectado con la API de eventos
   - `groups.ts`: Conectado con la API de grupos
   - Fallback a datos locales si hay problemas de conexión

4. **Vistas actualizadas**:
   - `LoginView.vue`: Usa autenticación real
   - `EventsManagementView.vue`: Operaciones CRUD con la API
   - `App.vue`: Inicialización asíncrona de stores

### Cómo Ejecutar el Proyecto

#### 1. Backend
```bash
cd cultura-backend-js-es
npm install
npm run dev
```
El backend estará disponible en: `http://localhost:4000`

#### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
El frontend estará disponible en: `http://localhost:5173`

### Características de la Conexión

#### ✅ Autenticación
- Login/logout con JWT
- Tokens almacenados en localStorage
- Manejo automático de tokens expirados

#### ✅ Operaciones CRUD
- **Eventos**: Crear, leer, actualizar, eliminar
- **Grupos**: Crear, leer, actualizar, eliminar
- **Usuarios**: Autenticación y registro
- **Membresías**: Unirse/salir de grupos
- **Anuncios**: Crear y listar
- **Búsqueda**: Búsqueda global
- **Calendarios**: Exportar eventos

#### ✅ Manejo de Errores
- Mensajes de error amigables
- Fallback a datos locales si el servidor no está disponible
- Manejo de estados de carga
- Notificaciones de éxito/error

#### ✅ CORS Configurado
- El backend permite conexiones desde `http://localhost:5173`
- Configuración flexible para desarrollo y producción

### Estructura de la API

El frontend ahora consume estas rutas del backend:

- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registro de usuarios
- `GET /events` - Listar eventos
- `POST /events` - Crear evento
- `PUT /events/:id` - Actualizar evento
- `DELETE /events/:id` - Eliminar evento
- `GET /groups` - Listar grupos
- `POST /groups` - Crear grupo
- `PUT /groups/:id` - Actualizar grupo
- `DELETE /groups/:id` - Eliminar grupo
- Y muchas más...

### Próximos Pasos Recomendados

1. **Configurar Base de Datos**: Asegúrate de que PostgreSQL esté ejecutándose
2. **Configurar Redis**: Para caché y sesiones (opcional)
3. **Probar Conexión**: Ejecuta ambos servidores y prueba el login
4. **Personalizar**: Ajusta las variables de entorno según tu configuración

### Notas Importantes

- El frontend tiene fallback a datos simulados si el backend no está disponible
- Los tokens JWT se manejan automáticamente
- La configuración es flexible y fácil de modificar
- Compatible con desarrollo y producción

¡La conexión frontend-backend está lista para usar! 🚀
