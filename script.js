
/*
// Function to perform math operations
function operate(n1, operator, n2) {
    result = 0;
    switch(operator) {
        case '/':
            result = n1 / n2;
            break;
        case '*':
            result = n1 * n2;
            break;
        case '-':
            result = n1 - n2;
            break;
        case '+':
            result = n1 + n2;
            break;
    }
    return result;
}


// Fill calculator display when numbers are clicked
const calcDisplay = document.querySelector(".display");
const calcButtons = document.querySelector(".buttons");

//let firstNoArr = [];
let equationArr = [];
let equation = '';
let firstNo = '';
let operator = '';
let isFirstNo = true;
let secondNo = '';

calcButtons.addEventListener("click", (event) => {
    let buttonClicked = event.target.id
    switch (buttonClicked) {
        // clear case
        case 'clear':
            //firstNoArr = [];
            firstNo = '';
            operator = '';
            secondNo = '';
            calcDisplay.textContent = '0';
            break;
        
        // digit cases
        case 'one':
            // firstNoArr.push('1');
            // firstNo = firstNoArr.join('');
            if (isFirstNo) {
                firstNo += '1';
                calcDisplay.textContent = firstNo;
            }

            else {
                secondNo += '1';
                equation = firstNo + ' ' + operator + ' ' + secondNo;
                calcDisplay.textContent = equation;
            }
            break;
        case 'two':
            // firstNoArr.push('2');
            // firstNo = firstNoArr.join('');
            firstNo += '2';
            calcDisplay.textContent = firstNo;
            break;
        case 'three':
            // firstNoArr.push('3');
            // firstNo = firstNoArr.join('');
            firstNo += '3';
            calcDisplay.textContent = firstNo;
            break;
        case 'four':
            // firstNoArr.push('4');
            // firstNo = firstNoArr.join('');
            firstNo += '4';
            calcDisplay.textContent = firstNo;
            break;
        case 'five':
            // firstNoArr.push('5');
            // firstNo = firstNoArr.join('');
            firstNo += '5';
            calcDisplay.textContent = firstNo;
            break;
        case 'six':
            // firstNoArr.push('6');
            // firstNo = firstNoArr.join('');
            firstNo += '6';
            calcDisplay.textContent = firstNo;
            break;
        case 'seven':
            // firstNoArr.push('7');
            // firstNo = firstNoArr.join('');
            firstNo += '7';
            calcDisplay.textContent = firstNo;
            break;
        case 'eight':
            // firstNoArr.push('8');
            // firstNo = firstNoArr.join('');
            firstNo += '8';
            calcDisplay.textContent = firstNo;
            break;
        case 'nine':
            // firstNoArr.push('9');
            // firstNo = firstNoArr.join('');
            firstNo += '9';
            calcDisplay.textContent = firstNo;
            break;
        case 'zero':
            if (!firstNo)
                break;
            else {
                // firstNoArr.push('0');
                // firstNo = firstNoArr.join('');
                firstNo += '0';
                calcDisplay.textContent = firstNo;
                break;
            }
        
        // operator cases
        case 'divide':
            if (firstNo) {
                operator = '/'
                calcDisplay.textContent = firstNo + ' ' + operator;
                isFirstNo = false;
                break;
            }
        case 'multiply':
            if (firstNo) {
                operator = '*'
                calcDisplay.textContent = firstNo + ' ' + operator;
                isFirstNo = false;
                break;
            }
        case 'equals':
            if (firstNo && operator && secondNo) {
                console.log(firstNo, secondNo, operator)
                let result = operate(firstNo, operator, secondNo)
                calcDisplay.textContent = result;

                console.log(`Result is ${result}`) 
            }
            break;
    }
    console.log(firstNo)
})
*/

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let displayValue = '0';
    let firstOperand = null;
    let waitingForSecondOperand = false;
    let operator = null;

    function updateDisplay() {
        display.textContent = displayValue;
    }

    updateDisplay();

    function handleNumber(num) {
        if (waitingForSecondOperand) {
            displayValue = num;
            waitingForSecondOperand = false;
        } else {
            displayValue = displayValue === '0' ? num : displayValue + num;
        }
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(displayValue);

        if (operator && waitingForSecondOperand) {
            operator = nextOperator;
            return;
        }

        if (firstOperand == null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstOperand = result;
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
    }

    function calculate(first, second, operator) {
        if (operator === '+') {
            return first + second;
        } else if (operator === '-') {
            return first - second;
        } else if (operator === '×') {
            return first * second;
        } else if (operator === '÷') {
            return first / second;
        }
        return second;
    }

    function handleClear() {
        displayValue = '0';
        firstOperand = null;
        waitingForSecondOperand = false;
        operator = null;
    }

    function handleBackspace() {
        displayValue = displayValue.slice(0, -1) || '0';
    }

    function handlePercent() {
        displayValue = `${parseFloat(displayValue) / 100}`;
    }

    function handleDecimal() {
        if (!displayValue.includes('.')) {
            displayValue += '.';
        }
    }

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const { id } = button;

            if (!isNaN(button.textContent)) {
                handleNumber(button.textContent);
                updateDisplay();
            } else if (id === 'clear') {
                handleClear();
                updateDisplay();
            } else if (id === 'backspace') {
                handleBackspace();
                updateDisplay();
            } else if (id === 'percent') {
                handlePercent();
                updateDisplay();
            } else if (id === 'decimal') {
                handleDecimal();
                updateDisplay();
            } else if (id === 'equals') {
                handleOperator(operator);
                updateDisplay();
                operator = null;
            } else {
                handleOperator(button.textContent);
                updateDisplay();
            }
        });
    });
});
