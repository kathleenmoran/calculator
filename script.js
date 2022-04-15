function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return (y === 0) ? ('ERROR') : (x / y);
}

function deltaPercentage(initial, final) {
    return (final - initial) / initial * 100;
}

function operate(operator, x, y) {
    if ((isNaN(y) && y !== null) || isNaN(x)) return 'ERROR';

    result = null;
    switch(operator) {
        case 'negate':
            result = multiply(y, -1);
            break;
        case 'delta-percent':
            result = deltaPercentage(x, y);
            break;
        case 'sqrt':
            result = Math.sqrt(y);
            break;
        case 'multiply':
            result = multiply(x, y);
            break;
        case 'divide':
            result = divide(x, y);
            break;
        case 'percent':
            result = divide(y, 100);
            break;
        case 'minus':
            result = subtract(x, y);
            break;
        case 'plus':
            result = add(x, y);
            break;
        default:
            result = 'ERROR';
    }

    if (result > Number.MAX_SAFE_INTEGER || result < Number.MIN_SAFE_INTEGER) {
        return 'OUT OF BOUNDS';
    }
    else {
        return result;
    }
}

function listenForInput() {
    const MAX_NUMBERS = 14;
    const numbers = document.querySelector('.numbers');
    let previousOperator = null;
    let previousNumber = 0;
    let isNewNumber = true;
    let isClearPressed = false;

    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(operator => operator.addEventListener('click', function(e){
        let currentNumber = +numbers.textContent;
        let currentOperator = e.target.value;
        isClearPressed = false;
        
        if (e.target.classList.contains('single')) {
            numbers.textContent = 
                    operate(currentOperator, previousNumber, currentNumber).toString().substring(0,MAX_NUMBERS);
        }
        else if (previousOperator === null || 
                Array.from(operatorButtons).some(operator => operator.classList.contains('active'))) {
            deactivateOperatorButtons();
            e.target.classList.add('active');  
            previousOperator = currentOperator;  
            isNewNumber = true;
        }
        else {
            numbers.textContent = 
                    operate(previousOperator, previousNumber, currentNumber).toString().substring(0,MAX_NUMBERS);
            previousNumber = +numbers.textContent;
            e.target.classList.add('active');
            previousOperator = currentOperator;
            isNewNumber = true;
        }
    }));

    const digitButtons = document.querySelectorAll('.digit');
    digitButtons.forEach(digit => digit.addEventListener('click', function(e){
        isClearPressed = false;
        deactivateOperatorButtons();
        if (isNewNumber) {
            previousNumber = +numbers.textContent;
            numbers.textContent = e.target.value;
            isNewNumber = false;
        }
        else if (numbers.textContent.length < MAX_NUMBERS) {
            numbers.textContent += e.target.value;
        }
    }));

    const decimalButton = document.querySelector('.decimal');
    decimalButton.addEventListener('click', function(e){
        isClearPressed = false;
        if (isNewNumber) {
            previousNumber = +numbers.textContent;
            numbers.textContent = '0.';
            isNewNumber = false;
        }
        else if (numbers.textContent.length < MAX_NUMBERS && !numbers.textContent.includes('.')) {
            numbers.textContent += e.target.value;
        }
    });

    const equalsButton = document.querySelector('.equals');
    equalsButton.addEventListener('click', function(){
        isClearPressed = false;
        deactivateOperatorButtons();
        if (previousOperator !== null) {
            numbers.textContent = 
                    operate(previousOperator, previousNumber, +numbers.textContent).toString().substring(0,15);
            previousOperator = null;
            previousNumber = +numbers.textContent;
            isNewNumber = true;
        }
    });

    const clearButton = document.querySelector('.clear');
    clearButton.addEventListener('click', function(){
        if (isClearPressed) {
            previousOperator = null;
            previousNumber = 0;
            isNewNumber = true;
            isClearPressed = false;
        }
        else {
            numbers.textContent = 0;
            isNewNumber = true;
            isClearPressed = true;
        }
    });

    function deactivateOperatorButtons() {
        operatorButtons.forEach(operator => operator.classList.remove('active'));
    }
}

listenForInput();