// https://www.101computing.net/pentagram-challenge/
let r = 150;
let offsetSlider, freqSliderA, freqSliderB;
let mic, fft, audio, song, peakDetect;
function setup() {
  metal = loadSound("assets/spheres.mp3");
  bass = loadSound("assets/shatter.mp3");
  song = metal;
  createCanvas(windowWidth, windowHeight-30);
  if (windowWidth > 500) r = windowWidth/4
  background(0);
  stroke(200, 0, 0);
  strokeWeight(3);
  // fill(0);
  createUI();
  peakDetect = new p5.PeakDetect(20, 17000, 0.53, 5);
}

function draw() {
  background(0);
  
  if (song.isPlaying()) {
    drawWave();
    fft.analyze();
    peakDetect.update(fft);
    if (peakDetect.isDetected) {
      console.log(peakDetect);
      r = 300 * peakDetect.currentValue;
      colorMode(HSB, 100);
      stroke(color(120-20*peakDetect.currentValue, 100, 100));
      
    } else {
      r *= 0.95;
    }
  } else if (mic) {
    fft.setInput(mic);
    let micLevel = mic.getLevel(0.2);
    //  console.log(micLevel);
    r = 50 + micLevel * 150;
    drawWave();
    fft.analyze();
  }
   
  //strokeWeight(3 + 2 * peakDetect.currentValue);
 
  let penta = [];
  translate(width * 0.5, height * 0.5);
  fill(0);
  circle(0, 0, 2 * r);

  for (let i = 0; i < 5; i++) {
    const x = r * cos(offsetSlider.value() + (i * TWO_PI) / 5);
    const y = r * sin(offsetSlider.value() + (i * TWO_PI) / 5);
    circle(x, y, 5);
    penta.push([x, y]);
  }

  //line(penta[0][0],penta[0][1], penta[2][0], penta[2][1]);
  for (let j = 0; j < 3; j++) {
    line(penta[j][0], penta[j][1], penta[j + 2][0], penta[j + 2][1]);
    if (j < 2) {
      line(penta[j][0], penta[j][1], penta[j + 3][0], penta[j + 3][1]);
    }
  }
}
function drawWave() {
  push();
  translate(0, height * 0.85);
  let wave = fft.waveform();
  beginShape();

  for (let i = 0; i < wave.length; i++) {
    let x = map(i, 0, wave.length, 0, width);
    let y = map(wave[i], -1, 1, 0, height / 10 + 20);
    vertex(x, y);
  }
  endShape();
  pop();
}

function startMic() {
  if (song.isPlaying()) {
    song.stop();
  }
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
}

function playAudio() {
  if (mic) {
    mic.stop();
  }
  metal.stop();
  bass.stop();
  fft = new p5.FFT();
  song.play();
}
function bassFace(){
  song = bass;
  playAudio();
  // BASSSSSSSS
  peakDetect = new p5.PeakDetect(10, 40, 0.8, 10);
}
function satan(){
  song = metal;
  playAudio();
  // Detect guitars
  peakDetect = new p5.PeakDetect(1000, 1500, 0.5, 2);
}

function createUI() {
  let micButton = createButton("mic");
  micButton.mousePressed(startMic);
  let audioButton = createButton("metal");
  audioButton.mousePressed(satan);
  let bassButton = createButton('bass');
  bassButton.mousePressed(bassFace);
  offsetSlider = createSlider(0, TWO_PI, PI / 2, PI / 10);
  freqSliderA = createSlider(0, 20000, 20);
  freqSliderB = createSlider(0, 25000, 20000);
  freqSliderA.input(updateSettings);
  freqSliderB.input(updateSettings);
}

function updateSettings() {
  peakDetect = new p5.PeakDetect(
    freqSliderA.value(),
    freqSliderB.value(),
    0.5,
    1
  );
}

// future directions: https://editor.p5js.org/creativecoding/sketches/BkBnH1qlN
// https://p5js.org/reference/#/p5.PeakDetect
