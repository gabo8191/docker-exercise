const express = require('express');

const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');

app.use(cors());

app.get('/api/letters', async (req, res) => {
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  res.json({ letter });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
