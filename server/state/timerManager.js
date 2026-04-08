let raceTimer = null;

function startTimer(state, onTick, onFinish) {
  stopTimer();

  raceTimer = setInterval(() => {
    if (state.remainingTime > 0) {
      state.remainingTime -= 1;
      onTick();
    }

    if (state.remainingTime <= 0) {
      stopTimer();
      onFinish();
    }
  }, 1000);
}

function stopTimer() {
  if (raceTimer) {
    clearInterval(raceTimer);
    raceTimer = null;
  }
}

module.exports = {
  startTimer,
  stopTimer
};