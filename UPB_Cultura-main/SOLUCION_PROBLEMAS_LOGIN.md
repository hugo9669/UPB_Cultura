# 🔧 Solución de Problemas de Login

## 🚨 Problemas Identificados

### 1. **Backend no está corriendo**
- **Error**: `ERR_CONNECTION_REFUSED` en puerto 4000
- **Causa**: El servidor backend no está iniciado
- **Solución**: Iniciar el backend

### 2. **Botón "Cerrar Sesión" aparece en lugar de "Iniciar Sesión"**
- **Causa**: Datos de autenticación corruptos en localStorage
- **Solución**: Limpiar localStorage y resetear autenticación

## ✅ Soluciones Implementadas

### 🔧 Backend
1. **Variables de entorno verificadas** ✅
2. **Conexión a PostgreSQL funcionando** ✅
3. **Backend iniciado en puerto 4000** ✅

### 🔧 Frontend
1. **Lógica de autenticación mejorada** ✅
2. **Botón de reset temporal agregado** ✅
3. **Validación de datos de usuario** ✅

## 🚀 Pasos para Solucionar

### Paso 1: Iniciar el Backend
```bash
cd UPB_Cultura-main/cultura-backend-js-es
npm run dev
```

**Verificar que aparezca:**
```
🚀 Servidor corriendo en puerto 4000
✅ Conexión a PostgreSQL establecida
```

### Paso 2: Limpiar Autenticación en Frontend

#### Opción A: Usar el botón de reset (recomendado)
1. Abrir `http://localhost:5173`
2. Buscar el botón rojo "🔄 Reset Auth" en la esquina inferior derecha
3. Hacer clic en el botón
4. Confirmar el reset
5. La página se recargará automáticamente

#### Opción B: Limpiar manualmente desde la consola
1. Abrir DevTools (F12)
2. Ir a la pestaña "Console"
3. Ejecutar:
```javascript
localStorage.clear()
location.reload()
```

### Paso 3: Probar el Login
1. Ir a `http://localhost:5173/login`
2. Verificar que aparezca el botón "Iniciar Sesión" (no "Cerrar Sesión")
3. Probar con las credenciales:

**👤 Usuario:**
- Email: `hugo.hernandezm@upb.edu.co`
- Contraseña: `hahm2006`

**🎭 Líder Cultural:**
- Email: `juan.canon@upb.edu.co`
- Contraseña: `12345678`

**👑 Administrador:**
- Email: `cesar.rodriguez@upb.edu.co`
- Contraseña: `hola1234`

## 🔍 Verificaciones

### ✅ Backend Funcionando
- Puerto 4000 accesible
- Sin errores `ERR_CONNECTION_REFUSED`
- Respuesta del servidor en `/auth/login`

### ✅ Frontend Funcionando
- Botón "Iniciar Sesión" visible en landing page
- Login redirige correctamente según el rol
- No hay datos corruptos en localStorage

## 🛠️ Archivos Modificados

### Backend
- ✅ Variables de entorno configuradas
- ✅ Scripts de verificación agregados

### Frontend
- ✅ `stores/auth.ts` - Lógica de autenticación mejorada
- ✅ `App.vue` - Botón de reset temporal agregado
- ✅ `utils/resetAuth.js` - Utilidades para resetear autenticación
- ✅ `components/ResetAuthButton.vue` - Botón de reset

## 🧪 Scripts de Verificación

### Verificar Backend
```bash
cd cultura-backend-js-es
npm run check-env    # Verificar variables de entorno
npm run test:db      # Probar conexión a BD
npm run test:models  # Probar modelos
```

### Verificar Frontend
1. Abrir DevTools
2. Verificar que no hay errores en la consola
3. Verificar que el botón "Iniciar Sesión" aparece
4. Probar login con credenciales válidas

## 🚨 Si Persisten los Problemas

### Backend no inicia
1. Verificar que PostgreSQL esté corriendo
2. Verificar credenciales en `.env`
3. Verificar que el puerto 4000 esté libre

### Frontend muestra "Cerrar Sesión"
1. Usar el botón "🔄 Reset Auth"
2. Limpiar localStorage manualmente
3. Recargar la página

### Login no funciona
1. Verificar que el backend esté corriendo
2. Verificar credenciales en la base de datos
3. Verificar que las contraseñas estén hasheadas

## 📞 Soporte

Si los problemas persisten:
1. Verificar logs del backend en la consola
2. Verificar logs del frontend en DevTools
3. Verificar que todas las dependencias estén instaladas
4. Verificar que la base de datos PostgreSQL esté accesible

## ✅ Estado Final Esperado

- ✅ Backend corriendo en puerto 4000
- ✅ Frontend mostrando "Iniciar Sesión"
- ✅ Login funcionando con redirección por rol
- ✅ Navegación oculta para usuarios regulares
- ✅ Navegación visible para líderes y administradores
