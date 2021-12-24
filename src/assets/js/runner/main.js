
var canvas = document.getElementById("game");
var gamePaused = 1;
var last_time = 0;
var objects = [];

function handleSpacePress() {
    if (gamePaused == 1) {
        gamePaused = 0;
        return;
    }
}

document.body.onkeydown = function (e) {
    if (e.keyCode == 32)
        handleSpacePress();
}

function addObjets(time) {
    if (objects.length == 0 || objects[objects.length - 1].x < 450)
        if (Math.random() < time * 0.01)
            objects.push({'x':600, 'height':50 + 150 * Math.random()});
}

function moveObjects(time) {
    for (let i = 0; i < objects.length; i++)
        objects[i].x -= time * 0.1;
}

function removeExtraObjects() {
    for (let i = 0; i < objects.length; i++){
        if (objects[i].x < 0) {
            objects.splice(i, 1);
            return (removeExtraObjects);
        }
    }
}

function gameLoop(time) {
    let elapsed_time = time - last_time

    if (gamePaused)
        drawGamePending(canvas);
    else {
        addObjets(elapsed_time);
        moveObjects(elapsed_time);
        removeExtraObjects();
        displayGamePlaying(objects, canvas);
    }
    last_time = time;
    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);