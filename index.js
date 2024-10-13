// Endless Runner game was made with help and by courtesy of Felix Stockinger (stfe20sz@student.ju.se)
// The following lines of code were also made with assistance of ChatGPT; links to chats: https://chatgpt.com/share/67094f38-4324-8004-8851-f36f63426d48, https://chatgpt.com/share/67097073-2a34-8000-93dc-23a7f2a9126f, https://chatgpt.com/share/670970a8-9e70-8000-b70f-1cfc54acd366, https://chatgpt.com/share/670970f6-5c2c-8000-bfa3-46e3d2d36d98, https://chatgpt.com/share/67097129-04ac-8000-8fc5-d9afee1837cb
// Assistance was also taken from https://www.w3schools.com/js/js_classes.asp
// Sounds for the game were used and downloaded from https://freesound.org

let drawable = [];
let spikeArray = []; // add spikes to own list, - this would make it possible to have multiple instances of spikes at the same time
let clouds = []; //define clouds array globally
let powerups = []; // powerups array
const nrOfSpikes = 10;
const nrOfPowerups = 2;
let skyColor = { r: 155, g: 186, b: 255 }; // Sky color object for automatic color change
let skyTimer = 0; // Timer to control sky color changes

let bob; // Initialize variable for Player
let floor;
let gameState = "startScreen"; // Set the initial state to startScreen
let bgMusic;
let jumpSound;
let powerupSound;
let bobDiedSound;
let gameOverMusic;

function preload() {
  bgMusic = loadSound("assets/background.wav");
  jumpSound = loadSound("assets/jump.wav");
  bobDiedSound = loadSound("assets/bobdied.wav");
  gameOverMusic = loadSound("assets/gameover.wav");
  powerupSound = loadSound("assets/powerup.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialize player and floor inside setup
  floor = new Floor();
  bob = new Player();
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

  // Create powerups
  for (let i = 0; i < nrOfPowerups; i++) {
    powerups.push(new Powerup(random(bob.x + 500, bob.x + 1000)));
  }
}

function draw() {
  drawBackground();
  // Display debugging info
  debugText();

  if (gameState === "startScreen") {
    drawStartScreen();
  } else if (gameState === "playing") {
    playGame();
  } else if (gameState === "gameOver") {
    drawGameOver();
  }
}

function drawStartScreen() {
  fill(0);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("Endless Runner 🏃‍♂️", width / 2, height / 2 - 50);
  textSize(30);
  text("Press ENTER to start the game", width / 2, height / 2 + 50);
}

function playGame() {
  drawBackground();
  floor.draw();

  push(); // Save current transformation state
  translate(-bob.x + width / 2 - bob.size / 2, 350);

  spikeArray.forEach((spike) => {
    spike.update();
    spike.draw();
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
    gameOverMusic.play();
  }
}

// Function to draw the game over screen
function drawGameOver() {
  background(135, 206, 235);
  fill(0);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height / 2 - 50);
  textSize(30);
  text("Press R to restart the game", width / 2, height / 2 + 50);

  // Show the game over screen
  let endScreen = select(".end-screen");
  if (endScreen) endScreen.style("display", "block");

  // Play game over music only once
  if (!gameOverMusic.isPlaying()) {
    gameOverMusic.play();
  }
}

function keyPressed() {
  if (keyCode === ENTER && gameState === "startScreen") {
    gameState = "playing"; // Start the game

    // Hide the start screen text
    let title = select(".game-title");
    let instructions = select(".game-instructions");
    if (title) title.style("display", "none");
    if (instructions) instructions.style("display", "none");

    // Start background music
    if (!bgMusic.isPlaying()) {
      bgMusic.loop();
    }
  } else if (keyCode === UP_ARROW && gameState === "playing" && !bob.isDead) {
    bob.jump(); // Bob jumps with UP_ARROW
  } else if ((key === "r" || key === "R") && gameState === "gameOver") {
    resetGame(); // Reset the game
    gameOverMusic.stop(); // Stop game over music

    // Hide the Game Over screen
    let endScreen = select(".end-screen");
    if (endScreen) endScreen.style("display", "none");

    gameOverMusic.stop(); // Stop game-over music
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

// Function to draw clouds
function makeCloud(cloudx, cloudy) {
  fill(250);
  noStroke();
  ellipse(cloudx, cloudy, 40, 20);
  ellipse(cloudx + 20, cloudy + 10, 70, 50);
  ellipse(cloudx - 20, cloudy + 10, 70, 50);
  ellipse(cloudx - 70, cloudy + 10, 70, 50);
}

// Function to reset the game
function resetGame() {
  bob = new Player();
  bob.x = 0;
  bob.y = 350;
  bob.points = 0;
  bob.isDead = false;

  // Reset floor and spikes
  floor = new Floor();
  spikeArray = [];
  for (let i = 0; i < nrOfSpikes; i++) {
    spikeArray[i] = new Spike(
      i === 0 ? bob.x + 200 : spikeArray[i - 1].x + 400
    );
  }

  // Reset powerups
  powerups = [];
  for (let i = 0; i < nrOfPowerups; i++) {
    powerups.push(new Powerup(random(bob.x + 500, bob.x + 1000)));
  }

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
  // text("Y_index of bob: " + bob.y, xPos, yPos);
  // text("X_index of bob: " + bob.x, xPos, yPos + 30);
  // text("WindowWidth: " + windowWidth, xPos, yPos + 60);
  // text("WindowHeight: " + windowHeight, xPos, yPos + 90);
  // text("X of floor: " + floor.x, xPos, yPos + 120);
  // text("Dead: " + bob.isDead, xPos, yPos + 180); // Dead status
  text("Points: " + bob.points, xPos, yPos + 150);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
