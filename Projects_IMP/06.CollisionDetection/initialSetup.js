const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})
// Utility functions
function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function randomIntFromRange(min,max) {
  return Math.floor(Math.random() * (max-min +1) + min);
}

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) - velocity.y * Math.cos(angle),
  }
}
// Objects
function Particle(x, y, radius, color) {
  this.x = x
  this.y = y
  this.velocity = {
    x: Math.random() - 0.5,
    y: Math.random() - 0.5,
  }
  this.radius = radius
  this.color = color


  this.draw = function () {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.strokeStyle = this.color
    c.stroke()
    c.closePath()
  }

  this.update = function (particles) {
    this.draw()

    for (let y = 0; y < particles.length; y++) {
      if(this === particles[y]) {
        continue;
      }

      if (distance(this.x, this.y, particles[y].x, particles[y].y) - this.radius * 2 <= 0) {
        console.log('has collieded');
      }
    }

    if(this.x - this.radius <= 0 || this.x + radius >= innerWidth) {
      this.velocity.x = - this.velocity.x;
    }

    if(this.y - this.radius <= 0 || this.y + radius >= innerHeight) {
      this.velocity.y = - this.velocity.y;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

// Implementation
let particles;
function init() {
  particles = []

  for (let i = 0; i < 4; i++) {
    const radius = 80;
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);
    const color = 'blue';

    if (i !== 0) {
      for (let index = 0; index < particles.length; index++) {
        if (distance(x, y, particles[index].x, particles[index].y) - radius * 2 < 0) {
          x = randomIntFromRange(radius, canvas.width - radius);
          y = randomIntFromRange(radius, canvas.height - radius);

          index = -1;
        }
      }
    }

    particles.push(new Particle(x, y, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach(particle => {
    particle.update(particles);
  })
}

init()
animate()