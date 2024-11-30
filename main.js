const calculator = document.createElement("div");
const outputBlock = Object.assign(document.createElement("div"), { className: "outputBlock", textContent: "0" });
const blockButton = Object.assign(document.createElement("div"), { className: "blockButton" });
calculator.classList.add("containerCalculator");
calculator.append(outputBlock, blockButton);

const buttons = [
    "C", "←", "%", "÷",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "±", "0", ".", "=",
    "√", "Х²", "1/X",
    "sin", "cos", "x^y",
    "floor", "ceil", "M+",
    "M-", "MR", "MC" 
];

buttons.forEach((label, i) => {
    const btn = Object.assign(document.createElement("button"), { textContent: label, id: `_${i}` });
    btn.classList.add("button");
    btn.addEventListener("click", () => handleButtonClick(label));
    blockButton.appendChild(btn);
});

let currentValue = "0";
let storedValue = null;
let operator = null;
let memory = 0;

const roundToPrecision = (num, precision = 10) => {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
};

const handleButtonClick = (value) => {
    if (value === "C") return resetCalculator();
    if (value === "←") return updateOutput(currentValue = currentValue.slice(0, -1) || "0");
    if (value === "±") return updateOutput(currentValue = currentValue.startsWith("-") ? currentValue.slice(1) : `-${currentValue}`);
    if (value === "√") return performUnaryOperation(Math.sqrt);
    if (value === "Х²") return performUnaryOperation((n) => Math.pow(n, 2));
    if (value === "1/X") return performUnaryOperation((n) => (n !== 0 ? 1 / n : "Ошибка"));
    if (value === "sin") return performUnaryOperation((n) => Math.sin(toRadians(n)));
    if (value === "cos") return performUnaryOperation((n) => Math.cos(toRadians(n)));
    if (value === "floor") return performUnaryOperation(Math.floor);
    if (value === "ceil") return performUnaryOperation(Math.ceil);
    if (value === "M+") return addToMemory(parseFloat(currentValue));
    if (value === "M-") return subtractFromMemory(parseFloat(currentValue));
    if (value === "MR") return updateOutput(memory); // Логика для "MR"
    if (value === "MC") return clearMemory(); // Логика для "MC"
    if (["%", "÷", "*", "-", "+"].includes(value)) return handleOperator(value);
    if (value === "x^y") return handleOperator(value);
    if (value === "=") return evaluateResult();
    if (!isNaN(value) || value === ".") return handleNumber(value);
};

const addToMemory = (value) => {
    memory += value;
    currentValue = memory.toString(); // Обновляем currentValue
    updateOutput(currentValue); // Показываем результат на экране
};

const subtractFromMemory = (value) => {
    memory -= value;
    currentValue = memory.toString(); // Обновляем currentValue
    updateOutput(currentValue); // Показываем результат на экране
};

const clearMemory = () => {
    memory = 0;
    highlightMemoryButton(false);
};

const performUnaryOperation = (operation) => {
    const result = roundToPrecision(operation(parseFloat(currentValue)));
    currentValue = result.toString();
    updateOutput(currentValue);
};

const handleOperator = (op) => {
    if (storedValue === null) {
        storedValue = parseFloat(currentValue);
    } else if (operator) {
        storedValue = calculate(storedValue, parseFloat(currentValue), operator);
    }
    operator = op;
    currentValue = "0";
    updateOutput(storedValue);
};

const evaluateResult = () => {
    if (operator) {
        if (operator === "x^y") {
            currentValue = roundToPrecision(Math.pow(storedValue, parseFloat(currentValue))).toString();
        } else {
            currentValue = roundToPrecision(calculate(storedValue, parseFloat(currentValue), operator)).toString();
        }
        operator = null;
        storedValue = null;
        updateOutput(currentValue);
    }
};

const calculate = (a, b, op) => {
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "÷": return b !== 0 ? a / b : "Ошибка";
        case "%": return a % b;
        default: return b;
    }
};

const handleNumber = (value) => {
    if (currentValue === "0" && value !== ".") {
        currentValue = value;
    } else {
        currentValue += value;
    }
    updateOutput(currentValue);
};

const resetCalculator = () => {
    currentValue = "0";
    storedValue = null;
    operator = null;
    updateOutput(currentValue);
};

const updateOutput = (value) => {
    outputBlock.textContent = value.toString();
};

const toRadians = (angle) => (angle * Math.PI) / 180;

const highlightMemoryButton = (active) => {
    const memoryButton = document.querySelector("#_28"); 
    if (active) {
        memoryButton.classList.add("active");
    } else {
        memoryButton.classList.remove("active");
    }
};

document.getElementById("root").appendChild(calculator);