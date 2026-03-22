// ----- VARIABLES -----
/** Represents the calculator state. */
const DEFAULT_SCREEN_CONTENT = "0";
let state = {
    operand1: "",
    operator: "",
    operand2: "",

    /**
     * Checks if calculator is completely empty.
     * @returns {boolean}
     */
    isEmptyState: function () {
        return (!this.operand1 && !this.operator && !this.operand2);
    },

    /**
     * Checks if calculation can be performed.
     * @returns {boolean}
     */
    isValidState: function () {
        return (this.operand1 && this.operator && this.operand2);
    },

    /**
     * Resets operands and operator.
     */
    emptyState: function () {
        this.operand1 = "";
        this.operator = "";
        this.operand2 = "";
    }
}

// ----- FUNCTIONS -----

/**
 * Adds two numbers.
 */
function add (a, b) {
    return String(Number(a)+Number(b));
}

/**
 * Subtracts b from a.
 */
function subtract (a, b) {
    return String(Number(a)-Number(b));
}

/**
 * Multiplies two numbers.
 */
function multiply (a, b) {
    return String(Number(a)*Number(b));
}

/**
 * Divides a by b.
 * Returns error string if division by zero.
 */
function divide (a, b) {
    if (Number(b) === 0)
        return "Math Error!"
    return String(Number(a)/Number(b));
}

/**
 * Performs calculation based on operator.
 */
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

// Initial screen setup...
const screen  = document.querySelector(".screen");
/**
 * Updates the calculator display.
 */
function updateScreen () {
    screen.style.color = "#1a1a18";

    if (state.isEmptyState())
        screen.textContent = DEFAULT_SCREEN_CONTENT;
    else
        screen.textContent = `${state.operand1}${state.operator}${state.operand2}`;

    if (screen.textContent === "Math Error!")
    {
        screen.style.color = "red";
        state.emptyState();
    }
        
}

updateScreen();

// EventHandlers (buttons)...
/**
 * Handles digit button clicks.
 */
const handleDigit = function (event) {
    let node = event.target;
    let input = node.textContent;
    
    if (!state.operator)
        state.operand1 += input;
    else
        state.operand2 += input;

    updateScreen();
}

/**
 * Handles operator button clicks.
 */
const handleOperator = function (event) {
    let node = event.target;
    let input = node.textContent;

    // check if first operand is received
    if (state.operand1 && !state.operand2)
        state.operator = input;
    // complete operation on operator input after complete state
    else if (state.operand1 && state.operand2)
    {
        let result = operate (state.operand1, state.operator, state.operand2);
        state.emptyState();
        state.operand1 = result;
        state.operator = input;
    }

    updateScreen();
}

/**
 * Handles equals button.
 */
const handleResult = function (event) {
    if (state.isValidState())
    {
        let result = operate (state.operand1, state.operator, state.operand2);
        state.emptyState();
        state.operand1 = result;
        updateScreen();
    }
}

/**
 * Handles clear button.
 */
const handleClean = function (event) {
    state.emptyState();
    updateScreen();
}

/**
 * Add appropriate EventListeners to buttons
 */
const buttons = document.querySelectorAll(".board button");

buttons.forEach((button) => {
    if (button.classList.contains("digit"))
        button.addEventListener("click", handleDigit);
    else if (button.classList.contains("operator"))
        button.addEventListener("click", handleOperator);
    else if (button.classList.contains("result"))
        button.addEventListener("click", handleResult);
    else if (button.classList.contains("clear"))
        button.addEventListener("click", handleClean);
});