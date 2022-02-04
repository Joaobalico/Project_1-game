class Enemy {
  constructor() {
    this.speedY = 5;
    this.width = 50;
    this.height = 100;
    this.x = Math.floor(Math.random() * 1030);
    this.y = 0 - this.height -100;
    this.image = createImage(fireball);
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
      this.draw();
      this.y += this.speedY;
  }
}
