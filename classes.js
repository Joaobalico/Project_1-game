class Player {
    constructor() {
      this.position = {
        x: 100,
        y: 100,
      };
      this.speed = {
        x: 0,
        y: 1,
      };
      this.width = 30;
      this.height = 30;
    }
  
    draw() {
      ctx.fillStyle = "blue";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  
    update() {
      this.draw();
      this.position.y += this.speed.y;
      this.position.x += this.speed.x;
  
      if (this.position.y + this.height + this.speed.y <= canvas.height) {
        this.speed.y += gravity;
      }
    }
}

class Platform {
    constructor({ x, y, image }) {
      this.position = {
        x: x,
        y: y,
        image: image,
      };
  
      this.image = image;
      this.width = image.width;
      this.height = image.height;
    }
  
    draw() {
      ctx.drawImage(this.image, this.position.x, this.position.y);
    }
}

class GenericObject {
    
}

/* class Background {
    constructor({ x, y }) {
      this.position = {
        x: x,
        y: y,
      };
  
      this.image = image;
      this.width = image.width;
      this.height = image.height;
    }
  
    draw() {
      ctx.drawImage(this.image, this.position.x, this.position.y);
    }
} */