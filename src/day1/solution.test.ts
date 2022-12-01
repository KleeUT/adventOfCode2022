import { describe, expect, it, test } from "vitest";
import { solution, solution2 } from "./solution";

describe("Calorie counter", () => {
  test.each([
    {
      input: `1000
    2000
    3000
    
    4000
    
    5000
    6000
    
    7000
    8000
    9000
    
    10000`,
      output: 24000,
    },
    {
      input: `1000
    2000
    3000
    
    4000
    
    5000
    6000
    
    10000`,
      output: 11000,
    },
  ])("should identity calories by elf", ({ input, output }) => {
    expect(solution(input)).toEqual(output);
  });
});
describe("Calorie counter part 2", () => {
  test.each([
    {
      input: `1000
    2000
    3000
    
    4000
    
    5000
    6000
    
    7000
    8000
    9000
    
    10000`,
      output: 45000,
    },
    {
      input: `1000
    2000
    3000
    
    4000
    
    5000
    6000
    
    10000`,
      output: 27000,
    },
  ])("should identity calories by elf", ({ input, output }) => {
    expect(solution2(input)).toEqual(output);
  });
});
