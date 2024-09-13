import Player from "./Player";
import Floor from "./Floor";
import Spike from "./Spike";

let drawable = [];

function setup() {
  const bob = new Player();
  const floor = new Floor();
  const spike = new Spike();
  drawable.push(bob);
  drawable.push(floor);
  drawable.push(spike);
}

function draw() {
  background(250, 200, 250);
  drawable.forEach(function (object) {
    object.update();
    object.draw();
  });
}

//jump function
function keyPressed() {
  if (keyCode === UP_ARROW) {
    player.jump();
  }
}
