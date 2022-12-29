import { describe, expect, it, test } from "vitest";
import { part1 } from "./solution";
describe("day template", () => {
  describe("part 1", () => {
    test("counts child directory and parent direcctory", () => {
      const outputLines = [
        "$ cd /",
        "$ ls",
        "dir a",
        "200 b.txt",
        "$ cd a",
        "$ ls",
        "10000 c.txt",
      ];

      expect(part1(outputLines.join("\n"))).toEqual(20200);
    });
    test("if there is a big child ignore it all", () => {
      const outputLines = [
        "$ cd /",
        "$ ls",
        "dir a",
        "200 b.txt",
        "$ cd a",
        "$ ls",
        "110000 c.txt",
      ];

      expect(part1(outputLines.join("\n"))).toEqual(0);
    });
    test("if there is a big child ignore it all", () => {
      const outputLines = [
        "$ cd /",
        "$ ls",
        "dir a",
        "200000 b.txt",
        "$ cd a",
        "$ ls",
        "10000 c.txt",
      ];

      expect(part1(outputLines.join("\n"))).toEqual(10000);
    });
    test("if there is a big child ignore it all", () => {
      const outputLines = [
        "$ cd /",
        "$ ls",
        "dir a",
        "dir d",
        "200 b.txt",
        "$ cd a",
        "$ ls",
        "10000 c.txt",
        "$ cd ..",
        "$ cd d",
        "$ ls",
        "100001 c.txt",
      ];

      expect(part1(outputLines.join("\n"))).toEqual(10000);
    });
  });
});
