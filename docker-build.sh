#!/bin/bash
# Script de ayuda para construir y ejecutar la aplicación Dockerizada

set -e

echo "🐳 GHG Emissions - Docker Build Script"
echo "========================================"
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para mostrar ayuda
show_help() {
    echo "Uso: ./docker-build.sh [comando]"
    echo ""
    echo "Comandos disponibles:"
    echo "  build     - Construir la imagen Docker"
    echo "  run       - Ejecutar el contenedor"
    echo "  stop      - Detener el contenedor"
    echo "  logs      - Ver logs del contenedor"
    echo "  clean     - Limpiar contenedores e imágenes"
    echo "  all       - Construir y ejecutar en un paso"
    echo "  help      - Mostrar esta ayuda"
    echo ""
}

# Función para construir
build_image() {
    echo -e "${GREEN}🔨 Construyendo imagen Docker...${NC}"
    docker-compose build
    echo -e "${GREEN}✅ Imagen construida exitosamente${NC}"
}

# Función para ejecutar
run_container() {
    echo -e "${GREEN}🚀 Ejecutando contenedor...${NC}"
    docker-compose up -d
    echo -e "${GREEN}✅ Contenedor ejecutándose${NC}"
    echo -e "${YELLOW}📍 Aplicación disponible en: http://localhost${NC}"
}

# Función para detener
stop_container() {
    echo -e "${YELLOW}⏹️  Deteniendo contenedor...${NC}"
    docker-compose down
    echo -e "${GREEN}✅ Contenedor detenido${NC}"
}

# Función para ver logs
show_logs() {
    echo -e "${GREEN}📋 Mostrando logs...${NC}"
    docker-compose logs -f
}

# Función para limpiar
clean_docker() {
    echo -e "${YELLOW}🧹 Limpiando contenedores e imágenes...${NC}"
    docker-compose down -v
    docker rmi ghg-emissions-ghg-emissions:latest 2>/dev/null || true
    echo -e "${GREEN}✅ Limpieza completada${NC}"
}

# Función para todo
build_and_run() {
    build_image
    run_container
}

# Procesar comando
case "${1:-help}" in
    build)
        build_image
        ;;
    run)
        run_container
        ;;
    stop)
        stop_container
        ;;
    logs)
        show_logs
        ;;
    clean)
        clean_docker
        ;;
    all)
        build_and_run
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}❌ Comando no reconocido: $1${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac

