export const roundToPrecision = (num, precision = 10) => {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
};

export const calculate = (a, b, op) => {
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "÷": return b !== 0 ? a / b : "Ошибка";
        case "%": return b !== 0 ? a % b : "Ошибка";
        case "x^y": return (a === 0 & b < 0) ? "Ошибка" : Math.pow(a, b);
        default: return 'Нет такой операции';
    }
};

export const performUnaryOperation = (operation, value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "Ошибка"; 
    const result = operation(num);
    if (isNaN(result) || (result == Number.POSITIVE_INFINITY || result == Number.NEGATIVE_INFINITY)) return "Ошибка";  
    return roundToPrecision(result).toString();
};


export const toRadians = (angle) => (angle * Math.PI) / 180;