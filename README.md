# 🌍 GHG Emissions Dashboard

Read this README in:
- 🇬🇧 [English](README.md) (this file)
- 🇪🇸 [Español](README.es.md)

---

Interactive dashboard to monitor and analyze annual greenhouse gas (GHG) emissions with real-time visualizations, advanced filters, and detailed data analysis.

> **Note:** This project is a **technical test** developed for **Anthesis**, demonstrating skills in Angular, TypeScript, Clean Architecture, testing, and Dockerization.

**Production URL**: [https://ghg-emissions.vercel.app/emissions](https://ghg-emissions.vercel.app/emissions)

---

## 👤 Author

**Juan Fernando Álvarez Gallego**

- 📧 Email: [alvarezjfernandog@gmail.com](mailto:alvarezjfernandog@gmail.com)
- 📱 Phone: +57 302 285 60 79
- 💼 LinkedIn: [Juan Fernando Álvarez Gallego](https://www.linkedin.com/in/juan-fernando-%C3%A1lvarez-gallego-b97b31212/)
- 🌐 Portfolio: [GHG Emissions Dashboard](https://ghg-emissions.vercel.app/emissions)

---

## 📋 Table of Contents

- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Architecture](#-project-architecture)
- [Principles and Methodologies](#-principles-and-methodologies)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [Testing](#-testing)
- [Dockerization](#-dockerization)
- [Deployment](#-deployment)
- [Available Scripts](#-available-scripts)
- [Technical Features](#-technical-features)
- [Additional Documentation](#-additional-documentation)
- [Contact](#-contact)
- [Changelog](#-changelog)
- [Project Information](#-project-information)

---

## ✨ Features

### Main Functionalities

- 📊 **Interactive Visualizations**
  - Line chart: Emissions evolution by year
  - Bar chart: Emissions by country
  - Statistics cards: Total, average, maximum, and record count

- 🔍 **Advanced Filter System**
  - Country filters (multi-select)
  - Emission type filters (CO2, CH4, N2O)
  - Economic activity filters
  - Year and emissions ranges
  - Real-time search
  - Active filter chips

- 📋 **Detailed Table**
  - Pagination (10 items per page)
  - Column sorting
  - Independent table filters
  - Integrated search

- 🎨 **Modern UI/UX**
  - Responsive design
  - Dark/light mode
  - Smooth animations
  - Accessibility (WCAG 2.1)
  - Complete keyboard navigation

---

## 🛠️ Technologies Used

### Frontend Framework
- **Angular 21** - Main framework
- **TypeScript 5.9** - Programming language
- **RxJS 7.8** - Reactive programming

### State Management
- **Angular Signals** - Reactive state management (Angular 21)

### Data Visualization
- **Chart.js 4.5** - Interactive charts
- **ng2-charts 8.0** - Chart.js wrapper for Angular

### Testing
- **Vitest 4.0** - Testing framework
- **Jasmine** - Testing framework for components
- **Karma** - Test runner

### Containerization
- **Docker** - Application containerization
- **Docker Compose** - Service orchestration
- **Nginx Alpine** - Web server for production

### Deployment
- **Vercel** - Deployment platform

### Development Tools
- **Node.js 20+** - Runtime environment
- **npm** - Package manager
- **SCSS** - CSS preprocessor

---

## 🏗️ Project Architecture

The project follows **Clean Architecture** and **SOLID** principles, organizing code into well-defined layers:

### Layer Structure

```
src/app/
├── core/                    # Application core
│   ├── services/           # Transversal services (Theme, Toast)
│   ├── tokens/             # Injection tokens
│   └── utils/              # Core utilities
│
├── features/               # Feature modules
│   └── emissions/          # Feature: Emissions
│       ├── data/           # Data Layer
│       │   ├── emissions.datasource.ts
│       │   └── emissions.repository.ts
│       ├── domain/         # Domain Layer
│       │   ├── models/     # Entities and models
│       │   └── utils/      # Pure domain functions
│       ├── state/          # State Layer
│       │   ├── emissions.store.ts
│       │   └── emissions.facade.ts
│       └── presentation/   # Presentation Layer
│           ├── components/ # UI components
│           └── pages/      # Pages/routes
│
├── shared/                 # Shared resources
│   ├── chart/             # Chart services
│   ├── ui/                # Reusable UI components
│   └── utils/             # Shared utilities
│
└── layouts/               # Application layouts
    └── main-layout/       # Main layout (Header + Footer)
```

### Data Flow

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

### Separation of Concerns

1. **Domain Layer**: Contains pure business logic (pure functions)
2. **Data Layer**: Handles data access (API, localStorage)
3. **State Layer**: Manages reactive state with Signals
4. **Presentation Layer**: Components and UI

---

## 📐 Principles and Methodologies

### Clean Code
- ✅ Descriptive and semantic names
- ✅ Small functions with single responsibility
- ✅ Self-documenting code
- ✅ Elimination of duplication (DRY)
- ✅ Comments only when necessary

### SOLID
- ✅ **S**ingle Responsibility Principle: Each class/component has a single reason to change
- ✅ **O**pen/Closed Principle: Extensible without modifying existing code
- ✅ **L**iskov Substitution Principle: Well-defined interfaces
- ✅ **I**nterface Segregation: Specific and small interfaces
- ✅ **D**ependency Inversion: Dependencies through abstractions

### Clean Architecture
- ✅ Separation into layers (Domain, Data, State, Presentation)
- ✅ Dependencies point inward (toward the domain)
- ✅ Business logic independent of the framework
- ✅ Improved testability

### Design Patterns
- ✅ **Repository Pattern**: Data access abstraction
- ✅ **Facade Pattern**: Simplifies interaction with the store
- ✅ **Observer Pattern**: Signals and reactive programming
- ✅ **Strategy Pattern**: Configurable utilities

### Angular Best Practices
- ✅ Standalone Components
- ✅ Signals for reactive state
- ✅ Lazy Loading of routes
- ✅ Optimized change detection
- ✅ OnPush change detection strategy (where applicable)

---

## 📁 Project Structure

```
ghg-emissions/
├── src/
│   ├── app/
│   │   ├── core/                   # Core services and utilities
│   │   ├── features/               # Business features
│   │   ├── layouts/                # Application layouts
│   │   └── shared/                 # Shared resources
│   ├── assets/                     # Static assets
│   │   └── data/
│   │       └── emissions.json      # Emissions data
│   └── index.html                  # Main HTML
│
├── Dockerfile                      # Docker configuration
├── docker-compose.yml              # Docker orchestration
├── nginx.conf                      # Nginx configuration
├── .dockerignore                   # Files excluded from Docker
├── angular.json                    # Angular configuration
├── package.json                    # Dependencies and scripts
└── tsconfig.json                   # TypeScript configuration
```

---

## 📋 Prerequisites

Before starting, make sure you have installed:

- **Node.js** 20.x or higher ([Download](https://nodejs.org/))
- **npm** 10.x or higher (comes with Node.js)
- **Angular CLI** 21.x or higher
- **Docker Desktop** (optional, for containerization)
- **Git** (to clone the repository)

### Verify Installation

```bash
node --version    # Must be v20.x or higher
npm --version     # Must be v10.x or higher
ng version        # Must be 21.x or higher
docker --version  # Optional
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ghg-emissions
```

### 2. Install Dependencies

```bash
npm install
```

This will install all necessary dependencies defined in `package.json`.

---

## ▶️ Running the Application

### Development Mode

To run the application in development mode with hot-reload:

```bash
npm start
# or
ng serve
```

The application will be available at: **http://localhost:4200**

### Production Mode (Local Build)

To build the application for production:

```bash
npm run build
```

Optimized files will be generated in `dist/ghg-emissions/browser/`

### Serve Production Build Locally

```bash
npx http-server dist/ghg-emissions/browser -p 4200
```

---

## 🧪 Testing

The project includes comprehensive unit tests for critical business logic.

### Run All Tests

#### With Karma/Jasmine (Angular)

```bash
npm run test:ng
```

#### With Vitest

```bash
npm test
```

### Watch Mode (Development)

```bash
npm run test:watch
```

### Run Specific Tests

```bash
# Run utility tests
npm test -- src/app/features/emissions/domain/utils/
```

### Test Coverage

**48 unit tests** covering:
- ✅ Emission filtering (12 tests)
- ✅ Data aggregation (13 tests)
- ✅ Table processing (21 tests)
- ✅ Additional utilities (2 tests)

**Coverage: 100% of critical business logic**

---

## 🐳 Dockerization

The project is fully dockerized using a **multi-stage build** to optimize the final image size.

### Requirements

- Docker Desktop installed and running
- Docker Compose installed

### Option 1: Docker Compose (Recommended)

```bash
# Build and run
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

The application will be available at: **http://localhost**

### Option 2: Helper Scripts

#### Windows

```bash
# Build and run everything
docker-build.bat all

# Build only
docker-build.bat build

# Run only
docker-build.bat run

# View logs
docker-build.bat logs

# Stop
docker-build.bat stop
```

#### Linux/Mac

```bash
# Build and run everything
./docker-build.sh all

# Other similar commands
./docker-build.sh build
./docker-build.sh run
./docker-build.sh logs
./docker-build.sh stop
```

### Option 3: Direct Docker CLI

```bash
# Build the image
docker build -t ghg-emissions:latest .

# Run the container
docker run -d -p 80:80 --name ghg-emissions-app ghg-emissions:latest
```

### Docker Architecture

**Multi-Stage Build:**
1. **Stage 1 (Build)**: `node:20-alpine` - Installs dependencies and builds the app
2. **Stage 2 (Production)**: `nginx:alpine` - Serves static files

**Final image size**: ~25-30 MB (optimized)

### Health Check

```bash
curl http://localhost/health
# Should respond: healthy
```

For more details on Docker, see [GUIA_DOCKER.md](./GUIA_DOCKER.md)

---

## 🚢 Deployment

### Deploy to Vercel

The project is deployed on Vercel. To deploy:

1. **Install Vercel CLI** (optional)

```bash
npm install -g vercel
```

2. **Deploy**

```bash
vercel --prod
```

Or connect your repository to Vercel from the dashboard.

**Production URL**: [https://ghg-emissions.vercel.app/emissions](https://ghg-emissions.vercel.app/emissions)

### Deploy with Docker

#### Docker Hub

```bash
# Login
docker login

# Tag
docker tag ghg-emissions:latest your-username/ghg-emissions:latest

# Push
docker push your-username/ghg-emissions:latest
```

#### Deploy to Server

```bash
# On the server
docker pull your-username/ghg-emissions:latest
docker run -d -p 80:80 --name ghg-emissions --restart always your-username/ghg-emissions:latest
```

---

## 📜 Available Scripts

```bash
# Development
npm start              # Run in development mode
npm run build          # Build for production
npm run watch          # Build in watch mode

# Testing
npm test               # Run tests with Vitest
npm run test:watch     # Tests in watch mode
npm run test:ng        # Tests with Karma/Jasmine

# Docker
docker-compose up -d   # Run with Docker Compose
docker-compose down    # Stop containers
docker-compose logs -f # View logs

# Utilities
npm run ng             # Angular CLI
```

---

## 🎯 Technical Features

### Performance

- ✅ Route lazy loading
- ✅ Optimized change detection
- ✅ Gzip compression in Nginx
- ✅ Static asset caching
- ✅ Production-optimized build
- ✅ Automatic code splitting

### Accessibility (A11y)

- ✅ Complete keyboard navigation
- ✅ Appropriate ARIA labels and roles
- ✅ WCAG AA color contrast
- ✅ Skip links
- ✅ Screen reader support
- ✅ Correct heading hierarchy

### Responsive Design

- ✅ Mobile-first approach
- ✅ Breakpoints for tablets and desktop
- ✅ Adaptive layouts
- ✅ Responsive components

### SEO

- ✅ Optimized meta tags
- ✅ Semantic HTML
- ✅ Sitemap ready
- ✅ Open Graph tags

### Security

- ✅ Security headers in Nginx
- ✅ XSS Protection
- ✅ Content Security Policy ready
- ✅ Input sanitization

---

## 📊 Quality Metrics

- **TypeScript**: Strict mode enabled
- **Linting**: Configured with Angular ESLint
- **Testing**: 48 unit tests (100% of critical logic)
- **Build Size**: Optimized for production
- **Performance**: Optimized Lighthouse score
- **Accessibility**: WCAG 2.1 compliant

---

## 🔄 Development Flow

1. **Feature Branch**: Create branch from `main`
2. **Development**: Implement feature following Clean Architecture
3. **Testing**: Write and run tests
4. **Review**: Code review and verification
5. **Merge**: Integrate to `main`
6. **Deploy**: Automatic deployment to Vercel

---

## 📚 Additional Documentation

- [GUIA_DOCKER.md](./GUIA_DOCKER.md) - Complete Docker guide
- [GUIA_IMPLEMENTACION.md](./GUIA_IMPLEMENTACION.md) - Implementation guide
- [ESTRUCTURA_PROYECTO.md](./ESTRUCTURA_PROYECTO.md) - Detailed structure
- [RESULTADOS_TESTS_FINAL.md](./RESULTADOS_TESTS_FINAL.md) - Test results

---

## 📞 Contact

For any inquiries or collaboration:

- 📧 **Email**: [alvarezjfernandog@gmail.com](mailto:alvarezjfernandog@gmail.com)
- 📱 **Phone**: +57 302 285 60 79
- 💼 **LinkedIn**: [Juan Fernando Álvarez Gallego](https://www.linkedin.com/in/juan-fernando-%C3%A1lvarez-gallego-b97b31212/)
- 🌐 **Portfolio**: [GHG Emissions Dashboard](https://ghg-emissions.vercel.app/emissions)

---

**Developed with ❤️ by Juan Fernando Álvarez Gallego**  
**Technical Test for Anthesis**

---

## 📝 Changelog

### Version 1.0.0
- ✅ Initial dashboard implementation
- ✅ Advanced filter system
- ✅ Chart.js visualizations
- ✅ Dark/light mode
- ✅ Complete Dockerization
- ✅ Vercel deployment
- ✅ Complete unit tests
- ✅ Clean Architecture
- ✅ WCAG 2.1 accessibility

---

## 🏢 Project Information

**Project Type:** Technical Test  
**Company:** Anthesis  
**Development Date:** December 2025  
**Status:** ✅ Complete and deployed in production

---

**Last update**: December 2025
