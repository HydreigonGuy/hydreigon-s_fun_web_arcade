
function fillBackground(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 600, 400);
}

function displayText(text, plot, ctx, size) {
    ctx.font = `${size}px Arial`;
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

function drawGamePending(canvas, game_over, score) {
    let ctx = canvas.getContext("2d");

    fillBackground(ctx);
    displayText("Press SPACE to start!", {'x':10, 'y':370}, ctx, 30);
    if (game_over) {
        displayText(`Game Over!`, {'x':10, 'y':70}, ctx, 60);
        displayText(`Score: ${score}`, {'x':10, 'y':120}, ctx, 20);
    }
}

function drawPlayer(player, ctx) {
    ctx.beginPath();
    ctx.arc(100, player.y, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fill();
}

function displayGamePlaying(player, objects, canvas) {
    let ctx = canvas.getContext("2d");

    fillBackground(ctx);
    fillObjects(objects, ctx);
    ctx.stroke();
    drawPlayer(player, ctx);
}