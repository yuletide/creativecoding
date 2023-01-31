let playing;

const labels = [
  [1, 2, 3, "A"],
  [4, 5, 6, "B"],
  [7, 8, 9, "C"],
  ["*", 0, "#", "D"],
];
const freqs = [
  [1209, 1336, 1477, 1633],
  [697, 770, 852, 941],
];
let oscs = [];
let buttons = [];
let fft;

function setup() {
  fft = new p5.FFT();
  createCanvas(windowWidth, windowHeight);
  createOscillators();
  phreak();
}

function createOscillators() {
  const offset = 50;
  for (let i = 0; i < freqs.length; i++) {
    oscs.push([]);
    for (let j = 0; j < freqs[i].length; j++) {
      oscs[i].push(new p5.Oscillator(freqs[i][j]));
    }
  }

  for (let i = 0; i < 4; i++) {
    buttons.push([]);
    for (let j = 0; j < 4; j++) {
      buttons[i].push(createButton(labels[j][i]+''));
      buttons[i][j].mousePressed(() => {
        playTone(i, j);
      });
      buttons[i][j].position(
        (i - 2) * offset + width / 2 + 3.5,
        (j - 2) * offset + height / 2 + 3.5
      );
      buttons[i][j].style('width', '40px');
      buttons[i][j].style('height', '40px');
    }
  }
}
/*
https://en.wikipedia.org/wiki/Phreaking#2600_hertz

The tone was discovered in approximately 1957,[7] by Joe Engressia, a blind seven-year-old boy. Engressia had perfect pitch, and discovered that whistling the fourth E above middle C (a frequency of 2637.02 Hz) would stop a dialed phone recording

Bill discovered that a recorder he owned could also play the tone at 2600 Hz with the same effect. John Draper discovered through his friendship with Engressia that the free whistles given out in Cap'n Crunch cereal boxes also produced a 2600 Hz tone when blown (providing his nickname, "Captain Crunch"). This allows control of phone systems that work on single frequency (SF) controls.
*/
function phreak() {
  const phreakOsc = new p5.Oscillator(2600);
  phreakOsc.amp(0.25);
  let phreakButton = createButton("phreak");
  phreakButton.mousePressed(() => {
    // phreakOsc.amp = 0.5
    phreakOsc.start();
    phreakOsc.stop(0.5);
  });
}

function playTone(i, j) {
  console.log(i, j);
  // if (playing){
  //   playing.stop();
  // }
  oscs[0][i].start();
  oscs[1][j].start();
  oscs[0][i].stop(0.5);
  oscs[1][j].stop(0.5);
  playing = oscs[0][0];
}
function draw() {
  background(220);
  let waveform = fft.waveform(); // analyze the waveform
  beginShape();
  noFill();
  strokeWeight(5);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();
}
