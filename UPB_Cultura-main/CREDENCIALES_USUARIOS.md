# 🔐 Credenciales de Usuarios - UPB Cultura

## 📋 Usuarios Disponibles

### 👑 Administrador

**Información:**
- **Nombre:** Cesar Rodriguez
- **Email:** cesar.rodriguez@upb.edu.co
- **Contraseña:** hola1234
- **Rol:** administrador
- **ID en BD:** 571683
- **Id_rol:** 1

**Acceso:**
- Ruta: `/admin`
- Permisos: Acceso completo al sistema
- Funcionalidades: Gestión de grupos, eventos, reportes, etc.

---

### 🎭 Líder Cultural

**Información:**
- **Nombre:** Felipe Cano
- **Email:** juan.canon@upb.edu.co
- **Contraseña:** 12345678
- **Rol:** Lcultural
- **ID en BD:** 523855
- **Id_rol:** 3

**Acceso:**
- Ruta: `/lider`
- Permisos: Gestión de su grupo cultural
- Funcionalidades: Crear eventos, publicaciones, gestionar miembros, etc.

---

### 👤 Usuario

**Información:**
- **Nombre:** Hugo Hernandez
- **Email:** hugo.hernandezm@upb.edu.co
- **Contraseña:** hahm2006
- **Rol:** usuario
- **ID en BD:** 511566
- **Id_rol:** 2

**Acceso:**
- Ruta: `/usuario`
- Permisos: Visualización y participación
- Funcionalidades: Ver grupos, eventos, unirse a grupos, etc.

---

## 🔒 Seguridad

### Contraseñas Hasheadas

Todas las contraseñas en la base de datos están hasheadas con **bcrypt** (10 rounds).

**Ejemplo de hash:**
```
Contraseña original: hola1234
Hash bcrypt: $2a$10$PDrWtQZDKEIkFUurTWAWSeflzyu4NrFfNqeQyA3rVZZUFxYqIv5oq
```

### Script de Hasheo

Para hashear nuevas contraseñas, usa:
```bash
cd cultura-backend-js-es
npm run hash-passwords
```

---

## 🗄️ Estructura en la Base de Datos

### Tabla: Roles

| ID | Nombre_rol |
|----|------------|
| 1  | administrador |
| 2  | usuario |
| 3  | Lcultural |

### Tabla: Usuarios

| ID | nombre | correo | contrasena (hash) | Id_rol |
|----|--------|--------|-------------------|--------|
| 571683 | cesar rodriguez | cesar.rodriguez@upb.edu.co | $2a$10$PDr... | 1 |
| 511566 | Hugo Hernandez | hugo.hernandezm@upb.edu.co | $2a$10$/6b... | 2 |
| 523855 | Felipe cano | juan.canon@upb.edu.co | $2a$10$4fC... | 3 |

---

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

### 3. Probar Login

#### Opción 1: Usuario
```
Email: hugo.hernandezm@upb.edu.co
Contraseña: hahm2006
```
✅ Debería redirigir a `/usuario`

#### Opción 2: Líder Cultural
```
Email: juan.canon@upb.edu.co
Contraseña: 12345678
```
✅ Debería redirigir a `/lider`

#### Opción 3: Administrador
```
Email: cesar.rodriguez@upb.edu.co
Contraseña: hola1234
```
✅ Debería redirigir a `/admin`

---

## 📝 Notas Importantes

1. **Contraseñas en Producción**: Estas contraseñas son solo para desarrollo. En producción, cada usuario debe tener su propia contraseña segura.

2. **Hasheo**: Las contraseñas están hasheadas con bcrypt. Nunca almacenes contraseñas en texto plano.

3. **Roles**: Los roles están definidos en la tabla `Roles` y referenciados en la tabla `Usuarios` mediante `Id_rol`.

4. **Seguridad**: El sistema usa JWT para la autenticación y las contraseñas se comparan usando bcrypt.

---

## 🔄 Actualizar Contraseñas

Si necesitas cambiar una contraseña:

1. Edita el archivo `scripts/hashPasswords.js`
2. Modifica la contraseña en el array `users`
3. Ejecuta: `npm run hash-passwords`

O manualmente en pgAdmin:
```sql
UPDATE "Usuarios"
SET "contrasena" = '$2a$10$NUEVO_HASH_AQUI'
WHERE "ID" = ID_DEL_USUARIO;
```

---

## ✅ Validación

El sistema está completamente funcional con:
- ✅ Contraseñas hasheadas con bcrypt
- ✅ Roles correctamente asignados
- ✅ Redirección automática según rol
- ✅ Protección de rutas por rol
- ✅ Autenticación con JWT



