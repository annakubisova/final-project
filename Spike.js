// Spike.js
class Spike {
  constructor(x) {
    this.x = x;
    this.y = 400;
    this.width = 50;
    this.height = 50;
    this.xVelocity = random(-3, -1); // Random speed for each spike
    this.isDead = false;
  }

  update() {
    this.checkIfDead();
    this.moveSpike();
    this.x += this.xVelocity;
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

  moveSpike() {
    if (this.x < bob.x - windowWidth / 2) {
      let furtherSpike = spikeArray.reduce((rightmost, spike) => {
        //find the spike furthest way
        return spike.x > rightmost.x ? spike : rightmost; //check if the
      });
      this.x = furtherSpike.x + random(300, 600); // move spike 400x to the right of the furthest spike
      bob.points += 1;
    }
  }

  checkIfDead() {
    let spikeLeftEdge = this.x;
    let spikeRightEdge = this.x + this.width;
    let bobLeftEdge = bob.x;
    let bobRightEdge = bob.x + bob.size;

    // Check if Bob's edges intersect the spike's edges, and if he’s on the ground and not invincible
    if (
      bobRightEdge > spikeLeftEdge &&
      bobLeftEdge < spikeRightEdge &&
      bob.y >= 350 &&
      !bob.invincible
    ) {
      bob.isDead = true; // Bob dies if he collides with the spike and is not invincible
      console.log("Bob is dead!");
    }
  }
}
