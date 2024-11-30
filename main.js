const calculator = document.createElement("div");
const outputBlock = Object.assign(document.createElement("div"), { className: "outputBlock", textContent: "0" });
const blockButton = Object.assign(document.createElement("div"), { className: "blockButton" });
calculator.classList.add("containerCalculator");
calculator.append(outputBlock, blockButton);

const buttons = [
    "C", "←", "%", "÷","7", "8", "9", "*","4", "5", "6", "-","1", "2", "3", "+","±", "0", ".", "=","√", "Х²", "1/X","sin", "cos", "x^y","floor", "ceil", "M+", "M-", "MR", "MC"];

buttons.forEach((label, i) => {
    const btn = Object.assign(document.createElement("button"), { textContent: label, id: `_${i}` });
    btn.classList.add("button");
    btn.addEventListener("click", () => handleButtonClick(label));
    blockButton.appendChild(btn);
});



document.getElementById("root").appendChild(calculator);