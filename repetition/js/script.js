"use strict"
const NUM_CYL = 100;
const NUM_ROWS = 25; //numbet of "rays" of cylinders
const CANVAS_SIZE = 1500;
let cylinderStartSize;
let angleCanvasRotation;
let angleCanvasRotationSpeed;
let angle;
let angleSpeed;
let cylinderSize;
let cylinderSizeIcrease;
let cylinderSizeDecrease;
let x;
let xIncrease;
let y;
function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(3/1500*windowHeight);
  ellipseMode(CORNER);
  frameRate(30);
  angleCanvasRotation = 0;
  angleCanvasRotationSpeed = -((2*PI)/NUM_ROWS)*2;
  cylinderStartSize = 1/1500*windowHeight;
  xIncrease = 7/1500*windowHeight;
  cylinderSizeIcrease = 1.3/1500*windowHeight;
}

function draw() {
  background(0);
  angle = 0;
  angleSpeed = (2*PI)/NUM_ROWS;
  cylinderSize = cylinderStartSize;
  x = 0;
  y = -cylinderSize/2;
  push();
  //translate(CANVAS_SIZE/2, CANVAS_SIZE/2);
  translate(windowWidth/2, windowHeight/2);
  rotate(angleCanvasRotation);
  for(let i = 0; i < NUM_CYL; i++){
    push();
    //translate(CANVAS_SIZE/2, CANVAS_SIZE/2);
    rotate(angle);
    drawCylinder();
    pop();
    angle+=angleSpeed;
    x+=xIncrease;
    if(i==NUM_CYL-NUM_ROWS){
      cylinderSizeDecrease = cylinderSize/(NUM_ROWS-1);
    }
    if(i>NUM_CYL-NUM_ROWS){
      cylinderSize-=cylinderSizeDecrease;
    }else{
      cylinderSize+= cylinderSizeIcrease;
    }
  }
  pop();
  angleCanvasRotation+=angleCanvasRotationSpeed;
}

function drawCylinder(){
  let w = sin(angle/3)*cylinderSize; //width of square
  let wC = cos(angle/3)*cylinderSize; // width of circles
  push();
  rotate(angle);
  fill(0);
  stroke(200);
  rect(x-w/2,y,w,cylinderSize);
  noStroke();
  ellipse(x -w/2-abs(wC/2), y, wC, cylinderSize);
  ellipse(x + w/2-abs(wC/2), y, wC, cylinderSize);
  noFill();
  stroke(200);
  ellipse(x -w/2-abs(wC/2), y, wC, cylinderSize);
  ellipse(x + w/2-abs(wC/2), y, wC, cylinderSize);
  pop();
}
