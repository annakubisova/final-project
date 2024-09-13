// Floor.js
class Floor {
  constructor() {
    this.x = 0;
    this.y = 400;
    this.width = 7000;
    this.height = 900;
  }

  draw() {
    fill(0, 200, 0);
    rect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x = -windowX;
    //this.y = 400;
  }
}
