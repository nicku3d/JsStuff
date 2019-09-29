'use strict';



let c;
let ctx;
let interval = undefined;
let gameTimeout = 1000/30;

const gridSize = 20;


const player = {
    x : 0,
    y : 0,
    direction : 0,
    w : gridSize,
    h : gridSize*4,
    speed : 20,
}

const ball = {
    x : 0,
    y : 0,
    xv : 0, //x velocity
    yv : 0, //y velocity
    speed : 5,
    size : gridSize,
}



window.onload = () => {
    c = document.getElementById("pongWindow");
    ctx = c.getContext("2d");
    drawBackground();
    //doCoolStuff();
    ctx.fillStyle = "white";
    //init player position
    player.x = 50;
    player.y = c.height/2-(2*gridSize);
    //end of init player position

    //init ball position
    

    //end of init ball position
    showText("Press Enter to start!");

    document.addEventListener("keydown",keyDown);

}

function gameLoop(){
    //playerMovement
    if(player.direction == -1) {
        player.y += player.speed;
    }
    else if (player.direction == 1){
        player.y -= player.speed;
    }
    player.direction=0;

    //player collison check
    if(player.y > c.height-4*gridSize){
        player.y = c.height-4*gridSize;
    }
    else if ( player.y < 0 ){
        player.y = 0;
    }
    //end of player collision check

    //ball collision check and movement
    // if(ball.x > c.width-gridSize*1.2){
    //     ball.x = c.width-gridSize*1.2;
    // }
    // else if(ball.x < 0){
    //     ball.x = 0;
    // }
    //
    // if(ball.y > c.height - gridSize*1.2){
    //     ball.y = c.height - gridSize*1.2;
    // }
    // else if (ball.y < 0){
    //     ball.y = 0;
    // }
    moveBall();
    //end of ball collison check and movement

    //player - ball collision
    if(ball.x == (player.x+player.w)
        && ball.y > player.y
        && ball.y < player.y+player.h){
        ball.xv = 1;
    }
    //end of player - ball collision
    //debug
    console.log("X " + player.x +" ==? "+ ball.x);
    console.log("Y" + player.y +" "+ (player.y+player.h) +" ==? "+ ball.y);
    //end of debug

    drawBackground();
    drawPlayer();
    drawBall();

}

function moveBall(){
    // if(ball.x <= c.width){
    //     ball.x += 5;
    // }
    //
    // if(ball.y <= c.height){
    //     ball.y += 5;
    // }
    if(ball.x >= c.width - gridSize*1.2){
        ball.xv = -1;
    }else if ( ball.x <= 0){
        ball.xv = 1;
    }
    if(ball.y >= c.height - gridSize*1.2){
        ball.yv = -1;
    }
    else if(ball.y <= 0){
        ball.yv = 1;
    }

    if(ball.xv == 1){
        ball.x+=ball.speed;
    }else if ( ball.xv == -1){
        ball.x-=ball.speed;
    }

    if(ball.yv == 1){
        ball.y += ball.speed;
    }
    else if (ball.yv == -1){
        ball.y -= ball.speed;
    }





}

function keyDown(event){
    switch(event.key){
        case "ArrowUp":
            player.direction = 1;
            break;
        case "ArrowDown":
            player.direction = -1;
            break;
        case "Enter":
            if(interval == undefined){
                interval = setInterval(gameLoop, gameTimeout);
            }
            break;
    }
}

function drawBall(){
    ctx.fillStyle = "white";
    ctx.fillRect(ball.x, ball.y, gridSize, gridSize);
}

function drawPlayer(){
    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, gridSize, 4*gridSize );
}

function doCoolStuff(){
    for(let x = 0;x < c.width; x+=gridSize){
        for(let y = 0; y < c.height ; y+=gridSize){
            ctx.fillStyle = () => {
                let hexChars = '0123456789ABCDEF';
                let color = '#';
                for (let i = 0; i < 6; i++) {
                    color += hexChars[Math.floor(Math.random() * 16)];
                }
                return color;
            }
            ctx.fillRect(x, y,gridSize,gridSize);
        }
    }
}

function drawGrid(){
    ctx.strokeStyle = "red";
    for(let x = 0;x < c.width; x+=gridSize){
        for(let y = 0; y < c.height ; y+=gridSize) {
            ctx.strokeRect(x, y, gridSize, gridSize);
        }
    }
}



function drawBackground(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "white";
    ctx.fillRect(c.width/2, 0, 10, c.height);
}

function showText(text, x = 180 , y = 200, color="green"){
    ctx.fillStyle = color;
    ctx.font = "30px Arial";
    ctx.fillText(text, x, y);
}