const socket = io();

const buttonsContainer = document.getElementById('buttonsContainer');
const raceModeText = document.getElementById('raceMode');

socket.on('admin:update', (state) => {
  raceModeText.textContent = state.raceMode;
  renderButtons(state);
});

socket.on('error:message', (msg) => {
  alert(msg);
});

function renderButtons(state) {
  const session = state.currentSession;

  if (!session) {
    if (state.previousSession) {
      buttonsContainer.innerHTML = '<p class="muted">Session ended.</p>';
    } else {
      buttonsContainer.innerHTML = '<p class="muted">No active race.</p>';
    }
    return;
  }

  buttonsContainer.innerHTML = `
    <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
      ${session.drivers.map((driver) => `
        <button
          style="height:100px; font-size:24px;"
          onclick="recordLap(${driver.carNumber})"
        >
          Car ${driver.carNumber}
        </button>
      `).join('')}
    </div>
  `;
}

function recordLap(carNumber) {
  socket.emit('lap:record', { carNumber });
}