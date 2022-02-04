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
    this.image = createImage(mario);
    this.isJumping = false
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
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