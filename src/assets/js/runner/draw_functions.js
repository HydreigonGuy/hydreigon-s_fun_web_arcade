
function fillBackground(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 600, 400);
}

function displayText(text, plot, ctx) {
    ctx.font = "30px Arial";
    ctx.strokeText(text, plot.x, plot.y);
}

function fillObjects(objects, ctx) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < objects.length; i++) {
        ctx.moveTo(objects[i].x, 400);
        ctx.lineTo(objects[i].x, 400 - objects[i].height);
    }
}

function drawGamePending(canvas) {
    let ctx = canvas.getContext("2d");

    fillBackground(ctx);
    displayText("Press SPACE to start!", {'x':10, 'y':'370'}, ctx)
}

function displayGamePlaying(objects, canvas) {
    let ctx = canvas.getContext("2d");

    fillBackground(ctx);
    fillObjects(objects, ctx);
    ctx.stroke();
}