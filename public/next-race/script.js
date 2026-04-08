const socket = io();

const message = document.getElementById('message');
const driversContainer = document.getElementById('driversContainer');

socket.on('admin:update', (state) => {
  render(state);
});

function render(state) {

    if (!state.currentSession && state.previousSession) {
    message.innerHTML = '<h2 style="color:#1f6feb;">Proceed to paddock</h2>';
    renderDrivers(state.previousSession.drivers);
    return;
  }

  if (state.sessions.length > 0) {
    const nextSession = state.sessions[0];
    message.innerHTML = '<h2>Upcoming race</h2>';
    renderDrivers(nextSession.drivers);
    return;
  }

  message.innerHTML = '<p class="muted">No upcoming races</p>';
  driversContainer.innerHTML = '';
}

function renderDrivers(drivers) {
  if (!drivers || drivers.length === 0) {
    driversContainer.innerHTML = '<p class="muted">No drivers</p>';
    return;
  }

  driversContainer.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Car</th>
          <th>Driver</th>
        </tr>
      </thead>
      <tbody>
        ${drivers.map(d => `
          <tr>
            <td>${d.carNumber}</td>
            <td>${d.name}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}