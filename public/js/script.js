let isAdding = false;
let isSubtracting = false;
let isMultiplying = false;
let isDividing = false;
let isOperating = false;
let isEqualing = false;
let isDecimaling = false;

let operationString = document.querySelector('.operation-string');
let valueString = document.querySelector('.value-string');
let historyWrapper = document.querySelector('.history-list-wrapper');
let historyList = document.querySelector('.history-list');

let currentValue;
let storedValue;
let decimalString;

let numBtns = document.querySelectorAll('.number');
numBtns.forEach(btn=>btn.addEventListener('click', updateCurrentValue));
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

function updateCurrentValue(event) {
    console.log('number pressed');
    if (isEqualing) {
        isEqualing = false;
    }

    if (valueString.textContent.length >= 16 && !isOperating) {
        console.log('exceeding digit space');
        return;
    }

    if (currentValue === undefined) {
        currentValue = parseFloat(this.textContent);
    } else if (isDecimaling && decimalString.length > 0) {
        let newValue = decimalString + this.textContent;
        currentValue = parseFloat(newValue);
        decimalString = '';
    } else {
        let newValue = currentValue.toString() + this.textContent;
        currentValue = parseFloat(newValue);
    }
    valueString.textContent = currentValue.toString().substring(0, 16);
    logValues();
    logFlags();
}

function operate() {
    console.log('operating');
    if (isAdding) {
        return add(storedValue, currentValue);
    } else if (isSubtracting) {
        return subtract(storedValue, currentValue);
    } else if (isMultiplying) {
        return multiply(storedValue, currentValue);
    } else if (isDividing) {
        return divide(storedValue, currentValue);
    }
}

function updateOperationString(symbol) {
    if (isOperating && currentValue === undefined) {
        let operation = operationString.textContent;
        operationString.textContent = operation.substring(0, operation.length - 2) + `${symbol} `;
        return;
    }

    if(isEqualing) {
        operationString.textContent = storedValue.toString() + ` ${symbol} `;
    } else {
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
        storedValue = currentValue;
        currentValue = undefined;
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
    if (!isOperating) {
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
    currentValue = -currentValue;
    valueString.textContent = currentValue;
}

function addDecimal() {
/*    if (isDecimaling || isEqualing) {
        return;
    }
    isDecimaling = true;
    decimalString = currentValue + '.';
    valueString.textContent = decimalString;
    logValues();
    logFlags();
*/
}

function clear() {
    operationString.textContent = '';
    valueString.textContent = 0;
    currentValue = undefined;
    storedValue = undefined;
    resetOperatorFlags();
}

function clearEntry() {
    valueString.textContent = 0;
    currentValue = undefined;
}

function backspace() {
    console.log('delete pressed');
    if (currentValue === undefined) {
        return;
    }
    
    let currentValueString = valueString.textContent;
    if (currentValueString.length === 1) {
        currentValue = undefined;
    } else {
        let backspacedValue = currentValueString.substring(0, currentValueString.length - 1);
        currentValue = parseFloat(backspacedValue);
    }
    if (currentValue === undefined) {
        valueString.textContent = 0;
    } else {
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
}
