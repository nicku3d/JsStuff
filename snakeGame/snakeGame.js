"use strict";

const gameWindow = {
    gridSize : 20,
    tileCount : 20
};

const player = {
    x : 10,
    y : 10,
    tail : 3,
    trail : [],
    score : 0,

    positionChange : function() {
        this.x = 5;
    }
};

const apple = {
    x : 15,
    y : 15
};

const speed = {
    x : 0,
    y : 0
};

let c;
let ctx;
let game;
let playerPlaying = false;
let gamePaused = false;
let gameTimeout = 1000/15;

window.onload = function() {
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");
    document.addEventListener("keydown",keyDown);
    game = setInterval(gameLoop, gameTimeout);
}

function saveScore() {
    let table = document.getElementById("scoreTable");
    let row = table.insertRow();

    let playerNameCell  = row.insertCell();
    let playerScoreCell = row.insertCell();
    let playerName  = document.createTextNode("Player1");
    let playerScore = document.createTextNode(player.score);
    playerNameCell.appendChild(playerName);
    playerScoreCell.appendChild(playerScore);
}

function pauseGame() {
    if (!gamePaused) {
        game = clearInterval(game);
        gamePaused = true;
        showText("Pause");
    } else if (gamePaused) {
        game = setInterval(gameLoop, gameTimeout);
        gamePaused = false;
    }
}

function showText(text, x = 200 , y = 450, color="green"){
    ctx.fillStyle = color;
    ctx.font = "30px Arial";
    ctx.fillText(text, x, y);
}

function keyDown(event){
    switch(event.key) {
        case "ArrowRight":
            if(speed.x < 0)
                break;
            else {
                speed.x = 1;
                speed.y = 0;
            }
            break;

        case "ArrowLeft":
            if(speed.x > 0)
                break;
            else {
                speed.x = -1;
                speed.y = 0;
            }
            break;

        case "ArrowUp":
            if(speed.y > 0)
                break;
            else {
                speed.x = 0;
                speed.y = -1;
            }
            break;

        case "ArrowDown":
            if(speed.y < 0)
                break;
            else {
                speed.x = 0;
                speed.y = 1;
            }
            break;
        case "p":
            pauseGame();
            break;
        case "Enter":

            break;
    }
}

function gameLoop(){
    calcSnakePosition();
    checkForBorders();
    changeBackgroundColor("black");
    //making cosy place for the score :)
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 400, 400, 100);
    drawSnake();
    drawApple();
    drawScore();
}

function drawScore(color = "green"){
    ctx.fillStyle = color;
    ctx.font = "30px Arial";
    ctx.fillText("Score : "+player.score, 20, 450);
}

function calcSnakePosition(){
    player.x += speed.x;
    player.y += speed.y;
}

function drawSnake(color="grey"){
    ctx.fillStyle = color;
    for(let i = 0; i < player.trail.length; i++){
        ctx.fillRect(player.trail[i].x * gameWindow.gridSize, player.trail[i].y * gameWindow.gridSize,
            gameWindow.gridSize - 2,
            gameWindow.gridSize - 2);
        if(player.x === player.trail[i].x && player.y === player.trail[i].y){/* ma 4 bo na zakrecie sie wydluza jebany, nie do zabicia jest teraz */
            if(playerPlaying) {
                saveScore();
            }
            player.tail = 3;
            player.x = 10;
            player.y = 10;
            player.score = 0;
        }
    }
    player.trail.push({x : player.x, y : player.y });
    while(player.trail.length > player.tail){
        player.trail.shift();
    }
}

function changeBackgroundColor(color = "black"){
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, c.width, c.height);
}

function checkForBorders(){
    if(player.x > gameWindow.tileCount - 1) {
        player.x = 0;
    }

    if(player.y > gameWindow.tileCount - 1) {
        player.y = 0;
    }

    if(player.y < 0 ) {
        player.y = gameWindow.tileCount -1;
    }

    if(player.x < 0 ) {
        player.x = gameWindow.tileCount -1;
    }
}

function drawApple(){
    if(apple.x === player.x && apple.y === player.y){
        player.tail++;
        player.score++;
        playerPlaying=true;
        apple.x = Math.floor(Math.random()*gameWindow.tileCount);
        apple.y = Math.floor(Math.random()*gameWindow.tileCount);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x * gameWindow.gridSize,
        apple.y * gameWindow.gridSize,
        gameWindow.gridSize - 2,
        gameWindow.gridSize - 2);
}
