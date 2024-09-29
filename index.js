//import Player from "./Player.js";
//import Floor from "./Floor.js";
//import Spike from "./Spike.js";

let drawable = [];
let spikeArray = []; //add spikes to own list, - this would make it possible to have multiple instances of spikes at the same time
const nrOfSpikes = 10;
const bob = new Player();
const floor = new Floor();
//const spike = new Spike();

function setup() {
  //windowX = windowWidth;
  //windowY = windowHeight;
  createCanvas(windowWidth, windowHeight);
  drawable.push(bob);
  drawable.push(floor);

  for (let i = 0; i < nrOfSpikes; i++) {
    if (i != 0) {
      spikeArray[i] = new Spike(spikeArray[i - 1].x + 400);
    } else {
      spikeArray[i] = new Spike(bob.x + 200);
    }
  }
}

function draw() {
  background(250, 200, 250);

  if (!bob.isDead) {
    translate(-bob.x + width / 2 - bob.size / 2, 350);

    spikeArray.forEach((object) => {
      object.update();
      object.draw();
    });

    drawable.forEach((object) => {
      object.update();
      object.draw();
    });
  } else {
    fill(0);
    textSize(32);
    text("Game Over", bob.x + 200, 300);
  }

  debugText();
}

function keyPressed() {
  if (keyCode === UP_ARROW && !bob.isDead) {
    bob.jump();
  } else if (bob.isDead && key === "R") {
    resetGame();
  }
}

function resetGame() {
  bob.isDead = false;
  bob.x = 0;
  bob.y = 350;
  bob.points = 0;

  spikeArray = spikeArray.map((spike, i) => {
    return new Spike(i === 0 ? bob.x + 200 : spikeArray[i - 1].x + 400);
  });
}

function debugText() {
  fill(0);
  textSize(16);
  text("Y_index of bob: " + bob.y, bob.x + 200, 200);
  text("X_index of bob: " + bob.x, bob.x + 200, 220);
  text("WindowWidth: " + windowWidth, bob.x + 200, 240);
  text("WindowHeight: " + windowHeight, bob.x + 200, 260);
  text("X of floor: " + floor.x, bob.x + 350, 200);
  text("Points: " + bob.points, bob.x + 350, 220);
  text("Dead: " + bob.isDead, bob.x + 350, 240); // Added dead status
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //windowX = windowWidth;
  //windowY = windowHeight;
  //spike.x += windowX;
}

//jump function
function keyPressed() {
  if (keyCode === UP_ARROW) {
    bob.jump();
  }
}
