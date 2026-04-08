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
    <!DOCTYPE html>
    <html>
    <head>
      <title>Racetrack System</title>
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #0d1117;
          color: #e6edf3;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .container {
          text-align: center;
        }

        h1 {
          margin-bottom: 30px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, 200px);
          gap: 15px;
          justify-content: center;
        }

        a {
          display: block;
          padding: 15px;
          background: #161b22;
          border: 1px solid #30363d;
          color: #e6edf3;
          text-decoration: none;
          font-weight: bold;
        }

        a:hover {
          background: #1f6feb;
        }

        .section {
          margin-top: 30px;
        }

        .section-title {
          margin-bottom: 10px;
          color: #8b949e;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🏁 Racetrack System</h1>

        <div class="section">
          <div class="section-title">Employee Interfaces</div>
          <div class="grid">
            <a href="/front-desk">Front Desk</a>
            <a href="/race-control">Race Control</a>
            <a href="/lap-line-tracker">Lap Tracker</a>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Public Displays</div>
          <div class="grid">
            <a href="/leader-board">Leader Board</a>
            <a href="/next-race">Next Race</a>
            <a href="/race-countdown">Countdown</a>
            <a href="/race-flags">Flags</a>
          </div>
        </div>
      </div>
    </body>
    </html>
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