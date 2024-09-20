import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import winston from 'winston';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Obtener la ruta del archivo actual en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

const SERVER_1_URL = process.env.SERVER_1_URL || 'http://localhost:8000';
const SERVER_2_URL = process.env.SERVER_2_URL || 'http://localhost:3000';

// Definir ruta y directorio para los logs
const logDirectory = path.join(__dirname, 'logs');
const logFilePath = path.join(logDirectory, 'server_logs.log');

// Verificar si el directorio de logs existe, si no, crearlo
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Configurar winston para el manejo de logs
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: logFilePath })
  ]
});

app.use(express.json());
app.use(cors());

// Ruta principal para manejo de peticiones a /api/letters
app.use('/api/letters', async (req, res) => {
  const randomChoice = Math.random() < 0.5 ? SERVER_1_URL : SERVER_2_URL;

  try {
    const response = await fetch(`${randomChoice}/api/letters`);
    const data = await response.json();

    logger.info({
      message: `Request successful to ${randomChoice}`,
      server: randomChoice,
      status: response.status,
      timestamp: new Date().toISOString()
    });

    res.json(data);

  } catch (error) {
    logger.error({
      message: `Request failed to ${randomChoice}`,
      error: error.message,
      timestamp: new Date().toISOString()
    });

    // Intentar con el servidor alternativo si falla el primero
    const alternativeServer = randomChoice === SERVER_1_URL ? SERVER_2_URL : SERVER_1_URL;

    try {
      const altResponse = await fetch(`${alternativeServer}/api/letters`);
      const data = await altResponse.json();

      logger.info({
        message: `Request successful to ${alternativeServer}`,
        server: alternativeServer,
        status: altResponse.status,
        timestamp: new Date().toISOString()
      });

      res.json(data);

    } catch (altError) {
      logger.error({
        message: `Request failed to both servers`,
        error: altError.message,
        timestamp: new Date().toISOString()
      });

      // Si ambos servidores fallan
      res.status(500).json({ error: 'Ambos servidores están inactivos. Inténtalo más tarde.' });
    }
  }
});

// Levantar el servidor y registrar el inicio en los logs
app.listen(port, () => {
  logger.info({
    message: `Middleware server running on http://localhost:${port}`,
    timestamp: new Date().toISOString()
  });

  console.log(`Middleware server running on http://localhost:${port}`);
});
