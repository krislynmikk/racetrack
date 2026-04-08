function recordLap(state, carNumber) {
  const session = state.currentSession;

  if (!session) {
    return { success: false, message: 'No active race.' };
  }

  const driver = session.drivers.find((d) => d.carNumber === carNumber);

  if (!driver) {
    return { success: false, message: 'Driver not found.' };
  }

  const now = Date.now();

  if (driver.lastLapTimestamp) {
    const lapTime = now - driver.lastLapTimestamp;

    if (driver.fastestLap === null || lapTime < driver.fastestLap) {
      driver.fastestLap = lapTime;
    }
  }

  driver.lastLapTimestamp = now;
  driver.laps += 1;

  return { success: true };
}

module.exports = {
  recordLap
};