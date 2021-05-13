const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth-400;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

const beforeGame = document.getElementById('before-game');
const playBtn = document.getElementsByClassName('start');

const scoreDiv = document.getElementById('score');
const scoreCount = document.getElementById('score-count');

const afterGame = document.getElementById('after-game');
const beatHighScore = document.getElementById('beatHighScore');

const yourScore = document.getElementById('current-score');
const highScore = document.getElementById('high-score');

if (localStorage.getItem("high-score")) {
    highScore.innerHTML = localStorage.getItem("high-score");
}
const heroY = 420;
const carHeight = 180;
const position = [100, 400, 700];

let enemyCars= [];
let laneSpeed = 1.1;
let score = 0;
let gameOver = false;
let lanePosition = 1;
const createRoad = function() {
    const road = new Image();
    road.src = './images/road.png';
    road.onload = function() {
        let height = 0 - canvas.height;
        const animateRoad = function() {
            c.drawImage(road, 0, height, canvas.width, canvas.height * 2);
            height += laneSpeed;
            if (height >= 0) {
                height = 0 - canvas.height;
            }
            if (gameOver) {
                return;
            };
            requestAnimationFrame(animateRoad);
        }
        animateRoad();
    }
}

const createHeroCar = function() {
    const heroCar = new Image();
    heroCar.src = './images/game_elements.png';
    heroCar.onload = function() {
        const animateHeroCar = function() {
            
            c.drawImage(heroCar, 472 , 255, 118, 219, position[lanePosition], heroY, 100, carHeight);
            
            if (gameOver) {
                return
            };
            requestAnimationFrame(animateHeroCar);
        }
        animateHeroCar();
    }
}

class Enemy {
    constructor(y) {
        var self = this;
        this.y = y;
        this.scored = false;
        this.lane = Math.floor(Math.random() * 3);
        this.carX = Math.floor(Math.random() * 4) * 118;
        this.carY = Math.floor(Math.random() * 3)* 219
    }

    drawEnemy = function() {
        var enemyCar = new Image();
        enemyCar.src = './images/game_elements.png';
        enemyCar.onload = () => {
            const drawEnemyCar = () => {
                if (this.y > canvas.height + 30) {
                    this.scored = false;
                    enemyCar.src = './images/game_elements.png';
                    this.y = -500;
                    this.lane = Math.floor(Math.random() * 3);
                    return;
                }
                
                c.drawImage(enemyCar, this.carX , this.carY, 118, 219, position[this.lane], this.y, 100, carHeight);
               
                this.y += 1.5 * laneSpeed;
                if (gameOver) {
                    return
                };
                requestAnimationFrame(drawEnemyCar);
            }
            drawEnemyCar();
        }
    }
}

const drawEnemyCars = function() {
    enemyCars = [];
    const enemy0 = new Enemy(0);
    const enemy1 = new Enemy(-290);
    const enemy2 = new Enemy(-550);

    createRoad();
    createHeroCar();

    enemy0.drawEnemy();
    enemy1.drawEnemy();
    enemy2.drawEnemy();
    enemyCars.push(enemy0);
    enemyCars.push(enemy1);
    enemyCars.push(enemy2);

    scoreDiv.style.display = 'block';
    scoreCount.innerHTML = '0';
}

const updateHighScore = function() {
    yourScore.innerHTML = score;
    if (score > highScore.innerHTML) {
        localStorage.setItem("high-score", score);
        highScore.innerHTML = score;
        beatHighScore.innerHTML = 'New HighScore!!!';
    } else {
        beatHighScore.innerHTML = 'Try Again :(';
    }
    score = 0;
}

const triggerMoveEvents = function(event) {
    if (event.key === "ArrowLeft") {
        if (lanePosition > 0) {
            lanePosition -= 1;
        }
    }
    if (event.key === "ArrowRight") {
        if (lanePosition < 2) {
            lanePosition += 1;
        }
    }
}

function setMoveEvents() {
    window.addEventListener("keydown", triggerMoveEvents);
}

const increaseSpeed = function() {
    laneSpeed *= 1.0001;
    requestAnimationFrame(increaseSpeed);
}

const calculateScore = function() {
    function calculate() {
        for (enemy of enemyCars) {
            if (enemy.y > (canvas.height + 30) && !enemy.scored) {
                score++;
                scoreCount.innerHTML = score;
                enemy.scored = true;
            }
        }
        if (gameOver) {
            window.clearInterval(calculate);
        }
        requestAnimationFrame(calculate);
    }
    calculate();
}

function clearAllTimers() {
    let id = window.setTimeout(function() {}, 0);
    while (id--) {
        window.clearTimeout(id);
    }
}

const handleGameOver = function() {
    window.removeEventListener("keydown", triggerMoveEvents);
    gameOver = true;
    scoreDiv.style.display = 'none';
    clearAllTimers();
    updateHighScore();
    canvas.style.display = 'none';
    afterGame.style.display = 'block';
}

function detectCollision() {
    for (let enemy of enemyCars)
        if (Math.abs(heroY - enemy.y) < carHeight && enemy.lane === lanePosition) {
            handleGameOver();
        }
    if (gameOver) {
        return;
    };
    requestAnimationFrame(detectCollision);
}

const start = function() {
    drawEnemyCars();
    gameOver = false;
    laneSpeed = 2;
    lanePosition = 1;
    setMoveEvents();
    increaseSpeed();
    calculateScore();
    detectCollision();
}

for (let btn of playBtn) {
    btn.addEventListener('click', function() {
        beforeGame.style.display = 'none';
        afterGame.style.display = 'none';
        canvas.style.display = 'block';
        start();
    });
}