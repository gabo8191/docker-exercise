# Servidor 2 (Minúsculas)
FROM node:18

# Crear directorio de la app
WORKDIR /usr/src/app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Comando para ejecutar la app
CMD ["node", "server-minusculas.js"]
