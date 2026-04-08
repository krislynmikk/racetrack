const socket = io();

const startRaceBtn = document.getElementById('startRaceBtn');
const safeBtn = document.getElementById('safeBtn');
const hazardBtn = document.getElementById('hazardBtn');
const dangerBtn = document.getElementById('dangerBtn');
const finishBtn = document.getElementById('finishBtn');
const endSessionBtn = document.getElementById('endSessionBtn');

const raceModeText = document.getElementById('raceModeText');
const remainingTimeText = document.getElementById('remainingTimeText');
const currentSessionOutput = document.getElementById('currentSessionOutput');
const upcomingSessionsOutput = document.getElementById('upcomingSessionsOutput');

socket.on('admin:update', (state) => {
  raceModeText.textContent = state.raceMode;
  remainingTimeText.textContent = state.remainingTime;

  renderCurrentSession(state.currentSession);
  renderUpcomingSessions(state.sessions);
  updateButtonStates(state);
});

socket.on('error:message', (message) => {
  alert(message);
});

startRaceBtn.addEventListener('click', () => {
  socket.emit('race:start');
});

safeBtn.addEventListener('click', () => {
  socket.emit('race:set-mode', { mode: 'SAFE' });
});

hazardBtn.addEventListener('click', () => {
  socket.emit('race:set-mode', { mode: 'HAZARD' });
});

dangerBtn.addEventListener('click', () => {
  socket.emit('race:set-mode', { mode: 'DANGER' });
});

finishBtn.addEventListener('click', () => {
  socket.emit('race:finish');
});

endSessionBtn.addEventListener('click', () => {
  socket.emit('race:end-session');
});

function renderCurrentSession(session) {
  if (!session) {
    currentSessionOutput.innerHTML = '<p class="muted">No active race.</p>';
    return;
  }

  currentSessionOutput.innerHTML = `
    <p><strong>Session ID:</strong> ${session.id}</p>
    <p><strong>Drivers:</strong> ${session.drivers.length}</p>

    <table>
      <thead>
        <tr>
          <th>Car</th>
          <th>Driver</th>
          <th>Laps</th>
          <th>Fastest Lap</th>
        </tr>
      </thead>
      <tbody>
        ${session.drivers.map((driver) => `
          <tr>
            <td>${driver.carNumber}</td>
            <td>${driver.name}</td>
            <td>${driver.laps}</td>
            <td>${formatLapTime(driver.fastestLap)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderUpcomingSessions(sessions) {
  if (!sessions || sessions.length === 0) {
    upcomingSessionsOutput.innerHTML = '<p class="muted">No upcoming sessions.</p>';
    return;
  }

  upcomingSessionsOutput.innerHTML = `
    <div class="stack">
      ${sessions.map((session, index) => `
        <div class="panel">
          <p><strong>Session ${index + 1}</strong></p>
          <p class="muted">ID: ${session.id}</p>
          <p>Drivers: ${session.drivers.length}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function updateButtonStates(state) {
  const hasCurrentSession = !!state.currentSession;
  const isFinished = state.raceMode === 'FINISH';

  startRaceBtn.disabled = hasCurrentSession || state.sessions.length === 0;
  safeBtn.disabled = !hasCurrentSession || isFinished;
  hazardBtn.disabled = !hasCurrentSession || isFinished;
  dangerBtn.disabled = !hasCurrentSession || isFinished;
  finishBtn.disabled = !hasCurrentSession || isFinished;
  endSessionBtn.disabled = !hasCurrentSession || !isFinished;
}

function formatLapTime(value) {
  if (value === null || value === undefined) {
    return '-';
  }

  return `${(value / 1000).toFixed(3)} s`;
}