const display = document.getElementById('display') as HTMLElement;
let currentExpression: string = '';

function appendToDisplay(value: string): void {
    if (currentExpression === '0' && !isNaN(Number(value))) {
        currentExpression = value;
    } else {
        currentExpression += value;
    }
    updateDisplay();
}

function clearDisplay(): void {
    currentExpression = '0';
    updateDisplay();
}

function deleteLast(): void {
    if (currentExpression.length > 0) {
        currentExpression = currentExpression.slice(0, -1);
        if (currentExpression === '') currentExpression = '0';
    }
    updateDisplay();
}

function updateDisplay(): void {
    display.innerText = currentExpression || '0';
}

function calculate(): void {
    try {
        // Simple sanitization: only allow digits, operators, and decimal point
        const sanitizedExpression = currentExpression.replace(/[^-+*/.0-9]/g, '');
        // eslint-disable-next-line no-eval
        const result = eval(sanitizedExpression);
        currentExpression = result.toString();
        updateDisplay();
    } catch (error) {
        display.innerText = 'Error';
        currentExpression = '';
    }
}

// -------------------------------------------------------------
// NATIVE ELECTRON API TESTS (For permissions mapping pipeline)
// -------------------------------------------------------------

// Maps to Android: WRITE_EXTERNAL_STORAGE / READ_EXTERNAL_STORAGE
function saveToFile(): void {
    try {
        const fs = require('fs');
        const os = require('os');
        const path = require('path');
        
        const filePath = path.join(os.homedir(), 'calc_result.txt');
        const content = `Last calculation result: ${display.innerText}\nTimestamp: ${new Date().toISOString()}`;
        
        fs.writeFileSync(filePath, content, 'utf8');
        alert(`Success!\nSaved to: ${filePath}`);
    } catch (err) {
        console.error('File system error:', err);
        alert('File System API not available or permission denied.');
    }
}

// Maps to Android: ACCESS_NETWORK_STATE
function logNetwork(): void {
    try {
        const os = require('os');
        const nets = os.networkInterfaces();
        
        let interfaceCount = Object.keys(nets).length;
        console.log('Network Interfaces Data:', nets);
        
        alert(`Success!\nFound ${interfaceCount} network interfaces.\nCheck DevTools console for details.`);
    } catch (err) {
        console.error('Network info error:', err);
        alert('OS Network API not available or permission denied.');
    }
}

// Expose functions to global scope for HTML onclick handlers
(window as any).appendToDisplay = appendToDisplay;
(window as any).clearDisplay = clearDisplay;
(window as any).deleteLast = deleteLast;
(window as any).calculate = calculate;
(window as any).saveToFile = saveToFile;
(window as any).logNetwork = logNetwork;
