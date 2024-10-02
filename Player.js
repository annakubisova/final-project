class Player {
  constructor() {
    this.x = 0;
    this.y = 350;
    this.size = 50;
    this.yVelocity = 0;
    this.jumpStrength = 15;
    this.points = 0;
    this.isJumping = false;
    this.isDead = false;
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.yVelocity = -this.jumpStrength;
    }
  }

  update() {
    if (this.isJumping) {
      this.y += this.yVelocity;
      this.x += 4;
      this.yVelocity += 1;
      if (this.y >= 350) {
        this.y = 350;
        this.isJumping = false;
        this.yVelocity = 500;
      }
    }
  }

  draw() {
    fill(255, 255, 255);

    // Draw head
    ellipse(this.x + this.size / 2, this.y - this.size / 2, this.size * 0.8); // head

    // Draw body
    rect(this.x + this.size / 4, this.y, this.size / 2, this.size); // body

    // Draw legs
    line(
      this.x + this.size / 4,
      this.y + this.size,
      this.x,
      this.y + this.size + 20
    ); // left leg
    line(
      this.x + (3 * this.size) / 4,
      this.y + this.size,
      this.x + this.size,
      this.y + this.size + 20
    ); // right leg

    // Draw arms
    line(
      this.x + this.size / 4,
      this.y + this.size / 2,
      this.x,
      this.y + this.size / 2 + 20
    ); // left arm
    line(
      this.x + (3 * this.size) / 4,
      this.y + this.size / 2,
      this.x + this.size,
      this.y + this.size / 2 + 20
    ); // right arm
  }
}
