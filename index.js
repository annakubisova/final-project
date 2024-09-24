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
  translate(-bob.x + width / 2 - bob.size / 2, 350);

  spikeArray.forEach(function (object) {
    //calling internal functions in objects in the spikeArray array
    object.update();
    object.draw();
  });
  drawable.forEach(function (object) {
    // calling internal functions in objects in the drawable array
    object.update();
    object.draw();
  });
  debugText();
}

function debugText() {
  fill(0);
  text("Y_index of bob: " + bob.y, bob.x + 200, 200);
  text("X_index of bob: " + bob.x, bob.x + 200, 220);
  text("windowWidth:" + windowWidth, bob.x + 200, 240);
  text("windowHeight:" + windowHeight, bob.x + 200, 260);
  text("X of floor:" + floor.x, bob.x + 350, 200);
  text("Number of points:" + bob.points, bob.x + 350, 220);

  text("X_index of spike 0:" + spikeArray[0].x, bob.x + 120, 70);
  text("X_index of spike 1:" + spikeArray[0].x, bob.x + 120, 70);
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
