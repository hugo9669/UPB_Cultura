# 🧭 Navegación por Rol - UPB Cultura

## 📋 Resumen de Cambios

Se ha modificado el header de navegación para mostrar u ocultar elementos según el rol del usuario autenticado.

## 🎯 Comportamiento por Rol

### 👤 Usuario (Hugo Hernandez)
**Navegación Oculta:**
- ❌ Eventos
- ❌ Grupos Culturales
- ❌ Acerca de Nosotros
- ❌ Contacto
- ❌ Dashboard
- ❌ Menú móvil

**Visible:**
- ✅ Logo de UPB Cultura (enlace a home)
- ✅ Botón "Cerrar Sesión"

**Experiencia:**
El usuario regular ve un header minimalista con solo el logo y el botón de cerrar sesión. No tiene acceso a la navegación general del sitio.

---

### 🎭 Líder Cultural (Felipe Cano)
**Navegación Visible:**
- ✅ Eventos
- ✅ Grupos Culturales
- ✅ Acerca de Nosotros
- ✅ Contacto
- ✅ Dashboard
- ✅ Menú móvil
- ✅ Botón "Cerrar Sesión"

**Experiencia:**
El líder cultural tiene acceso completo a toda la navegación del sitio, incluyendo el dashboard.

---

### 👑 Administrador (Cesar Rodriguez)
**Navegación Visible:**
- ✅ Eventos
- ✅ Grupos Culturales
- ✅ Acerca de Nosotros
- ✅ Contacto
- ✅ Dashboard
- ✅ Menú móvil
- ✅ Botón "Cerrar Sesión"

**Experiencia:**
El administrador tiene acceso completo a toda la navegación del sitio, incluyendo el dashboard.

---

## 🔧 Archivos Modificados

### `frontend/src/components/AppHeader.vue`

#### Cambio 1: Navegación Desktop
```vue
<!-- Antes -->
<nav class="hidden md:flex items-center space-x-8">
  <RouterLink to="/eventos">Eventos</RouterLink>
  <!-- ... más enlaces -->
</nav>

<!-- Después -->
<nav v-if="!authStore.isUsuario" class="hidden md:flex items-center space-x-8">
  <RouterLink to="/eventos">Eventos</RouterLink>
  <!-- ... más enlaces -->
</nav>
```

#### Cambio 2: Botón Dashboard
```vue
<!-- Antes -->
<RouterLink to="/dashboard">Dashboard</RouterLink>

<!-- Después -->
<RouterLink 
  v-if="!authStore.isUsuario"
  to="/dashboard"
>
  Dashboard
</RouterLink>
```

#### Cambio 3: Botón Menú Móvil
```vue
<!-- Antes -->
<button @click="toggleMobileMenu" class="md:hidden">
  <!-- Icono -->
</button>

<!-- Después -->
<button 
  v-if="!authStore.isUsuario"
  @click="toggleMobileMenu" 
  class="md:hidden"
>
  <!-- Icono -->
</button>
```

#### Cambio 4: Menú Móvil Desplegable
```vue
<!-- Antes -->
<div v-if="isMobileMenuOpen" class="md:hidden">
  <!-- Enlaces de navegación -->
</div>

<!-- Después -->
<div v-if="isMobileMenuOpen && !authStore.isUsuario" class="md:hidden">
  <!-- Enlaces de navegación -->
</div>
```

---

## 🧪 Cómo Probar

### 1. Iniciar el proyecto
```bash
# Backend
cd cultura-backend-js-es
npm run dev

# Frontend
cd frontend
npm run dev
```

### 2. Probar con Usuario
1. Ir a `http://localhost:5173/login`
2. Iniciar sesión con:
   - Email: `hugo.hernandezm@upb.edu.co`
   - Contraseña: `hahm2006`
3. ✅ **Verificar**: El header solo muestra el logo y "Cerrar Sesión"
4. ✅ **Verificar**: No hay navegación visible (ni escritorio ni móvil)
5. ✅ **Verificar**: No hay botón "Dashboard"

### 3. Probar con Líder Cultural
1. Cerrar sesión
2. Iniciar sesión con:
   - Email: `juan.canon@upb.edu.co`
   - Contraseña: `12345678`
3. ✅ **Verificar**: El header muestra toda la navegación
4. ✅ **Verificar**: Hay botón "Dashboard"
5. ✅ **Verificar**: El menú móvil funciona

### 4. Probar con Administrador
1. Cerrar sesión
2. Iniciar sesión con:
   - Email: `cesar.rodriguez@upb.edu.co`
   - Contraseña: `hola1234`
3. ✅ **Verificar**: El header muestra toda la navegación
4. ✅ **Verificar**: Hay botón "Dashboard"
5. ✅ **Verificar**: El menú móvil funciona

---

## 📱 Vista en Diferentes Dispositivos

### Desktop (> 768px)
- **Usuario**: Solo logo y botón de cerrar sesión
- **Líder/Admin**: Logo + navegación completa + dashboard + cerrar sesión

### Móvil (< 768px)
- **Usuario**: Solo logo y botón de cerrar sesión (sin menú hamburguesa)
- **Líder/Admin**: Logo + menú hamburguesa + dashboard + cerrar sesión

---

## 🔍 Lógica de Ocultación

### Uso de `authStore.isUsuario`
El computed property `isUsuario` del store de autenticación se usa para determinar si el usuario actual tiene el rol "usuario":

```typescript
// En stores/auth.ts
const isUsuario = computed(() => user.value?.role === 'usuario')
```

### Aplicación en el Header
```vue
<!-- Ocultar para usuarios regulares -->
v-if="!authStore.isUsuario"

<!-- Mostrar solo para usuarios regulares -->
v-if="authStore.isUsuario"
```

---

## 💡 Beneficios

1. **Interfaz Limpia**: Los usuarios regulares tienen una interfaz minimalista sin distracciones
2. **Seguridad**: Los usuarios no ven opciones a las que no tienen acceso
3. **UX Mejorada**: Cada rol ve solo lo que necesita
4. **Mantenibilidad**: Fácil de extender o modificar según necesidades futuras

---

## 🚀 Futuras Mejoras

### Posibles Extensiones:
1. **Navegación Personalizada para Usuarios**: Agregar enlaces específicos para usuarios (ej: "Mis Grupos", "Mis Eventos")
2. **Breadcrumbs**: Agregar migas de pan para mejorar la navegación
3. **Notificaciones**: Agregar indicadores de notificaciones en el header
4. **Perfil de Usuario**: Agregar dropdown con opciones de perfil

### Ejemplo de Navegación Personalizada:
```vue
<!-- Para usuarios regulares -->
<nav v-if="authStore.isUsuario" class="hidden md:flex items-center space-x-8">
  <RouterLink to="/mis-grupos">Mis Grupos</RouterLink>
  <RouterLink to="/proximos-eventos">Próximos Eventos</RouterLink>
  <RouterLink to="/mi-perfil">Mi Perfil</RouterLink>
</nav>
```

---

## ✅ Validación

- ✅ Navegación oculta para usuarios regulares
- ✅ Navegación visible para líderes y administradores
- ✅ Dashboard oculto para usuarios regulares
- ✅ Dashboard visible para líderes y administradores
- ✅ Menú móvil oculto para usuarios regulares
- ✅ Menú móvil visible para líderes y administradores
- ✅ Botón de cerrar sesión visible para todos
- ✅ Logo visible para todos

---

## 📝 Notas Importantes

1. **No afecta las rutas**: Los usuarios aún pueden acceder a las rutas si conocen la URL. Para protección completa, asegúrate de que el router guard esté activo.

2. **Solo UI**: Esta implementación solo oculta los elementos de navegación en la UI. La seguridad real está en el backend y en los guards del router.

3. **Responsive**: Los cambios funcionan tanto en desktop como en móvil.

4. **Extensible**: Es fácil agregar más condiciones o personalizar la navegación para cada rol.

