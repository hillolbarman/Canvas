const width = 800;
const height = 600;
const scale = 1;
let map = {};
let img;
let agents;
let noOfAgents = 2000;
let diffuseStrength = 0.97;

function setup() {
	createCanvas(width, height);
	background(0);
	angleMode(DEGREES);
	map = new Map(width / scale, height / scale);
	img = new p5.Image(width, height);
	img.loadPixels();
	agents = new Array(noOfAgents);
	generateAgents();
	saveFrames("out", "png", 5, 25);
}

function draw() {
	background(0);

	for (let i = 0; i < noOfAgents; i++) {
		agents[i].move(map);
		agents[i].render(map);
	}
	map.diffuse(diffuseStrength);
	mapToImage();
}

function writeColor(image, x, y, red, green, blue, alpha) {
	let index = (x + y * width) * 4;
	image.pixels[index] = red;
	image.pixels[index + 1] = green;
	image.pixels[index + 2] = blue;
	image.pixels[index + 3] = alpha;
}

function mapToImage() {
	for (let i = 0; i < map.pixelMap.length; i++) {
		for (let j = 0; j < map.pixelMap[i].length; j++) {
			for (let x = 0; x < scale; x++) {
				for (let y = 0; y < scale; y++) {
					writeColor(
						img,
						i * scale + x,
						j * scale + y,
						map.pixelMap[i][j][0],
						map.pixelMap[i][j][1],
						map.pixelMap[i][j][2],
						map.pixelMap[i][j][3]
					);
				}
			}
		}
	}

	img.updatePixels();
	image(img, 0, 0);
}

function generateAgents() {
	let centerX = width / scale / 2;
	let centerY = height / scale / 2;
	let incr = 360 / noOfAgents;
	let angle = 0;
	for (let i = 0; i < noOfAgents; i++, angle += incr)
		agents[i] = new Agent(centerX, centerY, 1, angle);
}
