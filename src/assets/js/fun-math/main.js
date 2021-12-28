
var answer = document.getElementById("answer");
var answer_form = document.getElementById("answer_form");
var equation = document.getElementById("equation");
var equation_string = "";
var solution = 0;
const EQUATION_TYPES = ["+", "-", "/", "x"];

function getRandomEquationType() {
    return (EQUATION_TYPES[Math.trunc(Math.random() * EQUATION_TYPES.length)]);
}

function getRandomNumber(max) {
    return (Math.round(Math.random() * max));
}

function resetEquation() {
    answer.className = "answer-input";
    equation.innerHTML = "";
    equation_string = "";
}

function solveEquation(num1, num2, selected_equation) {
    let ret = 0;

    switch (selected_equation) {
        case '+':
            ret = num1 + num2;
            break;
        case '-':
            ret = num1 - num2;
            break;
        case 'x':
            ret = num1 * num2;
            break;
        case '/':
            ret = num1 / num2;
            break;
    }
    return (ret);
}

function createEquation() {
    let num1 = getRandomNumber(10);
    let num2 = getRandomNumber(10);
    let selected_equation = getRandomEquationType();

    resetEquation();
    equation_string = num1 + " " + selected_equation + " " + num2 + " = ";
    solution = solveEquation(num1, num2, selected_equation);
    equation.innerHTML = equation_string;
}

function checkForWrightAnswer() {
    if (answer.value == solution)
        return (true);
    if (answer.value >= solution - 0.01 && answer.value <= solution + 0.01)
        return (true);
    return (false);
}

answer_form.addEventListener('submit', function () {
    if (checkForWrightAnswer()) {
        answer.value = "";
        createEquation();
    } else {
        answer.className = "answer-wrong-input";
    }
});

createEquation();