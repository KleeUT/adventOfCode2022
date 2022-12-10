import { describe, expect, it, test } from "vitest";
import { part1, part2 } from "./solution";
describe("day 6", () => {
  test.each([
    { input: "bvwbjplbgvbhsrlpgdmjqwftvncz", marker: 5 },
    { input: "nppdvjthqldpwncqszvftbrmjlhg", marker: 6 },
    { input: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", marker: 10 },
    { input: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", marker: 11 },
  ])("part1: $input has marker at $marker", ({ input, marker }) => {
    expect(part1(input)).toEqual(marker);
  });

  test.only.each([
    { input: "mjqjpqmgbljsphdztnvjfqwrcgsmlb", marker: 19 },
    { input: "bvwbjplbgvbhsrlpgdmjqwftvncz", marker: 23 },
    { input: "nppdvjthqldpwncqszvftbrmjlhg", marker: 23 },
    { input: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", marker: 29 },
    { input: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", marker: 26 },
  ])("part2: $input has marker at $marker", ({ input, marker }) => {
    expect(part2(input)).toEqual(marker);
  });
});
