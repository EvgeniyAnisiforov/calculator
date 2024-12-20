import { calculate, performUnaryOperation } from "../app/logic"

// 1. Основные математические операции
describe("Основные операции", () => {
  test("Сложение", () => {
    expect(calculate(2, 3, "+")).toBe(5)
  })

  test("Вычитание", () => {
    expect(calculate(5, 3, "-")).toBe(2)
  })

  test("Умножение", () => {
    expect(calculate(2, 3, "*")).toBe(6)
  })

  test("Деление", () => {
    expect(calculate(6, 3, "÷")).toBe(2)
  })

  test("Деление на ноль", () => {
    expect(calculate(6, 0, "÷")).toBe("Ошибка")
  })

  test("Остаток от деления", () => {
    expect(calculate(10, 3, "%")).toBe(1)
  })

  test("Остаток от деления на 0", () => {
    expect(calculate(10, 0, "%")).toBe("Ошибка")
  })
})

// 2. Унарные операции
describe("Унарные операции", () => {
  test("Квадратный корень", () => {
    expect(performUnaryOperation(Math.sqrt, 9)).toBe("3")
  })

  test("Квадратный корень из отрицательных чисел", () => {
    expect(performUnaryOperation(Math.sqrt, -1)).toBe("Ошибка")
  })

  test("Возведение в квадрат", () => {
    expect(performUnaryOperation((n) => Math.pow(n, 2), 3)).toBe("9")
  })

  test("Возведение в степень", () => {
    expect(calculate(2, 3, "x^y")).toBe(8)
  })

  test("Возведение в степень при 0", () => {
    expect(calculate(0, 5, "x^y")).toBe(0)
  })

  test("Возведение в степень 0 в 0", () => {
    expect(calculate(0, 0, "x^y")).toBe(1)
  })

  test("Возведение в степень 0 в -1", () => {
    expect(calculate(0, -1, "x^y")).toBe("Ошибка")
  })

  test("Обратное значение", () => {
    expect(performUnaryOperation((n) => 1 / n, 2)).toBe("0.5")
  })

  test("Обратное значение при 0", () => {
    expect(performUnaryOperation((n) => 1 / n, 0)).toBe("Ошибка")
  })

  test("Синус", () => {
    expect(
      performUnaryOperation((n) => Math.sin((n * Math.PI) / 180), 90)
    ).toBe("1")
  })

  test("Косинус", () => {
    expect(performUnaryOperation((n) => Math.cos((n * Math.PI) / 180), 0)).toBe(
      "1"
    )
  })

  test("Округление вниз", () => {
    expect(performUnaryOperation(Math.floor, 3.7)).toBe("3")
  })

  test("Округление вверх", () => {
    expect(performUnaryOperation(Math.ceil, 3.3)).toBe("4")
  })
})

// 3. Работа с памятью
describe("Работа с памятью", () => {
  let memory = 0

  const addToMemory = (value) => {
    memory += value
    return memory
  }
  const subtractFromMemory = (value) => {
    memory -= value
    return memory
  }
  const clearMemory = () => {
    memory = 0
    return memory
  }

  test("Добавить в память", () => {
    expect(addToMemory(5)).toBe(5)
  })

  test("Вычесть из памяти", () => {
    expect(subtractFromMemory(2)).toBe(3)
  })

  test("Очистить память", () => {
    expect(clearMemory()).toBe(0)
  })
})

// 4. Специальные кнопки
describe("Специальные кнопки", () => {
  let currentValue

  beforeEach(() => {
    currentValue = "123" // Инициализируем перед каждым тестом
  })

  const clear = () => {
    currentValue = "0"
  }

  const backspace = () => {
    currentValue = currentValue.slice(0, -1) || "0"
  }

  const toggleSign = () => {
    if (currentValue === "0") return
    currentValue = currentValue.startsWith("-")
      ? currentValue.slice(1)
      : `-${currentValue}`
  }

  test("Очистить", () => {
    clear()
    expect(currentValue).toBe("0")
  })

  test("Удалить последний символ", () => {
    backspace()
    expect(currentValue).toBe("12")
  })

  test("Удалить последний символ из одной цифры", () => {
    currentValue = "1"
    backspace()
    expect(currentValue).toBe("0")
  })

  test("Переключить знак", () => {
    toggleSign()
    expect(currentValue).toBe("-123")
  })

  test("Переключить знак для нуля", () => {
    currentValue = "0"
    toggleSign()
    expect(currentValue).toBe("0")
  })
})
