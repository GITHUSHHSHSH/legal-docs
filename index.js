const express = require('express');
const { verifyKey } = require('discord-interactions');
const app = express();

app.use(express.json());

const PUBLIC_KEY = process.env.PUBLIC_KEY;

app.post('/api/interactions', (req, res) => {
  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];
  const body = JSON.stringify(req.body);

  if (!verifyKey(body, signature, timestamp, PUBLIC_KEY)) {
    return res.status(401).send('Invalid request signature');
  }

  const interaction = req.body;

  // Respond to Discord verification ping
  if (interaction.type === 1) return res.json({ type: 1 });

  // Respond to other interactions
  res.json({ type: 4, data: { content: 'Hello from your bot!' } });
});

// Optional: test in browser
app.get('/', (req, res) => res.send('Bot is live!'));
app.get('/api/interactions', (req, res) => res.send('Send a POST to interact.'));

app.listen(process.env.PORT || 3000, () => console.log('Server running'));
