// Floor.js
class Floor {
  constructor() {
    this.x = -1000;
    this.y = 400;
    this.width = 7000;
    this.height = 200;
  }

  draw() {
    fill(0, 200, 0);
    rect(this.x, this.y, this.width, this.height);
  }

  update() {
    let floorPos = this.x - bob.x;
    if (floorPos < -windowWidth) {
      this.x += windowWidth / 2;
    }
  }
}
