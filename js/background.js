class Background {
    constructor({ x, y, image }) {
      this.position = {
        x: x,
        y: y,
        image: image,
      };
  
      this.image = image;
      this.width = 1020;
      this.height = 500;
    }
  
    draw() {
      this.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
};