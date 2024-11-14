const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1; // Random size between 1 and 6
        this.speedX = Math.random() * 3 - 1.5; // Random horizontal speed
        this.speedY = Math.random() * 3 - 1.5; // Random vertical speed
        this.color = `rgba(255, ${Math.floor(Math.random() * 255)}, 150, 0.7)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.95; // Gradually reduce size to create a fading effect
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let particlesArray = [];

// Create particles near the mouse position
function handleParticles() {
    particlesArray = particlesArray.filter(p => p.size > 0.2);
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
}

canvas.addEventListener('mousemove', (event) => {
    for (let i = 0; i < 5; i++) {
        particlesArray.push(new Particle(event.x, event.y));
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

animate();
