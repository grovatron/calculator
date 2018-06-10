let adding = false;
let subtracting = false;
let multiplying = false;
let dividing = false;

function operate(a, b) {
    if (adding) {
        return add(a, b);
    } else if (subtracting) {
        return subtract(a, b);
    } else if (multiplying) {
        return multiply(a, b);
    } else if (dividing) {
        return divide(a, b);
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}
