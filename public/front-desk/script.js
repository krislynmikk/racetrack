const socket = io();

const addSessionBtn = document.getElementById('addSessionBtn');
const sessionsOutput = document.getElementById('sessionsOutput');

const draftDriverNames = {};
let lastSessionsSignature = '';

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('admin:update', (state) => {
  const newSignature = buildSessionsSignature(state.sessions);

  if (newSignature === lastSessionsSignature) {
    return;
  }

  lastSessionsSignature = newSignature;
  renderSessions(state.sessions);
});

socket.on('error:message', (message) => {
  alert(message);
});

addSessionBtn.addEventListener('click', () => {
  socket.emit('session:create');
});

function renderSessions(sessions) {
  if (!sessions || sessions.length === 0) {
    sessionsOutput.innerHTML = '<p>No sessions yet.</p>';
    return;
  }

  sessionsOutput.innerHTML = `
    <div class="stack">
      ${sessions.map((session, index) => `
        <div class="panel">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <p><strong>Session ${index + 1}</strong></p>
            <button class="btn-red delete-session-btn" data-session-id="${session.id}">
              Delete
            </button>
          </div>

          <p class="muted">ID: ${session.id}</p>
          <p>Drivers: ${session.drivers.length}</p>

          <div class="form-row">
            <input
              type="text"
              id="driver-input-${session.id}"
              data-session-id="${session.id}"
              placeholder="Driver name"
              value="${escapeHtml(draftDriverNames[session.id] || '')}"
            />
            <button
              class="btn-blue add-driver-btn"
              data-session-id="${session.id}"
            >
              Add Driver
            </button>
          </div>

          <div class="drivers-list">
            ${
              session.drivers.length === 0
                ? '<p class="muted">No drivers yet.</p>'
                : `
                  <table>
                    <thead>
                      <tr>
                        <th>Car</th>
                        <th>Driver</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      ${session.drivers.map((driver) => `
                        <tr>
                          <td>${driver.carNumber}</td>
                          <td>${driver.name}</td>
                          <td>
                            <button
                              class="btn-red delete-driver-btn"
                              data-session-id="${session.id}"
                              data-car-number="${driver.carNumber}"
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                `
            }
          </div>
        </div>
      `).join('')}
    </div>
  `;

  bindDriverButtons();
  bindDeleteButtons();
  bindDraftInputs();
}

function bindDriverButtons() {
  const buttons = document.querySelectorAll('.add-driver-btn');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const sessionId = button.dataset.sessionId;
      const input = document.getElementById(`driver-input-${sessionId}`);
      const name = input.value.trim();

      socket.emit('driver:add', { sessionId, name });
      draftDriverNames[sessionId] = '';
      input.value = '';
      input.focus();
    });
  });
}

function bindDeleteButtons() {
  document.querySelectorAll('.delete-session-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sessionId = btn.dataset.sessionId;
      delete draftDriverNames[sessionId];
      socket.emit('session:delete', { sessionId });
    });
  });

  document.querySelectorAll('.delete-driver-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sessionId = btn.dataset.sessionId;
      const carNumber = Number(btn.dataset.carNumber);

      socket.emit('driver:remove', { sessionId, carNumber });
    });
  });
}

function bindDraftInputs() {
  document.querySelectorAll('input[data-session-id]').forEach((input) => {
    input.addEventListener('input', () => {
      const sessionId = input.dataset.sessionId;
      draftDriverNames[sessionId] = input.value;
    });
  });
}

function buildSessionsSignature(sessions) {
  return JSON.stringify(
    (sessions || []).map((session) => ({
      id: session.id,
      drivers: (session.drivers || []).map((driver) => ({
        carNumber: driver.carNumber,
        name: driver.name
      }))
    }))
  );
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}