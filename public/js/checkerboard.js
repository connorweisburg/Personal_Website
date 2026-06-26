const squareSize = 40;

// Create a square
function createSquare(x, y, panel, label = null) {
  const square = document.createElement('div');

  square.style.position = 'absolute';
  square.style.width = squareSize + 'px';
  square.style.height = squareSize + 'px';
  square.style.backgroundColor = `hsl(${Math.random() * 360},70%,50%)`;

  // text styling (for starter squares)
  square.style.display = 'flex';
  square.style.alignItems = 'center';
  square.style.justifyContent = 'center';
  square.style.fontSize = '10px';
  square.style.fontWeight = 'bold';
  square.style.color = 'white';
  square.style.userSelect = 'none';

  if (label) square.textContent = label;

  // motion + spin
  let vx = (Math.random() - 0.5) * 4;
  let vy = (Math.random() - 0.5) * 4;
  let angle = 0;
  let spinVelocity = (Math.random() - 0.5) * 40;

  let chargeStart = null;

  square.style.left = x + 'px';
  square.style.top = y + 'px';

  // charge start
  square.addEventListener('mousedown', () => {
    chargeStart = Date.now();
  });

  // release = apply impulse
  const release = () => {
    if (!chargeStart) return;

    const chargeTime = Math.min(Date.now() - chargeStart, 2000);
    const power = 1 + chargeTime / 200;
    const angleDir = Math.random() * Math.PI * 2;

    vx += Math.cos(angleDir) * power * 2;
    vy += Math.sin(angleDir) * power * 2;

    // spin tied to movement
    spinVelocity += (vx + vy) * 40;

    square.style.backgroundColor =
      `hsl(${Math.random() * 360},70%,50%)`;

    chargeStart = null;
  };

  square.addEventListener('mouseup', release);
  square.addEventListener('mouseleave', release);

  // animation loop
  function animate() {
    angle += spinVelocity;
    spinVelocity *= 0.95;
    square.style.transform = `rotate(${angle}deg)`;

    x += vx;
    y += vy;

    // bounce inside panel
    if (x < 0) { x = 0; vx *= -1; }
    if (x + squareSize > panel.clientWidth) {
      x = panel.clientWidth - squareSize;
      vx *= -1;
    }

    if (y < 0) { y = 0; vy *= -1; }
    if (y + squareSize > panel.clientHeight) {
      y = panel.clientHeight - squareSize;
      vy *= -1;
    }

    square.style.left = x + 'px';
    square.style.top = y + 'px';

    // friction
    vx *= 0.98;
    vy *= 0.98;

    requestAnimationFrame(animate);
  }

  animate();
  panel.appendChild(square);
}

// Spawn square on panel click (ignore clicks on squares)
document.querySelectorAll('.checkerboard').forEach(panel => {
  panel.addEventListener('click', e => {
    if (e.target !== panel) return;

    const rect = panel.getBoundingClientRect();

    let x = e.clientX - rect.left - squareSize / 2;
    let y = e.clientY - rect.top - squareSize / 2;

    x = Math.max(0, Math.min(x, panel.clientWidth - squareSize));
    y = Math.max(0, Math.min(y, panel.clientHeight - squareSize));

    createSquare(x, y, panel);
  });
});

// Spawn two starter squares on load
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.checkerboard').forEach(panel => {
    const x = panel.clientWidth / 2 - squareSize / 2;
    const y = panel.clientHeight / 2 - squareSize / 2;

    createSquare(x, y, panel, "click me");
  });
});