import { roundToPrecision, calculate, performUnaryOperation, toRadians } from "./logic.js"

// Создаем основной контейнер калькулятора
const calculator = document.createElement("div")
const outputBlock = Object.assign(document.createElement("div"), {
  className: "outputBlock",
  textContent: "0",
})
const blockButton = Object.assign(document.createElement("div"), {
  className: "blockButton",
})
calculator.classList.add("containerCalculator")
calculator.append(outputBlock, blockButton)

const buttons = [
  "C", "←", "%", "÷",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "±", "0", ".", "=",
  "√", "Х²", "1/X", "sin",
  "cos", "x^y", "floor", "ceil",
  "M+", "M-", "MR", "MC",
]

buttons.forEach((label, i) => {
  const btn = Object.assign(document.createElement("button"), {
    textContent: label,
    id: `_${i}`,
  })
  btn.classList.add("button")
  btn.addEventListener("click", () => handleButtonClick(label))
  blockButton.appendChild(btn)
})

// Глобальные переменные
let currentValue = "0"
let storedValue = null
let operator = null
let memory = 0

const updateOutput = (value) => {
  if (outputBlock) {
    outputBlock.textContent = value.toString()
  }
}

const handleButtonClick = (value) => {
  if (value === "C") return resetCalculator()
  if (value === "←")
    return updateOutput((currentValue = currentValue.slice(0, -1) || "0"))
  if (value === "±")
    return updateOutput(
      (currentValue = currentValue.startsWith("-")
        ? currentValue.slice(1)
        : `-${currentValue}`)
    )
  if (value === "√")
    return updateOutput(
      (currentValue = performUnaryOperation(Math.sqrt, currentValue))
    )
  if (value === "Х²")
    return updateOutput(
      (currentValue = performUnaryOperation(
        (n) => Math.pow(n, 2),
        currentValue
      ))
    )
  if (value === "1/X")
    return updateOutput(
      (currentValue = performUnaryOperation(
        (n) => (n !== 0 ? 1 / n : "Ошибка"),
        currentValue
      ))
    )
  if (value === "sin")
    return updateOutput(
      (currentValue = performUnaryOperation(
        (n) => Math.sin(toRadians(n)),
        currentValue
      ))
    )
  if (value === "cos")
    return updateOutput(
      (currentValue = performUnaryOperation(
        (n) => Math.cos(toRadians(n)),
        currentValue
      ))
    )
  if (value === "floor")
    return updateOutput(
      (currentValue = performUnaryOperation(Math.floor, currentValue))
    )
  if (value === "ceil")
    return updateOutput(
      (currentValue = performUnaryOperation(Math.ceil, currentValue))
    )
  if (value === "M+") return addToMemory(parseFloat(currentValue))
  if (value === "M-") return subtractFromMemory(parseFloat(currentValue))
  if (value === "MR") return updateOutput(memory)
  if (value === "MC") return clearMemory()
  if (["%", "÷", "*", "-", "+"].includes(value)) return handleOperator(value)
  if (value === "x^y") return handleOperator(value)
  if (value === "=") return evaluateResult()
  if (!isNaN(value) || value === ".") return handleNumber(value)
}

const handleOperator = (op) => {
  if (storedValue === null) {
    storedValue = parseFloat(currentValue)
  } else if (operator) {
    storedValue = calculate(storedValue, parseFloat(currentValue), operator)
  }
  operator = op
  currentValue = "0"
  updateOutput(storedValue)
}

const evaluateResult = () => {
  if (operator) {
    currentValue = roundToPrecision(
      calculate(storedValue, parseFloat(currentValue), operator)
    ).toString()
    operator = null
    storedValue = null
    updateOutput(currentValue)
  }
}

const handleNumber = (value) => {
  if (currentValue === "0" && value !== ".") {
    currentValue = value
  } else {
    currentValue += value
  }
  updateOutput(currentValue)
}

const resetCalculator = () => {
  currentValue = "0"
  storedValue = null
  operator = null
  updateOutput(currentValue)
}

const addToMemory = (value) => {
  memory += value
  updateOutput(memory.toString())
}

const subtractFromMemory = (value) => {
  memory -= value
  updateOutput(memory.toString())
}

const clearMemory = () => {
  memory = 0
  updateOutput("0")
}

document.getElementById("root").appendChild(calculator)
