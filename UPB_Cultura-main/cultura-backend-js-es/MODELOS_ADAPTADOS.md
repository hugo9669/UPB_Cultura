# 📊 Modelos Adaptados a la Base de Datos PostgreSQL

## ✅ Resumen de Cambios

Se han adaptado todos los modelos de Sequelize para que funcionen correctamente con las tablas existentes en tu base de datos PostgreSQL.

## 🗄️ Tablas Mapeadas

### 1. **Roles** → `Role`
- **Tabla**: `Roles`
- **Campos**:
  - `ID` (INTEGER, PK, AUTO_INCREMENT)
  - `Nombre_rol` (TEXT)

### 2. **Usuarios** → `User`
- **Tabla**: `Usuarios`
- **Campos**:
  - `ID` (INTEGER, PK, AUTO_INCREMENT)
  - `nombre` (TEXT)
  - `correo` (TEXT, UNIQUE)
  - `contrasena` (TEXT)
  - `Id_rol` (INTEGER, FK → Roles)

### 3. **Grupos_Culturales** → `Group`
- **Tabla**: `Grupos_Culturales `
- **Campos**:
  - `ID` (INTEGER, PK, AUTO_INCREMENT)
  - `nombre_grupo` (TEXT)
  - `descripcion` (TEXT)
  - `Id_lider` (INTEGER, FK → Usuarios)
  - `Id_categoria` (INTEGER, FK → Categorias)
  - `url_logo` (TEXT)

### 4. **Categorias** → `Category`
- **Tabla**: `Categorias`
- **Campos**:
  - `ID` (INTEGER, PK, AUTO_INCREMENT)
  - `nombre_categoria` (TEXT)
  - `descripcion` (TEXT)

### 5. **Miembros_Grupo** → `Membership`
- **Tabla**: `Miembros_Grupo`
- **Campos**:
  - `ID` (INTEGER, PK, AUTO_INCREMENT)
  - `Id_usuario` (INTEGER, FK → Usuarios)
  - `Id_grupo` (INTEGER, FK → Grupos_Culturales)
  - `fecha_union` (DATE)

### 6. **Eventos** → `Event`
- **Tabla**: `Eventos`
- **Campos**:
  - `ID` (INTEGER, PK, AUTO_INCREMENT)
  - `titulo` (TEXT)
  - `descripcion` (TEXT)
  - `fecha_evento` (TIMESTAMP)
  - `ubicacion` (TEXT)
  - `Id_grupo` (INTEGER, FK → Grupos_Culturales)
  - `enlaca_boleteria` (TEXT)
  - `url_imagen` (TEXT)

### 7. **Publicaciones** → `Publication`
- **Tabla**: `Publicaciones`
- **Campos**:
  - `ID` (INTEGER, PK, AUTO_INCREMENT)
  - `titulo` (TEXT)
  - `contenido` (TEXT)
  - `fecha_publicacion` (TIMESTAMP)
  - `Id_grupo` (INTEGER, FK → Grupos_Culturales)

### 8. **Repertorios** → `Repertorio`
- **Tabla**: `Repertorios`
- **Campos**:
  - `ID` (INTEGER, PK, AUTO_INCREMENT)
  - `nombre_repertorio` (TEXT)
  - `descripcion` (TEXT)
  - `Id_grupo` (INTEGER, FK → Grupos_Culturales)

### 9. **Comentarios** → `Comment`
- **Tabla**: `Comentarios`
- **Campos**:
  - `ID` (INTEGER, PK, AUTO_INCREMENT)
  - `contenido` (TEXT)
  - `fecha_comentario` (TIMESTAMP)
  - `Id_usuario` (INTEGER, FK → Usuarios)
  - `Id_evento` (INTEGER, FK → Eventos)
  - `Id_publicacion` (INTEGER, FK → Publicaciones)

## 🔗 Relaciones Configuradas

### User ↔ Role
- `User` pertenece a `Role` (a través de `idRol`)
- `Role` tiene muchos `User`

### Group ↔ User (Líder)
- `Group` pertenece a `User` como líder (a través de `idLider`)
- `User` tiene muchos `Group` como líder

### Group ↔ Category
- `Group` pertenece a `Category` (a través de `idCategoria`)
- `Category` tiene muchos `Group`

### Membership (User ↔ Group)
- `Membership` pertenece a `User` (a través de `idUsuario`)
- `Membership` pertenece a `Group` (a través de `idGrupo`)
- `User` tiene muchos `Membership`
- `Group` tiene muchos `Membership`

### Event ↔ Group
- `Event` pertenece a `Group` (a través de `idGrupo`)
- `Group` tiene muchos `Event`

### Publication ↔ Group
- `Publication` pertenece a `Group` (a través de `idGrupo`)
- `Group` tiene muchos `Publication`

### Repertorio ↔ Group
- `Repertorio` pertenece a `Group` (a través de `idGrupo`)
- `Group` tiene muchos `Repertorio`

### Comment
- `Comment` pertenece a `User` (a través de `idUsuario`)
- `Comment` pertenece a `Event` (a través de `idEvento`)
- `Comment` pertenece a `Publication` (a través de `idPublicacion`)

## 📁 Archivos Creados/Modificados

### Modelos Nuevos:
- `src/models/role.js`
- `src/models/category.js`
- `src/models/publication.js`
- `src/models/repertorio.js`
- `src/models/comment.js`

### Modelos Modificados:
- `src/models/user.js` (adaptado a tabla `Usuarios`)
- `src/models/group.js` (adaptado a tabla `Grupos_Culturales`)
- `src/models/membership.js` (adaptado a tabla `Miembros_Grupo`)
- `src/models/event.js` (adaptado a tabla `Eventos`)

### Archivos Actualizados:
- `src/models/index.js` (exporta todos los modelos)
- `src/db/relations.js` (define todas las relaciones)
- `src/db/sequelize.js` (configurado para PostgreSQL)

### Scripts de Utilidad:
- `scripts/testConnection.js` (prueba la conexión a la BD)
- `scripts/checkTablesStructure.js` (muestra la estructura de las tablas)
- `scripts/findGroupsTable.js` (busca tablas por nombre)
- `scripts/testModels.js` (prueba que los modelos funcionen)

## 🧪 Cómo Probar

### 1. Probar la conexión a la base de datos:
```bash
npm run test:db
```

### 2. Probar los modelos:
```bash
npm run test:models
```

### 3. Iniciar el servidor:
```bash
npm run dev
```

## 📊 Estado Actual de la Base de Datos

Según la última prueba, tu base de datos tiene:
- ✅ **3 Roles** (administrador, usuario, Lcultural)
- ✅ **3 Usuarios** (Hugo Hernandez, Felipe cano, cesar rodriguez)
- ✅ **3 Categorias**
- ⚠️ **0 Grupos_Culturales** (vacía)
- ⚠️ **0 Miembros_Grupo** (vacía)
- ⚠️ **0 Eventos** (vacía)
- ⚠️ **0 Publicaciones** (vacía)
- ⚠️ **0 Repertorios** (vacía)
- ⚠️ **0 Comentarios** (vacía)

## 🚀 Próximos Pasos

1. **Crear datos de prueba** usando el script de seed
2. **Adaptar los controladores** para usar los nuevos modelos
3. **Actualizar las rutas** si es necesario
4. **Probar las operaciones CRUD** desde el frontend

## ⚠️ Notas Importantes

1. **Nombres de campos**: Los campos en la base de datos usan `snake_case` (ej: `Id_rol`), pero en los modelos usamos `camelCase` (ej: `idRol`). Sequelize hace la conversión automáticamente.

2. **Tabla con espacio**: La tabla `Grupos_Culturales` tiene un espacio al final en su nombre. Esto está manejado en el modelo.

3. **Timestamps**: Las tablas NO tienen campos `createdAt` y `updatedAt` automáticos. Se configuró `timestamps: false` en todos los modelos.

4. **IDs**: Todos los IDs son INTEGER con AUTO_INCREMENT, no UUID.

## 📝 Ejemplo de Uso

```javascript
import { User, Role, Group } from "./models/index.js";

// Obtener un usuario con su rol
const user = await User.findOne({
  where: { correo: "hugo.hernandezm@upb.edu.co" },
  include: [{ model: Role, as: "rol" }]
});

console.log(user.nombre); // Hugo Hernandez
console.log(user.rol.nombreRol); // usuario

// Obtener un grupo con su categoría
const group = await Group.findOne({
  include: [{ model: Category, as: "categoria" }]
});

console.log(group.nombreGrupo);
console.log(group.categoria.nombreCategoria);
```

## ✅ Validación

Todos los modelos han sido probados y funcionan correctamente:
- ✅ Conexión a PostgreSQL establecida
- ✅ Modelos mapeados correctamente
- ✅ Relaciones configuradas
- ✅ Consultas funcionando
- ✅ Datos existentes accesibles



