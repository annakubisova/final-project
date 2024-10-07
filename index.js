// index.js
let drawable = [];
let spikeArray = []; // add spikes to own list, - this would make it possible to have multiple instances of spikes at the same time
let blockArray = [];
let clouds = []; //define clouds array globally
let powerups = []; // powerups array
const nrOfSpikes = 10;
const nrOfBlocks = 5;
const nrOfPowerups = 2;
let skyColor = { r: 155, g: 186, b: 255 }; // Sky color object for automatic color change
let skyTimer = 0; // Timer to control sky color changes

let bob; // Initialize variable for Player
let gameState = "startScreen"; // Set the initial state to startScreen
let bgMusic;

function preload() {
  bgMusic = loadSound("path_to_your_music.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

// initialize player and floor
bob = new Player();
floor = new Floor();
drawable.push(bob);
drawable.push(floor);

// Create  clouds with random starting positions
for (let i = 3; i < 10; i++) {
  clouds.push({ x: random(width), y: random(70, 200) }); // Random x and y for each cloud
}

// Create spikes
for (let i = 0; i < nrOfSpikes; i++) {
  spikeArray[i] =
    i === 0 ? new Spike(bob.x + 200) : new Spike(spikeArray[i - 1].x + 400);
}

// Create blocks
for (let i = 0; i < nrOfBlocks; i++) {
  blockArray[i] =
    i === 0 ? new Block(bob.x + 600) : new Block(blockArray[i - 1].x + 500);
}

// Create powerups
for (let i = 0; i < nrOfPowerups; i++) {
  powerups.push(new Powerup(random(bob.x + 500, bob.x + 1000)));
}

function draw() {
  if (gameState === "startScreen") {
    drawStartScreen();
  } else if (gameState === "playing") {
    drawBackground();

    // Game logic: draw and update objects if Bob is not dead
    translate(-bob.x + width / 2 - bob.size / 2, 350);

    // Update and draw spikes
    spikeArray.forEach((spike) => {
      spike.update();
      spike.draw();
    });

    // Update and draw blocks
    blockArray.forEach((block) => {
      block.update();
      block.draw();
    });

    // Update and draw powerups
    powerups.forEach((powerup) => {
      powerup.update();
      powerup.draw();
      if (powerup.checkCollision(bob)) {
        // Check against Bob (the player)
        powerup.applyEffect(bob);
      }
    });

    // Update and draw drawable objects (player, floor etc.)
    drawable.forEach((object) => {
      object.update();
      object.draw();
    });

    // Check if Bob is dead and switch to 'gameOver' state
    if (bob.isDead) {
      gameState = "gameOver";
    }
  } else if (gameState === "gameOver") {
    // Display "Game Over" text on the screen
    drawGameOver();
    //fill(0);
    //textSize(32);
    //text("Game Over ☹️", bob.x + 200, 300);
  }

  // Display debugging info
  debugText();
}

function drawStartScreen() {
  background(135, 206, 235);
  fill(0);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("Endless Runner", width / 2, height / 2 + 50);
  textSize(30);
  text("Press ENTER to start the game", width / 2, height / 2 + 50);
}

function keyPressed() {
  if (keyCode === ENTER && gameState === "startScreen") {
    gameState = "playing"; // Start the game
  } else if (keyCode === UP_ARROW && gameState === "playing" && !bob.isDead) {
    bob.jump();
  } else if (key === "R" && gameState === "gameOver") {
    resetGame();
  }
}

// Function to draw the background, sun, and clouds
function drawBackground() {
  // Automatically cycle sky colors (moved inside drawBackground)
  skyTimer += 0.01;
  skyColor.r = map(sin(skyTimer), -1, 1, 155, 255); // Red cycling
  skyColor.g = map(sin(skyTimer + PI / 3), -1, 1, 186, 206); // Green cycling
  skyColor.b = map(sin(skyTimer + (2 * PI) / 3), -1, 1, 255, 135); // Blue cycling

  background(skyColor.r, skyColor.g, skyColor.b);

  // Draw sun
  fill(255, 204, 0);
  ellipse(width - 300, 150, 150);

  // Draw mountains
  fill(220);
  noStroke();
  triangle(100, height, 500, height, 300, 100); // Mountain 1
  fill(200);
  triangle(300, height, 500, height, 400, 200); // Mountain 2

  // Draw clouds
  clouds.forEach((cloud) => {
    makeCloud(cloud.x, cloud.y);
    cloud.x += 0.3;

    // Reset cloud position when it moves off-screen
    if (cloud.x > width) {
      cloud.x = -100;
    }
  });
}

// Function to draw a cloud at a specific position
function makeCloud(cloudx, cloudy) {
  fill(250);
  noStroke();
  ellipse(cloudx, cloudy, 40, 20);
  ellipse(cloudx + 20, cloudy + 10, 70, 50);
  ellipse(cloudx - 20, cloudy + 10, 70, 50);
  ellipse(cloudx - 70, cloudy + 10, 70, 50);
}

function drawGameOver() {
  // Clear the screen
  background(135, 206, 235); // Optional: Keep the background sky
  fill(0);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("GAME OVER:", width / 2, height / 2 - 50);
  textSize(30);
  text("Press R to restart the game", width / 2, height / 2 + 50);
}

// Reset the game when the player dies
function resetGame() {
  bob.isDead = false;
  bob.x = 0;
  bob.y = 350;
  bob.points = 0;

  // Reset spike positions
  spikeArray = spikeArray.map((spike, i) => {
    return new Spike(i === 0 ? bob.x + 200 : spikeArray[i - 1].x + 400);
  });

  gameState = "playing";
}

// Handle key press for jumping and restarting the game
function keyPressed() {
  if (keyCode === UP_ARROW && gameState === "playing" && !bob.isDead) {
    bob.jump();
  } else if (key === "R" && gameState === "gameOver") {
    resetGame(); // Restarts the game
  }
}

// Display debugging information on the right-middle of the screen
function debugText() {
  fill(0);
  textSize(25);

  // Calculate fixed x-position near the right edge, offset by 50 pixels
  let xPos = width - 250; // 250 pixels from the right edge

  // Calculate starting y-position for the middle, and then space each line by 30 pixels
  let yPos = height / 2 - 100; // Start near the middle of the screen, offset upwards

  // Display debug information with vertical spacing of 30 pixels
  text("Y_index of bob: " + bob.y, xPos, yPos);
  text("X_index of bob: " + bob.x, xPos, yPos + 30);
  text("WindowWidth: " + windowWidth, xPos, yPos + 60);
  text("WindowHeight: " + windowHeight, xPos, yPos + 90);
  text("X of floor: " + floor.x, xPos, yPos + 120);
  text("Points: " + bob.points, xPos, yPos + 150);
  text("Dead: " + bob.isDead, xPos, yPos + 180); // Dead status
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Block class
class Block {
  constructor(x) {
    this.x = x;
    this.y = 400;
    this.width = 60;
    this.height = 60;
  }

  draw() {
    fill(150, 75, 0);
    rect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x -= 2; // Move left like obstacles
    if (this.x < bob.x - windowWidth / 2) {
      this.x = bob.x + random(400, 600);
    }
  }
}

// Powerup class
class Powerup {
  constructor(x) {
    this.x = x;
    this.y = 300;
    this.size = 30;
    this.collected = false;
  }

  draw() {
    if (!this.collected) {
      fill(0, 255, 0);
      ellipse(this.x, this.y, this.size);
    }
  }

  update() {
    this.x -= 2;
  }

  checkCollision(player) {
    let distance = dist(this.x, this.y, player.x, player.y);
    return distance < this.size / 2 + player.size / 2;
  }

  applyEffect(player) {
    this.collected = true;
    // Apply powerup effect here, f. eg. increase speed or give invincibility
    player.points += 50; // Example: bonus points
  }
}
