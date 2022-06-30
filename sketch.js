let currentOrbit = 1;

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;
const MAX_ORBIT = 6

let angle = 0;
let angleStep = 0.01;
let radius = 50;
const CENTER_X = CANVAS_WIDTH/2;
const CENTER_Y = CANVAS_HEIGHT/2;

let orbitSlider;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  orbitSlider = createSlider(1, MAX_ORBIT, 1);
  orbitSlider.position(10, 10);
  orbitSlider.style('width', '100px');
}

function draw() {
  background(230, 230, 230);
  drawOrbits();
  drawProton();
  drawElectron();
}


function drawProton() {
  fill(255, 0, 0);
  circle(CENTER_X, CENTER_Y, 20);
}

function drawOrbits() {
  fill(210, 210, 210);
  for (let i = MAX_ORBIT; i >= 1; i--) {
    diameter = radius * i * 2
    circle(CENTER_X, CENTER_Y, diameter);
  }
}

function drawElectron() {
  currentOrbit = orbitSlider.value();
  angle += angleStep;
  x = CENTER_X + cos(angle) * radius * currentOrbit;
  y = CANVAS_HEIGHT/2 + sin(angle) * radius * currentOrbit;
  fill(0, 0, 255);
  circle(x, y, 10);
}
