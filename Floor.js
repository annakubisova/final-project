// Floor.js
class Floor {
  constructor() {
    this.x = 0;
    this.y = 500;
    this.width = windowWidth;
    this.height = 20;

    // Store tree positions only once in setup
    this.trees = [];
    for (let i = 0; i < width; i += random(150, 300)) {
      this.trees.push({ x: i }); // Create an array of tree positions
    }
  }

  draw() {
    // Draw the floor
    fill(0, 200, 0);
    rect(this.x, this.y, this.width, this.height);

    // Draw trees from pre-calculated positions
    this.trees.forEach((tree) => {
      this.drawTree(tree.x); // Draw each tree at its fixed position
    });
  }

  drawTree(xPos) {
    fill(139, 69, 19); // Brown tree trunk
    rect(xPos, this.y - 200, 40, 150); // Taller and thicker trunk
    fill(34, 139, 34); // Green tree top
    ellipse(xPos + 20, this.y - 250, 120, 120); // Larger tree top
  }
}

update();
if (this.x + bob.x < -windowWidth) {
  this.x += windowWidth / 2;
}
