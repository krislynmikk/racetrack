function enableFullscreen(buttonId) {
  const btn = document.getElementById(buttonId);

  if (!btn) return;

  btn.addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen toggle failed:', error);
    }
  });

  document.addEventListener('fullscreenchange', () => {
    btn.textContent = document.fullscreenElement ? 'Exit Fullscreen' : 'Fullscreen';
  });
}