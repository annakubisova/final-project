class Floor {
  constructor() {
    this.x = 0;
    this.y = 600;
    this.width = windowWidth;
    this.height = windowHeight;
    this.treeWidth = 40; // Width of each tree trunk
    this.trees = [];

    // Tree positions
    for (let i = 0; i < windowWidth * 2; i += random(300, 600)) {
      this.trees.push({ x: i });
    }
  }

  // Method to draw the floor and trees
  draw() {
    // Draw the floor
    fill(0, 200, 0);
    rect(this.x, this.y, this.width, this.height);

    // Draw each tree in the trees array
    this.trees.forEach((tree) => {
      this.drawTree(tree.x);
    });
  }

  // Separate method to draw an individual tree
  drawTree(xPos) {
    fill(139, 69, 19); // Tree trunk color
    rect(xPos, this.y - 150, this.treeWidth, 150); // Adjust the height to make trees grow from the floor
    fill(34, 139, 34); // Tree foliage color
    ellipse(xPos + this.treeWidth / 2, this.y - 200, 120, 120); // Adjust foliage height to match the trunk
  }
}
