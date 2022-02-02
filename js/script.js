const test = document.getElementById("start-button");

window.onload = () => {
  test.onclick = () => {
    init();
    test.remove();
    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "KeyA": //left
          keys.left.pressed = true;
          break;
        case "KeyD": //right
          keys.right.pressed = true;
          break;
        case "KeyW": //up
          player.speed.y = -22;
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "KeyA": //left
          keys.left.pressed = false;
          break;
        case "KeyD": //right
          keys.right.pressed = false;
          break;
      }
    });
  };
};

const platform = "../docs/assets/platform.png";
const smallPlatform = "../docs/assets/smallPlatform.png";
const backgroundImg = "../docs/assets/Parallax-background.png";
const mario = "../docs/assets/Mario copy.png";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gravity = 1.5;

let platforms = [];
let background = [];

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0;

canvas.width = 900;
canvas.height = 500;

function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

let player = new Player();
let animatedBackground = [];

function init() {
  const platformImage = createImage(platform);
  player = new Player();
  platforms = [
    new Platform({
      x: platformImage.width * 4 + platformImage.width + 8,
      y: 250,
      image: createImage(smallPlatform),
    }),
    new Platform({
      x: platformImage.width * 14 + 145,
      y: 250,
      image: createImage(smallPlatform),
    }),
    new Platform({
      x: platformImage.width * 16.75,
      y: 300,
      image: createImage(smallPlatform),
    }),
    new Platform({ x: 0, y: 400, image: platformImage }),
    new Platform({ x: platformImage.width - 2, y: 400, image: platformImage }),
    new Platform({
      x: platformImage.width * 2 + 100,
      y: 400,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 3 + 300,
      y: 400,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 4 + 300,
      y: 400,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 4 + 300 - 2,
      y: 400,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 5 + 645 - 2,
      y: 400,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 6 + 645 - 3,
      y: 400,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 7 + 645 - 4,
      y: 400,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 8 + 850,
      y: 250,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 9 + 1000,
      y: 90,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 12.25,
      y: 70,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 13.75,
      y: 400,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 15.1,
      y: 100,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 17.6,
      y: 150,
      image: platformImage,
    }),
  ];

  animatedBackground = [
    new ScrollingBackground({
      x: -1,
      y: 0,
      image: createImage(backgroundImg),
    }),
    new ScrollingBackground({
      x: 899,
      y: 0,
      image: createImage(backgroundImg),
    }),
    new ScrollingBackground({
      x: 899 * 2,
      y: 0,
      image: createImage(backgroundImg),
    }),
    new ScrollingBackground({
      x: 899 * 3,
      y: 0,
      image: createImage(backgroundImg),
    }),
    new ScrollingBackground({
      x: 899 * 4,
      y: 0,
      image: createImage(backgroundImg),
    }),
    new ScrollingBackground({
      x: 899 * 5,
      y: 0,
      image: createImage(backgroundImg),
    }),
    new ScrollingBackground({
      x: 899 * 6,
      y: 0,
      image: createImage(backgroundImg),
    }),
    new ScrollingBackground({
      x: 899 * 7,
      y: 0,
      image: createImage(backgroundImg),
    }),
    new ScrollingBackground({
      x: 899 * 8,
      y: 0,
      image: createImage(backgroundImg),
    }),
  ];

  scrollOffset = 0;
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  animatedBackground.forEach((animatedObject) => {
    animatedObject.draw();
  });
  platforms.forEach((platform) => {
    platform.position.x -= 5;
    platform.draw();
  });
  player.update();

  //PLayer movements and limits
  if (keys.right.pressed && player.position.x < 400) {
    player.speed.x = 10;
  } else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.speed.x = -10;
  } else {
    player.speed.x = 0;

    if (keys.right.pressed) {
      scrollOffset += 10;
      platforms.forEach((platform) => {
        platform.position.x -= 10;
      });
      animatedBackground.forEach((animatedObject) => {
        animatedObject.position.x -= 6;
      });
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= 10;

      platforms.forEach((platform) => {
        platform.position.x += 10;
      });
      animatedBackground.forEach((animatedObject) => {
        animatedObject.position.x += 6;
      });
    }
  }

  platforms.forEach((platform) => {
    platform.position.x += 5;

    //Platform colision detection
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.speed.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.speed.y = 0;
    }
  });

  //Win condition
  if (scrollOffset > 10000) {
    alert("You won!");
    init()
  }

  //Lose condition
  if (player.position.y > canvas.height) {
    init();
  }
}

init();
animate();
