const { recordLap } = require('../state/lapManager');
const { emitAll } = require('../services/broadcastService');

function observerSocket(io, socket, state) {
  socket.on('lap:record', ({ carNumber }) => {
    recordLap(state, carNumber);
    emitAll(io, state);
  });
}

module.exports = observerSocket;