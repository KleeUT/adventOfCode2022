import { describe, expect, it, test } from "vitest";
import { calculateResult, calculateResult2, findDesiredPlay } from "./solution";
import { Result } from "./Result";
import { Play } from "./Play";

describe("calculate moves part 1", () => {
  test.each([
    { input: [], output: 0 },
    { input: ["B X"], output: 1 },
    { input: ["C X"], output: 7 },
    { input: ["C X", "A X"], output: 11 },
  ])("should calculate simple $input", ({ input, output }) => {
    expect(calculateResult(input.join("\n"))).toEqual(output);
  });
});

describe("calculate moves part 2", () => {
  test.each([
    { input: [], output: 0 },
    { input: ["A X"], output: 3 },
    { input: ["B X"], output: 1 },
    { input: ["C X"], output: 2 },
    { input: ["B X"], output: 1 },
    { input: ["B Y"], output: 5 },
    { input: ["B Z"], output: 9 },
    { input: ["C X"], output: 2 },
    { input: ["C Y"], output: 6 },
    { input: ["C Z"], output: 7 },
    { input: ["C X", "A Z"], output: 2 + 8 },
  ])("should calculate simple $input", ({ input, output }) => {
    expect(calculateResult2(input.join("\n"))).toEqual(output);
  });

  test.each([
    {
      them: Play.scissors,
      desiredResult: Result.draw,
      me: Play.scissors,
    },
    {
      them: Play.rock,
      desiredResult: Result.draw,
      me: Play.rock,
    },
    {
      them: Play.paper,
      desiredResult: Result.draw,
      me: Play.paper,
    },
    {
      them: Play.scissors,
      desiredResult: Result.win,
      me: Play.rock,
    },
    {
      them: Play.rock,
      desiredResult: Result.win,
      me: Play.paper,
    },
    {
      them: Play.paper,
      desiredResult: Result.win,
      me: Play.scissors,
    },
    {
      them: Play.scissors,
      desiredResult: Result.lose,
      me: Play.paper,
    },
    {
      them: Play.rock,
      desiredResult: Result.lose,
      me: Play.scissors,
    },
    {
      them: Play.paper,
      desiredResult: Result.lose,
      me: Play.rock,
    },
  ])(
    "if they play $them and I want to $desiredResult then I play $me",
    ({ them, desiredResult, me }) => {
      expect(findDesiredPlay(them, desiredResult)).toEqual(me);
    }
  );
});
