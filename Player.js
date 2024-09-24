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
    rect(this.x, this.y, this.size, this.size);
  }
}
