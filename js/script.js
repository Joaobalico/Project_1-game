const platform = "../docs/assets/images/platform.png";
const smallPlatform = "../docs/assets/images/smallPlatform.png";
const backgroundImg = '../docs/assets/images/Parallax-background.png';
const greenChar = "../docs/assets/images/Preview-Green-Cap-Character-16x18.png"


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
  up: {
    pressed: false,
  },
};

let scrollOffset = 0;

canvas.width = 1020;
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
  ];

  animatedBackground = [
    new ScrollingBackground({
      x: -1,
      y: -1,
      image: createImage(backgroundImg),
    }),
    new ScrollingBackground({
      x: 1019,
      y: -1,
      image: createImage(backgroundImg),
    }),
    new ScrollingBackground({
      x: 1019 * 2,
      y: -1,
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
  if (scrollOffset > 3155) {
    console.log("You win!");
  }

  //Lose condition
  if (player.position.y > canvas.height) {
    init();
  }
}

init();
animate();

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyA": //left
      keys.left.pressed = true;
      break;
    case "KeyD": //right
      keys.right.pressed = true;
      break;
    case "KeyW": //up
      player.speed.y -= 24;
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
