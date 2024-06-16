# Sistema ADATAR - Universidad de Córdoba

## Descripción

El trabajo se enfoca en la evolución del sistema ADATAR, una herramienta de la Universidad de Córdoba para la identificación de estudiantes en riesgo académico. Esta aplicación web utiliza Docker Compose para levantar múltiples servicios, incluyendo aplicaciones en Go, Node.js y React Vite, además de una base de datos PostgreSQL y pgAdmin4.

## Estructura del Proyecto

- **Go App**: Corre en el puerto `8000`
- **Node.js REST API**: Corre en el puerto `3001`
- **React Vite App**: Corre en el puerto `3004`
- **PostgreSQL**: Base de datos para la aplicación `5432`
- **pgAdmin4**: Interfaz web para administrar PostgreSQL `4321`

## Prerrequisitos

Asegúrate de tener instalados los siguientes programas:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuración

### 1. Clonar el repositorio

```bash
git clone <URL-del-repositorio>
cd <nombre-del-repositorio>
#create .env en cada directorio raiz corespondiente.

# Node.js API
DB_USER=postgres
DB_PASSWORD=12345
DB_HOST=localhost
DB=adatar
DB_PORT=5432
PORT=3004

#go service
DB_USER=postgres
DB_PASSWORD=12345
DB_HOST=localhost
DB=adatar

# React Vite App client
VITE_PUBLIC_API=http://localhost:3004/app
VITE_PUBLIC_SEVICE=http://localhost:8000/service
#auth0 credenciales
VITE_PUBLIC_DOMAIN=""
VITE_PUBLIC_CLIENT_ID=""

#comand run
docker-compose up --build


