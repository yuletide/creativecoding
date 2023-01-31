let offset = 0;
let pillars = 100;
let mic;
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(220);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  offset+=mic.getLevel();
  // background(220);
  // normalMaterial();

  push();
  // translate(windowWidth/8, windowHeight/4)
  rotateZ(frameCount * 0.01 + mouseX / 100 + offset);
  rotateX(frameCount * 0.001);
  rotateY(frameCount * 0.01);
  cylinder(70, 7000);
  pop();

  push();
  rotateZ(frameCount * 0.001 + mouseY / 100 + offset);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.001);
  cylinder(70, 7000);
  pop();

  //   push();
  //   rotateZ(frameCount * 0.001+mouseY/100+offset);
  //   rotateX(frameCount * 0.01);
  //   rotateY(frameCount * 0.001);
  //   cylinder(70, 7000);
  //   pop();

  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.001 + (mouseX * mouseY) / 100 + offset);
  rotateY(frameCount * 0.001);
  cylinder(70, 7000);
  pop();

  for (let i = 0; i < pillars; i++) {
    push();
    if (i % 2) {
      rotateZ(frameCount * 0.01 + mouseX / 100 + offset*Math.random()/100);
      rotateX(frameCount * 0.001);
      rotateY(frameCount * 0.01);
      cylinder(70, 7000);
    } else {
      push();
      rotateZ(frameCount * 0.001 + mouseY / 100 + offset*Math.random()/100);
      rotateX(frameCount * 0.01);
      rotateY(frameCount * 0.001);
      cylinder(70, 7000);
      pop();
    }
    pop();
  }
}

function touchStarted() {
  offset += mouseX + mouseY;
  return false;
}
