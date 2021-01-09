//Getting the HTML element called canvas
const canvas = document.querySelector('canvas');

canvas.width = innerWidth;
canvas.height = innerHeight;

const context = canvas.getContext('2d');

//Helpful variables
let colors = [
    '#2185CD',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66',
];

function Ball(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = `#FF7F66`;
        context.strokeStyle = 'black'
        context.fill();
        context.stroke();
        context.closePath();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };
}
// var radius = Math.floor(Math.random() * 600 + 1);
var radius = 45;
var x = Math.random() * (innerWidth - radius * 2) + radius;
var y = Math.random() * (innerHeight - radius * 2) + radius;
var dx = (Math.random() - 5);
var dy = (Math.random() - 5);
let ball = new Ball(x, y, dx, dy, radius);

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);

    ball.update();
}
animate();