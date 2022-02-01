const platform = "./img/platform.png";
const hills = "./img/hills.png";
const backgroundImg = "./img/background.png";
const platformSmallTall = "./img/platformSmallTall.png";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1020;
canvas.height = 500;

const gravity = 1.5;

const image = new Image();
image.src = platform;


let player = new Player();
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

function init() {
  player = new Player();
  platforms = [
    new Platform({ x: 0, y: 375, image }),
    new Platform({ x: image.width - 2, y: 375, image }),
    new Platform({ x: image.width * 2 + 100, y: 375, image }),
    new Platform({ x: image.width * 3 + 300, y: 375, image }),
    new Platform({ x: image.width * 4 + 300, y: 375, image }),
    new Platform({ x: image.width * 4 + 300 - 2, y: 375, image }),
  ];
//   background = [new Background({ x: 0, y: 0, image })];

  scrollOffset = 0;
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //   backgroundImage.draw();
  platforms.forEach((platform) => {
    platform.position.x -= 5;
    platform.draw();
  });
  player.update();

  if (keys.right.pressed && player.position.x < 400) {
    // backgroundImage.x -= 6;
    player.speed.x = 10;
  } else if (keys.left.pressed && player.position.x > 100) {
    // backgroundImage.x += 6;
    player.speed.x = -10;
  } else {
    player.speed.x = 0;

    if (keys.right.pressed) {
      scrollOffset += 10;

      platforms.forEach((platform) => {
        platform.position.x -= 10;
      });
    } else if (keys.left.pressed) {
      scrollOffset -= 10;

      platforms.forEach((platform) => {
        platform.position.x += 10;
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
  if (scrollOffset > 2000) {
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
      player.speed.y -= 20;
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
    case "KeyW": //up
        keys.up.pressed = false;
        break;
  }
});
