"use strict"

let grid = {
  pxSize: 10,
  pxNum: 64,
  gridSize: undefined,
  values: []
}

let colorbar = {
  colors: [
    {name: "Red", id: 0, values:{r: 255, g: 0, b: 0}},
    {name: "Green", id: 1, values:{r: 0, g: 255, b: 0}},
    {name: "Blue", id: 2, values:{r: 0, g: 0, b: 255}},
    {name: "Black", id: 3, values:{r: 0, g: 0, b: 0}},
    {name: "White", id: 4, values:{r: 255, g: 255, b: 255}}
  ],
  colorSize: 20,
  marginTopBottom: 50,
  marginSides:50,
  selectedColor: 0
}

function setup() {
  grid.gridSize = grid.pxSize*grid.pxNum;
  createCanvas(grid.gridSize,grid.gridSize+colorbar.marginTopBottom*2 + colorbar.colorSize);
  let savedGrid = JSON.parse(localStorage.getItem("drawing"));
  if(savedGrid){
    grid.values = savedGrid
  }else{
    newGrid();
  }
  stroke(200);
  ellipseMode(CORNER);
}

function draw() {
  background(255);
  updateGrid();
  displayColorbar();
}

function mouseReleased(){
  localStorage.setItem("drawing", JSON.stringify(grid.values));

}

function keyPressed(){
  if(keyCode === 32){
    localStorage.clear();
    newGrid();
  }
}

function newGrid(){
  for(let i=0; i<grid.pxNum; i++){
    grid.values[i] = [];
    for(let j=0; j<grid.pxNum; j++){
      grid.values[i][j]=4;
    }
  }
}

function updateGrid(){
  let x = 0;
  let y = 0;
  for(let i=0; i<grid.pxNum; i++){
    y = 0;
    for(let j=0; j<grid.pxNum; j++){
      if(mouseIsPressed){
        if(mouseX >= x && mouseX <= x+grid.pxSize && mouseY >= y && mouseY <= y+grid.pxSize ){
          grid.values[i][j] = colorbar.selectedColor;
        }
      }
      push();
      let colorValue = colorbar.colors[grid.values[i][j]].values;
      fill(colorValue.r, colorValue.g, colorValue.b);
      rect(x,y,grid.pxSize);
      pop();
      y += grid.pxSize;
    }
    x += grid.pxSize;
  }
}

function displayColorbar() {
  let y = grid.gridSize + colorbar.marginTopBottom;
  let x = colorbar.marginSides;
  let marginInbetween = ((grid.gridSize - colorbar.marginSides*2) - (colorbar.colors.length*colorbar.colorSize))/(colorbar.colors.length-1);
  for(let i = 0; i < colorbar.colors.length; i++){
    let colorValue = colorbar.colors[i].values;
    if(mouseIsPressed){
      if(mouseX >= x && mouseX <= x+colorbar.colorSize && mouseY >= y && mouseY <= y+colorbar.colorSize ){
        colorbar.selectedColor = i;
        console.log(colorbar.colors[colorbar.selectedColor])
      }
    }
    push();
    fill(colorValue.r,colorValue.g,colorValue.b);
    if(i === colorbar.selectedColor){
        ellipse(x-10,y-10,colorbar.colorSize+20);
    }else{
        ellipse(x,y,colorbar.colorSize);
    }
    pop();
    x+=colorbar.colorSize + marginInbetween;
  }
}
