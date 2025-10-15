# 🔌 Guía de Configuración de PostgreSQL

## ✅ Cambios Realizados

Ya se modificó el archivo `src/db/sequelize.js` para usar PostgreSQL en lugar de SQLite.

## 📝 Pasos para Conectar tu Base de Datos

### 1️⃣ Crear archivo `.env`

En la carpeta `cultura-backend-js-es`, crea un archivo llamado `.env` (sin extensión).

### 2️⃣ Obtener Credenciales de pgAdmin

#### A. Abrir pgAdmin
1. Abre **pgAdmin 4**
2. Conéctate a tu servidor PostgreSQL

#### B. Obtener información de la Base de Datos
1. En el panel izquierdo, expande **Servers**
2. Expande tu servidor PostgreSQL
3. Expande **Databases**
4. Haz clic derecho en tu base de datos → **Properties**
5. Anota el **Name** (nombre de la base de datos)

#### C. Obtener información del Servidor
1. Haz clic derecho en tu servidor PostgreSQL → **Properties**
2. Ve a la pestaña **Connection**
3. Anota:
   - **Host name/address** (generalmente `localhost`)
   - **Port** (generalmente `5432`)

#### D. Obtener Usuario y Contraseña
- **Username**: Generalmente `postgres` (o el usuario que creaste)
- **Password**: La contraseña que configuraste al instalar PostgreSQL

### 3️⃣ Configurar el archivo `.env`

Copia este contenido en tu archivo `.env` y reemplaza los valores:

```env
# Configuración del Servidor
PORT=4000
NODE_ENV=development

# Configuración de PostgreSQL - ⚠️ MODIFICA ESTOS VALORES
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nombre_de_tu_base_datos
DB_USER=postgres
DB_PASS=tu_contraseña_postgres

# Configuración JWT
JWT_SECRET=dev-secret-change-in-production
JWT_EXPIRES_IN=8h

# Configuración Redis (opcional)
REDIS_URL=redis://localhost:6379

# Configuración OAuth2 (opcional)
OAUTH2_AUTH_URL=
OAUTH2_TOKEN_URL=
OAUTH2_CLIENT_ID=
OAUTH2_CLIENT_SECRET=
OAUTH2_CALLBACK_URL=

# URL del Frontend
FRONT_AFTER_LOGIN_URL=http://localhost:5173/auth/callback

# CORS Origins
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 4️⃣ Probar la Conexión

Abre una terminal en la carpeta `cultura-backend-js-es` y ejecuta:

```bash
npm run test:db
```

Si todo está correcto, verás algo como:

```
🔌 Intentando conectar a la base de datos...
✅ Conexión exitosa a PostgreSQL!

📊 Información de la conexión:
   Host: localhost
   Puerto: 5432
   Base de datos: tu_base_datos
   Usuario: postgres

📋 Tablas en la base de datos:
   1. users
   2. groups
   3. events
   4. memberships
   5. announcements
   6. media
```

### 5️⃣ Iniciar el Servidor

Una vez que la conexión funcione, puedes iniciar el backend:

```bash
npm run dev
```

## ❌ Solución de Problemas

### Error: "connect ECONNREFUSED"
**Causa**: PostgreSQL no está corriendo
**Solución**: 
- Abre **Services** en Windows
- Busca **postgresql-x64-XX** (donde XX es la versión)
- Haz clic derecho → **Start**

### Error: "password authentication failed"
**Causa**: Contraseña incorrecta
**Solución**: Verifica que la contraseña en el archivo `.env` sea correcta

### Error: "database does not exist"
**Causa**: El nombre de la base de datos es incorrecto
**Solución**: Verifica el nombre exacto de tu base de datos en pgAdmin

### Error: "role does not exist"
**Causa**: El usuario no existe
**Solución**: Verifica que el usuario en `.env` exista en PostgreSQL

## 🔍 Verificar Tablas en pgAdmin

1. Abre pgAdmin
2. Conéctate a tu servidor
3. Expande **Databases** → tu base de datos → **Schemas** → **public** → **Tables**
4. Aquí verás todas las tablas de tu base de datos

## 📌 Notas Importantes

- ⚠️ **NUNCA** subas el archivo `.env` a Git (ya está en `.gitignore`)
- 🔒 Mantén tu contraseña de PostgreSQL segura
- 🔄 Si cambias las credenciales, reinicia el servidor backend

## 🚀 Siguiente Paso

Una vez que la conexión funcione correctamente, podrás:
- Ver las tablas de tu base de datos
- Realizar operaciones CRUD desde el backend
- Sincronizar los modelos de Sequelize con tus tablas existentes



