let capture;
let buffer;
let maxBufferSize = 500; // Maximum buffer size
let numSegments = 100; // Number of segments to draw
let minSegmentSize = 40; // Minimum size of each segment
let maxSegmentSize = 150; // Maximum size of each segment

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(windowWidth, windowHeight);
  capture.hide(); // Hide the video element
  buffer = [];
}

function draw() {
  // Draw the camera feed onto the buffer
  buffer.push(capture.get());

  // Limit the buffer size
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }

  // Randomly determine the delay for this frame
  let delayFrames = int(random(1, 5));

  // Draw random segments of the delayed frame as the background
  if (buffer.length >= delayFrames) {
    let delayedFrame = buffer[buffer.length - delayFrames];
    for (let i = 0; i < numSegments; i++) { // Draw numSegments random segments
      let x = int(random(width));
      let y = int(random(height));
      let segmentWidth = int(random(minSegmentSize, maxSegmentSize));
      let segmentHeight = int(random(minSegmentSize, maxSegmentSize));
      // let segmentScaleX = random(0.5, 100); // Random scale factor for X-axis
      // let segmentScaleY = random(0.5, 100); // Random scale factor for Y-axis
      
      let segment = delayedFrame.get(x, y, segmentWidth, segmentHeight);
      // segment.resize(segment.width * segmentScaleX, segment.height * segmentScaleY); // Resize segment

      stroke(255); // Set stroke color to white
      strokeWeight(3); // Set stroke thickness
      rect(x, y, segment.width, segment.height); // Draw the segment with stroke
      image(segment, x, y); // Draw the segment image
    }
  }
}