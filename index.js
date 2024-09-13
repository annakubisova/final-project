//import Player from "./Player.js";
//import Floor from "./Floor.js";
//import Spike from "./Spike.js";

let drawable = [];

const bob = new Player();
const floor = new Floor();
const spike = new Spike();

function setup() {
  windowX = windowWidth;
  windowY = windowHeight;
  createCanvas(windowWidth, windowHeight);
  drawable.push(bob);
  drawable.push(floor);
  drawable.push(spike);
}

function draw() {
  background(250, 200, 250);
  translate(-bob.x + width / 2 - bob.size / 2, 0);
  drawable.forEach(function (object) {
    object.update();
    object.draw();
    text("Y_index of bob: " + bob.y, bob.x + 200, 200);
    text("X_index of bob: " + bob.x, bob.x + 200, 220);
    text("X_index of spike: " + spike.x, bob.x + 200, 240);
    text("WindowX: " + windowX, bob.x + 200, 260);
    text("WindowY: " + windowY, bob.x + 200, 280);
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  windowX = windowWidth;
  windowY = windowHeight;
  //spike.x += windowX;
}

//jump function
function keyPressed() {
  if (keyCode === UP_ARROW) {
    bob.jump();
  }
}
