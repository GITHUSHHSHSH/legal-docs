const express = require('express');
const { verifyKey } = require('discord-interactions');
const app = express();

app.use(express.json());

app.post('/api/interactions', (req, res) => {
  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];
  const body = JSON.stringify(req.body);

  if (!verifyKey(body, signature, timestamp, process.env.PUBLIC_KEY)) {
    return res.status(401).send('Invalid request signature');
  }

  const interaction = req.body;

  if (interaction.type === 1) { // PING
    return res.json({ type: 1 });
  }

  res.json({ type: 4, data: { content: 'Hello from your bot!' } });
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));
