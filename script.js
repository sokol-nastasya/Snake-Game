const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = 'img/ground.png';

const food = new Image();
const fruits = ['./img/avacado.png', './img/apple.png', './img/mango.png', './img/strawberry.png'];
let randomFriutIndex = Math.floor(Math.random()*4);
food.src = fruits[randomFriutIndex];


let box = 32;
let score = 0;
const gameOver = "Game Over!"


let avacado = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box
};

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
};

document.addEventListener('keydown', direction);

let dir;

function direction(event) {
    if(event.keyCode == 37 && dir != 'right') {
        dir = 'left';
    } else if(event.keyCode == 38 && dir != 'down') {
        dir = 'up';
    } else if(event.keyCode == 39 && dir != 'left') {
        dir = 'right';
    } else if(event.keyCode == 40 && dir != 'up') {
        dir = 'down';
    }
};

function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            actionGameOver();
            clearInterval(game);
        } 
    } 
};


function actionGameOver() {
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText(gameOver, box * 6, box * 1.7);
};


function drawGame() {
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(food, avacado.x, avacado.y);
  
    for(let i=0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? 'green' : 'yellow';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    };

    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText(score, box * 2.5, box * 1.7);


    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == avacado.x && snakeY == avacado.y) {
        score++;
        avacado = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box
        };
        randomFriutIndex = Math.floor(Math.random()*4);
        food.src = fruits[randomFriutIndex];
        
    } else {
        snake.pop();
    }

    if(snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
        actionGameOver();
        clearInterval(game);
    } 

    if(dir == 'left') snakeX -= box;
    if(dir == 'right') snakeX += box;
    if(dir == 'up') snakeY -= box;
    if(dir == 'down') snakeY += box;


    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);

};

let game = setInterval(drawGame, 100);