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
let floor;
let enemies = [];
let gameState = "startScreen"; // Set the initial state to startScreen
let bgMusic;
let myMusic;
let jumpSound;
let powerupSound;
let bobDiedSound;
let gameOverMusic;

function startGame() {
  // Initialize sounds
  jumpSound = new Sound("assets/jump.wav"); // Jump sound effect
  powerupSound = new Sound("assets/powerup.wav"); // Powerup sound effect
  gameOverMusic = new Sound("assets/gameover.wav"); // Gameover music

  // Start background music
  bgMusic.loop();

  // Start the game area (your game setup code here)
  myGameArea.start();
}

// Example usage of sounds:
function playerJump() {
  jumpSound.play(); // Play the jump sound when the player jumps
}

function collectPowerup() {
  powerupSound.play(); // Play the powerup sound when a powerup is collected
}

function preload() {
  bgMusic = loadSound("assets/background.wav");
  bobDiedSound = loadSound("assets/bobdied.wav");
  gameOverMusic = loadSound("assets/gameover.wav");

  // Load powerup sound
  powerupSound = loadSound("assets/powerup.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgMusic.loop();

  // initialize player and floor inside setup
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

  // Initialize enemies array
  for (let i = 0; i < 5; i++) {
    let type = random(["bird", "monster"]);
    enemies.push(new Enemy(type)); // Create either a bird or a monster
  }

  // Create powerups
  for (let i = 0; i < nrOfPowerups; i++) {
    powerups.push(new Powerup(random(bob.x + 500, bob.x + 1000)));
  }
}

function draw() {
  if (gameState === "startScreen") {
    background(135, 206, 235); // Sky blue background
    drawStartScreen();
  } else if (gameState === "playing") {
    drawBackground();

    // Game logic: draw and update objects if Bob is not dead
    push(); // Save the current transformation state
    translate(-bob.x + width / 2 - bob.size / 2, 350);

    // Draw floor, spikes, blocks, enemies, powerups and player
    floor.draw();
    spikeArray.forEach((spike) => {
      spike.update();
      spike.draw();
    });

    blockArray.forEach((block) => {
      block.update();
      block.draw();
    });

    enemies.forEach((enemy) => {
      enemy.update();
      enemy.draw();
      if (enemy.checkCollision(bob)) {
        bob.isDead = true; // Handle collision with enemy
      }
    });

    powerups.forEach((powerup) => {
      powerup.update();
      powerup.draw();
      if (powerup.checkCollision(bob)) {
        powerup.applyEffect(bob);
      }
    });

    bob.update();
    bob.draw();

    pop(); // Restore the original transformation state

    // Check if Bob is dead and switch to 'gameOver' state
    if (bob.isDead) {
      gameState = "gameOver";
      // bobDiedSound.play();
    }
  } else if (gameState === "gameOver") {
    // Display "Game Over" text on the screen
    drawGameOver();
  }

  // Display debugging info
  debugText();
}

function drawStartScreen() {
  background(135, 206, 235);
  fill(0);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("Endless Runner", width / 2, height / 2 - 50);
  textSize(30);
  text("Press ENTER to start the game", width / 2, height / 2 + 50);
}

function keyPressed() {
  if (keyCode === ENTER && gameState === "startScreen") {
    gameState = "playing"; // Start the game
  } else if (keyCode === UP_ARROW && gameState === "playing" && !bob.isDead) {
    bob.jump(); // Bob jumps with up arrowy
  } else if ((key === "r" || key === "R") && gameState === "gameOver") {
    resetGame(); // Reset the game
    gameOverMusic.stop(); // Stop game over music
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

  // Play game music only once
  if (!gameOverMusic.isPlaying()) {
    gameOverMusic.play();
  }
}

// Reset the game when the player dies
function resetGame() {
  bob = new Player();
  bob.x = 0;
  bob.y = 350;
  bob.points = 0;
  bob.isDead = false;

  // Reset floor
  floor = new Floor();

  // Reset spikes
  spikeArray = [];
  for (let i = 0; i < nrOfSpikes; i++) {
    spikeArray[i] = new Spike(
      i === 0 ? bob.x + 200 : spikeArray[i - 1].x + 400
    );
  }

  // Reset blocks
  blockArray = [];
  for (let i = 0; i < nrOfBlocks; i++) {
    blockArray[i] = new Block(
      i === 0 ? bob.x + 600 : blockArray[i - 1].x + 500
    );
  }

  // Reset powerups
  powerups = [];
  for (let i = 0; i < nrOfPowerups; i++) {
    powerups.push(new Powerup(random(bob.x + 500, bob.x + 1000)));
  }

  // Reset enemies
  enemies = [];

  gameState = "playing";
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
