// Floor.js
class Floor {
  constructor() {
    this.x = 0;
    this.y = 500;
    this.width = width;
    this.height = 20;
  }

  draw() {
    fill(0, 200, 0);
    rect(this.x, this.y, this.width, this.height);

    // Draw trees
    for (let i = this.x; i < this.x + width; i += 200) {
      this.drawTree(i);
    }

    // Draw butterflies
    this.drawButterflies();
  }

  drawTree(xPos) {
    fill(139, 69, 19); // Brown tree trunk
    rect(xPos, this.y - 100, 20, 100);
    fill(34, 139, 34); // Green tree top
    ellipse(xPos + 10, this.y - 120, 60, 60);
  }

  drawButterflies() {
    fill(255, 192, 203);
    for (let i = 0; i < 3; i++) {
      ellipse(random(width), random(200, 400), 20, 10);
    }
  }

  update() {
    let floorPos = this.x + bob.x;
    if (floorPos < -windowWidth) {
      this.x += windowWidth / 2;
    }
  }
}
