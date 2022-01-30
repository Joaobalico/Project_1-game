const canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


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
        ctx.fillStyle = 'red';
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
    constructor() {
        this.position = {
            x: 200,
            y: 100
        }
        this.width = 200;
        this.height = 20;
    }

    draw() {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player();
const platform = new Platform();
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

function animate () {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    platform.draw();

    if (keys.right.pressed) {
        player.speed.x = 5
    } else if (keys.left.pressed) {
        player.speed.x = -5
    } else {
        player.speed.x = 0
    }

    if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.speed.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
        player.speed.y = 0; 
    }
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
            keys.left.pressed= false

        break;
        case 'KeyS':
            console.log('down')
        break;
        case 'KeyD':
            console.log('right')
            keys.right.pressed= false
        break;
        case 'KeyW':
            console.log('up')
        break;
    }
})