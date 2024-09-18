# Servidor 1 (Mayúsculas)
FROM node:18

# Crear directorio de la app
WORKDIR /usr/src/app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Exponer el puerto 8000
EXPOSE 8000

# Comando para ejecutar la app
CMD ["node", "server-mayusculas.js"]
