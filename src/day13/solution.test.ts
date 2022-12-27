import { describe, expect, it, test } from "vitest";
import {
  comparePacketPair,
  PacketOrder,
  PacketPair,
  parseInput,
} from "./solution";
describe("day template", () => {
  it("parses input one pair", () => {
    const lines = ["[9]", "[[8,7,6]]"];
    expect(parseInput(lines.join("\n"))).toEqual([
      {
        first: [9],
        second: [[8, 7, 6]],
      },
    ]);
  });
  it("parses input multiple pair", () => {
    const lines = ["[9]", "[[8,7,6]]", "", "[18,9]", "[8,[8,7]]"];
    expect(parseInput(lines.join("\n"))).toEqual([
      {
        first: [9],
        second: [[8, 7, 6]],
      },
      {
        first: [18, 9],
        second: [8, [8, 7]],
      },
    ]);
  });
  describe("Comparison", () => {
    it.each([
      {
        pair: {
          first: [9],
          second: [8],
        },
        outcome: PacketOrder.Incorrect,
      },
      {
        pair: {
          first: [7],
          second: [8],
        },
        outcome: PacketOrder.Correct,
      },
      {
        pair: {
          first: [8, 7],
          second: [8, 9],
        },
        outcome: PacketOrder.Correct,
      },
      {
        pair: {
          first: [[7]],
          second: [[8]],
        },
        outcome: PacketOrder.Correct,
      },
      {
        pair: {
          first: [[8]],
          second: [[7]],
        },
        outcome: PacketOrder.Incorrect,
      },
      {
        pair: {
          first: [[9, 9]],
          second: [[8]],
        },
        outcome: PacketOrder.Incorrect,
      },
      {
        pair: {
          first: [[9]],
          second: [[8, 8]],
        },
        outcome: PacketOrder.Incorrect,
      },
      {
        pair: {
          first: [[8, 8]],
          second: [[9, 9]],
        },
        outcome: PacketOrder.Correct,
      },
      {
        pair: {
          first: [[8, 9]],
          second: [[9, 8]],
        },
        outcome: PacketOrder.Correct,
      },
      {
        pair: {
          first: [8],
          second: [[9, 8]],
        },
        outcome: PacketOrder.Correct,
      },
      {
        pair: {
          first: [8],
          second: [[9]],
        },
        outcome: PacketOrder.Correct,
      },
      {
        pair: {
          first: [[8]],
          second: [9],
        },
        outcome: PacketOrder.Correct,
      },
      {
        pair: {
          first: [[9]],
          second: [8],
        },
        outcome: PacketOrder.Incorrect,
      },
      {
        pair: {
          // 1
          first: [1, 1, 3, 1, 1],
          second: [1, 1, 5, 1, 1],
        },
        outcome: PacketOrder.Correct,
      },
      {
        pair: {
          // 2
          first: [[1], [2, 3, 4]],
          second: [[1], 4],
        },
        outcome: PacketOrder.Correct,
      },
      {
        pair: {
          //3
          first: [9],
          second: [[8, 7, 6]],
        },
        outcome: PacketOrder.Incorrect,
      },

      {
        pair: {
          // 4
          first: [[4, 4], 4, 4],
          second: [[4, 4], 4, 4, 4],
        },
        outcome: PacketOrder.Correct,
      },
      {
        pair: {
          // 5
          first: [7, 7, 7, 7],
          second: [7, 7, 7],
        },
        outcome: PacketOrder.Incorrect,
      },

      {
        pair: {
          //6
          first: [],
          second: [3],
        },
        outcome: PacketOrder.Correct,
      },
      {
        pair: {
          //7
          first: [[[]]],
          second: [[]],
        },
        outcome: PacketOrder.Incorrect,
      },
      {
        pair: {
          //8
          first: [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
          second: [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
        },
        outcome: PacketOrder.Incorrect,
      },
    ])("should identify correct order of just numbers", ({ pair, outcome }) => {
      expect(
        comparePacketPair(pair as PacketPair),
        `Input was ${JSON.stringify(pair)} and we expected ${outcome}`
      ).toEqual(outcome);
    });
  });
});
