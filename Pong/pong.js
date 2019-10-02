'use strict';


let c;
let ctx;
let interval = undefined;
let gameTimeout = 20;
let paddle;
let paddle2;


const gridSize = 20;



// const paddle = {
//     x: 0,
//     y: 0,
//     direction: 0,
//     w: gridSize,
//     h: gridSize * 4,
//     speed: 7,
// }



const ball = {
    x: 0,
    y: 0,
    xv: 0, //x velocity
    yv: 0, //y velocity
    speed: 7,
    size: gridSize,
}


function Paddle(x, y){
    this.x = x;
    this.y = y;
    this.direction = 0;
    this.w = gridSize;
    this.h = gridSize * 4;
    this.speed = 7;
    this.Draw = () => {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}



window.onload = () => {
    c = document.getElementById("pongWindow");
    ctx = c.getContext("2d");
    drawBackground();
    //doCoolStuff();
    ctx.fillStyle = "white";
    //init paddles position
    paddle = new Paddle(50, c.height / 2 - (2 * gridSize));
    paddle2 = new Paddle(c.width-50, c.height/2 - (2*gridSize));

    //end of init paddle position

    //init ball
    ball.x = c.width / 2;
    ball.y = c.height / 2;

    let startingAngle = Math.round(Math.random()*360);
    let bounceAngle = startingAngle * Math.PI / 180;
    ball.xv = Math.cos(bounceAngle);
    ball.yv = - Math.sin(bounceAngle);


    //end of init ball
    showText("Press Enter to start!");

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

}

function gameLoop() {
    //paddleMovement
    if (paddle.direction == -1) {
        paddle.y += paddle.speed;
    } else if (paddle.direction == 1) {
        paddle.y -= paddle.speed;
    }

    //paddle collison check
    if (paddle.y > c.height - paddle.h) {
        paddle.y = c.height - paddle.h;
    } else if (paddle.y < 0) {
        paddle.y = 0;
    }
    //end of paddle collision check

    moveBall();
    //end of ball collison check and movement

    //paddle - ball collision
    if (ball.x <= (paddle.x + paddle.w)
        && ball.y > paddle.y - ball.size
        && ball.y < paddle.y + paddle.h) {
        ball.xv = -ball.xv;
    }
    //end of paddle - ball collision

    //debug
    //console.log("X " + paddle.x +" ==? "+ ball.x);
    //console.log("Y" + paddle.y +" "+ (paddle.y+paddle.h) +" ==? "+ ball.y);
    //console.log(ball);
    //end of debug

    drawBackground();
    paddle.Draw();
    paddle2.Draw();
    drawBall();

}

function moveBall() {

    //ball collision with walls
    if(ball.x >= c.width - gridSize*1.2){
        ball.xv=-ball.xv;
    }
    else if( ball.x <= 0){
        ball.xv=-ball.xv;
    }

    if(ball.y >= c.height - gridSize*1.2){
        ball.yv = -ball.yv;
    }
    else if(ball.y <= 0){
        ball.yv = -ball.yv;
    }

    //ball position update
    ball.x+=ball.speed*ball.xv;
    ball.y+=ball.speed*ball.yv;
}

function keyDownHandler(event) {
    switch (event.key) {
        case "ArrowUp":
            paddle.direction = 1;
            break;
        case "ArrowDown":
            paddle.direction = -1;
            break;
        case "Enter":
            if (interval == undefined) {
                interval = setInterval(gameLoop, gameTimeout);
            }
            break;
    }
}

function keyUpHandler(event) {
    switch (event.key) {
        case "ArrowUp":
            paddle.direction = 0;
            break;
        case "ArrowDown":
            paddle.direction = 0;
            break;
            break;
    }
}

function drawBall() {
    ctx.fillStyle = "white";
    ctx.fillRect(ball.x, ball.y, gridSize, gridSize);
}

function doCoolStuff() {
    for (let x = 0; x < c.width; x += gridSize) {
        for (let y = 0; y < c.height; y += gridSize) {
            ctx.fillStyle = () => {
                let hexChars = '0123456789ABCDEF';
                let color = '#';
                for (let i = 0; i < 6; i++) {
                    color += hexChars[Math.floor(Math.random() * 16)];
                }
                return color;
            }
            ctx.fillRect(x, y, gridSize, gridSize);
        }
    }
}

function drawGrid() {
    ctx.strokeStyle = "red";
    for (let x = 0; x < c.width; x += gridSize) {
        for (let y = 0; y < c.height; y += gridSize) {
            ctx.strokeRect(x, y, gridSize, gridSize);
        }
    }
}


function drawBackground() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "white";
    ctx.fillRect(c.width / 2, 0, 10, c.height);
}

function showText(text, x = 180, y = 200, color = "green") {
    ctx.fillStyle = color;
    ctx.font = "30px Arial";
    ctx.fillText(text, x, y);
}