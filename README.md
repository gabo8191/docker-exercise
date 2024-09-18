# Proyecto de Middleware con Docker

Este proyecto consta de un cliente, un middleware y dos servidores. El cliente puede ser ejecutado localmente en tu máquina. A continuación se detalla cómo funciona el proyecto y cómo puedes ejecutarlo usando Docker.

## Estructura del Proyecto

- `client/`: Código fuente del cliente.
- `middleware/`: Código fuente del middleware.
- `server1/`: Código fuente del primer servidor.
- `server2/`: Código fuente del segundo servidor.
- `.dockerignore`: Archivo para excluir archivos y directorios del contexto de construcción de Docker.
- `.gitignore`: Archivo para excluir archivos y directorios del control de versiones con Git.
- `docker-compose.yml`: Archivo de configuración para Docker Compose.

## Requisitos

- **Node.js**: Este proyecto está basado en Node.js versión 18.
- **Docker** y **Docker Compose**: Asegúrate de tener Docker y Docker Compose instalados en tu máquina.

## Instalación y Ejecución

1. **Clonar el Repositorio**:

   ```bash
   git clone <URL-del-repositorio>
   cd <nombre-del-repositorio>
   ```

2. **Construir y Ejecutar con Docker Compose**:

   Desde la carpeta raíz del proyecto, ejecuta el siguiente comando para construir y levantar los contenedores:

   ```bash
   docker compose up --build
   ```

   Este comando construirá las imágenes de Docker y levantará los servicios definidos en el archivo `docker-compose.yml`.

## Descripción del Proyecto

1. **Cliente**: El cliente se ejecuta en tu máquina local y se conecta al middleware.
2. **Middleware**: El middleware selecciona aleatoriamente uno de los servidores disponibles.
3. **Servidores**:
   - **Server1**: Envía una letra mayúscula.
   - **Server2**: Envía una letra minúscula.

## Notas

- Asegúrate de que tu entorno de Docker esté configurado correctamente antes de ejecutar el proyecto.
- Consulta la documentación en las carpetas `client/`, `middleware/`, `server1/`, y `server2/` para obtener más información sobre la configuración y el funcionamiento de cada componente.
