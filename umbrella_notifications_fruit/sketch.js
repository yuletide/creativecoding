// Prompt: Umbrella notifications fruit
let particles = [];
const UMBRELLA_SIZE = 130;
let STILLNESS = false;
// if rain Y value = mouse Y value, remove rain

let lastMouseX, lastMouseY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  button = createButton('STILLNESS');
  button.position(0, windowHeight-25);
  button.mousePressed(still);
}

function draw() {
  background(0);

  let umb = new Umbrella(mouseX, mouseY);

  //generate objects
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(random(0, windowWidth), 0));
  }

  //run the object
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    // update, check & compare, then display last
    p.move();
    // p.checkEdges();
    p.display();
    umb.display();
    if (
      mouseX - (UMBRELLA_SIZE/2) < particles[i].x &&
      particles[i].x < mouseX + 50 &&
      particles[i].y > umb.y - 50
    ) {
      // particle is under umbrella
      particles[i].emoji = String.fromCodePoint("0x2614");
      //particles.splice(i, 1);
    }
  }

  //adjust number of particles
  if (particles.length > 60) {
    //taken from where in index, and then how many taken out
    particles.splice(0, 1);
  }
  if (particles.length > 500) {
    //taken from where in index, and then how many taken out
    particles.splice(0, 3);
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xspd = 0;
    this.position = createVector(this.x, this.y);
    this.yspd = random(9, 10);
    this.size = 3;
    this.clr = color(255, random(150));
    this.emoji = String.fromCodePoint("0x1f4a7");
    // this.emoji = Math.round(random(0, 1))
    //   ? String.fromCodePoint("0x2614")
    //   : String.fromCodePoint("0x1f4a7");
  }
  display() {
    push();
    fill(this.clr);
    stroke(this.clr);
    //ellipse(this.x, this.y, this.size, this.size);
    //ellipse(this.x, this.y, this.size * 0.5, this.size) * 0.3;
    //let emojival = floor(1536).toString(16)
    //console.log(emojival)
    text(this.emoji, this.x, this.y);
    // if (Math.round(random(0,1))){
    //   text(String.fromCodePoint('0x2602'), this.x, this.y)
    // } else {
    //   text(String.fromCodePoint('0x1f4a7'), this.x, this.y)
    // }
    pop();
  }
  move() {
    if (!STILLNESS){
      this.x = this.x + this.xspd + (random(-0.3, 0.3) * (windowWidth - mouseY - 50)) / 3;
    } else {
      this.x = this.x + this.xspd + (random(-0.3, 0.3));
    }
    this.y = this.y + this.yspd;
  }
  // checkEdges() {
  //   if (this.y > height) {
  //     this.y = 0;
  //   }
  // }
  removeRain() {
    fill(0);
  }
}
class Umbrella {
  constructor(x, y) {
    this.x = mouseX;
    this.y = mouseY;
    this.size = 3;
    this.clr = color(200, 255, 80);
  }
  display() {
    //fill(this.clr);
    push();
    textSize(UMBRELLA_SIZE);
    text("☂️", this.x - UMBRELLA_SIZE/2, this.y);
    pop();
    //rect(this.x, this.y - 10, 4, 70);
    //fill(0);
    //noStroke();
    //fill(255, 20, 200);
    //arc(this.x, this.y, 90, 30, PI, TWO_PI);
  }
}

function still(){
  STILLNESS = !!STILLNESS;
}

function mouseClicked(){
  STILLNESS = !STILLNESS;
}
