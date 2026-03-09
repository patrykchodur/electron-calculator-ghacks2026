let display = document.getElementById('display');
let currentExpression = '';

function appendToDisplay(value) {
    if (currentExpression === '0' && !isNaN(value)) {
        currentExpression = value;
    } else {
        currentExpression += value;
    }
    updateDisplay();
}

function clearDisplay() {
    currentExpression = '0';
    updateDisplay();
}

function deleteLast() {
    if (currentExpression.length > 0) {
        currentExpression = currentExpression.slice(0, -1);
        if (currentExpression === '') currentExpression = '0';
    }
    updateDisplay();
}

function updateDisplay() {
    display.innerText = currentExpression || '0';
}

function calculate() {
    try {
        // Simple sanitization: only allow digits, operators, and decimal point
        const sanitizedExpression = currentExpression.replace(/[^-+*/.0-9]/g, '');
        const result = eval(sanitizedExpression);
        currentExpression = result.toString();
        updateDisplay();
    } catch (error) {
        display.innerText = 'Error';
        currentExpression = '';
    }
}
