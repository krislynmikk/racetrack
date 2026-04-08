const socket = io();
const label = document.getElementById('label');

socket.on('admin:update', (state) => {
  updateFlag(state.raceMode);
});

function updateFlag(mode) {
  document.body.className = '';

  if (mode === 'SAFE') {
    document.body.classList.add('safe');
    label.textContent = 'SAFE';
  }

  if (mode === 'HAZARD') {
    document.body.classList.add('hazard');
    label.textContent = 'HAZARD';
  }

  if (mode === 'DANGER') {
    document.body.classList.add('danger');
    label.textContent = 'DANGER';
  }

  if (mode === 'FINISH') {
    document.body.classList.add('finish');
    label.textContent = 'FINISH';
  }
}