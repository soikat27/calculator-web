// ----- VARIABLES -----
let state = {
    operand1: "",
    operator: "",
    operand2: "",
}

// ----- FUNCTIONS -----
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

// Addition operation
function add (a, b) {
    return Number(a)+Number(b);
}

// subtraction operation
function subtract (a, b) {
    return a-b;
}

// mult. operation
function multiply (a, b) {
    return a*b;
}

// division operation
function divide (a, b) {
    return a/b;
}

// onclick: init. the variables and update screen
const read = function read (e) {
    let node = e.target;
    let input = node.textContent;

    if (node.classList.contains("digit") && !operator)
        operand1 += input;
    else if(node.classList.contains("operator") && operand1 && !operand2) {
        operator = input;
    }
    else if(node.classList.contains("operator") && operand2) {
        result = "" + operate(Number(operand1), operator, Number(operand2));
    }
    else if (operator)
        operand2 += input;

    screen.textContent = `${operand1} ${operator} ${operand2} ${result}`;
}

// read buttons
const screen  = document.querySelector(".screen");
const buttons = document.querySelectorAll(".board button");
buttons.forEach((button) => {
    if (button.classList.contains("digit") || button.classList.contains("operator"))
        button.addEventListener("click", read);
    if (button.classList.contains("result"))
        button.addEventListener("click", (e) => {
            if (operand1 && operand2 && operator)
            {
                result = "" + operate(Number(operand1), operator, Number(operand2));
                operand2 = "";
                operator = "";
                operand1 = ""+result
                screen.textContent = `${result}`;
            }
    });
});

