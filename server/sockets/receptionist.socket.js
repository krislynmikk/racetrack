const {
  createSession,
  deleteSession,
  addDriver,
  removeDriver
} = require('../state/sessionManager');

const { emitAll } = require('../services/broadcastService');

function receptionistSocket(io, socket, state) {
  socket.on('session:create', () => {
    createSession(state);
    emitAll(io, state);
  });

  socket.on('session:delete', ({ sessionId }) => {
    deleteSession(state, sessionId);
    emitAll(io, state);
  });

  socket.on('driver:add', ({ sessionId, name }) => {
    const result = addDriver(state, sessionId, name);

    if (!result.success) {
      return socket.emit('error:message', result.message);
    }

    emitAll(io, state);
  });

  socket.on('driver:remove', ({ sessionId, carNumber }) => {
    const result = removeDriver(state, sessionId, carNumber);

    if (!result.success) {
      return socket.emit('error:message', result.message);
    }

    emitAll(io, state);
  });
}

module.exports = receptionistSocket;