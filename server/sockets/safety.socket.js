const {
  startRace,
  setRaceMode,
  finishRace,
  endSession
} = require('../state/raceState');

const { startTimer, stopTimer } = require('../state/timerManager');
const { emitAll } = require('../services/broadcastService');
const { RACE_DURATION_SECONDS } = require('../config/env');

function safetySocket(io, socket, state) {
  socket.on('race:start', () => {
    const result = startRace(state, RACE_DURATION_SECONDS);

    if (!result.success) {
      return socket.emit('error:message', result.message);
    }

    startTimer(
      state,
      () => emitAll(io, state),
      () => {
        finishRace(state);
        emitAll(io, state);
      }
    );

    emitAll(io, state);
  });

  socket.on('race:set-mode', ({ mode }) => {
    const result = setRaceMode(state, mode);

    if (!result.success) {
      return socket.emit('error:message', result.message);
    }

    emitAll(io, state);
  });

  socket.on('race:finish', () => {
    const result = finishRace(state);

    if (!result.success) {
      return socket.emit('error:message', result.message);
    }

    stopTimer();
    emitAll(io, state);
  });

  socket.on('race:end-session', () => {
    const result = endSession(state);

    if (!result.success) {
      return socket.emit('error:message', result.message);
    }

    stopTimer();
    emitAll(io, state);
  });
}

module.exports = safetySocket;