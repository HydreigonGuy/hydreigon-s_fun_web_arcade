
var canvas = document.getElementById("game");
var gamePaused = 1;
var last_time = 0;
var objects = [];
var is_jumping = false;
var airtime = 0;
var game_over = false;
var score = 0;

var player = {
    'y':375
};

function handleSpacePress() {
    if (gamePaused == 1) {
        gamePaused = 0;
        game_over = false;
        return;
    }
    if (is_jumping) {
    //    airtime += 100;
        return;
    }
    is_jumping = true;
    airtime = 100;
}

document.body.onkeydown = function (e) {
    if (e.keyCode == 32)
        handleSpacePress();
}

function addObjets(time) {
    if (objects.length == 0 || objects[objects.length - 1].x < 350)
        if (Math.random() < time * 0.001)
            objects.push({'x':600, 'height':50 + 150 * Math.random()});
}

function moveObjects(time) {
    for (let i = 0; i < objects.length; i++)
        objects[i].x -= time * 0.2;
}

function removeExtraObjects() {
    for (let i = 0; i < objects.length; i++){
        if (objects[i].x < 0) {
            objects.splice(i, 1);
            return (removeExtraObjects);
        }
    }
}

function makePlayerJump(time) {
    if (airtime == 0) {
        player.y += time * 0.6;
        if (player.y >= 375) {
            player.y = 375;
            is_jumping = false;
        }
    } else {
        player.y -= time * 0.6;
        if (player.y <= 100) {
            player.y = 100;
            airtime -= time * 0.6;
            if (airtime < 0)
                airtime = 0;
        }
    }
}

function endGame() {
    gamePaused = 1;
    is_jumping = false;
    game_over = true;
    score = Math.round(last_time / 100);
    last_time = 0;
    player.y = 375;
    objects = [];
}

function checkForCollision() {
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].x >= 80 && objects[i].x <= 120 && 400 - objects[i].height < player.y)
            return (endGame());
        if ((objects[i].x - 100) * (objects[i].x - 100) + (400 - objects[i].height - player.y) * (400 - objects[i].height - player.y) <= 400)
            return (endGame());
    }
}

function gameLoop(time) {
    let elapsed_time = time - last_time

    if (gamePaused)
        drawGamePending(canvas, game_over, score);
    else {
        if (is_jumping)
            makePlayerJump(elapsed_time);
        addObjets(elapsed_time);
        moveObjects(elapsed_time);
        removeExtraObjects();
        checkForCollision();
        displayGamePlaying(player, objects, canvas);
    }
    last_time = time;
    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);