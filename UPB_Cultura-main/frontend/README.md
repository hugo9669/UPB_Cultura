# 🎭 UPB Cultura - Frontend Vue.js

Plataforma web moderna para la gestión cultural de la Universidad Pontificia Bolivariana, desarrollada con Vue.js 3, TypeScript y Tailwind CSS.

## ✨ Características

### 🎯 Funcionalidades Principales
- **Página de Inicio**: Carrusel interactivo con información de grupos culturales
- **Gestión de Eventos**: Visualización, búsqueda y filtrado de eventos
- **Grupos Culturales**: Exploración de grupos y sus perfiles detallados
- **Sistema de Autenticación**: Login para coordinadores con validación
- **Dashboard de Coordinadores**: Panel completo para gestión de grupos
- **Gestión de Eventos**: CRUD completo para eventos culturales
- **Formularios Inteligentes**: Validación en tiempo real y UX optimizada
- **Diseño Responsive**: Adaptable a todos los dispositivos
- **Notificaciones**: Sistema de notificaciones toast interactivas

### 🛠️ Stack Tecnológico
- **Vue.js 3** - Framework progresivo de JavaScript
- **TypeScript** - Tipado estático para mayor robustez
- **Vite** - Herramienta de construcción rápida
- **Vue Router** - Enrutamiento del lado del cliente
- **Pinia** - Gestión de estado moderna
- **Tailwind CSS** - Framework de utilidades CSS
- **Composables** - Lógica reutilizable y modular

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# El proyecto se abrirá en http://localhost:5173
```

### Scripts Disponibles
```bash
# Desarrollo
npm run dev          # Servidor de desarrollo con HMR
npm run build        # Construcción para producción
npm run preview      # Vista previa de la construcción

# Calidad de código
npm run lint         # Ejecutar ESLint
npm run type-check   # Verificación de tipos TypeScript

# Testing
npm run test:unit    # Pruebas unitarias con Vitest
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── AppHeader.vue
│   ├── NotificationContainer.vue
│   ├── EventDetailsModal.vue
│   └── GroupProfileModal.vue
├── views/              # Vistas de la aplicación
│   ├── HomeView.vue
│   ├── EventsView.vue
│   ├── GroupsView.vue
│   ├── LoginView.vue
│   ├── DashboardView.vue
│   ├── EventsManagementView.vue
│   ├── AboutView.vue
│   ├── ContactView.vue
│   └── NotFoundView.vue
├── stores/             # Stores de Pinia
│   ├── auth.ts
│   ├── events.ts
│   └── groups.ts
├── composables/        # Composables reutilizables
│   ├── useNotifications.ts
│   ├── useModal.ts
│   └── useCarousel.ts
├── router/             # Configuración de rutas
│   └── index.ts
├── assets/             # Recursos estáticos
│   └── main.css
├── App.vue            # Componente raíz
└── main.ts            # Punto de entrada
```

## 🎨 Diseño y UX

### Paleta de Colores
- **Azul UPB**: `#1e40af` (Color principal)
- **Azul Claro**: `#3b82f6` (Acentos)
- **Azul Oscuro**: `#1e3a8a` (Estados hover)
- **Gris**: `#6b7280` (Texto secundario)
- **Gris Claro**: `#f7f9fc` (Fondos)

### Tipografía
- **Fuente Principal**: Inter (Google Fonts)
- **Pesos**: 400, 500, 600, 700

### Características de Diseño
- **Responsive First**: Mobile-first approach
- **Accesibilidad**: Cumple estándares WCAG 2.1
- **Performance**: Optimizado para velocidad
- **Animaciones**: Transiciones suaves y naturales

## 🔐 Autenticación

### Credenciales de Prueba
- **Email**: `admin@upb.edu.co`
- **Contraseña**: `admin123`

### Flujo de Autenticación
1. Usuario ingresa credenciales
2. Validación en tiempo real
3. Autenticación con Pinia store
4. Redirección al dashboard
5. Persistencia en localStorage

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### Características Responsive
- Navegación móvil con menú hamburguesa
- Grids adaptativos
- Imágenes responsivas
- Formularios optimizados para móvil

## 🧩 Arquitectura

### Patrones Utilizados
- **Composition API**: Lógica reactiva y reutilizable
- **Pinia Stores**: Estado global centralizado
- **Composables**: Lógica compartida entre componentes
- **TypeScript**: Tipado estático para mayor seguridad
- **Vue Router**: Navegación declarativa

### Gestión de Estado
- **Auth Store**: Autenticación y usuario
- **Events Store**: Eventos culturales
- **Groups Store**: Grupos culturales
- **LocalStorage**: Persistencia local

## 🔧 Funcionalidades Técnicas

### Validaciones
- **Formularios**: Validación en tiempo real
- **Email**: Regex para formato válido
- **Archivos**: Tipo y tamaño de archivos
- **Fechas**: Validación de fechas futuras

### Interactividad
- **Carrusel**: Navegación automática y manual
- **Modales**: Ventanas emergentes reutilizables
- **Notificaciones**: Sistema toast con auto-dismiss
- **Drag & Drop**: Subida de archivos intuitiva

### Performance
- **Lazy Loading**: Carga diferida de componentes
- **Code Splitting**: División de código por rutas
- **Tree Shaking**: Eliminación de código no utilizado
- **Optimización de Imágenes**: Compresión y formatos modernos

## 🧪 Testing

### Estrategia de Testing
- **Unit Tests**: Componentes individuales
- **Integration Tests**: Flujos completos
- **E2E Tests**: Experiencia de usuario completa

### Herramientas
- **Vitest**: Framework de testing
- **Vue Test Utils**: Utilidades para testing
- **Testing Library**: Testing centrado en usuario

## 🚀 Despliegue

### Producción
```bash
# Construir para producción
npm run build

# Los archivos se generan en dist/
# Desplegar en tu servidor web preferido
```

### Variables de Entorno
```env
VITE_APP_TITLE=UPB Cultura
VITE_API_URL=https://api.upb-cultura.com
VITE_APP_VERSION=1.0.0
```

## 🤝 Contribución

### Flujo de Contribución
1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Estándares de Código
- **ESLint**: Linting automático
- **Prettier**: Formateo de código
- **TypeScript**: Tipado estricto
- **Conventional Commits**: Mensajes de commit estandarizados

## 📈 Roadmap

### Próximas Funcionalidades
- [ ] **PWA**: Aplicación web progresiva
- [ ] **Notificaciones Push**: Alertas en tiempo real
- [ ] **Chat**: Comunicación entre usuarios
- [ ] **Calendario**: Vista de calendario de eventos
- [ ] **Mapas**: Ubicación de eventos
- [ ] **Multimedia**: Galería de videos y audios
- [ ] **Analytics**: Métricas de uso
- [ ] **Internacionalización**: Soporte multiidioma

### Mejoras Técnicas
- [ ] **SSR**: Server-side rendering
- [ ] **Micro-frontends**: Arquitectura modular
- [ ] **GraphQL**: API más eficiente
- [ ] **WebRTC**: Comunicación en tiempo real
- [ ] **WebAssembly**: Performance mejorada

## 📞 Soporte

### Documentación
- [Vue.js Docs](https://vuejs.org/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Vite Docs](https://vitejs.dev/)

### Contacto
- **Email**: desarrollo@upb-cultura.com
- **GitHub**: [@upb-cultura](https://github.com/upb-cultura)
- **Issues**: [GitHub Issues](https://github.com/upb-cultura/frontend/issues)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- **Vue.js Team** - Por el increíble framework
- **Tailwind CSS Team** - Por las utilidades CSS
- **Vite Team** - Por la herramienta de construcción
- **Universidad Pontificia Bolivariana** - Por el apoyo institucional
- **Comunidad UPB** - Por la inspiración y feedback

---

**Desarrollado con ❤️ para la Universidad Pontificia Bolivariana**

*Conectando arte, cultura y comunidad universitaria* 🎭🎵🎨