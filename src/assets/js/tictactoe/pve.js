
function playBotTurn(placed, canvas, turn) {
    let selected = Math.round(Math.random() * 9);
    let safety_check = 0;
    let botTurn = (turn + 1) % 2;

    for (let i = 0; i < 9; i++)
        if (placed[i] == 0)
            safety_check++;
    if (safety_check == 0)
        return;
    while (placed[selected] != 0) {
        selected = Math.round(Math.random() * 9);
        console.log(selected);
    }
    placed[selected] = botTurn + 1;
    drawGameCanvas(placed, canvas);
}

function changePlayingDisplay(turn) {
    let player_to_display = '0';

    if (turn == 1)
        player_to_display = 'X';
    document.getElementById("current_player").innerHTML = `
    You are playing as:
    <br><br>
    ${player_to_display}
    `
}

function launchPvEgame(placed, canvas) {
    let turn = Math.round(Math.random()) % 2;

    drawGameCanvas(placed, canvas);
    changePlayingDisplay(turn);
    return (turn);
}