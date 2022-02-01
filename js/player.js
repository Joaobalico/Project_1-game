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
    this.width = 70;
    this.height = 70;
    this.image = createImage(greenChar);
  }

  draw() {
    ctx.drawImage(
      this.image,
      0,
      0,
      50,
      50,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
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

const genericObjects = [
  new GenericObject({
    x: -1,
    y: -1,
    image: createImage(backgroundImg),
  }),
  new GenericObject({
    x: -1,
    y: -1,
    image: createImage(hills),
  }),
];
