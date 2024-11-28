// Adventure Forge - A simple platformer game in JavaScript
// This code assumes the use of a basic HTML5 canvas setup

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const gameWidth = 800;
const gameHeight = 600;
const gravity = 0.5;
const playerSpeed = 5;
const jumpStrength = -10;

// Player object
const player = {
  x: 50,
  y: gameHeight - 150,
  width: 50,
  height: 50,
  color: 'blue',
  dy: 0,
  onGround: false,
};

// Platforms array
const platforms = [
  { x: 0, y: gameHeight - 100, width: gameWidth, height: 20 },
  { x: 300, y: 400, width: 150, height: 20 },
  { x: 550, y: 300, width: 200, height: 20 },
];

// Input handling
const keys = {};
window.addEventListener('keydown', (e) => (keys[e.key] = true));
window.addEventListener('keyup', (e) => (keys[e.key] = false));

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, gameWidth, gameHeight);

  // Draw platforms
  platforms.forEach((platform) => {
    ctx.fillStyle = 'green';
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });

  // Update player position
  player.dy += gravity;
  player.y += player.dy;

  if (keys['ArrowLeft']) player.x -= playerSpeed;
  if (keys['ArrowRight']) player.x += playerSpeed;

  // Collision detection
  player.onGround = false;
  platforms.forEach((platform) => {
    if (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y < platform.y + platform.height &&
      player.y + player.height > platform.y
    ) {
      player.y = platform.y - player.height;
      player.dy = 0;
      player.onGround = true;
    }
  });

  // Jumping
  if (keys['ArrowUp'] && player.onGround) {
    player.dy = jumpStrength;
  }

  // Prevent player from leaving canvas bounds
  player.x = Math.max(0, Math.min(player.x, gameWidth - player.width));

  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  requestAnimationFrame(gameLoop);
}

// Initialize game
canvas.width = gameWidth;
canvas.height = gameHeight;
requestAnimationFrame(gameLoop);
