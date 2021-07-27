"use strict"

const CANVAS_SIZE = 5000;
let count = 0;
let countSpeed = 20;
let dist = 0;
let distSpeed = 0.05;
let angleRot = 0;
let angleSpeed = 1;

function setup() {
  createCanvas (CANVAS_SIZE,CANVAS_SIZE);
  background(0);
  fill(255);
  stroke(255); // Change the color
  strokeWeight(5);
  push()
  translate(width / 2, height / 2);
  stroke(255,0,0);
  for(let i =0; i<6;i++){
    strokeWeight(3);
    line(0,0,width*2,0);
    rotate(PI/3);
  }
  pop();
  //frameRate(120)
}

function draw() {
  for(let i = 0; i <= countSpeed; i++){
    if(count%10000===0){
      push();
      translate(width / 2, height / 2);
      stroke(255,0,0);
      strokeWeight(2);
      noFill();
      ellipse(0,0,dist*2);
      pop();
    }

    if(isPrime(count)){
      push();
      translate(width / 2, height / 2);
      rotate(angleRot);
      point(dist,0);
      pop();
    }

    dist+=distSpeed;
    angleRot+= angleSpeed;
    count++
  }
}

function isPrime(num) {
  for (var i = 2; i <= sqrt(num); i++) {
    if(num % i === 0) return false;
  }
  return num !== 1 && num !== 0;
}
