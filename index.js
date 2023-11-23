const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 500;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    color: 'red',
    dirx: 2,
    diry: 2,
};

let isMoving = false; 
let animationId;

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function updateBall() {
    if (isMoving) {
        ball.x += ball.dirx;
        ball.y += ball.diry;

        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
            ball.dirx = -ball.dirx;
        }
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
            ball.diry = -ball.diry;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
}

function gameLoop() {
    updateBall();
    draw();
    animationId = requestAnimationFrame(gameLoop);
}

function startGame() {
    isMoving = true; 
    if (!animationId) {
        gameLoop();
    }
}

function stopBall() {
    isMoving = false; 
    cancelAnimationFrame(animationId);
    animationId = undefined; 
}
drawBall();