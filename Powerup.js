// Powerup.js
class Powerup {
  constructor(x, type) {
    this.x = x;
    this.y = 300;
    this.size = 30;
    this.collected = false;
    this.type = type; // 'speed' or 'invincibility'
  }

  draw() {
    if (!this.collected) {
      if (this.type === "speed") {
        fill(0, 255, 0); // Green for speed boost
      } else if (this.type === "invincibility") {
        fill(255, 255, 0); // Yellow for invincibility
      }
      ellipse(this.x, this.y, this.size);
    }
  }

  update() {
    this.x -= 2;
  }

  checkCollision(player) {
    let distance = dist(this.x, this.y, player.x, player.y);
    return distance < this.size / 2 + player.size / 2;
  }

  applyEffect(player) {
    this.collected = true;
    if (this.type === "speed") {
      player.speedBoost();
    } else if (this.type === "invincibility") {
      player.invincibility();
    }
  }
}

// Add this method to Player class
class Player {
  constructor() {
    // ... rest of Player properties
    this.invincible = false;
    this.speedMultiplier = 1;
    this.invincibilityTimer = 0;
    this.speedBoostTimer = 0;
  }

  speedBoost() {
    this.speedMultiplier = 2; // Double speed for a few seconds
    this.speedBoostTimer = millis(); // Start the timer
  }

  invincibility() {
    this.invincible = true; // Make Bob invincible for a few seconds
    this.invincibilityTimer = millis();
  }

  update() {
    if (this.isJumping) {
      this.y += this.yVelocity;
      this.x += 4 * this.speedMultiplier;
      this.yVelocity += 1;
      if (this.y >= 350) {
        this.y = 350;
        this.isJumping = false;
        this.yVelocity = 0;
      }
    }

    // Handle speed boost duration
    if (this.speedBoostTimer && millis() - this.speedBoostTimer > 5000) {
      this.speedMultiplier = 1; // Reset speed after 5 seconds
      this.speedBoostTimer = 0;
    }

    // Handle invincibility duration
    if (this.invincibilityTimer && millis() - this.invincibilityTimer > 5000) {
      this.invincible = false; // Reset invincibility after 5 seconds
      this.invincibilityTimer = 0;
    }
  }

  // Add this to your `checkIfDead` method in Spike class:
  checkIfDead() {
    if (bob.invincible) return; // Skip death if Bob is invincible
    // ... rest of the checkIfDead logic
  }
}
