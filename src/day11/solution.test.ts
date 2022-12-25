import { describe, expect, it, test, vi } from "vitest";
import { inputParser, Monkey, Operation } from "./solution";

describe("day template", () => {
  describe("Monkey parser", () => {
    const oneMonkeyInput = `Monkey 0:
  Starting items: 11, 22
  Operation: new = old * 33
  Test: divisible by 44
    If true: throw to monkey 55
    If false: throw to monkey 66`;

    const twoMonkeyInput = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + old
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0`;

    test("Parse a monkey", () => {
      expect(inputParser(oneMonkeyInput)).toEqual([
        {
          monkeyNumber: 0,
          items: [11, 22],
          operation: "*",
          operationValue: 33,
          testDivisor: 44,
          truthyTarget: 55,
          falsyTarget: 66,
        },
      ]);
    });
    test("Parse two monkeys", () => {
      expect(inputParser(twoMonkeyInput)).toEqual([
        {
          monkeyNumber: 0,
          items: [79, 98],
          operation: "*",
          operationValue: 19,
          testDivisor: 23,
          truthyTarget: 2,
          falsyTarget: 3,
        },
        {
          monkeyNumber: 1,
          items: [54, 65, 75, 74],
          operation: "+",
          operationValue: "old",
          testDivisor: 19,
          truthyTarget: 2,
          falsyTarget: 0,
        },
      ]);
    });
  });
  describe("Monkey tests", () => {
    test.each([
      {
        divisor: 19,
        result: { item: 108, monkeyNumber: 0 },
      },
      {
        divisor: 2,
        result: { item: 108, monkeyNumber: 2 },
      },
    ])("Monkey throwing divisor $divisor", ({ divisor, result }) => {
      const throwSpy = vi.fn();
      const monkey = new Monkey(
        {
          monkeyNumber: 1,
          items: [54],
          operation: "+",
          operationValue: "old",
          testDivisor: divisor,
          truthyTarget: 2,
          falsyTarget: 0,
        },
        throwSpy,
        1
      );
      monkey.takeTurn();
      expect(throwSpy).toHaveBeenCalledWith(result);
    });
    test.skip.each([
      {
        operation: "+",
        operationValue: 19n,
        result: { item: 69, monkeyNumber: 2 },
      },
      {
        operation: "*",
        operationValue: 2,
        result: { item: 100, monkeyNumber: 0 },
      },
      {
        operation: "+",
        operationValue: "old",
        result: { item: 100, monkeyNumber: 0 },
      },
      {
        operation: "*",
        operationValue: "old",
        result: { item: 2500, monkeyNumber: 0 },
      },
    ])(
      "Monkey throwing operation $operation $operationValue",
      ({ operation, operationValue, result }) => {
        const throwSpy = vi.fn();
        const monkey = new Monkey(
          {
            monkeyNumber: 1,
            items: [50],
            operation: operation as Operation,
            operationValue: operationValue as number | "old",
            testDivisor: 3,
            truthyTarget: 2,
            falsyTarget: 0,
          },
          throwSpy,
          1
        );
        monkey.takeTurn();
        expect(throwSpy).toHaveBeenCalledWith(result);
      }
    );
  });
});
