const platform = "./docs/assets/platform.png";
const smallPlatform = "./docs/assets/smallPlatform.png";
const backgroundImg = "./docs/assets/Parallax-background.png";
const mario = "./docs/assets/Mario copy.png";
// const goomba = "./docs/assets/goombaSquashed.b629717.png";

const startButton = document.getElementById("start-button");

window.onload = () => {
  startButton.onclick = () => {
    init();
    startButton.remove();
    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "KeyA": //left
          keys.left.pressed = true;
          break;
        case "KeyD": //right
          keys.right.pressed = true;
          break;
        case "KeyW": //up
          player.speed.y = -24 ;
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

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gravity = 1.5;

let platforms = [];


const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0;

canvas.width = 1030;
canvas.height = 576;

function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

// let enemies = [];
let player;
let animatedBackground = [];

function init() {
  const platformImage = createImage(platform);
  player = new Player();
  // enemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];

  platforms = [
    new Platform({
      x: platformImage.width * 4 + platformImage.width + 8,
      y: 250 + 65,
      image: createImage(smallPlatform),
    }),
    new Platform({
      x: platformImage.width * 14 + 145,
      y: 250 + 65,
      image: createImage(smallPlatform),
    }),
    new Platform({
      x: platformImage.width * 16.75,
      y: 300 + 65,
      image: createImage(smallPlatform),
    }),
    new Platform({ x: 0, y: 465, image: platformImage }),
    new Platform({ x: platformImage.width - 2, y: 465, image: platformImage }),
    new Platform({
      x: platformImage.width * 2 + 100,
      y: 465,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 3 + 300,
      y: 465,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 4 + 300,
      y: 465,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 4 + 300 - 2,
      y: 465,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 5 + 645 - 2,
      y: 465,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 6 + 645 - 3,
      y: 465,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 7 + 645 - 4,
      y: 465,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 8 + 850,
      y: 250 + 65,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 9 + 1000,
      y: 200 + 65,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 12.25,
      y: 200 + 65,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 13.75,
      y: 465,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 15.1,
      y: 200 + 65,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 17.6,
      y: 230 + 65,
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
      x: 1025,
      y: 0,
      image: createImage(backgroundImg),
    }),
    new ScrollingBackground({
      x: 1025 * 2,
      y: 0,
      image: createImage(backgroundImg),
    }),
    new ScrollingBackground({
      x: 1025 * 3,
      y: 0,
      image: createImage(backgroundImg),
    }),
    new ScrollingBackground({
      x: 1025 * 4,
      y: 0,
      image: createImage(backgroundImg),
    }),
    new ScrollingBackground({
      x: 1025 * 5,
      y: 0,
      image: createImage(backgroundImg),
    }),
    new ScrollingBackground({
      x: 1025 * 6,
      y: 0,
      image: createImage(backgroundImg),
    }),
    new ScrollingBackground({
      x: 1025 * 7,
      y: 0,
      image: createImage(backgroundImg),
    }),
    new ScrollingBackground({
      x: 1025 * 8,
      y: 0,
      image: createImage(backgroundImg),
    }),
  ];

  scrollOffset = 0;
}

/* function spawnEnemies() {
  setInterval(() => {
    enemies.push(new Enemy());
  }, 750);
} */

function reload() {
  init();
  location.reload();
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

  /* enemies.forEach((enemy) => {
    enemy.update();
  }); */

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
      /* enemies.forEach((enemy) => {
        enemy.x -= 6;
      }); */
      animatedBackground.forEach((animatedObject) => {
        animatedObject.position.x -= 6;
      });
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= 10;

      platforms.forEach((platform) => {
        platform.position.x += 10;
      });
      /* enemies.forEach((enemy) => {
        enemy.x += 6;
      }); */
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
    document.getElementById("win-screen").innerHTML = "You Won!!";
    document.getElementById("canvas").remove();
    setTimeout(reload, 3000);
  }

  //Lose condition
  if (player.position.y > canvas.height) {
    reload();
  }
}

init();
// spawnEnemies();
animate();
