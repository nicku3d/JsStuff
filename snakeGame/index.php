<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SnakeGame</title>
    <link href="style.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
</head>
<body>
<div class='canvas-container'>
    <div class="snake-game">
        <canvas id = 'canvas' width = "400" height ="500">
            Your browser sucks and does not support the canvas element.
        </canvas>
    </div>
        <table id="scoreTable">
            <tr>
                <th>Nazwa gracza</th>
                <th>Wynik</th>
            </tr>
            <tr>
                <td>test1</td>
                <td>11</td>
            </tr>
        </table>
</div>
<div>
    <button>Play</button>
    <button>Stop playing</button>
</div>

<script src="snakeGame.js"></script>

</body>
</html>