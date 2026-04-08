const socket = io();
const timerElement = document.getElementById('timer');

socket.on('admin:update', (state) => {
  timerElement.textContent = formatTime(state.remainingTime);
});

socket.on('timer:update', ({ remainingTime }) => {
  timerElement.textContent = formatTime(remainingTime);
});

function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, totalSeconds || 0);
  const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, '0');
  const seconds = String(safeSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}