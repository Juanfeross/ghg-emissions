@echo off
REM Script de ayuda para construir y ejecutar la aplicación Dockerizada (Windows)

echo 🐳 GHG Emissions - Docker Build Script
echo ========================================
echo.

if "%1"=="" goto show_help
if "%1"=="help" goto show_help
if "%1"=="--help" goto show_help
if "%1"=="-h" goto show_help

if "%1"=="build" goto build_image
if "%1"=="run" goto run_container
if "%1"=="stop" goto stop_container
if "%1"=="logs" goto show_logs
if "%1"=="clean" goto clean_docker
if "%1"=="all" goto build_and_run

echo ❌ Comando no reconocido: %1
echo.
goto show_help

:show_help
echo Uso: docker-build.bat [comando]
echo.
echo Comandos disponibles:
echo   build     - Construir la imagen Docker
echo   run       - Ejecutar el contenedor
echo   stop      - Detener el contenedor
echo   logs      - Ver logs del contenedor
echo   clean     - Limpiar contenedores e imágenes
echo   all       - Construir y ejecutar en un paso
echo   help      - Mostrar esta ayuda
echo.
goto end

:build_image
echo 🔨 Construyendo imagen Docker...
docker-compose build
if %errorlevel% equ 0 (
    echo ✅ Imagen construida exitosamente
) else (
    echo ❌ Error al construir la imagen
    exit /b 1
)
goto end

:run_container
echo 🚀 Ejecutando contenedor...
docker-compose up -d
if %errorlevel% equ 0 (
    echo ✅ Contenedor ejecutándose
    echo 📍 Aplicación disponible en: http://localhost
) else (
    echo ❌ Error al ejecutar el contenedor
    exit /b 1
)
goto end

:stop_container
echo ⏹️  Deteniendo contenedor...
docker-compose down
echo ✅ Contenedor detenido
goto end

:show_logs
echo 📋 Mostrando logs...
docker-compose logs -f
goto end

:clean_docker
echo 🧹 Limpiando contenedores e imágenes...
docker-compose down -v
docker rmi ghg-emissions-ghg-emissions:latest 2>nul
echo ✅ Limpieza completada
goto end

:build_and_run
call :build_image
if %errorlevel% neq 0 exit /b 1
call :run_container
goto end

:end

