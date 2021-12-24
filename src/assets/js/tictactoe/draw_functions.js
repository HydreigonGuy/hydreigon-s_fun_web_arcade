function drawLine(plot1, plot2, ctx) {
    ctx.moveTo(plot1.x, plot1.y);
    ctx.lineTo(plot2.x, plot2.y);
}

function drawLetter(letter, plot, ctx) {
    ctx.font = "50px Arial";
    ctx.strokeText(letter, plot.x, plot.y);
}

function drawGrid(ctx) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    drawLine({'x':0, 'y':150}, {'x':450, 'y':150}, ctx);
    drawLine({'x':0, 'y':300}, {'x':450, 'y':300}, ctx);
    drawLine({'x':150, 'y':0}, {'x':150, 'y':450}, ctx);
    drawLine({'x':300, 'y':0}, {'x':300, 'y':450}, ctx);
    ctx.stroke();
}

function fillBackground(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 450, 450);
}

function drawMoves(placed, ctx) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    for (let i = 0; i < 9; i++) {
        if (placed[i] == 1)
            drawLetter('O', {'x':(i % 3) * 150 + 50, 'y':Math.trunc(i / 3) * 150 + 75}, ctx);
        if (placed[i] == 2)
            drawLetter('X', {'x':(i % 3) * 150 + 50, 'y':Math.trunc(i / 3) * 150 + 75}, ctx);
    }
}

function drawGameCanvas (placed, canvas) {
    let ctx = canvas.getContext("2d");

    fillBackground(ctx);
    drawGrid(ctx);
    drawMoves(placed, ctx);
}