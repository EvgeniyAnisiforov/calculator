import { calculate } from "../app/logic"

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
