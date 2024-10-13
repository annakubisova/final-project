// Player.js
class Player {
  constructor() {
    this.x = 0;
    this.y = floor;
    this.size = 50;
    this.yVelocity = 0;
    this.jumpStrength = 15;
    this.points = 0;
    this.isJumping = false;
    this.isDead = false;
    this.invincible = false; // Invincibility powerup
    this.speedMultiplier = 1; // Speed boost powerup
    this.invincibilityTimer = 0; // Invincibility duration
    this.speedBoostTimer = 0; // Tracks speed boost duration
  }

  // Method for speed boost
  speedBoost() {
    this.speedMultiplier = 2; // Double speed for 5 seconds
    this.speedBoostTimer = millis(); // Start timer for 5 seconds
  }

  // Method for invincibility
  invincibility() {
    this.invincible = true; // Bob becomes invincible for 5 seconds
    this.invincibilityTimer = millis(); // Start timer for 5 seconds
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.yVelocity = -this.jumpStrength;
      jumpSound.play();
    }
  }

  update() {
    if (this.isJumping) {
      this.y += this.yVelocity;
      this.x += 4 * this.speedMultiplier; // Use speed boost multiplier
      this.yVelocity += 1;
      if (this.y >= 350) {
        this.y = 350;
        this.isJumping = false;
        this.yVelocity = 0;
      }
    }

    // Reset speed after 5 seconds
    if (this.speedBoostTimer && millis() - this.speedBoostTimer > 5000) {
      this.speedMultiplier = 1; //Reset speed multiplier to normal
      this.speedBoostTimer = 0;
    }

    // Reset invincibility after 5 seconds
    if (this.invincibilityTimer && millis() - this.invincibilityTimer > 5000) {
      this.invincible = false; // Reset invincibility
      this.invincibilityTimer = 0;
    }
  }

  die() {
    if (!this.isDead) {
      this.isDead = true;
      bobDiedSound.play();
    }
  }

  draw() {
    // Draw player character
    fill(0, 0, 255);
    rect(this.x + this.size / 4, this.y, this.size / 2, this.size); // Body

    // Draw Bob's face as an ellipse
    fill(255); // Solid white face
    ellipse(
      this.x + this.size / 2,
      this.y - this.size / 2,
      this.size * 0.8,
      this.size * 0.8
    ); // White ellipse for the face

    // Draw simple eyes and mouth
    fill(0); // Black for eyes and mouth
    ellipse(this.x + this.size / 2 - 10, this.y - this.size / 2 - 5, 5, 5); // Left eye
    ellipse(this.x + this.size / 2 + 10, this.y - this.size / 2 - 5, 5, 5); // Right eye
    arc(this.x + this.size / 2, this.y - this.size / 2 + 10, 15, 10, 0, PI); // Simple smiling mouth

    // Draw legs with a walking animation
    stroke(0);
    line(
      this.x + this.size / 4,
      this.y + this.size,
      this.x - 10,
      this.y + this.size + random(10, 20)
    );
    line(
      this.x + (3 * this.size) / 4,
      this.y + this.size,
      this.x + this.size,
      this.y + this.size + random(10, 20)
    );

    // Draw arms
    line(
      this.x + this.size / 4,
      this.y + this.size / 2,
      this.x - 10,
      this.y + this.size / 2 + random(10, 20)
    );
    line(
      this.x + (3 * this.size) / 4,
      this.y + this.size / 2,
      this.x + this.size + 10,
      this.y + this.size / 2 + random(10, 20)
    );
  }
}
