// https://mathstat.slu.edu/escher/index.php/Islamic_Patterns_Exploration

const originalSegments = [[0,0],[100,0],[100,100],[0,100], [40,100]];

function setup() {
  createCanvas(windowWidth, windowHeight-50);
  console.log(windowWidth, windowHeight);
  background(220);
  createUI();
}

n = 6;
r = 50;
offset = 0;
//layerXOffset = -8;
//layerYOffset = -8;
rotation = 1.01;

function draw(){
  stroke(218,207,182);
  strokeWeight(5);
  background(220);
  fill(197, 156, 43);
  // r += 0.05;
  offset += rotationSlider.value();
  tesselate(nGonSlider.value(),r,radialOffsetSlider.value() * PI+offset);
}

function drawShape(segments, xOffset, yOffset){
  beginShape();
  for (let ver of segments){
    vertex(ver[0] + xOffset, ver[1] + yOffset);
  }
  endShape(CLOSE);
}

function tesselate(n,r,offset){
  layerXOffset = xOffsetSlider.value();
  layerYOffset = yOffsetSlider.value();
  for (let xOffset = 0; xOffset < windowWidth + r; xOffset += 101 + layerXOffset){
    for (let yOffset = 0; yOffset < windowHeight + r; yOffset += 101 + layerYOffset){
      if (yOffset % 2 === 0) {
        drawShape(generateNGon(n,r,offset), xOffset+shiftSlider.value(), yOffset);
      } else {
        drawShape(generateNGon(n,r,offset), xOffset, yOffset);
      }
    }
  }
}

function generateNGon(n, r, offset){
  gon = []
  for (let i = 0; i < n; i++) {
    const x = r * cos(offset + (i * TWO_PI) / n);
    const y = r * sin(offset + (i * TWO_PI) / n);
    //circle(x, y, 5);
    gon.push([x, y]);
  }
  return gon
}

function createUI() {
  nGonSlider = createSlider(3,12,6);
  // something is wrong here
  radialOffsetSlider = createSlider(0, 2*PI, 0.5, 0);
  xOffsetSlider = createSlider(-15, 12, -3);
  yOffsetSlider = createSlider(-15, 12, -12);
  shiftSlider = createSlider(0, 100);
  rotationSlider = createSlider(0, 1, 0, 0);
  
  const sliders = [rotationSlider, shiftSlider, yOffsetSlider, xOffsetSlider, radialOffsetSlider, nGonSlider];
  sliders.map(slider=>slider.input(updateSettings))
  //freqSliderA.input(updateSettings);
  //freqSliderB.input(updateSettings);
}

function updateSettings(e){
  console.log(e.target.value)
}