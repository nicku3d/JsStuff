'use strict';


let c;
let ctx;
let interval = undefined;
let gameTimeout = 20;

const gridSize = 20;


const player = {
    x: 0,
    y: 0,
    direction: 0,
    w: gridSize,
    h: gridSize * 4,
    speed: 7,
}
let angle = Math.round(Math.random()*360);
let bounceAngle = angle * Math.PI / 180;
console.log(angle);

const ball = {
    x: 0,
    y: 0,
    xv: Math.cos(bounceAngle), //x velocity
    yv: -Math.sin(bounceAngle), //y velocity
    angle: 0,
    speed: 7,
    size: gridSize,
}




window.onload = () => {
    c = document.getElementById("pongWindow");
    ctx = c.getContext("2d");
    drawBackground();
    //doCoolStuff();
    ctx.fillStyle = "white";
    //init player position
    player.x = 50;
    player.y = c.height / 2 - (2 * gridSize);

    ball.x = c.width / 2;
    ball.y = c.height / 2;
    //end of init player position

    //init ball position


    //end of init ball position
    showText("Press Enter to start!");

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

}

function gameLoop() {
    //playerMovement
    if (player.direction == -1) {
        player.y += player.speed;
    } else if (player.direction == 1) {
        player.y -= player.speed;
    }

    //player collison check
    if (player.y > c.height - player.h) {
        player.y = c.height - player.h;
    } else if (player.y < 0) {
        player.y = 0;
    }
    //end of player collision check

    moveBall();
    //end of ball collison check and movement

    //player - ball collision
    if (ball.x <= (player.x + player.w)
        && ball.y > player.y - ball.size
        && ball.y < player.y + player.h) {
        ball.xv = -ball.xv;
    }
    //end of player - ball collision

    //debug
    //console.log("X " + player.x +" ==? "+ ball.x);
    //console.log("Y" + player.y +" "+ (player.y+player.h) +" ==? "+ ball.y);
    //console.log(ball);
    //end of debug

    drawBackground();
    drawPlayer();
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
            player.direction = 1;
            break;
        case "ArrowDown":
            player.direction = -1;
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
            player.direction = 0;
            break;
        case "ArrowDown":
            player.direction = 0;
            break;
            break;
    }
}

function drawBall() {
    ctx.fillStyle = "white";
    ctx.fillRect(ball.x, ball.y, gridSize, gridSize);
}

function drawPlayer() {
    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, gridSize, 4 * gridSize);
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