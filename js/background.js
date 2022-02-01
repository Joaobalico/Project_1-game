class ScrollingBackground {
    constructor({ x, y, image }) {
      this.position = {
        x: x,
        y: y,
        image: image,
      };
  
      this.image = image;
      this.width = canvas.width;
      this.height = canvas.height;
      this.image = createImage(backgroundImg);
    }
  
    draw() {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
};