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
    // Choose color based on type
    fill(this.type === "bird" ? color(255, 255, 0) : color(255, 0, 0)); // Different color for bird and monster
    ellipse(this.x, this.y, this.size);

    // Draw wings for birds or legs for monsters
    if (this.type === "bird") {
      triangle(
        this.x - 10,
        this.y,
        this.x + 10,
        this.y - 20,
        this.x + 10,
        this.y + 20
      );
    } else {
      rect(this.x - 20, this.y + this.size / 2, 20, 30); // Legs
    }
  }

  update() {
    this.x += this.xVelocity;
    if (this.x < -this.size) {
      this.x = random(width, width + 500); // Respawn when off-screen
    }
  }

  checkCollision(player) {
    if (player.invincible) return false; // No collision if player is invincible
    let distance = dist(this.x, this.y, player.x, player.y);
    return distance < this.size / 2 + player.size / 2; // Check for collision
  }
}
