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
    this.width = 66;
    this.height = 150;

    this.image = createImage(megaman);
  }
/* STOPED HERE */
  draw() {
    ctx.drawImage(
      this.image,
      430,
      0,
      177,
      400,
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
