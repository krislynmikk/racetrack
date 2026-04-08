const socket = io();

const modeText = document.getElementById('mode');
const timeText = document.getElementById('time');
const tableContainer = document.getElementById('tableContainer');

socket.on('admin:update', (state) => {
  modeText.textContent = state.raceMode;
  timeText.textContent = state.remainingTime;

  renderTable(state);
});

function renderTable(state) {
  const session = state.currentSession || state.previousSession;

  if (!session) {
    tableContainer.innerHTML = '<p class="muted">No race data.</p>';
    return;
  }

  // SORT fastest lap järgi (nullid lõppu)
  const drivers = [...session.drivers].sort((a, b) => {
    if (a.fastestLap === null) return 1;
    if (b.fastestLap === null) return -1;
    return a.fastestLap - b.fastestLap;
  });

  tableContainer.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Car</th>
          <th>Driver</th>
          <th>Laps</th>
          <th>Fastest Lap</th>
        </tr>
      </thead>
      <tbody>
        ${drivers.map((d, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${d.carNumber}</td>
            <td>${d.name}</td>
            <td>${d.laps}</td>
            <td>${formatLap(d.fastestLap)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function formatLap(value) {
  if (!value) return '-';
  return (value / 1000).toFixed(3) + ' s';
}