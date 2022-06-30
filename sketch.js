const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;
const MAX_ORBIT = 6
const CENTER_X = CANVAS_WIDTH/2;
const CENTER_Y = CANVAS_HEIGHT/2;
const Z = 1;
const k = 8.9875 * 10e9;
const e = 1.602176634 * 10e-19;
const r1 = 5.29 * 10e-11;
const E1 = - (Z * k * e*e) / (2 * r1);
const h = 6.62607015 * 10e-34;
const c = 299_792_458;

let currentOrbit = 1;
let previousOrbit = 1;
let waveLength;
let angle = 0;
let angleStep = 0.01;
let radius = 50;
let orbitSlider;

class Photon {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  orbitSlider = createSlider(1, MAX_ORBIT, 1);
  orbitSlider.position(10, 10);
  orbitSlider.style('width', '100px');

  photonsList = Array();
}

function draw() {
  background(230, 230, 230);
  drawOrbits();
  drawProton();
  drawElectron();
  drawEmittedPhotons();
  fill(0, 0, 0);
  textSize(15);
  text('Numer orbity: ' + orbitSlider.value(), 10, 50);
  if (waveLength != undefined) {
   if (waveLength > 0) {
    text('Długość wyemitowanej fali: ' + waveLength + ' nm', 10, 690);
   } else {
    text('Max długość potrzebnej fali: ' + -1*waveLength + ' nm', 10, 690);
   }
  }
}

function drawProton() {
  fill(255, 0, 0);
  circle(CENTER_X, CENTER_Y, 20);
}

function drawOrbits() {
  fill(230, 230, 230);
  for (let i = MAX_ORBIT; i >= 1; i--) {
    diameter = radius * i * 2
    circle(CENTER_X, CENTER_Y, diameter);
  }
}

function drawElectron() {
  previousOrbit = currentOrbit;
  currentOrbit = orbitSlider.value();
  if (previousOrbit != currentOrbit) {
    waveLength = sophisticatedCalculations(previousOrbit, currentOrbit);
  }
  angle += angleStep;
  x = CENTER_X + cos(angle) * radius * currentOrbit;
  y = CANVAS_HEIGHT/2 + sin(angle) * radius * currentOrbit;
  fill(0, 0, 255);
  circle(x, y, 10);
}

function drawEmittedPhotons() {
  if (previousOrbit > currentOrbit) {
    x = CENTER_X + cos(angle) * radius * currentOrbit;
    y = CANVAS_HEIGHT/2 + sin(angle) * radius * currentOrbit;
    direction = 1;
    if (x < CENTER_X) {
      direction = -1;
    }
    photonsList.unshift(new Photon(x, y, direction));
  }
  for (let i = 0; i < photonsList.length; i++) {
    fill(255, 255, 255);
    photonsList[i].x += 5 * photonsList[i].direction;
    circle(photonsList[i].x, photonsList[i].y, 10);
  }
}

function sophisticatedCalculations(previousOrbit, currentOrbit) {
  Ediff = En(previousOrbit) - En(currentOrbit);
  lambda = h * c / Ediff;
  return lambda;
}

function En(n) {
  return E1 / n / n;
}

