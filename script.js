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

        if (this.position.y + this.height + this.speed.y <= canvas.height) {
            this.speed.y += gravity;
        } else {
            this.speed.y = 0;
        }
        
    }
}

const player = new Player();

function animate () {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
}

animate()