# 🌍 GHG Emissions Dashboard

Dashboard interactivo para monitorear y analizar emisiones anuales de gases de efecto invernadero (GHG) con visualizaciones en tiempo real, filtros avanzados y análisis detallado de datos.

> **Nota:** Este proyecto es una **prueba técnica** desarrollada para **Anthesis**, demostrando habilidades en Angular, TypeScript, Clean Architecture, testing y Dockerización.

**URL de Producción**: [https://ghg-emissions.vercel.app/emissions](https://ghg-emissions.vercel.app/emissions)

---

## 👤 Autor

**Juan Fernando Álvarez Gallego**

- 📧 Email: [alvarezjfernandog@gmail.com](mailto:alvarezjfernandog@gmail.com)
- 📱 Teléfono: +57 302 285 60 79
- 💼 LinkedIn: [Juan Fernando Álvarez Gallego](https://www.linkedin.com/in/juan-fernando-%C3%A1lvarez-gallego-b97b31212/)
- 🌐 Portfolio: [GHG Emissions Dashboard](https://ghg-emissions.vercel.app/emissions)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Principios y Metodologías](#-principios-y-metodologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Ejecución](#-ejecución)
- [Testing](#-testing)
- [Dockerización](#-dockerización)
- [Despliegue](#-despliegue)
- [Scripts Disponibles](#-scripts-disponibles)
- [Características Técnicas](#-características-técnicas)

---

## ✨ Características

### Funcionalidades Principales

- 📊 **Visualizaciones Interactivas**
  - Gráfico de líneas: Evolución de emisiones por año
  - Gráfico de barras: Emisiones por país
  - Tarjetas de estadísticas: Total, promedio, máximo y cantidad de registros

- 🔍 **Sistema de Filtros Avanzado**
  - Filtros por país (multi-selección)
  - Filtros por tipo de emisión (CO2, CH4, N2O)
  - Filtros por actividad económica
  - Rangos de años y emisiones
  - Búsqueda en tiempo real
  - Chips de filtros activos

- 📋 **Tabla Detallada**
  - Paginación (10 items por página)
  - Ordenamiento por columnas
  - Filtros independientes de la tabla
  - Búsqueda integrada

- 🎨 **UI/UX Moderna**
  - Diseño responsive
  - Modo oscuro/claro
  - Animaciones suaves
  - Accesibilidad (WCAG 2.1)
  - Navegación por teclado completa

---

## 🛠️ Tecnologías Utilizadas

### Frontend Framework
- **Angular 21** - Framework principal
- **TypeScript 5.9** - Lenguaje de programación
- **RxJS 7.8** - Programación reactiva

### State Management
- **Angular Signals** - Gestión de estado reactivo (Angular 21)

### Visualización de Datos
- **Chart.js 4.5** - Gráficos interactivos
- **ng2-charts 8.0** - Wrapper de Chart.js para Angular

### Testing
- **Vitest 4.0** - Framework de testing
- **Jasmine** - Framework de testing para componentes
- **Karma** - Test runner

### Containerización
- **Docker** - Containerización de la aplicación
- **Docker Compose** - Orquestación de servicios
- **Nginx Alpine** - Servidor web para producción

### Despliegue
- **Vercel** - Plataforma de despliegue

### Herramientas de Desarrollo
- **Node.js 20+** - Entorno de ejecución
- **npm** - Gestor de paquetes
- **SCSS** - Preprocesador CSS

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue los principios de **Clean Architecture** y **SOLID**, organizando el código en capas bien definidas:

### Estructura por Capas

```
src/app/
├── core/                    # Núcleo de la aplicación
│   ├── services/           # Servicios transversales (Theme, Toast)
│   ├── tokens/             # Tokens de inyección
│   └── utils/              # Utilidades core
│
├── features/               # Módulos de características
│   └── emissions/          # Feature: Emisiones
│       ├── data/           # Capa de Datos
│       │   ├── emissions.datasource.ts
│       │   └── emissions.repository.ts
│       ├── domain/         # Capa de Dominio
│       │   ├── models/     # Entidades y modelos
│       │   └── utils/      # Funciones puras del dominio
│       ├── state/          # Capa de Estado
│       │   ├── emissions.store.ts
│       │   └── emissions.facade.ts
│       └── presentation/   # Capa de Presentación
│           ├── components/ # Componentes UI
│           └── pages/      # Páginas/rutas
│
├── shared/                 # Recursos compartidos
│   ├── chart/             # Servicios de gráficos
│   ├── ui/                # Componentes UI reutilizables
│   └── utils/             # Utilidades compartidas
│
└── layouts/               # Layouts de la aplicación
    └── main-layout/       # Layout principal (Header + Footer)
```

### Flujo de Datos

```
Data Layer (Repository)
    ↓
State Layer (Store - Signals)
    ↓
Application Layer (Facade)
    ↓
Presentation Layer (Components)
    ↓
UI (Templates)
```

### Separación de Responsabilidades

1. **Domain Layer**: Contiene la lógica de negocio pura (funciones puras)
2. **Data Layer**: Maneja el acceso a datos (API, localStorage)
3. **State Layer**: Gestiona el estado reactivo con Signals
4. **Presentation Layer**: Componentes y UI

---

## 📐 Principios y Metodologías

### Clean Code
- ✅ Nombres descriptivos y semánticos
- ✅ Funciones pequeñas y con responsabilidad única
- ✅ Código auto-documentado
- ✅ Eliminación de duplicación (DRY)
- ✅ Comentarios solo cuando son necesarios

### SOLID
- ✅ **S**ingle Responsibility Principle: Cada clase/componente tiene una sola razón para cambiar
- ✅ **O**pen/Closed Principle: Extensible sin modificar código existente
- ✅ **L**iskov Substitution Principle: Interfaces bien definidas
- ✅ **I**nterface Segregation: Interfaces específicas y pequeñas
- ✅ **D**ependency Inversion: Dependencias a través de abstracciones

### Clean Architecture
- ✅ Separación en capas (Domain, Data, State, Presentation)
- ✅ Dependencias apuntan hacia adentro (hacia el dominio)
- ✅ Lógica de negocio independiente del framework
- ✅ Testabilidad mejorada

### Patrones de Diseño
- ✅ **Repository Pattern**: Abstracción del acceso a datos
- ✅ **Facade Pattern**: Simplifica la interacción con el store
- ✅ **Observer Pattern**: Signals y reactive programming
- ✅ **Strategy Pattern**: Utilidades configurables

### Buenas Prácticas Angular
- ✅ Standalone Components
- ✅ Signals para estado reactivo
- ✅ Lazy Loading de rutas
- ✅ Change Detection optimizado
- ✅ OnPush change detection strategy (donde aplica)

---

## 📁 Estructura del Proyecto

```
ghg-emissions/
├── src/
│   ├── app/
│   │   ├── core/                   # Servicios y utilidades core
│   │   ├── features/               # Features del negocio
│   │   ├── layouts/                # Layouts de la aplicación
│   │   └── shared/                 # Recursos compartidos
│   ├── assets/                     # Assets estáticos
│   └── index.html                  # HTML principal
│
├── public/                         # Archivos públicos
│   └── assets/
│       └── data/
│           └── emissions.json      # Datos de emisiones
│
├── Dockerfile                      # Configuración Docker
├── docker-compose.yml              # Orquestación Docker
├── nginx.conf                      # Configuración Nginx
├── .dockerignore                   # Archivos excluidos de Docker
├── angular.json                    # Configuración Angular
├── package.json                    # Dependencias y scripts
└── tsconfig.json                   # Configuración TypeScript
```

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 20.x o superior ([Descargar](https://nodejs.org/))
- **npm** 10.x o superior (viene con Node.js)
- **Angular CLI** 21.x o superior
- **Docker Desktop** (opcional, para containerización)
- **Git** (para clonar el repositorio)

### Verificar Instalación

```bash
node --version    # Debe ser v20.x o superior
npm --version     # Debe ser v10.x o superior
ng version        # Debe ser 21.x o superior
docker --version  # Opcional
```

---

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd ghg-emissions
```

### 2. Instalar Dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias definidas en `package.json`.

---

## ▶️ Ejecución

### Modo Desarrollo

Para ejecutar la aplicación en modo desarrollo con hot-reload:

```bash
npm start
# o
ng serve
```

La aplicación estará disponible en: **http://localhost:4200**

### Modo Producción (Build Local)

Para construir la aplicación para producción:

```bash
npm run build
```

Los archivos optimizados se generarán en `dist/ghg-emissions/browser/`

### Servir Build de Producción Localmente

```bash
npx http-server dist/ghg-emissions/browser -p 4200
```

---

## 🧪 Testing

El proyecto incluye tests unitarios completos para la lógica de negocio crítica.

### Ejecutar Todos los Tests

#### Con Karma/Jasmine (Angular)

```bash
npm run test:ng
```

#### Con Vitest

```bash
npm test
```

### Modo Watch (Desarrollo)

```bash
npm run test:watch
```

### Ejecutar Tests Específicos

```bash
# Ejecutar tests de utilidades
npm test -- src/app/features/emissions/domain/utils/
```

### Cobertura de Tests

**48 tests unitarios** cubriendo:
- ✅ Filtrado de emisiones (12 tests)
- ✅ Agregación de datos (13 tests)
- ✅ Procesamiento de tablas (21 tests)
- ✅ Utilidades adicionales (2 tests)

**Cobertura: 100% de la lógica de negocio crítica**

---

## 🐳 Dockerización

El proyecto está completamente dockerizado usando un **multi-stage build** para optimizar el tamaño de la imagen final.

### Requisitos

- Docker Desktop instalado y ejecutándose
- Docker Compose instalado

### Opción 1: Docker Compose (Recomendado)

```bash
# Construir y ejecutar
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

La aplicación estará disponible en: **http://localhost**

### Opción 2: Scripts de Ayuda

#### Windows

```bash
# Construir y ejecutar todo
docker-build.bat all

# Solo construir
docker-build.bat build

# Solo ejecutar
docker-build.bat run

# Ver logs
docker-build.bat logs

# Detener
docker-build.bat stop
```

#### Linux/Mac

```bash
# Construir y ejecutar todo
./docker-build.sh all

# Otros comandos similares
./docker-build.sh build
./docker-build.sh run
./docker-build.sh logs
./docker-build.sh stop
```

### Opción 3: Docker CLI Directo

```bash
# Construir la imagen
docker build -t ghg-emissions:latest .

# Ejecutar el contenedor
docker run -d -p 80:80 --name ghg-emissions-app ghg-emissions:latest
```

### Arquitectura Docker

**Multi-Stage Build:**
1. **Stage 1 (Build)**: `node:20-alpine` - Instala dependencias y construye la app
2. **Stage 2 (Production)**: `nginx:alpine` - Sirve los archivos estáticos

**Tamaño de imagen final**: ~25-30 MB (optimizado)

### Health Check

```bash
curl http://localhost/health
# Debe responder: healthy
```

Para más detalles sobre Docker, consulta [GUIA_DOCKER.md](./GUIA_DOCKER.md)

---

## 🚢 Despliegue

### Despliegue en Vercel

El proyecto está desplegado en Vercel. Para desplegar:

1. **Instalar Vercel CLI** (opcional)

```bash
npm install -g vercel
```

2. **Desplegar**

```bash
vercel --prod
```

O conecta tu repositorio a Vercel desde el dashboard.

**URL de Producción**: [https://ghg-emissions.vercel.app/emissions](https://ghg-emissions.vercel.app/emissions)

### Despliegue con Docker

#### Docker Hub

```bash
# Login
docker login

# Tag
docker tag ghg-emissions:latest tu-usuario/ghg-emissions:latest

# Push
docker push tu-usuario/ghg-emissions:latest
```

#### Desplegar en Servidor

```bash
# En el servidor
docker pull tu-usuario/ghg-emissions:latest
docker run -d -p 80:80 --name ghg-emissions --restart always tu-usuario/ghg-emissions:latest
```

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm start              # Ejecutar en modo desarrollo
npm run build          # Construir para producción
npm run watch          # Build en modo watch

# Testing
npm test               # Ejecutar tests con Vitest
npm run test:watch     # Tests en modo watch
npm run test:ng        # Tests con Karma/Jasmine

# Docker
docker-compose up -d   # Ejecutar con Docker Compose
docker-compose down    # Detener contenedores
docker-compose logs -f # Ver logs

# Utilidades
npm run ng             # Angular CLI
```

---

## 🎯 Características Técnicas

### Performance

- ✅ Lazy Loading de rutas
- ✅ Change Detection optimizado
- ✅ Compresión gzip en Nginx
- ✅ Cache de assets estáticos
- ✅ Build optimizado para producción
- ✅ Code splitting automático

### Accesibilidad (A11y)

- ✅ Navegación completa por teclado
- ✅ ARIA labels y roles apropiados
- ✅ Contraste de colores WCAG AA
- ✅ Skip links
- ✅ Screen reader support
- ✅ Heading hierarchy correcta

### Responsive Design

- ✅ Mobile-first approach
- ✅ Breakpoints para tablets y desktop
- ✅ Layouts adaptativos
- ✅ Componentes responsive

### SEO

- ✅ Meta tags optimizados
- ✅ Semantic HTML
- ✅ Sitemap ready
- ✅ Open Graph tags

### Seguridad

- ✅ Headers de seguridad en Nginx
- ✅ XSS Protection
- ✅ Content Security Policy ready
- ✅ Sanitización de inputs

---

## 📊 Métricas de Calidad

- **TypeScript**: Modo estricto habilitado
- **Linting**: Configurado con Angular ESLint
- **Testing**: 48 tests unitarios (100% de lógica crítica)
- **Build Size**: Optimizado para producción
- **Performance**: Lighthouse score optimizado
- **Accessibility**: WCAG 2.1 compliant

---

## 🔄 Flujo de Desarrollo

1. **Feature Branch**: Crear branch desde `main`
2. **Desarrollo**: Implementar feature siguiendo Clean Architecture
3. **Testing**: Escribir y ejecutar tests
4. **Review**: Code review y verificación
5. **Merge**: Integrar a `main`
6. **Deploy**: Despliegue automático a Vercel

---

## 📚 Documentación Adicional

- [GUIA_DOCKER.md](./GUIA_DOCKER.md) - Guía completa de Docker
- [GUIA_IMPLEMENTACION.md](./GUIA_IMPLEMENTACION.md) - Guía de implementación
- [ESTRUCTURA_PROYECTO.md](./ESTRUCTURA_PROYECTO.md) - Estructura detallada
- [RESULTADOS_TESTS_FINAL.md](./RESULTADOS_TESTS_FINAL.md) - Resultados de tests

---

## 📞 Contacto

Para cualquier consulta o colaboración:

- 📧 **Email**: [alvarezjfernandog@gmail.com](mailto:alvarezjfernandog@gmail.com)
- 📱 **Teléfono**: +57 302 285 60 79
- 💼 **LinkedIn**: [Juan Fernando Álvarez Gallego](https://www.linkedin.com/in/juan-fernando-%C3%A1lvarez-gallego-b97b31212/)
- 🌐 **Portfolio**: [GHG Emissions Dashboard](https://ghg-emissions.vercel.app/emissions)

---

**Desarrollado con ❤️ por Juan Fernando Álvarez Gallego**  
**Prueba Técnica para Anthesis**

---

## 📝 Changelog

### Versión 1.0.0
- ✅ Implementación inicial del dashboard
- ✅ Sistema de filtros avanzado
- ✅ Visualizaciones con Chart.js
- ✅ Modo oscuro/claro
- ✅ Dockerización completa
- ✅ Despliegue en Vercel
- ✅ Tests unitarios completos
- ✅ Arquitectura Clean Architecture
- ✅ Accesibilidad WCAG 2.1

---

## 🏢 Información del Proyecto

**Tipo de Proyecto:** Prueba Técnica
**Empresa:** Anthesis
**Fecha de Desarrollo:** Diciembre 2025
**Estado:** ✅ Completo y desplegado en producción

---

**Última actualización**: Diciembre 2025
