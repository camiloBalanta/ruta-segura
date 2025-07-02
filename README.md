# Ruta Segura
Versión del proyecto con frontend, backend, base de datos

Aplicación móvil de asistencia para personas con discapacidad visual.  
Incluye geolocalización, comandos de voz y alertas sobre transporte público.

## Estructura
- `frontend/` – Interfaz React con accesibilidad y voz (mockup funcional)
- `backend/` – API REST con Express + PostgreSQL
- `docs/` – Documentación técnica y ERD

## Flujo de trabajo con Git
1. `main` – Rama de producción
2. `develop` – Integración de funcionalidades
3. `feature/[nombre]` – Funciones individuales (e.g. `feature/login`, `feature/frontend`)

## Comandos básicos de colaboración

```bash
git clone https://github.com/camiloBalanta/ruta-segura.git
git checkout -b feature/mi-funcion
git add .
git commit -m "mensaje descriptivo"
git push origin feature/mi-funcion
