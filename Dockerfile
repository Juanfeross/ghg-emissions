# Dockerfile para aplicación Angular - Multi-stage build

# ============================================
# Stage 1: Build - Construir la aplicación
# ============================================
FROM node:20-alpine AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar todo el código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build -- --configuration production

# ============================================
# Stage 2: Production - Servir con Nginx
# ============================================
FROM nginx:alpine

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos desde el stage de build
COPY --from=build /app/dist/ghg-emissions/browser /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]

