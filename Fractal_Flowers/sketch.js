// https://www.reddit.com/r/processing/comments/32kss5/how_would_i_go_about_creating_a_fibonacci_spiral/

let r = 0;
let j = 1;
let step = 0.1;
let f;
let lag = 1;

let lagSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //frameRate(30);
  background(0);
  f = PI * 2 * (sqrt(5) - 1) * 0.5; // golden ratio
  colorMode(HSB, 100);
  
  lagSlider = createSlider(0, 7, lag);
  lagSlider.position(10,10);
  lagSlider.mousePressed(clr);
  let redrawBtn = createButton('Redraw');
  redrawBtn.position(5, height-25);
  redrawBtn.mousePressed(reset);
  let clearBtn = createButton('Clear');
  clearBtn.position(75, height-25);
  clearBtn.mousePressed(clr);
}

function reset(){
  r = 0;
}
function clr(){
  background(0);
  reset();
}

function draw() {
  translate(width * 0.5, height * 0.5);
  const lag = lagSlider.value();

  if (r < 255) {
    fill(color(r, 200, 200));
    stroke(color(r + 10, 200, 200));
    //arc(cos(f * r) * r, sin(f * r) * r, 20, 20, r*PI, r*PI/5);
    line(
      cos(f * r) * r,
      sin(f * r) * r,
      cos(f * (r - lag)) * (r - lag),
      sin(f * (r - lag)) * (r - lag)
    );
    circle(cos(f * r) * r, sin(f * r) * r, 5);
    r++;
  } else {
    // for infinite drawing 
    //noLoop();
    //r = step*j;
    //j++;
  }
}

