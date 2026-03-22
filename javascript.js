// ----- VARIABLES -----
let state = {
    operand1: "",
    operator: "",
    operand2: "",
    result  : "",

    isEmptyState: function () {
        return (!this.operand1 && !this.operator && !this.operand2 && !this.result);
    },
    isValidState: function () {
        return (this.operand1 && this.operator && this.operand2);
    },
    emptyState: function () {
        this.operand1 = "";
        this.operator = "";
        this.operand2 = "";
    }
}
const DEFAULT_SCREEN_CONTENT = "0";

// ----- FUNCTIONS -----
// screen setup
const screen  = document.querySelector(".screen");
function updateScreen () {
    screen.style.color = "#1a1a18";
    if (state.isEmptyState())
        screen.textContent = DEFAULT_SCREEN_CONTENT;
    else
        screen.textContent = `${state.operand1}${state.operator}${state.operand2}${state.result}`;

    if (screen.textContent === "Math Error!")
        screen.style.color = "red";
}
updateScreen();

// Addition operation
function add (a, b) {
    return Number(a)+Number(b);
}

// subtraction operation
function subtract (a, b) {
    return a-b;
}

// multiplication operation
function multiply (a, b) {
    return a*b;
}

// division operation
function divide (a, b) {
    if (b === "0")
        return "Math Error!"
    return a/b;
}

// general operator
function operate(a, operator, b) {
    switch(operator)
    {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            break;
    }
}

// eventListener functions
const readDigit = function (event) {
    let node = event.target;
    let input = node.textContent;
    state.result = "";
    // check if first operand
    if (!state.operator)
        state.operand1 += input;
    else
        state.operand2 += input;
    updateScreen();
}

const readOperator = function (event) {
    let node = event.target;
    let input = node.textContent;

    // check if first operand is received
    if (state.operand1)
        state.operator = input;

    updateScreen();
}

const readResult = function (event) {
    if (state.isValidState())
    {
        state.result = operate (state.operand1, state.operator, state.operand2);
        state.emptyState();
        updateScreen();
    }
}

const readClean = function (event) {
    state.emptyState();
    state.result = "";
    updateScreen();
}

// add eventListeners to buttons
const buttons = document.querySelectorAll(".board button");
buttons.forEach((button) => {
    if (button.classList.contains("digit"))
        button.addEventListener("click", readDigit);
    else if (button.classList.contains("operator"))
        button.addEventListener("click", readOperator);
    else if (button.classList.contains("result"))
        button.addEventListener("click", readResult);
    else if (button.classList.contains("clear"))
        button.addEventListener("click", readClean);
});

