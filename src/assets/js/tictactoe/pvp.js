
function changePlayerDisplay(turn) {
    let player_to_display = '0';

    if (turn == 1)
        player_to_display = 'X';
    document.getElementById("current_player").innerHTML = `
    Currently playing:
    <br><br>
    ${player_to_display}
    `
}

function launchPvPGame(placed, canvas, turn) {
    drawGameCanvas(placed, canvas);
    changePlayerDisplay(turn);
}
