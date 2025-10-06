const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));

app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body || {};
    if (!name || !email) return res.status(400).json({ error: 'name and email are required' });

    const [user] = await db('users')
      .insert({ name, email })
      .returning(['id', 'name', 'email']);

    return res.status(201).json(user);
  } catch (err) {
    if (String(err.message).includes('unique')) {
      return res.status(409).json({ error: 'email already in use' });
    }
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
});

app.get('/users', async (req, res) => {
  const users = await db('users').select('id', 'name', 'email').orderBy('id');
  res.json(users);
});

module.exports = app;
