import { describe, expect, it, test } from "vitest";
import {
  findDuplicate,
  findDuplicateInGroup,
  letterToPriority,
  part1,
  part2,
} from "./solution";

describe("day 3", () => {
  describe("part1", () => {
    test.each([
      { input: ["ZabZ"], output: 52 },
      { input: ["ZabZ", "aaaabbba"], output: 52 + 1 },
    ])("given $input we should get $output", ({ input, output }) => {
      expect(part1(input.join("\n"))).toEqual(output);
    });
    test.each([
      { letter: "a", priority: 1 },
      { letter: "z", priority: 26 },
      { letter: "A", priority: 27 },
      { letter: "Z", priority: 52 },
      { letter: "ZA", priority: 0 },
    ])("letter $letter has priority $priority", ({ letter, priority }) => {
      expect(letterToPriority(letter)).toEqual(priority);
    });

    test.each([
      {
        input: "ZabZ",
        output: "Z",
      },
      { input: "Zaat", output: "a" },
    ])(
      "finds duplicate letter $output given input $input",
      ({ input, output }) => {
        expect(findDuplicate(input)).toEqual(output);
      }
    );
    it("findDuplicate should fail if there is no common letter", () => {
      try {
        findDuplicate("AABB");
      } catch (e) {
        expect((<Error>e).message).toEqual("Developer Mistake");
      }
    });
  });

  describe("part2", () => {
    test.each([
      {
        lines: ["aaa", "bba", "cca"],
        duplicate: "a",
      },
      {
        lines: ["AbD", "DaB", "aDA"],
        duplicate: "D",
      },
    ])("given group $lines duplicate is $duplicate", ({ lines, duplicate }) => {
      expect(findDuplicateInGroup(lines)).toEqual(duplicate);
    });
  });
  it("findDuplicateInGroup should fail if there is no common letter", () => {
    try {
      findDuplicateInGroup(["A", "B", "C"]);
    } catch (e) {
      expect((<Error>e).message).toEqual("Developer Mistake");
    }
  });
  test.each([
    {
      input: ["ZabZ", "aaaabbba", "a", "ZAbZ", "aaZabbba", "Z"],
      output: 52 + 1,
    },
  ])("given $input we should get $output", ({ input, output }) => {
    expect(part2(input.join("\n"))).toEqual(output);
  });
});
