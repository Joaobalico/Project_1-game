const canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



const img = new Image();
img.src = 'https://opengameart.org/sites/default/files/2_21.png';

const backgroundImage = {
  img: img,
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
//   speed: -1,

 /*  move: function() {
    this.x += this.speed;
    this.x %= canvas.width;
  }, */

  draw: function() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    /* if (this.speed < 0) {
      ctx.drawImage(this.img, this.x + canvas.width, 0);
    } else {
      ctx.drawImage(this.img, this.x - this.img.width, 0);
    } */
  },
};

/* function updateCanvas() {
  /* backgroundImage.move();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
//   backgroundImage.draw();

  requestAnimationFrame(updateCanvas);
} */

// start calling updateCanvas once the image is loaded
/* img.onload = updateCanvas; */



const gravity = 1.5;
class Player {
    constructor () {
        this.position = {
            x: 100,
            y: 100
        };
        this.speed = {
            x: 0,
            y: 1
        }
        this.width = 30;
        this.height = 30;
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.y += this.speed.y;
        this.position.x += this.speed.x;

        if (this.position.y + this.height + this.speed.y <= canvas.height) {
            this.speed.y += gravity;
        } else {
            this.speed.y = 0;
        }
        
    }
}

class Platform {
    constructor({x, y}) {
        this.position = {
            x: x,
            y: y
        }
        this.width = 200;
        this.height = 20;
    }

    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player();
const platforms = [new Platform({x: 200, y: 100}), new Platform({x: 500, y:200})];

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0;

function animate () {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImage.draw();
    player.update();
    platforms.forEach( (platform) => {
        platform.position.x -= 5;
        platform.draw();
    })

    if (keys.right.pressed && player.position.x < 400) {
        player.speed.x = 5
    } else if (keys.left.pressed && player.position.x > 100) {
        player.speed.x = -5
    } else {
        player.speed.x = 0

        if (keys.right.pressed) {
            scrollOffset += 5;
            platforms.forEach(platform => {
                platform.position.x -= 5;
            })
        } else if (keys.left.pressed) {
            scrollOffset -= 5;
            platforms.forEach(platform => {
                platform.position.x += 5;
            })
        }
    }

    platforms.forEach(platform => {
            platform.position.x -= 5;

        //Platform colision detection
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.speed.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.speed.y = 0; 
        }
    });
}

animate()

window.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'KeyA':
            console.log('left')
            keys.left.pressed= true
         break;
        case 'KeyS':
            console.log('down')
        break;
        case 'KeyD':
            console.log('right')
            keys.right.pressed= true
        break;
        case 'KeyW':
            console.log('up')
            player.speed.y -= 20;
        break;
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'KeyA':
            console.log('left')
            keys.left.pressed= false;
        break;
        case 'KeyS':
            console.log('down')
        break;
        case 'KeyD':
            console.log('right')
            keys.right.pressed= false;
        break;
        case 'KeyW':
            console.log('up')
        break;
    }
})