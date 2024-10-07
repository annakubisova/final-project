// Enemy.js
class Enemy {
  constructor(type) {
    this.x = random(width, width + 500); // Start off-screen
    this.y = type === "bird" ? random(200, 300) : 400; // Birds fly, monsters stay on the ground
    this.size = type === "bird" ? 40 : 60;
    this.type = type; // "bird" or "monster"
    this.xVelocity = random(-2, -4); // Random speed
  }

  draw() {
    fill(this.type === "bird" ? 255 : 100); // Different color for bird and monster
    ellipse(this.x, this.y, this.size);
  }

  update() {
    this.x += this.xVelocity;
    if (this.x < -this.size) {
      this.x = random(width, width + 500); // Respawn when off-screen
    }
  }

  checkCollision(player) {
    let distance = dist(this.x, this.y, player.x, player.y);
    return distance < this.size / 2 + player.size / 2;
  }
}
