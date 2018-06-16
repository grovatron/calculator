let isAdding = false;
let isSubtracting = false;
let isMultiplying = false;
let isDividing = false;
let isOperating = false;
let isEqualing = false;
let isDecimaling = false;
let isNegative = false;

let operationString = document.querySelector('.operation-string');
let valueString = document.querySelector('.value-string');
let historyWrapper = document.querySelector('.history-list-wrapper');
let historyList = document.querySelector('.history-list');

let currentValue;
let storedValue;
let decimalString;

let numBtns = document.querySelectorAll('.number');
numBtns.forEach(btn=>btn.addEventListener('click', handleNumber));
let equalsBtn = document.querySelector('.equals');
equalsBtn.addEventListener('click', equals);
let plusBtn = document.querySelector('.plus');
plusBtn.addEventListener('click', plus);
let minusBtn = document.querySelector('.subtract');
minusBtn.addEventListener('click', minus);
let multiplyBtn = document.querySelector('.multiply');
multiplyBtn.addEventListener('click', mult);
let divideBtn = document.querySelector('.divide');
divideBtn.addEventListener('click', div);
let clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', clear);
let clearEntryBtn = document.querySelector('.clear-entry');
clearEntryBtn.addEventListener('click', clearEntry);
let deleteBtn = document.querySelector('.delete');
deleteBtn.addEventListener('click', backspace);
let posnegBtn = document.querySelector('.pos-neg');
posnegBtn.addEventListener('click', invert);
let decimalBtn = document.querySelector('.decimal');
decimalBtn.addEventListener('click', addDecimal);
let historyBtn = document.querySelector('.history-icon');
historyBtn.addEventListener('click', () => historyWrapper.classList.toggle('show'));

function resetOperatorFlags() {
    isAdding = false;
    isSubtracting = false;
    isDividing = false;
    isMultiplying = false;
    isOperating = false;
    isEqualing = false;
    isDecimaling = false;
    isNegative = false;
}

function plus() { 
    console.log('plus pressed');
    handleOperation('+');
    isAdding = true;
    logValues();
    logFlags();
}

function minus() {
    console.log('minus pressed');
    handleOperation('-');
    isSubtracting = true;
    logValues();
    logFlags();
}
function mult() {
    console.log('multiply pressed');
    handleOperation('*');
    isMultiplying = true;
    logValues();
    logFlags();
}

function div() {
    console.log('divide pressed');
    handleOperation('/');
    isDividing = true;
    logValues();
    logFlags();
}

function handleNumber(event) {
    let number = this.textContent;
    updateCurrentValue(number);
}

function updateCurrentValue(number) {
    console.log('number pressed');
    if (isEqualing) {
	isEqualing = false;
	operationString.textContent = '';
    }

    if (currentValue === undefined || currentValue === '0') {
	currentValue = number; 
    } else {
	currentValue += number;
    }
    valueString.textContent = currentValue.substring(0, 16);
    logValues();
    logFlags();
}

function operate() {
    console.log('operating');
    let currentValueNumber = parseFloat(currentValue);
    if (isAdding) {
        return add(storedValue, currentValueNumber);
    } else if (isSubtracting) {
        return subtract(storedValue, currentValueNumber);
    } else if (isMultiplying) {
        return multiply(storedValue, currentValueNumber);
    } else if (isDividing) {
        return divide(storedValue, currentValueNumber);
    }
}

function updateOperationString(symbol) {
    if (isOperating && currentValue === undefined) {
        let operation = operationString.textContent;
        operationString.textContent = operation.substring(0, operation.length - 2) + `${symbol} `;
        return;
    }

    console.log('inside updateOperationString()');
    logValues();
    logFlags();
    if(isEqualing) {
        operationString.textContent = storedValue.toString() + ` ${symbol} `;
    } else if (currentValue !== undefined) {
        operationString.textContent += currentValue.toString() + ` ${symbol} `;
    }
}

function handleOperation(symbol) {
    updateOperationString(symbol);
    if (isOperating && currentValue !== undefined) {
        storedValue = operate();
        updateValueString();
        currentValue = undefined;
    } else if (!isEqualing && currentValue !== undefined) {
        storedValue = parseFloat(currentValue);
        currentValue = undefined;
    } else if (!isEqualing && currentValue === undefined) {

    }
    resetOperatorFlags();
    isOperating = true;
}
    
function updateValueString() {
    let string = storedValue.toString().substring(0, 16);
    valueString.textContent = string;
}

function equals() {
    console.log('equal pressed');
    if (!isOperating || (isOperating && currentValue === undefined)) {
        return;
    }
    storedValue = operate();
    addHistory();
    operationString.textContent = '';
    updateValueString();
    currentValue = undefined;
    resetOperatorFlags();
    isEqualing = true;
    logValues();
    logFlags();
}

function invert() {
    if (currentValue === undefined || isEqualing) {
        return;
    }
    if (isNegative) {
	currentValue = currentValue.substring(1);
	isNegative = false;
    } else {
	currentValue = '-' + currentValue;
	isNegative = true;
    }
    valueString.textContent = currentValue;
}

function addDecimal() {
    if (isDecimaling || isEqualing) {
        return;
    }
    isDecimaling = true;
    if (currentValue === undefined) {
	currentValue = '0.';
    } else {
	currentValue += '.';
    }
    valueString.textContent = currentValue;
    logValues();
    logFlags();
}

function clear() {
    operationString.textContent = '';
    valueString.textContent = '';
    currentValue = undefined;
    storedValue = undefined;
    resetOperatorFlags();
}

function clearEntry() {
    valueString.textContent = '';
    currentValue = undefined;
}

function backspace() {
    console.log('delete pressed');
    if (currentValue === undefined) {
        return;
    }
    let deletedChar = currentValue.slice(-1);
    if (deletedChar === '.') {
	isDecimaling = false;
    }

    if (currentValue.length === 1) {
	currentValue = undefined;
	valueString.textContent = '';
    } else {
	currentValue = currentValue.substring(0, currentValue.length - 1);
	valueString.textContent = currentValue;
    }
    logValues();
    logFlags();
}

function add(a, b) {
    console.log('adding');
    return a + b;
}

function subtract(a, b) {
    console.log('subtracting');
    return a - b;
}

function multiply(a, b) {
    console.log('multiplying');
    return a * b;
}

function divide(a, b) {
    console.log('dividing');
    return a / b;
}

function logValues() {
    console.log({
        currentValue: currentValue,
        storedValue: storedValue,
    });
}

function logFlags() {
    console.log({
        isAdding: isAdding,
        isSubtracting: isSubtracting,
        isMultiplying: isMultiplying,
        isDividing: isDividing,
        isOperating: isOperating,
        isEqualing: isEqualing,
        isDecimaling: isDecimaling,
	isNegative: isNegative,
    });
}

// History code
let historyMap = new Map();

function HistoryObject(opString, valString, currVal, storedVal) {
    this.opString = opString;
    this.valString = valString;
    this.storedVal = storedValue;
    this.getOperation = () => `${opString} ${valString} =`;
}

function createHistoryDiv(histObj) {
    let historyDiv = document.createElement('div');
    historyDiv.className = 'history-item';
    let opDiv = document.createElement('div');
    opDiv.textContent = histObj.getOperation();
    opDiv.className = 'history-operation';
    let valDiv = document.createElement('div');
    valDiv.textContent = histObj.storedVal;
    valDiv.className = 'history-value'
    historyDiv.appendChild(opDiv);
    historyDiv.appendChild(valDiv);
    return historyDiv;
}

function addHistory() {
    let histObj = new HistoryObject(operationString.textContent, valueString.textContent, currentValue, storedValue);
    let historyDiv = createHistoryDiv(histObj);
    historyDiv.addEventListener('click', handleClick);
    historyMap.set(historyDiv, histObj);
    let firstChild = historyList.firstChild;
    historyList.insertBefore(historyDiv, firstChild);
}

function handleClick(event) {
    loadHistory(this);
    historyWrapper.classList.toggle('show');
}


function loadHistory(listItem) {
    let histObj = historyMap.get(listItem);
    operationString.textContent = histObj.getOperation();
    valueString.textContent = histObj.storedVal;
    currentValue = undefined;
    storedValue = histObj.storedVal;
    resetOperatorFlags();
    isEqualing = true;
    console.log('history loaded');
    logValues();
    logFlags();
}

// Keyboard Support
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operatorMap = new Map();
operatorMap.set('/', div);
operatorMap.set('*', mult);
operatorMap.set('+', plus);
operatorMap.set('-', minus);
operatorMap.set('Enter', equals);
operatorMap.set('=', equals);
operatorMap.set('Backspace', backspace);
operatorMap.set('Escape', clear);
operatorMap.set('Delete', clearEntry);
operatorMap.set('.', addDecimal);
operatorMap.set('i', invert);
const operatorArray = Array.from(operatorMap.keys());

function handleKeyPress(event) {
    let key = event.key;
    if (digits.includes(key)) {
	updateCurrentValue(key);
    } else if (operatorArray.includes(key)) {
	operatorMap.get(key)();
    }
}

window.addEventListener('keydown', handleKeyPress);
