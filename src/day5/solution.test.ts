import { describe, expect, it, test } from "vitest";
import {
  applyMove,
  applyMoveWithCount,
  Game,
  GameWithMoveCount,
  parseInput,
  parseInputWithMoveCount,
  part1,
  part2,
  readTopOfStacks,
} from "./solution";

describe("day 5", () => {
  describe("input parser", () => {
    test("parse input", () => {
      const inputLines = [
        "[Z] [M] [P]",
        " 1   2   3 ",
        "",
        "move 1 from 2 to 1",
        "move 3 from 1 to 3",
      ];
      const expectedOutput: Game = {
        stacks: {
          1: ["Z"],
          2: ["M"],
          3: ["P"],
        },
        moves: [
          {
            from: 2,
            to: 1,
          },
          {
            from: 1,
            to: 3,
          },
          {
            from: 1,
            to: 3,
          },
          {
            from: 1,
            to: 3,
          },
        ],
      };
      expect(parseInput(inputLines.join("\n"))).toEqual(expectedOutput);
    });
    test("parse input with multiple starting stacks", () => {
      const inputLines = [
        "[A] [B] [C]",
        "[D] [E] [F]",
        " 1   2   3 ",
        "",
        "move 1 from 2 to 1",
      ];
      const expectedOutput: Game = {
        stacks: {
          1: ["A", "D"],
          2: ["B", "E"],
          3: ["C", "F"],
        },
        moves: [
          {
            from: 2,
            to: 1,
          },
        ],
      };
      expect(parseInput(inputLines.join("\n"))).toEqual(expectedOutput);
    });
  });
  describe("move applier", () => {
    test("it applies a move", () => {
      expect(
        applyMove(
          {
            1: ["Z"],
            2: ["M"],
            3: ["P"],
          },
          {
            from: 2,
            to: 1,
          }
        )
      ).toEqual({
        1: ["M", "Z"],
        2: [],
        3: ["P"],
      });
    });
  });
  describe("readTopOfStacks", () => {
    test("should read the top of the stack", () => {
      expect(
        readTopOfStacks({
          1: ["A", "Z"],
          2: ["B"],
          3: ["C"],
        })
      ).toEqual("ABC");
    });
  });
  describe("part1", () => {
    it("should be able parse and move and assess", () => {
      const inputLines = [
        "[A] [B] [C]",
        "[D] [E] [F]",
        " 1   2   3 ",
        "",
        "move 1 from 2 to 1",
      ];
      expect(part1(inputLines.join("\n"))).toEqual("BEC");
    });
  });

  describe("Parse Input Multiple Stack Moves", () => {
    test("parse input", () => {
      const inputLines = [
        "[Z] [M] [P]",
        " 1   2   3 ",
        "",
        "move 1 from 2 to 1",
        "move 3 from 1 to 3",
      ];
      const expectedOutput: GameWithMoveCount = {
        stacks: {
          1: ["Z"],
          2: ["M"],
          3: ["P"],
        },
        moves: [
          {
            count: 1,
            from: 2,
            to: 1,
          },
          {
            count: 3,
            from: 1,
            to: 3,
          },
        ],
      };
      expect(parseInputWithMoveCount(inputLines.join("\n"))).toEqual(
        expectedOutput
      );
    });
  });

  describe("apply moves with count", () => {
    it("should move multiple stack items at once", () => {
      expect(
        applyMoveWithCount(
          {
            1: ["A", "B", "C"],
            2: ["D"],
            3: ["E"],
          },
          {
            count: 2,
            from: 1,
            to: 3,
          }
        )
      ).toEqual({
        1: ["C"],
        2: ["D"],
        3: ["A", "B", "E"],
      });
    });
  });
  describe("Part 2", () => {
    it("should be able to act on input", () => {
      const inputLines = [
        "[A] [B] [C]",
        "[D] [E] [F]",
        "[G] [H] [I]",
        " 1   2   3 ",
        "",
        "move 1 from 2 to 1",
        "move 3 from 1 to 3",
      ];

      expect(part2(inputLines.join("\n"))).toEqual("GEB");
    });
  });
});
