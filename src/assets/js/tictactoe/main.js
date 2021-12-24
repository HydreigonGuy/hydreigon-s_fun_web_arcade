
var game_mode = 1;
var turn = 0;
var placed = [0, 0, 0,
            0, 0, 0,
            0, 0, 0];
var gamePause = 0;

var canvas = document.getElementById("game");

function getSelectedSquare(e) {
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    let selected = 0;

    if (x > 150)
        selected++;
    if (x > 300)
        selected++;
    if (y > 150)
        selected += 3;
    if (y > 300)
        selected += 3;
    return (selected);
}

function handleGameEnd(turn) {
    let player_to_display = '0';

    gamePause = 1;
    if (turn == 1)
        player_to_display = 'X';
    alert(`${player_to_display} is the winner!!!`);
}

function handleWin() {
    gamePause = 1;
    alert(`You won!!!`);
}

function handleLoss() {
    gamePause = 1;
    alert(`You lost!!!`);
}

function checkForWin(placed) {
    for (let i = 0; i < 3; i++) {
        if (placed[i] != 0 && placed[i] == placed[i + 3] && placed[i] == placed[i + 6])
            return (true);
        if (placed[i * 3] != 0 && placed[i * 3] == placed[i * 3 + 1] && placed[i * 3] == placed[i * 3 + 2])
            return (true);
    }
    if (placed[0] != 0 && placed[0] == placed[4] && placed[0] == placed[8])
        return (true);
    if (placed[2] != 0 && placed[2] == placed[4] && placed[2] == placed[6])
        return (true);
    return (false);
}

canvas.addEventListener("click", function (e) {
    if (gamePause)
        return;
    let selected = getSelectedSquare(e);

    if (placed[selected] == 0) {
        placed[selected] = turn + 1;
        drawGameCanvas(placed, canvas);
        if (checkForWin(placed)) {
            if (game_mode == 2)
                handleWin();
            else
                handleGameEnd(turn);
            return;
        }
        switch (game_mode) {
            case 1:
                turn = (turn + 1) % 2;
                changePlayerDisplay(turn);
                break;
            case 2:
                playBotTurn(placed, canvas, turn);
                if (checkForWin(placed))
                    handleLoss();
                break;
        }
    } else {
        // handle incorrect selected square
    }
});

function refreshGameModeButtons() {
    document.getElementById("game_mode1").className = "active-button";
    document.getElementById("game_mode2").className = "active-button";
}

function resetGameStats() {
    turn = 0;
    gamePause = 0;
    placed = [0, 0, 0,
            0, 0, 0,
            0, 0, 0];
}

function choseGameMode() {
    resetGameStats();
    refreshGameModeButtons();
    switch (game_mode) {
        case 1:
            document.getElementById("game_mode1").className = "selected-button";
            launchPvPGame(placed, canvas, turn);
            break;
        case 2:
            document.getElementById("game_mode2").className = "selected-button";
            turn = launchPvEgame(placed, canvas);
            if (turn == 1)
                playBotTurn(placed, canvas, turn);
            break;
    }
}

function setGameMode(new_mode) {
    game_mode = new_mode;
    choseGameMode();
}

choseGameMode();