# Configuración del Proyecto UPB Cultura

## Problemas Identificados y Soluciones

### 1. Archivo de configuración de entorno faltante

**Problema**: El backend no tiene un archivo `.env` con las variables de entorno necesarias.

**Solución**: Crear el archivo `.env` en la carpeta `cultura-backend-js-es/` con el siguiente contenido:

```env
# Configuración del servidor
PORT=4000
NODE_ENV=development

# Configuración de la base de datos SQLite (para desarrollo)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cultural_db
DB_USER=postgres
DB_PASS=postgres

# Configuración JWT
JWT_SECRET=dev-secret-key-change-in-production
JWT_EXPIRES_IN=8h

# Configuración Redis (opcional para desarrollo)
REDIS_URL=redis://localhost:6379

# Configuración OAuth2 (placeholder para UPB)
OAUTH2_AUTH_URL=https://example.com/oauth/authorize
OAUTH2_TOKEN_URL=https://example.com/oauth/token
OAUTH2_CLIENT_ID=dev-client
OAUTH2_CLIENT_SECRET=dev-secret
OAUTH2_CALLBACK_URL=http://localhost:4000/auth/oauth2/callback

# URL del frontend después del login
FRONT_AFTER_LOGIN_URL=http://localhost:5173/auth/callback

# Orígenes permitidos para CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 2. Archivo de configuración de entorno para el frontend

**Problema**: El frontend no tiene un archivo `.env` con la URL del backend.

**Solución**: Crear el archivo `.env` en la carpeta `frontend/` con el siguiente contenido:

```env
# URL del backend API
VITE_API_URL=http://localhost:4000

# Configuración de la aplicación
VITE_APP_NAME=UPB Cultura
VITE_APP_VERSION=1.0.0
```

### 3. Problemas corregidos en el código

#### Frontend - Adaptadores de datos
- **Archivo**: `frontend/src/utils/adapters.ts`
- **Problema**: Falta validación de datos requeridos en `adaptEventToBackend`
- **Solución**: Agregada validación para fecha y hora antes de crear eventos

#### Frontend - Servicio API
- **Archivo**: `frontend/src/services/api.ts`
- **Problema**: Método `updateEvent` no manejaba correctamente el `groupId`
- **Solución**: Agregado parámetro opcional `groupId` y mejorado el manejo de datos

## Instrucciones de Instalación y Configuración

### 1. Configurar el Backend

```bash
cd cultura-backend-js-es

# Crear archivo .env (usar el contenido de arriba)
# Las dependencias ya están instaladas según el análisis

# Crear datos de prueba en la base de datos
npm run seed

# Iniciar el servidor de desarrollo
npm run dev
```

### 2. Configurar el Frontend

```bash
cd frontend

# Crear archivo .env (usar el contenido de arriba)
# Las dependencias ya están instaladas según el análisis

# Iniciar el servidor de desarrollo
npm run dev
```

### 3. Credenciales de Prueba

El script de datos de prueba crea los siguientes usuarios:

- **Administrador**: 
  - Email: `admin@upb.edu.co`
  - Contraseña: `admin123`
  - Rol: `admin`

- **Coordinador**: 
  - Email: `coordinator@upb.edu.co`
  - Contraseña: `coord123`
  - Rol: `coordinator`

### 4. Verificar la Funcionalidad

1. **Backend**: Debe estar ejecutándose en `http://localhost:4000`
2. **Frontend**: Debe estar ejecutándose en `http://localhost:5173`
3. **Base de datos**: SQLite se crea automáticamente en `cultura-backend-js-es/database.sqlite`

## Estructura del Proyecto

### Backend (Node.js + Express + Sequelize + SQLite)
- **Autenticación**: JWT + OAuth2 (placeholder para UPB)
- **Base de datos**: SQLite para desarrollo
- **Cache**: Redis (opcional)
- **Validación**: Joi
- **Seguridad**: Helmet, CORS, Rate limiting

### Frontend (Vue 3 + TypeScript + Tailwind CSS)
- **Estado**: Pinia
- **Routing**: Vue Router
- **UI**: Tailwind CSS
- **Build**: Vite
- **Tipos**: TypeScript

## Funcionalidades Implementadas

### Backend
- ✅ Autenticación JWT
- ✅ CRUD de usuarios, grupos, eventos
- ✅ Sistema de membresías
- ✅ Anuncios por grupo
- ✅ Búsqueda y filtrado
- ✅ Calendarios y exportación ICS
- ✅ Dashboard administrativo
- ✅ Subida de archivos multimedia

### Frontend
- ✅ Autenticación y autorización
- ✅ Gestión de eventos
- ✅ Gestión de grupos culturales
- ✅ Dashboard para coordinadores
- ✅ Búsqueda y filtrado
- ✅ Notificaciones
- ✅ Responsive design

## Próximos Pasos

1. **Configurar archivos .env** con el contenido proporcionado
2. **Ejecutar el script de datos de prueba** (`npm run seed`)
3. **Iniciar ambos servidores** (backend y frontend)
4. **Probar la autenticación** con las credenciales de prueba
5. **Verificar la funcionalidad** navegando por la aplicación

## Notas Importantes

- El proyecto usa SQLite para desarrollo, pero está configurado para PostgreSQL en producción
- Redis es opcional para desarrollo pero recomendado para producción
- El sistema OAuth2 está preparado pero necesita configuración real de UPB
- Los datos de prueba incluyen grupos culturales y eventos de ejemplo
