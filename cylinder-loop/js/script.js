"use strict"
const NUM_TILES = 10;
const CANVAS_SIZE = 500;
let tileSize = CANVAS_SIZE/NUM_TILES;
let angle = 0;
let angleSpeed = 0.02;

function setup() {
  createCanvas (CANVAS_SIZE,CANVAS_SIZE);
  noStroke();
  ellipseMode(CORNER);
}

function draw() {
  let w = sin(angle)*tileSize; //width of square
  let wC = cos(angle)*tileSize; // width of circles

  let phase = cos(angle); //shifts between black and white phase
  if(phase > 0){
    background(255);
    for(let y=0; y<=CANVAS_SIZE; y+=tileSize){
      for(let x= (y%(tileSize*2)===0)? 0 : tileSize; x<=CANVAS_SIZE; x+=tileSize*2){
        push();
        fill(0);
        rect(x + (tileSize-w)/2,y,w,tileSize); 
        ellipse(x + (tileSize-w)/2-wC/2, y, wC, tileSize);
        stroke(255);
        ellipse(x + (tileSize-w)/2 -wC/2 + w, y, wC, tileSize);
        pop();
      }
    }
  }else{
    background(0);
    for(let y=0; y<=CANVAS_SIZE; y+=tileSize){
      for(let x= (y%(tileSize*2)!==0)? 0 : tileSize; x<=CANVAS_SIZE; x+=tileSize*2){
        push();
        fill(255);
        noStroke();
        rect(x, y + (tileSize-w)/2,tileSize,w);
        ellipse(x,y + (tileSize-w)/2 + wC/2, tileSize, wC);
        stroke(0);
        ellipse(x, y + (tileSize-w)/2 + wC/2 + w, tileSize, wC);
        pop();
      }
    }
  }
  angle+=angleSpeed;
}
