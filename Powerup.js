// Powerup.js
class Powerup {
  constructor(x) {
    this.x = x;
    this.y = random(height / 2, height - 100);
    this.size = 20;
    this.type = random(["speed", "invincible"]); // 'speed' or 'invincibility'
  }

  draw() {
    fill(this.type === "speed" ? color(255, 165, 0) : color(0, 255, 255));
    ellipse(this.x, this.y, this.size);
  }

  update() {
    this.x -= 2; // Move powerup to the left
  }

  checkCollision(player) {
    return (
      dist(this.x, this.y, player.x, player.y) < this.size / 2 + player.size / 2
    );
  }

  applyEffect(player) {
    if (this.type === "speed") {
      player.applySpeedBoost();
    } else {
      player.applyInvincibility();
    }
    powerupSound.play();
  }
}
