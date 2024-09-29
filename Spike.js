// Spike.js
class Spike {
  constructor() {
    this.x = 200;
    this.y = 400;
    this.width = 50;
    this.height = 50;
    this.xVelocity = -1;
    this.isDead = false;
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
    this.checkIfDead();
    this.moveSpike();
    this.x += this.xVelocity;
  }

  moveSpike() {
    if (this.x < bob.x - windowWidth / 2) {
      let furtherSpike = spikeArray.reduce((rightmost, spike) => {
        //find the spike furthest way
        return spike.x > rightmost.x ? spike : rightmost; //check if the
      });
      this.x = furtherSpike.x + 400; // move spike 400x to the right of the furthest spike
      bob.points += 1;
    }
  }

  checkIfDead() {
    let spikeLeftEdge = this.x;
    let spikeRightEdge = this.x + this.width;
    let bobLeftEdge = bob.x;
    let bobRightEdge = bob.x + bob.size;

    // Check if the player's x boundaries intersect the spike's x boundaries, and check if the player's y position is on the ground.
    if (
      bobRightEdge > spikeLeftEdge &&
      bobLeftEdge < spikeRightEdge &&
      bob.y >= 350
    ) {
      bob.isDead = true;
      console.log("Bob is dead!");
    }
  }
}
