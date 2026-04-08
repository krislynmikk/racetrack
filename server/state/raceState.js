function startRace(state, durationSeconds) {
  if (state.currentSession) {
    return { success: false, message: 'A race is already running.' };
  }

  if (state.sessions.length === 0) {
    return { success: false, message: 'No upcoming sessions available.' };
  }

  const nextSession = state.sessions[0];

  if (nextSession.drivers.length === 0) {
    return { success: false, message: 'Cannot start a race with no drivers.' };
  }

  const sessionToStart = state.sessions.shift();

  state.currentSession = {
    ...sessionToStart,
    startTime: Date.now()
  };

  state.currentSession.drivers = state.currentSession.drivers.map((driver) => ({
    ...driver,
    laps: 0,
    fastestLap: null,
    lastLapTimestamp: null
  }));

  state.raceMode = 'SAFE';
  state.remainingTime = durationSeconds;

  return { success: true };
}

function setRaceMode(state, mode) {
  if (!state.currentSession) {
    return { success: false, message: 'No active race.' };
  }

  if (state.raceMode === 'FINISH') {
    return { success: false, message: 'Race mode cannot be changed after finish.' };
  }

  const allowedModes = ['SAFE', 'HAZARD', 'DANGER'];

  if (!allowedModes.includes(mode)) {
    return { success: false, message: 'Invalid race mode.' };
  }

  state.raceMode = mode;
  return { success: true };
}

function finishRace(state) {
  if (!state.currentSession) {
    return { success: false, message: 'No active race.' };
  }

  state.raceMode = 'FINISH';
  return { success: true };
}

function endSession(state) {
  if (!state.currentSession) {
    return { success: false, message: 'No active race to end.' };
  }

  if (state.raceMode !== 'FINISH') {
    return { success: false, message: 'Race must be in FINISH mode before ending the session.' };
  }

  state.previousSession = state.currentSession;
  state.currentSession = null;
  state.raceMode = 'DANGER';
  state.remainingTime = 0;

  return { success: true };
}

module.exports = {
  startRace,
  setRaceMode,
  finishRace,
  endSession
};