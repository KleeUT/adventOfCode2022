import { describe, expect, it, test } from "vitest";
import {
  assessTreeLine,
  assessTreeLineBidirectional,
  columnsAsRows,
  combineAssessments,
  countVisibleTrees,
  countVisibleTreesFromTree,
  findTreeLines,
  part1,
  part2,
  Visibility,
} from "./solution";

describe("day 8", () => {
  it("should find visible trees in one direction", () => {
    const treeLine = [0, 2, 3, 5, 4, 4, 5];
    const newRow = assessTreeLine(treeLine);
    expect(newRow).toEqual([
      { height: 0, visible: Visibility.visible },
      { height: 2, visible: Visibility.visible },
      { height: 3, visible: Visibility.visible },
      { height: 5, visible: Visibility.visible },
      { height: 4, visible: Visibility.hidden },
      { height: 4, visible: Visibility.hidden },
      { height: 5, visible: Visibility.hidden },
    ]);
  });

  it("should find visible trees in two directions", () => {
    const treeLine = [0, 2, 3, 5, 4, 4, 5, 4, 3];
    const newRow = assessTreeLineBidirectional(treeLine);
    expect(newRow).toEqual([
      { height: 0, visible: Visibility.visible },
      { height: 2, visible: Visibility.visible },
      { height: 3, visible: Visibility.visible },
      { height: 5, visible: Visibility.visible },
      { height: 4, visible: Visibility.hidden },
      { height: 4, visible: Visibility.hidden },
      { height: 5, visible: Visibility.visible },
      { height: 4, visible: Visibility.visible },
      { height: 3, visible: Visibility.visible },
    ]);
  });
  it("should find visible trees in two directions 25512", () => {
    const treeLine = [2, 5, 5, 1, 2];
    const newRow = assessTreeLineBidirectional(treeLine);
    expect(newRow).toEqual([
      { height: 2, visible: Visibility.visible },
      { height: 5, visible: Visibility.visible },
      { height: 5, visible: Visibility.visible },
      { height: 1, visible: Visibility.hidden },
      { height: 2, visible: Visibility.visible },
    ]);
  });
  it("should find visible trees in two directions 71349", () => {
    const treeLine = [7, 1, 3, 4, 9];
    const newRow = assessTreeLineBidirectional(treeLine);
    expect(newRow).toEqual([
      { height: 7, visible: Visibility.visible },
      { height: 1, visible: Visibility.hidden },
      { height: 3, visible: Visibility.hidden },
      { height: 4, visible: Visibility.hidden },
      { height: 9, visible: Visibility.visible },
    ]);
  });
  test.each([
    {
      input: [3, 3, 5, 4, 9],
      output: [
        { height: 3, visible: Visibility.visible },
        { height: 3, visible: Visibility.hidden },
        { height: 5, visible: Visibility.visible },
        { height: 4, visible: Visibility.hidden },
        { height: 9, visible: Visibility.visible },
      ],
    },
  ])("$input finds correct rows", ({ input, output }) => {
    const newRow = assessTreeLineBidirectional(input);
    expect(newRow).toEqual(output);
  });
  it("can invert an array", () => {
    expect(
      columnsAsRows([
        ["1", "2"],
        ["3", "4"],
      ])
    ).toEqual([
      ["1", "3"],
      ["2", "4"],
    ]);
  });
  it("double invert an array returns to normal", () => {
    const input = [
      ["1", "2", "a", "b"],
      ["3", "4", "c", "d"],
      ["5", "6", "e", "f"],
      ["7", "8", "g", "h"],
    ];
    expect(columnsAsRows(columnsAsRows(input))).toEqual([
      ["1", "2", "a", "b"],
      ["3", "4", "c", "d"],
      ["5", "6", "e", "f"],
      ["7", "8", "g", "h"],
    ]);
  });
  it("can combine two assessments", () => {
    const one = [
      [
        { height: 1, visible: Visibility.visible },
        { height: 3, visible: Visibility.visible },
        { height: 2, visible: Visibility.visible },
        { height: 4, visible: Visibility.visible },
        { height: 3, visible: Visibility.visible },
      ],
      [
        { height: 1, visible: Visibility.visible },
        { height: 2, visible: Visibility.hidden },
        { height: 2, visible: Visibility.hidden },
        { height: 4, visible: Visibility.hidden },
        { height: 3, visible: Visibility.visible },
      ],
    ];
    const two = [
      [
        { height: 1, visible: Visibility.visible },
        { height: 3, visible: Visibility.visible },
        { height: 2, visible: Visibility.hidden },
        { height: 4, visible: Visibility.visible },
        { height: 3, visible: Visibility.visible },
      ],
      [
        { height: 1, visible: Visibility.hidden },
        { height: 2, visible: Visibility.hidden },
        { height: 2, visible: Visibility.visible },
        { height: 4, visible: Visibility.hidden },
        { height: 3, visible: Visibility.hidden },
      ],
    ];
    const expected = [
      [
        { height: 1, visible: Visibility.visible },
        { height: 3, visible: Visibility.visible },
        { height: 2, visible: Visibility.visible },
        { height: 4, visible: Visibility.visible },
        { height: 3, visible: Visibility.visible },
      ],
      [
        { height: 1, visible: Visibility.visible },
        { height: 2, visible: Visibility.hidden },
        { height: 2, visible: Visibility.visible },
        { height: 4, visible: Visibility.hidden },
        { height: 3, visible: Visibility.visible },
      ],
    ];

    expect(combineAssessments(one, two)).toEqual(expected);
  });
  describe("Part 1", () => {
    test("with sample", () => {
      const lines = ["30373", "25512", "65332", "33549", "35390"];
      expect(part1(lines.join("\n"))).toEqual(21);
    });
  });

  describe("Viewfinder", () => {
    test("find relevant trees", () => {
      const input = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];

      const output = {
        treesNorth: [2],
        treesSouth: [8],
        treesEast: [6],
        treesWest: [4],
      };

      expect(findTreeLines({ row: 1, column: 1 }, input)).toEqual(output);
    });

    test.each([
      { line: [1, 2, 3, 4, 5], tree: 5, expectedCount: 5 },
      { line: [1, 2, 5, 4, 5], tree: 5, expectedCount: 3 },
      { line: [], tree: 5, expectedCount: 0 },
      { line: [5], tree: 5, expectedCount: 1 },
      { line: [9], tree: 5, expectedCount: 1 },
      { line: [3], tree: 5, expectedCount: 1 },
      { line: [3, 6], tree: 5, expectedCount: 2 },
    ])(
      "Count the visible trees: $line | tree: $tree",
      ({ tree, line, expectedCount }) => {
        expect(countVisibleTrees(tree, line)).toEqual(expectedCount);
      }
    );

    describe("count trees visible", () => {
      test("count 1", () => {
        const map = [
          [1, 1, 2],
          [1, 2, 2],
          [2, 1, 2],
          [1, 1, 2],
        ];

        expect(countVisibleTreesFromTree({ row: 2, column: 1 }, map)).toEqual(
          1
        );
      });
      test("count 2", () => {
        const map = [
          [1, 1, 2],
          [1, 2, 2],
          [2, 1, 2],
          [1, 1, 2],
        ];

        expect(countVisibleTreesFromTree({ row: 1, column: 1 }, map)).toEqual(
          2
        );
      });

      test("count consecutive 0", () => {
        const map = [
          [1, 1, 3, 1, 2],
          [1, 2, 1, 2, 2],
          [6, 0, 2, 9, 9],
          [1, 1, 1, 1, 2],
          [1, 2, 5, 2, 2],
        ];

        expect(countVisibleTreesFromTree({ row: 2, column: 2 }, map)).toEqual(
          8
        );
      });
    });
  });

  describe("Part 2", () => {
    test("with sample", () => {
      const lines = ["30373", "25512", "65332", "33549", "35390"];
      expect(part2(lines.join("\n"))).toEqual(8);
    });
  });
});
