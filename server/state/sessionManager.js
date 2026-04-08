function createSession(state) {
  const newSession = {
    id: `session-${Date.now()}`,
    drivers: []
  };

  state.sessions.push(newSession);
}

function deleteSession(state, sessionId) {
  state.sessions = state.sessions.filter((session) => session.id !== sessionId);
}

function addDriver(state, sessionId, name) {
  const session = state.sessions.find((item) => item.id === sessionId);

  if (!session) {
    return { success: false, message: 'Session not found.' };
  }

  if (!name || !name.trim()) {
    return { success: false, message: 'Driver name is required.' };
  }

  const trimmedName = name.trim();

  const nameExists = session.drivers.some(
    (driver) => driver.name.toLowerCase() === trimmedName.toLowerCase()
  );

  if (nameExists) {
    return { success: false, message: 'Driver name must be unique in this session.' };
  }

  if (session.drivers.length >= 8) {
    return { success: false, message: 'A session can have maximum 8 drivers.' };
  }

  const nextCarNumber = session.drivers.length + 1;

  session.drivers.push({
    name: trimmedName,
    carNumber: nextCarNumber,
    laps: 0,
    fastestLap: null,
    lastLapTimestamp: null
  });

  return { success: true };
}

function removeDriver(state, sessionId, carNumber) {
  const session = state.sessions.find((item) => item.id === sessionId);

  if (!session) {
    return { success: false, message: 'Session not found.' };
  }

  session.drivers = session.drivers.filter((driver) => driver.carNumber !== carNumber);

  session.drivers.forEach((driver, index) => {
    driver.carNumber = index + 1;
  });

  return { success: true };
}

module.exports = {
  createSession,
  deleteSession,
  addDriver,
  removeDriver
};