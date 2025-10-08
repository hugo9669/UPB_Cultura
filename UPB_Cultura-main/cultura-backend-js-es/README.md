# Plataforma de Grupos Culturales – Backend

Este es el **backend en Node.js (Express + Sequelize + Passport)** para la gestión de grupos culturales de la UPB.  
Se conecta a una base de datos **PostgreSQL** (manejada por el equipo de Bases) y expone una **API REST** que será consumida por el **Frontend**.  

---

## 🚀 Cómo levantar el backend

1. **Clonar el repo** y entrar a la carpeta.  
2. Copiar el archivo `.env.example` y renombrarlo a `.env`.  
3. Ajustar las variables con la información real que den los equipos de BD y Front.  
4. Instalar dependencias:  
   ```bash
   npm install
   ```  
5. Levantar en modo desarrollo:  
   ```bash
   npm run dev
   ```  
   O en producción:  
   ```bash
   npm start
   ```

---

## 🔑 Variables de entorno (`.env`)

- **Servidor**  
  - `PORT` → Puerto en el que corre el backend (ej: 4000).  
  - `NODE_ENV` → development / production.  

- **Base de Datos (PostgreSQL)** *(equipo de BD debe entregar estos datos)*  
  - `DB_HOST` → Host del servidor PostgreSQL.  
  - `DB_PORT` → Puerto (5432 por defecto).  
  - `DB_NAME` → Nombre de la base de datos.  
  - `DB_USER` → Usuario de conexión.  
  - `DB_PASS` → Contraseña de conexión.  

- **JWT**  
  - `JWT_SECRET` → Clave secreta para firmar tokens.  
  - `JWT_EXPIRES_IN` → Tiempo de vida del token (ej: 8h).  

- **Redis**  
  - `REDIS_URL` → URL del servidor Redis.  

- **OAuth2 / SSO (UPB)** *(equipo de Front/Infra coordina con UPB)*  
  - `OAUTH2_AUTH_URL`, `OAUTH2_TOKEN_URL` → Endpoints del IdP.  
  - `OAUTH2_CLIENT_ID`, `OAUTH2_CLIENT_SECRET` → Credenciales entregadas por UPB.  
  - `OAUTH2_CALLBACK_URL` → Callback al backend (ej: `http://localhost:4000/auth/oauth2/callback`).  

- **Frontend**  
  - `FRONT_AFTER_LOGIN_URL` → A dónde redirige el backend después del login con SSO.  

- **CORS**  
  - `CORS_ORIGINS` → Lista de URLs del frontend autorizadas (ej: `http://localhost:5173`).  

---

## 📡 Conexión con **Base de Datos**
- Los modelos (`src/models/*.js`) ya están definidos en Sequelize.  
- El equipo de BD debe:  
  1. Crear la base PostgreSQL.  
  2. Pasar al equipo backend las credenciales (host, puerto, usuario, pass, nombre).  
  3. Verificar que las tablas se creen/ajusten (pueden usar Sequelize migrations o el script que ellos definan).  

---

## 🎨 Conexión con **Frontend**
- El frontend consumirá directamente los endpoints del backend.  
- Endpoints principales:  
  - **Auth**: `/auth/login`, `/auth/oauth2`, `/auth/oauth2/callback`  
  - **Grupos**: `/groups` (listar, crear, editar, borrar)  
  - **Eventos**: `/events` (listar con filtros, crear, editar, borrar)  
  - **Membresías**: `/memberships`  
  - **Anuncios**: `/announcements`  
  - **Dashboard**: `/admin/dashboard/summary`  
  - **Media**: `/media/upload`  
- El frontend debe enviar `Authorization: Bearer <token>` en las rutas protegidas.  
- Después del login SSO, el backend redirige a `FRONT_AFTER_LOGIN_URL?token=...`.  

---


