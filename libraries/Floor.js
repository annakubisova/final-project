// Floor.js
class Floor {
  constructor() {
    this.x = 0;
    this.y = 400;
    this.width = 600;
    this.height = 200;
  }

  draw() {
    fill(0, 200, 0);
    rect(this.x, this.y, this.width, this.height);
  }

  update() {}
}
