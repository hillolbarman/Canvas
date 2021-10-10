class Agent {
	constructor(x, y, m, a) {
		this.position = createVector(x, y);
		this.angle = a;
		this.magnitude = m;
		this.dropRadius = 3;
		this.color = [0, 255, 255];
	}

	render(map) {
		let x = Math.round(this.position.x);
		let y = Math.round(this.position.y);
		for (let i = -this.dropRadius + 2; i < this.dropRadius - 1; i++) {
			for (let j = -this.dropRadius + 2; j < this.dropRadius - 1; j++) {
				if (x + i < 0 || x + i >= map.width || y + j < 0 || y + j >= map.height)
					continue;
				else {
					map.pixelMap[x + i][y + j][0] = this.color[0];
					map.pixelMap[x + i][y + j][1] = this.color[1];
					map.pixelMap[x + i][y + j][2] = this.color[2];
					map.pixelMap[x + i][y + j][3] = 255;
				}
			}
		}
	}

	move(map) {
		if (Math.round(this.position.x) >= map.width - 1) {
			if (this.angle < 180) {
				this.angle = 180 - this.angle;
			} else if (this.angle > 180) {
				this.angle = 180 + (360 - this.angle);
			}
		}
		if (Math.round(this.position.x) <= 0) {
			if (this.angle <= 180) {
				this.angle = 180 - this.angle;
			} else if (this.angle > 90) {
				this.angle = 180 + (360 - this.angle);
			}
		}
		if (Math.round(this.position.y) >= map.height - 1) {
			if (this.angle <= 90) {
				this.angle = 360 - this.angle;
			} else if (this.angle > 90) {
				this.angle = 270 - (this.angle - 90);
			}
		}
		if (Math.round(this.position.y) <= 0) {
			if (this.angle <= 270) {
				this.angle = 90 + (270 - this.angle);
			} else if (this.angle > 270) {
				this.angle = 90 - (this.angle - 270);
			}
		}
		let x = this.magnitude * cos(this.angle);
		let y = this.magnitude * sin(this.angle);
		this.position.x += x;
		this.position.y += y;
	}
}
