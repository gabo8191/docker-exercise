# Middleware
FROM node:18

# Crear directorio de la app
WORKDIR /usr/src/app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Exponer el puerto 4000
EXPOSE 4000

# Comando para ejecutar el middleware
CMD ["node", "middleware.mjs"]
