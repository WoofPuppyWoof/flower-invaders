var ship;
var circles = [];
var beams = [];

function setup() {
  createCanvas(600, 400);
  ship = new Ship();
  // beams = new Beam(width/2, height/2);
  for (var i = 0; i < 6; i++) {
    circles[i] = new Circle(i*80+80, 60);
  }
}

function draw() {
  background(51);
  ship.show();
  ship.move();

  for (var i = 0; i < beams.length; i++) {
    beams[i].show();
    beams[i].move();
    for (var j = 0; j < circles.length; j++) {
      if (beams[i].hits(circles[j])) {
        circles[j].shrink();
        beams[i].delete();
        console.log("hit");
      }
    } 
  }

  var edge = false;

  for (var i = 0; i < circles.length; i++) {
    circles[i].show();
    circles[i].move();
    if (circles[i].x > width || circles[i].x < 0) {
      edge = true;
    }
  }

  if (edge) {
    for (var i = 0; i < circles.length; i++) {
      circles[i].shiftDown();
    }
  }

  for (var i = beams.length-1; i >= 0; i--) {
    if (beams[i].toDelete) {
      beams.splice(i, 1);
    }
  }


}

function keyReleased() {
  if (key != ' ') {
    ship.setDir(0);
  }
}

function keyPressed() {
  if (key === ' ') {
    var beam = new Beam(ship.x, height);
    beams.push(beam);
  }

  if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
}