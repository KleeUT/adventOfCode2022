import { describe, expect, it, test } from "vitest";
import {
  calculateAnswersFromInterestingResults,
  identifyInterestingResults,
  NOOP,
  processInstruction,
} from "./solution";
describe("day 10", () => {
  it("processes noop", () => {
    expect(processInstruction(NOOP, { cycle: 1, registerValue: 1 })).toEqual({
      cycle: 2,
      registerValue: 1,
    });
  });
  it("processes add command", () => {
    expect(
      processInstruction("addx -6", { cycle: 1, registerValue: 1 })
    ).toEqual({
      cycle: 3,
      registerValue: -5,
    });
  });

  describe("track value if interesting", () => {
    it("should return false if it's not interesting and previous is undefined", () =>
      expect(
        identifyInterestingResults(undefined, {
          cycle: 2,
          registerValue: 1,
        })
      ).toEqual(false));

    it("should return false if it's not interesting ", () =>
      expect(
        identifyInterestingResults(
          {
            cycle: 1,
            registerValue: 1,
          },
          {
            cycle: 2,
            registerValue: 1,
          }
        )
      ).toEqual(false));
    it("should return previous value if it's interesting and 21", () => {
      expect(
        identifyInterestingResults(
          {
            cycle: 19,
            registerValue: 19,
          },
          {
            cycle: 21,
            registerValue: 123,
          }
        )
      ).toEqual({
        cycle: 20,
        registerValue: 19,
      });
    });

    it("Should return not interesting if next is 40", () => {
      expect(
        identifyInterestingResults(
          {
            cycle: 39,
            registerValue: 39,
          },
          {
            cycle: 41,
            registerValue: 123,
          }
        )
      ).toEqual(false);
    });
    it("Should return not interesting if next is 80", () => {
      expect(
        identifyInterestingResults(
          {
            cycle: 79,
            registerValue: 39,
          },
          {
            cycle: 81,
            registerValue: 123,
          }
        )
      ).toEqual(false);
    });

    it("Should return interesting if next is 60", () => {
      expect(
        identifyInterestingResults(
          {
            cycle: 59,
            registerValue: 39,
          },
          {
            cycle: 61,
            registerValue: 123,
          }
        )
      ).toEqual({
        cycle: 60,
        registerValue: 39,
      });
    });
    it("Should return interesting if next is 100", () => {
      expect(
        identifyInterestingResults(
          {
            cycle: 99,
            registerValue: 39,
          },
          {
            cycle: 101,
            registerValue: 123,
          }
        )
      ).toEqual({
        cycle: 100,
        registerValue: 39,
      });
    });
  });

  describe("interesting results calculator", () => {
    test("No results = 0", () => {
      expect(calculateAnswersFromInterestingResults([])).toEqual(0);
    });
    test("Multiplies the results", () => {
      expect(
        calculateAnswersFromInterestingResults([
          { cycle: 20, registerValue: 100 },
        ])
      ).toEqual(2000);
    });
    test("Multiplies the results", () => {
      expect(
        calculateAnswersFromInterestingResults([
          { cycle: 20, registerValue: 100 },
          { cycle: 40, registerValue: 200 },
        ])
      ).toEqual(10000);
    });
  });
});
