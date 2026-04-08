const receptionistSocket = require('./receptionist.socket');
const safetySocket = require('./safety.socket');
const observerSocket = require('./observer.socket');
const publicSocket = require('./public.socket');

function registerSockets(io, state) {
  io.on('connection', (socket) => {
    publicSocket(socket, state);
    receptionistSocket(io, socket, state);
    safetySocket(io, socket, state);
    observerSocket(io, socket, state);
  });
}

module.exports = registerSockets;