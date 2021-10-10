class Map {
	constructor(width_, height_) {
		this.background = [255, 255, 255];
		this.width = width_;
		this.height = height_;
		this.pixelMap = new Array(width_);
		for (let i = 0; i < this.width; i++) {
			this.pixelMap[i] = new Array(height_);
			for (let j = 0; j < this.height; j++) this.pixelMap[i][j] = new Array(4);
		}
		this.randomizeMap();
	}

	randomizeMap() {
		for (let i = 0; i < this.width; i++) {
			for (let j = 0; j < this.height; j++) {
				this.pixelMap[i][j][0] = this.background[0];
				this.pixelMap[i][j][1] = this.background[1];
				this.pixelMap[i][j][2] = this.background[2];
				this.pixelMap[i][j][3] = 0;
			}
		}
	}

	diffuse(diffuseStrength) {
		for (let i = 0; i < this.width; i++) {
			for (let j = 0; j < this.height; j++) {
				this.pixelMap[i][j][3] *= diffuseStrength;
				if (this.pixelMap[i][j][3] < 1) {
					this.pixelMap[i][j][0] = this.background[0];
					this.pixelMap[i][j][1] = this.background[1];
					this.pixelMap[i][j][2] = this.background[2];
					this.pixelMap[i][j][3] = 0;
				}
			}
		}
	}
}
