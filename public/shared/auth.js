function createAuth(role) {
  return new Promise((resolve) => {
    const container = document.createElement('div');

    container.innerHTML = `
      <div style="
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:#0d1117;
        display:flex;
        justify-content:center;
        align-items:center;
      ">
        <div style="background:#161b22; padding:20px; border:1px solid #30363d;">
          <h2>Enter Access Key</h2>
          <input id="authInput" type="password" placeholder="Access key" />
          <button id="authBtn">Login</button>
          <p id="authError" style="color:red;"></p>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    const input = container.querySelector('#authInput');
    const button = container.querySelector('#authBtn');
    const errorText = container.querySelector('#authError');

    button.addEventListener('click', async () => {
      const key = input.value;

      const res = await fetch('/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, key })
      });

      const data = await res.json();

      if (data.success) {
        container.remove();
        resolve();
      } else {
        errorText.textContent = 'Wrong key';
      }
    });
      input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        button.click();
    }
    });
  });
}