const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const { validateEnv, PORT } = require('./config/env');
const state = require('./state/store');
const registerSockets = require('./sockets');

validateEnv();

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '..', 'public')));

// auth
app.post('/auth', (req, res) => {
  const { role, key } = req.body;

  const keys = {
    receptionist: process.env.RECEPTIONIST_KEY,
    safety: process.env.SAFETY_KEY,
    observer: process.env.OBSERVER_KEY
  };

  if (keys[role] === key) {
    return res.json({ success: true });
  }

  setTimeout(() => {
    res.json({ success: false });
  }, 500);
});

// routes
app.get('/', (req, res) => {
  res.send(`
    <h1>Racetrack server is running</h1>
    <ul>
      <li><a href="/front-desk">Front Desk</a></li>
      <li><a href="/race-control">Race Control</a></li>
      <li><a href="/lap-line-tracker">Lap-line Tracker</a></li>
      <li><a href="/leader-board">Leader Board</a></li>
      <li><a href="/next-race">Next Race</a></li>
      <li><a href="/race-countdown">Race Countdown</a></li>
      <li><a href="/race-flags">Race Flags</a></li>
    </ul>
  `);
});

app.get('/front-desk', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/front-desk/index.html'))
);

app.get('/race-control', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/race-control/index.html'))
);

app.get('/lap-line-tracker', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/lap-line-tracker/index.html'))
);

app.get('/leader-board', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/leader-board/index.html'))
);

app.get('/next-race', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/next-race/index.html'))
);

app.get('/race-countdown', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/race-countdown/index.html'))
);

app.get('/race-flags', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/race-flags/index.html'))
);

// sockets
registerSockets(io, state);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});