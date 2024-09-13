class Player {
  constructor() {
    this.x = 0;
    this.y = 350;
    this.size = 50;
    this.yVelocity = 0;
    this.jumpStrength = 15;
    this.isJumping = false;
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
      this.yVelocity += 1;
      if (this.y >= 200) {
        this.y = 200;
        this.isJumping = false;
        this.yVelocity = 0;
      }
    }
  }

  draw() {
    fill(255, 255, 255);
    rect(this.x, this.y, this.size, this.size);
  }
}
