# 🚀 Instrucciones de Ejecución - UPB Cultura Vue.js

## 📋 Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** (viene incluido con Node.js) o **yarn**
- Un navegador web moderno (Chrome, Firefox, Safari, Edge)

## 🛠️ Instalación Rápida

### Opción 1: Instalación Completa (Recomendado)

```bash
# 1. Navegar a la carpeta del proyecto
cd "C:\Users\acer\Desktop\proyecto PATIC1"

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# El proyecto se abrirá automáticamente en http://localhost:5173
```

### Opción 2: Instalación con Yarn

```bash
# 1. Navegar a la carpeta del proyecto
cd "C:\Users\acer\Desktop\proyecto PATIC1"

# 2. Instalar dependencias con Yarn
yarn install

# 3. Iniciar servidor de desarrollo
yarn dev
```

## 🎯 Páginas Disponibles

### Para Usuarios Generales:
- **`/`** - Página principal con carrusel interactivo
- **`/eventos`** - Lista de eventos culturales con búsqueda
- **`/grupos`** - Lista de grupos culturales con filtros
- **`/acerca`** - Información sobre UPB Cultura
- **`/contacto`** - Formulario de contacto con validación

### Para Coordinadores:
- **`/login`** - Sistema de autenticación
- **`/dashboard`** - Panel de control del grupo
- **`/eventos-gestion`** - CRUD completo de eventos

## 🔐 Credenciales de Prueba

Para acceder al área de coordinadores:

- **Email**: `admin@upb.edu.co`
- **Contraseña**: `admin123`

## 🎨 Características del Proyecto

### ✨ Funcionalidades Implementadas:
- **Vue.js 3** con Composition API
- **TypeScript** para tipado estático
- **Tailwind CSS** para estilos modernos
- **Pinia** para gestión de estado
- **Vue Router** para navegación
- **Composables** para lógica reutilizable
- **Carrusel interactivo** con navegación automática
- **Sistema de búsqueda** y filtrado avanzado
- **Autenticación** con validación en tiempo real
- **Dashboard completo** para coordinadores
- **CRUD de eventos** con validaciones
- **Galería de fotos** con drag & drop
- **Formularios inteligentes** con validación
- **Notificaciones toast** interactivas
- **Diseño responsive** para todos los dispositivos
- **Animaciones suaves** y transiciones

### 🛠️ Tecnologías Utilizadas:
- **Vue.js 3** - Framework progresivo
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de construcción
- **Tailwind CSS** - Framework de utilidades
- **Pinia** - Gestión de estado
- **Vue Router** - Enrutamiento
- **ESLint** - Linting de código
- **Vitest** - Testing framework

## 🔧 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo con HMR
npm run build        # Construcción para producción
npm run preview      # Vista previa de la construcción

# Calidad de código
npm run lint         # Ejecutar ESLint
npm run type-check   # Verificación de tipos TypeScript

# Testing (próximamente)
npm run test:unit    # Pruebas unitarias
```

## 📱 Responsive Design

El proyecto se adapta automáticamente a:
- **Mobile** (320px - 767px)
- **Tablet** (768px - 1023px)
- **Desktop** (1024px+)

## 🧩 Arquitectura del Proyecto

### Estructura de Carpetas:
```
src/
├── components/     # Componentes reutilizables
├── views/         # Vistas de la aplicación
├── stores/        # Stores de Pinia
├── composables/   # Lógica reutilizable
├── router/        # Configuración de rutas
├── assets/        # Recursos estáticos
└── main.ts        # Punto de entrada
```

### Patrones Utilizados:
- **Composition API** - Lógica reactiva
- **Pinia Stores** - Estado global
- **Composables** - Lógica compartida
- **TypeScript** - Tipado estático
- **Vue Router** - Navegación declarativa

## 🐛 Solución de Problemas

### Error: "Node.js no encontrado"
```bash
# Instalar Node.js desde https://nodejs.org/
# Verificar instalación
node --version
npm --version
```

### Error: "Puerto 5173 en uso"
```bash
# El servidor automáticamente usará el siguiente puerto disponible
# O puedes especificar un puerto diferente
npm run dev -- --port 3000
```

### Error: "Módulos no encontrados"
```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: "TypeScript errors"
```bash
# Verificar tipos
npm run type-check

# Si hay errores, revisar la configuración de TypeScript
```

## 🚀 Despliegue

### Construcción para Producción:
```bash
# Construir el proyecto
npm run build

# Los archivos se generan en la carpeta dist/
# Desplegar en tu servidor web preferido
```

### Variables de Entorno:
```env
# Crear archivo .env.local
VITE_APP_TITLE=UPB Cultura
VITE_API_URL=https://api.upb-cultura.com
VITE_APP_VERSION=1.0.0
```

## 🧪 Testing

### Ejecutar Pruebas:
```bash
# Pruebas unitarias
npm run test:unit

# Pruebas con cobertura
npm run test:coverage
```

## 📈 Performance

### Optimizaciones Implementadas:
- **Code Splitting** - División de código por rutas
- **Lazy Loading** - Carga diferida de componentes
- **Tree Shaking** - Eliminación de código no utilizado
- **Image Optimization** - Compresión de imágenes
- **Bundle Analysis** - Análisis del tamaño del bundle

## 🔍 Debugging

### Herramientas de Desarrollo:
- **Vue DevTools** - Extensión del navegador
- **Vite DevTools** - Herramientas de desarrollo
- **TypeScript** - Verificación de tipos
- **ESLint** - Linting de código

### Debug en el Navegador:
```javascript
// En la consola del navegador
console.log('Debug info:', window.__VUE_APP__)
```

## 📚 Recursos Adicionales

### Documentación:
- [Vue.js 3 Docs](https://vuejs.org/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Vite Docs](https://vitejs.dev/)
- [Pinia Docs](https://pinia.vuejs.org/)

### Comunidad:
- [Vue.js Discord](https://discord.gg/vue)
- [Vue.js Forum](https://forum.vuejs.org/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/vue.js)

## 🎉 ¡Disfruta explorando UPB Cultura!

Este proyecto demuestra las capacidades de una aplicación web moderna con Vue.js 3, 
ofreciendo una experiencia de usuario excepcional y un código mantenible.

### Próximos Pasos:
1. **Explora las páginas** navegando por el menú
2. **Prueba el login** con las credenciales de prueba
3. **Crea eventos** en el dashboard de coordinadores
4. **Sube fotos** a la galería del grupo
5. **Envía mensajes** desde el formulario de contacto
6. **Experimenta** con las funcionalidades interactivas

---

**Desarrollado con ❤️ para la Universidad Pontificia Bolivariana**

*Conectando arte, cultura y comunidad universitaria* 🎭🎵🎨