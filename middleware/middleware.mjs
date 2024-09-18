import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

const SERVER_1_URL = process.env.SERVER_1_URL || 'http://localhost:8000';
const SERVER_2_URL = process.env.SERVER_2_URL || 'http://localhost:3000';

app.use(express.json());
app.use(cors());

app.use('/api/letters', async (req, res) => {
  const randomChoice = Math.random() < 0.5 ? SERVER_1_URL : SERVER_2_URL;

  try {
    const response = await fetch(`${randomChoice}/api/letters`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    // Si hay un error, intenta con el servidor alternativo
    const alternativeServer = randomChoice === SERVER_1_URL ? SERVER_2_URL : SERVER_1_URL;

    try {
      const altResponse = await fetch(`${alternativeServer}/api/letters`);
      const data = await altResponse.json();
      res.json(data);
    } catch (altError) {
      // Si ambos servidores fallan
      res.status(500).json({ error: 'Ambos servidores están inactivos. Inténtalo más tarde.' });
    }
  }
});

app.listen(port, () => {
  console.log(`Middleware server running on http://localhost:${port}`);
});
