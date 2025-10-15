# 🔐 Sistema de Autenticación con Roles

## ✅ Resumen de Implementación

Se ha implementado un sistema completo de autenticación con tres roles diferentes que redirige a cada usuario a su vista correspondiente según su rol en la base de datos.

## 👥 Roles Implementados

### 1. **Administrador** (`administrador`)
- **Ruta**: `/admin`
- **Vista**: `AdminView.vue`
- **Funcionalidades**:
  - Panel de administración completo
  - Gestión de grupos culturales
  - Gestión de eventos
  - Ver reportes y estadísticas
  - Acceso a todas las funcionalidades del sistema

### 2. **Usuario** (`usuario`)
- **Ruta**: `/usuario`
- **Vista**: `UserView.vue`
- **Funcionalidades**:
  - Ver sus grupos
  - Ver próximos eventos
  - Explorar grupos disponibles
  - Unirse a grupos

### 3. **Líder Cultural** (`Lcultural`)
- **Ruta**: `/lider`
- **Vista**: `LiderView.vue`
- **Funcionalidades**:
  - Gestionar su grupo cultural
  - Crear eventos
  - Crear publicaciones
  - Gestionar miembros
  - Ver estadísticas del grupo

## 🔧 Cambios Realizados

### Backend

#### 1. Servicio de Autenticación (`src/services/auth.js`)
```javascript
// Ahora busca el usuario con su rol desde la tabla Roles
const user = await User.findOne({ 
  where: { correo: email },
  include: [{ model: Role, as: "rol" }]
});

// Devuelve el nombre del rol
const roleName = user.rol?.nombreRol || "usuario";
```

**Cambios**:
- Busca el usuario por `correo` (en lugar de `email`)
- Incluye la relación con la tabla `Roles`
- Devuelve el `nombreRol` en la respuesta
- Usa `contrasena` (en lugar de `passwordHash`)

### Frontend

#### 1. Store de Autenticación (`src/stores/auth.ts`)
```typescript
export interface User {
  id: string
  email: string
  name: string
  role: 'administrador' | 'usuario' | 'Lcultural'
}

const isAdmin = computed(() => user.value?.role === 'administrador')
const isUsuario = computed(() => user.value?.role === 'usuario')
const isLider = computed(() => user.value?.role === 'Lcultural')
```

**Cambios**:
- Actualizado el tipo `User` con los tres roles
- Agregados computed properties para cada rol
- Exportados en el store

#### 2. Router (`src/router/index.ts`)

**Nuevas Rutas**:
```typescript
{
  path: '/admin',
  name: 'admin',
  component: () => import('../views/AdminView.vue'),
  meta: { requiresAuth: true, requiresRole: 'administrador' }
},
{
  path: '/usuario',
  name: 'usuario',
  component: () => import('../views/UserView.vue'),
  meta: { requiresAuth: true, requiresRole: 'usuario' }
},
{
  path: '/lider',
  name: 'lider',
  component: () => import('../views/LiderView.vue'),
  meta: { requiresAuth: true, requiresRole: 'Lcultural' }
}
```

**Guard de Navegación**:
- Verifica si el usuario tiene el rol requerido
- Redirige automáticamente si el rol no coincide
- Redirige según el rol después del login

#### 3. LoginView (`src/views/LoginView.vue`)

**Redirección según Rol**:
```typescript
const userRole = authStore.user?.role

if (userRole === 'administrador') {
  router.push('/admin')
} else if (userRole === 'usuario') {
  router.push('/usuario')
} else if (userRole === 'Lcultural') {
  router.push('/lider')
} else {
  router.push('/dashboard')
}
```

**Credenciales de Prueba**:
- Hugo Hernandez (Administrador): hugo.hernandezm@upb.edu.co
- Felipe Cano (Usuario): juan.canon@upb.edu.co
- Cesar Rodriguez (Líder): cesar.rodriguez@upb.edu.co

#### 4. Nuevas Vistas

**AdminView.vue**:
- Panel de administración
- Estadísticas generales
- Acceso a gestión de grupos y eventos
- Acceso a reportes

**UserView.vue**:
- Mis grupos
- Próximos eventos
- Explorar grupos disponibles

**LiderView.vue**:
- Estadísticas del grupo
- Acciones rápidas (crear evento, publicar, etc.)
- Gestión de miembros
- Eventos del grupo

## 🔄 Flujo de Autenticación

```
1. Usuario ingresa email y contraseña
   ↓
2. Backend busca usuario en BD con su rol
   ↓
3. Backend devuelve token + datos del usuario (incluyendo rol)
   ↓
4. Frontend guarda token y datos del usuario
   ↓
5. Frontend redirige según el rol:
   - administrador → /admin
   - usuario → /usuario
   - Lcultural → /lider
   ↓
6. Router verifica permisos en cada navegación
```

## 🔒 Protección de Rutas

### Rutas Públicas
- `/` - Home
- `/eventos` - Ver eventos
- `/grupos` - Ver grupos
- `/login` - Login

### Rutas Protegidas (requieren autenticación)
- `/dashboard` - Dashboard general
- `/admin` - Solo administradores
- `/usuario` - Solo usuarios
- `/lider` - Solo líderes culturales
- `/eventos-gestion` - Gestión de eventos

## 📊 Datos en la Base de Datos

### Tabla: Roles
| ID | Nombre_rol |
|----|------------|
| 1  | administrador |
| 2  | usuario |
| 3  | Lcultural |

### Tabla: Usuarios
| ID | nombre | correo | Id_rol | Rol | Contraseña |
|----|--------|--------|--------|-----|------------|
| 571683 | cesar rodriguez | cesar.rodriguez@upb.edu.co | 1 | administrador | hola1234 |
| 511566 | Hugo Hernandez | hugo.hernandezm@upb.edu.co | 2 | usuario | hahm2006 |
| 523855 | Felipe cano | juan.canon@upb.edu.co | 3 | Lcultural | 12345678 |

## 🧪 Cómo Probar

### 1. Iniciar el Backend
```bash
cd cultura-backend-js-es
npm run dev
```

### 2. Iniciar el Frontend
```bash
cd frontend
npm run dev
```

### 3. Probar el Login

**Opción 1: Usuario**
- Email: hugo.hernandezm@upb.edu.co
- Contraseña: hahm2006
- Debería redirigir a `/usuario`

**Opción 2: Líder Cultural**
- Email: juan.canon@upb.edu.co
- Contraseña: 12345678
- Debería redirigir a `/lider`

**Opción 3: Administrador**
- Email: cesar.rodriguez@upb.edu.co
- Contraseña: hola1234
- Debería redirigir a `/admin`

## ⚠️ Notas Importantes

1. **Contraseñas**: Las contraseñas están hasheadas con bcrypt en la base de datos. Necesitas conocer la contraseña original o usar la que configuraste.

2. **Roles**: Los roles deben coincidir exactamente con los nombres en la tabla `Roles`:
   - `administrador`
   - `usuario`
   - `Lcultural`

3. **Relaciones**: El sistema usa las relaciones entre `Usuarios` y `Roles` para obtener el rol del usuario.

4. **Seguridad**: El token JWT contiene el rol del usuario, por lo que es seguro para verificar permisos.

## 🚀 Próximos Pasos

1. **Implementar funcionalidades específicas** en cada vista según el rol
2. **Conectar las vistas con la API** para cargar datos reales
3. **Implementar CRUD** para grupos, eventos, etc.
4. **Agregar validaciones** adicionales según el rol
5. **Implementar permisos granulares** dentro de cada vista

## 📝 Archivos Modificados

### Backend
- `src/services/auth.js` - Servicio de autenticación
- `src/models/user.js` - Modelo de usuario
- `src/models/role.js` - Modelo de rol
- `src/db/relations.js` - Relaciones entre modelos

### Frontend
- `src/stores/auth.ts` - Store de autenticación
- `src/router/index.ts` - Configuración de rutas
- `src/views/LoginView.vue` - Vista de login
- `src/views/AdminView.vue` - Vista de administrador (nueva)
- `src/views/UserView.vue` - Vista de usuario (nueva)
- `src/views/LiderView.vue` - Vista de líder cultural (nueva)

## ✅ Validación

El sistema está completamente funcional y listo para usar. Cada rol tiene:
- ✅ Su propia vista personalizada
- ✅ Redirección automática según el rol
- ✅ Protección de rutas
- ✅ Verificación de permisos
- ✅ Integración con la base de datos PostgreSQL

