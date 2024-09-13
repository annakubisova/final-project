// Spike.js
class Spike {
  constructor() {
    this.x = 200;
    this.y = 400;
    this.width = 50;
    this.height = 50;
    this.xVelocity = -1;
  }

  draw() {
    fill(255, 0, 0);
    triangle(
      this.x,
      this.y,
      this.x + this.width,
      this.y,
      this.x + this.width / 2,
      this.y - this.height
    );
  }

  update() {
    this.x += this.xVelocity;
    if (this.x < bob.x / 2 - windowX / 2) {
      this.x = windowX / 2 + bob.x;
    }
  }
}
